import React from 'react';

import {createNativeStackNavigator} from '@react-navigation/native-stack';

import DashboardScreen from './_screens/Dashboard';
import ViewAppointmentsScreen from './_screens/ViewAppointments';
import ViewVisitScreen from './_screens/ViewVisit';

import InvestigationsDashboardScreen from './_screens/InvestigationDashboard';
import MedicationsDashboardScreen from './_screens/MedicationDashboard';
import PatientDashboard from './_screens/PatientDashboard';

import NewVisitEntryScreen from './_screens/BasicPatientIntake';
import HIVStageIntakeScreen from './_screens/HIVStageIntake';
import HIVAdherenceAssessmentScreen from './_screens/HIVAdherenceAssessment';
import ConcludeAssessmentScreen from './_screens/ConcludeAssessment';

import {withFlowContext} from '@elsa-ui/react-native-workflows';
import uuid from 'react-native-uuid';

import {ElsaProvider} from '../provider/backend';
import {useStore} from './emr';
import {Medication} from 'elsa-health-data-fns/lib';
import {Practitioner} from '../emr-types/v1/personnel';

const Stack = createNativeStackNavigator();

function practitioner(ep: ElsaProvider): Practitioner {
  return {
    active: true,
    address: ep.facility.address ?? null,
    birthDate: null,
    code: null,
    communication: {language: 'en'},
    contact: {
      email: ep.user.email ?? null,
      phoneNumber: ep.user.phoneNumber ?? null,
    },
    createdAt: new Date().toISOString(),
    gender: 'unknown',
    id: ep.user.uid,
    name: ep.user.displayName ?? ep.user.uid,
    organization: {
      resourceType: 'Reference',
      resourceReferenced: 'Organization',
      // id: ep.facility.name,
      data: {
        name: ep.facility.name,
        ctcCode: ep.facility.ctcCode ?? null,
      },
    },
    resourceType: 'Practitioner',
    serviceProvider: null,
  };
}

function App({provider}: {provider: ElsaProvider}) {
  const store = useStore();
  return (
    <Stack.Navigator
      initialRouteName="ctc.view-visit"
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
        name="ctc.view-patient"
        component={withFlowContext(PatientDashboard)}
      />
      <Stack.Screen
        name="ctc.view-visit"
        component={withFlowContext(ViewVisitScreen)}
      />
      <Stack.Screen
        name="ctc.investigations-dashboard"
        component={withFlowContext(InvestigationsDashboardScreen, {
          actions: ({navigation}) => ({
            onNext() {},
          }),
        })}
      />
      <Stack.Screen
        name="ctc.medications-dashboard"
        component={withFlowContext(MedicationsDashboardScreen, {
          actions: ({navigation}) => ({
            getMedicationRequests() {
              return store.medicationRequests.toArray();
            },
            getMedicationDispenses() {
              return store.medicationDispenses.toArray();
            },
            onAcceptStandardMedicationRequest(medicationRequest, finish) {
              console.log('Requesting Medication');
              // medicationRequest.authoredOn;

              // send's finish message over
              // e.g. might trigger close modal
              finish();
            },
            onShowAllMedicationRequests() {
              console.log('Navigating');
            },
            onMakeRequest(data, finish) {
              // add medications to the list
              console.log('Making the something....');
              const now = new Date();

              store.addMedicationRequest({
                authoredOn: now.toUTCString(),
                code: null,
                createdAt: now.toISOString(),
                id: uuid.v4() as string,
                instructions: null,
                medication: {
                  resourceType: 'Medication',
                  alias:
                    data.type === 'standard'
                      ? Medication.all.fromKey(data.medication)
                      : null,
                  code: data.type ?? 'standard',
                  data:
                    data.type === 'arv'
                      ? {className: data.className, regimen: data.regimen}
                      : {
                          medication: data.medication,
                          text: Medication.all.fromKey(data.medication),
                        },
                  id:
                    data.type === 'arv'
                      ? `ctc-arv:${data.regimen}`
                      : `ctc-standard:${data.medication}`,
                  ingredients: [],
                  name: data.type === 'arv' ? data.regimen : data.medication,
                  createdAt: now.toISOString(),
                },
                requester: practitioner(provider),

                subject: {
                  id: data.patientId,
                  resourceReferenced: 'Patient',
                  resourceType: 'Reference',
                },
                reason: data.reason,
                method: 'Unspecified',
                route: 'Non specific',
                status: 'active',
                resourceType: 'MedicationRequest',
              });
              // ...
              console.log(data);
              finish();
            },
          }),
        })}
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

export default function (props: {provider: ElsaProvider}) {
  return <App {...props} />;
}
