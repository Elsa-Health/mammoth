import React from 'react';

import {SymptomDescription} from '../@types';
import {TFunction, useTranslation} from 'react-i18next';

import {
  Condition,
  SymptomDescription as Donpar,
  Symptom,
} from '@elsa-health/data-fns';

const symptoms: SymptomDescription[] = Donpar.pairs().map(([id, vals]) => ({
  id,
  ...vals,
}));
const conditionsList = Condition.pairs().map(([id, name]) => ({
  id: id,
  condition: name,
}));

function getCondition(
  id: Condition,
): {id: Condition; condition: string} | undefined {
  return conditionsList.find(s => s.id === id);
}

export const getSymptomLocalFunction =
  (t: TFunction) => (symptomId: Symptom) => {
    const obj: {description: string; name: string} = t(symptomId, {
      returnObjects: true,
      defaultValue: undefined,
    });

    if (obj === undefined) {
      // NOTE: This is a fallback for when the symptom is not found in the translation file
      return {
        symptom: symptomId,
        description: symptomId,
      };
    }

    return {description: obj.description, symptom: obj.name};
  };

function useSymptomLocale() {
  const {t} = useTranslation('symptoms');
  const getSymptomById = React.useCallback(getSymptomLocalFunction(t), [t]);

  return {getSymptomById};
}

export {symptoms, conditionsList, getCondition, useSymptomLocale};
