var microscopy = "Microscopy";
var mrdt = "MRDT";
var mri = "MRI";
var ultrasound = "Ultrasound";
var urinalysis = "Urinalysis";
var _labTests = {
	"anti-toxoplasma-ig-g-serology": "Anti-Toxoplasma IgG Serology",
	"blood-culture": "Blood Culture",
	"blood-pressure": "Blood Pressure",
	"c-reactive-protein-crp": "C-reactive protein (CRP)",
	"cd-4-count": "CD4 Count",
	"chest-x-ray-cxr": "Chest X-Ray (CXR)",
	"ct-scan": "CT Scan",
	"electrolytes-test": "Electrolytes Test",
	"full-blood-picture-fbp": "Full Blood Picture (FBP)",
	"gene-xpert": "GeneXpert",
	"h-pylori-stool-test": "H-pylori Stool Test",
	"hepatitis-b-pcr-hbv-dna": "Hepatitis B PCR (HBV DNA)",
	"hepatitis-b-surface-antibody-hep-bs-ab": "Hepatitis B Surface Antibody (HepBsAb)",
	"hepatitis-b-surface-antigen-h-bs-ag": "Hepatitis B Surface Antigen (HBsAg)",
	"hiv-pcr": "HIV PCR",
	"hiv-rapid-test": "HIV Rapid Test",
	"hiv-viral-load": "HIV Viral Load",
	"hpv-screening": "HPV Screening",
	"kidney-function-tests": "Kidney Function Tests",
	"liver-function-tests": "Liver Function Tests",
	microscopy: microscopy,
	"microscopy-of-sputum": "Microscopy of Sputum",
	mrdt: mrdt,
	mri: mri,
	"pap-smear": "Pap Smear",
	"pcr-test": "PCR Test",
	"pelvic-exam": "Pelvic Exam",
	"pregnancy-test": "Pregnancy Test",
	"spinal-fluid-tap": "Spinal Fluid Tap",
	"sputum-culture": "Sputum Culture",
	"stool-analysis": "Stool Analysis",
	"syphilis-test": "Syphilis Test",
	ultrasound: ultrasound,
	"ultrasound-of-pelvis": "Ultrasound of Pelvis",
	urinalysis: urinalysis
};

var acetaminophen = "Acetaminophen";
var acyclovir = "Acyclovir";
var albendazole = "Albendazole";
var ampiclox = "Ampiclox";
var antihistamines = "Antihistamines";
var azithromycin = "Azithromycin";
var bendrofluazide = "Bendrofluazide";
var bronchodilators = "Bronchodilators";
var cephalexin = "Cephalexin";
var cetrizine = "Cetrizine";
var ciprofloxacin = "Ciprofloxacin";
var clindamycin = "Clindamycin";
var cloxacillin = "Cloxacillin";
var condoms = "Condoms";
var corticosteroids = "Corticosteroids";
var diazepam = "Diazepam";
var diuretics = "Diuretics";
var erythromycin = "Erythromycin";
var fluconazole = "Fluconazole";
var fluids = "Fluids";
var ibuprofen = "Ibuprofen";
var imiquimod = "Imiquimod";
var levofloxacin = "Levofloxacin";
var metronidazole = "Metronidazole";
var phenytoin = "Phenytoin";
var propranolol = "Propranolol";
var scaboma = "Scaboma";
var zinc = "Zinc";
var medicationAddo = {
	acetaminophen: acetaminophen,
	acyclovir: acyclovir,
	albendazole: albendazole,
	"aminophylline-injection": "Aminophylline injection",
	"amoxicillin-capsules": "Amoxicillin capsules",
	"amoxicillin-oral-suspension": "Amoxicillin oral suspension",
	"amoxicillin-clavulanate-amoxyclav": "Amoxicillin/Clavulanate (Amoxyclav)",
	ampiclox: ampiclox,
	"annusol-suppositories": "Annusol suppositories",
	"anti-fungal-pessaries": "Anti-fungal pessaries",
	antihistamines: antihistamines,
	"artemether-lumefantrine-alu": "Artemether/ lumefantrine (ALU)",
	azithromycin: azithromycin,
	bendrofluazide: bendrofluazide,
	"benzyl-benzoate": "Benzyl benzoate",
	"benzyl-penicillin-powder-for-injection": "Benzyl penicillin powder for injection",
	"bisacodyl-tablets": "Bisacodyl tablets",
	bronchodilators: bronchodilators,
	cephalexin: cephalexin,
	cetrizine: cetrizine,
	"cetrizine-hydrochloride-syrup": "Cetrizine hydrochloride syrup",
	"cetrizine-hydrochloride-tablets": "Cetrizine hydrochloride tablets",
	"chloramphenicol-eye-drops-ointment": "Chloramphenicol eye drops/ointment",
	ciprofloxacin: ciprofloxacin,
	clindamycin: clindamycin,
	cloxacillin: cloxacillin,
	"co-trimoxazole-suspension": "Co-trimoxazole suspension",
	condoms: condoms,
	corticosteroids: corticosteroids,
	"cough-suppressants": "Cough suppressants",
	"deworming-tablets": "Deworming tablets",
	"dextrose-5": "Dextrose 5%",
	diazepam: diazepam,
	"diclofenac-sodium-tablets": "Diclofenac sodium tablets",
	diuretics: diuretics,
	"doxycycline-capsules-tablets": "Doxycycline capsules/tablets",
	"ear-drops": "Ear drops",
	"ergometrine-injection": "Ergometrine injection",
	erythromycin: erythromycin,
	fluconazole: fluconazole,
	fluids: fluids,
	"folic-acid-tabs": "Folic acid tabs",
	"gentamycin-eyedrops": "Gentamycin eyedrops",
	"hydrocortisone-cream": "Hydrocortisone cream",
	ibuprofen: ibuprofen,
	imiquimod: imiquimod,
	"iron-supplements": "Iron Supplements",
	levofloxacin: levofloxacin,
	metronidazole: metronidazole,
	"nasal-decongestant": "Nasal decongestant",
	"nonsteroidal-anti-inflammatory-drugs-nsaids": "Nonsteroidal anti-inflammatory drugs (NSAIDS)",
	"normal-saline-injection": "Normal Saline injection",
	"nyastatin-oral-suspension": "Nyastatin oral suspension",
	"nystatin-oral-suspension": "Nystatin oral suspension",
	"nystatin-pessaries": "Nystatin pessaries",
	"nystatin-skin-ointment": "Nystatin skin ointment",
	"nystatin-tablets": "Nystatin tablets",
	"oral-contraceptive-pills": "Oral contraceptive pills",
	"oxytetracycline-hydrochloride-eye-ointment": "Oxytetracycline hydrochloride eye ointment",
	"phenoxymethyl-penicillin-suspension": "Phenoxymethyl Penicillin suspension",
	"phenoxymethyl-penicillin-tablets": "Phenoxymethyl Penicillin tablets",
	phenytoin: phenytoin,
	"piperazine-and-its-salts-in-oral-dosage-forms": "Piperazine and its salts in oral dosage forms",
	"procaine-penicillin-fortified": "Procaine Penicillin Fortified",
	"promethazine-injection": "Promethazine injection",
	propranolol: propranolol,
	"quinine-injection": "Quinine injection",
	"quinine-tablets": "Quinine tablets",
	"salicylic-acid-ointment": "Salicylic acid ointment",
	scaboma: scaboma,
	"silver-sulfadiazine-cream": "Silver sulfadiazine cream",
	"sulfadoxine-pyrimethamine": "Sulfadoxine–pyrimethamine",
	"topical-corticosteroid-cream": "Topical corticosteroid cream",
	"topical-skin-cream": "Topical skin cream",
	"vitamin-c": "Vitamin C",
	"vitamin-d": "Vitamin D",
	"water-for-injection": "Water for injection",
	zinc: zinc
};

var eucalyptus = "Eucalyptus";
var eugenol = "Eugenol";
var lozenges = "Lozenges";
var menthol = "Menthol";
var simethicone = "Simethicone";
var tonic = "Tonic";
var medicationGeneralSales = {
	"acetylsalicylic-acid-and-its-salts": "Acetylsalicylic acid and its salts",
	"acetylsalicylic-acid-paracetamol-caffeine-combinations": "Acetylsalicylic acid/paracetamol/caffeine combinations",
	"aluminium-hydroxide": "Aluminium Hydroxide",
	"arachis-oil-preparations-for-sore-mouth": "Arachis Oil preparations (for sore mouth)",
	"ayuverdic-ointments": "Ayuverdic ointments",
	"benzocaine-preparation-not-for-children": "Benzocaine preparation (not for children)",
	"camphor-preparations": "Camphor Preparations",
	"carmellose-preparations": "Carmellose preparations",
	"chlorinate-lime-eusol-solution": "Chlorinate Lime (EUSOL) solution",
	"clove-oil": "Clove oil",
	"dental-floss": "Dental floss",
	"dequalinium-prepartions": "Dequalinium Prepartions",
	"diclofenac-ointment-cream-or-gel": "Diclofenac ointment, cream or gel",
	eucalyptus: eucalyptus,
	"eucalyptus-oil-preparations": "Eucalyptus oil preparations",
	"eucalyptus-products": "Eucalyptus products",
	eugenol: eugenol,
	"first-aid-ointment": "First Aid Ointment",
	"gentian-violet-solution": "Gentian violet solution",
	"ibuprofen-ephedrine-combinations": "Ibuprofen/Ephedrine combinations",
	"iodine-solution": "Iodine solution",
	lozenges: lozenges,
	"magnesium-trisillicate": "Magnesium trisillicate",
	menthol: menthol,
	"menthol-products": "Menthol Products",
	"mentholatum-preparations": "Mentholatum preparations",
	"methyl-salicylate-products": "Methyl salicylate products",
	"mouth-washes": "Mouth washes",
	"oral-rehydration-salts-ors": "Oral Rehydration Salts (ORS)",
	"paracetamol-in-immediate-release-tablets-capsules-or-liquid": "Paracetamol (in immediate release tablets, capsules or liquid)",
	simethicone: simethicone,
	tonic: tonic,
	"undecylenic-acid-preparations": "Undecylenic acid preparations",
	"vitamins-other": "Vitamins (Other)",
	"whitfields-ointment": "Whitfields ointment"
};

/**
 * Type of the lab tests
 */
declare type LabTest = keyof typeof _labTests;
/**
 * All medicaitons
 */
declare namespace Medication {
    type Addo = keyof typeof medicationAddo;
    type GS = keyof typeof medicationGeneralSales;
}
declare const labTests: {
    fromId: (id: LabTest) => {
        id: LabTest;
        name: string;
    };
    ids: () => ("blood-pressure" | "mrdt" | "chest-x-ray-cxr" | "full-blood-picture-fbp" | "gene-xpert" | "sputum-culture" | "h-pylori-stool-test" | "urinalysis" | "stool-analysis" | "hiv-rapid-test" | "electrolytes-test" | "pelvic-exam" | "ultrasound-of-pelvis" | "hpv-screening" | "spinal-fluid-tap" | "blood-culture" | "c-reactive-protein-crp" | "hiv-pcr" | "hepatitis-b-surface-antigen-h-bs-ag" | "hepatitis-b-pcr-hbv-dna" | "hepatitis-b-surface-antibody-hep-bs-ab" | "liver-function-tests" | "hiv-viral-load" | "cd-4-count" | "anti-toxoplasma-ig-g-serology" | "microscopy-of-sputum" | "pregnancy-test" | "ct-scan" | "kidney-function-tests" | "microscopy" | "mri" | "pap-smear" | "pcr-test" | "syphilis-test" | "ultrasound")[];
    values: () => {
        id: "blood-pressure" | "mrdt" | "chest-x-ray-cxr" | "full-blood-picture-fbp" | "gene-xpert" | "sputum-culture" | "h-pylori-stool-test" | "urinalysis" | "stool-analysis" | "hiv-rapid-test" | "electrolytes-test" | "pelvic-exam" | "ultrasound-of-pelvis" | "hpv-screening" | "spinal-fluid-tap" | "blood-culture" | "c-reactive-protein-crp" | "hiv-pcr" | "hepatitis-b-surface-antigen-h-bs-ag" | "hepatitis-b-pcr-hbv-dna" | "hepatitis-b-surface-antibody-hep-bs-ab" | "liver-function-tests" | "hiv-viral-load" | "cd-4-count" | "anti-toxoplasma-ig-g-serology" | "microscopy-of-sputum" | "pregnancy-test" | "ct-scan" | "kidney-function-tests" | "microscopy" | "mri" | "pap-smear" | "pcr-test" | "syphilis-test" | "ultrasound";
        name: string;
    }[];
};
declare const medications: {
    addo: {
        fromId: (id: Medication.Addo) => {
            id: Medication.Addo;
            name: string;
        };
        ids: () => ("antihistamines" | "cough-suppressants" | "corticosteroids" | "diuretics" | "bronchodilators" | "erythromycin" | "ear-drops" | "ibuprofen" | "deworming-tablets" | "gentamycin-eyedrops" | "ampiclox" | "vitamin-c" | "vitamin-d" | "zinc" | "fluids" | "scaboma" | "acetaminophen" | "acyclovir" | "albendazole" | "aminophylline-injection" | "amoxicillin-capsules" | "amoxicillin-oral-suspension" | "amoxicillin-clavulanate-amoxyclav" | "annusol-suppositories" | "anti-fungal-pessaries" | "artemether-lumefantrine-alu" | "azithromycin" | "bendrofluazide" | "benzyl-benzoate" | "benzyl-penicillin-powder-for-injection" | "bisacodyl-tablets" | "cephalexin" | "cetrizine" | "cetrizine-hydrochloride-syrup" | "cetrizine-hydrochloride-tablets" | "chloramphenicol-eye-drops-ointment" | "ciprofloxacin" | "clindamycin" | "cloxacillin" | "co-trimoxazole-suspension" | "condoms" | "dextrose-5" | "diazepam" | "diclofenac-sodium-tablets" | "doxycycline-capsules-tablets" | "ergometrine-injection" | "fluconazole" | "folic-acid-tabs" | "hydrocortisone-cream" | "imiquimod" | "iron-supplements" | "levofloxacin" | "metronidazole" | "nasal-decongestant" | "nonsteroidal-anti-inflammatory-drugs-nsaids" | "normal-saline-injection" | "nyastatin-oral-suspension" | "nystatin-oral-suspension" | "nystatin-pessaries" | "nystatin-skin-ointment" | "nystatin-tablets" | "oral-contraceptive-pills" | "oxytetracycline-hydrochloride-eye-ointment" | "phenoxymethyl-penicillin-suspension" | "phenoxymethyl-penicillin-tablets" | "phenytoin" | "piperazine-and-its-salts-in-oral-dosage-forms" | "procaine-penicillin-fortified" | "promethazine-injection" | "propranolol" | "quinine-injection" | "quinine-tablets" | "salicylic-acid-ointment" | "silver-sulfadiazine-cream" | "sulfadoxine-pyrimethamine" | "topical-corticosteroid-cream" | "topical-skin-cream" | "water-for-injection")[];
        values: () => {
            id: "antihistamines" | "cough-suppressants" | "corticosteroids" | "diuretics" | "bronchodilators" | "erythromycin" | "ear-drops" | "ibuprofen" | "deworming-tablets" | "gentamycin-eyedrops" | "ampiclox" | "vitamin-c" | "vitamin-d" | "zinc" | "fluids" | "scaboma" | "acetaminophen" | "acyclovir" | "albendazole" | "aminophylline-injection" | "amoxicillin-capsules" | "amoxicillin-oral-suspension" | "amoxicillin-clavulanate-amoxyclav" | "annusol-suppositories" | "anti-fungal-pessaries" | "artemether-lumefantrine-alu" | "azithromycin" | "bendrofluazide" | "benzyl-benzoate" | "benzyl-penicillin-powder-for-injection" | "bisacodyl-tablets" | "cephalexin" | "cetrizine" | "cetrizine-hydrochloride-syrup" | "cetrizine-hydrochloride-tablets" | "chloramphenicol-eye-drops-ointment" | "ciprofloxacin" | "clindamycin" | "cloxacillin" | "co-trimoxazole-suspension" | "condoms" | "dextrose-5" | "diazepam" | "diclofenac-sodium-tablets" | "doxycycline-capsules-tablets" | "ergometrine-injection" | "fluconazole" | "folic-acid-tabs" | "hydrocortisone-cream" | "imiquimod" | "iron-supplements" | "levofloxacin" | "metronidazole" | "nasal-decongestant" | "nonsteroidal-anti-inflammatory-drugs-nsaids" | "normal-saline-injection" | "nyastatin-oral-suspension" | "nystatin-oral-suspension" | "nystatin-pessaries" | "nystatin-skin-ointment" | "nystatin-tablets" | "oral-contraceptive-pills" | "oxytetracycline-hydrochloride-eye-ointment" | "phenoxymethyl-penicillin-suspension" | "phenoxymethyl-penicillin-tablets" | "phenytoin" | "piperazine-and-its-salts-in-oral-dosage-forms" | "procaine-penicillin-fortified" | "promethazine-injection" | "propranolol" | "quinine-injection" | "quinine-tablets" | "salicylic-acid-ointment" | "silver-sulfadiazine-cream" | "sulfadoxine-pyrimethamine" | "topical-corticosteroid-cream" | "topical-skin-cream" | "water-for-injection";
            name: string;
        }[];
    };
    gs: {
        ids: () => ("oral-rehydration-salts-ors" | "acetylsalicylic-acid-and-its-salts" | "acetylsalicylic-acid-paracetamol-caffeine-combinations" | "aluminium-hydroxide" | "arachis-oil-preparations-for-sore-mouth" | "ayuverdic-ointments" | "benzocaine-preparation-not-for-children" | "camphor-preparations" | "carmellose-preparations" | "chlorinate-lime-eusol-solution" | "clove-oil" | "dental-floss" | "dequalinium-prepartions" | "diclofenac-ointment-cream-or-gel" | "eucalyptus" | "eucalyptus-oil-preparations" | "eucalyptus-products" | "eugenol" | "first-aid-ointment" | "gentian-violet-solution" | "ibuprofen-ephedrine-combinations" | "iodine-solution" | "lozenges" | "magnesium-trisillicate" | "menthol" | "menthol-products" | "mentholatum-preparations" | "methyl-salicylate-products" | "mouth-washes" | "paracetamol-in-immediate-release-tablets-capsules-or-liquid" | "simethicone" | "tonic" | "undecylenic-acid-preparations" | "vitamins-other" | "whitfields-ointment")[];
        fromId: (id: Medication.GS) => {
            id: Medication.GS;
            name: string;
        };
        values: () => {
            id: "oral-rehydration-salts-ors" | "acetylsalicylic-acid-and-its-salts" | "acetylsalicylic-acid-paracetamol-caffeine-combinations" | "aluminium-hydroxide" | "arachis-oil-preparations-for-sore-mouth" | "ayuverdic-ointments" | "benzocaine-preparation-not-for-children" | "camphor-preparations" | "carmellose-preparations" | "chlorinate-lime-eusol-solution" | "clove-oil" | "dental-floss" | "dequalinium-prepartions" | "diclofenac-ointment-cream-or-gel" | "eucalyptus" | "eucalyptus-oil-preparations" | "eucalyptus-products" | "eugenol" | "first-aid-ointment" | "gentian-violet-solution" | "ibuprofen-ephedrine-combinations" | "iodine-solution" | "lozenges" | "magnesium-trisillicate" | "menthol" | "menthol-products" | "mentholatum-preparations" | "methyl-salicylate-products" | "mouth-washes" | "paracetamol-in-immediate-release-tablets-capsules-or-liquid" | "simethicone" | "tonic" | "undecylenic-acid-preparations" | "vitamins-other" | "whitfields-ointment";
            name: string;
        }[];
    };
    all: {
        ids: () => ("antihistamines" | "cough-suppressants" | "corticosteroids" | "diuretics" | "bronchodilators" | "erythromycin" | "ear-drops" | "ibuprofen" | "deworming-tablets" | "gentamycin-eyedrops" | "ampiclox" | "vitamin-c" | "vitamin-d" | "zinc" | "fluids" | "scaboma" | "oral-rehydration-salts-ors" | "acetaminophen" | "acyclovir" | "albendazole" | "aminophylline-injection" | "amoxicillin-capsules" | "amoxicillin-oral-suspension" | "amoxicillin-clavulanate-amoxyclav" | "annusol-suppositories" | "anti-fungal-pessaries" | "artemether-lumefantrine-alu" | "azithromycin" | "bendrofluazide" | "benzyl-benzoate" | "benzyl-penicillin-powder-for-injection" | "bisacodyl-tablets" | "cephalexin" | "cetrizine" | "cetrizine-hydrochloride-syrup" | "cetrizine-hydrochloride-tablets" | "chloramphenicol-eye-drops-ointment" | "ciprofloxacin" | "clindamycin" | "cloxacillin" | "co-trimoxazole-suspension" | "condoms" | "dextrose-5" | "diazepam" | "diclofenac-sodium-tablets" | "doxycycline-capsules-tablets" | "ergometrine-injection" | "fluconazole" | "folic-acid-tabs" | "hydrocortisone-cream" | "imiquimod" | "iron-supplements" | "levofloxacin" | "metronidazole" | "nasal-decongestant" | "nonsteroidal-anti-inflammatory-drugs-nsaids" | "normal-saline-injection" | "nyastatin-oral-suspension" | "nystatin-oral-suspension" | "nystatin-pessaries" | "nystatin-skin-ointment" | "nystatin-tablets" | "oral-contraceptive-pills" | "oxytetracycline-hydrochloride-eye-ointment" | "phenoxymethyl-penicillin-suspension" | "phenoxymethyl-penicillin-tablets" | "phenytoin" | "piperazine-and-its-salts-in-oral-dosage-forms" | "procaine-penicillin-fortified" | "promethazine-injection" | "propranolol" | "quinine-injection" | "quinine-tablets" | "salicylic-acid-ointment" | "silver-sulfadiazine-cream" | "sulfadoxine-pyrimethamine" | "topical-corticosteroid-cream" | "topical-skin-cream" | "water-for-injection" | "acetylsalicylic-acid-and-its-salts" | "acetylsalicylic-acid-paracetamol-caffeine-combinations" | "aluminium-hydroxide" | "arachis-oil-preparations-for-sore-mouth" | "ayuverdic-ointments" | "benzocaine-preparation-not-for-children" | "camphor-preparations" | "carmellose-preparations" | "chlorinate-lime-eusol-solution" | "clove-oil" | "dental-floss" | "dequalinium-prepartions" | "diclofenac-ointment-cream-or-gel" | "eucalyptus" | "eucalyptus-oil-preparations" | "eucalyptus-products" | "eugenol" | "first-aid-ointment" | "gentian-violet-solution" | "ibuprofen-ephedrine-combinations" | "iodine-solution" | "lozenges" | "magnesium-trisillicate" | "menthol" | "menthol-products" | "mentholatum-preparations" | "methyl-salicylate-products" | "mouth-washes" | "paracetamol-in-immediate-release-tablets-capsules-or-liquid" | "simethicone" | "tonic" | "undecylenic-acid-preparations" | "vitamins-other" | "whitfields-ointment")[];
        values: () => ({
            id: "antihistamines" | "cough-suppressants" | "corticosteroids" | "diuretics" | "bronchodilators" | "erythromycin" | "ear-drops" | "ibuprofen" | "deworming-tablets" | "gentamycin-eyedrops" | "ampiclox" | "vitamin-c" | "vitamin-d" | "zinc" | "fluids" | "scaboma" | "acetaminophen" | "acyclovir" | "albendazole" | "aminophylline-injection" | "amoxicillin-capsules" | "amoxicillin-oral-suspension" | "amoxicillin-clavulanate-amoxyclav" | "annusol-suppositories" | "anti-fungal-pessaries" | "artemether-lumefantrine-alu" | "azithromycin" | "bendrofluazide" | "benzyl-benzoate" | "benzyl-penicillin-powder-for-injection" | "bisacodyl-tablets" | "cephalexin" | "cetrizine" | "cetrizine-hydrochloride-syrup" | "cetrizine-hydrochloride-tablets" | "chloramphenicol-eye-drops-ointment" | "ciprofloxacin" | "clindamycin" | "cloxacillin" | "co-trimoxazole-suspension" | "condoms" | "dextrose-5" | "diazepam" | "diclofenac-sodium-tablets" | "doxycycline-capsules-tablets" | "ergometrine-injection" | "fluconazole" | "folic-acid-tabs" | "hydrocortisone-cream" | "imiquimod" | "iron-supplements" | "levofloxacin" | "metronidazole" | "nasal-decongestant" | "nonsteroidal-anti-inflammatory-drugs-nsaids" | "normal-saline-injection" | "nyastatin-oral-suspension" | "nystatin-oral-suspension" | "nystatin-pessaries" | "nystatin-skin-ointment" | "nystatin-tablets" | "oral-contraceptive-pills" | "oxytetracycline-hydrochloride-eye-ointment" | "phenoxymethyl-penicillin-suspension" | "phenoxymethyl-penicillin-tablets" | "phenytoin" | "piperazine-and-its-salts-in-oral-dosage-forms" | "procaine-penicillin-fortified" | "promethazine-injection" | "propranolol" | "quinine-injection" | "quinine-tablets" | "salicylic-acid-ointment" | "silver-sulfadiazine-cream" | "sulfadoxine-pyrimethamine" | "topical-corticosteroid-cream" | "topical-skin-cream" | "water-for-injection";
            name: string;
        } | {
            id: "oral-rehydration-salts-ors" | "acetylsalicylic-acid-and-its-salts" | "acetylsalicylic-acid-paracetamol-caffeine-combinations" | "aluminium-hydroxide" | "arachis-oil-preparations-for-sore-mouth" | "ayuverdic-ointments" | "benzocaine-preparation-not-for-children" | "camphor-preparations" | "carmellose-preparations" | "chlorinate-lime-eusol-solution" | "clove-oil" | "dental-floss" | "dequalinium-prepartions" | "diclofenac-ointment-cream-or-gel" | "eucalyptus" | "eucalyptus-oil-preparations" | "eucalyptus-products" | "eugenol" | "first-aid-ointment" | "gentian-violet-solution" | "ibuprofen-ephedrine-combinations" | "iodine-solution" | "lozenges" | "magnesium-trisillicate" | "menthol" | "menthol-products" | "mentholatum-preparations" | "methyl-salicylate-products" | "mouth-washes" | "paracetamol-in-immediate-release-tablets-capsules-or-liquid" | "simethicone" | "tonic" | "undecylenic-acid-preparations" | "vitamins-other" | "whitfields-ointment";
            name: string;
        })[];
    };
};

export { LabTest, Medication, labTests, medications };
