(() => {
  const GAP_CATEGORIES = Object.freeze([
    "CONTENT_KNOWLEDGE",
    "SCIENCE_VOCABULARY_LANGUAGE",
    "CONCEPT_RELATIONSHIPS",
    "MODELS_GRAPHS_DIAGRAMS",
    "SCIENTIFIC_REASONING",
    "INDEPENDENCE_MULTI_STEP",
    "RETENTION",
    "TRANSFER"
  ]);

  const SUPPORT_CONDITIONS = Object.freeze([
    "NONE_COLD",
    "SIMPLIFIED_LANGUAGE",
    "CHUNKED_DIRECTIONS",
    "VERBAL_EXPLANATION",
    "RELATIONSHIP_PROBE"
  ]);

  const STAGES = Object.freeze([
    "COLD_BASELINE",
    "CONTROLLED_PROBE",
    "TEACH",
    "TRANSFER",
    "DELAYED_RETENTION"
  ]);

  const items = Object.freeze([
    {
      id:"SGD.MATTER.1",
      targetId:"SCI.S8P1A.PURE_VS_MIXTURE",
      standard:"S8P1.a",
      domain:"Matter",
      prompt:"Which sample is a pure substance?",
      choices:["Air","Salt water","Pure copper","Trail mix"],
      answerIndex:2,
      gapHints:["CONTENT_KNOWLEDGE","SCIENCE_VOCABULARY_LANGUAGE"],
      simplifiedPrompt:"Which choice is made of only one kind of substance?",
      simplifiedChoices:["Air","Salt water","Pure copper","Trail mix"],
      relationshipPrompt:"Why is copper different from salt water in this question?",
      teach:"A pure substance has a fixed composition. An element such as copper is one pure substance; salt water is a mixture.",
      transferPrompt:"Which is a mixture?",
      transferChoices:["Oxygen gas","Distilled water","Carbon dioxide","Lemonade"],
      transferAnswerIndex:3
    },
    {
      id:"SGD.MATTER.2",
      targetId:"SCI.S8P1B.THERMAL_PARTICLE_MOTION",
      standard:"S8P1.b",
      domain:"Matter",
      prompt:"When thermal energy is added to a substance, what usually happens to its particles?",
      choices:["They move more slowly","They move faster","They lose all mass","They stop colliding"],
      answerIndex:1,
      gapHints:["CONTENT_KNOWLEDGE","CONCEPT_RELATIONSHIPS"],
      simplifiedPrompt:"If a substance gets hotter, what usually happens to the motion of its particles?",
      simplifiedChoices:["They slow down","They speed up","They disappear","They become heavier"],
      relationshipPrompt:"Explain the relationship between temperature and particle motion.",
      teach:"Adding thermal energy usually increases particle motion. Removing thermal energy usually decreases particle motion.",
      transferPrompt:"A liquid cools down. What happens to the average motion of its particles?",
      transferChoices:["It increases","It decreases","It stays exactly the same","It becomes zero immediately"],
      transferAnswerIndex:1
    },
    {
      id:"SGD.ENERGY.1",
      targetId:"SCI.S8P2C.ENERGY_TRANSFORMATIONS",
      standard:"S8P2.c",
      domain:"Energy",
      prompt:"A flashlight changes stored chemical energy in a battery mainly into which forms?",
      choices:["Light and thermal energy","Only gravitational energy","Only nuclear energy","Sound and gravitational energy"],
      answerIndex:0,
      gapHints:["CONTENT_KNOWLEDGE","CONCEPT_RELATIONSHIPS"],
      simplifiedPrompt:"When a flashlight is turned on, what useful energy comes out and what extra energy is also produced?",
      simplifiedChoices:["Light and heat","Gravity and sound","Nuclear and gravity","Only chemical energy"],
      relationshipPrompt:"Describe the energy transformation from the battery to the light you see.",
      teach:"Energy can change form. In a flashlight, chemical energy in the battery becomes electrical energy, then mostly light plus some thermal energy.",
      transferPrompt:"A toaster changes electrical energy mainly into what form?",
      transferChoices:["Thermal energy","Gravitational energy","Nuclear energy","Magnetic energy only"],
      transferAnswerIndex:0
    },
    {
      id:"SGD.ENERGY.2",
      targetId:"SCI.S8P2D.HEAT_TRANSFER_COMPARE",
      standard:"S8P2.d",
      domain:"Energy",
      prompt:"Warm water rises while cooler water sinks in a pot. Which heat-transfer process is this?",
      choices:["Conduction","Convection","Radiation","Reflection"],
      answerIndex:1,
      gapHints:["SCIENCE_VOCABULARY_LANGUAGE","CONCEPT_RELATIONSHIPS"],
      simplifiedPrompt:"Heat moves because warmer liquid rises and cooler liquid sinks. What is this called?",
      simplifiedChoices:["Conduction","Convection","Radiation","Refraction"],
      relationshipPrompt:"Why does moving fluid point to convection rather than conduction?",
      teach:"Convection transfers thermal energy through the movement of fluids such as liquids and gases. Conduction transfers energy through direct particle collisions.",
      transferPrompt:"Which example is mainly conduction?",
      transferChoices:["Sunlight warming your face","A metal spoon getting hot in soup","Warm air rising","Heat traveling through empty space"],
      transferAnswerIndex:1
    },
    {
      id:"SGD.FORCE.1",
      targetId:"SCI.S8P3B.UNBALANCED_FORCES",
      standard:"S8P3.b",
      domain:"Force and Motion",
      prompt:"A cart has 10 N of force pushing right and 4 N pushing left. What will an unbalanced net force do?",
      choices:["Cause a change in motion toward the right","Cause no change in motion","Make the cart lose mass","Make all forces disappear"],
      answerIndex:0,
      gapHints:["SCIENTIFIC_REASONING","INDEPENDENCE_MULTI_STEP"],
      simplifiedPrompt:"More force pushes right than left. Which direction is the overall force?",
      simplifiedChoices:["Right","Left","Neither direction","Up"],
      relationshipPrompt:"Explain how unequal forces can change an object's motion.",
      teach:"Unbalanced forces create a nonzero net force. A nonzero net force causes a change in motion in the direction of the net force.",
      transferPrompt:"A box has 3 N left and 3 N right. What is true about the net force?",
      transferChoices:["It is balanced at 0 N","It is 6 N right","It is 6 N left","The forces cannot be compared"],
      transferAnswerIndex:0
    },
    {
      id:"SGD.FORCE.2",
      targetId:"SCI.S8P3C.MASS_INERTIA",
      standard:"S8P3.c",
      domain:"Force and Motion",
      prompt:"Two carts are pushed with the same force. Cart A has more mass than Cart B. Which cart will generally have less acceleration?",
      choices:["Cart A","Cart B","Both must have the same acceleration","Neither cart can accelerate"],
      answerIndex:0,
      gapHints:["CONCEPT_RELATIONSHIPS","SCIENTIFIC_REASONING"],
      simplifiedPrompt:"If the same push is used, which object is harder to speed up: the heavier cart or the lighter cart?",
      simplifiedChoices:["Heavier cart","Lighter cart","They are always identical","Neither"],
      relationshipPrompt:"Explain the relationship among mass, force, and acceleration in this example.",
      teach:"With the same applied force, greater mass means less acceleration. More massive objects resist changes in motion more.",
      transferPrompt:"If mass stays the same and the applied force increases, what happens to acceleration?",
      transferChoices:["It increases","It decreases","It must become zero","Mass doubles"],
      transferAnswerIndex:0
    },
    {
      id:"SGD.FIELDS.1",
      targetId:"SCI.S8P5A.NONCONTACT_FORCES",
      standard:"S8P5.a",
      domain:"Gravity, Electricity and Magnetism",
      prompt:"Which force can act between objects without the objects touching?",
      choices:["Friction only","Gravity","A push from a hand only","A normal force from a table only"],
      answerIndex:1,
      gapHints:["CONTENT_KNOWLEDGE","SCIENCE_VOCABULARY_LANGUAGE"],
      simplifiedPrompt:"Which force can pull on an object from a distance?",
      simplifiedChoices:["Gravity","Friction","A hand pushing","A table pushing up"],
      relationshipPrompt:"What makes gravity a noncontact force?",
      teach:"Gravity, electric force, and magnetic force can act across a distance through fields, so direct contact is not required.",
      transferPrompt:"Which is another noncontact force?",
      transferChoices:["Magnetic force","Friction","Normal force","A hand pushing a cart"],
      transferAnswerIndex:0
    },
    {
      id:"SGD.FIELDS.2",
      targetId:"SCI.S8P5B.CONDUCTORS_INSULATORS",
      standard:"S8P5.b",
      domain:"Gravity, Electricity and Magnetism",
      prompt:"Which material is most likely to allow electric charge to move easily?",
      choices:["Copper wire","Rubber","Dry plastic","Glass"],
      answerIndex:0,
      gapHints:["CONTENT_KNOWLEDGE","ARGUMENT_FROM_EVIDENCE"],
      simplifiedPrompt:"Which material is the best electrical conductor?",
      simplifiedChoices:["Copper wire","Rubber","Plastic","Glass"],
      relationshipPrompt:"Why are metals often used for wires while rubber is used around the outside?",
      teach:"Conductors allow electric charge to move more easily. Insulators resist charge movement. Metals such as copper are good conductors; rubber is an insulator.",
      transferPrompt:"Which material would be best for covering an electrical wire for safety?",
      transferChoices:["Rubber","Copper","Aluminum","Steel"],
      transferAnswerIndex:0
    }
  ].map(x=>Object.freeze({...x,priorInstruction:false})));

  const byId = new Map(items.map(x=>[x.id,x]));

  function item(id){ return byId.get(id)||null; }
  function coldEligible(){ return items.filter(x=>!x.priorInstruction); }
  function checkChoice(id,index,phase="COLD_BASELINE"){
    const q=item(id);
    if(!q) return null;
    const answer = phase==="TRANSFER" ? q.transferAnswerIndex : q.answerIndex;
    return Number(index)===Number(answer);
  }

  const api = Object.freeze({
    version:"1.0.0",
    name:"Michael Science Gap Diagnostic",
    subject:"Physical Science",
    grade:"8",
    stages:STAGES,
    gapCategories:GAP_CATEGORIES,
    supportConditions:SUPPORT_CONDITIONS,
    items,
    item,
    coldEligible,
    checkChoice
  });

  if(typeof window!=="undefined") window.LEVEL_UP_SCIENCE_GAP_DIAGNOSTIC=api;
  if(typeof globalThis!=="undefined") globalThis.LEVEL_UP_SCIENCE_GAP_DIAGNOSTIC=api;
})();