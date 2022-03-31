import React from 'react';

import {createNativeStackNavigator} from '@react-navigation/native-stack';
import BasicV2PatientIntakeScreen, {
  BasicIntakeForm,
} from '../../screens/BasicV2PatientIntake';
import HIVPatientIntakeScreen, {
  HIVPatientIntake,
} from '../../screens/HIVPatientIntake';
import {withFlowContext, WorkflowScreen} from '../..';
import produce from 'immer';

const Stack = createNativeStackNavigator();
type CTCBasicIntake = {
  isPregnant: boolean;
  dateOfPregancy?: Date;
  weight?: number;
  height?: number;
  systolic?: number;
  diastolic?: number;
};

type CTCHivIntake = {
  whoStage: string;
  functionalStatus: string;
  coMorbidities: string[];
  isTakingARV: boolean;
  ARVRegimens?: string[];
  isTakingMedications: boolean;
  medications?: string[];
};
export type CTCPatientIntake = CTCBasicIntake & CTCHivIntake;

const transformToProperBasicIntake = (
  intake: BasicIntakeForm,
): CTCBasicIntake => {
  return produce({} as CTCBasicIntake, df => {
    df['isPregnant'] = intake.isPregnant || false;
    if (df.isPregnant) df['dateOfPregancy'] = intake.dateOfPregancy;

    if (intake.weight !== undefined)
      df['weight'] = parseInt(intake.weight || '0');

    if (intake.height !== undefined)
      df['height'] = parseInt(intake.height || '0');

    if (intake.systolic !== undefined)
      df['systolic'] = parseInt(intake.systolic || '0');

    if (intake.diastolic !== undefined)
      df['diastolic'] = parseInt(intake.diastolic || '0');

    return df;
  });
};

const transformToProperHIVIntake = (intake: HIVPatientIntake): CTCHivIntake => {
  const {ARVRegimens, medications, ...others} = intake;
  return produce({} as CTCHivIntake, df => {
    df.whoStage = intake.whoStage;
    df.functionalStatus = intake.functionalStatus;
    df.coMorbidities = intake.coMorbidities ?? [];
    df.isTakingARV = intake.isTakingARV || false;
    df.isTakingMedications = intake.isTakingMedications || false;

    if (df.isTakingMedications) df['medications'] = medications;
    if (df.isTakingARV) df['ARVRegimens'] = ARVRegimens;

    return df;
  });
};

export default function CTCPatientIntakeScreenGroup({
  entry: {value, patient},
  actions: $,
}: WorkflowScreen<
  {
    patient: CTC.Patient;
    value: Partial<CTCPatientIntake>;
  },
  {onNext: (patient: CTCPatientIntake) => {}}
>) {
  const [visit, set] = React.useState<CTCPatientIntake>(value || {});

  const changeValue = React.useCallback(
    <K extends keyof CTCPatientIntake>(
      field: K,
      value: CTCPatientIntake[K],
      cb?: (v: CTCPatientIntake) => void,
    ) => {
      set(s => {
        const p = produce(s, df => {
          df[field] = value;
        });
        cb && cb(p);
        return p;
      });
    },
    [set],
  );

  return (
    <Stack.Navigator
      screenOptions={{headerShown: false}}
      initialRouteName="visit.basicV2intake">
      <Stack.Screen
        name="visit.basicV2intake"
        component={withFlowContext(BasicV2PatientIntakeScreen, {
          entry: {
            patientId: patient.id,
            sex: patient.sex,
          },
          actions: ({navigation}) => ({
            onNext: patient => {
              set(s => ({...s, ...transformToProperBasicIntake(patient)}));
              navigation.navigate('visit.hivPatientIntake');
            },
          }),
        })}
      />
      <Stack.Screen
        name="visit.hivPatientIntake"
        component={withFlowContext(HIVPatientIntakeScreen, {
          actions: ({navigation}) => ({
            onNext: hivPatient => {
              set(s => ({...s, ...transformToProperHIVIntake(hivPatient)}));
              $.onNext(visit);
            },
          }),
        })}
      />
    </Stack.Navigator>
  );
}
