var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __hasOwnProp = Object.prototype.hasOwnProperty;
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

// src/recommended.ts
var recommended_exports = {};
__export(recommended_exports, {
  labTests: () => labTests,
  medications: () => medications
});
module.exports = __toCommonJS(recommended_exports);

// data/core/lab-tests.json
var anti_toxoplasma_ig_g_serology = "Anti-Toxoplasma IgG Serology";
var blood_culture = "Blood Culture";
var blood_pressure = "Blood Pressure";
var c_reactive_protein_crp = "C-reactive protein (CRP)";
var cd_4_count = "CD4 Count";
var chest_x_ray_cxr = "Chest X-Ray (CXR)";
var ct_scan = "CT Scan";
var electrolytes_test = "Electrolytes Test";
var full_blood_picture_fbp = "Full Blood Picture (FBP)";
var gene_xpert = "GeneXpert";
var h_pylori_stool_test = "H-pylori Stool Test";
var hepatitis_b_pcr_hbv_dna = "Hepatitis B PCR (HBV DNA)";
var hepatitis_b_surface_antibody_hep_bs_ab = "Hepatitis B Surface Antibody (HepBsAb)";
var hepatitis_b_surface_antigen_h_bs_ag = "Hepatitis B Surface Antigen (HBsAg)";
var hiv_pcr = "HIV PCR";
var hiv_rapid_test = "HIV Rapid Test";
var hiv_viral_load = "HIV Viral Load";
var hpv_screening = "HPV Screening";
var kidney_function_tests = "Kidney Function Tests";
var liver_function_tests = "Liver Function Tests";
var microscopy = "Microscopy";
var microscopy_of_sputum = "Microscopy of Sputum";
var mrdt = "MRDT";
var mri = "MRI";
var pap_smear = "Pap Smear";
var pcr_test = "PCR Test";
var pelvic_exam = "Pelvic Exam";
var pregnancy_test = "Pregnancy Test";
var spinal_fluid_tap = "Spinal Fluid Tap";
var sputum_culture = "Sputum Culture";
var stool_analysis = "Stool Analysis";
var syphilis_test = "Syphilis Test";
var ultrasound = "Ultrasound";
var ultrasound_of_pelvis = "Ultrasound of Pelvis";
var urinalysis = "Urinalysis";
var lab_tests_default = {
  "anti-toxoplasma-ig-g-serology": anti_toxoplasma_ig_g_serology,
  "blood-culture": blood_culture,
  "blood-pressure": blood_pressure,
  "c-reactive-protein-crp": c_reactive_protein_crp,
  "cd-4-count": cd_4_count,
  "chest-x-ray-cxr": chest_x_ray_cxr,
  "ct-scan": ct_scan,
  "electrolytes-test": electrolytes_test,
  "full-blood-picture-fbp": full_blood_picture_fbp,
  "gene-xpert": gene_xpert,
  "h-pylori-stool-test": h_pylori_stool_test,
  "hepatitis-b-pcr-hbv-dna": hepatitis_b_pcr_hbv_dna,
  "hepatitis-b-surface-antibody-hep-bs-ab": hepatitis_b_surface_antibody_hep_bs_ab,
  "hepatitis-b-surface-antigen-h-bs-ag": hepatitis_b_surface_antigen_h_bs_ag,
  "hiv-pcr": hiv_pcr,
  "hiv-rapid-test": hiv_rapid_test,
  "hiv-viral-load": hiv_viral_load,
  "hpv-screening": hpv_screening,
  "kidney-function-tests": kidney_function_tests,
  "liver-function-tests": liver_function_tests,
  microscopy,
  "microscopy-of-sputum": microscopy_of_sputum,
  mrdt,
  mri,
  "pap-smear": pap_smear,
  "pcr-test": pcr_test,
  "pelvic-exam": pelvic_exam,
  "pregnancy-test": pregnancy_test,
  "spinal-fluid-tap": spinal_fluid_tap,
  "sputum-culture": sputum_culture,
  "stool-analysis": stool_analysis,
  "syphilis-test": syphilis_test,
  ultrasound,
  "ultrasound-of-pelvis": ultrasound_of_pelvis,
  urinalysis
};

// data/core/medications-addo.json
var acetaminophen = "Acetaminophen";
var acyclovir = "Acyclovir";
var albendazole = "Albendazole";
var aminophylline_injection = "Aminophylline injection";
var amoxicillin_capsules = "Amoxicillin capsules";
var amoxicillin_oral_suspension = "Amoxicillin oral suspension";
var amoxicillin_clavulanate_amoxyclav = "Amoxicillin/Clavulanate (Amoxyclav)";
var ampiclox = "Ampiclox";
var annusol_suppositories = "Annusol suppositories";
var anti_fungal_pessaries = "Anti-fungal pessaries";
var antihistamines = "Antihistamines";
var artemether_lumefantrine_alu = "Artemether/ lumefantrine (ALU)";
var azithromycin = "Azithromycin";
var bendrofluazide = "Bendrofluazide";
var benzyl_benzoate = "Benzyl benzoate";
var benzyl_penicillin_powder_for_injection = "Benzyl penicillin powder for injection";
var bisacodyl_tablets = "Bisacodyl tablets";
var bronchodilators = "Bronchodilators";
var cephalexin = "Cephalexin";
var cetrizine = "Cetrizine";
var cetrizine_hydrochloride_syrup = "Cetrizine hydrochloride syrup";
var cetrizine_hydrochloride_tablets = "Cetrizine hydrochloride tablets";
var chloramphenicol_eye_drops_ointment = "Chloramphenicol eye drops/ointment";
var ciprofloxacin = "Ciprofloxacin";
var clindamycin = "Clindamycin";
var cloxacillin = "Cloxacillin";
var co_trimoxazole_suspension = "Co-trimoxazole suspension";
var condoms = "Condoms";
var corticosteroids = "Corticosteroids";
var cough_suppressants = "Cough suppressants";
var deworming_tablets = "Deworming tablets";
var dextrose_5 = "Dextrose 5%";
var diazepam = "Diazepam";
var diclofenac_sodium_tablets = "Diclofenac sodium tablets";
var diuretics = "Diuretics";
var doxycycline_capsules_tablets = "Doxycycline capsules/tablets";
var ear_drops = "Ear drops";
var ergometrine_injection = "Ergometrine injection";
var erythromycin = "Erythromycin";
var fluconazole = "Fluconazole";
var fluids = "Fluids";
var folic_acid_tabs = "Folic acid tabs";
var gentamycin_eyedrops = "Gentamycin eyedrops";
var hydrocortisone_cream = "Hydrocortisone cream";
var ibuprofen = "Ibuprofen";
var imiquimod = "Imiquimod";
var iron_supplements = "Iron Supplements";
var levofloxacin = "Levofloxacin";
var metronidazole = "Metronidazole";
var nasal_decongestant = "Nasal decongestant";
var nonsteroidal_anti_inflammatory_drugs_nsaids = "Nonsteroidal anti-inflammatory drugs (NSAIDS)";
var normal_saline_injection = "Normal Saline injection";
var nyastatin_oral_suspension = "Nyastatin oral suspension";
var nystatin_oral_suspension = "Nystatin oral suspension";
var nystatin_pessaries = "Nystatin pessaries";
var nystatin_skin_ointment = "Nystatin skin ointment";
var nystatin_tablets = "Nystatin tablets";
var oral_contraceptive_pills = "Oral contraceptive pills";
var oxytetracycline_hydrochloride_eye_ointment = "Oxytetracycline hydrochloride eye ointment";
var phenoxymethyl_penicillin_suspension = "Phenoxymethyl Penicillin suspension";
var phenoxymethyl_penicillin_tablets = "Phenoxymethyl Penicillin tablets";
var phenytoin = "Phenytoin";
var piperazine_and_its_salts_in_oral_dosage_forms = "Piperazine and its salts in oral dosage forms";
var procaine_penicillin_fortified = "Procaine Penicillin Fortified";
var promethazine_injection = "Promethazine injection";
var propranolol = "Propranolol";
var quinine_injection = "Quinine injection";
var quinine_tablets = "Quinine tablets";
var salicylic_acid_ointment = "Salicylic acid ointment";
var scaboma = "Scaboma";
var silver_sulfadiazine_cream = "Silver sulfadiazine cream";
var sulfadoxine_pyrimethamine = "Sulfadoxine\u2013pyrimethamine";
var topical_corticosteroid_cream = "Topical corticosteroid cream";
var topical_skin_cream = "Topical skin cream";
var vitamin_c = "Vitamin C";
var vitamin_d = "Vitamin D";
var water_for_injection = "Water for injection";
var zinc = "Zinc";
var medications_addo_default = {
  acetaminophen,
  acyclovir,
  albendazole,
  "aminophylline-injection": aminophylline_injection,
  "amoxicillin-capsules": amoxicillin_capsules,
  "amoxicillin-oral-suspension": amoxicillin_oral_suspension,
  "amoxicillin-clavulanate-amoxyclav": amoxicillin_clavulanate_amoxyclav,
  ampiclox,
  "annusol-suppositories": annusol_suppositories,
  "anti-fungal-pessaries": anti_fungal_pessaries,
  antihistamines,
  "artemether-lumefantrine-alu": artemether_lumefantrine_alu,
  azithromycin,
  bendrofluazide,
  "benzyl-benzoate": benzyl_benzoate,
  "benzyl-penicillin-powder-for-injection": benzyl_penicillin_powder_for_injection,
  "bisacodyl-tablets": bisacodyl_tablets,
  bronchodilators,
  cephalexin,
  cetrizine,
  "cetrizine-hydrochloride-syrup": cetrizine_hydrochloride_syrup,
  "cetrizine-hydrochloride-tablets": cetrizine_hydrochloride_tablets,
  "chloramphenicol-eye-drops-ointment": chloramphenicol_eye_drops_ointment,
  ciprofloxacin,
  clindamycin,
  cloxacillin,
  "co-trimoxazole-suspension": co_trimoxazole_suspension,
  condoms,
  corticosteroids,
  "cough-suppressants": cough_suppressants,
  "deworming-tablets": deworming_tablets,
  "dextrose-5": dextrose_5,
  diazepam,
  "diclofenac-sodium-tablets": diclofenac_sodium_tablets,
  diuretics,
  "doxycycline-capsules-tablets": doxycycline_capsules_tablets,
  "ear-drops": ear_drops,
  "ergometrine-injection": ergometrine_injection,
  erythromycin,
  fluconazole,
  fluids,
  "folic-acid-tabs": folic_acid_tabs,
  "gentamycin-eyedrops": gentamycin_eyedrops,
  "hydrocortisone-cream": hydrocortisone_cream,
  ibuprofen,
  imiquimod,
  "iron-supplements": iron_supplements,
  levofloxacin,
  metronidazole,
  "nasal-decongestant": nasal_decongestant,
  "nonsteroidal-anti-inflammatory-drugs-nsaids": nonsteroidal_anti_inflammatory_drugs_nsaids,
  "normal-saline-injection": normal_saline_injection,
  "nyastatin-oral-suspension": nyastatin_oral_suspension,
  "nystatin-oral-suspension": nystatin_oral_suspension,
  "nystatin-pessaries": nystatin_pessaries,
  "nystatin-skin-ointment": nystatin_skin_ointment,
  "nystatin-tablets": nystatin_tablets,
  "oral-contraceptive-pills": oral_contraceptive_pills,
  "oxytetracycline-hydrochloride-eye-ointment": oxytetracycline_hydrochloride_eye_ointment,
  "phenoxymethyl-penicillin-suspension": phenoxymethyl_penicillin_suspension,
  "phenoxymethyl-penicillin-tablets": phenoxymethyl_penicillin_tablets,
  phenytoin,
  "piperazine-and-its-salts-in-oral-dosage-forms": piperazine_and_its_salts_in_oral_dosage_forms,
  "procaine-penicillin-fortified": procaine_penicillin_fortified,
  "promethazine-injection": promethazine_injection,
  propranolol,
  "quinine-injection": quinine_injection,
  "quinine-tablets": quinine_tablets,
  "salicylic-acid-ointment": salicylic_acid_ointment,
  scaboma,
  "silver-sulfadiazine-cream": silver_sulfadiazine_cream,
  "sulfadoxine-pyrimethamine": sulfadoxine_pyrimethamine,
  "topical-corticosteroid-cream": topical_corticosteroid_cream,
  "topical-skin-cream": topical_skin_cream,
  "vitamin-c": vitamin_c,
  "vitamin-d": vitamin_d,
  "water-for-injection": water_for_injection,
  zinc
};

// data/core/medications-general-sales.json
var acetylsalicylic_acid_and_its_salts = "Acetylsalicylic acid and its salts";
var acetylsalicylic_acid_paracetamol_caffeine_combinations = "Acetylsalicylic acid/paracetamol/caffeine combinations";
var aluminium_hydroxide = "Aluminium Hydroxide";
var arachis_oil_preparations_for_sore_mouth = "Arachis Oil preparations (for sore mouth)";
var ayuverdic_ointments = "Ayuverdic ointments";
var benzocaine_preparation_not_for_children = "Benzocaine preparation (not for children)";
var camphor_preparations = "Camphor Preparations";
var carmellose_preparations = "Carmellose preparations";
var chlorinate_lime_eusol_solution = "Chlorinate Lime (EUSOL) solution";
var clove_oil = "Clove oil";
var dental_floss = "Dental floss";
var dequalinium_prepartions = "Dequalinium Prepartions";
var diclofenac_ointment_cream_or_gel = "Diclofenac ointment, cream or gel";
var eucalyptus = "Eucalyptus";
var eucalyptus_oil_preparations = "Eucalyptus oil preparations";
var eucalyptus_products = "Eucalyptus products";
var eugenol = "Eugenol";
var first_aid_ointment = "First Aid Ointment";
var gentian_violet_solution = "Gentian violet solution";
var ibuprofen_ephedrine_combinations = "Ibuprofen/Ephedrine combinations";
var iodine_solution = "Iodine solution";
var lozenges = "Lozenges";
var magnesium_trisillicate = "Magnesium trisillicate";
var menthol = "Menthol";
var menthol_products = "Menthol Products";
var mentholatum_preparations = "Mentholatum preparations";
var methyl_salicylate_products = "Methyl salicylate products";
var mouth_washes = "Mouth washes";
var oral_rehydration_salts_ors = "Oral Rehydration Salts (ORS)";
var paracetamol_in_immediate_release_tablets_capsules_or_liquid = "Paracetamol (in immediate release tablets, capsules or liquid)";
var simethicone = "Simethicone";
var tonic = "Tonic";
var undecylenic_acid_preparations = "Undecylenic acid preparations";
var vitamins_other = "Vitamins (Other)";
var whitfields_ointment = "Whitfields ointment";
var medications_general_sales_default = {
  "acetylsalicylic-acid-and-its-salts": acetylsalicylic_acid_and_its_salts,
  "acetylsalicylic-acid-paracetamol-caffeine-combinations": acetylsalicylic_acid_paracetamol_caffeine_combinations,
  "aluminium-hydroxide": aluminium_hydroxide,
  "arachis-oil-preparations-for-sore-mouth": arachis_oil_preparations_for_sore_mouth,
  "ayuverdic-ointments": ayuverdic_ointments,
  "benzocaine-preparation-not-for-children": benzocaine_preparation_not_for_children,
  "camphor-preparations": camphor_preparations,
  "carmellose-preparations": carmellose_preparations,
  "chlorinate-lime-eusol-solution": chlorinate_lime_eusol_solution,
  "clove-oil": clove_oil,
  "dental-floss": dental_floss,
  "dequalinium-prepartions": dequalinium_prepartions,
  "diclofenac-ointment-cream-or-gel": diclofenac_ointment_cream_or_gel,
  eucalyptus,
  "eucalyptus-oil-preparations": eucalyptus_oil_preparations,
  "eucalyptus-products": eucalyptus_products,
  eugenol,
  "first-aid-ointment": first_aid_ointment,
  "gentian-violet-solution": gentian_violet_solution,
  "ibuprofen-ephedrine-combinations": ibuprofen_ephedrine_combinations,
  "iodine-solution": iodine_solution,
  lozenges,
  "magnesium-trisillicate": magnesium_trisillicate,
  menthol,
  "menthol-products": menthol_products,
  "mentholatum-preparations": mentholatum_preparations,
  "methyl-salicylate-products": methyl_salicylate_products,
  "mouth-washes": mouth_washes,
  "oral-rehydration-salts-ors": oral_rehydration_salts_ors,
  "paracetamol-in-immediate-release-tablets-capsules-or-liquid": paracetamol_in_immediate_release_tablets_capsules_or_liquid,
  simethicone,
  tonic,
  "undecylenic-acid-preparations": undecylenic_acid_preparations,
  "vitamins-other": vitamins_other,
  "whitfields-ointment": whitfields_ointment
};

// src/_utils.ts
function build(c) {
  return Object.entries(c).map((c2) => {
    const [id, name] = c2;
    return { id, name };
  }).sort((a, b) => a.name.localeCompare(b.name));
}

// src/recommended.ts
var labTests = {
  fromId: (id) => ({ id, name: lab_tests_default[id] }),
  ids: () => Object.keys(lab_tests_default).sort((a, b) => a.localeCompare(b)),
  values: () => build(lab_tests_default)
};
var addo = {
  fromId: (id) => ({ id, name: medications_addo_default[id] }),
  ids: () => Object.keys(medications_addo_default).sort((a, b) => a.localeCompare(b)),
  values: () => build(medications_addo_default)
};
var gs = {
  ids: () => Object.keys(medications_general_sales_default).sort((a, b) => a.localeCompare(b)),
  fromId: (id) => ({ id, name: medications_general_sales_default[id] }),
  values: () => build(medications_general_sales_default)
};
var medications = {
  addo,
  gs,
  all: {
    ids: () => [...addo.ids(), ...gs.ids()].sort((a, b) => a.localeCompare(b)),
    values: () => [...addo.values(), ...gs.values()].sort((a, b) => a.name.localeCompare(b.name))
  }
};
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  labTests,
  medications
});
