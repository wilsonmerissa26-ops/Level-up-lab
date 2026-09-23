import assert from "node:assert/strict";
import "../learner-config.js";

const api=globalThis.LEVEL_UP_LEARNER_CONFIG;
assert.ok(api,"learner config API should be available");

const michaelLike=api.createPilotLearnerConfig({
  learnerId:"Pilot Student 01",
  displayName:"Pilot Student",
  gradeLevel:"4",
  subjects:["Math","Reading","Math"],
  profile:{
    interests:["space","Space","dinosaurs"],
    interestWorlds:["Mission Control"],
    communicationModes:["speech","AAC"],
    responseModes:["verbal","matching","drag_drop"],
    sensory:{
      mode:"LOW_STIM"
    },
    attention:{
      preferredBlockMinutes:12
    },
    motivators:["collecting stars"],
    accessSupports:["one question at a time","visual schedule"]
  }
});

assert.equal(michaelLike.learner.learnerId,"pilot-student-01");
assert.deepEqual(michaelLike.program.subjects,["Math","Reading"]);
assert.deepEqual(michaelLike.profile.interests,["space","dinosaurs"]);
assert.equal(michaelLike.profile.sensory.mode,"LOW_STIM");
assert.equal(michaelLike.profile.sensory.animationLevel,"REDUCED");
assert.equal(michaelLike.profile.sensory.lowStimulationAvailable,true);
assert.equal(michaelLike.adaptiveLearning.interestWorldsEnabled,true);
assert.equal(michaelLike.adaptiveLearning.gameLayerEnabled,true);
assert.deepEqual(michaelLike.adaptiveLearning.learningLoop,[
  "TEACH","HELP","FADE_HELP","TEST_INDEPENDENTLY","MIX_OLD_AND_NEW","RECHECK_LATER","GENERALIZE"
]);
assert.deepEqual(michaelLike.adaptiveLearning.retentionDays,[2,7,21]);
assert.equal(michaelLike.adaptiveLearning.transferRequired,true);
assert.equal(michaelLike.adaptiveLearning.ethicalBoundary,"ACADEMIC_AND_FUNCTIONAL_LEARNING_ONLY");

const keys=api.buildIsolationKeys("Pilot Student 01");
assert.equal(keys.stateKey,"learner:pilot-student-01");
assert.match(keys.dbName,/pilot-student-01/);
assert.match(keys.backupKey,/PILOT_STUDENT_01/);

const starter=api.createStarterState(michaelLike,"2026-09-23T21:00:00.000Z");
assert.equal(starter.learnerId,"pilot-student-01");
assert.deepEqual(starter.evidence,[]);
assert.deepEqual(starter.sessions,[]);
assert.deepEqual(starter.schoolFacts,[]);
assert.deepEqual(starter.lessonState,{});
assert.deepEqual(starter.trackASkillState,{});
assert.equal(starter.settings.lowStimulation,true);
assert.equal(starter.settings.visualSchedule,true);

const pkg=api.createTransferPackage(michaelLike,"2026-09-23T21:00:00.000Z");
assert.equal(api.validateTransferPackage(pkg),true);

const studentTwo=api.cloneBlueprintForLearner(michaelLike,{
  learnerId:"pilot-02",
  displayName:"Second Student",
  profile:{
    interests:["trains"],
    interestWorlds:["Train Yard"],
    communicationModes:["speech"],
    responseModes:["pointing","matching"],
    sensory:{mode:"STANDARD"}
  }
});

assert.equal(studentTwo.learner.learnerId,"pilot-02");
assert.equal(studentTwo.learner.displayName,"Second Student");
assert.deepEqual(studentTwo.adaptiveLearning.learningLoop,michaelLike.adaptiveLearning.learningLoop);
assert.deepEqual(studentTwo.adaptiveLearning.retentionDays,michaelLike.adaptiveLearning.retentionDays);
assert.notEqual(studentTwo.isolation.stateKey,michaelLike.isolation.stateKey);

const pkgTwo=api.createTransferPackage(studentTwo,"2026-09-23T21:00:00.000Z");
assert.deepEqual(pkgTwo.starterState.evidence,[]);
assert.deepEqual(pkgTwo.starterState.sessions,[]);
assert.deepEqual(pkgTwo.starterState.schoolFacts,[]);
assert.deepEqual(pkgTwo.starterState.trackASkillState,{});

const contaminated=structuredClone(pkgTwo);
contaminated.starterState.evidence.push({id:"should-not-transfer"});
assert.throws(()=>api.validateTransferPackage(contaminated),/must not include prior evidence/);

assert.throws(()=>api.createPilotLearnerConfig({learnerId:"",displayName:"X"}),/learnerId is required/);
assert.throws(()=>api.createPilotLearnerConfig({learnerId:"x",displayName:"",profile:{}}),/displayName is required/);
assert.throws(()=>api.createPilotLearnerConfig({
  learnerId:"x",
  displayName:"X",
  profile:{responseModes:["TELEPATHY"]}
}),/unsupported value/);

console.log("Patch O pilot learner config/transfer tests passed");
