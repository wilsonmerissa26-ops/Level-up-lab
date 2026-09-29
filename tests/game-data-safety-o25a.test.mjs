import assert from 'node:assert/strict';
import fs from 'node:fs';
import vm from 'node:vm';

const engineSource=fs.readFileSync(new URL('../quest-engine.js',import.meta.url),'utf8');
const contentSource=fs.readFileSync(new URL('../content.js',import.meta.url),'utf8');
const configFactorySource=fs.readFileSync(new URL('../quest-config.js',import.meta.url),'utf8');
const michaelQuestConfigSource=fs.readFileSync(new URL('../michael-school-quest-config.js',import.meta.url),'utf8');
const planSource=fs.readFileSync(new URL('../school-plan.js',import.meta.url),'utf8');
const appSource=fs.readFileSync(new URL('../app.js',import.meta.url),'utf8');
const learnerSource=fs.readFileSync(new URL('../learner-config.js',import.meta.url),'utf8');

const qctx={};qctx.window=qctx;qctx.globalThis=qctx;vm.createContext(qctx);vm.runInContext(engineSource,qctx);
const Q=qctx.LEVEL_UP_QUEST_ENGINE;
const order=['story','grammar','dragon','boss','final'];

const legacy={
  version:2,companion:'owl',xp:'70',streak:'4',coins:2,gems:1,hearts:3,maxHearts:3,
  completed:{story:true,grammar:true},answered:{story:{0:true},grammar:{0:true}},
  openedChests:[],pendingReward:{worldId:'grammar',badge:'Grammar Keeper',chestCoins:25,chestGems:1},
  activeWorld:'grammar',index:999,feedback:{correct:true,message:'stale'}
};
const p=Q.normalizeProgress(legacy,{worldOrder:order,companion:'fox',maxHearts:3});
assert.equal(p.version,Q.CURRENT_VERSION);
assert.equal(p.xp,70);
assert.equal(p.streak,4);
assert.equal(p.feedback,null);
assert.equal(p.pendingRewards.length,1);
assert.equal(p.pendingRewards[0].worldId,'grammar');

Q.reconcileWorldRewards(p,{
  story:{badge:'Story Safari Scout',chestCoins:20,chestGems:1},
  grammar:{badge:'Grammar Keeper',chestCoins:25,chestGems:1}
});
assert.ok(p.badges.includes('Story Safari Scout'));
assert.ok(p.badges.includes('Grammar Keeper'));
assert.deepEqual([...p.pendingRewards].map(x=>x.worldId).sort(),['grammar','story']);

const beforeXp=p.xp;
let award=Q.awardCorrect(p,{itemId:'quest:story:0',xp:10,coins:3});
assert.equal(award.awarded,true);
award=Q.awardCorrect(p,{itemId:'quest:story:0',xp:10,coins:3});
assert.equal(award.awarded,false);
assert.equal(p.xp,beforeXp+10,'same item cannot farm XP');

assert.throws(()=>Q.normalizeProgress({version:Q.CURRENT_VERSION+1},{worldOrder:order}),/future game progress version/i);
const invalid=Q.normalizeProgress({version:2,activeWorld:'boss',index:-5,completed:{story:false},xp:'oops',streak:-3},{worldOrder:order});
assert.equal(invalid.activeWorld,null);
assert.equal(invalid.index,0);
assert.equal(invalid.xp,0);
assert.equal(invalid.streak,0);

assert.equal(Q.bossHealth(-2,5),100);
assert.equal(Q.bossHealth(9,5),0);
assert.equal(Q.bossHealth(0,0),0);

const store=new Map();
store.set('MLUL_WTMMTM_SCHOOL_QUEST_V1',JSON.stringify(legacy));
const pctx={localStorage:{getItem:k=>store.get(k)||null,setItem:(k,v)=>store.set(k,String(v)),removeItem:k=>store.delete(k)}};
pctx.window=pctx;pctx.globalThis=pctx;pctx.location={reload(){}};pctx.MLUL={schoolQuestAccess:()=>({allowed:true}),getSchoolQuestProgress:()=>null,refreshSchoolPlan(){}};
vm.createContext(pctx);vm.runInContext(contentSource,pctx);vm.runInContext(engineSource,pctx);vm.runInContext(configFactorySource,pctx);vm.runInContext(michaelQuestConfigSource,pctx);vm.runInContext(planSource,pctx);
const P=pctx.LEVEL_UP_SCHOOL_PLAN;
const candidate=P.legacyMigrationCandidate();
assert.ok(candidate);
assert.equal(candidate.questId,'ELA.WTMMTM.TEST.2026-09-29');
assert.equal(candidate.progress.version,Q.CURRENT_VERSION);
assert.equal(candidate.progress.completed.story,true);
assert.equal(P.urgencyLabel(new Date('2026-09-29T12:00:00')),'TEST TODAY · SEP 29');
assert.equal(P.urgencyLabel(new Date('2026-09-30T12:00:00')),'TEST COMPLETED · SEP 29');

assert.match(appSource,/function schoolQuestAccess\(\)/);
assert.match(appSource,/COPIED_PENDING_VERIFY/);
assert.match(appSource,/migrationStatus="VERIFIED"/);
assert.match(appSource,/legacyKeyRetainedReadOnly:true/);
assert.match(appSource,/saveSchoolQuestProgress/);
assert.doesNotMatch(planSource,/localStorage\?\.setItem\(LEGACY_GAME_KEY/,'legacy key is no longer written');

const lctx={};lctx.window=lctx;lctx.globalThis=lctx;vm.createContext(lctx);vm.runInContext(learnerSource,lctx);
const L=lctx.LEVEL_UP_LEARNER_CONFIG;
const a=L.buildIsolationKeys('pilot-1');
const b=L.buildIsolationKeys('pilot_1');
assert.notEqual(a.backupKey,b.backupKey,'backup keys must not collide');
assert.notEqual(a.gamePrefix,b.gamePrefix,'game prefixes must not collide');

console.log('Patch O.2.5a game data safety: PASS');
