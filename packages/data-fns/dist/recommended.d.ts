import _labTests from "./data/core/lab-tests.json";
import medicationAddo from "./data/core/medications-addo.json";
import medicationGeneralSales from "./data/core/medications-general-sales.json";
/**
 * Type of the lab tests
 */
export declare type LabTest = keyof typeof _labTests;
/**
 * All medicaitons
 */
export declare namespace Medication {
    type Addo = keyof typeof medicationAddo;
    type GS = keyof typeof medicationGeneralSales;
}
export declare const labTests: {
    fromId: (id: LabTest) => {
        id: LabTest;
        name: string;
    };
    ids: () => ("blood-pressure" | "anti-toxoplasma-ig-g-serology" | "blood-culture" | "c-reactive-protein-crp" | "cd-4-count" | "chest-x-ray-cxr" | "ct-scan" | "electrolytes-test" | "full-blood-picture-fbp" | "gene-xpert" | "h-pylori-stool-test" | "hepatitis-b-pcr-hbv-dna" | "hepatitis-b-surface-antibody-hep-bs-ab" | "hepatitis-b-surface-antigen-h-bs-ag" | "hiv-pcr" | "hiv-rapid-test" | "hiv-viral-load" | "hpv-screening" | "kidney-function-tests" | "liver-function-tests" | "microscopy" | "microscopy-of-sputum" | "mrdt" | "mri" | "pap-smear" | "pcr-test" | "pelvic-exam" | "pregnancy-test" | "spinal-fluid-tap" | "sputum-culture" | "stool-analysis" | "syphilis-test" | "ultrasound" | "ultrasound-of-pelvis" | "urinalysis")[];
    values: () => {
        id: "blood-pressure" | "anti-toxoplasma-ig-g-serology" | "blood-culture" | "c-reactive-protein-crp" | "cd-4-count" | "chest-x-ray-cxr" | "ct-scan" | "electrolytes-test" | "full-blood-picture-fbp" | "gene-xpert" | "h-pylori-stool-test" | "hepatitis-b-pcr-hbv-dna" | "hepatitis-b-surface-antibody-hep-bs-ab" | "hepatitis-b-surface-antigen-h-bs-ag" | "hiv-pcr" | "hiv-rapid-test" | "hiv-viral-load" | "hpv-screening" | "kidney-function-tests" | "liver-function-tests" | "microscopy" | "microscopy-of-sputum" | "mrdt" | "mri" | "pap-smear" | "pcr-test" | "pelvic-exam" | "pregnancy-test" | "spinal-fluid-tap" | "sputum-culture" | "stool-analysis" | "syphilis-test" | "ultrasound" | "ultrasound-of-pelvis" | "urinalysis";
        name: string;
    }[];
};
export declare const medications: {
    addo: {
        fromId: (id: Medication.Addo) => {
            id: Medication.Addo;
            name: string;
        };
        ids: () => ("antihistamines" | "cough-suppressants" | "corticosteroids" | "diuretics" | "bronchodilators" | "acetaminophen" | "acyclovir" | "albendazole" | "aminophylline-injection" | "amoxicillin-capsules" | "amoxicillin-oral-suspension" | "amoxicillin-clavulanate-amoxyclav" | "ampiclox" | "annusol-suppositories" | "anti-fungal-pessaries" | "artemether-lumefantrine-alu" | "azithromycin" | "bendrofluazide" | "benzyl-benzoate" | "benzyl-penicillin-powder-for-injection" | "bisacodyl-tablets" | "cephalexin" | "cetrizine" | "cetrizine-hydrochloride-syrup" | "cetrizine-hydrochloride-tablets" | "chloramphenicol-eye-drops-ointment" | "ciprofloxacin" | "clindamycin" | "cloxacillin" | "co-trimoxazole-suspension" | "condoms" | "deworming-tablets" | "dextrose-5" | "diazepam" | "diclofenac-sodium-tablets" | "doxycycline-capsules-tablets" | "ear-drops" | "ergometrine-injection" | "erythromycin" | "fluconazole" | "fluids" | "folic-acid-tabs" | "gentamycin-eyedrops" | "hydrocortisone-cream" | "ibuprofen" | "imiquimod" | "iron-supplements" | "levofloxacin" | "metronidazole" | "nasal-decongestant" | "nonsteroidal-anti-inflammatory-drugs-nsaids" | "normal-saline-injection" | "nyastatin-oral-suspension" | "nystatin-oral-suspension" | "nystatin-pessaries" | "nystatin-skin-ointment" | "nystatin-tablets" | "oral-contraceptive-pills" | "oxytetracycline-hydrochloride-eye-ointment" | "phenoxymethyl-penicillin-suspension" | "phenoxymethyl-penicillin-tablets" | "phenytoin" | "piperazine-and-its-salts-in-oral-dosage-forms" | "procaine-penicillin-fortified" | "promethazine-injection" | "propranolol" | "quinine-injection" | "quinine-tablets" | "salicylic-acid-ointment" | "scaboma" | "silver-sulfadiazine-cream" | "sulfadoxine-pyrimethamine" | "topical-corticosteroid-cream" | "topical-skin-cream" | "vitamin-c" | "vitamin-d" | "water-for-injection" | "zinc")[];
        values: () => {
            id: "antihistamines" | "cough-suppressants" | "corticosteroids" | "diuretics" | "bronchodilators" | "acetaminophen" | "acyclovir" | "albendazole" | "aminophylline-injection" | "amoxicillin-capsules" | "amoxicillin-oral-suspension" | "amoxicillin-clavulanate-amoxyclav" | "ampiclox" | "annusol-suppositories" | "anti-fungal-pessaries" | "artemether-lumefantrine-alu" | "azithromycin" | "bendrofluazide" | "benzyl-benzoate" | "benzyl-penicillin-powder-for-injection" | "bisacodyl-tablets" | "cephalexin" | "cetrizine" | "cetrizine-hydrochloride-syrup" | "cetrizine-hydrochloride-tablets" | "chloramphenicol-eye-drops-ointment" | "ciprofloxacin" | "clindamycin" | "cloxacillin" | "co-trimoxazole-suspension" | "condoms" | "deworming-tablets" | "dextrose-5" | "diazepam" | "diclofenac-sodium-tablets" | "doxycycline-capsules-tablets" | "ear-drops" | "ergometrine-injection" | "erythromycin" | "fluconazole" | "fluids" | "folic-acid-tabs" | "gentamycin-eyedrops" | "hydrocortisone-cream" | "ibuprofen" | "imiquimod" | "iron-supplements" | "levofloxacin" | "metronidazole" | "nasal-decongestant" | "nonsteroidal-anti-inflammatory-drugs-nsaids" | "normal-saline-injection" | "nyastatin-oral-suspension" | "nystatin-oral-suspension" | "nystatin-pessaries" | "nystatin-skin-ointment" | "nystatin-tablets" | "oral-contraceptive-pills" | "oxytetracycline-hydrochloride-eye-ointment" | "phenoxymethyl-penicillin-suspension" | "phenoxymethyl-penicillin-tablets" | "phenytoin" | "piperazine-and-its-salts-in-oral-dosage-forms" | "procaine-penicillin-fortified" | "promethazine-injection" | "propranolol" | "quinine-injection" | "quinine-tablets" | "salicylic-acid-ointment" | "scaboma" | "silver-sulfadiazine-cream" | "sulfadoxine-pyrimethamine" | "topical-corticosteroid-cream" | "topical-skin-cream" | "vitamin-c" | "vitamin-d" | "water-for-injection" | "zinc";
            name: string;
        }[];
    };
    gs: {
        ids: () => ("acetylsalicylic-acid-and-its-salts" | "acetylsalicylic-acid-paracetamol-caffeine-combinations" | "aluminium-hydroxide" | "arachis-oil-preparations-for-sore-mouth" | "ayuverdic-ointments" | "benzocaine-preparation-not-for-children" | "camphor-preparations" | "carmellose-preparations" | "chlorinate-lime-eusol-solution" | "clove-oil" | "dental-floss" | "dequalinium-prepartions" | "diclofenac-ointment-cream-or-gel" | "eucalyptus" | "eucalyptus-oil-preparations" | "eucalyptus-products" | "eugenol" | "first-aid-ointment" | "gentian-violet-solution" | "ibuprofen-ephedrine-combinations" | "iodine-solution" | "lozenges" | "magnesium-trisillicate" | "menthol" | "menthol-products" | "mentholatum-preparations" | "methyl-salicylate-products" | "mouth-washes" | "oral-rehydration-salts-ors" | "paracetamol-in-immediate-release-tablets-capsules-or-liquid" | "simethicone" | "tonic" | "undecylenic-acid-preparations" | "vitamins-other" | "whitfields-ointment")[];
        fromId: (id: Medication.GS) => {
            id: Medication.GS;
            name: string;
        };
        values: () => {
            id: "acetylsalicylic-acid-and-its-salts" | "acetylsalicylic-acid-paracetamol-caffeine-combinations" | "aluminium-hydroxide" | "arachis-oil-preparations-for-sore-mouth" | "ayuverdic-ointments" | "benzocaine-preparation-not-for-children" | "camphor-preparations" | "carmellose-preparations" | "chlorinate-lime-eusol-solution" | "clove-oil" | "dental-floss" | "dequalinium-prepartions" | "diclofenac-ointment-cream-or-gel" | "eucalyptus" | "eucalyptus-oil-preparations" | "eucalyptus-products" | "eugenol" | "first-aid-ointment" | "gentian-violet-solution" | "ibuprofen-ephedrine-combinations" | "iodine-solution" | "lozenges" | "magnesium-trisillicate" | "menthol" | "menthol-products" | "mentholatum-preparations" | "methyl-salicylate-products" | "mouth-washes" | "oral-rehydration-salts-ors" | "paracetamol-in-immediate-release-tablets-capsules-or-liquid" | "simethicone" | "tonic" | "undecylenic-acid-preparations" | "vitamins-other" | "whitfields-ointment";
            name: string;
        }[];
    };
    all: {
        ids: () => ("antihistamines" | "cough-suppressants" | "corticosteroids" | "diuretics" | "bronchodilators" | "acetaminophen" | "acyclovir" | "albendazole" | "aminophylline-injection" | "amoxicillin-capsules" | "amoxicillin-oral-suspension" | "amoxicillin-clavulanate-amoxyclav" | "ampiclox" | "annusol-suppositories" | "anti-fungal-pessaries" | "artemether-lumefantrine-alu" | "azithromycin" | "bendrofluazide" | "benzyl-benzoate" | "benzyl-penicillin-powder-for-injection" | "bisacodyl-tablets" | "cephalexin" | "cetrizine" | "cetrizine-hydrochloride-syrup" | "cetrizine-hydrochloride-tablets" | "chloramphenicol-eye-drops-ointment" | "ciprofloxacin" | "clindamycin" | "cloxacillin" | "co-trimoxazole-suspension" | "condoms" | "deworming-tablets" | "dextrose-5" | "diazepam" | "diclofenac-sodium-tablets" | "doxycycline-capsules-tablets" | "ear-drops" | "ergometrine-injection" | "erythromycin" | "fluconazole" | "fluids" | "folic-acid-tabs" | "gentamycin-eyedrops" | "hydrocortisone-cream" | "ibuprofen" | "imiquimod" | "iron-supplements" | "levofloxacin" | "metronidazole" | "nasal-decongestant" | "nonsteroidal-anti-inflammatory-drugs-nsaids" | "normal-saline-injection" | "nyastatin-oral-suspension" | "nystatin-oral-suspension" | "nystatin-pessaries" | "nystatin-skin-ointment" | "nystatin-tablets" | "oral-contraceptive-pills" | "oxytetracycline-hydrochloride-eye-ointment" | "phenoxymethyl-penicillin-suspension" | "phenoxymethyl-penicillin-tablets" | "phenytoin" | "piperazine-and-its-salts-in-oral-dosage-forms" | "procaine-penicillin-fortified" | "promethazine-injection" | "propranolol" | "quinine-injection" | "quinine-tablets" | "salicylic-acid-ointment" | "scaboma" | "silver-sulfadiazine-cream" | "sulfadoxine-pyrimethamine" | "topical-corticosteroid-cream" | "topical-skin-cream" | "vitamin-c" | "vitamin-d" | "water-for-injection" | "zinc" | "acetylsalicylic-acid-and-its-salts" | "acetylsalicylic-acid-paracetamol-caffeine-combinations" | "aluminium-hydroxide" | "arachis-oil-preparations-for-sore-mouth" | "ayuverdic-ointments" | "benzocaine-preparation-not-for-children" | "camphor-preparations" | "carmellose-preparations" | "chlorinate-lime-eusol-solution" | "clove-oil" | "dental-floss" | "dequalinium-prepartions" | "diclofenac-ointment-cream-or-gel" | "eucalyptus" | "eucalyptus-oil-preparations" | "eucalyptus-products" | "eugenol" | "first-aid-ointment" | "gentian-violet-solution" | "ibuprofen-ephedrine-combinations" | "iodine-solution" | "lozenges" | "magnesium-trisillicate" | "menthol" | "menthol-products" | "mentholatum-preparations" | "methyl-salicylate-products" | "mouth-washes" | "oral-rehydration-salts-ors" | "paracetamol-in-immediate-release-tablets-capsules-or-liquid" | "simethicone" | "tonic" | "undecylenic-acid-preparations" | "vitamins-other" | "whitfields-ointment")[];
        values: () => ({
            id: "antihistamines" | "cough-suppressants" | "corticosteroids" | "diuretics" | "bronchodilators" | "acetaminophen" | "acyclovir" | "albendazole" | "aminophylline-injection" | "amoxicillin-capsules" | "amoxicillin-oral-suspension" | "amoxicillin-clavulanate-amoxyclav" | "ampiclox" | "annusol-suppositories" | "anti-fungal-pessaries" | "artemether-lumefantrine-alu" | "azithromycin" | "bendrofluazide" | "benzyl-benzoate" | "benzyl-penicillin-powder-for-injection" | "bisacodyl-tablets" | "cephalexin" | "cetrizine" | "cetrizine-hydrochloride-syrup" | "cetrizine-hydrochloride-tablets" | "chloramphenicol-eye-drops-ointment" | "ciprofloxacin" | "clindamycin" | "cloxacillin" | "co-trimoxazole-suspension" | "condoms" | "deworming-tablets" | "dextrose-5" | "diazepam" | "diclofenac-sodium-tablets" | "doxycycline-capsules-tablets" | "ear-drops" | "ergometrine-injection" | "erythromycin" | "fluconazole" | "fluids" | "folic-acid-tabs" | "gentamycin-eyedrops" | "hydrocortisone-cream" | "ibuprofen" | "imiquimod" | "iron-supplements" | "levofloxacin" | "metronidazole" | "nasal-decongestant" | "nonsteroidal-anti-inflammatory-drugs-nsaids" | "normal-saline-injection" | "nyastatin-oral-suspension" | "nystatin-oral-suspension" | "nystatin-pessaries" | "nystatin-skin-ointment" | "nystatin-tablets" | "oral-contraceptive-pills" | "oxytetracycline-hydrochloride-eye-ointment" | "phenoxymethyl-penicillin-suspension" | "phenoxymethyl-penicillin-tablets" | "phenytoin" | "piperazine-and-its-salts-in-oral-dosage-forms" | "procaine-penicillin-fortified" | "promethazine-injection" | "propranolol" | "quinine-injection" | "quinine-tablets" | "salicylic-acid-ointment" | "scaboma" | "silver-sulfadiazine-cream" | "sulfadoxine-pyrimethamine" | "topical-corticosteroid-cream" | "topical-skin-cream" | "vitamin-c" | "vitamin-d" | "water-for-injection" | "zinc";
            name: string;
        } | {
            id: "acetylsalicylic-acid-and-its-salts" | "acetylsalicylic-acid-paracetamol-caffeine-combinations" | "aluminium-hydroxide" | "arachis-oil-preparations-for-sore-mouth" | "ayuverdic-ointments" | "benzocaine-preparation-not-for-children" | "camphor-preparations" | "carmellose-preparations" | "chlorinate-lime-eusol-solution" | "clove-oil" | "dental-floss" | "dequalinium-prepartions" | "diclofenac-ointment-cream-or-gel" | "eucalyptus" | "eucalyptus-oil-preparations" | "eucalyptus-products" | "eugenol" | "first-aid-ointment" | "gentian-violet-solution" | "ibuprofen-ephedrine-combinations" | "iodine-solution" | "lozenges" | "magnesium-trisillicate" | "menthol" | "menthol-products" | "mentholatum-preparations" | "methyl-salicylate-products" | "mouth-washes" | "oral-rehydration-salts-ors" | "paracetamol-in-immediate-release-tablets-capsules-or-liquid" | "simethicone" | "tonic" | "undecylenic-acid-preparations" | "vitamins-other" | "whitfields-ointment";
            name: string;
        })[];
    };
};
//# sourceMappingURL=recommended.d.ts.map