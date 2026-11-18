// Participation gate only. No score, retention rule, prerequisite or mastery threshold is changed.
(() => {
 const V=window.LEVEL_UP_VISUAL_TEACHING;
 const fields={circuit:['voltage','r1','r2','arrangement','closed','returnWire','branch2'],energy:['device'],trip:['out','back','time','tripFrame'],acceleration:['v0','v1','duration'],positionGraph:['pattern'],velocityGraph:['pattern','v0','v1','duration'],forces:['mass','right','left'],weight:['world','released','fallTime'],gravity:['m1','m2','r'],magnet:['poles','magnetMove'],mechanical:['rampStep','friction'],heatTransfer:['heatMode'],particles:['warm','particleFrame'],wave:['waveKind','frequency','amplitude','waveFrame'],rays:['rayMode','angle'],interference:['opposite'],medium:['medium'],spectrum:['band','illumination'],seismic:['layer'],doppler:['source'],calorimetry:['sampleMass','specificHeat','initialTemp','finalTemp'],codeGame:['collect','rule','goal'],sprite:['pixel','playerX'],web:['webCode']};
 function activity(lesson,session){
  if(!lesson?.stagedTeach||session?.phase!=="TEACH"||(session.teachIndex||0)!==2)return {applies:false,ready:true,message:''};
  const c=V?.config(lesson);
  if(!c){
   const A=window.LEVEL_UP_ACADEMIC_ACTIVITIES,definition=A?.config(lesson);
   // Legacy generic interactions do not satisfy a new lesson-specific activity.
   if(!definition)return {applies:false,ready:true,message:''};
   const x=session.studentExercise?.[2];let ready=false;
   if(x?.activityId===definition.id&&x.response!=null)try{ready=A.evaluate(lesson,x.response).correct;}catch(_){}
   return {applies:true,ready,message:ready?'Your answer fits this example. Explain your reason.':'Try the activity for this lesson. Use the hint and retry until the answer fits.'};
  }
  const s=V.modelFor(lesson,session),start=V.initial(lesson,2);
  if(lesson.id==='SCI.CIRCUITS.PATH'){const ready=s.closed&&s.returnWire&&s.copperRole==='conductor'&&s.rubberRole==='insulator';return {applies:true,ready,message:ready?'The beacon is lit and both materials are checked. Explain why it works.':'Close the switch, connect the return wire, and check copper and rubber before continuing.'};}
  if(c.family==='codeGame')return {applies:true,ready:s.rule==='add'&&s.score>=s.goal,message:s.rule==='add'&&s.score>=s.goal?'Your event rule reached the goal. Explain the score changes.':'Use change score by 1, then collect enough stars to test your goal.'};
  const meaningful=(session.teachingLab?.actions||[]).some(a=>a.step===2&&a.changed===true&&fields[c.family]?.includes(a.action));
  const different=(fields[c.family]||[]).some(key=>JSON.stringify(s[key])!==JSON.stringify(start[key]));
  let ready=meaningful||different;
  if(c.family==='sprite')ready=JSON.stringify(s.pixels)!==JSON.stringify(start.pixels)||s.playerX!==start.playerX||meaningful;
  if(c.family==='magnet')ready=s.magnetMove!=='still';
  if(c.family==='web'){const normalize=code=>String(code).replace(/<!--[\s\S]*?-->/g,'').replace(/\s+/g,'');ready=!!String(s.webCode).trim()&&normalize(s.webCode)!==normalize(start.webCode);}
  return {applies:true,ready,message:ready?'Your model change is saved. Explain what happened.':c.family==='web'?'Edit the example and build a changed preview before continuing.':'Change something in the model and watch the result before continuing.'};
 }
 function describe(lesson,index,s){if(index!==2)return '';return lesson.id==='SCI.CIRCUITS.PATH'?`Fix both gaps. Copper should carry charge; rubber should block charge. Your copper choice: ${s.copperRole||'not chosen'}. Your rubber choice: ${s.rubberRole||'not chosen'}.`:'Change the model and observe the result. This is practice, not proof of mastery.';}
 window.LEVEL_UP_PROGRESSION={activity,describe};
})();
