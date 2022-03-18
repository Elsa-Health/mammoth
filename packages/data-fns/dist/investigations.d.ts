var options = {
	type: "options",
	options: [
		"normal",
		"abnormal",
		"inconclusive"
	]
};
var notes = {
	type: "text"
};
var color = {
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
var appearance = {
	type: "options",
	options: [
		"Clear",
		"Cloudy",
		"Slightly Cloudy",
		"Turbid"
	]
};
var glucose = {
	type: "numeric-units",
	units: "mg/dL"
};
var biliruben = {
	type: "numeric-units",
	units: "mg/dL"
};
var ketones = {
	type: "numeric-units",
	units: "mg/dL"
};
var protein = {
	type: "numeric-units",
	units: "mg/dL"
};
var nitrite = {
	type: "numeric-units",
	units: "mg/dL"
};
var creatinine = {
	type: "numeric-units",
	units: "mg/dL"
};
var albumin = {
	type: "numeric-units",
	units: "g/dL"
};
var phosphorus = {
	type: "numeric-units",
	units: "mg/dL"
};
var mri = {
	type: "panel",
	investigations: [
		"options",
		"notes"
	]
};
var urinalysis = {
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
var _investigations = {
	options: options,
	notes: notes,
	color: color,
	appearance: appearance,
	"specific-gravity": {
	type: "numeric-units",
	units: null
},
	"p-h": {
	type: "numeric-units",
	units: "pH"
},
	glucose: glucose,
	biliruben: biliruben,
	ketones: ketones,
	"occult-blood": {
	type: "numeric-units",
	units: "mg/dL"
},
	protein: protein,
	nitrite: nitrite,
	"leukocyte-esterase": {
	type: "options",
	options: [
		"positive",
		"negative",
		"inconclusive"
	]
},
	"urine-wbc": {
	type: "numeric-units",
	units: "/HPF"
},
	"urine-rbc": {
	type: "numeric-units",
	units: "/HPF"
},
	"urine-squamous-epithelial-cells": {
	type: "numeric-units",
	units: "/HPF"
},
	"ascorbic-acid": {
	type: "numeric-units",
	units: "mg/dL"
},
	"csf-pressure": {
	type: "numeric-units",
	units: "mmH2O"
},
	"csf-cell-count": {
	type: "numeric-units",
	units: "x10^6 /L"
},
	"csf-glucose": {
	type: "numeric-units",
	units: "mg/dL"
},
	"csf-protein": {
	type: "numeric-units",
	units: "mg/dL"
},
	"bun-blood-urea-nitrogen": {
	type: "numeric-units",
	units: "mg/dL"
},
	creatinine: creatinine,
	"glucose-plasma-fasting": {
	type: "numeric-units",
	units: "mg/dL"
},
	albumin: albumin,
	"potassium-k": {
	type: "numeric-units",
	units: "mEq/L"
},
	"sodium-na": {
	type: "numeric-units",
	units: "mEq/L"
},
	"magnesium-mg": {
	type: "numeric-units",
	units: "mmol/L"
},
	"chloride-cl": {
	type: "numeric-units",
	units: "mEq/L"
},
	"co-2-carbon-dioxide-or-bicarbonate": {
	type: "numeric-units",
	units: "mEq/L"
},
	phosphorus: phosphorus,
	"calcium-ca": {
	type: "numeric-units",
	units: "mg/dL"
},
	"aminotransferase-alanine-alt": {
	type: "numeric-units",
	units: "U/L"
},
	"aminotransferase-aspartate-ast": {
	type: "numeric-units",
	units: "U/L"
},
	"alkaline-phosphatase-alp": {
	type: "numeric-units",
	units: "U/L"
},
	"total-bilirubin": {
	type: "numeric-units",
	units: "mg/dL"
},
	"direct-bilirubin": {
	type: "numeric-units",
	units: "mg/dL"
},
	"haemoglobin-hb": {
	type: "numeric-units",
	units: "g/L"
},
	"white-cell-count-wbc": {
	type: "numeric-units",
	units: "x10^9 /L"
},
	"platelet-count-plt": {
	type: "numeric-units",
	units: "x10^9 /L"
},
	"red-blood-count-rbc": {
	type: "numeric-units",
	units: "x10^12 /L"
},
	"mean-cell-volume-mcv": {
	type: "numeric-units",
	units: "fl"
},
	"packed-cell-volume-pcv-haematocrit-hct": {
	type: "numeric-units",
	units: "L/L"
},
	"mean-cell-haemoglobin-mch": {
	type: "numeric-units",
	units: "fmol/cell"
},
	"mean-cell-haemoglobin-concentration-mchc": {
	type: "numeric-units",
	units: "g/L"
},
	"neutrophil-count": {
	type: "numeric-units",
	units: "x10^9 /L"
},
	"lymphocyte-count": {
	type: "numeric-units",
	units: "x10^9 /L"
},
	"monocyte-count": {
	type: "numeric-units",
	units: "x10^9 /L"
},
	"eosinophil-count": {
	type: "numeric-units",
	units: "x10^9 /L"
},
	"basophil-count": {
	type: "numeric-units",
	units: "x10^9 /L"
},
	"mrdt-rapid-test": {
	type: "options",
	options: [
		"positive",
		"negative",
		"inconclusive"
	]
},
	"malaria-blood-slide": {
	type: "options",
	options: [
		"positive",
		"negative",
		"inconclusive"
	]
},
	"cd-4-count": {
	type: "numeric-units",
	units: "cells/mm3"
},
	"viral-load": {
	type: "numeric-units",
	units: "cells/mm3"
},
	"hiv-rapid-test": {
	type: "options",
	options: [
		"positive",
		"negative",
		"inconclusive"
	]
},
	"cr-ag": {
	type: "options",
	options: [
		"positive",
		"negative",
		"inconclusive"
	]
},
	"hepatitis-b-surface-antigen-h-bs-ag": {
	type: "options",
	options: [
		"positive",
		"negative",
		"inconclusive"
	]
},
	"hepatitis-b-e-antigen-hbe-ag": {
	type: "options",
	options: [
		"positive",
		"negative",
		"inconclusive"
	]
},
	"x-ray": {
	type: "panel",
	investigations: [
		"options",
		"notes"
	]
},
	mri: mri,
	"ct-scan": {
	type: "panel",
	investigations: [
		"options",
		"notes"
	]
},
	"xpert-mtb-rif": {
	type: "options",
	options: [
		"positive",
		"negative",
		"inconclusive"
	]
},
	"mantoux-ppd": {
	type: "options",
	options: [
		"positive",
		"negative",
		"inconclusive"
	]
},
	"sputum-culture": {
	type: "options",
	options: [
		"positive",
		"negative",
		"inconclusive"
	]
},
	"sputum-smear": {
	type: "options",
	options: [
		"positive",
		"negative",
		"inconclusive"
	]
},
	"sputum-pcr": {
	type: "options",
	options: [
		"positive",
		"negative",
		"inconclusive"
	]
},
	"csf-culture": {
	type: "options",
	options: [
		"positive",
		"negative",
		"inconclusive"
	]
},
	"csf-india-ink-staining": {
	type: "options",
	options: [
		"positive",
		"negative",
		"inconclusive"
	]
},
	"blood-culture": {
	type: "options",
	options: [
		"positive",
		"negative",
		"inconclusive"
	]
},
	"1-2-beta-d-glucan": {
	type: "numeric-units",
	units: "pg/mL"
},
	urinalysis: urinalysis,
	"cerebrospinal-fluid-test-lumbar-puncture": {
	type: "panel",
	investigations: [
		"csf-pressure",
		"csf-cell-count",
		"csf-glucose",
		"csf-protein"
	]
},
	"metabolic-panel": {
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
},
	"liver-function-tests": {
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
},
	"full-blood-picture": {
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
},
	"hpv-screening": {
	type: "options",
	options: [
		"positive",
		"negative",
		"inconclusive"
	]
},
	"h-pylori-stool-test": {
	type: "options",
	options: [
		"positive",
		"negative",
		"inconclusive"
	]
},
	"systolic-blood-pressure": {
	type: "numeric-units",
	units: "mmHg"
},
	"diastolic-blood-pressure": {
	type: "numeric-units",
	units: "mmHg"
},
	"lactate-dehydrogenase-ldh": {
	type: "numeric-units",
	units: "U/L"
},
	"pregnancy-test": {
	type: "options",
	options: [
		"positive",
		"negative",
		"inconclusive"
	]
},
	"oxygen-saturation": {
	type: "numeric-units",
	units: "%"
},
	"erythrocyte-sedimentation-rate-esr": {
	type: "numeric-units",
	units: "mm/hr"
},
	"iron-serum": {
	type: "numeric-units",
	units: "mcg/dL"
},
	"c-reactive-protein": {
	type: "numeric-units",
	units: "mg/dL"
}
};

declare type Investigation = keyof typeof _investigations;
declare type InvestigationType<InvestigationParams extends string> = {
    type: "text";
} | {
    type: "options";
    options: InvestigationParams[];
} | {
    type: "select";
    items: InvestigationParams[];
} | {
    type: "numeric-units";
    units: InvestigationParams | null;
} | {
    type: "panel";
    investigations: InvestigationParams[];
};
declare type InvestigationTypeRecord<InvestigationParams extends string> = {
    type: "text";
} | {
    type: "options";
    options: InvestigationParams[];
} | {
    type: "select";
    items: InvestigationParams[];
} | {
    type: "numeric-units";
    units: InvestigationParams | null;
} | {
    type: "panel";
    items: {
        [investigation in Investigation]?: InvestigationTypeRecord<InvestigationParams>;
    };
};
declare const investigation: {
    ids: () => ("color" | "sputum-culture" | "h-pylori-stool-test" | "urinalysis" | "hiv-rapid-test" | "hpv-screening" | "blood-culture" | "hepatitis-b-surface-antigen-h-bs-ag" | "liver-function-tests" | "cd-4-count" | "pregnancy-test" | "ct-scan" | "mri" | "options" | "notes" | "appearance" | "specific-gravity" | "p-h" | "glucose" | "biliruben" | "ketones" | "occult-blood" | "protein" | "nitrite" | "leukocyte-esterase" | "urine-wbc" | "urine-rbc" | "urine-squamous-epithelial-cells" | "ascorbic-acid" | "csf-pressure" | "csf-cell-count" | "csf-glucose" | "csf-protein" | "bun-blood-urea-nitrogen" | "creatinine" | "glucose-plasma-fasting" | "albumin" | "potassium-k" | "sodium-na" | "magnesium-mg" | "chloride-cl" | "co-2-carbon-dioxide-or-bicarbonate" | "phosphorus" | "calcium-ca" | "aminotransferase-alanine-alt" | "aminotransferase-aspartate-ast" | "alkaline-phosphatase-alp" | "total-bilirubin" | "direct-bilirubin" | "haemoglobin-hb" | "white-cell-count-wbc" | "platelet-count-plt" | "red-blood-count-rbc" | "mean-cell-volume-mcv" | "packed-cell-volume-pcv-haematocrit-hct" | "mean-cell-haemoglobin-mch" | "mean-cell-haemoglobin-concentration-mchc" | "neutrophil-count" | "lymphocyte-count" | "monocyte-count" | "eosinophil-count" | "basophil-count" | "mrdt-rapid-test" | "malaria-blood-slide" | "viral-load" | "cr-ag" | "hepatitis-b-e-antigen-hbe-ag" | "x-ray" | "xpert-mtb-rif" | "mantoux-ppd" | "sputum-smear" | "sputum-pcr" | "csf-culture" | "csf-india-ink-staining" | "1-2-beta-d-glucan" | "cerebrospinal-fluid-test-lumbar-puncture" | "metabolic-panel" | "full-blood-picture" | "systolic-blood-pressure" | "diastolic-blood-pressure" | "lactate-dehydrogenase-ldh" | "oxygen-saturation" | "erythrocyte-sedimentation-rate-esr" | "iron-serum" | "c-reactive-protein")[];
    values: () => void;
    fromId: <T extends string, K extends string>(id: Investigation) => InvestigationTypeRecord<K> | null;
    name: {
        fromId: (id: Investigation) => string;
        values: () => {
            id: string;
            name: string;
        }[];
    };
};

export { Investigation, InvestigationType, InvestigationTypeRecord, investigation };
