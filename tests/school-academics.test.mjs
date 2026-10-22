import fs from 'node:fs';
import vm from 'node:vm';
import assert from 'node:assert/strict';
const root=new URL('../',import.meta.url);
const source=f=>fs.readFileSync(new URL(f,root),'utf8');
const ctx={console,Date,Math,JSON,Map,Set,Number,String,Object,Array,RegExp,Error,Promise,setTimeout,clearTimeout};
ctx.window=ctx;ctx.globalThis=ctx;ctx.scrollTo=()=>{};
ctx.location={hash:'#track-b-math'};ctx.navigator={storage:{}};ctx.alert=()=>{};
ctx.speechSynthesis={cancel(){},pause(){},resume(){},speak(){}};
ctx.SpeechSynthesisUtterance=function(text){this.text=text;};
const elements=new Map([['app',{innerHTML:''}],['saveStatus',{}],['feedback',{}]]);
let choice=null;
ctx.document={getElementById:id=>elements.get(id)||null,querySelector:s=>s==='input[name=answer]:checked'?choice:null,querySelectorAll:()=>[]};
for(const f of ['content.js','science-school.js','school-academics.js','science-curriculum.js','science-gap-diagnostic.js','review-engine.js','state-integrity.js'])vm.runInNewContext(source(f),ctx,{filename:f});
const A=ctx.LEVEL_UP_SCHOOL_ACADEMICS,C=ctx.LEVEL_UP_CONTENT,R=ctx.LEVEL_UP_REVIEW_ENGINE;
assert.equal(A.math.length,10);assert.equal(A.ela.length,10);
assert.equal(C.science.length,30);assert.equal(C.math.length,12);assert.equal(C.ela.length,10);
assert.equal(C.schoolPlan.urgent.testDate,'2026-09-29','Keep the existing earlier school plan and game IDs');
assert.equal(new Set([...C.science,...C.math,...C.ela].map(l=>l.id)).size,52);
for(const subject of ['math','ela'])assert.equal(C.academicLearningPlans[subject].firstLessonId,A[subject][0].id);
for(const l of A.lessons){
 assert.equal(l.teach.length,4);assert(l.stagedTeach);
 // Corrected Oct 21 2026: the fourth item tests the same lesson, so it is an independent check, not a mixed old-and-new item.
 assert.deepEqual(Array.from(l.checks.slice(0,4).map(q=>q.stage)),['GUIDED_PRACTICE','FADE_HELP','INDEPENDENT_CHECK','INDEPENDENT_CHECK']);
 assert(l.checks.at(-1).rubric);assert(!('free' in l.checks.at(-1)));
 for(const q of l.checks.filter(q=>q.choices)){assert(q.choices[q.answer]);assert.equal(new Set(q.choices).size,q.choices.length);}
 const prompts=new Set();
 for(const w of ['Day 2','Day 7','Day 21']){
  const items=R.generateReview(l.id,w,'academic-'+l.id+'-'+w);
  assert.equal(items.length,3);
  for(const q of items){
   assert(!l.checks.some(c=>c.q===q.q),'Never reuse immediate prompts');
   assert(!prompts.has(q.q),l.id+' must use different prompts across review windows');prompts.add(q.q);
   if(q.choices){assert(q.choices[q.answer]);assert.equal(new Set(q.choices).size,q.choices.length);}else assert(Number.isFinite(Number(q.free)));
  }
  assert.deepEqual(JSON.parse(JSON.stringify(items)),JSON.parse(JSON.stringify(R.generateReview(l.id,w,'academic-'+l.id+'-'+w))),'A saved review reconstructs exactly');
  // Corrected Oct 21 2026: transfer is marked on the genuinely new item, wherever it sits in the window.
  assert.equal(items.filter(q=>q.transfer).length,w==='Day 21'?1:0,l.id+' '+w+' transfer count');
 }
}
// Check generated mathematics independently over multiple parameter values and windows.
// Corrected Oct 21 2026: Day 7 and Day 21 now use different templates, so these Day 2 formulas apply to Day 2 only.
// tests/instructional-integrity.test.mjs checks every Day 7 and Day 21 template against independent answers.
for(const w of ['Day 2'])for(let seed=0;seed<24;seed++){
 const value=seed/24,n={'Day 2':0,'Day 7':1,'Day 21':2}[w],a=2+Math.floor(value*4),b=3+Math.floor(value*7),x=2+n;
 const ask=key=>A.delayedChecks(A.math.find(l=>l.id.endsWith('.'+key)),w,()=>value);
 assert.equal(Number(ask('FUNCTION')[0].free),a*x+b);
 assert.equal(Number(ask('LINEAR')[0].free),a);
 assert.equal(Number(ask('SLOPE')[0].free),n===1?-a:a);
 assert.equal(Number(ask('INTERCEPT')[0].free),b);
 assert.equal(Number(ask('EQUATION')[1].free),a*(x+1)+b);
 assert.equal(Number(ask('GRAPH')[2].free),a*(x+2)+b);
 assert.equal(Number(ask('CONTEXT')[1].free),a*x+b);
 assert.equal(Number(ask('CONTEXT_DOMAIN')[0].free),4+n);
}
assert.match(A.diagram('slope'),/Right 1, up 2/);assert.equal(A.diagram('unknown'),'');
// Exercise production lesson rendering, saved progress, subject routing, writing and review completion.
let app=source('app.js');
app=app.replace('  async function save(reason="update"){','  async function save(reason="update"){ if(globalThis.__testFailSave)return false; globalThis.__testWrites.push(JSON.parse(JSON.stringify(state))); return true;');
app=app.replace('  async function persistenceHealthCheck(){','  async function persistenceHealthCheck(){return true;');
app=app.replace('  init();',[
 '  window.testAcademics={',
 '  reset(id){state=freshState();state.schoolFacts=[];state.evidence=[{id:"previous_evidence",skillId:"SCI.WAVES.TYPES",rawResponse:"preserve me",instruction_exposure_status:"PRIOR_INSTRUCTION"}];state.lessonState["SCI.WAVES.TYPES"]={status:"COMPLETED",score:67};saveHealthy=true;backupMirrorHealthy=true;redundancyComparison="SYNCED";firstRunDecisionRequired=false;storageRecoveryIssue=null;const lesson=lessonById(id);const session={id:"academic_test_"+id,mode:"LESSON",track:"B",subject:lesson.subject,lessonId:id,phase:"TEACH",teachIndex:0,instructionDelivered:true,status:"ACTIVE",startedAt:now(),itemIndex:0,responses:[],teach_access_condition:null,teach_access_condition_source:"UNRECORDED"};current={lesson,session};state.activeSession=session;upsertSessionRecord(session);return session;},',
 '  state:()=>state,current:()=>current,interrupt(){state.activeSession=JSON.parse(JSON.stringify(current.session));state.activeSession.status="PAUSED";current=null;},',
 '  trackB,renderLessonTeach,renderQuestion,finishLesson,parentView,scienceExplanationSection,trackAPriorInstruction,allLessons,renderReviewQuestion,scienceGapEligibleItems',
 '  };'
].join('\n'));
ctx.__testWrites=[];ctx.__testFailSave=false;
ctx.LEVEL_UP_RUNTIME_GATE={evaluate:()=>({allowed:true,reason:'SYNTHETIC_TEST_ONLY'})};
vm.runInNewContext(app,ctx,{filename:'app.js'});
const T=ctx.testAcademics;
for(const subject of ['math','ela']){
 let session=T.reset(A[subject][0].id);
 T.renderLessonTeach();assert.match(elements.get('app').innerHTML,/Teaching block 1 of 4/);
 assert(!elements.get('app').innerHTML.includes('Circuit model'),'Academic teaching must not show unrelated circuit diagrams');
 await ctx.MLUL.advanceScienceTeach();assert.equal(session.teachIndex,1);
 T.interrupt();await ctx.MLUL.resumeInterruptedSession();session=T.state().activeSession;
 assert.equal(session.teachIndex,1);assert.equal(T.current().lesson.subject,subject);
 ctx.__testFailSave=true;await ctx.MLUL.advanceScienceTeach();assert.equal(session.teachIndex,1);ctx.__testFailSave=false;
 await ctx.MLUL.advanceScienceTeach();await ctx.MLUL.advanceScienceTeach();
 session.phase='CHECK_AFTER_TEACH';session.itemIndex=2;
 const lesson=T.current().lesson;choice={value:String(lesson.checks[2].answer)};
 await ctx.MLUL.submitAnswer();
 assert.equal(T.state().evidence.at(-1).subject,subject);assert.equal(T.state().evidence.at(-1).assistance_level,'INDEPENDENT');
 assert.equal(T.state().evidence.at(-1).instruction_exposure_status,'PRIOR_INSTRUCTION');
 session.itemIndex=4;choice=null;elements.set('freeAnswer',{value:'My own explanation with evidence.'});await ctx.MLUL.submitAnswer();
 const written=T.state().evidence.at(-1);assert.equal(written.isCorrect,null);assert(written.requires_review);assert.equal(written.rawResponse,'My own explanation with evidence.');
 await T.finishLesson();
 assert.equal(T.state().lessonState[lesson.id].score,100);assert.equal(T.state().lessonState[lesson.id].scoredCount,1);assert.equal(T.state().lessonState[lesson.id].pendingExplanationCount,1);
 assert.equal(T.state().reviewSchedule.length,3);assert(T.state().reviewSchedule.every(q=>q.subject===subject));
 assert.equal(T.state().evidence[0].rawResponse,'preserve me');assert.equal(T.state().lessonState['SCI.WAVES.TYPES'].score,67);
 assert.equal(Object.keys(T.state().trackASkillState).length,0);
 assert.match(T.parentView(),/My own explanation with evidence/);
 assert.match(T.parentView(),/ELA teaching skill map/);
 assert.match(T.trackB(subject),/Start (Math|ELA) foundations/);
 const review=T.state().reviewSchedule[0];review.dueAt='2020-01-01T00:00:00Z';
 await ctx.MLUL.startReview(review.id);assert.equal(T.current().reviewItems.length,3);assert.equal(T.state().activeSession.subject,subject);
 const q=T.current().reviewItems[0];choice=q.choices?{value:String(q.answer)}:null;
 if(!q.choices)elements.set('freeAnswer',{value:q.free});
 await ctx.MLUL.submitReviewAnswer();assert.equal(T.state().evidence.at(-1).evidenceType,'DELAYED_RETRIEVAL');assert.equal(T.state().evidence.at(-1).subject,subject);assert.equal(T.state().evidence.at(-1).isCorrect,true);
}
T.reset('MATH.SCHOOL.INTERCEPT');
assert(T.trackAPriorInstruction('MATH.TWO_STEP_EQUATIONS'),'Delivered mapped instruction is not a clean math baseline');
assert(!T.trackAPriorInstruction('MATH.DISTRIBUTIVE'),'Unrelated skills remain unmarked');
assert.equal(T.allLessons().length,52);
T.reset('MATH.SCHOOL.GRAPH');await ctx.MLUL.advanceScienceTeach();assert.match(elements.get('app').innerHTML,/Graph of y equals 2x plus 1/);
assert.match(T.trackB('ela'),/The Wanderings of Odysseus/);assert.match(T.trackB('math'),/domain and range/);
assert.doesNotMatch(T.trackB('ela'),/Alexis.Walker|@gcps|October 28|Interim grades|conference/i,'No private email, schedule, or grade details in public lesson UI');
const index=source('index.html');assert(index.indexOf('school-academics.js')<index.indexOf('review-engine.js'));
assert.match(index,/school-academics\.js\?v=\d{4}-\d{2}-\d{2}-[a-z0-9-]+/);
if(process.env.ACADEMIC_QA_DIR){
 const dir=process.env.ACADEMIC_QA_DIR;fs.mkdirSync(dir,{recursive:true});
 const wrap=(title,body)=>'<!doctype html><html><head><meta name="viewport" content="width=device-width, initial-scale=1"><title>'+title+'</title><link rel="stylesheet" href="styles.css"></head><body>'+body+'</body></html>';
 fs.writeFileSync(dir+'/index.html',wrap('Math learning plan preview',T.trackB('math')));
 fs.writeFileSync(dir+'/ela.html',wrap('ELA learning plan preview',T.trackB('ela')));
 fs.writeFileSync(dir+'/graph.html',wrap('Graphing teaching preview',elements.get('app').innerHTML));
 T.reset('ELA.ODYSSEUS.WORD_CHOICE');await ctx.MLUL.advanceScienceTeach();fs.writeFileSync(dir+'/reading.html',wrap('ELA teaching preview',elements.get('app').innerHTML));
 fs.copyFileSync(new URL('styles.css',root),dir+'/styles.css');
}
console.log('School Math and ELA content, calculations, persisted teaching/reviews, writing, and preserved evidence: PASS');
