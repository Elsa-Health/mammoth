import produce from 'immer';
import React from 'react';
import create from 'zustand';
import createContext from 'zustand/context';

import axios from 'axios';
import {ELSA_LAMBDA_API_URL} from '../constants';
import {getAge} from '../utils';

import _ from 'lodash';
import shallow from 'zustand/shallow';
import {
  Assessment,
  Differential,
  Symptom,
  SymptomData,
  SymptomRecord,
} from '../../../@types';

interface AssessmentState extends Assessment {
  /**
   * Showing the list of recommended symptoms
   */
  recommended: SymptomRecord[];

  setSymptom: (
    symptom: SymptomRecord,
    present?: boolean,
    data?: SymptomData,
  ) => void;
  removeSymptom: (symptom: SymptomRecord) => void;
  removeSymptomFromId: (symptomId: string) => void;
}

const {Provider, useStore} = createContext<AssessmentState>();

const builderStoreCreator =
  (intialState: Pick<AssessmentState, 'age' | 'sex' | 'pregnant'>) => () =>
    create<AssessmentState>((set, get) => ({
      recommended: [],
      presentingSymptoms: [],
      absentSymptoms: [],

      setSymptom: (symptom, present, data = {}) => {
        // remove
        get().removeSymptom(symptom);

        if (present !== undefined) {
          // add
          set(s =>
            produce(s, df => {
              if (!present) {
                df.absentSymptoms.push({...symptom});
              } else {
                df.presentingSymptoms.push({...symptom, data});
              }
            }),
          );
        }
      },

      removeSymptom: symptom => get().removeSymptomFromId(symptom.id),

      removeSymptomFromId: (symptomId: string) => {
        set(s =>
          produce(s, df => {
            const presentIndex = df.presentingSymptoms.findIndex(
              ps => ps.id === symptomId,
            );
            const absentIndex = df.absentSymptoms.findIndex(
              as => as.id === symptomId,
            );

            // reset option
            if (presentIndex > -1) {
              df.presentingSymptoms.splice(presentIndex, 1);
            }
            if (absentIndex > -1) {
              df.absentSymptoms.splice(absentIndex, 1);
            }

            return df;
          }),
        );
      },

      ...intialState,
    }));

/**
 * State manager for the application
 */
function SymptomAssessmentSequenceProvider(props: {
  children: React.ReactNode;
  initialState: Pick<AssessmentState, 'age' | 'sex' | 'pregnant'>;
}) {
  return (
    <Provider createStore={builderStoreCreator(props.initialState)}>
      {props.children}
    </Provider>
  );
}

export {useStore as useSAStore, SymptomAssessmentSequenceProvider};

function donparTransform(name: string, sd: SymptomData) {
  return {
    Name: name,
    Location: sd.location || [],
    Duration: sd.duration ? parseInt(sd.duration) : 0,
    Onset: sd.onset || '',
    Nature: sd.nature || '',
    Periodicity: sd.periodicity || '',
    Aggravators: sd.aggravators || [],
    Reducers: sd.reducers || [],
  } as Symptom;
}

export async function fetchFromElsaLambda(
  patient: any,
  psstr: Array<SymptomRecord & {data: SymptomData}>,
  asstr: string[],
) {
  const data = {
    symptoms: {
      present: [...psstr].map(
        s => _.omit(donparTransform(s.id, s.data), []), // ['Duration']),
      ),
      absent: asstr,
    },
    ...patient,
  };

  // console.log("To predict data:", JSON.stringify(data))
  const res = await axios.post(ELSA_LAMBDA_API_URL, data);

  const conditions = (res.data as Differential[]).map(c => ({
    condition: c.id,
    label: c.condition,
    p: c.p || 0,
    symptoms: c.symptoms,
  }));

  return conditions;
}
const toleranceValue = 10000;

/**
 * Discretizes the conditions according by means of the bottle cap analogy
 *
 * NEEDS FIX:
 * @param sortedConditions
 * @param asstr
 * @param topn
 * @param rangeToFit
 * @returns
 */
export const bottleCapDiscretization = (
  sortedConditions: Differential[],
  asstr: string[],
  topn: number,
  rangeToFit: number,
) => {
  // console.log(sortedConditions.slice(0, topn))
  // take topn + rescale the values to fit range
  const topN = sortedConditions.slice(0, topn);

  const s = topN.map(c => ({
    data: c,
    presentingSymptoms: c.symptoms,
    absentSymptoms: asstr.filter(k => !c.symptoms.includes(k)),
  }));
  const [first, ...lsConditions] = s;
  const sum = topN.map(d => d.p).reduce((x, y) => x + y, 0);

  // hack to prevent div by zero error + make sure it's btn 0, 1
  const firstRatio = Math.min(
    1,
    (first.data.p * toleranceValue) / Math.max(1, sum * toleranceValue),
  );
  const firstCaps = Math.round(firstRatio * rangeToFit);
  const remainingCaps = rangeToFit - firstCaps;

  const lastsCountsRatio = lsConditions.map(
    d => (d.data.p * toleranceValue) / Math.max(1, sum * toleranceValue),
  );

  // console.log({ remainingCaps, firstCaps, rangeToFit, lastsCountsRatio: lastsCountsRatio.map(s => s.toFixed(1)).join(", ")})

  const discretizedTopN = [
    {
      ...first,
      count: firstCaps,
    },
    ...lsConditions.map((s, ix) => ({
      ...s,
      count: Math.round(lastsCountsRatio[ix] * remainingCaps),
    })),
  ];

  return discretizedTopN;
};

/**
 * Discretizes the top `n` condition like normal values
 * @param sortedConditions
 * @param asstr
 * @param topn
 * @param rangeToFit
 */
export const normalValueDiscretization = (
  sortedConditions: Differential[],
  asstr: string[],
  topn: number,
  rangeToFit: number,
) => {
  // take topn + rescale the values to fit range
  const topN = sortedConditions.slice(0, topn);

  const s = topN.map(c => ({
    data: c,
    presentingSymptoms: c.symptoms,
    absentSymptoms: asstr.filter(k => !c.symptoms.includes(k)),
  }));
  const [first, ...lsConditions] = s;

  const firstRatio = Math.min(1, first.data.p);
  const lastsCountsRatio = lsConditions.map(d => d.data.p);

  const discretizedTopN = [
    {
      ...first,
      count: Math.round(firstRatio * rangeToFit),
    },
    ...lsConditions.map((s, ix) => ({
      ...s,
      count: Math.round(lastsCountsRatio[ix] * rangeToFit),
    })),
  ];

  return discretizedTopN;
};

/**
 * Discretizes the top `n` condition like bottle caps like using a different technique. (ignores range of fit)
 * @param sortedConditions
 * @param asstr
 * @param topn
 * @param rangeToFit
 */
export const bottleCapVer2Discretization = (
  sortedConditions: Differential[],
  asstr: string[],
  topn: number,
  rangeToFit: number,
) => {
  // take topn + rescale the values to fit range
  const topN = sortedConditions.slice(0, topn);

  const s = topN.map(c => ({
    data: c,
    presentingSymptoms: c.symptoms,
    absentSymptoms: asstr.filter(k => !c.symptoms.includes(k)),
  }));
  const [first, ...lsConditions] = s;
  const sum = topN.map(d => d.p).reduce((x, y) => x + y, 0);

  // hack to prevent div by zero error + make sure it's btn 0, 1
  const firstRatio = Math.min(
    1,
    (first.data.p * toleranceValue) / Math.max(1, sum * toleranceValue),
  );

  const lastsCountsRatio = lsConditions.map(
    d => (d.data.p * toleranceValue) / Math.max(1, sum * toleranceValue),
  );

  const discretizedTopN = [
    {
      ...first,
      count: Math.round(firstRatio * rangeToFit),
    },
    ...lsConditions.map((s, ix) => ({
      ...s,
      count: Math.round(lastsCountsRatio[ix] * rangeToFit),
    })),
  ];

  return discretizedTopN;
};

export const getDiscretized = (
  fn: typeof normalValueDiscretization,
  sortedConditions: Differential[],
  asstr: string[] = [],
  topn: number = 3,
  rangeToFit: number = 10,
): {
  condition: string;

  // discretization count
  count: number;

  presentingSymptoms: string[];

  absentSymptoms: string[];
}[] => {
  return normalValueDiscretization(sortedConditions, asstr, topn, rangeToFit)
    .filter(l => l !== undefined)
    .filter(dd => dd.data !== undefined)
    .map(dd => ({
      condition: dd.data.condition,
      data: dd.data,
      // rescale to include certainity
      count: dd.count,
      presentingSymptoms: dd.presentingSymptoms,
      absentSymptoms: dd.absentSymptoms,
    }));
};

// getting the information about a condition
export const getConditionData = (
  condition: string,
  conditions: {
    condition: string;
    label: string;
    p: number;
    symptoms: string[];
  }[],
  asstr?: string[],
):
  | undefined
  | null
  | {
      rank: number; // its position in the sorted list
      presentingSymptoms: string[];
      absentSymptoms: string[];
    } => {
  const condIdx = conditions.findIndex(c => c.condition === condition);

  // console.log({ conditions, condIdx })

  if (condIdx === -1) {
    // this indicates you have no
    //  information about the symptom
    return null;
  }

  const c = conditions[condIdx];

  return {
    rank: condIdx + 1,
    presentingSymptoms: c.symptoms,
    absentSymptoms: (asstr || []).filter(k => !c.symptoms.includes(k)),
  };
};

// NOTE: you might want to make this less imperative
export function useElsaLambda() {
  const patient = useStore(s => {
    const p = produce({}, df => {
      if (s.age.years !== undefined || s.age.months !== undefined) {
        df['age'] = getAge(s.age.years || 0, s.age.months || 0);
      }

      df['sex'] = s.sex;

      // if (s.vitalSigns?.height?.value !== undefined || s.vitalSigns?.height.value > 0) {
      //     df['height'] = s.vitalSigns?.height.value
      // }
      // if (s.vitalSigns?.weight?.value !== undefined || s.vitalSigns?.weight.value > 0) {
      //     df['weight'] = s.vitalSigns?.weight.value
      // }
      // return ({
      //     age: getAge(s.age.years || 0, s.age.months || 0),
      //     sex: s.sex,
      //     height: s.vitalSigns?.height?.value || 0,
      //     weight: s.vitalSigns?.weight?.value || 0
      // })
      return df;
    });

    // console.log("PATIENT:", p)
    return p;
  });
  const psstr = useStore(s => s.presentingSymptoms, shallow);
  const asstr = useStore(s => s.absentSymptoms.map(d => d.id), shallow);

  return {
    patient,
    psstr,
    asstr,
    getDiscretized,
    getConditionData,
    fetchFromElsaLambda,
  };
}
