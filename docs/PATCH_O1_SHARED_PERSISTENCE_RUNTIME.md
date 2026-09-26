# Patch O.1 — Shared Persistence Runtime Hardening

## Purpose

Close the Windows/Edge durability gap without weakening the audited learner-evidence gate.

Patch N proved the installed iPad Home Screen + persistent-browser-storage path. Patch O added reusable learner configuration and isolation. Patch O.1 adds a second durable path for the reusable platform: an authenticated shared backend.

This slice does **not** enable unverified cloud storage and does **not** put real learner data or credentials in Git.

## Runtime rule

Student evidence may begin only when:

1. the build is enabled,
2. Level-Up is running as the installed standalone app, and
3. at least one durable persistence path is verified:
   - the legacy audited local path reports `PERSISTENT`, or
   - the shared backend reports `READY`.

A browser that cannot expose `navigator.storage.persist()` is not bypassed. It remains blocked until the shared backend is authenticated and healthy.

## Shared backend contract

`shared-persistence.js` provides a provider adapter for the locked Supabase direction.

It requires:

- Supabase project URL
- browser-safe anon/publishable key
- an authenticated user's access token
- Row Level Security
- optimistic revision checking

Never place a Supabase service-role key in browser code.

## Database contract

`supabase/001_shared_persistence.sql` creates:

- one learner-state row per authenticated owner + learner ID
- Row Level Security scoped to `auth.uid()`
- transactional `level_up_save_learner_state` RPC
- expected-revision checking so a stale device cannot silently overwrite a newer learner state

## Current deployment status

The repository ships with `shared-backend-config.js` disabled. That is intentional.

Before Michael uses desktop/cross-device learner evidence:

1. create/configure the private Supabase project,
2. apply the SQL migration,
3. configure parent authentication,
4. populate the browser-safe project URL and anon/publishable key,
5. verify `Shared backend layer: Shared backend verified`,
6. run end-to-end synthetic cross-device tests,
7. only then allow real learner evidence on desktop.

The existing iPad local-persistent path remains unchanged while this shared path is being certified.
