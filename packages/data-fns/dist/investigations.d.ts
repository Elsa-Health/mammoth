import _investigations from "./data/core/investigations.json";
export declare type Investigation = keyof typeof _investigations;
export declare type InvestigationType<InvestigationParams extends string> = {
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
export declare type InvestigationTypeRecord<InvestigationParams extends string> = {
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
export declare const investigation: {
    ids: () => ("color" | "blood-culture" | "cd-4-count" | "ct-scan" | "h-pylori-stool-test" | "hepatitis-b-surface-antigen-h-bs-ag" | "hiv-rapid-test" | "hpv-screening" | "liver-function-tests" | "mri" | "pregnancy-test" | "sputum-culture" | "urinalysis" | "options" | "notes" | "appearance" | "specific-gravity" | "p-h" | "glucose" | "biliruben" | "ketones" | "occult-blood" | "protein" | "nitrite" | "leukocyte-esterase" | "urine-wbc" | "urine-rbc" | "urine-squamous-epithelial-cells" | "ascorbic-acid" | "csf-pressure" | "csf-cell-count" | "csf-glucose" | "csf-protein" | "bun-blood-urea-nitrogen" | "creatinine" | "glucose-plasma-fasting" | "albumin" | "potassium-k" | "sodium-na" | "magnesium-mg" | "chloride-cl" | "co-2-carbon-dioxide-or-bicarbonate" | "phosphorus" | "calcium-ca" | "aminotransferase-alanine-alt" | "aminotransferase-aspartate-ast" | "alkaline-phosphatase-alp" | "total-bilirubin" | "direct-bilirubin" | "haemoglobin-hb" | "white-cell-count-wbc" | "platelet-count-plt" | "red-blood-count-rbc" | "mean-cell-volume-mcv" | "packed-cell-volume-pcv-haematocrit-hct" | "mean-cell-haemoglobin-mch" | "mean-cell-haemoglobin-concentration-mchc" | "neutrophil-count" | "lymphocyte-count" | "monocyte-count" | "eosinophil-count" | "basophil-count" | "mrdt-rapid-test" | "malaria-blood-slide" | "viral-load" | "cr-ag" | "hepatitis-b-e-antigen-hbe-ag" | "x-ray" | "xpert-mtb-rif" | "mantoux-ppd" | "sputum-smear" | "sputum-pcr" | "csf-culture" | "csf-india-ink-staining" | "1-2-beta-d-glucan" | "cerebrospinal-fluid-test-lumbar-puncture" | "metabolic-panel" | "full-blood-picture" | "systolic-blood-pressure" | "diastolic-blood-pressure" | "lactate-dehydrogenase-ldh" | "oxygen-saturation" | "erythrocyte-sedimentation-rate-esr" | "iron-serum" | "c-reactive-protein")[];
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
//# sourceMappingURL=investigations.d.ts.map