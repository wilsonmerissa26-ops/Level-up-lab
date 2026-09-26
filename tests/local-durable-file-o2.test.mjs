import assert from 'node:assert/strict';
import fs from 'node:fs';
import vm from 'node:vm';

const source=fs.readFileSync(new URL('../local-durable-file.js',import.meta.url),'utf8');
const ctx={};vm.createContext(ctx);vm.runInContext(source,ctx);
const F=ctx.LEVEL_UP_LOCAL_DURABLE_FILE;
assert.ok(F,'local durable file module loads');

assert.equal(F.capability({isSecureContext:true,showSaveFilePicker(){}}).canPick,true);
assert.equal(F.capability({isSecureContext:true}).canPick,false);

function handleWith(initialText=''){
  let text=initialText;
  let permission='granted';
  return {
    kind:'file',
    name:'Michael-Level-Up-Live-Backup.json',
    queryPermission:async()=>permission,
    requestPermission:async()=>permission='granted',
    getFile:async()=>({text:async()=>text}),
    createWritable:async()=>({
      write:async(value)=>{text=String(value)},
      close:async()=>{}
    }),
    _text:()=>text,
    _permission:value=>permission=value
  };
}

const snapshot={schemaVersion:2,stateRevision:4,student:{id:'michael'},evidence:[],lessonState:{}};
const empty=handleWith('');
const wrote=await F.writeSnapshot(empty,snapshot);
assert.equal(wrote.ok,true);
assert.equal(JSON.parse(empty._text()).stateRevision,4);

const read=await F.readSnapshot(empty);
assert.equal(read.ok,true);
assert.equal(read.snapshot.student.id,'michael');

const guarded=await F.writeSnapshot(empty,{...snapshot,stateRevision:5},{expectedRevision:4});
assert.equal(guarded.ok,true);
assert.equal(JSON.parse(empty._text()).stateRevision,5);

const conflict=await F.writeSnapshot(empty,{...snapshot,stateRevision:6},{expectedRevision:4});
assert.equal(conflict.ok,false);
assert.equal(conflict.revisionConflict,true);
assert.equal(JSON.parse(empty._text()).stateRevision,5,'revision conflict never overwrites newer file');

assert.equal(F.compareSnapshots({...snapshot,stateRevision:5},{...snapshot,stateRevision:5}).state,'READY');
assert.equal(F.compareSnapshots({...snapshot,stateRevision:5},{...snapshot,stateRevision:4}).state,'STALE');
assert.equal(F.compareSnapshots({...snapshot,stateRevision:5},{...snapshot,stateRevision:6}).state,'FILE_AHEAD');
assert.equal(F.compareSnapshots({...snapshot,stateRevision:5},{...snapshot,stateRevision:5,updatedAt:'different'}).state,'CONFLICT');

const denied=handleWith(JSON.stringify(snapshot));
denied._permission('prompt');
assert.equal((await F.readSnapshot(denied)).state,'NEEDS_PERMISSION');
assert.equal(await F.requestPermission(denied),'granted');

console.log('Patch O.2 local durable file adapter: PASS');
