import assert from 'node:assert/strict';
import fs from 'node:fs';
import vm from 'node:vm';

const contentSource=fs.readFileSync(new URL('../content.js',import.meta.url),'utf8');
const engineSource=fs.readFileSync(new URL('../quest-engine.js',import.meta.url),'utf8');
const planSource=fs.readFileSync(new URL('../school-plan.js',import.meta.url),'utf8');
const css=fs.readFileSync(new URL('../styles.css',import.meta.url),'utf8');
const index=fs.readFileSync(new URL('../index.html',import.meta.url),'utf8');

const store=new Map();
const localStorage={getItem:k=>store.has(k)?store.get(k):null,setItem:(k,v)=>store.set(k,String(v)),removeItem:k=>store.delete(k)};
const ctx={localStorage};ctx.window=ctx;ctx.globalThis=ctx;ctx.location={reload(){}};vm.createContext(ctx);
vm.runInContext(contentSource,ctx);vm.runInContext(engineSource,ctx);vm.runInContext(planSource,ctx);
const api=ctx.LEVEL_UP_SCHOOL_PLAN;
const render=()=>api.render(x=>String(x));

let hub=render();
for(const text of ['Moon Mountain Challenge','Pick your animal teammate','WORLD MAP','Story Safari','Grammar Zoo','Dragon Obby','Review Boss Battle','Final Moon Boss','Practice mode:'])assert.ok(hub.includes(text),text);
for(const token of ['LVL 1','🪙 0','💎 0','❤️❤️❤️'])assert.ok(hub.includes(token),token);
assert.match(hub,/CLEAR PRIOR WORLD/,'later worlds are visibly locked');
assert.match(hub,/Game XP|game progress only|not diagnostic evidence/i);

api.startWorld('grammar');
assert.ok(render().includes('WORLD MAP'),'locked world cannot be entered');
api.startWorld('story');
let story=render();
for(const text of ['FIND THE RIGHT BLOCK','Which term unlocks the next platform?','READ CLUE','SPAWN','GOAL'])assert.ok(story.includes(text),text);
assert.ok(story.includes('answer-block-grid'));

const first=ctx.LEVEL_UP_CONTENT.schoolPlan.urgent.studyBlocks[0].terms[0][0];
api.chooseTerm('story',0,first);
story=render();assert.match(story,/CHECKPOINT CLEARED/);assert.match(story,/\+10 XP/);

const progress1=JSON.parse(store.get('MLUL_WTMMTM_SCHOOL_QUEST_V1'));
assert.equal(progress1.xp,10);assert.equal(progress1.coins,3);

api.exitWorld();
const p=JSON.parse(store.get('MLUL_WTMMTM_SCHOOL_QUEST_V1'));p.completed.story=true;store.set('MLUL_WTMMTM_SCHOOL_QUEST_V1',JSON.stringify(p));
api.startWorld('grammar');assert.ok(render().includes('Grammar Zoo'));

const p2=JSON.parse(store.get('MLUL_WTMMTM_SCHOOL_QUEST_V1'));p2.completed.grammar=true;p2.completed.dragon=true;store.set('MLUL_WTMMTM_SCHOOL_QUEST_V1',JSON.stringify(p2));
api.startWorld('boss');let boss=render();assert.ok(boss.includes('REVIEW BEAST'));assert.ok(boss.includes('100% BOSS HEALTH'));assert.ok(boss.includes('No fake grading'));

assert.ok(index.includes('quest-engine.js?v=2026-09-28-o24'));
assert.ok(index.indexOf('quest-engine.js?v=2026-09-28-o24')<index.indexOf('school-plan.js?v=2026-09-28-o24'));
for(const cls of ['.game-hud','.game-world-map','.answer-block-grid','.boss-arena','.moon-gate-scene','.reward-drop'])assert.ok(css.includes(cls),cls);
console.log('Patch O.2.4 Michael block-game challenge UI: PASS');
