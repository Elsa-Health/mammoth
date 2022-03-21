import _symptoms from "./data/core/symptoms-base.json";
import _conditions from "./data/core/conditions.json";
import translatedDonparMap from "./data/translated/donpar-map.json";
import symptomTranslation from "./data/translated/symptoms-translations.json";
import { build, buildObject } from "./_utils";
/**
 * Symptoms that are supported by elsa
 * @returns `{ id: Symptom } & SymptomDescription`
 */
export const symptoms = {
    symptom: {
        fromId: (id) => _symptoms[id],
    },
    ids: () => Object.keys(_symptoms).sort((a, b) => a.localeCompare(b)),
    values: () => buildObject(_symptoms),
};
/**
 * All conditions supporteed by elsa
 * @returns `{ id: Condition, name: string}`
 */
export const conditions = {
    name: {
        fromId: (id) => _conditions[id],
    },
    ids: () => Object.keys(_conditions).sort((a, b) => a.localeCompare(b)),
    values: () => build(_conditions),
};
export const donparMap = {
    translate: (language) => {
        return translatedDonparMap[language];
    },
};
export const symptomsLocale = {
    translate: (language) => {
        return symptomTranslation[language];
    },
};
