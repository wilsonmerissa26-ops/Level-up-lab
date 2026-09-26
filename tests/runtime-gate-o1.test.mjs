import assert from 'node:assert/strict';
import fs from 'node:fs';
import vm from 'node:vm';

const root=new URL('../',import.meta.url);
globalThis.window=globalThis;
vm.runInThisContext(fs.readFileSync(new URL('runtime-gate.js',root),'utf8'),{filename:'runtime-gate.js'});
const G=globalThis.LEVEL_UP_RUNTIME_GATE;

assert.deepEqual(
  G.evaluate({buildEnabled:true,standalone:true,persistenceState:'UNKNOWN_OR_UNSUPPORTED',sharedBackendState:'READY'}),
  {allowed:true,reason:'ALLOWED'}
);
assert.deepEqual(
  G.evaluate({buildEnabled:true,standalone:true,persistenceState:'PERSISTENT',sharedBackendState:'ERROR'}),
  {allowed:true,reason:'ALLOWED'},
  'legacy audited local persistent path remains valid'
);
assert.deepEqual(
  G.evaluate({buildEnabled:true,standalone:true,persistenceState:'UNKNOWN_OR_UNSUPPORTED',sharedBackendState:'AUTH_REQUIRED'}),
  {allowed:false,reason:'SHARED_BACKEND_REQUIRED'}
);
assert.match(G.message({reason:'SHARED_BACKEND_REQUIRED'}),/shared/i);

const index=fs.readFileSync(new URL('index.html',root),'utf8');
const app=fs.readFileSync(new URL('app.js',root),'utf8');
const sql=fs.readFileSync(new URL('supabase/001_shared_persistence.sql',root),'utf8');

assert.ok(index.indexOf('shared-backend-config.js')<index.indexOf('shared-persistence.js'));
assert.ok(index.indexOf('shared-persistence.js')<index.indexOf('runtime-gate.js'));
assert.ok(index.indexOf('runtime-gate.js')<index.indexOf('app.js'));
assert.match(app,/const SHARED_PERSISTENCE = window\.LEVEL_UP_SHARED_PERSISTENCE/);
assert.match(app,/sharedBackendState:sharedPersistenceStatus/);
assert.match(app,/async function reconcileSharedPersistence\(\)/);
assert.match(app,/Shared backend layer/);
assert.match(app,/sharedStore\.save\(CONTENT\.student\.id,candidate/);
assert.match(sql,/enable row level security/i);
assert.match(sql,/owner_id = auth\.uid\(\)/);
assert.match(sql,/REVISION_CONFLICT/);
assert.match(sql,/grant execute .* authenticated/i);

console.log('Patch O.1 shared runtime gate integration: PASS');
