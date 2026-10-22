(() => {
  const SKILL_IDS = Object.freeze([
    ...(window.LEVEL_UP_SCHOOL_SCIENCE?.lessons||[]).map(l=>l.id),
    ...(window.LEVEL_UP_SCHOOL_ACADEMICS?.lessons||[]).map(l=>l.id),
    "SCI.SPS7A.ENERGY_FORMS",
    "SCI.SPS7A.TRANSFER_TRANSFORMATION",
    "SCI.SPS7B.MECHANICAL",
    "SCI.SPS7C.HEAT_TRANSFER",
    "SCI.SPS7D.PARTICLE_MOTION",
    "SCI.SPS7E.CONCEPT",
    "SCI.SPS7E.SYMBOLS_UNITS",
    "SCI.SPS7E.DELTA_T",
    "SCI.SPS7E.FORMULA_SETUP",
    "SCI.SPS7E.LITERAL_REARRANGE",
    "SCI.SPS7E.CALCULATION",
    "MATH.INVERSE_OPERATIONS",
    "MATH.LITERAL_EQUATIONS",
    "SCI.WAVES.TYPES",
    "SCI.WAVES.RELATIONSHIPS",
    "SCI.WAVES.BEHAVIORS",
    "SCI.WAVES.INTERFERENCE",
    "SCI.WAVES.SPEED",
    "SCI.WAVES.LIGHT",
    "SCI.WAVES.SEISMIC",
    "SCI.WAVES.DOPPLER"
  ]);

  function hash(text){
    let h=2166136261;
    for(let i=0;i<text.length;i++){h^=text.charCodeAt(i);h=Math.imul(h,16777619)}
    return h>>>0;
  }
  function rng(seed){
    let a=seed>>>0;
    return ()=>{a|=0;a=a+0x6D2B79F5|0;let t=Math.imul(a^a>>>15,1|a);t=t+Math.imul(t^t>>>7,61|t)^t;return ((t^t>>>14)>>>0)/4294967296}
  }
  function pick(list,r){return list[Math.floor(r()*list.length)]}
  function shuffle(list,r){
    const a=[...list];
    for(let i=a.length-1;i>0;i--){const j=Math.floor(r()*(i+1));[a[i],a[j]]=[a[j],a[i]]}
    return a;
  }
  function choice(prompt,correct,distractors,r,extra={}){
    const pool=[correct,...distractors].filter((v,i,a)=>a.indexOf(v)===i);
    const choices=shuffle(pool,r);
    return {q:prompt,choices,answer:choices.indexOf(correct),why:extra.why||"",transfer:!!extra.transfer};
  }
  function free(prompt,answer,why,extra={}){return {q:prompt,free:String(answer),why,transfer:!!extra.transfer}}
  function windowIndex(w){return ({"Day 2":0,"Day 7":1,"Day 21":2})[w]??0}
  // Picks a scenario reserved for this window, so a Day 7 item never repeats the Day 2 scenario.
  function forWindow(list,w){return list[windowIndex(w)%list.length]}

  const generators={
    "SCI.SPS7A.ENERGY_FORMS":(r,w)=>{
      const moving=forWindow(["a skateboard rolling down a sidewalk","a football flying through the air","a cyclist moving down the street"],w);
      const stored=forWindow(["a stretched rubber band","a book resting on a high shelf","water held behind a dam"],w);
      const source=forWindow(["a battery before it powers a toy","food before a runner uses it","gasoline before it burns in an engine"],w);
      return [
        choice(`Which form of energy is most directly shown by ${moving}?`,"Kinetic energy",["Chemical energy","Nuclear energy","Radiant energy"],r,{why:"Motion is kinetic energy."}),
        choice(`Which form of energy is stored in ${stored}?`,"Potential energy",["Sound energy","Kinetic energy","Radiant energy"],r,{why:"Stored energy due to position or condition is potential energy."}),
        w==="Day 21"
          ?choice("A wind turbine’s blades spin in moving air. Which form of energy does the moving air carry?","Kinetic energy",["Chemical energy","Nuclear energy","Gravitational potential energy only"],r,{why:"Moving air has kinetic energy, which the turbine captures.",transfer:true})
          :choice(`Which form of energy is stored in ${source}?`,"Chemical energy",["Sound energy","Radiant energy","Kinetic energy"],r,{why:"Batteries, food, and fuels store chemical energy."})
      ];
    },
    "SCI.SPS7A.TRANSFER_TRANSFORMATION":(r,w)=>{
      const transfer=forWindow(["a hot baking sheet warms the cookie touching it","one moving billiard ball strikes another and the second ball moves","a warm hand melts an ice cube it is holding"],w);
      const transform=forWindow(["a lamp changes electrical energy into light","a blender changes electrical energy into motion","a speaker changes electrical energy into sound"],w);
      const mixed=forWindow(["a battery-powered flashlight turns on","a phone vibrates when a notification arrives","an electric drill spins its bit"],w);
      return [
        choice(`For the school classification, ${transfer}. Is this mainly transfer or transformation?`,"Transfer",["Transformation"],r,{why:"Energy moves between objects without the key form changing."}),
        choice(`For the school classification, ${transform}. Is this mainly transfer or transformation?`,"Transformation",["Transfer"],r,{why:"Energy changes from one form to another."}),
        w==="Day 21"
          ?choice("A solar-powered calculator works only in light. Which describes the energy change in its solar cell?","Transformation: light to electrical",["Transfer with no change of form","Transformation: electrical to light"],r,{why:"The cell changes radiant energy into electrical energy.",transfer:true})
          :choice(`For the school classification, ${mixed}. Which best describes the energy change?`,"Transformation",["Transfer"],r,{why:"The device changes stored or electrical energy into another form."})
      ];
    },
    "SCI.SPS7B.MECHANICAL":(r,w)=>{
      const high=forWindow(["a roller coaster paused at the top of a hill","a rock held above the ground","a sled sitting at the top of a snowy slope"],w);
      const first=choice(`${high} has a large amount of which energy because of its height?`,"Gravitational potential energy",["Sound energy","Chemical energy","Electrical energy"],r,{why:"Height stores gravitational potential energy."});
      if(w==="Day 7")return [first,
        choice("A ball thrown straight up slows down as it rises. What happens to its kinetic energy?","It decreases",["It increases","It stays the same","It becomes chemical energy"],r,{why:"Slower motion means less kinetic energy."}),
        choice("A swinging pendulum is highest at the ends of its swing. Where is its gravitational potential energy greatest?","At the ends of the swing",["At the bottom of the swing","It is the same everywhere","Only while it is moving fastest"],r,{why:"Greater height means more gravitational potential energy."})];
      if(w==="Day 21")return [first,
        choice("A skateboarder rolls back and forth in a half-pipe. Where is kinetic energy greatest?","At the bottom, where the speed is greatest",["At the top edge, where the skateboarder stops","It is the same at every point","Only before the skateboarder starts"],r,{why:"Speed, and so kinetic energy, is greatest at the lowest point."}),
        choice("Ignoring friction, a coaster car has 300 J of kinetic energy and 500 J of potential energy at one point. What is its mechanical energy?","800 J",["200 J","500 J","150,000 J"],r,{why:"Mechanical energy is kinetic plus potential: 300 + 500.",transfer:true})];
      return [first,
        choice("A cart speeds up as it rolls downhill. What happens to its kinetic energy?","It increases",["It decreases","It becomes zero","It turns completely into chemical energy"],r,{why:"Greater speed means greater kinetic energy."}),
        choice("In a simple mechanical-energy model, which two forms are added together?","Kinetic + potential",["Thermal + sound","Chemical + electrical","Radiant + nuclear"],r,{why:"Mechanical energy combines kinetic and potential energy."})];
    },
    "SCI.SPS7C.HEAT_TRANSFER":(r,w)=>{
      const cond=forWindow(["your hand touches a cold metal railing","a pan handle heats up while attached to a hot pan","an ice cube cools the drink touching it"],w);
      const conv=forWindow(["warm water rises in a pot while cooler water sinks","heated air rises above a radiator while cooler air moves down","air circulates in a room because warmer air rises"],w);
      const rad=forWindow(["sunlight warms your skin","you feel heat from glowing coals without touching them","a heat lamp warms food from across a short distance"],w);
      return [
        choice(`Which heat-transfer process best explains this: ${cond}?`,"Conduction",["Convection","Radiation"],r,{why:"Conduction transfers thermal energy through direct contact."}),
        choice(`Which heat-transfer process best explains this: ${conv}?`,"Convection",["Conduction","Radiation"],r,{why:"Convection transfers thermal energy through moving fluids."}),
        w==="Day 21"
          ?choice("A thermos has a vacuum layer between its inner and outer walls. Which heat transfer does that layer mainly block?","Conduction and convection",["Radiation only","Neither; a vacuum carries heat well"],r,{why:"With no particles in the gap, conduction and convection cannot cross it.",transfer:true})
          :choice(`Which heat-transfer process best explains this: ${rad}?`,"Radiation",["Conduction","Convection"],r,{why:"Radiation transfers energy by electromagnetic waves without direct contact."})
      ];
    },
    "SCI.SPS7D.PARTICLE_MOTION":(r,w)=>[
      [choice("A solid is warmed but stays solid. What happens to its particles on average?","They vibrate faster",["They stop moving","They turn into electrons","They move freely like a gas"],r,{why:"Heating increases average particle kinetic energy."}),
       choice("A gas cools. What happens to the average kinetic energy of its particles?","It decreases",["It increases","It becomes exactly zero","It becomes chemical energy"],r,{why:"Cooling lowers average particle kinetic energy."}),
       choice("Two samples of the same substance are at different temperatures. Which sample has faster average particle motion?","The warmer sample",["The cooler sample","They must move at the same speed","Temperature does not relate to particle motion"],r,{why:"Higher temperature means greater average particle kinetic energy."})],
      [choice("An iron nail is heated in a flame but does not melt. On average, its particles…","Vibrate faster in place",["Stop vibrating","Spread out like a gas","Leave the nail"],r,{why:"Added thermal energy increases vibration."}),
       choice("Air inside a bike tire cools overnight. What happens to the average motion of its particles?","It slows",["It speeds up","It stops completely","It becomes electrical"],r,{why:"Lower temperature means lower average particle kinetic energy."}),
       choice("One cup of water is at 20°C and another at 60°C. Which has faster average particle motion?","The 60°C water",["The 20°C water","They are the same","Neither has moving particles"],r,{why:"Higher temperature means faster average motion."})],
      [choice("Steam cools from 120°C to 105°C without condensing. What happens to average particle kinetic energy?","It decreases",["It increases","It stays exactly the same","It becomes zero"],r,{why:"Cooling lowers average kinetic energy."}),
       choice("A metal rod is warmed but stays solid. Which describes its particles?","They vibrate faster around fixed positions",["They flow past each other like a liquid","They stop moving","They lose mass"],r,{why:"Solids vibrate in place; heating speeds the vibration."}),
       choice("Food coloring spreads faster in hot water than in cold water. Which explanation fits?","Faster-moving particles in hot water mix the dye sooner",["Cold water has no moving particles","Hot water is heavier","The dye stops moving in cold water"],r,{why:"Higher temperature means faster particles and faster mixing.",transfer:true})]
    ][windowIndex(w)],
    "SCI.SPS7E.CONCEPT":(r,w)=>[
      [choice("Equal masses of two substances absorb the same heat. Substance X changes temperature less. Which has the higher specific heat?","Substance X",["Substance Y","They must be equal","There is not enough information because mass is equal"],r,{why:"Less temperature change from the same heat means higher specific heat."}),
       choice("A material with a high specific heat generally needs what to change its temperature by the same amount?","More energy",["Less energy","No energy","Less mass"],r,{why:"High specific heat means more energy is required per unit mass per degree."}),
       choice("On a sunny day, equal masses of two materials receive similar energy. One warms much faster. What does that suggest about the faster-warming material?","It has a lower specific heat",["It has a higher specific heat","It has no specific heat","Specific heat cannot affect temperature change"],r,{why:"A larger temperature rise from similar energy suggests lower specific heat."})],
      [choice("Equal masses of sand and water absorb the same heat. The sand gets hotter. Which has the higher specific heat?","Water",["Sand","They must be equal","Neither has a specific heat"],r,{why:"The substance with the smaller temperature rise has the higher specific heat."}),
       choice("Which material needs the most energy to warm 1 g by 1°C?","The one with the highest specific heat",["The one with the lowest specific heat","Any material, since the mass is equal","The one that is coldest"],r,{why:"Specific heat is energy per gram per degree."}),
       choice("Equal masses of oil and water sit on identical burners. The oil heats faster. Which has the lower specific heat?","Oil",["Water","They are equal","It cannot be told"],r,{why:"Faster warming from the same energy means lower specific heat."})],
      [choice("Two 10 g samples each absorb 200 J. Sample P rises 4°C and sample Q rises 10°C. Which has the higher specific heat?","Sample P",["Sample Q","They are equal","It cannot be told"],r,{why:"P changed temperature less for the same energy and mass."}),
       choice("A material has a high specific heat. When it absorbs energy, its temperature changes…","Slowly",["Quickly","Never","Only if it melts"],r,{why:"More energy is needed for each degree."}),
       choice("Car engines are cooled with a liquid that is mostly water. Why is water a good choice?","Its high specific heat lets it absorb a lot of energy with a small temperature rise",["Its low specific heat makes it heat up quickly","Water cannot absorb heat","Water has no mass"],r,{why:"High specific heat makes water an effective coolant.",transfer:true})]
    ][windowIndex(w)],
    "SCI.SPS7E.SYMBOLS_UNITS":(r,w)=>[
      [choice("In the heat equation Q = mcΔT, which symbol represents specific heat capacity?","c",["Q","m","ΔT"],r,{why:"c represents specific heat capacity."}),
       choice("Which unit best matches heat energy Q in these problems?","joules (J)",["grams (g)","degrees Celsius (°C)","J/g°C"],r,{why:"Q is heat energy, measured in joules."}),
       choice("Which unit best matches specific heat capacity c?","J/g°C",["J","g","°C"],r,{why:"Specific heat is energy per unit mass per degree of temperature change."})],
      [choice("In Q = mcΔT, which symbol stands for the change in temperature?","ΔT",["T","c","Q"],r,{why:"Δ means change, so ΔT is the temperature change."}),
       choice("Which unit matches mass m in these problems?","grams (g)",["joules (J)","degrees Celsius (°C)","J/g°C"],r,{why:"Mass is measured in grams here."}),
       choice("Which unit matches ΔT?","°C",["J","g","J/g°C"],r,{why:"A temperature change is measured in degrees."})],
      [choice("A problem lists 4.18 J/g°C. Which symbol does this value belong to?","c",["Q","m","ΔT"],r,{why:"J/g°C is the unit of specific heat."}),
       choice("A problem lists 250 J. Which symbol does this value belong to?","Q",["c","m","ΔT"],r,{why:"Joules measure heat energy."}),
       choice("A recipe card says to heat 50 g of water from 20°C to 70°C. Which values are m and ΔT?","m = 50 g, ΔT = 50°C",["m = 70 g, ΔT = 20°C","m = 50 g, ΔT = 70°C","m = 20 g, ΔT = 50°C"],r,{why:"Mass is 50 g; ΔT = 70 − 20 = 50°C.",transfer:true})]
    ][windowIndex(w)],
    "SCI.SPS7E.DELTA_T":(r,w)=>{
      const o=windowIndex(w); // each window uses its own starting temperatures, so a numeric problem never recurs across windows
      const i1=10+20*o+Math.floor(r()*20), d1=8+Math.floor(r()*18), f1=i1+d1;
      const i2=50+30*o+Math.floor(r()*30), d2=7+Math.floor(r()*20), f2=i2-d2;
      const i3=5+25*o+Math.floor(r()*25), d3=10+Math.floor(r()*25), f3=i3+d3;
      return [
        free(`A sample warms from ${i1}°C to ${f1}°C. Using final − initial, what is ΔT?`,d1,`${f1} − ${i1} = ${d1}°C.`),
        free(`A sample cools from ${i2}°C to ${f2}°C. Using final − initial, what is ΔT?`,-d2,`${f2} − ${i2} = −${d2}°C.`),
        w==="Day 21"
          ?free(`A freezer cools a juice box from ${5+(i3%20)}°C to −${2+(d3%15)}°C. Using final − initial, what is ΔT?`,-(2+(d3%15))-(5+(i3%20)),`Final − initial = −${2+(d3%15)} − ${5+(i3%20)} = ${-(2+(d3%15))-(5+(i3%20))}°C.`,{transfer:true})
          :free(`A liquid starts at ${i3}°C and ends at ${f3}°C. What temperature change should go into ΔT?`,d3,`${f3} − ${i3} = ${d3}°C.`)
      ];
    },
    "SCI.SPS7E.FORMULA_SETUP":(r,w)=>{
      const o=windowIndex(w);
      const m1=5+10*o+Math.floor(r()*10), c1=1+Math.floor(r()*4), dt1=5+Math.floor(r()*10);
      const ti=10+Math.floor(r()*15), dt2Raw=5+Math.floor(r()*12), dt2=dt2Raw===ti?dt2Raw+1:dt2Raw, tf=ti+dt2, m2=8+12*o+Math.floor(r()*12), c2=(1+Math.floor(r()*4))/2;
      return [
        choice(`If m = ${m1} g, c = ${c1} J/g°C, and ΔT = ${dt1}°C, which setup correctly finds Q?`,`Q = ${m1} × ${c1} × ${dt1}`,[`Q = ${m1} + ${c1} + ${dt1}`,`Q = ${dt1} ÷ (${m1} × ${c1})`],r,{why:"For Q, multiply m × c × ΔT."}),
        choice(`A ${m2} g sample with c = ${c2} warms from ${ti}°C to ${tf}°C. Which value should be used for ΔT?`,String(dt2),[String(tf),String(ti)],r,{why:`ΔT = ${tf} − ${ti} = ${dt2}°C.`}),
        w==="Day 21"
          ?choice(`A ${m2*10} g pot of soup (c = 4 J/g°C) warms on a stove from ${ti}°C to ${tf}°C. Which setup finds the heat it absorbed?`,`Q = ${m2*10} × 4 × ${dt2}`,[`Q = ${m2*10} × 4 × ${tf}`,`Q = ${m2*10} + 4 + ${dt2}`],r,{why:"Multiply mass, specific heat, and the temperature change.",transfer:true})
          :choice(`A problem gives m = ${m2} g, c = ${c2} J/g°C, initial T = ${ti}°C, final T = ${tf}°C. Which three values belong directly in Q = mcΔT?`,`${m2}, ${c2}, ${dt2}`,[`${m2}, ${c2}, ${tf}`,`${ti}, ${tf}, ${dt2}`],r,{why:"Use mass, specific heat, and final-minus-initial temperature change."})
      ];
    },
    "SCI.SPS7E.LITERAL_REARRANGE":(r,w)=>[
      [choice("Which expression isolates m in Q = mcΔT?","m = Q ÷ (cΔT)",["m = QcΔT","m = cΔT ÷ Q","m = Q − cΔT"],r,{why:"Divide both sides by cΔT."}),
       choice("Which expression isolates ΔT in Q = mcΔT?","ΔT = Q ÷ (mc)",["ΔT = Qmc","ΔT = mc ÷ Q","ΔT = Q − mc"],r,{why:"Divide both sides by mc."}),
       choice("A lab problem gives Q, m, and ΔT but asks for c. Which rearranged formula should be used?","c = Q ÷ (mΔT)",["c = QmΔT","c = mΔT ÷ Q","c = Q − mΔT"],r,{why:"Divide Q by m times ΔT to isolate c."})],
      [choice("Solve P = W ÷ t for W.","W = P × t",["W = P ÷ t","W = t ÷ P","W = P − t"],r,{why:"Multiply both sides by t."}),
       choice("Solve V = IR for I.","I = V ÷ R",["I = V × R","I = R ÷ V","I = V − R"],r,{why:"Divide both sides by R."}),
       choice("Solve d = rt for r.","r = d ÷ t",["r = d × t","r = t ÷ d","r = d − t"],r,{why:"Divide both sides by t."})],
      [choice("Solve p = mv for v.","v = p ÷ m",["v = p × m","v = m ÷ p","v = p − m"],r,{why:"Divide both sides by m."}),
       choice("Solve W = Fd for d.","d = W ÷ F",["d = W × F","d = F ÷ W","d = W − F"],r,{why:"Divide both sides by F."}),
       choice("Density is mass divided by volume: D = m ÷ V. Which formula finds the volume?","V = m ÷ D",["V = m × D","V = D ÷ m","V = m − D"],r,{why:"Multiply both sides by V, then divide by D.",transfer:true})]
    ][windowIndex(w)],
    "SCI.SPS7E.CALCULATION":(r,w)=>{
      const o=windowIndex(w);
      const m1=4+7*o+Math.floor(r()*7), c1=1+Math.floor(r()*4), dt1=3+Math.floor(r()*8), q1=m1*c1*dt1;
      const m2=5+8*o+Math.floor(r()*8), c2=2+Math.floor(r()*4), dt2=4+Math.floor(r()*7), q2=m2*c2*dt2;
      const m3=4+8*o+Math.floor(r()*8), c3=1+Math.floor(r()*4), dt3=5+Math.floor(r()*8), q3=m3*c3*dt3;
      return [
        free(`Use Q = mcΔT. If m = ${m1} g, c = ${c1} J/g°C, and ΔT = ${dt1}°C, what is Q?`,q1,`${m1} × ${c1} × ${dt1} = ${q1} J.`),
        free(`Use Q = mcΔT. If m = ${m2} g, c = ${c2} J/g°C, and ΔT = ${dt2}°C, what is Q?`,q2,`${m2} × ${c2} × ${dt2} = ${q2} J.`),
        w==="Day 21"
          ?free(`A ${m3} g metal spoon (c = ${c3} J/g°C) sits in hot soup and warms by ${dt3}°C. How much heat did it absorb, in J?`,q3,`${m3} × ${c3} × ${dt3} = ${q3} J.`,{transfer:true})
          :free(`A sample absorbs ${q3} J. Its mass is ${m3} g and ΔT is ${dt3}°C. Using c = Q ÷ (mΔT), what is c?`,c3,`${q3} ÷ (${m3} × ${dt3}) = ${c3} J/g°C.`)
      ];
    },
    "MATH.INVERSE_OPERATIONS":(r,w)=>{
      const o=windowIndex(w);
      const a=2+Math.floor(r()*7), x=3+8*o+Math.floor(r()*8), product=a*x;
      const divisor=2+Math.floor(r()*7), quotient=3+8*o+Math.floor(r()*8), dividend=divisor*quotient;
      const add=4+10*o+Math.floor(r()*10), result=add+5+Math.floor(r()*10), x3=result-add;
      return [
        free(`Solve ${a}x = ${product}. What is x?`,x,`Divide both sides by ${a}. x = ${x}.`),
        free(`Solve x ÷ ${divisor} = ${quotient}. What is x?`,dividend,`Multiply both sides by ${divisor}. x = ${dividend}.`),
        w==="Day 21"
          ?free(`A rope ${product} m long is cut into ${a} equal pieces. How long is each piece, in meters?`,x,`Solve ${a}p = ${product}: divide both sides by ${a}. Each piece is ${x} m.`,{transfer:true})
          :free(`Solve x + ${add} = ${result}. What is x?`,x3,`Subtract ${add} from both sides. x = ${x3}.`)
      ];
    },
    "MATH.LITERAL_EQUATIONS":(r,w)=>[
      [choice("Solve F = ma for a.","a = F ÷ m",["a = m ÷ F","a = Fm","a = F − m"],r,{why:"Divide both sides by m."}),
       choice("Solve A = lw for w.","w = A ÷ l",["w = l ÷ A","w = Al","w = A − l"],r,{why:"Divide both sides by l."}),
       choice("Solve C = 2πr for r.","r = C ÷ (2π)",["r = 2πC","r = 2π ÷ C","r = C − 2π"],r,{why:"Divide both sides by 2π."})],
      [choice("Solve P = IV for V.","V = P ÷ I",["V = P × I","V = I ÷ P","V = P − I"],r,{why:"Divide both sides by I."}),
       choice("Solve W = mg for m.","m = W ÷ g",["m = W × g","m = g ÷ W","m = W − g"],r,{why:"Divide both sides by g."}),
       choice("Solve y = mx + b for b.","b = y − mx",["b = y + mx","b = mx − y","b = y ÷ mx"],r,{why:"Subtract mx from both sides."})],
      [choice("Solve A = ½bh for h.","h = 2A ÷ b",["h = A ÷ (2b)","h = 2Ab","h = A − ½b"],r,{why:"Multiply both sides by 2, then divide by b."}),
       choice("Solve P = 2l + 2w for l.","l = (P − 2w) ÷ 2",["l = P − w","l = (P + 2w) ÷ 2","l = P ÷ 2 − 2w"],r,{why:"Subtract 2w, then divide by 2."}),
       choice("A phone plan costs C = 15 + 5g dollars for g gigabytes. Which formula gives g from the cost C?","g = (C − 15) ÷ 5",["g = C ÷ 5 − 15","g = (C + 15) ÷ 5","g = 5C − 15"],r,{why:"Subtract 15, then divide by 5.",transfer:true})]
    ][windowIndex(w)]
  };

  // Distinct transfer prompts for Waves; never reuse immediate lesson checks.
  for(const lesson of (window.LEVEL_UP_CONTENT?.science||[]).filter(l=>l.unit==="SCI.G8.WAVES")){
    generators[lesson.id]=(r,w)=>{
      const later=window.LEVEL_UP_CONTENT?.waveLaterReviews?.[lesson.id]?.[w];
      const set=w==="Day 2"||!later?lesson.reviewChecks:later;
      // The original Day 2 data flags some recall items as transfer; transfer is only assessed with the Day 21 new-context item.
      return set.map(q=>choice(q.q,q.choices[q.answer],q.choices.filter((_,i)=>i!==q.answer),r,{why:q.why,transfer:w==="Day 21"&&q.transfer===true}));
    };
  }

  for(const lesson of (window.LEVEL_UP_SCHOOL_SCIENCE?.lessons||[])){
    generators[lesson.id]=(r,w)=>window.LEVEL_UP_SCHOOL_SCIENCE.delayedChecks(lesson,w,r).map(q=>choice(q.q,q.choices[q.answer],q.choices.filter((_,n)=>n!==q.answer),r,{why:q.why,transfer:q.transfer===true}));
  }

  for(const lesson of (window.LEVEL_UP_SCHOOL_ACADEMICS?.lessons||[])){
    generators[lesson.id]=(r,w)=>window.LEVEL_UP_SCHOOL_ACADEMICS.delayedChecks(lesson,w,r).map(q=>q.choices?choice(q.q,q.choices[q.answer],q.choices.filter((_,n)=>n!==q.answer),r,{why:q.why,transfer:q.transfer===true}):free(q.q,q.free,q.why,{transfer:q.transfer===true}));
  }

  function generateReview(skillId,windowLabel,reviewId){
    const generator=generators[skillId];
    if(!generator)throw new Error(`No review generator for ${skillId}`);
    const r=rng(hash(`${skillId}|${windowLabel}|${reviewId}`));
    const items=generator(r,windowLabel,reviewId);
    return items.map((item,index)=>({
      ...item,
      id:`${reviewId}_item_${index+1}`,
      skillId,
      reviewWindow:windowLabel,
      transfer:!!item.transfer
    }));
  }

  window.LEVEL_UP_REVIEW_ENGINE=Object.freeze({SKILL_IDS,generateReview});
})();

