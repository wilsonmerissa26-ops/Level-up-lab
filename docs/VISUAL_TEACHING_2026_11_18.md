# Visual teaching and page narration — November 18, 2026

The old circuit lesson consisted primarily of four text blocks with a diagram on one screen. The new visual workshop gives all 39 existing science lessons and nine existing coding lessons a picture or runnable HTML/CSS preview on every teaching screen, defined terms, a four-step worked example revealed one step at a time, supported model exploration, and a new application before the existing checks.

A persistent Read this page toolbar provides Pause, Resume, and Stop throughout the app, including first-run and storage-recovery screens. Science narration includes the terms, visible worked steps, diagram description, current calculated outcome, and explanation. It uses the browser's speech synthesis, not microphone recording. Audio access is recorded per visual teaching page and through the existing question-access adapters. Silent Science Gap checks have Read instructions instead: their questions and choices are not read aloud under a silent-reading protocol.

## Models and limits

- Circuit connection drawing has distinct positive/negative source terminals, an actual open switch or missing return-wire gap, and two separate bridges across the same rails in parallel; no wire shorts the rails at the far end. An ohmic lamp model shows on/off, not a calibrated brightness. Series and parallel calculations use ideal fixed-voltage sources and resistor assumptions.
- Motion graphs use signed position/velocity and labeled time/units; velocity-time slope is acceleration. Distance is total route length, displacement is final minus initial position.
- Force diagrams refer to one object. Vertical forces balance on the level surface; net horizontal force divided by mass gives acceleration. Free-fall diagrams compare 2 kg and 4 kg masses without air resistance, using the same g. Impact force is not inferred from weight.
- Gravity uses G = 6.6743 × 10⁻¹¹ N m²/kg², center separation, and equal opposite forces. Arrows are schematic.
- Mechanical energy bars sum to 98 J at each stage, including the optional illustrative thermal fraction. Calorimetry uses a specified model material, consistent gram units, signed temperature change, constant specific heat, and no phase change.
- Wave snapshots are schematic. Frequency and wavelength vary inversely at a chosen fixed speed; relative amplitude is separate. Refraction angles are from the normal. Destructive interference does not destroy energy. Seismic arrival times are invented practice values. Doppler pictures use wavefronts centered on earlier emission positions.
- Coding includes an original score-event simulator, a 64-pixel image editor, and editable HTML/CSS previews. Previews are sandboxed without script permissions and include a restrictive CSP. Two original demo SVGs are embedded locally; they are not school project assets. Real school projects and submissions remain in the school's tools.

Primary references for the checked relationships and teaching definitions:

- https://openstax.org/books/physics/pages/19-1-ohms-law
- https://openstax.org/books/physics/pages/19-2-series-circuits
- https://openstax.org/books/physics/pages/19-3-parallel-circuits
- https://openstax.org/books/physics/pages/13-2-wave-properties-speed-amplitude-frequency-and-period
- https://openstax.org/books/physics/pages/11-2-heat-specific-heat-and-heat-transfer
- https://openstax.org/books/university-physics-volume-1/pages/13-1-newtons-law-of-universal-gravitation
- https://arcade.makecode.com/reference/info
- https://developer.mozilla.org/en-US/docs/Learn_web_development/Core/Structuring_content/Basic_HTML_syntax
- https://developer.mozilla.org/en-US/docs/Web/HTML/Element/iframe

## Persistence and evidence

Model values, revealed steps, code drafts, and the last 100 teaching actions are kept in the existing active session and session history. A model change is saved before rerendering. Failed primary writes preserve the durable model and do not report success. These interactions are practice, not grades or mastery decisions. Existing prerequisites, immediate question banks, review schedule, formal diagnostic gates, and mastery thresholds are unchanged. Older compact science teaching is presented in four stages; beginning that instruction conservatively marks exposure.

Validation covers all 48 lessons and four teaching screens, independent numeric expectations for circuit/force/gravity/heat/wave/energy results, event debugging, HTML escaping and sandbox configuration, saved model resume and failure recovery, per-page read-aloud access, all standalone recovery screens, and silent-diagnostic instructions. Browser QA uses a separate synthetic identity, database, backup key, and test-only runtime configuration, never the production learner record. Production assets do not contain those test overrides.
