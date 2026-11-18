import fs from 'node:fs';import vm from 'node:vm';import assert from 'node:assert/strict';
const read=f=>fs.readFileSync(new URL('../'+f,import.meta.url),'utf8');
const elements=new Map([['app',{innerHTML:''}],['saveStatus',{}],['pageAudioStatus',{}]]),mirror=new Map(),spoken=[];
const ctx={console,Date,Math,JSON,Map,Set,Number,String,Object,Array,RegExp,Error,Promise,URL,setTimeout,clearTimeout};
Object.assign(ctx,{window:ctx,globalThis:ctx,location:{hash:'#dashboard'},navigator:{storage:{}},scrollTo(){},scrollY:0,alert(m){ctx.alerts.push(m)},alerts:[],__db:{},__fail:false,SpeechSynthesisUtterance:class{constructor(t){this.text=t}},speechSynthesis:{cancel(){spoken.length=0},pause(){ctx.paused=true},resume(){ctx.paused=false},speak(u){spoken.push(u.text)}},localStorage:{getItem:k=>mirror.get(k)||null,setItem:(k,v)=>mirror.set(k,v)},document:{getElementById:id=>elements.get(id)||null,querySelector:()=>null,querySelectorAll:()=>[]}});
for(const f of ['content.js','science-school.js','science-motion.js','school-coding.js','school-academics.js','question-revisions.js','academic-activities.js','learner-repair.js','visual-teaching.js','science-curriculum.js','science-gap-diagnostic.js','review-engine.js','school-homework.js','state-integrity.js'])vm.runInNewContext(read(f),ctx,{filename:f});
const V=ctx.LEVEL_UP_VISUAL_TEACHING,C=ctx.LEVEL_UP_CONTENT;
let app=read('app.js').replace('  function idbPut(value, key = STATE_KEY){','  function idbPut(value, key = STATE_KEY){if(globalThis.__fail)return Promise.reject(new Error("synthetic disk failure"));globalThis.__db[key]=JSON.parse(JSON.stringify(value));return Promise.resolve(true);').replace('  async function persistenceHealthCheck(){','  async function persistenceHealthCheck(){return true;');
app=app.replace('  init();',`  window.testVisual={state:()=>state,current:()=>current,shell,firstRunView,mirrorAheadView,primaryMissingView,pause(){current=null;state.activeSession.status="INTERRUPTED_PRESERVED";},reset(){state=normalizeStateShape(freshState());saveHealthy=true;backupMirrorHealthy=true;redundancyComparison="IN_SYNC";firstRunDecisionRequired=false;storageRecoveryIssue=null;lastDurableState=JSON.parse(JSON.stringify(state));lastDurableRevision=0;current=null;},reload(){state=normalizeStateShape(JSON.parse(JSON.stringify(globalThis.__db.michael)));lastDurableState=JSON.parse(JSON.stringify(state));saveHealthy=true;current={lesson:lessonById(state.activeSession.lessonId),session:state.activeSession};},unlock(){saveHealthy=true;}};`);
ctx.LEVEL_UP_RUNTIME_GATE={evaluate:()=>({allowed:true,reason:'SYNTHETIC_TEST_ONLY'})};vm.runInNewContext(app,ctx,{filename:'app.js'});const T=ctx.testVisual;T.reset();

const R=ctx.LEVEL_UP_REPAIR;
const frozen=JSON.parse(read("docs/question-bank-before-repair.json"));assert.deepEqual(JSON.parse(JSON.stringify(R.legacyChecks)),frozen.lessons,"The pre-repair bank must remain immutable");
for(const r of R.revisions){assert.notEqual(r.previous.id,r.current.id);assert(/\.v20261118r[12]$/.test(r.current.id));assert.equal(r.current.choices[r.current.answer],r.previous.choices[r.previous.answer]);assert.equal(new Set(r.current.choices).size,r.current.choices.length);assert.equal(R.legacyChecks[r.lessonId].find(q=>q.id===r.previous.id).choices.join('|'),r.previous.choices.join('|'));}
for(const [id,terms] of Object.entries({'SCI.CIRCUITS.PATH':['Copper','Rubber','insulator'],'SCI.SPS7A.ENERGY_FORMS':['kinetic','radiant','nuclear'],'SCI.WAVES.INTERFERENCE':['Transparent','Translucent','Opaque'],'SCI.WAVES.LIGHT':['dispersion'],'SCI.WAVES.SEISMIC':['epicenter'],'SCI.MOTION.FORCES':['third law']})){
 const l=C.science.find(l=>l.id===id),html=Array.from({length:4},(_,i)=>V.render(l,{teachIndex:i})).join(' ');for(const t of terms)assert(html.toLowerCase().includes(t.toLowerCase()),id+' must teach '+t);
}
for(const text of ['A working circuit has a battery. Charge is already inside the wire.', 'At 0.40 A, the battery transfers energy. Continue with the next example.', 'A '+('longword '.repeat(50))+'sentence. Next sentence.']){
 const chunks=R.speechChunks(text);assert(chunks.every(x=>x.trim().length));assert.equal(chunks.join(' ').replace(/\s+/g,' ').trim(),text.replace(/\s+/g,' ').trim());assert(!chunks.some(x=>/\bworkin$|\bba$/.test(x)));}
assert.equal(R.speechChunks('One sentence.. Another sentence.').join(' '),'One sentence. Another sentence.');
for(const route of ['dashboard','track-b','track-b-math','track-b-ela','track-b-coding','student-help']){ctx.location.hash='#'+route;const html=T.shell('<h2>Example mission</h2>');assert.equal((html.match(/onclick="location.hash=/g)||[]).length,6);assert(!html.includes('PRIOR_INSTRUCTION'));assert(!html.includes('Download backup'));}
ctx.location.hash='#track-b';
await ctx.MLUL.startLesson('SCI.MOTION.DISTANCE','science');assert(T.current().session.questionSnapshot);const pinned=JSON.stringify(T.current().session.questionSnapshot);assert(/\.v20261118r[12]/.test(pinned));
for(let i=0;i<3;i++)await ctx.MLUL.advanceScienceTeach();elements.set('sayBack',{value:''});elements.set('teachAccess',{value:'',dataset:{}});await ctx.MLUL.beginChecks();
// No response to the help field must stay unrecorded on an independently posed item.
T.current().session.itemIndex=2;const q=T.current().lesson.checks[2];ctx.document.querySelector=selector=>selector==='input[name=answer]:checked'?{value:String(q.answer)}:null;elements.set('itemAssistanceLevel',{value:''});elements.set('itemAccessCondition',{value:'SELF_READ_SILENT',dataset:{accessConditionSource:'USER_REPORTED'}});elements.set('selfReportNoHelp',{checked:true});elements.set('feedback',{});
await ctx.MLUL.submitAnswer();const ev=T.state().evidence.at(-1);assert.equal(ev.assistance_level,null);assert.equal(ev.self_report_no_help,true);assert.equal(ev.assistance_condition_source,'UNRECORDED');assert.equal(ev.question_choices.join('|'),q.choices.join('|'));
const historical=JSON.stringify(T.state().evidence);await ctx.MLUL.manualSave();assert.equal(JSON.stringify(T.state().evidence),historical);
assert.equal(JSON.stringify(T.current().session.questionSnapshot),pinned);assert.equal(Object.keys(T.state().trackASkillState).length,0);
const oldEvidence=JSON.stringify(T.state().evidence);delete T.state().activeSession.questionSnapshot;T.pause();await ctx.MLUL.resumeInterruptedSession();assert(!T.current().lesson.checks[0].id.includes('.v20261118r1'));assert.equal(JSON.stringify(T.state().evidence),oldEvidence);
console.log('Review repair: missing concepts, versioned options, sentence-safe narration, student navigation, pinned questions and honest self-report PASS');

// Round-two regression checks use only a synthetic learner state.
const A=ctx.LEVEL_UP_ACADEMIC_ACTIVITIES;
assert.equal(R.revisionWarnings.length,0);
assert.equal(JSON.parse(read('content-reviews/question-catalog-r2.json')).items.length,239);
assert.equal(R.revisions.length,117);
assert.equal(Object.keys(A.configs).length,22);
const stagedAcademic=[...C.math,...C.ela].filter(l=>l.stagedTeach);
for(const l of stagedAcademic){
 const a=A.config(l);assert(a,l.id+' requires its own activity');
 const correct=A.evaluate(l,String(a.answer));assert.equal(correct.correct,true);
 const wrong=A.evaluate(l,String(a.choices?(a.answer+1)%a.choices.length:a.answer+1));assert.equal(wrong.correct,false);
 const html=A.render(l,{teachIndex:2});assert(html.includes(a.id));assert(!html.includes('Mark a clue'));
 assert.equal(A.render(l,{teachIndex:0}),'');
 if(l.id.startsWith('ELA.'))assert(a.stimulus.split(/\s+/).length>=10,'Read an actual original passage');
}
assert.equal(A.config('MATH.INVERSE_OPERATIONS').answer,(19-4)/3);
assert.equal(A.config('MATH.SCHOOL.SLOPE').answer,(2-8)/(4-1));
assert.equal(A.config('MATH.SCHOOL.INTERCEPT').answer,-2*0+7);
assert(A.config('MATH.SCHOOL.DOMAIN_RANGE').table.some(p=>p[1]===6));
assert.equal(new Set(Object.values(A.configs).map(a=>a.stimulus)).size,22);
for(const f of ['itemAssistanceLevel','itemAccessCondition','teachAccess','selfReportNoHelp'])elements.delete(f);
T.reset();await ctx.MLUL.startLesson('MATH.SCHOOL.SLOPE','math');await ctx.MLUL.advanceScienceTeach();await ctx.MLUL.advanceScienceTeach();
let html=elements.get('app').innerHTML;assert(html.includes('Find the slope'));assert(!html.includes('id="teachAccess"'));assert(!/About \d+ minutes|Plan for about/i.test(html));
const stateBefore=JSON.stringify(T.state().evidence);await ctx.MLUL.respondAcademicActivity('2');assert.equal(T.current().session.studentExercise[2].correct,false);await ctx.MLUL.respondAcademicActivity('-2');
assert.equal(T.current().session.studentExercise[2].correct,true);assert.equal(T.current().session.studentExercise[2].attempts.length,2);assert.equal(JSON.stringify(T.state().evidence),stateBefore);
T.reload();assert.equal(T.current().session.studentExercise[2].response,'-2');
elements.set('studentLesson',{});ctx.MLUL.readCurrentPage();assert(spoken.join(' ').includes('Find the slope'));assert.equal(T.current().session.teach_access_condition_source,'OBSERVED');elements.delete('studentLesson');
await ctx.MLUL.manualSave();const durableExercise=JSON.stringify(T.current().session.studentExercise);ctx.__fail=true;assert.equal(await ctx.MLUL.respondAcademicActivity('0'),false);assert.equal(JSON.stringify(T.current().session.studentExercise),durableExercise);ctx.__fail=false;T.unlock();
await ctx.MLUL.advanceScienceTeach();elements.set('sayBack',{value:''});await ctx.MLUL.beginChecks();assert(!elements.get('app').innerHTML.includes('selfReportNoHelp'));assert(!elements.get('app').innerHTML.includes('itemAssistanceLevel'));assert(!elements.get('app').innerHTML.includes('itemAccessCondition'));
const sq=T.current().lesson.checks[0];ctx.document.querySelector=s=>s==='input[name=answer]:checked'?{value:String(sq.answer)}:null;await ctx.MLUL.submitAnswer();
const evidenceBeforeReview=JSON.stringify(T.state().evidence),skillsBefore=JSON.stringify(T.state().skillState),memoryBefore=JSON.stringify(T.state().reviewSchedule);
ctx.location.hash='#parent';elements.set('supportEvidence',{value:T.state().evidence.at(-1).id});elements.set('supportLevel',{value:'INDEPENDENT'});elements.set('supportBasis',{value:'STUDENT_REPORT_ONLY'});elements.set('supportReviewer',{value:'Synthetic reviewer'});elements.set('supportAttestation',{checked:false});assert.equal(await ctx.MLUL.recordSupportReview(),false);assert.equal(T.state().supportReviews,undefined);
elements.get('supportAttestation').checked=true;assert.equal(await ctx.MLUL.recordSupportReview(),true);const note=T.state().supportReviews[0];assert.equal(note.appliedToIndependence,false);assert.equal(note.appliedToRetention,false);assert.equal(note.countingPolicy,'PENDING_APPROVAL');assert.equal(note.source,'SELF_ATTESTED_REVIEWER_IDENTITY_UNVERIFIED');assert.equal(JSON.stringify(T.state().evidence),evidenceBeforeReview);assert.equal(JSON.stringify(T.state().skillState),skillsBefore);assert.equal(JSON.stringify(T.state().reviewSchedule),memoryBefore);
ctx.location.hash='#track-b';assert.equal(await ctx.MLUL.recordSupportReview(),false);
console.log('Round two: 239 catalog snapshots, 22 lesson-matched activities, response persistence, no student adult controls, audio provenance and separate uncounted support notes PASS');
