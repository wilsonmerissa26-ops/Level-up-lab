import fs from "node:fs";
import vm from "node:vm";
import assert from "node:assert/strict";

const source=fs.readFileSync(new URL("../patch-p-intake-diagnostic.js",import.meta.url),"utf8");
const context={};vm.createContext(context);vm.runInContext(source,context);
const P=context.LEVEL_UP_PATCH_P;
assert.ok(P,"Patch P API exports");
const fourth=P.normalizeIntake({grade:4,subjects:["Reading","math","vocabulary"],concerns:["word problems"],interests:["dinosaurs"]});
assert.equal(fourth.gradeBand,"elementary");
const fourthPlan=P.plan({grade:4,subjects:["reading","math","vocabulary"]});
assert.equal(fourthPlan.sections.length,3);
assert.equal(fourthPlan.sections.find(s=>s.subject==="math").itemCount,3);
assert.equal(fourthPlan.sections.find(s=>s.subject==="reading").itemCount,3);
assert.equal(fourthPlan.status,"PLAN_ONLY_NOT_STUDENT_RELEASED");
assert.equal(fourthPlan.safeguards.baselineDoNotOverwrite,true);
const drafts=P.getDraftItems(fourthPlan.sections.flatMap(s=>Array.from(s.itemIds)));
assert.equal(drafts.length,7);
for(const item of drafts){
  assert.ok(item.id&&item.prompt);
  assert.ok(Number.isInteger(item.answerIndex));
  assert.ok(item.answerIndex>=0&&item.answerIndex<item.choices.length);
}
const gradeEight=P.plan({grade:8,subjects:["math","science","reading"],schoolDataAvailable:true,priorInstructionTargets:["SCI.S8P2C.ENERGY_TRANSFORMATIONS"]},{
  mathTrackA:{SKILLS:[{id:"MATH.INTEGER_OPS",title:"Integer operations"}]},
  scienceGap:{items:[{id:"SGD.MATTER.1",domain:"Matter"}]}
});
assert.equal(gradeEight.gradeBand,"middle");
assert.equal(gradeEight.sections.find(s=>s.subject==="science").origin,"EXISTING_SCIENCE_GAP");
assert.equal(gradeEight.sections.find(s=>s.subject==="math").origin,"EXISTING_TRACK_A");
assert.ok(Array.from(gradeEight.unavailableSubjects).includes("reading"));
assert.equal(gradeEight.schoolDataReviewRequired,true);
assert.equal(gradeEight.priorInstructionTargets[0],"SCI.S8P2C.ENERGY_TRANSFORMATIONS");
const input=P.mapToBlueprintInput(fourth,"test-4","Pilot Student");
assert.equal(input.gradeLevel,"4");
assert.equal(input.startingTrack,"A");
assert.deepEqual(Array.from(input.profile.interests),["dinosaurs"]);
assert.throws(()=>P.plan({grade:4,subjects:[]}),/subject/);
assert.throws(()=>P.plan({grade:14,subjects:["math"]}),/Grade/);
assert.throws(()=>P.plan({grade:4,subjects:["history"]}),/Unsupported/);
console.log("PASS Patch P intake and planning foundation");
