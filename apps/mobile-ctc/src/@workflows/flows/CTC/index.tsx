import React from 'react';

import {withFlowContext} from '../../index';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

import ApVisDahboardScreen from '../../screens/ApVisDashboard';
import CTCRegisterNewPatientScreen from '../../screens/CTCRegisterNewPatient';

import CTCPatientVisistScreenGroup from '../../screen-groups/CTCPatientVisit';
import BasicAssessmentScreen from '../../screen-groups/BasicAssessment';

const Stack = createNativeStackNavigator();

export default function CTCFlow() {
  return (
    <Stack.Navigator
      screenOptions={{headerShown: false}}
      initialRouteName="ctc.patientVisit">
      <Stack.Screen
        name="ctc.dashboard"
        component={withFlowContext(ApVisDahboardScreen, {
          entry: {
            fullName: 'Kevin James',
          },
          actions: ({navigation}) => ({
            loadPatients: async () => [],
          }),
        })}
      />
      <Stack.Screen
        name="ctc.registerPatient"
        component={withFlowContext(CTCRegisterNewPatientScreen, {
          actions: ({navigation}) => ({
            onRegisterPatient: patientForm => {
              // TODO: This should be a conditional navigation. Depends on where they came from
              console.log(patientForm);
              navigation.navigate('ctc.patientVisit');
            },
          }),
        })}
      />
      <Stack.Screen
        name="ctc.patientVisit"
        component={withFlowContext(CTCPatientVisistScreenGroup, {
          actions: ({navigation}) => ({
            onNext: patientForm => {
              console.log(patientForm);
              // TODO: This should be a conditional navigation. Depends on where they came from
              navigation.navigate('ctc.patientAssessment');
            },
          }),
        })}
      />
      <Stack.Screen
        name="ctc.patientAssessment"
        component={withFlowContext(BasicAssessmentScreen, {
          entry: {
            patient: {sex: 'male', age: {years: 23}},
          },
          actions: ({navigation}) => ({
            onCancel: () => {
              navigation.navigate('ctc.dashboard');
            },
            onCompleteAssessment: () => {
              navigation.navigate('');
            },
          }),
        })}
      />
    </Stack.Navigator>
  );
}
