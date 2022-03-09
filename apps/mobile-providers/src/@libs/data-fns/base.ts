import _symptoms from './data/core/symptoms-base.json'
import _conditions from './data/core/conditions.json'

import translatedDonparMap from './data/translated/donpar-map.json'
import symptomTranslation from './data/translated/symptoms-translations.json'

import { build, buildObject } from './_utils'

export type Symptom = keyof typeof _symptoms
export type SymptomDescription = {
    location: string[],
    duration: string[],
    onset: string[]
    nature: string[]
    periodicity: string[]
    aggravators: string[]
    reducers: string[]
}

export type Condition = keyof typeof _conditions

/**
 * Symptoms that are supported by elsa
 * @returns `{ id: Symptom } & SymptomDescription`
 */
export const symptoms = {
    symptom: {
        fromId: (id: Symptom): SymptomDescription => _symptoms[id]
    },
    ids: () => Object.keys(_symptoms).sort((a, b) => a.localeCompare(b)) as Condition[],
    values: () => buildObject<Symptom, SymptomDescription>(_symptoms as { [id in Symptom]: SymptomDescription })
}

/**
 * All conditions supporteed by elsa
 * @returns `{ id: Condition, name: string}`
 */
export const conditions = {
    name: {
        fromId: (id: Condition): string => _conditions[id] 
    },
    ids: () => Object.keys(_conditions).sort((a, b) => a.localeCompare(b)) as Condition[],
    values: () => build<Condition>(_conditions)
}


export const donparMap = {
    translate: (language: 'en' | 'sw') => {
        return translatedDonparMap[language]
    }
}
export const symptomsLocale = {
    translate: (language: 'en' | 'sw') => {
        return symptomTranslation[language]
    }
}