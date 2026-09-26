(() => {
  const STATES = Object.freeze({
    UNSUPPORTED:'UNSUPPORTED',
    NOT_CONFIGURED:'NOT_CONFIGURED',
    NEEDS_PERMISSION:'NEEDS_PERMISSION',
    READY:'READY',
    STALE:'STALE',
    FILE_AHEAD:'FILE_AHEAD',
    CONFLICT:'CONFLICT',
    ERROR:'ERROR'
  });

  function capability(env=globalThis){
    return {
      secureContext:env?.isSecureContext===true,
      canPick:typeof env?.showSaveFilePicker==='function'
    };
  }

  async function permissionState(handle){
    if(!handle)return 'prompt';
    try{
      if(typeof handle.queryPermission!=='function')return 'granted';
      return await handle.queryPermission({mode:'readwrite'});
    }catch(_){
      return 'prompt';
    }
  }

  async function requestPermission(handle){
    if(!handle)return 'denied';
    try{
      const current=await permissionState(handle);
      if(current==='granted')return 'granted';
      if(typeof handle.requestPermission!=='function')return current;
      return await handle.requestPermission({mode:'readwrite'});
    }catch(_){
      return 'denied';
    }
  }

  async function pickFile(env=globalThis,{suggestedName='Michael-Level-Up-Live-Backup.json'}={}){
    const caps=capability(env);
    if(!caps.canPick)throw new Error('Local file access is not supported in this browser mode.');
    return env.showSaveFilePicker({
      id:'michael-level-up-live-backup',
      suggestedName,
      startIn:'documents',
      types:[{
        description:'Level-Up learner backup',
        accept:{'application/json':['.json']}
      }]
    });
  }

  async function readSnapshot(handle){
    if(!handle)throw new Error('No local backup file is connected.');
    const permission=await permissionState(handle);
    if(permission!=='granted')return {ok:false,permission,state:STATES.NEEDS_PERMISSION,snapshot:null,error:null};
    try{
      const file=await handle.getFile();
      const text=await file.text();
      if(!text.trim())return {ok:true,permission,state:STATES.READY,snapshot:null,error:null};
      const snapshot=JSON.parse(text);
      return {ok:true,permission,state:STATES.READY,snapshot,error:null};
    }catch(err){
      return {ok:false,permission,state:STATES.ERROR,snapshot:null,error:String(err?.message||err||'Could not read local backup file.')};
    }
  }

  async function writeSnapshot(handle,snapshot,{expectedRevision=null}={}){
    if(!handle)throw new Error('No local backup file is connected.');
    const permission=await permissionState(handle);
    if(permission!=='granted')return {ok:false,permission,state:STATES.NEEDS_PERMISSION,error:null};
    try{
      if(expectedRevision!=null){
        const existingFile=await handle.getFile();
        const existingText=await existingFile.text();
        let existing=null;
        if(existingText.trim()){
          try{existing=JSON.parse(existingText)}catch(_){
            return {ok:false,permission,state:STATES.CONFLICT,error:'Local backup file is not valid JSON.',revisionConflict:true};
          }
        }
        const existingRevision=Number.isInteger(existing?.stateRevision)?existing.stateRevision:0;
        if(existingRevision!==expectedRevision){
          return {
            ok:false,
            permission,
            state:existingRevision>expectedRevision?STATES.FILE_AHEAD:STATES.CONFLICT,
            error:`Local backup revision conflict: expected ${expectedRevision}, found ${existingRevision}.`,
            revisionConflict:true,
            existingRevision
          };
        }
      }

      const text=JSON.stringify(snapshot,null,2);
      const writable=await handle.createWritable();
      await writable.write(text);
      await writable.close();

      const file=await handle.getFile();
      const readback=JSON.parse(await file.text());
      const sameRevision=readback?.stateRevision===snapshot?.stateRevision;
      const sameLearner=readback?.student?.id===snapshot?.student?.id;
      const samePayload=JSON.stringify(readback)===JSON.stringify(snapshot);
      if(!sameRevision || !sameLearner || !samePayload){
        return {ok:false,permission,state:STATES.ERROR,error:'Local backup readback did not match the learner state that was written.'};
      }
      return {ok:true,permission,state:STATES.READY,error:null};
    }catch(err){
      return {ok:false,permission,state:STATES.ERROR,error:String(err?.message||err||'Could not write local backup file.')};
    }
  }

  function compareSnapshots(localState,fileState){
    const localRevision=Number.isInteger(localState?.stateRevision)?localState.stateRevision:null;
    const fileRevision=Number.isInteger(fileState?.stateRevision)?fileState.stateRevision:null;

    if(!fileState)return {state:STATES.STALE,localRevision,fileRevision:null};
    if(localRevision==null || fileRevision==null)return {state:STATES.CONFLICT,localRevision,fileRevision};
    if(fileRevision<localRevision)return {state:STATES.STALE,localRevision,fileRevision};
    if(fileRevision>localRevision)return {state:STATES.FILE_AHEAD,localRevision,fileRevision};
    if(JSON.stringify(fileState)!==JSON.stringify(localState))return {state:STATES.CONFLICT,localRevision,fileRevision};
    return {state:STATES.READY,localRevision,fileRevision};
  }

  const api={STATES,capability,permissionState,requestPermission,pickFile,readSnapshot,writeSnapshot,compareSnapshots};
  if(typeof window!=='undefined')window.LEVEL_UP_LOCAL_DURABLE_FILE=api;
  if(typeof globalThis!=='undefined')globalThis.LEVEL_UP_LOCAL_DURABLE_FILE=api;
})();
