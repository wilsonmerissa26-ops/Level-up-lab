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
      <p><strong>Transfer mission:</strong> ${escape(m.transfer)}</p><p class="small muted">Instructional preview · not a scored assessment · no diagnostic baseline collected.</p></div>`).join("")}
      <div class="card c12"><h3>Parent implementation notes</h3><p>Recommended sequence: 8–10 minute teach block, student explanation, independent example, new-context transfer, then short break. Track help level, accuracy, latency and completion only through the existing durable School Quest/evidence bridge when that integration is implemented and audited.</p><p class="small muted">This first slice does not yet award coins, write learner progress, or unlock a PSAT game. Those require integration with the existing save and study-tracking APIs.</p></div>
    </div>`;
  }
  globalThis.LEVEL_UP_PSAT_BRIDGE=Object.freeze({version:"2026-10-14.1",modules,render});
})();
