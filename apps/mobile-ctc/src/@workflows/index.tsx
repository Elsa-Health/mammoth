import type * as data from 'elsa-health-data-fns';

import React from 'react';
import create from 'zustand';
import createContext from 'zustand/context';

type DBDateTime = number;
type UTCDateTime = string;
type YYYYMMDDDate = string;

export type UserObject = {fullName: string; id: string; email: string};

export type Patient = {
  // added at runtime
  id: string;
  registerDate: UTCDateTime;
  firstName: string;
  lastName: string;
  phone: string;
  address: string;
  dateOfBirth: YYYYMMDDDate;
  sex: Patient.Sex;
};

type PatientInvestigationResult =
  | undefined
  | string
  | string[]
  | {
      values: {
        [id in data.Investigation]?: string | string[];
      };
    };

type PatientInvestigation = {
  /**
   * Similar to LabTest ID
   */
  obj: data.InvestigationTypeRecord<string>;

  /**
   * Name of the investigation
   */
  investigationId: 'urinalysis';

  result: PatientInvestigationResult;
};

export type SymptomState = {
  Name: string;
  Location: Array<string>;
  Duration: number;
  Onset: string;
  Nature: string;
  Periodicity: string;
  Aggravators: Array<string>;
  Reducers: Array<string>;
};

type BaseVisitType = {
  date: UTCDateTime;
  intake: PatientIntake;
  patientId: string;

  /**
   * Top condition that present from Elsa's Insight.
   * undefined if unable to get the conditions (e.g. when there's no internet)
   */
  condition: string | undefined;

  recommendedTests: data.Investigation[];

  symptoms: {
    present: Array<{id: string; data: object}>;
    absent: string[];
  };
};

export type PatientVisit = BaseVisitType & {
  id: string;
  investigations: Array<{id: string} & PatientInvestigation>;
};

export type VisitSession = BaseVisitType & {
  investigations: PatientInvestigation[];
};

// Workflow configuration
type InitialPropsType = {[field: string]: any};
type ActionList = {[fnName: string]: (...a: any[]) => any};

export type WorkflowScreenProps<
  InitialProps extends InitialPropsType,
  Actions extends ActionList = {},
> = {
  entry: InitialProps;
  actions: Actions;
};

// Language
export type Language = 'en' | 'sw';

// ------------------------
export declare namespace Patient {
  type Age = Partial<{
    years: number;
    months: number;
    days: number;
  }>;
  type Sex = 'male' | 'female';
  type VitalSignType = {
    temp?: number; // in c
    weight?: {
      value: number;
      option: 'kg' | 'lb';
    };
    height?: {
      value: number;
      option: 'ft' | 'cm';
    };
  };
}

type _CompleteSymptomData = {
  /**
   * Information that is useful
   */
  location: string[];
  duration: string;
  onset: string;
  nature: string[];
  periodicity: string[];
  aggravators: string[];
  reducers: string[]; // FIXME: Change to relievers
};

type SymptomRecord = {id: string};
export type SymptomData = Partial<_CompleteSymptomData>;

export type PatientIntake = {
  sex: Patient.Sex;
  age: Patient.Age;
  pregnant: boolean;
  dueDate: Date | null;
  vitalSigns?: Patient.VitalSignType;
};

export type BasicAssessment = PatientIntake & {
  /**
   * Containing the list of present symptoms
   */
  presentingSymptoms: Array<
    SymptomRecord & {
      data: SymptomData;
    }
  >;

  /**
   * Containing the list of absent symptoms
   */
  absentSymptoms: SymptomRecord[];
};

export type SymptomProps = {
  location: string[];
  duration: string[];
  onset: string[];
  nature: string[];
  periodicity: string[];
  aggravators: string[];
  reducers: string[];
};

// TODO: convert the provider to be a the GODLIKE contexst
const {Provider, useStore} = createContext();
const createStore =
  <E extends object>(entry: E) =>
  () =>
    create<E>((set, get) => entry);

type FnList = {[fnName: string]: (...a: any[]) => any};

// FIXME:
export const withFlowContext = <T, A extends FnList>(
  Component: (props: {entry?: T; actions?: A}) => JSX.Element,
  k: {
    entry?: T;
    actions?: ({navigation}: any) => A;
  } = {},
) => {
  return ({navigation, route}: any) => {
    const entryData = React.useMemo(
      () => ({...k.entry, ...(route?.params || {})}),
      [k.entry, route?.params],
    );
    return (
      <Provider createStore={createStore(entryData)}>
        <Component
          entry={(entryData || {}) as T}
          actions={(k.actions?.({navigation}) || {}) as A}
        />
      </Provider>
    );
  };
};

// export { useStore as useWorkflowContext };
