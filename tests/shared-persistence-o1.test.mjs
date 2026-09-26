import assert from 'node:assert/strict';
import fs from 'node:fs';
import vm from 'node:vm';

const source=fs.readFileSync(new URL('../shared-persistence.js',import.meta.url),'utf8');
const ctx={};vm.createContext(ctx);vm.runInContext(source,ctx);
const P=ctx.LEVEL_UP_SHARED_PERSISTENCE;
assert.ok(P,'shared persistence module loads');

assert.equal(P.normalizeConfig({enabled:false}).state,'DISABLED');
assert.equal(P.normalizeConfig({enabled:true,url:'',anonKey:''}).state,'CONFIG_REQUIRED');
assert.equal(P.normalizeConfig({enabled:true,url:'https://x.supabase.co/',anonKey:'anon'}).url,'https://x.supabase.co');

let calls=[];
const fakeFetch=async(url,options={})=>{
  calls.push({url,options});
  if(url.includes('/rpc/level_up_save_learner_state')){
    return {ok:true,status:200,text:async()=>JSON.stringify([{learner_id:'michael',state_revision:3,updated_at:'2026-09-26T12:00:00Z'}])};
  }
  if(url.includes('learner_id=eq.michael')){
    return {ok:true,status:200,text:async()=>JSON.stringify([{learner_id:'michael',state_revision:2,state_json:{schemaVersion:2,stateRevision:2},updated_at:'2026-09-26T11:00:00Z'}])};
  }
  return {ok:true,status:200,text:async()=>JSON.stringify([])};
};

const unauth=P.createSupabaseRestStore({
  config:{enabled:true,url:'https://x.supabase.co',anonKey:'anon'},
  fetchImpl:fakeFetch,
  getAccessToken:()=>''
});
assert.equal((await unauth.health()).state,'AUTH_REQUIRED');
assert.equal(calls.length,0,'auth-required state does not touch network');

const store=P.createSupabaseRestStore({
  config:{enabled:true,url:'https://x.supabase.co',anonKey:'anon'},
  fetchImpl:fakeFetch,
  getAccessToken:()=> 'user-jwt'
});
assert.equal((await store.health()).state,'READY');

const loaded=await store.load('michael');
assert.equal(loaded.ok,true);
assert.equal(loaded.record.state_revision,2);
assert.match(calls.at(-1).options.headers.Authorization,/Bearer user-jwt/);
assert.equal(calls.at(-1).options.headers.apikey,'anon');

const saved=await store.save('michael',{schemaVersion:2,stateRevision:3},{expectedRevision:2});
assert.equal(saved.ok,true);
const body=JSON.parse(calls.at(-1).options.body);
assert.equal(body.p_learner_id,'michael');
assert.equal(body.p_expected_revision,2);
assert.equal(body.p_state_revision,3);
assert.equal(body.p_state_json.stateRevision,3);

assert.rejects(()=>store.save('',{stateRevision:1}),/learnerId is required/);
assert.rejects(()=>store.save('michael',{stateRevision:0}),/positive integer/);

console.log('Patch O.1 shared persistence adapter: PASS');
