(() => {
  "use strict";
  // Instructional content only. No assessment records or diagnostic evidence.
  const modules = Object.freeze([
    {id:"read-scan",subject:"Reading",title:"Reading Detective · Find the clue",minutes:8,teach:[
      ["Read the question first","Identify whether it asks for main idea, evidence, vocabulary, or inference."],
      ["Scan for anchors","Look for names, numbers, and contrast words such as however and although."],
      ["Read around the clue","Read the full sentence and neighboring sentence before deciding."],
      ["Prove the answer","Choose only what the passage supports; eliminate exaggerations and outside assumptions."]
    ],transfer:"Explain which sentence proves your answer, then apply the method to a new short passage."},
    {id:"read-meaning",subject:"Reading",title:"Meaning in seven words",minutes:8,teach:[
      ["Read the short passage","Identify who or what it is mainly about."],
      ["Notice the turn","But, however, and although can signal the writer's key contrast."],
      ["Summarize","Say the central point in seven words or fewer."],
      ["Check","Make sure your summary covers the whole passage, not one detail."]
    ],transfer:"Summarize an unfamiliar science paragraph without copying its first sentence."},
    {id:"math-percent",subject:"Math",title:"Shortcut Academy · Percent sense",minutes:10,teach:[
      ["Understand percent","Percent means out of 100. 25% is one quarter."],
      ["Build 10%","Divide by ten: 10% of 80 is 8."],
      ["Build 5% and 15%","Half of 10% is 5%; add 10% and 5% to get 15%."],
      ["Verify","Check whether the answer is reasonable and distinguish the discount from the final price."]
    ],transfer:"Explain two ways to find 15% of a new number, then solve a sale-price word problem."},
    {id:"math-functions",subject:"Math",title:"Linear Functions · See the pattern",minutes:10,teach:[
      ["Understand a function","Each input has exactly one output."],
      ["Spot constant change","Compare how y changes when x increases by one."],
      ["Find slope","Slope = change in y divided by change in x."],
      ["Connect representations","Match a verbal rule, table, graph, and equation."]
    ],transfer:"Build a new table from a real-life rate and explain its slope in words."},
    {id:"science-bridge",subject:"Science",title:"Waves · Explain the model",minutes:10,teach:[
      ["Read a wave diagram","Identify amplitude, wavelength, and frequency without guessing from labels."],
      ["Explain the relationship","For waves with the same speed, higher frequency means shorter wavelength."],
      ["Compare types","Mechanical waves require a medium; electromagnetic waves do not."],
      ["Use evidence","Explain how the diagram or data supports the conclusion."]
    ],transfer:"Interpret an unfamiliar wave diagram and explain the relationship independently."}
  ]);
  function escape(value){return String(value).replace(/[&<>"']/g,ch=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[ch]));}

  const challenges=Object.freeze({
    "read-scan":{q:"The library extended its hours. However, weekend visits stayed low. What does 'however' signal?",choices:["A contrast","A cause","A definition"],answer:0,why:"However contrasts longer hours with low weekend visits."},
    "read-meaning":{q:"Maya practiced daily and improved her free throws. What is the central idea?",choices:["Practice helped Maya improve","Maya changed sports","Practice never works"],answer:0,why:"The whole passage connects practice to improvement."},
    "math-percent":{q:"A $60 jacket is 15% off. What is the sale price?",choices:["$9","$51","$45"],answer:1,why:"10% is $6; 5% is $3; discount $9, so $60 minus $9 is $51."},
    "math-functions":{q:"A table shows x: 0,1,2 and y: 4,7,10. What is the slope?",choices:["4","7","3"],answer:2,why:"Each increase of 1 in x increases y by 3."},
    "science-bridge":{q:"Two waves travel at the same speed. Wave A has twice the frequency of B. What happens to its wavelength?",choices:["Twice as long","Half as long","No change"],answer:1,why:"At constant speed, wavelength and frequency are inversely related."}
  });
  const extraChallenges={
    "read-scan":{q:"Rainfall increased. Nevertheless, the harvest was smaller. What does 'nevertheless' signal?",choices:["Contrast","Definition","Sequence"],answer:0,why:"The smaller harvest contrasts with more rain."},
    "read-meaning":{q:"Shade made plants grow taller but produce fewer flowers. What is the central idea?",choices:["Shade affected plant growth","All plants need shade","Flowers grew faster"],answer:0,why:"Shade changed both height and flowering."},
    "math-percent":{q:"A $48 game is 25% off. What is its sale price?",choices:["$12","$36","$42"],answer:1,why:"One quarter of $48 is $12; subtract to get $36."},
    "math-functions":{q:"When x rises 1, y rises 5. What is the slope?",choices:["1","5","6"],answer:1,why:"Slope is change in y divided by change in x, or 5/1."},
    "science-bridge":{q:"Which wave can travel through empty space?",choices:["Sound","Water waves","Light"],answer:2,why:"Light is electromagnetic and needs no material medium."}
  };
  // The item alternates with every attempt, so the next attempt after a miss is a different item.
  // Both items are seen after two attempts; later attempts are replays of a previously seen item and are labeled as practice.
  function variantFor(p){return (Number(p.attempts)||0)%2;}
  function challengeFor(id,p,variant=variantFor(p)){return variant?extraChallenges[id]:challenges[id];}
  function isReplay(p){return (Number(p.attempts)||0)>=2;}
  let active=null;
  let busy=false;
  function bridge(){return globalThis.LEVEL_UP_APP||globalThis.MLUL;}
  function access(){return bridge()?.schoolQuestAccess?.();}
  function questId(id){return "PSAT.BRIDGE.2026."+id;}
  function saved(id){return bridge()?.getSchoolQuestProgress?.(questId(id))||{version:1,attempts:0,completed:false};}
  function item(id,round=0){return {itemId:questId(id)+":transfer-"+(round+1),targetId:"PSAT."+id.toUpperCase().replace(/-/g,"."),label:modules.find(m=>m.id===id)?.title,promptType:"INSTRUCTIONAL_TRANSFER"};}
  function refresh(){bridge()?.refreshPSATBridge?.();}
  async function start(id){
    if(busy||!challenges[id])return;
    if(!access()?.allowed){alert(access()?.message||"Learner storage is not ready.");return;}
    busy=true;
    try{
      const m=modules.find(x=>x.id===id),p=saved(id),round=variantFor(p);
      const ok=await bridge().beginSchoolQuestItems({questId:questId(id),contentVersion:1,subject:m.subject,worldId:"transfer",items:[item(id,round)],progress:p,reason:"PSAT instructional transfer presented"});
      if(ok){active={id,round,replay:isReplay(p)};refresh();}
    }finally{busy=false;}
  }
  async function answer(id,choice){
    if(busy||active?.id!==id)return;
    busy=true;
    try{
      const p=saved(id),challenge=challengeFor(id,p,active.round),correct=choice===challenge.answer;
      const next={...p,attempts:(p.attempts||0)+1,completed:p.completed||correct,completedRounds:(Number(p.completedRounds)||0)+(correct?1:0),lastCorrect:correct};
      const ok=await bridge().recordSchoolQuestAttempt({questId:questId(id),contentVersion:1,worldId:"transfer",itemId:item(id,active.round).itemId,response:challenge.choices[choice],isCorrect:correct,progress:next,reason:"PSAT transfer attempt"});
      if(ok){active={id,choice,correct,round:active.round,replay:active.replay,challenge};refresh();}
    }finally{busy=false;}
  }
  async function finish(id){
    if(busy||active?.id!==id)return;
    busy=true;
    try{
      const ok=await bridge().endSchoolQuestStudySession({questId:questId(id),contentVersion:1,worldId:"transfer",progress:saved(id),status:"COMPLETED",reason:"PSAT transfer session ended"});
      if(ok){active=null;refresh();}
    }finally{busy=false;}
  }
  function challengeUI(m){
    const p=saved(m.id),c=active?.id===m.id&&active.challenge?active.challenge:challengeFor(m.id,p,active?.id===m.id?active.round:variantFor(p)),a=access(),current=active?.id===m.id;
    if(!a?.allowed)return '<p class="small muted">Practice locked until the audited learner save path is ready.</p>';
    if(!current)return `<p class="small muted">Saved attempts: ${Number(p.attempts)||0} · Solved rounds: ${Number(p.completedRounds)||0}</p><button class="btn primary" onclick="LEVEL_UP_PSAT_BRIDGE.start('${m.id}')">Start transfer challenge</button>`;
    return `<div>${active.replay?'<p class="small muted">Replay practice: Michael has seen this item before, so this attempt is practice, not new evidence.</p>':""}<p><strong>${escape(c.q)}</strong></p>${c.choices.map((v,i)=>`<button class="btn" style="margin:4px" ${active.choice!==undefined?"disabled":""} onclick="LEVEL_UP_PSAT_BRIDGE.answer('${m.id}',${i})">${escape(v)}</button>`).join("")}${active.choice!==undefined?`<p><strong>${active.correct?"Correct":"Try the explanation"}:</strong> ${escape(c.why)}</p><button class="btn" onclick="LEVEL_UP_PSAT_BRIDGE.finish('${m.id}')">Finish and save</button>`:""}</div>`;
  }
  function render(){
    return `<div class="grid">
      <div class="card c12"><h2>PSAT + School Skills · Level-Up</h2>
      <p>PSAT 8/9 school-reported date: <strong>October 27, 2026</strong>. This is an instructional bridge, not a timed diagnostic. Teach → explain → independent application → transfer; introduce speed only after accuracy.</p>
      <p class="small muted">Official Bluebook practice: <a href="https://satsuite.collegeboard.org/practice" target="_blank" rel="noopener noreferrer">College Board practice</a>. Confirm PSAT accommodations with the school.</p></div>
      <div class="card c12"><h3>Classroom alignment · awaiting teacher confirmation</h3>
      <p><strong>Science:</strong> last confirmed Unit 2 Waves; next unit not verified. <strong>Math:</strong> last confirmed Unit 2A Linear Relationships and Functions; next unit not verified. Do not label bridge lessons as current teacher assignments.</p>
      <p class="small muted">October 3 newsletter is the latest supplied curriculum evidence. Import the new Knowledge Organizers before promoting a topic to CURRENT_UNIT.</p></div>
      ${modules.map(m=>`<div class="card c6"><span class="pill">${escape(m.subject)} · ${m.minutes} min</span><h3>${escape(m.title)}</h3>
      <ol>${m.teach.map(([name,detail])=>`<li><strong>${escape(name)}:</strong> ${escape(detail)}</li>`).join("")}</ol>
      <p><strong>Transfer mission:</strong> ${escape(m.transfer)}</p>${challengeUI(m)}<p class="small muted">School Success practice · PRIOR_INSTRUCTION · never a clean diagnostic baseline.</p></div>`).join("")}
      <div class="card c12"><h3>Parent implementation notes</h3><p>Recommended sequence: 8–10 minute teach block, student explanation, independent example, new-context transfer, then short break. Track help level, accuracy, latency and completion only through the existing durable School Quest/evidence bridge when that integration is implemented and audited.</p><p class="small muted">Transfer attempts now use the existing durable School Quest study tracking, including response timing and first-try accuracy. Coins and full game worlds remain future work.</p></div>
    </div>`;
  }
  globalThis.LEVEL_UP_PSAT_BRIDGE=Object.freeze({version:"2026-10-14.3",modules,render,start,answer,finish});
})();
