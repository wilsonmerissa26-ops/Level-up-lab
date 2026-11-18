// Question-specific, snapshot-bound author revisions. See content-reviews/question-catalog-r2.json.
window.LEVEL_UP_QUESTION_REVISIONS={
  "sourceCommit": "546168f35ab49dbc9d59f121351ce4e1b090c37f",
  "status": "AUTHOR_REVIEW_ONLY_INDEPENDENT_REVIEW_REQUIRED",
  "items": [
    {
      "lessonId": "SCI.MOTION.DISTANCE",
      "sourceId": "DISTANCE-0",
      "expectedPrompt": "A toy travels 18 m in 6 s. Use speed = distance / time. Find average speed.",
      "expectedChoices": [
        "108 m/s",
        "12 m/s",
        "3 m/s"
      ],
      "expectedAnswer": 2,
      "prompt": "A toy travels 18 m in 6 s. Use speed = distance / time. Find average speed.",
      "choices": [
        "0.33 m/s",
        "12 m/s",
        "3 m/s"
      ],
      "id": "DISTANCE-0.v20261118r1",
      "supersedesIds": [
        "DISTANCE-0",
        "DISTANCE-0.v20261118r1"
      ],
      "authorDisposition": "REWRITE",
      "rationale": "Reversed ratio and subtraction instead of division.",
      "independentReview": "REQUIRED"
    },
    {
      "lessonId": "SCI.MOTION.DISTANCE",
      "sourceId": "DISTANCE-1",
      "expectedPrompt": "A walker goes 7 m east, then 7 m west. What is displacement?",
      "expectedChoices": [
        "7 m west",
        "0 m",
        "14 m east"
      ],
      "expectedAnswer": 1,
      "prompt": "A walker goes 7 m east, then 7 m west. What is displacement?",
      "choices": [
        "7 m west",
        "0 m",
        "14 m east"
      ],
      "id": "DISTANCE-1",
      "supersedesIds": [],
      "authorDisposition": "RETAIN",
      "rationale": "Retain the displayed alternatives: they test related concepts, symbolic roles, common calculation errors, or word forms. Independent reviewer should inspect the exact options.",
      "independentReview": "REQUIRED"
    },
    {
      "lessonId": "SCI.MOTION.DISTANCE",
      "sourceId": "DISTANCE-2",
      "expectedPrompt": "A runner covers 36 m in 9 s. What is average speed?",
      "expectedChoices": [
        "4 m/s",
        "27 m/s",
        "324 m/s"
      ],
      "expectedAnswer": 0,
      "prompt": "A runner covers 36 m in 9 s. What is average speed?",
      "choices": [
        "4 m/s",
        "27 m/s",
        "0.25 m/s"
      ],
      "id": "DISTANCE-2.v20261118r2",
      "supersedesIds": [
        "DISTANCE-2"
      ],
      "authorDisposition": "REWRITE",
      "rationale": "Subtraction and reversed distance/time ratio.",
      "independentReview": "REQUIRED"
    },
    {
      "lessonId": "SCI.MOTION.DISTANCE",
      "sourceId": "DISTANCE-3",
      "expectedPrompt": "A cart moves 15 m west in 3 s. What is average velocity?",
      "expectedChoices": [
        "5 m/s with no direction",
        "45 m/s west",
        "5 m/s west"
      ],
      "expectedAnswer": 2,
      "prompt": "A cart moves 15 m west in 3 s. What is average velocity?",
      "choices": [
        "5 m/s with no direction",
        "0.20 m/s west",
        "5 m/s west"
      ],
      "id": "DISTANCE-3.v20261118r2",
      "supersedesIds": [
        "DISTANCE-3"
      ],
      "authorDisposition": "REWRITE",
      "rationale": "Missing vector direction and reversed ratio.",
      "independentReview": "REQUIRED"
    },
    {
      "lessonId": "SCI.MOTION.ACCELERATION",
      "sourceId": "ACCELERATION-0",
      "expectedPrompt": "Velocity changes from 0 to +12 m/s in 4 s. Use change in velocity / time.",
      "expectedChoices": [
        "+8 m/s²",
        "+3 m/s²",
        "+48 m/s²"
      ],
      "expectedAnswer": 1,
      "prompt": "Velocity changes from 0 to +12 m/s in 4 s. Use change in velocity / time.",
      "choices": [
        "+12 m/s²",
        "+3 m/s²",
        "+0.33 m/s²"
      ],
      "id": "ACCELERATION-0.v20261118r2",
      "supersedesIds": [
        "ACCELERATION-0"
      ],
      "authorDisposition": "REWRITE",
      "rationale": "Uses velocity change alone or reverses change/time.",
      "independentReview": "REQUIRED"
    },
    {
      "lessonId": "SCI.MOTION.ACCELERATION",
      "sourceId": "ACCELERATION-1",
      "expectedPrompt": "Velocity changes from +8 to +2 m/s in 2 s. Find acceleration.",
      "expectedChoices": [
        "−3 m/s²",
        "+3 m/s²",
        "+5 m/s²"
      ],
      "expectedAnswer": 0,
      "prompt": "Velocity changes from +8 to +2 m/s in 2 s. Find acceleration.",
      "choices": [
        "−3 m/s²",
        "+3 m/s²",
        "+5 m/s²"
      ],
      "id": "ACCELERATION-1",
      "supersedesIds": [],
      "authorDisposition": "RETAIN",
      "rationale": "Retain the displayed alternatives: they test related concepts, symbolic roles, common calculation errors, or word forms. Independent reviewer should inspect the exact options.",
      "independentReview": "REQUIRED"
    },
    {
      "lessonId": "SCI.MOTION.ACCELERATION",
      "sourceId": "ACCELERATION-2",
      "expectedPrompt": "Velocity is +3 m/s at 5 s and +15 m/s at 9 s. Find average acceleration.",
      "expectedChoices": [
        "+1.33 m/s²",
        "+12 m/s²",
        "+3 m/s²"
      ],
      "expectedAnswer": 2,
      "prompt": "Velocity is +3 m/s at 5 s and +15 m/s at 9 s. Find average acceleration.",
      "choices": [
        "+1.33 m/s²",
        "+12 m/s²",
        "+3 m/s²"
      ],
      "id": "ACCELERATION-2",
      "supersedesIds": [],
      "authorDisposition": "RETAIN",
      "rationale": "Retain the displayed alternatives: they test related concepts, symbolic roles, common calculation errors, or word forms. Independent reviewer should inspect the exact options.",
      "independentReview": "REQUIRED"
    },
    {
      "lessonId": "SCI.MOTION.ACCELERATION",
      "sourceId": "ACCELERATION-3",
      "expectedPrompt": "Velocity is negative and acceleration is negative. What happens to speed?",
      "expectedChoices": [
        "It must stay zero",
        "It increases",
        "It must decrease"
      ],
      "expectedAnswer": 1,
      "prompt": "Velocity is negative and acceleration is negative. What happens to speed?",
      "choices": [
        "It remains constant because the signs match",
        "It increases",
        "It must decrease"
      ],
      "id": "ACCELERATION-3.v20261118r2",
      "supersedesIds": [
        "ACCELERATION-3"
      ],
      "authorDisposition": "REWRITE",
      "rationale": "Confuses matching signs with constant speed or assumes negative acceleration always slows motion.",
      "independentReview": "REQUIRED"
    },
    {
      "lessonId": "SCI.MOTION.POSITION_GRAPH",
      "sourceId": "POSITION_GRAPH-0",
      "expectedPrompt": "A position-time line passes through (0 s, 0 m) and (4 s, 8 m). Use rise/run. Find velocity.",
      "expectedChoices": [
        "+8 m/s",
        "+32 m/s",
        "+2 m/s"
      ],
      "expectedAnswer": 2,
      "prompt": "A position-time line passes through (0 s, 0 m) and (4 s, 8 m). Use rise/run. Find velocity.",
      "choices": [
        "+8 m/s",
        "+0.5 m/s",
        "+2 m/s"
      ],
      "id": "POSITION_GRAPH-0.v20261118r2",
      "supersedesIds": [
        "POSITION_GRAPH-0"
      ],
      "authorDisposition": "REWRITE",
      "rationale": "Uses graph height or reverses rise/run.",
      "independentReview": "REQUIRED"
    },
    {
      "lessonId": "SCI.MOTION.POSITION_GRAPH",
      "sourceId": "POSITION_GRAPH-1",
      "expectedPrompt": "A straight-route position-time segment is horizontal. What does it show?",
      "expectedChoices": [
        "A downhill road",
        "Stopped",
        "Constant positive acceleration"
      ],
      "expectedAnswer": 1,
      "prompt": "A straight-route position-time segment is horizontal. What does it show?",
      "choices": [
        "Moving at a constant positive velocity",
        "Stopped",
        "Constant positive acceleration"
      ],
      "id": "POSITION_GRAPH-1.v20261118r2",
      "supersedesIds": [
        "POSITION_GRAPH-1"
      ],
      "authorDisposition": "REWRITE",
      "rationale": "Confuses position-time with velocity-time and acceleration-time graph meanings.",
      "independentReview": "REQUIRED"
    },
    {
      "lessonId": "SCI.MOTION.POSITION_GRAPH",
      "sourceId": "POSITION_GRAPH-2",
      "expectedPrompt": "Position changes from +18 m at 2 s to +6 m at 6 s along a straight line. Find velocity.",
      "expectedChoices": [
        "−3 m/s",
        "+3 m/s",
        "−12 m/s"
      ],
      "expectedAnswer": 0,
      "prompt": "Position changes from +18 m at 2 s to +6 m at 6 s along a straight line. Find velocity.",
      "choices": [
        "−3 m/s",
        "+3 m/s",
        "−12 m/s"
      ],
      "id": "POSITION_GRAPH-2",
      "supersedesIds": [],
      "authorDisposition": "RETAIN",
      "rationale": "Retain the displayed alternatives: they test related concepts, symbolic roles, common calculation errors, or word forms. Independent reviewer should inspect the exact options.",
      "independentReview": "REQUIRED"
    },
    {
      "lessonId": "SCI.MOTION.POSITION_GRAPH",
      "sourceId": "POSITION_GRAPH-3",
      "expectedPrompt": "Which vertical-axis quantity cannot decrease as a trip continues?",
      "expectedChoices": [
        "Position on a straight route",
        "Distance from home",
        "Cumulative distance traveled"
      ],
      "expectedAnswer": 2,
      "prompt": "Which vertical-axis quantity cannot decrease as a trip continues?",
      "choices": [
        "Position on a straight route",
        "Distance from home",
        "Cumulative distance traveled"
      ],
      "id": "POSITION_GRAPH-3",
      "supersedesIds": [],
      "authorDisposition": "RETAIN",
      "rationale": "Retain the displayed alternatives: they test related concepts, symbolic roles, common calculation errors, or word forms. Independent reviewer should inspect the exact options.",
      "independentReview": "REQUIRED"
    },
    {
      "lessonId": "SCI.MOTION.VELOCITY_GRAPH",
      "sourceId": "VELOCITY_GRAPH-0",
      "expectedPrompt": "A velocity-time line rises from 0 to +8 m/s over 4 s. Its slope is…",
      "expectedChoices": [
        "+8 m/s",
        "+32 m",
        "+2 m/s²"
      ],
      "expectedAnswer": 2,
      "prompt": "A velocity-time line rises from 0 to +8 m/s over 4 s. Its slope is…",
      "choices": [
        "+8 m/s²",
        "+0.5 m/s²",
        "+2 m/s²"
      ],
      "id": "VELOCITY_GRAPH-0.v20261118r2",
      "supersedesIds": [
        "VELOCITY_GRAPH-0"
      ],
      "authorDisposition": "REWRITE",
      "rationale": "Graph height versus slope; inverse slope. Units no longer give away the key.",
      "independentReview": "REQUIRED"
    },
    {
      "lessonId": "SCI.MOTION.VELOCITY_GRAPH",
      "sourceId": "VELOCITY_GRAPH-1",
      "expectedPrompt": "Velocity-time is horizontal at +5 m/s. Which statement fits?",
      "expectedChoices": [
        "Acceleration is +5 m/s²",
        "Constant velocity, zero acceleration",
        "Stopped at 5 m"
      ],
      "expectedAnswer": 1,
      "prompt": "Velocity-time is horizontal at +5 m/s. Which statement fits?",
      "choices": [
        "Acceleration is +5 m/s²",
        "Constant velocity, zero acceleration",
        "Stopped at 5 m"
      ],
      "id": "VELOCITY_GRAPH-1",
      "supersedesIds": [],
      "authorDisposition": "RETAIN",
      "rationale": "Retain the displayed alternatives: they test related concepts, symbolic roles, common calculation errors, or word forms. Independent reviewer should inspect the exact options.",
      "independentReview": "REQUIRED"
    },
    {
      "lessonId": "SCI.MOTION.VELOCITY_GRAPH",
      "sourceId": "VELOCITY_GRAPH-2",
      "expectedPrompt": "Velocity is +6 m/s for 3 s. What displacement is shown by the rectangular area?",
      "expectedChoices": [
        "+18 m",
        "+2 m",
        "+9 m"
      ],
      "expectedAnswer": 0,
      "prompt": "Velocity is +6 m/s for 3 s. What displacement is shown by the rectangular area?",
      "choices": [
        "+18 m",
        "+2 m",
        "+9 m"
      ],
      "id": "VELOCITY_GRAPH-2",
      "supersedesIds": [],
      "authorDisposition": "RETAIN",
      "rationale": "Retain the displayed alternatives: they test related concepts, symbolic roles, common calculation errors, or word forms. Independent reviewer should inspect the exact options.",
      "independentReview": "REQUIRED"
    },
    {
      "lessonId": "SCI.MOTION.VELOCITY_GRAPH",
      "sourceId": "VELOCITY_GRAPH-3",
      "expectedPrompt": "Velocity becomes more negative on a downward-sloping segment below zero. What happens?",
      "expectedChoices": [
        "Speed must decrease",
        "Distance traveled becomes negative",
        "Speed increases in the negative direction"
      ],
      "expectedAnswer": 2,
      "prompt": "Velocity becomes more negative on a downward-sloping segment below zero. What happens?",
      "choices": [
        "Speed must decrease",
        "Motion must reverse toward the positive direction",
        "Speed increases in the negative direction"
      ],
      "id": "VELOCITY_GRAPH-3.v20261118r2",
      "supersedesIds": [
        "VELOCITY_GRAPH-3"
      ],
      "authorDisposition": "REWRITE",
      "rationale": "Confuses negative velocity/acceleration with slowing or reversing.",
      "independentReview": "REQUIRED"
    },
    {
      "lessonId": "SCI.MOTION.FORCES",
      "sourceId": "FORCES-0",
      "expectedPrompt": "A box has 12 N right and 5 N left. Subtract opposing forces. Net force is…",
      "expectedChoices": [
        "7 N left",
        "7 N right",
        "17 N right"
      ],
      "expectedAnswer": 1,
      "prompt": "A box has 12 N right and 5 N left. Subtract opposing forces. Net force is…",
      "choices": [
        "7 N left",
        "7 N right",
        "17 N right"
      ],
      "id": "FORCES-0",
      "supersedesIds": [],
      "authorDisposition": "RETAIN",
      "rationale": "Retain the displayed alternatives: they test related concepts, symbolic roles, common calculation errors, or word forms. Independent reviewer should inspect the exact options.",
      "independentReview": "REQUIRED"
    },
    {
      "lessonId": "SCI.MOTION.FORCES",
      "sourceId": "FORCES-1",
      "expectedPrompt": "A cart moves at constant velocity. What is its net force?",
      "expectedChoices": [
        "0 N",
        "A forward force must be larger",
        "Its weight must be zero"
      ],
      "expectedAnswer": 0,
      "prompt": "A cart moves at constant velocity. What is its net force?",
      "choices": [
        "0 N",
        "Net force points in the direction of travel",
        "Net force points opposite the direction of travel"
      ],
      "id": "FORCES-1.v20261118r2",
      "supersedesIds": [
        "FORCES-1"
      ],
      "authorDisposition": "REWRITE",
      "rationale": "Confuses velocity direction with acceleration and net force.",
      "independentReview": "REQUIRED"
    },
    {
      "lessonId": "SCI.MOTION.FORCES",
      "sourceId": "FORCES-2",
      "expectedPrompt": "A 4 kg cart has 20 N net right. What is acceleration?",
      "expectedChoices": [
        "80 m/s² right",
        "16 m/s² right",
        "5 m/s² right"
      ],
      "expectedAnswer": 2,
      "prompt": "A 4 kg cart has 20 N net right. What is acceleration?",
      "choices": [
        "0.20 m/s² right",
        "20 m/s² right",
        "5 m/s² right"
      ],
      "id": "FORCES-2.v20261118r2",
      "supersedesIds": [
        "FORCES-2"
      ],
      "authorDisposition": "REWRITE",
      "rationale": "Reverses mass/force or treats force as acceleration without dividing by mass.",
      "independentReview": "REQUIRED"
    },
    {
      "lessonId": "SCI.MOTION.FORCES",
      "sourceId": "FORCES-3",
      "expectedPrompt": "Why do Earth’s pull on a ball and the ball’s pull on Earth not cancel on the ball?",
      "expectedChoices": [
        "Reaction forces happen later",
        "They act on different objects",
        "Earth always exerts more force"
      ],
      "expectedAnswer": 1,
      "prompt": "Why do Earth’s pull on a ball and the ball’s pull on Earth not cancel on the ball?",
      "choices": [
        "Reaction forces happen later",
        "They act on different objects",
        "Earth always exerts more force"
      ],
      "id": "FORCES-3",
      "supersedesIds": [],
      "authorDisposition": "RETAIN",
      "rationale": "Retain the displayed alternatives: they test related concepts, symbolic roles, common calculation errors, or word forms. Independent reviewer should inspect the exact options.",
      "independentReview": "REQUIRED"
    },
    {
      "lessonId": "SCI.MOTION.WEIGHT",
      "sourceId": "WEIGHT-0",
      "expectedPrompt": "A 3 kg object is near Earth. Use W = mg and g = 9.8 m/s². Weight is…",
      "expectedChoices": [
        "0.31 N",
        "29.4 N",
        "3 N"
      ],
      "expectedAnswer": 1,
      "prompt": "A 3 kg object is near Earth. Use W = mg and g = 9.8 m/s². Weight is…",
      "choices": [
        "0.31 N",
        "29.4 N",
        "3 N"
      ],
      "id": "WEIGHT-0",
      "supersedesIds": [],
      "authorDisposition": "RETAIN",
      "rationale": "Retain the displayed alternatives: they test related concepts, symbolic roles, common calculation errors, or word forms. Independent reviewer should inspect the exact options.",
      "independentReview": "REQUIRED"
    },
    {
      "lessonId": "SCI.MOTION.WEIGHT",
      "sourceId": "WEIGHT-1",
      "expectedPrompt": "The same object moves from Earth to a place with weaker gravity. What stays the same?",
      "expectedChoices": [
        "Mass",
        "Weight",
        "Local gravitational acceleration"
      ],
      "expectedAnswer": 0,
      "prompt": "The same object moves from Earth to a place with weaker gravity. What stays the same?",
      "choices": [
        "Mass",
        "Weight",
        "Local gravitational acceleration"
      ],
      "id": "WEIGHT-1",
      "supersedesIds": [],
      "authorDisposition": "RETAIN",
      "rationale": "Retain the displayed alternatives: they test related concepts, symbolic roles, common calculation errors, or word forms. Independent reviewer should inspect the exact options.",
      "independentReview": "REQUIRED"
    },
    {
      "lessonId": "SCI.MOTION.WEIGHT",
      "sourceId": "WEIGHT-2",
      "expectedPrompt": "Two balls of different mass are released together from the same height in a vacuum. They…",
      "expectedChoices": [
        "Accelerate in proportion to mass",
        "Have equal weights",
        "Have the same downward acceleration"
      ],
      "expectedAnswer": 2,
      "prompt": "Two balls of different mass are released together from the same height in a vacuum. They…",
      "choices": [
        "Accelerate in proportion to mass",
        "Have equal weights",
        "Have the same downward acceleration"
      ],
      "id": "WEIGHT-2",
      "supersedesIds": [],
      "authorDisposition": "RETAIN",
      "rationale": "Retain the displayed alternatives: they test related concepts, symbolic roles, common calculation errors, or word forms. Independent reviewer should inspect the exact options.",
      "independentReview": "REQUIRED"
    },
    {
      "lessonId": "SCI.MOTION.WEIGHT",
      "sourceId": "WEIGHT-3",
      "expectedPrompt": "Can impact force be determined from mass and gravitational acceleration alone?",
      "expectedChoices": [
        "Yes; mass alone gives impact force",
        "No; stopping time or stopping process also matters",
        "Yes; impact force is always mg"
      ],
      "expectedAnswer": 1,
      "prompt": "Can impact force be determined from mass and gravitational acceleration alone?",
      "choices": [
        "Yes; mass alone gives impact force",
        "No; stopping time or stopping process also matters",
        "Yes; impact force is always mg"
      ],
      "id": "WEIGHT-3",
      "supersedesIds": [],
      "authorDisposition": "RETAIN",
      "rationale": "Retain the displayed alternatives: they test related concepts, symbolic roles, common calculation errors, or word forms. Independent reviewer should inspect the exact options.",
      "independentReview": "REQUIRED"
    },
    {
      "lessonId": "SCI.MOTION.GRAVITY",
      "sourceId": "GRAVITY-0",
      "expectedPrompt": "Masses stay fixed and center separation doubles. Use the inverse-square relationship. Force becomes…",
      "expectedChoices": [
        "One-fourth",
        "One-half",
        "Twice as large"
      ],
      "expectedAnswer": 0,
      "prompt": "Masses stay fixed and center separation doubles. Use the inverse-square relationship. Force becomes…",
      "choices": [
        "One-fourth",
        "One-half",
        "Twice as large"
      ],
      "id": "GRAVITY-0",
      "supersedesIds": [],
      "authorDisposition": "RETAIN",
      "rationale": "Retain the displayed alternatives: they test related concepts, symbolic roles, common calculation errors, or word forms. Independent reviewer should inspect the exact options.",
      "independentReview": "REQUIRED"
    },
    {
      "lessonId": "SCI.MOTION.GRAVITY",
      "sourceId": "GRAVITY-1",
      "expectedPrompt": "One mass doubles while the other mass and separation stay fixed. Force becomes…",
      "expectedChoices": [
        "Four times as large",
        "Unchanged",
        "Twice as large"
      ],
      "expectedAnswer": 2,
      "prompt": "One mass doubles while the other mass and separation stay fixed. Force becomes…",
      "choices": [
        "Four times as large",
        "Unchanged",
        "Twice as large"
      ],
      "id": "GRAVITY-1",
      "supersedesIds": [],
      "authorDisposition": "RETAIN",
      "rationale": "Retain the displayed alternatives: they test related concepts, symbolic roles, common calculation errors, or word forms. Independent reviewer should inspect the exact options.",
      "independentReview": "REQUIRED"
    },
    {
      "lessonId": "SCI.MOTION.GRAVITY",
      "sourceId": "GRAVITY-2",
      "expectedPrompt": "Both masses double and center separation also doubles. What happens to force?",
      "expectedChoices": [
        "It becomes one-fourth",
        "It stays the same",
        "It doubles"
      ],
      "expectedAnswer": 1,
      "prompt": "Both masses double and center separation also doubles. What happens to force?",
      "choices": [
        "It becomes one-fourth",
        "It stays the same",
        "It doubles"
      ],
      "id": "GRAVITY-2",
      "supersedesIds": [],
      "authorDisposition": "RETAIN",
      "rationale": "Retain the displayed alternatives: they test related concepts, symbolic roles, common calculation errors, or word forms. Independent reviewer should inspect the exact options.",
      "independentReview": "REQUIRED"
    },
    {
      "lessonId": "SCI.MOTION.GRAVITY",
      "sourceId": "GRAVITY-3",
      "expectedPrompt": "A large planet and small moon attract. Which comparison is correct?",
      "expectedChoices": [
        "Equal force magnitudes, different accelerations",
        "Planet exerts more force on the moon",
        "Moon exerts no force on the planet"
      ],
      "expectedAnswer": 0,
      "prompt": "A large planet and small moon attract. Which comparison is correct?",
      "choices": [
        "Equal force magnitudes, different accelerations",
        "Planet exerts more force on the moon",
        "Equal accelerations because the forces are equal"
      ],
      "id": "GRAVITY-3.v20261118r2",
      "supersedesIds": [
        "GRAVITY-3"
      ],
      "authorDisposition": "REWRITE",
      "rationale": "Confuses force with mass or acceleration; both alternatives target Newton’s third law.",
      "independentReview": "REQUIRED"
    },
    {
      "lessonId": "SCI.MOTION.LAB",
      "sourceId": "LAB-0",
      "expectedPrompt": "Trial distances are 6, 8, and 7 cm at the same time. Use sum / number of trials. Mean is…",
      "expectedChoices": [
        "8 cm",
        "7 cm",
        "21 cm"
      ],
      "expectedAnswer": 1,
      "prompt": "Trial distances are 6, 8, and 7 cm at the same time. Use sum / number of trials. Mean is…",
      "choices": [
        "8 cm",
        "7 cm",
        "21 cm"
      ],
      "id": "LAB-0",
      "supersedesIds": [],
      "authorDisposition": "RETAIN",
      "rationale": "Retain the displayed alternatives: they test related concepts, symbolic roles, common calculation errors, or word forms. Independent reviewer should inspect the exact options.",
      "independentReview": "REQUIRED"
    },
    {
      "lessonId": "SCI.MOTION.LAB",
      "sourceId": "LAB-1",
      "expectedPrompt": "Which x-axis label fits a motion graph?",
      "expectedChoices": [
        "Time (s)",
        "Time with no units",
        "Velocity (m/s) for every graph"
      ],
      "expectedAnswer": 0,
      "prompt": "Which x-axis label fits a motion graph?",
      "choices": [
        "Time (s)",
        "Time with no units",
        "Velocity (m/s) for every graph"
      ],
      "id": "LAB-1",
      "supersedesIds": [],
      "authorDisposition": "RETAIN",
      "rationale": "Retain the displayed alternatives: they test related concepts, symbolic roles, common calculation errors, or word forms. Independent reviewer should inspect the exact options.",
      "independentReview": "REQUIRED"
    },
    {
      "lessonId": "SCI.MOTION.LAB",
      "sourceId": "LAB-2",
      "expectedPrompt": "Your group forgot one measurement. What should you do?",
      "expectedChoices": [
        "Copy a convenient invented value",
        "Present a guess as measured data",
        "Ask how to recover or repeat it"
      ],
      "expectedAnswer": 2,
      "prompt": "Your group forgot one measurement. What should you do?",
      "choices": [
        "Use nearby trials’ average and label it as the missing observation",
        "Copy another group’s reading as if it were your own",
        "Ask how to recover or repeat it"
      ],
      "id": "LAB-2.v20261118r2",
      "supersedesIds": [
        "LAB-2"
      ],
      "authorDisposition": "REWRITE",
      "rationale": "Confuses an estimate or another group’s data with an actual observation.",
      "independentReview": "REQUIRED"
    },
    {
      "lessonId": "SCI.MOTION.LAB",
      "sourceId": "LAB-3",
      "expectedPrompt": "Which evidence best supports a claim about an interval’s acceleration?",
      "expectedChoices": [
        "Only the object’s color",
        "Its initial/final velocities and elapsed time",
        "Only the graph title"
      ],
      "expectedAnswer": 1,
      "prompt": "Which evidence best supports a claim about an interval’s acceleration?",
      "choices": [
        "An average speed and total trip time, without directions",
        "Its initial/final velocities and elapsed time",
        "Only the maximum velocity, with no starting velocity"
      ],
      "id": "LAB-3.v20261118r2",
      "supersedesIds": [
        "LAB-3",
        "LAB-3.v20261118r1"
      ],
      "authorDisposition": "REWRITE",
      "rationale": "Neither provides the signed velocity change over the specific interval.",
      "independentReview": "REQUIRED"
    },
    {
      "lessonId": "SCI.MOTION.MAGNETS",
      "sourceId": "MAGNETS-0",
      "expectedPrompt": "Two north poles approach. Like poles…",
      "expectedChoices": [
        "Repel",
        "Attract",
        "Lose all magnetic field"
      ],
      "expectedAnswer": 0,
      "prompt": "Two north poles approach. Like poles…",
      "choices": [
        "Repel",
        "Attract",
        "Reverse the field direction"
      ],
      "id": "MAGNETS-0.v20261118r1",
      "supersedesIds": [
        "MAGNETS-0",
        "MAGNETS-0.v20261118r1"
      ],
      "authorDisposition": "REWRITE",
      "rationale": "Confuses like/unlike poles or assumes approaching changes polarity.",
      "independentReview": "REQUIRED"
    },
    {
      "lessonId": "SCI.MOTION.MAGNETS",
      "sourceId": "MAGNETS-1",
      "expectedPrompt": "Current, core, and coil shape stay fixed. More wire turns generally…",
      "expectedChoices": [
        "Remove its field",
        "Make it independent of current",
        "Strengthen the electromagnet"
      ],
      "expectedAnswer": 2,
      "prompt": "Current, core, and coil shape stay fixed. More wire turns generally…",
      "choices": [
        "Leave field strength unchanged because current is unchanged",
        "Weaken the field because the wire is longer",
        "Strengthen the electromagnet"
      ],
      "id": "MAGNETS-1.v20261118r2",
      "supersedesIds": [
        "MAGNETS-1"
      ],
      "authorDisposition": "REWRITE",
      "rationale": "Ignores turn count or changes resistance despite current being controlled.",
      "independentReview": "REQUIRED"
    },
    {
      "lessonId": "SCI.MOTION.MAGNETS",
      "sourceId": "MAGNETS-2",
      "expectedPrompt": "A magnet remains still beside a stationary coil with no changing field. Is there sustained induced current?",
      "expectedChoices": [
        "Only because the magnet is heavy",
        "No",
        "Yes, indefinitely"
      ],
      "expectedAnswer": 1,
      "prompt": "A magnet remains still beside a stationary coil with no changing field. Is there sustained induced current?",
      "choices": [
        "Yes, because a field is present even without a change",
        "No",
        "Yes, if the coil has more turns while the field remains unchanged"
      ],
      "id": "MAGNETS-2.v20261118r2",
      "supersedesIds": [
        "MAGNETS-2"
      ],
      "authorDisposition": "REWRITE",
      "rationale": "Confuses field presence or more turns with changing magnetic flux.",
      "independentReview": "REQUIRED"
    },
    {
      "lessonId": "SCI.MOTION.MAGNETS",
      "sourceId": "MAGNETS-3",
      "expectedPrompt": "Which energy change describes a generator?",
      "expectedChoices": [
        "Mechanical to electrical",
        "Electrical to mechanical",
        "Energy created from nothing"
      ],
      "expectedAnswer": 0,
      "prompt": "Which energy change describes a generator?",
      "choices": [
        "Mechanical to electrical",
        "Electrical to mechanical",
        "Electrical to thermal"
      ],
      "id": "MAGNETS-3.v20261118r2",
      "supersedesIds": [
        "MAGNETS-3"
      ],
      "authorDisposition": "REWRITE",
      "rationale": "Confuses generator, motor and resistive heating conversions.",
      "independentReview": "REQUIRED"
    },
    {
      "lessonId": "SCI.CIRCUITS.PATH",
      "sourceId": "path-g",
      "expectedPrompt": "A wire has a gap. Use this clue: a steady current needs a complete path. What happens to the bulb?",
      "expectedChoices": [
        "It changes color",
        "It goes out",
        "It becomes brighter"
      ],
      "expectedAnswer": 1,
      "prompt": "A wire has a gap. Use this clue: a steady current needs a complete path. What happens to the bulb?",
      "choices": [
        "It stays lit because one battery terminal is still connected",
        "It goes out",
        "It becomes dimmer but stays lit because a gap only reduces current"
      ],
      "id": "path-g.v20261118r2",
      "supersedesIds": [
        "path-g",
        "path-g.v20261118r1"
      ],
      "authorDisposition": "REWRITE",
      "rationale": "One-terminal and gap-as-resistance misconceptions.",
      "independentReview": "REQUIRED"
    },
    {
      "lessonId": "SCI.CIRCUITS.PATH",
      "sourceId": "path-f",
      "expectedPrompt": "A bulb circuit has a switch. Which change can complete the path?",
      "expectedChoices": [
        "Opening the switch",
        "Closing the switch",
        "Replacing wire with dry plastic"
      ],
      "expectedAnswer": 1,
      "prompt": "A bulb circuit has a switch. Which change can complete the path?",
      "choices": [
        "Opening the switch",
        "Closing the switch",
        "Connecting both lamp contacts to the same battery terminal"
      ],
      "id": "path-f.v20261118r2",
      "supersedesIds": [
        "path-f"
      ],
      "authorDisposition": "REWRITE",
      "rationale": "Confuses everyday switch wording or misses the potential difference between distinct terminals.",
      "independentReview": "REQUIRED"
    },
    {
      "lessonId": "SCI.CIRCUITS.PATH",
      "sourceId": "path-i",
      "expectedPrompt": "Which pair describes a useful wire and its outside covering?",
      "expectedChoices": [
        "Rubber conductor and copper insulator",
        "Two rubber conductors",
        "Copper conductor and rubber insulator"
      ],
      "expectedAnswer": 2,
      "prompt": "Which pair describes a useful wire and its outside covering?",
      "choices": [
        "Rubber conductor and copper insulator",
        "Copper and rubber conduct charge equally well",
        "Copper conductor and rubber insulator"
      ],
      "id": "path-i.v20261118r2",
      "supersedesIds": [
        "path-i"
      ],
      "authorDisposition": "REWRITE",
      "rationale": "Reverses conductor/insulator roles or assumes all solid materials conduct equally.",
      "independentReview": "REQUIRED"
    },
    {
      "lessonId": "SCI.CIRCUITS.VIR",
      "sourceId": "vir-g",
      "expectedPrompt": "A meter reads 0.40 A. What is being measured?",
      "expectedChoices": [
        "Resistance",
        "Voltage",
        "Current"
      ],
      "expectedAnswer": 2,
      "prompt": "A meter reads 0.40 A. What is being measured?",
      "choices": [
        "Resistance",
        "Voltage",
        "Current"
      ],
      "id": "vir-g",
      "supersedesIds": [],
      "authorDisposition": "RETAIN",
      "rationale": "Retain the displayed alternatives: they test related concepts, symbolic roles, common calculation errors, or word forms. Independent reviewer should inspect the exact options.",
      "independentReview": "REQUIRED"
    },
    {
      "lessonId": "SCI.CIRCUITS.VIR",
      "sourceId": "vir-f",
      "expectedPrompt": "Which row correctly names the quantities?",
      "expectedChoices": [
        "All three mean energy",
        "V = current; I = voltage; R = resistance",
        "V = voltage; I = current; R = resistance"
      ],
      "expectedAnswer": 2,
      "prompt": "Which row correctly names the quantities?",
      "choices": [
        "V = voltage; I = resistance; R = current",
        "V = current; I = voltage; R = resistance",
        "V = voltage; I = current; R = resistance"
      ],
      "id": "vir-f.v20261118r2",
      "supersedesIds": [
        "vir-f"
      ],
      "authorDisposition": "REWRITE",
      "rationale": "Two distinct quantity-symbol confusions.",
      "independentReview": "REQUIRED"
    },
    {
      "lessonId": "SCI.CIRCUITS.VIR",
      "sourceId": "vir-i",
      "expectedPrompt": "A resistor changes from 20 Ω to 40 Ω while battery voltage stays fixed. Current should…",
      "expectedChoices": [
        "Increase",
        "Decrease",
        "Be measured in volts"
      ],
      "expectedAnswer": 1,
      "prompt": "A resistor changes from 20 Ω to 40 Ω while battery voltage stays fixed. Current should…",
      "choices": [
        "Increase",
        "Decrease",
        "Stay the same because source voltage stays the same"
      ],
      "id": "vir-i.v20261118r2",
      "supersedesIds": [
        "vir-i"
      ],
      "authorDisposition": "REWRITE",
      "rationale": "Confuses direct/inverse dependence or voltage control with constant current.",
      "independentReview": "REQUIRED"
    },
    {
      "lessonId": "SCI.CIRCUITS.OHM_I",
      "sourceId": "oi-g",
      "expectedPrompt": "Use I = V/R. A 6 V source is across 15 Ω. What is current?",
      "expectedChoices": [
        "0.40 A",
        "90 A",
        "2.5 A"
      ],
      "expectedAnswer": 0,
      "prompt": "Use I = V/R. A 6 V source is across 15 Ω. What is current?",
      "choices": [
        "0.40 A",
        "0.04 A",
        "2.5 A"
      ],
      "id": "oi-g.v20261118r2",
      "supersedesIds": [
        "oi-g"
      ],
      "authorDisposition": "REWRITE",
      "rationale": "Decimal slip and reciprocal ratio.",
      "independentReview": "REQUIRED"
    },
    {
      "lessonId": "SCI.CIRCUITS.OHM_I",
      "sourceId": "oi-f",
      "expectedPrompt": "A 12 V source is across 60 Ω. Choose current.",
      "expectedChoices": [
        "0.20 A",
        "720 A",
        "5 A"
      ],
      "expectedAnswer": 0,
      "prompt": "A 12 V source is across 60 Ω. Choose current.",
      "choices": [
        "0.20 A",
        "2.0 A",
        "5 A"
      ],
      "id": "oi-f.v20261118r1",
      "supersedesIds": [
        "oi-f",
        "oi-f.v20261118r1"
      ],
      "authorDisposition": "REWRITE",
      "rationale": "Decimal slip and reciprocal ratio.",
      "independentReview": "REQUIRED"
    },
    {
      "lessonId": "SCI.CIRCUITS.OHM_I",
      "sourceId": "oi-i",
      "expectedPrompt": "An ideal 18 V source is across 30 Ω. Calculate current.",
      "expectedChoices": [
        "540 A",
        "0.60 A",
        "0.06 A"
      ],
      "expectedAnswer": 1,
      "prompt": "An ideal 18 V source is across 30 Ω. Calculate current.",
      "choices": [
        "1.67 A",
        "0.60 A",
        "0.06 A"
      ],
      "id": "oi-i.v20261118r1",
      "supersedesIds": [
        "oi-i",
        "oi-i.v20261118r1"
      ],
      "authorDisposition": "REWRITE",
      "rationale": "Reciprocal ratio and decimal slip.",
      "independentReview": "REQUIRED"
    },
    {
      "lessonId": "SCI.CIRCUITS.OHM_VR",
      "sourceId": "ov-g",
      "expectedPrompt": "Use V = IR. At 0.50 A through 20 Ω, voltage is…",
      "expectedChoices": [
        "40 V",
        "0.025 V",
        "10 V"
      ],
      "expectedAnswer": 2,
      "prompt": "Use V = IR. At 0.50 A through 20 Ω, voltage is…",
      "choices": [
        "40 V",
        "0.025 V",
        "10 V"
      ],
      "id": "ov-g",
      "supersedesIds": [],
      "authorDisposition": "RETAIN",
      "rationale": "Retain the displayed alternatives: they test related concepts, symbolic roles, common calculation errors, or word forms. Independent reviewer should inspect the exact options.",
      "independentReview": "REQUIRED"
    },
    {
      "lessonId": "SCI.CIRCUITS.OHM_VR",
      "sourceId": "ov-f",
      "expectedPrompt": "At 9 V and 0.30 A, what is the resistance?",
      "expectedChoices": [
        "0.033 Ω",
        "2.7 Ω",
        "30 Ω"
      ],
      "expectedAnswer": 2,
      "prompt": "At 9 V and 0.30 A, what is the resistance?",
      "choices": [
        "0.033 Ω",
        "2.7 Ω",
        "30 Ω"
      ],
      "id": "ov-f",
      "supersedesIds": [],
      "authorDisposition": "RETAIN",
      "rationale": "Retain the displayed alternatives: they test related concepts, symbolic roles, common calculation errors, or word forms. Independent reviewer should inspect the exact options.",
      "independentReview": "REQUIRED"
    },
    {
      "lessonId": "SCI.CIRCUITS.OHM_VR",
      "sourceId": "ov-i",
      "expectedPrompt": "A component has 24 V across it and 0.80 A through it. Find R.",
      "expectedChoices": [
        "19.2 Ω",
        "30 Ω",
        "3 Ω"
      ],
      "expectedAnswer": 1,
      "prompt": "A component has 24 V across it and 0.80 A through it. Find R.",
      "choices": [
        "19.2 Ω",
        "30 Ω",
        "3 Ω"
      ],
      "id": "ov-i",
      "supersedesIds": [],
      "authorDisposition": "RETAIN",
      "rationale": "Retain the displayed alternatives: they test related concepts, symbolic roles, common calculation errors, or word forms. Independent reviewer should inspect the exact options.",
      "independentReview": "REQUIRED"
    },
    {
      "lessonId": "SCI.CIRCUITS.SERIES",
      "sourceId": "se-g",
      "expectedPrompt": "Two 20 Ω resistors are in series across 12 V. Use total R = 20 + 20. What current flows?",
      "expectedChoices": [
        "0.60 A",
        "40 A",
        "0.30 A"
      ],
      "expectedAnswer": 2,
      "prompt": "Two 20 Ω resistors are in series across 12 V. Use total R = 20 + 20. What current flows?",
      "choices": [
        "0.60 A",
        "0.15 A",
        "0.30 A"
      ],
      "id": "se-g.v20261118r2",
      "supersedesIds": [
        "se-g"
      ],
      "authorDisposition": "REWRITE",
      "rationale": "Ignores one resistor or counts the series resistance twice.",
      "independentReview": "REQUIRED"
    },
    {
      "lessonId": "SCI.CIRCUITS.SERIES",
      "sourceId": "se-f",
      "expectedPrompt": "An ammeter before resistor 1 reads 0.30 A. What is the current after resistor 2 in the same steady series loop?",
      "expectedChoices": [
        "0 A",
        "0.15 A",
        "0.30 A"
      ],
      "expectedAnswer": 2,
      "prompt": "An ammeter before resistor 1 reads 0.30 A. What is the current after resistor 2 in the same steady series loop?",
      "choices": [
        "0 A",
        "0.15 A",
        "0.30 A"
      ],
      "id": "se-f",
      "supersedesIds": [],
      "authorDisposition": "RETAIN",
      "rationale": "Retain the displayed alternatives: they test related concepts, symbolic roles, common calculation errors, or word forms. Independent reviewer should inspect the exact options.",
      "independentReview": "REQUIRED"
    },
    {
      "lessonId": "SCI.CIRCUITS.SERIES",
      "sourceId": "se-i",
      "expectedPrompt": "Two series bulbs share the only loop. One bulb breaks open. What happens?",
      "expectedChoices": [
        "Only the broken bulb stops",
        "Both bulbs stop",
        "The other bulb gets the full current forever"
      ],
      "expectedAnswer": 1,
      "prompt": "Two series bulbs share the only loop. One bulb breaks open. What happens?",
      "choices": [
        "Only the broken bulb stops",
        "Both bulbs stop",
        "The unbroken bulb becomes brighter because total resistance decreases"
      ],
      "id": "se-i.v20261118r2",
      "supersedesIds": [
        "se-i"
      ],
      "authorDisposition": "REWRITE",
      "rationale": "Confuses separate branches or removing a resistor with opening the only loop.",
      "independentReview": "REQUIRED"
    },
    {
      "lessonId": "SCI.CIRCUITS.PARALLEL",
      "sourceId": "pa-g",
      "expectedPrompt": "Two separate 30 Ω branches connect across 12 V. Each current is 12/30 = 0.40 A. What is total current?",
      "expectedChoices": [
        "0.40 A",
        "0.80 A",
        "0.20 A"
      ],
      "expectedAnswer": 1,
      "prompt": "Two separate 30 Ω branches connect across 12 V. Each current is 12/30 = 0.40 A. What is total current?",
      "choices": [
        "0.40 A",
        "0.80 A",
        "0.20 A"
      ],
      "id": "pa-g",
      "supersedesIds": [],
      "authorDisposition": "RETAIN",
      "rationale": "Retain the displayed alternatives: they test related concepts, symbolic roles, common calculation errors, or word forms. Independent reviewer should inspect the exact options.",
      "independentReview": "REQUIRED"
    },
    {
      "lessonId": "SCI.CIRCUITS.PARALLEL",
      "sourceId": "pa-f",
      "expectedPrompt": "A 20 Ω branch and a 40 Ω branch share an ideal 12 V source. Which gets more current?",
      "expectedChoices": [
        "The 40 Ω branch",
        "They must get equal current",
        "The 20 Ω branch"
      ],
      "expectedAnswer": 2,
      "prompt": "A 20 Ω branch and a 40 Ω branch share an ideal 12 V source. Which gets more current?",
      "choices": [
        "The 40 Ω branch",
        "They must get equal current",
        "The 20 Ω branch"
      ],
      "id": "pa-f",
      "supersedesIds": [],
      "authorDisposition": "RETAIN",
      "rationale": "Retain the displayed alternatives: they test related concepts, symbolic roles, common calculation errors, or word forms. Independent reviewer should inspect the exact options.",
      "independentReview": "REQUIRED"
    },
    {
      "lessonId": "SCI.CIRCUITS.PARALLEL",
      "sourceId": "pa-i",
      "expectedPrompt": "One of two parallel branches opens, but the other still connects both source terminals. What can happen?",
      "expectedChoices": [
        "Voltage in the remaining branch is necessarily zero",
        "The other branch keeps working",
        "Every branch must stop"
      ],
      "expectedAnswer": 1,
      "prompt": "One of two parallel branches opens, but the other still connects both source terminals. What can happen?",
      "choices": [
        "Voltage in the remaining branch is necessarily zero",
        "The other branch keeps working",
        "Every branch must stop"
      ],
      "id": "pa-i",
      "supersedesIds": [],
      "authorDisposition": "RETAIN",
      "rationale": "Retain the displayed alternatives: they test related concepts, symbolic roles, common calculation errors, or word forms. Independent reviewer should inspect the exact options.",
      "independentReview": "REQUIRED"
    },
    {
      "lessonId": "SCI.CIRCUITS.MODELS",
      "sourceId": "mo-g",
      "expectedPrompt": "A wire bends around a corner but never splits. How many paths are there?",
      "expectedChoices": [
        "Two because of the corner",
        "Three",
        "One"
      ],
      "expectedAnswer": 2,
      "prompt": "A wire bends around a corner but never splits. How many paths are there?",
      "choices": [
        "Two because of the corner",
        "Two because current travels outward and returns",
        "One"
      ],
      "id": "mo-g.v20261118r2",
      "supersedesIds": [
        "mo-g"
      ],
      "authorDisposition": "REWRITE",
      "rationale": "Confuses drawing bends or two directions around one loop with separate paths.",
      "independentReview": "REQUIRED"
    },
    {
      "lessonId": "SCI.CIRCUITS.MODELS",
      "sourceId": "mo-f",
      "expectedPrompt": "Which correctly compares directions in an external metal DC wire?",
      "expectedChoices": [
        "Neither moves charge",
        "Electrons and conventional current are opposite",
        "Both go from positive to negative"
      ],
      "expectedAnswer": 1,
      "prompt": "Which correctly compares directions in an external metal DC wire?",
      "choices": [
        "Electrons move, but conventional current has no assigned direction",
        "Electrons and conventional current are opposite",
        "Both go from positive to negative"
      ],
      "id": "mo-f.v20261118r2",
      "supersedesIds": [
        "mo-f"
      ],
      "authorDisposition": "REWRITE",
      "rationale": "Misunderstands conventional direction or equates electron drift with it.",
      "independentReview": "REQUIRED"
    },
    {
      "lessonId": "SCI.CIRCUITS.MODELS",
      "sourceId": "mo-i",
      "expectedPrompt": "Where should a voltmeter connect to measure a resistor’s voltage?",
      "expectedChoices": [
        "Across the resistor’s two ends",
        "Only to one end",
        "In place of the battery"
      ],
      "expectedAnswer": 0,
      "prompt": "Where should a voltmeter connect to measure a resistor’s voltage?",
      "choices": [
        "Across the resistor’s two ends",
        "In series with the resistor",
        "Across only the connecting wire, bypassing the resistor"
      ],
      "id": "mo-i.v20261118r2",
      "supersedesIds": [
        "mo-i"
      ],
      "authorDisposition": "REWRITE",
      "rationale": "Confuses ammeter placement or measures the wrong pair of points.",
      "independentReview": "REQUIRED"
    },
    {
      "lessonId": "SCI.CIRCUITS.MOTOR",
      "sourceId": "mt-g",
      "expectedPrompt": "A battery-powered fan spins. Which useful transformation occurs in the motor?",
      "expectedChoices": [
        "Electrical to mechanical",
        "Mechanical to nuclear",
        "Sound to chemical"
      ],
      "expectedAnswer": 0,
      "prompt": "A battery-powered fan spins. Which useful transformation occurs in the motor?",
      "choices": [
        "Electrical to mechanical",
        "Mechanical to electrical",
        "Electrical to chemical"
      ],
      "id": "mt-g.v20261118r1",
      "supersedesIds": [
        "mt-g",
        "mt-g.v20261118r1"
      ],
      "authorDisposition": "REWRITE",
      "rationale": "Confuses motor operation with a generator or charging a battery.",
      "independentReview": "REQUIRED"
    },
    {
      "lessonId": "SCI.CIRCUITS.MOTOR",
      "sourceId": "mt-f",
      "expectedPrompt": "The motor also warms up and hums. What does this show?",
      "expectedChoices": [
        "Energy was destroyed",
        "The charge disappeared",
        "Some energy transfers as heat and sound"
      ],
      "expectedAnswer": 2,
      "prompt": "The motor also warms up and hums. What does this show?",
      "choices": [
        "The useful motion accounts for all the battery’s energy",
        "Some current is used up to create the sound",
        "Some energy transfers as heat and sound"
      ],
      "id": "mt-f.v20261118r2",
      "supersedesIds": [
        "mt-f"
      ],
      "authorDisposition": "REWRITE",
      "rationale": "Ignores thermal/sound outputs or confuses energy transfer with charge consumption.",
      "independentReview": "REQUIRED"
    },
    {
      "lessonId": "SCI.CIRCUITS.MOTOR",
      "sourceId": "mt-i",
      "expectedPrompt": "No motor current was measured. Which statement is justified?",
      "expectedChoices": [
        "The current change is not known yet",
        "The current definitely doubled",
        "The current definitely halved"
      ],
      "expectedAnswer": 0,
      "prompt": "No motor current was measured. Which statement is justified?",
      "choices": [
        "The current change is not known yet",
        "The current definitely doubled",
        "The current definitely halved"
      ],
      "id": "mt-i",
      "supersedesIds": [],
      "authorDisposition": "RETAIN",
      "rationale": "Retain the displayed alternatives: they test related concepts, symbolic roles, common calculation errors, or word forms. Independent reviewer should inspect the exact options.",
      "independentReview": "REQUIRED"
    },
    {
      "lessonId": "SCI.CIRCUITS.DATA",
      "sourceId": "da-g",
      "expectedPrompt": "You test how resistance changes current. Battery voltage stays at 12 V. What is the independent variable?",
      "expectedChoices": [
        "The result you hope for",
        "Resistance",
        "Current"
      ],
      "expectedAnswer": 1,
      "prompt": "You test how resistance changes current. Battery voltage stays at 12 V. What is the independent variable?",
      "choices": [
        "Battery voltage",
        "Resistance",
        "Current"
      ],
      "id": "da-g.v20261118r2",
      "supersedesIds": [
        "da-g"
      ],
      "authorDisposition": "REWRITE",
      "rationale": "Confuses controlled, independent and dependent variables.",
      "independentReview": "REQUIRED"
    },
    {
      "lessonId": "SCI.CIRCUITS.DATA",
      "sourceId": "da-f",
      "expectedPrompt": "At fixed 12 V, model currents for 15, 30, 60 Ω are 0.80, 0.40, 0.20 A. What pattern is supported?",
      "expectedChoices": [
        "Current falls as resistance rises",
        "Current rises with resistance",
        "Current never changes"
      ],
      "expectedAnswer": 0,
      "prompt": "At fixed 12 V, model currents for 15, 30, 60 Ω are 0.80, 0.40, 0.20 A. What pattern is supported?",
      "choices": [
        "Current falls as resistance rises",
        "Current rises with resistance",
        "Current never changes"
      ],
      "id": "da-f",
      "supersedesIds": [],
      "authorDisposition": "RETAIN",
      "rationale": "Retain the displayed alternatives: they test related concepts, symbolic roles, common calculation errors, or word forms. Independent reviewer should inspect the exact options.",
      "independentReview": "REQUIRED"
    },
    {
      "lessonId": "SCI.CIRCUITS.DATA",
      "sourceId": "da-i",
      "expectedPrompt": "A graph puts voltage on y and current on x. Which line represents the greatest resistance?",
      "expectedChoices": [
        "The flattest line",
        "Any line with the largest x label",
        "The steepest line"
      ],
      "expectedAnswer": 2,
      "prompt": "A graph puts voltage on y and current on x. Which line represents the greatest resistance?",
      "choices": [
        "The flattest line",
        "The line extending farthest right, regardless of slope",
        "The steepest line"
      ],
      "id": "da-i.v20261118r2",
      "supersedesIds": [
        "da-i"
      ],
      "authorDisposition": "REWRITE",
      "rationale": "Confuses inverse slope or graph extent with V/I.",
      "independentReview": "REQUIRED"
    },
    {
      "lessonId": "SCI.CIRCUITS.CER",
      "sourceId": "ce-g",
      "expectedPrompt": "Which statement is evidence rather than a general claim?",
      "expectedChoices": [
        "Resistance affects current",
        "Circuits are interesting",
        "At 12 V and 30 Ω, calculated current was 0.40 A"
      ],
      "expectedAnswer": 2,
      "prompt": "Which statement is evidence rather than a general claim?",
      "choices": [
        "Resistance affects current",
        "Lower resistance should cause larger current",
        "At 12 V and 30 Ω, calculated current was 0.40 A"
      ],
      "id": "ce-g.v20261118r2",
      "supersedesIds": [
        "ce-g"
      ],
      "authorDisposition": "REWRITE",
      "rationale": "General claim and prediction contrasted with a numerical result.",
      "independentReview": "REQUIRED"
    },
    {
      "lessonId": "SCI.CIRCUITS.CER",
      "sourceId": "ce-f",
      "expectedPrompt": "Which reasoning connects a result to science?",
      "expectedChoices": [
        "My graph has three dots",
        "The current fell because I = V/R and voltage stayed fixed",
        "It happened because that was the answer"
      ],
      "expectedAnswer": 1,
      "prompt": "Which reasoning connects a result to science?",
      "choices": [
        "The current fell because the plotted line slopes downward",
        "The current fell because I = V/R and voltage stayed fixed",
        "The result is right because it matches the predicted answer"
      ],
      "id": "ce-f.v20261118r2",
      "supersedesIds": [
        "ce-f"
      ],
      "authorDisposition": "REWRITE",
      "rationale": "Describes a pattern or reasons circularly rather than linking data to a law.",
      "independentReview": "REQUIRED"
    },
    {
      "lessonId": "SCI.CIRCUITS.CER",
      "sourceId": "ce-i",
      "expectedPrompt": "Your practice example used 12 V but your actual lab used 9 V. Which belongs in the lab evidence?",
      "expectedChoices": [
        "The actual 9 V investigation with its results",
        "Only the practice numbers",
        "Made-up values that fit the prediction"
      ],
      "expectedAnswer": 0,
      "prompt": "Your practice example used 12 V but your actual lab used 9 V. Which belongs in the lab evidence?",
      "choices": [
        "The actual 9 V investigation with its results",
        "Only the practice numbers",
        "The 12 V example scaled to 9 V and presented as observed measurements"
      ],
      "id": "ce-i.v20261118r2",
      "supersedesIds": [
        "ce-i"
      ],
      "authorDisposition": "REWRITE",
      "rationale": "Confuses a worked example or calculated prediction with actual lab observations.",
      "independentReview": "REQUIRED"
    },
    {
      "lessonId": "SCI.CIRCUITS.MIXED",
      "sourceId": "mi-g",
      "expectedPrompt": "A model has two 15 Ω resistors in series across 9 V. Total resistance is 30 Ω. Current is…",
      "expectedChoices": [
        "0.30 A",
        "0.60 A",
        "270 A"
      ],
      "expectedAnswer": 0,
      "prompt": "A model has two 15 Ω resistors in series across 9 V. Total resistance is 30 Ω. Current is…",
      "choices": [
        "0.30 A",
        "0.60 A",
        "0.03 A"
      ],
      "id": "mi-g.v20261118r2",
      "supersedesIds": [
        "mi-g"
      ],
      "authorDisposition": "REWRITE",
      "rationale": "Ignores one resistor or makes a decimal error.",
      "independentReview": "REQUIRED"
    },
    {
      "lessonId": "SCI.CIRCUITS.MIXED",
      "sourceId": "mi-f",
      "expectedPrompt": "The two 15 Ω resistors are reconnected in parallel across the same ideal 9 V source. What is total current?",
      "expectedChoices": [
        "0.60 A",
        "1.20 A",
        "0.30 A"
      ],
      "expectedAnswer": 1,
      "prompt": "The two 15 Ω resistors are reconnected in parallel across the same ideal 9 V source. What is total current?",
      "choices": [
        "0.60 A",
        "1.20 A",
        "0.30 A"
      ],
      "id": "mi-f",
      "supersedesIds": [],
      "authorDisposition": "RETAIN",
      "rationale": "Retain the displayed alternatives: they test related concepts, symbolic roles, common calculation errors, or word forms. Independent reviewer should inspect the exact options.",
      "independentReview": "REQUIRED"
    },
    {
      "lessonId": "SCI.CIRCUITS.MIXED",
      "sourceId": "mi-i",
      "expectedPrompt": "A battery lamp produces light and heat. Which earlier science idea helps explain this?",
      "expectedChoices": [
        "Current being consumed",
        "Energy transformations",
        "Energy vanishing"
      ],
      "expectedAnswer": 1,
      "prompt": "A battery lamp produces light and heat. Which earlier science idea helps explain this?",
      "choices": [
        "Current being consumed",
        "Energy transformations",
        "Only current direction, with no energy changes"
      ],
      "id": "mi-i.v20261118r2",
      "supersedesIds": [
        "mi-i"
      ],
      "authorDisposition": "REWRITE",
      "rationale": "Confuses charge consumption or direction with an energy account.",
      "independentReview": "REQUIRED"
    },
    {
      "lessonId": "SCI.WAVES.TYPES",
      "sourceId": "waves-types-1",
      "expectedPrompt": "Which can travel through empty space?",
      "expectedChoices": [
        "Light",
        "Sound",
        "Earthquake P waves"
      ],
      "expectedAnswer": 0,
      "prompt": "Which can travel through empty space?",
      "choices": [
        "Light",
        "Sound",
        "Earthquake P waves"
      ],
      "id": "waves-types-1",
      "supersedesIds": [],
      "authorDisposition": "RETAIN",
      "rationale": "Retain the displayed alternatives: they test related concepts, symbolic roles, common calculation errors, or word forms. Independent reviewer should inspect the exact options.",
      "independentReview": "REQUIRED"
    },
    {
      "lessonId": "SCI.WAVES.TYPES",
      "sourceId": "waves-types-2",
      "expectedPrompt": "A spring has alternating crowded and spread-out coils. What type is modeled?",
      "expectedChoices": [
        "Transverse",
        "Electromagnetic only",
        "Longitudinal"
      ],
      "expectedAnswer": 2,
      "prompt": "A spring has alternating crowded and spread-out coils. What type is modeled?",
      "choices": [
        "Transverse",
        "Electromagnetic only",
        "Longitudinal"
      ],
      "id": "waves-types-2",
      "supersedesIds": [],
      "authorDisposition": "RETAIN",
      "rationale": "Retain the displayed alternatives: they test related concepts, symbolic roles, common calculation errors, or word forms. Independent reviewer should inspect the exact options.",
      "independentReview": "REQUIRED"
    },
    {
      "lessonId": "SCI.WAVES.TYPES",
      "sourceId": "waves-types-3",
      "expectedPrompt": "Where is amplitude measured?",
      "expectedChoices": [
        "Crest to trough",
        "Rest position to crest",
        "Crest to next crest"
      ],
      "expectedAnswer": 1,
      "prompt": "Where is amplitude measured?",
      "choices": [
        "Crest to trough",
        "Rest position to crest",
        "Crest to next crest"
      ],
      "id": "waves-types-3",
      "supersedesIds": [],
      "authorDisposition": "RETAIN",
      "rationale": "Retain the displayed alternatives: they test related concepts, symbolic roles, common calculation errors, or word forms. Independent reviewer should inspect the exact options.",
      "independentReview": "REQUIRED"
    },
    {
      "lessonId": "SCI.WAVES.RELATIONSHIPS",
      "sourceId": "waves-relationships-1",
      "expectedPrompt": "At the same speed, doubling wavelength makes frequency…",
      "expectedChoices": [
        "Unchanged",
        "Half as large",
        "Twice as large"
      ],
      "expectedAnswer": 1,
      "prompt": "At the same speed, doubling wavelength makes frequency…",
      "choices": [
        "Unchanged",
        "Half as large",
        "Twice as large"
      ],
      "id": "waves-relationships-1",
      "supersedesIds": [],
      "authorDisposition": "RETAIN",
      "rationale": "Retain the displayed alternatives: they test related concepts, symbolic roles, common calculation errors, or word forms. Independent reviewer should inspect the exact options.",
      "independentReview": "REQUIRED"
    },
    {
      "lessonId": "SCI.WAVES.RELATIONSHIPS",
      "sourceId": "waves-relationships-2",
      "expectedPrompt": "A sound becomes louder without changing pitch. What changes?",
      "expectedChoices": [
        "Amplitude increases",
        "Frequency increases",
        "Wavelength shortens"
      ],
      "expectedAnswer": 0,
      "prompt": "A sound becomes louder without changing pitch. What changes?",
      "choices": [
        "Amplitude increases",
        "Frequency increases",
        "Wavelength shortens"
      ],
      "id": "waves-relationships-2",
      "supersedesIds": [],
      "authorDisposition": "RETAIN",
      "rationale": "Retain the displayed alternatives: they test related concepts, symbolic roles, common calculation errors, or word forms. Independent reviewer should inspect the exact options.",
      "independentReview": "REQUIRED"
    },
    {
      "lessonId": "SCI.WAVES.RELATIONSHIPS",
      "sourceId": "waves-relationships-3",
      "expectedPrompt": "Two waves have equal amplitude; B has more cycles per second. Which has higher pitch?",
      "expectedChoices": [
        "A",
        "Neither",
        "B"
      ],
      "expectedAnswer": 2,
      "prompt": "Two waves have equal amplitude; B has more cycles per second. Which has higher pitch?",
      "choices": [
        "A",
        "Neither",
        "B"
      ],
      "id": "waves-relationships-3",
      "supersedesIds": [],
      "authorDisposition": "RETAIN",
      "rationale": "Retain the displayed alternatives: they test related concepts, symbolic roles, common calculation errors, or word forms. Independent reviewer should inspect the exact options.",
      "independentReview": "REQUIRED"
    },
    {
      "lessonId": "SCI.WAVES.BEHAVIORS",
      "sourceId": "waves-behaviors-1",
      "expectedPrompt": "An echo is an example of…",
      "expectedChoices": [
        "Refraction",
        "Dispersion",
        "Reflection"
      ],
      "expectedAnswer": 2,
      "prompt": "An echo is an example of…",
      "choices": [
        "Refraction",
        "Dispersion",
        "Reflection"
      ],
      "id": "waves-behaviors-1",
      "supersedesIds": [],
      "authorDisposition": "RETAIN",
      "rationale": "Retain the displayed alternatives: they test related concepts, symbolic roles, common calculation errors, or word forms. Independent reviewer should inspect the exact options.",
      "independentReview": "REQUIRED"
    },
    {
      "lessonId": "SCI.WAVES.BEHAVIORS",
      "sourceId": "waves-behaviors-2",
      "expectedPrompt": "A straw appears bent at the water surface because of…",
      "expectedChoices": [
        "Interference",
        "Refraction",
        "Reflection only"
      ],
      "expectedAnswer": 1,
      "prompt": "A straw appears bent at the water surface because of…",
      "choices": [
        "Interference",
        "Refraction",
        "Reflection only"
      ],
      "id": "waves-behaviors-2",
      "supersedesIds": [],
      "authorDisposition": "RETAIN",
      "rationale": "Retain the displayed alternatives: they test related concepts, symbolic roles, common calculation errors, or word forms. Independent reviewer should inspect the exact options.",
      "independentReview": "REQUIRED"
    },
    {
      "lessonId": "SCI.WAVES.BEHAVIORS",
      "sourceId": "waves-behaviors-3",
      "expectedPrompt": "Sound reaching you around a corner demonstrates…",
      "expectedChoices": [
        "Diffraction",
        "Dispersion",
        "Absorption"
      ],
      "expectedAnswer": 0,
      "prompt": "Sound reaching you around a corner demonstrates…",
      "choices": [
        "Diffraction",
        "Dispersion",
        "Absorption"
      ],
      "id": "waves-behaviors-3",
      "supersedesIds": [],
      "authorDisposition": "RETAIN",
      "rationale": "Retain the displayed alternatives: they test related concepts, symbolic roles, common calculation errors, or word forms. Independent reviewer should inspect the exact options.",
      "independentReview": "REQUIRED"
    },
    {
      "lessonId": "SCI.WAVES.INTERFERENCE",
      "sourceId": "waves-interference-1",
      "expectedPrompt": "Two equal crests overlap. Result?",
      "expectedChoices": [
        "Destructive interference",
        "Refraction",
        "Constructive interference"
      ],
      "expectedAnswer": 2,
      "prompt": "Two equal crests overlap. Result?",
      "choices": [
        "Destructive interference",
        "Refraction",
        "Constructive interference"
      ],
      "id": "waves-interference-1",
      "supersedesIds": [],
      "authorDisposition": "RETAIN",
      "rationale": "Retain the displayed alternatives: they test related concepts, symbolic roles, common calculation errors, or word forms. Independent reviewer should inspect the exact options.",
      "independentReview": "REQUIRED"
    },
    {
      "lessonId": "SCI.WAVES.INTERFERENCE",
      "sourceId": "waves-interference-2",
      "expectedPrompt": "An equal crest and trough overlap. Result?",
      "expectedChoices": [
        "Dispersion",
        "Destructive interference",
        "Constructive interference"
      ],
      "expectedAnswer": 1,
      "prompt": "An equal crest and trough overlap. Result?",
      "choices": [
        "Dispersion",
        "Destructive interference",
        "Constructive interference"
      ],
      "id": "waves-interference-2",
      "supersedesIds": [],
      "authorDisposition": "RETAIN",
      "rationale": "Retain the displayed alternatives: they test related concepts, symbolic roles, common calculation errors, or word forms. Independent reviewer should inspect the exact options.",
      "independentReview": "REQUIRED"
    },
    {
      "lessonId": "SCI.WAVES.INTERFERENCE",
      "sourceId": "waves-interference-3",
      "expectedPrompt": "Frosted glass passes light but blurs objects. It is…",
      "expectedChoices": [
        "Translucent",
        "Opaque",
        "Transparent"
      ],
      "expectedAnswer": 0,
      "prompt": "Frosted glass passes light but blurs objects. It is…",
      "choices": [
        "Translucent",
        "Opaque",
        "Transparent"
      ],
      "id": "waves-interference-3",
      "supersedesIds": [],
      "authorDisposition": "RETAIN",
      "rationale": "Retain the displayed alternatives: they test related concepts, symbolic roles, common calculation errors, or word forms. Independent reviewer should inspect the exact options.",
      "independentReview": "REQUIRED"
    },
    {
      "lessonId": "SCI.WAVES.SPEED",
      "sourceId": "waves-speed-1",
      "expectedPrompt": "Which cannot carry sound?",
      "expectedChoices": [
        "A vacuum",
        "Water",
        "Steel"
      ],
      "expectedAnswer": 0,
      "prompt": "Which cannot carry sound?",
      "choices": [
        "A vacuum",
        "Water",
        "Steel"
      ],
      "id": "waves-speed-1",
      "supersedesIds": [],
      "authorDisposition": "RETAIN",
      "rationale": "Retain the displayed alternatives: they test related concepts, symbolic roles, common calculation errors, or word forms. Independent reviewer should inspect the exact options.",
      "independentReview": "REQUIRED"
    },
    {
      "lessonId": "SCI.WAVES.SPEED",
      "sourceId": "waves-speed-2",
      "expectedPrompt": "Equal distance: sound at 340 m/s or 1500 m/s arrives first?",
      "expectedChoices": [
        "340 m/s",
        "Same time",
        "1500 m/s"
      ],
      "expectedAnswer": 2,
      "prompt": "Equal distance: sound at 340 m/s or 1500 m/s arrives first?",
      "choices": [
        "340 m/s",
        "Same time",
        "1500 m/s"
      ],
      "id": "waves-speed-2",
      "supersedesIds": [],
      "authorDisposition": "RETAIN",
      "rationale": "Retain the displayed alternatives: they test related concepts, symbolic roles, common calculation errors, or word forms. Independent reviewer should inspect the exact options.",
      "independentReview": "REQUIRED"
    },
    {
      "lessonId": "SCI.WAVES.SPEED",
      "sourceId": "waves-speed-3",
      "expectedPrompt": "Where is light fastest?",
      "expectedChoices": [
        "Water",
        "Vacuum",
        "Glass"
      ],
      "expectedAnswer": 1,
      "prompt": "Where is light fastest?",
      "choices": [
        "Water",
        "Vacuum",
        "Glass"
      ],
      "id": "waves-speed-3",
      "supersedesIds": [],
      "authorDisposition": "RETAIN",
      "rationale": "Retain the displayed alternatives: they test related concepts, symbolic roles, common calculation errors, or word forms. Independent reviewer should inspect the exact options.",
      "independentReview": "REQUIRED"
    },
    {
      "lessonId": "SCI.WAVES.LIGHT",
      "sourceId": "waves-light-1",
      "expectedPrompt": "Highest-frequency EM radiation?",
      "expectedChoices": [
        "Gamma rays",
        "Radio waves",
        "Infrared"
      ],
      "expectedAnswer": 0,
      "prompt": "Highest-frequency EM radiation?",
      "choices": [
        "Gamma rays",
        "Radio waves",
        "Infrared"
      ],
      "id": "waves-light-1",
      "supersedesIds": [],
      "authorDisposition": "RETAIN",
      "rationale": "Retain the displayed alternatives: they test related concepts, symbolic roles, common calculation errors, or word forms. Independent reviewer should inspect the exact options.",
      "independentReview": "REQUIRED"
    },
    {
      "lessonId": "SCI.WAVES.LIGHT",
      "sourceId": "waves-light-2",
      "expectedPrompt": "Longest visible wavelength?",
      "expectedChoices": [
        "Violet",
        "Blue",
        "Red"
      ],
      "expectedAnswer": 2,
      "prompt": "Longest visible wavelength?",
      "choices": [
        "Violet",
        "Blue",
        "Red"
      ],
      "id": "waves-light-2",
      "supersedesIds": [],
      "authorDisposition": "RETAIN",
      "rationale": "Retain the displayed alternatives: they test related concepts, symbolic roles, common calculation errors, or word forms. Independent reviewer should inspect the exact options.",
      "independentReview": "REQUIRED"
    },
    {
      "lessonId": "SCI.WAVES.LIGHT",
      "sourceId": "waves-light-3",
      "expectedPrompt": "A prism separates white light into colors. Name?",
      "expectedChoices": [
        "Echo",
        "Dispersion",
        "Destructive interference"
      ],
      "expectedAnswer": 1,
      "prompt": "A prism separates white light into colors. Name?",
      "choices": [
        "Reflection",
        "Dispersion",
        "Diffraction"
      ],
      "id": "waves-light-3.v20261118r2",
      "supersedesIds": [
        "waves-light-3"
      ],
      "authorDisposition": "REWRITE",
      "rationale": "Uses two actual optical wave behaviors instead of an unrelated echo.",
      "independentReview": "REQUIRED"
    },
    {
      "lessonId": "SCI.WAVES.SEISMIC",
      "sourceId": "waves-seismic-1",
      "expectedPrompt": "Which seismic wave arrives first?",
      "expectedChoices": [
        "All arrive together",
        "P",
        "S"
      ],
      "expectedAnswer": 1,
      "prompt": "Which seismic wave arrives first?",
      "choices": [
        "All arrive together",
        "P",
        "S"
      ],
      "id": "waves-seismic-1",
      "supersedesIds": [],
      "authorDisposition": "RETAIN",
      "rationale": "Retain the displayed alternatives: they test related concepts, symbolic roles, common calculation errors, or word forms. Independent reviewer should inspect the exact options.",
      "independentReview": "REQUIRED"
    },
    {
      "lessonId": "SCI.WAVES.SEISMIC",
      "sourceId": "waves-seismic-2",
      "expectedPrompt": "Which cannot travel through liquid?",
      "expectedChoices": [
        "S",
        "P",
        "Both P and S"
      ],
      "expectedAnswer": 0,
      "prompt": "Which cannot travel through liquid?",
      "choices": [
        "S",
        "P",
        "Both P and S"
      ],
      "id": "waves-seismic-2",
      "supersedesIds": [],
      "authorDisposition": "RETAIN",
      "rationale": "Retain the displayed alternatives: they test related concepts, symbolic roles, common calculation errors, or word forms. Independent reviewer should inspect the exact options.",
      "independentReview": "REQUIRED"
    },
    {
      "lessonId": "SCI.WAVES.SEISMIC",
      "sourceId": "waves-seismic-3",
      "expectedPrompt": "The surface point above the focus is the…",
      "expectedChoices": [
        "Compression",
        "Crest",
        "Epicenter"
      ],
      "expectedAnswer": 2,
      "prompt": "The surface point above the focus is the…",
      "choices": [
        "Focus",
        "Seismograph station",
        "Epicenter"
      ],
      "id": "waves-seismic-3.v20261118r2",
      "supersedesIds": [
        "waves-seismic-3"
      ],
      "authorDisposition": "REWRITE",
      "rationale": "Contrasts surface point, underground origin and observing station.",
      "independentReview": "REQUIRED"
    },
    {
      "lessonId": "SCI.WAVES.DOPPLER",
      "sourceId": "waves-doppler-1",
      "expectedPrompt": "A horn approaches a stationary listener. Heard pitch?",
      "expectedChoices": [
        "Always unchanged",
        "Higher",
        "Lower"
      ],
      "expectedAnswer": 1,
      "prompt": "A horn approaches a stationary listener. Heard pitch?",
      "choices": [
        "Always unchanged",
        "Higher",
        "Lower"
      ],
      "id": "waves-doppler-1",
      "supersedesIds": [],
      "authorDisposition": "RETAIN",
      "rationale": "Retain the displayed alternatives: they test related concepts, symbolic roles, common calculation errors, or word forms. Independent reviewer should inspect the exact options.",
      "independentReview": "REQUIRED"
    },
    {
      "lessonId": "SCI.WAVES.DOPPLER",
      "sourceId": "waves-doppler-2",
      "expectedPrompt": "A source moves away. Observed wavelength?",
      "expectedChoices": [
        "Longer",
        "Shorter",
        "Zero"
      ],
      "expectedAnswer": 0,
      "prompt": "A source moves away. Observed wavelength?",
      "choices": [
        "Longer",
        "Shorter",
        "Unchanged"
      ],
      "id": "waves-doppler-2.v20261118r1",
      "supersedesIds": [
        "waves-doppler-2",
        "waves-doppler-2.v20261118r1"
      ],
      "authorDisposition": "REWRITE",
      "rationale": "Confuses approaching/receding spacing or ignores relative motion.",
      "independentReview": "REQUIRED"
    },
    {
      "lessonId": "SCI.WAVES.DOPPLER",
      "sourceId": "waves-doppler-3",
      "expectedPrompt": "Light from a receding source shifts toward…",
      "expectedChoices": [
        "Blue",
        "No possible shift",
        "Red"
      ],
      "expectedAnswer": 2,
      "prompt": "Light from a receding source shifts toward…",
      "choices": [
        "Blue",
        "No shift is observed",
        "Red"
      ],
      "id": "waves-doppler-3.v20261118r2",
      "supersedesIds": [
        "waves-doppler-3",
        "waves-doppler-3.v20261118r1"
      ],
      "authorDisposition": "REWRITE",
      "rationale": "Removes the misleading reference to unchanged emitted frequency.",
      "independentReview": "REQUIRED"
    },
    {
      "lessonId": "SCI.SPS7A.ENERGY_FORMS",
      "sourceId": "e1",
      "expectedPrompt": "A moving football has which form of energy because it is moving?",
      "expectedChoices": [
        "Nuclear",
        "Radiant",
        "Kinetic",
        "Chemical"
      ],
      "expectedAnswer": 2,
      "prompt": "A moving football has which form of energy because it is moving?",
      "choices": [
        "Gravitational potential",
        "Radiant",
        "Kinetic",
        "Chemical"
      ],
      "id": "e1.v20261118r2",
      "supersedesIds": [
        "e1"
      ],
      "authorDisposition": "REWRITE",
      "rationale": "Confuses energy of motion with position, light or chemical stores.",
      "independentReview": "REQUIRED"
    },
    {
      "lessonId": "SCI.SPS7A.ENERGY_FORMS",
      "sourceId": "e2",
      "expectedPrompt": "Energy stored in food is mainly which form?",
      "expectedChoices": [
        "Kinetic",
        "Chemical",
        "Sound",
        "Radiant"
      ],
      "expectedAnswer": 1,
      "prompt": "Energy stored in food is mainly which form?",
      "choices": [
        "Kinetic",
        "Chemical",
        "Thermal",
        "Radiant"
      ],
      "id": "e2.v20261118r2",
      "supersedesIds": [
        "e2"
      ],
      "authorDisposition": "REWRITE",
      "rationale": "Distinguishes food’s chemical store from particle motion, temperature and its solar-energy origin.",
      "independentReview": "REQUIRED"
    },
    {
      "lessonId": "SCI.SPS7A.ENERGY_FORMS",
      "sourceId": "e3",
      "expectedPrompt": "Sunlight reaching Earth is mainly which form?",
      "expectedChoices": [
        "Radiant",
        "Mechanical",
        "Chemical",
        "Sound"
      ],
      "expectedAnswer": 0,
      "prompt": "Sunlight reaching Earth is mainly which form?",
      "choices": [
        "Radiant",
        "Mechanical",
        "Chemical",
        "Thermal"
      ],
      "id": "e3.v20261118r2",
      "supersedesIds": [
        "e3"
      ],
      "authorDisposition": "REWRITE",
      "rationale": "Distinguishes incoming radiation from motion, stored chemical energy and the resulting warming.",
      "independentReview": "REQUIRED"
    },
    {
      "lessonId": "SCI.SPS7A.TRANSFER_TRANSFORMATION",
      "sourceId": "tt1",
      "expectedPrompt": "A warm mug heats your colder hand. Which best fits the school classification?",
      "expectedChoices": [
        "Transformation",
        "Transfer"
      ],
      "expectedAnswer": 1,
      "prompt": "A warm mug heats your colder hand. Which best fits the school classification?",
      "choices": [
        "Transformation",
        "Transfer"
      ],
      "id": "tt1",
      "supersedesIds": [],
      "authorDisposition": "RETAIN",
      "rationale": "Retain the displayed alternatives: they test related concepts, symbolic roles, common calculation errors, or word forms. Independent reviewer should inspect the exact options.",
      "independentReview": "REQUIRED"
    },
    {
      "lessonId": "SCI.SPS7A.TRANSFER_TRANSFORMATION",
      "sourceId": "tt2",
      "expectedPrompt": "A solar panel changes sunlight into electricity. Which best fits?",
      "expectedChoices": [
        "Transfer",
        "Transformation"
      ],
      "expectedAnswer": 1,
      "prompt": "A solar panel changes sunlight into electricity. Which best fits?",
      "choices": [
        "Transfer",
        "Transformation"
      ],
      "id": "tt2",
      "supersedesIds": [],
      "authorDisposition": "RETAIN",
      "rationale": "Retain the displayed alternatives: they test related concepts, symbolic roles, common calculation errors, or word forms. Independent reviewer should inspect the exact options.",
      "independentReview": "REQUIRED"
    },
    {
      "lessonId": "SCI.SPS7A.TRANSFER_TRANSFORMATION",
      "sourceId": "tt3",
      "expectedPrompt": "An electric fan uses electricity to spin its blades. Which best fits?",
      "expectedChoices": [
        "Transformation",
        "Transfer"
      ],
      "expectedAnswer": 0,
      "prompt": "An electric fan uses electricity to spin its blades. Which best fits?",
      "choices": [
        "Transformation",
        "Transfer"
      ],
      "id": "tt3",
      "supersedesIds": [],
      "authorDisposition": "RETAIN",
      "rationale": "Retain the displayed alternatives: they test related concepts, symbolic roles, common calculation errors, or word forms. Independent reviewer should inspect the exact options.",
      "independentReview": "REQUIRED"
    },
    {
      "lessonId": "SCI.SPS7B.MECHANICAL",
      "sourceId": "m1",
      "expectedPrompt": "A coaster stopped at the top of the tallest hill has lots of…",
      "expectedChoices": [
        "Nuclear energy",
        "Gravitational potential energy",
        "Sound energy"
      ],
      "expectedAnswer": 1,
      "prompt": "A coaster stopped at the top of the tallest hill has lots of…",
      "choices": [
        "Kinetic energy",
        "Gravitational potential energy",
        "Elastic potential energy"
      ],
      "id": "m1.v20261118r2",
      "supersedesIds": [
        "m1"
      ],
      "authorDisposition": "REWRITE",
      "rationale": "Confuses moving, elevated and deformed systems.",
      "independentReview": "REQUIRED"
    },
    {
      "lessonId": "SCI.SPS7B.MECHANICAL",
      "sourceId": "m2",
      "expectedPrompt": "As the coaster rolls downhill and speeds up, kinetic energy generally…",
      "expectedChoices": [
        "Increases",
        "Disappears",
        "Becomes nuclear"
      ],
      "expectedAnswer": 0,
      "prompt": "As the coaster rolls downhill and speeds up, kinetic energy generally…",
      "choices": [
        "Increases",
        "Decreases",
        "Stays unchanged"
      ],
      "id": "m2.v20261118r1",
      "supersedesIds": [
        "m2",
        "m2.v20261118r1"
      ],
      "authorDisposition": "REWRITE",
      "rationale": "Confuses the decreasing potential energy or constant total energy with kinetic energy.",
      "independentReview": "REQUIRED"
    },
    {
      "lessonId": "SCI.SPS7B.MECHANICAL",
      "sourceId": "m3",
      "expectedPrompt": "Mechanical energy combines…",
      "expectedChoices": [
        "Thermal + sound",
        "Electrical + chemical",
        "Kinetic + potential"
      ],
      "expectedAnswer": 2,
      "prompt": "Mechanical energy combines…",
      "choices": [
        "Thermal + sound",
        "Electrical + chemical",
        "Kinetic + potential"
      ],
      "id": "m3",
      "supersedesIds": [],
      "authorDisposition": "RETAIN",
      "rationale": "Retain the displayed alternatives: they test related concepts, symbolic roles, common calculation errors, or word forms. Independent reviewer should inspect the exact options.",
      "independentReview": "REQUIRED"
    },
    {
      "lessonId": "SCI.SPS7C.HEAT_TRANSFER",
      "sourceId": "h1",
      "expectedPrompt": "A metal spoon gets hot while sitting in soup. Which process?",
      "expectedChoices": [
        "Radiation",
        "Conduction",
        "Convection"
      ],
      "expectedAnswer": 1,
      "prompt": "A metal spoon gets hot while sitting in soup. Which process?",
      "choices": [
        "Radiation",
        "Conduction",
        "Convection"
      ],
      "id": "h1",
      "supersedesIds": [],
      "authorDisposition": "RETAIN",
      "rationale": "Retain the displayed alternatives: they test related concepts, symbolic roles, common calculation errors, or word forms. Independent reviewer should inspect the exact options.",
      "independentReview": "REQUIRED"
    },
    {
      "lessonId": "SCI.SPS7C.HEAT_TRANSFER",
      "sourceId": "h2",
      "expectedPrompt": "Warm air rises while cooler air sinks. Which process?",
      "expectedChoices": [
        "Conduction",
        "Convection",
        "Radiation"
      ],
      "expectedAnswer": 1,
      "prompt": "Warm air rises while cooler air sinks. Which process?",
      "choices": [
        "Conduction",
        "Convection",
        "Radiation"
      ],
      "id": "h2",
      "supersedesIds": [],
      "authorDisposition": "RETAIN",
      "rationale": "Retain the displayed alternatives: they test related concepts, symbolic roles, common calculation errors, or word forms. Independent reviewer should inspect the exact options.",
      "independentReview": "REQUIRED"
    },
    {
      "lessonId": "SCI.SPS7C.HEAT_TRANSFER",
      "sourceId": "h3",
      "expectedPrompt": "You feel heat from a campfire without touching it. Which process?",
      "expectedChoices": [
        "Convection",
        "Radiation",
        "Conduction"
      ],
      "expectedAnswer": 1,
      "prompt": "You feel heat from a campfire without touching it. Which process?",
      "choices": [
        "Convection",
        "Radiation",
        "Conduction"
      ],
      "id": "h3",
      "supersedesIds": [],
      "authorDisposition": "RETAIN",
      "rationale": "Retain the displayed alternatives: they test related concepts, symbolic roles, common calculation errors, or word forms. Independent reviewer should inspect the exact options.",
      "independentReview": "REQUIRED"
    },
    {
      "lessonId": "SCI.SPS7D.PARTICLE_MOTION",
      "sourceId": "p1",
      "expectedPrompt": "A substance heats up. What usually happens to average particle motion?",
      "expectedChoices": [
        "It stops",
        "It becomes electrical",
        "It speeds up"
      ],
      "expectedAnswer": 2,
      "prompt": "A substance heats up. What usually happens to average particle motion?",
      "choices": [
        "It stays unchanged",
        "It decreases",
        "It speeds up"
      ],
      "id": "p1.v20261118r1",
      "supersedesIds": [
        "p1",
        "p1.v20261118r1"
      ],
      "authorDisposition": "REWRITE",
      "rationale": "Ignores temperature or reverses its relationship to average microscopic motion.",
      "independentReview": "REQUIRED"
    },
    {
      "lessonId": "SCI.SPS7D.PARTICLE_MOTION",
      "sourceId": "p2",
      "expectedPrompt": "A gas cools from 80°C to 30°C. Its average kinetic energy becomes…",
      "expectedChoices": [
        "Exactly zero",
        "Lower",
        "Higher"
      ],
      "expectedAnswer": 1,
      "prompt": "A gas cools from 80°C to 30°C. Its average kinetic energy becomes…",
      "choices": [
        "Unchanged because the gas has the same mass",
        "Lower",
        "Higher"
      ],
      "id": "p2.v20261118r2",
      "supersedesIds": [
        "p2"
      ],
      "authorDisposition": "REWRITE",
      "rationale": "Confuses unchanged amount of matter or temperature-change direction with average kinetic energy.",
      "independentReview": "REQUIRED"
    },
    {
      "lessonId": "SCI.SPS7D.PARTICLE_MOTION",
      "sourceId": "p3",
      "expectedPrompt": "A solid is heated but does not melt. Its particles generally…",
      "expectedChoices": [
        "Vibrate faster around their positions",
        "Stop moving",
        "Move freely like a gas"
      ],
      "expectedAnswer": 0,
      "prompt": "A solid is heated but does not melt. Its particles generally…",
      "choices": [
        "Vibrate faster around their positions",
        "Vibrate more slowly because heating expands the solid",
        "Move freely like a gas"
      ],
      "id": "p3.v20261118r2",
      "supersedesIds": [
        "p3"
      ],
      "authorDisposition": "REWRITE",
      "rationale": "Confuses expansion with slower motion or treats heating as an immediate phase change.",
      "independentReview": "REQUIRED"
    },
    {
      "lessonId": "SCI.SPS7E.CONCEPT",
      "sourceId": "s1",
      "expectedPrompt": "Two equal masses receive equal heat. Sample A changes temperature less. Which has higher specific heat?",
      "expectedChoices": [
        "They must be equal",
        "Sample A",
        "Sample B"
      ],
      "expectedAnswer": 1,
      "prompt": "Two equal masses receive equal heat. Sample A changes temperature less. Which has higher specific heat?",
      "choices": [
        "They must be equal",
        "Sample A",
        "Sample B"
      ],
      "id": "s1",
      "supersedesIds": [],
      "authorDisposition": "RETAIN",
      "rationale": "Retain the displayed alternatives: they test related concepts, symbolic roles, common calculation errors, or word forms. Independent reviewer should inspect the exact options.",
      "independentReview": "REQUIRED"
    },
    {
      "lessonId": "SCI.SPS7E.CONCEPT",
      "sourceId": "s2",
      "expectedPrompt": "High specific heat means a substance needs…",
      "expectedChoices": [
        "More energy for the same temperature change",
        "No energy to warm up",
        "Less mass"
      ],
      "expectedAnswer": 0,
      "prompt": "For equal masses, high specific heat means a substance needs…",
      "choices": [
        "More energy for the same temperature change",
        "Less energy for the same temperature change",
        "The same energy regardless of the material"
      ],
      "id": "s2.v20261118r2",
      "supersedesIds": [
        "s2"
      ],
      "authorDisposition": "REWRITE",
      "rationale": "Controls mass and contrasts reversed or ignored specific-heat dependence.",
      "independentReview": "REQUIRED"
    },
    {
      "lessonId": "SCI.SPS7E.CONCEPT",
      "sourceId": "s3",
      "expectedPrompt": "Equal masses get equal heat. The metal warms much more than the water. The metal likely has…",
      "expectedChoices": [
        "Higher specific heat",
        "No specific heat",
        "Lower specific heat"
      ],
      "expectedAnswer": 2,
      "prompt": "Equal masses get equal heat. The metal warms much more than the water. The metal likely has…",
      "choices": [
        "Higher specific heat",
        "The same specific heat as water",
        "Lower specific heat"
      ],
      "id": "s3.v20261118r2",
      "supersedesIds": [
        "s3"
      ],
      "authorDisposition": "REWRITE",
      "rationale": "Reverses or ignores c when equal heat and mass produce different temperature changes.",
      "independentReview": "REQUIRED"
    },
    {
      "lessonId": "SCI.SPS7E.SYMBOLS_UNITS",
      "sourceId": "su1",
      "expectedPrompt": "In Q = mcΔT, what does Q represent?",
      "expectedChoices": [
        "Temperature change",
        "Heat energy transferred",
        "Mass"
      ],
      "expectedAnswer": 1,
      "prompt": "In Q = mcΔT, what does Q represent?",
      "choices": [
        "Temperature change",
        "Heat energy transferred",
        "Mass"
      ],
      "id": "su1",
      "supersedesIds": [],
      "authorDisposition": "RETAIN",
      "rationale": "Retain the displayed alternatives: they test related concepts, symbolic roles, common calculation errors, or word forms. Independent reviewer should inspect the exact options.",
      "independentReview": "REQUIRED"
    },
    {
      "lessonId": "SCI.SPS7E.SYMBOLS_UNITS",
      "sourceId": "su2",
      "expectedPrompt": "In Q = mcΔT, what does m represent?",
      "expectedChoices": [
        "Mass",
        "Mechanical energy",
        "Minutes"
      ],
      "expectedAnswer": 0,
      "prompt": "In Q = mcΔT, what does m represent?",
      "choices": [
        "Mass",
        "Length in meters",
        "Minutes"
      ],
      "id": "su2.v20261118r2",
      "supersedesIds": [
        "su2"
      ],
      "authorDisposition": "REWRITE",
      "rationale": "Uses common symbol/unit confusions rather than an unrelated energy form.",
      "independentReview": "REQUIRED"
    },
    {
      "lessonId": "SCI.SPS7E.SYMBOLS_UNITS",
      "sourceId": "su3",
      "expectedPrompt": "In Q = mcΔT, what does ΔT represent?",
      "expectedChoices": [
        "Total energy",
        "Time",
        "Temperature change"
      ],
      "expectedAnswer": 2,
      "prompt": "In Q = mcΔT, what does ΔT represent?",
      "choices": [
        "Total energy",
        "Time",
        "Temperature change"
      ],
      "id": "su3",
      "supersedesIds": [],
      "authorDisposition": "RETAIN",
      "rationale": "Retain the displayed alternatives: they test related concepts, symbolic roles, common calculation errors, or word forms. Independent reviewer should inspect the exact options.",
      "independentReview": "REQUIRED"
    },
    {
      "lessonId": "SCI.SPS7E.FORMULA_SETUP",
      "sourceId": "fs1",
      "expectedPrompt": "Which equation matches heat energy, mass, specific heat, and temperature change?",
      "expectedChoices": [
        "Q = m ÷ c ÷ ΔT",
        "Q = m × c × ΔT",
        "Q = m + c + ΔT"
      ],
      "expectedAnswer": 1,
      "prompt": "Which equation matches heat energy, mass, specific heat, and temperature change?",
      "choices": [
        "Q = m ÷ c ÷ ΔT",
        "Q = m × c × ΔT",
        "Q = m + c + ΔT"
      ],
      "id": "fs1",
      "supersedesIds": [],
      "authorDisposition": "RETAIN",
      "rationale": "Retain the displayed alternatives: they test related concepts, symbolic roles, common calculation errors, or word forms. Independent reviewer should inspect the exact options.",
      "independentReview": "REQUIRED"
    },
    {
      "lessonId": "SCI.SPS7E.FORMULA_SETUP",
      "sourceId": "fs2",
      "expectedPrompt": "m = 12 g, c = 0.50, temperature goes 20°C → 30°C. Which setup solves Q?",
      "expectedChoices": [
        "Q = 12 × 0.50 × 10",
        "Q = 12 × 0.50 × 30",
        "Q = 10 ÷ (12 × 0.50)"
      ],
      "expectedAnswer": 0,
      "prompt": "m = 12 g, c = 0.50, temperature goes 20°C → 30°C. Which setup solves Q?",
      "choices": [
        "Q = 12 × 0.50 × 10",
        "Q = 12 × 0.50 × 30",
        "Q = 10 ÷ (12 × 0.50)"
      ],
      "id": "fs2",
      "supersedesIds": [],
      "authorDisposition": "RETAIN",
      "rationale": "Retain the displayed alternatives: they test related concepts, symbolic roles, common calculation errors, or word forms. Independent reviewer should inspect the exact options.",
      "independentReview": "REQUIRED"
    },
    {
      "lessonId": "SCI.SPS7E.FORMULA_SETUP",
      "sourceId": "fs3",
      "expectedPrompt": "m = 8 g, c = 2, initial 15°C, final 25°C. Which three values belong in Q = mcΔT?",
      "expectedChoices": [
        "8, 2, 25",
        "15, 25, 10",
        "8, 2, 10"
      ],
      "expectedAnswer": 2,
      "prompt": "m = 8 g, c = 2, initial 15°C, final 25°C. Which three values belong in Q = mcΔT?",
      "choices": [
        "8, 2, 25",
        "15, 25, 10",
        "8, 2, 10"
      ],
      "id": "fs3",
      "supersedesIds": [],
      "authorDisposition": "RETAIN",
      "rationale": "Retain the displayed alternatives: they test related concepts, symbolic roles, common calculation errors, or word forms. Independent reviewer should inspect the exact options.",
      "independentReview": "REQUIRED"
    },
    {
      "lessonId": "SCI.SPS7E.LITERAL_REARRANGE",
      "sourceId": "lr1",
      "expectedPrompt": "Using Q = m × c × ΔT, solve for c.",
      "expectedChoices": [
        "c = Q ÷ (m × ΔT)",
        "c = Q × m × ΔT",
        "c = m × ΔT ÷ Q"
      ],
      "expectedAnswer": 0,
      "prompt": "Using Q = m × c × ΔT, solve for c.",
      "choices": [
        "c = Q ÷ (m × ΔT)",
        "c = Q × m × ΔT",
        "c = m × ΔT ÷ Q"
      ],
      "id": "lr1",
      "supersedesIds": [],
      "authorDisposition": "RETAIN",
      "rationale": "Retain the displayed alternatives: they test related concepts, symbolic roles, common calculation errors, or word forms. Independent reviewer should inspect the exact options.",
      "independentReview": "REQUIRED"
    },
    {
      "lessonId": "SCI.SPS7E.LITERAL_REARRANGE",
      "sourceId": "lr2",
      "expectedPrompt": "Using Q = m × c × ΔT, solve for m.",
      "expectedChoices": [
        "m = Q × c × ΔT",
        "m = c × ΔT ÷ Q",
        "m = Q ÷ (c × ΔT)"
      ],
      "expectedAnswer": 2,
      "prompt": "Using Q = m × c × ΔT, solve for m.",
      "choices": [
        "m = Q × c × ΔT",
        "m = c × ΔT ÷ Q",
        "m = Q ÷ (c × ΔT)"
      ],
      "id": "lr2",
      "supersedesIds": [],
      "authorDisposition": "RETAIN",
      "rationale": "Retain the displayed alternatives: they test related concepts, symbolic roles, common calculation errors, or word forms. Independent reviewer should inspect the exact options.",
      "independentReview": "REQUIRED"
    },
    {
      "lessonId": "SCI.SPS7E.LITERAL_REARRANGE",
      "sourceId": "lr3",
      "expectedPrompt": "Using Q = m × c × ΔT, solve for ΔT.",
      "expectedChoices": [
        "ΔT = m × c ÷ Q",
        "ΔT = Q ÷ (m × c)",
        "ΔT = Q × m × c"
      ],
      "expectedAnswer": 1,
      "prompt": "Using Q = m × c × ΔT, solve for ΔT.",
      "choices": [
        "ΔT = m × c ÷ Q",
        "ΔT = Q ÷ (m × c)",
        "ΔT = Q × m × c"
      ],
      "id": "lr3",
      "supersedesIds": [],
      "authorDisposition": "RETAIN",
      "rationale": "Retain the displayed alternatives: they test related concepts, symbolic roles, common calculation errors, or word forms. Independent reviewer should inspect the exact options.",
      "independentReview": "REQUIRED"
    },
    {
      "lessonId": "MATH.LITERAL_EQUATIONS",
      "sourceId": "ml1",
      "expectedPrompt": "Solve d = r × t for t.",
      "expectedChoices": [
        "t = r ÷ d",
        "t = d × r",
        "t = d ÷ r"
      ],
      "expectedAnswer": 2,
      "prompt": "Solve d = r × t for t.",
      "choices": [
        "t = r ÷ d",
        "t = d × r",
        "t = d ÷ r"
      ],
      "id": "ml1",
      "supersedesIds": [],
      "authorDisposition": "RETAIN",
      "rationale": "Retain the displayed alternatives: they test related concepts, symbolic roles, common calculation errors, or word forms. Independent reviewer should inspect the exact options.",
      "independentReview": "REQUIRED"
    },
    {
      "lessonId": "MATH.LITERAL_EQUATIONS",
      "sourceId": "ml2",
      "expectedPrompt": "Solve V = I × R for R.",
      "expectedChoices": [
        "R = V × I",
        "R = V ÷ I",
        "R = I ÷ V"
      ],
      "expectedAnswer": 1,
      "prompt": "Solve V = I × R for R.",
      "choices": [
        "R = V × I",
        "R = V ÷ I",
        "R = I ÷ V"
      ],
      "id": "ml2",
      "supersedesIds": [],
      "authorDisposition": "RETAIN",
      "rationale": "Retain the displayed alternatives: they test related concepts, symbolic roles, common calculation errors, or word forms. Independent reviewer should inspect the exact options.",
      "independentReview": "REQUIRED"
    },
    {
      "lessonId": "MATH.LITERAL_EQUATIONS",
      "sourceId": "ml3",
      "expectedPrompt": "Solve y = mx + b for x.",
      "expectedChoices": [
        "x = (y − b) ÷ m",
        "x = (y + b) ÷ m",
        "x = y − (b ÷ m)"
      ],
      "expectedAnswer": 0,
      "prompt": "Solve y = mx + b for x.",
      "choices": [
        "x = (y − b) ÷ m",
        "x = (y + b) ÷ m",
        "x = y − (b ÷ m)"
      ],
      "id": "ml3",
      "supersedesIds": [],
      "authorDisposition": "RETAIN",
      "rationale": "Retain the displayed alternatives: they test related concepts, symbolic roles, common calculation errors, or word forms. Independent reviewer should inspect the exact options.",
      "independentReview": "REQUIRED"
    },
    {
      "lessonId": "MATH.SCHOOL.FUNCTION",
      "sourceId": "FUNCTION-0",
      "expectedPrompt": "For y = 3x + 2, input x = 2 gives which output?",
      "expectedChoices": [
        "12",
        "8",
        "7"
      ],
      "expectedAnswer": 1,
      "prompt": "For y = 3x + 2, input x = 2 gives which output?",
      "choices": [
        "12",
        "8",
        "7"
      ],
      "id": "FUNCTION-0",
      "supersedesIds": [],
      "authorDisposition": "RETAIN",
      "rationale": "Retain the displayed alternatives: they test related concepts, symbolic roles, common calculation errors, or word forms. Independent reviewer should inspect the exact options.",
      "independentReview": "REQUIRED"
    },
    {
      "lessonId": "MATH.SCHOOL.FUNCTION",
      "sourceId": "FUNCTION-1",
      "expectedPrompt": "Which set fails the function rule?",
      "expectedChoices": [
        "(2,5), (2,9)",
        "(2,5), (3,5)",
        "(0,1), (1,3)"
      ],
      "expectedAnswer": 0,
      "prompt": "Which set fails the function rule?",
      "choices": [
        "(2,5), (2,9)",
        "(2,5), (3,5)",
        "(0,1), (1,3)"
      ],
      "id": "FUNCTION-1",
      "supersedesIds": [],
      "authorDisposition": "RETAIN",
      "rationale": "Retain the displayed alternatives: they test related concepts, symbolic roles, common calculation errors, or word forms. Independent reviewer should inspect the exact options.",
      "independentReview": "REQUIRED"
    },
    {
      "lessonId": "MATH.SCHOOL.FUNCTION",
      "sourceId": "FUNCTION-2",
      "expectedPrompt": "Can two different inputs in a function have the same output?",
      "expectedChoices": [
        "No, every output must be unique",
        "Only if both inputs are zero",
        "Yes, if each input still has only one output"
      ],
      "expectedAnswer": 2,
      "prompt": "Can two different inputs in a function have the same output?",
      "choices": [
        "No, every output must be unique",
        "Only if the shared output is zero",
        "Yes, if each input still has only one output"
      ],
      "id": "FUNCTION-2.v20261118r2",
      "supersedesIds": [
        "FUNCTION-2"
      ],
      "authorDisposition": "REWRITE",
      "rationale": "Confuses a function with a one-to-one function or treats zero as a special exception.",
      "independentReview": "REQUIRED"
    },
    {
      "lessonId": "MATH.SCHOOL.FUNCTION",
      "sourceId": "FUNCTION-3",
      "expectedPrompt": "A vertical line crosses a graph twice. What does that show?",
      "expectedChoices": [
        "The graph must be proportional",
        "One input has two outputs, so it is not a function",
        "The slope must be zero"
      ],
      "expectedAnswer": 1,
      "prompt": "A vertical line crosses a graph twice. What does that show?",
      "choices": [
        "The graph must be proportional",
        "One input has two outputs, so it is not a function",
        "The slope must be zero"
      ],
      "id": "FUNCTION-3",
      "supersedesIds": [],
      "authorDisposition": "RETAIN",
      "rationale": "Retain the displayed alternatives: they test related concepts, symbolic roles, common calculation errors, or word forms. Independent reviewer should inspect the exact options.",
      "independentReview": "REQUIRED"
    },
    {
      "lessonId": "MATH.SCHOOL.DOMAIN_RANGE",
      "sourceId": "DOMAIN_RANGE-0",
      "expectedPrompt": "For (0,2), (2,6), (3,6), what is the domain?",
      "expectedChoices": [
        "{0,2,3}",
        "{2,6}",
        "{0,2,3,6}"
      ],
      "expectedAnswer": 0,
      "prompt": "For (0,2), (2,6), (3,6), what is the domain?",
      "choices": [
        "{0,2,3}",
        "{2,6}",
        "{0,2,3,6}"
      ],
      "id": "DOMAIN_RANGE-0",
      "supersedesIds": [],
      "authorDisposition": "RETAIN",
      "rationale": "Retain the displayed alternatives: they test related concepts, symbolic roles, common calculation errors, or word forms. Independent reviewer should inspect the exact options.",
      "independentReview": "REQUIRED"
    },
    {
      "lessonId": "MATH.SCHOOL.DOMAIN_RANGE",
      "sourceId": "DOMAIN_RANGE-1",
      "expectedPrompt": "For (0,2), (2,6), (3,6), what is the range?",
      "expectedChoices": [
        "{0,2,3}",
        "{2,6,6}",
        "{2,6}"
      ],
      "expectedAnswer": 2,
      "prompt": "For (0,2), (2,6), (3,6), what is the range?",
      "choices": [
        "{0,2,3}",
        "{2,6,6}",
        "{2,6}"
      ],
      "id": "DOMAIN_RANGE-1",
      "supersedesIds": [],
      "authorDisposition": "RETAIN",
      "rationale": "Retain the displayed alternatives: they test related concepts, symbolic roles, common calculation errors, or word forms. Independent reviewer should inspect the exact options.",
      "independentReview": "REQUIRED"
    },
    {
      "lessonId": "MATH.SCHOOL.DOMAIN_RANGE",
      "sourceId": "DOMAIN_RANGE-2",
      "expectedPrompt": "A filled line segment runs from (1,4) to (5,12). Which describes its domain?",
      "expectedChoices": [
        "All real x without limits",
        "All real x from 1 through 5",
        "Only {1,5}"
      ],
      "expectedAnswer": 1,
      "prompt": "A filled line segment runs from (1,4) to (5,12). Which describes its domain?",
      "choices": [
        "All real x without limits",
        "All real x from 1 through 5",
        "Only {1,5}"
      ],
      "id": "DOMAIN_RANGE-2",
      "supersedesIds": [],
      "authorDisposition": "RETAIN",
      "rationale": "Retain the displayed alternatives: they test related concepts, symbolic roles, common calculation errors, or word forms. Independent reviewer should inspect the exact options.",
      "independentReview": "REQUIRED"
    },
    {
      "lessonId": "MATH.SCHOOL.DOMAIN_RANGE",
      "sourceId": "DOMAIN_RANGE-3",
      "expectedPrompt": "An endpoint at x = 3 is open. Is 3 included at that end?",
      "expectedChoices": [
        "No",
        "Yes",
        "Only if y is positive"
      ],
      "expectedAnswer": 0,
      "prompt": "An endpoint at x = 3 is open. Is 3 included at that end?",
      "choices": [
        "No",
        "Yes",
        "Only for a discrete domain"
      ],
      "id": "DOMAIN_RANGE-3.v20261118r2",
      "supersedesIds": [
        "DOMAIN_RANGE-3"
      ],
      "authorDisposition": "REWRITE",
      "rationale": "Confuses open with closed endpoints or assumes the rule depends on domain type.",
      "independentReview": "REQUIRED"
    },
    {
      "lessonId": "MATH.SCHOOL.LINEAR",
      "sourceId": "LINEAR-0",
      "expectedPrompt": "A table changes from (1,5) to (3,9). What is Δy/Δx?",
      "expectedChoices": [
        "2",
        "4",
        "1/2"
      ],
      "expectedAnswer": 0,
      "prompt": "A table changes from (1,5) to (3,9). What is Δy/Δx?",
      "choices": [
        "2",
        "4",
        "1/2"
      ],
      "id": "LINEAR-0",
      "supersedesIds": [],
      "authorDisposition": "RETAIN",
      "rationale": "Retain the displayed alternatives: they test related concepts, symbolic roles, common calculation errors, or word forms. Independent reviewer should inspect the exact options.",
      "independentReview": "REQUIRED"
    },
    {
      "lessonId": "MATH.SCHOOL.LINEAR",
      "sourceId": "LINEAR-1",
      "expectedPrompt": "Which rule describes a proportional relationship?",
      "expectedChoices": [
        "y = 4x + 2",
        "y = x²",
        "y = 4x"
      ],
      "expectedAnswer": 2,
      "prompt": "Which rule describes a proportional relationship?",
      "choices": [
        "y = 4x + 2",
        "y = x²",
        "y = 4x"
      ],
      "id": "LINEAR-1",
      "supersedesIds": [],
      "authorDisposition": "RETAIN",
      "rationale": "Retain the displayed alternatives: they test related concepts, symbolic roles, common calculation errors, or word forms. Independent reviewer should inspect the exact options.",
      "independentReview": "REQUIRED"
    },
    {
      "lessonId": "MATH.SCHOOL.LINEAR",
      "sourceId": "LINEAR-2",
      "expectedPrompt": "x values are 0,1,2 and y values are 2,5,8. Is it linear and proportional?",
      "expectedChoices": [
        "Neither linear nor proportional",
        "Linear, but not proportional",
        "Both linear and proportional"
      ],
      "expectedAnswer": 1,
      "prompt": "x values are 0,1,2 and y values are 2,5,8. Is it linear and proportional?",
      "choices": [
        "Neither linear nor proportional",
        "Linear, but not proportional",
        "Both linear and proportional"
      ],
      "id": "LINEAR-2",
      "supersedesIds": [],
      "authorDisposition": "RETAIN",
      "rationale": "Retain the displayed alternatives: they test related concepts, symbolic roles, common calculation errors, or word forms. Independent reviewer should inspect the exact options.",
      "independentReview": "REQUIRED"
    },
    {
      "lessonId": "MATH.SCHOOL.LINEAR",
      "sourceId": "LINEAR-3",
      "expectedPrompt": "Why compare Δy/Δx instead of Δy alone?",
      "expectedChoices": [
        "Input intervals may have different sizes",
        "Outputs never matter",
        "The y-intercept is always zero"
      ],
      "expectedAnswer": 0,
      "prompt": "Why compare Δy/Δx instead of Δy alone?",
      "choices": [
        "Input intervals may have different sizes",
        "Equal-looking output changes always mean equal rates",
        "The ratio y/x always gives slope, even with a nonzero intercept"
      ],
      "id": "LINEAR-3.v20261118r2",
      "supersedesIds": [
        "LINEAR-3"
      ],
      "authorDisposition": "REWRITE",
      "rationale": "Ignores unequal input intervals or confuses proportional rate with slope.",
      "independentReview": "REQUIRED"
    },
    {
      "lessonId": "MATH.SCHOOL.SLOPE",
      "sourceId": "SLOPE-0",
      "expectedPrompt": "Find slope between (0,2) and (3,8).",
      "expectedChoices": [
        "1/2",
        "2",
        "6"
      ],
      "expectedAnswer": 1,
      "prompt": "Find slope between (0,2) and (3,8).",
      "choices": [
        "1/2",
        "2",
        "6"
      ],
      "id": "SLOPE-0",
      "supersedesIds": [],
      "authorDisposition": "RETAIN",
      "rationale": "Retain the displayed alternatives: they test related concepts, symbolic roles, common calculation errors, or word forms. Independent reviewer should inspect the exact options.",
      "independentReview": "REQUIRED"
    },
    {
      "lessonId": "MATH.SCHOOL.SLOPE",
      "sourceId": "SLOPE-1",
      "expectedPrompt": "A line drops 8 units when x increases 4. What is its slope?",
      "expectedChoices": [
        "−2",
        "2",
        "−4"
      ],
      "expectedAnswer": 0,
      "prompt": "A line drops 8 units when x increases 4. What is its slope?",
      "choices": [
        "−2",
        "2",
        "−4"
      ],
      "id": "SLOPE-1",
      "supersedesIds": [],
      "authorDisposition": "RETAIN",
      "rationale": "Retain the displayed alternatives: they test related concepts, symbolic roles, common calculation errors, or word forms. Independent reviewer should inspect the exact options.",
      "independentReview": "REQUIRED"
    },
    {
      "lessonId": "MATH.SCHOOL.SLOPE",
      "sourceId": "SLOPE-2",
      "expectedPrompt": "What is the slope of a vertical line?",
      "expectedChoices": [
        "0",
        "1",
        "Undefined"
      ],
      "expectedAnswer": 2,
      "prompt": "What is the slope of a vertical line?",
      "choices": [
        "0",
        "1",
        "Undefined"
      ],
      "id": "SLOPE-2",
      "supersedesIds": [],
      "authorDisposition": "RETAIN",
      "rationale": "Retain the displayed alternatives: they test related concepts, symbolic roles, common calculation errors, or word forms. Independent reviewer should inspect the exact options.",
      "independentReview": "REQUIRED"
    },
    {
      "lessonId": "MATH.SCHOOL.SLOPE",
      "sourceId": "SLOPE-3",
      "expectedPrompt": "A tank loses 5 liters each minute. What does m = −5 mean?",
      "expectedChoices": [
        "The starting volume is −5 liters",
        "Volume decreases 5 liters per minute",
        "Time decreases 5 minutes per liter"
      ],
      "expectedAnswer": 1,
      "prompt": "A tank loses 5 liters each minute. What does m = −5 mean?",
      "choices": [
        "The starting volume is −5 liters",
        "Volume decreases 5 liters per minute",
        "Time decreases 5 minutes per liter"
      ],
      "id": "SLOPE-3",
      "supersedesIds": [],
      "authorDisposition": "RETAIN",
      "rationale": "Retain the displayed alternatives: they test related concepts, symbolic roles, common calculation errors, or word forms. Independent reviewer should inspect the exact options.",
      "independentReview": "REQUIRED"
    },
    {
      "lessonId": "MATH.SCHOOL.INTERCEPT",
      "sourceId": "INTERCEPT-0",
      "expectedPrompt": "In y = 4x + 7, what is the y-intercept?",
      "expectedChoices": [
        "(0,7)",
        "(7,0)",
        "(0,4)"
      ],
      "expectedAnswer": 0,
      "prompt": "In y = 4x + 7, what is the y-intercept?",
      "choices": [
        "(0,7)",
        "(7,0)",
        "(0,4)"
      ],
      "id": "INTERCEPT-0",
      "supersedesIds": [],
      "authorDisposition": "RETAIN",
      "rationale": "Retain the displayed alternatives: they test related concepts, symbolic roles, common calculation errors, or word forms. Independent reviewer should inspect the exact options.",
      "independentReview": "REQUIRED"
    },
    {
      "lessonId": "MATH.SCHOOL.INTERCEPT",
      "sourceId": "INTERCEPT-1",
      "expectedPrompt": "A line has slope 2 and passes through (3,10). Find b.",
      "expectedChoices": [
        "10",
        "16",
        "4"
      ],
      "expectedAnswer": 2,
      "prompt": "A line has slope 2 and passes through (3,10). Find b.",
      "choices": [
        "10",
        "16",
        "4"
      ],
      "id": "INTERCEPT-1",
      "supersedesIds": [],
      "authorDisposition": "RETAIN",
      "rationale": "Retain the displayed alternatives: they test related concepts, symbolic roles, common calculation errors, or word forms. Independent reviewer should inspect the exact options.",
      "independentReview": "REQUIRED"
    },
    {
      "lessonId": "MATH.SCHOOL.INTERCEPT",
      "sourceId": "INTERCEPT-2",
      "expectedPrompt": "Why is the first listed y value not always b?",
      "expectedChoices": [
        "A table can never show b",
        "The table may not start at x = 0",
        "b must be the largest y value"
      ],
      "expectedAnswer": 1,
      "prompt": "Why is the first listed y value not always b?",
      "choices": [
        "The first row always gives b regardless of x",
        "The table may not start at x = 0",
        "The largest listed output is the starting value"
      ],
      "id": "INTERCEPT-2.v20261118r2",
      "supersedesIds": [
        "INTERCEPT-2"
      ],
      "authorDisposition": "REWRITE",
      "rationale": "Confuses first listed or highest output with output at x=0.",
      "independentReview": "REQUIRED"
    },
    {
      "lessonId": "MATH.SCHOOL.INTERCEPT",
      "sourceId": "INTERCEPT-3",
      "expectedPrompt": "Savings follow y = 6x + 20, with x weeks. What does 20 mean?",
      "expectedChoices": [
        "$20 saved at week zero",
        "$20 added each week",
        "20 weeks of saving"
      ],
      "expectedAnswer": 0,
      "prompt": "Savings follow y = 6x + 20, with x weeks. What does 20 mean?",
      "choices": [
        "$20 saved at week zero",
        "$20 added each week",
        "20 weeks of saving"
      ],
      "id": "INTERCEPT-3",
      "supersedesIds": [],
      "authorDisposition": "RETAIN",
      "rationale": "Retain the displayed alternatives: they test related concepts, symbolic roles, common calculation errors, or word forms. Independent reviewer should inspect the exact options.",
      "independentReview": "REQUIRED"
    },
    {
      "lessonId": "MATH.SCHOOL.EQUATION",
      "sourceId": "EQUATION-0",
      "expectedPrompt": "A table includes (0,5), (1,8), (2,11). Which rule fits?",
      "expectedChoices": [
        "y = 3x",
        "y = 3x + 5",
        "y = 5x + 3"
      ],
      "expectedAnswer": 1,
      "prompt": "A table includes (0,5), (1,8), (2,11). Which rule fits?",
      "choices": [
        "y = 3x",
        "y = 3x + 5",
        "y = 5x + 3"
      ],
      "id": "EQUATION-0",
      "supersedesIds": [],
      "authorDisposition": "RETAIN",
      "rationale": "Retain the displayed alternatives: they test related concepts, symbolic roles, common calculation errors, or word forms. Independent reviewer should inspect the exact options.",
      "independentReview": "REQUIRED"
    },
    {
      "lessonId": "MATH.SCHOOL.EQUATION",
      "sourceId": "EQUATION-1",
      "expectedPrompt": "A line has slope −2 and intercept (0,9). Which rule fits?",
      "expectedChoices": [
        "y = −2x + 9",
        "y = 9x − 2",
        "y = 2x + 9"
      ],
      "expectedAnswer": 0,
      "prompt": "A line has slope −2 and intercept (0,9). Which rule fits?",
      "choices": [
        "y = −2x + 9",
        "y = 9x − 2",
        "y = 2x + 9"
      ],
      "id": "EQUATION-1",
      "supersedesIds": [],
      "authorDisposition": "RETAIN",
      "rationale": "Retain the displayed alternatives: they test related concepts, symbolic roles, common calculation errors, or word forms. Independent reviewer should inspect the exact options.",
      "independentReview": "REQUIRED"
    },
    {
      "lessonId": "MATH.SCHOOL.EQUATION",
      "sourceId": "EQUATION-2",
      "expectedPrompt": "A rule fits one data point. Is it verified for the whole table?",
      "expectedChoices": [
        "Yes, one match proves it",
        "Only if the point has positive coordinates",
        "No; test other points and rates"
      ],
      "expectedAnswer": 2,
      "prompt": "A rule fits one data point. Is it verified for the whole table?",
      "choices": [
        "Yes, one match proves it",
        "Yes, if the matching point has x = 0",
        "No; test other points and rates"
      ],
      "id": "EQUATION-2.v20261118r2",
      "supersedesIds": [
        "EQUATION-2"
      ],
      "authorDisposition": "REWRITE",
      "rationale": "Checks one ordinary point or just the intercept instead of the whole relationship.",
      "independentReview": "REQUIRED"
    },
    {
      "lessonId": "MATH.SCHOOL.EQUATION",
      "sourceId": "EQUATION-3",
      "expectedPrompt": "For y = 2x − 1, which point lies on the line?",
      "expectedChoices": [
        "(7,4)",
        "(4,7)",
        "(4,9)"
      ],
      "expectedAnswer": 1,
      "prompt": "For y = 2x − 1, which point lies on the line?",
      "choices": [
        "(7,4)",
        "(4,7)",
        "(4,9)"
      ],
      "id": "EQUATION-3",
      "supersedesIds": [],
      "authorDisposition": "RETAIN",
      "rationale": "Retain the displayed alternatives: they test related concepts, symbolic roles, common calculation errors, or word forms. Independent reviewer should inspect the exact options.",
      "independentReview": "REQUIRED"
    },
    {
      "lessonId": "MATH.SCHOOL.GRAPH",
      "sourceId": "GRAPH-0",
      "expectedPrompt": "Where do you start when graphing y = 2x − 3?",
      "expectedChoices": [
        "(0,2)",
        "(0,−3)",
        "(−3,0)"
      ],
      "expectedAnswer": 1,
      "prompt": "Where do you start when graphing y = 2x − 3?",
      "choices": [
        "(0,2)",
        "(0,−3)",
        "(−3,0)"
      ],
      "id": "GRAPH-0",
      "supersedesIds": [],
      "authorDisposition": "RETAIN",
      "rationale": "Retain the displayed alternatives: they test related concepts, symbolic roles, common calculation errors, or word forms. Independent reviewer should inspect the exact options.",
      "independentReview": "REQUIRED"
    },
    {
      "lessonId": "MATH.SCHOOL.GRAPH",
      "sourceId": "GRAPH-1",
      "expectedPrompt": "Slope is −2/3. From a point, which move works?",
      "expectedChoices": [
        "Right 3, down 2",
        "Right 2, down 3",
        "Right 3, up 2"
      ],
      "expectedAnswer": 0,
      "prompt": "Slope is −2/3. From a point, which move works?",
      "choices": [
        "Right 3, down 2",
        "Right 2, down 3",
        "Right 3, up 2"
      ],
      "id": "GRAPH-1",
      "supersedesIds": [],
      "authorDisposition": "RETAIN",
      "rationale": "Retain the displayed alternatives: they test related concepts, symbolic roles, common calculation errors, or word forms. Independent reviewer should inspect the exact options.",
      "independentReview": "REQUIRED"
    },
    {
      "lessonId": "MATH.SCHOOL.GRAPH",
      "sourceId": "GRAPH-2",
      "expectedPrompt": "Which point belongs to y = −x + 4?",
      "expectedChoices": [
        "(3,7)",
        "(1,3.5)",
        "(3,1)"
      ],
      "expectedAnswer": 2,
      "prompt": "Which point belongs to y = −x + 4?",
      "choices": [
        "(3,7)",
        "(1,3.5)",
        "(3,1)"
      ],
      "id": "GRAPH-2",
      "supersedesIds": [],
      "authorDisposition": "RETAIN",
      "rationale": "Retain the displayed alternatives: they test related concepts, symbolic roles, common calculation errors, or word forms. Independent reviewer should inspect the exact options.",
      "independentReview": "REQUIRED"
    },
    {
      "lessonId": "MATH.SCHOOL.GRAPH",
      "sourceId": "GRAPH-3",
      "expectedPrompt": "A graph counts whole tickets sold. Should it automatically include fractional ticket inputs?",
      "expectedChoices": [
        "Only at negative x values",
        "No; the domain should use whole ticket counts",
        "Yes; every linear context uses all real x"
      ],
      "expectedAnswer": 1,
      "prompt": "A graph counts whole tickets sold. Should it automatically include fractional ticket inputs?",
      "choices": [
        "Only if the graph is drawn as a continuous line",
        "No; the domain should use whole ticket counts",
        "Yes; every linear context uses all real x"
      ],
      "id": "GRAPH-3.v20261118r2",
      "supersedesIds": [
        "GRAPH-3"
      ],
      "authorDisposition": "REWRITE",
      "rationale": "Lets the drawing or algebraic form override the contextual domain.",
      "independentReview": "REQUIRED"
    },
    {
      "lessonId": "MATH.SCHOOL.CONTEXT",
      "sourceId": "CONTEXT-0",
      "expectedPrompt": "A ride costs $5 initially plus $2 per mile x. Which model fits?",
      "expectedChoices": [
        "y = 5x + 2",
        "y = 7x",
        "y = 2x + 5"
      ],
      "expectedAnswer": 2,
      "prompt": "A ride costs $5 initially plus $2 per mile x. Which model fits?",
      "choices": [
        "y = 5x + 2",
        "y = 7x",
        "y = 2x + 5"
      ],
      "id": "CONTEXT-0",
      "supersedesIds": [],
      "authorDisposition": "RETAIN",
      "rationale": "Retain the displayed alternatives: they test related concepts, symbolic roles, common calculation errors, or word forms. Independent reviewer should inspect the exact options.",
      "independentReview": "REQUIRED"
    },
    {
      "lessonId": "MATH.SCHOOL.CONTEXT",
      "sourceId": "CONTEXT-1",
      "expectedPrompt": "A balance starts at 40 and falls 6 each week. Which slope fits?",
      "expectedChoices": [
        "40",
        "−6",
        "6"
      ],
      "expectedAnswer": 1,
      "prompt": "A balance starts at 40 and falls 6 each week. Which slope fits?",
      "choices": [
        "40",
        "−6",
        "6"
      ],
      "id": "CONTEXT-1",
      "supersedesIds": [],
      "authorDisposition": "RETAIN",
      "rationale": "Retain the displayed alternatives: they test related concepts, symbolic roles, common calculation errors, or word forms. Independent reviewer should inspect the exact options.",
      "independentReview": "REQUIRED"
    },
    {
      "lessonId": "MATH.SCHOOL.CONTEXT",
      "sourceId": "CONTEXT-2",
      "expectedPrompt": "For y = 3x + 8 dollars, what are the units of slope if x is hours?",
      "expectedChoices": [
        "Dollars per hour",
        "Hours per dollar",
        "Dollars only"
      ],
      "expectedAnswer": 0,
      "prompt": "For y = 3x + 8 dollars, what are the units of slope if x is hours?",
      "choices": [
        "Dollars per hour",
        "Hours per dollar",
        "Dollars only"
      ],
      "id": "CONTEXT-2",
      "supersedesIds": [],
      "authorDisposition": "RETAIN",
      "rationale": "Retain the displayed alternatives: they test related concepts, symbolic roles, common calculation errors, or word forms. Independent reviewer should inspect the exact options.",
      "independentReview": "REQUIRED"
    },
    {
      "lessonId": "MATH.SCHOOL.CONTEXT",
      "sourceId": "CONTEXT-3",
      "expectedPrompt": "A fixed-rate model predicts a negative amount of water after the tank empties. What should change?",
      "expectedChoices": [
        "Accept negative physical water",
        "Change the graph label only",
        "Restrict the model to meaningful times"
      ],
      "expectedAnswer": 2,
      "prompt": "A fixed-rate model predicts a negative amount of water after the tank empties. What should change?",
      "choices": [
        "Keep the rule valid for every future time",
        "Replace negative outputs by their absolute values",
        "Restrict the model to meaningful times"
      ],
      "id": "CONTEXT-3.v20261118r2",
      "supersedesIds": [
        "CONTEXT-3"
      ],
      "authorDisposition": "REWRITE",
      "rationale": "Extrapolates beyond the model’s domain or alters outputs instead of restricting the model.",
      "independentReview": "REQUIRED"
    },
    {
      "lessonId": "MATH.SCHOOL.CONTEXT_DOMAIN",
      "sourceId": "CONTEXT_DOMAIN-0",
      "expectedPrompt": "V = 20 − 4t models draining from full to empty. What time domain fits?",
      "expectedChoices": [
        "0 ≤ t ≤ 20",
        "0 ≤ t ≤ 5",
        "All real t"
      ],
      "expectedAnswer": 1,
      "prompt": "V = 20 − 4t models draining from full to empty. What time domain fits?",
      "choices": [
        "0 ≤ t ≤ 20",
        "0 ≤ t ≤ 5",
        "All real t"
      ],
      "id": "CONTEXT_DOMAIN-0",
      "supersedesIds": [],
      "authorDisposition": "RETAIN",
      "rationale": "Retain the displayed alternatives: they test related concepts, symbolic roles, common calculation errors, or word forms. Independent reviewer should inspect the exact options.",
      "independentReview": "REQUIRED"
    },
    {
      "lessonId": "MATH.SCHOOL.CONTEXT_DOMAIN",
      "sourceId": "CONTEXT_DOMAIN-1",
      "expectedPrompt": "With $5 tickets and at most 2, including zero tickets, what is the range?",
      "expectedChoices": [
        "{0,5,10}",
        "Every real value from 0 to 10",
        "{0,1,2}"
      ],
      "expectedAnswer": 0,
      "prompt": "With $5 tickets and at most 2, including zero tickets, what is the range?",
      "choices": [
        "{0,5,10}",
        "Every real value from 0 to 10",
        "{0,1,2}"
      ],
      "id": "CONTEXT_DOMAIN-1",
      "supersedesIds": [],
      "authorDisposition": "RETAIN",
      "rationale": "Retain the displayed alternatives: they test related concepts, symbolic roles, common calculation errors, or word forms. Independent reviewer should inspect the exact options.",
      "independentReview": "REQUIRED"
    },
    {
      "lessonId": "MATH.SCHOOL.CONTEXT_DOMAIN",
      "sourceId": "CONTEXT_DOMAIN-2",
      "expectedPrompt": "y = −2x + 12 for 1 ≤ x ≤ 4. What is the range?",
      "expectedChoices": [
        "1 ≤ y ≤ 4",
        "10 ≤ y ≤ 4",
        "4 ≤ y ≤ 10"
      ],
      "expectedAnswer": 2,
      "prompt": "y = −2x + 12 for 1 ≤ x ≤ 4. What is the range?",
      "choices": [
        "1 ≤ y ≤ 4",
        "10 ≤ y ≤ 4",
        "4 ≤ y ≤ 10"
      ],
      "id": "CONTEXT_DOMAIN-2",
      "supersedesIds": [],
      "authorDisposition": "RETAIN",
      "rationale": "Retain the displayed alternatives: they test related concepts, symbolic roles, common calculation errors, or word forms. Independent reviewer should inspect the exact options.",
      "independentReview": "REQUIRED"
    },
    {
      "lessonId": "MATH.SCHOOL.CONTEXT_DOMAIN",
      "sourceId": "CONTEXT_DOMAIN-3",
      "expectedPrompt": "Why can a linear situation use isolated dots instead of a continuous line?",
      "expectedChoices": [
        "The y-intercept is missing",
        "Only whole-number input values may be allowed",
        "A linear relationship has no slope"
      ],
      "expectedAnswer": 1,
      "prompt": "Why can a linear situation use isolated dots instead of a continuous line?",
      "choices": [
        "The y-intercept is missing",
        "Only whole-number input values may be allowed",
        "A constant rate forces every intermediate input to be allowed"
      ],
      "id": "CONTEXT_DOMAIN-3.v20261118r2",
      "supersedesIds": [
        "CONTEXT_DOMAIN-3"
      ],
      "authorDisposition": "REWRITE",
      "rationale": "Confuses intercept presence or linearity with discrete input constraints.",
      "independentReview": "REQUIRED"
    },
    {
      "lessonId": "MATH.SCHOOL.QUALITATIVE",
      "sourceId": "QUALITATIVE-0",
      "expectedPrompt": "A distance-from-home graph falls as time increases. What can you infer?",
      "expectedChoices": [
        "Time runs backward",
        "Distance from home is decreasing",
        "The road goes downhill"
      ],
      "expectedAnswer": 1,
      "prompt": "A distance-from-home graph falls as time increases. What can you infer?",
      "choices": [
        "The traveler is slowing down throughout the interval",
        "Distance from home is decreasing",
        "The road goes downhill"
      ],
      "id": "QUALITATIVE-0.v20261118r2",
      "supersedesIds": [
        "QUALITATIVE-0"
      ],
      "authorDisposition": "REWRITE",
      "rationale": "Confuses position change with speed change or reads the graph as a route picture.",
      "independentReview": "REQUIRED"
    },
    {
      "lessonId": "MATH.SCHOOL.QUALITATIVE",
      "sourceId": "QUALITATIVE-1",
      "expectedPrompt": "On a straight-route distance-time model, a horizontal segment most naturally represents…",
      "expectedChoices": [
        "A stop",
        "Faster travel away",
        "A jump in time"
      ],
      "expectedAnswer": 0,
      "prompt": "On a straight-route distance-time model, a horizontal segment most naturally represents…",
      "choices": [
        "A stop",
        "Travel at a constant nonzero speed",
        "Acceleration away from home"
      ],
      "id": "QUALITATIVE-1.v20261118r2",
      "supersedesIds": [
        "QUALITATIVE-1"
      ],
      "authorDisposition": "REWRITE",
      "rationale": "Confuses a horizontal position/distance graph with velocity or acceleration.",
      "independentReview": "REQUIRED"
    },
    {
      "lessonId": "MATH.SCHOOL.QUALITATIVE",
      "sourceId": "QUALITATIVE-2",
      "expectedPrompt": "Two rising straight segments have different steepness on the same axes. Which has greater rate?",
      "expectedChoices": [
        "The higher starting one in every case",
        "They must have equal rate",
        "The steeper one"
      ],
      "expectedAnswer": 2,
      "prompt": "Two rising straight segments have different steepness on the same axes. Which has greater rate?",
      "choices": [
        "The higher starting one in every case",
        "They must have equal rate",
        "The steeper one"
      ],
      "id": "QUALITATIVE-2",
      "supersedesIds": [],
      "authorDisposition": "RETAIN",
      "rationale": "Retain the displayed alternatives: they test related concepts, symbolic roles, common calculation errors, or word forms. Independent reviewer should inspect the exact options.",
      "independentReview": "REQUIRED"
    },
    {
      "lessonId": "MATH.SCHOOL.QUALITATIVE",
      "sourceId": "QUALITATIVE-3",
      "expectedPrompt": "Does a graph with negative slope necessarily show negative physical speed?",
      "expectedChoices": [
        "Only when the intercept is zero",
        "No; its output quantity may be decreasing",
        "Yes; speed is always slope of every graph"
      ],
      "expectedAnswer": 1,
      "prompt": "Does a graph with negative slope necessarily show negative physical speed?",
      "choices": [
        "Only if the graph crosses below the horizontal axis",
        "No; its output quantity may be decreasing",
        "Yes; speed is always slope of every graph"
      ],
      "id": "QUALITATIVE-3.v20261118r2",
      "supersedesIds": [
        "QUALITATIVE-3"
      ],
      "authorDisposition": "REWRITE",
      "rationale": "Confuses negative output, slope, velocity and nonnegative physical speed.",
      "independentReview": "REQUIRED"
    },
    {
      "lessonId": "ELA.ODYSSEUS.READ",
      "sourceId": "READ-0",
      "expectedPrompt": "What makes a retelling an adaptation?",
      "expectedChoices": [
        "It removes the need to read the assigned version",
        "It reshapes an existing story for an audience",
        "It must repeat every original word"
      ],
      "expectedAnswer": 1,
      "prompt": "What makes a retelling an adaptation?",
      "choices": [
        "It tells an entirely new story with no earlier source",
        "It reshapes an existing story for an audience",
        "It changes only the title while preserving every word"
      ],
      "id": "READ-0.v20261118r2",
      "supersedesIds": [
        "READ-0"
      ],
      "authorDisposition": "REWRITE",
      "rationale": "Distinguishes adaptation from an original story or a retitling.",
      "independentReview": "REQUIRED"
    },
    {
      "lessonId": "ELA.ODYSSEUS.READ",
      "sourceId": "READ-1",
      "expectedPrompt": "Why might oral versions of a story differ?",
      "expectedChoices": [
        "Different tellers can emphasize or alter details",
        "Stories are copied from one book",
        "Listeners memorize every line"
      ],
      "expectedAnswer": 0,
      "prompt": "Why might oral versions of a story differ?",
      "choices": [
        "Different tellers can emphasize or alter details",
        "Stories are copied from one book",
        "Listeners memorize every line"
      ],
      "id": "READ-1",
      "supersedesIds": [],
      "authorDisposition": "RETAIN",
      "rationale": "Retain the displayed alternatives: they test related concepts, symbolic roles, common calculation errors, or word forms. Independent reviewer should inspect the exact options.",
      "independentReview": "REQUIRED"
    },
    {
      "lessonId": "ELA.ODYSSEUS.READ",
      "sourceId": "READ-2",
      "expectedPrompt": "Which note best helps trace a hero’s journey?",
      "expectedChoices": [
        "Setting → page count → title",
        "Words → definitions → spelling",
        "Goal → obstacle → choice → consequence"
      ],
      "expectedAnswer": 2,
      "prompt": "Which note best helps trace a hero’s journey?",
      "choices": [
        "Events in order without noting the hero’s choices",
        "A list of the hero’s traits without their consequences",
        "Goal → obstacle → choice → consequence"
      ],
      "id": "READ-2.v20261118r2",
      "supersedesIds": [
        "READ-2"
      ],
      "authorDisposition": "REWRITE",
      "rationale": "Contrasts partial notes with a causal goal-obstacle-choice-consequence chain.",
      "independentReview": "REQUIRED"
    },
    {
      "lessonId": "ELA.ODYSSEUS.READ",
      "sourceId": "READ-3",
      "expectedPrompt": "A modern retelling differs from another version. Which evidence should you use for class?",
      "expectedChoices": [
        "A quotation invented to fit the answer",
        "Details from the assigned version",
        "A remembered movie scene without checking"
      ],
      "expectedAnswer": 1,
      "prompt": "A modern retelling differs from another version. Which evidence should you use for class?",
      "choices": [
        "Details from another version because the main plot is similar",
        "Details from the assigned version",
        "A remembered movie scene without checking the assigned version"
      ],
      "id": "READ-3.v20261118r2",
      "supersedesIds": [
        "READ-3"
      ],
      "authorDisposition": "REWRITE",
      "rationale": "Targets version and source verification.",
      "independentReview": "REQUIRED"
    },
    {
      "lessonId": "ELA.ODYSSEUS.VOCAB_ENTRY",
      "sourceId": "VOCAB_ENTRY-0",
      "expectedPrompt": "During lightning, the hikers sought refuge in a sturdy shelter. Refuge means…",
      "expectedChoices": [
        "Protection from danger",
        "A reward given for bravery",
        "A route used to escape quickly"
      ],
      "expectedAnswer": 0,
      "prompt": "During lightning, the hikers sought refuge in a sturdy shelter. Refuge means…",
      "choices": [
        "Protection from danger",
        "A reward given for bravery",
        "A route used to escape quickly"
      ],
      "id": "VOCAB_ENTRY-0",
      "supersedesIds": [],
      "authorDisposition": "RETAIN",
      "rationale": "Retain the displayed alternatives: they test related concepts, symbolic roles, common calculation errors, or word forms. Independent reviewer should inspect the exact options.",
      "independentReview": "REQUIRED"
    },
    {
      "lessonId": "ELA.ODYSSEUS.VOCAB_ENTRY",
      "sourceId": "VOCAB_ENTRY-1",
      "expectedPrompt": "Which use of conquer is figurative?",
      "expectedChoices": [
        "Conquer a neighboring kingdom",
        "Conquer the walled harbor town",
        "Conquer a fear of speaking"
      ],
      "expectedAnswer": 2,
      "prompt": "Which use of conquer is figurative?",
      "choices": [
        "Conquer a neighboring kingdom",
        "Conquer the walled harbor town",
        "Conquer a fear of speaking"
      ],
      "id": "VOCAB_ENTRY-1",
      "supersedesIds": [],
      "authorDisposition": "RETAIN",
      "rationale": "Retain the displayed alternatives: they test related concepts, symbolic roles, common calculation errors, or word forms. Independent reviewer should inspect the exact options.",
      "independentReview": "REQUIRED"
    },
    {
      "lessonId": "ELA.ODYSSEUS.VOCAB_ENTRY",
      "sourceId": "VOCAB_ENTRY-2",
      "expectedPrompt": "Which fact most directly supports describing an object as sacred?",
      "expectedChoices": [
        "It is the largest object there",
        "It is important in religious worship",
        "It is rare and expensive"
      ],
      "expectedAnswer": 1,
      "prompt": "Which fact most directly supports describing an object as sacred?",
      "choices": [
        "It is protected mainly because it is historically old",
        "It is important in religious worship",
        "It is rare and expensive"
      ],
      "id": "VOCAB_ENTRY-2.v20261118r2",
      "supersedesIds": [
        "VOCAB_ENTRY-2"
      ],
      "authorDisposition": "REWRITE",
      "rationale": "Distinguishes religious significance from age and market value.",
      "independentReview": "REQUIRED"
    },
    {
      "lessonId": "ELA.ODYSSEUS.VOCAB_ENTRY",
      "sourceId": "VOCAB_ENTRY-3",
      "expectedPrompt": "Which sentence uses conqueror correctly?",
      "expectedChoices": [
        "The conqueror took control of the territory",
        "They conqueror their worries",
        "The shelter was a conqueror"
      ],
      "expectedAnswer": 0,
      "prompt": "Which sentence uses conqueror correctly?",
      "choices": [
        "The conqueror took control of the territory",
        "They conqueror their worries",
        "The shelter was a conqueror"
      ],
      "id": "VOCAB_ENTRY-3",
      "supersedesIds": [],
      "authorDisposition": "RETAIN",
      "rationale": "Retain the displayed alternatives: they test related concepts, symbolic roles, common calculation errors, or word forms. Independent reviewer should inspect the exact options.",
      "independentReview": "REQUIRED"
    },
    {
      "lessonId": "ELA.ODYSSEUS.VOCAB_CYCLOPS",
      "sourceId": "VOCAB_CYCLOPS-0",
      "expectedPrompt": "A host gives a weary visitor food and a safe place to sleep. Which word fits?",
      "expectedChoices": [
        "Reciprocity",
        "Hospitality",
        "Mortality"
      ],
      "expectedAnswer": 1,
      "prompt": "A host gives a weary visitor food and a safe place to sleep. Which word fits?",
      "choices": [
        "Reciprocity",
        "Hospitality",
        "Mortality"
      ],
      "id": "VOCAB_CYCLOPS-0",
      "supersedesIds": [],
      "authorDisposition": "RETAIN",
      "rationale": "Retain the displayed alternatives: they test related concepts, symbolic roles, common calculation errors, or word forms. Independent reviewer should inspect the exact options.",
      "independentReview": "REQUIRED"
    },
    {
      "lessonId": "ELA.ODYSSEUS.VOCAB_CYCLOPS",
      "sourceId": "VOCAB_CYCLOPS-1",
      "expectedPrompt": "What does immortal mean in a myth?",
      "expectedChoices": [
        "Not subject to death",
        "Extremely unhappy",
        "Unfriendly to travelers"
      ],
      "expectedAnswer": 0,
      "prompt": "What does immortal mean in a myth?",
      "choices": [
        "Not subject to death",
        "Having a very long but limited lifespan",
        "Unable to feel pain or be injured"
      ],
      "id": "VOCAB_CYCLOPS-1.v20261118r2",
      "supersedesIds": [
        "VOCAB_CYCLOPS-1"
      ],
      "authorDisposition": "REWRITE",
      "rationale": "Distinguishes immortality from longevity and invulnerability.",
      "independentReview": "REQUIRED"
    },
    {
      "lessonId": "ELA.ODYSSEUS.VOCAB_CYCLOPS",
      "sourceId": "VOCAB_CYCLOPS-2",
      "expectedPrompt": "Which feeling most clearly fits despair?",
      "expectedChoices": [
        "Brief irritation at a slow line",
        "Excitement about a trip",
        "Believing there is no hope left"
      ],
      "expectedAnswer": 2,
      "prompt": "Which feeling most clearly fits despair?",
      "choices": [
        "Worry about failure while still expecting a solution",
        "Disappointment after a setback with hope of recovery",
        "Believing there is no hope left"
      ],
      "id": "VOCAB_CYCLOPS-2.v20261118r2",
      "supersedesIds": [
        "VOCAB_CYCLOPS-2"
      ],
      "authorDisposition": "REWRITE",
      "rationale": "Contrasts hopelessness with worry and recoverable disappointment.",
      "independentReview": "REQUIRED"
    },
    {
      "lessonId": "ELA.ODYSSEUS.VOCAB_CYCLOPS",
      "sourceId": "VOCAB_CYCLOPS-3",
      "expectedPrompt": "Which sentence uses mortal as a noun?",
      "expectedChoices": [
        "The wound was mortal",
        "The mortal asked the goddess for help",
        "The hero faced mortal danger"
      ],
      "expectedAnswer": 1,
      "prompt": "Which sentence uses mortal as a noun?",
      "choices": [
        "The wound was mortal",
        "The mortal asked the goddess for help",
        "The hero faced mortal danger"
      ],
      "id": "VOCAB_CYCLOPS-3",
      "supersedesIds": [],
      "authorDisposition": "RETAIN",
      "rationale": "Retain the displayed alternatives: they test related concepts, symbolic roles, common calculation errors, or word forms. Independent reviewer should inspect the exact options.",
      "independentReview": "REQUIRED"
    },
    {
      "lessonId": "ELA.ODYSSEUS.VOCAB_WINDS",
      "sourceId": "VOCAB_WINDS-0",
      "expectedPrompt": "Two clubs agree to share equipment with each other. Which idea fits?",
      "expectedChoices": [
        "Reciprocity",
        "Hospitality",
        "Mortality"
      ],
      "expectedAnswer": 0,
      "prompt": "Two clubs agree to share equipment with each other. Which idea fits?",
      "choices": [
        "Reciprocity",
        "Hospitality",
        "Mortality"
      ],
      "id": "VOCAB_WINDS-0",
      "supersedesIds": [],
      "authorDisposition": "RETAIN",
      "rationale": "Retain the displayed alternatives: they test related concepts, symbolic roles, common calculation errors, or word forms. Independent reviewer should inspect the exact options.",
      "independentReview": "REQUIRED"
    },
    {
      "lessonId": "ELA.ODYSSEUS.VOCAB_WINDS",
      "sourceId": "VOCAB_WINDS-1",
      "expectedPrompt": "Which situation most clearly suggests turmoil?",
      "expectedChoices": [
        "A quiet library reading period",
        "A neatly labeled map",
        "Conflicting instructions and a chaotic evacuation"
      ],
      "expectedAnswer": 2,
      "prompt": "Which situation most clearly suggests turmoil?",
      "choices": [
        "A difficult situation handled calmly with clear instructions",
        "A disagreement that has already been settled",
        "Conflicting instructions and a chaotic evacuation"
      ],
      "id": "VOCAB_WINDS-1.v20261118r2",
      "supersedesIds": [
        "VOCAB_WINDS-1"
      ],
      "authorDisposition": "REWRITE",
      "rationale": "Contrasts ongoing disorder with a managed problem or resolved conflict.",
      "independentReview": "REQUIRED"
    },
    {
      "lessonId": "ELA.ODYSSEUS.VOCAB_WINDS",
      "sourceId": "VOCAB_WINDS-2",
      "expectedPrompt": "Which description best fits a sprawling neighborhood?",
      "expectedChoices": [
        "A crowded, noisy room packed tightly with people",
        "Homes spread widely across the surrounding land",
        "One tall apartment tower on a tiny corner lot"
      ],
      "expectedAnswer": 1,
      "prompt": "Which description best fits a sprawling neighborhood?",
      "choices": [
        "A crowded, noisy room packed tightly with people",
        "Homes spread widely across the surrounding land",
        "One tall apartment tower on a tiny corner lot"
      ],
      "id": "VOCAB_WINDS-2",
      "supersedesIds": [],
      "authorDisposition": "RETAIN",
      "rationale": "Retain the displayed alternatives: they test related concepts, symbolic roles, common calculation errors, or word forms. Independent reviewer should inspect the exact options.",
      "independentReview": "REQUIRED"
    },
    {
      "lessonId": "ELA.ODYSSEUS.VOCAB_WINDS",
      "sourceId": "VOCAB_WINDS-3",
      "expectedPrompt": "Choose the correct word form: We hope to ___ their kindness.",
      "expectedChoices": [
        "reciprocate",
        "reciprocal",
        "reciprocity"
      ],
      "expectedAnswer": 0,
      "prompt": "Choose the correct word form: We hope to ___ their kindness.",
      "choices": [
        "reciprocate",
        "reciprocal",
        "reciprocity"
      ],
      "id": "VOCAB_WINDS-3",
      "supersedesIds": [],
      "authorDisposition": "RETAIN",
      "rationale": "Retain the displayed alternatives: they test related concepts, symbolic roles, common calculation errors, or word forms. Independent reviewer should inspect the exact options.",
      "independentReview": "REQUIRED"
    },
    {
      "lessonId": "ELA.ODYSSEUS.ANNOTATE",
      "sourceId": "ANNOTATE-0",
      "expectedPrompt": "Which annotation best supports an inference?",
      "expectedChoices": [
        "She checks every knot; this suggests caution",
        "She checks knots and life jackets",
        "I would be careful too"
      ],
      "expectedAnswer": 0,
      "prompt": "Which annotation best supports an inference?",
      "choices": [
        "She checks every knot; this suggests caution",
        "She checks knots and life jackets",
        "I would be careful too"
      ],
      "id": "ANNOTATE-0",
      "supersedesIds": [],
      "authorDisposition": "RETAIN",
      "rationale": "Retain the displayed alternatives: they test related concepts, symbolic roles, common calculation errors, or word forms. Independent reviewer should inspect the exact options.",
      "independentReview": "REQUIRED"
    },
    {
      "lessonId": "ELA.ODYSSEUS.ANNOTATE",
      "sourceId": "ANNOTATE-1",
      "expectedPrompt": "Which is an inference rather than a stated action?",
      "expectedChoices": [
        "Nia counts the life jackets",
        "Nia checks the boat twice",
        "Nia is cautious"
      ],
      "expectedAnswer": 2,
      "prompt": "Which is an inference rather than a stated action?",
      "choices": [
        "Nia counts the life jackets",
        "Nia checks the boat twice",
        "Nia is cautious"
      ],
      "id": "ANNOTATE-1",
      "supersedesIds": [],
      "authorDisposition": "RETAIN",
      "rationale": "Retain the displayed alternatives: they test related concepts, symbolic roles, common calculation errors, or word forms. Independent reviewer should inspect the exact options.",
      "independentReview": "REQUIRED"
    },
    {
      "lessonId": "ELA.ODYSSEUS.ANNOTATE",
      "sourceId": "ANNOTATE-2",
      "expectedPrompt": "Why record the page with evidence?",
      "expectedChoices": [
        "So the detail no longer needs any explanation",
        "So the detail can be found and checked",
        "So the response looks longer and more complete"
      ],
      "expectedAnswer": 1,
      "prompt": "Why record the page with evidence?",
      "choices": [
        "Because a page number proves an interpretation without reasoning",
        "So the detail can be found and checked",
        "So later readers do not need to inspect the passage"
      ],
      "id": "ANNOTATE-2.v20261118r2",
      "supersedesIds": [
        "ANNOTATE-2"
      ],
      "authorDisposition": "REWRITE",
      "rationale": "Targets citation-as-proof and uncheckable evidence misconceptions.",
      "independentReview": "REQUIRED"
    },
    {
      "lessonId": "ELA.ODYSSEUS.ANNOTATE",
      "sourceId": "ANNOTATE-3",
      "expectedPrompt": "A later detail challenges your first interpretation. What should you do?",
      "expectedChoices": [
        "Revise or qualify it using both details",
        "Ignore the new detail",
        "Invent an agreeing quotation"
      ],
      "expectedAnswer": 0,
      "prompt": "A later detail challenges your first interpretation. What should you do?",
      "choices": [
        "Revise or qualify it using both details",
        "Keep the first interpretation and use only its supporting details",
        "Replace the first interpretation without comparing earlier evidence"
      ],
      "id": "ANNOTATE-3.v20261118r2",
      "supersedesIds": [
        "ANNOTATE-3"
      ],
      "authorDisposition": "REWRITE",
      "rationale": "Contrasts selective evidence and uncritical replacement with weighing both details.",
      "independentReview": "REQUIRED"
    },
    {
      "lessonId": "ELA.ODYSSEUS.WORD_CHOICE",
      "sourceId": "WORD_CHOICE-0",
      "expectedPrompt": "Compared with walked, crept most strongly suggests…",
      "expectedChoices": [
        "Quiet or cautious movement",
        "Moving at exactly half the normal speed",
        "Walking confidently with heavy footsteps"
      ],
      "expectedAnswer": 0,
      "prompt": "Compared with walked, crept most strongly suggests…",
      "choices": [
        "Quiet or cautious movement",
        "Moving at exactly half the normal speed",
        "Walking confidently with heavy footsteps"
      ],
      "id": "WORD_CHOICE-0",
      "supersedesIds": [],
      "authorDisposition": "RETAIN",
      "rationale": "Retain the displayed alternatives: they test related concepts, symbolic roles, common calculation errors, or word forms. Independent reviewer should inspect the exact options.",
      "independentReview": "REQUIRED"
    },
    {
      "lessonId": "ELA.ODYSSEUS.WORD_CHOICE",
      "sourceId": "WORD_CHOICE-1",
      "expectedPrompt": "Which statement analyzes mood?",
      "expectedChoices": [
        "The narrator disapproves of greed",
        "The story has twelve chapters",
        "The dim hallway and scraping sound create unease"
      ],
      "expectedAnswer": 2,
      "prompt": "Which statement analyzes mood?",
      "choices": [
        "The narrator disapproves of greed",
        "The plot moves from arrival to departure",
        "The dim hallway and scraping sound create unease"
      ],
      "id": "WORD_CHOICE-1.v20261118r2",
      "supersedesIds": [
        "WORD_CHOICE-1"
      ],
      "authorDisposition": "REWRITE",
      "rationale": "Distinguishes mood from tone and plot structure.",
      "independentReview": "REQUIRED"
    },
    {
      "lessonId": "ELA.ODYSSEUS.WORD_CHOICE",
      "sourceId": "WORD_CHOICE-2",
      "expectedPrompt": "Which is the strongest word-choice explanation?",
      "expectedChoices": [
        "Snatched means the same as received in every case",
        "Snatched suggests rough, hurried taking",
        "Snatched is a strong verb because it is long"
      ],
      "expectedAnswer": 1,
      "prompt": "Which is the strongest word-choice explanation?",
      "choices": [
        "Snatched means the same as received in every case",
        "Snatched suggests rough, hurried taking",
        "Snatched is a strong verb because it is long"
      ],
      "id": "WORD_CHOICE-2",
      "supersedesIds": [],
      "authorDisposition": "RETAIN",
      "rationale": "Retain the displayed alternatives: they test related concepts, symbolic roles, common calculation errors, or word forms. Independent reviewer should inspect the exact options.",
      "independentReview": "REQUIRED"
    },
    {
      "lessonId": "ELA.ODYSSEUS.WORD_CHOICE",
      "sourceId": "WORD_CHOICE-3",
      "expectedPrompt": "Does the same event always create the same tone in different retellings?",
      "expectedChoices": [
        "No; wording and emphasis can change the attitude",
        "Yes; tone never changes",
        "Only page count affects tone"
      ],
      "expectedAnswer": 0,
      "prompt": "Does the same event always create the same tone in different retellings?",
      "choices": [
        "No; wording and emphasis can change the attitude",
        "Yes; the event fixes the narrator’s attitude",
        "Yes; different wording can change facts but cannot change tone"
      ],
      "id": "WORD_CHOICE-3.v20261118r2",
      "supersedesIds": [
        "WORD_CHOICE-3"
      ],
      "authorDisposition": "REWRITE",
      "rationale": "Targets fixed-tone assumptions without unrelated page-count distractors.",
      "independentReview": "REQUIRED"
    },
    {
      "lessonId": "ELA.ODYSSEUS.CHARACTER",
      "sourceId": "CHARACTER-0",
      "expectedPrompt": "Which action most clearly suggests hubris?",
      "expectedChoices": [
        "Checking all of the equipment twice before a climb",
        "Asking an expert guide for advice about the route",
        "Ignoring a warning to prove he is the best"
      ],
      "expectedAnswer": 2,
      "prompt": "Which action most clearly suggests hubris?",
      "choices": [
        "Checking all of the equipment twice before a climb",
        "Asking an expert guide for advice about the route",
        "Ignoring a warning to prove he is the best"
      ],
      "id": "CHARACTER-0",
      "supersedesIds": [],
      "authorDisposition": "RETAIN",
      "rationale": "Retain the displayed alternatives: they test related concepts, symbolic roles, common calculation errors, or word forms. Independent reviewer should inspect the exact options.",
      "independentReview": "REQUIRED"
    },
    {
      "lessonId": "ELA.ODYSSEUS.CHARACTER",
      "sourceId": "CHARACTER-1",
      "expectedPrompt": "How are hubris and hamartia related?",
      "expectedChoices": [
        "They always mean ordinary courage",
        "Hubris can be a form of hamartia",
        "Every mistake is hubris"
      ],
      "expectedAnswer": 1,
      "prompt": "How are hubris and hamartia related?",
      "choices": [
        "They always mean ordinary courage",
        "Hubris can be a form of hamartia",
        "Every mistake is hubris"
      ],
      "id": "CHARACTER-1",
      "supersedesIds": [],
      "authorDisposition": "RETAIN",
      "rationale": "Retain the displayed alternatives: they test related concepts, symbolic roles, common calculation errors, or word forms. Independent reviewer should inspect the exact options.",
      "independentReview": "REQUIRED"
    },
    {
      "lessonId": "ELA.ODYSSEUS.CHARACTER",
      "sourceId": "CHARACTER-2",
      "expectedPrompt": "What makes a character analysis stronger?",
      "expectedChoices": [
        "Connecting a choice to its motive and consequence",
        "Labeling the character as good or bad in one word",
        "Listing several page numbers without any details"
      ],
      "expectedAnswer": 0,
      "prompt": "What makes a character analysis stronger?",
      "choices": [
        "Connecting a choice to its motive and consequence",
        "Labeling the character as good or bad in one word",
        "Listing several page numbers without any details"
      ],
      "id": "CHARACTER-2",
      "supersedesIds": [],
      "authorDisposition": "RETAIN",
      "rationale": "Retain the displayed alternatives: they test related concepts, symbolic roles, common calculation errors, or word forms. Independent reviewer should inspect the exact options.",
      "independentReview": "REQUIRED"
    },
    {
      "lessonId": "ELA.ODYSSEUS.CHARACTER",
      "sourceId": "CHARACTER-3",
      "expectedPrompt": "Can one action suggest both courage and a risky flaw?",
      "expectedChoices": [
        "No, a character has only one trait",
        "Only if there is no narrator",
        "Yes, if the interpretation is supported by details"
      ],
      "expectedAnswer": 2,
      "prompt": "Can one action suggest both courage and a risky flaw?",
      "choices": [
        "No, a character has only one trait",
        "Only if the action ends successfully",
        "Yes, if the interpretation is supported by details"
      ],
      "id": "CHARACTER-3.v20261118r2",
      "supersedesIds": [
        "CHARACTER-3"
      ],
      "authorDisposition": "REWRITE",
      "rationale": "Contrasts one-dimensional characterization and judging traits only by outcome.",
      "independentReview": "REQUIRED"
    },
    {
      "lessonId": "ELA.ODYSSEUS.XENIA",
      "sourceId": "XENIA-0",
      "expectedPrompt": "Which pair captures the two sides of xenia?",
      "expectedChoices": [
        "A caring host and a respectful guest",
        "A wealthy host and a silent guest",
        "A guest who takes everything offered or hidden"
      ],
      "expectedAnswer": 0,
      "prompt": "Which pair captures the two sides of xenia?",
      "choices": [
        "A caring host and a respectful guest",
        "A wealthy host and a silent guest",
        "A generous host and a guest with no responsibilities in return"
      ],
      "id": "XENIA-0.v20261118r2",
      "supersedesIds": [
        "XENIA-0"
      ],
      "authorDisposition": "REWRITE",
      "rationale": "Contrasts appearances and one-sided hospitality with reciprocal duties.",
      "independentReview": "REQUIRED"
    },
    {
      "lessonId": "ELA.ODYSSEUS.XENIA",
      "sourceId": "XENIA-1",
      "expectedPrompt": "A guest steals from a welcoming host. Which conclusion is supported?",
      "expectedChoices": [
        "The host must have been cruel",
        "The theft shows reciprocity",
        "The guest violates respectful hospitality"
      ],
      "expectedAnswer": 2,
      "prompt": "A guest steals from a welcoming host. Which conclusion is supported?",
      "choices": [
        "The guest has no duties because the host offered food",
        "The host violates xenia by expecting respectful behavior",
        "The guest violates respectful hospitality"
      ],
      "id": "XENIA-1.v20261118r2",
      "supersedesIds": [
        "XENIA-1"
      ],
      "authorDisposition": "REWRITE",
      "rationale": "Targets entitlement and one-sided interpretations of host/guest duties.",
      "independentReview": "REQUIRED"
    },
    {
      "lessonId": "ELA.ODYSSEUS.XENIA",
      "sourceId": "XENIA-2",
      "expectedPrompt": "What makes a comparison well supported?",
      "expectedChoices": [
        "Judging each host mainly by the size of the home",
        "Using the same categories and real details for both",
        "Describing one encounter fully and guessing about the other"
      ],
      "expectedAnswer": 1,
      "prompt": "What makes a comparison well supported?",
      "choices": [
        "Judging each host mainly by the size of the home",
        "Using the same categories and real details for both",
        "Describing one encounter fully and guessing about the other"
      ],
      "id": "XENIA-2",
      "supersedesIds": [],
      "authorDisposition": "RETAIN",
      "rationale": "Retain the displayed alternatives: they test related concepts, symbolic roles, common calculation errors, or word forms. Independent reviewer should inspect the exact options.",
      "independentReview": "REQUIRED"
    },
    {
      "lessonId": "ELA.ODYSSEUS.XENIA",
      "sourceId": "XENIA-3",
      "expectedPrompt": "A palace is described as splendid. Does that alone prove the host is kind?",
      "expectedChoices": [
        "No; examine the host’s actions",
        "Yes; wealth always means hospitality",
        "Only if the visitor is famous"
      ],
      "expectedAnswer": 0,
      "prompt": "A palace is described as splendid. Does that alone prove the host is kind?",
      "choices": [
        "No; examine the host’s actions",
        "Yes; splendid surroundings establish generous treatment of guests",
        "No; first compare the host’s wealth with another host’s wealth"
      ],
      "id": "XENIA-3.v20261118r2",
      "supersedesIds": [
        "XENIA-3"
      ],
      "authorDisposition": "REWRITE",
      "rationale": "Both distractors judge hospitality by wealth instead of actions.",
      "independentReview": "REQUIRED"
    },
    {
      "lessonId": "ELA.ODYSSEUS.SENTENCES",
      "sourceId": "SENTENCES-0",
      "expectedPrompt": "Complete: Leo stayed inside because…",
      "expectedChoices": [
        "but he packed a bag for the trip",
        "so he waited by the window all day",
        "the storm made travel unsafe"
      ],
      "expectedAnswer": 2,
      "prompt": "The storm made travel unsafe. Which ending gives a reason: Leo stayed inside because…",
      "choices": [
        "he was still inside at noon",
        "he stayed at home throughout the storm",
        "the storm made travel unsafe"
      ],
      "id": "SENTENCES-0.v20261118r2",
      "supersedesIds": [
        "SENTENCES-0"
      ],
      "authorDisposition": "REWRITE",
      "rationale": "Contrasts an actual cause with temporal detail or a restatement of the action.",
      "independentReview": "REQUIRED"
    },
    {
      "lessonId": "ELA.ODYSSEUS.SENTENCES",
      "sourceId": "SENTENCES-1",
      "expectedPrompt": "Which sentence uses but for contrast?",
      "expectedChoices": [
        "She was tired but because",
        "She was tired, but she kept rowing",
        "She was tired, but she needed rest because she was tired"
      ],
      "expectedAnswer": 1,
      "prompt": "Which sentence uses but for contrast?",
      "choices": [
        "She was tired, but she felt exhausted",
        "She was tired, but she kept rowing",
        "She was tired, but she needed rest"
      ],
      "id": "SENTENCES-1.v20261118r2",
      "supersedesIds": [
        "SENTENCES-1"
      ],
      "authorDisposition": "REWRITE",
      "rationale": "All options are complete clauses; only the key establishes a meaningful contrast.",
      "independentReview": "REQUIRED"
    },
    {
      "lessonId": "ELA.ODYSSEUS.SENTENCES",
      "sourceId": "SENTENCES-2",
      "expectedPrompt": "Which is a complete sentence?",
      "expectedChoices": [
        "Because the path was blocked, they turned back",
        "Because the path was blocked",
        "Although they were ready"
      ],
      "expectedAnswer": 0,
      "prompt": "Which is a complete sentence?",
      "choices": [
        "Because the path was blocked, they turned back",
        "Because the path was blocked",
        "Although they were ready"
      ],
      "id": "SENTENCES-2",
      "supersedesIds": [],
      "authorDisposition": "RETAIN",
      "rationale": "Retain the displayed alternatives: they test related concepts, symbolic roles, common calculation errors, or word forms. Independent reviewer should inspect the exact options.",
      "independentReview": "REQUIRED"
    },
    {
      "lessonId": "ELA.ODYSSEUS.SENTENCES",
      "sourceId": "SENTENCES-3",
      "expectedPrompt": "Which revision repairs the comma splice: The rope broke, the boat drifted?",
      "expectedChoices": [
        "The rope broke, the boat drifted.",
        "Because the rope broke.",
        "The rope broke, so the boat drifted."
      ],
      "expectedAnswer": 2,
      "prompt": "Which revision repairs the comma splice: The rope broke, the boat drifted?",
      "choices": [
        "The rope broke, the boat drifted.",
        "Because the rope broke.",
        "The rope broke, so the boat drifted."
      ],
      "id": "SENTENCES-3",
      "supersedesIds": [],
      "authorDisposition": "RETAIN",
      "rationale": "Retain the displayed alternatives: they test related concepts, symbolic roles, common calculation errors, or word forms. Independent reviewer should inspect the exact options.",
      "independentReview": "REQUIRED"
    },
    {
      "lessonId": "ELA.ODYSSEUS.EVIDENCE",
      "sourceId": "EVIDENCE-0",
      "expectedPrompt": "Which is a theme statement rather than just a topic?",
      "expectedChoices": [
        "Ignoring good advice can make success fragile",
        "Advice and boats",
        "Success and failure"
      ],
      "expectedAnswer": 0,
      "prompt": "Which is a theme statement rather than just a topic?",
      "choices": [
        "Ignoring good advice can make success fragile",
        "Advice and boats",
        "Success and failure"
      ],
      "id": "EVIDENCE-0",
      "supersedesIds": [],
      "authorDisposition": "RETAIN",
      "rationale": "Retain the displayed alternatives: they test related concepts, symbolic roles, common calculation errors, or word forms. Independent reviewer should inspect the exact options.",
      "independentReview": "REQUIRED"
    },
    {
      "lessonId": "ELA.ODYSSEUS.EVIDENCE",
      "sourceId": "EVIDENCE-1",
      "expectedPrompt": "Which part explains evidence?",
      "expectedChoices": [
        "Before leaving, she checked the radio and the weather on page 2",
        "In this paragraph I will discuss Nia and her trip",
        "Her safety checks show she values preventing risk"
      ],
      "expectedAnswer": 2,
      "prompt": "Which part explains evidence?",
      "choices": [
        "Before leaving, she checked the radio and the weather on page 2",
        "In this paragraph I will discuss Nia and her trip",
        "Her safety checks show she values preventing risk"
      ],
      "id": "EVIDENCE-1",
      "supersedesIds": [],
      "authorDisposition": "RETAIN",
      "rationale": "Retain the displayed alternatives: they test related concepts, symbolic roles, common calculation errors, or word forms. Independent reviewer should inspect the exact options.",
      "independentReview": "REQUIRED"
    },
    {
      "lessonId": "ELA.ODYSSEUS.EVIDENCE",
      "sourceId": "EVIDENCE-2",
      "expectedPrompt": "You remember an event but not its exact words. What should you do?",
      "expectedChoices": [
        "Invent a quotation that fits",
        "Check the passage or paraphrase it with its location",
        "Put quotation marks around a guess"
      ],
      "expectedAnswer": 1,
      "prompt": "You remember an event but not its exact words. What should you do?",
      "choices": [
        "Quote remembered wording without checking its exact words",
        "Check the passage or paraphrase it with its location",
        "Use a summary without giving its location"
      ],
      "id": "EVIDENCE-2.v20261118r2",
      "supersedesIds": [
        "EVIDENCE-2"
      ],
      "authorDisposition": "REWRITE",
      "rationale": "Contrasts unverifiable quoting and unlocated paraphrase with checked evidence.",
      "independentReview": "REQUIRED"
    },
    {
      "lessonId": "ELA.ODYSSEUS.EVIDENCE",
      "sourceId": "EVIDENCE-3",
      "expectedPrompt": "A classmate offers a different supported interpretation. What is a strong response?",
      "expectedChoices": [
        "Compare the evidence and explain where the readings differ",
        "Dismiss it because it is different from your own reading",
        "Change every one of your claims without checking the text"
      ],
      "expectedAnswer": 0,
      "prompt": "A classmate offers a different supported interpretation. What is a strong response?",
      "choices": [
        "Compare the evidence and explain where the readings differ",
        "Dismiss it because it is different from your own reading",
        "Change every one of your claims without checking the text"
      ],
      "id": "EVIDENCE-3",
      "supersedesIds": [],
      "authorDisposition": "RETAIN",
      "rationale": "Retain the displayed alternatives: they test related concepts, symbolic roles, common calculation errors, or word forms. Independent reviewer should inspect the exact options.",
      "independentReview": "REQUIRED"
    },
    {
      "lessonId": "CODING.SCHOOL.PLAN",
      "sourceId": "PLAN-0",
      "expectedPrompt": "Which plan is most useful?",
      "expectedChoices": [
        "A goal, controls, rules, and win/loss conditions",
        "Only a colorful title",
        "Only the final score"
      ],
      "expectedAnswer": 0,
      "prompt": "Which plan is most useful?",
      "choices": [
        "A goal, controls, rules, and win/loss conditions",
        "Controls and graphics without a goal or ending rule",
        "A feature list without describing player actions"
      ],
      "id": "PLAN-0.v20261118r2",
      "supersedesIds": [
        "PLAN-0"
      ],
      "authorDisposition": "REWRITE",
      "rationale": "Two common incomplete design plans.",
      "independentReview": "REQUIRED"
    },
    {
      "lessonId": "CODING.SCHOOL.PLAN",
      "sourceId": "PLAN-1",
      "expectedPrompt": "What should a first prototype do?",
      "expectedChoices": [
        "Every feature at once",
        "Only show the credits",
        "One small working mechanic"
      ],
      "expectedAnswer": 2,
      "prompt": "What should a first prototype do?",
      "choices": [
        "Every feature at once",
        "A polished menu before testing a playable action",
        "One small working mechanic"
      ],
      "id": "PLAN-1.v20261118r2",
      "supersedesIds": [
        "PLAN-1"
      ],
      "authorDisposition": "REWRITE",
      "rationale": "Targets excessive scope and polishing before validating a core mechanic.",
      "independentReview": "REQUIRED"
    },
    {
      "lessonId": "CODING.SCHOOL.PLAN",
      "sourceId": "PLAN-2",
      "expectedPrompt": "A feature fails. What is a useful debugging step?",
      "expectedChoices": [
        "Delete the project immediately",
        "Compare expected and actual behavior",
        "Change every block at once"
      ],
      "expectedAnswer": 1,
      "prompt": "A feature fails. What is a useful debugging step?",
      "choices": [
        "Change several blocks before retesting",
        "Compare expected and actual behavior",
        "Check only that blocks fit together without running the game"
      ],
      "id": "PLAN-2.v20261118r2",
      "supersedesIds": [
        "PLAN-2"
      ],
      "authorDisposition": "REWRITE",
      "rationale": "Targets uncontrolled changes and confusing syntax with behavior.",
      "independentReview": "REQUIRED"
    },
    {
      "lessonId": "CODING.SCHOOL.PLAN",
      "sourceId": "PLAN-3",
      "expectedPrompt": "What proves a school project is submitted?",
      "expectedChoices": [
        "The required link/file and school submission confirmation",
        "Completing practice here",
        "Opening MakeCode"
      ],
      "expectedAnswer": 0,
      "prompt": "What proves a school project is submitted?",
      "choices": [
        "The required link/file and school submission confirmation",
        "A saved project link without checking school submission status",
        "A simulator run without the required school upload"
      ],
      "id": "PLAN-3.v20261118r2",
      "supersedesIds": [
        "PLAN-3"
      ],
      "authorDisposition": "REWRITE",
      "rationale": "Distinguishes saved/running work from confirmed delivery.",
      "independentReview": "REQUIRED"
    },
    {
      "lessonId": "CODING.SCHOOL.SPRITES",
      "sourceId": "SPRITES-0",
      "expectedPrompt": "Where should initial setup usually go?",
      "expectedChoices": [
        "on start",
        "Only after game over",
        "In a paragraph tag"
      ],
      "expectedAnswer": 0,
      "prompt": "Where should initial setup usually go?",
      "choices": [
        "on start",
        "Inside an overlap handler that may repeat",
        "Inside every button-press handler"
      ],
      "id": "SPRITES-0.v20261118r2",
      "supersedesIds": [
        "SPRITES-0"
      ],
      "authorDisposition": "REWRITE",
      "rationale": "Confuses one-time initialization with recurring events.",
      "independentReview": "REQUIRED"
    },
    {
      "lessonId": "CODING.SCHOOL.SPRITES",
      "sourceId": "SPRITES-1",
      "expectedPrompt": "What is a sprite kind useful for?",
      "expectedChoices": [
        "Changing the computer password",
        "Storing only a page title",
        "Distinguishing roles in event handlers"
      ],
      "expectedAnswer": 2,
      "prompt": "What is a sprite kind useful for?",
      "choices": [
        "Storing the sprite’s current x coordinate",
        "Replacing the reference to one particular sprite instance",
        "Distinguishing roles in event handlers"
      ],
      "id": "SPRITES-1.v20261118r2",
      "supersedesIds": [
        "SPRITES-1"
      ],
      "authorDisposition": "REWRITE",
      "rationale": "Distinguishes kind/role from position and instance references.",
      "independentReview": "REQUIRED"
    },
    {
      "lessonId": "CODING.SCHOOL.SPRITES",
      "sourceId": "SPRITES-2",
      "expectedPrompt": "In usual MakeCode screen coordinates, increasing y moves a sprite…",
      "expectedChoices": [
        "Only left",
        "Down",
        "Up"
      ],
      "expectedAnswer": 1,
      "prompt": "In usual MakeCode screen coordinates, increasing y moves a sprite…",
      "choices": [
        "Right",
        "Down",
        "Up"
      ],
      "id": "SPRITES-2.v20261118r2",
      "supersedesIds": [
        "SPRITES-2"
      ],
      "authorDisposition": "REWRITE",
      "rationale": "Tests axis and direction conventions.",
      "independentReview": "REQUIRED"
    },
    {
      "lessonId": "CODING.SCHOOL.SPRITES",
      "sourceId": "SPRITES-3",
      "expectedPrompt": "Movement refers to the wrong sprite variable. What should you check?",
      "expectedChoices": [
        "The variable used by the movement block",
        "Only the background color",
        "Only the browser title"
      ],
      "expectedAnswer": 0,
      "prompt": "Movement refers to the wrong sprite variable. What should you check?",
      "choices": [
        "The variable used by the movement block",
        "The image asset name rather than the variable reference",
        "The sprite’s appearance without checking the movement target"
      ],
      "id": "SPRITES-3.v20261118r2",
      "supersedesIds": [
        "SPRITES-3"
      ],
      "authorDisposition": "REWRITE",
      "rationale": "Contrasts visual appearance/names with the referenced object.",
      "independentReview": "REQUIRED"
    },
    {
      "lessonId": "CODING.SCHOOL.EVENTS",
      "sourceId": "EVENTS-0",
      "expectedPrompt": "Which code runs after each A-button press?",
      "expectedChoices": [
        "A page heading",
        "An A-button event handler",
        "Only the on start code"
      ],
      "expectedAnswer": 1,
      "prompt": "Which code runs after each A-button press?",
      "choices": [
        "A B-button event handler",
        "An A-button event handler",
        "Only the on start code"
      ],
      "id": "EVENTS-0.v20261118r2",
      "supersedesIds": [
        "EVENTS-0"
      ],
      "authorDisposition": "REWRITE",
      "rationale": "Distinguishes the triggering event from another event or setup.",
      "independentReview": "REQUIRED"
    },
    {
      "lessonId": "CODING.SCHOOL.EVENTS",
      "sourceId": "EVENTS-1",
      "expectedPrompt": "Score starts at 0, then change score by 2 runs three times. Score is…",
      "expectedChoices": [
        "6",
        "2",
        "3"
      ],
      "expectedAnswer": 0,
      "prompt": "Score starts at 0, then change score by 2 runs three times. Score is…",
      "choices": [
        "6",
        "2",
        "3"
      ],
      "id": "EVENTS-1",
      "supersedesIds": [],
      "authorDisposition": "RETAIN",
      "rationale": "Retain the displayed alternatives: they test related concepts, symbolic roles, common calculation errors, or word forms. Independent reviewer should inspect the exact options.",
      "independentReview": "REQUIRED"
    },
    {
      "lessonId": "CODING.SCHOOL.EVENTS",
      "sourceId": "EVENTS-2",
      "expectedPrompt": "Why might touching one item add many points?",
      "expectedChoices": [
        "Score cannot change",
        "Every sprite is a website",
        "The overlap event can repeat while touching"
      ],
      "expectedAnswer": 2,
      "prompt": "Each overlap event changes score by 1. One long touch adds several points. Which explanation fits?",
      "choices": [
        "The on start block runs once for every frame of the overlap",
        "A button-press handler runs automatically whenever sprites touch",
        "The overlap event can repeat while touching"
      ],
      "id": "EVENTS-2.v20261118r2",
      "supersedesIds": [
        "EVENTS-2"
      ],
      "authorDisposition": "REWRITE",
      "rationale": "Makes the event behavior specific and contrasts overlap with setup and button events.",
      "independentReview": "REQUIRED"
    },
    {
      "lessonId": "CODING.SCHOOL.EVENTS",
      "sourceId": "EVENTS-3",
      "expectedPrompt": "What should happen at countdown end?",
      "expectedChoices": [
        "The browser must close",
        "The explicitly designed timer-end behavior",
        "An assumed automatic win in every tutorial"
      ],
      "expectedAnswer": 1,
      "prompt": "What should happen at countdown end?",
      "choices": [
        "Every countdown automatically declares a win regardless of its handler",
        "The explicitly designed timer-end behavior",
        "Every countdown automatically restarts the game regardless of its handler"
      ],
      "id": "EVENTS-3.v20261118r2",
      "supersedesIds": [
        "EVENTS-3"
      ],
      "authorDisposition": "REWRITE",
      "rationale": "Targets assumptions about timer behavior instead of browser closure.",
      "independentReview": "REQUIRED"
    },
    {
      "lessonId": "CODING.SCHOOL.DEBUG",
      "sourceId": "DEBUG-0",
      "expectedPrompt": "Which bug report is clearest?",
      "expectedChoices": [
        "It is bad",
        "Nothing is right",
        "Pressing A once adds 10 points instead of 1"
      ],
      "expectedAnswer": 2,
      "prompt": "Which bug report is clearest?",
      "choices": [
        "The score is wrong, without saying what action caused it",
        "Pressing A looks strange, without expected or actual results",
        "Pressing A once adds 10 points instead of 1"
      ],
      "id": "DEBUG-0.v20261118r2",
      "supersedesIds": [
        "DEBUG-0"
      ],
      "authorDisposition": "REWRITE",
      "rationale": "Contrasts vague bug reports with reproducible action/expected/actual detail.",
      "independentReview": "REQUIRED"
    },
    {
      "lessonId": "CODING.SCHOOL.DEBUG",
      "sourceId": "DEBUG-1",
      "expectedPrompt": "After changing one block, what should come next?",
      "expectedChoices": [
        "Delete the test log",
        "Retest the behavior",
        "Assume all bugs are fixed"
      ],
      "expectedAnswer": 1,
      "prompt": "After changing one block, what should come next?",
      "choices": [
        "Change another feature before checking the first change",
        "Retest the behavior",
        "Treat successful compilation as proof every behavior works"
      ],
      "id": "DEBUG-1.v20261118r2",
      "supersedesIds": [
        "DEBUG-1"
      ],
      "authorDisposition": "REWRITE",
      "rationale": "Tests retesting and behavior verification.",
      "independentReview": "REQUIRED"
    },
    {
      "lessonId": "CODING.SCHOOL.DEBUG",
      "sourceId": "DEBUG-2",
      "expectedPrompt": "Which is different from completing a project?",
      "expectedChoices": [
        "Submitting the required evidence to the teacher",
        "Running one simulator test",
        "Naming a sprite"
      ],
      "expectedAnswer": 0,
      "prompt": "Which step hands the project to the teacher rather than building or testing it?",
      "choices": [
        "Submitting the required evidence to the teacher",
        "Running the final simulator test",
        "Saving the completed project in the editor"
      ],
      "id": "DEBUG-2.v20261118r2",
      "supersedesIds": [
        "DEBUG-2"
      ],
      "authorDisposition": "REWRITE",
      "rationale": "Separates delivery from saved and tested project work.",
      "independentReview": "REQUIRED"
    },
    {
      "lessonId": "CODING.SCHOOL.DEBUG",
      "sourceId": "DEBUG-3",
      "expectedPrompt": "A project link opens the wrong version. What should you do?",
      "expectedChoices": [
        "Submit it anyway",
        "Change the assignment title only",
        "Verify and replace it with the intended saved version"
      ],
      "expectedAnswer": 2,
      "prompt": "A project link opens the wrong version. What should you do?",
      "choices": [
        "Change the visible title without updating its link",
        "Assume the existing link always points to the newest saved version",
        "Verify and replace it with the intended saved version"
      ],
      "id": "DEBUG-3.v20261118r2",
      "supersedesIds": [
        "DEBUG-3"
      ],
      "authorDisposition": "REWRITE",
      "rationale": "Targets cosmetic fixes and unverified version assumptions.",
      "independentReview": "REQUIRED"
    },
    {
      "lessonId": "CODING.SCHOOL.HTML",
      "sourceId": "HTML-0",
      "expectedPrompt": "Which language gives a page its content structure?",
      "expectedChoices": [
        "HTML",
        "CSS only",
        "A countdown timer"
      ],
      "expectedAnswer": 0,
      "prompt": "Which language gives a page its content structure?",
      "choices": [
        "HTML",
        "CSS",
        "JavaScript"
      ],
      "id": "HTML-0.v20261118r2",
      "supersedesIds": [
        "HTML-0"
      ],
      "authorDisposition": "REWRITE",
      "rationale": "Contrasts structure, presentation and behavior languages.",
      "independentReview": "REQUIRED"
    },
    {
      "lessonId": "CODING.SCHOOL.HTML",
      "sourceId": "HTML-1",
      "expectedPrompt": "Which is a correctly closed paragraph?",
      "expectedChoices": [
        "<p>Hello<p>",
        "</p>Hello<p>",
        "<p>Hello</p>"
      ],
      "expectedAnswer": 2,
      "prompt": "Which is a correctly closed paragraph?",
      "choices": [
        "<p>Hello<p>",
        "</p>Hello<p>",
        "<p>Hello</p>"
      ],
      "id": "HTML-1",
      "supersedesIds": [],
      "authorDisposition": "RETAIN",
      "rationale": "Retain the displayed alternatives: they test related concepts, symbolic roles, common calculation errors, or word forms. Independent reviewer should inspect the exact options.",
      "independentReview": "REQUIRED"
    },
    {
      "lessonId": "CODING.SCHOOL.HTML",
      "sourceId": "HTML-2",
      "expectedPrompt": "Which element represents one list item?",
      "expectedChoices": [
        "h1 only",
        "li",
        "ul only"
      ],
      "expectedAnswer": 1,
      "prompt": "Which element represents one list item?",
      "choices": [
        "h1",
        "li",
        "ul"
      ],
      "id": "HTML-2.v20261118r2",
      "supersedesIds": [
        "HTML-2"
      ],
      "authorDisposition": "REWRITE",
      "rationale": "Distinguishes item, heading and list-container elements.",
      "independentReview": "REQUIRED"
    },
    {
      "lessonId": "CODING.SCHOOL.HTML",
      "sourceId": "HTML-3",
      "expectedPrompt": "What is CSS mainly used for?",
      "expectedChoices": [
        "Presentation and styling",
        "Storing the school password",
        "Replacing every HTML element"
      ],
      "expectedAnswer": 0,
      "prompt": "What is CSS mainly used for?",
      "choices": [
        "Presentation and styling",
        "Defining semantic headings and paragraph structure",
        "Handling user events and changing game state"
      ],
      "id": "HTML-3.v20261118r2",
      "supersedesIds": [
        "HTML-3"
      ],
      "authorDisposition": "REWRITE",
      "rationale": "Contrasts CSS presentation with HTML structure and scripted behavior.",
      "independentReview": "REQUIRED"
    },
    {
      "lessonId": "CODING.SCHOOL.LINKS_IMAGES",
      "sourceId": "LINKS_IMAGES-0",
      "expectedPrompt": "Which attribute sets a link destination?",
      "expectedChoices": [
        "alt",
        "href",
        "src"
      ],
      "expectedAnswer": 1,
      "prompt": "Which attribute sets a link destination?",
      "choices": [
        "alt",
        "href",
        "src"
      ],
      "id": "LINKS_IMAGES-0",
      "supersedesIds": [],
      "authorDisposition": "RETAIN",
      "rationale": "Retain the displayed alternatives: they test related concepts, symbolic roles, common calculation errors, or word forms. Independent reviewer should inspect the exact options.",
      "independentReview": "REQUIRED"
    },
    {
      "lessonId": "CODING.SCHOOL.LINKS_IMAGES",
      "sourceId": "LINKS_IMAGES-1",
      "expectedPrompt": "Which attribute points to an image file?",
      "expectedChoices": [
        "src",
        "href only",
        "class only"
      ],
      "expectedAnswer": 0,
      "prompt": "Which attribute points to an image file?",
      "choices": [
        "src",
        "href",
        "alt"
      ],
      "id": "LINKS_IMAGES-1.v20261118r2",
      "supersedesIds": [
        "LINKS_IMAGES-1"
      ],
      "authorDisposition": "REWRITE",
      "rationale": "Tests source, destination and alternative-text attribute roles.",
      "independentReview": "REQUIRED"
    },
    {
      "lessonId": "CODING.SCHOOL.LINKS_IMAGES",
      "sourceId": "LINKS_IMAGES-2",
      "expectedPrompt": "Which markup makes an image clickable?",
      "expectedChoices": [
        "<img href=\"page.html\">",
        "<p src=\"a.png\">Link</p>",
        "<a href=\"page.html\"><img src=\"a.png\" alt=\"A drawing\"></a>"
      ],
      "expectedAnswer": 2,
      "prompt": "Which markup makes an image clickable?",
      "choices": [
        "<a href=\"page.html\">Open</a><img src=\"a.png\" alt=\"A drawing\">",
        "<img src=\"a.png\" alt=\"A drawing\" href=\"page.html\">",
        "<a href=\"page.html\"><img src=\"a.png\" alt=\"A drawing\"></a>"
      ],
      "id": "LINKS_IMAGES-2.v20261118r2",
      "supersedesIds": [
        "LINKS_IMAGES-2"
      ],
      "authorDisposition": "REWRITE",
      "rationale": "Contrasts an image nested inside a link with an adjacent image or misplaced href.",
      "independentReview": "REQUIRED"
    },
    {
      "lessonId": "CODING.SCHOOL.LINKS_IMAGES",
      "sourceId": "LINKS_IMAGES-3",
      "expectedPrompt": "Which element expresses strong importance?",
      "expectedChoices": [
        "img",
        "strong",
        "ul"
      ],
      "expectedAnswer": 1,
      "prompt": "Which element expresses strong importance?",
      "choices": [
        "b",
        "strong",
        "span"
      ],
      "id": "LINKS_IMAGES-3.v20261118r2",
      "supersedesIds": [
        "LINKS_IMAGES-3"
      ],
      "authorDisposition": "REWRITE",
      "rationale": "Distinguishes semantic importance from visual bolding or a neutral inline container.",
      "independentReview": "REQUIRED"
    },
    {
      "lessonId": "CODING.SCHOOL.CSS",
      "sourceId": "CSS-0",
      "expectedPrompt": "Which selector matches class=\"notice\"?",
      "expectedChoices": [
        "notice()",
        ".notice",
        "#notice"
      ],
      "expectedAnswer": 1,
      "prompt": "Which selector matches class=\"notice\"?",
      "choices": [
        "notice",
        ".notice",
        "#notice"
      ],
      "id": "CSS-0.v20261118r2",
      "supersedesIds": [
        "CSS-0"
      ],
      "authorDisposition": "REWRITE",
      "rationale": "Contrasts class, tag and ID selectors.",
      "independentReview": "REQUIRED"
    },
    {
      "lessonId": "CODING.SCHOOL.CSS",
      "sourceId": "CSS-1",
      "expectedPrompt": "Which selector matches id=\"intro\"?",
      "expectedChoices": [
        "#intro",
        ".intro",
        "intro()"
      ],
      "expectedAnswer": 0,
      "prompt": "Which selector matches id=\"intro\"?",
      "choices": [
        "#intro",
        ".intro",
        "intro"
      ],
      "id": "CSS-1.v20261118r2",
      "supersedesIds": [
        "CSS-1"
      ],
      "authorDisposition": "REWRITE",
      "rationale": "Contrasts ID, class and tag selectors.",
      "independentReview": "REQUIRED"
    },
    {
      "lessonId": "CODING.SCHOOL.CSS",
      "sourceId": "CSS-2",
      "expectedPrompt": "Which rule styles all p elements blue?",
      "expectedChoices": [
        "p = color blue",
        "<p color.css>",
        "p { color: blue; }"
      ],
      "expectedAnswer": 2,
      "prompt": "Which CSS rule makes the text in every p element blue?",
      "choices": [
        ".p { color: blue; }",
        "p { background-color: blue; }",
        "p { color: blue; }"
      ],
      "id": "CSS-2.v20261118r2",
      "supersedesIds": [
        "CSS-2"
      ],
      "authorDisposition": "REWRITE",
      "rationale": "Uses valid CSS with wrong selector or property instead of nonsense syntax.",
      "independentReview": "REQUIRED"
    },
    {
      "lessonId": "CODING.SCHOOL.CSS",
      "sourceId": "CSS-3",
      "expectedPrompt": "Several elements need the same group style. Which is suitable?",
      "expectedChoices": [
        "Only an image src",
        "A shared class",
        "Duplicate the same id on all elements"
      ],
      "expectedAnswer": 1,
      "prompt": "A group of headings and paragraphs needs one shared style. Which is suitable?",
      "choices": [
        "Give every element the same id",
        "A shared class",
        "Use only an h1 tag selector for both headings and paragraphs"
      ],
      "id": "CSS-3.v20261118r2",
      "supersedesIds": [
        "CSS-3"
      ],
      "authorDisposition": "REWRITE",
      "rationale": "Distinguishes reusable classes from duplicate IDs and a selector that misses part of the group.",
      "independentReview": "REQUIRED"
    },
    {
      "lessonId": "CODING.SCHOOL.TABLES",
      "sourceId": "TABLES-0",
      "expectedPrompt": "Which element creates a table row?",
      "expectedChoices": [
        "li",
        "tr",
        "td only"
      ],
      "expectedAnswer": 1,
      "prompt": "Which element creates a table row?",
      "choices": [
        "li",
        "tr",
        "td"
      ],
      "id": "TABLES-0.v20261118r2",
      "supersedesIds": [
        "TABLES-0"
      ],
      "authorDisposition": "REWRITE",
      "rationale": "Contrasts row, list item and data cell.",
      "independentReview": "REQUIRED"
    },
    {
      "lessonId": "CODING.SCHOOL.TABLES",
      "sourceId": "TABLES-1",
      "expectedPrompt": "Which element represents a header cell?",
      "expectedChoices": [
        "th",
        "td only",
        "ul"
      ],
      "expectedAnswer": 0,
      "prompt": "Which element represents a header cell?",
      "choices": [
        "th",
        "td",
        "thead"
      ],
      "id": "TABLES-1.v20261118r2",
      "supersedesIds": [
        "TABLES-1"
      ],
      "authorDisposition": "REWRITE",
      "rationale": "Contrasts header cell, data cell and header section.",
      "independentReview": "REQUIRED"
    },
    {
      "lessonId": "CODING.SCHOOL.TABLES",
      "sourceId": "TABLES-2",
      "expectedPrompt": "Which content is naturally tabular?",
      "expectedChoices": [
        "An unrelated page layout",
        "A single heading",
        "Song titles paired with artists and years"
      ],
      "expectedAnswer": 2,
      "prompt": "Which content is naturally tabular?",
      "choices": [
        "A paragraph narrating a journey in complete sentences",
        "A list of unrelated navigation links",
        "Song titles paired with artists and years"
      ],
      "id": "TABLES-2.v20261118r2",
      "supersedesIds": [
        "TABLES-2"
      ],
      "authorDisposition": "REWRITE",
      "rationale": "Contrasts multi-attribute records with narrative or navigation content.",
      "independentReview": "REQUIRED"
    },
    {
      "lessonId": "CODING.SCHOOL.TABLES",
      "sourceId": "TABLES-3",
      "expectedPrompt": "What does td represent?",
      "expectedChoices": [
        "A CSS class selector",
        "A table data cell",
        "An entire webpage"
      ],
      "expectedAnswer": 1,
      "prompt": "What does td represent?",
      "choices": [
        "An entire table row",
        "A table data cell",
        "The table’s caption"
      ],
      "id": "TABLES-3.v20261118r2",
      "supersedesIds": [
        "TABLES-3"
      ],
      "authorDisposition": "REWRITE",
      "rationale": "Tests related table element roles.",
      "independentReview": "REQUIRED"
    },
    {
      "lessonId": "CODING.SCHOOL.PORTFOLIO",
      "sourceId": "PORTFOLIO-0",
      "expectedPrompt": "What should define the required portfolio features?",
      "expectedChoices": [
        "Only the browser color",
        "The teacher’s requirements and rubric",
        "A random game score"
      ],
      "expectedAnswer": 1,
      "prompt": "What should define the required portfolio features?",
      "choices": [
        "Features copied from a tutorial without checking the assignment",
        "The teacher’s requirements and rubric",
        "Favorite features selected without checking the rubric"
      ],
      "id": "PORTFOLIO-0.v20261118r2",
      "supersedesIds": [
        "PORTFOLIO-0"
      ],
      "authorDisposition": "REWRITE",
      "rationale": "Targets attractive but unaligned project scope.",
      "independentReview": "REQUIRED"
    },
    {
      "lessonId": "CODING.SCHOOL.PORTFOLIO",
      "sourceId": "PORTFOLIO-1",
      "expectedPrompt": "Which test gives useful navigation evidence?",
      "expectedChoices": [
        "Ask someone to find a named project and observe",
        "Tell them every click in advance",
        "Only admire the homepage colors"
      ],
      "expectedAnswer": 0,
      "prompt": "Which test best checks whether navigation is understandable to a new user?",
      "choices": [
        "Ask someone to find a named project and observe",
        "Tell the tester every click in advance",
        "Inspect only the HTML source for correct destinations"
      ],
      "id": "PORTFOLIO-1.v20261118r2",
      "supersedesIds": [
        "PORTFOLIO-1"
      ],
      "authorDisposition": "REWRITE",
      "rationale": "Distinguishes uncoached usability from coaching or source inspection.",
      "independentReview": "REQUIRED"
    },
    {
      "lessonId": "CODING.SCHOOL.PORTFOLIO",
      "sourceId": "PORTFOLIO-2",
      "expectedPrompt": "A link points to an old file. What needs checking?",
      "expectedChoices": [
        "Only the font size",
        "Only the title punctuation",
        "Its destination and the intended saved version"
      ],
      "expectedAnswer": 2,
      "prompt": "A link points to an old file. What needs checking?",
      "choices": [
        "Only the link’s displayed text, not its destination",
        "Only whether the filename looks similar to the new file",
        "Its destination and the intended saved version"
      ],
      "id": "PORTFOLIO-2.v20261118r2",
      "supersedesIds": [
        "PORTFOLIO-2"
      ],
      "authorDisposition": "REWRITE",
      "rationale": "Contrasts visible labels and superficial similarity with the actual destination/version.",
      "independentReview": "REQUIRED"
    },
    {
      "lessonId": "CODING.SCHOOL.PORTFOLIO",
      "sourceId": "PORTFOLIO-3",
      "expectedPrompt": "What is a reasonable build sequence?",
      "expectedChoices": [
        "Add every feature before any testing",
        "Plan, prototype, test, improve, verify submission",
        "Publish private details first"
      ],
      "expectedAnswer": 1,
      "prompt": "What is a reasonable build sequence?",
      "choices": [
        "Add every feature before any testing",
        "Plan, prototype, test, improve, verify submission",
        "Build, submit, then test only if the teacher reports a problem"
      ],
      "id": "PORTFOLIO-3.v20261118r2",
      "supersedesIds": [
        "PORTFOLIO-3"
      ],
      "authorDisposition": "REWRITE",
      "rationale": "Targets delayed testing rather than unrelated unsafe actions.",
      "independentReview": "REQUIRED"
    }
  ]
};
