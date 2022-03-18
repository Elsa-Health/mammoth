var __defProp = Object.defineProperty;
var __defProps = Object.defineProperties;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropDescs = Object.getOwnPropertyDescriptors;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getOwnPropSymbols = Object.getOwnPropertySymbols;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __propIsEnum = Object.prototype.propertyIsEnumerable;
var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __spreadValues = (a, b) => {
  for (var prop in b || (b = {}))
    if (__hasOwnProp.call(b, prop))
      __defNormalProp(a, prop, b[prop]);
  if (__getOwnPropSymbols)
    for (var prop of __getOwnPropSymbols(b)) {
      if (__propIsEnum.call(b, prop))
        __defNormalProp(a, prop, b[prop]);
    }
  return a;
};
var __spreadProps = (a, b) => __defProps(a, __getOwnPropDescs(b));
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

// src/base.ts
var base_exports = {};
__export(base_exports, {
  conditions: () => conditions,
  donparMap: () => donparMap,
  symptoms: () => symptoms,
  symptomsLocale: () => symptomsLocale
});
module.exports = __toCommonJS(base_exports);

// data/core/symptoms-base.json
var abdominal_distension = {
  location: [],
  duration: [],
  onset: [
    "gradual"
  ],
  nature: [
    "symmetrical",
    "asymmetrical"
  ],
  periodicity: [],
  aggravators: [
    "constipation"
  ],
  reducers: []
};
var abdominal_pain = {
  location: [
    "lower",
    "upper"
  ],
  duration: [
    "less-than-two-weeks",
    "more-than-two-weeks"
  ],
  onset: [
    "sudden",
    "gradual"
  ],
  nature: [
    "generalized",
    "localized"
  ],
  periodicity: [
    "non-specific"
  ],
  aggravators: [],
  reducers: []
};
var abdominal_tenderness = {
  location: [],
  duration: [],
  onset: [],
  nature: [],
  periodicity: [
    "intermittent",
    "sustained"
  ],
  aggravators: [],
  reducers: []
};
var ageusia = {
  location: [],
  duration: [
    "less-than-two-weeks",
    "more-than-two-weeks"
  ],
  onset: [
    "sudden",
    "gradual"
  ],
  nature: [],
  periodicity: [
    "intermittent",
    "sustained",
    "non-specific",
    "morning"
  ],
  aggravators: [
    "cold-weather"
  ],
  reducers: []
};
var angular_cheilitis = {
  location: [],
  duration: [],
  onset: [],
  nature: [],
  periodicity: [],
  aggravators: [],
  reducers: []
};
var anosmia = {
  location: [],
  duration: [
    "less-than-two-weeks",
    "more-than-two-weeks"
  ],
  onset: [
    "sudden",
    "gradual"
  ],
  nature: [
    "mild"
  ],
  periodicity: [
    "intermittent",
    "sustained",
    "non-specific",
    "morning"
  ],
  aggravators: [
    "cold-weather"
  ],
  reducers: []
};
var ascites = {
  location: [],
  duration: [],
  onset: [],
  nature: [
    "mild",
    "moderate",
    "severe"
  ],
  periodicity: [],
  aggravators: [],
  reducers: []
};
var blood_pressure = {
  location: [],
  duration: [],
  onset: [],
  nature: [
    "normal",
    "low",
    "high"
  ],
  periodicity: [],
  aggravators: [],
  reducers: []
};
var bow_legs = {
  location: [],
  duration: [],
  onset: [],
  nature: [],
  periodicity: [],
  aggravators: [],
  reducers: []
};
var brudzinskis_sign = {
  location: [],
  duration: [],
  onset: [],
  nature: [],
  periodicity: [],
  aggravators: [],
  reducers: []
};
var capillary_refill = {
  location: [],
  duration: [],
  onset: [],
  nature: [
    "two-to-three-seconds",
    "three-to-four-seconds",
    "more-than-four-seconds"
  ],
  periodicity: [],
  aggravators: [],
  reducers: []
};
var cardiomegaly = {
  location: [],
  duration: [],
  onset: [],
  nature: [],
  periodicity: [],
  aggravators: [],
  reducers: []
};
var chest_pain = {
  location: [],
  duration: [
    "less-than-two-weeks",
    "more-than-two-weeks"
  ],
  onset: [
    "sudden",
    "gradual"
  ],
  nature: [
    "sharp",
    "stabbing",
    "dull",
    "aching",
    "colic"
  ],
  periodicity: [
    "non-specific",
    "intermittent",
    "morning"
  ],
  aggravators: [
    "deep-breathing",
    "coughing",
    "exercise",
    "light-activity"
  ],
  reducers: [
    "rest",
    "laying-down"
  ]
};
var chest_tightness = {
  location: [],
  duration: [
    "less-than-two-weeks",
    "more-than-two-weeks"
  ],
  onset: [
    "sudden",
    "gradual"
  ],
  nature: [],
  periodicity: [
    "non-specific",
    "intermittent",
    "morning",
    "night"
  ],
  aggravators: [
    "deep-breathing",
    "light-activity",
    "laying-down"
  ],
  reducers: [
    "rest",
    "laying-down",
    "sleeping"
  ]
};
var clubbing = {
  location: [
    "hands",
    "feet"
  ],
  duration: [],
  onset: [],
  nature: [],
  periodicity: [],
  aggravators: [],
  reducers: []
};
var constipation = {
  location: [],
  duration: [
    "more-than-two-weeks"
  ],
  onset: [
    "gradual"
  ],
  nature: [
    "hard-stool",
    "blood-stool",
    "melena-stool"
  ],
  periodicity: [
    "non-specific"
  ],
  aggravators: [],
  reducers: [
    "stool-softeners"
  ]
};
var convulsions = {
  location: [],
  duration: [
    "less-than-two-days",
    "more-than-two-days"
  ],
  onset: [
    "sudden",
    "gradual"
  ],
  nature: [],
  periodicity: [
    "sustained",
    "night"
  ],
  aggravators: [],
  reducers: [
    "sleeping"
  ]
};
var cough = {
  location: [],
  duration: [
    "less-than-five-days",
    "five-days-to-three-weeks",
    "three-to-eight-weeks",
    "more-than-eight-weeks"
  ],
  onset: [
    "sudden",
    "gradual"
  ],
  nature: [
    "dry",
    "yellow-sputum",
    "green-sputum",
    "clear-sputum",
    "jelly-like-sputum",
    "blood-stained",
    "rusty-red-sputum"
  ],
  periodicity: [
    "morning",
    "night",
    "intermittent",
    "non-specific"
  ],
  aggravators: [
    "dust",
    "pollen",
    "smoke",
    "laying-down",
    "bright-lights",
    "exercise",
    "cold-weather",
    "non-steroidal-anti-inflammatory-drugs"
  ],
  reducers: [
    "antihistamines",
    "sleeping",
    "cough-suppressants"
  ]
};
var crying = {
  location: [],
  duration: [
    "less-than-two-days"
  ],
  onset: [
    "sudden",
    "gradual"
  ],
  nature: [
    "high-pitched"
  ],
  periodicity: [
    "intermittent",
    "non-specific"
  ],
  aggravators: [],
  reducers: [
    "pain-relievers"
  ]
};
var cyanosis = {
  location: [],
  duration: [],
  onset: [],
  nature: [
    "central",
    "peripheral"
  ],
  periodicity: [],
  aggravators: [],
  reducers: []
};
var dactylitis = {
  location: [
    "hand",
    "foot"
  ],
  duration: [],
  onset: [],
  nature: [],
  periodicity: [],
  aggravators: [],
  reducers: []
};
var dehydration = {
  location: [],
  duration: [],
  onset: [],
  nature: [
    "mild",
    "severe"
  ],
  periodicity: [],
  aggravators: [],
  reducers: []
};
var dental_pain = {
  location: [],
  duration: [
    "less-than-two-days",
    "more-than-two-days"
  ],
  onset: [
    "sudden",
    "gradual"
  ],
  nature: [],
  periodicity: [
    "intermittent",
    "sustained",
    "non-specific"
  ],
  aggravators: [
    "chewing"
  ],
  reducers: [
    "sleeping"
  ]
};
var diarrhoea = {
  location: [],
  duration: [
    "less-than-two-weeks",
    "more-than-two-weeks"
  ],
  onset: [
    "sudden",
    "gradual"
  ],
  nature: [
    "watery",
    "bloody",
    "mucoid",
    "severe"
  ],
  periodicity: [
    "non-specific",
    "intermittent"
  ],
  aggravators: [
    "food"
  ],
  reducers: [
    "antidiarrheal",
    "hunger",
    "laying-down",
    "sleeping"
  ]
};
var drinking_ability = {
  location: [],
  duration: [],
  onset: [],
  nature: [
    "normal",
    "eagerly",
    "unable-to-drink"
  ],
  periodicity: [],
  aggravators: [],
  reducers: []
};
var dry_mucosa = {
  location: [
    "eyes",
    "nose",
    "mouth"
  ],
  duration: [
    "less-than-two-weeks",
    "more-than-two-weeks"
  ],
  onset: [],
  nature: [
    "normal",
    "dry",
    "very-dry"
  ],
  periodicity: [],
  aggravators: [],
  reducers: []
};
var dysphagia = {
  location: [],
  duration: [
    "less-than-two-weeks"
  ],
  onset: [
    "gradual",
    "sudden"
  ],
  nature: [
    "mild"
  ],
  periodicity: [
    "non-specific",
    "intermitted",
    "sustained"
  ],
  aggravators: [
    "drinking-cold-water"
  ],
  reducers: [
    "pain-relievers"
  ]
};
var dysphonia = {
  location: [],
  duration: [
    "less-than-two-weeks",
    "more-than-two-weeks"
  ],
  onset: [
    "sudden",
    "gradual"
  ],
  nature: [
    "mild"
  ],
  periodicity: [
    "intermittent",
    "sustained"
  ],
  aggravators: [
    "smoke",
    "cold-weather",
    "speaking"
  ],
  reducers: [
    "sleeping"
  ]
};
var dyspnoea = {
  location: [],
  duration: [
    "less-than-three-weeks",
    "three-to-eight-weeks",
    "more-than-eight-weeks"
  ],
  onset: [
    "sudden",
    "gradual"
  ],
  nature: [
    "progressive",
    "non-progressive"
  ],
  periodicity: [
    "early-morning",
    "night",
    "non-specific",
    "sustained",
    "intermittent"
  ],
  aggravators: [
    "lying-flat",
    "standing-or-sitting",
    "lying-on-one-side",
    "sleeping",
    "light-exercise",
    "cold"
  ],
  reducers: [
    "rest",
    "sitting",
    "laying-down",
    "pain-relievers"
  ]
};
var dysuria = {
  location: [],
  duration: [
    "less-than-two-weeks",
    "more-than-two-weeks"
  ],
  onset: [
    "gradual"
  ],
  nature: [
    "burning-sensation"
  ],
  periodicity: [
    "non-specific"
  ],
  aggravators: [],
  reducers: []
};
var ear_pressure = {
  location: [
    "lateral-right",
    "lateral-left",
    "bilateral"
  ],
  duration: [],
  onset: [
    "gradual",
    "sudden"
  ],
  nature: [
    "mild"
  ],
  periodicity: [
    "intermittent",
    "sustained"
  ],
  aggravators: [],
  reducers: []
};
var ecchymosis = {
  location: [
    "face",
    "hands",
    "feet",
    "scalp",
    "trunk",
    "back",
    "legs",
    "arms",
    "genitals",
    "generalized"
  ],
  duration: [],
  onset: [],
  nature: [
    "large-confluent-lesion"
  ],
  periodicity: [],
  aggravators: [],
  reducers: []
};
var edema = {
  location: [
    "facial",
    "periorbital",
    "hands",
    "lower-limbs",
    "abdomen"
  ],
  duration: [],
  onset: [
    "gradual"
  ],
  nature: [
    "progressive-decrease-during-day"
  ],
  periodicity: [
    "early-morning",
    "non-specific",
    "intermittent"
  ],
  aggravators: [
    "increased-fluid-intake",
    "laying-down"
  ],
  reducers: []
};
var enlarged_tonsils = {
  location: [],
  duration: [],
  onset: [],
  nature: [],
  periodicity: [],
  aggravators: [],
  reducers: []
};
var enlarged_tympanic_membrane = {
  location: [
    "lateral-right",
    "lateral-left",
    "bilateral"
  ],
  duration: [],
  onset: [],
  nature: [],
  periodicity: [],
  aggravators: [],
  reducers: []
};
var enurisis = {
  location: [],
  duration: [
    "less-than-two-weeks",
    "more-than-two-weeks"
  ],
  onset: [],
  nature: [
    "persistent"
  ],
  periodicity: [
    "night"
  ],
  aggravators: [
    "increased-fluid-intake"
  ],
  reducers: [
    "bladder-training"
  ]
};
var epitastaxis = {
  location: [],
  duration: [],
  onset: [],
  nature: [],
  periodicity: [],
  aggravators: [],
  reducers: []
};
var excessive_sweating = {
  location: [],
  duration: [
    "more-than-two-weeks"
  ],
  onset: [
    "gradual",
    "sudden"
  ],
  nature: [],
  periodicity: [
    "during-meals"
  ],
  aggravators: [
    "eating"
  ],
  reducers: [
    "rest"
  ]
};
var facial_pain = {
  location: [],
  duration: [
    "less-than-two-days",
    "more-than-two-days"
  ],
  onset: [
    "sudden",
    "gradual"
  ],
  nature: [
    "mild",
    "severe"
  ],
  periodicity: [
    "intermittent",
    "sustained",
    "non-specific",
    "morning",
    "afternoon"
  ],
  aggravators: [
    "light-exercise"
  ],
  reducers: [
    "laying-down"
  ]
};
var facial_pressure = {
  location: [],
  duration: [
    "less-than-two-days",
    "more-than-two-days"
  ],
  onset: [
    "sudden",
    "gradual"
  ],
  nature: [
    "mild",
    "severe"
  ],
  periodicity: [
    "intermittent",
    "sustained",
    "non-specific",
    "morning",
    "afternoon"
  ],
  aggravators: [
    "light-exercise"
  ],
  reducers: [
    "laying-down"
  ]
};
var fever = {
  location: [],
  duration: [
    "less-than-two-weeks",
    "more-than-two-weeks"
  ],
  onset: [
    "sudden",
    "gradual"
  ],
  nature: [
    "low-grade",
    "high-grade"
  ],
  periodicity: [
    "persistent",
    "intermittent",
    "relapsing",
    "step-ladder",
    "remittent",
    "non-specific",
    "night"
  ],
  aggravators: [
    "pollen",
    "crying",
    "light-activity",
    "cold-weather",
    "standing-up"
  ],
  reducers: [
    "antipyretics",
    "anti-inflammatories",
    "pain-relievers",
    "antibiotics",
    "sleeping"
  ]
};
var foamy_urine = {
  location: [],
  duration: [
    "chronic"
  ],
  onset: [
    "gradual",
    "sudden"
  ],
  nature: [
    "intermittent",
    "persistent"
  ],
  periodicity: [
    "early-morning"
  ],
  aggravators: [],
  reducers: []
};
var frontal_bossing = {
  location: [],
  duration: [],
  onset: [],
  nature: [],
  periodicity: [],
  aggravators: [],
  reducers: []
};
var growth_failure = {
  location: [],
  duration: [],
  onset: [],
  nature: [],
  periodicity: [],
  aggravators: [],
  reducers: []
};
var haemoptysis = {
  location: [],
  duration: [],
  onset: [],
  nature: [],
  periodicity: [],
  aggravators: [],
  reducers: []
};
var hair_changes = {
  location: [],
  duration: [],
  onset: [],
  nature: [
    "dyspigmentation",
    "easily-pluckable"
  ],
  periodicity: [],
  aggravators: [],
  reducers: []
};
var hair_loss = {
  location: [],
  duration: [],
  onset: [],
  nature: [],
  periodicity: [],
  aggravators: [],
  reducers: []
};
var halitosis = {
  location: [],
  duration: [
    "less-than-two-weeks",
    "more-than-two-weeks"
  ],
  onset: [
    "sudden",
    "gradual"
  ],
  nature: [],
  periodicity: [
    "intermittent",
    "sustained",
    "non-specific",
    "morning"
  ],
  aggravators: [],
  reducers: []
};
var headache = {
  location: [
    "generalized",
    "frontal",
    "top-of-head",
    "temples",
    "both-eyes",
    "one-eye",
    "unilateral"
  ],
  duration: [
    "less-than-two-weeks",
    "more-than-two-weeks"
  ],
  onset: [
    "sudden",
    "gradual"
  ],
  nature: [
    "throbbing",
    "tight-band-around-head",
    "stabbing",
    "pulsing",
    "mild"
  ],
  periodicity: [
    "non-specific",
    "intermittent",
    "night",
    "afternoon"
  ],
  aggravators: [
    "stress",
    "emotional-conflict",
    "bending-forward",
    "light-exercise",
    "bright-lights",
    "standing-up"
  ],
  reducers: [
    "rest",
    "sleeping",
    "pain-relievers"
  ]
};
var hearing_loss = {
  location: [
    "lateral-right",
    "lateral-left",
    "bilateral"
  ],
  duration: [
    "less-than-six-weeks",
    "more-than-six-weeks"
  ],
  onset: [
    "sudden",
    "gradual"
  ],
  nature: [
    "partial",
    "full"
  ],
  periodicity: [
    "non-specific",
    "recurrent",
    "intermittent",
    "sustained"
  ],
  aggravators: [
    "fever"
  ],
  reducers: []
};
var heart_murmur = {
  location: [],
  duration: [],
  onset: [],
  nature: [
    "systolic-murmur",
    "diastolic-murmur"
  ],
  periodicity: [],
  aggravators: [],
  reducers: []
};
var hemarthrosis = {
  location: [],
  duration: [],
  onset: [],
  nature: [],
  periodicity: [],
  aggravators: [],
  reducers: []
};
var hematoma = {
  location: [
    "head",
    "hands",
    "feet",
    "trunk",
    "back",
    "legs",
    "arms",
    "genitals",
    "generalized"
  ],
  duration: [],
  onset: [],
  nature: [],
  periodicity: [],
  aggravators: [],
  reducers: []
};
var hematuria = {
  location: [],
  duration: [
    "less-than-two-weeks",
    "more-than-two-weeks"
  ],
  onset: [
    "sudden",
    "gradual"
  ],
  nature: [
    "continuous",
    "intermittent",
    "painless",
    "painful",
    "microscopic",
    "macroscopic"
  ],
  periodicity: [
    "non-specific"
  ],
  aggravators: [],
  reducers: []
};
var hepatomegaly = {
  location: [],
  duration: [],
  onset: [],
  nature: [
    "smooth",
    "tender",
    "craggy"
  ],
  periodicity: [],
  aggravators: [],
  reducers: []
};
var hyperemic_larynx = {
  location: [],
  duration: [],
  onset: [],
  nature: [],
  periodicity: [],
  aggravators: [],
  reducers: []
};
var hyperemic_pharynx = {
  location: [],
  duration: [],
  onset: [],
  nature: [],
  periodicity: [],
  aggravators: [],
  reducers: []
};
var hyperemic_tonsils = {
  location: [],
  duration: [],
  onset: [],
  nature: [],
  periodicity: [],
  aggravators: [],
  reducers: []
};
var hyperemic_tympanic_membrane = {
  location: [
    "lateral-right",
    "lateral-left",
    "bilateral"
  ],
  duration: [],
  onset: [],
  nature: [],
  periodicity: [],
  aggravators: [],
  reducers: []
};
var hyperpigmentation = {
  location: [
    "face",
    "hands",
    "feet",
    "scalp",
    "trunk",
    "back",
    "legs",
    "arms",
    "genitals",
    "generalized"
  ],
  duration: [
    "less-than-two-weeks",
    "more-than-two-weeks"
  ],
  onset: [
    "gradual"
  ],
  nature: [],
  periodicity: [],
  aggravators: [],
  reducers: []
};
var hypopigmentation = {
  location: [
    "face",
    "hands",
    "feet",
    "scalp",
    "trunk",
    "back",
    "legs",
    "arms",
    "genitals",
    "generalized"
  ],
  duration: [
    "less-than-two-weeks",
    "more-than-two-weeks"
  ],
  onset: [
    "gradual"
  ],
  nature: [],
  periodicity: [],
  aggravators: [],
  reducers: []
};
var hypothermia = {
  location: [],
  duration: [
    "less-than-24-hours"
  ],
  onset: [
    "sudden"
  ],
  nature: [],
  periodicity: [],
  aggravators: [],
  reducers: []
};
var indrawing = {
  location: [
    "lower-chest-wall"
  ],
  duration: [],
  onset: [],
  nature: [],
  periodicity: [],
  aggravators: [],
  reducers: []
};
var intercostal_recession = {
  location: [],
  duration: [],
  onset: [],
  nature: [],
  periodicity: [],
  aggravators: [],
  reducers: []
};
var irritability = {
  location: [],
  duration: [],
  onset: [
    "sudden",
    "gradual"
  ],
  nature: [
    "normal",
    "irritable",
    "lethargic",
    "comatose"
  ],
  periodicity: [
    "intermittent"
  ],
  aggravators: [],
  reducers: [
    "pain-relievers"
  ]
};
var jaundice = {
  location: [],
  duration: [],
  onset: [
    "sudden",
    "gradual"
  ],
  nature: [
    "progressive",
    "non-progressive"
  ],
  periodicity: [
    "non-specific",
    "sustained"
  ],
  aggravators: [],
  reducers: []
};
var joint_pain = {
  location: [],
  duration: [
    "less-than-two-weeks",
    "more-than-two-weeks"
  ],
  onset: [
    "sudden",
    "gradual"
  ],
  nature: [
    "monoarthritis",
    "oligoarthritis",
    "polyarthritis"
  ],
  periodicity: [],
  aggravators: [
    "joint-movement"
  ],
  reducers: [
    "corticosteroids"
  ]
};
var joint_swelling = {
  location: [],
  duration: [
    "less-than-two-weeks",
    "between-two-and-six-weeks",
    "more-than-six-weeks"
  ],
  onset: [
    "sudden",
    "gradual"
  ],
  nature: [
    "monoarthritis",
    "oligoarthritis",
    "polyarthritis"
  ],
  periodicity: [],
  aggravators: [
    "joint-movement"
  ],
  reducers: [
    "corticosteroids"
  ]
};
var kernigs_sign = {
  location: [],
  duration: [],
  onset: [],
  nature: [],
  periodicity: [],
  aggravators: [],
  reducers: []
};
var limited_range_of_motion = {
  location: [
    "knee",
    "elbow",
    "hip",
    "wrist",
    "ankle"
  ],
  duration: [
    "less-than-two-weeks",
    "between-two-and-six-weeks",
    "more-than-six-weeks"
  ],
  onset: [
    "sudden",
    "gradual"
  ],
  nature: [
    "monoarthritis",
    "oligoarthritis",
    "polyarthritis"
  ],
  periodicity: [],
  aggravators: [
    "joint-movement"
  ],
  reducers: [
    "corticosteroids"
  ]
};
var malnutrition = {
  location: [],
  duration: [],
  onset: [],
  nature: [],
  periodicity: [],
  aggravators: [],
  reducers: []
};
var mental_status = {
  location: [],
  duration: [],
  onset: [],
  nature: [
    "normal",
    "irritable",
    "lethargic",
    "comatose"
  ],
  periodicity: [],
  aggravators: [],
  reducers: []
};
var mid_upper_arm_circumference = {
  location: [],
  duration: [],
  onset: [],
  nature: [
    "normal",
    "mild",
    "moderate",
    "severe"
  ],
  periodicity: [],
  aggravators: [],
  reducers: []
};
var muscle_tone = {
  location: [],
  duration: [],
  onset: [],
  nature: [
    "normal",
    "hypotonia",
    "hypertonia"
  ],
  periodicity: [],
  aggravators: [],
  reducers: []
};
var muscle_weakness = {
  location: [],
  duration: [],
  onset: [
    "sudden",
    "gradual"
  ],
  nature: [
    "progressive"
  ],
  periodicity: [
    "non-periodic"
  ],
  aggravators: [],
  reducers: []
};
var nasal_congestion = {
  location: [],
  duration: [
    "less-than-two-days",
    "more-than-two-days"
  ],
  onset: [
    "sudden",
    "gradual"
  ],
  nature: [
    "watery",
    "mild"
  ],
  periodicity: [
    "intermittent",
    "sustained",
    "non-specific"
  ],
  aggravators: [
    "cold-weather",
    "pollen"
  ],
  reducers: [
    "antihistamines",
    "drinking-hot-water"
  ]
};
var nasal_discharge = {
  location: [],
  duration: [
    "less-than-two-days",
    "more-than-two-days"
  ],
  onset: [
    "sudden",
    "gradual"
  ],
  nature: [
    "thick",
    "foul-smelling",
    "colored",
    "purulent",
    "mild",
    "severe"
  ],
  periodicity: [
    "intermittent",
    "sustained",
    "non-specific",
    "morning",
    "afternoon"
  ],
  aggravators: [
    "cold-weather",
    "pollen",
    "smoke"
  ],
  reducers: [
    "sleeping"
  ]
};
var nasal_polyps = {
  location: [],
  duration: [],
  onset: [],
  nature: [],
  periodicity: [],
  aggravators: [],
  reducers: []
};
var night_sweats = {
  location: [],
  duration: [
    "less-than-two-weeks",
    "more-than-two-weeks"
  ],
  onset: [
    "gradual",
    "sudden"
  ],
  nature: [],
  periodicity: [],
  aggravators: [],
  reducers: []
};
var oliguria = {
  location: [],
  duration: [
    "less-than-two-weeks",
    "more-than-two-weeks"
  ],
  onset: [
    "sudden",
    "gradual"
  ],
  nature: [
    "prgoressive-worsening"
  ],
  periodicity: [
    "non-periodic"
  ],
  aggravators: [
    "decreased-fluid-intake"
  ],
  reducers: [
    "diuretics"
  ]
};
var orthopnea = {
  location: [],
  duration: [
    "less-than-two-weeks",
    "more-than-two-weeks"
  ],
  onset: [
    "sudden",
    "gradual"
  ],
  nature: [],
  periodicity: [],
  aggravators: [],
  reducers: [
    "standing",
    "sitting"
  ]
};
var otalgia = {
  location: [
    "lower",
    "upper"
  ],
  duration: [
    "less-than-six-weeks",
    "more-than-six-weeks"
  ],
  onset: [
    "sudden",
    "gradual"
  ],
  nature: [
    "mild"
  ],
  periodicity: [
    "non-specific",
    "recurrent",
    "intermittent"
  ],
  aggravators: [],
  reducers: []
};
var otorrhea = {
  location: [
    "lateral-right",
    "lateral-left",
    "bilateral"
  ],
  duration: [
    "less-than-two-weeks",
    "more-than-two-weeks"
  ],
  onset: [
    "sudden",
    "gradual"
  ],
  nature: [
    "purulent",
    "serous",
    "blood"
  ],
  periodicity: [
    "non-specific",
    "intermittent"
  ],
  aggravators: [],
  reducers: []
};
var pallor = {
  location: [],
  duration: [],
  onset: [],
  nature: [
    "mild",
    "moderate",
    "severe"
  ],
  periodicity: [],
  aggravators: [],
  reducers: []
};
var peritonsillar_abscess = {
  location: [],
  duration: [],
  onset: [],
  nature: [],
  periodicity: [],
  aggravators: [],
  reducers: []
};
var petechiae = {
  location: [
    "face",
    "mouth",
    "hands",
    "feet",
    "scalp",
    "trunk",
    "back",
    "legs",
    "arms",
    "genitals",
    "generalized"
  ],
  duration: [],
  onset: [],
  nature: [
    "pin-point-hemmorhage"
  ],
  periodicity: [],
  aggravators: [],
  reducers: []
};
var photosensitivity = {
  location: [],
  duration: [
    "more-than-two-weeks"
  ],
  onset: [
    "gradual"
  ],
  nature: [],
  periodicity: [],
  aggravators: [
    "exposure-to-sunlight"
  ],
  reducers: []
};
var polyuria = {
  location: [],
  duration: [
    "more-than-two-weeks"
  ],
  onset: [
    "gradual"
  ],
  nature: [],
  periodicity: [
    "night-time"
  ],
  aggravators: [
    "increased-fluid-intake",
    "diuretics"
  ],
  reducers: []
};
var poor_feeding = {
  location: [],
  duration: [],
  onset: [
    "sudden",
    "gradual"
  ],
  nature: [],
  periodicity: [
    "intermittent",
    "sustained",
    "non-specific"
  ],
  aggravators: [],
  reducers: [
    "pain-relievers"
  ]
};
var pruritis = {
  location: [
    "face",
    "hands",
    "feet",
    "scalp",
    "trunk",
    "back",
    "legs",
    "arms",
    "genitals",
    "generalized"
  ],
  duration: [
    "less-than-two-weeks",
    "more-than-two-weeks"
  ],
  onset: [
    "gradual",
    "sudden"
  ],
  nature: [],
  periodicity: [
    "more-intense-at-night"
  ],
  aggravators: [],
  reducers: [
    "antihistamines"
  ]
};
var pulling_on_ear = {
  location: [
    "lateral-right",
    "lateral-left",
    "bilateral"
  ],
  duration: [
    "less-than-two-days",
    "more-than-two-days"
  ],
  onset: [
    "gradual",
    "sudden"
  ],
  nature: [],
  periodicity: [
    "intermittent",
    "sustained"
  ],
  aggravators: [],
  reducers: []
};
var pulse_rate = {
  location: [],
  duration: [],
  onset: [],
  nature: [
    "normal",
    "slightly-increased",
    "tachycardia"
  ],
  periodicity: [],
  aggravators: [],
  reducers: []
};
var purpura = {
  location: [
    "face",
    "mouth",
    "hands",
    "feet",
    "scalp",
    "trunk",
    "back",
    "legs",
    "arms",
    "genitals",
    "generalized"
  ],
  duration: [],
  onset: [],
  nature: [
    "large-raised-lesion"
  ],
  periodicity: [],
  aggravators: [],
  reducers: []
};
var reduced_appetite = {
  location: [],
  duration: [
    "more-than-two-weeks"
  ],
  onset: [
    "gradual"
  ],
  nature: [],
  periodicity: [],
  aggravators: [],
  reducers: []
};
var rhinorrhea = {
  location: [],
  duration: [
    "less-than-two-weeks",
    "more-than-two-weeks"
  ],
  onset: [
    "sudden",
    "gradual"
  ],
  nature: [
    "thick",
    "clear-colored",
    "nasal-obstruction",
    "mild"
  ],
  periodicity: [
    "seasonal",
    "intermittent",
    "sustained",
    "morning",
    "non-specific"
  ],
  aggravators: [
    "cold-weather",
    "pollen",
    "spores",
    "dust-mites",
    "chemical-irritants",
    "light-exercise"
  ],
  reducers: [
    "sleeping",
    "antihistamines"
  ]
};
var seizures = {
  location: [],
  duration: [
    "less-than-five-minutes",
    "more-than-five-minutes"
  ],
  onset: [
    "focol",
    "generalized"
  ],
  nature: [
    "tonic-seizures",
    "clonic-seizures",
    "tonic-clonic-seizures",
    "myoclonic-seizures",
    "atonic-seizures",
    "absence-seizures",
    "febrile-seizures"
  ],
  periodicity: [
    "non-specific"
  ],
  aggravators: [],
  reducers: []
};
var sinus_tenderness = {
  location: [],
  duration: [],
  onset: [],
  nature: [],
  periodicity: [
    "intermittent",
    "sustained"
  ],
  aggravators: [],
  reducers: []
};
var skin_desquamation = {
  location: [
    "face",
    "hands",
    "feet",
    "scalp",
    "trunk",
    "back",
    "legs",
    "arms",
    "genitals",
    "generalized"
  ],
  duration: [
    "less-than-two-weeks",
    "more-than-two-weeks"
  ],
  onset: [
    "gradual"
  ],
  nature: [],
  periodicity: [],
  aggravators: [],
  reducers: []
};
var skin_lesions = {
  location: [
    "face",
    "hands",
    "feet",
    "scalp",
    "trunk",
    "back",
    "legs",
    "arms",
    "genitals",
    "generalized"
  ],
  duration: [
    "less-than-two-weeks",
    "more-than-two-weeks"
  ],
  onset: [
    "gradual",
    "sudden"
  ],
  nature: [
    "macules",
    "papules",
    "nodules",
    "plaques",
    "wheal",
    "blisters",
    "scales",
    "crust",
    "erosions",
    "ulcers",
    "atrophy",
    "lichenification",
    "burrow",
    "comedones"
  ],
  periodicity: [],
  aggravators: [],
  reducers: []
};
var skin_rash = {
  location: [
    "face",
    "hands",
    "feet",
    "scalp",
    "trunk",
    "back",
    "legs",
    "arms",
    "genitals",
    "generalized"
  ],
  duration: [
    "less-than-two-weeks",
    "more-than-two-weeks"
  ],
  onset: [
    "sudden",
    "gradual"
  ],
  nature: [
    "malar",
    "discoid"
  ],
  periodicity: [],
  aggravators: [
    "exposure-to-sunlight"
  ],
  reducers: []
};
var skin_turgor = {
  location: [],
  duration: [],
  onset: [],
  nature: [
    "normal",
    "mild-delay-less-than-2-seconds",
    "severe-delay-more-than-2-seconds"
  ],
  periodicity: [],
  aggravators: [],
  reducers: []
};
var sneezing = {
  location: [],
  duration: [
    "less-than-two-weeks",
    "more-than-two-weeks"
  ],
  onset: [
    "sudden",
    "gradual"
  ],
  nature: [],
  periodicity: [
    "intermittent",
    "sustained",
    "non-specific",
    "morning"
  ],
  aggravators: [
    "cold-weather",
    "pollen"
  ],
  reducers: [
    "sleeping"
  ]
};
var snoring = {
  location: [],
  duration: [],
  onset: [],
  nature: [],
  periodicity: [],
  aggravators: [],
  reducers: []
};
var sore_throat = {
  location: [],
  duration: [
    "less-than-two-weeks",
    "more-than-two-weeks"
  ],
  onset: [
    "sudden",
    "gradual"
  ],
  nature: [],
  periodicity: [
    "intermittent"
  ],
  aggravators: [
    "eating-or-drinking"
  ],
  reducers: []
};
var splenomegaly = {
  location: [],
  duration: [],
  onset: [],
  nature: [],
  periodicity: [],
  aggravators: [],
  reducers: []
};
var stridor = {
  location: [],
  duration: [
    "less-than-two-weeks",
    "more-than-two-weeks"
  ],
  onset: [],
  nature: [
    "expiratory",
    "inspiratory"
  ],
  periodicity: [
    "early-morning",
    "night"
  ],
  aggravators: [],
  reducers: []
};
var stunting = {
  location: [],
  duration: [],
  onset: [],
  nature: [
    "normal",
    "mild",
    "moderate",
    "severe"
  ],
  periodicity: [],
  aggravators: [],
  reducers: []
};
var sunken_eyes = {
  location: [],
  duration: [
    "less-than-two-weeks",
    "more-than-two-weeks"
  ],
  onset: [],
  nature: [
    "normal",
    "moderate",
    "severe"
  ],
  periodicity: [],
  aggravators: [],
  reducers: []
};
var syncope = {
  location: [],
  duration: [],
  onset: [
    "sudden"
  ],
  nature: [],
  periodicity: [],
  aggravators: [],
  reducers: []
};
var tachycardia = {
  location: [],
  duration: [],
  onset: [],
  nature: [],
  periodicity: [],
  aggravators: [],
  reducers: []
};
var tachypnoea = {
  location: [],
  duration: [],
  onset: [
    "sudden",
    "gradual"
  ],
  nature: [],
  periodicity: [],
  aggravators: [],
  reducers: []
};
var teeth_malocclusion = {
  location: [],
  duration: [],
  onset: [],
  nature: [],
  periodicity: [],
  aggravators: [],
  reducers: []
};
var tet_spell = {
  location: [],
  duration: [
    "less-than-two-weeks",
    "more-than-two-weeks"
  ],
  onset: [
    "sudden"
  ],
  nature: [],
  periodicity: [
    "waking-up",
    "feeding",
    "exertion",
    "crying"
  ],
  aggravators: [],
  reducers: []
};
var underweight = {
  location: [],
  duration: [],
  onset: [],
  nature: [
    "normal",
    "mild",
    "moderate",
    "severe"
  ],
  periodicity: [],
  aggravators: [],
  reducers: []
};
var vomiting = {
  location: [],
  duration: [
    "less-than-two-weeks",
    "more-than-two-weeks"
  ],
  onset: [
    "gradual",
    "sudden"
  ],
  nature: [
    "projectile",
    "non-projectile",
    "bile-stained-yellow",
    "bile-stained-green",
    "blood-stained",
    "clear-with-food"
  ],
  periodicity: [
    "non-specific",
    "recurrent",
    "morning",
    "intermittent"
  ],
  aggravators: [
    "eating",
    "drinking water"
  ],
  reducers: [
    "not-eating",
    "sleeping",
    "antiemetic",
    "water-intake",
    "laying down"
  ]
};
var wasting = {
  location: [],
  duration: [],
  onset: [],
  nature: [
    "normal",
    "mild",
    "moderate",
    "severe"
  ],
  periodicity: [],
  aggravators: [],
  reducers: []
};
var weight_faltering = {
  location: [],
  duration: [
    "less-than-six-weeks",
    "more-than-six-weeks"
  ],
  onset: [
    "gradual"
  ],
  nature: [],
  periodicity: [],
  aggravators: [],
  reducers: []
};
var weight_gain = {
  location: [],
  duration: [
    "less-than-two-weeks",
    "more-than-two-weeks"
  ],
  onset: [
    "gradual"
  ],
  nature: [],
  periodicity: [],
  aggravators: [],
  reducers: []
};
var weight_loss = {
  location: [],
  duration: [
    "more-than-two-weeks"
  ],
  onset: [
    "gradual"
  ],
  nature: [],
  periodicity: [
    "non-specific"
  ],
  aggravators: [],
  reducers: []
};
var wheezing = {
  location: [],
  duration: [
    "less-than-two-weeks",
    "more-than-two-weeks"
  ],
  onset: [],
  nature: [
    "expiratory",
    "inspiratory"
  ],
  periodicity: [
    "early-morning",
    "night"
  ],
  aggravators: [
    "dust",
    "pollen",
    "exercise",
    "cold-air",
    "aspirin",
    "non-steroidal-anti-inflammatory-drugs"
  ],
  reducers: [
    "rest",
    "bronchodilators"
  ]
};
var symptoms_base_default = {
  "abdominal-distension": abdominal_distension,
  "abdominal-pain": abdominal_pain,
  "abdominal-tenderness": abdominal_tenderness,
  ageusia,
  "angular-cheilitis": angular_cheilitis,
  anosmia,
  ascites,
  "blood-pressure": blood_pressure,
  "bow-legs": bow_legs,
  "brudzinskis-sign": brudzinskis_sign,
  "capillary-refill": capillary_refill,
  cardiomegaly,
  "chest-pain": chest_pain,
  "chest-tightness": chest_tightness,
  clubbing,
  constipation,
  convulsions,
  cough,
  crying,
  cyanosis,
  dactylitis,
  dehydration,
  "dental-pain": dental_pain,
  diarrhoea,
  "drinking-ability": drinking_ability,
  "dry-mucosa": dry_mucosa,
  dysphagia,
  dysphonia,
  dyspnoea,
  dysuria,
  "ear-pressure": ear_pressure,
  ecchymosis,
  edema,
  "enlarged-tonsils": enlarged_tonsils,
  "enlarged-tympanic-membrane": enlarged_tympanic_membrane,
  enurisis,
  epitastaxis,
  "excessive-sweating": excessive_sweating,
  "facial-pain": facial_pain,
  "facial-pressure": facial_pressure,
  fever,
  "foamy-urine": foamy_urine,
  "frontal-bossing": frontal_bossing,
  "growth-failure": growth_failure,
  haemoptysis,
  "hair-changes": hair_changes,
  "hair-loss": hair_loss,
  halitosis,
  headache,
  "hearing-loss": hearing_loss,
  "heart-murmur": heart_murmur,
  hemarthrosis,
  hematoma,
  hematuria,
  hepatomegaly,
  "hyperemic-larynx": hyperemic_larynx,
  "hyperemic-pharynx": hyperemic_pharynx,
  "hyperemic-tonsils": hyperemic_tonsils,
  "hyperemic-tympanic-membrane": hyperemic_tympanic_membrane,
  hyperpigmentation,
  hypopigmentation,
  hypothermia,
  indrawing,
  "intercostal-recession": intercostal_recession,
  irritability,
  jaundice,
  "joint-pain": joint_pain,
  "joint-swelling": joint_swelling,
  "kernigs-sign": kernigs_sign,
  "limited-range-of-motion": limited_range_of_motion,
  malnutrition,
  "mental-status": mental_status,
  "mid-upper-arm-circumference": mid_upper_arm_circumference,
  "muscle-tone": muscle_tone,
  "muscle-weakness": muscle_weakness,
  "nasal-congestion": nasal_congestion,
  "nasal-discharge": nasal_discharge,
  "nasal-polyps": nasal_polyps,
  "night-sweats": night_sweats,
  oliguria,
  orthopnea,
  otalgia,
  otorrhea,
  pallor,
  "peritonsillar-abscess": peritonsillar_abscess,
  petechiae,
  photosensitivity,
  polyuria,
  "poor-feeding": poor_feeding,
  pruritis,
  "pulling-on-ear": pulling_on_ear,
  "pulse-rate": pulse_rate,
  purpura,
  "reduced-appetite": reduced_appetite,
  rhinorrhea,
  seizures,
  "sinus-tenderness": sinus_tenderness,
  "skin-desquamation": skin_desquamation,
  "skin-lesions": skin_lesions,
  "skin-rash": skin_rash,
  "skin-turgor": skin_turgor,
  sneezing,
  snoring,
  "sore-throat": sore_throat,
  splenomegaly,
  stridor,
  stunting,
  "sunken-eyes": sunken_eyes,
  syncope,
  tachycardia,
  tachypnoea,
  "teeth-malocclusion": teeth_malocclusion,
  "tet-spell": tet_spell,
  underweight,
  vomiting,
  wasting,
  "weight-faltering": weight_faltering,
  "weight-gain": weight_gain,
  "weight-loss": weight_loss,
  wheezing
};

// data/core/conditions.json
var complicated_malaria = "Complicated Malaria";
var bronchiolitis = "Bronchiolitis";
var otitis_externa = "Otitis Externa";
var supprative_otitis_media = "Supprative Otitis Media";
var pneumocystis_pneumonia = "Pneumocystis Pneumonia";
var ectopic_pregnancy = "Ectopic Pregnancy";
var pelvic_inflammatory_disease = "Pelvic Inflammatory Disease";
var genital_warts = "Genital Warts";
var malaria = "Malaria";
var pneumonia = "Pneumonia";
var tuberculosis = "Tuberculosis";
var coryza = "Coryza";
var sinusitis = "Sinusitis";
var bronchitis = "Bronchitis";
var gastritis = "Gastritis";
var otitis_media = "Otitis media";
var trichuriasis = "Trichuriasis";
var conjunctivitis = "Conjunctivitis";
var urinary_tract_infection_uti = "Urinary Tract Infection (UTI)";
var dysentry = "Dysentry";
var malnutrition2 = "Malnutrition";
var ascariasis = "Ascariasis";
var asthma = "Asthma";
var influenza = "Influenza";
var tonsilitis = "Tonsilitis";
var laryngitis = "Laryngitis";
var chronic_obstructive_pulmonary_disease_copd = "Chronic Obstructive Pulmonary Disease (COPD)";
var syphillis = "Syphillis";
var gonorrhea = "Gonorrhea";
var hiv_aids = "HIV/AIDS";
var bacterial_vaginosis = "Bacterial Vaginosis";
var vulvovaginal_candidiasis = "Vulvovaginal Candidiasis";
var trichomoniasis = "Trichomoniasis";
var acute_watery_diarrhoea = "Acute Watery Diarrhoea";
var chlamydia = "Chlamydia";
var genital_herpes = "Genital Herpes";
var human_papillomavirus_hpv = "Human Papillomavirus (HPV)";
var anaemia = "Anaemia";
var oral_thrush = "Oral Thrush";
var typhoid = "Typhoid";
var cholera = "Cholera";
var meningitis = "Meningitis";
var epilepsy = "Epilepsy";
var dehydration2 = "Dehydration";
var hypertension = "Hypertension";
var scabies = "Scabies";
var gastroenteritis = "Gastroenteritis";
var heat_rash = "Heat Rash";
var stomatitis = "Stomatitis";
var bacteremia = "Bacteremia";
var cephalohematoma = "Cephalohematoma";
var tinea_corporis = "Tinea Corporis";
var impetigo = "Impetigo";
var umbilical_cord_sepsis = "Umbilical Cord Sepsis";
var sepsis = "Sepsis";
var pediatric_hiv_aids = "Pediatric HIV/AIDS";
var hepatitis_b = "Hepatitis B";
var toxoplasmosis = "Toxoplasmosis";
var conditions_default = {
  "complicated-malaria": complicated_malaria,
  bronchiolitis,
  "otitis-externa": otitis_externa,
  "supprative-otitis-media": supprative_otitis_media,
  "pneumocystis-pneumonia": pneumocystis_pneumonia,
  "ectopic-pregnancy": ectopic_pregnancy,
  "pelvic-inflammatory-disease": pelvic_inflammatory_disease,
  "genital-warts": genital_warts,
  malaria,
  pneumonia,
  tuberculosis,
  coryza,
  sinusitis,
  bronchitis,
  gastritis,
  "otitis-media": otitis_media,
  trichuriasis,
  conjunctivitis,
  "urinary-tract-infection-uti": urinary_tract_infection_uti,
  dysentry,
  malnutrition: malnutrition2,
  ascariasis,
  asthma,
  influenza,
  tonsilitis,
  laryngitis,
  "chronic-obstructive-pulmonary-disease-copd": chronic_obstructive_pulmonary_disease_copd,
  syphillis,
  gonorrhea,
  "hiv-aids": hiv_aids,
  "bacterial-vaginosis": bacterial_vaginosis,
  "vulvovaginal-candidiasis": vulvovaginal_candidiasis,
  trichomoniasis,
  "acute-watery-diarrhoea": acute_watery_diarrhoea,
  chlamydia,
  "genital-herpes": genital_herpes,
  "human-papillomavirus-hpv": human_papillomavirus_hpv,
  anaemia,
  "oral-thrush": oral_thrush,
  typhoid,
  cholera,
  meningitis,
  epilepsy,
  dehydration: dehydration2,
  hypertension,
  scabies,
  gastroenteritis,
  "heat-rash": heat_rash,
  stomatitis,
  bacteremia,
  cephalohematoma,
  "tinea-corporis": tinea_corporis,
  impetigo,
  "umbilical-cord-sepsis": umbilical_cord_sepsis,
  sepsis,
  "pediatric-hiv-aids": pediatric_hiv_aids,
  "hepatitis-b": hepatitis_b,
  toxoplasmosis
};

// data/translated/donpar-map.json
var en = {
  onset: {
    gradual: "gradual",
    sudden: "sudden",
    focol: "focol",
    generalized: "generalized"
  },
  nature: {
    symmetrical: "symmetrical",
    asymmetrical: "asymmetrical",
    generalized: "generalized",
    localized: "localized",
    mild: "mild",
    moderate: "moderate",
    severe: "severe",
    normal: "normal",
    low: "low",
    high: "high",
    "two-to-three-seconds": "two-to-three-seconds",
    "three-to-four-seconds": "three-to-four-seconds",
    "more-than-four-seconds": "more-than-four-seconds",
    sharp: "sharp",
    stabbing: "stabbing",
    dull: "dull",
    aching: "aching",
    colic: "colic",
    "hard-stool": "hard-stool",
    "blood-stool": "blood-stool",
    "melena-stool": "melena-stool",
    dry: "non-productive",
    "yellow-sputum": "yellow-sputum",
    "green-sputum": "green-sputum",
    "clear-sputum": "clear-sputum",
    "jelly-like-sputum": "jelly-like-sputum",
    "blood-stained": "blood-stained",
    "rusty-red-sputum": "rusty-red-sputum",
    "high-pitched": "high-pitched",
    central: "central",
    peripheral: "peripheral",
    watery: "watery",
    bloody: "bloody",
    mucoid: "mucoid",
    eagerly: "eagerly",
    "unable-to-drink": "unable-to-drink",
    "very-dry": "very-dry",
    progressive: "progressive",
    "non-progressive": "non-progressive",
    "burning-sensation": "burning-sensation",
    "large-confluent-lesion": "large-confluent-lesion",
    "progressive-decrease-during-day": "progressive-decrease-during-day",
    persistent: "persistent",
    "low-grade": "low-grade",
    "high-grade": "high-grade",
    intermittent: "intermittent",
    dyspigmentation: "dyspigmentation",
    "easily-pluckable": "easily-pluckable",
    throbbing: "throbbing",
    "tight-band-around-head": "tight-band-around-head",
    pulsing: "pulsing",
    partial: "partial",
    full: "full",
    "systolic-murmur": "systolic-murmur",
    "diastolic-murmur": "diastolic-murmur",
    continuous: "continuous",
    painless: "painless",
    painful: "painful",
    microscopic: "microscopic",
    macroscopic: "macroscopic",
    smooth: "smooth",
    tender: "tender",
    craggy: "craggy",
    irritable: "irritable",
    lethargic: "lethargic",
    comatose: "comatose",
    monoarthritis: "monoarthritis",
    oligoarthritis: "oligoarthritis",
    polyarthritis: "polyarthritis",
    hypotonia: "hypotonia",
    hypertonia: "hypertonia",
    thick: "thick",
    "foul-smelling": "foul-smelling",
    colored: "colored",
    purulent: "purulent",
    "prgoressive-worsening": "prgoressive-worsening",
    serous: "serous",
    blood: "blood",
    "pin-point-hemmorhage": "pin-point-hemmorhage",
    "slightly-increased": "slightly-increased",
    tachycardia: "tachycardia",
    "large-raised-lesion": "large-raised-lesion",
    "clear-colored": "clear-colored",
    "nasal-obstruction": "nasal-obstruction",
    "tonic-seizures": "tonic-seizures",
    "clonic-seizures": "clonic-seizures",
    "tonic-clonic-seizures": "tonic-clonic-seizures",
    "myoclonic-seizures": "myoclonic-seizures",
    "atonic-seizures": "atonic-seizures",
    "absence-seizures": "absence-seizures",
    "febrile-seizures": "febrile-seizures",
    macules: "macules",
    papules: "papules",
    nodules: "nodules",
    plaques: "plaques",
    wheal: "wheal",
    blisters: "blisters",
    scales: "scales",
    crust: "crust",
    erosions: "erosions",
    ulcers: "ulcers",
    atrophy: "atrophy",
    lichenification: "lichenification",
    burrow: "burrow",
    comedones: "comedones",
    malar: "malar",
    discoid: "discoid",
    "mild-delay-less-than-2-seconds": "mild-delay-less-than-2-seconds",
    "severe-delay-more-than-2-seconds": "severe-delay-more-than-2-seconds",
    expiratory: "expiratory",
    inspiratory: "inspiratory",
    projectile: "projectile",
    "non-projectile": "non-projectile",
    "bile-stained-yellow": "bile-stained-yellow",
    "bile-stained-green": "bile-stained-green",
    "clear-with-food": "clear-with-food"
  },
  aggravators: {
    constipation: "constipation",
    "cold-weather": "cold-weather",
    "deep-breathing": "deep-breathing",
    coughing: "coughing",
    exercise: "exercise",
    "light-activity": "light-activity",
    "laying-down": "laying-down",
    dust: "dust",
    pollen: "pollen",
    smoke: "smoke",
    "bright-lights": "bright-lights",
    "non-steroidal-anti-inflammatory-drugs": "non-steroidal-anti-inflammatory-drugs",
    chewing: "chewing",
    food: "food",
    "drinking-cold-water": "drinking-cold-water",
    speaking: "speaking",
    "lying-flat": "lying-flat",
    "standing-or-sitting": "standing-or-sitting",
    "lying-on-one-side": "lying-on-one-side",
    sleeping: "sleeping",
    "light-exercise": "light-exercise",
    cold: "cold",
    "increased-fluid-intake": "increased-fluid-intake",
    eating: "eating",
    crying: "crying",
    "standing-up": "standing-up",
    stress: "stress",
    "emotional-conflict": "emotional-conflict",
    "bending-forward": "bending-forward",
    fever: "fever",
    "joint-movement": "joint-movement",
    "decreased-fluid-intake": "decreased-fluid-intake",
    "exposure-to-sunlight": "exposure-to-sunlight",
    diuretics: "diuretics",
    spores: "spores",
    "dust-mites": "dust-mites",
    "chemical-irritants": "chemical-irritants",
    "eating-or-drinking": "eating-or-drinking",
    "drinking water": "drinking water",
    "cold-air": "cold-air",
    aspirin: "aspirin"
  },
  location: {
    lower: "lower",
    upper: "upper",
    hands: "hands",
    feet: "feet",
    hand: "hand",
    foot: "foot",
    eyes: "eyes",
    nose: "nose",
    mouth: "mouth",
    "lateral-right": "lateral-right",
    "lateral-left": "lateral-left",
    bilateral: "bilateral",
    face: "face",
    scalp: "scalp",
    trunk: "trunk",
    back: "back",
    legs: "legs",
    arms: "arms",
    genitals: "genitals",
    generalized: "generalized",
    facial: "facial",
    periorbital: "periorbital",
    "lower-limbs": "lower-limbs",
    abdomen: "abdomen",
    frontal: "frontal",
    "top-of-head": "top-of-head",
    temples: "temples",
    "both-eyes": "both-eyes",
    "one-eye": "one-eye",
    unilateral: "unilateral",
    head: "head",
    "lower-chest-wall": "lower-chest-wall",
    knee: "knee",
    elbow: "elbow",
    hip: "hip",
    wrist: "wrist",
    ankle: "ankle"
  },
  duration: {
    "less-than-two-weeks": "less-than-two-weeks",
    "more-than-two-weeks": "more-than-two-weeks",
    "less-than-two-days": "less-than-two-days",
    "more-than-two-days": "more-than-two-days",
    "less-than-five-days": "less-than-five-days",
    "five-days-to-three-weeks": "five-days-to-three-weeks",
    "three-to-eight-weeks": "three-to-eight-weeks",
    "more-than-eight-weeks": "more-than-eight-weeks",
    "less-than-three-weeks": "less-than-three-weeks",
    chronic: "chronic",
    "less-than-six-weeks": "less-than-six-weeks",
    "more-than-six-weeks": "more-than-six-weeks",
    "less-than-24-hours": "less-than-24-hours",
    "between-two-and-six-weeks": "between-two-and-six-weeks",
    "less-than-five-minutes": "less-than-five-minutes",
    "more-than-five-minutes": "more-than-five-minutes"
  },
  periodicity: {
    "non-specific": "non-specific",
    intermittent: "intermittent",
    sustained: "sustained",
    morning: "morning",
    night: "night",
    intermitted: "intermitted",
    "early-morning": "early-morning",
    "during-meals": "during-meals",
    afternoon: "afternoon",
    persistent: "persistent",
    relapsing: "relapsing",
    "step-ladder": "step-ladder",
    remittent: "remittent",
    recurrent: "recurrent",
    "non-periodic": "non-periodic",
    "night-time": "night-time",
    "more-intense-at-night": "more-intense-at-night",
    seasonal: "seasonal",
    "waking-up": "waking-up",
    feeding: "feeding",
    exertion: "exertion",
    crying: "crying"
  },
  reducers: {
    rest: "rest",
    "laying-down": "laying-down",
    sleeping: "sleeping",
    "stool-softeners": "stool-softeners",
    antihistamines: "antihistamines",
    "cough-suppressants": "cough-suppressants",
    "pain-relievers": "pain-relievers",
    antidiarrheal: "antidiarrheal",
    hunger: "hunger",
    sitting: "sitting",
    "bladder-training": "bladder-training",
    antipyretics: "antipyretics",
    "anti-inflammatories": "anti-inflammatories",
    antibiotics: "antibiotics",
    corticosteroids: "corticosteroids",
    "drinking-hot-water": "drinking-hot-water",
    diuretics: "diuretics",
    standing: "standing",
    "not-eating": "not-eating",
    antiemetic: "antiemetic",
    "water-intake": "water-intake",
    "laying down": "laying down",
    bronchodilators: "bronchodilators"
  }
};
var sw = {
  onset: {
    gradual: "taratibu",
    sudden: "ghafla",
    focol: "focol",
    generalized: "ya-jumla"
  },
  nature: {
    symmetrical: "ulinganifu",
    asymmetrical: "isiyo-na-ulinganifu",
    generalized: "tumbo-zima",
    localized: "sehemu-moja",
    mild: "sio-kali",
    moderate: "wastani",
    severe: "kali-sana",
    normal: "kawaida",
    low: "chini",
    high: "juu",
    "two-to-three-seconds": "sekunde-mbili-hadi-tatu",
    "three-to-four-seconds": "sekunde-tatu-hadi-nne",
    "more-than-four-seconds": "zaidi-ya-sekunde-nne",
    sharp: "kali",
    stabbing: "kuchoma",
    dull: "kidogo",
    aching: "kuuma",
    colic: "maumivu-makali",
    "hard-stool": "kinyesi-kigumu",
    "blood-stool": "kinyesi-chenye-damu",
    "melena-stool": "kinyesi-cheusi-chenye-kunata",
    dry: "kavu",
    "yellow-sputum": "makohozi-ya-njano",
    "green-sputum": "makohozi-ya-kijani",
    "clear-sputum": "makohozi-ya-meupe",
    "jelly-like-sputum": "makohozi-yenye-makamasi",
    "blood-stained": "yenye-madoa-ya-damu",
    "rusty-red-sputum": "makohozi-mekundu-yenye-rangi-ya-kutu",
    "high-pitched": "kiwango-cha-juu",
    central: "kati",
    peripheral: "mwisho",
    watery: "maji",
    bloody: "chenye-damu",
    mucoid: "chenye-makamasi",
    eagerly: "kwa-shauku",
    "unable-to-drink": "kushindwa-kunywa",
    "very-dry": "kavu-sana",
    progressive: "inayoendelea",
    "non-progressive": "isiyo-endelea",
    "burning-sensation": "hisia-ya-kuungua",
    "large-confluent-lesion": "kidonda-kikubwa",
    "progressive-decrease-during-day": "kuendelea-kupungua-wakati-wa-mchana",
    persistent: "ya-kudumu",
    "low-grade": "isiyo-kali",
    "high-grade": "kali",
    intermittent: "muda-mfupi",
    dyspigmentation: "dyspigmentation",
    "easily-pluckable": "inayoweza-kuchujwa-kwa-urahisi",
    throbbing: "kupiga",
    "tight-band-around-head": "bendi-kaza-kuzunguka-kichwa",
    pulsing: "kusukuma",
    partial: "kwa-sehemu",
    full: "yote",
    continuous: "yenye-kuendelea",
    painless: "yenye-maumivu",
    painful: "macroscopic",
    smooth: "nyororo",
    tender: "laini-sana",
    craggy: "yenye-muundo-mbaya-rafu",
    irritable: "kuwashwa",
    lethargic: "legevu",
    comatose: "koma",
    monoarthritis: "monoarthritis",
    oligoarthritis: "oligoarthritis",
    polyarthritis: "polyarthritis",
    hypotonia: "hypotonia",
    hypertonia: "hypertonia",
    thick: "nene",
    "foul-smelling": "kutoa-harufu-mbaya",
    colored: "yenye-rangi",
    purulent: "yenye-kutoa-usaha",
    "prgoressive-worsening": "inayozidi-kuwa-mbaya",
    serous: "yenye-kuzalisha-serumu",
    blood: "damu",
    "slightly-increased": "imeongezeka-kidogo",
    tachycardia: "mapigo-ya-moyo-ya-kasi-isiyo-ya-kawaida",
    "large-raised-lesion": "kidonda-kikubwa",
    "clear-colored": "rangi-nyeupe",
    "nasal-obstruction": "kuziba-kwa-pua",
    macules: "eneo-la-kubadilika-rangi-ya-ngozi",
    papules: "chunusi",
    nodules: "vinundu",
    plaques: "doa",
    wheal: "upele",
    blisters: "malengelenge",
    scales: "magamba",
    crust: "ukurutu",
    erosions: "mmomonyoko",
    ulcers: "vidonda",
    atrophy: "kudhoofika",
    lichenification: "lichenification",
    burrow: "shimo",
    comedones: "comedones",
    malar: "malar",
    discoid: "umbo-la-diski",
    "mild-delay-less-than-2-seconds": "ucheleweshaji-mdogo-chini-ya-sekunde-2",
    "severe-delay-more-than-2-seconds": "ucheleweshaji-zaidi-ya-sekunde-2",
    expiratory: "kutoa-pumzi-nje",
    inspiratory: "kuvuta-pumza-ndani",
    projectile: "kutapika-kwa-nguvu-kubwa",
    "non-projectile": "kutapika-kidogo",
    "bile-stained-yellow": "yenye-madoa-ya-manjano",
    "bile-stained-green": "yenye-madoa-ya-kijani",
    "clear-with-food": "yenye-chakula"
  },
  aggravators: {
    constipation: "kukosa-choo",
    "cold-weather": "hali-ya-hewa-baridi",
    "deep-breathing": "kuvuta-pumzi",
    coughing: "kukohoa",
    exercise: "mazoezi",
    "light-activity": "shughuli-nyepesi",
    "laying-down": "kulala-chini",
    dust: "vumbi",
    pollen: "chavua-ya-maua",
    smoke: "moshi",
    "bright-lights": "mwanga-mkali",
    chewing: "kutafuna",
    food: "chakula",
    "drinking-cold-water": "kunywa-maji-baridi",
    speaking: "kuongea",
    "lying-flat": "kulala-chali",
    "standing-or-sitting": "kusimama-au-kukaa",
    "lying-on-one-side": "kulala-upande-mmoja",
    sleeping: "kulala",
    "light-exercise": "kemikali-zinazowasha",
    cold: "baridi",
    "increased-fluid-intake": "ongezeko-la-utumiaji-wa-vimiminika",
    eating: "kula",
    crying: "kilio",
    "standing-up": "kusimama",
    stress: "msongo-wa-mawazo",
    "emotional-conflict": "mgogoro-wa-kihisia",
    "bending-forward": "kuinama-mbele",
    fever: "homa",
    "joint-movement": "kusogeasogea-kwa-jointi",
    "decreased-fluid-intake": "kupungua-kwa-unywaji-wa-vimiminika",
    "exposure-to-sunlight": "kukaa-kwenye-mwangaza-wa-jua",
    diuretics: "dawa-za-diuretiki",
    spores: "spores",
    "dust-mites": "vumbi",
    "chemical-irritants": "utitiri",
    "eating-or-drinking": "eating-or-drinking",
    "drinking water": "kunywa-maji",
    "cold-air": "hewa-baridi",
    aspirin: "aspirini",
    "non-steroidal-anti-inflammatory-drugs": "dawa-zinazozuia-kuvimba"
  },
  location: {
    lower: "chini",
    upper: "juu",
    hands: "viganja-vya-mikono",
    feet: "miguu",
    hand: "mkono",
    foot: "mguu",
    eyes: "macho",
    nose: "pua",
    mouth: "mdomo",
    "lateral-right": "upande-wa-kulia",
    "lateral-left": "upande-wa-kushoto",
    bilateral: "pande-mbili",
    face: "uso",
    scalp: "kichwani",
    trunk: "mwili",
    back: "mgongo",
    legs: "mikono",
    arms: "sehemu-za-siri",
    facial: "usoni",
    periorbital: "periorbital",
    "lower-limbs": "miguu",
    abdomen: "tumbo",
    generalized: "kichwa-chote-kwa-ujumla",
    frontal: "mbele",
    "top-of-head": "juu-ya-kichwa",
    temples: "pande-bapa-za-kichwa",
    "both-eyes": "macho-yote",
    "one-eye": "jicho-moja",
    unilateral: "upande-mmoja",
    head: "kichwa",
    genitals: "mwili-mzima",
    "lower-chest-wall": "ukuta-wa-chini-wa-kifua",
    knee: "goti",
    elbow: "kiwiko-cha-mkono",
    hip: "nyonga",
    wrist: "kiuno",
    ankle: "kifundo-cha-mguu"
  },
  duration: {
    "less-than-two-weeks": "chini-ya-wiki-mbili",
    "more-than-two-weeks": "zaidi-ya-wiki-mbili",
    "less-than-two-days": "chini-ya-siku-mbili",
    "more-than-two-days": "zaidi-ya-siku-mbili",
    "less-than-five-days": "chini-ya-siku-tano",
    "five-days-to-three-weeks": "siku-tano-hadi-wiki-tatu",
    "three-to-eight-weeks": "wiki-tatu-hadi-nane",
    "more-than-eight-weeks": "zaidi-ya-wiki-nane",
    "less-than-three-weeks": "chini-ya-wiki-tatu",
    chronic: "sugu",
    "less-than-six-weeks": "chini-ya-wiki-sita",
    "more-than-six-weeks": "zaidi-ya-wiki-sita",
    "less-than-24-hours": "chini-ya-masaa-ishirini-na-nne",
    "between-two-and-six-weeks": "kati-ya-wiki-mbili-hadi-sita",
    "less-than-five-minutes": "chini-ya-dakika-tano",
    "more-than-five-minutes": "zaidi-ya-dakika-tano"
  },
  periodicity: {
    "non-specific": "muda-wowote",
    intermittent: "muda-mfupi",
    sustained: "endelevu",
    morning: "asubuhi",
    night: "usiku",
    intermitted: "muda-mfupi",
    "early-morning": "alfajiri",
    "during-meals": "wakati-wa-milo",
    afternoon: "mchana",
    persistent: "ya-kudumu",
    relapsing: "ya-kujirudia",
    "step-ladder": "ngazi",
    remittent: "mabadiliko-ya-joto-la-mwili",
    recurrent: "yenye-kujirudia",
    "non-periodic": "muda-wowote",
    "more-intense-at-night": "mkali-zaidi-usiku",
    seasonal: "msimu",
    "waking-up": "kuamka",
    feeding: "kulisha",
    exertion: "juhudi",
    crying: "kulia"
  },
  reducers: {
    rest: "pumzika",
    "laying-down": "kulala-chini",
    sleeping: "kulala",
    "stool-softeners": "vilainishi-vya-kinyesi",
    antihistamines: "antihistamines",
    "cough-suppressants": "dawa-za-kuzuia-kikohozi",
    "pain-relievers": "vipunguza-maumivu",
    antidiarrheal: "dawa-za-kuzuia-kuhara",
    hunger: "njaa",
    sitting: "kuketi",
    "bladder-training": "mafunzo-ya-kibofu",
    antipyretics: "antipyretics",
    "anti-inflammatories": "anti-inflammatories",
    antibiotics: "antibiotiki",
    corticosteroids: "homoni",
    "drinking-hot-water": "kunywa-maji-moto",
    diuretics: "dawa-za-diuretiki",
    standing: "kusimama",
    "not-eating": "bila-kula",
    antiemetic: "dawa-za-kuzuia-kutapika",
    "water-intake": "kunywa-maji",
    "laying down": "kulala-chini",
    bronchodilators: "dawa-ambayo-husababisha-upanuzi-wa-koo-la-hewa"
  }
};
var donpar_map_default = {
  en,
  sw
};

// data/translated/symptoms-translations.json
var en2 = {
  "abdominal-distension": {
    name: "abdominal-distension",
    tags: [
      "bloating",
      "swelling",
      "abdominal-pain"
    ],
    description: "Bloating and swelling in the belly area.",
    symptom: "abdominal-distension"
  },
  "abdominal-pain": {
    name: "abdominal-pain",
    tags: [
      "stomachache",
      "stomach-pain"
    ],
    description: "Pain from inside the abdomen or the outer muscle wall, ranging from mild and temporary to severe and requiring emergency care.",
    symptom: "abdominal-pain"
  },
  "abdominal-tenderness": {
    name: "abdominal-tenderness",
    tags: [],
    description: "Tenderness or pain of the abdomen.",
    symptom: "abdominal-tenderness"
  },
  ageusia: {
    name: "ageusia",
    tags: [
      "mouth",
      "taste"
    ],
    description: "Loss of taste.",
    symptom: "ageusia"
  },
  "angular-cheilitis": {
    name: "angular-cheilitis",
    tags: [],
    description: "Inflammation and small cracks in one or both corners of the mouth.",
    symptom: "angular-cheilitis"
  },
  anosmia: {
    name: "anosmia",
    tags: [],
    description: "Loss of smell.",
    symptom: "anosmia"
  },
  ascites: {
    name: "ascites",
    tags: [
      "abdominal",
      "swelling"
    ],
    description: "Excess abdominal fluid.",
    symptom: "ascites"
  },
  "blood-pressure": {
    name: "blood-pressure",
    tags: [],
    description: "Pressure of circulating blood against the walls of blood vessels.",
    symptom: "blood-pressure"
  },
  "bow-legs": {
    name: "bow-legs",
    tags: [
      "development",
      "child",
      "legs"
    ],
    description: "When the legs curve outward at the knees while the feet and ankles touch.",
    symptom: "bow-legs"
  },
  "brudzinskis-sign": {
    name: "brudzinskis-sign",
    tags: [
      "stiff",
      "neck"
    ],
    description: "Severe neck stiffness causes a patient's hips and knees to flex when the neck is flexed.",
    symptom: "brudzinskis-sign"
  },
  "capillary-refill": {
    name: "capillary-refill",
    tags: [],
    description: "Time taken for a distal capillary bed to regain its color after pressure has been applied to cause blanching",
    symptom: "capillary-refill"
  },
  cardiomegaly: {
    name: "cardiomegaly",
    tags: [
      "heart",
      "breathing"
    ],
    description: "An enlarged heart.",
    symptom: "cardiomegaly"
  },
  "chest-pain": {
    name: "chest-pain",
    tags: [
      "chest",
      "pain",
      "heart"
    ],
    description: "Discomfort in the chest including a dull ache, a crushing or burning feeling, a sharp stabbing pain and pain that radiates to the neck or shoulder.",
    symptom: "chest-pain"
  },
  "chest-tightness": {
    name: "chest-tightness",
    tags: [
      "chest",
      "pain",
      "heart"
    ],
    description: "Tightness or squeezing feeling in the chest.",
    symptom: "chest-tightness"
  },
  clubbing: {
    name: "clubbing",
    tags: [
      "finger",
      "hand",
      "nail"
    ],
    description: "An abnormal, rounded shape of the nail bed.",
    symptom: "clubbing"
  },
  constipation: {
    name: "constipation",
    tags: [
      "poop",
      "abdominal-pain"
    ],
    description: "When a person passes less than three bowel movements a week or has difficult bowel movements.",
    symptom: "constipation"
  },
  convulsions: {
    name: "convulsions",
    tags: [],
    description: "Uncontrollable muscle contractions",
    symptom: "convulsions"
  },
  cough: {
    name: "cough",
    tags: [
      "wheeze",
      "dry-cough"
    ],
    description: "A sudden, forceful hacking sound to release air and clear an irritation in the throat or airway.",
    symptom: "cough"
  },
  crying: {
    name: "crying",
    tags: [
      "cry"
    ],
    description: "Tears or water coming from eyes.",
    symptom: "crying"
  },
  cyanosis: {
    name: "cyanosis",
    tags: [
      "blue",
      "lips",
      "skin",
      "gray"
    ],
    description: "Bluish or greyish colour of the skin, nails, lips or around the eyes.",
    symptom: "cyanosis"
  },
  dactylitis: {
    name: "dactylitis",
    tags: [
      "finger",
      "toe",
      "hand",
      "foot"
    ],
    description: "Swelling of a finger or a toe.",
    symptom: "dactylitis"
  },
  dehydration: {
    name: "dehydration",
    tags: [],
    description: "Loss of body fluid caused by illness, sweating or inadequate intake.",
    symptom: "dehydration"
  },
  "dental-pain": {
    name: "dental-pain",
    tags: [
      "mouth",
      "teeth"
    ],
    description: "Pain in the teeth.",
    symptom: "dental-pain"
  },
  diarrhoea: {
    name: "diarrhoea",
    tags: [
      "watery",
      "stool",
      "poop"
    ],
    description: "Loose, watery stools that occur more frequently than usual.",
    symptom: "diarrhoea"
  },
  "drinking-ability": {
    name: "drinking-ability",
    tags: [],
    description: "Ability to consume liquid.",
    symptom: "drinking-ability"
  },
  "dry-mucosa": {
    name: "dry-mucosa",
    tags: [],
    description: "Dryness around the nose, eyes, and/ or mouth.",
    symptom: "dry-mucosa"
  },
  dysphagia: {
    name: "dysphagia",
    tags: [
      "painful-swallowing",
      "swallowing"
    ],
    description: "Difficulty swallowing foods or liquids, arising from the throat or oesophagus, ranging from mild difficulty to complete and painful blockage.",
    symptom: "dysphagia"
  },
  dysphonia: {
    name: "dysphonia",
    tags: [],
    description: "Voice hoarseness or abnormal voice.",
    symptom: "dysphonia"
  },
  dyspnoea: {
    name: "dyspnoea",
    tags: [
      "difficulty",
      "breathe",
      "breathing"
    ],
    description: "Difficult or laboured breathing.",
    symptom: "dyspnoea"
  },
  dysuria: {
    name: "dysuria",
    tags: [
      "pain",
      "burn",
      "pee"
    ],
    description: "Discomfort, pain or burning when urinating.",
    symptom: "dysuria"
  },
  "ear-pressure": {
    name: "ear-pressure",
    tags: [
      "ear"
    ],
    description: "A feeling of fullness or pressure in the ear.",
    symptom: "ear-pressure"
  },
  ecchymosis: {
    name: "ecchymosis",
    tags: [
      "skin",
      "bruise",
      "blood"
    ],
    description: "A discoloration of the skin resulting from bleeding underneath that can be black, blue, or yellow in color.",
    symptom: "ecchymosis"
  },
  edema: {
    name: "edema",
    tags: [
      "swollen",
      "puffy"
    ],
    description: "Swelling caused by excess fluid trapped in the body's tissues.",
    symptom: "edema"
  },
  "enlarged-tonsils": {
    name: "enlarged-tonsils",
    tags: [],
    description: "Swollen tonsils in the back of the throat.",
    symptom: "enlarged-tonsils"
  },
  "enlarged-tympanic-membrane": {
    name: "enlarged-tympanic-membrane",
    tags: [
      "ear"
    ],
    description: "Swollen or inflammed tympanic membrane due to infection.",
    symptom: "enlarged-tympanic-membrane"
  },
  enurisis: {
    name: "enurisis",
    tags: [
      "bedwetting",
      "bed",
      "wetting"
    ],
    description: "Night time loss of bladder control, or bed-wetting, usually in children.",
    symptom: "enurisis"
  },
  epitastaxis: {
    name: "epitastaxis",
    tags: [],
    description: "A nosebleed or minor bleeding from the blood vessels of the nose.",
    symptom: "epitastaxis"
  },
  "excessive-sweating": {
    name: "excessive-sweating",
    tags: [],
    description: "Abnormally excessive sweating that's not necessarily related to heat or exercise",
    symptom: "excessive-sweating"
  },
  "facial-pain": {
    name: "facial-pain",
    tags: [],
    description: "Pain of the face.",
    symptom: "facial-pain"
  },
  "facial-pressure": {
    name: "facial-pressure",
    tags: [],
    description: "Feeling of fullness in the face.",
    symptom: "facial-pressure"
  },
  fever: {
    name: "fever",
    tags: [
      "hot",
      "warm",
      "temperature"
    ],
    description: "A temporary increase in average body temperature of 37\xB0C.",
    symptom: "fever"
  },
  "foamy-urine": {
    name: "foamy-urine",
    tags: [],
    description: "Urime with small to medium sized bubbles.",
    symptom: "foamy-urine"
  },
  "frontal-bossing": {
    name: "frontal-bossing",
    tags: [
      "head"
    ],
    description: "An unusually prominent forehead.",
    symptom: "frontal-bossing"
  },
  "growth-failure": {
    name: "growth-failure",
    tags: [
      "development",
      "child",
      "weight"
    ],
    description: "A growth rate below the appropriate growth velocity for age.",
    symptom: "growth-failure"
  },
  haemoptysis: {
    name: "haemoptysis",
    tags: [],
    description: "Coughing up blood.",
    symptom: "haemoptysis"
  },
  "hair-changes": {
    name: "hair-changes",
    tags: [],
    description: "Abnormal changes to the color or texture of hair.",
    symptom: "hair-changes"
  },
  "hair-loss": {
    name: "hair-loss",
    tags: [],
    description: "Hair falling out from the scalp or other parts of the body.",
    symptom: "hair-loss"
  },
  halitosis: {
    name: "halitosis",
    tags: [
      "mouth",
      "teeth"
    ],
    description: "Bad breath.",
    symptom: "halitosis"
  },
  headache: {
    name: "headache",
    tags: [
      "head",
      "pain"
    ],
    description: "A painful sensation in any part of the head, ranging from sharp to dull, that may occur with other symptoms.",
    symptom: "headache"
  },
  "hearing-loss": {
    name: "hearing-loss",
    tags: [
      "ear"
    ],
    description: "Total or significant loss of hearing.",
    symptom: "hearing-loss"
  },
  "heart-murmur": {
    name: "heart-murmur",
    tags: [],
    description: "An extra sound in the heartbeat -- such as a ''whooshing'' -- that is caused by turbulent blood flow through the heart valves.",
    symptom: "heart-murmur"
  },
  hemarthrosis: {
    name: "hemarthrosis",
    tags: [
      "skin",
      "blood",
      "bruise"
    ],
    description: "Articular bleeding into the joint cavity.",
    symptom: "hemarthrosis"
  },
  hematoma: {
    name: "hematoma",
    tags: [
      "bruise",
      "blood"
    ],
    description: "Collection of blood outside of blood vessel, commonly caused by trauma.",
    symptom: "hematoma"
  },
  hematuria: {
    name: "hematuria",
    tags: [
      "blood",
      "urine",
      "pee"
    ],
    description: "Blood in urine.",
    symptom: "hematuria"
  },
  hepatomegaly: {
    name: "hepatomegaly",
    tags: [],
    description: "An enlarged liver.",
    symptom: "hepatomegaly"
  },
  "hyperemic-larynx": {
    name: "hyperemic-larynx",
    tags: [],
    description: "Red and swollen larynx.",
    symptom: "hyperemic-larynx"
  },
  "hyperemic-pharynx": {
    name: "hyperemic-pharynx",
    tags: [
      "sore-throat"
    ],
    description: "Red and swollen pharynx at the back of the throat.",
    symptom: "hyperemic-pharynx"
  },
  "hyperemic-tonsils": {
    name: "hyperemic-tonsils",
    tags: [],
    description: "Red and irritated tonsils in the back of the throat.",
    symptom: "hyperemic-tonsils"
  },
  "hyperemic-tympanic-membrane": {
    name: "hyperemic-tympanic-membrane",
    tags: [
      "ear"
    ],
    description: "Red appearance on the tympanic membrane due to increased blood flow.",
    symptom: "hyperemic-tympanic-membrane"
  },
  hyperpigmentation: {
    name: "hyperpigmentation",
    tags: [
      "skin",
      "dark-patches",
      "discolored"
    ],
    description: "Darkened patches or spots on the skin.",
    symptom: "hyperpigmentation"
  },
  hypopigmentation: {
    name: "hypopigmentation",
    tags: [
      "skin",
      "light-patches",
      "discolored"
    ],
    description: "Lightened patches or spots on the skin.",
    symptom: "hypopigmentation"
  },
  hypothermia: {
    name: "hypothermia",
    tags: [
      "cold",
      "temperature"
    ],
    description: "A significant and potentially dangerous drop in body temperature.",
    symptom: "hypothermia"
  },
  indrawing: {
    name: "indrawing",
    tags: [],
    description: "Inward movement of the lower chest wall when a child breathes in.",
    symptom: "indrawing"
  },
  "intercostal-recession": {
    name: "intercostal-recession",
    tags: [],
    description: "Sharp inward pull of the intercostal muscles due to reduced pressure in the chest.",
    symptom: "intercostal-recession"
  },
  irritability: {
    name: "irritability",
    tags: [
      "lethargy"
    ],
    description: "Feeling or expressing agitated.",
    symptom: "irritability"
  },
  jaundice: {
    name: "jaundice",
    tags: [
      "yellow",
      "eyes",
      "skin"
    ],
    description: "Yellow skin caused by the build-up of bilirubin in the blood.",
    symptom: "jaundice"
  },
  "joint-pain": {
    name: "joint-pain",
    tags: [],
    description: "Physical discomfort where two or more bones meet to form a joint, ranging from mild to disabling.",
    symptom: "joint-pain"
  },
  "joint-swelling": {
    name: "joint-swelling",
    tags: [
      "swelling",
      "edema",
      "puffy"
    ],
    description: "Swelling or enlarging of joints due to increased fluid in the tissue surrounding joints.",
    symptom: "joint-swelling"
  },
  "kernigs-sign": {
    name: "kernigs-sign",
    tags: [
      "stiff",
      "leg"
    ],
    description: "Severe stiffness of the hamstrings causes an inability to straighten the leg when the hip is flexed to 90 degrees.",
    symptom: "kernigs-sign"
  },
  "limited-range-of-motion": {
    name: "limited-range-of-motion",
    tags: [
      "joint",
      "pain",
      "stiff"
    ],
    description: "A joint with a reduction in its ability to move or bend.",
    symptom: "limited-range-of-motion"
  },
  malnutrition: {
    name: "malnutrition",
    tags: [
      "weight-loss",
      "weight-gain"
    ],
    description: "Deficiencies, excesses or imbalances in a person's intake of energy and/or nutrients.",
    symptom: "malnutrition"
  },
  "mental-status": {
    name: "mental-status",
    tags: [
      "lethargy",
      "coma"
    ],
    description: "Mental capacity, including level of consciousness, attentiveness, motor and speech activity, mood, and affect.",
    symptom: "mental-status"
  },
  "mid-upper-arm-circumference": {
    name: "mid-upper-arm-circumference",
    tags: [
      "malnutrition",
      "underweight"
    ],
    description: "A measure to assess nutritional status by looking at the circumference of the left upper arm.",
    symptom: "mid-upper-arm-circumference"
  },
  "muscle-tone": {
    name: "muscle-tone",
    tags: [],
    description: "Amount of tension (or resistance to movement) in muscles.",
    symptom: "muscle-tone"
  },
  "muscle-weakness": {
    name: "muscle-weakness",
    tags: [
      "weak",
      "muscles",
      "tired",
      "paralysis"
    ],
    description: "Decreased strength in the muscles.",
    symptom: "muscle-weakness"
  },
  "nasal-congestion": {
    name: "nasal-congestion",
    tags: [
      "runny-nose"
    ],
    description: "A stuffy nose, when nasal tissues are swollen with fluid.",
    symptom: "nasal-congestion"
  },
  "nasal-discharge": {
    name: "nasal-discharge",
    tags: [
      "runny-nose",
      "congestion"
    ],
    description: "Mucus coming from the nose.",
    symptom: "nasal-discharge"
  },
  "nasal-polyps": {
    name: "nasal-polyps",
    tags: [],
    description: "A painless benign growth on the lining of the nose or sinuses.",
    symptom: "nasal-polyps"
  },
  "night-sweats": {
    name: "night-sweats",
    tags: [
      "chills"
    ],
    description: "Repeated episodes of extreme perspiration that may soak your nightclothes or bedding.",
    symptom: "night-sweats"
  },
  oliguria: {
    name: "oliguria",
    tags: [
      "urine",
      "pee"
    ],
    description: "Urine output below normal or low.",
    symptom: "oliguria"
  },
  orthopnea: {
    name: "orthopnea",
    tags: [
      "breathing",
      "dyspnoea"
    ],
    description: "Discomfort when breathing while lying down flat.",
    symptom: "orthopnea"
  },
  otalgia: {
    name: "otalgia",
    tags: [
      "ear",
      "pain",
      "ear-pain"
    ],
    description: "Ear pain in the inner or outer ear that may interfere with ability to hear.",
    symptom: "otalgia"
  },
  otorrhea: {
    name: "otorrhea",
    tags: [
      "ear-fluid",
      "discharge",
      "fluid"
    ],
    description: "Fluid or discharge from the ear.",
    symptom: "otorrhea"
  },
  pallor: {
    name: "pallor",
    tags: [
      "pale-skin"
    ],
    description: "Paleness or loss of colour from the skin or mucous membranes.",
    symptom: "pallor"
  },
  "peritonsillar-abscess": {
    name: "peritonsillar-abscess",
    tags: [],
    description: "Collection of pus in the tissues of the throat.",
    symptom: "peritonsillar-abscess"
  },
  petechiae: {
    name: "petechiae",
    tags: [
      "skin"
    ],
    description: "Tiny round, brown-purple spots due to bleeding under the skin or mucous membranes.",
    symptom: "petechiae"
  },
  photosensitivity: {
    name: "photosensitivity",
    tags: [
      "rash",
      "red",
      "sun"
    ],
    description: "Itchy eruptions or areas of redness and inflammation on sun-exposed skin.",
    symptom: "photosensitivity"
  },
  polyuria: {
    name: "polyuria",
    tags: [],
    description: "The need to urinate more often than normal.",
    symptom: "polyuria"
  },
  "poor-feeding": {
    name: "poor-feeding",
    tags: [
      "fatigue"
    ],
    description: "Little interest in feeding or easily fatigued when feeding.",
    symptom: "poor-feeding"
  },
  pruritis: {
    name: "pruritis",
    tags: [
      "rash",
      "itch",
      "itchy",
      "sore"
    ],
    description: "Also called itchy skin, it is an uncomfortable, irritating sensation that makes someone want to scratch.",
    symptom: "pruritis"
  },
  "pulling-on-ear": {
    name: "pulling-on-ear",
    tags: [
      "ear",
      "pain",
      "ear-pain",
      "otalgia"
    ],
    description: "Touching or pulling on ear, especially for infants.",
    symptom: "pulling-on-ear"
  },
  "pulse-rate": {
    name: "pulse-rate",
    tags: [
      "heart-rate"
    ],
    description: "The number of times your heart beats in one minute.",
    symptom: "pulse-rate"
  },
  purpura: {
    name: "purpura",
    tags: [
      "skin"
    ],
    description: "A rash of purple spots, also called blood spots.",
    symptom: "purpura"
  },
  "reduced-appetite": {
    name: "reduced-appetite",
    tags: [
      "hungry"
    ],
    description: "Reduced desire to eat.",
    symptom: "reduced-appetite"
  },
  rhinorrhea: {
    name: "rhinorrhea",
    tags: [
      "runny-nose",
      "running",
      "nose",
      "fluid-from-nose"
    ],
    description: "Excess drainage, ranging from a clear fluid to thick mucus, from the nose and nasal passages.",
    symptom: "rhinorrhea"
  },
  seizures: {
    name: "seizures",
    tags: [
      "shaking",
      "spazzing"
    ],
    description: "Sudden, uncontrolled electrical disturbance in the brain that causes changes in behavior, movements or feelings, and in levels of consciousness.",
    symptom: "seizures"
  },
  "sinus-tenderness": {
    name: "sinus-tenderness",
    tags: [],
    description: "Tenderness or pain of the facial sinuses.",
    symptom: "sinus-tenderness"
  },
  "skin-desquamation": {
    name: "skin-desquamation",
    tags: [
      "skin",
      "peeling"
    ],
    description: "An unintended damage to and loss of the upper layer of skin.",
    symptom: "skin-desquamation"
  },
  "skin-lesions": {
    name: "skin-lesions",
    tags: [
      "rash",
      "red",
      "sore",
      "ulcer",
      "color"
    ],
    description: "An abnormal lump, bump, ulcer, sore, or colored area of the skin.",
    symptom: "skin-lesions"
  },
  "skin-rash": {
    name: "skin-rash",
    tags: [
      "rash",
      "skin",
      "red"
    ],
    description: "Temporary outbreak of red, bumpy, scaly or itchy patches of skin, possibly with blisters or welts.",
    symptom: "skin-rash"
  },
  "skin-turgor": {
    name: "skin-turgor",
    tags: [],
    description: "Elasticity of one's skin.",
    symptom: "skin-turgor"
  },
  sneezing: {
    name: "sneezing",
    tags: [],
    description: "A powerful, involuntary expulsion of air.",
    symptom: "sneezing"
  },
  snoring: {
    name: "snoring",
    tags: [
      "breathing"
    ],
    description: "Hoarse or harsh sound from the nose or mouth that happens when breathing is partially obstructed while sleeping.",
    symptom: "snoring"
  },
  "sore-throat": {
    name: "sore-throat",
    tags: [],
    description: "Pain or irritation in the throat that can occur with or without swallowing",
    symptom: "sore-throat"
  },
  splenomegaly: {
    name: "splenomegaly",
    tags: [],
    description: "An enlarged spleen.",
    symptom: "splenomegaly"
  },
  stridor: {
    name: "stridor",
    tags: [
      "cough",
      "breathing"
    ],
    description: "An abnormal, high-pitched, musical breathing sound.",
    symptom: "stridor"
  },
  stunting: {
    name: "stunting",
    tags: [
      "short",
      "growth"
    ],
    description: "Impaired growth and development, typically seen in children.",
    symptom: "stunting"
  },
  "sunken-eyes": {
    name: "sunken-eyes",
    tags: [],
    description: "Skin under the eyes appearing dark, sunken, and hollow.",
    symptom: "sunken-eyes"
  },
  syncope: {
    name: "syncope",
    tags: [
      "shaking",
      "spazzing"
    ],
    description: "Fainting or a sudden temporary loss of consciousness.",
    symptom: "syncope"
  },
  tachycardia: {
    name: "tachycardia",
    tags: [
      "heart-rate"
    ],
    description: "Fast beating heart or fast heart rate.",
    symptom: "tachycardia"
  },
  tachypnoea: {
    name: "tachypnoea",
    tags: [
      "breath"
    ],
    description: "Abnormally rapid breathing.",
    symptom: "tachypnoea"
  },
  "teeth-malocclusion": {
    name: "teeth-malocclusion",
    tags: [],
    description: "Misaligned teeh or the abnormal alignment of the upper and lower teeth.",
    symptom: "teeth-malocclusion"
  },
  "tet-spell": {
    name: "tet-spell",
    tags: [
      "blue-lips",
      "blue-skin"
    ],
    description: "Deep blue skin, nails, and lips in an infant after crying or feeding caused by a rapid drop in the amount of oxygen in the blood.",
    symptom: "tet-spell"
  },
  underweight: {
    name: "underweight",
    tags: [],
    description: "A weight considered too low for good health.",
    symptom: "underweight"
  },
  vomiting: {
    name: "vomiting",
    tags: [
      "vomit",
      "throw-up",
      "food",
      "nausea"
    ],
    description: "Forcefully expelling the stomach's contents out of the mouth.",
    symptom: "vomiting"
  },
  wasting: {
    name: "wasting",
    tags: [],
    description: "Low weight-for-height ratio.",
    symptom: "wasting"
  },
  "weight-faltering": {
    name: "weight-faltering",
    tags: [
      "poor-weight",
      "weight",
      "underweight",
      "feed",
      "eat"
    ],
    description: "Weight gain is slow or delayed, especially for infants and children.",
    symptom: "weight-faltering"
  },
  "weight-gain": {
    name: "weight-gain",
    tags: [],
    description: "Kilograms added to body mass, often resulting from overeating or lack of physical activity.",
    symptom: "weight-gain"
  },
  "weight-loss": {
    name: "weight-loss",
    tags: [],
    description: "Decrease in body weight.",
    symptom: "weight-loss"
  },
  wheezing: {
    name: "wheezing",
    tags: [
      "cough",
      "whistling"
    ],
    description: "A high-pitched whistling sound made while breathing.",
    symptom: "wheezing"
  }
};
var sw2 = {
  "abdominal-distension": {
    name: "Kuvimba kwa tumbo",
    tags: [
      "kuvimba",
      "uvimbe",
      "maumivu-ya-tumbo"
    ],
    description: "Kuvimba na kuwa na uvimbe kwenye eneo la tumbo.",
    symptom: "abdominal-distension"
  },
  "abdominal-pain": {
    name: "Maumivu ya tumbo",
    tags: [
      "maumivu-ya-tumbo",
      "tumbo-kuuma"
    ],
    description: "Maumivu kutoka ndani ya tumbo au ukuta wa nje wa misuli, kuanzia ya upole na ya muda hadi makali na yanayohitaji huduma ya dharura.",
    symptom: "maumivu-ya-tumbo"
  },
  "abdominal-tenderness": {
    name: "abdominal-tenderness",
    tags: [],
    description: "Tenderness or pain of the abdomen.",
    symptom: "abdominal-tenderness"
  },
  ageusia: {
    name: "Hisia ya ladha",
    tags: [
      "mdomo",
      "ladha"
    ],
    description: "Kupoteza ladha.",
    symptom: "hisia-ya-ladha"
  },
  "angular-cheilitis": {
    name: "Angular Cheilitis",
    tags: [],
    description: "Kuvimba na mipasuko midogo katika kona moja au zote mbili za mdomo.",
    symptom: "angular-cheilitis"
  },
  anosmia: {
    name: "Anosmia",
    tags: [],
    description: "Kupoteza uwezo wa kunusa",
    symptom: "anosmia"
  },
  ascites: {
    name: "Ascites",
    tags: [
      "tumbo",
      "uvimbe"
    ],
    description: "Maji ya ziada tumboni",
    symptom: "ascites"
  },
  "blood-pressure": {
    name: "Shinikizo la damu",
    tags: [],
    description: "Shinikizo la mzunguko wa damu dhidi ya kuta za mishipa ya damu.",
    symptom: "shinikizo-la-damu"
  },
  "bow-legs": {
    name: "Bow Legs",
    tags: [
      "maendeleo",
      "mtoto",
      "miguu"
    ],
    description: "Miguu inapopinda kwa nje kwenye magoti huku viganja na vifundo vya miguu vinagusana.",
    symptom: "bow-legs"
  },
  "brudzinskis-sign": {
    name: "Brudzinskis Sign",
    tags: [
      "ngumu",
      "shingo"
    ],
    description: "Kukakamaa sana kwa shingo husababisha nyonga na magoti ya mgonjwa kujikunja wakati shingo inapokunjamana.",
    symptom: "brudzinskis-sign"
  },
  "capillary-refill": {
    name: "Kujazwa tena kwa Capillary",
    tags: [],
    description: "Muda uliochukuliwa kwa kapilari kurejesha rangi yake baada ya shinikzo kutumika kusababisha rangi nyeupe",
    symptom: "capillary-refill"
  },
  cardiomegaly: {
    name: "Cardiomegaly",
    tags: [
      "moyo",
      "kupumua"
    ],
    description: "Moyo uliopanuka",
    symptom: "cardiomegaly"
  },
  "chest-pain": {
    name: "Maumivu ya kifua",
    tags: [
      "kifua",
      "maumivu",
      "moyo"
    ],
    description: "Usumbufu katika kifua ikiwa ni pamoja na kuuma kidogo, hisia ya kupondwa au kuungua, maumivu makali ya kisu na maumivu ambayo hutoka kwenye shingo au bega.",
    symptom: "chest-pain"
  },
  "chest-tightness": {
    name: "Kubanwa Kifua",
    tags: [
      "kifua",
      "maumivu",
      "moyo"
    ],
    description: "Kubanwa au hisia ya mgandamizo kwenye kifua",
    symptom: "chest-tightness"
  },
  clubbing: {
    name: "Clubbing",
    tags: [
      "kidole",
      "mkono",
      "ukucha"
    ],
    description: "Umbo lisilo la kawaida, la mviringo wa ukucha.",
    symptom: "clubbing"
  },
  constipation: {
    name: "Kukosa choo",
    tags: [
      "kinyesi",
      "maumivu-ya-tumbo"
    ],
    description: "Wakati mtu anapopata choo chini ya mara tatu kwa wiki au kupata choo kigumu.",
    symptom: "constipation"
  },
  convulsions: {
    name: "Degedege",
    tags: [],
    description: "Mikazo ya misuli isiyoweza kudhibitiwa",
    symptom: "degedege"
  },
  cough: {
    name: "Kikohozi",
    tags: [
      "pumua",
      "kikohozi-kikavu"
    ],
    description: "Sauti ya ghafla na yenye nguvu ya kutoa hewa na kuondoa mwasho kwenye koo au njia ya hewa.",
    symptom: "kikohozi"
  },
  crying: {
    name: "Kulia",
    tags: [
      "kulia"
    ],
    description: "Machozi au maji yanayotoka machoni.",
    symptom: "crying"
  },
  cyanosis: {
    name: "Cyanosis",
    tags: [
      "bluu",
      "mdomo",
      "ngozi",
      "kijivu"
    ],
    description: "Rangi ya blue au kijivu ya ngozi, kucha, midomo au karibu na macho.",
    symptom: "cyanosis"
  },
  dactylitis: {
    name: "dactylitis",
    tags: [
      "kidole",
      "kidole-cha-mguu",
      "mkono",
      "mguu"
    ],
    description: "Kuvimba kwa kidole au kidole cha mguu",
    symptom: "dactylitis"
  },
  dehydration: {
    name: "upungufu wa maji mwilini",
    tags: [],
    description: "Kupoteza maji mwilini kunakosababishwa na ugonjwa, jasho au ulaji usiofaa.",
    symptom: "dehydration"
  },
  "dental-pain": {
    name: "Maumivu ya Meno",
    tags: [
      "mdomo",
      "meno"
    ],
    description: "Maumivu katika meno.",
    symptom: "dental-pain"
  },
  diarrhoea: {
    name: "Kuhara",
    tags: [
      "majimaji",
      "choo",
      "kinyesi"
    ],
    description: "Vinyesi vya majimaji ambavyo hutokea mara kwa mara kuliko kawaida.",
    symptom: "diarrhoea"
  },
  "drinking-ability": {
    name: "Uwezo wa Kunywa",
    tags: [],
    description: "Uwezo wa kutumia kimiminika",
    symptom: "drinking-ability"
  },
  "dry-mucosa": {
    name: "Dry Mucosa",
    tags: [],
    description: "Ukavu kuzunguka pua, macho, na/au mdomo.",
    symptom: "dry-mucosa"
  },
  dysphagia: {
    name: "Dysphagia",
    tags: [
      "maumivu-wakati-wa-kumeza",
      "kumeza"
    ],
    description: "Maumivu na ugumu wa kumeza vyakula au vimiminika, unaotokana na koo la chakula kuziba.",
    symptom: "dysphagia"
  },
  dysphonia: {
    name: "Dysphonia",
    tags: [],
    description: "Uchakacho wa sauti au sauti isiyo ya kawaida.",
    symptom: "dysphonia"
  },
  dyspnoea: {
    name: "Dyspnoea",
    tags: [
      "ugumu",
      "pumua",
      "kupumua"
    ],
    description: "Kupumua kwa shida ",
    symptom: "dyspnoea"
  },
  dysuria: {
    name: "Dysuria",
    tags: [
      "maumivu",
      "choma",
      "kojoa"
    ],
    description: "Usumbufu, maumivu au hisia ya kuungua wakati wa kukojoa.",
    symptom: "dysuria"
  },
  "ear-pressure": {
    name: "Shinikizo la Masikio",
    tags: [
      "sikio"
    ],
    description: "Hisia ya ujazo au shinikizo katika sikio.",
    symptom: "ear-pressure"
  },
  ecchymosis: {
    name: "Ecchymosis",
    tags: [
      "ngozi",
      "mchubuko",
      "damu"
    ],
    description: "Kubadilika kwa rangi ya ngozi kutokana na kutokwa na damu ambayo inaweza kuwa ya rangi nyeusi, bluu au manjano.",
    symptom: "ecchymosis"
  },
  edema: {
    name: "Edema",
    tags: [
      "kuvimba",
      "kuvimba-isivyo-kawaida"
    ],
    description: "Uvimbe unaosababishwa na maji ya zaida yaliyonaswa kwenye tishu za mwili.",
    symptom: "edema"
  },
  "enlarged-tonsils": {
    name: "Tezi kubwa",
    tags: [],
    description: "Kuvimba kwa tezi nyuma ya koo.",
    symptom: "enlarged-tonsils"
  },
  "enlarged-tympanic-membrane": {
    name: "Enlarged Tympanic Membrane",
    tags: [
      "sikio"
    ],
    description: "kuvimba kwa ngozi ya ndani ya sikio kwa sabau ya maambukizi",
    symptom: "enlarged-tympanic-membrane"
  },
  enurisis: {
    name: "Enurisis",
    tags: [
      "kukojoa-kitandani",
      "kitanda",
      "kulowesha"
    ],
    description: "Kupoteza udhibiti wa kibofu wakati wa usiku, au Kukojoa kitandani, hususani kawaida kwa watoto.",
    symptom: "enurisis"
  },
  epitastaxis: {
    name: "Epitastaxis",
    tags: [],
    description: "Kutokwa na puani au damu kidogo kutoka kwenye mishipa ya damu ya pua.",
    symptom: "epitastaxis"
  },
  "excessive-sweating": {
    name: "Kutokwa na jasho kupindukia",
    tags: [],
    description: "Kutokwa na jasho kupita kiasi na hakuhusiani na joto au mazoezi",
    symptom: "excessive-sweating"
  },
  "facial-pain": {
    name: "Maumivu ya Usoni",
    tags: [],
    description: "Maumivu ya uso",
    symptom: "facial-pain"
  },
  "facial-pressure": {
    name: "Shinikizo la Usoni",
    tags: [],
    description: "hisia ya uso kujaa",
    symptom: "facial-pressure"
  },
  fever: {
    name: "homa",
    tags: [
      "moto",
      "joto"
    ],
    description: "Onezeko la joto mwilini linalozidi nyuzijoto 37",
    symptom: "homa"
  },
  "foamy-urine": {
    name: "Mkojo wenye Povu",
    tags: [],
    description: "mkojo wenye mapovu madogo madogo na ya saizi ya kati",
    symptom: "foamy-urine"
  },
  "frontal-bossing": {
    name: "Frontal Bossing",
    tags: [
      "kichwa"
    ],
    description: "Paji la uso lisilo la kawaida",
    symptom: "frontal-bossing"
  },
  "growth-failure": {
    name: "kudumaa",
    tags: [
      "maendeleo",
      "mtoto",
      "uzito"
    ],
    description: "Kiwango cha ukuaji kilicho chini ya kasi inayofaa ya ukuaji kwa umri.",
    symptom: "growth-failure"
  },
  haemoptysis: {
    name: "kukohoa  damu.",
    tags: [],
    description: "kukohoa damu.",
    symptom: "haemoptysis"
  },
  "hair-changes": {
    name: "Mabadiliko ya Nywele",
    tags: [],
    description: "Mabadiliko yasiyo ya kawaida kwenye rangi au muundo wa nywele.",
    symptom: "hair-changes"
  },
  "hair-loss": {
    name: "Kupoteza nywele",
    tags: [],
    description: "Nywele kuanguka kutoka kichwani au sehemu nyingine za mwili.",
    symptom: "hair-loss"
  },
  halitosis: {
    name: "Harufu mbaya kinywani",
    tags: [
      "mdomo",
      "meno"
    ],
    description: "Harufu mbaya kinywani",
    symptom: "halitosis"
  },
  headache: {
    name: "maumivu ya kichwa",
    tags: [
      "kichwa",
      "maumivu"
    ],
    description: "Hisia za maumivu katika sehemu yoyote ya kichwa, yaweza kuwa mkali au yasiwe makali, ambayo inaweza kutokea kwa dalili nyingine.",
    symptom: "headache"
  },
  "hearing-loss": {
    name: "upotevu wa usikivu",
    tags: [
      "sikio"
    ],
    description: "Upotevu mkubwa wa kusikia.",
    symptom: "hearing-loss"
  },
  "heart-murmur": {
    name: "Heart Murmur",
    tags: [],
    description: "Sauti ya ziada katika mapigo ya moyo kama vile ''kutetemeka'' ambayo husababishwa na mtiririko wa damu unaosumbua kupitia vali za moyo.",
    symptom: "heart-murmur"
  },
  hemarthrosis: {
    name: "Hemarthrosis",
    tags: [
      "ngozi",
      "damu",
      "mchubuko"
    ],
    description: "Kutokwa na damu kwenye eneo la kiungio/ jointi",
    symptom: "hemarthrosis"
  },
  hematoma: {
    name: "Hematoma",
    tags: [
      "mchubuko",
      "damu"
    ],
    description: "Mkusanyiko wa damu nje ya mshipa wa damu, unaosababishwa na majeraha.",
    symptom: "hematoma"
  },
  hematuria: {
    name: "Hematuria",
    tags: [
      "damu",
      "mkojo",
      "kukojoa"
    ],
    description: "Damu kwenye mkojo.",
    symptom: "hematuria"
  },
  hepatomegaly: {
    name: "Hepatomegaly",
    tags: [],
    description: "Ini kutanuka",
    symptom: "hepatomegaly"
  },
  "hyperemic-larynx": {
    name: "Hyperemic Larynx",
    tags: [],
    description: "dundumio lekundu na lililovimba",
    symptom: "hyperemic-larynx"
  },
  "hyperemic-pharynx": {
    name: "Hyperemic Pharynx",
    tags: [
      "koo-kuuma"
    ],
    description: "koromeo lililovimba na kuwa jekundu kwa upande wa nyuma ",
    symptom: "hyperemic-pharynx"
  },
  "hyperemic-tonsils": {
    name: "Hyperemic Tonsils",
    tags: [],
    description: "Tonsils nyekundu na yenye kuwasha nyuma ya koo.",
    symptom: "hyperemic-tonsils"
  },
  "hyperemic-tympanic-membrane": {
    name: "Hyperemic Tympanic Membrane",
    tags: [
      "sikio"
    ],
    description: "Mwonekano mwekundu kwenye ngozi ya ngoma ya sikio kutokana na kuongezeka kwa damu.",
    symptom: "hyperemic-tympanic-membrane"
  },
  hyperpigmentation: {
    name: "Kuongezeka kwa rangi",
    tags: [
      "ngozi",
      "vidonda-vyeusi",
      "iliyo-badilika-rangi"
    ],
    description: "Madoa meusi au madoa kwenye ngozi.",
    symptom: "hyperpigmentation"
  },
  hypopigmentation: {
    name: "Hypopigmentation",
    tags: [
      "ngozi",
      "madoa-meupe",
      "iliyo-badilika-rangi"
    ],
    description: "Madoa meupe au mabaka kwenye ngozi.",
    symptom: "hypopigmentation"
  },
  hypothermia: {
    name: "Hypothermia",
    tags: [
      "baridi",
      "joto"
    ],
    description: "Kushuka kwa kiasi kubwa na hatari kwa joto la mwili.",
    symptom: "hypothermia"
  },
  indrawing: {
    name: "kuvuta ndani",
    tags: [],
    description: "kuingia ndani kwa sehemu ya chini ya ukuta wa kifua cha  mtoto anapopumua.",
    symptom: "indrawing"
  },
  "intercostal-recession": {
    name: "Intercostal Recession",
    tags: [],
    description: "Kuvuta kwa ndani kwa kasi kwa misuli ya kifua kutokana na kupunguzwa kwa shinikizo ndani kifua.",
    symptom: "intercostal-recession"
  },
  irritability: {
    name: "Kuwashwa",
    tags: [
      "ulegevu"
    ],
    description: "Kuhisi kufadhaika.",
    symptom: "irritability"
  },
  jaundice: {
    name: "Ugonjwa wa manjano",
    tags: [
      "manjano",
      "macho",
      "ngozi"
    ],
    description: "Ngozi ya manjano inayosababishwa na kuongezeka kwa bilirubini kwenye damu.",
    symptom: "jaundice"
  },
  "joint-pain": {
    name: "maumivu ya viungo",
    tags: [],
    description: "Usumbufu pale ambapo mifupa miwili au zaidi hukutana na kuunda kiungo, waweza kusababisha ulemavu.",
    symptom: "joint-pain"
  },
  "joint-swelling": {
    name: "Kuvimba kwa jointi",
    tags: [
      "kuvimba",
      "edema",
      "kuvimba-isivyo-kawaida"
    ],
    description: "Kuvimba au kuongezeka kwa viungo kwa sababu ya kuongezeka kwa maji kujikusanya kwenye tishu zinazozunguka viungo.",
    symptom: "joint-swelling"
  },
  "kernigs-sign": {
    name: "Kernigs Sign",
    tags: [
      "ngumu",
      "mguu"
    ],
    description: "Ugumu mkubwa wa misuli ya paja ambayo husababisha kutoweza kunyoosha mguu wakati nyonga inazunguka hadi digrii 90.",
    symptom: "kernigs-sign"
  },
  "limited-range-of-motion": {
    name: "ufinyu wa mwendo",
    tags: [
      "jointi",
      "maumivu",
      "ngumu"
    ],
    description: "jointi yenye uwezo mdogo wa kusongea au kuinama.",
    symptom: "limited-range-of-motion"
  },
  malnutrition: {
    name: "Utapiamlo",
    tags: [
      "kupunguza-uzito",
      "kupunguza-uzito"
    ],
    description: "Mapungufu, ziada au kutokuwa na usawa katika ulaji wa virutubisho.",
    symptom: "malnutrition"
  },
  "mental-status": {
    name: "Hali ya Akili",
    tags: [
      "ulegevu",
      "koma"
    ],
    description: "Uwezo wa kiakili, ikiwa ni pamoja na kiwango cha fahamu, usikivu na kauli, hisia na athari.",
    symptom: "mental-status"
  },
  "mid-upper-arm-circumference": {
    name: "Mzingo wa Kati wa Mkono wa Juu",
    tags: [
      "utapiamlo",
      "uzito-mdogo"
    ],
    description: "Kipimo cha kutathmini hali ya lishe kwa kuangalia mzingo wa mkono wa juu wa kushoto.",
    symptom: "mid-upper-arm-circumference"
  },
  "muscle-tone": {
    name: "Muscle Tone",
    tags: [],
    description: "Kiasi cha mvutano (au upinzani wa misuli kusogea) kwenye misuli.",
    symptom: "muscle-tone"
  },
  "muscle-weakness": {
    name: "Udhaifu wa Misuli",
    tags: [
      "dhaifu",
      "misuli",
      "kuchoka",
      "kupooza"
    ],
    description: "Kupungua kwa nguvu katika misuli.",
    symptom: "muscle-weakness"
  },
  "nasal-congestion": {
    name: "Msongamano puani",
    tags: [
      "mafua"
    ],
    description: "Pua iliyovimba, wakati tishu za pua zimevimba kwa sababu ya  majimaji.",
    symptom: "nasal-congestion"
  },
  "nasal-discharge": {
    name: "Nasal Discharge",
    tags: [
      "mafua",
      "msongamano"
    ],
    description: "Kamasi inayotoka puani.",
    symptom: "nasal-discharge"
  },
  "nasal-polyps": {
    name: "Nasal Polyps",
    tags: [],
    description: "Ukuaji usio na maumivu kwenye utando wa pua ",
    symptom: "nasal-polyps"
  },
  "night-sweats": {
    name: "Majasho ya Usiku",
    tags: [
      "baridi"
    ],
    description: "Vipindi vinavyojirudia vya jasho kali ambalo linaweza kulowanisha nguo zako za kulalia au mashuka",
    symptom: "night-sweats"
  },
  oliguria: {
    name: "Oliguria",
    tags: [
      "mkojo",
      "kukojoa"
    ],
    description: "kupata mkojo chini ya kiwango cha kawaida ",
    symptom: "oliguria"
  },
  orthopnea: {
    name: "Orthopnea",
    tags: [
      "kupumua",
      "kupumua-kwa-shida"
    ],
    description: "Usumbufu wakati wa kupumua ukiwa umelala chini.",
    symptom: "orthopnea"
  },
  otalgia: {
    name: "Otalgia",
    tags: [
      "sikio",
      "maumivu",
      "maumivu-ya-sikio"
    ],
    description: "Maumivu ya sikio katika sikio la ndani au la nje ambayo inaweza kuiathiri uwezo wa kusikia.",
    symptom: "otalgia"
  },
  otorrhea: {
    name: " Otorrhea",
    tags: [
      "majimaji-ya-sikio",
      "kutoa",
      "majimaji"
    ],
    description: ": Majimaji kutoka sikioni.",
    symptom: "otorrhea"
  },
  pallor: {
    name: "Pallor",
    tags: [
      "ngozi-nyeupe"
    ],
    description: "weupe au kupoteza rangi kwenye kwa ngozi ",
    symptom: "pallor"
  },
  "peritonsillar-abscess": {
    name: "Peritonsillar Abscess",
    tags: [],
    description: "Mkusanyiko wa usaha katika tishu za koo.",
    symptom: "peritonsillar-abscess"
  },
  petechiae: {
    name: "Petechiae",
    tags: [
      "ngozi"
    ],
    description: "Madoa madogo ya mviringo yenye rangi ya hudhurungi kutokana na kutokwa na damu chini ya ngozi .",
    symptom: "petechiae"
  },
  photosensitivity: {
    name: "Photosensitivity",
    tags: [
      "upele",
      "nyekundu",
      "jua"
    ],
    description: "Milipuko ya kuwashwa au maeneo yenye uwekundu na kuvimba kwa Ngozi iliyo wazi. kwenye jua",
    symptom: "photosensitivity"
  },
  polyuria: {
    name: "Polyuria",
    tags: [],
    description: "Haja ya kukojoa mara nyingi zaidi kuliko kawaida.",
    symptom: "polyuria"
  },
  "poor-feeding": {
    name: "ulaji duni",
    tags: [
      "uchovu"
    ],
    description: "Nia kidogo katika kula au urahisi wa kupata uchovu wakati wa kula",
    symptom: "poor-feeding"
  },
  pruritis: {
    name: "Pruritis",
    tags: [
      "upele",
      "kuwasha",
      "kuwashwa",
      "kidonda"
    ],
    description: "Pia inaitwa ngozi inayowasha, ni hisia zisizofurahisha, zenye kuchochea na humfanya mtu kutaka kujikuna.",
    symptom: "pruritis"
  },
  "pulling-on-ear": {
    name: "Kuvuta Sikio",
    tags: [
      "sikio",
      "maumivu",
      "maumivu-ya-sikio",
      "otalgia"
    ],
    description: "Kugusa au kuvuta sikio, hasa kwa watoto wachanga.",
    symptom: "pulling-on-ear"
  },
  "pulse-rate": {
    name: "kiwango cha mapigo ya moyo",
    tags: [
      "kiwango-cha-moyo"
    ],
    description: "Idadi ya mara mapigo ya moyo wako katika dakika moja.",
    symptom: "pulse-rate"
  },
  purpura: {
    name: "Purpura",
    tags: [
      "ngozi"
    ],
    description: "Upele wa madoa ya zambarau, pia huitwa madoa ya damu.",
    symptom: "purpura"
  },
  "reduced-appetite": {
    name: "Kupunguza hamu ya kula",
    tags: [
      "njaa"
    ],
    description: "Kupunguza hamu ya kula.",
    symptom: "reduced-appetite"
  },
  rhinorrhea: {
    name: "Rhinorrhea",
    tags: [
      "mafua",
      "pua",
      "majimaji-kutoka-pua"
    ],
    description: "kukauka kwa maji na kamasi nene, kutoka kwenye pua na njia za pua.",
    symptom: "rhinorrhea"
  },
  seizures: {
    name: "Mishtuko ya moyo",
    tags: [
      "kutetemeka",
      "kupoteza-udhibiti-wa-kimwili-au-wa-kihisia"
    ],
    description: "usumbufu wa ghafla wa umeme usiodhibitiwa katika ubongo unaosababisha mabadiliko katika tabia, miondoko au hisia, na katika viwango vya fahamu.",
    symptom: "seizures"
  },
  "sinus-tenderness": {
    name: "Sinus Tenderness",
    tags: [],
    description: "maumivu ya uso.",
    symptom: "sinus-tenderness"
  },
  "skin-desquamation": {
    name: "Uharibifu wa ngozi",
    tags: [
      "ngozi",
      "kuchubua"
    ],
    description: "Uharibifu usiotarajiwa na upotezaji wa tabaka la juu la ngozi.",
    symptom: "skin-desquamation"
  },
  "skin-lesions": {
    name: "Vidonda vya ngozi",
    tags: [
      "upele",
      "nyekundu",
      "kidonda",
      "rangi"
    ],
    description: "Uvimbe usio wa kawaida, uvimbe, kidonda, kidonda au eneo la ngozi lenye rangi ",
    symptom: "skin-lesions"
  },
  "skin-rash": {
    name: "Upele wa ngozi",
    tags: [
      "upele",
      "ngozi",
      "nyekundu"
    ],
    description: "Mlipuko wa muda wa mabaka mekundu, matuta, magamba au kuwasha kwenye ngozi, ikiwezekana na malengelenge au makovu",
    symptom: "skin-rash"
  },
  "skin-turgor": {
    name: "Skin Turgor",
    tags: [],
    description: "uvutikaji wa ngozi ya mtu.",
    symptom: "skin-turgor"
  },
  sneezing: {
    name: "Kupiga chafya",
    tags: [],
    description: "Utoaji hewa kwa nguvu, bila hiari.",
    symptom: "sneezing"
  },
  snoring: {
    name: "Kukoroma",
    tags: [
      "kupumua"
    ],
    description: "Sauti kali kutoka puani au mdomoni ambayo hutokea wakati kupumua kunazuiliwa wakati wa kulala.",
    symptom: "snoring"
  },
  "sore-throat": {
    name: "Koo Kuuma",
    tags: [],
    description: "Maumivu au kuwashwa kwenye koo ambayo inaweza kutokea au isitokee wakati wa kumeza",
    symptom: "sore-throat"
  },
  splenomegaly: {
    name: " Splenomegaly",
    tags: [],
    description: "bandama kubwa",
    symptom: "splenomegaly"
  },
  stridor: {
    name: "Stridor",
    tags: [
      "kikohozi",
      "kupumua"
    ],
    description: "Sauti isiyo ya kawaida, ya juu, ya kupumua ",
    symptom: "stridor"
  },
  stunting: {
    name: "Kudumaa",
    tags: [
      "fupi",
      "ukuaji"
    ],
    description: "Ukuaji na maendeleo duni, kawaida huonekana kwa watoto.",
    symptom: "stunting"
  },
  "sunken-eyes": {
    name: "Macho Yanayozama",
    tags: [],
    description: "Ngozi chini ya macho inaonekana nyeusi, imezama ndani na tupu.",
    symptom: "sunken-eyes"
  },
  syncope: {
    name: "Syncope",
    tags: [
      "kutetemeka",
      "kupoteza-udhibiti-wa-kimwili-au-wa-kihisia"
    ],
    description: "Kuzirai au kupoteza fahamu kwa muda.",
    symptom: "syncope"
  },
  tachycardia: {
    name: "Tachycardia",
    tags: [
      "kiwango-cha-moyo"
    ],
    description: "Mapigo ya moyo yanayodunda haraka au mapigo ya moyo ya haraka.",
    symptom: "tachycardia"
  },
  tachypnoea: {
    name: "Tachypnoea",
    tags: [
      "kupumua"
    ],
    description: "Kupumua kwa kasi isiyo ya kawaida.",
    symptom: "tachypnoea"
  },
  "teeth-malocclusion": {
    name: "mpangilio usio kamili wa meno",
    tags: [],
    description: "Meno yasiyopangwa vizuri au mpangilio usio wa kawaida wa meno ya juu na ya chini.",
    symptom: "teeth-malocclusion"
  },
  "tet-spell": {
    name: "Tet Spell",
    tags: [
      "midimo-ya-bluu",
      "ngozi-ya-bluu"
    ],
    description: "Ngozi, kucha na midomo ya bluu kwa mtoto mchanga baada ya kulia au kulishwa chakula hii inasababishwa na kushuka kwa kasi kwa kiasi cha oksijeni katika damu.",
    symptom: "tet-spell"
  },
  underweight: {
    name: "uzito mdogo",
    tags: [],
    description: "Uzito unaochukuliwa kuwa mdogo sana kwa afya njema.",
    symptom: "underweight"
  },
  vomiting: {
    name: "kutapika",
    tags: [
      "tapika",
      "chakual",
      "kichefuchefu"
    ],
    description: "Kutoa nje kwa nguvu yaliyomo tumboni kupitia kinywa.",
    symptom: "vomiting"
  },
  wasting: {
    name: "Wasting",
    tags: [],
    description: "Uzito wa chini kwa uwiano wa urefu.",
    symptom: "wasting"
  },
  "weight-faltering": {
    name: "Uzito Kupungua",
    tags: [
      "uzito-duni",
      "uzito",
      "uzito-mdogo",
      "kulisha",
      "kula"
    ],
    description: "Kuongezeka kwa uzito ni polepole au kuchelewa, hasa kwa watoto wachanga na watoto.",
    symptom: "weight-faltering"
  },
  "weight-gain": {
    name: "kuongezeka uzito",
    tags: [],
    description: "Kilo zilizoongezwa  mara nyingi hutokana na kula kupita kiasi au ukosefu wa mazoezi ya mwili.",
    symptom: "weight-gain"
  },
  "weight-loss": {
    name: "kupungua uzito",
    tags: [],
    description: "Kupungua kwa uzito wa mwili.",
    symptom: "weight-loss"
  },
  wheezing: {
    name: "Kupumua",
    tags: [
      "kikohozi",
      "kupiga-miluzi"
    ],
    description: "Sauti ya juu ya mluzi inayosikika wakati wa kupumua.",
    symptom: "wheezing"
  }
};
var symptoms_translations_default = {
  en: en2,
  sw: sw2
};

// src/_utils.ts
function build(c) {
  return Object.entries(c).map((c2) => {
    const [id, name] = c2;
    return { id, name };
  }).sort((a, b) => a.name.localeCompare(b.name));
}
function buildObject(c) {
  return Object.entries(c).map((c2) => {
    const [id, obj] = c2;
    return __spreadProps(__spreadValues({}, obj), { id });
  }).sort((a, b) => a.id.localeCompare(b.id));
}

// src/base.ts
var symptoms = {
  symptom: {
    fromId: (id) => symptoms_base_default[id]
  },
  ids: () => Object.keys(symptoms_base_default).sort((a, b) => a.localeCompare(b)),
  values: () => buildObject(symptoms_base_default)
};
var conditions = {
  name: {
    fromId: (id) => conditions_default[id]
  },
  ids: () => Object.keys(conditions_default).sort((a, b) => a.localeCompare(b)),
  values: () => build(conditions_default)
};
var donparMap = {
  translate: (language) => {
    return donpar_map_default[language];
  }
};
var symptomsLocale = {
  translate: (language) => {
    return symptoms_translations_default[language];
  }
};
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  conditions,
  donparMap,
  symptoms,
  symptomsLocale
});
