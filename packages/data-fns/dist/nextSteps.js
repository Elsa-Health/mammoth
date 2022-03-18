var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
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
var __objRest = (source, exclude) => {
  var target = {};
  for (var prop in source)
    if (__hasOwnProp.call(source, prop) && exclude.indexOf(prop) < 0)
      target[prop] = source[prop];
  if (source != null && __getOwnPropSymbols)
    for (var prop of __getOwnPropSymbols(source)) {
      if (exclude.indexOf(prop) < 0 && __propIsEnum.call(source, prop))
        target[prop] = source[prop];
    }
  return target;
};
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

// src/nextSteps.ts
var nextSteps_exports = {};
__export(nextSteps_exports, {
  basic: () => basic,
  extended: () => extended
});
module.exports = __toCommonJS(nextSteps_exports);

// data/core/next-steps-basic.json
var severe_malaria = {
  "triage-level": "Immediately",
  "refer-and-triage-level": "Refer the patient to a health facility immediately.",
  refer: true,
  medications: [
    {
      id: "paracetamol-every-4-6-hours-until-symptoms-disappear",
      text: "Paracetamol, every 4-6 hours until symptoms disappear."
    }
  ],
  "test-recommendations": [
    {
      id: "mrdt",
      text: "MRDT"
    }
  ],
  "other-recommendations": "Recommended that patients use insecticide-treated nets (ITNs) ."
};
var malaria = {
  "triage-level": "Home based care",
  "refer-and-triage-level": "The patient can recieve home based care. They should seek medical attention if they experience a worsening of their symptoms.",
  refer: false,
  medications: [
    {
      id: "artemether-lumefantrine-alu-first-dose-2-mg-kg-artemether-and-12-mg-kg-lumefantrine-for-uncomplicated-malaria",
      text: "Artemether-Lumefantrine (ALU), first dose, 2mg/kg Artemether and 12mg/kg Lumefantrine, for uncomplicated malaria.   "
    },
    {
      id: "diazepam-0-5-mg-kg-delivered-rectally",
      text: "Diazepam, 0.5mg/kg, delivered rectally"
    }
  ],
  "test-recommendations": [
    {
      id: "mrdt",
      text: "MRDT"
    }
  ],
  "other-recommendations": "Begin patient on ALU/Quinine and document with patient. Give diazepam if convulsing and document."
};
var pneumonia = {
  "triage-level": "Immediately",
  "refer-and-triage-level": "Refer the patient to a health facility immediately.",
  refer: true,
  medications: [
    {
      id: "amoxycillin-capsule-250-mg-for-over-10-years-given-250-500-mg-every-8-hours-for-5-days",
      text: "Amoxycillin capsule, 250mg. For over 10 years, given 250-500mg every 8 hours for 5 days.  "
    },
    {
      id: "cough-suppressants-as-needed",
      text: "Cough suppressants, as needed."
    }
  ],
  "test-recommendations": [
    {
      id: "chest-x-ray-cxr",
      text: "Chest X-Ray (CXR)"
    },
    {
      id: "full-blood-picture-fbp",
      text: "Full Blood Picture (FBP)"
    }
  ],
  "other-recommendations": "If the patient is a smoker, recommend that they stop smoking."
};
var tb = {
  "triage-level": "Immediately",
  "refer-and-triage-level": "Refer the patient to a health facility immediately.",
  refer: true,
  medications: [],
  "test-recommendations": [
    {
      id: "chest-x-ray-cxr",
      text: "Chest X-Ray (CXR)"
    },
    {
      id: "full-blood-picture-fbp",
      text: "Full Blood Picture (FBP)"
    },
    {
      id: "gene-xpert",
      text: "GeneXpert"
    },
    {
      id: "sputum-culture",
      text: "Sputum Culture"
    }
  ]
};
var coryza = {
  "triage-level": "Home based care",
  "refer-and-triage-level": "The patient can recieve home based care. They should seek medical attention if they experience difficulty breathing or excessive coughing.",
  refer: false,
  medications: [
    {
      id: "antihistamines-if-available",
      text: "Antihistamines (If available)"
    },
    {
      id: "paracetamol-syrup-for-children-10-mg-kg-as-needed",
      text: "Paracetamol (syrup for children), 10mg/kg, as needed"
    }
  ],
  "test-recommendations": [],
  "other-recommendations": "Recommend that the patient self-isolate and treats symptoms. Patient should rest and drink plenty of fluids."
};
var sinusitis = {
  "triage-level": "Home based care",
  "refer-and-triage-level": "The patient can recieve home based care. They should seek medical attention if they experience severe pain, difficulty breathing, or excessive and recurrent coughing.",
  refer: false,
  medications: [
    {
      id: "erythromycin",
      text: "Erythromycin"
    },
    {
      id: "nasal-decongestants",
      text: "Nasal Decongestants "
    },
    {
      id: "paracetamol-10-mg-kg-as-needed",
      text: "Paracetamol, 10mg/kg, as needed"
    }
  ],
  "test-recommendations": [
    {
      id: "full-blood-picture-fbp",
      text: "Full Blood Picture (FBP)"
    }
  ],
  "other-recommendations": "Recommend the patient uses a warm compresses to ease pain in the nose and sinuses."
};
var bronchiolitis = {
  "triage-level": "Home based care",
  "refer-and-triage-level": "The patient can recieve home based care. They should seek medical attention if they experience a worsening of their symptoms.",
  refer: false,
  medications: [
    {
      id: "nonsteroidal-anti-inflammatory-drug",
      text: "Nonsteroidal anti-inflammatory drug"
    },
    {
      id: "nsai-ds",
      text: "(NSAIDs)"
    },
    {
      id: "bronchodilator",
      text: "Bronchodilator"
    }
  ],
  "test-recommendations": [],
  "other-recommendations": "It is not recommended that the patient takes antibiotics, as this is not a bacterial infection."
};
var bronchitis = {
  "triage-level": "Home based care",
  "refer-and-triage-level": "The patient can recieve home based care. They should seek medical attention if they experience a worsening of their symptoms.",
  refer: false,
  medications: [
    {
      id: "nonsteroidal-anti-inflammatory-drug",
      text: "Nonsteroidal anti-inflammatory drug"
    },
    {
      id: "nsai-ds",
      text: "(NSAIDs)"
    }
  ],
  "test-recommendations": [
    {
      id: "chest-x-ray-cxr",
      text: "Chest X-Ray (CXR)"
    }
  ],
  "other-recommendations": "It is not recommended that the patient takes antibiotics, as this is not a bacterial infection."
};
var gastritis = {
  "triage-level": "2 days",
  "refer-and-triage-level": "Refer the patient to a health facility. They should seek care within 2 days if symptoms worsen.",
  refer: false,
  medications: [
    {
      id: "oral-rehydration-salts",
      text: "Oral rehydration salts"
    }
  ],
  "test-recommendations": [
    {
      id: "full-blood-picture-fbp",
      text: "Full Blood Picture (FBP) "
    },
    {
      id: "h-pylori-stool-test",
      text: "H Pylori stool test"
    }
  ],
  "other-recommendations": "Recommend that the patient avoid acidic foods or foods that aggravate the pain. Patient should drink a lot of fluids."
};
var otitis_externa = {
  "triage-level": "Home based care",
  "refer-and-triage-level": "The patient can recieve home based care.",
  refer: false,
  medications: [
    {
      id: "ear-drops",
      text: "Ear drops"
    },
    {
      id: "paracetamol-as-needed",
      text: "Paracetamol, as needed."
    }
  ],
  "test-recommendations": [],
  "other-recommendations": "Recommend that the patient stays away from swimming or putting water in their ears."
};
var supprative_otitis_media = {
  "triage-level": "2 days",
  "refer-and-triage-level": "Refer the patient to a health facility. They should seek care within 2 days.",
  refer: true,
  medications: [
    {
      id: "antibiotic-ear-drops",
      text: "Antibiotic ear drops"
    },
    {
      id: "paracetamol-or-ibuprofen-as-needed",
      text: "Paracetamol or ibuprofen, as needed."
    }
  ],
  "test-recommendations": [],
  "other-recommendations": "Recommend that the patient observes their symptoms and keeps their ear canal clean. Complications can occur such as loss of hearing."
};
var otitis_media = {
  "triage-level": "Home based care",
  "refer-and-triage-level": "The patient can recieve home based care. They should seek immediate care if If their symptoms get worse, do not resolve, or if there is tympanic perforation.",
  refer: false,
  medications: [
    {
      id: "amoxicillin-90-mg-kg-max-3-g-a-day-divided-into-3-doses-if-2-years-take-for-2-weeks-if-2-years-take-for-7-days",
      text: "Amoxicillin, 90mg/kg (max 3g a day) divided into 3 doses. If <2 years, take for 2 weeks. If >2 years, take for 7 days. "
    },
    {
      id: "ibuprofen",
      text: "Ibuprofen"
    }
  ],
  "test-recommendations": [],
  "other-recommendations": "Recommend that the patient stays away from swimming or putting water in their ears."
};
var trichuriasis = {
  "triage-level": "Home based care",
  "refer-and-triage-level": "The patient can recieve home based care. They should seek medical attention if they experience a worsening of their symptoms.",
  refer: false,
  medications: [
    {
      id: "albendazole-400-mg-one-time-per-day-for-3-days",
      text: "Albendazole, 400mg, one time per day for 3 days"
    },
    {
      id: "deworming-tablets",
      text: "Deworming tablets"
    }
  ],
  "test-recommendations": [],
  "other-recommendations": "Recommend that patient practices good hygeine and regularly washes their hands. If the patient is a child, provide counseling on deworming tablets."
};
var conjunctivitis = {
  "triage-level": "Home based care",
  "refer-and-triage-level": "The patient can recieve home based care. They should seek medical attention if their symptoms do not resolve.",
  refer: false,
  medications: [
    {
      id: "gentamycin-eyedrops",
      text: "Gentamycin Eyedrops"
    }
  ],
  "test-recommendations": [],
  "other-recommendations": "Recommend that the patient practices good hygeine and regularly washes their hands."
};
var uti = {
  "triage-level": "Home based care",
  "refer-and-triage-level": "The patient can recieve home based care. They should seek medical attention if they experience a worsening of their symptoms or if their symptoms do not resolve.",
  refer: false,
  medications: [
    {
      id: "amoxicillin",
      text: "Amoxicillin"
    }
  ],
  "test-recommendations": [
    {
      id: "full-blood-picture-fbp",
      text: "Full Blood Picture (FBP)"
    },
    {
      id: "urinalysis",
      text: "Urinalysis"
    }
  ],
  "other-recommendations": "Provide counseling to patient on prevention menthods and recommend a follow-up after 5 months at a higher facility."
};
var dysentry = {
  "triage-level": "Immediately",
  "refer-and-triage-level": "Refer the patient to a health facility immediately.",
  refer: true,
  medications: [
    {
      id: "begin-dehydration-treatment",
      text: "Begin dehydration treatment"
    }
  ],
  "test-recommendations": [
    {
      id: "stool-analysis",
      text: "Stool Analysis"
    }
  ]
};
var malnutrition = {
  "triage-level": "Immediately",
  "refer-and-triage-level": "Refer the patient to a health facility immediately.",
  refer: true,
  medications: [
    {
      id: "oral-rehydration-salts",
      text: "Oral rehydration salts"
    }
  ],
  "test-recommendations": [
    {
      id: "chest-x-ray-cxr",
      text: "Chest X-Ray (CXR)"
    },
    {
      id: "full-blood-picture-fbp",
      text: "Full Blood Picture (FBP)"
    },
    {
      id: "hiv-rapid-test",
      text: "HIV Rapid Test"
    },
    {
      id: "mrdt",
      text: "MRDT"
    },
    {
      id: "electrolytes-test",
      text: "Electrolytes Test"
    }
  ]
};
var ascariasis_changed_from_helminthiasis = {
  "triage-level": "Home based care",
  "refer-and-triage-level": "The patient can recieve home based care. They should seek medical attention if they experience severe abdominal pain, if the patient is underweight, or if there are any emergency signs.",
  refer: false,
  medications: [
    {
      id: "albendazole-400-mg-one-time-per-day-for-3-days",
      text: "Albendazole, 400mg, one time per day for 3 days"
    }
  ],
  "test-recommendations": [],
  "other-recommendations": "Recommend that the patient practices good hygeine and regularly washes their hands."
};
var asthma = {
  "triage-level": "Immediately",
  "refer-and-triage-level": "Refer the patient to a health facility immediately.",
  refer: true,
  medications: [
    {
      id: "inhaled-corticosteroids-if-available",
      text: "Inhaled Corticosteroids (if available)"
    }
  ],
  "test-recommendations": [
    {
      id: "chest-x-ray-cxr",
      text: "Chest X-Ray (CXR)"
    },
    {
      id: "full-blood-picture-fbp",
      text: "Full Blood Picture (FBP)"
    }
  ],
  "other-recommendations": "If the patient smokes, recommend that they stop smoking. Recommend that the patient avoids any triggers, if they are known."
};
var influenza = {
  "triage-level": "Home based care",
  "refer-and-triage-level": "The patient can recieve home based care. They should seek medical attention if they experience difficulty breathing or excessive coughing.",
  refer: false,
  medications: [
    {
      id: "paracetamol",
      text: "Paracetamol"
    },
    {
      id: "nasal-decongestants",
      text: "Nasal decongestants"
    }
  ],
  "test-recommendations": [
    {
      id: "full-blood-picture-fbp",
      text: "Full Blood Picture (FBP)"
    }
  ],
  "other-recommendations": "Recommend that the patient self-isolate and treats symptoms. Patient should rest and drink plenty of fluids."
};
var tonsilitis = {
  "triage-level": "Home based care",
  "refer-and-triage-level": "The patient can recieve home based care. They should seek medical attention if they experience difficulty breathing, if they cannot eat, if their symptoms come back, or if this is the second time with this condition.",
  refer: false,
  medications: [
    {
      id: "ampiclox",
      text: "Ampiclox"
    },
    {
      id: "paracetamol",
      text: "Paracetamol"
    }
  ],
  "test-recommendations": [
    {
      id: "full-blood-picture-fbp",
      text: "Full Blood Picture (FBP)"
    }
  ],
  "other-recommendations": "Recommend that the patient rests at home."
};
var laryngitis = {
  "triage-level": "24 hours",
  "refer-and-triage-level": "Refer the patient to a health facility. They should seek care within 24 hours.",
  refer: true,
  medications: [],
  "test-recommendations": [],
  "other-recommendations": "Recommend that the patient rests their voice."
};
var covid_19 = {
  "triage-level": "Home based care",
  "refer-and-triage-level": "The patient can recieve home based care. They should seek medical attention if they experience difficulty breathing, chest pain, or excessive coughing.",
  refer: false,
  medications: [
    {
      id: "paracetamol",
      text: "Paracetamol"
    },
    {
      id: "nasal-decongestants",
      text: "Nasal decongestants"
    },
    {
      id: "vitamin-c",
      text: "Vitamin C"
    },
    {
      id: "vitamin-d",
      text: "Vitamin D"
    },
    {
      id: "zinc",
      text: "Zinc"
    },
    {
      id: "amoxyclav",
      text: "Amoxyclav"
    }
  ],
  "test-recommendations": [],
  "other-recommendations": "Recommend that the patient self-isolate and treats symptoms. Patient should rest and drink plenty of fluids."
};
var copd = {
  "triage-level": "2 weeks",
  "refer-and-triage-level": "Refer the patient to a health facility. They should seek care within 2 weeks.",
  refer: true,
  medications: [],
  "test-recommendations": [
    {
      id: "chest-x-ray-cxr",
      text: "Chest X-Ray (CXR)"
    }
  ],
  "other-recommendations": "If the patient smokes, recommend that they stop smoking. Provide counseling to the patient on eating nutritious meals."
};
var syphillis = {
  "triage-level": "24 hours",
  "refer-and-triage-level": "Refer the patient to a health facility. They should seek care within 24 hours.",
  refer: true,
  medications: [
    {
      id: "doxycycline-or-penicillin-for-early-infection",
      text: "Doxycycline or Penicillin (for early infection)"
    }
  ],
  "test-recommendations": [],
  "other-recommendations": "Provide counseling to the patient on prevention methods, infection, and continuation of treatment."
};
var gonorrhea = {
  "triage-level": "2 days",
  "refer-and-triage-level": "Refer the patient to a health facility. They should seek care within 2 days.",
  refer: true,
  medications: [],
  "test-recommendations": [],
  "other-recommendations": "Provide counseling to the patient on prevention methods, infection, and continuation of treatment."
};
var hiv_aids = {
  "triage-level": "Immediately",
  "refer-and-triage-level": "Refer the patient to a health facility immediately.",
  refer: true,
  medications: [],
  "test-recommendations": [
    {
      id: "hiv-rapid-test",
      text: "HIV Rapid test"
    }
  ],
  "other-recommendations": "Provide counseling to the patient on prevention methods, infection, and continuation of treatment."
};
var bacterial_vaginosis = {
  "triage-level": "Home based care",
  "refer-and-triage-level": "The patient can recieve home based care. They should seek medical attention if they experience these symptoms frequently or if their condition is recurrent.",
  refer: false,
  medications: [
    {
      id: "metronidazole-500-mg-twice-daily-for-7-days",
      text: "Metronidazole, 500mg, twice daily for 7 days"
    }
  ],
  "test-recommendations": []
};
var vulvovaginal_candidiasis = {
  "triage-level": "Home based care",
  "refer-and-triage-level": "The patient can recieve home based care. They should seek medical attention if they experience these symptoms frequently or if their condition is recurrent.",
  refer: false,
  medications: [
    {
      id: "fluconazole-150-mg-single-dose",
      text: "Fluconazole, 150mg, single dose"
    }
  ],
  "test-recommendations": [],
  "other-recommendations": "Provide counseling to the patient on prevention practices and encourage good hygeine."
};
var trichomoniasis = {
  "triage-level": "Home based care",
  "refer-and-triage-level": "The patient can recieve home based care.",
  refer: false,
  medications: [
    {
      id: "metronidazole-500-mg-twice-daily-for-7-days",
      text: "Metronidazole, 500mg, twice daily for 7 days"
    }
  ],
  "test-recommendations": []
};
var acute_watery_diarrhoea = {
  "triage-level": "Home based care",
  "refer-and-triage-level": "The patient can recieve home based care. They should seek medical attention if they are severely dehydrated or if their symptoms do not resolve.",
  refer: false,
  medications: [
    {
      id: "oral-rehydration-salts",
      text: "Oral Rehydration Salts"
    }
  ],
  "test-recommendations": [
    {
      id: "stool-analysis",
      text: "Stool analysis"
    }
  ],
  "other-recommendations": "Recommend that the patient rests at home."
};
var chlamydia = {
  "triage-level": "2 days",
  "refer-and-triage-level": "Refer the patient to a health facility. They should seek care within 2 days.",
  refer: true,
  medications: [
    {
      id: "azithromycin-1-g-single-dose",
      text: "Azithromycin, 1g, single dose"
    }
  ],
  "test-recommendations": [],
  "other-recommendations": "Provide counseling to the patient on prevention methods, infection, and continuation of treatment."
};
var g_herpes = {
  "triage-level": "Immediately",
  "refer-and-triage-level": "Refer the patient to a health facility immediately.",
  refer: true,
  medications: [],
  "test-recommendations": []
};
var pelvic_inflammatory_disease = {
  "triage-level": "Immediately",
  "refer-and-triage-level": "Refer the patient to a health facility immediately.",
  refer: true,
  medications: [],
  "test-recommendations": [
    {
      id: "pelvic-exam",
      text: "Pelvic Exam"
    },
    {
      id: "full-blood-picture-fbp",
      text: "Full Blood Picture (FBP) "
    },
    {
      id: "urinalysis",
      text: "Urinalysis"
    },
    {
      id: "ultrasound-of-pelvis",
      text: "Ultrasound of Pelvis"
    }
  ],
  "other-recommendations": "This condition can result in severe complications. Recommend that the patient seeks immediate care."
};
var genital_warts = {
  "triage-level": "Home based care",
  "refer-and-triage-level": "The patient can recieve home based care. They should seek medical attention if they experience a worsening of their symptoms.",
  refer: false,
  medications: [
    {
      id: "imiquimod-or-trichloroacetic-acid",
      text: "Imiquimod or Trichloroacetic Acid"
    },
    {
      id: "other-topical-cream",
      text: "Other topical cream"
    }
  ],
  "test-recommendations": [],
  "other-recommendations": "If the warts continue to return or cause severe pain, recommend that the patient goes to a health facility for removal. Recommend that the patient gets an HPV vaccine if they have not yet done so."
};
var hpv = {
  "triage-level": "Immediately",
  "refer-and-triage-level": "Refer the patient to a health facility immediately.",
  refer: true,
  medications: [],
  "test-recommendations": [
    {
      id: "hpv-screening",
      text: "HPV Screening"
    }
  ]
};
var anemia = {
  "triage-level": "Home based care",
  "refer-and-triage-level": "The patient can recieve home based care.",
  refer: false,
  medications: [
    {
      id: "iron-supplements-ferrous-sulfate-325-3-tablets-per-day-taken-every-alternate-day-for-3-months",
      text: "Iron supplements (Ferrous Sulfate 325), 3 tablets per day, taken every alternate day for 3 months"
    }
  ],
  "test-recommendations": [
    {
      id: "full-blood-picture-fbp",
      text: "Full Blood Picture (FBP)"
    }
  ]
};
var oral_thrush = {
  "triage-level": "2 days",
  "refer-and-triage-level": "Refer the patient to a health facility. They should seek care within 2 days.",
  refer: true,
  medications: [
    {
      id: "nystatin-oral-gel-applies-three-times-a-day",
      text: "Nystatin oral gel, applies three times a day"
    }
  ],
  "test-recommendations": []
};
var typhoid = {
  "triage-level": "Home based care",
  "refer-and-triage-level": "The patient can recieve home based care. They should seek medical attention if their symptoms last more than 3-5 days or if there are any emergency signs.",
  refer: false,
  medications: [
    {
      id: "ciprofloxacin-adults-500-mg-twice-daily-for-7-days-children-30-mg-kg-divided-in-two-doses-a-day-for-7-days",
      text: "Ciprofloxacin, (Adults) 500mg, twice daily for 7 days; (Children) 30mg/kg divided in two doses a day for 7 days"
    },
    {
      id: "oral-rehydration-salts-or-fluids-if-dehydrated",
      text: "Oral Rehydration Salts or Fluids (if dehydrated)"
    }
  ],
  "test-recommendations": [],
  "other-recommendations": "Provide counseling to the patient on prevention practies and encourage them to practice good hygeine."
};
var cholera = {
  "triage-level": "Home based care",
  "refer-and-triage-level": "The patient can recieve home based care. They should seek medical attention if their symptoms last more than 3 days or if there are any emergency signs.",
  refer: false,
  medications: [
    {
      id: "azithromycin-200-mg-kg-single-dose",
      text: "Azithromycin, 200mg/kg, single dose"
    },
    {
      id: "oral-rehydration-salts-or-fluids-if-dehydrated",
      text: "Oral Rehydration Salts or Fluids (if dehydrated)"
    }
  ],
  "test-recommendations": [],
  "other-recommendations": "Provide counseling to the patient on prevention practies and encourage them to practice good hygeine."
};
var meningitis = {
  "triage-level": "Immediately",
  "refer-and-triage-level": "Refer the patient to a health facility immediately.",
  refer: true,
  medications: [],
  "test-recommendations": [
    {
      id: "full-blood-picture-fbp",
      text: "Full Blood Picture (FBP)"
    },
    {
      id: "spinal-fluid-tap",
      text: "Spinal Fluid Tap"
    }
  ]
};
var epilepsy = {
  "triage-level": "Immediately",
  "refer-and-triage-level": "Refer the patient to a health facility immediately.",
  refer: true,
  medications: [],
  "test-recommendations": [],
  "other-recommendations": "Provide epilepsy first aid to the patient."
};
var dehydration = {
  "triage-level": "Home based care",
  "refer-and-triage-level": "The patient can recieve home based care.",
  refer: false,
  medications: [
    {
      id: "oral-rehydration-salts-for-2-years-50-100-ml-after-each-loose-stool-for-2-years-100-200-ml-after-each-loose-stool-alternatively-give-ors-every-4-hours",
      text: "Oral Rehydration Salts, for <2 years, 50-100ml after each loose stool. For >2 years, 100-200ml after each loose stool. Alternatively, give ORS every 4 hours. "
    },
    {
      id: "fluids",
      text: "Fluids"
    },
    {
      id: "zinc-supplements-children-20-mg-per-day-for-14-days-10-mg-per-day-if-less-than-2-years",
      text: "Zinc supplements (children), 20mg per day for 14 days (10mg per day if less than 2 years)"
    }
  ],
  "test-recommendations": [],
  "other-recommendations": "If the patient's symptoms are severe, recommend that they get treated at the hospital. If the child is breastfeeding, continue breastfeeding."
};
var htn = {
  "triage-level": "Immediately",
  "refer-and-triage-level": "Refer the patient to a health facility immediately.",
  refer: true,
  medications: [],
  "test-recommendations": [
    {
      id: "blood-pressure",
      text: "Blood Pressure"
    }
  ]
};
var scabies = {
  "triage-level": "Immediately",
  "refer-and-triage-level": "Refer the patient to a health facility immediately.",
  refer: true,
  medications: [
    {
      id: "scaboma",
      text: "Scaboma"
    }
  ],
  "test-recommendations": []
};
var gastroenteritis = {
  "triage-level": "Home based care",
  "refer-and-triage-level": "The patient can recieve home based care. They should seek medical attention if they experience excessive pain, excessive vomitting or diarrhoea, if there are any emergency signs, or if the patient is pregnant",
  refer: false,
  medications: [
    {
      id: "oral-rehydration-salts-or-fluids-if-dehydrated",
      text: "Oral Rehydration Salts or Fluids (if dehydrated)"
    }
  ],
  "test-recommendations": [
    {
      id: "full-blood-picture-fbp",
      text: "Full Blood Picture (FBP)"
    }
  ],
  "other-recommendations": "Recommend that the patient rests and avoids eating milk-based foods."
};
var heat_rash = {
  "triage-level": "Home based care",
  "refer-and-triage-level": "The patient can recieve home based care.",
  refer: false,
  medications: [
    {
      id: "topical-corticosteroid-cream-if-severe-apply-2-3-times-a-day-on-the-affected-areas",
      text: "Topical Corticosteroid Cream (if severe), apply 2-3 times a day on the affected areas"
    }
  ],
  "test-recommendations": [],
  "other-recommendations": "Recommend that the patient wear cool cotton clothing and that they ventilate their room."
};
var stomatitis = {
  "triage-level": "2 days",
  "refer-and-triage-level": "Refer the patient to a health facility. They should seek care within 2 days.",
  refer: true,
  medications: [],
  "test-recommendations": [
    {
      id: "full-blood-picture-fbp",
      text: "Full Blood Picture (FBP)"
    }
  ]
};
var bacteremia = {
  "triage-level": "Immediately",
  "refer-and-triage-level": "Refer the patient to a health facility immediately.",
  refer: true,
  medications: [],
  "test-recommendations": [
    {
      id: "full-blood-picture-fbp",
      text: "Full Blood Picture (FBP)"
    },
    {
      id: "blood-culture",
      text: "Blood Culture"
    }
  ]
};
var cephalohematoma = {
  "triage-level": "Home based care",
  "refer-and-triage-level": "The patient can recieve home based care.",
  refer: false,
  medications: [],
  "test-recommendations": [],
  "other-recommendations": "Provide counseling that the condition will likely go away on it's own. Recommend that the patient seeks medical care if the symptoms do not resolve."
};
var tinea_corporis = {
  "triage-level": "Home based care",
  "refer-and-triage-level": "The patient can recieve home based care.",
  refer: false,
  medications: [
    {
      id: "fluconzaole-for-adults-150-mg-once-a-week-for-4-weeks-for-children-7-mg-kg-once-a-week-for-4-weeks",
      text: "Fluconzaole, for adults: 150mg once a week for 4 weeks. For children: 7mg/kg once a week for 4 weeks"
    }
  ],
  "test-recommendations": []
};
var bact_skin_infection_impetigo = {
  "triage-level": "Immediately",
  "refer-and-triage-level": "Refer the patient to a health facility immediately.",
  refer: true,
  medications: [],
  "test-recommendations": [
    {
      id: "full-blood-picture-fbp",
      text: "Full Blood Picture (FBP)"
    }
  ]
};
var umb_cord_sepsis = {
  "triage-level": "Immediately",
  "refer-and-triage-level": "Refer the patient to a health facility immediately.",
  refer: true,
  medications: [],
  "test-recommendations": [
    {
      id: "full-blood-picture-fbp",
      text: "Full Blood Picture (FBP)"
    },
    {
      id: "c-reactive-protein-crp",
      text: "C-reactive protein (CRP)"
    }
  ]
};
var sepsis_changed_from_septicaemia = {
  "triage-level": "Immediately",
  "refer-and-triage-level": "Refer the patient to a health facility immediately.",
  refer: true,
  medications: [],
  "test-recommendations": [
    {
      id: "full-blood-picture-fbp",
      text: "Full Blood Picture (FBP)"
    },
    {
      id: "blood-culture",
      text: "Blood Culture"
    }
  ]
};
var ped_hiv_aids = {
  "triage-level": "Immediately",
  "refer-and-triage-level": "Refer the patient to a health facility immediately.",
  refer: true,
  medications: [],
  "test-recommendations": [
    {
      id: "hiv-rapid-test",
      text: "HIV Rapid Test"
    },
    {
      id: "hiv-pcr",
      text: "HIV PCR"
    }
  ]
};
var hepatitis_b = {
  "triage-level": "2 days",
  "refer-and-triage-level": "Refer the patient to a health facility. They should seek care within 2 days. They should seek medical care immediately if there are signs of liver failure.",
  refer: true,
  medications: [],
  "test-recommendations": [
    {
      id: "full-blood-picture-fbp",
      text: "Full Blood Picture (FBP)"
    },
    {
      id: "hepatitis-b-surface-antigen-h-bs-ag",
      text: "Hepatitis B Surface Antigen (HBsAg)"
    },
    {
      id: "hepatitis-b-pcr-hbv-dna",
      text: "Hepatitis B PCR (HBV DNA)"
    },
    {
      id: "hepatitis-b-surface-antibody-hep-bs-ab",
      text: "Hepatitis B Surface Antibody (HepBsAb)"
    },
    {
      id: "liver-function-tests",
      text: "Liver Function Tests"
    },
    {
      id: "hiv-viral-load",
      text: "HIV Viral Load"
    }
  ]
};
var toxoplasmosis = {
  "triage-level": "Immediately",
  "refer-and-triage-level": "Refer the patient to a health facility immediately.",
  refer: true,
  medications: [
    {
      id: "n-a",
      text: "N/A"
    }
  ],
  "test-recommendations": [
    {
      id: "cd-4-count",
      text: "CD4 Count"
    },
    {
      id: "anti-toxoplasma-ig-g-serology",
      text: "Anti-Toxoplasma IgG Serology"
    },
    {
      id: "mri-or-ct",
      text: "MRI or CT"
    }
  ]
};
var pneumocystis_pneumonia = {
  "triage-level": "Immediately",
  "refer-and-triage-level": "Refer the patient to a health facility immediately.",
  refer: true,
  medications: [
    {
      id: "cough-suppressants-as-needed",
      text: "Cough suppressants, as needed."
    }
  ],
  "test-recommendations": [
    {
      id: "microscopy-of-sputum",
      text: "Microscopy of Sputum"
    },
    {
      id: "pcr-test-fungal-dna",
      text: "PCR Test (Fungal DNA)"
    }
  ],
  "other-recommendations": "If the patient is a smoker, recommend that they stop smoking."
};
var ectopic_pregnancy = {
  "triage-level": "Immediately",
  "refer-and-triage-level": "Refer the patient to a health facility immediately.",
  refer: true,
  medications: [
    {
      id: "surgery",
      text: "Surgery"
    }
  ],
  "test-recommendations": [
    {
      id: "pregnancy-test",
      text: "Pregnancy Test"
    },
    {
      id: "pelvic-exam",
      text: "Pelvic Exam"
    }
  ],
  "other-recommendations": "Recommend that the patient goes to a health facility immediately as they will likely need surgery."
};
var next_steps_basic_default = {
  "severe-malaria": severe_malaria,
  malaria,
  pneumonia,
  tb,
  coryza,
  sinusitis,
  bronchiolitis,
  bronchitis,
  gastritis,
  "otitis-externa": otitis_externa,
  "supprative-otitis-media": supprative_otitis_media,
  "otitis-media": otitis_media,
  trichuriasis,
  conjunctivitis,
  uti,
  dysentry,
  malnutrition,
  "ascariasis-changed-from-helminthiasis": ascariasis_changed_from_helminthiasis,
  asthma,
  influenza,
  tonsilitis,
  laryngitis,
  "covid-19": covid_19,
  copd,
  syphillis,
  gonorrhea,
  "hiv-aids": hiv_aids,
  "bacterial-vaginosis": bacterial_vaginosis,
  "vulvovaginal-candidiasis": vulvovaginal_candidiasis,
  trichomoniasis,
  "acute-watery-diarrhoea": acute_watery_diarrhoea,
  chlamydia,
  "g-herpes": g_herpes,
  "pelvic-inflammatory-disease": pelvic_inflammatory_disease,
  "genital-warts": genital_warts,
  hpv,
  anemia,
  "oral-thrush": oral_thrush,
  typhoid,
  cholera,
  meningitis,
  epilepsy,
  dehydration,
  htn,
  scabies,
  gastroenteritis,
  "heat-rash": heat_rash,
  stomatitis,
  bacteremia,
  cephalohematoma,
  "tinea-corporis": tinea_corporis,
  "bact-skin-infection-impetigo": bact_skin_infection_impetigo,
  "umb-cord-sepsis": umb_cord_sepsis,
  "sepsis-changed-from-septicaemia": sepsis_changed_from_septicaemia,
  "ped-hiv-aids": ped_hiv_aids,
  "hepatitis-b": hepatitis_b,
  toxoplasmosis,
  "pneumocystis-pneumonia": pneumocystis_pneumonia,
  "ectopic-pregnancy": ectopic_pregnancy
};

// data/translated/next-steps-extended.json
var complicated_malaria = {
  "refer-and-triage-level": {
    en: "Refer the patient to a health facility immediately.",
    sw: "Mpeleke mgonjwa katika kituo cha afya mara moja."
  },
  medications: [
    {
      id: "paracetamol-every-4-6-hours-until-symptoms-disappear",
      en: "Paracetamol, every 4-6 hours until symptoms disappear.",
      sw: "Paracetamol, kila baada ya saa 4 au sita 6 mpaka dalili zinapoisha"
    }
  ],
  "test-recommendations": [
    {
      id: "mrdt",
      en: "MRDT"
    }
  ],
  "other-recommendations": {
    en: "Recommended that patients use insecticide-treated nets (ITNs).",
    sw: "Pendekeza wagonjwa kutumia chandarua chenye viuatilifu (ITNs)."
  }
};
var bronchiolitis2 = {
  "refer-and-triage-level": {
    en: "The patient can recieve home based care. They should seek medical attention if they experience a worsening of their symptoms.",
    sw: "Mgonjwa anaweza kupokea huduma ya nyumbani. Wanapaswa kutafuta matibabu ikiwa dalili zao zinazidi."
  },
  medications: [
    {
      id: "nonsteroidal-anti-inflammatory-drugs-nsai-ds",
      en: "Nonsteroidal anti-inflammatory drugs (NSAIDs)"
    },
    {
      id: "bronchodilators",
      en: "Bronchodilators"
    }
  ],
  "test-recommendations": [],
  "other-recommendations": {
    en: "It is not recommended that the patient takes antibiotics, as this is not a bacterial infection.",
    sw: "Haishauriwi mgonjwa kutumia antibiotiki kwani haya sio maambukizi ya bakteria."
  }
};
var otitis_externa2 = {
  "refer-and-triage-level": {
    en: "The patient can recieve home based care.",
    sw: "Mgonjwa anaweza kupokea huduma ya nyumbani."
  },
  medications: [
    {
      id: "ear-drops",
      en: "Ear drops",
      sw: "Ear drops"
    },
    {
      id: "paracetamol-as-needed",
      en: "Paracetamol, as needed.",
      sw: "Paracetamol, kama inavyohitajika"
    }
  ],
  "test-recommendations": [],
  "other-recommendations": {
    en: "Recommend that the patient stays away from swimming or putting water in their ears.",
    sw: "Pendekeza kwamba mgonjwa anakaa mbali na kuogelea au kuweka maji masikioni."
  }
};
var supprative_otitis_media2 = {
  "refer-and-triage-level": {
    en: "Refer the patient to a health facility. They should seek care within 2 days.",
    sw: "Mpeleke mgonjwa katika kituo cha afya. Wanapaswa kutafuta huduma ndani ya siku 2."
  },
  medications: [
    {
      id: "antibiotic-ear-drops",
      en: "Antibiotic ear drops",
      sw: "Antibiotic ear drops"
    },
    {
      id: "paracetamol-or-ibuprofen-as-needed",
      en: "Paracetamol or ibuprofen, as needed.",
      sw: "Paracetamol au ibuprofen, kama inavyohitajika"
    }
  ],
  "test-recommendations": [],
  "other-recommendations": {
    en: "Recommend that the patient observes their symptoms and keeps their ear canal clean. Complications can occur such as loss of hearing.",
    sw: "Inapendekezwa mgonjwa aangalie dalili zake na kuhakikisha kuwa masikio yake yanakuwa safi. Matatizo yanaweza kutokea kama vile kupoteza usikivu."
  }
};
var pneumocystis_pneumonia2 = {
  "refer-and-triage-level": {
    en: "Refer the patient to a health facility immediately.",
    sw: "Mpeleke mgonjwa katika kituo cha afya mara moja."
  },
  medications: [
    {
      id: "cough-suppressants-as-needed",
      en: "Cough suppressants, as needed.",
      sw: "Dawa za kupunguza kukohoa, kama inavyohitajika"
    }
  ],
  "test-recommendations": [],
  "other-recommendations": {
    en: "If the patient is a smoker, recommend that they stop smoking.",
    sw: "Ikiwa mgonjwa anavuta sigara, pendekeza aache sigara."
  }
};
var ectopic_pregnancy2 = {
  "refer-and-triage-level": {
    en: "Refer the patient to a health facility immediately.",
    sw: "Mpeleke mgonjwa katika kituo cha afya mara moja."
  },
  medications: [
    {
      id: "surgery",
      en: "Surgery",
      sw: "Upasuaji"
    }
  ],
  "test-recommendations": [],
  "other-recommendations": {
    en: "Recommend that the patient goes to a health facility immediately as they will likely need surgery.",
    sw: ""
  }
};
var pelvic_inflammatory_disease2 = {
  "refer-and-triage-level": {
    en: "Refer the patient to a health facility immediately.",
    sw: "Mpeleke mgonjwa katika kituo cha afya mara moja."
  },
  medications: [],
  "test-recommendations": [
    {
      id: "pelvic-exam",
      en: "Pelvic Exam"
    },
    {
      id: "full-blood-picture-fbp",
      en: "Full Blood Picture (FBP) "
    },
    {
      id: "urinalysis",
      en: "Urinalysis"
    },
    {
      id: "ultrasound-of-pelvis",
      en: "Ultrasound of Pelvis"
    }
  ],
  "other-recommendations": {
    en: "This condition can result in severe complications. Recommend that the patient seeks immediate care.",
    sw: ""
  }
};
var genital_warts2 = {
  "refer-and-triage-level": {
    en: "The patient can recieve home based care. They should seek medical attention if they experience a worsening of their symptoms.",
    sw: "Mgonjwa anaweza kupokea huduma ya nyumbani. Wanapaswa kutafuta matibabu ikiwa dalili zao zinazidi."
  },
  medications: [
    {
      id: "imiquimod-or-trichloroacetic-acid",
      en: "Imiquimod or Trichloroacetic Acid"
    },
    {
      id: "other-topical-cream",
      en: "Other topical cream"
    }
  ],
  "test-recommendations": [],
  "other-recommendations": {
    en: "If the warts continue to return or cause severe pain, recommend that the patient goes to a health facility for removal. Recommend that the patient gets an HPV vaccine if they have not yet done so.",
    sw: ""
  }
};
var malaria2 = {
  "refer-and-triage-level": {
    en: "The patient can recieve home based care. They should seek medical attention if they experience a worsening of their symptoms.",
    sw: "Mgonjwa anaweza kupokea huduma ya nyumbani. Wanapaswa kutafuta matibabu ikiwa dalili zao zinazidi."
  },
  medications: [
    {
      id: "artemether-lumefantrine-alu-first-dose-2-mg-kg-artemether-and-12-mg-kg-lumefantrine-for-uncomplicated-malaria",
      en: "Artemether-Lumefantrine (ALU), first dose, 2mg/kg Artemether and 12mg/kg Lumefantrine, for uncomplicated malaria.   "
    },
    {
      id: "diazepam-0-5-mg-kg-delivered-rectally",
      en: "Diazepam, 0.5mg/kg, delivered rectally"
    }
  ],
  "test-recommendations": [
    {
      id: "mrdt",
      en: "MRDT"
    }
  ],
  "other-recommendations": {
    en: "Begin patient on ALU/Quinine and document with patient. Give diazepam if convulsing and document.",
    sw: "Mwanzishie mgojwa ALU / Quinine na andika na mgonjwa. Toa diazepam ikiwa unasumbua na andika."
  }
};
var pneumonia2 = {
  "refer-and-triage-level": {
    en: "Refer the patient to a health facility immediately.",
    sw: "Mpeleke mgonjwa katika kituo cha afya mara moja."
  },
  medications: [
    {
      id: "amoxycillin-capsule-250-mg-for-over-10-years-given-250-500-mg-every-8-hours-for-5-days",
      en: "Amoxycillin capsule, 250mg. For over 10 years, given 250-500mg every 8 hours for 5 days.  ",
      sw: "Amoxycillin kapsuli, 250mg. Mtu mzima na watoto zaidi ya miaka 10 wapewe 250-500mg kila baada ya masaa 8 kwa siku 5."
    },
    {
      id: "cough-suppressants-as-needed",
      en: "Cough suppressants, as needed.",
      sw: "Dawa za kupunguza kukohoa, kama inavyohitajika"
    }
  ],
  "test-recommendations": [
    {
      id: "chest-x-ray-cxr",
      en: "Chest X-Ray (CXR)"
    },
    {
      id: "full-blood-picture-fbp",
      en: "Full Blood Picture (FBP)"
    }
  ],
  "other-recommendations": {
    en: "If the patient is a smoker, recommend that they stop smoking.",
    sw: "Ikiwa mgonjwa anavuta sigara, pendekeza aache sigara."
  }
};
var tuberculosis = {
  "refer-and-triage-level": {
    en: "Refer the patient to a health facility immediately.",
    sw: "Mpeleke mgonjwa katika kituo cha afya mara moja."
  },
  medications: [],
  "test-recommendations": [
    {
      id: "chest-x-ray-cxr",
      en: "Chest X-Ray (CXR)"
    },
    {
      id: "full-blood-picture-fbp",
      en: "Full Blood Picture (FBP)"
    },
    {
      id: "gene-xpert",
      en: "GeneXpert"
    },
    {
      id: "sputum-culture",
      en: "Sputum Culture"
    }
  ],
  "other-recommendations": {
    en: "",
    sw: ""
  }
};
var coryza2 = {
  "refer-and-triage-level": {
    en: "The patient can recieve home based care. They should seek medical attention if they experience difficulty breathing or excessive coughing.",
    sw: "Mgonjwa anaweza kupokea huduma ya nyumbani. Wanapaswa kutafuta matibabu ikiwa wanapata shida kupumua au kukohoa kupita kiasi."
  },
  medications: [
    {
      id: "antihistamines-if-available",
      en: "Antihistamines (If available)",
      sw: "Antihistamines (Ikiwa inapatikana)"
    },
    {
      id: "paracetamol-syrup-for-children-10-mg-kg-as-needed",
      en: "Paracetamol (syrup for children), 10mg/kg, as needed",
      sw: "Paracetamol (dawa ya maji kwa watoto), 10mg / kg, kama inavyohitajika"
    }
  ],
  "test-recommendations": [],
  "other-recommendations": {
    en: "Recommend that the patient self-isolate and treats symptoms. Patient should rest and drink plenty of fluids.",
    sw: "Pendekeza kwamba mgonjwa ajitenge na atibu dalili. Mgonjwa anapaswa kupumzika na kunywa maji mengi."
  }
};
var sinusitis2 = {
  "refer-and-triage-level": {
    en: "The patient can recieve home based care. They should seek medical attention if they experience severe pain, difficulty breathing, or excessive and recurrent coughing.",
    sw: "Mgonjwa anaweza kupokea huduma ya nyumbani. Wanapaswa kutafuta matibabu ikiwa wanapata maumivu makali, kupumua kwa shida, au kukohoa kupindukia na mara kwa mara."
  },
  medications: [
    {
      id: "erythromycin",
      en: "Erythromycin",
      sw: "Erythromycin"
    },
    {
      id: "nasal-decongestants",
      en: "Nasal Decongestants ",
      sw: "Vipunguzi vya pua"
    },
    {
      id: "paracetamol-10-mg-kg-as-needed",
      en: "Paracetamol, 10mg/kg, as needed",
      sw: "Paracetamol, 10mg / kg, kama inavyohitajika"
    }
  ],
  "test-recommendations": [
    {
      id: "full-blood-picture-fbp",
      en: "Full Blood Picture (FBP)"
    }
  ],
  "other-recommendations": {
    en: "Recommend the patient uses a warm compresses to ease pain in the nose and sinuses.",
    sw: "Pendekeza mgonjwa atumie kitambaa chenye maji ya vuguvugu kupunguza maumivu kwenye pua."
  }
};
var bronchitis2 = {
  "refer-and-triage-level": {
    en: "The patient can recieve home based care. They should seek medical attention if they experience a worsening of their symptoms.",
    sw: "Mgonjwa anaweza kupokea huduma ya nyumbani. Wanapaswa kutafuta matibabu ikiwa dalili zao zinazidi."
  },
  medications: [
    {
      id: "nonsteroidal-anti-inflammatory-drugs-nsai-ds",
      en: "Nonsteroidal anti-inflammatory drugs (NSAIDs)"
    }
  ],
  "test-recommendations": [
    {
      id: "chest-x-ray-cxr",
      en: "Chest X-Ray (CXR)"
    }
  ],
  "other-recommendations": {
    en: "It is not recommended that the patient takes antibiotics, as this is not a bacterial infection.",
    sw: "Haishauriwi mgonjwa kutumia antibiotiki kwani haya sio maambukizi ya bakteria."
  }
};
var gastritis2 = {
  "refer-and-triage-level": {
    en: "Refer the patient to a health facility. They should seek care within 2 days.",
    sw: "Mpeleke mgonjwa katika kituo cha afya. Wanapaswa kutafuta huduma ndani ya siku 2."
  },
  medications: [
    {
      id: "oral-rehydration-salts-ors",
      en: "Oral rehydration salts (ORS)"
    }
  ],
  "test-recommendations": [
    {
      id: "full-blood-picture-fbp",
      en: "Full Blood Picture (FBP) "
    },
    {
      id: "h-pylori-stool-test",
      en: "H-Pylori stool test"
    }
  ],
  "other-recommendations": {
    en: "Recommend that the patient avoid acidic foods or foods that aggravate the pain. Patient should drink a lot of fluids.",
    sw: "Pendekeza mgonjwa aepuke vyakula vyenye tindikali au vyakula vinavyoongeza maumivu. Mgonjwa anapaswa kunywa maji mengi."
  }
};
var otitis_media2 = {
  "refer-and-triage-level": {
    en: "The patient can recieve home based care. They should seek immediate care if If their symptoms get worse, do not resolve, or if there is tympanic perforation.",
    sw: "Mgonjwa anaweza kupokea huduma ya nyumbani. Wanapaswa kutafuta huduma ya haraka ikiwa dalili zao zinazidi kuwa mbaya, usitatue, au ikiwa kuna tympanic perforation."
  },
  medications: [
    {
      id: "amoxicillin-90-mg-kg-max-3-g-a-day-divided-into-3-doses-if-2-years-take-for-2-weeks-if-2-years-take-for-7-days",
      en: "Amoxicillin, 90mg/kg (max 3g a day) divided into 3 doses. If <2 years, take for 2 weeks. If >2 years, take for 7 days. "
    },
    {
      id: "ibuprofen",
      en: "Ibuprofen"
    }
  ],
  "test-recommendations": [],
  "other-recommendations": {
    en: "Recommend that the patient stays away from swimming or putting water in their ears.",
    sw: "Pendekeza kwamba mgonjwa anakaa mbali na kuogelea au kuweka maji masikioni."
  }
};
var trichuriasis2 = {
  "refer-and-triage-level": {
    en: "The patient can recieve home based care. They should seek medical attention if they experience a worsening of their symptoms.",
    sw: "Mgonjwa anaweza kupokea huduma ya nyumbani. Wanapaswa kutafuta matibabu ikiwa dalili zao zinazidi."
  },
  medications: [
    {
      id: "albendazole-400-mg-one-time-per-day-for-3-days",
      en: "Albendazole, 400mg, one time per day for 3 days"
    },
    {
      id: "deworming-tablets",
      en: "Deworming tablets"
    }
  ],
  "test-recommendations": [],
  "other-recommendations": {
    en: "Recommend that patient practices good hygeine and regularly washes their hands. If the patient is a child, provide counseling on deworming tablets.",
    sw: "Pendekeza kwamba mgonjwa kuzingatia usafi na anaosha mikono mara kwa mara. Ikiwa mgonjwa ni mtoto, toa ushauri juu ya vidonge vya minyoo."
  }
};
var conjunctivitis2 = {
  "refer-and-triage-level": {
    en: "The patient can recieve home based care. They should seek medical attention if their symptoms do not resolve.",
    sw: "Mgonjwa anaweza kupokea huduma ya nyumbani. Wanapaswa kutafuta matibabu ikiwa dalili zao hazipungui."
  },
  medications: [
    {
      id: "gentamycin-eyedrops",
      en: "Gentamycin Eyedrops"
    }
  ],
  "test-recommendations": [],
  "other-recommendations": {
    en: "Recommend that the patient practices good hygeine and regularly washes their hands.",
    sw: "Pendekeza kwamba mgonjwa kuzingatia usafi na anaosha mikono mara kwa mara."
  }
};
var urinary_tract_infection_uti = {
  "refer-and-triage-level": {
    en: "The patient can recieve home based care. They should seek medical attention if they experience a worsening of their symptoms or if their symptoms do not resolve.",
    sw: "Mgonjwa anaweza kupokea huduma ya nyumbani. Wanapaswa kutafuta matibabu ikiwa wanapata kuzidi kwa dalili zao au ikiwa dalili zao hazipungui"
  },
  medications: [
    {
      id: "amoxicillin",
      en: "Amoxicillin"
    }
  ],
  "test-recommendations": [
    {
      id: "full-blood-picture-fbp",
      en: "Full Blood Picture (FBP)"
    },
    {
      id: "urinalysis",
      en: "Urinalysis"
    }
  ],
  "other-recommendations": {
    en: "Provide counseling to patient on prevention menthods and recommend a follow-up after 5 months at a higher facility.",
    sw: "Toa ushauri kwa mgonjwa juu ya vidokezo vya kuzuia na kupendekeza ufuatiliaji baada ya miezi 5 katika kituo cha afya cha juu."
  }
};
var dysentry2 = {
  "refer-and-triage-level": {
    en: "Refer the patient to a health facility immediately.",
    sw: "Mpeleke mgonjwa katika kituo cha afya mara moja."
  },
  medications: [
    {
      id: "oral-rehydration-salts-ors",
      en: "Oral rehydration salts (ORS)"
    }
  ],
  "test-recommendations": [
    {
      id: "stool-analysis",
      en: "Stool Analysis"
    }
  ],
  "other-recommendations": {
    en: "",
    sw: ""
  }
};
var malnutrition2 = {
  "refer-and-triage-level": {
    en: "Refer the patient to a health facility immediately.",
    sw: "Mpeleke mgonjwa katika kituo cha afya mara moja."
  },
  medications: [
    {
      id: "oral-rehydration-salts-ors",
      en: "Oral rehydration salts (ORS)"
    }
  ],
  "test-recommendations": [
    {
      id: "chest-x-ray-cxr",
      en: "Chest X-Ray (CXR)"
    },
    {
      id: "full-blood-picture-fbp",
      en: "Full Blood Picture (FBP)"
    },
    {
      id: "hiv-rapid-test",
      en: "HIV Rapid Test"
    },
    {
      id: "mrdt",
      en: "MRDT"
    },
    {
      id: "electrolytes-test",
      en: "Electrolytes Test"
    }
  ],
  "other-recommendations": {
    en: "",
    sw: ""
  }
};
var ascariasis = {
  "refer-and-triage-level": {
    en: "The patient can recieve home based care. They should seek medical attention if they experience severe abdominal pain, if the patient is underweight, or if there are any emergency signs.",
    sw: "Mgonjwa anaweza kupokea huduma ya nyumbani. Wanapaswa kutafuta matibabu ikiwa wanapata maumivu makali ya tumbo, ikiwa mgonjwa ana uzito mdogo, au ikiwa kuna dalili zozote za dharura."
  },
  medications: [
    {
      id: "albendazole-400-mg-one-time-per-day-for-3-days",
      en: "Albendazole, 400mg, one time per day for 3 days"
    }
  ],
  "test-recommendations": [],
  "other-recommendations": {
    en: "Recommend that the patient practices good hygeine and regularly washes their hands.",
    sw: "Pendekeza kwamba mgonjwa kuzingatia usafi na anaosha mikono mara kwa mara."
  }
};
var asthma2 = {
  "refer-and-triage-level": {
    en: "Refer the patient to a health facility immediately.",
    sw: "Mpeleke mgonjwa katika kituo cha afya mara moja."
  },
  medications: [
    {
      id: "inhaled-corticosteroids-if-available",
      en: "Inhaled Corticosteroids (if available)"
    }
  ],
  "test-recommendations": [
    {
      id: "chest-x-ray-cxr",
      en: "Chest X-Ray (CXR)"
    },
    {
      id: "full-blood-picture-fbp",
      en: "Full Blood Picture (FBP)"
    }
  ],
  "other-recommendations": {
    en: "If the patient smokes, recommend that they stop smoking. Recommend that the patient avoids any triggers, if they are known.",
    sw: "Ikiwa mgonjwa anavuta sigara, pendekeza waache sigara. Pendekeza kwamba mgonjwa anaepuka vichocheo vyovyote, ikiwa vinajulikana."
  }
};
var influenza2 = {
  "refer-and-triage-level": {
    en: "The patient can recieve home based care. They should seek medical attention if they experience difficulty breathing or excessive coughing.",
    sw: "Mgonjwa anaweza kupokea huduma ya nyumbani. Wanapaswa kutafuta matibabu ikiwa wanapata shida kupumua au kukohoa kupita kiasi."
  },
  medications: [
    {
      id: "paracetamol",
      en: "Paracetamol",
      sw: "Paracetamol"
    },
    {
      id: "nasal-decongestants",
      en: "Nasal decongestants",
      sw: "Vipunguzi vya pua"
    }
  ],
  "test-recommendations": [
    {
      id: "full-blood-picture-fbp",
      en: "Full Blood Picture (FBP)"
    }
  ],
  "other-recommendations": {
    en: "Recommend that the patient self-isolate and treats symptoms. Patient should rest and drink plenty of fluids.",
    sw: "Pendekeza kwamba mgonjwa ajitenge na atibu dalili. Mgonjwa anapaswa kupumzika na kunywa maji mengi."
  }
};
var tonsilitis2 = {
  "refer-and-triage-level": {
    en: "The patient can recieve home based care. They should seek medical attention if they experience difficulty breathing, if they cannot eat, if their symptoms come back, or if this is the second time with this condition.",
    sw: "Mgonjwa anaweza kupokea huduma ya nyumbani. Wanapaswa kutafuta matibabu ikiwa wanapata shida kupumua, ikiwa hawawezi kula, ikiwa dalili zao zinarudi, au ikiwa hii ni mara ya pili kuwa na hali hii."
  },
  medications: [
    {
      id: "ampiclox",
      en: "Ampiclox"
    },
    {
      id: "paracetamol",
      en: "Paracetamol"
    }
  ],
  "test-recommendations": [
    {
      id: "full-blood-picture-fbp",
      en: "Full Blood Picture (FBP)"
    }
  ],
  "other-recommendations": {
    en: "Recommend that the patient rests at home.",
    sw: "Pendekeza kwamba mgonjwa anapumzika nyumbani."
  }
};
var laryngitis2 = {
  "refer-and-triage-level": {
    en: "Refer the patient to a health facility. They should seek care within 24 hours.",
    sw: "Mpeleke mgonjwa katika kituo cha afya. Wanapaswa kutafuta huduma ndani ya masaa 24."
  },
  medications: [],
  "test-recommendations": [],
  "other-recommendations": {
    en: "Recommend that the patient rests their voice.",
    sw: "Pendekeza kwamba mgonjwa anapumzika nyumbani."
  }
};
var chronic_obstructive_pulmonary_disease_copd = {
  "refer-and-triage-level": {
    en: "Refer the patient to a health facility. They should seek care within 2 weeks.",
    sw: "Mpeleke mgonjwa katika kituo cha afya. Wanapaswa kutafuta huduma ndani ya wiki 2."
  },
  medications: [],
  "test-recommendations": [
    {
      id: "chest-x-ray-cxr",
      en: "Chest X-Ray (CXR)"
    }
  ],
  "other-recommendations": {
    en: "If the patient smokes, recommend that they stop smoking. Provide counseling to the patient on eating nutritious meals.",
    sw: "Ikiwa mgonjwa anavuta sigara, pendekeza waache sigara. Toa ushauri kwa mgonjwa juu ya kula chakula chenye lishe."
  }
};
var syphillis2 = {
  "refer-and-triage-level": {
    en: "Refer the patient to a health facility. They should seek care within 24 hours.",
    sw: "Mpeleke mgonjwa katika kituo cha afya. Wanapaswa kutafuta huduma ndani ya masaa 24."
  },
  medications: [
    {
      id: "doxycycline-or-penicillin-for-early-infection",
      en: "Doxycycline or Penicillin (for early infection)"
    }
  ],
  "test-recommendations": [],
  "other-recommendations": {
    en: "Provide counseling to the patient on prevention methods, infection, and continuation of treatment.",
    sw: "Toa ushauri kwa mgonjwa juu ya njia za kuzuia maambukizi, na kuendelea na matibabu."
  }
};
var gonorrhea2 = {
  "refer-and-triage-level": {
    en: "Refer the patient to a health facility. They should seek care within 2 days.",
    sw: "Mpeleke mgonjwa katika kituo cha afya. Wanapaswa kutafuta huduma ndani ya siku 2."
  },
  medications: [],
  "test-recommendations": [],
  "other-recommendations": {
    en: "Provide counseling to the patient on prevention methods, infection, and continuation of treatment.",
    sw: "Toa ushauri kwa mgonjwa juu ya njia za kuzuia maambukizi, na kuendelea na matibabu."
  }
};
var hiv_aids2 = {
  "refer-and-triage-level": {
    en: "Refer the patient to a health facility immediately.",
    sw: "Mpeleke mgonjwa katika kituo cha afya mara moja."
  },
  medications: [],
  "test-recommendations": [
    {
      id: "hiv-rapid-test",
      en: "HIV Rapid Test"
    },
    {
      id: "hiv-pcr",
      en: "HIV PCR"
    }
  ],
  "other-recommendations": {
    en: "Provide counseling to the patient on prevention methods, infection, and continuation of treatment.",
    sw: "Toa ushauri kwa mgonjwa juu ya njia za kuzuia maambukizi, na kuendelea na matibabu."
  }
};
var bacterial_vaginosis2 = {
  "refer-and-triage-level": {
    en: "The patient can recieve home based care. They should seek medical attention if they experience these symptoms frequently or if their condition is recurrent.",
    sw: "Mgonjwa anaweza kupokea huduma ya nyumbani. Wanapaswa kutafuta matibabu ikiwa wanapata dalili hizi mara kwa mara au ikiwa hali yao ni ya kawaida."
  },
  medications: [
    {
      id: "metronidazole-500-mg-twice-daily-for-7-days",
      en: "Metronidazole, 500mg, twice daily for 7 days"
    }
  ],
  "test-recommendations": [],
  "other-recommendations": {
    en: "Provide counseling to the patient on prevention practices and encourage good hygeine.",
    sw: "Toa ushauri kwa mgonjwa juu ya kuzuia na kuhimiza usafi mzuri."
  }
};
var vulvovaginal_candidiasis2 = {
  "refer-and-triage-level": {
    en: "The patient can recieve home based care. They should seek medical attention if they experience these symptoms frequently or if their condition is recurrent.",
    sw: "Mgonjwa anaweza kupokea huduma ya nyumbani. Wanapaswa kutafuta matibabu ikiwa wanapata dalili hizi mara kwa mara au ikiwa hali yao ni ya kawaida."
  },
  medications: [
    {
      id: "fluconazole-150-mg-single-dose",
      en: "Fluconazole, 150mg, single dose"
    }
  ],
  "test-recommendations": [],
  "other-recommendations": {
    en: "Provide counseling to the patient on prevention practices and encourage good hygeine.",
    sw: "Toa ushauri kwa mgonjwa juu ya kuzuia na kuhimiza usafi mzuri."
  }
};
var trichomoniasis2 = {
  "refer-and-triage-level": {
    en: "The patient can recieve home based care.",
    sw: "Mgonjwa anaweza kupokea huduma ya nyumbani."
  },
  medications: [
    {
      id: "metronidazole-500-mg-twice-daily-for-7-days",
      en: "Metronidazole, 500mg, twice daily for 7 days"
    }
  ],
  "test-recommendations": [],
  "other-recommendations": {
    en: "Provide counseling to the patient on prevention practices and encourage good hygeine.",
    sw: "Toa ushauri kwa mgonjwa juu ya kuzuia na kuhimiza usafi mzuri."
  }
};
var acute_watery_diarrhoea2 = {
  "refer-and-triage-level": {
    en: "The patient can recieve home based care. They should seek medical attention if they are severely dehydrated or if their symptoms do not resolve.",
    sw: "Mgonjwa anaweza kupokea huduma ya nyumbani. Wanapaswa kutafuta matibabu ikiwa wamepungukiwa na maji mwilini sana au ikiwa dalili zao hazipungui."
  },
  medications: [
    {
      id: "oral-rehydration-salts-ors",
      en: "Oral Rehydration Salts (ORS)"
    }
  ],
  "test-recommendations": [
    {
      id: "stool-analysis",
      en: "Stool analysis"
    }
  ],
  "other-recommendations": {
    en: "Recommend that the patient rests at home.",
    sw: "Pendekeza kwamba mgonjwa anapumzika nyumbani."
  }
};
var chlamydia2 = {
  "refer-and-triage-level": {
    en: "Refer the patient to a health facility. They should seek care within 2 days.",
    sw: "Mpeleke mgonjwa katika kituo cha afya. Wanapaswa kutafuta huduma ndani ya siku 2."
  },
  medications: [
    {
      id: "azithromycin-1-g-single-dose",
      en: "Azithromycin, 1g, single dose"
    }
  ],
  "test-recommendations": [],
  "other-recommendations": {
    en: "Provide counseling to the patient on prevention methods, infection, and continuation of treatment.",
    sw: "Pendekeza kwamba mgonjwa anapumzika nyumbani."
  }
};
var genital_herpes = {
  "refer-and-triage-level": {
    en: "Refer the patient to a health facility immediately.",
    sw: "Mpeleke mgonjwa katika kituo cha afya mara moja."
  },
  medications: [],
  "test-recommendations": [],
  "other-recommendations": {
    en: "",
    sw: ""
  }
};
var human_papillomavirus_hpv = {
  "refer-and-triage-level": {
    en: "Refer the patient to a health facility immediately.",
    sw: "Mpeleke mgonjwa katika kituo cha afya mara moja."
  },
  medications: [],
  "test-recommendations": [
    {
      id: "hpv-screening",
      en: "HPV Screening"
    }
  ],
  "other-recommendations": {
    en: "",
    sw: ""
  }
};
var anaemia = {
  "refer-and-triage-level": {
    en: "The patient can recieve home based care.",
    sw: "Mgonjwa anaweza kupokea huduma ya nyumbani."
  },
  medications: [
    {
      id: "iron-supplements-ferrous-sulfate-325-3-tablets-per-day-taken-every-alternate-day-for-3-months",
      en: "Iron supplements (Ferrous Sulfate 325), 3 tablets per day, taken every alternate day for 3 months",
      sw: "Vidonge vya madini ya chuma (Ferrous Sulfate 325), vidonge 3 kwa siku, hutumiwa kila siku mbadala kwa miezi 3"
    }
  ],
  "test-recommendations": [
    {
      id: "full-blood-picture-fbp",
      en: "Full Blood Picture (FBP)"
    }
  ],
  "other-recommendations": {
    en: "",
    sw: ""
  }
};
var oral_thrush2 = {
  "refer-and-triage-level": {
    en: "Refer the patient to a health facility. They should seek care within 2 days.",
    sw: "Mpeleke mgonjwa katika kituo cha afya. Wanapaswa kutafuta huduma ndani ya siku 2."
  },
  medications: [
    {
      id: "nystatin-oral-gel-applies-three-times-a-day",
      en: "Nystatin oral gel, applies three times a day"
    }
  ],
  "test-recommendations": [],
  "other-recommendations": {
    en: "",
    sw: ""
  }
};
var typhoid2 = {
  "refer-and-triage-level": {
    en: "The patient can recieve home based care. They should seek medical attention if their symptoms last more than 3-5 days or if there are any emergency signs.",
    sw: "Mgonjwa anaweza kupokea huduma ya nyumbani. Wanapaswa kutafuta matibabu ikiwa dalili zao zinadumu zaidi ya siku 3-5 au ikiwa kuna dalili za dharura."
  },
  medications: [
    {
      id: "ciprofloxacin-adults-500-mg-twice-daily-for-7-days-children-30-mg-kg-divided-in-two-doses-a-day-for-7-days",
      en: "Ciprofloxacin, (Adults) 500mg, twice daily for 7 days; (Children) 30mg/kg divided in two doses a day for 7 days",
      sw: "Ciprofloxacin, (Watu wazima) 500mg, mara mbili kwa siku kwa siku 7; (Watoto) 30mg / kg imegawanywa katika dozi mbili kwa siku kwa siku 7"
    },
    {
      id: "oral-rehydration-salts-or-fluids-if-dehydrated",
      en: "Oral Rehydration Salts or Fluids (if dehydrated)",
      sw: "Oral Rehydration Salts or Fluids (if dehydrated)"
    }
  ],
  "test-recommendations": [],
  "other-recommendations": {
    en: "Provide counseling to the patient on prevention practies and encourage them to practice good hygeine.",
    sw: "Toa ushauri kwa mgonjwa juu ya njia za kuzuia na kuwatia moyo wafanye usafi mzuri."
  }
};
var cholera2 = {
  "refer-and-triage-level": {
    en: "The patient can recieve home based care. They should seek medical attention if their symptoms last more than 3 days or if there are any emergency signs.",
    sw: "Mgonjwa anaweza kupokea huduma ya nyumbani. Wanapaswa kutafuta matibabu ikiwa dalili zao zinadumu zaidi ya siku 3 au ikiwa kuna dalili zozote za dharura."
  },
  medications: [
    {
      id: "azithromycin-200-mg-kg-single-dose",
      en: "Azithromycin, 200mg/kg, single dose"
    },
    {
      id: "oral-rehydration-salts-or-fluids-if-dehydrated",
      en: "Oral Rehydration Salts or Fluids (if dehydrated)"
    }
  ],
  "test-recommendations": [],
  "other-recommendations": {
    en: "Provide counseling to the patient on prevention practies and encourage them to practice good hygeine.",
    sw: ""
  }
};
var meningitis2 = {
  "refer-and-triage-level": {
    en: "Refer the patient to a health facility immediately.",
    sw: "Mpeleke mgonjwa katika kituo cha afya mara moja."
  },
  medications: [],
  "test-recommendations": [
    {
      id: "full-blood-picture-fbp",
      en: "Full Blood Picture (FBP)"
    },
    {
      id: "spinal-fluid-tap",
      en: "Spinal Fluid Tap"
    }
  ],
  "other-recommendations": {
    en: "",
    sw: ""
  }
};
var epilepsy2 = {
  "refer-and-triage-level": {
    en: "Refer the patient to a health facility immediately.",
    sw: "Mpeleke mgonjwa katika kituo cha afya mara moja."
  },
  medications: [],
  "test-recommendations": [],
  "other-recommendations": {
    en: "Provide epilepsy first aid to the patient.",
    sw: "Toa msaada wa kwanza wa ugonjwa wa kifafa kwa mgonjwa."
  }
};
var dehydration2 = {
  "refer-and-triage-level": {
    en: "The patient can recieve home based care.",
    sw: "Mgonjwa anaweza kupokea huduma ya nyumbani."
  },
  medications: [
    {
      id: "oral-rehydration-salts-for-2-years-50-100-ml-after-each-loose-stool-for-2-years-100-200-ml-after-each-loose-stool-alternatively-give-ors-every-4-hours",
      en: "Oral Rehydration Salts, for <2 years, 50-100ml after each loose stool. For >2 years, 100-200ml after each loose stool. Alternatively, give ORS every 4 hours. "
    },
    {
      id: "fluids",
      en: "Fluids"
    },
    {
      id: "zinc-supplements-children-20-mg-per-day-for-14-days-10-mg-per-day-if-less-than-2-years",
      en: "Zinc supplements (children), 20mg per day for 14 days (10mg per day if less than 2 years)"
    }
  ],
  "test-recommendations": [],
  "other-recommendations": {
    en: "If the patient's symptoms are severe, recommend that they get treated at the hospital. If the child is breastfeeding, continue breastfeeding.",
    sw: "Ikiwa dalili za mgonjwa ni kali, pendekeza watibiwe hospitalini. Ikiwa mtoto ananyonyesha, endelea kunyonyesha."
  }
};
var hypertension = {
  "refer-and-triage-level": {
    en: "Refer the patient to a health facility immediately.",
    sw: "Mpeleke mgonjwa katika kituo cha afya mara moja."
  },
  medications: [],
  "test-recommendations": [
    {
      id: "blood-pressure",
      en: "Blood Pressure"
    }
  ],
  "other-recommendations": {
    en: "",
    sw: ""
  }
};
var scabies2 = {
  "refer-and-triage-level": {
    en: "The patient can recieve home based care.",
    sw: "Mgonjwa anaweza kupokea huduma ya nyumbani."
  },
  medications: [
    {
      id: "scaboma-or-benzyl-benzoate-bbe-25-topical-cream",
      en: "Scaboma or Benzyl benzoate (BBE - 25%) topical cream"
    }
  ],
  "test-recommendations": [],
  "other-recommendations": {
    en: "After bathing, the patient should apply cream to the whole body - except the face and head - and should stay 24 hours without bathing. Repeat the spray on the third and fifth day.",
    sw: "Baada ya kuoga, mgonjwa apake mwili mzima isipokuwa uso na kichwa na mgonjwa akae saa 24 bila kuoga. Rudia kupaka dawa siku ya tatu na ya tano."
  }
};
var gastroenteritis2 = {
  "refer-and-triage-level": {
    en: "The patient can recieve home based care. They should seek medical attention if they experience excessive pain, excessive vomitting or diarrhoea, if there are any emergency signs, or if the patient is pregnant",
    sw: "Mgonjwa anaweza kupokea huduma ya nyumbani. Wanapaswa kutafuta matibabu ikiwa wanapata maumivu kupindukia, kutapika kupita kiasi au kuharisha, ikiwa kuna dalili zozote za dharura, au ikiwa mgonjwa ni mjamzito"
  },
  medications: [
    {
      id: "oral-rehydration-salts-or-fluids-if-dehydrated",
      en: "Oral Rehydration Salts or Fluids (if dehydrated)"
    }
  ],
  "test-recommendations": [
    {
      id: "full-blood-picture-fbp",
      en: "Full Blood Picture (FBP)"
    }
  ],
  "other-recommendations": {
    en: "Recommend that the patient rests and avoids eating milk-based foods.",
    sw: "Pendekeza kwamba mgonjwa anapumzika na aepuka kula vyakula vyenye maziwa."
  }
};
var heat_rash2 = {
  "refer-and-triage-level": {
    en: "The patient can recieve home based care.",
    sw: "Mgonjwa anaweza kupokea huduma ya nyumbani."
  },
  medications: [
    {
      id: "topical-corticosteroid-cream-if-severe-apply-2-3-times-a-day-on-the-affected-areas",
      en: "Topical Corticosteroid Cream (if severe), apply 2-3 times a day on the affected areas",
      sw: "Cream ya juu ya Corticosteroid (ikiwa kali), tumia mara 2-3 kwa siku kwenye maeneo yaliyoathiriwa"
    }
  ],
  "test-recommendations": [],
  "other-recommendations": {
    en: "Recommend that the patient wear cool cotton clothing and that they ventilate their room.",
    sw: "Pendekeza kwamba mgonjwa avae nguo za pamba zenye baridi na kwamba kuwepo na hewa ya kutosha chumba chake."
  }
};
var stomatitis2 = {
  "refer-and-triage-level": {
    en: "Refer the patient to a health facility. They should seek care within 2 days.",
    sw: "Mpeleke mgonjwa katika kituo cha afya. Wanapaswa kutafuta huduma ndani ya siku 2."
  },
  medications: [],
  "test-recommendations": [
    {
      id: "full-blood-picture-fbp",
      en: "Full Blood Picture (FBP)"
    }
  ],
  "other-recommendations": {
    en: "",
    sw: ""
  }
};
var bacteremia2 = {
  "refer-and-triage-level": {
    en: "Refer the patient to a health facility immediately.",
    sw: "Mpeleke mgonjwa katika kituo cha afya mara moja."
  },
  medications: [],
  "test-recommendations": [
    {
      id: "full-blood-picture-fbp",
      en: "Full Blood Picture (FBP)"
    },
    {
      id: "blood-culture",
      en: "Blood Culture"
    }
  ],
  "other-recommendations": {
    en: "",
    sw: ""
  }
};
var cephalohematoma2 = {
  "refer-and-triage-level": {
    en: "The patient can recieve home based care.",
    sw: "Mgonjwa anaweza kupokea huduma ya nyumbani."
  },
  medications: [
    {
      id: "",
      en: "-"
    }
  ],
  "test-recommendations": [],
  "other-recommendations": {
    en: "Provide counseling that the condition will likely go away on it's own. Recommend that the patient seeks medical care if the symptoms do not resolve.",
    sw: "Toa ushauri kwamba hali hiyo itaenda yenyewe. Pendekeza kwamba mgonjwa atafute huduma ya matibabu ikiwa dalili hazitatatua."
  }
};
var tinea_corporis2 = {
  "refer-and-triage-level": {
    en: "The patient can recieve home based care.",
    sw: "Mgonjwa anaweza kupokea huduma ya nyumbani."
  },
  medications: [
    {
      id: "fluconzaole-for-adults-150-mg-once-a-week-for-4-weeks-for-children-7-mg-kg-once-a-week-for-4-weeks",
      en: "Fluconzaole, for adults: 150mg once a week for 4 weeks. For children: 7mg/kg once a week for 4 weeks"
    }
  ],
  "test-recommendations": [],
  "other-recommendations": {
    en: "",
    sw: ""
  }
};
var impetigo = {
  "refer-and-triage-level": {
    en: "Refer the patient to a health facility immediately.",
    sw: "Mpeleke mgonjwa katika kituo cha afya mara moja."
  },
  medications: [],
  "test-recommendations": [
    {
      id: "full-blood-picture-fbp",
      en: "Full Blood Picture (FBP)"
    }
  ],
  "other-recommendations": {
    en: "",
    sw: ""
  }
};
var umbilical_cord_sepsis = {
  "refer-and-triage-level": {
    en: "Refer the patient to a health facility immediately.",
    sw: "Mpeleke mgonjwa katika kituo cha afya mara moja."
  },
  medications: [],
  "test-recommendations": [
    {
      id: "full-blood-picture-fbp",
      en: "Full Blood Picture (FBP)"
    },
    {
      id: "c-reactive-protein-crp",
      en: "C-reactive protein (CRP)"
    }
  ],
  "other-recommendations": {
    en: "",
    sw: ""
  }
};
var sepsis = {
  "refer-and-triage-level": {
    en: "Refer the patient to a health facility immediately.",
    sw: "Mpeleke mgonjwa katika kituo cha afya mara moja."
  },
  medications: [],
  "test-recommendations": [
    {
      id: "full-blood-picture-fbp",
      en: "Full Blood Picture (FBP)"
    },
    {
      id: "blood-culture",
      en: "Blood Culture"
    }
  ],
  "other-recommendations": {
    en: "",
    sw: ""
  }
};
var pediatric_hiv_aids = {
  "refer-and-triage-level": {
    en: "Refer the patient to a health facility immediately.",
    sw: "Mpeleke mgonjwa katika kituo cha afya mara moja."
  },
  medications: [],
  "test-recommendations": [
    {
      id: "hiv-rapid-test",
      en: "HIV Rapid Test"
    },
    {
      id: "hiv-pcr",
      en: "HIV PCR"
    }
  ],
  "other-recommendations": {
    en: "Provide counseling to the patient on prevention methods, infection, and continuation of treatment.",
    sw: "Toa ushauri kwa mgonjwa juu ya njia za kuzuia maambukizi, na kuendelea na matibabu."
  }
};
var hepatitis_b2 = {
  "refer-and-triage-level": {
    en: "Refer the patient to a health facility. They should seek care within 2 days. They should seek medical care immediately if there are signs of liver failure.",
    sw: "Mpeleke mgonjwa katika kituo cha afya. Wanapaswa kutafuta huduma ndani ya siku 2. Wanapaswa kutafuta huduma ya matibabu mara moja ikiwa kuna dalili za kufeli kwa ini."
  },
  medications: [],
  "test-recommendations": [
    {
      id: "full-blood-picture-fbp",
      en: "Full Blood Picture (FBP)"
    },
    {
      id: "hepatitis-b-surface-antigen-h-bs-ag",
      en: "Hepatitis B Surface Antigen (HBsAg)"
    },
    {
      id: "hepatitis-b-pcr-hbv-dna",
      en: "Hepatitis B PCR (HBV DNA)"
    },
    {
      id: "hepatitis-b-surface-antibody-hep-bs-ab",
      en: "Hepatitis B Surface Antibody (HepBsAb)"
    },
    {
      id: "liver-function-tests",
      en: "Liver Function Tests"
    },
    {
      id: "hiv-viral-load",
      en: "HIV Viral Load"
    }
  ],
  "other-recommendations": {
    en: "",
    sw: ""
  }
};
var toxoplasmosis2 = {
  "refer-and-triage-level": {
    en: "Refer the patient to a health facility immediately.",
    sw: "Mpeleke mgonjwa katika kituo cha afya mara moja."
  },
  medications: [],
  "test-recommendations": [
    {
      id: "cd-4-count",
      en: "CD4 Count"
    },
    {
      id: "anti-toxoplasma-ig-g-serology",
      en: "Anti-Toxoplasma IgG Serology"
    },
    {
      id: "mri-or-ct",
      en: "MRI or CT"
    }
  ],
  "other-recommendations": {
    en: "",
    sw: ""
  }
};
var next_steps_extended_default = {
  "complicated-malaria": complicated_malaria,
  bronchiolitis: bronchiolitis2,
  "otitis-externa": otitis_externa2,
  "supprative-otitis-media": supprative_otitis_media2,
  "pneumocystis-pneumonia": pneumocystis_pneumonia2,
  "ectopic-pregnancy": ectopic_pregnancy2,
  "pelvic-inflammatory-disease": pelvic_inflammatory_disease2,
  "genital-warts": genital_warts2,
  malaria: malaria2,
  pneumonia: pneumonia2,
  tuberculosis,
  coryza: coryza2,
  sinusitis: sinusitis2,
  bronchitis: bronchitis2,
  gastritis: gastritis2,
  "otitis-media": otitis_media2,
  trichuriasis: trichuriasis2,
  conjunctivitis: conjunctivitis2,
  "urinary-tract-infection-uti": urinary_tract_infection_uti,
  dysentry: dysentry2,
  malnutrition: malnutrition2,
  ascariasis,
  asthma: asthma2,
  influenza: influenza2,
  tonsilitis: tonsilitis2,
  laryngitis: laryngitis2,
  "chronic-obstructive-pulmonary-disease-copd": chronic_obstructive_pulmonary_disease_copd,
  syphillis: syphillis2,
  gonorrhea: gonorrhea2,
  "hiv-aids": hiv_aids2,
  "bacterial-vaginosis": bacterial_vaginosis2,
  "vulvovaginal-candidiasis": vulvovaginal_candidiasis2,
  trichomoniasis: trichomoniasis2,
  "acute-watery-diarrhoea": acute_watery_diarrhoea2,
  chlamydia: chlamydia2,
  "genital-herpes": genital_herpes,
  "human-papillomavirus-hpv": human_papillomavirus_hpv,
  anaemia,
  "oral-thrush": oral_thrush2,
  typhoid: typhoid2,
  cholera: cholera2,
  meningitis: meningitis2,
  epilepsy: epilepsy2,
  dehydration: dehydration2,
  hypertension,
  scabies: scabies2,
  gastroenteritis: gastroenteritis2,
  "heat-rash": heat_rash2,
  stomatitis: stomatitis2,
  bacteremia: bacteremia2,
  cephalohematoma: cephalohematoma2,
  "tinea-corporis": tinea_corporis2,
  impetigo,
  "umbilical-cord-sepsis": umbilical_cord_sepsis,
  sepsis,
  "pediatric-hiv-aids": pediatric_hiv_aids,
  "hepatitis-b": hepatitis_b2,
  toxoplasmosis: toxoplasmosis2
};

// src/nextSteps.ts
function basic(conditionsFn, medicationsFn, labTestsFn) {
  const meds = medicationsFn();
  const labTests = labTestsFn();
  const _vals = {};
  Object.entries(next_steps_basic_default).map((v) => {
    const [id, val] = v;
    return __spreadValues({
      id
    }, val);
  }).filter((s) => conditionsFn().includes(s.id)).map((s) => {
    const d = {};
    d["id"] = s.id;
    d["refer"] = s.refer;
    d["triageLevel"] = s["triage-level"];
    d["referAndTriageLevel"] = s["refer-and-triage-level"];
    d["medications"] = s["medications"].filter((f) => meds.includes(f.id)).map((f) => ({ id: f.id, text: f.text }));
    d["testRecommendations"] = s["test-recommendations"].filter((f) => labTests.includes(f.id)).map((f) => ({ id: f.id, text: f.text }));
    const other = s["other-recommendations"];
    if (other !== void 0) {
      d["otherRecommendations"] = other;
    }
    return d;
  }).forEach((s) => {
    const _a = s, { id } = _a, other = __objRest(_a, ["id"]);
    _vals[id] = other;
  });
  return _vals;
}
function extended(conditionsFn, medicationsFn, labTestsFn) {
  const meds = medicationsFn();
  const labTests = labTestsFn();
  const basicInfo = basic(conditionsFn, medicationsFn, labTestsFn);
  const _vals = {};
  const _localeVals = Object.entries(next_steps_extended_default).map((v) => {
    const [id, val] = v;
    return __spreadValues({
      id
    }, val);
  }).filter((s) => conditionsFn().includes(s.id)).map((s) => {
    const d = {};
    d["id"] = s.id;
    d["referAndTriageLevel"] = s["refer-and-triage-level"];
    d["medications"] = s["medications"].filter((t) => meds.includes(t.id));
    d["testRecommendations"] = s["test-recommendations"].filter((t) => labTests.includes(t.id));
    const other = s["other-recommendations"];
    if (other !== void 0) {
      d["otherRecommendations"] = other;
    }
    return d;
  });
  _localeVals.forEach((s) => {
    const _a = s, { id } = _a, other = __objRest(_a, ["id"]);
    _vals[id] = __spreadValues(__spreadValues({}, basicInfo[id]), other);
  });
  return {
    all: _vals,
    locale: (lang) => {
      const _vals2 = {};
      _localeVals.map((lv) => {
        const nlv = { id: lv.id };
        nlv["referAndTriageLevel"] = lv["referAndTriageLevel"][lang];
        nlv["medications"] = lv["medications"].map((s) => s[lang]).filter((s) => s !== void 0);
        nlv["testRecommendations"] = lv["testRecommendations"].map((s) => s[lang]).filter((s) => s !== void 0);
        return nlv;
      }).forEach((s) => {
        const _a = s, { id } = _a, other = __objRest(_a, ["id"]);
        _vals2[id] = __spreadValues(__spreadValues({}, basicInfo[id]), other);
      });
      return _vals2;
    }
  };
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  basic,
  extended
});
