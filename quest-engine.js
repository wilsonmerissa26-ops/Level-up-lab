(() => {
  const DEFAULT_RANKS=Object.freeze([
    {min:0,name:"Rookie Explorer"},
    {min:120,name:"Story Scout"},
    {min:240,name:"Moon Ranger"},
    {min:360,name:"Mountain Master"},
    {min:520,name:"Legend Builder"}
  ]);

  function clone(value){ return JSON.parse(JSON.stringify(value)); }

  function freshProgress({worldOrder=[],companion="fox",maxHearts=3}={}){
    const completed={};
    for(const id of worldOrder)completed[id]=false;
    return {
      version:2,
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
      pendingReward:null
    };
  }

  function normalizeProgress(saved,{worldOrder=[],companion="fox",maxHearts=3}={}){
    const base=freshProgress({worldOrder,companion,maxHearts});
    if(!saved || typeof saved!=="object")return base;
    const out={...base,...clone(saved),version:2};
    out.answered={...(saved.answered||{})};
    out.completed={...base.completed,...(saved.completed||{})};
    out.bossDone={...(saved.bossDone||{})};
    out.finalDone={...(saved.finalDone||{})};
    out.badges=Array.isArray(saved.badges)?[...new Set(saved.badges)]:[];
    out.openedChests=Array.isArray(saved.openedChests)?[...new Set(saved.openedChests)]:[];
    out.maxHearts=Number.isInteger(saved.maxHearts)&&saved.maxHearts>0?saved.maxHearts:maxHearts;
    out.hearts=Number.isInteger(saved.hearts)?Math.max(0,Math.min(out.maxHearts,saved.hearts)):out.maxHearts;
    out.coins=Number.isFinite(saved.coins)?Math.max(0,Math.floor(saved.coins)):0;
    out.gems=Number.isFinite(saved.gems)?Math.max(0,Math.floor(saved.gems)):0;
    out.respawns=Number.isFinite(saved.respawns)?Math.max(0,Math.floor(saved.respawns)):0;
    return out;
  }

  function rankFor(xp,ranks=DEFAULT_RANKS){
    let rank=ranks[0]?.name||"Explorer";
    for(const item of ranks){
      if(Number(xp)>=item.min)rank=item.name;
    }
    return rank;
  }

  function worldUnlocked(progress,worldId,worldOrder=[]){
    const index=worldOrder.indexOf(worldId);
    if(index<=0)return index===0;
    const previous=worldOrder[index-1];
    return progress?.completed?.[previous]===true;
  }

  function unlockSummary(progress,worldOrder=[]){
    const result={};
    for(const id of worldOrder)result[id]=worldUnlocked(progress,id,worldOrder);
    return result;
  }

  function heartsText(progress){
    const max=progress?.maxHearts||3;
    const hearts=Math.max(0,Math.min(max,progress?.hearts??max));
    return "❤️".repeat(hearts)+"🖤".repeat(Math.max(0,max-hearts));
  }

  function awardCorrect(progress,{xp=10,coins=5,gems=0}={}){
    progress.xp=(progress.xp||0)+xp;
    progress.coins=(progress.coins||0)+coins;
    progress.gems=(progress.gems||0)+gems;
    progress.streak=(progress.streak||0)+1;
    progress.hearts=progress.maxHearts||3;
    return progress;
  }

  function registerMiss(progress){
    progress.streak=0;
    progress.hearts=Math.max(0,(progress.hearts??progress.maxHearts??3)-1);
    let respawned=false;
    if(progress.hearts===0){
      progress.respawns=(progress.respawns||0)+1;
      progress.hearts=progress.maxHearts||3;
      respawned=true;
    }
    return {progress,respawned};
  }

  function completeWorld(progress,worldId,{badge=null,chestCoins=25,chestGems=1}={}){
    const first=progress.completed?.[worldId]!==true;
    if(!progress.completed)progress.completed={};
    progress.completed[worldId]=true;
    if(first){
      if(badge && !progress.badges.includes(badge))progress.badges.push(badge);
      if(!progress.openedChests.includes(worldId)){
        progress.pendingReward={worldId,badge,chestCoins,chestGems};
      }
    }
    return {progress,first};
  }

  function openPendingReward(progress){
    const reward=progress.pendingReward;
    if(!reward)return {progress,reward:null};
    if(!progress.openedChests.includes(reward.worldId)){
      progress.coins=(progress.coins||0)+(reward.chestCoins||0);
      progress.gems=(progress.gems||0)+(reward.chestGems||0);
      progress.openedChests.push(reward.worldId);
    }
    progress.pendingReward=null;
    return {progress,reward};
  }

  function bossHealth(done,total){
    if(!total)return 100;
    const remaining=Math.max(0,total-done);
    return Math.round(remaining/total*100);
  }

  function levelNumber(progress){
    return 1+Math.floor((progress?.xp||0)/100);
  }

  const api={
    DEFAULT_RANKS,freshProgress,normalizeProgress,rankFor,worldUnlocked,unlockSummary,
    heartsText,awardCorrect,registerMiss,completeWorld,openPendingReward,bossHealth,levelNumber
  };
  if(typeof window!=="undefined")window.LEVEL_UP_QUEST_ENGINE=api;
  if(typeof globalThis!=="undefined")globalThis.LEVEL_UP_QUEST_ENGINE=api;
})();
