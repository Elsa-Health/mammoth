import {useSymptomAssessment} from './assessment';
import _ from 'lodash';
import {Age, Symptom, SymptomData, SymptomRecord} from '../../@types';
import {useWindowDimensions} from 'react-native';
import React from 'react';

export function useSymptomsInfo() {
  const [ps, as] = useSymptomAssessment(s => [
    s.presentingSymptoms,
    s.absentSymptoms,
  ]);
  return [
    ...ps.map(s => ({...s, present: true})),
    ...as.map(s => ({...s, present: false})),
  ] as Array<SymptomRecord & {data?: SymptomData; present: boolean}>;
}

/**
 * Calculates the patients age in years given years and months
 * @param years
 * @param months
 */
export const getAge = (years: number, months: number = 0): number => {
  return years + months / 12;
};

export function donparTransform(name: string, sd: SymptomData) {
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

export const properAgeString = (age_: Age) => {
  const age = [
    age_.years ? `${age_.years} years` : undefined,
    age_.months ? `${age_.months} months` : undefined,
    age_.days ? `${age_.days} days` : undefined,
  ].filter(s => s !== undefined);

  if (age.length === 0) {
    return 'N/A age';
  }
  if (age.length === 1) {
    return age[0] as string;
  }

  const [firsts, last] = [age.slice(0, age.length - 1), age[age.length - 1]];
  return `${firsts.join(', ')} and ${last}`;
};

/**
 * Login information
 */

type FieldName =
  | 'version'
  | 'id'
  | 'firstName'
  | 'lastName'
  | 'role'
  | 'telephone'
  | 'facilityName'
  | 'city'
  | 'facilityId';

// Exported for tests
const fieldNames: FieldName[] = [
  'version',
  'id',
  'firstName',
  'lastName',
  'role',
  'telephone',
  'facilityName',
  'city',
  'facilityId',
];

export type AuthInfoMap = {[key in FieldName]: string};
export const ERROR_MESSAGE = 'Please scan a valid QR code';

export function authenticate(data: string): Promise<AuthInfoMap> {
  return new Promise((resolve, reject) => {
    try {
      const QRInfo = data.split('|');
      const info = _.zipObject(fieldNames, QRInfo) as AuthInfoMap;
      // console.log(data);
      if (
        Array.isArray(QRInfo) &&
        QRInfo.length === fieldNames.length &&
        info.facilityName &&
        info.version &&
        info.facilityId
      ) {
        // NEXT: get the GPS location of the user at the moment of sign in.
        resolve(info);
      }

      throw new Error(ERROR_MESSAGE);
    } catch (err) {
      // reject with the message
      reject(err);
    }
  });
}

/**
 * React native component
 */

/**
 * Min-width of the device that make elsa usable
 * Default: 350
 *
 * Should be more than 300
 */
const ELSA_DEVICE_USABLE_WIDTH = 350;
const isWidthConditionMet = (width: number) =>
  width / 3 > ELSA_DEVICE_USABLE_WIDTH;
export function useDeviceBreak() {
  const {width, height} = useWindowDimensions();

  /**
   * Break off at a point of a device when conditions are met
   */
  const [isTablet, setTablet] = React.useState<boolean>(() =>
    isWidthConditionMet(width),
  );

  React.useEffect(() => {
    setTablet(isWidthConditionMet(width));
  }, [width]);

  return {isTablet, isMobile: !isTablet};
}
