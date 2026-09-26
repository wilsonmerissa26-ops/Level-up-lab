# Michael Level-Up Lab — v1 Foundation

> **PILOT SAFETY STATUS.** The installed-iPad local-persistence path is audited. Patch O.2 adds a Windows/Edge local-only durability path using a verified learner backup file, but Michael's laptop still requires a real target-device close/reopen + Windows-restart audit before real learner evidence is collected there.

This repository is the permanent foundation for Michael's individualized Level-Up Lab instance and the first reusable pilot of the broader Level-Up engine.

## Product architecture

Michael remains a **separate learner entity/site** with isolated curriculum, evidence, progress, parent views, and school-success data. The long-term commercial direction is a shared reusable Level-Up engine and modular features underneath individualized learner experiences.

Track B is implemented first so Michael can receive immediate school-recovery instruction while Track A controlled diagnostics/mastery logic is added in later slices.

## What is already implemented

- Michael learner profile
- Track A / Track B separation
- Track B Physical Science Unit 1 recovery sequence
- Track B Math bridge for inverse operations and literal equations
- distinct skill IDs for the six 7e subskills
- read-aloud support
- exact raw-response preservation, including `I don't know`
- split evidence dimensions: `evidence_class` and `instruction_exposure_status`
- `INFORMAL_TRACK_B` + `PRIOR_INSTRUCTION`
- frozen six-value `assistance_level` registry
- frozen four-value `access_condition` registry
- observed vs unrecorded access provenance
- immediate per-answer persistence in IndexedDB
- secondary local JSON snapshot in localStorage
- non-destructive persistence health check using a dedicated probe key
- hardened startup recovery
- Track-B-local progress labels that cannot write canonical lifecycle states
- Day 2 / Day 7 / Day 21 review scheduling structure
- Parent View
- Evidence Log
- JSON backup / restore
- reusable Pilot Learner Blueprint for creating isolated pilot students without transferring another learner's evidence/history
- adaptive learner-profile configuration for interests, communication/response modes, Interest Worlds, Low-Stimulation presentation, retention, transfer, and generalization
- fail-stop behavior when a required save fails
- Patch O.1 shared-persistence adapter and Supabase/RLS migration contract for the cross-device path
- Patch O.2 Windows/Edge local durable-file fallback with revision guards and fail-stop writes

## Current storage decision

The installed iPad pilot retains the audited local `PERSISTENT` browser-storage path.

Windows/Edge may also run local-only without Supabase when the installed app connects and verifies the Level-Up learner backup file added in Patch O.2. Required learner saves then write IndexedDB, the same-origin mirror, and the parent-selected local backup file; a failed or conflicting file write stops student work.

For automatic cross-device sync, the longer-term platform direction remains an authenticated **shared Supabase backend** from Patch O.1. Supabase is optional for a one-device local pilot but is still the planned shared persistence layer when the same learner record must automatically follow the student across devices.

A learner session may not continue after a failed required write. Every target device must pass its applicable durability audit before real learner evidence is collected.

## Running locally for audit only

This build has no package dependencies.

```bash
python3 -m http.server 8080
```

Then open `http://localhost:8080`.

Student lessons remain disabled in code until the final local-persistence audit passes.

## Commercial direction

The future product should reuse a shared Level-Up core while keeping every learner's experience and data isolated. SAT, Essay Coach, Scholarship Discovery, School Radar, ELA, Social Studies, and future modules should plug into the same engine rather than become separate technology stacks.

Do not commit real student records, credentials, or school-session secrets to this repository. Use synthetic fixtures in code.
