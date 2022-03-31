import React from 'react';

import {withFlowContext} from '../@workflows/index';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

import ApVisDahboardScreen from '../@workflows/screens/ApVisDashboard';
import CTCRegisterNewPatientScreen from '../@workflows/screens/CTCRegisterNewPatient';
import HIVAdherenceAssessmentScreen from '../@workflows/screens/HIVAdherenceAssessment';
import OrderInvestigationScreen from '../@workflows/screens/OrderInvestigation';
import HIVDispenseMedicationScreen from '../@workflows/screens/HIVDispenseMedication';
import CTCNextStepsScreen from '../@workflows/screens/CTCNextSteps';

import CTCPatientVisistScreenGroup from '../@workflows/screen-groups/CTCPatientVisit';
import BasicAssessmentScreenGroup from '../@workflows/screen-groups/BasicAssessment';
import CTCAssessmentSummaryScreenGroup from '../@workflows/screen-groups/CTCAssessmentSummary';
import * as data from '../@libs/data-fns';

import {CTC, ARV} from '@elsa-health/data-fns';

import {buildStore} from '../@libs/storage-core';
import ItemStorage from '../@libs/storage-stores/local/itemStorage';
import AsyncStorage from '@react-native-async-storage/async-storage';
import uuid from 'react-native-uuid';
import {Portal, Snackbar} from 'react-native-paper';

export const keyGenerator = (key?: string | undefined) =>
  key || uuid.v4().toString();

const store = buildStore(
  ItemStorage('CTC_APP_STORAGE@DEV', AsyncStorage, keyGenerator),
);

const deviceStorage = () => store;

const emr = deviceStorage();

const cPatientsRef = emr.collection('patients');
const cVisitsRef = emr.collection('visits');
const cAppointRef = emr.collection('appointments');

export default function CTCApp() {
  React.useEffect(() => {
    [cPatientsRef, cVisitsRef, cAppointRef].map(collRef =>
      collRef.create({createIfNotExists: true}),
    );
  }, []);

  return <CTCFlow />;
}

const Stack = createNativeStackNavigator();

function CTCFlow() {
  const [message, setMessage] = React.useState<{
    text: string;
    type: 'error' | 'success' | 'default';
  } | null>(null);

  const dismiss = () => {
    setMessage(null);
  };

  return (
    <>
      <Stack.Navigator
        screenOptions={{headerShown: false}}
        initialRouteName="ctc.assessment_summary">
        <Stack.Screen
          name="ctc.dashboard"
          component={withFlowContext(ApVisDahboardScreen, {
            entry: {
              fullName: 'Kevin James',
            },
            actions: ({navigation}) => ({
              loadPatients: async () => [],
              onNewPatient: () => {
                navigation.navigate('ctc.register_patient');
              },
              onNewVisit: () => {
                navigation.navigate('ctc.patient_visit');
              },
            }),
          })}
        />
        <Stack.Screen
          name="ctc.register_patient"
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
                navigation.navigate('ctc.patient_assessment');
                // navigation.navigate('ctc.adherence_assessment');
              },
            }),
          })}
        />
        <Stack.Screen
          name="ctc.patient_assessment"
          component={withFlowContext(BasicAssessmentScreenGroup, {
            entry: {
              patient: {sex: 'male', age: {years: 23}},
            },
            actions: ({navigation}) => ({
              onCancel: () => {
                navigation.navigate('ctc.dashboard');
              },
              onCompleteAssessment: (data, elsaDfs) => {
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
                navigation.navigate('ctc.assessment_summary');
              },
            }),
          })}
        />
        <Stack.Screen
          name="ctc.assessment_summary"
          component={withFlowContext(CTCAssessmentSummaryScreenGroup, {
            entry: {
              condition: 'cryptococcal-meningitis',
              conditionValuePairs: [
                ['cryptococcal-meningitis', 0.8],
                ['asthma', 0.5],
                ['toxoplasmosis', 0.2],
              ],
            },
            actions: ({navigation}) => ({
              onConclude: data => {
                console.log('Conclude App', data);
              },
            }),
          })}
        />
      </Stack.Navigator>

      <Portal>
        <Snackbar
          visible={message !== null}
          onDismiss={dismiss}
          action={{
            label: 'Dismiss',
            onPress: dismiss,
          }}>
          {message?.text}
        </Snackbar>
      </Portal>
    </>
  );
}
