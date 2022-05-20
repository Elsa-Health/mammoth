/**
 * Context for the entire application
 */
import React from 'react';

import create from 'zustand';
import createContext from 'zustand/context';
import {persist} from 'zustand/middleware';

import produce from 'immer';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {
  Age,
  AssessmentRecord,
  SymptomRecord,
  _CompleteSymptomData,
} from '../../../@types';

import firestore from '@react-native-firebase/firestore';
import _ from 'lodash';
import {useApplication} from './app';
import {LabTest, Medication} from '../libs/data-fns';

const aStatsColl = firestore().collection('statistics');

export type Recommendations = {
  ref_nearest: boolean;
  refered_lab_testing: {
    selected: boolean;
    tests: Array<LabTest>;
  };
  dispensed_medication: {
    selected: boolean;
    medications: Array<Medication.Addo | Medication.GS>;
  };
  recommendations: string;
};

type StateAssessmentRecord = {
  record: AssessmentRecord;
  recommendations: Partial<Recommendations>;
};
interface MainState {
  /**
   * Here we can add other information like:
   *  - The UI flow chose,
   *  - Time taken to complete an assessment
   */
  assessments: StateAssessmentRecord[];

  /**
   * Functions to upload the file
   */
  addAssessmentRecord: (
    ar: Omit<AssessmentRecord, 'dateTime'>,
    recommendations?: Partial<Recommendations>,
  ) => void;
}

const uploadAsessment = (assessment: StateAssessmentRecord, userId: string) => {
  const {
    record: {assessmentInfo, id},
    recommendations,
  } = assessment;
  // console.log("syncing data...", id)

  // console.log(`${userId}/assessement/${id.toLocaleString()}`)

  // console.log("Diag:",assessmentInfo.presentingSymptoms )
  // upload the assessment record
  aStatsColl
    .doc(userId)
    .set({
      isTest: [
        'kevin-james',
        'c5d2e724-2e27-11eb-adc1-0242ac120002',
        'ba1d95ac-5977-11eb-ae93-0242ac130002',
      ].includes(userId),
      dataClass: 'addo-stats',
    })
    .then(t => {
      aStatsColl
        .doc(userId)
        .collection('assessments')
        .doc(id.toString())
        .set(getAssessmentInfo(assessment))
        .then(() => {
          // console.log('sync completed:', id)
        })
        .catch(err => {
          console.log(err);
        });
    });
};

const {Provider, useStore} = createContext<MainState>();
const createStore = () =>
  create<MainState>(
    persist(
      (set, get) => ({
        assessments: [],
        addAssessmentRecord: (ar, recommendations = {}) => {
          set(s =>
            produce(s, df => {
              df.assessments.push({
                record: {...ar, dateTime: new Date()},
                recommendations,
              });
              return df;
            }),
          );
        },
      }),
      {
        name: 'elsa-ddx-async-storage-va',
        getStorage: () => AsyncStorage,
      },
    ),
  );

function convertAgeToMonths(age: Age) {
  const years = age.years || 0;
  const months = age.months || 0;
  const days = age.days || 0;

  return Math.max(0, years * 12 + months + days / 30);
}

function getAgeGroup(months: number) {
  if (months < 6) {
    return '0 - 6 months';
  }
  if (months < 72) {
    return '6 - 72 months';
  }
  if (months < 120) {
    return '72 - 120 months';
  }
  if (months < 228) {
    return '120 - 228 months';
  }
  if (months >= 228) {
    return '228+ months';
  }
  return '(-inf, inf+)';
}

function getSypmtomItem(
  _s: (SymptomRecord & {data: Partial<_CompleteSymptomData>}) | any,
): string | undefined {
  return _s.id || _s.symptom || undefined;
}

/**
 * Function to convert the assessement record in a format cached in cloud storage
 * @param stateRecord Assessment record as stored in the application
 */
function getAssessmentInfo(stateRecord: StateAssessmentRecord) {
  const {
    record: {
      dateTime,
      assessmentInfo: {age, sex, pregnant, presentingSymptoms, absentSymptoms},
      id,
      diagnosis: {user, elsa},
    },
    recommendations,
  } = stateRecord;

  const {
    record: {dateTime: _, ...other},
  } = stateRecord;

  const months = convertAgeToMonths(age);

  return {
    info: {sex, age, ageGroup: getAgeGroup(months), pregnant},
    symptoms: {
      present: presentingSymptoms.map(getSypmtomItem),
      absent: absentSymptoms.map(getSypmtomItem),
    },
    diagnosis: {
      user: user.map(s => s.condition),
      elsaTop10: elsa?.slice(0, 10).map(c => c.condition),
    },
    recommendations,
    // dateTime the appointment was made
    dateTime: firestore.Timestamp.fromDate(new Date(dateTime)),

    // Full visit
    visit: {
      data: {
        dateTime: firestore.Timestamp.fromDate(new Date(dateTime)),
        ...other,
      },
      recommendations: recommendations,
    },
  };
}

/**
 *
 * @param param0
 * @returns
 */
export function AppProvider({children}: {children: React.ReactNode}) {
  return <Provider createStore={createStore}>{children}</Provider>;
}

export function useMainState() {
  const assessments = useStore(s => s.assessments);
  const add = useStore(s => s.addAssessmentRecord);

  const uid = useApplication(s => s.user?.uid);

  /**
   * Adding functionality to sync data
   *
   * NOTE:
   * THIS IS VERY AGGRESSIVE AND HAPPENS ALL THE TIME,
   *  YOU MIGHT WANT TO CHANGE THIS UP
   */
  React.useEffect(() => {
    if (uid === undefined) {
      console.log('NULL UID');
      return;
    }

    // sync the entire data
    assessments.map(a => uploadAsessment(a, uid));
  }, [assessments, uid]);

  return {
    assessments,
    addAssessment: add,
  };
}
