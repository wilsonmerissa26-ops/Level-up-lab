# Second review: author response, not independent approval

These changes remain on draft review branches. Do not merge or deploy before independent review.

## PR 34

- Removed the global distractor substitution map. The review catalog explicitly lists all 239 multiple-choice items. There are 117 changed items compared with the frozen original bank; 109 need new r2 IDs and eight retain an already applicable r1 version. The other 122 multiple-choice items are explicitly retained. The 58 non-multiple-choice items are unchanged. The catalog records an author rationale and requires independent review for every item. It is not a claim that every distractor was replaced or independently validated.
- Each revision is bound to the exact lesson, source ID, prompt, choices, and key. An unknown or edited source item stays unchanged and produces a warning. Changed prompts or options have new IDs. Original r0 questions and the former r1 revisions are preserved as review artifacts. Existing session snapshots and historical evidence are not rewritten.
- Fixed the ambiguous light Doppler alternative to “No shift is observed.” Each distractor change needs semantic review in context, including preserved explanations.
- Removed access/help selectors from student lesson and question markup. Student no-help reports appear only on independent/mixed check questions and delayed reviews, not guided/faded/generalization questions. Reports never certify independence. Built-in audio still records observed SYSTEM_READ_ALOUD without relying on hidden selectors.
- Added separate support notes only in Parent View. Notes require a named, self-attested adult reviewer and an explicit basis. This local app cannot verify identity. The notes are labeled accordingly, append rather than overwrite, and do **not** affect independence or retention counts. Whether later confirmation may affect those counts remains undecided. No Track A rule changes.
- Replaced the generic slider and instruction-marking activity with 22 lesson-specific activities: 12 Math and 10 ELA. Math includes actual tables, graphs, numeric responses, and contextual models. ELA uses original practice passages, clearly distinguished from the assigned book. Attempts, wrong responses, retries, and current response are saved as supported practice, never mastery evidence. Old generic activity records are archived when replaced.
- Explicitly teaches independent and dependent variables in the circuit data lesson. Defines voltage as electric potential difference between two points and energy transferred per unit charge.
- Removed invented duration estimates. Corrected the Today review/help spacing and coding task wording.
- Refreshed the 70-lesson / 297-question teaching matrix, including activity narration. A keyword matrix is a review aid and cannot verify teaching completeness or correctness by itself.

## Developer verification

All 40 `tests/*.test.mjs` files pass on the revised core branch. The new checks cover exact catalog/source agreement, version separation, unchanged answer keys, rejection of future unreviewed rewrites, unique lesson activities, numeric oracles, wrong/correct responses, persistence and failed-write rollback, student markup, audio provenance, and uncounted append-only support notes. Existing Track A tests pass.

Browser checks used a separate synthetic database and learner ID in an untracked preview copy. No real student record was used. At a 768 × 1024 iframe size, checked Today, Science, Math, ELA, Coding, Help, domain/range wrong-answer feedback and retry, reloading/resuming that activity with its saved response, reading aloud status, ELA reciprocity with an original passage, a guided question with zero support selectors or no-help checkbox, and a separate Parent View support note. Screenshots show the preview frame inside the larger browser viewport; they are not from a physical iPad.

Not verified: actual sound/voice quality, physical iPad/Safari/touch, cross-device saving, every lesson by hand, real-world usability with Michael, or independent content approval. A test fixture initially used a different learner ID without updating its validator; that fixture was corrected before recovery was checked. Production identity rules were unchanged.

The student-facing navigation is presentation separation, not authenticated access control. Parent View notes therefore explicitly say that reviewer identity is unverified.

## Definition sources

Author checked the two corrected definitions against these primary educational sources:

- [OpenStax: Electric Potential and Potential Difference](https://openstax.org/books/university-physics-volume-2/pages/7-2-electric-potential-and-potential-difference)
- [University of Hawai‘i: Practices of Science — Variables](https://manoa.hawaii.edu/exploringourfluidearth/physical/coastal-interactions/wave-coast-interactions/practices-science-variables)

## Screenshots

- [Today](round2-today.jpg)
- [Science](round2-science-home.jpg)
- [Math](round2-math-home.jpg)
- [Domain/range activity](round2-math-activity.jpg)
- [ELA](round2-ela-home.jpg)
- [Reciprocity activity and hint](round2-ela-activity.jpg)
- [Guided question](round2-guided-question.jpg)
- [Coding](round2-coding-home.jpg)
- [Help](round2-help.jpg)
- [Parent support note](round2-parent-note.jpg)

Independent re-review should check question-by-question teaching coverage, distractor ambiguity, narration, legacy r0/r1 session resume, activity relevance, and a full lesson on each branch. Then observe Michael doing one lesson and its daily task with an adult nearby staying quiet. The coach remains deferred.
