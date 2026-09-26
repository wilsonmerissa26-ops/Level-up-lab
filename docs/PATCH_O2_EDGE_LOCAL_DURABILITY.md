# Patch O.2 — Windows / Edge Local Durability

## Purpose

Allow the installed Windows/Edge Level-Up app to use a local-only durable path when Edge does not expose or grant the same persistent-storage API state that passed on the iPad.

This does **not** require Supabase and does not weaken the existing iPad path.

## Durable paths

A student runtime may be unlocked in the installed app when any one verified durability path is healthy:

- browser storage reports `PERSISTENT` (audited iPad path),
- the Windows local learner backup file reports `READY`, or
- a future authenticated shared backend reports `READY`.

## Windows local learner backup

The Windows fallback uses the browser File System Access API to connect a parent-selected JSON file on the laptop.

Once verified:

- IndexedDB remains the primary in-app learner record.
- localStorage remains the same-origin mirror.
- the connected learner backup file is written and read back on required learner saves.
- a failed file write fail-stops student work.
- the file write is revision-guarded.
- a newer or conflicting file is never silently overwritten.
- permission must be re-established if Edge requires it after restart.

The file handle itself is stored in IndexedDB where supported. The actual learner backup remains a normal file outside browser-origin storage, so it can survive loss of the website's browser storage.

## Target-device audit still required

Automated tests prove the state and conflict rules, but the Windows laptop must still pass a real target-device sequence before Michael uses it:

1. installed app / standalone confirmed,
2. connect `Michael-Level-Up-Live-Backup.json`,
3. status reports `Verified local backup`,
4. write synthetic learner state,
5. close app fully,
6. reopen and reconnect permission if Edge requests it,
7. confirm learner state and backup revision match,
8. restart Windows,
9. reopen and confirm again,
10. only then allow real learner evidence.

No real learner evidence should be collected during the synthetic durability audit.
