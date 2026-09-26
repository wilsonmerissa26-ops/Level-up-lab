import assert from 'node:assert/strict';
import fs from 'node:fs';
import vm from 'node:vm';

globalThis.window=globalThis;
vm.runInThisContext(fs.readFileSync(new URL('../runtime-gate.js',import.meta.url),'utf8'),{filename:'runtime-gate.js'});
const G=globalThis.LEVEL_UP_RUNTIME_GATE;

assert.deepEqual(
  G.evaluate({buildEnabled:true,standalone:true,persistenceState:'UNKNOWN_OR_UNSUPPORTED',localDurableState:'READY',sharedBackendState:'DISABLED'}),
  {allowed:true,reason:'ALLOWED'}
);
assert.deepEqual(
  G.evaluate({buildEnabled:true,standalone:true,persistenceState:'PERSISTENT',localDurableState:'ERROR',sharedBackendState:'DISABLED'}),
  {allowed:true,reason:'ALLOWED'},
  'audited iPad PERSISTENT path remains valid'
);
assert.deepEqual(
  G.evaluate({buildEnabled:true,standalone:true,persistenceState:'UNKNOWN_OR_UNSUPPORTED',localDurableState:'NOT_CONFIGURED',sharedBackendState:'DISABLED'}),
  {allowed:false,reason:'LOCAL_DURABLE_FILE_REQUIRED'}
);
assert.deepEqual(
  G.evaluate({buildEnabled:true,standalone:true,persistenceState:'UNKNOWN_OR_UNSUPPORTED',localDurableState:'FILE_AHEAD',sharedBackendState:'DISABLED'}),
  {allowed:false,reason:'LOCAL_DURABLE_FILE_REQUIRED'}
);
assert.match(G.message({reason:'LOCAL_DURABLE_FILE_REQUIRED'}),/local backup file/i);

const index=fs.readFileSync(new URL('../index.html',import.meta.url),'utf8');
const app=fs.readFileSync(new URL('../app.js',import.meta.url),'utf8');
assert.ok(index.indexOf('local-durable-file.js')<index.indexOf('app.js'));
assert.match(app,/LOCAL_DURABLE_HANDLE_KEY/);
assert.match(app,/localDurableState:localDurableStatus/);
assert.match(app,/Connect local backup file/);
assert.match(app,/LOCAL_DURABLE_FILE\.writeSnapshot/);
assert.match(app,/expectedRevision:previousRevision/);
assert.match(app,/FILE_AHEAD/);
assert.match(app,/Student work is stopped until the Backup screen repairs the local file/);

console.log('Patch O.2 Windows local durability integration: PASS');
