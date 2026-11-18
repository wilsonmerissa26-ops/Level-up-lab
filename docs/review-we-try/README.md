# PR 35: We Try requirements — second author response

Draft, stacked on the revised PR 34 branch. Independent review is still required. Nothing is approved for merge or deployment.

## Required behavior

Only the We Try teaching screen (step 3 of 4) has a practice requirement. I Show is free to move through. Low scores recommend reteaching and leave the next lesson open. No Track A thresholds, scoring rules, retention policy, or mastery rules changed.

- Science/coding model requirements retain the separately reviewed PR 35 behavior. Circuit practice requires the closed switch, connected return wire, copper as conductor, and rubber as insulator.
- Math/ELA requirements now use PR 34's matching activity definition and its saved response. The activity ID must match this lesson's current activity version. Readiness is recomputed from that response; a saved `correct` flag alone is not trusted.
- Wrong answers keep Continue disabled, show a hint, and allow retry. A matching correct response enables Continue. This is completion of supported practice, not evidence of independent understanding or mastery.
- Old generic slider movements, sentence taps, or `interactionObserved` flags cannot satisfy these activities. Those old records are preserved/archived; the new response is recorded separately.
- Lessons without a defined supported activity receive no invented generic requirement.
- “Rubber is a…” now works grammatically with either displayed choice.

## Developer verification

All 41 `tests/*.test.mjs` files pass. Progression checks cover every supported science/coding family, all staged Math/ELA lessons, wrong responses, stale generic activities, mismatched activity IDs, recomputation rather than trusting correctness flags, saved responses after reload, backend skip rejection, free I Show navigation, unchanged low-score eligibility, and no mastery evidence from model participation. Existing core and Track A tests pass.

In the isolated synthetic browser preview at a 768 × 1024 iframe size:

- Math slope: Continue disabled initially and after +2; enabled after −2.
- ELA reciprocity: Continue disabled initially and after the location-based choice; enabled after identifying help in both directions.
- Circuit: Continue stayed disabled with one gap fixed, and with a lit lamp but unsorted materials. It enabled only after both gaps and both material roles were correct.
- Ran the circuit lesson through all four questions. A deliberate 1/3 score displayed reteaching first. “Go back over this” reopened the teaching. The next circuits lesson remained available.

No real learner record was used. Actual voice sound, physical iPad/Safari/touch, cross-device saving, every lesson by hand, and independent content validation remain unverified. Parent support notes remain separate and unapplied to independence/retention counts pending a policy decision.

## Screenshots

- [Math requirement completed](screenshots/round2-slope-required.jpg)
- [ELA requirement completed](screenshots/round2-ela-required.jpg)
- [Circuit before completion](screenshots/round2-circuit-required.jpg)
- [Circuit complete](screenshots/round2-circuit-complete.jpg)
- [Low-score reteaching](screenshots/round2-reteach.jpg)

Review PR 34 first, then review only PR 35's additional progression behavior. Keep both drafts until that review is complete. A quiet usability try with Michael remains necessary afterward; automated checks do not replace it.
