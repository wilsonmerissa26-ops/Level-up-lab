(() => {
  const LOCK_MODES=Object.freeze(["SEQUENTIAL","RECOMMENDED","OPEN"]);
  const DEFAULT_RANKS=Object.freeze([
    {min:0,name:"Explorer"},
    {min:120,name:"Pathfinder"},
    {min:240,name:"Navigator"},
    {min:360,name:"Trailblazer"},
    {min:520,name:"Legend"}
  ]);

  function clone(value){ return JSON.parse(JSON.stringify(value)); }
  function clean(value){ return String(value??"").trim(); }
  function required(value,label){
    const v=clean(value);
    if(!v)throw new Error(label+" is required");
    return v;
  }
  function positiveInt(value,fallback,label){
    const n=value==null?fallback:Number(value);
    if(!Number.isInteger(n)||n<1)throw new Error(label+" must be a positive integer");
    return n;
  }

  function createQuestConfig(input={}){
    const learnerId=required(input.learnerId,"learnerId");
    const questId=required(input.questId,"questId");
    const contentVersion=positiveInt(input.contentVersion,1,"contentVersion");
    const lockMode=clean(input.lockMode||"SEQUENTIAL").toUpperCase();
    if(!LOCK_MODES.includes(lockMode))throw new Error("Unsupported lockMode: "+lockMode);

    const worldOrder=Array.isArray(input.worldOrder)?input.worldOrder.map(x=>required(x,"world id")):[];
    if(!worldOrder.length)throw new Error("worldOrder is required");
    if(new Set(worldOrder).size!==worldOrder.length)throw new Error("worldOrder must contain unique ids");

    const worlds={};
    for(const id of worldOrder){
      const raw=input.worlds?.[id];
      if(!raw)throw new Error("Missing world config: "+id);
      worlds[id]={
        id,
        emoji:clean(raw.emoji)||"🎯",
        title:required(raw.title,id+" title"),
        subtitle:clean(raw.subtitle),
        badge:clean(raw.badge)||null,
        reward:clean(raw.reward)||"Reward",
        chestCoins:Number.isFinite(Number(raw.chestCoins))?Math.max(0,Math.floor(Number(raw.chestCoins))):0,
        chestGems:Number.isFinite(Number(raw.chestGems))?Math.max(0,Math.floor(Number(raw.chestGems))):0
      };
    }

    const companions=(Array.isArray(input.companions)?input.companions:[]).map((raw,i)=>({
      id:required(raw?.id,"companion "+i+" id"),
      emoji:clean(raw?.emoji)||"🙂",
      name:required(raw?.name,"companion "+i+" name"),
      line:clean(raw?.line)
    }));
    if(!companions.length)throw new Error("At least one companion is required");
    const companionIds=companions.map(x=>x.id);
    if(new Set(companionIds).size!==companionIds.length)throw new Error("Companion ids must be unique");
    const defaultCompanion=clean(input.defaultCompanion)||companions[0].id;
    if(!companionIds.includes(defaultCompanion))throw new Error("defaultCompanion must exist in companions");

    const ranks=(Array.isArray(input.ranks)&&input.ranks.length?input.ranks:DEFAULT_RANKS).map((r,i)=>({
      min:Number.isFinite(Number(r?.min))?Math.max(0,Math.floor(Number(r.min))):0,
      name:required(r?.name,"rank "+i+" name")
    })).sort((a,b)=>a.min-b.min);

    const subject=clean(input.subject)||null;
    const targetPrefix=clean(input.targetPrefix)||questId.replace(/[^A-Z0-9]+/gi,".").replace(/^\.+|\.+$/g,"").toUpperCase();

    return Object.freeze({
      schemaVersion:1,
      learnerId,
      questId,
      contentVersion,
      scopeId:`quest:${encodeURIComponent(learnerId)}:${encodeURIComponent(questId)}:v${contentVersion}`,
      subject,
      targetPrefix,
      legacyGameKey:clean(input.legacyGameKey)||null,
      lockMode,
      maxHearts:positiveInt(input.maxHearts,3,"maxHearts"),
      xpPerLevel:positiveInt(input.xpPerLevel,100,"xpPerLevel"),
      defaultCompanion,
      companions:Object.freeze(companions.map(Object.freeze)),
      ranks:Object.freeze(ranks.map(Object.freeze)),
      worldOrder:Object.freeze([...worldOrder]),
      worlds:Object.freeze(worlds),
      currency:Object.freeze({
        coinName:clean(input.currency?.coinName)||"coin",
        gemName:clean(input.currency?.gemName)||"gem"
      }),
      copy:Object.freeze({
        shortName:clean(input.copy?.shortName)||"School Quest",
        title:clean(input.copy?.title)||"School Quest Challenge",
        spawnLabel:clean(input.copy?.spawnLabel)||"SPAWN POINT",
        spawnBlurb:clean(input.copy?.spawnBlurb)||"Choose a world and practice the material.",
        mapTitle:clean(input.copy?.mapTitle)||"Choose a world",
        finalGateLabel:clean(input.copy?.finalGateLabel)||"FINAL GATE",
        finalGateCaption:clean(input.copy?.finalGateCaption)||"CLEAR EVERY LOCK TO FINISH",
        clearedTitle:clean(input.copy?.clearedTitle)||"QUEST CLEARED",
        clearedMessage:clean(input.copy?.clearedMessage)||"Every world is cleared.",
        resetPrompt:clean(input.copy?.resetPrompt)||"Reset this School Quest progress?"
      })
    });
  }

  function visibleThemeText(config){
    const parts=[
      config?.copy?.shortName,config?.copy?.title,config?.copy?.spawnLabel,config?.copy?.spawnBlurb,
      config?.copy?.mapTitle,config?.copy?.finalGateLabel,config?.copy?.finalGateCaption,
      config?.copy?.clearedTitle,config?.copy?.clearedMessage,
      ...(config?.worldOrder||[]).flatMap(id=>{
        const w=config?.worlds?.[id]||{};
        return [w.title,w.subtitle,w.badge,w.reward];
      }),
      ...(config?.companions||[]).flatMap(c=>[c.name,c.line]),
      ...(config?.ranks||[]).map(r=>r.name)
    ];
    return parts.filter(Boolean).join(" | ");
  }

  const api={LOCK_MODES,DEFAULT_RANKS,createQuestConfig,visibleThemeText,clone};
  if(typeof window!=="undefined")window.LEVEL_UP_QUEST_CONFIG=api;
  if(typeof globalThis!=="undefined")globalThis.LEVEL_UP_QUEST_CONFIG=api;
})();