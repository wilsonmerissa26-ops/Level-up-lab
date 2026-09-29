import assert from 'node:assert/strict';
import fs from 'node:fs';
import vm from 'node:vm';

const configSource=fs.readFileSync(new URL('../quest-config.js',import.meta.url),'utf8');
const michaelConfigSource=fs.readFileSync(new URL('../michael-school-quest-config.js',import.meta.url),'utf8');
const engineSource=fs.readFileSync(new URL('../quest-engine.js',import.meta.url),'utf8');
const planSource=fs.readFileSync(new URL('../school-plan.js',import.meta.url),'utf8');
const learnerSource=fs.readFileSync(new URL('../learner-config.js',import.meta.url),'utf8');
const appSource=fs.readFileSync(new URL('../app.js',import.meta.url),'utf8');
const index=fs.readFileSync(new URL('../index.html',import.meta.url),'utf8');
const manifest=JSON.parse(fs.readFileSync(new URL('../manifest.json',import.meta.url),'utf8'));

const core={};core.window=core;core.globalThis=core;vm.createContext(core);
vm.runInContext(configSource,core,{filename:'quest-config.js'});
vm.runInContext(engineSource,core,{filename:'quest-engine.js'});
const C=core.LEVEL_UP_QUEST_CONFIG;
const Q=core.LEVEL_UP_QUEST_ENGINE;
assert.ok(C&&Q);

assert.doesNotMatch(configSource,/Michael|Moon|Fox/i,'generic quest config must not carry Michael theme defaults');
assert.doesNotMatch(engineSource,/Michael|Moon|Fox/i,'generic quest engine must not carry Michael theme defaults');
assert.doesNotMatch(JSON.stringify(Q.DEFAULT_RANKS),/Moon|Story Scout|Mountain Master/i);
assert.equal(Q.freshProgress({worldOrder:['a']}).companion,null);

const learnerTwo=C.createQuestConfig({
  learnerId:'learner-2',
  questId:'READING.SPACE.REVIEW.01',
  contentVersion:3,
  subject:'Reading',
  targetPrefix:'READING.SPACE',
  lockMode:'RECOMMENDED',
  maxHearts:4,
  xpPerLevel:80,
  defaultCompanion:'robot',
  companions:[
    {id:'robot',emoji:'🤖',name:'Robot',line:'Scan the clue.'},
    {id:'comet',emoji:'☄️',name:'Comet',line:'Keep moving.'}
  ],
  ranks:[
    {min:0,name:'Cadet'},
    {min:80,name:'Pilot'},
    {min:160,name:'Commander'}
  ],
  worldOrder:['story','grammar','dragon','boss','final'],
  worlds:{
    story:{emoji:'🪐',title:'Word Nebula',subtitle:'Vocabulary',badge:'Word Finder',reward:'Nebula Box',chestCoins:10,chestGems:1},
    grammar:{emoji:'🛰️',title:'Sentence Station',subtitle:'Language',badge:'Sentence Builder',reward:'Station Box',chestCoins:12,chestGems:1},
    dragon:{emoji:'🚀',title:'Launch Sequence',subtitle:'Put events in order',badge:'Launch Leader',reward:'Launch Box',chestCoins:15,chestGems:1},
    boss:{emoji:'👾',title:'Mission Boss',subtitle:'Explain the big ideas',badge:'Mission Solver',reward:'Mission Box',chestCoins:20,chestGems:2},
    final:{emoji:'⭐',title:'Finish Gate',subtitle:'No-notes check',badge:'Finish Badge',reward:'Finish Box',chestCoins:25,chestGems:2}
  },
  currency:{coinName:'credit',gemName:'star'},
  copy:{
    shortName:'Galaxy Forge',
    title:'Galaxy Forge Challenge',
    spawnLabel:'LAUNCH PAD',
    spawnBlurb:'Pick the review world you need.',
    mapTitle:'Mission Map',
    finalGateLabel:'FINISH GATE',
    finalGateCaption:'CLEAR EVERY CHECK TO FINISH',
    clearedTitle:'MISSION CLEARED',
    clearedMessage:'Every review world is complete.',
    resetPrompt:'Reset this mission?'
  }
});
assert.equal(learnerTwo.scopeId,'quest:learner-2:READING.SPACE.REVIEW.01:v3');
assert.equal(learnerTwo.lockMode,'RECOMMENDED');
assert.doesNotMatch(C.visibleThemeText(learnerTwo),/Michael|Moon|Fox/i);

const pctx={
  localStorage:{getItem(){return null},setItem(){},removeItem(){}},
  location:{reload(){}}
};
pctx.window=pctx;pctx.globalThis=pctx;
let durableProgress=null;
pctx.LEVEL_UP_APP={
  schoolQuestAccess:()=>({allowed:true,message:null}),
  getSchoolQuestProgress:()=>durableProgress?structuredClone(durableProgress):null,
  saveSchoolQuestProgress:async({progress})=>{durableProgress=structuredClone(progress);return true},
  beginSchoolQuestItems:async({progress})=>{durableProgress=structuredClone(progress);return true},
  endSchoolQuestStudySession:async({progress})=>{durableProgress=structuredClone(progress);return true},
  refreshSchoolPlan(){}
};
pctx.LEVEL_UP_CONTENT={
  schoolPlan:{
    urgent:{
      id:'READING.SPACE.REVIEW.01',
      subject:'Reading',
      title:'Space Reading Review',
      testDate:'2026-10-10',
      evidencePolicy:'SCHOOL_SUPPORT_ONLY_NO_FORMAL_BASELINE',
      studyBlocks:[
        {minutes:5,title:'Words',terms:[['orbit','the path around an object'],['gravity','a force that pulls']]},
        {minutes:5,title:'Language',terms:[['clause','a group of words'],['verb','an action or state']]},
        {minutes:5,title:'Sequence',sequence:['Launch begins.','The craft reaches orbit.'],quickFacts:[]},
        {minutes:5,title:'Explain',prompts:[{q:'Why does sequence matter?',studyHelp:'Explain the order.',sourceNote:'Synthetic test content.'}]}
      ],
      finalCheck:['Explain orbit without notes.']
    }
  }
};
pctx.LEVEL_UP_SCHOOL_QUEST_CONFIG=learnerTwo;
vm.createContext(pctx);
vm.runInContext(engineSource,pctx,{filename:'quest-engine.js'});
vm.runInContext(planSource,pctx,{filename:'school-plan.js'});
const P=pctx.LEVEL_UP_SCHOOL_PLAN;
const rendered=P.render(x=>String(x));
const visible=rendered.replace(/<[^>]*>/g,' ').replace(/\s+/g,' ');
for(const expected of ['Galaxy Forge Challenge','Word Nebula','Sentence Station','Launch Sequence','Mission Boss','Finish Gate','Robot','Comet','RECOMMENDED']){
  assert.ok(visible.includes(expected),expected);
}
assert.doesNotMatch(visible,/Michael|Moon|Fox/i,'Learner 2 visible quest must not inherit Michael theme strings');
await P.startWorld('boss');
assert.ok(P.render(x=>String(x)).includes('Mission Boss'),'RECOMMENDED mode allows targeted urgent review without clearing earlier worlds');

const lctx={};lctx.window=lctx;lctx.globalThis=lctx;vm.createContext(lctx);vm.runInContext(learnerSource,lctx);
const L=lctx.LEVEL_UP_LEARNER_CONFIG;
const michaelKeys=L.buildIsolationKeys('michael');
const learnerTwoKeys=L.buildIsolationKeys('learner-2');
for(const key of ['dbName','stateKey','backupKey','gamePrefix']){
  assert.notEqual(michaelKeys[key],learnerTwoKeys[key],key+' must be learner-isolated on the same origin');
}

const mctx={};mctx.window=mctx;mctx.globalThis=mctx;vm.createContext(mctx);
vm.runInContext(configSource,mctx);
vm.runInContext(michaelConfigSource,mctx);
assert.equal(mctx.LEVEL_UP_SCHOOL_QUEST_CONFIG.learnerId,'michael');
assert.equal(mctx.LEVEL_UP_SCHOOL_QUEST_CONFIG.lockMode,'RECOMMENDED');
assert.match(C.visibleThemeText(mctx.LEVEL_UP_SCHOOL_QUEST_CONFIG),/Moon Mountain/);

assert.match(appSource,/window\.LEVEL_UP_APP=appApi/,'generic app namespace is exposed');
assert.match(appSource,/window\.MLUL=appApi/,'legacy MLUL alias remains for current pilot compatibility');
assert.doesNotMatch(appSource,/Michael-Level-Up-Backup/,'portable backup filename is no longer hard-coded to Michael');
assert.doesNotMatch(appSource,/Michael-Level-Up-Live-Backup/,'durable backup filename is no longer hard-coded to Michael');
assert.match(index,/<title>Level-Up Lab<\/title>/);
assert.doesNotMatch(index,/<title>Michael/i);
assert.equal(manifest.name,'Level-Up Lab');
assert.doesNotMatch(manifest.name,/Michael/i);
assert.ok(index.indexOf('quest-config.js')<index.indexOf('michael-school-quest-config.js'));
assert.ok(index.indexOf('michael-school-quest-config.js')<index.indexOf('school-plan.js'));

console.log('Patch O.2.5c reusable quest configuration and Learner 2 isolation: PASS');
