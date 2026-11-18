# Independent review required

Branch: `fix/student-teaching-review`
Baseline: `df85abd8733273ff0e15c4f5e45b27c6c53d32d2`

This branch is for review. Do not merge or deploy before independent review and Merissa's approval. Developer tests and synthetic runs are not independent instructional validation.

## Implemented changes

1. Keep the pre-visual teaching visible alongside the models. Add definitions and worked examples for the six identified omissions: conductors/insulators, energy forms, transmission/materials, focus/epicenter, dispersion, and Newton's third law. The matrix covers all 70 lessons and 297 immediate questions. Question-term flags are triage, not proof of coverage.
2. Revised distractors receive new version IDs. Freeze the original authored question bank and preserve it for legacy sessions. New sessions pin their full question bank. Existing evidence is never edited. New answers record their choices and content version.
3. Unrecorded help stays null. In-app guided and hinted support cannot become independent merely because the learner selects Independent. Michael can report no help; this has explicit student-report provenance and a separate count. It does not become adult-observed independence. Parent View lists these reports separately.
4. A low score recommends reteaching first and provides Go back over this. Existing next-lesson eligibility and Track A thresholds are unchanged.
5. Narration groups complete sentences, preserves decimals and words, skips empty pieces, and uses one toolbar with speed selection. The control stays usable after an answer is locked. Shared audio access continues to use the existing recorded-access adapters. Silent Science Gap items still read directions only.
6. Student navigation is Today, Science, Math, ELA, Coding, Help. Parent tools and technical banners remain in parent/recovery views. Student storage failures still show a short stop message. Subject titles and Start appear near the top. Daily Tasks name the actual app lesson and, when present, the exact private school-task title. No school assignment is invented when that record is empty. Math gets an extra input/output worked model; ELA gets a selectable teaching-example clue. Energy, sound-medium, and generator pictures now draw devices, particles, coil, and meter.

The required We Try activity belongs in a separate, stacked PR. This branch deliberately leaves I Show and We Try navigation open until that separate change is reviewed. The coach remains deferred.

## Review aids

- `docs/question-bank-before-repair.json`: frozen pre-repair authored questions, no learner data.
- `docs/teaching-review-matrix.json`: every lesson's narrated teaching, questions, keys, revisions, word counts, and possible vocabulary omissions.
- `node scripts/build-teaching-review.mjs`: regenerates the matrix. All rows retain INDEPENDENT REVIEW REQUIRED status even if vocabulary overlaps.
- `tests/learner-repair.test.mjs`: checks missing concepts, unchanged answer keys, version IDs, sentence-safe narration, honest help reporting, immutable history, and pinned/legacy session questions.

## Browser checks and limits

Screenshots use the production UI in a 768 × 1024 iframe in desktop Chrome. They are iPad-size layout checks, not real iPad/Safari or touch verification. The outer desktop screenshot may show unused space to the right. Separate synthetic identity, database, backup key and test-only runtime configuration were used; none of those overrides are in production files. Delayed-review photos use a synthetic clock to make reviews due. These are not Michael's scores, explanations, or school records.

Captured student templates: Today, four subject lists, Help, teaching steps 1–4, practice, feedback, low-score result, review queue, review question/result, Math interaction, ELA clue selection, and saved-session choice. A low-score synthetic circuit run returned to teaching; a later review preserved the separate access/support record. No cross-device saving or actual voice quality is claimed.

## Reviewer checklist

- Check each question against instruction that actually appears before it, including worked examples. Inspect meaning, not just matching words.
- Recalculate keys and evaluate every revised distractor. Check that earlier answers remain unchanged and a resumed old session retains its original choices.
- Inspect all narrated strings for word breaks, decimals, sentence pauses and excessive repetition. Listen on Michael's actual iPad at each usable speed.
- Confirm each student template has one clear next action and no internal lifecycle codes or third-person labels.
- Confirm generic math practice supports the lesson rather than distracting from it; replace it with a more specific activity wherever needed.
- Confirm every school task shown comes from the private learner record. A blank assignment record must not turn into an invented teacher task.
- Keep formal Science Gap and Track A protocols unchanged.

## Quiet observation with Michael — still required

After independent review, have him try one lesson and its Daily Task with an adult nearby but quiet. Record the page/step, what he does or says, where he stops or rereads, any help actually given, and whether he can explain the next action. Do not fill in a result before observing him. Those observations determine the next usability fixes.
