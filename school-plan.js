(() => {
  function render(escapeHTML){
    const plan=globalThis.LEVEL_UP_CONTENT?.schoolPlan?.urgent;
    if(!plan)return "<div class=\"card\"><h2>School Plan</h2><p class=\"muted\">No urgent school items are loaded.</p></div>";

    let blocks="";
    for(const block of plan.studyBlocks){
      if(block.terms){
        let rows="";
        for(const pair of block.terms){
          rows+="<tr><td><strong>"+escapeHTML(pair[0])+"</strong></td><td>"+escapeHTML(pair[1])+"</td></tr>";
        }
        blocks+="<div class=\"card c12\"><span class=\"pill info\">"+block.minutes+" min</span><h3 style=\"margin-top:8px\">"+escapeHTML(block.title)+"</h3><div class=\"tablewrap\"><table><thead><tr><th>Know this term</th><th>Meaning</th></tr></thead><tbody>"+rows+"</tbody></table></div></div>";
        continue;
      }
      if(block.sequence){
        let seq="";
        for(const x of block.sequence)seq+="<li>"+escapeHTML(x)+"</li>";
        let facts="";
        for(const pair of (block.quickFacts||[])){
          facts+="<details class=\"teacher\"><summary><strong>"+escapeHTML(pair[0])+"</strong></summary><p class=\"small\">"+escapeHTML(pair[1])+"</p></details>";
        }
        blocks+="<div class=\"card c12\"><span class=\"pill info\">"+block.minutes+" min</span><h3 style=\"margin-top:8px\">"+escapeHTML(block.title)+"</h3><p class=\"small muted\">Say these five events in order without looking.</p><ol>"+seq+"</ol><div class=\"spacer\"></div>"+facts+"</div>";
        continue;
      }
      if(block.prompts){
        let prompts="";
        for(const p of block.prompts){
          prompts+="<details class=\"teacher\"><summary><strong>"+escapeHTML(p.q)+"</strong></summary><p class=\"small\">"+escapeHTML(p.studyHelp)+"</p><p class=\"tiny muted\">"+escapeHTML(p.sourceNote)+"</p></details>";
        }
        blocks+="<div class=\"card c12\"><span class=\"pill info\">"+block.minutes+" min</span><h3 style=\"margin-top:8px\">"+escapeHTML(block.title)+"</h3><p class=\"small muted\">Answer each one out loud before opening the study help.</p>"+prompts+"</div>";
      }
    }

    let checks="";
    for(const x of plan.finalCheck)checks+="<li>"+escapeHTML(x)+"</li>";

    return "<div class=\"grid\">"+
      "<div class=\"card c8\"><span class=\"pill warn\">TEST TOMORROW · SEPT. 29</span><h2 style=\"margin-top:10px\">"+escapeHTML(plan.title)+"</h2><p class=\"muted\">Teacher-file study plan · School Success lane</p><div class=\"callout green small\"><strong>Study order:</strong> 10 min vocabulary → 10 min literary/grammar → 8 min plot sequence → 12 min teacher review → 5 min no-notes check.</div><div class=\"row\"><button class=\"btn primary\" onclick=\"window.MLUL.readSchoolPlan()\">🔊 Read study plan</button><button class=\"btn\" onclick=\"speechSynthesis.cancel()\">■ Stop</button></div></div>"+
      "<div class=\"card c4\"><div class=\"label\">Tonight</div><div class=\"big\">45 min</div><p class=\"small muted\">Study support only. This page does not create formal diagnostic evidence.</p></div>"+
      blocks+
      "<div class=\"card c12\"><h3>Final no-notes check</h3><p class=\"small muted\">If Michael cannot do one without looking, return to that section for 3–5 minutes.</p><ol>"+checks+"</ol></div>"+
      "</div>";
  }

  function readText(){
    const plan=globalThis.LEVEL_UP_CONTENT?.schoolPlan?.urgent;
    if(!plan)return "";
    const pieces=[plan.title,"Study in this order."];
    for(const block of plan.studyBlocks){
      pieces.push(block.title);
      if(block.terms)for(const pair of block.terms)pieces.push(pair[0]+". "+pair[1]);
      if(block.sequence)block.sequence.forEach((x,i)=>pieces.push("Step "+(i+1)+". "+x));
      if(block.quickFacts)for(const pair of block.quickFacts)pieces.push(pair[0]+" "+pair[1]);
      if(block.prompts)for(const p of block.prompts)pieces.push(p.q+" "+p.studyHelp);
    }
    pieces.push("Final no-notes check.");
    for(const x of plan.finalCheck)pieces.push(x);
    return pieces.join(" ");
  }

  const api={render,readText};
  if(typeof window!=="undefined")window.LEVEL_UP_SCHOOL_PLAN=api;
  if(typeof globalThis!=="undefined")globalThis.LEVEL_UP_SCHOOL_PLAN=api;
})();
