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
import ReportMissedAppointmentScreen from './_screens/ReportMissedAppointment';

import MedicationDispenseScreen from './_screens/MedicationDispense';
import MedicationRequestScreen from './_screens/MedicationRequest';
import MedicationStockDashboardScreen from './_screens/MedicationStockDashboard';

import NewVisitEntryScreen from './_screens/BasicPatientIntake';
import HIVStageIntakeScreen from './_screens/HIVStageIntake';
import HIVAdherenceAssessmentScreen from './_screens/HIVAdherenceAssessment';
import ConcludeAssessmentScreen from './_screens/ConcludeAssessment';

// import {withFlowContext} from '@elsa-ui/react-native-workflows';
import uuid from 'react-native-uuid';

import {ElsaProvider} from '../provider/backend';
import {ARV, Investigation, Medication as Med} from 'elsa-health-data-fns/lib';
import {NetworkStatus, useWebSocket} from '../app/utils';

import {withFlowContext} from '@elsa-ui/react-native-workflows';

import {
  doc,
  setDoc,
  getDocs,
  setDocs,
  query,
  updateDoc,
} from 'papai/collection';
import {List} from 'immutable';
import {ToastAndroid, View} from 'react-native';
import _ from 'lodash';
import {translatePatient} from './actions/translate';
import {
  getOrganizationFromProvider,
  investigationRequest,
  reference,
} from './actions/basic';
import {queryPatientsFromSearch} from './actions/ui';
import {CTC} from './emr/types';
import {ConfirmVisitModal, useVisit} from './actions/hook';
import MedicationVisit from './_screens/MedicationVisit';
import MedicationStock from './_screens/MedicationStock';
import {useAppointments, useStock, useEMRReport} from './emr/react-hooks';

import * as Sentry from '@sentry/react-native';
import {queryCollection} from './emr/actions';
import {convert_v0_patient_to_v1} from './storage/migration-v0-v1';
import {convertDMYToDate, removeWhiteSpace} from './emr/utils';
import {format, isAfter} from 'date-fns';
import {getEMR, onSnapshotUpdate, Seeding} from './emr/store';
import {
  AppointmentRequest,
  Ingredient,
  Medication,
  Patient,
  Report,
  Stock,
  ctc,
  prepareLazyExecutors,
  executeChain,
  InvestigationResult,
  Observation,
} from '@elsa-health/emr';
import {date, utcDateString} from '@elsa-health/emr/lib/utils';

import {syncContentsFromSocket, fetchCRDTMessages} from './actions/socket';
import type {Document} from 'papai/collection/types';
// Migration code
import AsyncStorage from '@react-native-async-storage/async-storage';
import {Migration} from './emr/temp.migrate';
import {TouchableRipple} from 'react-native-paper';
import {Text} from '@elsa-ui/react-native/components';
import produce from 'immer';

const Stack = createNativeStackNavigator();

function practitioner(ep: ElsaProvider): CTC.Doctor {
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

function App({
  provider,
  appVersion,
  logout,
}: {
  provider: ElsaProvider;
  appVersion: string;
  logout: () => Promise<void>;
}) {
  /**
   * Useful EMR components
   */
  const Emr = React.useMemo(() => getEMR(provider), [provider]);

  // Create provider
  const [organization, doctor] = React.useMemo(
    () => [getOrganizationFromProvider(provider), practitioner(provider)],
    [provider],
  );

  /**
   * Preparing storage executors
   */
  const executor = React.useMemo(
    () => ({
      visit: prepareLazyExecutors(
        data => (data?.id ?? uuid.v4()) as string,
        Emr.collection('visits'),
      ),
      apptRequest: prepareLazyExecutors(
        data => (data?.id ?? uuid.v4()) as string,
        Emr.collection('appointment-requests'),
      ),
      apptResponse: prepareLazyExecutors(
        data => (data?.id ?? uuid.v4()) as string,
        Emr.collection('appointment-responses'),
      ),
      medicationRequest: prepareLazyExecutors(
        data => (data?.id ?? uuid.v4()) as string,
        Emr.collection('medication-requests'),
      ),
      stock: prepareLazyExecutors(
        data => (data?.id ?? uuid.v4()) as string,
        Emr.collection('stock'),
      ),
      patient: prepareLazyExecutors(
        data => (data?.id ?? uuid.v4()) as string,
        Emr.collection('patients'),
      ),
      investigationRequest: prepareLazyExecutors(
        data => (data?.id ?? uuid.v4()) as string,
        Emr.collection('investigation-requests'),
      ),
      investigationResult: prepareLazyExecutors(
        data => (data?.id ?? uuid.v4()) as string,
        Emr.collection('investigation-results'),
      ),
    }),
    [Emr],
  );

  React.useEffect(() => {
    // queryCollection(Emr.collection('visits'))
    //   .then(d => d.map(x => x.associatedAppointmentResponse))
    //   .then(console.log);

    if (organization) {
      // Perform seeding for those new accounts
      Seeding(Emr, organization).then(() =>
        // include code to migrate over the records
        Migration(Emr),
      );
    } else {
      console.error("You don't have an organization");
    }
  }, [organization, Emr]);

  // Migrating the contents from the old edge server
  //  to this storage.
  // --------------------------------------
  // This code should be removed in the future.
  // --------------------------------------
  // to remove by v3 or v2.5
  //  (if there are those missing, then, might want
  //   to add the update manual push)
  useWebSocket({
    url: 'wss://ctc-edge-server.fly.dev/channel/cmrdt',
    onOpen(socket) {
      console.log('Connection established!');
    },
    onMessage(e) {
      console.log('onMessage');

      // update
      AsyncStorage.getItem('MIGRATE-OVER-PATIENT')
        .then(isToPatientMigrate => {
          // ...
          if (isToPatientMigrate !== null) {
            console.log('Not migrating patient...');
            return;
          }

          const ou =
            isToPatientMigrate !== null ? JSON.parse(isToPatientMigrate) : null;
          // console.log({isToSeed, ou});
          if (ou !== null) {
            console.log('Not migrating patient...');
            return;
          }

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

          return setDocs(Emr.collection('patients'), docs).then(_ =>
            AsyncStorage.setItem('MIGRATE-OVER-PATIENT', JSON.stringify(true)),
          );
        })
        .then(() => console.log('Patient migration completed!'))
        .catch(err => console.error(err));
      // console.log(docs[0]);
    },
  });
  // -------------------------------------

  // Get web socket
  const {socket, status, retry} = useWebSocket({
    url: `wss://${
      __DEV__ ? 'f7ca-197-250-61-138.eu.ngrok.io' : 'bounce-edge.fly.dev'
    }/ws/crdt/state`,
    // url: 'wss://e784-197-250-61-138.eu.ngrok.io/ws/crdt/state',
    onOpen(socket) {
      // Connected
      if (socket.readyState === WebSocket.OPEN) {
        fetchCRDTMessages(provider).then(message => {
          if (message !== null) {
            // console.log(s);
            const s = JSON.stringify(message);
            socket.send(s);
          }
        });
      }
    },
    onData(data) {
      // console.log(`[${provider.facility.ctcCode ?? 'UNKNOWN'}]:`, data);
      // peform synchronization
      syncContentsFromSocket(data);
    },
  });

  const {setValue, initiateVisit, context, ready: show, confirm} = useVisit();

  React.useEffect(() => {
    if (socket !== undefined) {
      console.log('Socket present');
      // only send if ready
      if (status === 'online') {
        console.log('Socket readyState');
        const sub = onSnapshotUpdate(provider, msg => {
          socket.send(JSON.stringify(msg));
        });

        return () => sub.unsubscribe();
      }
    }
  }, [socket, status, provider]);

  const stock = useStock(Emr);
  const appointments = useAppointments(Emr);
  const report = useEMRReport(Emr);

  return (
    <>
      <ConnectionStatus status={status} retry={retry} />
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
            entry: {
              fullName: provider.user.displayName ?? 'Daktari',
            },
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
              onReportMissedAppointment() {
                navigation.navigate('ctc.report-missed-appointments');
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
          name="ctc.view-investigation"
          component={withFlowContext(
            ViewInvestigationScreen<ctc.InvestigationRequest>,
            {
              actions: ({navigation}) => ({
                async fetchInvestigationResults(
                  investigationId,
                  authorizingRequest,
                ) {
                  const invRes = await query<ctc.InvestigationResult>(
                    Emr.collection('investigation-results'),
                    {
                      where: item =>
                        item.authorizingRequest.id === investigationId,
                    },
                  );

                  return invRes.toArray().map(f => {
                    return {
                      id: f.id,
                      identifier: authorizingRequest.data.investigationId,
                      shape: authorizingRequest.data.obj,
                      value: f.observation.data,
                      createdAt: date(f.createdAt),
                    };
                  });
                  // return (
                  //   [
                  //     'urinalysis',
                  //     'dried-blood-spot-dbs-test',
                  //     'cd-4-count',
                  //   ] as Investigation[]
                  // ).map(f => ({
                  //   id: f,
                  //   identifier: f,
                  //   shape: Investigation.fromKey(f),
                  //   value: null,
                  //   createdAt: new Date(),
                  // }));
                  //.toArray();
                },
                async saveResult(results, authorizingRequest) {
                  let invResult: ctc.InvestigationResult | null = null;
                  // save the investigation result
                  if (results.id) {
                    // editing existing one
                    invResult = InvestigationResult<ctc.InvestigationResult>({
                      id: results.id,
                      authorizingRequest,
                      createdAt: utcDateString(results.createdAt),
                      observation: Observation({
                        data: results.value,
                        reason: 'Updated!',
                      }),
                      shape: authorizingRequest.data.obj,
                      lastUpdatedAt: utcDateString(),
                    });
                  } else {
                    invResult = InvestigationResult<ctc.InvestigationResult>({
                      id: `inv-res:${uuid.v4()}`,
                      authorizingRequest,
                      observation: Observation({
                        data: results.value,
                        reason: 'Created',
                      }),
                      shape: authorizingRequest.data.obj,
                      lastUpdatedAt: utcDateString(),
                    });
                  }

                  console.log({results, authorizingRequest});
                  if (invResult === null) {
                    ToastAndroid.show(
                      'Unable to create the investigation results!',
                      ToastAndroid.LONG,
                    );
                    return;
                  }

                  // save the investigation result
                  executeChain([
                    // executor.investigationResult(({add}) =>
                    //   add(invResult as ctc.InvestigationResult),
                    // ),
                    () =>
                      ToastAndroid.show(
                        'Investigation Result Updated!',
                        ToastAndroid.LONG,
                      ),
                    () => console.log('Done!'),
                    navigation.goBack,
                  ]);
                },
              }),
            },
          )}
        />
        <Stack.Screen
          name="ctc.report-missed-appointments"
          component={withFlowContext(ReportMissedAppointmentScreen, {
            actions: ({navigation}) => ({
              async checkIfPatientExists(patientId) {
                const s = await query(Emr.collection('patients'), {
                  where: item => item.id === patientId,
                });

                return s.count() > 0;
              },
              async onSubmitReport({
                patientId,
                appointmentDate,
                missedDate,
                sex,
                dateOfBirth,
              }) {
                // get patient
                const patients = await query(Emr.collection('patients'), {
                  where: item => item.id === patientId,
                });

                // console.log('-> something!!');
                let patient;

                if (patients.count() > 0) {
                  // patient exists
                  patient = patients.get(0);
                } else {
                  // patient doesnt exist,
                  if (sex === undefined || dateOfBirth === undefined) {
                    ToastAndroid.show(
                      'Missing necessary info for patient registration',
                      ToastAndroid.LONG,
                    );
                    return;
                  }

                  // quickly create new patient

                  const newPatient = Patient<CTC.Patient>({
                    id: patientId,
                    sex: sex,
                    birthDate: dateOfBirth,
                  });
                  await setDoc(
                    doc(Emr.collection('patients'), patientId),
                    newPatient,
                  );
                  patient = newPatient;
                }

                console.log({patient});

                if (patient === undefined) {
                  ToastAndroid.show(
                    'Patient information missing, Try again later',
                    ToastAndroid.LONG,
                  );
                  return;
                }

                console.log('Creating report...');

                const reportId = uuid.v4() as string;
                // ...
                // create report
                await setDoc(
                  doc(Emr.collection('reports'), reportId),
                  Report<CTC.Report.MissedAppointment>({
                    id: reportId,
                    reportCode: 'missed',
                    code: 'appointment-report',
                    subject: reference(patient),
                    reporter: reference(doctor),
                    result: {
                      missedDate: convertDMYToDate(missedDate).toUTCString(),
                      reason: null,
                    },
                  }),
                );
                console.log('Creating appointment request...');

                // create appointment
                const appointmentId = uuid.v4() as string;
                await setDoc(
                  doc(Emr.collection('appointment-requests'), appointmentId),
                  AppointmentRequest<CTC.AppointmentRequest>({
                    appointmentDate:
                      convertDMYToDate(appointmentDate).toUTCString(),
                    id: appointmentId,
                    participants: [reference(patient), reference(doctor)],
                    reason: 'Previously missed appointment',
                  }),
                );

                console.log('Creating Done...');
                ToastAndroid.show(
                  'Completed creating missed appointment request',
                  ToastAndroid.LONG,
                );
                navigation.goBack();
              },
            }),
          })}
        />
        <Stack.Screen
          name="ctc.view-appointments"
          component={withFlowContext(ViewAppointmentsScreen, {
            entry: appointments,
            actions: ({navigation}) => ({}),
          })}
        />
        <Stack.Screen
          name="ctc.medication-map"
          component={withFlowContext(MedicationMapScreen, {
            entry: {
              organization,
            },
            actions: ({navigation}) => ({
              async fetchPublicStock() {
                const d = await queryCollection(Emr.collection('publicStock'));
                return d;
              },
              onGoToUpdateStock() {
                navigation.navigate('ctc.medication-stock');
              },
            }),
          })}
        />
        {/* 
        <Stack.Screen
          name="ctc.medication-stock-dashboard"
          component={withFlowContext(MedicationStockDashboardScreen, {
            actions: ({navigation}) => ({
              onGoToManageStock() {
                navigation.navigate('ctc.medication-stock');
              },
              onSeeOtherMedications() {
                navigation.navigate('ctc.medication-map');
              },
              // onGoToQuickIndications() {
              //   navigation.navigate('ctc.medication-stock-simple');
              // },
            }),
          })}
        /> */}
        <Stack.Screen
          name="ctc.report-summary"
          component={withFlowContext(ReportSummaryScreen, {
            entry: report,
          })}
        />
        <Stack.Screen
          name="ctc.medication-visit"
          component={withFlowContext(
            MedicationVisit<CTC.Patient, CTC.Visit, CTC.Organization>,
            {
              actions: ({navigation}) => ({
                async fetchMedications() {
                  return stock.medications?.toArray() ?? [];
                },
                async fetchAppointments(patientId: string) {
                  const appts = appointments.appointments
                    .filter(d => d.type === 'not-responded')
                    .filter(
                      d =>
                        d.participants
                          .filter(
                            x =>
                              x.resourceType === 'Reference' &&
                              x.resourceReferenced === 'Patient',
                          )
                          .findIndex(x => x.id === patientId) > -1,
                    );

                  return appts;
                },
                async complete(data, patient, organization, refVisit) {
                  if (refVisit === null) {
                    // creating new visit
                    const {
                      visit,
                      appointmentResponse,
                      appointmentRequest,
                      medicationRequests,
                      investigationRequests,
                    } = ctc.createDataForSimpleVisit(
                      () => uuid.v4() as string,
                      patient.id,
                      doctor.id,
                      data,
                    );

                    // TODO: move this to webworker (via webview)
                    // perform storage operations to perform
                    const ops = [
                      // to store visit
                      executor.visit(({add}) => add(visit)),

                      // to store appointment request
                      executor.apptRequest(({add}) => add(appointmentRequest)),

                      // to store the medication requests
                      executor.medicationRequest(({multiAdd}) =>
                        multiAdd(medicationRequests),
                      ),

                      // store the investigation requests
                      executor.investigationRequest(({multiAdd}) =>
                        multiAdd(investigationRequests),
                      ),
                    ];

                    if (appointmentResponse !== null) {
                      // add 'save appointment response' op to the list of ops
                      ops.push(
                        // to store appointment response
                        executor.apptResponse(({add}) =>
                          add(appointmentResponse),
                        ),
                      );
                    }

                    // execute operations in order
                    return executeChain(ops)
                      .then(() => {
                        // indicate success
                        ToastAndroid.show(
                          'Completed recording investigation + prescriptions',
                          ToastAndroid.SHORT,
                        );

                        navigation.goBack();
                      })
                      .catch(err => {
                        console.log(err);
                        ToastAndroid.show(
                          'Failed to properly complete the visit. Try again later.',
                          ToastAndroid.LONG,
                        );
                        Sentry.captureException(err);
                      });
                  }

                  // updating existing visit
                  //  and output information
                  const {
                    updatedVisit,
                    medicationRequests,
                    appointmentRequest,
                    investigationRequests,
                  } = ctc.editDataFromSimpleVisit(
                    () => uuid.v4() as string,
                    patient.id,
                    doctor.id,
                    data,
                    refVisit,
                  );

                  const pendingUpdateOps = [
                    // update visit
                    executor.visit(({set}) =>
                      set([updatedVisit.id, updatedVisit]),
                    ),
                    // set medication requests
                    executor.medicationRequest(({multiSet}) =>
                      multiSet(medicationRequests.map(m => [m.id, m])),
                    ),
                  ];

                  if (appointmentRequest !== null) {
                    pendingUpdateOps.push(
                      executor.apptRequest(({set}) =>
                        set([appointmentRequest.id, appointmentRequest]),
                      ),
                    );
                  }

                  if (investigationRequests !== null) {
                    pendingUpdateOps.push(
                      executor.investigationRequest(({multiSet}) =>
                        multiSet(investigationRequests.map(x => [x.id, x])),
                      ),
                    );
                  }

                  return executeChain(pendingUpdateOps)
                    .then(() => {
                      // indicate success
                      ToastAndroid.show(
                        'Updated ctc visit',
                        ToastAndroid.SHORT,
                      );
                      navigation.goBack();
                    })
                    .catch(err => {
                      console.log(err);
                      ToastAndroid.show(
                        'Failed to properly complete the visit. Try again later.',
                        ToastAndroid.LONG,
                      );
                      Sentry.captureException(err);
                    });
                },
                onDiscard() {
                  navigation.goBack();
                },
              }),
            },
          )}
        />
        <Stack.Screen
          name="ctc.medication-stock"
          component={withFlowContext(MedicationStock, {
            entry: stock,
            actions: ({navigation}) => ({
              async setARVStockItem(_id, [medicationId, data]) {
                console.log(_id, medicationId, data);
                const org =
                  doctor.organization.resourceType === 'Organization'
                    ? reference(doctor.organization)
                    : doctor.organization;

                // assumed new medication
                if (_id === null) {
                  // information for new medication
                  const id = _id ?? (uuid.v4() as string);
                  const conc =
                    data.concentrationValue !== null
                      ? removeWhiteSpace(data.concentrationValue).length === 0
                        ? null
                        : parseInt(data.concentrationValue)
                      : 0;
                  const dosage = data.dosage ?? null;
                  const stock = Stock<CTC.ARVStockRecord>({
                    count: parseInt(data.count ?? '0'),
                    expiresAt: format(
                      convertDMYToDate(data.expiresAt),
                      'yyyy-MM-dd',
                    ),
                    id,
                    medication:
                      data.type === 'single'
                        ? Medication<CTC.SingleARVMedication>({
                            type: 'single',
                            form: data.form,
                            id: `${data.identifier}-${uuid.v4()}`,
                            identifier: data.identifier as ARV.UnitRegimen,
                            text: data.text,
                            category: 'arv-ctc',
                          })
                        : Medication<CTC.ARVMedication>({
                            identifier: _.kebabCase(data.text),
                            id: `${data.identifier}-${uuid.v4()}`,
                            form: data.form,
                            ingredients: data.ingredients.map(identifier =>
                              Ingredient({
                                identifier,
                                text:
                                  ARV.units.fromKey(identifier) ?? identifier,
                              }),
                            ),
                            text: data.text,
                            category: 'arv-ctc',
                            type: (data.type as 'composed') ?? 'composed',
                          }),
                    managingOrganization: org,
                    dosage: dosage,
                    extendedData: {
                      estimatedFor: data.estimatedFor,
                      group: data.group,
                      isLow: false,
                    },
                    concentration: conc
                      ? {
                          amount: conc,
                          units:
                            data.form === 'granules'
                              ? 'mg'
                              : data.form === 'syrup'
                              ? 'cc'
                              : 'tablets',
                        }
                      : null,
                    // set last update
                    lastUpdatedAt: utcDateString(),
                  });

                  await executeChain([executor.stock(({add}) => add(stock))]);
                } else {
                  const s =
                    (
                      await query(Emr.collection('stock'), {
                        where: item => item.id === _id,
                      })
                    ).get(0) ?? null;

                  if (s === null) {
                    // indicate success
                    ToastAndroid.show('Unable to update!', ToastAndroid.SHORT);
                    return;
                  }
                  // get proper medication
                  console.log(data);

                  await updateDoc(doc(Emr.collection('stock'), _id), {
                    lastUpdatedAt: utcDateString(),
                    medication:
                      data.type === 'single'
                        ? Medication<CTC.SingleARVMedication>({
                            id: medicationId,
                            type: 'single',
                            form: data.form,
                            identifier: data.identifier as ARV.UnitRegimen,
                            text: data.text,

                            category: 'arv-ctc',
                          })
                        : Medication<CTC.ARVMedication>({
                            id: medicationId,
                            identifier: _.kebabCase(data.text),
                            form: data.form,
                            ingredients: data.ingredients.map(identifier =>
                              Ingredient({
                                identifier,
                                text:
                                  ARV.units.fromKey(identifier) ?? identifier,
                              }),
                            ),
                            alias: data.text,
                            text: data.text,
                            category: 'arv-ctc',
                            type: (data.type as 'composed') ?? 'composed',
                          }),
                    extendedData: {
                      estimatedFor: data.estimatedFor,
                      group: data.group,
                      isLow: false,
                    },
                    count: parseInt(data.count ?? '0'),

                    expiresAt: format(
                      convertDMYToDate(data.expiresAt),
                      'yyyy-MM-dd',
                    ),
                  });

                  // ...
                }

                // indicate success
                ToastAndroid.show(
                  'Updated stock medication',
                  ToastAndroid.SHORT,
                );
              },
            }),
          })}
        />
        <Stack.Screen
          name="ctc.register-new-patient"
          component={withFlowContext(RegisterNewPatientScreen, {
            entry: {myCtcId: provider.facility.ctcCode},
            actions: ({navigation}) => ({
              onRegisterPatient(patient, investigations, cb) {
                console.log(patient);
                const {
                  patient: newPatient,
                  investigationRequests,
                  adhocVisit,
                } = ctc.registerNewPatient(
                  () => uuid.v4() as string,
                  patient,
                  doctor.id,
                  investigations,
                  organization,
                );

                const ops = [
                  executor.patient(({add}) => add(newPatient)),
                  executor.investigationRequest(({multiAdd}) =>
                    multiAdd(investigationRequests),
                  ),
                ];

                if ((adhocVisit ?? null) !== null) {
                  ops.push(executor.visit(({add}) => add(adhocVisit)));
                }

                executeChain(ops)
                  .then(() => {
                    ToastAndroid.show(
                      'Patient ' + patient.patientId + ' registered !.',
                      ToastAndroid.SHORT,
                    );
                    navigation.goBack();
                  })
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
          name="ctc.patient-dashboard"
          component={withFlowContext(PatientDashboard, {
            actions: ({navigation}) => ({
              getPatientsFromQuery(query) {
                return queryPatientsFromSearch(
                  Emr.collection('patients'),
                  query,
                  patient => {
                    const firstName = (patient.info?.firstName ?? '').trim();
                    const familyName = (patient.info?.familyName ?? '').trim();
                    const fullName = (firstName + ' ' + familyName).trim();
                    return {
                      id: patient.id,
                      name: fullName.length === 0 ? null : fullName,
                      registeredDate: new Date(patient.createdAt),
                      onNewVisit: () => {
                        navigation.navigate('ctc.medication-visit', {
                          patient,
                          organization,
                        });
                      },
                      onViewProfile: () => {
                        navigation.navigate('ctc.view-patient', {
                          patient,
                          organization,
                        });
                      },
                    };
                  },
                );
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
              async nextAppointment(patientId: string) {
                const after = await queryCollection(
                  Emr.collection('appointment-requests'),
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
              async fetchInvestigationRequests(patientId) {
                return (
                  await query(Emr.collection('investigation-requests'), {
                    where: item => item.subject.id === patientId,
                  })
                )
                  .map(ir => ({
                    requestId: ir.id,
                    requestDate: ir.createdAt,
                    text:
                      Investigation.item.fromKey(ir.data.investigationId) ??
                      ir.data.investigationId,
                    onViewInvestigation: () => {
                      console.log('Going to the page with:', {
                        request: ir.id,
                        investigationIdentifier: ir.data.investigationId,
                        investigationName: Investigation.item.fromKey(
                          ir.data.investigationId,
                        ),
                        obj: ir,
                      });
                      navigation.navigate('ctc.view-investigation', {
                        request: {
                          id: ir.id,
                          investigationIdentifier: ir.data.investigationId,
                          investigationName: Investigation.item.fromKey(
                            ir.data.investigationId,
                          ),
                          obj: ir,
                        },
                      });
                    },
                  }))
                  .toArray();
              },
              async fetchVisits(patientId) {
                return (
                  await queryCollection(Emr.collection('visits'), {
                    where: {
                      $and: [
                        item => item.subject.id === patientId,

                        // TODO: include type to represent adhoc visit
                        // this will exclude all adhoc visits
                        item => item.extendedData !== null,
                      ],
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
                        Emr.collection('patients'),
                        {where: item => item.id === patientId},
                      );

                      const patient = patients.get(0) ?? null;

                      if (patient !== null) {
                        navigation.navigate('ctc.medication-visit', {
                          patient,
                          organization,
                          visit: d,
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
          name="ctc.view-visit"
          component={withFlowContext(ViewVisitScreen, {
            actions: ({navigation}) => ({
              onNext() {},
              // Load result from investigation request
              async getInvestigationResult(invRequest) {
                // ...
              },
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
                return (
                  await getDocs(Emr.collection('medication-dispenses'))
                ).map(d => d[1]);
              },
            }),
          })}
        />
        <Stack.Screen
          name="ctc.view-single-medication-request"
          component={withFlowContext(MedicationRequestScreen, {
            actions: ({navigation}) => ({
              async getMedicationDispenses() {
                return (
                  await getDocs(Emr.collection('medication-dispenses'))
                ).map(d => d[1]);
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
                  doc(Emr.collection('medication-dispenses'), dispense.id),
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
                return (
                  await getDocs(Emr.collection('medication-requests'))
                ).map(d => d[1]);
              },

              async getMedicationDispenseFrom(medicationRequest: MedicaReq) {
                const d = List(
                  await getDocs(Emr.collection('medication-dispenses')),
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
                        ? Med.all.fromKey(data.medication)
                        : null,
                    code: data.type ?? 'standard',
                    data:
                      data.type === 'arv'
                        ? {className: data.className, regimen: data.regimen}
                        : {
                            medication: data.medication,
                            text: Med.all.fromKey(data.medication),
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
                  doc(Emr.collection('medication-requests'), request.id),
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
