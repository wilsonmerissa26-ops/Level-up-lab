# Math and ELA school learning update

This extends the existing Level-Up app with original Track B teaching for the reviewed current Math and ELA units. It does not create a second app, change the learner record schema, submit schoolwork, or introduce formal diagnostic evidence.

## Reviewed scope

- Math: the current three lesson directions covering slope-intercept form from graphs/tables, graphing from context, and domain/range in context; earlier class topic listings provide prerequisite context. External activity answers and every historical attachment were not audited.
- ELA: the Odysseus knowledge organizer and the first three student packets, covering the Prologue/The Sacker of Cities, The Cyclops, and The Lord of the Winds. The latest relevant teacher newsletter confirms the novel study and active reading. Private newsletter text, school account URLs, personal grades, and completed student responses are not included in this update.
- The ELA packet page ranges refer to the assigned novel reading, and the UI tells the learner to check the assigned edition and current directions. No new assessment deadline was confirmed or invented.

## Teaching

Ten Math lessons cover functions, domain/range, linear versus proportional relationships, slope, intercepts, writing equations, graphing, contextual models, contextual domain/range, and qualitative graph review. The two existing algebra bridge IDs and their prerequisite relationship are preserved.

Ten ELA lessons cover epic/oral/adaptation context, the nine current packet vocabulary words in three groups, annotation/inference, word choice/tone/mood, character strengths and hamartia/hubris, xenia and comparison, sentence connections, and evidence-based paragraphs/discussion. The short practice scenes are original. The app does not reproduce the copyrighted novel or teacher packets, supply invented quotations, or automatically judge open literary interpretation. Application prompts require the learner to return to the assigned text and use accurate details and locations.

ELA lesson metadata uses the Language, Texts, and Practices domains. This is targeted school support, not a claim of complete Grade 8 standards coverage or a substitute for the existing formal diagnostic architecture. Official framework references consulted:

- [Georgia Department of Education: Grade 8 ELA Practices domain](https://case.georgiastandards.org/391c3abe-c1ec-4a4a-a942-c9e152b35102/7dff8c28-47c4-4d95-8205-bc1cb495cc53)
- [Georgia Department of Education: linear function and domain expectations](https://case.georgiastandards.org/e9dd7229-3558-4df2-85c6-57b8938f6180/f66dc304-fe41-4dd6-bddd-2b4c37063086)

Each lesson uses four saved teaching blocks, a worked model, guided practice, faded support, independent and mixed checks, and an open application response. The slope diagram is an exact SVG graph with labeled axes and scale. Immediate multiple-choice positions rotate so the answer is not always in the first slot.

## Evidence and preservation

- All three subjects share the existing lesson runner, crash/resume path, access and assistance dimensions, write-failure gates, and backup requirements.
- Open responses are saved verbatim with a review rubric and `isCorrect: null`. They remain excluded from automatic scores and appear in Parent View for adult review.
- New lessons use the existing Day 2, Day 7, and Day 21 review queue. Review prompts differ across windows; Day 21 includes transfer. Numerical review values are generated deterministically so an interrupted review reconstructs exactly.
- Track B remains `INFORMAL_TRACK_B` and `PRIOR_INSTRUCTION`; it does not write canonical mastery. Mapped algebra instruction also marks the relevant existing controlled-math skill as prior instruction once teaching is delivered, even before an answer is entered.
- Existing Science lesson IDs, evidence, previous ELA School Quest/game content, and learner records remain intact. Old hardcoded dashboard grades were replaced with current topic labels rather than presented as current school results.
- Direct Math and ELA navigation is added to the existing app. The build query version updates together across assets.

## Validation

All 35 test files pass. The new regression executes production rendering, teaching transitions, explicit resume, failed-save rollback, independent response logging, open writing, lesson completion, delayed-review start/answer, and Parent View with an isolated synthetic save adapter. It verifies that earlier evidence and completed Science progress survive, Math/ELA retain their own subjects, and formal mastery is untouched. Generated calculations are checked across 72 window/parameter combinations. Every new lesson has a distinct immediate check and distinct review prompts across all three windows.

Browser QA inspected the production-rendered Math plan, exact slope diagram, ELA plan, and ELA teaching block in read-only synthetic fixtures. No live learner record was created or modified for QA. All app runtime and storage gates remain active.
