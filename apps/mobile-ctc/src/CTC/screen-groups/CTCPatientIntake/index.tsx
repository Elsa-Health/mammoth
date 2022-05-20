import React from 'react';

import {createNativeStackNavigator} from '@react-navigation/native-stack';
import BasicV2PatientIntakeScreen, {
  BasicIntakeForm,
} from '../../screens/BasicV2PatientIntake';
import HIVPatientIntakeScreen, {
  HIVPatientIntake,
} from '../../screens/HIVPatientIntake';
import {withFlowContext, WorkflowScreen} from '../../../@workflows';
import produce from 'immer';
import _ from 'lodash';
import {format} from 'date-fns';

const Stack = createNativeStackNavigator();
type CTCBasicIntake = {
  isPregnant: boolean;
  dateOfPregancy?: string;
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
    if (df.isPregnant)
      df['dateOfPregancy'] = format(intake.dateOfPregancy, 'yyyy-MM-dd');

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
  entry: {value, patient, appointment},
  actions: $,
}: WorkflowScreen<
  {
    appointment?: CTC.Appointment;
    patient: CTC.Patient;
    value: Partial<CTCPatientIntake>;
  },
  {
    onNext: (
      patientIntake: CTCPatientIntake,
      patient: CTC.Patient,
      isAssessment: boolean,
      appointment?: CTC.Appointment | undefined,
    ) => {};
  }
>) {
  const [intake, set] = React.useState<CTCPatientIntake>(value || {});
  React.useEffect(() => {
    console.log('-> [ENTERED]: CTCPatientIntakeScreenGroup!');
    return () => console.log('-> [EXIT]: CTCPatientIntakeScreenGroup!');
  }, []);
  return (
    <Stack.Navigator
      screenOptions={{headerShown: false}}
      initialRouteName="visit.basicV2intake">
      <Stack.Screen
        name="visit.basicV2intake"
        component={withFlowContext(BasicV2PatientIntakeScreen, {
          entry: {
            appointmentDate: appointment?.date
              ? new Date(appointment.date)
              : undefined,
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
          entry: {
            value: _.pick(intake, [
              'whoStage',
              'functionalStatus',
              'coMorbidities',
              'isTakingARV',
              'ARVRegimens',
              'isTakingMedications',
              'medications',
            ]),
          },
          actions: ({navigation}) => ({
            onNext: (hivPatient, isAssess) => {
              set(s => {
                const newIntake = {
                  ...s,
                  ...transformToProperHIVIntake(hivPatient),
                };
                $.onNext(newIntake, patient, isAssess, appointment);
                return newIntake;
              });
            },
          }),
        })}
      />
    </Stack.Navigator>
  );
}
