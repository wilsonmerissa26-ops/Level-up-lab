/* Patch P Grade 4 research-informed pilot question-bank prototypes.
 * Draft content, not standardized, normed, or validated diagnostic measures.
 * Equivalent-form and reading-access effects require real-world review.
 */
(function(root){
"use strict";
const skills=[
 {id:"G4.READ.PHONICS",subject:"reading",prereq:null,description:"Multisyllabic word decoding",items:[
  ["Which word has the same ending sound as 'candle'? ",["handle","candy","canyon","cancel"],0],
  ["Which word begins with the same sound as 'phone'?",["photo","piano","pony","potato"],0],
  ["Which word has three syllables?",["computer","plan","bookcase","train"],0]]},
 {id:"G4.READ.VOCAB",subject:"reading",prereq:"G4.READ.PHONICS",description:"Vocabulary in context",items:[
  ["The field was barren; hardly any plants grew there. What does barren mean?",["without many plants","crowded","noisy","wet"],0],
  ["The coach was reluctant to cancel practice because the weather might improve. Reluctant means:",["unwilling","excited","certain","unable"],0],
  ["The glass is fragile, so carry it carefully. Fragile means:",["easily broken","very heavy","colorful","expensive"],0]]},
 {id:"G4.READ.COMP",subject:"reading",prereq:"G4.READ.VOCAB",description:"Comprehension with evidence",items:[
  ["Mina packed an umbrella after checking the dark clouds. Why did she bring it?",["She expected rain","She wanted shade","She needed a walking stick","She was going swimming"],0],
  ["The library closed early because a water pipe broke. Why did the library close?",["A pipe broke","There were no books","It was a holiday","No one visited"],0],
  ["Drew practiced his speech every afternoon. On Friday, he spoke clearly without reading his notes. What most likely helped?",["Repeated practice","Skipping rehearsal","Buying a notebook","Speaking faster"],0]]},
 {id:"G4.MATH.PLACE",subject:"math",prereq:null,description:"Place value and magnitude",items:[
  ["What is the value of 6 in 36,482?",["6,000","600","60","6"],0],
  ["Which number is greater?",["4,305","4,035","3,950","4,053"],0],
  ["What is 5,000 + 300 + 20 + 8?",["5,328","5,238","5,382","5,823"],0]]},
 {id:"G4.MATH.MULT",subject:"math",prereq:"G4.MATH.PLACE",description:"Multiplication concept and operations",items:[
  ["There are 4 rows of 7 chairs. How many chairs?",["28","11","21","32"],0],
  ["Which sum is equivalent to 3 × 5?",["5 + 5 + 5","3 + 5","3 + 3 + 3","5 + 3 + 5"],0],
  ["What is 8 × 6?",["48","42","54","14"],0]]},
 {id:"G4.MATH.DIV",subject:"math",prereq:"G4.MATH.MULT",description:"Equal sharing and inverse relationship",items:[
  ["24 apples are shared equally into 6 bags. How many in each bag?",["4","6","18","30"],0],
  ["Which multiplication fact helps solve 35 ÷ 5?",["5 × 7 = 35","5 + 7 = 12","35 × 5 = 175","7 × 7 = 49"],0],
  ["18 counters are sorted into groups of 3. How many groups?",["6","3","9","15"],0]]},
 {id:"G4.MATH.WORD",subject:"math",prereq:"G4.MATH.DIV",description:"Translate language into operations",items:[
  ["A box contains 9 markers. How many markers are in 4 boxes?",["36","13","27","45"],0],
  ["Forty stickers are shared among 8 students. How many per student?",["5","32","48","8"],0],
  ["A bus carries 26 students. At the next stop, 7 more board. How many students now?",["33","19","32","35"],0]]}
];
const registry=Object.freeze(skills.map(s=>Object.freeze({
 id:s.id,subject:s.subject,prereq:s.prereq,description:s.description,
 items:Object.freeze(s.items.map((a,i)=>Object.freeze({id:s.id+".P"+(i+1),skillId:s.id,grade:4,subject:s.subject,prompt:a[0].trim(),choices:Object.freeze(a[1].slice()),answerIndex:a[2],status:"PILOT_DRAFT",standardAlignment:"PENDING_REVIEW"})))
})));
function skill(id){return registry.find(s=>s.id===id)||null}
function plan(skillIds){const wanted=new Set(skillIds);return registry.filter(s=>wanted.has(s.id)).map(s=>({skillId:s.id,prereq:s.prereq,items:s.items.map(q=>q.id)}))}
function reviewProbes(records){
 // Independent, distinct items only. A rapid-response flag is a review cue, not a student label.
 const grouped={};
 (Array.isArray(records)?records:[]).forEach(r=>{
  const s=skill(r.skillId);if(!s||!s.items.some(q=>q.id===r.itemId))return;
  (grouped[r.skillId]??=[]).push(r);
 });
 return Object.keys(grouped).map(id=>{
  const valid=grouped[id].filter(r=>r.independent===true&&r.fresh===true&&r.reliable===true&&r.responseQualityFlag!=="REVIEW"&&typeof r.correct==="boolean");
  const distinct=[...new Map(valid.map(r=>[r.itemId,r])).values()];
  const correct=distinct.filter(r=>r.correct).length;
  const enough=distinct.length>=3;
  return {skillId:id,usableCount:distinct.length,correctCount:correct,status:!enough?"INSUFFICIENT_EVIDENCE":correct===distinct.length?"PROVISIONAL_ONLY":"INVESTIGATE_GAP",prerequisite:skill(id).prereq};
 });
}
root.LEVEL_UP_GRADE4_DIAGNOSTIC=Object.freeze({version:"0.1.0",skills:registry,skill,plan,reviewProbes});
})(typeof globalThis!=="undefined"?globalThis:window);
