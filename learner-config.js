(() => {
  const CONFIG_VERSION = 1;
  const TRANSFER_PACKAGE_TYPE = "LEVEL_UP_PILOT_STARTER_V1";

  const COMMUNICATION_MODES = Object.freeze([
    "SPEECH","AAC","GESTURE","POINTING","TYPING","OTHER"
  ]);

  const RESPONSE_MODES = Object.freeze([
    "VERBAL","POINTING","MATCHING","DRAG_DROP","TYPING","AAC","DRAWING","MANIPULATIVE"
  ]);

  const SENSORY_MODES = Object.freeze(["STANDARD","LOW_STIM","CUSTOM"]);
  const ANIMATION_LEVELS = Object.freeze(["NONE","REDUCED","STANDARD"]);
  const AUDIO_LEVELS = Object.freeze(["OFF","OPTIONAL","ON"]);
  const TRANSITION_STYLES = Object.freeze(["PREDICTABLE","STANDARD"]);

  const LEARNING_LOOP = Object.freeze([
    "TEACH",
    "HELP",
    "FADE_HELP",
    "TEST_INDEPENDENTLY",
    "MIX_OLD_AND_NEW",
    "RECHECK_LATER",
    "GENERALIZE"
  ]);

  const DEFAULT_RETENTION_DAYS = Object.freeze([2,7,21]);

  function clone(value){
    return JSON.parse(JSON.stringify(value));
  }

  function cleanString(value){
    return String(value ?? "").trim();
  }

  function normalizeLearnerId(value){
    const id = cleanString(value)
      .toLowerCase()
      .replace(/[^a-z0-9_-]+/g,"-")
      .replace(/^-+|-+$/g,"")
      .slice(0,48);
    if(!id) throw new Error("learnerId is required");
    return id;
  }

  function uniqueStrings(values=[]){
    if(!Array.isArray(values)) throw new Error("Expected an array");
    const seen = new Set();
    const out = [];
    for(const raw of values){
      const value = cleanString(raw);
      if(!value) continue;
      const key = value.toLowerCase();
      if(seen.has(key)) continue;
      seen.add(key);
      out.push(value);
    }
    return out;
  }

  function validateEnumList(values, allowed, label){
    const normalized = uniqueStrings(values).map(v=>v.toUpperCase());
    for(const value of normalized){
      if(!allowed.includes(value)) throw new Error(`${label} contains unsupported value: ${value}`);
    }
    return normalized;
  }

  function buildIsolationKeys(learnerId){
    const id = normalizeLearnerId(learnerId);
    const token = id.toUpperCase().replace(/[^A-Z0-9_]/g,"_");
    return Object.freeze({
      dbName:`LevelUpLab_${id}`,
      stateKey:`learner:${id}`,
      backupKey:`LEVEL_UP_BACKUP_${token}_V1`
    });
  }

  function normalizeProfile(profile={}){
    const sensory = profile.sensory || {};
    const attention = profile.attention || {};
    const communicationModes = validateEnumList(profile.communicationModes || [], COMMUNICATION_MODES, "communicationModes");
    const responseModes = validateEnumList(profile.responseModes || [], RESPONSE_MODES, "responseModes");

    const selectedSensoryMode = cleanString(sensory.mode || "STANDARD").toUpperCase();
    const animationLevel = cleanString(sensory.animationLevel || (selectedSensoryMode==="LOW_STIM" ? "REDUCED" : "STANDARD")).toUpperCase();
    const audioLevel = cleanString(sensory.audioLevel || (selectedSensoryMode==="LOW_STIM" ? "OPTIONAL" : "OPTIONAL")).toUpperCase();
    const transitionStyle = cleanString(sensory.transitionStyle || "PREDICTABLE").toUpperCase();

    if(!SENSORY_MODES.includes(selectedSensoryMode)) throw new Error("Unsupported sensory mode");
    if(!ANIMATION_LEVELS.includes(animationLevel)) throw new Error("Unsupported animation level");
    if(!AUDIO_LEVELS.includes(audioLevel)) throw new Error("Unsupported audio level");
    if(!TRANSITION_STYLES.includes(transitionStyle)) throw new Error("Unsupported transition style");

    const blockMinutes = attention.preferredBlockMinutes == null ? null : Number(attention.preferredBlockMinutes);
    if(blockMinutes != null && (!Number.isFinite(blockMinutes) || blockMinutes < 1 || blockMinutes > 120)){
      throw new Error("preferredBlockMinutes must be between 1 and 120");
    }

    return {
      interests:uniqueStrings(profile.interests || []),
      interestWorlds:uniqueStrings(profile.interestWorlds || []),
      communicationModes,
      responseModes,
      readingAccess:uniqueStrings(profile.readingAccess || []),
      motivators:uniqueStrings(profile.motivators || []),
      frustrationSignals:uniqueStrings(profile.frustrationSignals || []),
      accessSupports:uniqueStrings(profile.accessSupports || []),
      sensory:{
        mode:selectedSensoryMode,
        lowStimulationAvailable:true,
        animationLevel,
        audioLevel,
        visualSchedule:sensory.visualSchedule !== false,
        transitionStyle
      },
      attention:{
        preferredBlockMinutes:blockMinutes,
        breakChoiceAvailable:attention.breakChoiceAvailable !== false,
        oneTaskAtATime:attention.oneTaskAtATime !== false
      }
    };
  }

  function createPilotLearnerConfig(input={}){
    const learnerId = normalizeLearnerId(input.learnerId);
    const displayName = cleanString(input.displayName);
    if(!displayName) throw new Error("displayName is required");

    const retentionDays = Array.isArray(input.retentionDays) && input.retentionDays.length
      ? [...new Set(input.retentionDays.map(Number))].sort((a,b)=>a-b)
      : [...DEFAULT_RETENTION_DAYS];

    if(retentionDays.some(x=>!Number.isInteger(x) || x < 1 || x > 365)){
      throw new Error("retentionDays must contain whole days between 1 and 365");
    }

    const config = {
      configVersion:CONFIG_VERSION,
      learner:{
        learnerId,
        displayName,
        gradeLevel:cleanString(input.gradeLevel) || null,
        gradeBand:cleanString(input.gradeBand) || null
      },
      program:{
        name:cleanString(input.programName) || "The Learner Project Pilot",
        pilotCohort:cleanString(input.pilotCohort) || null,
        subjects:uniqueStrings(input.subjects || []),
        startingTrack:cleanString(input.startingTrack || "A").toUpperCase()
      },
      profile:normalizeProfile(input.profile || {}),
      adaptiveLearning:{
        diagnosisIndependent:true,
        interestWorldsEnabled:true,
        gameLayerEnabled:true,
        lowStimulationModeAvailable:true,
        learningLoop:[...LEARNING_LOOP],
        retentionDays,
        transferRequired:true,
        generalization:{
          required:true,
          minimumDistinctContexts:Number.isInteger(input.minimumDistinctContexts) && input.minimumDistinctContexts > 0
            ? input.minimumDistinctContexts
            : 2
        },
        ethicalBoundary:"ACADEMIC_AND_FUNCTIONAL_LEARNING_ONLY"
      },
      isolation:buildIsolationKeys(learnerId)
    };

    return Object.freeze(config);
  }

  function createStarterState(config, nowIso=new Date().toISOString()){
    if(!config || config.configVersion!==CONFIG_VERSION) throw new Error("Valid learner config required");
    return {
      schemaVersion:2,
      stateRevision:null,
      learnerRecordOrigin:{
        type:"NEW",
        decidedAt:nowIso,
        priorRecordOffered:false
      },
      restoredFrom:null,
      learnerConfigVersion:config.configVersion,
      learnerId:config.learner.learnerId,
      student:{
        id:config.learner.learnerId,
        name:config.learner.displayName,
        grade:config.learner.gradeLevel,
        gradeBand:config.learner.gradeBand
      },
      activeTrack:config.program.startingTrack,
      learnerProfile:clone(config.profile),
      adaptiveLearning:clone(config.adaptiveLearning),
      lessonState:{},
      trackASkillState:{},
      trackAActiveSession:null,
      trackAMasterySchedule:[],
      evidence:[],
      sessions:[],
      reviewSchedule:[],
      schoolFacts:[],
      settings:{
        readAloud:config.profile.sensory.audioLevel!=="OFF",
        extraProcessing:true,
        parentTypesVerbatim:true,
        lowStimulation:config.profile.sensory.mode==="LOW_STIM",
        visualSchedule:config.profile.sensory.visualSchedule
      },
      backup:{lastExportAttemptedAt:null,pendingAfterLesson:false},
      activeSession:null,
      updatedAt:nowIso
    };
  }

  function createTransferPackage(config, nowIso=new Date().toISOString()){
    const starterState = createStarterState(config, nowIso);
    return {
      packageType:TRANSFER_PACKAGE_TYPE,
      packageVersion:1,
      createdAt:nowIso,
      learnerId:config.learner.learnerId,
      config:clone(config),
      starterState
    };
  }

  function validateTransferPackage(pkg){
    if(!pkg || pkg.packageType!==TRANSFER_PACKAGE_TYPE || pkg.packageVersion!==1){
      throw new Error("Unsupported transfer package");
    }
    if(!pkg.config || pkg.config.learner?.learnerId!==pkg.learnerId){
      throw new Error("Transfer package learner mismatch");
    }
    if(!pkg.starterState || pkg.starterState.learnerId!==pkg.learnerId){
      throw new Error("Starter state learner mismatch");
    }

    const forbiddenHistory = [
      ["evidence",pkg.starterState.evidence],
      ["sessions",pkg.starterState.sessions],
      ["schoolFacts",pkg.starterState.schoolFacts],
      ["reviewSchedule",pkg.starterState.reviewSchedule],
      ["trackAMasterySchedule",pkg.starterState.trackAMasterySchedule]
    ];

    for(const [label,value] of forbiddenHistory){
      if(!Array.isArray(value) || value.length!==0){
        throw new Error(`Starter transfer package must not include prior ${label}`);
      }
    }

    if(Object.keys(pkg.starterState.lessonState || {}).length!==0) throw new Error("Starter transfer package must not include lesson history");
    if(Object.keys(pkg.starterState.trackASkillState || {}).length!==0) throw new Error("Starter transfer package must not include mastery history");

    return true;
  }

  function cloneBlueprintForLearner(templateConfig, learnerInput={}){
    if(!templateConfig || templateConfig.configVersion!==CONFIG_VERSION) throw new Error("Valid template config required");
    return createPilotLearnerConfig({
      learnerId:learnerInput.learnerId,
      displayName:learnerInput.displayName,
      gradeLevel:learnerInput.gradeLevel ?? null,
      gradeBand:learnerInput.gradeBand ?? null,
      programName:learnerInput.programName || templateConfig.program.name,
      pilotCohort:learnerInput.pilotCohort ?? templateConfig.program.pilotCohort,
      subjects:learnerInput.subjects || templateConfig.program.subjects,
      startingTrack:learnerInput.startingTrack || templateConfig.program.startingTrack,
      retentionDays:templateConfig.adaptiveLearning.retentionDays,
      minimumDistinctContexts:templateConfig.adaptiveLearning.generalization.minimumDistinctContexts,
      profile:learnerInput.profile || templateConfig.profile
    });
  }

  const api = {
    CONFIG_VERSION,
    TRANSFER_PACKAGE_TYPE,
    COMMUNICATION_MODES,
    RESPONSE_MODES,
    SENSORY_MODES,
    LEARNING_LOOP,
    DEFAULT_RETENTION_DAYS,
    buildIsolationKeys,
    createPilotLearnerConfig,
    createStarterState,
    createTransferPackage,
    validateTransferPackage,
    cloneBlueprintForLearner
  };

  if(typeof window!=="undefined") window.LEVEL_UP_LEARNER_CONFIG = api;
  if(typeof globalThis!=="undefined") globalThis.LEVEL_UP_LEARNER_CONFIG = api;
})();
