import _symptoms from "./data/core/symptoms-base.json";
import _conditions from "./data/core/conditions.json";
export declare type Symptom = keyof typeof _symptoms;
export declare type SymptomDescription = {
    location: string[];
    duration: string[];
    onset: string[];
    nature: string[];
    periodicity: string[];
    aggravators: string[];
    reducers: string[];
};
export declare type Condition = keyof typeof _conditions;
/**
 * Symptoms that are supported by elsa
 * @returns `{ id: Symptom } & SymptomDescription`
 */
export declare const symptoms: {
    symptom: {
        fromId: (id: Symptom) => SymptomDescription;
    };
    ids: () => ("dehydration" | "malnutrition" | "complicated-malaria" | "bronchiolitis" | "otitis-externa" | "supprative-otitis-media" | "pneumocystis-pneumonia" | "ectopic-pregnancy" | "pelvic-inflammatory-disease" | "genital-warts" | "malaria" | "pneumonia" | "tuberculosis" | "coryza" | "sinusitis" | "bronchitis" | "gastritis" | "otitis-media" | "trichuriasis" | "conjunctivitis" | "urinary-tract-infection-uti" | "dysentry" | "ascariasis" | "asthma" | "influenza" | "tonsilitis" | "laryngitis" | "chronic-obstructive-pulmonary-disease-copd" | "syphillis" | "gonorrhea" | "hiv-aids" | "bacterial-vaginosis" | "vulvovaginal-candidiasis" | "trichomoniasis" | "acute-watery-diarrhoea" | "chlamydia" | "genital-herpes" | "human-papillomavirus-hpv" | "anaemia" | "oral-thrush" | "typhoid" | "cholera" | "meningitis" | "epilepsy" | "hypertension" | "scabies" | "gastroenteritis" | "heat-rash" | "stomatitis" | "bacteremia" | "cephalohematoma" | "tinea-corporis" | "impetigo" | "umbilical-cord-sepsis" | "sepsis" | "pediatric-hiv-aids" | "hepatitis-b" | "toxoplasmosis")[];
    values: () => ({
        id: "constipation" | "crying" | "fever" | "tachycardia" | "abdominal-distension" | "abdominal-pain" | "abdominal-tenderness" | "ageusia" | "angular-cheilitis" | "anosmia" | "ascites" | "blood-pressure" | "bow-legs" | "brudzinskis-sign" | "capillary-refill" | "cardiomegaly" | "chest-pain" | "chest-tightness" | "clubbing" | "convulsions" | "cough" | "cyanosis" | "dactylitis" | "dehydration" | "dental-pain" | "diarrhoea" | "drinking-ability" | "dry-mucosa" | "dysphagia" | "dysphonia" | "dyspnoea" | "dysuria" | "ear-pressure" | "ecchymosis" | "edema" | "enlarged-tonsils" | "enlarged-tympanic-membrane" | "enurisis" | "epitastaxis" | "excessive-sweating" | "facial-pain" | "facial-pressure" | "foamy-urine" | "frontal-bossing" | "growth-failure" | "haemoptysis" | "hair-changes" | "hair-loss" | "halitosis" | "headache" | "hearing-loss" | "heart-murmur" | "hemarthrosis" | "hematoma" | "hematuria" | "hepatomegaly" | "hyperemic-larynx" | "hyperemic-pharynx" | "sore-throat" | "hyperemic-tonsils" | "hyperemic-tympanic-membrane" | "hyperpigmentation" | "hypopigmentation" | "hypothermia" | "indrawing" | "intercostal-recession" | "irritability" | "jaundice" | "joint-pain" | "joint-swelling" | "kernigs-sign" | "limited-range-of-motion" | "malnutrition" | "weight-loss" | "weight-gain" | "mental-status" | "mid-upper-arm-circumference" | "underweight" | "muscle-tone" | "muscle-weakness" | "nasal-congestion" | "nasal-discharge" | "nasal-polyps" | "night-sweats" | "oliguria" | "orthopnea" | "otalgia" | "otorrhea" | "pallor" | "peritonsillar-abscess" | "petechiae" | "photosensitivity" | "polyuria" | "poor-feeding" | "pruritis" | "pulling-on-ear" | "pulse-rate" | "purpura" | "reduced-appetite" | "rhinorrhea" | "seizures" | "sinus-tenderness" | "skin-desquamation" | "skin-lesions" | "skin-rash" | "skin-turgor" | "sneezing" | "snoring" | "splenomegaly" | "stridor" | "stunting" | "sunken-eyes" | "syncope" | "tachypnoea" | "teeth-malocclusion" | "tet-spell" | "vomiting" | "wasting" | "weight-faltering" | "wheezing";
    } & SymptomDescription)[];
};
/**
 * All conditions supporteed by elsa
 * @returns `{ id: Condition, name: string}`
 */
export declare const conditions: {
    name: {
        fromId: (id: Condition) => string;
    };
    ids: () => ("dehydration" | "malnutrition" | "complicated-malaria" | "bronchiolitis" | "otitis-externa" | "supprative-otitis-media" | "pneumocystis-pneumonia" | "ectopic-pregnancy" | "pelvic-inflammatory-disease" | "genital-warts" | "malaria" | "pneumonia" | "tuberculosis" | "coryza" | "sinusitis" | "bronchitis" | "gastritis" | "otitis-media" | "trichuriasis" | "conjunctivitis" | "urinary-tract-infection-uti" | "dysentry" | "ascariasis" | "asthma" | "influenza" | "tonsilitis" | "laryngitis" | "chronic-obstructive-pulmonary-disease-copd" | "syphillis" | "gonorrhea" | "hiv-aids" | "bacterial-vaginosis" | "vulvovaginal-candidiasis" | "trichomoniasis" | "acute-watery-diarrhoea" | "chlamydia" | "genital-herpes" | "human-papillomavirus-hpv" | "anaemia" | "oral-thrush" | "typhoid" | "cholera" | "meningitis" | "epilepsy" | "hypertension" | "scabies" | "gastroenteritis" | "heat-rash" | "stomatitis" | "bacteremia" | "cephalohematoma" | "tinea-corporis" | "impetigo" | "umbilical-cord-sepsis" | "sepsis" | "pediatric-hiv-aids" | "hepatitis-b" | "toxoplasmosis")[];
    values: () => {
        id: "dehydration" | "malnutrition" | "complicated-malaria" | "bronchiolitis" | "otitis-externa" | "supprative-otitis-media" | "pneumocystis-pneumonia" | "ectopic-pregnancy" | "pelvic-inflammatory-disease" | "genital-warts" | "malaria" | "pneumonia" | "tuberculosis" | "coryza" | "sinusitis" | "bronchitis" | "gastritis" | "otitis-media" | "trichuriasis" | "conjunctivitis" | "urinary-tract-infection-uti" | "dysentry" | "ascariasis" | "asthma" | "influenza" | "tonsilitis" | "laryngitis" | "chronic-obstructive-pulmonary-disease-copd" | "syphillis" | "gonorrhea" | "hiv-aids" | "bacterial-vaginosis" | "vulvovaginal-candidiasis" | "trichomoniasis" | "acute-watery-diarrhoea" | "chlamydia" | "genital-herpes" | "human-papillomavirus-hpv" | "anaemia" | "oral-thrush" | "typhoid" | "cholera" | "meningitis" | "epilepsy" | "hypertension" | "scabies" | "gastroenteritis" | "heat-rash" | "stomatitis" | "bacteremia" | "cephalohematoma" | "tinea-corporis" | "impetigo" | "umbilical-cord-sepsis" | "sepsis" | "pediatric-hiv-aids" | "hepatitis-b" | "toxoplasmosis";
        name: string;
    }[];
};
export declare const donparMap: {
    translate: (language: "en" | "sw") => {
        onset: {
            gradual: string;
            sudden: string;
            focol: string;
            generalized: string;
        };
        nature: {
            symmetrical: string;
            asymmetrical: string;
            generalized: string;
            localized: string;
            mild: string;
            moderate: string;
            severe: string;
            normal: string;
            low: string;
            high: string;
            "two-to-three-seconds": string;
            "three-to-four-seconds": string;
            "more-than-four-seconds": string;
            sharp: string;
            stabbing: string;
            dull: string;
            aching: string;
            colic: string;
            "hard-stool": string;
            "blood-stool": string;
            "melena-stool": string;
            dry: string;
            "yellow-sputum": string;
            "green-sputum": string;
            "clear-sputum": string;
            "jelly-like-sputum": string;
            "blood-stained": string;
            "rusty-red-sputum": string;
            "high-pitched": string;
            central: string;
            peripheral: string;
            watery: string;
            bloody: string;
            mucoid: string;
            eagerly: string;
            "unable-to-drink": string;
            "very-dry": string;
            progressive: string;
            "non-progressive": string;
            "burning-sensation": string;
            "large-confluent-lesion": string;
            "progressive-decrease-during-day": string;
            persistent: string;
            "low-grade": string;
            "high-grade": string;
            intermittent: string;
            dyspigmentation: string;
            "easily-pluckable": string;
            throbbing: string;
            "tight-band-around-head": string;
            pulsing: string;
            partial: string;
            full: string;
            "systolic-murmur": string;
            "diastolic-murmur": string;
            continuous: string;
            painless: string;
            painful: string;
            microscopic: string;
            macroscopic: string;
            smooth: string;
            tender: string;
            craggy: string;
            irritable: string;
            lethargic: string;
            comatose: string;
            monoarthritis: string;
            oligoarthritis: string;
            polyarthritis: string;
            hypotonia: string;
            hypertonia: string;
            thick: string;
            "foul-smelling": string;
            colored: string;
            purulent: string;
            "prgoressive-worsening": string;
            serous: string;
            blood: string;
            "pin-point-hemmorhage": string;
            "slightly-increased": string;
            tachycardia: string;
            "large-raised-lesion": string;
            "clear-colored": string;
            "nasal-obstruction": string;
            "tonic-seizures": string;
            "clonic-seizures": string;
            "tonic-clonic-seizures": string;
            "myoclonic-seizures": string;
            "atonic-seizures": string;
            "absence-seizures": string;
            "febrile-seizures": string;
            macules: string;
            papules: string;
            nodules: string;
            plaques: string;
            wheal: string;
            blisters: string;
            scales: string;
            crust: string;
            erosions: string;
            ulcers: string;
            atrophy: string;
            lichenification: string;
            burrow: string;
            comedones: string;
            malar: string;
            discoid: string;
            "mild-delay-less-than-2-seconds": string;
            "severe-delay-more-than-2-seconds": string;
            expiratory: string;
            inspiratory: string;
            projectile: string;
            "non-projectile": string;
            "bile-stained-yellow": string;
            "bile-stained-green": string;
            "clear-with-food": string;
        };
        aggravators: {
            constipation: string;
            "cold-weather": string;
            "deep-breathing": string;
            coughing: string;
            exercise: string;
            "light-activity": string;
            "laying-down": string;
            dust: string;
            pollen: string;
            smoke: string;
            "bright-lights": string;
            "non-steroidal-anti-inflammatory-drugs": string;
            chewing: string;
            food: string;
            "drinking-cold-water": string;
            speaking: string;
            "lying-flat": string;
            "standing-or-sitting": string;
            "lying-on-one-side": string;
            sleeping: string;
            "light-exercise": string;
            cold: string;
            "increased-fluid-intake": string;
            eating: string;
            crying: string;
            "standing-up": string;
            stress: string;
            "emotional-conflict": string;
            "bending-forward": string;
            fever: string;
            "joint-movement": string;
            "decreased-fluid-intake": string;
            "exposure-to-sunlight": string;
            diuretics: string;
            spores: string;
            "dust-mites": string;
            "chemical-irritants": string;
            "eating-or-drinking": string;
            "drinking water": string;
            "cold-air": string;
            aspirin: string;
        };
        location: {
            lower: string;
            upper: string;
            hands: string;
            feet: string;
            hand: string;
            foot: string;
            eyes: string;
            nose: string;
            mouth: string;
            "lateral-right": string;
            "lateral-left": string;
            bilateral: string;
            face: string;
            scalp: string;
            trunk: string;
            back: string;
            legs: string;
            arms: string;
            genitals: string;
            generalized: string;
            facial: string;
            periorbital: string;
            "lower-limbs": string;
            abdomen: string;
            frontal: string;
            "top-of-head": string;
            temples: string;
            "both-eyes": string;
            "one-eye": string;
            unilateral: string;
            head: string;
            "lower-chest-wall": string;
            knee: string;
            elbow: string;
            hip: string;
            wrist: string;
            ankle: string;
        };
        duration: {
            "less-than-two-weeks": string;
            "more-than-two-weeks": string;
            "less-than-two-days": string;
            "more-than-two-days": string;
            "less-than-five-days": string;
            "five-days-to-three-weeks": string;
            "three-to-eight-weeks": string;
            "more-than-eight-weeks": string;
            "less-than-three-weeks": string;
            chronic: string;
            "less-than-six-weeks": string;
            "more-than-six-weeks": string;
            "less-than-24-hours": string;
            "between-two-and-six-weeks": string;
            "less-than-five-minutes": string;
            "more-than-five-minutes": string;
        };
        periodicity: {
            "non-specific": string;
            intermittent: string;
            sustained: string;
            morning: string;
            night: string;
            intermitted: string;
            "early-morning": string;
            "during-meals": string;
            afternoon: string;
            persistent: string;
            relapsing: string;
            "step-ladder": string;
            remittent: string;
            recurrent: string;
            "non-periodic": string;
            "night-time": string;
            "more-intense-at-night": string;
            seasonal: string;
            "waking-up": string;
            feeding: string;
            exertion: string;
            crying: string;
        };
        reducers: {
            rest: string;
            "laying-down": string;
            sleeping: string;
            "stool-softeners": string;
            antihistamines: string;
            "cough-suppressants": string;
            "pain-relievers": string;
            antidiarrheal: string;
            hunger: string;
            sitting: string;
            "bladder-training": string;
            antipyretics: string;
            "anti-inflammatories": string;
            antibiotics: string;
            corticosteroids: string;
            "drinking-hot-water": string;
            diuretics: string;
            standing: string;
            "not-eating": string;
            antiemetic: string;
            "water-intake": string;
            "laying down": string;
            bronchodilators: string;
        };
    } | {
        onset: {
            gradual: string;
            sudden: string;
            focol: string;
            generalized: string;
        };
        nature: {
            symmetrical: string;
            asymmetrical: string;
            generalized: string;
            localized: string;
            mild: string;
            moderate: string;
            severe: string;
            normal: string;
            low: string;
            high: string;
            "two-to-three-seconds": string;
            "three-to-four-seconds": string;
            "more-than-four-seconds": string;
            sharp: string;
            stabbing: string;
            dull: string;
            aching: string;
            colic: string;
            "hard-stool": string;
            "blood-stool": string;
            "melena-stool": string;
            dry: string;
            "yellow-sputum": string;
            "green-sputum": string;
            "clear-sputum": string;
            "jelly-like-sputum": string;
            "blood-stained": string;
            "rusty-red-sputum": string;
            "high-pitched": string;
            central: string;
            peripheral: string;
            watery: string;
            bloody: string;
            mucoid: string;
            eagerly: string;
            "unable-to-drink": string;
            "very-dry": string;
            progressive: string;
            "non-progressive": string;
            "burning-sensation": string;
            "large-confluent-lesion": string;
            "progressive-decrease-during-day": string;
            persistent: string;
            "low-grade": string;
            "high-grade": string;
            intermittent: string;
            dyspigmentation: string;
            "easily-pluckable": string;
            throbbing: string;
            "tight-band-around-head": string;
            pulsing: string;
            partial: string;
            full: string;
            continuous: string;
            painless: string;
            painful: string;
            smooth: string;
            tender: string;
            craggy: string;
            irritable: string;
            lethargic: string;
            comatose: string;
            monoarthritis: string;
            oligoarthritis: string;
            polyarthritis: string;
            hypotonia: string;
            hypertonia: string;
            thick: string;
            "foul-smelling": string;
            colored: string;
            purulent: string;
            "prgoressive-worsening": string;
            serous: string;
            blood: string;
            "slightly-increased": string;
            tachycardia: string;
            "large-raised-lesion": string;
            "clear-colored": string;
            "nasal-obstruction": string;
            macules: string;
            papules: string;
            nodules: string;
            plaques: string;
            wheal: string;
            blisters: string;
            scales: string;
            crust: string;
            erosions: string;
            ulcers: string;
            atrophy: string;
            lichenification: string;
            burrow: string;
            comedones: string;
            malar: string;
            discoid: string;
            "mild-delay-less-than-2-seconds": string;
            "severe-delay-more-than-2-seconds": string;
            expiratory: string;
            inspiratory: string;
            projectile: string;
            "non-projectile": string;
            "bile-stained-yellow": string;
            "bile-stained-green": string;
            "clear-with-food": string;
        };
        aggravators: {
            constipation: string;
            "cold-weather": string;
            "deep-breathing": string;
            coughing: string;
            exercise: string;
            "light-activity": string;
            "laying-down": string;
            dust: string;
            pollen: string;
            smoke: string;
            "bright-lights": string;
            chewing: string;
            food: string;
            "drinking-cold-water": string;
            speaking: string;
            "lying-flat": string;
            "standing-or-sitting": string;
            "lying-on-one-side": string;
            sleeping: string;
            "light-exercise": string;
            cold: string;
            "increased-fluid-intake": string;
            eating: string;
            crying: string;
            "standing-up": string;
            stress: string;
            "emotional-conflict": string;
            "bending-forward": string;
            fever: string;
            "joint-movement": string;
            "decreased-fluid-intake": string;
            "exposure-to-sunlight": string;
            diuretics: string;
            spores: string;
            "dust-mites": string;
            "chemical-irritants": string;
            "eating-or-drinking": string;
            "drinking water": string;
            "cold-air": string;
            aspirin: string;
            "non-steroidal-anti-inflammatory-drugs": string;
        };
        location: {
            lower: string;
            upper: string;
            hands: string;
            feet: string;
            hand: string;
            foot: string;
            eyes: string;
            nose: string;
            mouth: string;
            "lateral-right": string;
            "lateral-left": string;
            bilateral: string;
            face: string;
            scalp: string;
            trunk: string;
            back: string;
            legs: string;
            arms: string;
            facial: string;
            periorbital: string;
            "lower-limbs": string;
            abdomen: string;
            generalized: string;
            frontal: string;
            "top-of-head": string;
            temples: string;
            "both-eyes": string;
            "one-eye": string;
            unilateral: string;
            head: string;
            genitals: string;
            "lower-chest-wall": string;
            knee: string;
            elbow: string;
            hip: string;
            wrist: string;
            ankle: string;
        };
        duration: {
            "less-than-two-weeks": string;
            "more-than-two-weeks": string;
            "less-than-two-days": string;
            "more-than-two-days": string;
            "less-than-five-days": string;
            "five-days-to-three-weeks": string;
            "three-to-eight-weeks": string;
            "more-than-eight-weeks": string;
            "less-than-three-weeks": string;
            chronic: string;
            "less-than-six-weeks": string;
            "more-than-six-weeks": string;
            "less-than-24-hours": string;
            "between-two-and-six-weeks": string;
            "less-than-five-minutes": string;
            "more-than-five-minutes": string;
        };
        periodicity: {
            "non-specific": string;
            intermittent: string;
            sustained: string;
            morning: string;
            night: string;
            intermitted: string;
            "early-morning": string;
            "during-meals": string;
            afternoon: string;
            persistent: string;
            relapsing: string;
            "step-ladder": string;
            remittent: string;
            recurrent: string;
            "non-periodic": string;
            "more-intense-at-night": string;
            seasonal: string;
            "waking-up": string;
            feeding: string;
            exertion: string;
            crying: string;
        };
        reducers: {
            rest: string;
            "laying-down": string;
            sleeping: string;
            "stool-softeners": string;
            antihistamines: string;
            "cough-suppressants": string;
            "pain-relievers": string;
            antidiarrheal: string;
            hunger: string;
            sitting: string;
            "bladder-training": string;
            antipyretics: string;
            "anti-inflammatories": string;
            antibiotics: string;
            corticosteroids: string;
            "drinking-hot-water": string;
            diuretics: string;
            standing: string;
            "not-eating": string;
            antiemetic: string;
            "water-intake": string;
            "laying down": string;
            bronchodilators: string;
        };
    };
};
export declare const symptomsLocale: {
    translate: (language: "en" | "sw") => {
        "abdominal-distension": {
            name: string;
            tags: string[];
            description: string;
            symptom: string;
        };
        "abdominal-pain": {
            name: string;
            tags: string[];
            description: string;
            symptom: string; /**
             * Symptoms that are supported by elsa
             * @returns `{ id: Symptom } & SymptomDescription`
             */
        };
        "abdominal-tenderness": {
            name: string;
            tags: never[];
            description: string;
            symptom: string;
        };
        ageusia: {
            name: string;
            tags: string[];
            description: string;
            symptom: string;
        };
        "angular-cheilitis": {
            name: string;
            tags: never[];
            description: string;
            symptom: string;
        };
        anosmia: {
            name: string;
            tags: never[];
            description: string;
            symptom: string;
        };
        ascites: {
            name: string;
            tags: string[];
            description: string;
            symptom: string;
        };
        "blood-pressure": {
            name: string;
            tags: never[];
            description: string;
            symptom: string;
        };
        "bow-legs": {
            name: string;
            tags: string[];
            description: string;
            symptom: string;
        };
        "brudzinskis-sign": {
            name: string;
            tags: string[];
            description: string;
            symptom: string;
        };
        "capillary-refill": {
            name: string;
            tags: never[];
            description: string;
            symptom: string;
        };
        cardiomegaly: {
            name: string;
            tags: string[];
            description: string;
            symptom: string;
        };
        "chest-pain": {
            name: string;
            tags: string[];
            description: string;
            symptom: string;
        };
        "chest-tightness": {
            name: string;
            tags: string[];
            description: string;
            symptom: string;
        };
        clubbing: {
            name: string;
            tags: string[];
            description: string;
            symptom: string;
        };
        constipation: {
            name: string;
            tags: string[];
            description: string;
            symptom: string;
        };
        convulsions: {
            name: string;
            tags: never[];
            description: string;
            symptom: string;
        };
        cough: {
            name: string;
            tags: string[];
            description: string;
            symptom: string;
        };
        crying: {
            name: string;
            tags: string[];
            description: string;
            symptom: string;
        };
        cyanosis: {
            name: string;
            tags: string[];
            description: string;
            symptom: string;
        };
        dactylitis: {
            name: string;
            tags: string[];
            description: string;
            symptom: string;
        };
        dehydration: {
            name: string;
            tags: never[];
            description: string;
            symptom: string;
        };
        "dental-pain": {
            name: string;
            tags: string[];
            description: string;
            symptom: string;
        };
        diarrhoea: {
            name: string;
            tags: string[];
            description: string;
            symptom: string;
        };
        "drinking-ability": {
            name: string;
            tags: never[];
            description: string;
            symptom: string;
        };
        "dry-mucosa": {
            name: string;
            tags: never[];
            description: string;
            symptom: string;
        };
        dysphagia: {
            name: string;
            tags: string[];
            description: string;
            symptom: string;
        };
        dysphonia: {
            name: string;
            tags: never[];
            description: string;
            symptom: string;
        };
        dyspnoea: {
            name: string;
            tags: string[];
            description: string;
            symptom: string;
        };
        dysuria: {
            name: string;
            tags: string[];
            description: string;
            symptom: string;
        };
        "ear-pressure": {
            name: string;
            tags: string[];
            description: string;
            symptom: string;
        };
        ecchymosis: {
            name: string;
            tags: string[];
            description: string;
            symptom: string;
        };
        edema: {
            name: string;
            tags: string[];
            description: string;
            symptom: string;
        };
        "enlarged-tonsils": {
            name: string;
            tags: never[];
            description: string;
            symptom: string;
        };
        "enlarged-tympanic-membrane": {
            name: string;
            tags: string[];
            description: string;
            symptom: string;
        };
        enurisis: {
            name: string;
            tags: string[];
            description: string;
            symptom: string;
        };
        epitastaxis: {
            name: string;
            tags: never[];
            description: string;
            symptom: string;
        };
        "excessive-sweating": {
            name: string;
            tags: never[];
            description: string;
            symptom: string;
        };
        "facial-pain": {
            name: string;
            tags: never[];
            description: string;
            symptom: string;
        };
        "facial-pressure": {
            name: string;
            tags: never[];
            description: string;
            symptom: string;
        };
        fever: {
            name: string;
            tags: string[];
            description: string;
            symptom: string;
        };
        "foamy-urine": {
            name: string;
            tags: never[];
            description: string;
            symptom: string;
        };
        "frontal-bossing": {
            name: string;
            tags: string[];
            description: string;
            symptom: string;
        };
        "growth-failure": {
            name: string;
            tags: string[];
            description: string;
            symptom: string;
        };
        haemoptysis: {
            name: string;
            tags: never[];
            description: string;
            symptom: string;
        };
        "hair-changes": {
            name: string;
            tags: never[];
            description: string;
            symptom: string;
        };
        "hair-loss": {
            name: string;
            tags: never[];
            description: string;
            symptom: string;
        };
        halitosis: {
            name: string;
            tags: string[];
            description: string;
            symptom: string;
        };
        headache: {
            name: string;
            tags: string[];
            description: string;
            symptom: string;
        };
        "hearing-loss": {
            name: string;
            tags: string[];
            description: string;
            symptom: string;
        };
        "heart-murmur": {
            name: string;
            tags: never[];
            description: string;
            symptom: string;
        };
        hemarthrosis: {
            name: string;
            tags: string[];
            description: string;
            symptom: string;
        };
        hematoma: {
            name: string;
            tags: string[];
            description: string;
            symptom: string;
        };
        hematuria: {
            name: string;
            tags: string[];
            description: string;
            symptom: string;
        };
        hepatomegaly: {
            name: string;
            tags: never[];
            description: string;
            symptom: string;
        };
        "hyperemic-larynx": {
            name: string;
            tags: never[];
            description: string;
            symptom: string;
        };
        "hyperemic-pharynx": {
            name: string;
            tags: string[];
            description: string;
            symptom: string;
        };
        "hyperemic-tonsils": {
            name: string;
            tags: never[];
            description: string;
            symptom: string;
        };
        "hyperemic-tympanic-membrane": {
            name: string;
            tags: string[];
            description: string;
            symptom: string;
        };
        hyperpigmentation: {
            name: string;
            tags: string[];
            description: string;
            symptom: string;
        };
        hypopigmentation: {
            name: string;
            tags: string[];
            description: string;
            symptom: string;
        };
        hypothermia: {
            name: string;
            tags: string[];
            description: string;
            symptom: string;
        };
        indrawing: {
            name: string;
            tags: never[];
            description: string;
            symptom: string;
        };
        "intercostal-recession": {
            name: string;
            tags: never[];
            description: string;
            symptom: string;
        };
        irritability: {
            name: string;
            tags: string[];
            description: string;
            symptom: string;
        };
        jaundice: {
            name: string;
            tags: string[];
            description: string;
            symptom: string;
        };
        "joint-pain": {
            name: string;
            tags: never[];
            description: string;
            symptom: string;
        };
        "joint-swelling": {
            name: string;
            tags: string[];
            description: string;
            symptom: string;
        };
        "kernigs-sign": {
            name: string;
            tags: string[];
            description: string;
            symptom: string;
        };
        "limited-range-of-motion": {
            name: string;
            tags: string[];
            description: string;
            symptom: string;
        };
        malnutrition: {
            name: string;
            tags: string[];
            description: string;
            symptom: string;
        };
        "mental-status": {
            name: string;
            tags: string[];
            description: string;
            symptom: string;
        };
        "mid-upper-arm-circumference": {
            name: string;
            tags: string[];
            description: string;
            symptom: string;
        };
        "muscle-tone": {
            name: string;
            tags: never[];
            description: string;
            symptom: string;
        };
        "muscle-weakness": {
            name: string;
            tags: string[];
            description: string;
            symptom: string;
        };
        "nasal-congestion": {
            name: string;
            tags: string[];
            description: string;
            symptom: string;
        };
        "nasal-discharge": {
            name: string;
            tags: string[];
            description: string;
            symptom: string;
        };
        "nasal-polyps": {
            name: string;
            tags: never[];
            description: string;
            symptom: string;
        };
        "night-sweats": {
            name: string;
            tags: string[];
            description: string;
            symptom: string;
        };
        oliguria: {
            name: string;
            tags: string[];
            description: string;
            symptom: string;
        };
        orthopnea: {
            name: string;
            tags: string[];
            description: string;
            symptom: string;
        };
        otalgia: {
            name: string;
            tags: string[];
            description: string;
            symptom: string;
        };
        otorrhea: {
            name: string;
            tags: string[];
            description: string;
            symptom: string;
        };
        pallor: {
            name: string;
            tags: string[];
            description: string;
            symptom: string;
        };
        "peritonsillar-abscess": {
            name: string;
            tags: never[];
            description: string;
            symptom: string;
        };
        petechiae: {
            name: string;
            tags: string[];
            description: string;
            symptom: string;
        };
        photosensitivity: {
            name: string;
            tags: string[];
            description: string;
            symptom: string;
        };
        polyuria: {
            name: string;
            tags: never[];
            description: string;
            symptom: string;
        };
        "poor-feeding": {
            name: string;
            tags: string[];
            description: string;
            symptom: string;
        };
        pruritis: {
            name: string;
            tags: string[];
            description: string;
            symptom: string;
        };
        "pulling-on-ear": {
            name: string;
            tags: string[];
            description: string;
            symptom: string;
        };
        "pulse-rate": {
            name: string;
            tags: string[];
            description: string;
            symptom: string;
        };
        purpura: {
            name: string;
            tags: string[];
            description: string;
            symptom: string;
        };
        "reduced-appetite": {
            name: string;
            tags: string[];
            description: string;
            symptom: string;
        };
        rhinorrhea: {
            name: string;
            tags: string[];
            description: string;
            symptom: string;
        };
        seizures: {
            name: string;
            tags: string[];
            description: string;
            symptom: string;
        };
        "sinus-tenderness": {
            name: string;
            tags: never[];
            description: string;
            symptom: string;
        };
        "skin-desquamation": {
            name: string;
            tags: string[];
            description: string;
            symptom: string;
        };
        "skin-lesions": {
            name: string;
            tags: string[];
            description: string;
            symptom: string;
        };
        "skin-rash": {
            name: string;
            tags: string[];
            description: string;
            symptom: string;
        };
        "skin-turgor": {
            name: string;
            tags: never[];
            description: string;
            symptom: string;
        };
        sneezing: {
            name: string;
            tags: never[];
            description: string;
            symptom: string;
        };
        snoring: {
            name: string;
            tags: string[];
            description: string;
            symptom: string;
        };
        "sore-throat": {
            name: string;
            tags: never[];
            description: string;
            symptom: string;
        };
        splenomegaly: {
            name: string;
            tags: never[];
            description: string;
            symptom: string;
        };
        stridor: {
            name: string;
            tags: string[];
            description: string;
            symptom: string;
        };
        stunting: {
            name: string;
            tags: string[];
            description: string;
            symptom: string;
        };
        "sunken-eyes": {
            name: string;
            tags: never[];
            description: string;
            symptom: string;
        };
        syncope: {
            name: string;
            tags: string[];
            description: string;
            symptom: string;
        };
        tachycardia: {
            name: string;
            tags: string[];
            description: string;
            symptom: string;
        };
        tachypnoea: {
            name: string;
            tags: string[];
            description: string;
            symptom: string;
        };
        "teeth-malocclusion": {
            name: string;
            tags: never[];
            description: string;
            symptom: string;
        };
        "tet-spell": {
            name: string;
            tags: string[];
            description: string;
            symptom: string;
        };
        underweight: {
            name: string;
            tags: never[];
            description: string;
            symptom: string;
        };
        vomiting: {
            name: string;
            tags: string[];
            description: string;
            symptom: string;
        };
        wasting: {
            name: string;
            tags: never[];
            description: string;
            symptom: string;
        };
        "weight-faltering": {
            name: string;
            tags: string[];
            description: string;
            symptom: string;
        };
        "weight-gain": {
            name: string;
            tags: never[];
            description: string;
            symptom: string;
        };
        "weight-loss": {
            name: string;
            tags: never[];
            description: string;
            symptom: string;
        };
        wheezing: {
            name: string;
            tags: string[];
            description: string;
            symptom: string;
        };
    } | {
        "abdominal-distension": {
            name: string;
            tags: string[];
            description: string;
            symptom: string;
        };
        "abdominal-pain": {
            name: string;
            tags: string[];
            description: string;
            symptom: string;
        };
        "abdominal-tenderness": {
            name: string;
            tags: never[];
            description: string;
            symptom: string;
        };
        ageusia: {
            name: string;
            tags: string[];
            description: string;
            symptom: string;
        };
        "angular-cheilitis": {
            name: string;
            tags: never[];
            description: string;
            symptom: string;
        };
        anosmia: {
            name: string;
            tags: never[];
            description: string;
            symptom: string;
        };
        ascites: {
            name: string;
            tags: string[];
            description: string;
            symptom: string;
        };
        "blood-pressure": {
            name: string;
            tags: never[];
            description: string;
            symptom: string;
        };
        "bow-legs": {
            name: string;
            tags: string[];
            description: string;
            symptom: string;
        };
        "brudzinskis-sign": {
            name: string;
            tags: string[];
            description: string;
            symptom: string;
        };
        "capillary-refill": {
            name: string;
            tags: never[];
            description: string;
            symptom: string;
        };
        cardiomegaly: {
            name: string;
            tags: string[];
            description: string;
            symptom: string;
        };
        "chest-pain": {
            name: string;
            tags: string[];
            description: string;
            symptom: string;
        };
        "chest-tightness": {
            name: string;
            tags: string[];
            description: string;
            symptom: string;
        };
        clubbing: {
            name: string;
            tags: string[];
            description: string;
            symptom: string;
        };
        constipation: {
            name: string;
            tags: string[];
            description: string;
            symptom: string;
        };
        convulsions: {
            name: string;
            tags: never[];
            description: string;
            symptom: string;
        };
        cough: {
            name: string;
            tags: string[];
            description: string;
            symptom: string;
        };
        crying: {
            name: string;
            tags: string[];
            description: string;
            symptom: string;
        };
        cyanosis: {
            name: string;
            tags: string[];
            description: string;
            symptom: string;
        };
        dactylitis: {
            name: string;
            tags: string[];
            description: string;
            symptom: string;
        };
        dehydration: {
            name: string;
            tags: never[];
            description: string;
            symptom: string;
        };
        "dental-pain": {
            name: string;
            tags: string[];
            description: string;
            symptom: string;
        };
        diarrhoea: {
            name: string;
            tags: string[];
            description: string;
            symptom: string;
        };
        "drinking-ability": {
            name: string;
            tags: never[];
            description: string;
            symptom: string;
        };
        "dry-mucosa": {
            name: string;
            tags: never[];
            description: string;
            symptom: string;
        };
        dysphagia: {
            name: string;
            tags: string[];
            description: string;
            symptom: string;
        };
        dysphonia: {
            name: string;
            tags: never[];
            description: string;
            symptom: string;
        };
        dyspnoea: {
            name: string;
            tags: string[];
            description: string;
            symptom: string;
        };
        dysuria: {
            name: string;
            tags: string[];
            description: string;
            symptom: string;
        };
        "ear-pressure": {
            name: string;
            tags: string[];
            description: string;
            symptom: string;
        };
        ecchymosis: {
            name: string;
            tags: string[];
            description: string;
            symptom: string;
        };
        edema: {
            name: string;
            tags: string[];
            description: string;
            symptom: string;
        };
        "enlarged-tonsils": {
            name: string;
            tags: never[];
            description: string;
            symptom: string;
        };
        "enlarged-tympanic-membrane": {
            name: string;
            tags: string[];
            description: string;
            symptom: string;
        };
        enurisis: {
            name: string;
            tags: string[];
            description: string;
            symptom: string;
        };
        epitastaxis: {
            name: string;
            tags: never[];
            description: string;
            symptom: string;
        };
        "excessive-sweating": {
            name: string;
            tags: never[];
            description: string;
            symptom: string;
        };
        "facial-pain": {
            name: string;
            tags: never[];
            description: string;
            symptom: string;
        };
        "facial-pressure": {
            name: string;
            tags: never[];
            description: string;
            symptom: string;
        };
        fever: {
            name: string;
            tags: string[];
            description: string;
            symptom: string;
        };
        "foamy-urine": {
            name: string;
            tags: never[];
            description: string;
            symptom: string;
        };
        "frontal-bossing": {
            name: string;
            tags: string[];
            description: string;
            symptom: string;
        };
        "growth-failure": {
            name: string;
            tags: string[];
            description: string;
            symptom: string;
        };
        haemoptysis: {
            name: string;
            tags: never[];
            description: string;
            symptom: string;
        };
        "hair-changes": {
            name: string;
            tags: never[];
            description: string;
            symptom: string;
        };
        "hair-loss": {
            name: string;
            tags: never[];
            description: string;
            symptom: string;
        };
        halitosis: {
            name: string;
            tags: string[];
            description: string;
            symptom: string;
        };
        headache: {
            name: string;
            tags: string[];
            description: string;
            symptom: string;
        };
        "hearing-loss": {
            name: string;
            tags: string[];
            description: string;
            symptom: string;
        };
        "heart-murmur": {
            name: string;
            tags: never[];
            description: string;
            symptom: string;
        };
        hemarthrosis: {
            name: string;
            tags: string[];
            description: string;
            symptom: string;
        };
        hematoma: {
            name: string;
            tags: string[];
            description: string;
            symptom: string;
        };
        hematuria: {
            name: string;
            tags: string[];
            description: string;
            symptom: string;
        };
        hepatomegaly: {
            name: string;
            tags: never[];
            description: string;
            symptom: string;
        };
        "hyperemic-larynx": {
            name: string;
            tags: never[];
            description: string;
            symptom: string;
        };
        "hyperemic-pharynx": {
            name: string;
            tags: string[];
            description: string;
            symptom: string;
        };
        "hyperemic-tonsils": {
            name: string;
            tags: never[];
            description: string;
            symptom: string;
        };
        "hyperemic-tympanic-membrane": {
            name: string;
            tags: string[];
            description: string;
            symptom: string;
        };
        hyperpigmentation: {
            name: string;
            tags: string[];
            description: string;
            symptom: string;
        };
        hypopigmentation: {
            name: string;
            tags: string[];
            description: string;
            symptom: string;
        };
        hypothermia: {
            name: string;
            tags: string[];
            description: string;
            symptom: string;
        };
        indrawing: {
            name: string;
            tags: never[];
            description: string;
            symptom: string;
        };
        "intercostal-recession": {
            name: string;
            tags: never[];
            description: string;
            symptom: string;
        };
        irritability: {
            name: string;
            tags: string[];
            description: string;
            symptom: string;
        };
        jaundice: {
            name: string;
            tags: string[];
            description: string;
            symptom: string;
        };
        "joint-pain": {
            name: string;
            tags: never[];
            description: string;
            symptom: string;
        };
        "joint-swelling": {
            name: string;
            tags: string[];
            description: string;
            symptom: string;
        };
        "kernigs-sign": {
            name: string;
            tags: string[];
            description: string;
            symptom: string;
        };
        "limited-range-of-motion": {
            name: string;
            tags: string[];
            description: string;
            symptom: string;
        };
        malnutrition: {
            name: string;
            tags: string[];
            description: string;
            symptom: string;
        };
        "mental-status": {
            name: string;
            tags: string[];
            description: string;
            symptom: string;
        };
        "mid-upper-arm-circumference": {
            name: string;
            tags: string[];
            description: string;
            symptom: string;
        };
        "muscle-tone": {
            name: string;
            tags: never[];
            description: string;
            symptom: string;
        };
        "muscle-weakness": {
            name: string;
            tags: string[];
            description: string;
            symptom: string;
        };
        "nasal-congestion": {
            name: string;
            tags: string[];
            description: string;
            symptom: string;
        };
        "nasal-discharge": {
            name: string;
            tags: string[];
            description: string;
            symptom: string;
        };
        "nasal-polyps": {
            name: string;
            tags: never[];
            description: string;
            symptom: string;
        };
        "night-sweats": {
            name: string;
            tags: string[];
            description: string;
            symptom: string;
        };
        oliguria: {
            name: string;
            tags: string[];
            description: string;
            symptom: string;
        };
        orthopnea: {
            name: string;
            tags: string[];
            description: string;
            symptom: string;
        };
        otalgia: {
            name: string;
            tags: string[];
            description: string;
            symptom: string;
        };
        otorrhea: {
            name: string;
            tags: string[];
            description: string;
            symptom: string;
        };
        pallor: {
            name: string;
            tags: string[];
            description: string;
            symptom: string;
        };
        "peritonsillar-abscess": {
            name: string;
            tags: never[];
            description: string;
            symptom: string;
        };
        petechiae: {
            name: string;
            tags: string[];
            description: string;
            symptom: string;
        };
        photosensitivity: {
            name: string;
            tags: string[];
            description: string;
            symptom: string;
        };
        polyuria: {
            name: string;
            tags: never[];
            description: string;
            symptom: string;
        };
        "poor-feeding": {
            name: string;
            tags: string[];
            description: string;
            symptom: string;
        };
        pruritis: {
            name: string;
            tags: string[];
            description: string;
            symptom: string;
        };
        "pulling-on-ear": {
            name: string;
            tags: string[];
            description: string;
            symptom: string;
        };
        "pulse-rate": {
            name: string;
            tags: string[];
            description: string;
            symptom: string;
        };
        purpura: {
            name: string;
            tags: string[];
            description: string;
            symptom: string;
        };
        "reduced-appetite": {
            name: string;
            tags: string[];
            description: string;
            symptom: string;
        };
        rhinorrhea: {
            name: string;
            tags: string[];
            description: string;
            symptom: string;
        };
        seizures: {
            name: string;
            tags: string[];
            description: string;
            symptom: string;
        };
        "sinus-tenderness": {
            name: string;
            tags: never[];
            description: string;
            symptom: string;
        };
        "skin-desquamation": {
            name: string;
            tags: string[];
            description: string;
            symptom: string;
        };
        "skin-lesions": {
            name: string;
            tags: string[];
            description: string;
            symptom: string;
        };
        "skin-rash": {
            name: string;
            tags: string[];
            description: string;
            symptom: string;
        };
        "skin-turgor": {
            name: string;
            tags: never[];
            description: string;
            symptom: string;
        };
        sneezing: {
            name: string;
            tags: never[];
            description: string;
            symptom: string;
        };
        snoring: {
            name: string;
            tags: string[];
            description: string;
            symptom: string;
        };
        "sore-throat": {
            name: string;
            tags: never[];
            description: string;
            symptom: string;
        };
        splenomegaly: {
            name: string;
            tags: never[];
            description: string;
            symptom: string;
        };
        stridor: {
            name: string;
            tags: string[];
            description: string;
            symptom: string;
        };
        stunting: {
            name: string;
            tags: string[];
            description: string;
            symptom: string;
        };
        "sunken-eyes": {
            name: string;
            tags: never[];
            description: string;
            symptom: string;
        };
        syncope: {
            name: string;
            tags: string[];
            description: string;
            symptom: string;
        };
        tachycardia: {
            name: string;
            tags: string[];
            description: string;
            symptom: string;
        };
        tachypnoea: {
            name: string;
            tags: string[];
            description: string;
            symptom: string;
        };
        "teeth-malocclusion": {
            name: string;
            tags: never[];
            description: string;
            symptom: string;
        };
        "tet-spell": {
            name: string;
            tags: string[];
            description: string;
            symptom: string;
        };
        underweight: {
            name: string;
            tags: never[];
            description: string;
            symptom: string;
        };
        vomiting: {
            name: string;
            tags: string[];
            description: string;
            symptom: string;
        };
        wasting: {
            name: string;
            tags: never[];
            description: string;
            symptom: string;
        };
        "weight-faltering": {
            name: string;
            tags: string[];
            description: string;
            symptom: string;
        };
        "weight-gain": {
            name: string;
            tags: never[];
            description: string;
            symptom: string;
        };
        "weight-loss": {
            name: string;
            tags: never[];
            description: string;
            symptom: string;
        };
        wheezing: {
            name: string;
            tags: string[];
            description: string;
            symptom: string;
        };
    };
};
//# sourceMappingURL=base.d.ts.map