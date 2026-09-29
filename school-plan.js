(() => {
  const LEGACY_GAME_KEY="MLUL_WTMMTM_SCHOOL_QUEST_V1";
  const QUEST_ID="ELA.WTMMTM.TEST.2026-09-29";
  const CONTENT_VERSION=1;
  const QUEST=globalThis.LEVEL_UP_QUEST_ENGINE;
  let busy=false;
  let progressLoadError=null;
  let transientFeedback=null;
  let timerHandle=null;
  const WORLD_ORDER=Object.freeze(["story","grammar","dragon","boss","final"]);
  const WORLD_META=Object.freeze({
    story:{emoji:"🦊",title:"Story Safari",subtitle:"Storytelling, fantasy, culture, and animal symbolism",badge:"Story Safari Scout",reward:"Safari Crate"},
    grammar:{emoji:"🐼",title:"Grammar Zoo",subtitle:"Literary terms, clauses, sentences, and conjunctions",badge:"Grammar Keeper",reward:"Zoo Vault"},
    dragon:{emoji:"🐉",title:"Dragon Obby",subtitle:"Jump through the five Dragon events in the teacher's order",badge:"Dragon Path Runner",reward:"Dragon Chest"},
    boss:{emoji:"🐯",title:"Review Boss Battle",subtitle:"Foreshadowing, abundance, generosity, Minli, and storytelling",badge:"Boss Breaker",reward:"Arena Chest"},
    final:{emoji:"🌙",title:"Final Moon Boss",subtitle:"No-notes readiness check before tomorrow's test",badge:"Moon Gate Master",reward:"Moon Vault"}
  });
  const COMPANIONS=Object.freeze([
    {id:"fox",emoji:"🦊",name:"Fox",line:"Fast thinker. Look for clues."},
    {id:"panda",emoji:"🐼",name:"Panda",line:"Stay calm. One challenge at a time."},
    {id:"tiger",emoji:"🐯",name:"Tiger",line:"Be bold. Lock in your answer."},
    {id:"owl",emoji:"🦉",name:"Owl",line:"Read carefully. Details matter."}
  ]);

  function plan(){ return globalThis.LEVEL_UP_CONTENT?.schoolPlan?.urgent||null; }

  function dateOnly(value){
    const d=new Date(value+"T00:00:00");
    return Number.isNaN(d.getTime())?null:d;
  }

  function urgencyLabel(nowDate=new Date()){
    const p=plan();const target=dateOnly(p?.testDate||"");
    if(!target)return "SCHOOL QUEST";
    const today=new Date(nowDate.getFullYear(),nowDate.getMonth(),nowDate.getDate());
    const diff=Math.round((target-today)/86400000);
    const dateLabel=target.toLocaleDateString("en-US",{month:"short",day:"numeric"}).toUpperCase();
    if(diff===0)return "TEST TODAY · "+dateLabel;
    if(diff===1)return "TEST TOMORROW · "+dateLabel;
    if(diff>1)return "TEST IN "+diff+" DAYS · "+dateLabel;
    return "TEST COMPLETED · "+dateLabel;
  }

  function freshProgress(){
    const base=QUEST?QUEST.freshProgress({worldOrder:WORLD_ORDER,companion:"fox",maxHearts:3}):{
      version:3,companion:"fox",xp:0,coins:0,gems:0,streak:0,maxHearts:3,hearts:3,respawns:0,
      activeWorld:null,index:0,feedback:null,completed:{story:false,grammar:false,dragon:false,boss:false,final:false},
      bossDone:{},finalDone:{},badges:[],openedChests:[],pendingRewards:[],rewardedItems:{}
    };
    base.answered={story:{},grammar:{},dragon:{}};
    return base;
  }

  function normalizeGameProgress(saved){
    const normalized=QUEST?QUEST.normalizeProgress(saved,{worldOrder:WORLD_ORDER,companion:"fox",maxHearts:3}):{...freshProgress(),...(saved||{})};
    normalized.answered={
      story:{...(saved?.answered?.story||{})},
      grammar:{...(saved?.answered?.grammar||{})},
      dragon:{...(saved?.answered?.dragon||{})}
    };
    if(QUEST?.reconcileWorldRewards)QUEST.reconcileWorldRewards(normalized,Object.fromEntries(WORLD_ORDER.map(id=>[id,rewardForWorld(id)])));
    const p=plan();
    if(normalized.activeWorld){
      const count=worldCount(normalized,normalized.activeWorld,p);
      if(!count.total || normalized.index>=count.total){normalized.index=0;normalized.feedback=null}
    }
    return normalized;
  }

  function readLegacyRaw(){
    try{
      const raw=globalThis.localStorage?.getItem(LEGACY_GAME_KEY);
      return raw?JSON.parse(raw):null;
    }catch(_){return null}
  }

  function legacyMigrationCandidate(){
    const saved=readLegacyRaw();
    if(!saved)return null;
    try{
      progressLoadError=null;
      return {questId:QUEST_ID,contentVersion:CONTENT_VERSION,legacyKey:LEGACY_GAME_KEY,progress:normalizeGameProgress(saved)};
    }catch(err){
      progressLoadError=err;
      return null;
    }
  }

  function loadProgress(){
    try{
      const saved=globalThis.MLUL?.getSchoolQuestProgress?.(QUEST_ID) || readLegacyRaw();
      if(!saved)return freshProgress();
      progressLoadError=null;
      return normalizeGameProgress(saved);
    }catch(err){
      progressLoadError=err;
      return freshProgress();
    }
  }

  async function saveProgress(progress,reason="School Quest progress"){
    const access=globalThis.MLUL?.schoolQuestAccess?.();
    if(access && !access.allowed)return false;
    if(!globalThis.MLUL?.saveSchoolQuestProgress)return false;
    return !!(await globalThis.MLUL.saveSchoolQuestProgress({questId:QUEST_ID,contentVersion:CONTENT_VERSION,progress,reason}));
  }

  function actionAllowed(){
    const access=globalThis.MLUL?.schoolQuestAccess?.();
    return !busy && (!access || access.allowed===true);
  }

  async function runAction(fn){
    if(!actionAllowed())return false;
    busy=true;
    try{return await fn()}finally{busy=false}
  }

  function refresh(){
    if(globalThis.MLUL?.refreshSchoolPlan)globalThis.MLUL.refreshSchoolPlan();
    else if(globalThis.location)globalThis.location.reload();
  }

  function companion(progress){
    return COMPANIONS.find(x=>x.id===progress.companion)||COMPANIONS[0];
  }

  function rankFor(xp){ return QUEST?QUEST.rankFor(xp):xp>=360?"Mountain Master":xp>=240?"Moon Ranger":xp>=120?"Story Scout":"Rookie Explorer"; }
  function heartsText(progress){ return QUEST?QUEST.heartsText(progress):"❤️".repeat(progress.hearts||3); }
  function levelNumber(progress){ return QUEST?QUEST.levelNumber(progress):1+Math.floor((progress.xp||0)/100); }
  function worldUnlocked(progress,id){
    if(QUEST)return QUEST.worldUnlocked(progress,id,WORLD_ORDER);
    const index=WORLD_ORDER.indexOf(id);
    if(index===0)return true;
    if(index<0)return false;
    return progress?.completed?.[WORLD_ORDER[index-1]]===true;
  }
  function bossHealth(progress,p){
    const total=p?.studyBlocks?.[3]?.prompts?.length||0;
    const done=Object.keys(progress.bossDone||{}).filter(k=>progress.bossDone[k]).length;
    return QUEST?QUEST.bossHealth(done,total):Math.round(Math.max(0,total-done)/Math.max(1,total)*100);
  }

  function flattenTermWorlds(p){
    const blocks=p?.studyBlocks||[];
    return {
      story:blocks[0]?.terms||[],
      grammar:blocks[1]?.terms||[]
    };
  }

  function choicesFor(items,index){
    const correct=items[index]?.[0];
    if(!correct)return [];
    const pool=[];
    for(let step=1;pool.length<3&&step<items.length+4;step++){
      const candidate=items[(index+(step*5))%items.length]?.[0];
      if(candidate && candidate!==correct && !pool.includes(candidate))pool.push(candidate);
    }
    const slot=(index*3+1)%4;
    const out=pool.slice(0,3);
    out.splice(slot,0,correct);
    return out;
  }

  function dragonChoices(sequence,index){
    const correct=sequence[index];
    const options=[];
    for(let step=1;options.length<3&&step<sequence.length+4;step++){
      const candidate=sequence[(index+(step*2))%sequence.length];
      if(candidate!==correct&&!options.includes(candidate))options.push(candidate);
    }
    const slot=(index*2+1)%4;
    options.splice(slot,0,correct);
    return options;
  }

  function worldCount(progress,id,p){
    if(id==="story"||id==="grammar"){
      const items=flattenTermWorlds(p)[id];
      return {done:Object.keys(progress.answered[id]||{}).filter(k=>progress.answered[id][k]===true).length,total:items.length};
    }
    if(id==="dragon"){
      const seq=p.studyBlocks?.[2]?.sequence||[];
      return {done:Object.keys(progress.answered.dragon||{}).filter(k=>progress.answered.dragon[k]===true).length,total:seq.length};
    }
    if(id==="boss"){
      const prompts=p.studyBlocks?.[3]?.prompts||[];
      return {done:Object.keys(progress.bossDone||{}).filter(k=>progress.bossDone[k]).length,total:prompts.length};
    }
    const finals=p.finalCheck||[];
    return {done:Object.keys(progress.finalDone||{}).filter(k=>progress.finalDone[k]).length,total:finals.length};
  }

  function progressPct(c){ return c.total?Math.round(c.done/c.total*100):0; }

  function idToken(value){
    return String(value??"").trim().toLowerCase().replace(/[^a-z0-9]+/g,"-").replace(/^-+|-+$/g,"");
  }

  function itemMeta(worldId,index,p=plan()){
    if(worldId==="story"||worldId==="grammar"){
      const pair=flattenTermWorlds(p)[worldId]?.[index];
      if(!pair)return null;
      return {
        itemId:QUEST_ID+":"+worldId+":"+index,
        targetId:"ELA.WTMMTM."+worldId.toUpperCase()+"."+idToken(pair[0]),
        label:pair[0],
        promptType:"TERM_RECOGNITION"
      };
    }
    if(worldId==="dragon"){
      const event=p?.studyBlocks?.[2]?.sequence?.[index];
      if(!event)return null;
      return {
        itemId:QUEST_ID+":dragon:"+index,
        targetId:"ELA.WTMMTM.DRAGON_SEQUENCE."+index,
        label:event,
        promptType:"SEQUENCE_RECALL"
      };
    }
    if(worldId==="boss"){
      const q=p?.studyBlocks?.[3]?.prompts?.[index]?.q;
      if(!q)return null;
      return {
        itemId:QUEST_ID+":boss:"+index,
        targetId:"ELA.WTMMTM.REVIEW."+idToken(q),
        label:q,
        promptType:"OPEN_RESPONSE_SELF_CHECK"
      };
    }
    if(worldId==="final"){
      const q=p?.finalCheck?.[index];
      if(!q)return null;
      return {
        itemId:QUEST_ID+":final:"+index,
        targetId:"ELA.WTMMTM.FINAL."+index,
        label:q,
        promptType:"NO_NOTES_SELF_CHECK"
      };
    }
    return null;
  }

  function presentedItems(progress,worldId){
    const p=plan();
    if(worldId==="final")return (p?.finalCheck||[]).map((_,i)=>itemMeta("final",i,p)).filter(Boolean);
    const one=itemMeta(worldId,progress.index,p);
    return one?[one]:[];
  }

  async function beginPresentedItems(progress,worldId,reason){
    const items=presentedItems(progress,worldId);
    if(!items.length)return saveProgress(progress,reason);
    if(!globalThis.MLUL?.beginSchoolQuestItems)return saveProgress(progress,reason);
    return !!(await globalThis.MLUL.beginSchoolQuestItems({
      questId:QUEST_ID,contentVersion:CONTENT_VERSION,subject:"Language Arts",worldId,items,progress,reason
    }));
  }

  async function recordAttempt(progress,worldId,index,response,isCorrect,{selfReported=false,reason="School Quest response"}={}){
    const meta=itemMeta(worldId,index);
    if(!meta)return false;
    if(!globalThis.MLUL?.recordSchoolQuestAttempt)return saveProgress(progress,reason);
    return !!(await globalThis.MLUL.recordSchoolQuestAttempt({
      questId:QUEST_ID,contentVersion:CONTENT_VERSION,worldId,itemId:meta.itemId,response,isCorrect,selfReported,progress,reason
    }));
  }

  async function recordAccess(progress,worldId,index,kind,reason){
    const meta=itemMeta(worldId,index);
    if(!meta)return false;
    if(!globalThis.MLUL?.recordSchoolQuestAccess)return saveProgress(progress,reason);
    return !!(await globalThis.MLUL.recordSchoolQuestAccess({
      questId:QUEST_ID,contentVersion:CONTENT_VERSION,worldId,itemId:meta.itemId,kind,progress,reason
    }));
  }

  function reconstructedItem(meta){
    return {
      itemId:meta.itemId,targetId:meta.targetId,label:meta.label,promptType:meta.promptType,
      startedAt:null,firstResponseAt:null,firstResponseMs:null,completedAt:null,totalResponseMs:null,
      attemptCount:null,firstAnswerCorrect:null,answersTried:[],readAloudCount:null,hintCount:null,
      selfReported:null,completed:true,legacyReconstructed:true
    };
  }

  function reconstructLegacyHistory(progress,reconstructedAt=new Date().toISOString()){
    const p=plan();const exposures=[];const items=[];const seen=new Set();
    const add=(worldId,index)=>{
      const meta=itemMeta(worldId,index,p);if(!meta||seen.has(meta.itemId))return;
      seen.add(meta.itemId);exposures.push({...meta,worldId});items.push(reconstructedItem(meta));
    };
    for(const worldId of ["story","grammar"]){
      for(const [key,value] of Object.entries(progress?.answered?.[worldId]||{}))if(value===true)add(worldId,Number(key));
    }
    for(const [key,value] of Object.entries(progress?.answered?.dragon||{}))if(value===true)add("dragon",Number(key));
    for(const [key,value] of Object.entries(progress?.bossDone||{}))if(value)add("boss",Number(key));
    for(const [key,value] of Object.entries(progress?.finalDone||{}))if(value)add("final",Number(key));
    for(const worldId of WORLD_ORDER){
      if(progress?.completed?.[worldId]!==true)continue;
      const hasWorldExposure=exposures.some(x=>x.worldId===worldId);
      if(!hasWorldExposure){
        const meta={itemId:QUEST_ID+":"+worldId+":completed-world",targetId:"ELA.WTMMTM."+worldId.toUpperCase(),label:WORLD_META[worldId]?.title||worldId,promptType:"RECONSTRUCTED_WORLD_COMPLETION",worldId};
        exposures.push(meta);items.push(reconstructedItem(meta));
      }
    }
    return {subject:"Language Arts",reconstructedAt,exposures,items};
  }

  function escapeAttr(s){
    return String(s??"").replaceAll("&","&amp;").replaceAll('"',"&quot;").replaceAll("<","&lt;").replaceAll(">","&gt;");
  }

  function topBar(escapeHTML,progress,{compact=false}={}){
    const pet=companion(progress);
    return "<div class=\"game-hud "+(compact?"compact":"")+"\">"+
      "<div class=\"hud-brand\"><span class=\"pill warn\">"+escapeHTML(urgencyLabel())+"</span><div class=\"hud-title\">🏔️ Moon Mountain</div><div class=\"tiny muted\">School Quest · teacher material</div></div>"+
      "<div class=\"hud-center\">"+
        "<span class=\"hud-chip level-chip\">LVL "+levelNumber(progress)+"</span>"+
        "<span class=\"hud-chip\">⭐ "+progress.xp+" XP</span>"+
        "<span class=\"hud-chip coin-chip\">🪙 "+(progress.coins||0)+"</span>"+
        "<span class=\"hud-chip gem-chip\">💎 "+(progress.gems||0)+"</span>"+
        "<span class=\"hud-chip heart-chip\">"+heartsText(progress)+"</span>"+
        "<span class=\"hud-chip\">🔥 "+progress.streak+"</span>"+
      "</div>"+
      "<div class=\"hud-player\"><span class=\"hud-pet\">"+pet.emoji+"</span><div><strong>"+escapeHTML(pet.name)+"</strong><div class=\"tiny muted\">"+escapeHTML(rankFor(progress.xp))+"</div></div></div>"+
      "</div>";
  }

  function renderCompanions(escapeHTML,progress){
    return "<div class=\"game-panel companion-panel\"><div class=\"row between\"><div><div class=\"game-kicker\">TEAM LOADOUT</div><h3>Pick your animal teammate</h3></div><span class=\"pill purple\">Cosmetic teammate</span></div><div class=\"companion-grid\">"+
      COMPANIONS.map(c=>"<button class=\"companion-btn "+(progress.companion===c.id?"selected":"")+"\" onclick=\"window.LEVEL_UP_SCHOOL_PLAN.chooseCompanion('"+c.id+"')\"><span>"+c.emoji+"</span><strong>"+escapeHTML(c.name)+"</strong><small>"+escapeHTML(c.line)+"</small></button>").join("")+
      "</div></div>";
  }

  function rewardBanner(escapeHTML,progress){
    const reward=progress.pendingRewards?.[0]||null;
    if(!reward)return "";
    const meta=WORLD_META[reward.worldId]||{};
    return "<div class=\"reward-drop\"><div class=\"reward-chest\">🎁</div><div class=\"grow\"><div class=\"game-kicker\">WORLD DROP</div><h3>"+escapeHTML(meta.reward||"Treasure Chest")+" unlocked!</h3><p class=\"small muted\">Clear reward: "+(reward.chestCoins||0)+" coins + "+(reward.chestGems||0)+" moon gem"+((reward.chestGems||0)===1?"":"s")+(reward.badge?" + "+escapeHTML(reward.badge)+" badge":"")+".</p></div><button class=\"btn game-cta\" onclick=\"window.LEVEL_UP_SCHOOL_PLAN.openChest()\">OPEN CHEST</button></div>";
  }

  function worldCard(escapeHTML,id,progress,p,index){
    const meta=WORLD_META[id];
    const count=worldCount(progress,id,p);
    const complete=progress.completed[id]===true;
    const unlocked=worldUnlocked(progress,id);
    const chestOpened=(progress.openedChests||[]).includes(id);
    return "<div class=\"map-stop "+(complete?"complete ":"")+(unlocked?"":"locked ")+"node-"+index+"\">"+
      "<div class=\"map-connector\"></div>"+
      "<div class=\"world-orb\"><span>"+(unlocked?meta.emoji:"🔒")+"</span></div>"+
      "<div class=\"world-panel\"><div class=\"row between\"><div><div class=\"game-kicker\">WORLD "+(index+1)+"</div><h3>"+escapeHTML(meta.title)+"</h3></div><span class=\"pill "+(complete?"good":unlocked?"info":"")+"\">"+(complete?"CLEARED":unlocked?count.done+"/"+count.total:"LOCKED")+"</span></div>"+
      "<p class=\"small muted\">"+escapeHTML(meta.subtitle)+"</p>"+
      "<div class=\"world-meter\"><div style=\"width:"+progressPct(count)+"%\"></div></div>"+
      "<div class=\"world-rewards\"><span>🏅 "+escapeHTML(meta.badge)+"</span><span>"+(complete?(chestOpened?"✅ Chest opened":"🎁 Chest waiting"):"🎁 Clear reward")+"</span></div>"+
      "<button class=\"btn "+(complete?"good":unlocked?"game-cta":"")+"\" "+(unlocked?"":"disabled")+" onclick=\"window.LEVEL_UP_SCHOOL_PLAN.startWorld('"+id+"')\">"+(complete?"REPLAY WORLD":unlocked?"ENTER WORLD":"CLEAR PRIOR WORLD")+"</button></div></div>";
  }

  function renderHub(escapeHTML,progress,p){
    const allDone=WORLD_ORDER.every(id=>progress.completed[id]===true);
    return "<div class=\"game-shell hub-stage\">"+
      topBar(escapeHTML,progress)+
      "<div class=\"spawn-banner\"><div><div class=\"game-kicker\">SPAWN POINT</div><h1>Moon Mountain Challenge</h1><p>Clear five worlds for the Sept. 29 test. Every world uses Michael's teacher material.</p></div><div class=\"spawn-avatar\">"+companion(progress).emoji+"</div></div>"+
      rewardBanner(escapeHTML,progress)+
      "<div class=\"game-rule\"><strong>Practice mode:</strong> wrong answers can cost a temporary heart, but never delete progress or points. Hearts respawn automatically. Game XP is practice progress only, not a diagnostic score, and does not become formal diagnostic evidence.</div>"+
      renderCompanions(escapeHTML,progress)+
      "<div class=\"game-panel world-map-panel\"><div class=\"row between\"><div><div class=\"game-kicker\">WORLD MAP</div><h2>Climb to the Moon Gate</h2></div><div class=\"badge-stack\">"+(progress.badges||[]).slice(-3).map(b=>"<span class=\"pill good\">🏅 "+escapeHTML(b)+"</span>").join("")+"</div></div><div class=\"game-world-map\">"+
      WORLD_ORDER.map((id,i)=>worldCard(escapeHTML,id,progress,p,i)).join("")+
      "</div></div>"+
      (allDone?"<div class=\"victory-screen\"><div class=\"victory-stars\">✨ 🏆 ✨</div><h2>QUEST CLEARED</h2><p>Michael cleared every world. Tomorrow morning, replay the Final Moon Gate for a fast refresh.</p></div>":"")+
      "<div class=\"game-panel teacher-switch\"><div><div class=\"game-kicker\">STUDY MODE</div><strong>Need the regular teacher guide?</strong><div class=\"small muted\">Same content, no game layer.</div></div><button class=\"btn\" onclick=\"window.LEVEL_UP_SCHOOL_PLAN.openGuide()\">Open study guide</button></div>"+
      "</div>";
  }

  function missionHeader(escapeHTML,progress,id,label,step,total){
    const meta=WORLD_META[id];
    return "<div class=\"mission-bar\"><button class=\"game-back\" onclick=\"window.LEVEL_UP_SCHOOL_PLAN.exitWorld()\">← MAP</button><div class=\"mission-name\"><span>"+meta.emoji+"</span><div><div class=\"game-kicker\">"+escapeHTML(label)+"</div><strong>"+escapeHTML(meta.title)+"</strong></div></div><div class=\"checkpoint-counter\">CHECKPOINT "+step+" / "+total+" <span id=\"schoolQuestTimer\" class=\"question-timer\" aria-label=\"Time on this question\">⏱ 0:00</span></div></div>";
  }

  function feedbackBox(escapeHTML,progress){
    if(!progress.feedback)return "";
    const good=progress.feedback.correct===true;
    return "<div class=\"checkpoint-popup "+(good?"cleared":"missed")+"\">"+
      "<div class=\"popup-icon\">"+(good?"⭐":"💥")+"</div><div class=\"grow\"><div class=\"game-kicker\">"+(good?"CHECKPOINT CLEARED":"Oof! Missed the platform")+"</div><strong>"+escapeHTML(progress.feedback.message)+"</strong></div>"+
      (good?"<button class=\"btn game-cta\" onclick=\"window.LEVEL_UP_SCHOOL_PLAN.next()\">NEXT CHECKPOINT ▶</button>":"<span class=\"small\">"+heartsText(progress)+"</span>")+
      "</div>";
  }

  function answerBlocks(escapeHTML,options,onclickBuilder){
    const labels=["A","B","C","D"];
    return "<div class=\"answer-block-grid\">"+options.map((o,i)=>"<button class=\"answer-block block-"+i+"\" onclick=\""+onclickBuilder(o)+"\"><span class=\"answer-key\">"+labels[i]+"</span><span>"+escapeHTML(o)+"</span></button>").join("")+"</div>";
  }

  function renderTermWorld(escapeHTML,progress,p,id){
    const items=flattenTermWorlds(p)[id];
    const idx=Math.min(progress.index,Math.max(items.length-1,0));
    const pair=items[idx]||["",""];
    const opts=choicesFor(items,idx);
    const pet=companion(progress);
    const scene=id==="story"?"safari-scene":"zoo-scene";
    return "<div class=\"game-shell challenge-stage "+scene+"\">"+
      topBar(escapeHTML,progress,{compact:true})+
      missionHeader(escapeHTML,progress,id,"FIND THE RIGHT BLOCK",idx+1,items.length)+
      "<div class=\"world-scene\"><div class=\"scene-decor decor-left\">"+(id==="story"?"🌴":"🎋")+"</div><div class=\"player-platform\"><div class=\"avatar-bubble\">"+pet.emoji+"</div><span>SPAWN</span></div><div class=\"goal-platform\"><span>🏁</span><small>GOAL</small></div></div>"+
      "<div class=\"mission-panel\"><div class=\"objective-tag\">🎯 OBJECTIVE</div><div class=\"challenge-question\">Which term unlocks the next platform?</div><div class=\"challenge-clue\">"+escapeHTML(pair[1])+"</div>"+
      answerBlocks(escapeHTML,opts,o=>"window.LEVEL_UP_SCHOOL_PLAN.chooseTerm('"+id+"',"+idx+",'"+escapeAttr(o).replaceAll("'","&#39;")+"')")+
      "<div class=\"mission-tools\"><div class=\"pet-speech\"><span>"+pet.emoji+"</span><span>"+escapeHTML(pet.line)+"</span></div><button class=\"btn\" onclick=\"window.LEVEL_UP_SCHOOL_PLAN.readChallenge()\">🔊 READ CLUE</button></div>"+
      feedbackBox(escapeHTML,progress)+"</div></div>";
  }

  function renderDragonWorld(escapeHTML,progress,p){
    const seq=p.studyBlocks?.[2]?.sequence||[];
    const idx=Math.min(progress.index,Math.max(seq.length-1,0));
    const opts=dragonChoices(seq,idx);
    const prompt=idx===0?"Which event happens FIRST?":"What happens next?";
    const context=idx===0?"Start the Dragon path.":"Previous checkpoint: "+seq[idx-1];
    return "<div class=\"game-shell challenge-stage dragon-scene\">"+
      topBar(escapeHTML,progress,{compact:true})+
      missionHeader(escapeHTML,progress,"dragon","OBBY RUN",idx+1,seq.length)+
      "<div class=\"dragon-obby\"><div class=\"dragon-sky\">☁️ <span>🐉</span> ☁️</div><div class=\"obby-track\">"+seq.map((_,i)=>"<div class=\"obby-platform "+(i<idx?"done":i===idx?"current":"locked-step")+"\"><span>"+(i<idx?"✓":i+1)+"</span></div>").join("<div class=\"obby-gap\">◆</div>")+"</div></div>"+
      "<div class=\"mission-panel\"><div class=\"objective-tag\">🏃 OBBY CHECKPOINT</div><p class=\"small muted\">"+escapeHTML(context)+"</p><div class=\"challenge-question\">"+escapeHTML(prompt)+"</div>"+
      answerBlocks(escapeHTML,opts,o=>"window.LEVEL_UP_SCHOOL_PLAN.chooseDragon("+idx+",'"+escapeAttr(o).replaceAll("'","&#39;")+"')")+
      "<div class=\"mission-tools\"><button class=\"btn\" onclick=\"window.LEVEL_UP_SCHOOL_PLAN.readChallenge()\">🔊 READ CHALLENGE</button></div>"+feedbackBox(escapeHTML,progress)+"</div></div>";
  }

  function renderBoss(escapeHTML,progress,p){
    const prompts=p.studyBlocks?.[3]?.prompts||[];
    const idx=Math.min(progress.index,Math.max(prompts.length-1,0));
    const item=prompts[idx]||{};
    const done=!!progress.bossDone[idx];
    const health=bossHealth(progress,p);
    return "<div class=\"game-shell challenge-stage boss-scene\">"+
      topBar(escapeHTML,progress,{compact:true})+
      missionHeader(escapeHTML,progress,"boss","BOSS ARENA",idx+1,prompts.length)+
      "<div class=\"boss-arena\"><div class=\"boss-name\">🌑 REVIEW BEAST</div><div class=\"boss-health\"><div style=\"width:"+health+"%\"></div></div><div class=\"boss-health-label\">"+health+"% BOSS HEALTH</div><div class=\"boss-character\">👾</div><div class=\"player-character\">"+companion(progress).emoji+"</div></div>"+
      "<div class=\"mission-panel boss-question-panel\"><div class=\"objective-tag\">⚔️ DEAL DAMAGE WITH A COMPLETE ANSWER</div><div class=\"challenge-question\">"+escapeHTML(item.q||"")+"</div>"+
      "<div class=\"boss-rule\"><strong>No fake grading:</strong> say the answer out loud in complete sentences. The teacher slide asks this question but does not provide an official model answer, so Level-Up will not pretend to auto-grade it.</div>"+
      "<details class=\"hint-crate\" ontoggle=\"window.LEVEL_UP_SCHOOL_PLAN.hintToggled("+idx+",this.open)\"><summary>🧰 OPEN HINT CRATE</summary><p>"+escapeHTML(item.studyHelp||"")+"</p><p class=\"tiny muted\">"+escapeHTML(item.sourceNote||"")+"</p></details>"+
      "<div class=\"mission-tools\"><button class=\"btn\" onclick=\"window.LEVEL_UP_SCHOOL_PLAN.readChallenge()\">🔊 READ BOSS QUESTION</button><button class=\"btn game-cta\" "+(done?"disabled":"")+" onclick=\"window.LEVEL_UP_SCHOOL_PLAN.markBossDone("+idx+")\">"+(done?"DAMAGE DEALT ✓":"I EXPLAINED IT ⚔️")+"</button>"+(done?"<button class=\"btn good\" onclick=\"window.LEVEL_UP_SCHOOL_PLAN.next()\">NEXT ATTACK ▶</button>":"")+"</div></div></div>";
  }

  function renderFinal(escapeHTML,progress,p){
    const items=p.finalCheck||[];
    const doneCount=Object.values(progress.finalDone||{}).filter(Boolean).length;
    const gatePct=items.length?Math.round(doneCount/items.length*100):0;
    return "<div class=\"game-shell challenge-stage moon-scene\">"+
      topBar(escapeHTML,progress,{compact:true})+
      missionHeader(escapeHTML,progress,"final","FINAL GATE",doneCount,items.length)+
      "<div class=\"moon-gate-scene\"><div class=\"moon-orb\">🌕</div><div class=\"gate-ring "+(doneCount===items.length?"open":"")+"\">"+gatePct+"%</div><div class=\"gate-caption\">CLEAR EVERY LOCK TO OPEN THE MOON GATE</div></div>"+
      "<div class=\"mission-panel\"><div class=\"objective-tag\">🔐 NO-NOTES CHECK</div><div class=\"challenge-question\">Say it first. Then unlock it.</div><div class=\"moon-lock-grid\">"+
      items.map((x,i)=>"<button class=\"moon-lock "+(progress.finalDone[i]?"open":"")+"\" onclick=\"window.LEVEL_UP_SCHOOL_PLAN.toggleFinal("+i+")\"><span class=\"lock-icon\">"+(progress.finalDone[i]?"🔓":"🔒")+"</span><span>"+escapeHTML(x)+"</span></button>").join("")+
      "</div>"+(doneCount===items.length?"<div class=\"checkpoint-popup cleared\"><div class=\"popup-icon\">🏆</div><div><div class=\"game-kicker\">MOON GATE OPEN</div><strong>Final Boss cleared. Revisit only anything Michael still hesitates on.</strong></div></div>":"")+"</div></div>";
  }

  function renderGuide(escapeHTML,p){
    let blocks="";
    for(const block of p.studyBlocks){
      if(block.terms){
        const rows=block.terms.map(pair=>"<tr><td><strong>"+escapeHTML(pair[0])+"</strong></td><td>"+escapeHTML(pair[1])+"</td></tr>").join("");
        blocks+="<div class=\"card c12\"><span class=\"pill info\">"+block.minutes+" min</span><h3 style=\"margin-top:8px\">"+escapeHTML(block.title)+"</h3><div class=\"tablewrap\"><table><thead><tr><th>Know this term</th><th>Meaning</th></tr></thead><tbody>"+rows+"</tbody></table></div></div>";
      }else if(block.sequence){
        const seq=block.sequence.map(x=>"<li>"+escapeHTML(x)+"</li>").join("");
        const facts=(block.quickFacts||[]).map(pair=>"<details class=\"teacher\"><summary><strong>"+escapeHTML(pair[0])+"</strong></summary><p class=\"small\">"+escapeHTML(pair[1])+"</p></details>").join("");
        blocks+="<div class=\"card c12\"><span class=\"pill info\">"+block.minutes+" min</span><h3 style=\"margin-top:8px\">"+escapeHTML(block.title)+"</h3><ol>"+seq+"</ol>"+facts+"</div>";
      }else if(block.prompts){
        const prompts=block.prompts.map(x=>"<details class=\"teacher\"><summary><strong>"+escapeHTML(x.q)+"</strong></summary><p class=\"small\">"+escapeHTML(x.studyHelp)+"</p><p class=\"tiny muted\">"+escapeHTML(x.sourceNote)+"</p></details>").join("");
        blocks+="<div class=\"card c12\"><span class=\"pill info\">"+block.minutes+" min</span><h3 style=\"margin-top:8px\">"+escapeHTML(block.title)+"</h3>"+prompts+"</div>";
      }
    }
    return "<div class=\"grid\"><div class=\"card c12\"><div class=\"row between\"><div><span class=\"pill warn\">"+escapeHTML(urgencyLabel())+"</span><h2 style=\"margin-top:10px\">"+escapeHTML(p.title)+"</h2><p class=\"muted\">Teacher-file study guide · School Success lane</p></div><button class=\"btn primary\" onclick=\"window.LEVEL_UP_SCHOOL_PLAN.closeGuide()\">🎮 Back to game</button></div></div>"+blocks+"</div>";
  }

  let guideOpen=false;

  function render(escapeHTML){
    const p=plan();
    if(!p)return "<div class=\"card\"><h2>School Plan</h2><p class=\"muted\">No urgent school items are loaded.</p></div>";
    if(guideOpen)return renderGuide(escapeHTML,p);
    const progress=loadProgress();
    progress.feedback=transientFeedback;
    if(progressLoadError?.code==="FUTURE_GAME_VERSION"){
      return "<div class=\"card\"><span class=\"pill warn\">UPDATE REQUIRED</span><h2 style=\"margin-top:10px\">School Quest progress is newer than this build</h2><p class=\"muted\">Level-Up refused to downgrade or overwrite the saved game record. Update the app before continuing.</p></div>";
    }
    if(progress.activeWorld==="story"||progress.activeWorld==="grammar")return renderTermWorld(escapeHTML,progress,p,progress.activeWorld);
    if(progress.activeWorld==="dragon")return renderDragonWorld(escapeHTML,progress,p);
    if(progress.activeWorld==="boss")return renderBoss(escapeHTML,progress,p);
    if(progress.activeWorld==="final")return renderFinal(escapeHTML,progress,p);
    return renderHub(escapeHTML,progress,p);
  }

  async function chooseCompanion(id){
    await runAction(async()=>{
      const progress=loadProgress();
      if(!COMPANIONS.some(x=>x.id===id))return false;
      progress.companion=id;
      if(!await saveProgress(progress,"School Quest companion"))return false;
      refresh();return true;
    });
  }

  function rewardForWorld(id){
    const rewards={
      story:{badge:WORLD_META.story.badge,chestCoins:20,chestGems:1},
      grammar:{badge:WORLD_META.grammar.badge,chestCoins:25,chestGems:1},
      dragon:{badge:WORLD_META.dragon.badge,chestCoins:35,chestGems:1},
      boss:{badge:WORLD_META.boss.badge,chestCoins:40,chestGems:2},
      final:{badge:WORLD_META.final.badge,chestCoins:50,chestGems:3}
    };
    return rewards[id]||{badge:null,chestCoins:20,chestGems:1};
  }

  function completeWorld(progress,id){
    if(QUEST)return QUEST.completeWorld(progress,id,rewardForWorld(id));
    const first=progress.completed[id]!==true;
    progress.completed[id]=true;
    progress.pendingRewards=progress.pendingRewards||[];
    if(!progress.openedChests?.includes(id)&&!progress.pendingRewards.some(x=>x.worldId===id)){
      progress.pendingRewards.push({worldId:id,...rewardForWorld(id)});
    }
    return {progress,first};
  }

  async function openChest(){
    await runAction(async()=>{
      const progress=loadProgress();
      if(!progress.pendingRewards?.length)return false;
      if(QUEST)QUEST.openPendingReward(progress);
      else{
        const reward=progress.pendingRewards.shift();
        progress.coins=(progress.coins||0)+(reward.chestCoins||0);
        progress.gems=(progress.gems||0)+(reward.chestGems||0);
        progress.openedChests=[...(progress.openedChests||[]),reward.worldId];
      }
      if(!await saveProgress(progress,"School Quest open chest"))return false;
      refresh();return true;
    });
  }

  async function startWorld(id){
    await runAction(async()=>{
      const progress=loadProgress();
      if(!WORLD_ORDER.includes(id)||!worldUnlocked(progress,id))return false;
      progress.activeWorld=id;
      transientFeedback=null;
      progress.hearts=progress.maxHearts||3;
      if(id==="story"||id==="grammar"||id==="dragon"){
        const map=id==="dragon"?progress.answered.dragon:progress.answered[id];
        let next=0;
        while(map?.[next]===true)next++;
        const total=id==="dragon"?(plan()?.studyBlocks?.[2]?.sequence||[]).length:(flattenTermWorlds(plan())[id]||[]).length;
        progress.index=next>=total?0:next;
      }else if(id==="boss"){
        const total=plan()?.studyBlocks?.[3]?.prompts?.length||0;
        let next=0;while(progress.bossDone?.[next]&&next<total)next++;
        progress.index=next>=total?0:next;
      }else progress.index=0;
      if(!await beginPresentedItems(progress,id,"School Quest start world"))return false;
      refresh();return true;
    });
  }

  async function exitWorld(){
    await runAction(async()=>{
      const progress=loadProgress();
      progress.activeWorld=null;progress.index=0;transientFeedback=null;progress.hearts=progress.maxHearts||3;
      if(globalThis.MLUL?.endSchoolQuestStudySession){
        if(!await globalThis.MLUL.endSchoolQuestStudySession({questId:QUEST_ID,contentVersion:CONTENT_VERSION,worldId:progress.activeWorld||null,progress,status:"ENDED_EARLY",reason:"School Quest exit world"}))return false;
      }else if(!await saveProgress(progress,"School Quest exit world"))return false;
      refresh();return true;
    });
  }

  async function chooseTerm(id,index,selected){
    await runAction(async()=>{
      const p=plan();const items=flattenTermWorlds(p)[id]||[];
      const progress=loadProgress();
      if(progress.activeWorld!==id||index!==progress.index||!items[index])return false;
      const correct=selected===items[index][0];
      if(correct){
        const itemId=QUEST_ID+":"+id+":"+index;
        const result=QUEST?QUEST.awardCorrect(progress,{itemId,xp:10,coins:3}):{awarded:progress.answered[id]?.[index]!==true};
        if(!QUEST&&result.awarded){progress.xp+=10;progress.coins=(progress.coins||0)+3;progress.streak+=1}
        progress.answered[id][index]=true;
        transientFeedback={correct:true,message:"Platform unlocked! "+items[index][0]+" · "+(result.awarded?"+10 XP · +3 coins":"already cleared")};
      }else{
        const miss=QUEST?QUEST.registerMiss(progress):{respawned:false};
        if(!QUEST){progress.streak=0;progress.hearts=Math.max(1,(progress.hearts||3)-1)}
        transientFeedback={
          correct:false,
          message:miss.respawned?"Respawn! Hearts refilled. Read the clue and jump again.":"That block broke. Read the clue again and choose another platform."
        };
      }
      if(!await recordAttempt(progress,id,index,selected,correct,{reason:"School Quest term answer"}))return false;
      refresh();return true;
    });
  }

  async function chooseDragon(index,selected){
    await runAction(async()=>{
      const p=plan();const seq=p?.studyBlocks?.[2]?.sequence||[];
      const progress=loadProgress();
      if(progress.activeWorld!=="dragon"||index!==progress.index||!seq[index])return false;
      const correct=selected===seq[index];
      if(correct){
        const itemId=QUEST_ID+":dragon:"+index;
        const result=QUEST?QUEST.awardCorrect(progress,{itemId,xp:15,coins:5}):{awarded:progress.answered.dragon?.[index]!==true};
        if(!QUEST&&result.awarded){progress.xp+=15;progress.coins=(progress.coins||0)+5;progress.streak+=1}
        progress.answered.dragon[index]=true;
        transientFeedback={correct:true,message:"Checkpoint "+(index+1)+" landed! "+(result.awarded?"+15 XP · +5 coins":"already cleared")};
      }else{
        const miss=QUEST?QUEST.registerMiss(progress):{respawned:false};
        if(!QUEST){progress.streak=0;progress.hearts=Math.max(1,(progress.hearts||3)-1)}
        transientFeedback={correct:false,message:miss.respawned?"You fell, respawned, and your hearts refilled. Try the path again.":"Wrong platform. That event belongs somewhere else in the obby."};
      }
      if(!await recordAttempt(progress,"dragon",index,selected,correct,{reason:"School Quest Dragon answer"}))return false;
      refresh();return true;
    });
  }

  async function next(){
    await runAction(async()=>{
      const p=plan();const progress=loadProgress();const id=progress.activeWorld;
      transientFeedback=null;
      let total=0;
      if(id==="story"||id==="grammar")total=(flattenTermWorlds(p)[id]||[]).length;
      else if(id==="dragon")total=p?.studyBlocks?.[2]?.sequence?.length||0;
      else if(id==="boss")total=p?.studyBlocks?.[3]?.prompts?.length||0;
      if(id==="boss"&&!progress.bossDone?.[progress.index])return false;
      if(progress.index+1>=total){
        completeWorld(progress,id);
        progress.activeWorld=null;progress.index=0;progress.hearts=progress.maxHearts||3;
        if(globalThis.MLUL?.endSchoolQuestStudySession){
          if(!await globalThis.MLUL.endSchoolQuestStudySession({questId:QUEST_ID,contentVersion:CONTENT_VERSION,worldId:id,progress,status:"COMPLETED",reason:"School Quest complete world"}))return false;
        }else if(!await saveProgress(progress,"School Quest complete world"))return false;
      }else{
        progress.index+=1;
        if(!await beginPresentedItems(progress,id,"School Quest next checkpoint"))return false;
      }
      refresh();return true;
    });
  }

  async function markBossDone(index){
    await runAction(async()=>{
      const p=plan();const prompts=p?.studyBlocks?.[3]?.prompts||[];
      const progress=loadProgress();
      if(progress.activeWorld!=="boss"||index!==progress.index||!prompts[index])return false;
      if(!progress.bossDone[index]){
        progress.bossDone[index]=true;
        if(QUEST)QUEST.awardCorrect(progress,{itemId:QUEST_ID+":boss:"+index,xp:8,coins:4});
        else{progress.xp+=8;progress.coins=(progress.coins||0)+4;progress.streak+=1}
      }
      if(!await recordAttempt(progress,"boss",index,"EXPLAINED_OUT_LOUD",null,{selfReported:true,reason:"School Quest boss response"}))return false;
      refresh();return true;
    });
  }

  async function toggleFinal(index){
    await runAction(async()=>{
      const p=plan();const finals=p.finalCheck||[];const progress=loadProgress();
      if(progress.activeWorld!=="final"||!finals[index]||progress.finalDone[index])return false;
      progress.finalDone[index]=true;
      if(QUEST)QUEST.awardCorrect(progress,{itemId:QUEST_ID+":final:"+index,xp:5,coins:2});
      else{progress.xp+=5;progress.coins=(progress.coins||0)+2;progress.streak+=1}
      const done=Object.keys(progress.finalDone).filter(k=>progress.finalDone[k]).length;
      if(done>=finals.length)completeWorld(progress,"final");
      if(!await recordAttempt(progress,"final",index,"SELF_CHECKED_NO_NOTES",null,{selfReported:true,reason:"School Quest final check"}))return false;
      if(done>=finals.length && globalThis.MLUL?.endSchoolQuestStudySession){
        await globalThis.MLUL.endSchoolQuestStudySession({questId:QUEST_ID,contentVersion:CONTENT_VERSION,worldId:"final",progress,status:"COMPLETED",reason:"School Quest complete final world"});
      }
      refresh();return true;
    });
  }

  function openGuide(){guideOpen=true;refresh()}
  function closeGuide(){guideOpen=false;refresh()}

  async function resetGame(){
    if(globalThis.confirm && !globalThis.confirm("Reset Moon Mountain game progress? The study content will stay."))return;
    await runAction(async()=>{
      const progress=freshProgress();
      if(!await saveProgress(progress,"School Quest reset"))return false;
      refresh();return true;
    });
  }

  function challengeText(){
    const p=plan();const progress=loadProgress();const id=progress.activeWorld;const idx=progress.index;
    if(id==="story"||id==="grammar"){
      const pair=flattenTermWorlds(p)[id]?.[idx];
      return pair?"Which term matches this meaning? "+pair[1]:"";
    }
    if(id==="dragon"){
      const seq=p?.studyBlocks?.[2]?.sequence||[];
      return idx===0?"Which event happens first?":"What happens next after "+(seq[idx-1]||"")+"?";
    }
    if(id==="boss")return p?.studyBlocks?.[3]?.prompts?.[idx]?.q||"";
    return "";
  }

  async function readChallenge(){
    const text=challengeText();if(!text||!globalThis.speechSynthesis)return;
    const progress=loadProgress();const id=progress.activeWorld;const idx=progress.index;
    if(id && !await recordAccess(progress,id,idx,"READ_ALOUD","School Quest read aloud"))return;
    globalThis.speechSynthesis.cancel();
    const utterance=new SpeechSynthesisUtterance(text);
    utterance.rate=.95;globalThis.speechSynthesis.speak(utterance);
  }

  async function hintToggled(index,isOpen){
    if(!isOpen)return;
    await runAction(async()=>{
      const progress=loadProgress();
      if(progress.activeWorld!=="boss"||progress.index!==index)return false;
      return await recordAccess(progress,"boss",index,"HINT","School Quest hint opened");
    });
  }

  function formatElapsed(ms){
    const total=Math.max(0,Math.floor(ms/1000));
    const m=Math.floor(total/60);const sec=String(total%60).padStart(2,"0");
    return m+":"+sec;
  }

  function bindLiveTimer(){
    if(timerHandle){clearInterval(timerHandle);timerHandle=null}
    const el=globalThis.document?.getElementById?.("schoolQuestTimer");
    if(!el)return;
    const context=globalThis.MLUL?.schoolQuestStudyContext?.(QUEST_ID);
    if(!context?.startedAt){el.textContent="⏱ --:--";return}
    if(context.completedAt && Number.isFinite(context.totalResponseMs)){
      el.textContent="⏱ "+formatElapsed(context.totalResponseMs);
      return;
    }
    const start=new Date(context.startedAt).getTime();
    const tick=()=>{el.textContent="⏱ "+formatElapsed(Date.now()-start)};
    tick();timerHandle=setInterval(tick,1000);
  }

  function readText(){
    const p=plan();if(!p)return "";
    const pieces=[p.title,"Study in this order."];
    for(const block of p.studyBlocks){
      pieces.push(block.title);
      if(block.terms)for(const pair of block.terms)pieces.push(pair[0]+". "+pair[1]);
      if(block.sequence)block.sequence.forEach((x,i)=>pieces.push("Step "+(i+1)+". "+x));
      if(block.quickFacts)for(const pair of block.quickFacts)pieces.push(pair[0]+" "+pair[1]);
      if(block.prompts)for(const x of block.prompts)pieces.push(x.q+" "+x.studyHelp);
    }
    pieces.push("Final no-notes check.");
    for(const x of p.finalCheck)pieces.push(x);
    return pieces.join(" ");
  }

  const api={
    QUEST_ID,CONTENT_VERSION,LEGACY_GAME_KEY,render,readText,readChallenge,bindLiveTimer,hintToggled,urgencyLabel,legacyMigrationCandidate,reconstructLegacyHistory,
    chooseCompanion,startWorld,exitWorld,chooseTerm,chooseDragon,next,
    markBossDone,toggleFinal,openChest,openGuide,closeGuide,resetGame,
    __test:{freshProgress,normalizeGameProgress,flattenTermWorlds,choicesFor,dragonChoices,rankFor,worldCount,worldUnlocked,rewardForWorld,bossHealth,itemMeta,presentedItems}
  };
  if(typeof window!=="undefined")window.LEVEL_UP_SCHOOL_PLAN=api;
  if(typeof globalThis!=="undefined")globalThis.LEVEL_UP_SCHOOL_PLAN=api;
})();
