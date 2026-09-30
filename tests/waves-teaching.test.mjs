import fs from 'node:fs';
import vm from 'node:vm';
import assert from 'node:assert/strict';
const ctx={};ctx.window=ctx;vm.createContext(ctx);
for(const f of ['content.js','science-curriculum.js','review-engine.js'])vm.runInContext(fs.readFileSync(new URL('../'+f,import.meta.url),'utf8'),ctx);
const content=ctx.LEVEL_UP_CONTENT;
const waves=content.science.filter(l=>l.unit==='SCI.G8.WAVES');
assert.equal(waves.length,8);
assert.equal(content.sciencePlan.deadline,'2026-10-02');
assert.equal(content.sciencePlan.deadlineKind,'PARENT_LEARNING_GOAL');
assert.equal(new Set(content.science.map(l=>l.id)).size,content.science.length);
for(const l of waves){
 assert(!l.prereq,'Urgent Waves must not be locked behind Energy');
 assert(l.teach.length>=3);
 assert(l.teach.some(t=>/Guided/i.test(t.join(' '))));
 for(const q of l.checks)assert(q.choices[q.answer]);
 for(const window of ['Day 2','Day 7','Day 21']){
  const review=ctx.LEVEL_UP_REVIEW_ENGINE.generateReview(l.id,window,'review-'+l.id+window);
  assert.equal(review.length,3);
  assert(review.every(q=>q.choices[q.answer]&&q.transfer));
  assert(review.every(q=>!l.checks.some(c=>c.q===q.q)),'Review must differ from teaching checks');
 }
 assert(ctx.LEVEL_UP_SCIENCE_CURRICULUM.legacyAlignment[l.id]);
}
console.log('Waves teaching and fresh transfer review: PASS');
