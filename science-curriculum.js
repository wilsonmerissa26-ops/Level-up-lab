(() => {
  const TEACHING_CYCLE=Object.freeze([
    "TEACH","MODEL","GUIDED_PRACTICE","HELP","FADE_HELP","INDEPENDENT_CHECK",
    "MIX_OLD_AND_NEW","RECHECK_LATER","GENERALIZE"
  ]);
  const PERFORMANCE_MODES=Object.freeze([
    "VOCABULARY","CONCEPT","MODEL","DATA_GRAPH","INVESTIGATION",
    "EXPLANATION","ARGUMENT_FROM_EVIDENCE","CALCULATION_APPLICATION"
  ]);

  const units=[
    {
      id:"SCI.G8.MATTER",order:1,standard:"S8P1",title:"Matter, Atoms + the Periodic Table",
      coreElements:["S8P1.a","S8P1.b","S8P1.c","S8P1.d","S8P1.e","S8P1.f"],
      targets:[
        ["SCI.S8P1A.PURE_VS_MIXTURE","S8P1.a","Pure substances vs mixtures",["VOCABULARY","CONCEPT","MODEL"]],
        ["SCI.S8P1A.ELEMENT_VS_COMPOUND","S8P1.a","Elements vs compounds",["VOCABULARY","CONCEPT","MODEL"]],
        ["SCI.S8P1A.HOMOGENEOUS_HETEROGENEOUS","S8P1.a","Homogeneous vs heterogeneous mixtures",["CONCEPT","MODEL"]],
        ["SCI.S8P1A.PARTICLE_MODELS_CLASSIFY","S8P1.a","Classify matter from particle models",["MODEL","EXPLANATION"]],
        ["SCI.S8P1B.STATES_PARTICLE_MODEL","S8P1.b","Particle models of solids, liquids, gases + plasma",["CONCEPT","MODEL"]],
        ["SCI.S8P1B.THERMAL_PARTICLE_MOTION","S8P1.b","Thermal energy and particle motion",["CONCEPT","MODEL","EXPLANATION"]],
        ["SCI.S8P1B.STATE_CHANGE_MODEL","S8P1.b","Model particle changes as thermal energy is added or removed",["MODEL","EXPLANATION"]],
        ["SCI.S8P1C.PHYSICAL_PROPERTIES","S8P1.c","Physical properties: density, melting point + boiling point",["VOCABULARY","CONCEPT","INVESTIGATION","DATA_GRAPH"]],
        ["SCI.S8P1C.CHEMICAL_PROPERTIES","S8P1.c","Chemical properties: reactivity + combustibility",["VOCABULARY","CONCEPT","INVESTIGATION"]],
        ["SCI.S8P1C.PROPERTY_INVESTIGATION","S8P1.c","Compare properties from investigation evidence",["INVESTIGATION","DATA_GRAPH","EXPLANATION"]],
        ["SCI.S8P1D.PHYSICAL_CHANGE","S8P1.d","Identify and justify physical changes",["CONCEPT","ARGUMENT_FROM_EVIDENCE"]],
        ["SCI.S8P1D.CHEMICAL_CHANGE","S8P1.d","Identify and justify chemical changes",["CONCEPT","ARGUMENT_FROM_EVIDENCE"]],
        ["SCI.S8P1D.CHANGE_EVIDENCE","S8P1.d","Use observations to support change classification",["INVESTIGATION","ARGUMENT_FROM_EVIDENCE"]],
        ["SCI.S8P1E.ATOM_STRUCTURE","S8P1.e","Protons, neutrons + electrons in atomic models",["VOCABULARY","CONCEPT","MODEL"]],
        ["SCI.S8P1E.PERIODIC_PATTERNS","S8P1.e","Use periodic-table patterns to describe atoms",["MODEL","DATA_GRAPH","EXPLANATION"]],
        ["SCI.S8P1E.SIMPLE_MOLECULE_MODELS","S8P1.e","Build and interpret simple molecule models",["MODEL","EXPLANATION"]],
        ["SCI.S8P1F.CONSERVATION_MATTER_MODEL","S8P1.f","Model conservation of matter in reactions",["MODEL","ARGUMENT_FROM_EVIDENCE"]],
        ["SCI.S8P1F.REACTANTS_PRODUCTS","S8P1.f","Explain reactants, products + conserved matter",["VOCABULARY","EXPLANATION","ARGUMENT_FROM_EVIDENCE"]]
      ]
    },
    {
      id:"SCI.G8.ENERGY",order:2,standard:"S8P2",title:"Energy + Heat Transfer",
      coreElements:["S8P2.a","S8P2.b","S8P2.c","S8P2.d"],
      targets:[
        ["SCI.S8P2.CONSERVATION","S8P2","Conservation of energy in a system",["CONCEPT","EXPLANATION","ARGUMENT_FROM_EVIDENCE"]],
        ["SCI.S8P2A.KINETIC_MASS","S8P2.a","Kinetic energy pattern with mass",["CONCEPT","DATA_GRAPH"]],
        ["SCI.S8P2A.KINETIC_SPEED","S8P2.a","Kinetic energy pattern with speed",["CONCEPT","DATA_GRAPH"]],
        ["SCI.S8P2A.POTENTIAL_MASS","S8P2.a","Potential energy pattern with mass",["CONCEPT","DATA_GRAPH"]],
        ["SCI.S8P2A.POTENTIAL_HEIGHT","S8P2.a","Potential energy pattern with height",["CONCEPT","DATA_GRAPH"]],
        ["SCI.S8P2A.GRAPH_ENERGY_RELATIONSHIPS","S8P2.a","Create and interpret energy relationship graphs",["DATA_GRAPH","EXPLANATION"]],
        ["SCI.S8P2B.KINETIC_POTENTIAL_SYSTEM","S8P2.b","Kinetic ↔ potential transformation within systems",["CONCEPT","MODEL","INVESTIGATION"]],
        ["SCI.S8P2B.ENERGY_INVESTIGATION","S8P2.b","Investigate roller coaster, pendulum or elastic systems",["INVESTIGATION","DATA_GRAPH","EXPLANATION"]],
        ["SCI.S8P2C.ENERGY_TRANSFORMATIONS","S8P2.c","Identify energy transformations in real systems",["CONCEPT","MODEL","ARGUMENT_FROM_EVIDENCE"]],
        ["SCI.S8P2C.TRANSFORMATION_CHAINS","S8P2.c","Trace multi-step energy transformation chains",["MODEL","EXPLANATION"]],
        ["SCI.S8P2D.CONDUCTION","S8P2.d","Conduction through particle collisions",["CONCEPT","MODEL","INVESTIGATION"]],
        ["SCI.S8P2D.CONVECTION","S8P2.d","Convection through currents in fluids",["CONCEPT","MODEL","INVESTIGATION"]],
        ["SCI.S8P2D.RADIATION","S8P2.d","Radiation through space",["CONCEPT","MODEL","INVESTIGATION"]],
        ["SCI.S8P2D.HEAT_TRANSFER_COMPARE","S8P2.d","Compare conduction, convection + radiation from evidence",["DATA_GRAPH","EXPLANATION","ARGUMENT_FROM_EVIDENCE"]]
      ]
    },
    {
      id:"SCI.G8.FORCE_MOTION",order:3,standard:"S8P3",title:"Force, Mass + Motion",
      coreElements:["S8P3.a","S8P3.b","S8P3.c"],
      targets:[
        ["SCI.S8P3A.SPEED_DISTANCE_PATTERNS","S8P3.a","Patterns between speed + distance",["CONCEPT","DATA_GRAPH"]],
        ["SCI.S8P3A.VELOCITY_ACCELERATION_PATTERNS","S8P3.a","Patterns involving velocity + acceleration",["CONCEPT","DATA_GRAPH"]],
        ["SCI.S8P3A.MOTION_GRAPHS","S8P3.a","Interpret motion graphs",["DATA_GRAPH","EXPLANATION"]],
        ["SCI.S8P3B.BALANCED_FORCES","S8P3.b","Balanced forces and motion",["CONCEPT","MODEL","EXPLANATION"]],
        ["SCI.S8P3B.UNBALANCED_FORCES","S8P3.b","Unbalanced forces and changes in motion",["CONCEPT","MODEL","EXPLANATION"]],
        ["SCI.S8P3B.NEWTON_LAWS","S8P3.b","Use Newton's Laws to explain motion",["CONCEPT","MODEL","EXPLANATION"]],
        ["SCI.S8P3C.MASS_INERTIA","S8P3.c","Mass, inertia + resistance to acceleration",["CONCEPT","INVESTIGATION","ARGUMENT_FROM_EVIDENCE"]],
        ["SCI.S8P3C.FORCE_MASS_ACCELERATION_EVIDENCE","S8P3.c","Use evidence to argue how required force changes with mass",["DATA_GRAPH","INVESTIGATION","ARGUMENT_FROM_EVIDENCE"]]
      ]
    },
    {
      id:"SCI.G8.WAVES",order:4,standard:"S8P4",title:"Waves, Light + Sound",
      coreElements:["S8P4.a","S8P4.b","S8P4.c","S8P4.d","S8P4.e","S8P4.f","S8P4.g"],
      targets:[
        ["SCI.S8P4A.MECHANICAL_VS_EM","S8P4.a","Mechanical vs electromagnetic waves",["VOCABULARY","CONCEPT","EXPLANATION"]],
        ["SCI.S8P4A.TRANSVERSE_LONGITUDINAL","S8P4.a","Transverse vs longitudinal wave models",["VOCABULARY","MODEL"]],
        ["SCI.S8P4A.WAVE_PARTS","S8P4.a","Crests, troughs, compressions + rarefactions",["VOCABULARY","MODEL"]],
        ["SCI.S8P4B.EM_SPECTRUM_ORDER","S8P4.b","Electromagnetic spectrum patterns",["VOCABULARY","MODEL","DATA_GRAPH"]],
        ["SCI.S8P4B.EM_ENERGY_RELATIONSHIP","S8P4.b","Use data to explain EM spectrum energy",["DATA_GRAPH","EXPLANATION"]],
        ["SCI.S8P4C.EM_APPLICATION_DEVICE","S8P4.c","Design a practical EM-spectrum application",["MODEL","INVESTIGATION","EXPLANATION"]],
        ["SCI.S8P4D.REFLECTION","S8P4.d","Reflection of light and sound",["CONCEPT","MODEL"]],
        ["SCI.S8P4D.REFRACTION","S8P4.d","Refraction through materials",["CONCEPT","MODEL"]],
        ["SCI.S8P4D.ABSORPTION_TRANSMISSION","S8P4.d","Absorption and transmission",["CONCEPT","MODEL"]],
        ["SCI.S8P4D.DIFFRACTION","S8P4.d","Diffraction around openings and barriers",["CONCEPT","MODEL"]],
        ["SCI.S8P4D.COLOR_ECHO","S8P4.d","Use wave behavior to explain color + echo",["MODEL","EXPLANATION"]],
        ["SCI.S8P4E.MEDIA_DENSITY_SPEED","S8P4.e","Media density and wave-speed patterns",["DATA_GRAPH","EXPLANATION"]],
        ["SCI.S8P4F.FREQUENCY_WAVELENGTH","S8P4.f","Frequency and wavelength relationships",["MODEL","DATA_GRAPH"]],
        ["SCI.S8P4F.AMPLITUDE_ENERGY","S8P4.f","Amplitude and energy relationships",["MODEL","DATA_GRAPH","EXPLANATION"]],
        ["SCI.S8P4F.WAVE_MODEL_PREDICTION","S8P4.f","Predict wave behavior from models and graphs",["MODEL","DATA_GRAPH","EXPLANATION"]],
        ["SCI.S8P4G.LENSES_IMAGE_FORMATION","S8P4.g","Lenses and image formation",["CONCEPT","MODEL"]],
        ["SCI.S8P4G.LENS_APPLICATIONS","S8P4.g","Technological uses of lenses",["MODEL","EXPLANATION"]]
      ]
    },
    {
      id:"SCI.G8.FORCES_NATURE",order:5,standard:"S8P5",title:"Gravity, Electricity + Magnetism",
      coreElements:["S8P5.a","S8P5.b","S8P5.c"],
      targets:[
        ["SCI.S8P5A.NONCONTACT_FORCES","S8P5.a","Forces acting without contact",["CONCEPT","MODEL","ARGUMENT_FROM_EVIDENCE"]],
        ["SCI.S8P5A.GRAVITATIONAL_FIELDS","S8P5.a","Gravitational fields",["CONCEPT","MODEL"]],
        ["SCI.S8P5A.ELECTRIC_FIELDS","S8P5.a","Electric fields",["CONCEPT","MODEL"]],
        ["SCI.S8P5A.MAGNETIC_FIELDS","S8P5.a","Magnetic fields",["CONCEPT","MODEL"]],
        ["SCI.S8P5B.CHARGE_DISTRIBUTION","S8P5.b","Charge distribution in conductors vs insulators",["CONCEPT","MODEL","INVESTIGATION"]],
        ["SCI.S8P5B.CONDUCTORS_INSULATORS","S8P5.b","Use evidence to compare conductors + insulators",["INVESTIGATION","ARGUMENT_FROM_EVIDENCE"]],
        ["SCI.S8P5C.DISTANCE_FORCE","S8P5.c","How distance affects electric + magnetic force strength",["INVESTIGATION","DATA_GRAPH","ARGUMENT_FROM_EVIDENCE"]],
        ["SCI.S8P5C.ELECTROMAGNET_TURNS","S8P5.c","Wire turns and electromagnet strength",["INVESTIGATION","DATA_GRAPH"]],
        ["SCI.S8P5C.ELECTROMAGNET_CELLS","S8P5.c","Number/size of dry cells and electromagnet strength",["INVESTIGATION","DATA_GRAPH"]],
        ["SCI.S8P5C.ELECTROMAGNET_CORE","S8P5.c","Iron-core size and electromagnet strength",["INVESTIGATION","DATA_GRAPH"]],
        ["SCI.S8P5C.FORCE_FACTOR_ARGUMENT","S8P5.c","Argue which factors strengthen electric or magnetic forces",["DATA_GRAPH","ARGUMENT_FROM_EVIDENCE"]]
      ]
    }
  ].map(unit=>Object.freeze({
    ...unit,
    targets:Object.freeze(unit.targets.map(([id,standard,title,modes])=>Object.freeze({
      id,standard,title,modes:Object.freeze(modes),status:"CURRICULUM_TARGET"
    })))
  }));

  const schoolExtensions=Object.freeze([
    {id:"SCI.EXT.DOPPLER",title:"Doppler effect and red/blue shifts",reason:"Teacher-supplied Unit 2 AKS 9e",legacyLessonIds:["SCI.WAVES.DOPPLER"]},
    {id:"SCI.EXT.INTERFERENCE",title:"Constructive and destructive interference",reason:"Teacher packet school-specific extension",legacyLessonIds:["SCI.WAVES.INTERFERENCE"]},
    {id:"SCI.EXT.SEISMIC",title:"Seismic waves and seismographs",reason:"Teacher packet school-specific application",legacyLessonIds:["SCI.WAVES.SEISMIC"]},
    {id:"SCI.EXT.ENERGY_FORMS",title:"Energy forms vocabulary",reason:"Preserve Michael's existing school instruction even though it is broader than one Grade 8 element.",legacyLessonIds:["SCI.SPS7A.ENERGY_FORMS"]},
    {id:"SCI.EXT.TRANSFER_TRANSFORMATION",title:"Transfer vs transformation distinction",reason:"Existing school-specific teaching target.",legacyLessonIds:["SCI.SPS7A.TRANSFER_TRANSFORMATION"]},
    {id:"SCI.EXT.MECHANICAL_ENERGY",title:"Mechanical energy as kinetic + potential",reason:"Existing school-specific teaching target.",legacyLessonIds:["SCI.SPS7B.MECHANICAL"]},
    {id:"SCI.EXT.SPECIFIC_HEAT_CONCEPT",title:"Specific heat concept",reason:"School-specific extension beyond Georgia Grade 8 core.",legacyLessonIds:["SCI.SPS7E.CONCEPT"]},
    {id:"SCI.EXT.QMC_SYMBOLS",title:"Q, m, c + ΔT symbols and units",reason:"School-specific quantitative extension.",legacyLessonIds:["SCI.SPS7E.SYMBOLS_UNITS"]},
    {id:"SCI.EXT.DELTA_T",title:"Temperature change ΔT",reason:"School-specific quantitative extension.",legacyLessonIds:["SCI.SPS7E.DELTA_T"]},
    {id:"SCI.EXT.QMC_SETUP",title:"Q = mcΔT setup",reason:"School-specific quantitative extension.",legacyLessonIds:["SCI.SPS7E.FORMULA_SETUP"]},
    {id:"SCI.EXT.QMC_REARRANGE",title:"Science formula rearrangement",reason:"School-specific cross-subject extension.",legacyLessonIds:["SCI.SPS7E.LITERAL_REARRANGE"]},
    {id:"SCI.EXT.QMC_CALCULATION",title:"Specific heat calculations",reason:"School-specific quantitative extension.",legacyLessonIds:["SCI.SPS7E.CALCULATION"]}
  ]);

  const legacyAlignment=Object.freeze({
    "SCI.WAVES.TYPES":["SCI.S8P4A.MECHANICAL_VS_EM"],
    "SCI.WAVES.RELATIONSHIPS":["SCI.S8P4F.FREQUENCY_WAVELENGTH"],
    "SCI.WAVES.BEHAVIORS":["SCI.S8P4D.REFLECTION"],
    "SCI.WAVES.INTERFERENCE":["SCI.S8P4D.ABSORPTION_TRANSMISSION"],
    "SCI.WAVES.SPEED":["SCI.S8P4E.MEDIA_DENSITY_SPEED"],
    "SCI.WAVES.LIGHT":["SCI.S8P4B.EM_SPECTRUM_ORDER"],
    "SCI.WAVES.SEISMIC":["SCI.S8P4A.TRANSVERSE_LONGITUDINAL"],
    "SCI.WAVES.DOPPLER":["SCI.EXT.DOPPLER"],

    "SCI.SPS7A.ENERGY_FORMS":["SCI.S8P2.CONSERVATION","SCI.S8P2C.ENERGY_TRANSFORMATIONS","SCI.EXT.ENERGY_FORMS"],
    "SCI.SPS7A.TRANSFER_TRANSFORMATION":["SCI.S8P2C.ENERGY_TRANSFORMATIONS","SCI.S8P2C.TRANSFORMATION_CHAINS","SCI.EXT.TRANSFER_TRANSFORMATION"],
    "SCI.SPS7B.MECHANICAL":["SCI.S8P2A.KINETIC_MASS","SCI.S8P2A.KINETIC_SPEED","SCI.S8P2A.POTENTIAL_MASS","SCI.S8P2A.POTENTIAL_HEIGHT","SCI.S8P2B.KINETIC_POTENTIAL_SYSTEM","SCI.EXT.MECHANICAL_ENERGY"],
    "SCI.SPS7C.HEAT_TRANSFER":["SCI.S8P2D.CONDUCTION","SCI.S8P2D.CONVECTION","SCI.S8P2D.RADIATION","SCI.S8P2D.HEAT_TRANSFER_COMPARE"],
    "SCI.SPS7D.PARTICLE_MOTION":["SCI.S8P1B.THERMAL_PARTICLE_MOTION","SCI.S8P1B.STATE_CHANGE_MODEL"],
    "SCI.SPS7E.CONCEPT":["SCI.EXT.SPECIFIC_HEAT_CONCEPT"],
    "SCI.SPS7E.SYMBOLS_UNITS":["SCI.EXT.QMC_SYMBOLS"],
    "SCI.SPS7E.DELTA_T":["SCI.EXT.DELTA_T"],
    "SCI.SPS7E.FORMULA_SETUP":["SCI.EXT.QMC_SETUP"],
    "SCI.SPS7E.LITERAL_REARRANGE":["SCI.EXT.QMC_REARRANGE"],
    "SCI.SPS7E.CALCULATION":["SCI.EXT.QMC_CALCULATION"]
  });

  const clarificationBoundaries=Object.freeze({
    "S8P3.a":"Core requires motion-graph/data interpretation; do not require Grade 8 students to calculate velocity or acceleration unless Michael's school course separately teaches it.",
    "S8P4.d":"Core wave behavior includes reflection, refraction, absorption, diffraction and transmission. Interference and scattering are not Grade 8 core targets here.",
    "S8P5":"Core focuses on fields, charge distribution, and factors affecting electric/magnetic force strength. Circuit voltage/current/resistance may be added only as school-specific extension if teacher material requires it."
  });

  function allTargets(){return units.flatMap(u=>u.targets)}
  function target(id){return allTargets().find(x=>x.id===id)||null}
  function unit(id){return units.find(x=>x.id===id)||null}
  function standardsCoverage(){
    const expected=["S8P1.a","S8P1.b","S8P1.c","S8P1.d","S8P1.e","S8P1.f","S8P2.a","S8P2.b","S8P2.c","S8P2.d","S8P3.a","S8P3.b","S8P3.c","S8P4.a","S8P4.b","S8P4.c","S8P4.d","S8P4.e","S8P4.f","S8P4.g","S8P5.a","S8P5.b","S8P5.c"];
    const covered=new Set(allTargets().map(t=>t.standard).filter(x=>/^[A-Z0-9]+\.[a-z]$/.test(x)));
    return {expected,covered:[...covered],missing:expected.filter(x=>!covered.has(x))};
  }

  const api=Object.freeze({
    version:"1.0.0",
    grade:"8",
    course:"Physical Science",
    jurisdiction:"Georgia",
    standardsFamily:Object.freeze(["S8P1","S8P2","S8P3","S8P4","S8P5"]),
    teachingCycle:TEACHING_CYCLE,
    performanceModes:PERFORMANCE_MODES,
    units:Object.freeze(units),
    schoolExtensions,
    legacyAlignment,
    clarificationBoundaries,
    allTargets,target,unit,standardsCoverage
  });

  if(typeof window!=="undefined")window.LEVEL_UP_SCIENCE_CURRICULUM=api;
  if(typeof globalThis!=="undefined")globalThis.LEVEL_UP_SCIENCE_CURRICULUM=api;
})();
