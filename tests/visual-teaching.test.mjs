import fs from 'node:fs';import vm from 'node:vm';import assert from 'node:assert/strict';
const read=f=>fs.readFileSync(new URL('../'+f,import.meta.url),'utf8');
const elements=new Map([['app',{innerHTML:''}],['saveStatus',{}],['pageAudioStatus',{}]]),mirror=new Map(),spoken=[];
const ctx={console,Date,Math,JSON,Map,Set,Number,String,Object,Array,RegExp,Error,Promise,URL,setTimeout,clearTimeout};
Object.assign(ctx,{window:ctx,globalThis:ctx,location:{hash:'#dashboard'},navigator:{storage:{}},scrollTo(){},scrollY:0,alert(m){ctx.alerts.push(m)},alerts:[],__db:{},__fail:false,SpeechSynthesisUtterance:class{constructor(t){this.text=t}},speechSynthesis:{cancel(){spoken.length=0},pause(){ctx.paused=true},resume(){ctx.paused=false},speak(u){spoken.push(u.text)}},localStorage:{getItem:k=>mirror.get(k)||null,setItem:(k,v)=>mirror.set(k,v)},document:{getElementById:id=>elements.get(id)||null,querySelector:()=>null,querySelectorAll:()=>[]}});
for(const f of ['content.js','science-school.js','science-motion.js','school-coding.js','school-academics.js','visual-teaching.js','science-curriculum.js','science-gap-diagnostic.js','review-engine.js','school-homework.js','state-integrity.js'])vm.runInNewContext(read(f),ctx,{filename:f});
const V=ctx.LEVEL_UP_VISUAL_TEACHING,C=ctx.LEVEL_UP_CONTENT;
assert.equal(C.science.length,39);assert.equal(C.coding.length,9);
for(const l of [...C.science,...C.coding]){
 assert(V.supported(l),l.id);assert.equal(l.teach.length,4);assert(l.stagedTeach);
 const conf=V.config(l);assert.equal(conf.steps.length,4);assert(conf.terms.length>=2);
 for(let i=0;i<4;i++){
  const session={teachIndex:i},before=JSON.stringify(session),html=V.render(l,session);
  assert.equal(JSON.stringify(session),before,'Rendering does not mutate learner state');
  assert(html.includes('<svg')||html.includes('<iframe'),l.id+' has a picture or real preview on each stage');
  assert(!html.includes('undefined')&&!html.includes('NaN'),l.id);
  assert(V.readText(l,i,V.initial(l,i)).length>180,l.id+' has a narrated explanation');
 }
}
const path=C.science.find(l=>l.id==='SCI.CIRCUITS.PATH');let s=V.initial(path,2);assert.equal(V.results('circuit',s).current,0);
s=V.reduce(path,2,s,'closed',true);assert.equal(V.results('circuit',s).current,0,'Closing switch cannot bridge a missing return wire');
s=V.reduce(path,2,s,'returnWire',true);assert.equal(V.results('circuit',s).current,.4);
for(const arrangement of ['single','series','parallel'])for(const closed of [false,true])for(const returnWire of [false,true])for(const branch2 of [false,true]){
 const state={...V.initial(path),arrangement,closed,returnWire,branch2},r=V.results('circuit',state);
 const conducting=closed&&returnWire&&(arrangement!=='series'||branch2);
 assert.equal(r.current>0,conducting);
 if(arrangement==='parallel'){assert(Math.abs(r.current-r.i1-r.i2)<1e-10);if(closed&&returnWire)assert.equal(r.i1,.4);}
 if(arrangement==='series')assert.equal(r.i1,r.i2);
}
for(const voltage of [3,6,12,18])for(const r1 of [15,30,60,120])for(const r2 of [15,60,120]){
 const x={...V.initial(path),voltage,r1,r2,arrangement:'parallel'},r=V.results('circuit',x);assert(Math.abs(r.current-voltage/r1-voltage/r2)<1e-10);
 assert(Math.abs(r.current*r.totalR-voltage)<1e-10);
}
assert.throws(()=>V.reduce(path,0,s,'r1',0));assert.throws(()=>V.reduce(path,0,s,'mass',4));assert.throws(()=>V.reduce(path,0,s,'closed','yes'));
const velocity=C.science.find(l=>l.id==='SCI.MOTION.VELOCITY_GRAPH');let vel=V.reduce(velocity,2,V.initial(velocity),'pattern','negative');assert.equal(V.results('velocityGraph',vel).acceleration,-2);assert.match(V.render(velocity,{teachIndex:2,teachingLab:{steps:{2:vel}}}),/−?2|\-2/);
const base=V.initial('SCI.MOTION.GRAVITY');const g=V.results('gravity',base);assert.equal(V.results('gravity',{...base,r:8}).force,g.force/4);assert.equal(V.results('gravity',{...base,m1:50,m2:50}).force,g.force*4);
for(const mass of [1,3,6])for(const right of [0,10,24])for(const left of [0,4,24]){const r=V.results('forces',{mass,right,left});assert.equal(r.acceleration,(right-left)/mass);}
for(const friction of [false,true])for(const rampStep of [0,1,2]){const r=V.results('mechanical',{friction,rampStep});assert(Math.abs(r.pe+r.ke+r.thermal-98)<1e-10);assert(r.ke>=0&&r.thermal>=0);}
for(const finalTemp of [10,20,35,70])for(const sampleMass of [10,20,50]){const r=V.results('calorimetry',{finalTemp,initialTemp:20,sampleMass,specificHeat:4});assert.equal(r.Q,sampleMass*4*(finalTemp-20));}
for(const frequency of [1,2,3,4]){const r=V.results('wave',{frequency});assert.equal(r.wavelength*frequency,12);}
assert.equal(V.results('rays',{angle:0}).refracted,0);assert(V.results('rays',{angle:40}).refracted<40);
assert.equal(V.results('weight',{world:'earth',fallTime:2,released:true}).distance,19.6);
let game=V.initial('CODING.SCHOOL.DEBUG');for(let i=0;i<3;i++)game=V.reduce('CODING.SCHOOL.DEBUG',2,game,'collect');assert.equal(game.score,1);game=V.reduce('CODING.SCHOOL.DEBUG',2,game,'rule','add');game=V.reduce('CODING.SCHOOL.DEBUG',2,game,'restart');for(let i=0;i<3;i++)game=V.reduce('CODING.SCHOOL.DEBUG',2,game,'collect');assert.equal(game.score,3);
const web=C.coding.find(l=>l.id==='CODING.SCHOOL.HTML');const code='<h1>My own page</h1><script>parent.evil=1</script><img src="https://example.com/tracker">';
const html=V.render(web,{teachIndex:2,teachingLab:{steps:{2:{...V.initial(web),webCode:code}}}});assert(html.includes('sandbox=""'));assert(html.includes('default-src'));assert(!html.includes('<script>parent.evil'));
const preview=V.previewDocument('<img src="robot.svg" alt="robot">');assert(preview.includes('data:image/svg+xml'));assert(preview.includes("form-action 'none'"));assert(preview.includes("base-uri 'none'"));
// Exercise the real app save/read-aloud adapter against deterministic fake durable storage.
let app=read('app.js').replace('  function idbPut(value, key = STATE_KEY){','  function idbPut(value, key = STATE_KEY){if(globalThis.__fail)return Promise.reject(new Error("synthetic disk failure"));globalThis.__db[key]=JSON.parse(JSON.stringify(value));return Promise.resolve(true);').replace('  async function persistenceHealthCheck(){','  async function persistenceHealthCheck(){return true;');
app=app.replace('  init();',`  window.testVisual={state:()=>state,current:()=>current,shell,firstRunView,mirrorAheadView,primaryMissingView,reset(){state=normalizeStateShape(freshState());saveHealthy=true;backupMirrorHealthy=true;redundancyComparison="IN_SYNC";firstRunDecisionRequired=false;storageRecoveryIssue=null;lastDurableState=JSON.parse(JSON.stringify(state));lastDurableRevision=0;current=null;},reload(){state=normalizeStateShape(JSON.parse(JSON.stringify(globalThis.__db.michael)));lastDurableState=JSON.parse(JSON.stringify(state));saveHealthy=true;current={lesson:lessonById(state.activeSession.lessonId),session:state.activeSession};},unlock(){saveHealthy=true;}};`);
ctx.LEVEL_UP_RUNTIME_GATE={evaluate:()=>({allowed:true,reason:'SYNTHETIC_TEST_ONLY'})};vm.runInNewContext(app,ctx,{filename:'app.js'});const T=ctx.testVisual;T.reset();
for(const view of [()=>T.shell('<p>Directions</p>'),T.firstRunView,T.mirrorAheadView,T.primaryMissingView]){const h=view();assert(h.includes('Read this page'));assert(h.includes('id="learningPage"'));for(const a of ['pause','resume','cancel'])assert(h.includes("speechControl('"+a+"')"));}
await ctx.MLUL.startLesson('SCI.CIRCUITS.PATH','Science');assert(T.current());
await ctx.MLUL.advanceScienceTeach();await ctx.MLUL.advanceScienceTeach();assert.equal(T.current().session.teachIndex,2);
await ctx.MLUL.changeTeachingModel('closed',true);T.reload();assert.equal(T.current().session.teachingLab.steps[2].closed,true);assert.equal(T.current().session.teachingLab.steps[2].returnWire,false);
await ctx.MLUL.changeTeachingModel('returnWire',true);assert.equal(V.results('circuit',T.current().session.teachingLab.steps[2]).current,.4);
assert.equal(T.state().evidence.length,0);assert.equal(Object.keys(T.state().trackASkillState).length,0);assert(T.current().session.teachingLab.actions.every(x=>x.masteryEvidence===false));
const savedModel=JSON.stringify(T.current().session.teachingLab),savedSnapshot=JSON.stringify(ctx.__db.michael);ctx.__fail=true;assert.equal(await ctx.MLUL.changeTeachingModel('closed',false),false);assert.equal(JSON.stringify(ctx.__db.michael),savedSnapshot);assert.equal(JSON.stringify(T.current().session.teachingLab),savedModel);ctx.__fail=false;T.unlock();
elements.set('teachAccess',{value:'',dataset:{}});ctx.MLUL.readCurrentPage();assert.equal(elements.get('teachAccess').value,'SYSTEM_READ_ALOUD');assert.equal(T.current().session.teach_access_condition_source,'OBSERVED');assert(spoken.join(' ').includes('missing return connection'));assert(spoken.join(' ').includes('battery terminals'));await ctx.MLUL.manualSave();T.reload();assert.equal(T.current().session.teach_access_condition,'SYSTEM_READ_ALOUD');
ctx.MLUL.speechControl('pause');assert(ctx.paused);ctx.MLUL.speechControl('resume');assert(!ctx.paused);
await ctx.MLUL.advanceScienceTeach();assert.equal(T.current().session.teach_access_condition,null);assert.equal(T.current().session.teachingPageAccess[2].access_condition,'SYSTEM_READ_ALOUD');
// Controlled Science Gap keeps its protocol: read instructions, never the test item or choices.
ctx.location.hash='#science-gap';T.state().scienceGapActiveSession={status:'ACTIVE'};ctx.MLUL.readCurrentPage();assert(spoken.join(' ').includes('directions only'));assert(!spoken.join(' ').includes('battery terminals'));assert(T.shell('').includes('Read instructions'));
T.state().scienceGapActiveSession=null;ctx.location.hash='#dashboard';elements.delete('teachAccess');elements.set('learningPage',{innerText:'Your daily directions: start a science lesson.'});ctx.MLUL.readCurrentPage();assert(spoken.join(' ').includes('Your daily directions'));
assert(ctx.LEVEL_UP_STATE_INTEGRITY.validateCurrentState(T.state()));
console.log('Visual teaching: 48 lessons, four-stage visuals, physics oracles, coding sandbox, saved model/recovery, universal reading and diagnostic access PASS');
