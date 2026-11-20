import fs from "node:fs";
import vm from "node:vm";
import assert from "node:assert/strict";
const context={};vm.createContext(context);
vm.runInContext(fs.readFileSync(new URL("../grade4-diagnostic-bank.js",import.meta.url),"utf8"),context);
const d=context.LEVEL_UP_GRADE4_DIAGNOSTIC;
assert.equal(d.skills.length,7);
assert.equal(d.skills.reduce((n,s)=>n+s.items.length,0),21);
const ids=d.skills.flatMap(s=>s.items.map(q=>q.id));
assert.equal(new Set(ids).size,21);
for(const s of d.skills){
 assert.equal(s.items.length,3);
 for(const q of s.items){assert.ok(q.prompt.length>8);assert.equal(q.choices.length,4);assert.ok(q.choices[q.answerIndex]);assert.equal(q.standardAlignment,"PENDING_REVIEW")}
}
const s=d.skills[0];
const records=s.items.map(q=>({skillId:s.id,itemId:q.id,correct:true,independent:true,fresh:true,reliable:true}));
const res=d.reviewProbes(records)[0];
assert.equal(res.status,"PROVISIONAL_ONLY");
assert.equal(d.reviewProbes(records.slice(0,2))[0].status,"INSUFFICIENT_EVIDENCE");
assert.equal(d.reviewProbes(records.map((r,i)=>i===0?{...r,responseQualityFlag:"REVIEW"}:r))[0].status,"INSUFFICIENT_EVIDENCE");
assert.equal(d.reviewProbes(records.map((r,i)=>i===0?{...r,correct:false}:r))[0].status,"INVESTIGATE_GAP");
console.log("PASS Grade 4 prototype bank structural checks");
