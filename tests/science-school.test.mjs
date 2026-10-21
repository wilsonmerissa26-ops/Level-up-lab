import fs from 'node:fs';
import vm from 'node:vm';
import assert from 'node:assert/strict';
const root=new URL('../',import.meta.url);
const source=f=>fs.readFileSync(new URL(f,root),'utf8');
const ctx={console,Date,Math,JSON,Map,Set,Number,String,Object,Array,RegExp,Error,Promise,setTimeout,clearTimeout};
ctx.window=ctx;ctx.globalThis=ctx;ctx.scrollTo=()=>{};
ctx.location={hash:'#track-b'};ctx.navigator={storage:{}};ctx.alert=()=>{};
ctx.speechSynthesis={cancel(){},pause(){},resume(){},speak(){}};
ctx.SpeechSynthesisUtterance=function(text){this.text=text;};
const elements=new Map([['app',{innerHTML:''}],['saveStatus',{}],['feedback',{}]]);
let choice=null;
ctx.document={
 getElementById:id=>elements.get(id)||null,
 querySelector:s=>s==='input[name=answer]:checked'?choice:null,
 querySelectorAll:()=>[]
};
for(const f of ['content.js','science-school.js','science-curriculum.js','science-gap-diagnostic.js','review-engine.js','state-integrity.js'])vm.runInNewContext(source(f),ctx,{filename:f});
const C=ctx.LEVEL_UP_CONTENT,S=ctx.LEVEL_UP_SCHOOL_SCIENCE;
assert.equal(S.lessons.length,11);
assert.equal(C.science.length,30);
assert.equal(C.scienceLearningPlan.firstLessonId,'SCI.CIRCUITS.PATH');
assert.equal(C.scienceLearningPlan.deadline,null,'Do not invent a test deadline');
assert.equal(C.scienceLearningPlan.groups.flatMap(g=>g.ids).length,30);
assert.equal(new Set(C.science.map(l=>l.id)).size,30);
assert.equal(ctx.LEVEL_UP_SCIENCE_CURRICULUM.standardsCoverage().missing.length,0);
for(const l of S.lessons){
 assert.equal(l.teach.length,4);
 assert(l.stagedTeach);
 assert(l.checks.some(q=>q.stage==='GUIDED_PRACTICE'));
 assert(l.checks.some(q=>q.stage==='FADE_HELP'));
 assert(l.checks.some(q=>q.stage==='INDEPENDENT_CHECK'||q.stage==='MIX_OLD_AND_NEW'));
 assert(l.checks.some(q=>q.rubric&&!('free' in q)),'Writing must be reviewed, not string-matched');
 assert(ctx.LEVEL_UP_SCIENCE_CURRICULUM.legacyAlignment[l.id]);
 for(const q of l.checks.filter(q=>q.choices))assert(q.choices[q.answer]);
 const seen=new Set();
 for(const w of ['Day 2','Day 7','Day 21']){
  const items=ctx.LEVEL_UP_REVIEW_ENGINE.generateReview(l.id,w,l.id+w);
  assert.equal(items.length,3);
  assert(items.every(q=>q.choices[q.answer]));
  assert(items.every(q=>!l.checks.some(c=>c.q===q.q)));
  for(const q of items){assert(!seen.has(q.q),l.id+' must use different prompts across delayed windows');seen.add(q.q);}
  if(w==='Day 21')assert(items.some(q=>q.transfer));
 }
}
// Kirchhoff and Ohm relationships: unequal branches, series sums, fixed voltage.
for(const v of [3,9,12,24])for(const r1 of [15,30,60])for(const r2 of [20,40,100]){
 const se=S.model(v,r1,r2,'series'),pa=S.model(v,r1,r2,'parallel');
 assert.equal(se.totalR,r1+r2);
 assert(Math.abs(se.v1+se.v2-v)<1e-10);
 assert.equal(se.i1,se.i2);
 assert.equal(pa.v1,v);assert.equal(pa.v2,v);
 assert(Math.abs(pa.i1+pa.i2-pa.totalI)<1e-10);
 assert(pa.totalR<Math.min(r1,r2));
}
assert.throws(()=>S.model(12,0,30,'series'));
assert.match(S.diagram('parallel'),/aria-label="Parallel/);
assert.match(S.diagram('closed'),/battery and a lamp/);
// Execute production render/transition/answer functions with an isolated test save adapter.
let app=source('app.js');
app=app.replace('  async function save(reason="update"){','  async function save(reason="update"){ if(globalThis.__testFailSave)return false; globalThis.__testWrites.push({reason,state:JSON.parse(JSON.stringify(state))}); return true;');
app=app.replace('  init();',[
 '  window.testScience={',
 '    reset(id){state=freshState();state.schoolFacts=[];saveHealthy=true;backupMirrorHealthy=true;redundancyComparison="SYNCED";firstRunDecisionRequired=false;storageRecoveryIssue=null;const lesson=lessonById(id);const session={id:"synthetic_science_session",mode:"LESSON",track:"B",subject:"science",lessonId:id,phase:"TEACH",teachIndex:0,instructionDelivered:true,status:"ACTIVE",startedAt:now(),itemIndex:0,responses:[],teach_access_condition:null,teach_access_condition_source:"UNRECORDED"};current={lesson,session};state.activeSession=session;upsertSessionRecord(session);return session;},',
 '    state:()=>state,current:()=>current,interrupt(){state.activeSession=JSON.parse(JSON.stringify(current.session));state.activeSession.status="PAUSED";current=null;},',
 '    trackB,renderLessonTeach,renderQuestion,finishLesson,scienceGapEligibleItems,scienceGapCurrentItem,scienceExplanationSection',
 '  };'
].join('\n'));
ctx.__testWrites=[];ctx.__testFailSave=false;
ctx.LEVEL_UP_RUNTIME_GATE={evaluate:()=>({allowed:true,reason:'SYNTHETIC_TEST_ONLY'})};
vm.runInNewContext(app,ctx,{filename:'app.js'});
const T=ctx.testScience;
let session=T.reset('SCI.CIRCUITS.PATH');
T.renderLessonTeach();
assert.match(elements.get('app').innerHTML,/Teaching block 1 of 4/);
assert(!elements.get('app').innerHTML.includes('Continue to supported practice'));
await ctx.MLUL.advanceScienceTeach();
assert.equal(session.teachIndex,1);
assert.equal(ctx.__testWrites.at(-1).state.activeSession.teachIndex,1);
assert.match(elements.get('app').innerHTML,/Closed circuit model/);
T.interrupt();
await ctx.MLUL.resumeInterruptedSession();
session=T.state().activeSession;
assert.equal(session.teachIndex,1,'Saved teaching position survives explicit resume');
assert.match(elements.get('app').innerHTML,/Teaching block 2 of 4/);
ctx.__testFailSave=true;
await ctx.MLUL.advanceScienceTeach();
assert.equal(session.teachIndex,1,'Failed save cannot skip a teaching block');
ctx.__testFailSave=false;
await ctx.MLUL.advanceScienceTeach();await ctx.MLUL.advanceScienceTeach();
assert.match(elements.get('app').innerHTML,/Continue to supported practice/);
// Submitted support evidence, independent evidence, and ungraded writing are distinct.
session.phase='CHECK_AFTER_TEACH';
const independent=C.science.find(l=>l.id===session.lessonId).checks[2];
session.itemIndex=2;choice={value:String(independent.answer)};
await ctx.MLUL.submitAnswer();
assert.equal(T.state().evidence.at(-1).assistance_level,'INDEPENDENT');
assert.equal(T.state().evidence.at(-1).instruction_exposure_status,'PRIOR_INSTRUCTION');
assert.equal(T.state().evidence.at(-1).teaching_stage,'INDEPENDENT_CHECK');
session.itemIndex=3;choice=null;
elements.set('freeAnswer',{value:'The loose connector breaks the only path.'});
await ctx.MLUL.submitAnswer();
const writing=T.state().evidence.at(-1);
assert.equal(writing.isCorrect,null);
assert.equal(writing.requires_review,true);
assert.equal(writing.rawResponse,'The loose connector breaks the only path.');
assert.match(T.scienceExplanationSection(),/loose connector/);
await T.finishLesson();
assert.equal(T.state().lessonState['SCI.CIRCUITS.PATH'].score,100);
assert.equal(T.state().lessonState['SCI.CIRCUITS.PATH'].scoredCount,1);
assert.equal(T.state().lessonState['SCI.CIRCUITS.PATH'].pendingExplanationCount,1);
assert.equal(T.state().reviewSchedule.length,3);
assert.equal(T.state().trackASkillState['SCI.CIRCUITS.PATH'],undefined);
assert.equal(T.state().evidence.length,2,'Finishing does not reset prior answers');
assert(!T.scienceGapEligibleItems().some(q=>q.targetId==='SCI.S8P5B.CONDUCTORS_INSULATORS'));
const untouched=T.scienceGapEligibleItems().map(x=>x.id);
assert(untouched.length>0);
assert.equal(T.scienceGapCurrentItem({coldItemIds:[untouched.at(-1)],itemIndex:0}).id,untouched.at(-1),'Active baseline uses pinned items');
assert.match(T.trackB(),/electricity and circuits/i);
assert.doesNotMatch(T.trackB(),/Friday, October 2/);
assert.doesNotMatch(T.trackB(),/GA Power|Unit 2 reassessment|Science Interim/,'Email school-event details must not enter public teaching code');
// Optional read-only visual fixture made from the actual production render output.
if(process.env.SCIENCE_QA_DIR){
 const dir=process.env.SCIENCE_QA_DIR;fs.mkdirSync(dir,{recursive:true});
 const wrap=(title,body)=>'<!doctype html><html><head><meta name="viewport" content="width=device-width, initial-scale=1"><title>'+title+'</title><link rel="stylesheet" href="styles.css"></head><body>'+body+'</body></html>';
 fs.writeFileSync(dir+'/index.html',wrap('Science plan preview',T.trackB())+'<script src="content.js"></script><script src="science-school.js"></script>');
 T.reset('SCI.CIRCUITS.PATH');T.renderLessonTeach();fs.writeFileSync(dir+'/teaching.html',wrap('Teaching block preview',elements.get('app').innerHTML));
 await ctx.MLUL.advanceScienceTeach();fs.writeFileSync(dir+'/model.html',wrap('Circuit model preview',elements.get('app').innerHTML));
 for(const f of ['styles.css','content.js','science-school.js'])fs.copyFileSync(new URL(f,root),dir+'/'+f);
}
console.log('School science lessons, circuit physics, saved teaching steps, explanations, and baseline exclusions: PASS');
