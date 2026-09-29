import assert from 'node:assert/strict';
import fs from 'node:fs';
import vm from 'node:vm';

const contentSource=fs.readFileSync(new URL('../content.js',import.meta.url),'utf8');
const configFactorySource=fs.readFileSync(new URL('../quest-config.js',import.meta.url),'utf8');
const michaelQuestConfigSource=fs.readFileSync(new URL('../michael-school-quest-config.js',import.meta.url),'utf8');
const engineSource=fs.readFileSync(new URL('../quest-engine.js',import.meta.url),'utf8');
const planSource=fs.readFileSync(new URL('../school-plan.js',import.meta.url),'utf8');
const css=fs.readFileSync(new URL('../styles.css',import.meta.url),'utf8');
const index=fs.readFileSync(new URL('../index.html',import.meta.url),'utf8');

const store=new Map();
const localStorage={getItem:k=>store.has(k)?store.get(k):null,setItem:(k,v)=>store.set(k,String(v)),removeItem:k=>store.delete(k)};
let durableProgress=null;
const ctx={localStorage};ctx.window=ctx;ctx.globalThis=ctx;ctx.location={reload(){}};
ctx.MLUL={
  schoolQuestAccess:()=>({allowed:true,message:null}),
  getSchoolQuestProgress:()=>durableProgress?structuredClone(durableProgress):null,
  saveSchoolQuestProgress:async({progress})=>{durableProgress=structuredClone(progress);return true},
  refreshSchoolPlan(){}
};
vm.createContext(ctx);
vm.runInContext(contentSource,ctx);vm.runInContext(engineSource,ctx);vm.runInContext(configFactorySource,ctx);vm.runInContext(michaelQuestConfigSource,ctx);vm.runInContext(planSource,ctx);
const api=ctx.LEVEL_UP_SCHOOL_PLAN;
const render=()=>api.render(x=>String(x));

let hub=render();
for(const text of ['Moon Mountain Challenge','Pick your animal teammate','WORLD MAP','Story Safari','Grammar Zoo','Dragon Obby','Review Boss Battle','Final Moon Boss','Practice mode:'])assert.ok(hub.includes(text),text);
for(const token of ['LVL 1','🪙 0','💎 0','❤️❤️❤️'])assert.ok(hub.includes(token),token);
assert.match(hub,/RECOMMENDED/,'School Success highlights a recommended route');
assert.doesNotMatch(hub,/CLEAR PRIOR WORLD/,'urgent School Success worlds are not hard locked');
assert.match(hub,/Game XP|game progress only|not diagnostic evidence/i);

await api.startWorld('grammar');
assert.ok(render().includes('Grammar Zoo'),'targeted review world can be entered directly');
await api.exitWorld();
await api.startWorld('story');
let story=render();
for(const text of ['FIND THE RIGHT BLOCK','Which term unlocks the next platform?','READ CLUE','SPAWN','GOAL'])assert.ok(story.includes(text),text);
assert.ok(story.includes('answer-block-grid'));

const first=ctx.LEVEL_UP_CONTENT.schoolPlan.urgent.studyBlocks[0].terms[0][0];
await api.chooseTerm('story',0,first);
story=render();assert.match(story,/CHECKPOINT CLEARED/);assert.match(story,/\+10 XP/);
assert.equal(durableProgress.xp,10);assert.equal(durableProgress.coins,3);

await api.exitWorld();
durableProgress.completed.story=true;
await api.startWorld('grammar');assert.ok(render().includes('Grammar Zoo'));

durableProgress.completed.grammar=true;durableProgress.completed.dragon=true;
await api.startWorld('boss');let boss=render();assert.ok(boss.includes('REVIEW BEAST'));assert.ok(boss.includes('100% BOSS HEALTH'));assert.ok(boss.includes('No fake grading'));

assert.match(index,/quest-engine\.js\?v=2026-09-\d+-o[0-9a-z]+/);
assert.ok(index.indexOf('quest-engine.js')<index.indexOf('school-plan.js'));
for(const cls of ['.game-hud','.game-world-map','.answer-block-grid','.boss-arena','.moon-gate-scene','.reward-drop'])assert.ok(css.includes(cls),cls);
console.log('Patch O.2.4 Michael block-game challenge UI: PASS');
