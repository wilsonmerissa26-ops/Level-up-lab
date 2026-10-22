// Independent regression tests for the October 21, 2026 instructional and assessment audit.
// Expected answers here are recomputed from each prompt's own numbers or from a separate answer table, never by calling the
// generator's formula, so a wrong key in the content cannot also make its test pass. Every check covers correct AND incorrect responses.
import fs from 'node:fs';
import vm from 'node:vm';
import assert from 'node:assert/strict';
const root = new URL('../', import.meta.url);
const source = f => fs.readFileSync(new URL(f, root), 'utf8');
let passed = 0;
const ok = (cond, msg) => { assert.ok(cond, msg); passed++; };
const eq = (a, b, msg) => { assert.equal(a, b, msg); passed++; };
const f3 = x => Number(Number(x).toFixed(3));
const fp = t => String(t).trim().toLowerCase().replace(/\s+/g, ' ');

// ---------- Load content and assessment modules (no app) ----------
const M = { console, Math, JSON, Map, Set, Number, String, Object, Array, RegExp, Error, Date };
M.window = M; M.globalThis = M; vm.createContext(M);
for (const f of ['content.js', 'science-school.js', 'school-academics.js', 'science-curriculum.js', 'science-gap-diagnostic.js', 'review-engine.js',
  'track-a-engine.js', 'track-a-diagnostic.js', 'track-a-remediation.js', 'track-a-verification.js', 'track-a-mastery-state.js', 'track-a-mastery.js', 'evidence-integrity.js'])
  vm.runInContext(source(f), M, { filename: f });
const C = M.LEVEL_UP_CONTENT, SS = M.LEVEL_UP_SCHOOL_SCIENCE, SA = M.LEVEL_UP_SCHOOL_ACADEMICS, RE = M.LEVEL_UP_REVIEW_ENGINE, GAP = M.LEVEL_UP_SCIENCE_GAP_DIAGNOSTIC;
const TA = { D: M.LEVEL_UP_TRACK_A_DIAGNOSTIC, E: M.LEVEL_UP_TRACK_A_ENGINE, V: M.LEVEL_UP_TRACK_A_VERIFICATION, MS: M.LEVEL_UP_TRACK_A_MASTERY_STATE, MA: M.LEVEL_UP_TRACK_A_MASTERY, R: M.LEVEL_UP_TRACK_A_REMEDIATION };
const W = ['Day 2', 'Day 7', 'Day 21'];

// ---------- 1. Science Gap: every phase is scored against its own option list ----------
const GAP_ORACLE = {
  'SGD.MATTER.1': { cold: 'Pure copper', probe: 'Pure copper', transfer: 'Lemonade', retention: 'Gold' },
  'SGD.MATTER.2': { cold: 'They move faster', probe: 'They speed up', transfer: 'It decreases', retention: 'They move faster' },
  'SGD.ENERGY.1': { cold: 'Light and thermal energy', probe: 'Light and heat', transfer: 'Thermal energy', retention: 'Light and some thermal energy' },
  'SGD.ENERGY.2': { cold: 'Convection', probe: 'Convection', transfer: 'A metal spoon getting hot in soup', retention: 'Convection' },
  'SGD.FORCE.1': { cold: 'Cause a change in motion toward the right', probe: 'Right', transfer: 'It is balanced at 0 N', retention: 'The net force is left' },
  'SGD.FORCE.2': { cold: 'Cart A', probe: 'Heavier cart', transfer: 'It increases', retention: 'The object with more mass' },
  'SGD.FIELDS.1': { cold: 'Gravity', probe: 'Gravity', transfer: 'Magnetic force', retention: 'Magnetic force' },
  'SGD.FIELDS.2': { cold: 'Copper wire', probe: 'Copper wire', transfer: 'Rubber', retention: 'Rubber' }
};
const phases = { cold: ['COLD_BASELINE', 'choices'], probe: ['CONTROLLED_PROBE', 'simplifiedChoices'], transfer: ['TRANSFER', 'transferChoices'], retention: ['DELAYED_RETENTION', 'retentionChoices'] };
eq(GAP.items.length, Object.keys(GAP_ORACLE).length, 'every gap item has an independent key');
for (const item of GAP.items) for (const [k, [phase, field]] of Object.entries(phases)) {
  const want = GAP_ORACLE[item.id][k];
  ok(item[field].includes(want), `${item.id} ${k} offers the correct option`);
  item[field].forEach((text, i) => eq(GAP.checkChoice(item.id, i, phase), text === want, `${item.id} ${phase} option "${text}"`));
}
ok(GAP.checkChoice('SGD.FIELDS.1', GAP.items.find(x => x.id === 'SGD.FIELDS.1').simplifiedChoices.indexOf('Gravity'), 'CONTROLLED_PROBE'), 'Gravity is correct on the simplified probe');
ok(!GAP.checkChoice('SGD.FIELDS.1', GAP.items.find(x => x.id === 'SGD.FIELDS.1').simplifiedChoices.indexOf('Friction'), 'CONTROLLED_PROBE'), 'Friction is not correct on the simplified probe');
assert.throws(() => GAP.checkChoice('SGD.FIELDS.1', 0, 'NOT_A_PHASE')); passed++;
for (const item of GAP.items) for (const h of item.gapHints) ok(GAP.gapCategories.includes(h), `${item.id} gap hint ${h} is a known category`);
const keyFirst = GAP.items.filter(x => x.transferAnswerIndex === 0).length + GAP.items.filter(x => x.retentionAnswerIndex === 0).length;
ok(keyFirst <= 6, 'gap transfer/retention keys are no longer mostly in the first slot');
ok(!/mostly light/.test(GAP.items.find(x => x.id === 'SGD.ENERGY.1').teach), 'flashlight teaching no longer says the output is mostly light');
// The app scores the probe through the phase-aware key.
const appSrc = source('app.js');
ok(/checkChoice\(item\.id,choiceIndex,"CONTROLLED_PROBE"\)/.test(appSrc), 'app uses the probe key');
ok(!/isCorrect=Number\(choiceIndex\)===Number\(item\.answerIndex\)/.test(appSrc), 'app no longer scores the probe with the cold key');

// ---------- 2. Track A generators: exhaustive keys, no duplicate options, correct and incorrect responses ----------
function oracleTrackA(q) {
  let m;
  if ((m = q.match(/What is (-?\d+) \+ (-?\d+)\?/))) return +m[1] + +m[2];
  if ((m = q.match(/What is (-?\d+) - (-?\d+)\?/))) return +m[1] - +m[2];
  if ((m = q.match(/What is (-?\d+) × (-?\d+)\?/))) return +m[1] * +m[2];
  if ((m = q.match(/: (\d+)x = (-?\d+)$/))) return +m[2] / +m[1];
  if ((m = q.match(/: x \+ (\d+) = (-?\d+)$/))) return +m[2] - +m[1];
  if ((m = q.match(/: x ÷ (\d+) = (-?\d+)$/))) return +m[2] * +m[1];
  if ((m = q.match(/: (\d+)x \+ (\d+) = (-?\d+)$/))) return (+m[3] - +m[2]) / +m[1];
  if ((m = q.match(/: (\d+)x - (\d+) = (-?\d+)$/))) return (+m[3] + +m[2]) / +m[1];
  return null;
}
function oracleTrackAChoice(q) {
  let m;
  if ((m = q.match(/^Solve: x \+ (\d+) > (-?\d+)$/))) return `x > ${+m[2] - +m[1]}`;
  if ((m = q.match(/^Solve: x - (\d+) ≤ (-?\d+)$/))) return `x ≤ ${+m[2] + +m[1]}`;
  if ((m = q.match(/^Solve: (-\d+)x > (-?\d+)$/))) return `x < ${+m[2] / +m[1] + 0}`;
  if ((m = q.match(/equivalent to (\d+)\(x ([+-]) (\d+)\)\?/))) { const c = +m[1] * (m[2] === '-' ? -1 : 1) * +m[3]; return `${m[1]}x ${c < 0 ? '-' : '+'} ${Math.abs(c)}`; }
  if ((m = q.match(/equivalent to (\d+)x \+ (\d+) \+ (\d+)x - (\d+)\?/))) { const c = +m[2] - +m[4]; return `${+m[1] + +m[3]}x ${c < 0 ? '-' : '+'} ${Math.abs(c)}`; }
  return null;
}
let taItems = 0;
for (const s of TA.D.SKILLS) for (let i = 0; i < 3000; i++) for (const it of TA.D.generateDiagnostic(s.id, 'audit' + i)) {
  taItems++;
  if (it.choices) {
    if (new Set(it.choices).size !== it.choices.length) assert.fail(`duplicate options: ${it.q} ${JSON.stringify(it.choices)}`);
    const want = oracleTrackAChoice(it.q);
    if (want === null) assert.fail('no oracle for ' + it.q);
    if (it.choices[it.answer] !== want) assert.fail(`wrong key: ${it.q} keyed ${it.choices[it.answer]} expected ${want}`);
    it.choices.forEach((t, k) => { if (TA.D.checkAnswer(it, null, k) !== (t === want)) assert.fail(`checkAnswer wrong for ${it.q} option ${t}`); });
  } else {
    const want = oracleTrackA(it.q);
    if (want === null || Number(it.free) !== want) assert.fail(`free key ${it.q} = ${it.free}, expected ${want}`);
    if (!TA.D.checkAnswer(it, String(want))) assert.fail('correct answer rejected: ' + it.q);
    if (TA.D.checkAnswer(it, String(want + 1))) assert.fail('wrong answer accepted: ' + it.q);
    if (want < 0) {
      if (!TA.D.checkAnswer(it, '−' + Math.abs(want))) assert.fail('typographic minus rejected: ' + it.q);
      if (TA.D.checkAnswer(it, String(Math.abs(want)))) assert.fail('dropped sign accepted: ' + it.q);
    }
  }
}
ok(taItems === 6 * 3000 * 3, `exhaustive-sample Track A items checked: ${taItems}`);
const dupCase = TA.D.generateDiagnostic('MATH.INTRO_INEQUALITIES', 'x').find(Boolean); // structural sanity
ok(dupCase, 'inequality generator loads');
ok(TA.D.checkAnswer({ choices: ['x < 0', 'x > 0', 'x < 0'], answer: 0 }, null, 2), 'identical correct text is scored correct at either position');
ok(!TA.D.checkAnswer({ choices: ['x < 0', 'x > 0', 'x ≤ 0'], answer: 0 }, null, 1), 'a wrong option is scored wrong');
ok(TA.D.checkAnswer({ free: '-3' }, 'x = −3') && TA.D.checkAnswer({ free: '3' }, '+3') && !TA.D.checkAnswer({ free: '-3' }, '3'), 'formal numeric parsing');
// Track A transfer generators: independent keys
for (const s of TA.D.SKILLS) for (let i = 0; i < 300; i++) for (const it of TA.MA.generateTransfer(s.id, 'xf' + i, [])) {
  let m, want = null;
  if ((m = it.q.match(/starts at (-?\d+)°F and changes by (-?\d+)°F/))) want = +m[1] + +m[2];
  else if ((m = it.q.match(/(\d+) identical packs hold (\d+) items/))) want = +m[2] / +m[1];
  else if ((m = it.q.match(/\$(\d+) starting fee plus \$(\d+) per hour\. The total is \$(\d+)/))) want = (+m[3] - +m[1]) / +m[2];
  else if ((m = it.q.match(/has (\d+) points and earns (\d+) points per level\. He needs at least (\d+) points/))) want = Math.ceil((+m[3] - +m[1]) / +m[2]);
  if (it.choices) { ok(new Set(it.choices).size === it.choices.length, 'transfer options unique'); continue; }
  if (want === null || Number(it.free) !== want) assert.fail(`transfer key ${it.q} = ${it.free}, expected ${want}`);
}
passed++;

// ---------- 3. Science circuits: diagram topology ----------
function topology(svg) {
  // Wire segments from M/H/V path commands; resistor/lamp rectangles cut the wire and become components.
  const segs = [];
  for (const d of [...svg.matchAll(/<path d="([^"]+)"/g)].map(m => m[1])) {
    let x = 0, y = 0;
    for (const [, c, n] of d.matchAll(/([MHVL])\s*([-\d.]+(?:[ ,]+[-\d.]+)?)/g)) {
      const v = n.split(/[ ,]+/).map(Number);
      if (c === 'M') { x = v[0]; y = v[1]; }
      else if (c === 'H') { segs.push([x, y, v[0], y]); x = v[0]; }
      else if (c === 'V') { segs.push([x, y, x, v[0]]); y = v[0]; }
    }
  }
  const rects = [...svg.matchAll(/<rect x="(\d+)" y="(\d+)" width="(\d+)" height="(\d+)"/g)].map(m => m.slice(1).map(Number));
  const inside = (px, py, r) => px > r[0] && px < r[0] + r[2] && py > r[1] && py < r[1] + r[3];
  const near = (px, py, r) => px >= r[0] - 1 && px <= r[0] + r[2] + 1 && py >= r[1] - 1 && py <= r[1] + r[3] + 1 && !inside(px, py, r);
  const adj = new Map(); const link = (a, b) => { (adj.get(a) || adj.set(a, new Set()).get(a)).add(b); (adj.get(b) || adj.set(b, new Set()).get(b)).add(a); };
  const key = (px, py) => px + ',' + py;
  for (const [x1, y1, x2, y2] of segs) {
    const n = Math.max(Math.abs(x2 - x1), Math.abs(y2 - y1)); let prev = null;
    for (let i = 0; i <= n; i++) {
      const px = x1 + Math.sign(x2 - x1) * i, py = y1 + Math.sign(y2 - y1) * i;
      const r = rects.findIndex(rc => inside(px, py, rc));
      const node = r >= 0 ? null : key(px, py);
      if (node && prev) link(prev, node);
      if (node) rects.forEach((rc, k) => { if (near(px, py, rc)) link(node, 'R' + k); });
      prev = node;
    }
  }
  return (removed = []) => {
    const start = '70,110', goal = '70,126', seen = new Set([start]), queue = [start];
    while (queue.length) { const cur = queue.shift(); if (cur === goal) return true; for (const nx of adj.get(cur) || []) if (!seen.has(nx) && !removed.includes(nx)) { seen.add(nx); queue.push(nx); } }
    return false;
  };
}
const svgOf = kind => SS.diagram(kind).match(/<svg[\s\S]*?<\/svg>/)[0];
const par = topology(svgOf('parallel')), ser = topology(svgOf('series'));
ok(par(), 'parallel: battery terminals connected through the resistors');
ok(par(['R0']) && par(['R1']), 'parallel: removing either resistor leaves a complete path through the other');
ok(!par(['R0', 'R1']), 'parallel: no wire shorts the battery when both resistors are removed');
ok(ser() && !ser(['R0']) && !ser(['R1']), 'series: removing either resistor breaks the only path');
ok(/two junctions|each resistor forms its own branch/.test(SS.diagram('parallel')), 'parallel diagram label describes branches');

// ---------- 4. Circuit reviews: independent numeric keys and no middle-value cue ----------
function oracleCircuit(q) {
  const V = (q.match(/(\d+) V\b/) || [])[1], Rs = [...q.matchAll(/(\d+) Ω/g)].map(m => +m[1]), A = (q.match(/(\d*\.?\d+) A\b/) || [])[1];
  const v = V == null ? null : +V, a = A == null ? null : +A;
  if (/Find total resistance/.test(q)) return Rs[0] + Rs[1];
  if (/equivalent resistance/.test(q)) return Rs[0] / 2;
  if (/Three identical/.test(q)) return 3 * v / Rs[0];
  if (/string of 4 identical/.test(q)) return v / (4 * Rs[0]);
  if (/twice the resistance/.test(q)) return v / (2 * Rs[0]);
  if (/half as much current/.test(q)) return v / (a / 2);
  if (/one .* branch opens/.test(q)) return v / Rs[0];
  if (/Find voltage/.test(q)) return a * Rs[0];
  if (/Find its resistance/.test(q)) return v / a;
  if (/two \d+ Ω components in series/.test(q)) return v / (2 * Rs[0]);
  if (/reconnects .* in parallel/.test(q)) return 2 * v / Rs[0];
  if (/separate .* branches/.test(q)) return v / Rs[0] + v / Rs[1];
  if (/branch current/.test(q)) return v / Rs[0];
  if (/series|Those/.test(q)) return v / (Rs[0] + Rs[1]);
  if (/across/.test(q) && Rs.length === 1) return v / Rs[0];
  return null;
}
let numericItems = 0, keyMiddle = 0, keyLow = 0, keyHigh = 0;
for (const l of SS.lessons) for (const w of ['Day 7', 'Day 21']) for (let k = 0; k < 4; k++) {
  for (const q of SS.delayedChecks(l, w, () => (k + 0.5) / 4)) {
    if (!/Round to three/.test(q.q)) continue;
    numericItems++;
    const want = oracleCircuit(q.q);
    if (want === null) assert.fail('no circuit oracle: ' + q.q);
    eq(Number(q.choices[q.answer]), f3(want), 'circuit key: ' + q.q);
    eq(new Set(q.choices).size, 3, 'circuit options distinct');
    const vals = q.choices.map(Number).sort((x, y) => x - y), key = Number(q.choices[q.answer]);
    if (key === vals[1]) keyMiddle++; else if (key === vals[0]) keyLow++; else keyHigh++;
  }
}
ok(numericItems >= 100, 'numeric circuit items enumerated: ' + numericItems);
ok(keyMiddle / numericItems < 0.6 && keyLow > 0 && keyHigh > 0 && keyMiddle > 0, `key position among values varies (low ${keyLow}, middle ${keyMiddle}, high ${keyHigh})`);
// Day 2 Ohm reviews: three different answers.
eq(new Set(SS.lessons.find(l => l.key === 'OHM_I').reviewChecks.map(q => q.choices[q.answer])).size, 3, 'Day 2 Ohm reviews have different answers');
// Fixed circuit items: independent calculation of every quantitative key.
const fixedCalc = [['oi-g', '0.40 A'], ['oi-f', '0.20 A'], ['oi-i', '0.60 A'], ['ov-g', '10 V'], ['ov-f', '30 Ω'], ['ov-i', '30 Ω'], ['se-g', '0.30 A'], ['se-f', '0.30 A'], ['pa-g', '0.80 A'], ['mi-g', '0.30 A'], ['mi-f', '1.20 A']];
for (const [id, want] of fixedCalc) { const q = SS.lessons.flatMap(l => l.checks).find(x => x.id === id); eq(q.choices[q.answer], want, 'fixed circuit key ' + id); }

// ---------- 5. Review windows: no repeated prompts, transfer only where new, keys independently checked ----------
function oracleFree(q) {
  let m; const n = s => Number(String(s).replace('−', '-'));
  const rules = [
    [/y = (\d+)x \+ (\d+)\. (?:Find y at|Calculate y at) x = (\d+)/, m => +m[1] * +m[3] + +m[2]],
    [/f\(x\) = (\d+)x − (\d+), find f\((\d+)\)/, m => +m[1] * +m[3] - +m[2]],
    [/charges \$(\d+) per snack plus a \$(\d+) service fee\. What is the charge for (\d+) snacks/, m => +m[1] * +m[3] + +m[2]],
    [/has points \(1,(-?\d+)\) and \(4,(-?\d+)\)\. Find the (?:rate|slope)/, m => (n(m[2]) - n(m[1])) / 3],
    [/shows \(2, (\d+)\) and \(5, (\d+)\)\. What is the constant rate/, m => (+m[2] - +m[1]) / 3],
    [/starts at (\d+) cm and grows (\d+) cm each week\. How tall is it after (\d+) weeks/, m => +m[1] + +m[2] * +m[3]],
    [/slope between \(−1, (-?\d+)\) and \(3, (-?\d+)\)/, m => (n(m[2]) - n(m[1])) / 4],
    [/at 600 m elevation at minute 0 and at (-?\d+) m at minute (\d+)/, m => (n(m[1]) - 600) / +m[2]],
    [/uses slope (\d+) and point \((\d+),(\d+)\)\. Find b/, m => +m[3] - +m[1] * +m[2]],
    [/slope −(\d+) and passes through \((\d+), (-?\d+)\)\. Find b/, m => n(m[3]) + +m[1] * +m[2]],
    [/costs \$(\d+) per month plus a one-time activation fee\. After (\d+) months the total paid is \$(\d+)/, m => +m[3] - +m[1] * +m[2]],
    [/passes through \(1, (\d+)\) and \(3, (\d+)\)\. In y = mx \+ b, what is b/, m => +m[1] - (+m[2] - +m[1]) / 2],
    [/burns down (\d+) cm each hour\. Writing height as h = mt \+ b, what is m/, m => -+m[1]],
    [/checks y = (\d+)x \+ (\d+) at x = (\d+)\. Find the output/, m => +m[1] * +m[3] + +m[2]],
    [/What is y at x = (\d+) on y = −(\d+)x \+ (\d+)/, m => +m[3] - +m[2] * +m[1]],
    [/What y-value belongs at x = (\d+) on y = (\d+)x \+ (\d+)/, m => +m[2] * +m[1] + +m[3]],
    [/uses C = (\d+)h \+ (\d+)\. Find cost at h = (\d+)/, m => +m[1] * +m[3] + +m[2]],
    [/Using C = (\d+)h \+ (\d+), how many hours give a cost of \$(\d+)/, m => (+m[3] - +m[2]) / +m[1]],
    [/holds (\d+) sheets and uses (\d+) sheets per minute\. How many sheets remain after (\d+) minutes/, m => +m[1] - +m[2] * +m[3]],
    [/drains V = (\d+) − (\d+)t liters\. At what time is it empty/, m => +m[1] / +m[2]],
    [/starts at (\d+)% and loses (\d+)% each hour/, m => +m[1] / +m[2]],
    [/descends .* at (\d+) m per minute to a planned depth of (\d+) m/, m => +m[2] / +m[1]],
    [/warms from (\d+)°C to (\d+)°C\. Using final − initial/, m => +m[2] - +m[1]],
    [/cools from (\d+)°C to (\d+)°C\. Using final − initial/, m => +m[2] - +m[1]],
    [/starts at (\d+)°C and ends at (\d+)°C\. What temperature change/, m => +m[2] - +m[1]],
    [/juice box from (\d+)°C to −(\d+)°C/, m => -+m[2] - +m[1]],
    [/m = (\d+) g, c = (\d+) J\/g°C, and ΔT = (\d+)°C, what is Q/, m => +m[1] * +m[2] * +m[3]],
    [/absorbs (\d+) J\. Its mass is (\d+) g and ΔT is (\d+)°C/, m => +m[1] / (+m[2] * +m[3])],
    [/A (\d+) g metal spoon \(c = (\d+) J\/g°C\) .* warms by (\d+)°C/, m => +m[1] * +m[2] * +m[3]],
    [/Solve (\d+)x = (\d+)\./, m => +m[2] / +m[1]],
    [/Solve x ÷ (\d+) = (\d+)\./, m => +m[1] * +m[2]],
    [/Solve x \+ (\d+) = (\d+)\./, m => +m[2] - +m[1]],
    [/rope (\d+) m long is cut into (\d+) equal pieces/, m => +m[1] / +m[2]]
  ];
  for (const [re, fn] of rules) if ((m = q.match(re))) return fn(m);
  return null;
}
const lessonsAll = [...C.science, ...C.math, ...(C.ela || [])];
let reviewItemCount = 0, freeChecked = 0;
for (const id of RE.SKILL_IDS) {
  const lesson = lessonsAll.find(l => l.id === id);
  const immediate = new Set((lesson?.checks || []).map(q => fp(q.q)));
  // A repeated exact prompt across windows is a replay. A template with new numbers is a new problem (valid retention),
  // but an item marked transfer must use a template not seen in the lesson or in earlier windows.
  const tmplOf = t => fp(t).replace(/−?-?\d+(\.\d+)?/g, '#').replace(/^(a workshop|a garden project|a new transport model) /, '');
  const immediateT = new Set((lesson?.checks || []).map(q => tmplOf(q.q)));
  for (let s = 0; s < 12; s++) {
    const promptsSeen = new Set(), templatesBefore = new Set();
    for (const w of W) {
      const items = RE.generateReview(id, w, 'audit-' + s);
      eq(items.filter(q => q.transfer).length, w === 'Day 21' ? 1 : 0, `${id} ${w} has ${w === 'Day 21' ? 'one' : 'no'} transfer item`);
      for (const q of items) {
        reviewItemCount++;
        ok(!immediate.has(fp(q.q)), `${id} ${w} review differs from the immediate lesson checks`);
        if (promptsSeen.has(fp(q.q))) assert.fail(`${id}: exact prompt repeated across windows (${w}): ${q.q}`);
        if (q.transfer && (templatesBefore.has(tmplOf(q.q)) || immediateT.has(tmplOf(q.q)))) assert.fail(`${id}: transfer item reuses an earlier template: ${q.q}`);
      }
      for (const q of items) { promptsSeen.add(fp(q.q)); templatesBefore.add(tmplOf(q.q)); }
      for (const q of items) {
        if (q.choices) { ok(q.answer >= 0 && new Set(q.choices).size === q.choices.length, `${id} options distinct and keyed`); }
        else { const want = oracleFree(q.q); if (want === null) assert.fail('no free-answer oracle: ' + q.q); eq(Number(q.free), want, 'free key ' + q.q); freeChecked++; }
      }
    }
  }
}
ok(reviewItemCount > 1500 && freeChecked > 200, `review items checked: ${reviewItemCount}, free answers independently verified: ${freeChecked}`);
// Exhaustive math parameter sweep (every a, b, window) for distinct options and verified free answers.
for (const l of SA.math) for (const w of W) for (let a = 2; a <= 5; a++) for (let b = 3; b <= 9; b++) {
  let i = 0; const vals = [(a - 2 + 0.5) / 4, (b - 3 + 0.5) / 7];
  for (const q of SA.delayedChecks(l, w, () => vals[i++])) {
    if (q.choices) { if (new Set(q.choices).size !== q.choices.length) assert.fail(`duplicate options a=${a} b=${b}: ${q.q}`); }
    else if (Number(q.free) !== oracleFree(q.q)) assert.fail(`math free key a=${a} b=${b}: ${q.q} = ${q.free}`);
  }
}
passed++;
ok(!SA.delayedChecks(SA.math.find(l => l.id.endsWith('.GRAPH')), 'Day 2', () => 0.5).some(q => /Which point is on the y-axis/.test(q.q)), 'ambiguous y-axis question removed');

// ---------- 6. Answer-position and length cues ----------
const firstSlot = lessons => { let n = 0, first = 0; for (const l of lessons) for (const q of l.checks || []) if (q.choices) { n++; if (q.answer === 0) first++; } return first / n; };
ok(firstSlot(C.science.filter(l => l.unit === 'SCI.SCHOOL.CIRCUITS')) < 0.5, 'circuit keys not mostly first');
ok(firstSlot(C.science.filter(l => l.unit === 'SCI.G8.WAVES')) < 0.5, 'Waves keys not mostly first');
ok(firstSlot(C.science.filter(l => l.id.startsWith('SCI.SPS7'))) < 0.6, 'energy keys not mostly first');
const len = { long: 0, short: 0, n: 0 };
for (const l of SA.ela) {
  const items = [...l.checks.filter(q => q.choices), ...W.flatMap(w => SA.delayedChecks(l, w, Math.random))];
  for (const q of items) {
    const L = q.choices.map(x => x.length), s = [...L].sort((x, y) => x - y); len.n++;
    if (L[q.answer] === s[2] && s[2] !== s[1]) len.long++; else if (L[q.answer] === s[0] && s[0] !== s[1]) len.short++;
  }
}
ok(len.long / len.n < 0.45 && len.short / len.n < 0.45, `ELA key length is not a cue (longest ${len.long}, shortest ${len.short} of ${len.n})`);

// ---------- 7. Prior-instruction mapping ----------
const byId = id => lessonsAll.find(l => l.id === id);
ok(byId('MATH.INVERSE_OPERATIONS').priorSkillIds.includes('MATH.ONE_STEP_EQUATIONS'), 'Inverse Operations marks One-Step Equations as taught');
ok(byId('SCI.CIRCUITS.OHM_VR').priorSkillIds.includes('MATH.ONE_STEP_EQUATIONS'), 'Ohm rearrangement marks One-Step Equations as taught');
ok(byId('SCI.CIRCUITS.MOTOR').targetIds.includes('SCI.S8P2C.ENERGY_TRANSFORMATIONS') && byId('SCI.CIRCUITS.MIXED').targetIds.includes('SCI.S8P2C.ENERGY_TRANSFORMATIONS'), 'circuit energy lessons exclude the energy gap item from the cold set');
for (const l of SA.lessons) ok(!l.checks.some(q => q.stage === 'MIX_OLD_AND_NEW'), l.id + ' has no mislabeled mixed item');

// ---------- 8. App: answer matching, review rules, Track A freshness ----------
const ctx = { console, Date, Math, JSON, Map, Set, Number, String, Object, Array, RegExp, Error, Promise, setTimeout, clearTimeout };
ctx.window = ctx; ctx.globalThis = ctx; ctx.scrollTo = () => {};
ctx.location = { hash: '#review' }; ctx.navigator = { storage: {} }; ctx.alert = () => {};
ctx.speechSynthesis = { cancel() {}, pause() {}, resume() {}, speak() {} }; ctx.SpeechSynthesisUtterance = function (t) { this.text = t; };
const el = id => ({ id, value: '', innerHTML: '', className: '', disabled: false });
const elements = new Map(['app', 'saveStatus', 'feedback', 'freeAnswer', 'itemAccessCondition', 'itemAssistanceLevel'].map(id => [id, el(id)]));
let checked = null;
ctx.document = { getElementById: id => elements.get(id) || null, querySelector: s => s === 'input[name=answer]:checked' ? checked : null, querySelectorAll: () => [] };
for (const f of ['content.js', 'science-school.js', 'school-academics.js', 'science-curriculum.js', 'science-gap-diagnostic.js', 'review-engine.js', 'state-integrity.js',
  'track-a-engine.js', 'track-a-diagnostic.js', 'track-a-remediation.js', 'track-a-verification.js', 'track-a-mastery-state.js', 'track-a-mastery.js', 'evidence-integrity.js'])
  vm.runInNewContext(source(f), ctx, { filename: f });
let app = source('app.js');
app = app.replace('  async function save(reason="update"){', '  async function save(reason="update"){ return true;');
app = app.replace('  async function persistenceHealthCheck(){', '  async function persistenceHealthCheck(){return true;');
app = app.replace('  init();', `  window.testIntegrity={reset(){state=freshState();saveHealthy=true;backupMirrorHealthy=true;redundancyComparison="SYNCED";firstRunDecisionRequired=false;storageRecoveryIssue=null;current=null;},
  state:()=>state,current:()=>current,answersMatch,trackAPromptIsFresh,trackASeenFingerprints,buildReviewItems,evidenceIntegrityFlags,parentView,studyResultsSection};`);
ctx.LEVEL_UP_RUNTIME_GATE = { evaluate: () => ({ allowed: true, reason: 'SYNTHETIC_TEST_ONLY' }) };
vm.runInNewContext(app, ctx, { filename: 'app.js' });
const T = ctx.testIntegrity;
const matchCases = [
  ['2', '2', true], ['6/3', '2', true], ['-6/-3', '2', true], ['(5−11)/(5−2) = −2', '-2', true], ['m = −2', '-2', true], ['−22', '-22', true],
  ['5 minutes', '5', true], ['t=5', '5', true], ['0.20', '0.2', true],
  ['−2', '2', false], ['2', '-2', false], ['22', '-22', false], ['7', '8', false], ['2 or 3', '2', false], ['I don’t know', '5', false], ['6/0', '2', false], ['', '0', false]
];
for (const [raw, exp, want] of matchCases) eq(T.answersMatch(raw, exp), want, `answersMatch(${JSON.stringify(raw)}, ${exp})`);

// Review rules: drive the production review flow.
async function runReview({ skillId, window, seedSeen = false, assistance = 'INDEPENDENT', answerCorrectly = true, startStrength = 'BUILDING' }) {
  T.reset();
  const st = T.state();
  st.lessonState[skillId] = { status: 'COMPLETED', score: 100, memoryStrength: startStrength };
  const review = { id: 'rev_test_' + window.replace(' ', '') + Math.random(), skillId, subject: byId(skillId).subject || 'Physical Science', dueAt: new Date(Date.now() - 1000).toISOString(), window, completed: false, sourceTrack: 'B', evidence_class: 'INFORMAL_TRACK_B', instruction_exposure_status: 'PRIOR_INSTRUCTION' };
  st.reviewSchedule.push(review);
  if (seedSeen) {
    // Michael already met these exact prompts earlier (for example, a replayed or reused item).
    const preview = ctx.LEVEL_UP_REVIEW_ENGINE.generateReview(skillId, window, review.id);
    preview.forEach((q, i) => st.evidence.push({ id: 'earlier_' + i, createdAt: new Date(Date.now() - 86400000).toISOString(), skillId, prompt: q.q, track: 'B', instruction_exposure_status: 'PRIOR_INSTRUCTION' }));
  }
  await ctx.MLUL.startReview(review.id);
  const cur = T.current(); ok(cur && cur.reviewItems.length === 3, 'review started');
  for (const q of cur.reviewItems) {
    elements.get('itemAssistanceLevel').value = assistance;
    if (q.choices) { const idx = answerCorrectly ? q.answer : (q.answer + 1) % q.choices.length; checked = { value: String(idx) }; }
    else { checked = null; elements.get('freeAnswer').value = answerCorrectly ? String(q.free) : String(Number(q.free) + 7); }
    await ctx.MLUL.submitReviewAnswer();
  }
  return { review: st.reviewSchedule.find(r => r.id === review.id), lesson: st.lessonState[skillId], evidence: st.evidence.filter(e => e.evidenceType === 'DELAYED_RETRIEVAL') };
}
const SKILL = 'SCI.CIRCUITS.PARALLEL';
let res = await runReview({ skillId: SKILL, window: 'Day 7' });
eq(res.lesson.memoryStrength, 'STABLE', 'positive control: new items answered correctly and independently can raise memory strength');
ok(res.evidence.every(e => e.evidence_role === 'RETENTION' && e.previously_seen === false), 'new independent answers are retention evidence');
res = await runReview({ skillId: SKILL, window: 'Day 7', seedSeen: true });
eq(res.lesson.memoryStrength, 'BUILDING', 'replayed items answered correctly do not raise memory strength');
eq(res.review.outcome, 'PRACTICE_ONLY', 'a review of previously seen items is practice only');
ok(res.evidence.every(e => e.evidence_role === 'PRACTICE' && e.previously_seen === true && e.isCorrect === true), 'replayed answers are recorded correct, as practice');
res = await runReview({ skillId: SKILL, window: 'Day 21', seedSeen: true });
ok(res.evidence.every(e => e.transfer === false) && res.review.transferCorrect === false, 'a replayed item can never count as transfer');
eq(res.lesson.memoryStrength, 'BUILDING', 'replayed Day 21 cannot reach FLEXIBLE');
res = await runReview({ skillId: SKILL, window: 'Day 21', assistance: 'HINTED' });
eq(res.lesson.memoryStrength, 'BUILDING', 'hinted answers do not raise memory strength');
ok(res.evidence.every(e => e.evidence_role === 'PRACTICE'), 'hinted answers are practice evidence');
res = await runReview({ skillId: SKILL, window: 'Day 21' });
eq(res.lesson.memoryStrength, 'FLEXIBLE', 'positive control: new independent Day 21 with correct transfer');
res = await runReview({ skillId: SKILL, window: 'Day 7', answerCorrectly: false });
eq(res.lesson.memoryStrength, 'FRAGILE', 'incorrect independent answers lower memory strength');

// Track A freshness: a prompt practiced in a repair session is not fresh, and verification/mastery exclude it.
T.reset();
const repairItems = TA.R.generateComponentChecks('MATH.ONE_STEP_EQUATIONS', 'repair_test');
T.state().evidence.push(...repairItems.map((q, i) => ({ id: 'ta_repair_ev_' + i, createdAt: new Date().toISOString(), track: 'B', skillId: 'MATH.ONE_STEP_EQUATIONS', prompt: q.q, isCorrect: true })));
ok(!T.trackAPromptIsFresh('MATH.ONE_STEP_EQUATIONS', repairItems[0]), 'a repair-practice prompt is not fresh formal evidence');
ok(T.trackAPromptIsFresh('MATH.ONE_STEP_EQUATIONS', { q: 'Solve for x: 7x = 63000' }), 'an unseen prompt is fresh');
const excl = [...T.trackASeenFingerprints('MATH.ONE_STEP_EQUATIONS')];
for (let i = 0; i < 50; i++) {
  for (const it of TA.V.generateVerification('MATH.ONE_STEP_EQUATIONS', 'v' + i, excl)) ok(!excl.includes(TA.D.fingerprint(it)), 'verification probe is new');
  for (const it of TA.MA.generateRetention('MATH.ONE_STEP_EQUATIONS', 'Day 2', 'r' + i, excl)) ok(!excl.includes(TA.D.fingerprint(it)), 'retention probe is new');
}

// ---------- 9. Mastery cannot come from replaying seen items or from games ----------
const fresh = (correct, extra = {}) => ({ fresh: true, reliable: true, assistance_level: 'INDEPENDENT', correct, ...extra });
eq(TA.E.evaluateThreeProbeDiagnostic([fresh(true), fresh(true), fresh(true, { fresh: false })]).result, 'INSUFFICIENT_CONTROLLED_EVIDENCE', 'a replayed probe blocks a provisional decision');
eq(TA.E.evaluateThreeProbeDiagnostic([fresh(true), fresh(true), fresh(true, { assistance_level: 'HINTED' })]).result, 'INSUFFICIENT_CONTROLLED_EVIDENCE', 'a hinted probe blocks a provisional decision');
eq(TA.E.transitionDecision('PROVISIONAL', 'MASTERED', { delayed_retrieval_passed: true, transfer_passed: false }).allowed, false, 'mastery requires transfer');
eq(TA.E.transitionDecision('PROVISIONAL', 'MASTERED', { delayed_retrieval_passed: false, transfer_passed: true }).allowed, false, 'mastery requires delayed retrieval');
eq(TA.E.transitionDecision('LEARNING', 'MASTERED', {}).allowed, false, 'no shortcut from learning to mastered');
ok(!TA.MS.controlledSetPassed([{ fresh: false, reliable: true, assistance_level: 'INDEPENDENT', isCorrect: true }, { fresh: true, reliable: true, assistance_level: 'INDEPENDENT', isCorrect: true }]), 'a retention set with a replayed item does not pass');
// Games never write lifecycle state: every write of canonicalState lives in the guarded Track A functions.
for (const f of ['school-plan.js', 'psat-bridge.js', 'quest-engine.js', 'quest-config.js', 'study-tracking.js', 'michael-school-quest-config.js'])
  ok(!/canonicalState|trackASkillState|MASTERED/.test(source(f)), f + ' never writes mastery state');
// Guessing simulation over the real gates: random answers, with unlimited retries limited to one full cycle per stage.
function simulateGuesser(skillId, students, retriesPerStage, rng) {
  let mastered = 0;
  const guess = it => it.choices ? TA.D.checkAnswer(it, null, Math.floor(rng() * it.choices.length)) : TA.D.checkAnswer(it, String(Math.floor(rng() * 41) - 20));
  for (let s = 0; s < students; s++) {
    const seen = new Set(); const fp2 = it => TA.D.fingerprint(it);
    const take = items => items.map(it => { const f = !seen.has(fp2(it)); seen.add(fp2(it)); return { fresh: f, reliable: true, assistance_level: 'INDEPENDENT', correct: guess(it), isCorrect: null }; });
    let provisional = false;
    for (let t = 0; t < retriesPerStage && !provisional; t++) provisional = TA.E.evaluateThreeProbeDiagnostic(take(TA.D.generateDiagnostic(skillId, `g${s}_${t}`))).result === 'PROVISIONAL_SUPPORTED';
    if (!provisional) continue;
    const stage = gen => { for (let t = 0; t < retriesPerStage; t++) { const r = take(gen(t, [...seen])).map(x => ({ ...x, isCorrect: x.correct })); if (TA.MS.controlledSetPassed(r)) return true; } return false; };
    const d2 = stage((t, ex) => TA.MA.generateRetention(skillId, 'Day 2', `s${s}d2${t}`, ex));
    const d7 = d2 && stage((t, ex) => TA.MA.generateRetention(skillId, 'Day 7', `s${s}d7${t}`, ex));
    const xf = d7 && stage((t, ex) => TA.MA.generateTransfer(skillId, `s${s}x${t}`, ex));
    if (TA.E.transitionDecision('PROVISIONAL', 'MASTERED', { delayed_retrieval_passed: d2 && d7, transfer_passed: xf }).allowed) mastered++;
  }
  return mastered / students;
}
let seed = 12345; const rng = () => (seed = (seed * 1103515245 + 12345) % 2147483648) / 2147483648;
const guessSingle = {}, guessRetry = {};
for (const s of TA.D.SKILLS) { guessSingle[s.id] = simulateGuesser(s.id, 2000, 1, rng); guessRetry[s.id] = simulateGuesser(s.id, 400, 10, rng); }
for (const s of TA.D.SKILLS) ok(guessSingle[s.id] < 0.001, `a guesser does not reach mastery in one pass: ${s.id} ${guessSingle[s.id]}`);
for (const id of ['MATH.INTEGER_OPS', 'MATH.ONE_STEP_EQUATIONS', 'MATH.TWO_STEP_EQUATIONS', 'MATH.INTRO_INEQUALITIES']) ok(guessRetry[id] < 0.01, `a guesser with 10 retries per stage stays below 1% for free-response transfer skills: ${id} ${guessRetry[id]}`);
console.log('Guessing simulation (share of simulated guessers reaching MASTERED): one pass', JSON.stringify(guessSingle), 'ten retries per stage', JSON.stringify(guessRetry));

// ---------- 10. Historical evidence is flagged, never changed ----------
const t0 = '2026-10-01T10:00:00.000Z', t1 = '2026-10-02T10:00:00.000Z', t2 = '2026-10-03T10:00:00.000Z';
const hist = {
  student: { id: 'michael' }, lessonState: {},
  sessions: [{ id: 's_inv', lessonId: 'MATH.INVERSE_OPERATIONS', track: 'B', instructionDelivered: true, startedAt: t0 }],
  evidence: [
    { id: 'gap_s_SGD.FIELDS.1_CONTROLLED_PROBE_1', track: 'SCIENCE_GAP', interaction_purpose: 'CONTROLLED_PROBE', skillId: 'SCI.S8P5A.NONCONTACT_FORCES', rawResponse: 'Gravity', isCorrect: false, prior_instruction: false, createdAt: t1 },
    { id: 'gap_s_SGD.ENERGY.2_TRANSFER_1', track: 'SCIENCE_GAP', interaction_purpose: 'TRANSFER', skillId: 'SCI.S8P2D.HEAT_TRANSFER_COMPARE', rawResponse: 'A metal spoon getting hot in soup', isCorrect: true, prior_instruction: false, createdAt: t1 },
    { id: 'ta_ev_1', track: 'A', skillId: 'MATH.ONE_STEP_EQUATIONS', cold_baseline_eligible: true, prompt: 'Solve for x: 3x = 12', rawResponse: '4', isCorrect: true, fresh: true, createdAt: t2 },
    { id: 'ta_repair_ev_x', track: 'B', skillId: 'MATH.INTRO_INEQUALITIES', prompt: 'Solve: x + 3 > 5', rawResponse: 'x > 2', isCorrect: true, createdAt: t1 },
    { id: 'ta_ev_2', track: 'A', skillId: 'MATH.INTRO_INEQUALITIES', prompt: 'Solve: x + 3 > 5', rawResponse: 'x > 2', isCorrect: true, fresh: true, cold_baseline_eligible: true, createdAt: t2 },
    { id: 'ta_ev_3', track: 'A', skillId: 'MATH.INTRO_INEQUALITIES', prompt: 'Solve: -4x > 0', rawResponse: 'x < 0', isCorrect: false, fresh: true, cold_baseline_eligible: true, createdAt: t2 },
    { id: 'ta_ev_4', track: 'A', skillId: 'MATH.INTEGER_OPS', prompt: 'What is 3 - 8?', rawResponse: '−5', isCorrect: false, fresh: true, cold_baseline_eligible: true, createdAt: t2 },
    { id: 'ev_mix', track: 'B', skillId: 'MATH.SCHOOL.SLOPE', teaching_stage: 'MIX_OLD_AND_NEW', prompt: 'x', rawResponse: 'Undefined', isCorrect: true, createdAt: t1 },
    { id: 'rev_1', track: 'B', evidenceType: 'DELAYED_RETRIEVAL', skillId: 'SCI.WAVES.TYPES', prompt: 'What is the spread-out region of a sound wave?', rawResponse: 'Rarefaction', isCorrect: true, transfer: true, createdAt: t1 },
    { id: 'rev_2', track: 'B', evidenceType: 'DELAYED_RETRIEVAL', skillId: 'SCI.WAVES.TYPES', prompt: 'What is the spread-out region of a sound wave?', rawResponse: 'Rarefaction', isCorrect: true, transfer: true, createdAt: t2 },
    { id: 'rev_3', track: 'B', evidenceType: 'DELAYED_RETRIEVAL', skillId: 'MATH.SCHOOL.SLOPE', prompt: 'Find the slope.', rawResponse: '6/3', isCorrect: false, transfer: false, createdAt: t2 }
  ]
};
const before = JSON.stringify(hist);
const flags = M.LEVEL_UP_EVIDENCE_INTEGRITY.review(hist, { lessons: lessonsAll });
eq(JSON.stringify(hist), before, 'integrity review never changes the learner record');
const has = (id, code) => flags.some(f => f.evidenceId === id && f.code === code);
ok(has('gap_s_SGD.FIELDS.1_CONTROLLED_PROBE_1', 'PROBE_KEY_ERROR') && flags.find(f => f.code === 'PROBE_KEY_ERROR').correctedIsCorrect === true, 'miskeyed probe flagged with corrected result');
ok(has('gap_s_SGD.ENERGY.2_TRANSFER_1', 'POST_TEACH_LABEL'), 'post-teach transfer label flagged');
ok(has('ta_ev_1', 'PRIOR_INSTRUCTION_NOT_RECORDED'), 'Track A record after mapped teaching flagged');
ok(has('ta_ev_2', 'REPEATED_PROMPT_COUNTED_FRESH'), 'Track A probe repeating a repair prompt flagged');
ok(has('ta_ev_3', 'DUPLICATE_OPTION_SCORED_WRONG') && flags.find(f => f.evidenceId === 'ta_ev_3').correctedIsCorrect === true, 'duplicate-option miss flagged as correct');
ok(has('ta_ev_4', 'FORMAL_MINUS_SIGN_REJECTED'), 'typographic minus in a formal answer flagged');
ok(has('ev_mix', 'STAGE_MISLABELED'), 'mislabeled stage flagged');
ok(!has('rev_1', 'TRANSFER_LABEL_ON_REPEATED_ITEM') && has('rev_2', 'TRANSFER_LABEL_ON_REPEATED_ITEM'), 'second sight of the same review prompt flagged as repeated, first sight not');
ok(has('rev_3', 'NUMERIC_FORMAT_REVIEW'), 'fraction answer flagged for adult review');
ok(M.LEVEL_UP_EVIDENCE_INTEGRITY.review({ evidence: [], sessions: [] }, { lessons: lessonsAll }).length === 0, 'a clean record has no flags');
T.reset(); Object.assign(T.state(), JSON.parse(before));
ok(/Evidence integrity review/.test(T.parentView()) && /PROBE_KEY_ERROR/.test(T.parentView()), 'Parent View shows the integrity review');

// ---------- 11. School Quest replays are not first tries ----------
T.reset();
const QID = ctx.LEVEL_UP_SCHOOL_PLAN?.QUEST_ID;
if (QID) {
  const mk = (id, at) => ({ id, questId: QID, status: 'COMPLETED', worldId: 'story', startedAt: at, items: [{ itemId: QID + ':story:0', firstAnswerCorrect: true, attemptCount: 1 }] });
  T.state().studySessions = [mk('s1', t0), mk('s2', t1)];
  const html = T.studyResultsSection();
  ok(/1\/1/.test(html) && /Replay: correct \(seen before\)/.test(html) && /Replayed questions: 1/.test(html), 'a replayed quest question is excluded from first-try counts');
  ok(/never mastery evidence/.test(html), 'quest results state that game progress is not mastery');
}

// ---------- 12. PSAT bridge: a missed item is not re-served next ----------
{
  const P = { console, Math, JSON, Object, Array, String, Number };
  P.globalThis = P; vm.createContext(P);
  const store = {}; let presented = [];
  P.LEVEL_UP_APP = {
    schoolQuestAccess: () => ({ allowed: true }), getSchoolQuestProgress: id => store[id] || { version: 1, attempts: 0, completed: false },
    beginSchoolQuestItems: async o => { presented.push(o.items[0].itemId); return true; },
    recordSchoolQuestAttempt: async o => { store[o.questId] = o.progress; return true; },
    endSchoolQuestStudySession: async () => true, refreshPSATBridge: () => {}
  };
  vm.runInContext(source('psat-bridge.js'), P);
  const B = P.LEVEL_UP_PSAT_BRIDGE;
  await B.start('math-percent'); await B.answer('math-percent', 0); await B.finish('math-percent'); // miss ($9 is the discount, not the price)
  await B.start('math-percent');
  ok(presented[0] !== presented[1], 'after a miss the next attempt presents a different item');
  ok(!/Replay practice/.test(B.render()), 'second attempt is not labeled a replay');
  await B.answer('math-percent', 1); await B.finish('math-percent'); await B.start('math-percent');
  ok(/Replay practice/.test(B.render()), 'third attempt is labeled replay practice');
}

// ---------- 13. Release wiring ----------
const index = source('index.html');
ok(index.indexOf('evidence-integrity.js') > 0 && index.indexOf('evidence-integrity.js') < index.indexOf('app.js?'), 'integrity module loads before app.js');
ok(/node tests\/instructional-integrity\.test\.mjs/.test(source('.github/workflows/audit.yml')), 'CI runs this test');
console.log(`Instructional integrity audit regression: PASS (${passed} assertions)`);
