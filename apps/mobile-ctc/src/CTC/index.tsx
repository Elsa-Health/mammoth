import React from 'react';

import {createNativeStackNavigator} from '@react-navigation/native-stack';

import DashboardScreen from './_screens/Dashboard';
import PatientDashboard from './_screens/PatientDashboard';
import InvestigationsDashboardScreen from './_screens/InvestigationDashboard';
import MedicationsDashboardScreen from './_screens/MedicationDashboard';

import ViewAppointmentsScreen from './_screens/ViewAppointments';
import ViewVisitScreen from './_screens/ViewVisit';
import ViewPatientScreen from './_screens/ViewPatient';
import ViewInvestigationScreen from './_screens/ViewInvestigation';

import RegisterNewPatientScreen from './_screens/RegisterNewPatient';

import MedicationDispenseScreen from './_screens/MedicationDispense';
import MedicationRequestScreen from './_screens/MedicationRequest';

import NewVisitEntryScreen from './_screens/BasicPatientIntake';
import HIVStageIntakeScreen from './_screens/HIVStageIntake';
import HIVAdherenceAssessmentScreen from './_screens/HIVAdherenceAssessment';
import ConcludeAssessmentScreen from './_screens/ConcludeAssessment';

// import {withFlowContext} from '@elsa-ui/react-native-workflows';
import uuid from 'react-native-uuid';

import {ElsaProvider} from '../provider/backend';
import {MedicaDisp, MedicaReq} from './emr/hook';
import {Investigation, Medication} from 'elsa-health-data-fns/lib';
import {EMR} from './emr/store';
import {NetworkStatus, useWebSocket} from '../app/utils';

import {Text} from '@elsa-ui/react-native/components';

import {withFlowContext} from '../@workflows/index';

import {doc, setDoc, Document, getDocs} from 'papai/collection';
import {HybridLogicalClock} from 'papai/distributed/clock';
import {List} from 'immutable';
import {ToastAndroid, View} from 'react-native';
import {TouchableRipple} from 'react-native-paper';
import _ from 'lodash';
import {translatePatient} from './actions/translate';
import {getOrganizationFromProvider} from './actions/basic';
import {queryPatientsFromSearch} from './actions/ui';
import {CTCDoctor} from './emr/types';
import {ConfirmVisitModal, useVisit} from './actions/hook';

const Stack = createNativeStackNavigator();

function practitioner(ep: ElsaProvider): CTCDoctor {
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
    serviceProvider: {
      active: true,
      code: null,
      createdAt: new Date().toISOString(),
      extendedData: {role: 'doctor', tag: 'ctc'},
      id: `ctc-doctor-${ep.user.uid} `,
      name: 'CTC Doctor',
      resourceType: 'HealthcareService',
    },
  };
}

type State = [Document.Ref, Document.Data, HybridLogicalClock];
type CRDTMessage = [State, {facility: any; user: any}];

function App({provider}: {provider: ElsaProvider}) {
  // Create provider
  const [emr, organization, doctor] = React.useMemo(
    () => [
      new EMR(provider),
      getOrganizationFromProvider(provider),
      practitioner(provider),
    ],
    [provider],
  );

  const {socket, status, retry} = useWebSocket({
    url: 'https://bounce-edge.fly.dev/crdt/state',
    // url: 'https://cfe3-197-250-60-110.eu.ngrok.io/crdt/state',
    onOpen(socket) {
      // Connected
      console.log('Connection established!!!');
    },
    onData(data: CRDTMessage[]) {
      // console.log('Sending to something...');
      // Received data
      emr.merge(data);
      // console.log('Received data... merging');
      emr
        .sync()
        .then(() => console.log('Sync complete'))
        .catch(() => console.log('Sync failed'));
    },
  });

  const {setValue, initiateVisit, context, ready: show, confirm} = useVisit();

  React.useEffect(() => {
    if (socket !== undefined) {
      const sub = emr.onSnapshotUpdate((token, source) => {
        // console.log('Sending', {token, source});
        // send message
        socket.send(JSON.stringify([[token, source]]));
      });

      return () => sub.unsubscribe();
    }
  }, [socket]);

  return (
    <>
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
          presentation: 'formSheet',
          animation: 'slide_from_right',
          animationTypeForReplace: 'pop',
        }}>
        <Stack.Screen
          name="ctc.dashboard"
          component={withFlowContext(DashboardScreen, {
            actions: ({navigation}) => ({
              onSearchPatient() {
                navigation.navigate('ctc.patient-dashboard', {searchText: ''});
              },
              onNewPatient() {
                navigation.navigate('ctc.register-new-patient');
              },
              onViewPatients() {
                navigation.navigate('ctc.patient-dashboard');
              },
              onViewAppointments() {
                navigation.navigate('ctc.view-appointments');
              },
              onViewMedications() {
                navigation.navigate('ctc.medications-dashboard');
              },
            }),
          })}
        />
        <Stack.Screen
          name="ctc.register-new-patient"
          component={withFlowContext(RegisterNewPatientScreen, {
            entry: {myCtcId: provider.facility.ctcCode},
            actions: ({navigation}) => ({
              onRegisterPatient(patient) {
                const d = translatePatient(patient, organization);

                setDoc(doc(emr.collections.patients, d.id), d)
                  .then(() => {
                    console.log('Register people', d);
                  })
                  .then(() => navigation.goBack())
                  .catch(err => {
                    console.log('FAILED TO REGISTER PATIENT');
                    console.error(err);
                  });
              },
            }),
          })}
        />
        <Stack.Screen
          name="ctc.view-appointments"
          component={withFlowContext(ViewAppointmentsScreen)}
        />
        <Stack.Screen
          name="ctc.patient-dashboard"
          component={withFlowContext(PatientDashboard, {
            actions: ({navigation}) => ({
              getPatientsFromQuery(query) {
                return queryPatientsFromSearch(emr, query, patient => {
                  const firstName = (patient.info?.firstName ?? '').trim();
                  const familyName = (patient.info?.familyName ?? '').trim();
                  const fullName = (firstName + ' ' + familyName).trim();
                  return {
                    id: patient.id,
                    name: fullName.length === 0 ? null : fullName,
                    registeredDate: new Date(patient.createdAt),
                    onNewVisit: () => {
                      console.log('Setting up new visit', {
                        patient,
                        organization,
                      });
                      navigation.navigate('ctc.first-patient-intake', {
                        patient,
                        organization,
                      });
                    },
                    onViewProfile: () => {
                      navigation.navigate('ctc.view-patient');
                    },
                  };
                });
              },
              onNewPatient() {
                navigation.navigate('ctc.register-new-patient');
              },
            }),
          })}
        />
        <Stack.Screen
          name="ctc.view-patient"
          component={withFlowContext(ViewPatientScreen, {
            // patient:
          })}
        />
        <Stack.Screen
          name="ctc.view-investigation"
          component={withFlowContext(ViewInvestigationScreen, {})}
        />
        <Stack.Screen
          name="ctc.view-visit"
          component={withFlowContext(ViewVisitScreen, {
            actions: ({navigation}) => ({
              onNext() {},
              // Load result from investigation request
              async getInvestigationResult(invRequest) {},
            }),
            entry: {
              visit: {
                assessments: [],
                authorizingAppointment: null,
                createdAt: new Date().toISOString(),
                code: null,
                extendedData: {},
                id: uuid.v4() as string,
                investigationRequests: [
                  {
                    code: null,
                    createdAt: new Date().toISOString(),
                    id: uuid.v4() as string,
                    requester: practitioner(provider),
                    resourceType: 'InvestigationRequest',
                    subject: {
                      id: '11111111111111',
                      resourceReferenced: 'Patient',
                      resourceType: 'Reference',
                    },
                    data: {
                      investigationId: 'cd-4-count',
                      obj: Investigation.fromKey('cd-4-count'),
                    },
                  },
                ],
                practitioner: practitioner(provider),
                prescriptions: [],
                subject: {
                  id: '11111111111111',
                  resourceReferenced: 'Patient',
                  resourceType: 'Reference',
                },
                resourceType: 'Visit',
              },
            },
          })}
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
          name="ctc.view-medication-dispenses"
          component={withFlowContext(MedicationDispenseScreen, {
            actions: ({navigation}) => ({
              async getMedicationDispenses() {
                return (await getDocs(emr.collections.medicationDispenses)).map(
                  d => d[1],
                );
              },
            }),
          })}
        />
        <Stack.Screen
          name="ctc.view-single-medication-request"
          component={withFlowContext(MedicationRequestScreen, {
            actions: ({navigation}) => ({
              async getMedicationDispenses() {
                return (await getDocs(emr.collections.medicationDispenses)).map(
                  d => d[1],
                );
              },
              onIgnoreRequest() {
                navigation.goBack();
              },
              onAcceptMedicationRequest(medicationRequest, finish) {
                // console.log('Accepting ARV Medication');
                const now = new Date();

                const dispense: MedicaDisp = {
                  authorizingRequest: {
                    id: medicationRequest.id,
                    resourceType: 'Reference',
                    resourceReferenced: 'MedicationRequest',
                  },
                  code: null,
                  createdAt: now.toISOString(),
                  dosageAndRate: null,
                  id: uuid.v4() as string,
                  medication: medicationRequest.medication,
                  resourceType: 'MedicationDispense',
                  supplier: practitioner(provider),
                };
                setDoc(
                  doc(emr.collections.medicationDispenses, dispense.id),
                  dispense,
                )
                  .then(() => {
                    console.log('Medication Request accepted', dispense.id);
                  })
                  .then(finish)
                  .then(() => navigation.goBack())
                  .catch(() => {
                    console.log('Unable to accept medication request');
                  });
              },
            }),
          })}
        />
        <Stack.Screen
          name="ctc.medications-dashboard"
          component={withFlowContext(MedicationsDashboardScreen, {
            actions: ({navigation}) => ({
              async getMedicationRequests() {
                return (await getDocs(emr.collections.medicationRequests)).map(
                  d => d[1],
                );
              },

              async getMedicationDispenseFrom(medicationRequest: MedicaReq) {
                const d = List(
                  await getDocs(emr.collections.medicationDispenses),
                );

                const match = d.find(
                  ([_, data]) =>
                    data.authorizingRequest.id === medicationRequest.id,
                );

                return match?.[1] ?? null;
              },
              onShowMedicationRequest(request) {
                navigation.navigate('ctc.view-single-medication-request', {
                  request,
                });
              },
              onShowAllMedicationDispenses() {
                navigation.navigate('ctc.view-medication-dispenses');
              },
              onMakeRequest(data, finish) {
                // add medications to the list
                console.log('Sending request....');
                const now = new Date();

                const request: MedicaReq = {
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
                };

                // Send over request
                // ...
                setDoc(
                  doc(emr.collections.medicationRequests, request.id),
                  request,
                )
                  .then(() => {
                    console.log('SUCESSS!!!');
                  })
                  .then(finish)
                  .catch(() => {
                    console.log('Failed to add medication request');
                  });
              },
            }),
          })}
        />
        {/* Visit something */}
        <Stack.Screen
          name="ctc.first-patient-intake"
          component={withFlowContext(NewVisitEntryScreen, {
            actions: ({navigation}) => ({
              onNext(data, patient, organization) {
                initiateVisit(doctor, patient);
                setValue('firstPatientIntake', data);
                navigation.push('ctc.hiv-stage-intake');
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
              onNext(values, isPerformingSymptomAssessment) {
                setValue('currentHIVStatus', values);
                if (!isPerformingSymptomAssessment) {
                  navigation.push('ctc.adherence-assessment');
                } else {
                  ToastAndroid.show(
                    'Unable to do that right now',
                    ToastAndroid.LONG,
                  );
                }
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
              onNext(data) {
                navigation.push('ctc.conclude-assessment');
                setValue('patientAdherenceInfo', data);
              },
              onSkip() {},
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
              onDiscard() {
                console.log('Discarding the visit');
                navigation.popToTop();
              },
              onComplete(value) {
                setValue('conclusionAssessment', value);
                confirm();
              },
            }),
          })}
        />
      </Stack.Navigator>
      <ConnectionStatus status={status} retry={retry} />
      <ConfirmVisitModal
        visible={show}
        context={context}
        cancelVisit={() => {
          console.log('Visit cancelled; navigate to dashboard');
        }}
        generateId={uuid.v4}
        recordVisit={async visit => {
          console.log(visit);
          // store
          navigation.navigate('ctc.dashboard');
        }}
      />
    </>
  );
}

function ConnectionStatus({
  status,
  retry,
}: {
  status: NetworkStatus;
  retry: () => void;
}) {
  return (
    <TouchableRipple
      onPress={status === 'error' || status === 'offline' ? retry : undefined}>
      <View
        style={{
          backgroundColor:
            status === 'connecting'
              ? '#CCC'
              : status === 'offline'
              ? '#EEE'
              : status === 'online'
              ? '#4665af'
              : '#F00',

          paddingVertical: 2,
        }}>
        <Text
          size="sm"
          font="medium"
          style={{textAlign: 'center'}}
          color={status === 'online' || status === 'error' ? '#FFF' : '#000'}>
          {_.capitalize(status)}{' '}
          {(status === 'error' || status === 'offline') && 'Reconnect?'}
        </Text>
      </View>
    </TouchableRipple>
  );
}

export default function (props: {provider: ElsaProvider}) {
  return <App {...props} />;
}
