# Patch P — Intake to Personalized Diagnostic Generator (foundation only)

## Delivery status

Development branch only. NOT pilot released, NOT wired into Michael's active app, NOT a complete K–8 diagnostic battery.

This slice creates a pure planning module in patch-p-intake-diagnostic.js. It does not touch app.js, index.html, learner records, Supabase, or existing Grade 8 scoring.

## Existing foundation preserved

- Patch O learner blueprint and isolated starter data.
- Track A controlled math: six existing skill generators and their three-probe evidence rules.
- Grade 8 science gap: existing eight-item bank with cold/probe/teach/transfer/delayed-retention pathway.
- School work/exposure safeguards, persistence runtime gates, and current Michael-only route.

## What this slice adds

- Parent intake normalization: grade, requested subjects, concerns, strengths, interests, communication and response modes, frustration signals, reading-access information, and prior instruction targets.
- Mapping intake into input arguments for existing Patch O createPilotLearnerConfig (does not create/save any account).
- Diagnostic planning with explicit unavailable subjects rather than invented tests.
- Seven Grade 4 pilot-draft items across decoding, reading comprehension, vocabulary, number sense, multiplication, and math word problems. NOT a standards-validated or complete diagnostic.
- Grade 8 provider hooks that reuse existing Track A Math and Science Gap item identifiers.
- Planning safeguards for baseline history, reliability, guessing, and mastery, with no automated scoring/placement.

## Next work before student use

1. Review Grade 4 draft items for standards and quality; produce equivalent probes per skill and prerequisite paths.
2. Build and validate reading, vocabulary, comprehension, and math banks for Grades K–8.
3. Connect UI to intake, blueprint creation, isolated learner backend, and diagnostic planning while preserving runtime gate.
4. Record school data, prior instruction, language access, response mode, and support at the skill/item level.
5. Add response-integrity indicators and independent verification; do not diagnose guessing from speed alone.
6. Test content, accessibility, delayed retrieval, transfer, and isolation in synthetic and target-browser QA.
7. Review child privacy, consent, authentication, and Supabase RLS before external pilot release.

## Testing

Run: node --test tests/patch-p-intake-diagnostic.test.mjs

This tests basic normalization, Grade 4 item indexes, Grade 8 provider reuse, unavailable coverage, and safeguards. It does not validate instructional accuracy or student outcomes.
