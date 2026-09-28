(() => {
  const GAME_KEY="MLUL_WTMMTM_SCHOOL_QUEST_V1";
  const QUEST=globalThis.LEVEL_UP_QUEST_ENGINE;
  const WORLD_ORDER=Object.freeze(["story","grammar","dragon","boss","final"]);
  const WORLD_META=Object.freeze({
    story:{emoji:"🦊",title:"Story Safari",subtitle:"Storytelling, fantasy, culture, and animal symbolism",badge:"Story Safari Scout",reward:"Safari Crate"},
    grammar:{emoji:"🐼",title:"Grammar Zoo",subtitle:"Literary terms, clauses, sentences, and conjunctions",badge:"Grammar Keeper",reward:"Zoo Vault"},
    dragon:{emoji:"🐉",title:"Dragon Obby",subtitle:"Jump through the five Dragon events in the teacher's order",badge:"Dragon Path Runner",reward:"Dragon Chest"},
    boss:{emoji:"🐯",title:"Review Boss Arena",subtitle:"Foreshadowing, abundance, generosity, Minli, and storytelling",badge:"Boss Breaker",reward:"Arena Chest"},
    final:{emoji:"🌙",title:"Final Moon Gate",subtitle:"No-notes readiness check before tomorrow's test",badge:"Moon Gate Master",reward:"Moon Vault"}
  });
  const COMPANIONS=Object.freeze([
    {id:"fox",emoji:"🦊",name:"Fox",line:"Fast thinker. Look for clues."},
    {id:"panda",emoji:"🐼",name:"Panda",line:"Stay calm. One challenge at a time."},
    {id:"tiger",emoji:"🐯",name:"Tiger",line:"Be bold. Lock in your answer."},
    {id:"owl",emoji:"🦉",name:"Owl",line:"Read carefully. Details matter."}
  ]);

  function plan(){ return globalThis.LEVEL_UP_CONTENT?.schoolPlan?.urgent||null; }

  function freshProgress(){
    const base=QUEST?QUEST.freshProgress({worldOrder:WORLD_ORDER,companion:"fox",maxHearts:3}):{
      version:2,companion:"fox",xp:0,coins:0,gems:0,streak:0,maxHearts:3,hearts:3,respawns:0,
      activeWorld:null,index:0,feedback:null,completed:{story:false,grammar:false,dragon:false,boss:false,final:false},
      bossDone:{},finalDone:{},badges:[],openedChests:[],pendingReward:null
    };
    base.answered={story:{},grammar:{},dragon:{}};
    return base;
  }

  function loadProgress(){
    try{
      const raw=globalThis.localStorage?.getItem(GAME_KEY);
      if(!raw)return freshProgress();
      const saved=JSON.parse(raw);
      const normalized=QUEST?QUEST.normalizeProgress(saved,{worldOrder:WORLD_ORDER,companion:"fox",maxHearts:3}):{...freshProgress(),...saved};
      normalized.answered={
        story:{...(saved?.answered?.story||{})},
        grammar:{...(saved?.answered?.grammar||{})},
        dragon:{...(saved?.answered?.dragon||{})}
      };
      return normalized;
    }catch(_){return freshProgress()}
  }

  function saveProgress(progress){
    try{globalThis.localStorage?.setItem(GAME_KEY,JSON.stringify(progress))}catch(_){}
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
  function worldUnlocked(progress,id){ return QUEST?QUEST.worldUnlocked(progress,id,WORLD_ORDER):id==="story"; }
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

  function escapeAttr(s){
    return String(s??"").replaceAll("&","&amp;").replaceAll('"',"&quot;").replaceAll("<","&lt;").replaceAll(">","&gt;");
  }

  function topBar(escapeHTML,progress){
    const pet=companion(progress);
    return "<div class=\"quest-top\">"+
      "<div><span class=\"pill warn\">TEST TOMORROW · SEPT. 29</span><div class=\"label\" style=\"margin-top:8px\">School Quest</div><h2>🏔️ Moon Mountain Challenge</h2><p class=\"muted\">Roblox-style obby energy + animal companions. Teacher material stays the source.</p></div>"+
      "<div class=\"quest-stats\"><span class=\"quest-xp\">⭐ "+progress.xp+" XP</span><span>🔥 "+progress.streak+" streak</span><span>🏅 "+escapeHTML(rankFor(progress.xp))+"</span></div>"+
      "</div>"+
      "<div class=\"quest-companion\"><span class=\"pet\">"+pet.emoji+"</span><div><strong>"+escapeHTML(pet.name)+" is with you.</strong><div class=\"small muted\">"+escapeHTML(pet.line)+"</div></div></div>";
  }

  function renderCompanions(escapeHTML,progress){
    return "<div class=\"card c12\"><h3>Pick your animal teammate</h3><div class=\"companion-grid\">"+
      COMPANIONS.map(c=>"<button class=\"companion-btn "+(progress.companion===c.id?"selected":"")+"\" onclick=\"window.LEVEL_UP_SCHOOL_PLAN.chooseCompanion('"+c.id+"')\"><span>"+c.emoji+"</span><strong>"+escapeHTML(c.name)+"</strong></button>").join("")+
      "</div></div>";
  }

  function worldCard(escapeHTML,id,emoji,title,subtitle,progress,p){
    const count=worldCount(progress,id,p);
    const complete=progress.completed[id];
    return "<div class=\"quest-world "+(complete?"complete":"")+"\">"+
      "<div class=\"world-icon\">"+emoji+"</div><div class=\"grow\"><div class=\"row between\"><h3>"+escapeHTML(title)+"</h3><span class=\"pill "+(complete?"good":"info")+"\">"+count.done+"/"+count.total+"</span></div>"+
      "<p class=\"small muted\">"+escapeHTML(subtitle)+"</p><div class=\"progress\"><div style=\"width:"+progressPct(count)+"%\"></div></div></div>"+
      "<button class=\"btn "+(complete?"good":"primary")+"\" onclick=\"window.LEVEL_UP_SCHOOL_PLAN.startWorld('"+id+"')\">"+(complete?"Replay":"Enter world")+"</button></div>";
  }

  function renderHub(escapeHTML,progress,p){
    const allDone=Object.values(progress.completed).every(Boolean);
    return "<div class=\"grid\">"+
      "<div class=\"card c12 quest-hero\">"+topBar(escapeHTML,progress)+"<div class=\"callout green small\"><strong>Game rule:</strong> Wrong answers do not cost points. They loop back until Michael gets it. Game XP is practice progress only, not a diagnostic score.</div></div>"+
      renderCompanions(escapeHTML,progress)+
      "<div class=\"card c12\"><h3>Choose a world</h3><div class=\"quest-map\">"+
      worldCard(escapeHTML,"story","🦊","Story Safari","Storytelling, fantasy, culture, and animal symbolism",progress,p)+
      worldCard(escapeHTML,"grammar","🐼","Grammar Zoo","Literary terms, clauses, sentences, and conjunctions",progress,p)+
      worldCard(escapeHTML,"dragon","🐉","Dragon Obby","Jump through the five Dragon events in the teacher's order",progress,p)+
      worldCard(escapeHTML,"boss","🐯","Review Boss Battle","Foreshadowing, abundance, generosity, Minli, and storytelling",progress,p)+
      worldCard(escapeHTML,"final","🌙","Final Moon Boss","No-notes checklist before tomorrow's test",progress,p)+
      "</div></div>"+
      (allDone?"<div class=\"card c12 center\"><div class=\"big\">🏆 QUEST CLEARED</div><p>Michael completed every study world. Use the Final Moon Boss once more tomorrow morning for a fast refresh.</p></div>":"")+
      "<div class=\"card c12\"><div class=\"row between\"><div><h3>Teacher study guide</h3><p class=\"small muted\">Need to slow down and review instead of playing?</p></div><button class=\"btn\" onclick=\"window.LEVEL_UP_SCHOOL_PLAN.openGuide()\">Open plain study guide</button></div></div>"+
      "</div>";
  }

  function feedbackBox(escapeHTML,progress){
    if(!progress.feedback)return "";
    const good=progress.feedback.correct===true;
    return "<div class=\"feedback "+(good?"good":"warn")+" quest-feedback\"><strong>"+(good?"✅ CHECKPOINT CLEARED":"🔁 TRY THAT JUMP AGAIN")+"</strong><div class=\"small\" style=\"margin-top:6px\">"+escapeHTML(progress.feedback.message)+"</div>"+
      (good?"<button class=\"btn good\" style=\"margin-top:10px\" onclick=\"window.LEVEL_UP_SCHOOL_PLAN.next()\">Next checkpoint</button>":"")+
      "</div>";
  }

  function renderTermWorld(escapeHTML,progress,p,id){
    const items=flattenTermWorlds(p)[id];
    const idx=Math.min(progress.index,Math.max(items.length-1,0));
    const pair=items[idx]||["",""];
    const opts=choicesFor(items,idx);
    const pet=companion(progress);
    const title=id==="story"?"Story Safari":"Grammar Zoo";
    const emoji=id==="story"?"🦊":"🐼";
    return "<div class=\"grid\"><div class=\"card c12 quest-hero\">"+topBar(escapeHTML,progress)+
      "<div class=\"row between\"><button class=\"btn\" onclick=\"window.LEVEL_UP_SCHOOL_PLAN.exitWorld()\">← Quest map</button><span class=\"pill purple\">"+emoji+" "+escapeHTML(title)+" · "+(idx+1)+"/"+items.length+"</span></div></div>"+
      "<div class=\"card c12 challenge-card\"><div class=\"question\">Which term matches this meaning?</div><div class=\"quest-definition\">"+escapeHTML(pair[1])+"</div>"+
      "<div class=\"choices\">"+opts.map(o=>"<button class=\"choice quest-choice\" onclick=\"window.LEVEL_UP_SCHOOL_PLAN.chooseTerm('"+id+"',"+idx+",'"+escapeAttr(o).replaceAll("'","&#39;")+"')\"><span>"+escapeHTML(o)+"</span></button>").join("")+"</div>"+
      "<div class=\"quest-pet-talk\">"+pet.emoji+" <span>"+escapeHTML(pet.line)+"</span></div>"+
      "<div class=\"row\"><button class=\"btn\" onclick=\"window.LEVEL_UP_SCHOOL_PLAN.readChallenge()\">🔊 Read challenge</button></div>"+
      feedbackBox(escapeHTML,progress)+"</div></div>";
  }

  function renderDragonWorld(escapeHTML,progress,p){
    const seq=p.studyBlocks?.[2]?.sequence||[];
    const idx=Math.min(progress.index,Math.max(seq.length-1,0));
    const opts=dragonChoices(seq,idx);
    const prompt=idx===0?"Which event happens FIRST?":"What happens next?";
    const context=idx===0?"Start the Dragon path.":"Previous checkpoint: "+seq[idx-1];
    return "<div class=\"grid\"><div class=\"card c12 quest-hero\">"+topBar(escapeHTML,progress)+
      "<div class=\"row between\"><button class=\"btn\" onclick=\"window.LEVEL_UP_SCHOOL_PLAN.exitWorld()\">← Quest map</button><span class=\"pill purple\">🐉 Dragon Obby · checkpoint "+(idx+1)+"/"+seq.length+"</span></div></div>"+
      "<div class=\"card c12 challenge-card\"><div class=\"obby-path\">"+seq.map((_,i)=>"<span class=\"obby-block "+(i<idx?"done":i===idx?"current":"")+"\">"+(i+1)+"</span>").join("")+"</div>"+
      "<p class=\"small muted\">"+escapeHTML(context)+"</p><div class=\"question\">"+escapeHTML(prompt)+"</div><div class=\"choices\">"+
      opts.map(o=>"<button class=\"choice quest-choice\" onclick=\"window.LEVEL_UP_SCHOOL_PLAN.chooseDragon("+idx+",'"+escapeAttr(o).replaceAll("'","&#39;")+"')\"><span>"+escapeHTML(o)+"</span></button>").join("")+
      "</div><div class=\"row\"><button class=\"btn\" onclick=\"window.LEVEL_UP_SCHOOL_PLAN.readChallenge()\">🔊 Read challenge</button></div>"+
      feedbackBox(escapeHTML,progress)+"</div></div>";
  }

  function renderBoss(escapeHTML,progress,p){
    const prompts=p.studyBlocks?.[3]?.prompts||[];
    const idx=Math.min(progress.index,Math.max(prompts.length-1,0));
    const item=prompts[idx]||{};
    const done=!!progress.bossDone[idx];
    return "<div class=\"grid\"><div class=\"card c12 quest-hero\">"+topBar(escapeHTML,progress)+
      "<div class=\"row between\"><button class=\"btn\" onclick=\"window.LEVEL_UP_SCHOOL_PLAN.exitWorld()\">← Quest map</button><span class=\"pill warn\">🐯 Review Boss · "+(idx+1)+"/"+prompts.length+"</span></div></div>"+
      "<div class=\"card c12 challenge-card\"><div class=\"question\">"+escapeHTML(item.q||"")+"</div>"+
      "<div class=\"callout purple\"><strong>Boss rule:</strong> Say your answer out loud in complete sentences. These teacher slides ask the question but do not give a model answer, so the game will not pretend to auto-grade it.</div>"+
      "<details class=\"teacher\"><summary><strong>Need a strategy hint?</strong></summary><p class=\"small\">"+escapeHTML(item.studyHelp||"")+"</p><p class=\"tiny muted\">"+escapeHTML(item.sourceNote||"")+"</p></details>"+
      "<div class=\"row\"><button class=\"btn\" onclick=\"window.LEVEL_UP_SCHOOL_PLAN.readChallenge()\">🔊 Read question</button>"+
      "<button class=\"btn primary\" "+(done?"disabled":"")+" onclick=\"window.LEVEL_UP_SCHOOL_PLAN.markBossDone("+idx+")\">"+(done?"Answered ✓":"I answered it out loud")+"</button>"+
      (done?"<button class=\"btn good\" onclick=\"window.LEVEL_UP_SCHOOL_PLAN.next()\">Next boss question</button>":"")+
      "</div></div></div>";
  }

  function renderFinal(escapeHTML,progress,p){
    const items=p.finalCheck||[];
    const doneCount=Object.values(progress.finalDone||{}).filter(Boolean).length;
    return "<div class=\"grid\"><div class=\"card c12 quest-hero\">"+topBar(escapeHTML,progress)+
      "<div class=\"row between\"><button class=\"btn\" onclick=\"window.LEVEL_UP_SCHOOL_PLAN.exitWorld()\">← Quest map</button><span class=\"pill warn\">🌙 Final Moon Boss · "+doneCount+"/"+items.length+"</span></div></div>"+
      "<div class=\"card c12\"><h3>No notes. Clear each checkpoint.</h3><p class=\"small muted\">Michael says or explains each one before marking it complete.</p><div class=\"final-checks\">"+
      items.map((x,i)=>"<button class=\"final-check "+(progress.finalDone[i]?"done":"")+"\" onclick=\"window.LEVEL_UP_SCHOOL_PLAN.toggleFinal("+i+")\"><span>"+(progress.finalDone[i]?"✅":"⬜")+"</span><span>"+escapeHTML(x)+"</span></button>").join("")+
      "</div>"+(doneCount===items.length?"<div class=\"callout green\"><strong>🏆 Final Boss cleared.</strong> Stop studying the things he already knows. Revisit only the parts he still hesitates on.</div>":"")+
      "</div></div>";
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
    return "<div class=\"grid\"><div class=\"card c12\"><div class=\"row between\"><div><span class=\"pill warn\">TEST TOMORROW · SEPT. 29</span><h2 style=\"margin-top:10px\">"+escapeHTML(p.title)+"</h2><p class=\"muted\">Teacher-file study guide · School Success lane</p></div><button class=\"btn primary\" onclick=\"window.LEVEL_UP_SCHOOL_PLAN.closeGuide()\">🎮 Back to game</button></div></div>"+blocks+"</div>";
  }

  let guideOpen=false;

  function render(escapeHTML){
    const p=plan();
    if(!p)return "<div class=\"card\"><h2>School Plan</h2><p class=\"muted\">No urgent school items are loaded.</p></div>";
    if(guideOpen)return renderGuide(escapeHTML,p);
    const progress=loadProgress();
    if(progress.activeWorld==="story"||progress.activeWorld==="grammar")return renderTermWorld(escapeHTML,progress,p,progress.activeWorld);
    if(progress.activeWorld==="dragon")return renderDragonWorld(escapeHTML,progress,p);
    if(progress.activeWorld==="boss")return renderBoss(escapeHTML,progress,p);
    if(progress.activeWorld==="final")return renderFinal(escapeHTML,progress,p);
    return renderHub(escapeHTML,progress,p);
  }

  function chooseCompanion(id){
    const progress=loadProgress();
    if(COMPANIONS.some(x=>x.id===id)){progress.companion=id;saveProgress(progress)}
    refresh();
  }

  function startWorld(id){
    const progress=loadProgress();
    if(!["story","grammar","dragon","boss","final"].includes(id))return;
    progress.activeWorld=id;
    progress.feedback=null;
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
    saveProgress(progress);refresh();
  }

  function exitWorld(){
    const progress=loadProgress();
    progress.activeWorld=null;progress.index=0;progress.feedback=null;
    saveProgress(progress);refresh();
  }

  function chooseTerm(id,index,selected){
    const p=plan();const items=flattenTermWorlds(p)[id]||[];
    const progress=loadProgress();
    if(progress.activeWorld!==id||index!==progress.index||!items[index])return;
    const correct=selected===items[index][0];
    if(correct){
      if(progress.answered[id]?.[index]!==true){progress.xp+=10;progress.streak+=1}
      progress.answered[id][index]=true;
      progress.feedback={correct:true,message:"Correct: "+items[index][0]+". +10 XP"};
    }else{
      progress.streak=0;
      progress.feedback={correct:false,message:"That term does not match this definition yet. Read the wording again and try another block."};
    }
    saveProgress(progress);refresh();
  }

  function chooseDragon(index,selected){
    const p=plan();const seq=p?.studyBlocks?.[2]?.sequence||[];
    const progress=loadProgress();
    if(progress.activeWorld!=="dragon"||index!==progress.index||!seq[index])return;
    const correct=selected===seq[index];
    if(correct){
      if(progress.answered.dragon?.[index]!==true){progress.xp+=15;progress.streak+=1}
      progress.answered.dragon[index]=true;
      progress.feedback={correct:true,message:"Checkpoint "+(index+1)+" is in the teacher's sequence. +15 XP"};
    }else{
      progress.streak=0;
      progress.feedback={correct:false,message:"That event belongs somewhere else on the path. Try the sequence again."};
    }
    saveProgress(progress);refresh();
  }

  function next(){
    const p=plan();const progress=loadProgress();const id=progress.activeWorld;
    progress.feedback=null;
    let total=0;
    if(id==="story"||id==="grammar")total=(flattenTermWorlds(p)[id]||[]).length;
    else if(id==="dragon")total=p?.studyBlocks?.[2]?.sequence?.length||0;
    else if(id==="boss")total=p?.studyBlocks?.[3]?.prompts?.length||0;
    if(id==="boss"&&!progress.bossDone?.[progress.index])return;
    if(progress.index+1>=total){
      progress.completed[id]=true;progress.activeWorld=null;progress.index=0;
    }else progress.index+=1;
    saveProgress(progress);refresh();
  }

  function markBossDone(index){
    const p=plan();const prompts=p?.studyBlocks?.[3]?.prompts||[];
    const progress=loadProgress();
    if(progress.activeWorld!=="boss"||index!==progress.index||!prompts[index])return;
    if(!progress.bossDone[index]){progress.bossDone[index]=true;progress.xp+=5;progress.streak+=1}
    if(Object.keys(progress.bossDone).filter(k=>progress.bossDone[k]).length>=prompts.length)progress.completed.boss=true;
    saveProgress(progress);refresh();
  }

  function toggleFinal(index){
    const p=plan();const finals=p?.finalCheck||[];const progress=loadProgress();
    if(progress.activeWorld!=="final"||!finals[index])return;
    const was=!!progress.finalDone[index];
    progress.finalDone[index]=!was;
    if(!was)progress.xp+=5;else progress.xp=Math.max(0,progress.xp-5);
    if(Object.keys(progress.finalDone).filter(k=>progress.finalDone[k]).length>=finals.length)progress.completed.final=true;
    else progress.completed.final=false;
    saveProgress(progress);refresh();
  }

  function openGuide(){guideOpen=true;refresh()}
  function closeGuide(){guideOpen=false;refresh()}

  function resetGame(){
    if(globalThis.confirm && !globalThis.confirm("Reset Moon Mountain game progress? The study content will stay."))return;
    try{globalThis.localStorage?.removeItem(GAME_KEY)}catch(_){}
    refresh();
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

  function readChallenge(){
    const text=challengeText();if(!text||!globalThis.speechSynthesis)return;
    globalThis.speechSynthesis.cancel();
    const utterance=new SpeechSynthesisUtterance(text);
    utterance.rate=.95;globalThis.speechSynthesis.speak(utterance);
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
    render,readText,readChallenge,chooseCompanion,startWorld,exitWorld,chooseTerm,chooseDragon,next,
    markBossDone,toggleFinal,openGuide,closeGuide,resetGame,
    __test:{freshProgress,flattenTermWorlds,choicesFor,dragonChoices,rankFor,worldCount}
  };
  if(typeof window!=="undefined")window.LEVEL_UP_SCHOOL_PLAN=api;
  if(typeof globalThis!=="undefined")globalThis.LEVEL_UP_SCHOOL_PLAN=api;
})();
