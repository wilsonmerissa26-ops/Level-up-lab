# Patch O.2.4 — Reusable Challenge Game Layer

## Purpose

Use Michael's urgent Language Arts School Quest as the reference implementation for a reusable Level-Up game layer that can later be themed for other learners without copying Michael's school content or learner history.

## Separation of concerns

`quest-engine.js` owns reusable game mechanics:

- XP and levels
- coins and moon gems
- temporary hearts and automatic respawn
- sequential world locks
- completion badges
- pending treasure chests and chest rewards
- boss-health calculation
- migration of older game progress into the current game-state shape

`school-plan.js` owns Michael's current School Quest content and theme:

- Story Safari
- Grammar Zoo
- Dragon Obby
- Review Boss Battle / arena presentation
- Final Moon Boss / Moon Gate presentation
- Michael's animal teammate choices
- teacher-file Language Arts study content

Future learners can reuse the mechanics while supplying different world names, companions, rewards, colors, and learning content.

## Evidence boundary

Game state is motivation/practice state, not formal diagnostic state.

- XP, coins, gems, hearts, badges, chests, streaks, and game completion do not create formal diagnostic evidence.
- The urgent Language Arts quest remains in the School Success / Track B support lane.
- Teacher-source content stays unchanged underneath the game presentation.
- Open-response teacher questions are not falsely auto-graded when no official answer key is present.

## Michael reference game

The O.2.4 Michael experience includes:

1. a spawn/home hub with a persistent game HUD,
2. a locked world map,
3. block-style answer platforms,
4. temporary-heart misses with non-punitive respawn,
5. Dragon obby checkpoints,
6. a boss arena with health tied to completed review prompts,
7. world badges and treasure chests,
8. a Final Moon Gate no-notes check,
9. a plain study-guide escape hatch.

## Compatibility

Existing O.2.3 School Quest progress is migrated rather than reset. Existing XP, streak, companion choice, answered items, and completed worlds are retained. New currency, hearts, badges, and chest fields receive safe defaults.

## Reuse rule

Michael remains the reference implementation, not a template whose learner content is copied. A future learner should receive:

- the shared quest engine,
- a clean game-state record,
- learner-specific content/theme configuration,
- no Michael answers, progress, badges, school data, or evidence history.
