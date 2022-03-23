import React from 'react';

import {withFlowContext} from '../../index';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

import ApVisDahboardScreen from '../../screens/ApVisDashboard';
import CTCRegisterNewPatientScreen from '../../screens/CTCRegisterNewPatient';
import HIVAdherenceAssessmentScreen from '../../screens/HIVAdherenceAssessment';
import OrderInvestigationScreen from '../../screens/OrderInvestigation';

import CTCPatientVisistScreenGroup from '../../screen-groups/CTCPatientVisit';
import BasicAssessmentScreen from '../../screen-groups/BasicAssessment';

import * as data from '../../../@libs/data-fns';

const Stack = createNativeStackNavigator();

export default function CTCFlow() {
  return (
    <Stack.Navigator
      screenOptions={{headerShown: false}}
      initialRouteName="ctc.adherencesdsdsd_assessment">
      <Stack.Screen
        name="ctc.dashboard"
        component={withFlowContext(ApVisDahboardScreen, {
          entry: {
            fullName: 'Kevin James',
          },
          actions: ({navigation}) => ({
            loadPatients: async () => [],
            onNewPatient: () => {
              navigation.navigate('ctc.registerPatient');
            },
            onNewVisit: () => {
              navigation.navigate('ctc.patient_visit');
            },
            onPressCodeButton: () => {
              console.log('Scan QR code');
            },
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
              navigation.navigate('ctc.patient_visit');
            },
          }),
        })}
      />
      <Stack.Screen
        name="ctc.patient_visit"
        component={withFlowContext(CTCPatientVisistScreenGroup, {
          actions: ({navigation}) => ({
            onNext: patientForm => {
              console.log(patientForm);
              // TODO: This should be a conditional navigation. Depends on where they came from
              // navigation.navigate('ctc.patientAssessment');
              navigation.navigate('ctc.adherence_assessment');
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
              navigation.navigate('ctc.adherence_assessment');
            },
          }),
        })}
      />
      <Stack.Screen
        name="ctc.adherence_assessment"
        component={withFlowContext(HIVAdherenceAssessmentScreen, {
          actions: ({navigation}) => ({
            onCompleteAdherence: adhrence => {
              navigation.navigate('ctc.order_investigation');
            },
          }),
        })}
      />
      <Stack.Screen
        name="ctc.order_investigation"
        component={withFlowContext(OrderInvestigationScreen, {
          entry: {
            condition: 'anaemia',
            recommendedTests: ['alkaline-phosphatase-alp', 'albumin'],
          },
          actions: ({navigation}) => ({
            onOrder: (investigations, err) => {
              const invObjs = investigations.map(inv => {
                return {
                  obj: data.investigation.fromId(inv),
                  investigationId: inv,
                  result: undefined,
                };
              });

              navigation.navigate('lab.confirm_visit');
            },
          }),
        })}
      />
    </Stack.Navigator>
  );
}
