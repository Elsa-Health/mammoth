import React from 'react';

import {createNativeStackNavigator} from '@react-navigation/native-stack';

import DashboardScreen from './_screens/Dashboard';
import ViewAppointmentsScreen from './_screens/ViewAppointment';

import NewVisitEntryScreen from './_screens/BasicPatientIntake';
import HIVStageIntakeScreen from './_screens/HIVStageIntake';
import HIVAdherenceAssessmentScreen from './_screens/HIVAdherenceAssessment';
import ConcludeAssessmentScreen from './_screens/ConcludeAssessment';

import {withFlowContext} from '@elsa-ui/react-native-workflows';

import {ElsaProvider} from '../provider/backend';

const Stack = createNativeStackNavigator();

export default function ({provider}: {provider: ElsaProvider}) {
  return (
    <Stack.Navigator
      initialRouteName="ctc.view-appointments"
      screenOptions={{headerShown: false}}>
      <Stack.Screen
        name="ctc.dashboard"
        component={withFlowContext(DashboardScreen, {
          actions: ({navigation}) => ({
            onNewPatient() {},
            onViewAppointments() {},
            onViewPatients() {},
          }),
        })}
      />
      <Stack.Screen
        name="ctc.view-appointments"
        component={withFlowContext(ViewAppointmentsScreen)}
      />
      <Stack.Screen
        name="ctc.first-patient-intake"
        component={withFlowContext(NewVisitEntryScreen, {
          entry: {
            initial: {
              patientId: '1234567890111213',
              facility: 'Meru District CTC',
            },
          },
          actions: ({navigation}) => ({
            onNext() {
              navigation.navigate('ctc.hiv-stage-intake');
              // ...
            },
          }),
        })}
      />
      <Stack.Screen
        name="ctc.hiv-stage-intake"
        component={withFlowContext(HIVStageIntakeScreen, {
          entry: {
            initial: {
              patientId: '1234567890111213',
              facility: 'Meru District CTC',
            },
          },
          actions: ({navigation}) => ({
            onNext() {
              navigation.navigate('ctc.adherence-assessment');
              // ...
            },
          }),
        })}
      />
      <Stack.Screen
        name="ctc.adherence-assessment"
        component={withFlowContext(HIVAdherenceAssessmentScreen, {
          entry: {
            initial: {
              patientId: '1234567890111213',
              facility: 'Meru District CTC',
            },
          },
          actions: ({navigation}) => ({
            onNext() {
              navigation.navigate('ctc.conclude-assessment');
              // ...
            },
          }),
        })}
      />
      <Stack.Screen
        name="ctc.conclude-assessment"
        component={withFlowContext(ConcludeAssessmentScreen, {
          entry: {
            initial: {
              patientId: '1234567890111213',
              facility: 'Meru District CTC',
            },
          },
          actions: ({navigation}) => ({
            onNext() {
              // ...
              navigation.navigate('ctc.first-patient-intake');
            },
          }),
        })}
      />
    </Stack.Navigator>
  );
}
