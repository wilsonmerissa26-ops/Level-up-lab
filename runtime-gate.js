(() => {
  const REASONS = Object.freeze({
    ALLOWED:'ALLOWED',
    BUILD_LOCKED:'BUILD_LOCKED',
    HOME_SCREEN_REQUIRED:'HOME_SCREEN_REQUIRED',
    PERSISTENT_STORAGE_REQUIRED:'PERSISTENT_STORAGE_REQUIRED',
    SHARED_BACKEND_REQUIRED:'SHARED_BACKEND_REQUIRED'
  });

  function evaluate({
    buildEnabled=false,
    standalone=false,
    persistenceState='UNKNOWN_OR_UNSUPPORTED',
    sharedBackendState='DISABLED'
  }={}){
    if(!buildEnabled)return {allowed:false,reason:REASONS.BUILD_LOCKED};
    if(!standalone)return {allowed:false,reason:REASONS.HOME_SCREEN_REQUIRED};
    if(sharedBackendState==='READY')return {allowed:true,reason:REASONS.ALLOWED};
    if(persistenceState==='PERSISTENT')return {allowed:true,reason:REASONS.ALLOWED};
    if(['CONFIG_REQUIRED','AUTH_REQUIRED','ERROR'].includes(sharedBackendState)){
      return {allowed:false,reason:REASONS.SHARED_BACKEND_REQUIRED};
    }
    return {allowed:false,reason:REASONS.PERSISTENT_STORAGE_REQUIRED};
  }

  function message(result){
    switch(result?.reason){
      case REASONS.HOME_SCREEN_REQUIRED:
        return "Michael's pilot is unlocked only in the installed Level-Up Home Screen app. Open Level-Up from its installed app icon.";
      case REASONS.SHARED_BACKEND_REQUIRED:
        return "This device needs a verified shared Level-Up backend before learner evidence can begin. The local browser-storage gate is not sufficient on this device.";
      case REASONS.PERSISTENT_STORAGE_REQUIRED:
        return "Michael's pilot requires either verified shared-backend persistence or persistent browser storage in the installed app. Open Backup and confirm a durable persistence path before starting learner evidence.";
      case REASONS.BUILD_LOCKED:
        return 'Student use is disabled while this build is under release lock.';
      default:
        return '';
    }
  }

  const api={REASONS,evaluate,message};
  if(typeof window!=='undefined')window.LEVEL_UP_RUNTIME_GATE=api;
  if(typeof globalThis!=='undefined')globalThis.LEVEL_UP_RUNTIME_GATE=api;
})();
