import React from 'react';
import {View} from 'react-native';

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
type CTCPatientIntake = {
  basicIntake: {
    isPregnant: boolean;
    dateOfPregancy?: Date;
    weight?: number;
    height?: number;
    systolic?: number;
    diastolic?: number;
  };
  hivIntake: {
    whoStage: string;
    functionalStatus: string;
    coMorbidities: string[];
    isTakingARV: boolean;
    ARVRegimens?: string[];
    isTakingMedications: boolean;
    medications?: string[];
  };
};

const transformToProperBasicIntake = (
  intake: BasicIntakeForm,
): CTCPatientIntake['basicIntake'] => {
  return produce({} as CTCPatientIntake['basicIntake'], df => {
    df['isPregnant'] = intake.isPregnant;
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

const transformToProperHIVIntake = (
  intake: HIVPatientIntake,
): CTCPatientIntake['hivIntake'] => {
  const {ARVRegimens, medications, ...others} = intake;
  return produce({} as CTCPatientIntake['hivIntake'], df => {
    df = intake;
    if (df.isTakingMedications) df['medications'] = medications;
    if (df.isTakingARV) df['ARVRegimens'] = ARVRegimens;

    return df;
  });
};

export default function CTCPatientVisitScreenGroup({
  entry,
  actions: $,
}: WorkflowScreen<{}, {onNext: (patient: CTCPatientIntake) => {}}>) {
  const [visit, set] = React.useState<CTCPatientIntake>({});

  const changeValue = React.useCallback(
    <K extends keyof CTCPatientIntake>(
      field: K,
      value: CTCPatientIntake[K],
    ) => {
      set(s =>
        produce(s, df => {
          df[field] = value;
        }),
      );
    },
    [set],
  );

  return (
    <Stack.Navigator
      screenOptions={{headerShown: false}}
      initialRouteName="visit.hivPatientIntake">
      <Stack.Screen
        name="visit.basicV2intake"
        component={withFlowContext(BasicV2PatientIntakeScreen, {
          actions: ({navigation}) => ({
            onNext: patient => {
              changeValue('basicIntake', transformToProperBasicIntake(patient));
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
              changeValue('hivIntake', transformToProperHIVIntake(hivPatient));
              navigation.navigate('visit');
              $.onNext(visit);
            },
          }),
        })}
      />
    </Stack.Navigator>
  );
}
