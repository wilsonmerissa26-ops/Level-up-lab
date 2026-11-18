import fs from 'node:fs';
import vm from 'node:vm';
import assert from 'node:assert/strict';
const root=new URL('../',import.meta.url),read=f=>fs.readFileSync(new URL(f,root),'utf8');
const elements=new Map([['app',{innerHTML:''}],['saveStatus',{}],['cartResult',{}],['codeResult',{}],['scienceCart',{style:{}}]]);
const mirror=new Map();
const ctx={console,Date,Math,JSON,Map,Set,Number,String,Object,Array,RegExp,Error,Promise,URL,setTimeout,clearTimeout};
Object.assign(ctx,{window:ctx,globalThis:ctx,location:{hash:'#science-homework'},navigator:{storage:{}},scrollTo(){},alert(m){ctx.alerts.push(m);},alerts:[],__db:{},__fail:false,localStorage:{getItem:k=>mirror.get(k)||null,setItem:(k,v)=>mirror.set(k,v)},speechSynthesis:{cancel(){},pause(){},resume(){},speak(){}},document:{getElementById:id=>elements.get(id)||null,querySelector:()=>null,querySelectorAll:()=>[]}});
for(const f of ['content.js','science-school.js','science-motion.js','school-coding.js','school-academics.js','science-curriculum.js','science-gap-diagnostic.js','review-engine.js','school-homework.js','state-integrity.js'])vm.runInNewContext(read(f),ctx,{filename:f});
const C=ctx.LEVEL_UP_CONTENT,H=ctx.LEVEL_UP_HOMEWORK,M=ctx.LEVEL_UP_MOTION,K=ctx.LEVEL_UP_CODING,R=ctx.LEVEL_UP_REVIEW_ENGINE;
assert.equal(M.lessons.length,9);assert.equal(K.lessons.length,9);assert.equal(H.quizzes.length,10);
assert.equal(C.scienceLearningPlan.firstLessonId,'SCI.MOTION.DISTANCE');assert.equal(C.scienceLearningPlan.deadline,null);
assert.equal(C.math.length,12);assert.equal(C.ela.length,10);
assert.equal(new Set(C.scienceLearningPlan.groups.flatMap(g=>g.ids)).size,C.science.length);
for(const lesson of [...M.lessons,...K.lessons]){
 assert.equal(lesson.teach.length,4);assert(lesson.stagedTeach);assert(lesson.checks.at(-1).rubric);
 const seen=new Set(lesson.checks.map(q=>q.q));
 for(const w of ['Day 2','Day 7','Day 21'])for(const q of R.generateReview(lesson.id,w,'synthetic-'+w)){
  assert.equal(new Set(q.choices).size,q.choices.length,lesson.id+' has duplicate answers');assert(q.choices[q.answer]);
  assert(!seen.has(q.q),'Do not reuse an immediate or previous-window prompt');seen.add(q.q);
 }
}
// Independent numerical/semantic expectations for the authored immediate keys.
const expected={DISTANCE:['3 m/s','0 m','4 m/s','5 m/s west'],ACCELERATION:['+3 m/s²','−3 m/s²','+3 m/s²','It increases'],POSITION_GRAPH:['+2 m/s','Stopped','−3 m/s','Cumulative distance traveled'],VELOCITY_GRAPH:['+2 m/s²','Constant velocity, zero acceleration','+18 m','Speed increases in the negative direction'],FORCES:['7 N right','0 N','5 m/s² right','They act on different objects'],WEIGHT:['29.4 N','Mass','Have the same downward acceleration','No; stopping time or stopping process also matters'],GRAVITY:['One-fourth','Twice as large','It stays the same','Equal force magnitudes, different accelerations'],LAB:['7 cm','Time (s)','Ask how to recover or repeat it','Its initial/final velocities and elapsed time'],MAGNETS:['Repel','Strengthen the electromagnet','No','Mechanical to electrical']};
for(const l of M.lessons)assert.deepEqual(Array.from(l.checks.filter(q=>q.choices),q=>q.choices[q.answer]),expected[l.id.split('.').at(-1)]);
// Review formulas are checked across all windows, not inferred from answer placement.
for(const [w,m] of [['Day 2',2],['Day 7',3],['Day 21',4]]){
 const gravity=M.delayedChecks(M.lessons.find(l=>l.id.endsWith('.GRAVITY')),w);assert.equal(gravity[0].choices[gravity[0].answer],`1/${m*m}`);
 const a=M.delayedChecks(M.lessons.find(l=>l.id.endsWith('.ACCELERATION')),w);assert.equal(parseFloat(a[0].choices[a[0].answer]),12/m);
}
for(const quiz of H.quizzes){assert(quiz.practiceOnly);assert(quiz.checks.at(-1).rubric);assert(quiz.checks.every(q=>!q.transfer));}
assert(H.quizzes.find(q=>q.id==='PRACTICE.SCIENCE.SEMESTER').checks.length>=17);
assert.equal(H.safeUrl('javascript:alert(1)'), '');assert.equal(H.safeUrl('https://name:secret@example.com'),'');assert.equal(H.safeUrl('https://classroom.google.com/'),'https://classroom.google.com/');
assert.equal(H.dateKey(new Date(2026,10,18,23,30)),'2026-11-18');
let app=read('app.js').replace('  function idbPut(value, key = STATE_KEY){','  function idbPut(value, key = STATE_KEY){if(globalThis.__fail)return Promise.reject(new Error("synthetic disk failure"));globalThis.__db[key]=JSON.parse(JSON.stringify(value));return Promise.resolve(true);').replace('  async function persistenceHealthCheck(){','  async function persistenceHealthCheck(){return true;');
assert(app.includes('async function persistenceHealthCheck(){return true;'));
app=app.replace('  init();',`  window.testRecovery={state:()=>state,normalizeStateShape,scienceGapPriorInstruction,trackAPriorInstruction,render,trackB,codingView,reviewSeenPrompts,reset(){state=normalizeStateShape(freshState());saveHealthy=true;backupMirrorHealthy=true;redundancyComparison="IN_SYNC";firstRunDecisionRequired=false;storageRecoveryIssue=null;lastDurableState=JSON.parse(JSON.stringify(state));lastDurableRevision=0;current=null;},reload(){state=normalizeStateShape(JSON.parse(JSON.stringify(globalThis.__db.michael)));lastDurableState=JSON.parse(JSON.stringify(state));saveHealthy=true;},unlock(){saveHealthy=true;}};`);
ctx.LEVEL_UP_RUNTIME_GATE={evaluate:()=>({allowed:true,reason:'SYNTHETIC_TEST_ONLY'})};vm.runInNewContext(app,ctx,{filename:'app.js'});
const T=ctx.testRecovery;T.reset();
// Rendering is read-only and escapes private notes. No lifecycle/evidence changes.
T.state().schoolHomework.tasks.push({title:'<img src=x onerror=alert(1)>',subject:'Science',url:'javascript:alert(1)',status:'TO_VERIFY',note:'<script>oops</script>'});
const before=JSON.stringify(T.state());const html=H.render(T.state());assert.equal(JSON.stringify(T.state()),before);assert(!html.includes('<img src=x'));assert(!html.includes('href="javascript:'));assert(html.includes('&lt;script&gt;'));
assert.match(T.trackB(),/Motion &amp; Forces|Motion & Forces/);assert.match(T.codingView(),/MakeCode Arcade/);
// Resource use persists, survives reload, and conservatively excludes taught targets from cold baselines.
elements.set('seen-free-body',{checked:true});elements.set('note-free-body',{value:'Forces act on one object.'});await ctx.MLUL.saveHomeworkResource('free-body');
assert.equal(T.state().schoolHomework.resources['free-body'].viewed,true);T.reload();assert.equal(T.state().schoolHomework.resources['free-body'].note,'Forces act on one object.');assert(T.scienceGapPriorInstruction({targetId:'SCI.S8P3B.BALANCED_FORCES'}));assert(T.trackAPriorInstruction('MATH.INTEGER_OPS'));
elements.get('seen-free-body').checked=false;await ctx.MLUL.saveHomeworkResource('free-body');assert(T.scienceGapPriorInstruction({targetId:'SCI.S8P3B.BALANCED_FORCES'}),'Unchecking viewing cannot erase instruction history');
// A hint is saved before it is displayed and cannot become independent after a reload.
await ctx.MLUL.homeworkGameHint('cart');T.reload();for(const [id,value]of Object.entries({cartMass:'3',cartRight:'10',cartLeft:'4',cartPrediction:'2'}))elements.set(id,{value});await ctx.MLUL.playHomeworkGame('cart');
assert.equal(T.state().schoolHomework.games.at(-1).won,true);assert.equal(T.state().schoolHomework.games.at(-1).assistance_level,'HINTED');assert.equal(T.state().schoolHomework.games.at(-1).masteryEvidence,false);assert.equal(Object.keys(T.state().trackASkillState).length,0);assert.equal(T.state().evidence.length,0);
for(const [id,value]of Object.entries({codeSetup:'reset',codeAction:'add',codeEnd:'keep'}))elements.set(id,{value});await ctx.MLUL.playHomeworkGame('code');assert.equal(T.state().schoolHomework.games.at(-1).details.finalScore,3);
// Failed primary write leaves durable state and the learner's typed note intact; no false success.
const prior=JSON.stringify(T.state().schoolHomework.resources['free-body']);ctx.__fail=true;elements.get('note-free-body').value='Unsaved new thought';await ctx.MLUL.saveHomeworkResource('free-body');assert.equal(JSON.stringify(T.state().schoolHomework.resources['free-body']),prior);assert.equal(elements.get('note-free-body').value,'Unsaved new thought');assert(ctx.alerts.some(m=>m.includes('not saved')));ctx.__fail=false;T.unlock();
const valid=ctx.LEVEL_UP_STATE_INTEGRITY.validateCurrentState(T.state());assert(valid && valid.schemaVersion===2);
const roundTrip=JSON.parse(JSON.stringify(T.state()));assert.equal(roundTrip.schoolHomework.games.length,2);assert.equal(roundTrip.schoolExposures.length,T.state().schoolExposures.length);
console.log('School recovery: content, keys, review freshness, homework persistence/failure, privacy, and game evidence PASS');
