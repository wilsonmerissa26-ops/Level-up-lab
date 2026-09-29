import assert from 'node:assert/strict';
import fs from 'node:fs';
import vm from 'node:vm';

const curriculumSource=fs.readFileSync(new URL('../science-curriculum.js',import.meta.url),'utf8');
const contentSource=fs.readFileSync(new URL('../content.js',import.meta.url),'utf8');

const ctx={};ctx.window=ctx;ctx.globalThis=ctx;vm.createContext(ctx);
vm.runInContext(curriculumSource,ctx,{filename:'science-curriculum.js'});
vm.runInContext(contentSource,ctx,{filename:'content.js'});

const C=ctx.LEVEL_UP_SCIENCE_CURRICULUM;
const CONTENT=ctx.LEVEL_UP_CONTENT;
assert.ok(C,'science curriculum loads');
assert.deepEqual(JSON.parse(JSON.stringify(C.standardsFamily)),['S8P1','S8P2','S8P3','S8P4','S8P5']);
assert.equal(C.units.length,5);

const coverage=C.standardsCoverage();
assert.deepEqual(coverage.missing,[],'all 23 Georgia Grade 8 Physical Science elements must have teachable targets');
assert.equal(coverage.expected.length,23);
assert.ok(C.allTargets().length>=60,'full curriculum should decompose standards into teachable targets');

for(const unit of C.units){
  assert.ok(unit.targets.length>=8,unit.id+' is too thin');
  for(const target of unit.targets){
    assert.ok(target.id.startsWith('SCI.'));
    assert.ok(Array.isArray(target.modes)&&target.modes.length>=2,target.id+' needs multiple performance modes');
    for(const mode of target.modes)assert.ok(C.performanceModes.includes(mode),target.id+' has unknown performance mode '+mode);
  }
}

assert.deepEqual(JSON.parse(JSON.stringify(C.teachingCycle)),[
  'TEACH','MODEL','GUIDED_PRACTICE','HELP','FADE_HELP','INDEPENDENT_CHECK',
  'MIX_OLD_AND_NEW','RECHECK_LATER','GENERALIZE'
]);

const scienceLessonIds=CONTENT.science.map(x=>x.id);
assert.equal(scienceLessonIds.length,11,'existing Michael science recovery lessons are preserved');
for(const id of scienceLessonIds){
  assert.ok(C.legacyAlignment[id],id+' must map into the full curriculum or a school extension');
  assert.ok(C.legacyAlignment[id].length>=1,id+' needs at least one curriculum alignment');
}

assert.ok(C.schoolExtensions.some(x=>x.id==='SCI.EXT.SPECIFIC_HEAT_CONCEPT'));
assert.match(C.clarificationBoundaries['S8P3.a'],/do not require.*calculate velocity or acceleration/i);
assert.match(C.clarificationBoundaries['S8P4.d'],/Interference and scattering are not Grade 8 core/i);
assert.match(C.clarificationBoundaries['S8P5'],/Circuit voltage\/current\/resistance.*school-specific extension/i);

const duplicateIds=C.allTargets().map(x=>x.id).filter((id,i,a)=>a.indexOf(id)!==i);
assert.deepEqual(duplicateIds,[],'curriculum target IDs must be unique');

console.log('Full Grade 8 Physical Science curriculum foundation: PASS');