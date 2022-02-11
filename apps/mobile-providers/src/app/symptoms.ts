import React from 'react'

import { SymptomDescription } from '../../@types';
import { useTranslation } from 'react-i18next';

import * as data from './libs/data-fns'

// const symptoms: SymptomDescription[] = Object.values(symptomsBag)
// const conditionsList = Object.entries(conditions).map(s => ({ id: s[0], condition: s[1] }))

const symptoms: SymptomDescription[] = data.symptoms.values()
const conditionsList = data.conditions.values().map(s => ({ id: s.id, condition: s.name }))

/**
 * Gets the description of a symptom given its name
 * @param id
 * @returns {description:string}
 */
function getSymptomDescription(id: string, lang: 'en' | 'sw' = 'en'): void {
	// const desc = symptoms.find(s => s.id === id)?
  // symptomTranslation
}

function getCondition(id: string): { id: string, condition: string } | undefined {
  return conditionsList.find(s => s.id === id)
}

function useSypmtomLocale () {
  const {t} = useTranslation('symptoms')
  const getSymptomById = React.useCallback((symptomId: string) => {
    const obj: { description: string, name: string } = t(symptomId, { returnObjects: true, defaultValue: undefined })
    
    if (obj === undefined) {
      return undefined
    }
    
    return { description: obj.description, symptom: obj.name }
  }, [t])

  return {getSymptomById}
}

export {symptoms, conditionsList, getCondition, useSypmtomLocale};
