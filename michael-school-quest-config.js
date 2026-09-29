(() => {
  const FACTORY=globalThis.LEVEL_UP_QUEST_CONFIG;
  if(!FACTORY)throw new Error("Quest config factory must load before Michael School Quest config.");

  const config=FACTORY.createQuestConfig({
    learnerId:"michael",
    questId:"ELA.WTMMTM.TEST.2026-09-29",
    contentVersion:1,
    subject:"Language Arts",
    targetPrefix:"ELA.WTMMTM",
    legacyGameKey:"MLUL_WTMMTM_SCHOOL_QUEST_V1",
    lockMode:"RECOMMENDED",
    maxHearts:3,
    xpPerLevel:100,
    defaultCompanion:"fox",
    companions:[
      {id:"fox",emoji:"🦊",name:"Fox",line:"Fast thinker. Look for clues."},
      {id:"panda",emoji:"🐼",name:"Panda",line:"Stay calm. One challenge at a time."},
      {id:"tiger",emoji:"🐯",name:"Tiger",line:"Be bold. Lock in your answer."},
      {id:"owl",emoji:"🦉",name:"Owl",line:"Read carefully. Details matter."}
    ],
    ranks:[
      {min:0,name:"Rookie Explorer"},
      {min:120,name:"Story Scout"},
      {min:240,name:"Moon Ranger"},
      {min:360,name:"Mountain Master"},
      {min:520,name:"Legend Builder"}
    ],
    worldOrder:["story","grammar","dragon","boss","final"],
    worlds:{
      story:{
        emoji:"🦊",title:"Story Safari",subtitle:"Storytelling, fantasy, culture, and animal symbolism",
        badge:"Story Safari Scout",reward:"Safari Crate",chestCoins:20,chestGems:1
      },
      grammar:{
        emoji:"🐼",title:"Grammar Zoo",subtitle:"Literary terms, clauses, sentences, and conjunctions",
        badge:"Grammar Keeper",reward:"Zoo Vault",chestCoins:25,chestGems:1
      },
      dragon:{
        emoji:"🐉",title:"Dragon Obby",subtitle:"Jump through the five Dragon events in the teacher's order",
        badge:"Dragon Path Runner",reward:"Dragon Chest",chestCoins:35,chestGems:1
      },
      boss:{
        emoji:"🐯",title:"Review Boss Battle",subtitle:"Foreshadowing, abundance, generosity, Minli, and storytelling",
        badge:"Boss Breaker",reward:"Arena Chest",chestCoins:40,chestGems:2
      },
      final:{
        emoji:"🌙",title:"Final Moon Boss",subtitle:"No-notes readiness check for the Sept. 29 test",
        badge:"Moon Gate Master",reward:"Moon Vault",chestCoins:50,chestGems:3
      }
    },
    currency:{coinName:"coin",gemName:"Moon Gem"},
    copy:{
      shortName:"Moon Mountain",
      title:"Moon Mountain Challenge",
      spawnLabel:"SPAWN POINT",
      spawnBlurb:"Choose the world Michael needs most. The highlighted route is recommended, but every study world stays available for urgent test review.",
      mapTitle:"Climb to the Moon Gate",
      finalGateLabel:"FINAL GATE",
      finalGateCaption:"CLEAR EVERY LOCK TO OPEN THE MOON GATE",
      clearedTitle:"QUEST CLEARED",
      clearedMessage:"Michael cleared every world. Replay only the areas he still wants to refresh.",
      resetPrompt:"Reset Moon Mountain game progress? The study content will stay."
    }
  });

  if(typeof window!=="undefined")window.LEVEL_UP_SCHOOL_QUEST_CONFIG=config;
  if(typeof globalThis!=="undefined")globalThis.LEVEL_UP_SCHOOL_QUEST_CONFIG=config;
})();