import assert from 'node:assert/strict';
import fs from 'node:fs';
import vm from 'node:vm';

const trackingSource=fs.readFileSync(new URL('../study-tracking.js',import.meta.url),'utf8');
const appSource=fs.readFileSync(new URL('../app.js',import.meta.url),'utf8');
const contentSource=fs.readFileSync(new URL('../content.js',import.meta.url),'utf8');
const engineSource=fs.readFileSync(new URL('../quest-engine.js',import.meta.url),'utf8');
const planSource=fs.readFileSync(new URL('../school-plan.js',import.meta.url),'utf8');
const index=fs.readFileSync(new URL('../index.html',import.meta.url),'utf8');

const ctx={};ctx.window=ctx;ctx.globalThis=ctx;vm.createContext(ctx);vm.runInContext(trackingSource,ctx,{filename:'study-tracking.js'});
const T=ctx.LEVEL_UP_STUDY_TRACKING;
assert.ok(T,'study tracking engine loads');

const studySessions=[];
const schoolExposures=[];
const meta={
  learnerId:'michael',
  questId:'ELA.WTMMTM.TEST.2026-09-29',
  contentVersion:1,
  subject:'Language Arts',
  supportLane:'SCHOOL_SUCCESS',
  worldId:'story'
};
const item={
  itemId:'ELA.WTMMTM.TEST.2026-09-29:story:0',
  targetId:'ELA.WTMMTM.STORY.oral-tradition',
  label:'oral tradition',
  promptType:'TERM_RECOGNITION'
};

const session=T.presentItems(
  {studySessions,schoolExposures},
  meta,
  [item],
  '2026-09-29T00:00:00.000Z'
);
assert.equal(studySessions.length,1);
assert.equal(schoolExposures.length,1);
const exposure=schoolExposures[0];
assert.equal(exposure.instruction_exposure_status,'PRIOR_INSTRUCTION');
assert.equal(exposure.provenance,'LIVE_GAME');
assert.equal(exposure.diagnosticEvidence,false);
assert.equal(exposure.evidenceClass,null);
assert.ok(!Object.prototype.hasOwnProperty.call(exposure,'isCorrect'),'exposure must not quietly become correctness evidence');

let tracked=T.recordAttempt(session,item.itemId,{
  response:'folktale',
  isCorrect:false,
  respondedAt:'2026-09-29T00:00:10.000Z'
});
assert.equal(tracked.attemptCount,1);
assert.equal(tracked.firstAnswerCorrect,false);
assert.equal(tracked.firstResponseMs,10000);
assert.equal(tracked.completed,false);

tracked=T.recordAttempt(session,item.itemId,{
  response:'oral tradition',
  isCorrect:true,
  respondedAt:'2026-09-29T00:00:25.000Z'
});
assert.equal(tracked.attemptCount,2);
assert.equal(tracked.firstAnswerCorrect,false,'first-response status must not be overwritten by eventual success');
assert.equal(tracked.totalResponseMs,25000);
assert.equal(tracked.completed,true);
assert.equal(tracked.answersTried.length,2);

T.recordAccess(session,item.itemId,'READ_ALOUD');
T.recordAccess(session,item.itemId,'HINT');
assert.equal(tracked.readAloudCount,1);
assert.equal(tracked.hintCount,1);
assert.deepEqual(
  JSON.parse(JSON.stringify(T.context(studySessions,meta.questId))),
  {sessionId:session.id,worldId:'story',itemId:item.itemId,startedAt:'2026-09-29T00:00:00.000Z'}
);
T.endSession(session,{status:'COMPLETED',completedAt:'2026-09-29T00:00:30.000Z'});
assert.equal(session.status,'COMPLETED');
assert.equal(T.context(studySessions,meta.questId),null);

const pctx={localStorage:{getItem(){return null},setItem(){},removeItem(){}}};
pctx.window=pctx;pctx.globalThis=pctx;pctx.location={reload(){}};pctx.MLUL={schoolQuestAccess:()=>({allowed:true}),getSchoolQuestProgress:()=>null,refreshSchoolPlan(){}};
vm.createContext(pctx);
vm.runInContext(contentSource,pctx,{filename:'content.js'});
vm.runInContext(engineSource,pctx,{filename:'quest-engine.js'});
vm.runInContext(planSource,pctx,{filename:'school-plan.js'});
const P=pctx.LEVEL_UP_SCHOOL_PLAN;

const old=P.__test.freshProgress();
old.completed.story=true;
old.completed.grammar=true;
old.answered.story={0:true,1:true};
old.answered.grammar={0:true};
const reconstructed=P.reconstructLegacyHistory(old,'2026-09-29T04:30:00.000Z');
assert.ok(reconstructed.exposures.length>=3);
assert.ok(reconstructed.items.every(x=>x.legacyReconstructed===true));
assert.ok(reconstructed.items.every(x=>x.firstResponseMs===null));
assert.ok(reconstructed.items.every(x=>x.firstAnswerCorrect===null));
assert.ok(reconstructed.items.every(x=>x.attemptCount===null));

assert.match(planSource,/beginPresentedItems\(progress,id/,'world entry writes exposure before study interaction');
assert.match(planSource,/recordAttempt\(progress,id,index,selected,correct/,'term response uses durable study attempt bridge');
assert.match(planSource,/recordAttempt\(progress,"dragon",index,selected,correct/,'Dragon response uses durable study attempt bridge');
assert.match(planSource,/recordAccess\(progress,id,idx,"READ_ALOUD"/,'read aloud use is tracked');
assert.match(planSource,/hintToggled/,'boss hint opens are tracked');
assert.match(planSource,/schoolQuestTimer/,'quiet stopwatch is rendered');

assert.match(appSource,/function beginSchoolQuestItems/);
assert.match(appSource,/function recordSchoolQuestAttempt/);
assert.match(appSource,/function recordSchoolQuestAccess/);
assert.match(appSource,/RECONSTRUCTED_FROM_GAME_STATE/);
assert.match(appSource,/APPROXIMATE_MIGRATION_TIME/);
assert.match(appSource,/School Quest study results/);
assert.match(appSource,/not formal diagnostic evidence/i);
assert.match(appSource,/Earlier progress preserved/);
assert.match(appSource,/STUDY_TRACKING\.presentItems/,'app uses the reusable study tracking engine');

assert.ok(index.indexOf('study-tracking.js')<index.indexOf('app.js'),'study tracking engine loads before app');

console.log('Patch O.2.5b School Quest study tracking and exposure boundary: PASS');
