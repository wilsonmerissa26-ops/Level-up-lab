# Instructional and assessment integrity audit: October 21, 2026

Scope: every lesson, fixed question, generated question family, answer key, scoring rule, diagram, review window, game, and evidence label reachable in the app at commit `9812d2e`. School documents were not used. No teacher requirement is claimed as verified.

## Corrected errors

Factual and diagram errors
- The circuits "parallel" diagram was a single series loop (one wire path, both resistors on it). It is now a two-branch ladder: the battery feeds two rails, each resistor bridges the rails on its own branch, and the rails are not joined at the far end. A topology test proves removing either resistor leaves a path and removing both leaves none.
- Science Gap `SGD.ENERGY.1` taught that a flashlight turns energy "mostly" into light. Much of it becomes thermal energy; light is the useful output.

Scoring errors
- `SGD.FIELDS.1` simplified probe was scored with the cold-item key: "Gravity" scored wrong and "Friction" scored right, as FORMAL_CONTROLLED evidence. Each phase now has its own key, and scoring compares the selected text.
- Track A `INEQ.NEGATIVE.FLIP` showed two identical correct options when the boundary was 0 (285 of 72,000 generated items); the second copy was scored wrong. The generator no longer duplicates, and `checkAnswer` scores identical text identically.
- Track A numeric answers typed with a typographic minus sign were rejected.
- Track B numeric matching took the first number in a response: `6/3` was wrong for 2, shown work was wrong, and a typographic `−2` was accepted for `+2`. It now reads the final value, equivalent fractions, and minus signs, and does not guess when a response contains several unrelated numbers.
- Math Graph review asked "Which point is on the y-axis?" with two correct options. It now asks where the line crosses the y-axis.

Evidence and labeling errors
- Track B "Numeric Inverse Operations" teaches the same three equation forms as the Track A One-Step diagnostic but did not mark that skill PRIOR_INSTRUCTION. Mappings were added for Inverse Operations, Ohm rearrangement, Delta-T, and the Math lessons that teach signed arithmetic or two-step solving.
- Circuits Motor and Mixed lessons teach battery to light and heat transformation but did not exclude `SGD.ENERGY.1` from the cold set (target ID mismatch).
- Science Gap transfer responses came after teaching but were saved `prior_instruction:false`. New gap evidence records `cold_scope: NO_RECORDED_LEVEL_UP_INSTRUCTION` and `school_instruction_status: NOT_RECORDED`, because classroom instruction is not tracked.
- Track A freshness checked only Track A prompts, so a prompt practiced in a repair session (answer shown) could return as a "fresh" formal probe. Freshness and exclusion now include every prompt seen for that skill.
- The fourth immediate check in Math and ELA lessons was labeled MIX_OLD_AND_NEW but tested the same lesson. It is labeled INDEPENDENT_CHECK.

Repeated items and transfer
- Waves served the same three review items on Day 2, Day 7, and Day 21, all flagged transfer. Day 7 and Day 21 now have their own items; only the Day 21 new-context item is transfer.
- All 30 Math review slots reused one template per lesson across windows (ten word-for-word). Each window now has different templates; Day 21 has one new-context transfer item.
- Energy, specific-heat, and Math-bridge reviews repeated fixed items across windows and labeled the third Day 21 item transfer by position. Each window now has different items or number ranges, and transfer comes only from items written as new contexts.
- Transfer is never assigned by position anywhere in the review engine.

Guessability
- Generated circuit reviews always offered the answer, double, and half, so the key was the middle value in 112 of 112 items. Distractors now come from named misconceptions and the key's rank varies.
- Day 2 Ohm reviews all had the answer 0.20 A. They now differ.
- Circuit, Waves, energy, and Math-bridge immediate choices are rotated (Math and ELA already were).
- ELA keys were the uniquely longest option in 88 of 130 items. Distractors were rewritten as plausible misreadings; key length is now longest in 45, middle in 48, shortest in 37.
- Duplicate options that collapsed some generated Math items to two choices were removed.

## Review and game evidence rules (no new thresholds)

- A delayed-review item whose exact prompt Michael already saw for that skill is recorded `previously_seen: true`, `evidence_role: PRACTICE`, and can never count as transfer.
- Assisted review answers are practice evidence.
- Memory strength uses the existing thresholds, counting a correct answer only when the item was new and answered independently. When nothing in a review was new independent evidence, memory strength is unchanged.
- Lesson completion reports independent items separately. The blended lesson score and its progress label are unchanged pending a decision.
- School Quest results mark a question met in an earlier session as a replay and exclude it from first-try counts.
- The PSAT bridge no longer re-serves the item just missed; attempts after both items are seen are labeled replay practice.
- Games write only study sessions and exposure records. No game, Track B lesson, or review writes a Track A lifecycle state.

## Historical evidence

`evidence-integrity.js` reviews the saved learner record without changing it and lists affected records with their corrected reading in Parent View. No Track A lifecycle state was changed; any change based on flagged records needs an adult decision.

## Tests

`tests/instructional-integrity.test.mjs` checks keys against independently computed answers, exhaustive Track A and Math parameter sweeps, diagram topology, review repetition and transfer rules, the production review flow (fresh, replayed, hinted, and incorrect answers), Track A freshness after repair practice, a guessing simulation over the real Track A gates, integrity flags on a synthetic historical record, quest replay labeling, and PSAT rotation. Four existing assertions that encoded the corrected defects were updated in place with comments.

## Not changed (needs approval)

- Track A Distributive and Combine Like Terms use four-option multiple choice at every gate, including transfer. In simulation, about 2% of random guessers reach MASTERED when allowed ten retries per stage. Options: a free-response or explanation component at the transfer gate, or a retry rule. Both are protocol changes.
- Track B lesson progress (CHECK_STRONG and related) still uses the blended guided plus independent score.
- The expired Sept. 29 Language Arts quest keeps fixed option positions on replay; its replays are now labeled.
- ELA lessons do not check comprehension of the assigned chapters' events; that would require verified source content.
