import React from 'react';

import {createNativeStackNavigator} from '@react-navigation/native-stack';

import DashboardScreen from './_screens/Dashboard';
import PatientDashboard from './_screens/PatientDashboard';
import InvestigationsDashboardScreen from './_screens/InvestigationDashboard';
import MedicationsDashboardScreen from './_screens/MedicationDashboard';
import ReportSummaryScreen from './_screens/ReportSummary';

import ViewAppointmentsScreen from './_screens/ViewAppointments';
import ViewVisitScreen from './_screens/ViewVisit';
import ViewPatientScreen from './_screens/ViewPatient';
import ViewInvestigationScreen from './_screens/ViewInvestigation';

import MedicationMapScreen from './_screens/MedicationMap';
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

import {
  doc,
  setDoc,
  Document,
  getDocs,
  setDocs,
  collection,
  addDoc,
  updateDoc,
} from 'papai/collection';
import {HybridLogicalClock} from 'papai/distributed/clock';
import {List} from 'immutable';
import {ToastAndroid, View} from 'react-native';
import {TouchableRipple} from 'react-native-paper';
import _ from 'lodash';
import {translatePatient} from './actions/translate';
import {
  arv,
  arvSingle,
  getOrganizationFromProvider,
  investigationRequest,
  medRequest,
  reference,
  stanMed,
} from './actions/basic';
import {queryPatientsFromSearch} from './actions/ui';
import {
  CTCAppointment,
  CTCAppointmentRequest,
  CTCDoctor,
  CTCVisit,
} from './emr/types';
import {ConfirmVisitModal, useVisit} from './actions/hook';
import MedicationVisit, {
  MedicationRequestVisitData,
} from './_screens/MedicationVisit';
import MedicationStock from './_screens/MedicationStock';
import {useCTCVisit, useEMR, useMedicationStock} from './emr/react-hooks';

import * as Sentry from '@sentry/react-native';
import {runOnJS} from 'react-native-reanimated';
import {queryCollection} from './emr/actions';
import {convert_v0_patient_to_v1} from './storage/migration-v0-v1';
import {convertDMYToDate} from './emr/utils';
import {useEMRReport, useReport} from './emr/react-hooks/report';
import {format, isAfter} from 'date-fns';

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

function App({
  provider,
  appVersion,
  logout,
}: {
  provider: ElsaProvider;
  appVersion: string;
  logout: () => Promise<void>;
}) {
  // Create provider
  const [emr, organization, doctor] = React.useMemo(
    () => [
      new EMR(provider),
      getOrganizationFromProvider(provider),
      practitioner(provider),
    ],
    [provider],
  );

  // connect with v0 edge
  useWebSocket({
    url: 'wss://ctc-edge-server.fly.dev/channel/cmrdt',
    onOpen(socket) {
      console.log('Connection established!');
    },
    onMessage(e) {
      console.log('onMessage');
      // assumed HUGE payload
      // -----------------
      const x: [Document.Ref, {[k: string]: Data}][] = e.data
        ? JSON.parse(e.data)
        : [];

      if (x.length === 0) {
        return;
      }

      // console.log(x[0]);
      // console.log({collectionId, id, result});

      // Might want to change this later
      // this assumes all are coming from one collection
      const docs = x
        .filter(c => c.state.op.collectionId === 'patients')
        .map(c => {
          const {
            state: {
              op: {collectionId, id},
              result,
            },
          } = c;

          return [id, convert_v0_patient_to_v1(id, result)];
        });

      setDocs(emr.collections.patients, docs);
      // console.log(docs[0]);
    },
  });

  type StockMessage = {
    type: 'stock';
    data: {stock: []; source: {facility: any; user: any}}[];
  };

  // Get web socket
  useWebSocket({
    // url: 'https://bounce-edge.fly.dev/crdt/state',
    url: 'wss://c0ac-197-250-224-127.eu.ngrok.io/crdt/state',
    onOpen(socket) {
      // Connected
      console.log('Connection established!!!');
    },
    onData(data: CRDTMessage[] | StockMessage) {
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
  // React.useEffect(() => {
  //   if (socket !== undefined) {
  //     const sub = emr.onSnapshotUpdate((token, source) => {
  //       // console.log('Sending', {token, source});
  //       // send message
  //       socket.send(JSON.stringify([[token, source]]));
  //     });

  //     return () => sub.unsubscribe();
  //   }
  // }, [socket]);

  // const {
  //   data: {visits, patients},
  //   Q,
  // } = useEMR(emr);
  const stock = useMedicationStock(emr);
  // const report = useReport(emr);
  const report = useEMRReport(emr);

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
            entry: {fullName: provider.user.displayName},
            actions: ({navigation}) => ({
              logout,
              onSearchPatient() {
                navigation.navigate('ctc.patient-dashboard', {searchText: ''});
              },
              onNewPatient() {
                navigation.navigate('ctc.register-new-patient');
              },
              onViewPatients() {
                navigation.navigate('ctc.patient-dashboard');
              },
              onViewMedicationStock() {
                navigation.navigate('ctc.medication-stock');
              },
              onViewAppointments() {
                navigation.navigate('ctc.view-appointments');
              },
              onViewMedications() {
                navigation.navigate('ctc.medications-dashboard');
              },
              onViewReports() {
                navigation.navigate('ctc.report-summary');
              },
              onSeeOtherMedications() {
                navigation.navigate('ctc.medication-map');
              },
            }),
          })}
        />
        <Stack.Screen
          name="ctc.medication-map"
          component={withFlowContext(MedicationMapScreen, {
            actions: ({navigation}) => ({
              onUpdateStock() {
                navigation.navigate('ctc.medication-stock');
              },
            }),
          })}
        />
        <Stack.Screen
          name="ctc.report-summary"
          component={withFlowContext(ReportSummaryScreen, {
            entry: report,
          })}
        />
        <Stack.Screen
          name="ctc.medication-visit"
          component={withFlowContext(MedicationVisit, {
            entry: {},
            actions: ({navigation}) => ({
              async complete(data, patient, organization) {
                try {
                  // console.log('##### -2');
                  // create a medication request
                  const {arvRegimens, medications, appointmentDate} = data;

                  // ARV medication requests
                  const arvMedRqs = (arvRegimens ?? []).map(arvMedId =>
                    medRequest(
                      `med-req:${uuid.v4()}` as string,
                      arv(`ctc-arv:${arvMedId}`, arvMedId),
                      {},
                      {
                        requester: doctor,
                        subject: patient,
                      },
                    ),
                  );
                  // console.log('##### -1');

                  // other medication
                  const standardMedRqs = (medications ?? []).map(medId =>
                    medRequest(
                      `med-req:${uuid.v4()}` as string,
                      stanMed(`ctc-standard:${medId}`, medId),
                      {},
                      {
                        requester: doctor,
                        subject: patient,
                      },
                    ),
                  );

                  // console.log('##### 0');

                  // prepare prescriptions
                  const prescriptions = [...arvMedRqs, ...standardMedRqs];

                  // create a new visit
                  const visit: CTCVisit = {
                    id: `visit:${uuid.v4()}`,
                    resourceType: 'Visit',
                    code: null,
                    subject: reference(patient),
                    practitioner: reference(doctor),
                    assessments: [],
                    associatedAppointmentResponse: null,
                    date: convertDMYToDate(data.dateOfVisit).toUTCString(),
                    createdAt: new Date().toUTCString(),
                    extendedData: data,
                    investigationRequests: [],
                    prescriptions: prescriptions.map(reference),
                  };
                  // console.log('##### 1');

                  // create appointment
                  const d = convertDMYToDate(appointmentDate);
                  const appointmentReq: CTCAppointmentRequest = {
                    id: `appt-req:${uuid.v4()}`,
                    resourceType: 'AppointmentRequest',
                    code: null,
                    createdAt: new Date().toUTCString(),
                    appointmentDate: d.toUTCString(),
                    description: 'Auto-created appointment from a Visit',
                    participants: [reference(patient), reference(doctor)],
                    reason: 'Created as next appointment from visit',
                    visit: reference(visit),
                  };

                  // console.log('##### 2');

                  // record the medication requests
                  await setDocs(
                    emr.collections.medicationRequests,
                    (prescriptions ?? []).map(d => [d.id, d]),
                  );
                  // console.log('##### 3');

                  // record the visit
                  await setDoc(doc(emr.collections.visits, visit.id), visit);
                  // console.log('##### 4');

                  // record appointment request
                  await setDoc(
                    doc(emr.collections.appointmentRequests, appointmentReq.id),
                    appointmentReq,
                  );

                  ToastAndroid.show(
                    patient.id + ' visit recorded!.',
                    ToastAndroid.SHORT,
                  );

                  // recording the investigation requests
                  await setDocs(
                    emr.collections.investigationRequests,
                    (data.investigations ?? []).map(inv => {
                      const id = `inv-req:${uuid.v4()}`;
                      return [
                        id,
                        investigationRequest(
                          {
                            id,
                            requester: reference(doctor),
                            subject: {
                              resourceReferenced: 'Patient',
                              resourceType: 'Reference',
                              id: patient.id,
                            },
                          },
                          {
                            investigationId: inv,
                            obj: Investigation.fromKey(inv) ?? null,
                          },
                        ),
                      ];
                    }) || [],
                  );

                  ToastAndroid.show(
                    'Completed recording investigation + prescriptions',
                    ToastAndroid.SHORT,
                  );

                  navigation.goBack();
                } catch (err) {
                  console.log(err);
                  ToastAndroid.show(
                    'Failed to properly complete the visit. Try again later.',
                    ToastAndroid.LONG,
                  );
                  Sentry.captureException(err);
                }
              },
              onDiscard() {
                navigation.goBack();
              },
            }),
          })}
        />
        <Stack.Screen
          name="ctc.medication-stock"
          component={withFlowContext(MedicationStock, {
            entry: stock,
            actions: ({navigation}) => ({
              async setARVSingleMedicationCount(data) {
                const org =
                  doctor.organization.resourceType === 'Organization'
                    ? reference(doctor.organization)
                    : doctor.organization;

                if (data.id === undefined) {
                  const toStock = arvSingle(
                    `ctc-arv-single:${data.single}`,
                    data.single,
                    data.form,
                  );

                  console.log('==>', {
                    resourceType: 'Stock',
                    id: `stock:${toStock.id}`,
                    code: null,
                    createdAt: new Date().toUTCString(),
                    lastUpdatedAt: new Date().toUTCString(),
                    managingOrganization: org,
                    expiresAt: convertDMYToDate(data.expiresAt).toUTCString(),
                    medication: toStock,
                    count: parseFloat(data.count.toString()),
                  });

                  // create new
                  await setDoc(doc(emr.collections.stock, toStock.id), {
                    resourceType: 'Stock',
                    id: `stock:${toStock.id}`,
                    code: null,
                    createdAt: new Date().toUTCString(),
                    lastUpdatedAt: new Date().toUTCString(),
                    managingOrganization: org,
                    expiresAt: convertDMYToDate(data.expiresAt).toUTCString(),
                    medication: toStock,
                    count: parseFloat(data.count.toString()),
                  });

                  console.log('Done');
                } else {
                  if (data.id === undefined) {
                    throw new Error('Missing Id for the medication to stock');
                  }
                  await updateDoc(doc(emr.collections.stock, data.id), {
                    count: parseFloat(data.count.toString()),
                    lastUpdatedAt: new Date().toUTCString(),
                    expiresAt: convertDMYToDate(data.expiresAt).toUTCString(),
                    managingOrganization: org,
                  });
                }
              },
              async setARVComboMedicationCount(data) {
                const org =
                  doctor.organization.resourceType === 'Organization'
                    ? reference(doctor.organization)
                    : doctor.organization;

                const expiresAt = data.expiresAt
                  ? convertDMYToDate(data.expiresAt).toUTCString()
                  : null;
                if (data.id === undefined) {
                  const toStock = arv(
                    `ctc-arv:${data.arvRegimen}`,
                    data.arvRegimen,
                    data.ingredients ?? [],
                  );

                  // create new
                  await setDoc(doc(emr.collections.stock, toStock.id), {
                    resourceType: 'Stock',
                    id: `stock:${toStock.id}`,
                    code: null,
                    createdAt: new Date().toUTCString(),
                    lastUpdatedAt: new Date().toUTCString(),
                    managingOrganization: org,
                    expiresAt,
                    medication: toStock,
                    count: parseFloat(data.count.toString()),
                  });
                } else {
                  if (data.id === undefined) {
                    throw new Error('Missing Id for the medication to stock');
                  }
                  await updateDoc(doc(emr.collections.stock, data.id), {
                    count: parseFloat(data.count),
                    lastUpdatedAt: new Date().toUTCString(),
                    expiresAt,
                    managingOrganization: org,
                  });
                }
              },
            }),
          })}
        />
        <Stack.Screen
          name="ctc.register-new-patient"
          component={withFlowContext(RegisterNewPatientScreen, {
            entry: {myCtcId: provider.facility.ctcCode},
            actions: ({navigation}) => ({
              onRegisterPatient(patient, investigations) {
                const d = translatePatient(patient, organization);

                // create patient
                setDoc(doc(emr.collections.patients, d.id), d)
                  .then(() => {
                    ToastAndroid.show(
                      'Patient ' + patient.patientId + ' registered !.',
                      ToastAndroid.SHORT,
                    );
                  })
                  .then(() => {
                    // update collection
                    return setDocs(
                      emr.collections.investigationRequests,
                      investigations?.map(inv => {
                        const id = `inv-req:${uuid.v4()}`;
                        return [
                          id,
                          investigationRequest(
                            {
                              id,
                              requester: reference(doctor),
                              subject: {
                                resourceReferenced: 'Patient',
                                resourceType: 'Reference',
                                id: d.id,
                              },
                            },
                            {
                              investigationId: inv,
                              obj: Investigation.fromKey(inv) ?? null,
                            },
                          ),
                        ];
                      }) || [],
                    );
                  })
                  .then(() => navigation.goBack())
                  .catch(err => {
                    ToastAndroid.show(
                      'Unable to register patient. Please try again later',
                      ToastAndroid.LONG,
                    );
                    Sentry.captureException(err);
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
                      // console.log('Setting up new visit', {
                      //   patient,
                      //   organization,
                      // });

                      navigation.navigate('ctc.medication-visit', {
                        patient,
                        organization,
                      });
                      // navigation.navigate('ctc.first-patient-intake', {
                      //   patient,
                      //   organization,
                      // });
                    },
                    onViewProfile: () => {
                      navigation.navigate('ctc.view-patient', {
                        patient,
                        organization,
                      });
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
            actions: ({navigation}) => ({
              onToEditPatient(patient) {
                // ... go to screen to edit patient
              },
              async nextAppointment(patientId: string) {
                const after = await queryCollection(
                  emr.collections.appointmentRequests,
                  {
                    where: {
                      $and: [
                        item =>
                          isAfter(new Date(item.appointmentDate), new Date()),
                        item => {
                          return (item.participants ?? [])
                            .map(d => d.id)
                            .includes(patientId);
                        },
                      ],
                    },
                    order: {
                      type: 'asc',
                      field: item => new Date(item.appointmentDate).getTime(),
                    },
                  },
                );

                const d = after.get(0) ?? null;

                if (d !== null) {
                  return {
                    appointmentDate: format(
                      new Date(d.appointmentDate),
                      'yyyy, MMMM dd',
                    ),
                  };
                }

                return null;
              },
              async fetchVisits(patientId: string) {
                return (
                  await queryCollection(emr.collections.visits, {
                    where: item => {
                      return item.subject.id === patientId;
                    },
                  })
                )
                  .map(d => ({
                    visitDate: d.date ?? d.createdAt,
                    'medication-requests-count': d.prescriptions.length,
                    onViewVisit: () => {
                      navigation.navigate('ctc.view-visit', {visit: d});
                    },
                    onEditVisit: async () => {
                      const patients = await queryCollection(
                        emr.collections.patients,
                        {where: item => item.id === patientId},
                      );

                      const patient = patients.get(0) ?? null;

                      if (patient !== null) {
                        navigation.navigate('ctc.medication-visit', {
                          patient,
                          organization,
                          edit: true,
                          initialState: {
                            dateOfVisit: format(
                              new Date(d.date ?? d.createdAt),
                              'dd / MM / yyyy',
                            ),
                            ...d.extendedData,
                          },
                        });
                      } else {
                        // ...
                        ToastAndroid.show(
                          'Patient is missing, unable to edit visit',
                          ToastAndroid.LONG,
                        );
                      }
                    },
                  }))
                  .toArray();
              },
            }),
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
      {/* <ConnectionStatus status={status} retry={retry} /> */}
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
