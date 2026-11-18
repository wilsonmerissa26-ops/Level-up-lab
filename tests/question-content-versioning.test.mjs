import fs from 'node:fs';import vm from 'node:vm';import assert from 'node:assert/strict';
const read=p=>fs.readFileSync(new URL('../'+p,import.meta.url),'utf8');
const ctx={};ctx.window=ctx;
for(const f of ['content.js','science-school.js','science-motion.js','school-coding.js','school-academics.js','question-revisions.js','academic-activities.js'])vm.runInNewContext(read(f),ctx,{filename:f});
const bank=JSON.parse(read('docs/question-bank-before-repair.json')).lessons,catalog=JSON.parse(read('content-reviews/question-catalog-r2.json'));
assert.equal(JSON.stringify(ctx.LEVEL_UP_QUESTION_REVISIONS),JSON.stringify(catalog),'Runtime and review catalog must agree exactly');
const ids=new Set();for(const spec of catalog.items){const before=bank[spec.lessonId].find(q=>q.id===spec.sourceId);assert(before);assert.equal(before.q,spec.expectedPrompt);assert.equal(JSON.stringify(before.choices),JSON.stringify(spec.expectedChoices));assert.equal(before.answer,spec.expectedAnswer);assert.equal(spec.choices[before.answer],before.choices[before.answer]);assert.equal(new Set(spec.choices).size,spec.choices.length);assert(!ids.has(spec.lessonId+'::'+spec.id));ids.add(spec.lessonId+'::'+spec.id);if(spec.prompt!==before.q||JSON.stringify(spec.choices)!==JSON.stringify(before.choices)){assert.notEqual(spec.id,before.id);assert(spec.supersedesIds.includes(before.id));}}
// Changed/future questions cannot be silently caught by a text-replacement rule.
const lesson=ctx.LEVEL_UP_CONTENT.science[0],originalId=lesson.checks[0].id;lesson.checks[0].q+=' A future, unreviewed edit.';const future={...lesson.checks[1],id:'future-unreviewed-item',choices:[...lesson.checks[1].choices]};lesson.checks.push(future);vm.runInNewContext(read('learner-repair.js'),ctx);
assert.equal(lesson.checks[0].id,originalId);assert.equal(lesson.checks.at(-1).id,'future-unreviewed-item');assert.equal(ctx.LEVEL_UP_REPAIR.revisionWarnings.length,2);
console.log('Question revision snapshots fail closed on changed or new questions; source bank and answer keys preserved PASS');
