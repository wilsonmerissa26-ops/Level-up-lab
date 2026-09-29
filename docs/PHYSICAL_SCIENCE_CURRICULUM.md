# Full Grade 8 Physical Science Curriculum Foundation

## Purpose

This curriculum is Michael's permanent Physical Science teaching spine. It is separate from School Quest test-prep packs and separate from formal Track A diagnostic evidence.

The curriculum preserves Michael's existing Energy/Heat Track B work and maps that history forward. Existing instruction is never relabeled as a cold baseline.

## Standards spine

Georgia Grade 8 Physical Science uses five standards families:

- S8P1 - Matter, atoms, particle models, properties/changes, periodic patterns, conservation of matter
- S8P2 - Conservation of energy, kinetic/potential patterns, transformations, heat transfer
- S8P3 - Force, mass, motion, motion data/graphs, Newton's Laws, inertia
- S8P4 - Mechanical vs electromagnetic waves, EM spectrum, wave behavior, media, wave properties, lenses
- S8P5 - Gravitational/electric/magnetic fields, charge distribution, force-strength factors, electromagnets

The runtime source of truth is `science-curriculum.js`. All 23 Grade 8 standard elements are represented by one or more teachable targets.

## Locked teaching cycle

Every curriculum target must support:

`TEACH → MODEL → GUIDED_PRACTICE → HELP → FADE_HELP → INDEPENDENT_CHECK → MIX_OLD_AND_NEW → RECHECK_LATER → GENERALIZE`

No target is considered fully taught merely because a learner matched a vocabulary definition.

## Science performance dimensions

Science performance is split across measurable modes rather than a single subject score:

- VOCABULARY
- CONCEPT
- MODEL
- DATA_GRAPH
- INVESTIGATION
- EXPLANATION
- ARGUMENT_FROM_EVIDENCE
- CALCULATION_APPLICATION

A learner can therefore show, for example, strong concept knowledge but weak graph interpretation without those results being collapsed into one label.

## Existing Michael science work

The current 11 science lessons are retained. Their legacy IDs remain valid so no learner evidence is orphaned.

Core-aligned examples:

- Energy Forms / Transfer vs Transformation → S8P2 energy system targets
- Mechanical Energy → S8P2 kinetic/potential targets
- Heat Transfer → S8P2 conduction/convection/radiation targets
- Particle Motion → S8P1 particle-motion targets

School-specific extensions are kept as extensions rather than forced into a Grade 8 standard:

- specific heat concept
- Q, m, c and ΔT
- ΔT calculation
- Q = mcΔT setup
- formula rearrangement
- specific-heat calculations

## Scope boundaries

The curriculum intentionally avoids silently adding higher-level content to the Georgia Grade 8 core.

- S8P3.a requires motion-data/graph interpretation. Velocity and acceleration calculations are not required as Grade 8 core unless Michael's teacher separately teaches them.
- S8P4.d includes reflection, refraction, absorption, diffraction and transmission. Interference and scattering are not treated as Grade 8 core targets.
- S8P5 core is fields, charge distribution, and factors affecting electric/magnetic force strength. Circuit voltage/current/resistance content must be marked as a school-specific extension if teacher materials require it.

## Relationship to School Quest

Permanent Curriculum:
- teaches concepts from the ground up
- records instruction exposure
- fades help
- checks independently
- schedules delayed retrieval
- generalizes to new contexts

School Quest:
- prepares for a specific teacher quiz/test
- may reuse curriculum targets
- remains study/support analytics, not formal diagnostic evidence

## Relationship to Track A

The full science curriculum does not itself create a clean cold baseline.

Future Science Track A must:
- read PRIOR_INSTRUCTION history
- generate fresh controlled probes
- keep assistance/access conditions separate
- treat prior instruction as prior instruction
- require delayed retrieval and transfer before mastery

## Next science build

1. Write complete teaching content for Matter (S8P1)
2. Upgrade existing Energy/Heat lessons to the full teaching cycle
3. Build Force/Motion teaching content
4. Build Waves teaching content
5. Build Gravity/Electricity/Magnetism teaching content
6. Add mixed cumulative review across units
7. Add adaptive Science Track A diagnostic and prerequisite tracing
8. Add curriculum-level Parent View progress by performance dimension

No existing Michael evidence should be reset during these additions.
