import assert from 'node:assert/strict';
import fs from 'node:fs';
import vm from 'node:vm';

const contentSource=fs.readFileSync(new URL('../content.js',import.meta.url),'utf8');
const engineSource=fs.readFileSync(new URL('../quest-engine.js',import.meta.url),'utf8');
const planSource=fs.readFileSync(new URL('../school-plan.js',import.meta.url),'utf8');
const app=fs.readFileSync(new URL('../app.js',import.meta.url),'utf8');
const index=fs.readFileSync(new URL('../index.html',import.meta.url),'utf8');

const store=new Map();
const localStorage={getItem:k=>store.has(k)?store.get(k):null,setItem:(k,v)=>store.set(k,String(v)),removeItem:k=>store.delete(k)};
let durableProgress=null;
const ctx={localStorage};ctx.window=ctx;ctx.globalThis=ctx;ctx.location={reload(){}};
ctx.MLUL={
  schoolQuestAccess:()=>({allowed:true,message:null}),
  getSchoolQuestProgress:()=>durableProgress?structuredClone(durableProgress):null,
  saveSchoolQuestProgress:async({progress})=>{durableProgress=structuredClone(progress);return true},
  refreshSchoolPlan(){}
};
vm.createContext(ctx);
vm.runInContext(contentSource,ctx,{filename:'content.js'});
vm.runInContext(engineSource,ctx,{filename:'quest-engine.js'});
vm.runInContext(planSource,ctx,{filename:'school-plan.js'});

const api=ctx.LEVEL_UP_SCHOOL_PLAN;
const plan=ctx.LEVEL_UP_CONTENT.schoolPlan.urgent;
assert.ok(api,'school quest API loads');
assert.equal(plan.evidencePolicy,'SCHOOL_SUPPORT_ONLY_NO_FORMAL_BASELINE');

const worlds=api.__test.flattenTermWorlds(plan);
assert.equal(worlds.story.length,12,'Story Safari covers all storytelling/fantasy/culture terms');
assert.equal(worlds.grammar.length,16,'Grammar Zoo covers all literary/language terms');

const storyTerms=worlds.story.map(x=>x[0]);
for(const term of ['oral tradition','folktale','origin story','myth','quest','fatal flaw','animal symbolism']) assert.ok(storyTerms.includes(term),term);
const grammarTerms=worlds.grammar.map(x=>x[0]);
for(const term of ['embedded narrative','parallel narrative','cliffhanger','simile','symbol','lesson','independent clause','dependent clause','compound sentence','complex sentence','run-on sentence']) assert.ok(grammarTerms.includes(term),term);

const seq=plan.studyBlocks[2].sequence;
assert.equal(seq.length,5);
assert.equal(seq[0],'Dragon receives the borrowed line from the guardian lions.');
assert.equal(seq[3],'Dragon uses the borrowed line and finally learns to fly.');
assert.equal(seq[4],'Dragon flies Minli back home to Fruitless Mountain.');

const rendered=api.render(x=>String(x));
for(const label of ['Moon Mountain Challenge','Story Safari','Grammar Zoo','Dragon Obby','Review Boss Battle','Final Moon Boss','Pick your animal teammate']) assert.ok(rendered.includes(label),label);
assert.match(rendered,/practice progress only, not a diagnostic score/i);

durableProgress=api.__test.freshProgress();
durableProgress.completed.story=true;durableProgress.completed.grammar=true;durableProgress.completed.dragon=true;
await api.startWorld('boss');
const boss=api.render(x=>String(x));
assert.match(boss,/will not pretend to auto-grade/i);
assert.match(boss,/What is foreshadowing\?/);

assert.match(app,/function refreshSchoolPlan\(\)/);
assert.match(app,/schoolQuestAccess/);assert.match(app,/getSchoolQuestProgress/);assert.match(app,/saveSchoolQuestProgress/);
assert.match(index,/school-plan\.js\?v=2026-09-\d+-o[0-9a-z]+/);

console.log('Patch O.2.3 School Quest game: PASS');
