// Read-only integrity review of saved learner evidence (October 21, 2026 audit).
// It never changes a record. It reports records that were written by a since-corrected scoring or labeling rule,
// with the corrected reading, so an adult can see which results should not be relied on.
(() => {
  const CODES = Object.freeze({
    PROBE_KEY_ERROR: "Science Gap simplified probe was scored against the wrong option list (SGD.FIELDS.1).",
    POST_TEACH_LABEL: "Science Gap transfer response came after teaching but was saved as prior_instruction:false.",
    PRIOR_INSTRUCTION_NOT_RECORDED: "Track A evidence was labeled cold-baseline eligible although mapped Level-Up teaching had already been delivered.",
    REPEATED_PROMPT_COUNTED_FRESH: "Track A probe was counted as fresh although the same prompt had already been practiced with its answer shown.",
    DUPLICATE_OPTION_SCORED_WRONG: "Track A inequality item showed two identical correct options; the second one was scored wrong.",
    STAGE_MISLABELED: "Item was labeled MIX_OLD_AND_NEW but tested the same lesson; it is an independent check.",
    REPEATED_REVIEW_ITEM: "Delayed review item had already been seen, so it is practice evidence rather than retention evidence.",
    TRANSFER_LABEL_ON_REPEATED_ITEM: "Delayed review item was labeled transfer but repeated an earlier prompt.",
    NUMERIC_FORMAT_REVIEW: "Typed numeric answer used a fraction, a typographic minus, or shown work, which the old matcher could misread.",
    FORMAL_MINUS_SIGN_REJECTED: "Track A answer was typed with a typographic minus sign, which the old parser rejected; an adult should check it."
  });

  const fp = text => String(text ?? "").trim().toLowerCase().replace(/\s+/g, " ");
  const ms = iso => { const t = new Date(iso).getTime(); return Number.isFinite(t) ? t : null; };

  function review(state, { lessons = [] } = {}) {
    const evidence = Array.isArray(state?.evidence) ? state.evidence : [];
    const sessions = Array.isArray(state?.sessions) ? state.sessions : [];
    const flags = [];
    const add = (e, code, extra = {}) => flags.push({ evidenceId: e.id, skillId: e.skillId || null, createdAt: e.createdAt || null, code, detail: CODES[code], ...extra });

    // Earliest moment Level-Up teaching mapped to each Track A skill was delivered.
    const firstTaught = new Map();
    for (const l of lessons) for (const skill of l.priorSkillIds || []) {
      const times = [
        ...sessions.filter(s => s.lessonId === l.id && s.instructionDelivered === true).map(s => ms(s.startedAt)),
        ...evidence.filter(e => e.skillId === l.id && e.instruction_exposure_status === "PRIOR_INSTRUCTION").map(e => ms(e.createdAt))
      ].filter(t => t != null);
      if (!times.length) continue;
      const t = Math.min(...times);
      if (!firstTaught.has(skill) || t < firstTaught.get(skill)) firstTaught.set(skill, t);
    }
    // Immediate lesson prompts count as already seen for later reviews of the same lesson.
    const lessonPrompts = new Map(lessons.map(l => [l.id, new Set((l.checks || []).map(q => fp(q.q)))]));
    const ordered = evidence.slice().sort((a, b) => (ms(a.createdAt) ?? 0) - (ms(b.createdAt) ?? 0));
    const seenBefore = (e, filter) => ordered.some(o => o !== e && o.skillId === e.skillId && o.prompt && fp(o.prompt) === fp(e.prompt) && (ms(o.createdAt) ?? 0) < (ms(e.createdAt) ?? 0) && (!filter || filter(o)));

    for (const e of ordered) {
      if (e.track === "SCIENCE_GAP") {
        // Records written before the fix lack cold_scope; the probe for SGD.FIELDS.1 was the miskeyed one.
        if (e.interaction_purpose === "CONTROLLED_PROBE" && String(e.id || "").includes("_SGD.FIELDS.1_") && e.cold_scope === undefined) {
          add(e, "PROBE_KEY_ERROR", { savedIsCorrect: e.isCorrect === true, correctedIsCorrect: e.rawResponse === "Gravity" });
        }
        if (e.interaction_purpose === "TRANSFER" && e.prior_instruction === false) add(e, "POST_TEACH_LABEL", { correctedPriorInstruction: true });
        continue;
      }
      if (e.track === "A") {
        const taught = firstTaught.get(e.skillId);
        if (e.cold_baseline_eligible === true && taught != null && taught < (ms(e.createdAt) ?? Infinity)) add(e, "PRIOR_INSTRUCTION_NOT_RECORDED", { correctedLabel: "PRIOR_INSTRUCTION" });
        if (e.fresh === true && e.prompt && seenBefore(e, o => o.track !== "A")) add(e, "REPEATED_PROMPT_COUNTED_FRESH", { correctedFresh: false });
        if (e.isCorrect === false && /^\s*(x\s*=\s*)?[\u2212\u2013\u2014]\s*\d/.test(String(e.rawResponse || ""))) add(e, "FORMAL_MINUS_SIGN_REJECTED");
        if (/^Solve: -\d+x > 0$/.test(String(e.prompt || "")) && e.rawResponse === "x < 0" && e.isCorrect === false) add(e, "DUPLICATE_OPTION_SCORED_WRONG", { savedIsCorrect: false, correctedIsCorrect: true });
        continue;
      }
      if (e.track === "B") {
        if (e.teaching_stage === "MIX_OLD_AND_NEW" && /^(MATH\.SCHOOL\.|ELA\.ODYSSEUS\.)/.test(String(e.skillId || ""))) add(e, "STAGE_MISLABELED", { correctedStage: "INDEPENDENT_CHECK" });
        if (e.evidenceType === "DELAYED_RETRIEVAL" && e.previously_seen === undefined && e.prompt) {
          const repeated = seenBefore(e) || (lessonPrompts.get(e.skillId)?.has(fp(e.prompt)) ?? false);
          if (repeated) add(e, e.transfer === true ? "TRANSFER_LABEL_ON_REPEATED_ITEM" : "REPEATED_REVIEW_ITEM", { correctedRole: "PRACTICE" });
        }
        if (typeof e.rawResponse === "string" && e.isCorrect !== null && e.review_rubric == null && /[−–—\/=]/.test(e.rawResponse) && /\d/.test(e.rawResponse)) add(e, "NUMERIC_FORMAT_REVIEW");
      }
    }
    return flags;
  }

  function summary(flags) {
    const counts = {};
    for (const f of flags) counts[f.code] = (counts[f.code] || 0) + 1;
    return counts;
  }

  const api = Object.freeze({ CODES, review, summary });
  if (typeof window !== "undefined") window.LEVEL_UP_EVIDENCE_INTEGRITY = api;
  if (typeof globalThis !== "undefined") globalThis.LEVEL_UP_EVIDENCE_INTEGRITY = api;
})();
