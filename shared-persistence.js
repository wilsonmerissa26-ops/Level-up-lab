(() => {
  const STATES = Object.freeze({
    DISABLED:'DISABLED',
    CONFIG_REQUIRED:'CONFIG_REQUIRED',
    AUTH_REQUIRED:'AUTH_REQUIRED',
    READY:'READY',
    ERROR:'ERROR'
  });

  function clean(value){ return String(value ?? '').trim(); }

  function normalizeConfig(input={}){
    const enabled=input?.enabled===true;
    const url=clean(input?.url).replace(/\/+$/,'');
    const anonKey=clean(input?.anonKey);
    if(!enabled)return {enabled:false,url:'',anonKey:'',state:STATES.DISABLED};
    if(!url || !anonKey)return {enabled:true,url,anonKey,state:STATES.CONFIG_REQUIRED};
    return {enabled:true,url,anonKey,state:null};
  }

  function parseJsonSafe(text){
    if(!text)return null;
    try{return JSON.parse(text)}catch(_){return null}
  }

  function createSupabaseRestStore({config={},fetchImpl=globalThis.fetch,getAccessToken=()=>null}={}){
    const cfg=normalizeConfig(config);

    function token(){
      try{return clean(getAccessToken?.())}catch(_){return ''}
    }

    function baseStatus(){
      if(cfg.state)return {state:cfg.state,configured:cfg.enabled,error:null};
      if(!token())return {state:STATES.AUTH_REQUIRED,configured:true,error:null};
      if(typeof fetchImpl!=='function')return {state:STATES.ERROR,configured:true,error:'fetch unavailable'};
      return null;
    }

    function headers(extra={}){
      const accessToken=token();
      return {
        apikey:cfg.anonKey,
        Authorization:`Bearer ${accessToken}`,
        'Content-Type':'application/json',
        Accept:'application/json',
        ...extra
      };
    }

    async function request(path,options={}){
      const blocked=baseStatus();
      if(blocked)return {ok:false,status:0,blocked:true,...blocked,data:null};
      try{
        const response=await fetchImpl(`${cfg.url}${path}`,{...options,headers:headers(options.headers||{})});
        const raw=await response.text();
        const data=parseJsonSafe(raw);
        if(!response.ok){
          const message=data?.message||data?.error_description||data?.hint||raw||`HTTP ${response.status}`;
          return {ok:false,status:response.status,state:STATES.ERROR,configured:true,error:String(message),data};
        }
        return {ok:true,status:response.status,state:STATES.READY,configured:true,error:null,data};
      }catch(err){
        return {ok:false,status:0,state:STATES.ERROR,configured:true,error:String(err?.message||err||'shared persistence request failed'),data:null};
      }
    }

    async function health(){
      const blocked=baseStatus();
      if(blocked)return blocked;
      const result=await request('/rest/v1/level_up_learner_state?select=learner_id,state_revision&limit=1',{method:'GET'});
      return {state:result.ok?STATES.READY:result.state,configured:true,error:result.error||null};
    }

    async function load(learnerId){
      const id=clean(learnerId);
      if(!id)throw new Error('learnerId is required');
      const result=await request(`/rest/v1/level_up_learner_state?learner_id=eq.${encodeURIComponent(id)}&select=learner_id,state_revision,state_json,updated_at&limit=1`,{method:'GET'});
      if(!result.ok)return {...result,record:null};
      const row=Array.isArray(result.data)?result.data[0]||null:null;
      return {ok:true,state:STATES.READY,error:null,record:row};
    }

    async function save(learnerId,snapshot,{expectedRevision=0}={}){
      const id=clean(learnerId);
      if(!id)throw new Error('learnerId is required');
      const revision=Number(snapshot?.stateRevision);
      if(!Number.isInteger(revision) || revision<1)throw new Error('snapshot.stateRevision must be a positive integer');
      const expected=Number(expectedRevision);
      if(!Number.isInteger(expected) || expected<0)throw new Error('expectedRevision must be a non-negative integer');
      const result=await request('/rest/v1/rpc/level_up_save_learner_state',{
        method:'POST',
        body:JSON.stringify({
          p_learner_id:id,
          p_expected_revision:expected,
          p_state_revision:revision,
          p_state_json:snapshot
        })
      });
      if(!result.ok)return {...result,record:null};
      const row=Array.isArray(result.data)?result.data[0]||null:result.data;
      return {ok:true,state:STATES.READY,error:null,record:row};
    }

    return {states:STATES,config:cfg,health,load,save};
  }

  function createWindowStore(env=globalThis){
    const config=env?.LEVEL_UP_SHARED_BACKEND_CONFIG||{enabled:false};
    const getAccessToken=()=>env?.LEVEL_UP_SHARED_BACKEND_SESSION?.accessToken||'';
    return createSupabaseRestStore({config,fetchImpl:env?.fetch?.bind?.(env)||env?.fetch,getAccessToken});
  }

  const api={STATES,normalizeConfig,createSupabaseRestStore,createWindowStore};
  if(typeof window!=='undefined')window.LEVEL_UP_SHARED_PERSISTENCE=api;
  if(typeof globalThis!=='undefined')globalThis.LEVEL_UP_SHARED_PERSISTENCE=api;
})();
