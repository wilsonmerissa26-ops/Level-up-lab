import assert from 'node:assert/strict';
import fs from 'node:fs';
import vm from 'node:vm';

const source=fs.readFileSync(new URL('../quest-engine.js',import.meta.url),'utf8');
const ctx={};ctx.window=ctx;ctx.globalThis=ctx;vm.createContext(ctx);vm.runInContext(source,ctx);
const Q=ctx.LEVEL_UP_QUEST_ENGINE;
assert.ok(Q);
const order=['story','grammar','dragon','boss','final'];
const fresh=Q.freshProgress({worldOrder:order,companion:'fox',maxHearts:3});
assert.equal(fresh.version,Q.CURRENT_VERSION);assert.equal(fresh.coins,0);assert.equal(fresh.gems,0);assert.equal(fresh.hearts,3);
assert.equal(Q.worldUnlocked(fresh,'story',order),true);
assert.equal(Q.worldUnlocked(fresh,'grammar',order),false);

const migrated=Q.normalizeProgress({version:1,companion:'owl',xp:70,streak:4,answered:{story:{0:true}},completed:{story:true},bossDone:{},finalDone:{}},{worldOrder:order,companion:'fox',maxHearts:3});
assert.equal(migrated.companion,'owl');assert.equal(migrated.xp,70);assert.equal(migrated.streak,4);
assert.equal(migrated.completed.story,true,'v1 completion survives migration');
assert.equal(migrated.coins,0);assert.equal(migrated.gems,0);assert.equal(migrated.hearts,3);
assert.equal(Q.worldUnlocked(migrated,'grammar',order),true);

Q.awardCorrect(migrated,{itemId:'compat:grammar:0',xp:10,coins:3,gems:1});
assert.equal(migrated.xp,80);assert.equal(migrated.coins,3);assert.equal(migrated.gems,1);assert.equal(migrated.streak,5);
migrated.hearts=1;const miss=Q.registerMiss(migrated);
assert.equal(miss.respawned,true);assert.equal(migrated.hearts,3);assert.equal(migrated.streak,0);assert.equal(migrated.respawns,1);

const reward=Q.completeWorld(migrated,'grammar',{badge:'Grammar Keeper',chestCoins:25,chestGems:1});
assert.equal(reward.first,true);assert.equal(migrated.completed.grammar,true);assert.ok(migrated.badges.includes('Grammar Keeper'));assert.equal(migrated.pendingRewards[0].worldId,'grammar');
Q.openPendingReward(migrated);assert.equal(migrated.coins,28);assert.equal(migrated.gems,2);assert.ok(migrated.openedChests.includes('grammar'));assert.equal(migrated.pendingRewards.length,0);
assert.equal(Q.bossHealth(0,5),100);assert.equal(Q.bossHealth(3,5),40);assert.equal(Q.bossHealth(5,5),0);
console.log('Patch O.2.4 reusable quest engine: PASS');
