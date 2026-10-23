/*
 * Patch P foundation: intake normalization + diagnostic planning.
 * No learner data is persisted here. Never copy Michael's evidence into a new learner.
 * Diagnostic recommendations are plans, not evidence or mastery claims.
 */
(function(root){
  "use strict";
  var VERSION="0.1.0";
  var SUBJECTS=["reading","vocabulary","math","science"];
  var G4_BANK=Object.freeze([
    {id:"P.G4.READ.DECODE.1",grade:4,subject:"reading",strand:"decoding",prompt:"Which word has the same vowel sound as 'train'?",choices:["said","play","sit","bread"],answerIndex:1,source:"PILOT_DRAFT"},
    {id:"P.G4.READ.COMP.1",grade:4,subject:"reading",strand:"comprehension",passage:"Maya planted bean seeds in two pots. She placed one pot near a sunny window and the other in a dark closet. She watered both pots equally. After ten days, the sunny plant was taller.",prompt:"What did Maya keep the same for both plants?",choices:["Amount of light","Amount of water","Location","Plant height"],answerIndex:1,source:"PILOT_DRAFT"},
    {id:"P.G4.READ.COMP.2",grade:4,subject:"reading",strand:"comprehension",passage:"Maya planted bean seeds in two pots. She placed one pot near a sunny window and the other in a dark closet. She watered both pots equally. After ten days, the sunny plant was taller.",prompt:"What can Maya reasonably conclude from this observation?",choices:["Light may affect plant growth","Water is never needed","All plants grow at the same rate","Plants grow best in closets"],answerIndex:0,source:"PILOT_DRAFT"},
    {id:"P.G4.VOCAB.1",grade:4,subject:"vocabulary",strand:"context_clues",prompt:"The trail was narrow, so only one hiker could walk along it at a time. What does narrow mean?",choices:["Very wide","Not very wide","Extremely long","Slippery"],answerIndex:1,source:"PILOT_DRAFT"},
    {id:"P.G4.MATH.NUM.1",grade:4,subject:"math",strand:"place_value",prompt:"What is the value of the digit 7 in 47,215?",choices:["7","70","700","7,000"],answerIndex:3,source:"PILOT_DRAFT"},
    {id:"P.G4.MATH.MULT.1",grade:4,subject:"math",strand:"multiplication",prompt:"There are 6 books on each of 4 shelves. How many books are there?",choices:["10","18","24","30"],answerIndex:2,source:"PILOT_DRAFT"},
    {id:"P.G4.MATH.WORD.1",grade:4,subject:"math",strand:"word_problems",prompt:"A class has 28 stickers to share equally among 4 teams. How many stickers does each team get?",choices:["6","7","8","24"],answerIndex:1,source:"PILOT_DRAFT"}
  ].map(function(q){return Object.freeze(q)}));
  function text(v,max){return String(v==null?"":v).trim().slice(0,max||250)}
  function uniqueStrings(values,maxCount){
    var out=[],seen={};
    (Array.isArray(values)?values:[]).forEach(function(value){
      var s=text(value,100);if(!s||seen[s.toLowerCase()]||out.length>=maxCount)return;
      seen[s.toLowerCase()]=true;out.push(s);
    });return out;
  }
  function normalizeIntake(raw){
    if(!raw||typeof raw!=="object"||Array.isArray(raw))throw Error("Intake object required");
    var gradeInput=raw.grade==null?raw.gradeLevel:raw.grade;
    var grade=gradeInput==="K"||gradeInput==="k"?0:(gradeInput==null||String(gradeInput).trim()===""?NaN:Number(gradeInput));
    if(!Number.isInteger(grade)||grade<0||grade>12)throw Error("Grade must be an integer from K (0) to 12");
    var subjects=uniqueStrings(raw.subjects||[],4).map(function(s){return s.toLowerCase()});
    subjects=subjects.filter(function(s,i){return subjects.indexOf(s)===i});
    if(!subjects.length)throw Error("At least one subject required");
    if(subjects.some(function(s){return SUBJECTS.indexOf(s)<0}))throw Error("Unsupported subject");
    var duration=raw.preferredBlockMinutes==null||raw.preferredBlockMinutes===""?null:Number(raw.preferredBlockMinutes);
    if(duration!==null&&(!Number.isInteger(duration)||duration<1||duration>120))throw Error("Preferred block minutes must be a whole number from 1 to 120");
    return Object.freeze({
      grade:grade,gradeBand:grade<=5?"elementary":grade<=8?"middle":"high",
      subjects:subjects,
      concerns:uniqueStrings(raw.concerns,12),strengths:uniqueStrings(raw.strengths,12),
      interests:uniqueStrings(raw.interests,12),
      communicationModes:uniqueStrings(raw.communicationModes,8),
      responseModes:uniqueStrings(raw.responseModes,8),
      frustrationSignals:uniqueStrings(raw.frustrationSignals,12),
      readingAccess:uniqueStrings(raw.readingAccess,8),
      preferredBlockMinutes:duration,
      schoolDataAvailable:raw.schoolDataAvailable===true,
      priorInstructionTargets:uniqueStrings(raw.priorInstructionTargets,100)
    });
  }
  function mapToBlueprintInput(intake,learnerId,displayName){
    return {
      learnerId:text(learnerId,48),displayName:text(displayName,100),
      gradeLevel:intake.grade===0?"K":String(intake.grade),gradeBand:intake.gradeBand,
      subjects:intake.subjects,startingTrack:"A",
      profile:{
        interests:intake.interests,communicationModes:intake.communicationModes,
        responseModes:intake.responseModes,readingAccess:intake.readingAccess,
        frustrationSignals:intake.frustrationSignals,
        attention:{preferredBlockMinutes:intake.preferredBlockMinutes,breakChoiceAvailable:true}
      }
    };
  }
  function plan(raw,providers){
    var intake=normalizeIntake(raw),providersSafe=providers||{};
    var sections=[],unavailable=[];
    intake.subjects.forEach(function(subject){
      var candidates=[],origin="NOT_YET_BUILT";
      if(intake.grade===4){
        candidates=G4_BANK.filter(function(q){return q.subject===subject});
        if(candidates.length)origin="PATCH_P_PILOT_DRAFT";
      }
      if(intake.grade===8&&subject==="math"&&providersSafe.mathTrackA&&Array.isArray(providersSafe.mathTrackA.SKILLS)){
        candidates=providersSafe.mathTrackA.SKILLS.map(function(s){return {id:s.id,subject:"math",strand:s.title,source:"EXISTING_TRACK_A",mode:"EXISTING_GENERATOR"}});
        origin="EXISTING_TRACK_A";
      }
      if(intake.grade===8&&subject==="science"&&providersSafe.scienceGap&&Array.isArray(providersSafe.scienceGap.items)){
        candidates=providersSafe.scienceGap.items.map(function(q){return {id:q.id,subject:"science",strand:q.domain,source:"EXISTING_SCIENCE_GAP",mode:"EXISTING_BANK"}});
        origin="EXISTING_SCIENCE_GAP";
      }
      if(origin==="NOT_YET_BUILT")unavailable.push(subject);
      sections.push({
        subject:subject,origin:origin,readyForPilot:false,
        itemIds:candidates.map(function(q){return q.id}),
        itemCount:candidates.length,
        notes:origin==="NOT_YET_BUILT"?"Grade-specific bank required":origin==="PATCH_P_PILOT_DRAFT"?"Draft items require content/standards review, more equivalent forms and reliability checks":"Existing assessment available; preserve current runtime and evidence rules"
      });
    });
    return {
      version:VERSION,grade:intake.grade,gradeBand:intake.gradeBand,
      sections:sections,unavailableSubjects:unavailable,
      schoolDataReviewRequired:intake.schoolDataAvailable,
      priorInstructionTargets:intake.priorInstructionTargets,
      stages:["REVIEW_INTAKE","REVIEW_PRIOR_INSTRUCTION","COLD_BASELINE_WHEN_ELIGIBLE","INVESTIGATE_BARRIERS","TEACH","INDEPENDENT_VERIFY","DELAYED_RETRIEVAL","TRANSFER"],
      safeguards:{
        baselineDoNotOverwrite:true,oneResponseCannotProveMastery:true,
        rapidResponsesAreReviewSignalsNotProofOfGuessing:true,
        dontScoreUnverifiedAttemptsAsKnowledgeGaps:true,
        existingFormalEvidenceRulesRemainAuthoritative:true,
        noAutomaticStudentPlacement:true
      },
      status:"PLAN_ONLY_NOT_STUDENT_RELEASED"
    };
  }
  function getDraftItems(ids){
    var wanted=uniqueStrings(ids,100);
    return G4_BANK.filter(function(q){return wanted.indexOf(q.id)>=0}).map(function(q){return Object.assign({},q)});
  }
  var api=Object.freeze({version:VERSION,subjects:SUBJECTS.slice(),normalizeIntake:normalizeIntake,mapToBlueprintInput:mapToBlueprintInput,plan:plan,getDraftItems:getDraftItems});
  root.LEVEL_UP_PATCH_P=api;
  if(typeof module!=="undefined"&&module.exports)module.exports=api;
})(typeof globalThis!=="undefined"?globalThis:window);
