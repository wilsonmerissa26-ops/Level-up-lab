import assert from 'node:assert/strict';
import fs from 'node:fs';
import vm from 'node:vm';

const contentSource=fs.readFileSync(new URL('../content.js',import.meta.url),'utf8');
const planSource=fs.readFileSync(new URL('../school-plan.js',import.meta.url),'utf8');
const app=fs.readFileSync(new URL('../app.js',import.meta.url),'utf8');
const index=fs.readFileSync(new URL('../index.html',import.meta.url),'utf8');

const ctx={};ctx.window=ctx;ctx.globalThis=ctx;vm.createContext(ctx);
vm.runInContext(contentSource,ctx,{filename:'content.js'});
vm.runInContext(planSource,ctx,{filename:'school-plan.js'});
const plan=ctx.LEVEL_UP_CONTENT.schoolPlan.urgent;
assert.equal(plan.testDate,'2026-09-29');
assert.equal(plan.subject,'Language Arts');
assert.equal(plan.evidencePolicy,'SCHOOL_SUPPORT_ONLY_NO_FORMAL_BASELINE');
assert.equal(plan.studyBlocks.length,4);
const terms=plan.studyBlocks.flatMap(b=>b.terms||[]).map(x=>x[0]);
for(const term of ['oral tradition','folktale','myth','quest','embedded narrative','parallel narrative','independent clause','dependent clause','compound sentence','complex sentence','run-on sentence'])assert.ok(terms.includes(term),term);
assert.deepEqual(plan.studyBlocks[2].sequence,[
  'Dragon receives the borrowed line from the guardian lions.',
  'Dragon cannot cross the bridge to see the Old Man of the Moon.',
  'Minli helps Dragon reach the Old Man of the Moon.',
  'Dragon uses the borrowed line and finally learns to fly.',
  'Dragon flies Minli back home to Fruitless Mountain.'
]);
assert.match(plan.studyBlocks[2].quickFacts[0][1],/Borrowed Line/);
const prompts=plan.studyBlocks[3].prompts.map(p=>p.q);
for(const q of ['What is foreshadowing?','What is abundance?','How do Minli\'s beliefs about abundance change throughout the story?'])assert.ok(prompts.includes(q),q);
assert.ok(ctx.LEVEL_UP_SCHOOL_PLAN.render(x=>String(x)).includes('TEST TOMORROW'));
assert.match(app,/School Plan/);
assert.match(app,/school-plan/);
assert.match(app,/readSchoolPlan/);
assert.ok(index.includes('school-plan.js?v=2026-09-28-o22'));
console.log('Patch O.2.2 LA test school plan: PASS');
