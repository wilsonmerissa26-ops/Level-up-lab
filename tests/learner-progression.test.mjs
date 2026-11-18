import fs from 'node:fs';import vm from 'node:vm';import assert from 'node:assert/strict';
const read=f=>fs.readFileSync(new URL('../'+f,import.meta.url),'utf8');
const elements=new Map([['app',{innerHTML:''}],['saveStatus',{}],['pageAudioStatus',{}]]),mirror=new Map(),spoken=[];
const ctx={console,Date,Math,JSON,Map,Set,Number,String,Object,Array,RegExp,Error,Promise,URL,setTimeout,clearTimeout};
Object.assign(ctx,{window:ctx,globalThis:ctx,location:{hash:'#dashboard'},navigator:{storage:{}},scrollTo(){},scrollY:0,alert(m){ctx.alerts.push(m)},alerts:[],__db:{},__fail:false,SpeechSynthesisUtterance:class{constructor(t){this.text=t}},speechSynthesis:{cancel(){spoken.length=0},pause(){ctx.paused=true},resume(){ctx.paused=false},speak(u){spoken.push(u.text)}},localStorage:{getItem:k=>mirror.get(k)||null,setItem:(k,v)=>mirror.set(k,v)},document:{getElementById:id=>elements.get(id)||null,querySelector:()=>null,querySelectorAll:()=>[]}});
for(const f of ['content.js','science-school.js','science-motion.js','school-coding.js','school-academics.js','question-revisions.js','academic-activities.js','learner-repair.js','visual-teaching.js','learner-progression.js','science-curriculum.js','science-gap-diagnostic.js','review-engine.js','school-homework.js','state-integrity.js'])vm.runInNewContext(read(f),ctx,{filename:f});
const V=ctx.LEVEL_UP_VISUAL_TEACHING,C=ctx.LEVEL_UP_CONTENT;
let app=read('app.js').replace('  function idbPut(value, key = STATE_KEY){','  function idbPut(value, key = STATE_KEY){if(globalThis.__fail)return Promise.reject(new Error("synthetic disk failure"));globalThis.__db[key]=JSON.parse(JSON.stringify(value));return Promise.resolve(true);').replace('  async function persistenceHealthCheck(){','  async function persistenceHealthCheck(){return true;');
app=app.replace('  init();',`  window.testVisual={state:()=>state,current:()=>current,isReady,shell,firstRunView,mirrorAheadView,primaryMissingView,pause(){current=null;state.activeSession.status="INTERRUPTED_PRESERVED";},reset(){state=normalizeStateShape(freshState());saveHealthy=true;backupMirrorHealthy=true;redundancyComparison="IN_SYNC";firstRunDecisionRequired=false;storageRecoveryIssue=null;lastDurableState=JSON.parse(JSON.stringify(state));lastDurableRevision=0;current=null;},reload(){state=normalizeStateShape(JSON.parse(JSON.stringify(globalThis.__db.michael)));lastDurableState=JSON.parse(JSON.stringify(state));saveHealthy=true;current={lesson:lessonById(state.activeSession.lessonId),session:state.activeSession};},unlock(){saveHealthy=true;}};`);
ctx.LEVEL_UP_RUNTIME_GATE={evaluate:()=>({allowed:true,reason:'SYNTHETIC_TEST_ONLY'})};vm.runInNewContext(app,ctx,{filename:'app.js'});const T=ctx.testVisual;T.reset();


const P=ctx.LEVEL_UP_PROGRESSION;
await ctx.MLUL.startLesson('SCI.CIRCUITS.PATH','science');
assert.equal(P.activity(T.current().lesson,T.current().session).applies,false,'I Show is free to navigate');
await ctx.MLUL.advanceScienceTeach();assert.equal(T.current().session.teachIndex,1);await ctx.MLUL.advanceScienceTeach();assert.equal(T.current().session.teachIndex,2);
assert.equal(P.activity(T.current().lesson,T.current().session).ready,false);
await ctx.MLUL.advanceScienceTeach();assert.equal(T.current().session.teachIndex,2,'Backend blocks skip, not just a disabled button');
await ctx.MLUL.changeTeachingModel('closed',true);assert.equal(P.activity(T.current().lesson,T.current().session).ready,false,'One repaired gap is insufficient');
await ctx.MLUL.changeTeachingModel('returnWire',true);assert.equal(P.activity(T.current().lesson,T.current().session).ready,false,'Materials are still unchecked');
await ctx.MLUL.changeTeachingModel('copperRole','insulator');await ctx.MLUL.changeTeachingModel('rubberRole','insulator');assert.equal(P.activity(T.current().lesson,T.current().session).ready,false);
await ctx.MLUL.changeTeachingModel('copperRole','conductor');assert.equal(P.activity(T.current().lesson,T.current().session).ready,true);
const evidenceBefore=JSON.stringify(T.state().evidence);await ctx.MLUL.advanceScienceTeach();assert.equal(T.current().session.teachIndex,3);assert.equal(JSON.stringify(T.state().evidence),evidenceBefore);assert.equal(Object.keys(T.state().trackASkillState).length,0);
function session(id,model){return {phase:'TEACH',teachIndex:2,teachingLab:{steps:{2:model},actions:[]}};}
for(const l of [...C.science,...C.coding]){
 const initial=V.initial(l,2),r=P.activity(l,session(l.id,initial));assert.equal(r.applies,true,l.id);assert.equal(r.ready,false,l.id+' starts before required participation');assert.equal(P.activity(l,{phase:'TEACH',teachIndex:0}).ready,true);
}
const code=C.coding.find(l=>l.id.endsWith('.DEBUG'));let m=V.initial(code,2);for(let i=0;i<3;i++)m=V.reduce(code,2,m,'collect');assert.equal(P.activity(code,session(code.id,m)).ready,false);m=V.reduce(code,2,m,'rule','add');m=V.reduce(code,2,m,'restart');for(let i=0;i<3;i++)m=V.reduce(code,2,m,'collect');assert.equal(P.activity(code,session(code.id,m)).ready,true);
const web=C.coding.find(l=>l.id.endsWith('.HTML')),base=V.initial(web,2);assert.equal(P.activity(web,session(web.id,{...base,webCode:base.webCode+'\n<!-- comment -->'})).ready,false);assert.equal(P.activity(web,session(web.id,{...base,webCode:base.webCode.replace('Robot Rescue','Beacon Rescue')})).ready,true);
const A=ctx.LEVEL_UP_ACADEMIC_ACTIVITIES;
for(const l of [...C.math,...C.ela].filter(l=>l.stagedTeach)){
 const a=A.config(l);assert(a);const base={phase:'TEACH',teachIndex:2};
 assert.equal(P.activity(l,base).ready,false);
 assert.equal(P.activity(l,{...base,studentExercise:{2:{value:3,selection:0,interactionObserved:true,correct:true}}}).ready,false,'Old generic actions cannot unlock '+l.id);
 const wrong=String(a.choices?(a.answer+1)%a.choices.length:a.answer+1);
 assert.equal(P.activity(l,{...base,studentExercise:{2:{activityId:a.id,response:wrong,correct:true}}}).ready,false,'Recompute, never trust the stored correct flag');
 assert.equal(P.activity(l,{...base,studentExercise:{2:{activityId:a.id,response:String(a.answer),correct:false}}}).ready,true,l.id+' matching response qualifies');
 assert.equal(P.activity(l,{phase:'TEACH',teachIndex:0}).applies,false,'I Show remains free');
}
T.reset();await ctx.MLUL.startLesson('MATH.SCHOOL.SLOPE','math');await ctx.MLUL.advanceScienceTeach();await ctx.MLUL.advanceScienceTeach();
assert.equal(await ctx.MLUL.advanceScienceTeach(),false);assert.equal(T.current().session.teachIndex,2);
await ctx.MLUL.respondAcademicActivity('2');assert.equal(await ctx.MLUL.advanceScienceTeach(),false);
await ctx.MLUL.respondAcademicActivity('-2');T.reload();await ctx.MLUL.advanceScienceTeach();assert.equal(T.current().session.teachIndex,3);

T.state().lessonState['MATH.INVERSE_OPERATIONS']={status:'COMPLETED',score:0};assert.equal(T.isReady(C.math.find(l=>l.id==='MATH.LITERAL_EQUATIONS')),true,'A low score does not add a next-lesson lock');
console.log('We Try participation: backend gate, free I Show, saved circuit/materials, all visual families, coding/web/academic activity and unchanged low-score eligibility PASS');
