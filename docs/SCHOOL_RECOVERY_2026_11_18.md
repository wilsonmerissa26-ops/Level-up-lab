# School recovery content update — November 18, 2026

Adds the current Motion & Forces sequence, nine coding lessons for MakeCode and website work, a Daily Tasks / Homework page, eight science topic quizzes, a mixed covered-unit practice test, a coding quiz, and two interactive practice games. Existing Math, ELA, circuits, waves, energy, protected diagnostics, scoring thresholds, storage gates, and prior evidence remain in place.

The homework tracker stores personal titles, links, notes, self-reported viewing, checklist dates, game trials, and assignment status inside the existing learner record. Rendering is read-only. Writes use the existing serialized save/rollback mechanism and runtime gates. A failed save does not clear the visible notes. Self-reported resource use and game teaching record conservative prior-instruction exposure, including related arithmetic skills. Unchecking viewing does not erase exposure history.

Quizzes and the practice test use the existing lesson delivery, read-aloud/access reporting, support reporting, verbatim explanation capture, and score separation. Writing requires adult review. Practice-only quizzes do not schedule another set of formal retention windows or alter canonical mastery state. Delayed lessons keep Day 2/7/21 reviews; prompts already encountered in another lesson or quiz are excluded from fresh retrieval/transfer evidence. New content does not change mastery thresholds.

The course scope is based on reviewed school postings and the visible coding course map. It is not a claim to have the unpublished final exam. Teacher confirmation of remaining scope, required coding modules, recoverable credit, and deadlines is still needed. Current grades were unavailable. No grades, private teacher file links, learner project code, or individual missing-assignment status are included in this public change. Videos are teacher-linked resources; their full transcripts were not audited. Original answer keys are checked against the primary references below and arithmetic/semantic regression cases.

## Instructional safeguards

- Position-time slope is velocity; velocity-time slope is acceleration. Cumulative distance cannot decrease. Negative velocity is not negative speed.
- Acceleration uses elapsed interval length. Negative acceleration is not always deceleration.
- Free-body diagrams include forces on one object. Balanced forces permit constant nonzero velocity. Third-law pairs act on separate objects.
- Weight is mg; impact force also depends on the stopping process. Crater size is not a force measurement in newtons.
- Free-fall comparisons specify negligible air resistance. Normal force is not universally mg.
- Gravity factors use both mass terms and squared center separation under the stated Newtonian assumptions.
- Code examples are escaped as text. No learner code executes in the app. The coding game runs predefined block choices only. User URLs must be HTTPS without embedded credentials.
- School submission remains separate from app completion or self-report. No school quizzes were answered and no student assignments were submitted by the update.

## Primary references reviewed

- OpenStax, Position vs. Time Graphs: https://openstax.org/books/physics/pages/2-3-position-vs-time-graphs
- OpenStax, Representing Acceleration: https://openstax.org/books/physics/pages/3-2-representing-acceleration-with-equations-and-graphs
- OpenStax, Newton’s Second Law: https://openstax.org/books/physics/pages/4-3-newtons-second-law-of-motion
- OpenStax, Universal Gravitation: https://openstax.org/books/university-physics-volume-1/pages/13-1-newtons-law-of-universal-gravitation
- OpenStax, Common Forces: https://openstax.org/books/university-physics-volume-1/pages/5-6-common-forces
- OpenStax, Momentum and Impulse: https://openstax.org/books/physics/pages/8-1-linear-momentum-force-and-impulse
- OpenStax, Electromagnetic Induction: https://openstax.org/books/physics/pages/20-3-electromagnetic-induction
- Microsoft MakeCode, Whack-the-Mole educator guide: https://arcade.makecode.com/skillmap/educator-info/mole-map-info
- Microsoft MakeCode, Info API: https://arcade.makecode.com/reference/info
- MDN, Headings and paragraphs: https://developer.mozilla.org/en-US/docs/Learn_web_development/Core/Structuring_content/Headings_and_paragraphs
- MDN, Lists: https://developer.mozilla.org/en-US/docs/Learn_web_development/Core/Structuring_content/Lists
- MDN, Structuring documents: https://developer.mozilla.org/en-US/docs/Learn_web_development/Core/Structuring_content/Structuring_documents
- MDN, CSS selectors: https://developer.mozilla.org/en-US/docs/Web/CSS/Guides/Selectors

## Verification

`node tests/school-recovery.test.mjs` covers original keys, generated review uniqueness/keys, preserved Math/ELA counts, read-only rendering, escaped notes/URLs, resource exposure, real save/rollback behavior using isolated storage, reload restoration, and game support labels. The full preserved regression suite is also required before publishing. Browser checks use a synthetic learner in an isolated preview database and do not access the real learner’s local record.
