(() => {
  const CURRENT_VERSION=3;
  const DEFAULT_RANKS=Object.freeze([
    {min:0,name:"Explorer"},
    {min:120,name:"Pathfinder"},
    {min:240,name:"Navigator"},
    {min:360,name:"Trailblazer"},
    {min:520,name:"Legend"}
  ]);

  function clone(value){ return JSON.parse(JSON.stringify(value)); }
  function safeInt(value,fallback=0,{min=0,max=Number.MAX_SAFE_INTEGER}={}){
    const n=Number(value);
    if(!Number.isFinite(n))return fallback;
    return Math.max(min,Math.min(max,Math.floor(n)));
  }
  function uniqueStrings(values=[]){
    return Array.isArray(values)?[...new Set(values.filter(x=>typeof x==="string"&&x.length))]:[];
  }

  function freshProgress({worldOrder=[],companion=null,maxHearts=3}={}){
    const completed={};
    for(const id of worldOrder)completed[id]=false;
    return {
      version:CURRENT_VERSION,
      companion,
      xp:0,
      coins:0,
      gems:0,
      streak:0,
      maxHearts,
      hearts:maxHearts,
      respawns:0,
      activeWorld:null,
      index:0,
      feedback:null,
      answered:{},
      completed,
      bossDone:{},
      finalDone:{},
      badges:[],
      openedChests:[],
      pendingRewards:[],
      rewardedItems:{}
    };
  }

  function normalizeProgress(saved,{worldOrder=[],companion=null,maxHearts=3,lockMode="SEQUENTIAL"}={}){
    const base=freshProgress({worldOrder,companion,maxHearts});
    if(!saved || typeof saved!=="object")return base;
    const incomingVersion=Number.isInteger(saved.version)?saved.version:1;
    if(incomingVersion>CURRENT_VERSION){
      const err=new Error(`Unsupported future game progress version: ${incomingVersion}.`);
      err.code="FUTURE_GAME_VERSION";
      throw err;
    }

    const out={...base,...clone(saved),version:CURRENT_VERSION};
    out.answered={...(saved.answered||{})};
    out.completed={...base.completed};
    for(const id of worldOrder)out.completed[id]=saved?.completed?.[id]===true;
    out.bossDone={...(saved.bossDone||{})};
    out.finalDone={...(saved.finalDone||{})};
    out.badges=uniqueStrings(saved.badges);
    out.openedChests=uniqueStrings(saved.openedChests);
    out.rewardedItems=saved.rewardedItems&&typeof saved.rewardedItems==="object"?{...saved.rewardedItems}:{};

    out.maxHearts=safeInt(saved.maxHearts,maxHearts,{min:1,max:99});
    out.hearts=safeInt(saved.hearts,out.maxHearts,{min:0,max:out.maxHearts});
    out.xp=safeInt(saved.xp,0);
    out.coins=safeInt(saved.coins,0);
    out.gems=safeInt(saved.gems,0);
    out.streak=safeInt(saved.streak,0);
    out.respawns=safeInt(saved.respawns,0);
    out.index=safeInt(saved.index,0);
    out.feedback=null;

    const queued=[];
    const sourceQueue=Array.isArray(saved.pendingRewards)
      ? saved.pendingRewards
      : saved.pendingReward&&typeof saved.pendingReward==="object"
        ? [saved.pendingReward]
        : [];
    const seenWorlds=new Set();
    for(const reward of sourceQueue){
      const worldId=typeof reward?.worldId==="string"?reward.worldId:null;
      if(!worldId||!worldOrder.includes(worldId)||out.openedChests.includes(worldId)||seenWorlds.has(worldId))continue;
      seenWorlds.add(worldId);
      queued.push({
        worldId,
        badge:typeof reward.badge==="string"?reward.badge:null,
        chestCoins:safeInt(reward.chestCoins,0),
        chestGems:safeInt(reward.chestGems,0)
      });
    }
    out.pendingRewards=queued;
    delete out.pendingReward;

    const active=typeof saved.activeWorld==="string"&&worldOrder.includes(saved.activeWorld)?saved.activeWorld:null;
    out.activeWorld=active&&worldUnlocked(out,active,worldOrder,{lockMode})?active:null;
    if(!out.activeWorld)out.index=0;
    return out;
  }

  function rankFor(xp,ranks=DEFAULT_RANKS){
    let rank=ranks[0]?.name||"Explorer";
    for(const item of ranks){
      if(Number(xp)>=item.min)rank=item.name;
    }
    return rank;
  }

  function worldUnlocked(progress,worldId,worldOrder=[],{lockMode="SEQUENTIAL"}={}){
    const index=worldOrder.indexOf(worldId);
    if(index<0)return false;
    if(lockMode==="OPEN"||lockMode==="RECOMMENDED")return true;
    if(index===0)return true;
    const previous=worldOrder[index-1];
    return progress?.completed?.[previous]===true;
  }

  function unlockSummary(progress,worldOrder=[],options={}){
    const result={};
    for(const id of worldOrder)result[id]=worldUnlocked(progress,id,worldOrder,options);
    return result;
  }

  function heartCounts(progress){
    const max=safeInt(progress?.maxHearts,3,{min:1,max:99});
    const current=safeInt(progress?.hearts,max,{min:0,max});
    return {current,max,empty:max-current};
  }

  function heartsText(progress){
    const {current,empty}=heartCounts(progress);
    return "❤️".repeat(current)+"🖤".repeat(empty);
  }

  function awardCorrect(progress,{itemId,xp=10,coins=5,gems=0}={}){
    if(!progress||typeof progress!=="object")throw new Error("progress is required");
    if(typeof itemId!=="string"||!itemId)throw new Error("itemId is required for idempotent rewards");
    if(!progress.rewardedItems||typeof progress.rewardedItems!=="object")progress.rewardedItems={};
    if(progress.rewardedItems[itemId]===true)return {progress,awarded:false};
    progress.rewardedItems[itemId]=true;
    progress.xp=safeInt(progress.xp,0)+safeInt(xp,0);
    progress.coins=safeInt(progress.coins,0)+safeInt(coins,0);
    progress.gems=safeInt(progress.gems,0)+safeInt(gems,0);
    progress.streak=safeInt(progress.streak,0)+1;
    progress.hearts=safeInt(progress.maxHearts,3,{min:1,max:99});
    return {progress,awarded:true};
  }

  function registerMiss(progress){
    progress.streak=0;
    const max=safeInt(progress?.maxHearts,3,{min:1,max:99});
    progress.hearts=Math.max(0,safeInt(progress?.hearts,max,{min:0,max})-1);
    let respawned=false;
    if(progress.hearts===0){
      progress.respawns=safeInt(progress.respawns,0)+1;
      progress.hearts=max;
      respawned=true;
    }
    return {progress,respawned};
  }

  function queueReward(progress,reward){
    if(!Array.isArray(progress.pendingRewards))progress.pendingRewards=[];
    if(!Array.isArray(progress.openedChests))progress.openedChests=[];
    if(progress.openedChests.includes(reward.worldId))return false;
    if(progress.pendingRewards.some(x=>x.worldId===reward.worldId))return false;
    progress.pendingRewards.push(reward);
    return true;
  }

  function completeWorld(progress,worldId,{badge=null,chestCoins=25,chestGems=1}={}){
    if(!progress.completed)progress.completed={};
    if(!Array.isArray(progress.badges))progress.badges=[];
    const first=progress.completed?.[worldId]!==true;
    progress.completed[worldId]=true;
    if(badge && !progress.badges.includes(badge))progress.badges.push(badge);
    queueReward(progress,{worldId,badge,chestCoins:safeInt(chestCoins,0),chestGems:safeInt(chestGems,0)});
    return {progress,first};
  }

  function reconcileWorldRewards(progress,rewardsByWorld={}){
    if(!progress||typeof progress!=="object")return progress;
    if(!Array.isArray(progress.badges))progress.badges=[];
    for(const [worldId,reward] of Object.entries(rewardsByWorld)){
      if(progress?.completed?.[worldId]!==true)continue;
      const badge=typeof reward?.badge==="string"?reward.badge:null;
      if(badge&&!progress.badges.includes(badge))progress.badges.push(badge);
      queueReward(progress,{
        worldId,
        badge,
        chestCoins:safeInt(reward?.chestCoins,0),
        chestGems:safeInt(reward?.chestGems,0)
      });
    }
    return progress;
  }

  function openPendingReward(progress,worldId=null){
    if(!Array.isArray(progress.pendingRewards))progress.pendingRewards=[];
    if(!Array.isArray(progress.openedChests))progress.openedChests=[];
    const index=worldId==null?0:progress.pendingRewards.findIndex(x=>x.worldId===worldId);
    if(index<0||index>=progress.pendingRewards.length)return {progress,reward:null};
    const [reward]=progress.pendingRewards.splice(index,1);
    if(!progress.openedChests.includes(reward.worldId)){
      progress.coins=safeInt(progress.coins,0)+safeInt(reward.chestCoins,0);
      progress.gems=safeInt(progress.gems,0)+safeInt(reward.chestGems,0);
      progress.openedChests.push(reward.worldId);
    }
    return {progress,reward};
  }

  function bossHealth(done,total){
    const safeTotal=safeInt(total,0);
    if(safeTotal<=0)return 0;
    const safeDone=safeInt(done,0,{min:0,max:safeTotal});
    return Math.round((safeTotal-safeDone)/safeTotal*100);
  }

  function levelNumber(progress,{xpPerLevel=100}={}){
    const step=Math.max(1,safeInt(xpPerLevel,100,{min:1}));
    return 1+Math.floor(safeInt(progress?.xp,0)/step);
  }

  const api={
    CURRENT_VERSION,DEFAULT_RANKS,safeInt,freshProgress,normalizeProgress,rankFor,worldUnlocked,unlockSummary,
    heartCounts,heartsText,awardCorrect,registerMiss,completeWorld,reconcileWorldRewards,openPendingReward,bossHealth,levelNumber
  };
  if(typeof window!=="undefined")window.LEVEL_UP_QUEST_ENGINE=api;
  if(typeof globalThis!=="undefined")globalThis.LEVEL_UP_QUEST_ENGINE=api;
})();