(() => {
  function clone(value){ return JSON.parse(JSON.stringify(value)); }
  function isoMs(value){
    const ms=new Date(value).getTime();
    return Number.isFinite(ms)?ms:null;
  }

  function activeSession(studySessions=[],questId,worldId=null){
    return studySessions.slice().reverse().find(x=>
      x && x.questId===questId && x.status==="ACTIVE" && (worldId==null || x.worldId===worldId)
    )||null;
  }

  function ensureSession(studySessions,meta,createdAt){
    let session=activeSession(studySessions,meta.questId,meta.worldId);
    if(session)return session;
    session={
      id:meta.sessionId||`sq_study_${Date.now()}_${String(meta.worldId||"world").replace(/[^A-Z0-9_-]/gi,"_")}`,
      learnerId:meta.learnerId,
      questId:meta.questId,
      contentVersion:meta.contentVersion??1,
      subject:meta.subject||null,
      supportLane:meta.supportLane||"SCHOOL_SUCCESS",
      worldId:meta.worldId||null,
      startedAt:createdAt,
      completedAt:null,
      status:"ACTIVE",
      items:[],
      activeItemId:null,
      source:"SCHOOL_QUEST",
      diagnosticEvidence:false
    };
    studySessions.push(session);
    return session;
  }

  function ensureExposure(schoolExposures,meta,createdAt){
    const id=`sq_exp:${meta.questId}:${meta.itemId}`;
    let record=schoolExposures.find(x=>x.id===id);
    if(record)return record;
    record={
      id,
      learnerId:meta.learnerId,
      questId:meta.questId,
      contentVersion:meta.contentVersion??1,
      subject:meta.subject||null,
      supportLane:meta.supportLane||"SCHOOL_SUCCESS",
      worldId:meta.worldId||null,
      itemId:meta.itemId,
      targetId:meta.targetId||meta.itemId,
      label:meta.label||null,
      exposureType:meta.exposureType||"INSTRUCTION_PRESENTED",
      instruction_exposure_status:"PRIOR_INSTRUCTION",
      evidenceClass:null,
      diagnosticEvidence:false,
      firstExposedAt:createdAt,
      timestampPrecision:"EXACT",
      provenance:"LIVE_GAME"
    };
    schoolExposures.push(record);
    return record;
  }

  function ensureItem(session,meta,createdAt){
    session.items=session.items||[];
    let item=session.items.find(x=>x.itemId===meta.itemId);
    if(!item){
      item={
        itemId:meta.itemId,
        targetId:meta.targetId||meta.itemId,
        label:meta.label||null,
        promptType:meta.promptType||null,
        startedAt:createdAt,
        firstResponseAt:null,
        firstResponseMs:null,
        completedAt:null,
        totalResponseMs:null,
        attemptCount:0,
        firstAnswerCorrect:null,
        answersTried:[],
        readAloudCount:0,
        hintCount:0,
        selfReported:false,
        completed:false,
        legacyReconstructed:false
      };
      session.items.push(item);
    }
    session.activeItemId=meta.itemId;
    return item;
  }

  function presentItems({studySessions,schoolExposures},meta,items,createdAt){
    const session=ensureSession(studySessions,meta,createdAt);
    for(const raw of items||[]){
      if(!raw?.itemId)continue;
      const full={...meta,...raw};
      ensureExposure(schoolExposures,full,createdAt);
      ensureItem(session,full,createdAt);
    }
    if(items?.[0]?.itemId)session.activeItemId=items[0].itemId;
    return session;
  }

  function recordAttempt(session,itemId,{response=null,isCorrect=null,selfReported=false,respondedAt}={}){
    const item=session?.items?.find(x=>x.itemId===itemId);
    if(!item)return null;
    const at=respondedAt||new Date().toISOString();
    const start=isoMs(item.startedAt);
    const end=isoMs(at);
    const elapsed=start!=null&&end!=null?Math.max(0,end-start):null;
    item.attemptCount=(Number.isInteger(item.attemptCount)?item.attemptCount:0)+1;
    if(item.firstResponseAt==null){
      item.firstResponseAt=at;
      item.firstResponseMs=elapsed;
      item.firstAnswerCorrect=typeof isCorrect==="boolean"?isCorrect:null;
    }
    item.answersTried=item.answersTried||[];
    item.answersTried.push({
      at,
      response:response==null?null:String(response),
      isCorrect:typeof isCorrect==="boolean"?isCorrect:null,
      selfReported:!!selfReported
    });
    if(isCorrect===true||selfReported===true){
      item.completed=true;
      item.selfReported=!!selfReported;
      item.completedAt=at;
      item.totalResponseMs=elapsed;
    }
    session.activeItemId=itemId;
    return item;
  }

  function recordAccess(session,itemId,kind){
    const item=session?.items?.find(x=>x.itemId===itemId);
    if(!item)return null;
    if(kind==="READ_ALOUD")item.readAloudCount=(item.readAloudCount||0)+1;
    if(kind==="HINT")item.hintCount=(item.hintCount||0)+1;
    session.activeItemId=itemId;
    return item;
  }

  function endSession(session,{status="COMPLETED",completedAt}={}){
    if(!session)return null;
    session.status=status;
    session.completedAt=completedAt||new Date().toISOString();
    session.activeItemId=null;
    return session;
  }

  function context(studySessions,questId){
    const session=activeSession(studySessions,questId);
    if(!session)return null;
    const item=(session.items||[]).find(x=>x.itemId===session.activeItemId)||null;
    return item?{sessionId:session.id,worldId:session.worldId,itemId:item.itemId,startedAt:item.startedAt}:null;
  }

  const api={clone,activeSession,ensureSession,ensureExposure,ensureItem,presentItems,recordAttempt,recordAccess,endSession,context};
  if(typeof window!=="undefined")window.LEVEL_UP_STUDY_TRACKING=api;
  if(typeof globalThis!=="undefined")globalThis.LEVEL_UP_STUDY_TRACKING=api;
})();