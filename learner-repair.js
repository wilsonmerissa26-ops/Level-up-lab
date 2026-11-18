// Review-only teaching repair. This module never rewrites historical learner evidence.
(() => {
 const C=window.LEVEL_UP_CONTENT;
 const shorter=[
 ['For a straight-route position-time graph through (2 s, 4 m) and (6 s, 16 m), slope = (16 − 4)/(6 − 2) = +3 m/s.','Use points (2 s, 4 m) and (6 s, 16 m). Slope = (16 − 4)/(6 − 2) = +3 m/s.'],
 ['For a 2 kg object near Earth, using g = 9.8 m/s², weight = 2 × 9.8 = 19.6 N downward.','Near Earth, use g = 9.8 m/s². A 2 kg object weighs 2 × 9.8 = 19.6 N downward.'],
 ['In the Newtonian model for point masses or spherically symmetric objects, gravitational attraction depends on both masses and center-to-center separation: F = Gm₁m₂/r².','Both masses and center-to-center distance affect gravity: F = Gm₁m₂/r². This model applies to point masses or spherically symmetric objects.'],
 ['Use V = I × R for voltage; I = V ÷ R for current; R = V ÷ I for resistance.','For voltage, use V = I × R. For current, use I = V ÷ R. For resistance, use R = V ÷ I.'],
 ['Calculated practice data, not the school lab results: at 12 V, resistance 15, 30, and 60 Ω gives current 0.80, 0.40, and 0.20 A.','These are calculated examples, not school lab results. At 12 V: 15 Ω gives 0.80 A. 30 Ω gives 0.40 A. 60 Ω gives 0.20 A.'],
 ['For the rule y = 2x + 1, x = 0 gives y = 1; x = 1 gives y = 3; x = 2 gives y = 5.','Use y = 2x + 1. Input 0 gives output 1. Input 1 gives output 3. Input 2 gives output 5.'],
 ['Check repeated inputs in a table. (1,4), (2,4), (3,4) is a function because each input has one output. (1,4), (1,7) is not: input 1 has two different outputs.','Check for repeated inputs. The pairs (1,4), (2,4), (3,4) form a function: each input has one output. The pairs (1,4) and (1,7) fail: input 1 has two outputs.'],
 ['In MakeCode Blocks, create a sprite of kind Player inside on start, choose a custom image, set the background, then use move mySprite with buttons.','Inside on start, create a sprite of kind Player. Choose its image and set a background. Add move mySprite with buttons.'],
 ['Open the saved link to verify it points to the intended project and works for the required audience, then attach it and complete the Classroom submission step.','Open your saved project link. Check that the intended audience can use it. Attach it, then finish the Classroom submission.']
 ];
 for(const l of [...(C.science||[]),...(C.math||[]),...(C.ela||[]),...(C.coding||[])])l.teach=l.teach.map(block=>block.map(t=>shorter.reduce((text,[a,b])=>text.split(a).join(b),t)));
 const legacyChecks=Object.fromEntries([...(C.science||[]),...(C.math||[]),...(C.ela||[]),...(C.coding||[])].map(l=>[l.id,JSON.parse(JSON.stringify(l.checks))]));
 const esc=x=>String(x??'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
 const gaps={
 'SCI.CIRCUITS.DATA':[['The factor you deliberately change is the independent variable. The measured response is the dependent variable.','Here, resistance is the independent variable. Current is the dependent variable. Keep voltage controlled.'],['Worked example: set voltage to 12 V and choose several resistances. Record the resulting current for each resistance.']],
 'SCI.CIRCUITS.PATH':[
 ['Charge can move through some materials. These are conductors. Copper wire is a conductor.', 'Rubber resists charge movement. It is an insulator. Rubber coating helps keep charge inside a wire.'],
 ['A copper connection can complete the loop. Rubber in that connection would interrupt the conducting path.', 'Example: a toy has a copper wire covered with rubber. The copper carries current; the covering insulates.']],
 'SCI.SPS7A.ENERGY_FORMS':[
 ['Moving objects have kinetic energy. A rolling skateboard has kinetic energy because it moves.', 'A raised object stores gravitational potential energy. A stretched spring stores elastic potential energy.', 'Food and batteries store chemical energy. Light carries radiant energy. Sunlight is radiant energy.', 'Thermal energy involves microscopic particle motion and interactions. Sound carries energy through vibrations in a material.', 'Electrical energy can be transferred by a current. Nuclear energy involves changes in atomic nuclei.'],
 ['Worked example: a runner eats breakfast, then runs. Food stores chemical energy; the moving runner has kinetic energy.', 'A lamp receives energy electrically. It transfers energy as light and heat. Light is radiant energy.']],
 'SCI.WAVES.INTERFERENCE':[
 ['Some waves pass through materials. This is transmission. Absorption transfers wave energy into the material.', 'Transparent materials transmit a clear view. Translucent materials transmit light but blur the view.', 'Opaque materials block visible light passing through. They can reflect or absorb that light.'],
 ['Worked comparison: a clear window is transparent. A shower screen can be translucent. A metal door is opaque.', 'Frosted glass scatters transmitted light. You see light through it, but objects look blurred.']],
 'SCI.WAVES.SEISMIC':[
 ['An earthquake starts below the surface at its focus. Its epicenter is directly above the focus on the surface.'],
 ['Imagine a vertical line from the underground starting point to the surface. The upper point is the epicenter.']],
 'SCI.WAVES.LIGHT':[
 ['A prism can spread white light into colors. This is dispersion.', 'Different wavelengths refract by different amounts. In ordinary glass, violet bends more than red.'],
 ['Worked example: white light enters a prism. The colors leave at different angles, forming a spectrum.']],
 'SCI.MOTION.FORCES':[
 ['Forces come in pairs acting on different objects. This is Newton’s third law.', 'Your hand pushes a wall. The wall pushes your hand equally in the opposite direction.'],
 ['Draw two boxes: hand and wall. Put one force arrow on each object.', 'These paired forces do not cancel on one diagram. Each arrow acts on a different object.']]
 };
 function lines(lesson,index,original){const out=[];if(index===0){const source=JSON.stringify(window.LEVEL_UP_VISUAL_TEACHING?.config(lesson)||original);if(/ohmic/i.test(source))out.push('Some resistors follow a steady voltage-to-current relationship. These are called ohmic resistors at a constant temperature.');if(/topology/i.test(source))out.push('Look at which parts connect. This connection pattern is called topology.');if(/flux/i.test(source))out.push('A magnetic field can pass through a coil. Magnetic flux measures the field passing through its chosen surface.');}if(index<2)out.push(...(gaps[lesson.id]?.[index]||[]));if(original?.length){const slot=index===0?0:index===1?1:index===2?2:3;const block=original[slot];if(block)out.push(...block);}return out;}
 function teaching(lesson,index,original){const a=lines(lesson,index,original);return a.length?`<section class="concept-repair"><h4>${index===0?'Know the idea':index===1?'See another worked example':'Connect the ideas'}</h4>${a.map(t=>`<p>${esc(t)}</p>`).join('')}</section>`:'';}
 function narration(lesson,index,original){return lines(lesson,index,original).join('. ');}
 // Word-boundary chunks preserve decimal numbers, abbreviations and complete words.
 function speechChunks(value,max=220){
  const text=String(value).replace(/([.!?])\1+/g,'$1').replace(/\s+/g,' ').trim();
  if(!text)return [];
  const sentences=typeof Intl!=='undefined'&&Intl.Segmenter?Array.from(new Intl.Segmenter('en',{granularity:'sentence'}).segment(text),x=>x.segment.trim()).filter(Boolean):text.split(/(?<=[.!?])\s+(?=[A-Z“"'])/u).filter(Boolean);
  const chunks=[];let chunk='';for(const sentence of sentences){if(chunk&&chunk.length+sentence.length+1>max){chunks.push(chunk);chunk='';}chunk+=(chunk?' ':'')+sentence;}if(chunk)chunks.push(chunk);return chunks;
 }

 const revisions=[],revisionWarnings=[],catalog=window.LEVEL_UP_QUESTION_REVISIONS?.items||[];
 const byQuestion=new Map(catalog.map(r=>[r.lessonId+'::'+r.sourceId,r]));
 for(const l of [...(C.science||[]),...(C.math||[]),...(C.ela||[]),...(C.coding||[])])for(const q of l.checks||[]){
  if(!q.choices)continue;const spec=byQuestion.get(l.id+'::'+q.id);
  if(!spec||spec.expectedPrompt!==q.q||JSON.stringify(spec.expectedChoices)!==JSON.stringify(q.choices)||spec.expectedAnswer!==q.answer){revisionWarnings.push({lessonId:l.id,itemId:q.id,reason:'No matching author-reviewed question snapshot'});continue;}
  if(q.id===spec.id&&q.q===spec.prompt&&JSON.stringify(q.choices)===JSON.stringify(spec.choices))continue;
  const before=JSON.parse(JSON.stringify(q));q.q=spec.prompt;q.choices=[...spec.choices];q.previousItemId=q.id;q.supersedesItemIds=[...spec.supersedesIds];q.id=spec.id;q.contentVersion=q.id.endsWith('r2')?'2026-11-18-r2':'2026-11-18-r1';
  revisions.push({lessonId:l.id,previous:before,current:JSON.parse(JSON.stringify(q)),authorRationale:spec.rationale,independentReview:'REQUIRED'});
 }
 const glossary=[['Voltage','Voltage is a difference in electric potential between two points. It is energy transferred per unit charge.'],['Topology','The way parts connect, regardless of the drawing’s shape.'],['Magnetic flux','How much magnetic field passes through a chosen surface.'],['Ohmic','Describes a resistor whose current changes in proportion to its voltage at constant temperature.']];
 function glossaryHTML(){return `<details class="science-words"><summary>Explain the science words</summary>${glossary.map(([a,b])=>`<p><strong>${a}:</strong> ${b}</p>`).join('')}</details>`;}
 window.LEVEL_UP_REPAIR={legacyChecks,gaps,lines,teaching,narration,speechChunks,revisions,revisionWarnings,glossaryHTML};
})();
(() => {
 const R=window.LEVEL_UP_REPAIR,C=window.LEVEL_UP_CONTENT;
 const e=x=>String(x??'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
 function studentRoute(route){return ['dashboard','science-homework','track-b','track-b-math','track-b-ela','track-b-coding','reviews','student-help'].includes(route);}
 function today(s){const next=list=>list.find(l=>s.lessonState?.[l.id]?.status!=='COMPLETED')||list[0],science=next(C.science.filter(l=>l.id.startsWith('SCI.MOTION.'))),coding=next(C.coding),task=(s.schoolHomework?.tasks||[]).find(t=>t.status==='WORKING'||t.status==='TO_VERIFY'),d=s.schoolHomework?.days?.[window.LEVEL_UP_HOMEWORK.dateKey()]||{};
 return `<div class="card student-today"><span class="pill info">Your next mission</span><h2>Today: ${e(science.title.replace(/^\d+\. /,''))}</h2><p>Work at your pace. Pause for a break whenever you need one.</p><button class="btn primary" ${s.activeSession?'disabled':''} onclick="window.MLUL.startLesson('${science.id}','science')">Start this science mission</button><p>First see it. Then change the model. Finish by explaining what happened.</p><form id="dailyTasks"><h3>One step at a time</h3><label class="homework-check"><input type="checkbox" name="science" ${d.science?'checked':''}>1. Finish ${e(science.title.replace(/^\d+\. /,''))}.</label><label class="homework-check"><input type="checkbox" name="apply" ${d.apply?'checked':''}>2. Write one sentence explaining your result.</label><label class="homework-check"><input type="checkbox" name="school" ${d.school?'checked':''}>3. ${task?'Open '+e(task.title)+'.':'Ask an adult to name your next school assignment.'}</label><p>${task?'School work: '+e(task.title)+(task.note?' · Next step: '+e(task.note):''):'No exact school assignment has been added yet. This app mission is practice.'}</p><label class="homework-check"><input type="checkbox" name="coding" ${d.coding?'checked':''}>4. Complete the coding activity: ${e(coding.title.replace(/^\d+\. /,''))}.</label><button type="button" class="btn" onclick="window.MLUL.startLesson('${coding.id}','coding')">Open coding practice</button><label class="homework-check"><input type="checkbox" name="review" ${d.review?'checked':''}>5. Check your due reviews.</label><button type="button" class="btn" onclick="location.hash='reviews'">Open my reviews</button><label for="dayNote">What do you need help with?</label><textarea id="dayNote" rows="2">${e(d.note||'')}</textarea><button type="button" class="btn" onclick="window.MLUL.saveDailyTasks()">Save my checklist</button></form></div>`;
 }
 function help(){return `<div class="card"><h2>Stuck? Start here.</h2><p>Tap Read this page to hear the directions. You can slow the voice down.</p><p>In a lesson, open the model and change one thing. Watch the result.</p><p>If it still makes no sense, ask an adult: “Can you show me the first step?”</p><button class="btn primary" onclick="location.hash='dashboard'">Go to Today</button><details><summary>Parent tools</summary><p>Support records, saved progress and backup tools are here.</p><button class="btn" onclick="location.hash='parent'">Parent View</button><button class="btn" onclick="location.hash='backup'">Save or restore a backup</button><button class="btn" onclick="location.hash='school-plan'">School plan and assignment setup</button></details></div>`;}
 Object.assign(R,{studentRoute,today,help});
})();
(() => {
 const R=window.LEVEL_UP_REPAIR;
 const e=x=>String(x??'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
 function exercise(lesson,session){return window.LEVEL_UP_ACADEMIC_ACTIVITIES?.render(lesson,session)||'';}

 R.exercise=exercise;
})();
(() => {
 const R=window.LEVEL_UP_REPAIR,C=window.LEVEL_UP_CONTENT;
 const e=x=>String(x??'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
 function subject(s,key,allowed){const all=C[key]||[],list=key==='math'?[...all.filter(l=>l.id.startsWith('MATH.SCHOOL.')),...all.filter(l=>!l.id.startsWith('MATH.SCHOOL.'))]:all,title={science:'Science missions',math:'Math missions',ela:'Reading and writing missions',coding:'Coding missions'}[key];const ready=l=>!l.prereq||s.lessonState?.[l.prereq]?.status==='COMPLETED',first=list.find(l=>ready(l)&&s.lessonState?.[l.id]?.status!=='COMPLETED')||list.find(ready);
 return `<section class="card"><h2>${title}</h2><p>${key==='science'?'Current focus: motion and forces. Earlier topics are below.':key==='coding'?'Build something small. Test it. Explain what it does.':'See an example, try it, and explain your thinking.'}</p>${first?`<h3>${e(first.title)}</h3><button class="btn primary" ${allowed&&!s.activeSession?'':'disabled'} onclick="window.MLUL.startLesson('${first.id}','${key}')">Start this mission</button>`:''}<p>You can save and take a break.</p></section><section class="card student-missions"><h3>Choose a mission</h3>${list.map(l=>`<article class="lesson-card"><h4>${e(l.title)}</h4><p>${s.lessonState?.[l.id]?.status==='COMPLETED'?'Practiced before. You can revisit it.':ready(l)?'Ready when you are.':'Finish the earlier lesson first.'}</p><button class="btn" ${allowed&&ready(l)?'':'disabled'} onclick="window.MLUL.startLesson('${l.id}','${key}')">${s.lessonState?.[l.id]?.status==='COMPLETED'?'Go back over this':'Open mission'}</button></article>`).join('')}</section>`;
 }
 R.subject=subject;
})();
(() => {
 const R=window.LEVEL_UP_REPAIR,C=window.LEVEL_UP_CONTENT,e=x=>String(x??'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
 R.reviews=(s,allowed)=>{const rows=s.reviewSchedule||[],due=rows.find(r=>!r.completed&&new Date(r.dueAt)<=new Date()),title=r=>[...C.science,...C.math,...C.ela,...C.coding].find(l=>l.id===r.skillId)?.title||'Saved mission';return `<section class="card"><h2>Try it again later</h2><p>A later review helps you see what you still remember.</p>${due?`<h3>${e(title(due))}</h3><button class="btn primary" ${allowed?'':'disabled'} onclick="window.MLUL.startReview('${e(due.id)}')">Start my due review</button>`:'<p>No review is due right now.</p><button class="btn primary" onclick="location.hash=\'dashboard\'">Go to Today</button>'}${rows.map(r=>`<p>${e(title(r))} · ${new Date(r.dueAt).toLocaleDateString()} · ${r.completed?'Saved':new Date(r.dueAt)<=new Date()?'Ready':'Coming later'}</p>`).join('')}</section>`;};
})();
