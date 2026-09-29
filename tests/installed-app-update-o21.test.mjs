import assert from 'node:assert/strict';
import fs from 'node:fs';

const index=fs.readFileSync(new URL('../index.html',import.meta.url),'utf8');
const marker='name="level-up-build" content="';
const start=index.indexOf(marker);
assert.ok(start>=0,'build version meta is present');
const rest=index.slice(start+marker.length);
const build=rest.slice(0,rest.indexOf('"'));
assert.ok(build);
assert.ok(index.includes(`href="styles.css?v=${build}"`));
assert.ok(index.includes(`href="manifest.json?v=${build}"`));
for(const asset of [
  'content.js','science-curriculum.js','quest-engine.js','quest-config.js','michael-school-quest-config.js','study-tracking.js','school-plan.js','review-engine.js','track-a-engine.js','track-a-diagnostic.js',
  'track-a-remediation.js','track-a-verification.js','track-a-mastery-state.js',
  'track-a-mastery.js','storage-durability.js','local-durable-file.js',
  'shared-backend-config.js','shared-persistence.js','runtime-gate.js',
  'state-integrity.js','app.js'
]){
  assert.ok(index.includes(`src="${asset}?v=${build}"`),`${asset} is versioned`);
}
console.log('Patch O.2.1 installed app cache-busting: PASS');
