# Michael Level-Up Lab — v1 Foundation

> **PILOT SAFETY STATUS.** The audited installed-iPad local-persistence path exists, but desktop/cross-device learner evidence remains blocked until the shared backend is authenticated, verified, and passes synthetic cross-device tests. Do not collect Michael's real learner evidence on desktop yet.

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

## Current storage decision

The installed iPad pilot retains the audited local `PERSISTENT` browser-storage path as a legacy-safe runtime option.

For desktop, cross-device use, and the reusable Level-Up platform, the locked direction is an authenticated **shared Supabase backend**. Patch O.1 adds the provider adapter, Row Level Security schema, and revision-conflict contract without weakening the existing evidence rules. The repository configuration remains disabled until the private Supabase project and parent authentication are configured and audited.

A learner session may not continue after a failed required write. Desktop learner evidence stays blocked unless either the audited local `PERSISTENT` path or the authenticated shared backend is verified.

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
