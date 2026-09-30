window.LEVEL_UP_CONTENT = {
  student:{id:"michael",name:"Michael",grade:"8",school:"Murphy Middle School"},
  tracks:{A:{name:"Track A",description:"Controlled diagnostic + mastery evidence"},B:{name:"Track B",description:"Immediate teaching + recovery"}},
  science:[
    {
      id:"SCI.SPS7A.ENERGY_FORMS", title:"Energy Basics + Forms", schoolTag:"7a foundation", minutes:"8–12 min",
      teach:[
        ["Energy is the ability to cause change or do work.","Think of energy as what makes things move, heat up, light up, make sound, or change."],
        ["Key forms: kinetic, potential, thermal, chemical, electrical, radiant, sound, and nuclear.","We learn the forms first so transfer and transformation make sense later."]
      ],
      checks:[
        {id:"e1",q:"A moving football has which form of energy because it is moving?",choices:["Kinetic","Chemical","Nuclear","Radiant"],answer:0,why:"Kinetic energy is energy of motion."},
        {id:"e2",q:"Energy stored in food is mainly which form?",choices:["Chemical","Sound","Radiant","Kinetic"],answer:0,why:"Food stores chemical energy."},
        {id:"e3",q:"Sunlight reaching Earth is mainly which form?",choices:["Radiant","Mechanical","Chemical","Sound"],answer:0,why:"Light from the Sun is radiant energy."}
      ]
    },
    {
      id:"SCI.SPS7A.TRANSFER_TRANSFORMATION", title:"Transfer vs Transformation", schoolTag:"7a Energy Transformations", minutes:"8–12 min", prereq:"SCI.SPS7A.ENERGY_FORMS",
      teach:[
        ["Transfer means energy moves from one object or place to another.","The form can stay the same while the energy moves."],
        ["Transformation means energy changes from one form to another.","Example: electrical energy changes into thermal energy in a toaster."]
      ],
      checks:[
        {id:"tt1",q:"A warm mug heats your colder hand. Which best fits the school classification?",choices:["Transfer","Transformation"],answer:0,why:"Thermal energy moves from the mug to the hand."},
        {id:"tt2",q:"A solar panel changes sunlight into electricity. Which best fits?",choices:["Transfer","Transformation"],answer:1,why:"Radiant energy changes into electrical energy."},
        {id:"tt3",q:"An electric fan uses electricity to spin its blades. Which best fits?",choices:["Transfer","Transformation"],answer:1,why:"Electrical energy changes into mechanical motion."}
      ]
    },
    {
      id:"SCI.SPS7B.MECHANICAL", title:"Kinetic, Potential + Mechanical", schoolTag:"7b", minutes:"8–12 min", prereq:"SCI.SPS7A.TRANSFER_TRANSFORMATION",
      teach:[
        ["Kinetic energy is energy of motion. Potential energy is stored because of position or condition.","A flying football has kinetic energy. A ball held high has gravitational potential energy."],
        ["Mechanical energy is the total of kinetic and potential energy.","On a roller coaster, energy shifts between these forms."]
      ],
      checks:[
        {id:"m1",q:"A coaster stopped at the top of the tallest hill has lots of…",choices:["Gravitational potential energy","Sound energy","Nuclear energy"],answer:0,why:"Its height stores gravitational potential energy."},
        {id:"m2",q:"As the coaster rolls downhill and speeds up, kinetic energy generally…",choices:["Increases","Disappears","Becomes nuclear"],answer:0,why:"More speed means more kinetic energy."},
        {id:"m3",q:"Mechanical energy combines…",choices:["Kinetic + potential","Thermal + sound","Electrical + chemical"],answer:0,why:"Mechanical energy is kinetic plus potential energy."}
      ]
    },
    {
      id:"SCI.SPS7C.HEAT_TRANSFER", title:"Conduction, Convection + Radiation", schoolTag:"7c", minutes:"10–12 min", prereq:"SCI.SPS7B.MECHANICAL",
      teach:[
        ["Conduction is heat transfer through direct contact.","A hot pan can heat a metal spoon touching it."],
        ["Convection is heat transfer by the movement of a fluid such as air or water.","Warm fluid rises and cool fluid sinks, creating a current."],
        ["Radiation transfers energy by electromagnetic waves and does not require direct contact.","You can feel heat from a campfire without touching it."]
      ],
      checks:[
        {id:"h1",q:"A metal spoon gets hot while sitting in soup. Which process?",choices:["Conduction","Convection","Radiation"],answer:0,why:"The spoon is heated through direct contact."},
        {id:"h2",q:"Warm air rises while cooler air sinks. Which process?",choices:["Conduction","Convection","Radiation"],answer:1,why:"Moving air carries thermal energy in a convection current."},
        {id:"h3",q:"You feel heat from a campfire without touching it. Which process?",choices:["Conduction","Convection","Radiation"],answer:2,why:"Radiation can move energy across space without direct contact."}
      ]
    },
    {
      id:"SCI.SPS7D.PARTICLE_MOTION", title:"Heat + Particle Motion", schoolTag:"7d", minutes:"8–12 min", prereq:"SCI.SPS7C.HEAT_TRANSFER",
      teach:[
        ["Temperature is related to the average kinetic energy of particles.","When temperature rises, particles generally move or vibrate faster."],
        ["When matter cools, average particle motion slows.","Particles do not simply stop because something cools down."]
      ],
      checks:[
        {id:"p1",q:"A substance heats up. What usually happens to average particle motion?",choices:["It speeds up","It stops","It becomes electrical"],answer:0,why:"Higher temperature means greater average particle kinetic energy."},
        {id:"p2",q:"A gas cools from 80°C to 30°C. Its average kinetic energy becomes…",choices:["Lower","Higher","Exactly zero"],answer:0,why:"Cooling lowers average particle kinetic energy."},
        {id:"p3",q:"A solid is heated but does not melt. Its particles generally…",choices:["Vibrate faster around their positions","Stop moving","Move freely like a gas"],answer:0,why:"Particles in a heated solid vibrate more rapidly."}
      ]
    },
    {
      id:"SCI.SPS7E.CONCEPT", title:"Specific Heat Concept", schoolTag:"7e-A", minutes:"8–12 min", prereq:"SCI.SPS7D.PARTICLE_MOTION",
      teach:[
        ["Specific heat tells how much energy a substance needs to change the temperature of a certain mass by 1°C.","High specific heat means more energy is needed for the same temperature change."],
        ["If two equal masses receive the same heat, the one whose temperature changes less has the higher specific heat.","That substance changes temperature more slowly."]
      ],
      checks:[
        {id:"s1",q:"Two equal masses receive equal heat. Sample A changes temperature less. Which has higher specific heat?",choices:["Sample A","Sample B","They must be equal"],answer:0,why:"Less temperature change from the same heat means higher specific heat."},
        {id:"s2",q:"High specific heat means a substance needs…",choices:["More energy for the same temperature change","No energy to warm up","Less mass"],answer:0,why:"Specific heat measures energy needed per mass per degree."},
        {id:"s3",q:"Equal masses get equal heat. The metal warms much more than the water. The metal likely has…",choices:["Lower specific heat","Higher specific heat","No specific heat"],answer:0,why:"A bigger temperature rise from the same heat suggests lower specific heat."}
      ]
    },
    {
      id:"SCI.SPS7E.SYMBOLS_UNITS", title:"Q, m, c + ΔT", schoolTag:"7e-B", minutes:"8–10 min", prereq:"SCI.SPS7E.CONCEPT",
      teach:[
        ["Q is heat energy transferred, usually measured in joules (J).","m is mass. c is specific heat capacity. ΔT is change in temperature."],
        ["ΔT means final temperature minus initial temperature.","The delta symbol means change in."]
      ],
      checks:[
        {id:"su1",q:"In Q = mcΔT, what does Q represent?",choices:["Heat energy transferred","Mass","Temperature change"],answer:0,why:"Q represents heat energy transferred."},
        {id:"su2",q:"In Q = mcΔT, what does m represent?",choices:["Mass","Mechanical energy","Minutes"],answer:0,why:"m represents mass."},
        {id:"su3",q:"In Q = mcΔT, what does ΔT represent?",choices:["Temperature change","Total energy","Time"],answer:0,why:"ΔT means change in temperature."}
      ]
    },
    {
      id:"SCI.SPS7E.DELTA_T", title:"Temperature Change ΔT", schoolTag:"7e-C", minutes:"8–10 min", prereq:"SCI.SPS7E.SYMBOLS_UNITS",
      teach:[
        ["Use ΔT = final temperature − initial temperature.","Example: 43°C − 18°C = 25°C."],
        ["A cooling problem can give a negative ΔT if final temperature is lower than initial temperature.","Keep the order final minus initial."]
      ],
      checks:[
        {id:"dt1",q:"A sample warms from 18°C to 43°C. What is ΔT?",free:"25",why:"43 − 18 = 25°C."},
        {id:"dt2",q:"A sample warms from 14°C to 39°C. What is ΔT?",free:"25",why:"39 − 14 = 25°C."},
        {id:"dt3",q:"A sample cools from 72°C to 50°C. Using final − initial, what is ΔT?",free:"-22",why:"50 − 72 = −22°C."}
      ]
    },
    {
      id:"SCI.SPS7E.FORMULA_SETUP", title:"Formula Setup", schoolTag:"7e-D", minutes:"10–12 min", prereq:"SCI.SPS7E.DELTA_T",
      teach:[
        ["The main relationship is Q = m × c × ΔT.","Before calculating, identify what each number means and compute ΔT if needed."],
        ["Setup first, arithmetic second.","That lets us tell whether a mistake is Science setup or Math calculation."]
      ],
      checks:[
        {id:"fs1",q:"Which equation matches heat energy, mass, specific heat, and temperature change?",choices:["Q = m × c × ΔT","Q = m + c + ΔT","Q = m ÷ c ÷ ΔT"],answer:0,why:"The heat equation is Q = mcΔT."},
        {id:"fs2",q:"m = 12 g, c = 0.50, temperature goes 20°C → 30°C. Which setup solves Q?",choices:["Q = 12 × 0.50 × 10","Q = 12 × 0.50 × 30","Q = 10 ÷ (12 × 0.50)"],answer:0,why:"ΔT is 10, so Q = 12 × 0.50 × 10."},
        {id:"fs3",q:"m = 8 g, c = 2, initial 15°C, final 25°C. Which three values belong in Q = mcΔT?",choices:["8, 2, 10","8, 2, 25","15, 25, 10"],answer:0,why:"Mass 8, c 2, ΔT 10."}
      ]
    },
    {
      id:"SCI.SPS7E.LITERAL_REARRANGE", title:"Science Formula Rearrangement", schoolTag:"7e-E", minutes:"10–12 min", prereq:"MATH.LITERAL_EQUATIONS",
      teach:[
        ["Rearranging a Science formula uses the same inverse-operation idea as literal equations.","We only start this after the Math Bridge shows the prerequisite is ready."],
        ["To isolate a variable, undo the operations around it.","For Q = mcΔT, solving for c means divide both sides by mΔT."]
      ],
      checks:[
        {id:"lr1",q:"Using Q = m × c × ΔT, solve for c.",choices:["c = Q ÷ (m × ΔT)","c = Q × m × ΔT","c = m × ΔT ÷ Q"],answer:0,why:"Divide both sides by m × ΔT."},
        {id:"lr2",q:"Using Q = m × c × ΔT, solve for m.",choices:["m = Q ÷ (c × ΔT)","m = Q × c × ΔT","m = c × ΔT ÷ Q"],answer:0,why:"Divide both sides by c × ΔT."},
        {id:"lr3",q:"Using Q = m × c × ΔT, solve for ΔT.",choices:["ΔT = Q ÷ (m × c)","ΔT = Q × m × c","ΔT = m × c ÷ Q"],answer:0,why:"Divide both sides by m × c."}
      ]
    },
    {
      id:"SCI.SPS7E.CALCULATION", title:"Specific Heat Calculations", schoolTag:"7e-F", minutes:"10–12 min", prereq:"SCI.SPS7E.LITERAL_REARRANGE",
      teach:[
        ["For Q = mcΔT, multiply m × c × ΔT when Q is the unknown.","If another variable is unknown, rearrange first, then calculate."],
        ["Keep the stages separate: identify values → arrange formula → calculate → check units.","That makes mistakes easier to diagnose and repair."]
      ],
      checks:[
        {id:"c1",q:"Use Q = mcΔT. m = 10, c = 2, ΔT = 5. What is Q?",free:"100",why:"10 × 2 × 5 = 100 J."},
        {id:"c2",q:"Use Q = mcΔT. m = 8, c = 1.5, ΔT = 10. What is Q?",free:"120",why:"8 × 1.5 × 10 = 120 J."},
        {id:"c3",q:"If Q = 480, m = 12, ΔT = 20 and c = Q ÷ (mΔT), what is c?",free:"2",why:"480 ÷ (12 × 20) = 2 J/g°C."}
      ]
    }
  ],
  math:[
    {
      id:"MATH.INVERSE_OPERATIONS", title:"Numeric Inverse Operations", schoolTag:"Math bridge floor", minutes:"8–10 min",
      teach:[
        ["Inverse operations undo each other.","Multiplication and division are opposites. Addition and subtraction are opposites."],
        ["The goal is to isolate x.","Do the opposite operation to both sides."]
      ],
      checks:[
        {id:"mi1",q:"Solve 3x = 12.",free:"4",why:"Divide both sides by 3. x = 4."},
        {id:"mi2",q:"Solve x ÷ 5 = 7.",free:"35",why:"Multiply both sides by 5. x = 35."},
        {id:"mi3",q:"Solve x + 8 = 21.",free:"13",why:"Subtract 8 from both sides. x = 13."}
      ]
    },
    {
      id:"MATH.LITERAL_EQUATIONS", title:"Literal Equations", schoolTag:"Math 3g/3h bridge", minutes:"10–12 min", prereq:"MATH.INVERSE_OPERATIONS",
      teach:[
        ["A literal equation uses several letters, but the goal is still to isolate the letter you were asked for.","Treat the other letters like known values written as symbols."],
        ["Undo operations in reverse order.","Example: d = rt. To solve for t, divide both sides by r: t = d ÷ r."]
      ],
      checks:[
        {id:"ml1",q:"Solve d = r × t for t.",choices:["t = d ÷ r","t = r ÷ d","t = d × r"],answer:0,why:"Divide both sides by r."},
        {id:"ml2",q:"Solve V = I × R for R.",choices:["R = V ÷ I","R = I ÷ V","R = V × I"],answer:0,why:"Divide both sides by I."},
        {id:"ml3",q:"Solve y = mx + b for x.",choices:["x = (y − b) ÷ m","x = (y + b) ÷ m","x = y − (b ÷ m)"],answer:0,why:"Subtract b, then divide by m."}
      ]
    }
  ],
  schoolPlan:{
    urgent:{
      id:"ELA.WTMMTM.TEST.2026-09-29",
      subject:"Language Arts",
      title:"Where the Mountain Meets the Moon — Sept. 29 Test",
      testDate:"2026-09-29",
      priority:"TEST_TOMORROW",
      supportLane:"SCHOOL_SUCCESS",
      evidencePolicy:"SCHOOL_SUPPORT_ONLY_NO_FORMAL_BASELINE",
      sources:["WTMMTM Knowledge Organizer","Where the Mountain Meets the Moon Review"],
      studyBlocks:[
        {
          minutes:10,
          title:"Storytelling, fantasy + culture vocabulary",
          terms:[
            ["oral tradition","knowledge, ideas, and stories passed by word of mouth from one generation to another"],
            ["folktale","a story a culture repeats over time; often based in truth but becomes more fictional as it is retold"],
            ["origin story","a story explaining how a person, place, thing, or idea came to exist"],
            ["myth","a fictional story that explains things in nature or answers big questions about life"],
            ["magic and the supernatural","things or events that seem impossible in real life"],
            ["quest","a long, often difficult journey to find something or someone"],
            ["young protagonist","a young main character; fantasy protagonists are often young and more willing to believe in magic"],
            ["fatal flaw","a negative trait that leads to a character's downfall"],
            ["non-human characters","talking animals or creatures that do not exist in real life, such as dragons"],
            ["empire","territories controlled by one authority, usually an emperor or empress"],
            ["dynasty","one family ruling a country or empire for a long period, passing power to children"],
            ["animal symbolism","animals carrying symbolic meaning in stories, images, architecture, and culture"]
          ]
        },
        {
          minutes:10,
          title:"Literary + language terms",
          terms:[
            ["embedded narrative","a story-within-a-story told inside the larger novel"],
            ["parallel narrative","two or more different storylines that connect or share something in common"],
            ["cliffhanger","an abrupt ending at a moment of surprise, danger, excitement, or tension"],
            ["simile","a comparison between unlike things using like or as"],
            ["symbol","an object, person, or idea with meaning beyond its literal meaning"],
            ["lesson","a message about life or a piece of advice a reader can learn from a text"],
            ["independent clause","a group of words with a subject and verb that expresses a complete thought"],
            ["fragment","an incomplete sentence missing a subject, verb, or complete thought"],
            ["subject","who or what a sentence is about"],
            ["verb","what the subject does or is"],
            ["compound sentence","two or more independent clauses joined with a coordinating conjunction and a comma"],
            ["coordinating conjunctions","and joins; but contrasts; or shows choice; so shows result/consequence"],
            ["dependent clause","a group with a noun and verb that cannot stand alone because it does not express a complete thought"],
            ["subordinating conjunctions","because/since/if; before/after/when/while/since; even though/although"],
            ["complex sentence","one independent clause plus at least one dependent clause"],
            ["run-on sentence","two or more independent clauses connected improperly"]
          ]
        },
        {
          minutes:8,
          title:"Plot sequence + borrowed line",
          sequence:[
            "Dragon receives the borrowed line from the guardian lions.",
            "Dragon cannot cross the bridge to see the Old Man of the Moon.",
            "Minli helps Dragon reach the Old Man of the Moon.",
            "Dragon uses the borrowed line and finally learns to fly.",
            "Dragon flies Minli back home to Fruitless Mountain."
          ],
          quickFacts:[
            ["What gift did the guardian lions give Dragon?","The Borrowed Line."],
            ["Why is the borrowed line significant?","The review shows Dragon later uses the borrowed line and finally learns to fly."],
            ["How does Dragon fulfill his destiny?","The review sequence shows Dragon learns to fly and then flies Minli home."]
          ]
        },
        {
          minutes:12,
          title:"Teacher review questions — explain out loud",
          prompts:[
            {q:"What is foreshadowing?",studyHelp:"Standard study definition: hints or clues that suggest what may happen later in a story.",sourceNote:"The teacher review asks this question but does not provide the definition."},
            {q:"What are examples of foreshadowing in the novel?",studyHelp:"Use specific events from the novel and explain what later event each one hints at.",sourceNote:"The teacher review asks for examples but does not provide them."},
            {q:"What is abundance?",studyHelp:"Standard study definition: a very large amount; more than enough.",sourceNote:"The teacher review asks this question but does not provide the definition."},
            {q:"How do Minli's beliefs about abundance change throughout the story?",studyHelp:"Answer with beginning → change → end. Use a specific event from the novel for evidence.",sourceNote:"The teacher review asks this question but does not provide a model answer."},
            {q:"How do kindness and generosity play into the themes of the novel?",studyHelp:"Name an act of kindness or generosity, then explain what it teaches about the novel's message.",sourceNote:"The teacher review asks this question but does not provide a model answer."},
            {q:"Which events best support the theme that storytelling has the power to guide and heal?",studyHelp:"Choose events where a story changes what a character understands, decides, or feels, and explain the connection.",sourceNote:"The teacher review asks this question but does not provide the events/answer."}
          ]
        }
      ],
      finalCheck:[
        "Define oral tradition, folktale, myth, quest, embedded narrative, parallel narrative, symbol, and lesson without notes.",
        "Tell the five Dragon events in order without looking.",
        "Explain independent vs dependent clause.",
        "Explain compound vs complex sentence.",
        "Name the coordinating conjunctions: and, but, or, so.",
        "Name at least two subordinating conjunctions.",
        "Answer the foreshadowing, abundance, Minli, kindness/generosity, and storytelling-theme questions in complete sentences."
      ]
    }
  }
};

// Urgent school instruction; preserves existing lesson IDs and learner evidence.
window.LEVEL_UP_CONTENT.science.unshift(...[
  {
    "id": "SCI.WAVES.TYPES",
    "title": "Wave types + parts",
    "schoolTag": "Unit 2 Waves",
    "minutes": "Work at your pace",
    "unit": "SCI.G8.WAVES",
    "targetIds": [
      "SCI.S8P4A.MECHANICAL_VS_EM"
    ],
    "studyDay": "Wednesday",
    "sourceNote": "Teacher packet images 54–92 and supplied AKS 9e; explanations and practice questions adapted for Michael.",
    "teach": [
      [
        "A wave carries energy. A medium is the material a wave travels through. Mechanical waves need a medium; electromagnetic waves can cross empty space.",
        "Sound needs particles. Sunlight reaches Earth across space."
      ],
      [
        "Transverse vibration is perpendicular to travel; longitudinal vibration is parallel.",
        "Model: move a rope up/down while the disturbance travels forward. Push/pull a spring to make crowded compressions and spread-out rarefactions."
      ],
      [
        "A crest is a high point, a trough a low point. Wavelength joins matching points; amplitude measures from rest to crest.",
        "Guided practice: sketch and label a rope wave, then a spring wave. Explain the vibration direction before checking yourself."
      ]
    ],
    "checks": [
      {
        "id": "waves-types-1",
        "q": "Which can travel through empty space?",
        "choices": [
          "Light",
          "Sound",
          "Earthquake P waves"
        ],
        "answer": 0,
        "why": "Light is electromagnetic.",
        "transfer": false
      },
      {
        "id": "waves-types-2",
        "q": "A spring has alternating crowded and spread-out coils. What type is modeled?",
        "choices": [
          "Longitudinal",
          "Transverse",
          "Electromagnetic only"
        ],
        "answer": 0,
        "why": "Vibration is parallel to travel.",
        "transfer": false
      },
      {
        "id": "waves-types-3",
        "q": "Where is amplitude measured?",
        "choices": [
          "Rest position to crest",
          "Crest to next crest",
          "Crest to trough"
        ],
        "answer": 0,
        "why": "Amplitude is maximum displacement from rest.",
        "transfer": true
      }
    ],
    "reviewChecks": [
      {
        "id": "waves-review-types-1",
        "q": "An astronaut sees a flash but cannot hear an outside explosion through a vacuum. Why?",
        "choices": [
          "Light needs no medium; sound does",
          "Both need air",
          "Sound travels too fast"
        ],
        "answer": 0,
        "why": "A vacuum lacks particles for sound.",
        "transfer": false
      },
      {
        "id": "waves-review-types-2",
        "q": "A stadium wave moves around the stands while fans move up/down. Which pattern?",
        "choices": [
          "Transverse",
          "Longitudinal",
          "No wave"
        ],
        "answer": 0,
        "why": "Movement is perpendicular to travel.",
        "transfer": false
      },
      {
        "id": "waves-review-types-3",
        "q": "What is the spread-out region of a sound wave?",
        "choices": [
          "Rarefaction",
          "Compression",
          "Crest"
        ],
        "answer": 0,
        "why": "Particles are farther apart.",
        "transfer": true
      }
    ]
  },
  {
    "id": "SCI.WAVES.RELATIONSHIPS",
    "title": "Frequency, wavelength, amplitude + graphs",
    "schoolTag": "Unit 2 Waves",
    "minutes": "Work at your pace",
    "unit": "SCI.G8.WAVES",
    "targetIds": [
      "SCI.S8P4F.FREQUENCY_WAVELENGTH"
    ],
    "studyDay": "Wednesday",
    "sourceNote": "Teacher packet images 54–92 and supplied AKS 9e; explanations and practice questions adapted for Michael.",
    "teach": [
      [
        "Frequency counts cycles each second, in hertz. At the same speed, shorter wavelength means higher frequency.",
        "Worked model: at 12 m/s, wavelengths of 3 m and 6 m give 4 Hz and 2 Hz. Use speed = frequency × wavelength."
      ],
      [
        "Frequency changes sound pitch; amplitude changes loudness. Greater amplitude carries more energy in the same medium.",
        "Compare equal-height waves: closer crests mean higher pitch. Compare equal-spacing waves: taller waves mean louder sound, not higher pitch."
      ],
      [
        "Read table headings and units before comparing numbers.",
        "Guided: sketch one louder wave with the SAME pitch, and one higher-pitched wave with the SAME loudness. Say which feature you changed."
      ]
    ],
    "checks": [
      {
        "id": "waves-relationships-1",
        "q": "At the same speed, doubling wavelength makes frequency…",
        "choices": [
          "Half as large",
          "Twice as large",
          "Unchanged"
        ],
        "answer": 0,
        "why": "Speed stays fixed.",
        "transfer": false
      },
      {
        "id": "waves-relationships-2",
        "q": "A sound becomes louder without changing pitch. What changes?",
        "choices": [
          "Amplitude increases",
          "Frequency increases",
          "Wavelength shortens"
        ],
        "answer": 0,
        "why": "Amplitude affects loudness.",
        "transfer": false
      },
      {
        "id": "waves-relationships-3",
        "q": "Two waves have equal amplitude; B has more cycles per second. Which has higher pitch?",
        "choices": [
          "B",
          "A",
          "Neither"
        ],
        "answer": 0,
        "why": "Higher frequency means higher pitch.",
        "transfer": true
      }
    ],
    "reviewChecks": [
      {
        "id": "waves-review-relationships-1",
        "q": "A wave travels at 20 m/s with a 5 m wavelength. Frequency?",
        "choices": [
          "4 Hz",
          "100 Hz",
          "25 Hz"
        ],
        "answer": 0,
        "why": "20 ÷ 5 = 4.",
        "transfer": false
      },
      {
        "id": "waves-review-relationships-2",
        "q": "A table shows wavelength 2, 4, 8 m and frequency 12, 6, 3 Hz. Relationship?",
        "choices": [
          "As wavelength increases, frequency decreases",
          "Both increase",
          "No pattern"
        ],
        "answer": 0,
        "why": "Speed is constant at 24 m/s.",
        "transfer": false
      },
      {
        "id": "waves-review-relationships-3",
        "q": "Turning a speaker down while keeping the same note reduces…",
        "choices": [
          "Amplitude",
          "Frequency",
          "Wave speed"
        ],
        "answer": 0,
        "why": "Lower amplitude means quieter sound.",
        "transfer": true
      }
    ]
  },
  {
    "id": "SCI.WAVES.BEHAVIORS",
    "title": "Reflection, refraction + diffraction",
    "schoolTag": "Unit 2 Waves",
    "minutes": "Work at your pace",
    "unit": "SCI.G8.WAVES",
    "targetIds": [
      "SCI.S8P4D.REFLECTION"
    ],
    "studyDay": "Thursday",
    "sourceNote": "Teacher packet images 54–92 and supplied AKS 9e; explanations and practice questions adapted for Michael.",
    "teach": [
      [
        "Reflection is bouncing off a boundary; incidence angle equals reflection angle, measured from the normal.",
        "An echo is reflected sound. A mirror reflects light. Smooth surfaces give regular reflection; rough surfaces scatter reflected rays."
      ],
      [
        "Refraction is a change of direction when wave speed changes across a boundary at an angle.",
        "A straw appears bent in water because light changes speed and direction. Entering straight along the normal can change speed without bending."
      ],
      [
        "Diffraction is spreading around an edge or through an opening.",
        "Model: draw straight wave fronts reaching a doorway and curved fronts beyond it. Guided: distinguish a mirror, a bent straw, and hearing around a corner."
      ]
    ],
    "checks": [
      {
        "id": "waves-behaviors-1",
        "q": "An echo is an example of…",
        "choices": [
          "Reflection",
          "Refraction",
          "Dispersion"
        ],
        "answer": 0,
        "why": "Sound bounces back.",
        "transfer": false
      },
      {
        "id": "waves-behaviors-2",
        "q": "A straw appears bent at the water surface because of…",
        "choices": [
          "Refraction",
          "Reflection only",
          "Interference"
        ],
        "answer": 0,
        "why": "Light bends at the boundary.",
        "transfer": false
      },
      {
        "id": "waves-behaviors-3",
        "q": "Sound reaching you around a corner demonstrates…",
        "choices": [
          "Diffraction",
          "Dispersion",
          "Absorption"
        ],
        "answer": 0,
        "why": "Waves spread around an edge.",
        "transfer": true
      }
    ],
    "reviewChecks": [
      {
        "id": "waves-review-behaviors-1",
        "q": "A ray hits a mirror at 35 degrees from the normal. Reflection angle?",
        "choices": [
          "35 degrees",
          "55 degrees",
          "70 degrees"
        ],
        "answer": 0,
        "why": "Both angles use the normal.",
        "transfer": false
      },
      {
        "id": "waves-review-behaviors-2",
        "q": "Water ripples fan out after a narrow gap. Behavior?",
        "choices": [
          "Diffraction",
          "Refraction",
          "Absorption"
        ],
        "answer": 0,
        "why": "The gap causes spreading.",
        "transfer": false
      },
      {
        "id": "waves-review-behaviors-3",
        "q": "Light slows entering glass directly along the normal. Must it bend?",
        "choices": [
          "No",
          "Yes always",
          "It stops"
        ],
        "answer": 0,
        "why": "Direction need not change at normal incidence.",
        "transfer": true
      }
    ]
  },
  {
    "id": "SCI.WAVES.INTERFERENCE",
    "title": "Interference, transmission + materials",
    "schoolTag": "Unit 2 Waves",
    "minutes": "Work at your pace",
    "unit": "SCI.G8.WAVES",
    "targetIds": [
      "SCI.S8P4D.ABSORPTION_TRANSMISSION"
    ],
    "studyDay": "Thursday",
    "sourceNote": "Teacher packet images 54–92 and supplied AKS 9e; explanations and practice questions adapted for Michael.",
    "teach": [
      [
        "Interference happens when waves overlap. Constructive interference increases displacement; destructive interference reduces it.",
        "Model: aligned equal crests add. An equal crest and trough can cancel at that place and time; waves continue afterward."
      ],
      [
        "Transmission means passing through; absorption transfers wave energy into a material.",
        "Transparent glass transmits a clear image; translucent material blurs it; opaque material does not transmit visible light through it."
      ],
      [
        "Separate overlapping waves from waves bending or bouncing.",
        "Guided: explain noise-canceling headphones using opposing sound waves. Compare them with a curtain absorbing sound."
      ]
    ],
    "checks": [
      {
        "id": "waves-interference-1",
        "q": "Two equal crests overlap. Result?",
        "choices": [
          "Constructive interference",
          "Destructive interference",
          "Refraction"
        ],
        "answer": 0,
        "why": "Displacements add.",
        "transfer": false
      },
      {
        "id": "waves-interference-2",
        "q": "An equal crest and trough overlap. Result?",
        "choices": [
          "Destructive interference",
          "Constructive interference",
          "Dispersion"
        ],
        "answer": 0,
        "why": "Opposing displacements cancel locally.",
        "transfer": false
      },
      {
        "id": "waves-interference-3",
        "q": "Frosted glass passes light but blurs objects. It is…",
        "choices": [
          "Translucent",
          "Opaque",
          "Transparent"
        ],
        "answer": 0,
        "why": "It transmits scattered light.",
        "transfer": true
      }
    ],
    "reviewChecks": [
      {
        "id": "waves-review-interference-1",
        "q": "Two equal pulses have opposite displacement at the same point. Net displacement?",
        "choices": [
          "Zero at that instant",
          "Twice as large",
          "Waves permanently vanish"
        ],
        "answer": 0,
        "why": "Cancellation is local and temporary.",
        "transfer": false
      },
      {
        "id": "waves-review-interference-2",
        "q": "A wall blocks visible light passing through it. Classification?",
        "choices": [
          "Opaque",
          "Transparent",
          "Translucent"
        ],
        "answer": 0,
        "why": "Opaque materials block transmission.",
        "transfer": false
      },
      {
        "id": "waves-review-interference-3",
        "q": "A sound panel converts some sound energy into thermal energy. Behavior?",
        "choices": [
          "Absorption",
          "Diffraction",
          "Dispersion"
        ],
        "answer": 0,
        "why": "Energy transfers into the material.",
        "transfer": true
      }
    ]
  },
  {
    "id": "SCI.WAVES.SPEED",
    "title": "Sound, light + media data",
    "schoolTag": "Unit 2 Waves",
    "minutes": "Work at your pace",
    "unit": "SCI.G8.WAVES",
    "targetIds": [
      "SCI.S8P4E.MEDIA_DENSITY_SPEED"
    ],
    "studyDay": "Thursday",
    "sourceNote": "Teacher packet images 54–92 and supplied AKS 9e; explanations and practice questions adapted for Michael.",
    "teach": [
      [
        "Sound travels through vibrating particles. It generally travels faster through solids than liquids than gases, but actual speed depends on material properties.",
        "Read the packet data rather than assuming density alone controls speed: elasticity matters too."
      ],
      [
        "Light travels fastest in a vacuum and more slowly in materials such as water or glass. Sound cannot travel through a vacuum.",
        "Worked table: sound at 340 m/s in air and 1500 m/s in water reaches an equal-distance listener sooner through water."
      ],
      [
        "Compare the same wave over the same distance; do not mix sound and light rules.",
        "Guided: explain why you see lightning before hearing thunder. Identify which data supports your explanation."
      ]
    ],
    "checks": [
      {
        "id": "waves-speed-1",
        "q": "Which cannot carry sound?",
        "choices": [
          "A vacuum",
          "Water",
          "Steel"
        ],
        "answer": 0,
        "why": "Sound needs particles.",
        "transfer": false
      },
      {
        "id": "waves-speed-2",
        "q": "Equal distance: sound at 340 m/s or 1500 m/s arrives first?",
        "choices": [
          "1500 m/s",
          "340 m/s",
          "Same time"
        ],
        "answer": 0,
        "why": "Higher speed takes less time.",
        "transfer": false
      },
      {
        "id": "waves-speed-3",
        "q": "Where is light fastest?",
        "choices": [
          "Vacuum",
          "Glass",
          "Water"
        ],
        "answer": 0,
        "why": "Materials slow light relative to vacuum.",
        "transfer": true
      }
    ],
    "reviewChecks": [
      {
        "id": "waves-review-speed-1",
        "q": "A table lists sound speeds: X 500, Y 1200, Z 300 m/s. Fastest?",
        "choices": [
          "Y",
          "X",
          "Z"
        ],
        "answer": 0,
        "why": "1200 is greatest.",
        "transfer": false
      },
      {
        "id": "waves-review-speed-2",
        "q": "Why see a distant firework before its boom?",
        "choices": [
          "Light travels much faster than sound",
          "Sound cannot travel in air",
          "Light is louder"
        ],
        "answer": 0,
        "why": "Compare propagation speeds.",
        "transfer": false
      },
      {
        "id": "waves-review-speed-3",
        "q": "Can density alone predict sound speed in every material?",
        "choices": [
          "No; other properties matter",
          "Yes always",
          "Only color matters"
        ],
        "answer": 0,
        "why": "Elasticity and density both matter.",
        "transfer": true
      }
    ]
  },
  {
    "id": "SCI.WAVES.LIGHT",
    "title": "EM spectrum, dispersion + color",
    "schoolTag": "Unit 2 Waves",
    "minutes": "Work at your pace",
    "unit": "SCI.G8.WAVES",
    "targetIds": [
      "SCI.S8P4B.EM_SPECTRUM_ORDER"
    ],
    "studyDay": "Thursday",
    "sourceNote": "Teacher packet images 54–92 and supplied AKS 9e; explanations and practice questions adapted for Michael.",
    "teach": [
      [
        "From low to high frequency: radio, microwave, infrared, visible, ultraviolet, X-ray, gamma. Wavelength decreases; photon energy increases.",
        "Memory route: radio → microwave → infrared → visible → UV → X-ray → gamma."
      ],
      [
        "In visible light, red has the longest wavelength and lowest frequency; violet has the shortest wavelength and highest frequency.",
        "White light through a prism separates into colors because different wavelengths refract differently. This is dispersion."
      ],
      [
        "An object’s visible color depends on light it reflects or transmits to your eyes.",
        "Guided: compare red and violet using the packet table. Explain why a rainbow shows many colors rather than white."
      ]
    ],
    "checks": [
      {
        "id": "waves-light-1",
        "q": "Highest-frequency EM radiation?",
        "choices": [
          "Gamma rays",
          "Radio waves",
          "Infrared"
        ],
        "answer": 0,
        "why": "Gamma has the highest frequency.",
        "transfer": false
      },
      {
        "id": "waves-light-2",
        "q": "Longest visible wavelength?",
        "choices": [
          "Red",
          "Violet",
          "Blue"
        ],
        "answer": 0,
        "why": "Red is longest in the visible spectrum.",
        "transfer": false
      },
      {
        "id": "waves-light-3",
        "q": "A prism separates white light into colors. Name?",
        "choices": [
          "Dispersion",
          "Destructive interference",
          "Echo"
        ],
        "answer": 0,
        "why": "Wavelengths bend differently.",
        "transfer": true
      }
    ],
    "reviewChecks": [
      {
        "id": "waves-review-light-1",
        "q": "Which has higher frequency: green or orange light?",
        "choices": [
          "Green",
          "Orange",
          "Equal"
        ],
        "answer": 0,
        "why": "Green has shorter wavelength.",
        "transfer": false
      },
      {
        "id": "waves-review-light-2",
        "q": "Moving from radio toward X-rays, wavelength…",
        "choices": [
          "Decreases",
          "Increases",
          "Stays fixed"
        ],
        "answer": 0,
        "why": "Frequency rises as wavelength falls.",
        "transfer": false
      },
      {
        "id": "waves-review-light-3",
        "q": "A red shirt under white light looks red primarily because it…",
        "choices": [
          "Reflects red light toward your eyes",
          "Creates all colors equally",
          "Absorbs all red light"
        ],
        "answer": 0,
        "why": "Reflected light reaches the observer.",
        "transfer": true
      }
    ]
  },
  {
    "id": "SCI.WAVES.SEISMIC",
    "title": "Earthquake waves + seismographs",
    "schoolTag": "Unit 2 Waves",
    "minutes": "Work at your pace",
    "unit": "SCI.G8.WAVES",
    "targetIds": [
      "SCI.S8P4A.TRANSVERSE_LONGITUDINAL"
    ],
    "studyDay": "Thursday",
    "sourceNote": "Teacher packet images 54–92 and supplied AKS 9e; explanations and practice questions adapted for Michael.",
    "teach": [
      [
        "Seismic waves are mechanical waves carrying energy from an earthquake. P waves are longitudinal; S waves are transverse.",
        "P waves arrive first and travel through solids and liquids. S waves travel through solids but not liquids."
      ],
      [
        "A seismograph records ground motion over time; arrival times help estimate distance to an earthquake.",
        "Worked record: P arrives at 10 seconds and S at 16 seconds; the gap is 6 seconds. A larger P–S gap generally means greater distance."
      ],
      [
        "Focus is where rupture begins underground; epicenter is directly above it at the surface.",
        "Guided: draw Earth’s surface, focus, epicenter, and waves. Describe why a wave may reach one station sooner."
      ]
    ],
    "checks": [
      {
        "id": "waves-seismic-1",
        "q": "Which seismic wave arrives first?",
        "choices": [
          "P",
          "S",
          "All arrive together"
        ],
        "answer": 0,
        "why": "P waves are faster.",
        "transfer": false
      },
      {
        "id": "waves-seismic-2",
        "q": "Which cannot travel through liquid?",
        "choices": [
          "S",
          "P",
          "Both P and S"
        ],
        "answer": 0,
        "why": "S waves require shear support.",
        "transfer": false
      },
      {
        "id": "waves-seismic-3",
        "q": "The surface point above the focus is the…",
        "choices": [
          "Epicenter",
          "Compression",
          "Crest"
        ],
        "answer": 0,
        "why": "Epicenter lies directly above the focus.",
        "transfer": true
      }
    ],
    "reviewChecks": [
      {
        "id": "waves-review-seismic-1",
        "q": "P arrives at 8 s and S at 15 s. Gap?",
        "choices": [
          "7 seconds",
          "23 seconds",
          "8 seconds"
        ],
        "answer": 0,
        "why": "Subtract arrival times.",
        "transfer": false
      },
      {
        "id": "waves-review-seismic-2",
        "q": "Station A has a 3 s P–S gap, B has 9 s. Generally farther?",
        "choices": [
          "B",
          "A",
          "Cannot ever compare"
        ],
        "answer": 0,
        "why": "A larger gap generally indicates greater distance.",
        "transfer": false
      },
      {
        "id": "waves-review-seismic-3",
        "q": "Particles move side-to-side perpendicular to seismic travel. Type?",
        "choices": [
          "S wave",
          "P wave",
          "Radio wave"
        ],
        "answer": 0,
        "why": "S waves are transverse.",
        "transfer": true
      }
    ]
  },
  {
    "id": "SCI.WAVES.DOPPLER",
    "title": "Doppler effect + red/blue shift",
    "schoolTag": "Unit 2 Waves",
    "minutes": "Work at your pace",
    "unit": "SCI.G8.WAVES",
    "targetIds": [
      "SCI.EXT.DOPPLER"
    ],
    "studyDay": "Friday",
    "sourceNote": "Teacher packet images 54–92 and supplied AKS 9e; explanations and practice questions adapted for Michael.",
    "teach": [
      [
        "The Doppler effect changes observed frequency because the source and observer move relative to each other.",
        "Approaching source: wave fronts bunch together, shorter wavelength, higher observed frequency and pitch. Receding source: fronts spread out, lower pitch."
      ],
      [
        "Distance affects loudness; relative motion along the line of sight produces the Doppler pitch shift. The source’s emitted frequency need not change.",
        "Worked plane model: flying A → B, with A behind and B ahead: A hears lower pitch, B higher. A pilot moving with the source hears no Doppler shift from that source."
      ],
      [
        "For light, approach produces blueshift and recession produces redshift. They are both Doppler shifts.",
        "Guided: draw the plane, direction arrow, compressed fronts ahead and spread fronts behind. Explain the car’s approach using wavelength, position, frequency, and pitch; then explain departure."
      ]
    ],
    "checks": [
      {
        "id": "waves-doppler-1",
        "q": "A horn approaches a stationary listener. Heard pitch?",
        "choices": [
          "Higher",
          "Lower",
          "Always unchanged"
        ],
        "answer": 0,
        "why": "Fronts arrive more frequently.",
        "transfer": false
      },
      {
        "id": "waves-doppler-2",
        "q": "A source moves away. Observed wavelength?",
        "choices": [
          "Longer",
          "Shorter",
          "Zero"
        ],
        "answer": 0,
        "why": "Wave fronts are farther apart.",
        "transfer": false
      },
      {
        "id": "waves-doppler-3",
        "q": "Light from a receding source shifts toward…",
        "choices": [
          "Red",
          "Blue",
          "No possible shift"
        ],
        "answer": 0,
        "why": "Recession lengthens observed wavelength.",
        "transfer": true
      }
    ],
    "reviewChecks": [
      {
        "id": "waves-review-doppler-1",
        "q": "A siren moves toward you at constant emitted frequency. Why higher pitch?",
        "choices": [
          "Wave fronts reach you more often",
          "The driver must change the note",
          "Distance alone changes frequency"
        ],
        "answer": 0,
        "why": "Motion changes observed frequency.",
        "transfer": false
      },
      {
        "id": "waves-review-doppler-2",
        "q": "A pilot moves with the plane’s own sound source. Doppler shift from that source?",
        "choices": [
          "None from relative motion",
          "Always higher",
          "Always lower"
        ],
        "answer": 0,
        "why": "Pilot and source move together.",
        "transfer": false
      },
      {
        "id": "waves-review-doppler-3",
        "q": "An approaching star’s light shifts toward…",
        "choices": [
          "Blue",
          "Red",
          "Sound"
        ],
        "answer": 0,
        "why": "Approach shortens observed wavelength.",
        "transfer": true
      }
    ]
  }
]);
window.LEVEL_UP_CONTENT.sciencePlan={
  "title": "Unit 2: Waves",
  "deadline": "2026-10-02",
  "deadlineKind": "PARENT_LEARNING_GOAL",
  "masteryCheckDate": "2026-09-30",
  "testCoverage": "Not confirmed by the uploaded warm-up sheet",
  "lessonIds": [
    "SCI.WAVES.TYPES",
    "SCI.WAVES.RELATIONSHIPS",
    "SCI.WAVES.BEHAVIORS",
    "SCI.WAVES.INTERFERENCE",
    "SCI.WAVES.SPEED",
    "SCI.WAVES.LIGHT",
    "SCI.WAVES.SEISMIC",
    "SCI.WAVES.DOPPLER"
  ],
  "sourceImages": "54.jpg\u201392.jpg",
  "teachingNote": "Teach, model, guided practice, fade help, independent check, mixed review, delayed retrieval, and transfer. These lessons are Track B prior instruction; do not score them as cold diagnostics."
};
