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

// src/investigations.ts
var investigations_exports = {};
__export(investigations_exports, {
  investigation: () => investigation
});
module.exports = __toCommonJS(investigations_exports);

// data/core/investigation-name-map.json
var options = "options";
var notes = "notes";
var color = "Color";
var appearance = "Appearance";
var specific_gravity = "Specific gravity";
var p_h = "pH";
var glucose = "Glucose";
var biliruben = "Biliruben";
var ketones = "Ketones";
var occult_blood = "Occult Blood";
var protein = "Protein";
var nitrite = "Nitrite";
var leukocyte_esterase = "Leukocyte Esterase";
var urine_wbc = "Urine WBC ";
var urine_rbc = "Urine RBC";
var urine_squamous_epithelial_cells = "Urine Squamous Epithelial Cells";
var ascorbic_acid = "Ascorbic Acid";
var csf_pressure = "CSF - Pressure";
var csf_cell_count = "CSF - Cell Count";
var csf_glucose = "CSF - Glucose";
var csf_protein = "CSF - Protein";
var bun_blood_urea_nitrogen = "BUN (Blood Urea Nitrogen)";
var creatinine = "Creatinine";
var glucose_plasma_fasting = "Glucose, plasma\u2014fasting";
var albumin = "Albumin";
var potassium_k = "Potassium (K+)";
var sodium_na = "Sodium (Na+)";
var magnesium_mg = "Magnesium (Mg+)";
var chloride_cl = "Chloride (Cl-)";
var co_2_carbon_dioxide_or_bicarbonate = "CO2 (Carbon dioxide or bicarbonate)";
var phosphorus = "Phosphorus";
var calcium_ca = "Calcium (Ca+)";
var aminotransferase_alanine_alt = "Aminotransferase, alanine (ALT)";
var aminotransferase_aspartate_ast = "Aminotransferase, aspartate (AST)";
var alkaline_phosphatase_alp = "Alkaline phosphatase (ALP)";
var total_bilirubin = "Total Bilirubin";
var direct_bilirubin = "Direct Bilirubin";
var haemoglobin_hb = "Haemoglobin (HB)";
var white_cell_count_wbc = "White Cell Count (WBC)";
var platelet_count_plt = "Platelet Count (PLT)";
var red_blood_count_rbc = "Red Blood Count (RBC)";
var mean_cell_volume_mcv = "Mean Cell Volume (MCV)";
var packed_cell_volume_pcv_haematocrit_hct = "Packed Cell Volume (PCV)/Haematocrit (HCT)";
var mean_cell_haemoglobin_mch = "Mean Cell Haemoglobin (MCH)";
var mean_cell_haemoglobin_concentration_mchc = "Mean Cell Haemoglobin Concentration (MCHC)";
var neutrophil_count = "Neutrophil Count";
var lymphocyte_count = "Lymphocyte Count";
var monocyte_count = "Monocyte Count";
var eosinophil_count = "Eosinophil Count";
var basophil_count = "Basophil Count";
var mrdt_rapid_test = "MRDT (Rapid Test)";
var malaria_blood_slide = "Malaria Blood Slide";
var cd_4_count = "CD4 Count";
var viral_load = "Viral load";
var hiv_rapid_test = "HIV Rapid Test";
var cr_ag = "CrAg+";
var hepatitis_b_surface_antigen_h_bs_ag = "Hepatitis B Surface Antigen (HBsAg)";
var hepatitis_b_e_antigen_hbe_ag = "Hepatitis B e-Antigen (HbeAg)";
var x_ray = "X Ray";
var mri = "MRI";
var ct_scan = "CT Scan";
var xpert_mtb_rif = "Xpert MTB/ RIF";
var mantoux_ppd = "Mantoux / PPD";
var sputum_culture = "Sputum Culture";
var sputum_smear = "Sputum Smear";
var sputum_pcr = "Sputum PCR";
var csf_culture = "CSF Culture";
var csf_india_ink_staining = "CSF: India Ink Staining";
var blood_culture = "Blood Culture";
var __2_beta_d_glucan = "1-2-Beta-D-Glucan";
var urinalysis = "Urinalysis";
var cerebrospinal_fluid_test_lumbar_puncture = "Cerebrospinal Fluid Test (Lumbar Puncture) ";
var metabolic_panel = "Metabolic Panel";
var liver_function_tests = "Liver function tests";
var full_blood_picture = "Full Blood Picture";
var hpv_screening = "HPV Screening";
var h_pylori_stool_test = "H-Pylori Stool Test";
var systolic_blood_pressure = "Systolic Blood Pressure";
var diastolic_blood_pressure = "Diastolic Blood Pressure";
var lactate_dehydrogenase_ldh = "Lactate Dehydrogenase (LDH)";
var pregnancy_test = "Pregnancy Test";
var oxygen_saturation = "Oxygen Saturation";
var erythrocyte_sedimentation_rate_esr = "Erythrocyte Sedimentation Rate (ESR)";
var iron_serum = "Iron, serum";
var c_reactive_protein = "C-Reactive Protein";
var investigation_name_map_default = {
  options,
  notes,
  color,
  appearance,
  "specific-gravity": specific_gravity,
  "p-h": p_h,
  glucose,
  biliruben,
  ketones,
  "occult-blood": occult_blood,
  protein,
  nitrite,
  "leukocyte-esterase": leukocyte_esterase,
  "urine-wbc": urine_wbc,
  "urine-rbc": urine_rbc,
  "urine-squamous-epithelial-cells": urine_squamous_epithelial_cells,
  "ascorbic-acid": ascorbic_acid,
  "csf-pressure": csf_pressure,
  "csf-cell-count": csf_cell_count,
  "csf-glucose": csf_glucose,
  "csf-protein": csf_protein,
  "bun-blood-urea-nitrogen": bun_blood_urea_nitrogen,
  creatinine,
  "glucose-plasma-fasting": glucose_plasma_fasting,
  albumin,
  "potassium-k": potassium_k,
  "sodium-na": sodium_na,
  "magnesium-mg": magnesium_mg,
  "chloride-cl": chloride_cl,
  "co-2-carbon-dioxide-or-bicarbonate": co_2_carbon_dioxide_or_bicarbonate,
  phosphorus,
  "calcium-ca": calcium_ca,
  "aminotransferase-alanine-alt": aminotransferase_alanine_alt,
  "aminotransferase-aspartate-ast": aminotransferase_aspartate_ast,
  "alkaline-phosphatase-alp": alkaline_phosphatase_alp,
  "total-bilirubin": total_bilirubin,
  "direct-bilirubin": direct_bilirubin,
  "haemoglobin-hb": haemoglobin_hb,
  "white-cell-count-wbc": white_cell_count_wbc,
  "platelet-count-plt": platelet_count_plt,
  "red-blood-count-rbc": red_blood_count_rbc,
  "mean-cell-volume-mcv": mean_cell_volume_mcv,
  "packed-cell-volume-pcv-haematocrit-hct": packed_cell_volume_pcv_haematocrit_hct,
  "mean-cell-haemoglobin-mch": mean_cell_haemoglobin_mch,
  "mean-cell-haemoglobin-concentration-mchc": mean_cell_haemoglobin_concentration_mchc,
  "neutrophil-count": neutrophil_count,
  "lymphocyte-count": lymphocyte_count,
  "monocyte-count": monocyte_count,
  "eosinophil-count": eosinophil_count,
  "basophil-count": basophil_count,
  "mrdt-rapid-test": mrdt_rapid_test,
  "malaria-blood-slide": malaria_blood_slide,
  "cd-4-count": cd_4_count,
  "viral-load": viral_load,
  "hiv-rapid-test": hiv_rapid_test,
  "cr-ag": cr_ag,
  "hepatitis-b-surface-antigen-h-bs-ag": hepatitis_b_surface_antigen_h_bs_ag,
  "hepatitis-b-e-antigen-hbe-ag": hepatitis_b_e_antigen_hbe_ag,
  "x-ray": x_ray,
  mri,
  "ct-scan": ct_scan,
  "xpert-mtb-rif": xpert_mtb_rif,
  "mantoux-ppd": mantoux_ppd,
  "sputum-culture": sputum_culture,
  "sputum-smear": sputum_smear,
  "sputum-pcr": sputum_pcr,
  "csf-culture": csf_culture,
  "csf-india-ink-staining": csf_india_ink_staining,
  "blood-culture": blood_culture,
  "1-2-beta-d-glucan": __2_beta_d_glucan,
  urinalysis,
  "cerebrospinal-fluid-test-lumbar-puncture": cerebrospinal_fluid_test_lumbar_puncture,
  "metabolic-panel": metabolic_panel,
  "liver-function-tests": liver_function_tests,
  "full-blood-picture": full_blood_picture,
  "hpv-screening": hpv_screening,
  "h-pylori-stool-test": h_pylori_stool_test,
  "systolic-blood-pressure": systolic_blood_pressure,
  "diastolic-blood-pressure": diastolic_blood_pressure,
  "lactate-dehydrogenase-ldh": lactate_dehydrogenase_ldh,
  "pregnancy-test": pregnancy_test,
  "oxygen-saturation": oxygen_saturation,
  "erythrocyte-sedimentation-rate-esr": erythrocyte_sedimentation_rate_esr,
  "iron-serum": iron_serum,
  "c-reactive-protein": c_reactive_protein
};

// data/core/investigations.json
var options2 = {
  type: "options",
  options: [
    "normal",
    "abnormal",
    "inconclusive"
  ]
};
var notes2 = {
  type: "text"
};
var color2 = {
  type: "options",
  options: [
    "Yellow",
    "Amber",
    "Red",
    "Blue",
    "Colorless",
    "Straw"
  ]
};
var appearance2 = {
  type: "options",
  options: [
    "Clear",
    "Cloudy",
    "Slightly Cloudy",
    "Turbid"
  ]
};
var specific_gravity2 = {
  type: "numeric-units",
  units: null
};
var p_h2 = {
  type: "numeric-units",
  units: "pH"
};
var glucose2 = {
  type: "numeric-units",
  units: "mg/dL"
};
var biliruben2 = {
  type: "numeric-units",
  units: "mg/dL"
};
var ketones2 = {
  type: "numeric-units",
  units: "mg/dL"
};
var occult_blood2 = {
  type: "numeric-units",
  units: "mg/dL"
};
var protein2 = {
  type: "numeric-units",
  units: "mg/dL"
};
var nitrite2 = {
  type: "numeric-units",
  units: "mg/dL"
};
var leukocyte_esterase2 = {
  type: "options",
  options: [
    "positive",
    "negative",
    "inconclusive"
  ]
};
var urine_wbc2 = {
  type: "numeric-units",
  units: "/HPF"
};
var urine_rbc2 = {
  type: "numeric-units",
  units: "/HPF"
};
var urine_squamous_epithelial_cells2 = {
  type: "numeric-units",
  units: "/HPF"
};
var ascorbic_acid2 = {
  type: "numeric-units",
  units: "mg/dL"
};
var csf_pressure2 = {
  type: "numeric-units",
  units: "mmH2O"
};
var csf_cell_count2 = {
  type: "numeric-units",
  units: "x10^6 /L"
};
var csf_glucose2 = {
  type: "numeric-units",
  units: "mg/dL"
};
var csf_protein2 = {
  type: "numeric-units",
  units: "mg/dL"
};
var bun_blood_urea_nitrogen2 = {
  type: "numeric-units",
  units: "mg/dL"
};
var creatinine2 = {
  type: "numeric-units",
  units: "mg/dL"
};
var glucose_plasma_fasting2 = {
  type: "numeric-units",
  units: "mg/dL"
};
var albumin2 = {
  type: "numeric-units",
  units: "g/dL"
};
var potassium_k2 = {
  type: "numeric-units",
  units: "mEq/L"
};
var sodium_na2 = {
  type: "numeric-units",
  units: "mEq/L"
};
var magnesium_mg2 = {
  type: "numeric-units",
  units: "mmol/L"
};
var chloride_cl2 = {
  type: "numeric-units",
  units: "mEq/L"
};
var co_2_carbon_dioxide_or_bicarbonate2 = {
  type: "numeric-units",
  units: "mEq/L"
};
var phosphorus2 = {
  type: "numeric-units",
  units: "mg/dL"
};
var calcium_ca2 = {
  type: "numeric-units",
  units: "mg/dL"
};
var aminotransferase_alanine_alt2 = {
  type: "numeric-units",
  units: "U/L"
};
var aminotransferase_aspartate_ast2 = {
  type: "numeric-units",
  units: "U/L"
};
var alkaline_phosphatase_alp2 = {
  type: "numeric-units",
  units: "U/L"
};
var total_bilirubin2 = {
  type: "numeric-units",
  units: "mg/dL"
};
var direct_bilirubin2 = {
  type: "numeric-units",
  units: "mg/dL"
};
var haemoglobin_hb2 = {
  type: "numeric-units",
  units: "g/L"
};
var white_cell_count_wbc2 = {
  type: "numeric-units",
  units: "x10^9 /L"
};
var platelet_count_plt2 = {
  type: "numeric-units",
  units: "x10^9 /L"
};
var red_blood_count_rbc2 = {
  type: "numeric-units",
  units: "x10^12 /L"
};
var mean_cell_volume_mcv2 = {
  type: "numeric-units",
  units: "fl"
};
var packed_cell_volume_pcv_haematocrit_hct2 = {
  type: "numeric-units",
  units: "L/L"
};
var mean_cell_haemoglobin_mch2 = {
  type: "numeric-units",
  units: "fmol/cell"
};
var mean_cell_haemoglobin_concentration_mchc2 = {
  type: "numeric-units",
  units: "g/L"
};
var neutrophil_count2 = {
  type: "numeric-units",
  units: "x10^9 /L"
};
var lymphocyte_count2 = {
  type: "numeric-units",
  units: "x10^9 /L"
};
var monocyte_count2 = {
  type: "numeric-units",
  units: "x10^9 /L"
};
var eosinophil_count2 = {
  type: "numeric-units",
  units: "x10^9 /L"
};
var basophil_count2 = {
  type: "numeric-units",
  units: "x10^9 /L"
};
var mrdt_rapid_test2 = {
  type: "options",
  options: [
    "positive",
    "negative",
    "inconclusive"
  ]
};
var malaria_blood_slide2 = {
  type: "options",
  options: [
    "positive",
    "negative",
    "inconclusive"
  ]
};
var cd_4_count2 = {
  type: "numeric-units",
  units: "cells/mm3"
};
var viral_load2 = {
  type: "numeric-units",
  units: "cells/mm3"
};
var hiv_rapid_test2 = {
  type: "options",
  options: [
    "positive",
    "negative",
    "inconclusive"
  ]
};
var cr_ag2 = {
  type: "options",
  options: [
    "positive",
    "negative",
    "inconclusive"
  ]
};
var hepatitis_b_surface_antigen_h_bs_ag2 = {
  type: "options",
  options: [
    "positive",
    "negative",
    "inconclusive"
  ]
};
var hepatitis_b_e_antigen_hbe_ag2 = {
  type: "options",
  options: [
    "positive",
    "negative",
    "inconclusive"
  ]
};
var x_ray2 = {
  type: "panel",
  investigations: [
    "options",
    "notes"
  ]
};
var mri2 = {
  type: "panel",
  investigations: [
    "options",
    "notes"
  ]
};
var ct_scan2 = {
  type: "panel",
  investigations: [
    "options",
    "notes"
  ]
};
var xpert_mtb_rif2 = {
  type: "options",
  options: [
    "positive",
    "negative",
    "inconclusive"
  ]
};
var mantoux_ppd2 = {
  type: "options",
  options: [
    "positive",
    "negative",
    "inconclusive"
  ]
};
var sputum_culture2 = {
  type: "options",
  options: [
    "positive",
    "negative",
    "inconclusive"
  ]
};
var sputum_smear2 = {
  type: "options",
  options: [
    "positive",
    "negative",
    "inconclusive"
  ]
};
var sputum_pcr2 = {
  type: "options",
  options: [
    "positive",
    "negative",
    "inconclusive"
  ]
};
var csf_culture2 = {
  type: "options",
  options: [
    "positive",
    "negative",
    "inconclusive"
  ]
};
var csf_india_ink_staining2 = {
  type: "options",
  options: [
    "positive",
    "negative",
    "inconclusive"
  ]
};
var blood_culture2 = {
  type: "options",
  options: [
    "positive",
    "negative",
    "inconclusive"
  ]
};
var __2_beta_d_glucan2 = {
  type: "numeric-units",
  units: "pg/mL"
};
var urinalysis2 = {
  type: "panel",
  investigations: [
    "color",
    "appearance",
    "specific-gravity",
    "p-h",
    "glucose",
    "biliruben",
    "ketones",
    "occult-blood",
    "protein",
    "nitrite",
    "leukocyte-esterase",
    "urine-wbc",
    "urine-rbc",
    "urine-squamous-epithelial-cells",
    "ascorbic-acid"
  ]
};
var cerebrospinal_fluid_test_lumbar_puncture2 = {
  type: "panel",
  investigations: [
    "csf-pressure",
    "csf-cell-count",
    "csf-glucose",
    "csf-protein"
  ]
};
var metabolic_panel2 = {
  type: "panel",
  investigations: [
    "bun-blood-urea-nitrogen",
    "creatinine",
    "glucose-plasma-fasting",
    "albumin",
    "potassium-k",
    "sodium-na",
    "magnesium-mg",
    "chloride-cl",
    "co-2-carbon-dioxide-or-bicarbonate",
    "phosphorus",
    "calcium-ca"
  ]
};
var liver_function_tests2 = {
  type: "panel",
  investigations: [
    "aminotransferase-alanine-alt",
    "aminotransferase-aspartate-ast",
    "alkaline-phosphatase-alp",
    "albumin",
    "total-bilirubin",
    "direct-bilirubin",
    "creatinine"
  ]
};
var full_blood_picture2 = {
  type: "panel",
  investigations: [
    "haemoglobin-hb",
    "white-cell-count-wbc",
    "platelet-count-plt",
    "red-blood-count-rbc",
    "mean-cell-volume-mcv",
    "packed-cell-volume-pcv-haematocrit-hct",
    "mean-cell-haemoglobin-mch",
    "mean-cell-haemoglobin-concentration-mchc",
    "neutrophil-count",
    "lymphocyte-count",
    "monocyte-count",
    "eosinophil-count",
    "basophil-count"
  ]
};
var hpv_screening2 = {
  type: "options",
  options: [
    "positive",
    "negative",
    "inconclusive"
  ]
};
var h_pylori_stool_test2 = {
  type: "options",
  options: [
    "positive",
    "negative",
    "inconclusive"
  ]
};
var systolic_blood_pressure2 = {
  type: "numeric-units",
  units: "mmHg"
};
var diastolic_blood_pressure2 = {
  type: "numeric-units",
  units: "mmHg"
};
var lactate_dehydrogenase_ldh2 = {
  type: "numeric-units",
  units: "U/L"
};
var pregnancy_test2 = {
  type: "options",
  options: [
    "positive",
    "negative",
    "inconclusive"
  ]
};
var oxygen_saturation2 = {
  type: "numeric-units",
  units: "%"
};
var erythrocyte_sedimentation_rate_esr2 = {
  type: "numeric-units",
  units: "mm/hr"
};
var iron_serum2 = {
  type: "numeric-units",
  units: "mcg/dL"
};
var c_reactive_protein2 = {
  type: "numeric-units",
  units: "mg/dL"
};
var investigations_default = {
  options: options2,
  notes: notes2,
  color: color2,
  appearance: appearance2,
  "specific-gravity": specific_gravity2,
  "p-h": p_h2,
  glucose: glucose2,
  biliruben: biliruben2,
  ketones: ketones2,
  "occult-blood": occult_blood2,
  protein: protein2,
  nitrite: nitrite2,
  "leukocyte-esterase": leukocyte_esterase2,
  "urine-wbc": urine_wbc2,
  "urine-rbc": urine_rbc2,
  "urine-squamous-epithelial-cells": urine_squamous_epithelial_cells2,
  "ascorbic-acid": ascorbic_acid2,
  "csf-pressure": csf_pressure2,
  "csf-cell-count": csf_cell_count2,
  "csf-glucose": csf_glucose2,
  "csf-protein": csf_protein2,
  "bun-blood-urea-nitrogen": bun_blood_urea_nitrogen2,
  creatinine: creatinine2,
  "glucose-plasma-fasting": glucose_plasma_fasting2,
  albumin: albumin2,
  "potassium-k": potassium_k2,
  "sodium-na": sodium_na2,
  "magnesium-mg": magnesium_mg2,
  "chloride-cl": chloride_cl2,
  "co-2-carbon-dioxide-or-bicarbonate": co_2_carbon_dioxide_or_bicarbonate2,
  phosphorus: phosphorus2,
  "calcium-ca": calcium_ca2,
  "aminotransferase-alanine-alt": aminotransferase_alanine_alt2,
  "aminotransferase-aspartate-ast": aminotransferase_aspartate_ast2,
  "alkaline-phosphatase-alp": alkaline_phosphatase_alp2,
  "total-bilirubin": total_bilirubin2,
  "direct-bilirubin": direct_bilirubin2,
  "haemoglobin-hb": haemoglobin_hb2,
  "white-cell-count-wbc": white_cell_count_wbc2,
  "platelet-count-plt": platelet_count_plt2,
  "red-blood-count-rbc": red_blood_count_rbc2,
  "mean-cell-volume-mcv": mean_cell_volume_mcv2,
  "packed-cell-volume-pcv-haematocrit-hct": packed_cell_volume_pcv_haematocrit_hct2,
  "mean-cell-haemoglobin-mch": mean_cell_haemoglobin_mch2,
  "mean-cell-haemoglobin-concentration-mchc": mean_cell_haemoglobin_concentration_mchc2,
  "neutrophil-count": neutrophil_count2,
  "lymphocyte-count": lymphocyte_count2,
  "monocyte-count": monocyte_count2,
  "eosinophil-count": eosinophil_count2,
  "basophil-count": basophil_count2,
  "mrdt-rapid-test": mrdt_rapid_test2,
  "malaria-blood-slide": malaria_blood_slide2,
  "cd-4-count": cd_4_count2,
  "viral-load": viral_load2,
  "hiv-rapid-test": hiv_rapid_test2,
  "cr-ag": cr_ag2,
  "hepatitis-b-surface-antigen-h-bs-ag": hepatitis_b_surface_antigen_h_bs_ag2,
  "hepatitis-b-e-antigen-hbe-ag": hepatitis_b_e_antigen_hbe_ag2,
  "x-ray": x_ray2,
  mri: mri2,
  "ct-scan": ct_scan2,
  "xpert-mtb-rif": xpert_mtb_rif2,
  "mantoux-ppd": mantoux_ppd2,
  "sputum-culture": sputum_culture2,
  "sputum-smear": sputum_smear2,
  "sputum-pcr": sputum_pcr2,
  "csf-culture": csf_culture2,
  "csf-india-ink-staining": csf_india_ink_staining2,
  "blood-culture": blood_culture2,
  "1-2-beta-d-glucan": __2_beta_d_glucan2,
  urinalysis: urinalysis2,
  "cerebrospinal-fluid-test-lumbar-puncture": cerebrospinal_fluid_test_lumbar_puncture2,
  "metabolic-panel": metabolic_panel2,
  "liver-function-tests": liver_function_tests2,
  "full-blood-picture": full_blood_picture2,
  "hpv-screening": hpv_screening2,
  "h-pylori-stool-test": h_pylori_stool_test2,
  "systolic-blood-pressure": systolic_blood_pressure2,
  "diastolic-blood-pressure": diastolic_blood_pressure2,
  "lactate-dehydrogenase-ldh": lactate_dehydrogenase_ldh2,
  "pregnancy-test": pregnancy_test2,
  "oxygen-saturation": oxygen_saturation2,
  "erythrocyte-sedimentation-rate-esr": erythrocyte_sedimentation_rate_esr2,
  "iron-serum": iron_serum2,
  "c-reactive-protein": c_reactive_protein2
};

// src/investigations.ts
function constructInvestigationFromObj(obj) {
  if (obj === void 0) {
    return null;
  }
  if (obj.type !== "panel") {
    return obj;
  }
  const panelObj = {};
  obj.investigations.forEach((tKey) => {
    panelObj[tKey] = investigations_default[tKey];
  });
  return {
    type: "panel",
    items: panelObj
  };
}
function constructInvestigation(id) {
  const obj = investigations_default[id];
  return constructInvestigationFromObj(obj);
}
var investigation = {
  ids: () => Object.keys(investigation_name_map_default).sort((a, b) => a.localeCompare(b)),
  values: () => {
    Object.entries(investigations_default).sort((a, b) => a[0].localeCompare(b[0])).map((s) => {
      const [key, obj] = s;
      return __spreadValues({
        id: key
      }, constructInvestigationFromObj(obj));
    });
  },
  fromId: (id) => constructInvestigation(id),
  name: {
    fromId: (id) => {
      return investigation_name_map_default[id] || id;
    },
    values: () => {
      return Object.entries(investigation_name_map_default).sort((a, b) => a[1].localeCompare(b[1])).map((s) => {
        const [id, name] = s;
        return {
          id,
          name
        };
      });
    }
  }
};
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  investigation
});
