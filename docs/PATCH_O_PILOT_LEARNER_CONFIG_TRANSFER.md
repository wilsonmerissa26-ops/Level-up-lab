# Patch O — Pilot Learner Blueprint and Transfer Layer

## Purpose

Make Level-Up reusable for The Learner Project pilot without copying one child's evidence, mastery history, school facts, or personal record into another learner.

This patch adds a reusable **Pilot Learner Blueprint** beside the current audited Michael runtime. It does not change Michael's evidence rules, Track A/Track B semantics, or storage durability behavior.

## What the blueprint captures

Each pilot learner can now be configured with:

- learner ID, display name, grade level/band, pilot cohort, and subjects
- interests and optional Interest Worlds
- communication modes such as speech, AAC, gesture, pointing, or typing
- response modes such as verbal response, matching, drag/drop, pointing, typing, AAC, drawing, or manipulatives
- reading/access supports
- motivators
- observable frustration signals
- sensory presentation mode
- Low-Stimulation availability
- animation/audio preferences
- visual schedule and predictable transitions
- preferred learning-block length and break choice
- Level-Up's learning loop:
  - TEACH
  - HELP
  - FADE_HELP
  - TEST_INDEPENDENTLY
  - MIX_OLD_AND_NEW
  - RECHECK_LATER
  - GENERALIZE
- Day 2 / 7 / 21 retention schedule by default
- required transfer/generalization checks

The personalization model is diagnosis-independent. A learner does not need an autism label to receive these supports, and an autism label does not automatically force any particular presentation or teaching method.

## Ethical/product boundary

The configuration freezes the current product boundary as:

`ACADEMIC_AND_FUNCTIONAL_LEARNING_ONLY`

The adaptive layer is intended to improve access, learning, independence, retention, and generalization. It is not a mechanism for making autistic learners appear neurotypical.

## Safe student creation

`learner-config.js` provides:

- `createPilotLearnerConfig(...)`
- `buildIsolationKeys(...)`
- `createStarterState(...)`
- `createTransferPackage(...)`
- `validateTransferPackage(...)`
- `cloneBlueprintForLearner(...)`

A new learner starter package must begin with empty:

- evidence
- sessions
- school facts
- review schedule
- mastery schedule
- lesson history
- skill/mastery history

The validator rejects a starter package if those histories are present.

## Isolation

Each learner receives separate generated storage identifiers:

- database name
- learner state key
- backup key

This is a bridge toward the shared multi-learner backend architecture. It prevents the existing Michael-specific browser keys from becoming the permanent commercial model.

## What this patch intentionally does not do

- It does not migrate Michael's live record.
- It does not change the current audited runtime gate.
- It does not copy real student data into Git.
- It does not yet replace every Michael-specific UI label in `app.js`.
- It does not add the future cloud/multi-tenant backend.

That runtime extraction should occur as a separate audited slice so reusability does not weaken current evidence integrity.

## Pilot workflow after this patch

1. Complete parent/student intake.
2. Convert intake selections into a Pilot Learner Blueprint.
3. Generate the learner's isolated starter package.
4. Attach subject/diagnostic content modules.
5. Run cold baseline where appropriate.
6. Teach from demonstrated gaps.
7. Record assistance/access separately.
8. Check independent performance.
9. Run delayed retention.
10. Run transfer/generalization.
11. Update the learner profile from evidence.
12. Preserve all learner-specific history inside that learner's isolated record.

This makes Student #2 a configuration/data job rather than a rebuild of the Level-Up engine.
