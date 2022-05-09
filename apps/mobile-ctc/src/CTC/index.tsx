import React from 'react';

import {withFlowContext} from '../@workflows/index';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

import CTCRegisterNewPatientScreen, {
  convertMartial,
} from './screens/RegisterNewPatient';
import CTCPatientsScreen from './screens/ViewPatients';

import InvestigationResultsFormScreen from '../@workflows/screens/InvestigationResultsForm';

import BasicAssessmentScreenGroup from '../@workflows/screen-groups/BasicAssessment';
import HIVAdherenceAssessmentScreen from '../@workflows/screens/HIVAdherenceAssessment';

import CTCPatientIntakeScreenGroup from './screen-groups/CTCPatientIntake';

import DoctorSymptomAssessmentScreen from './screens/DoctorSymptomAssessment';
import AssessmentSummaryScreen from './screens/AssessmentSummary';
import CTCDashboardScreen from './screens/Dashboard';
import PatientVisitScreen from './screens/PatientVisit';
import PatientProfileScreen from './screens/PatientProfile';

// These are only used for the snackbars
import {Portal, Snackbar} from 'react-native-paper';

import {
  cAppointRef,
  cPatientsRef,
  cVisitsRef,
  fetchMissedAppointment,
  fetchPatients,
  searchPatientsFromId,
  fetchUpcomingAppointments,
  getPatient,
  fetchVisitsFromPatientId,
  savePatient,
  fetchMissedAppointmentsFromPatientId,
  fetchAppointmentsFromPatientId,
  getInvestigation,
  cInvsRef,
  dateToAge,
} from './fns';

import {format} from 'date-fns';
import produce from 'immer';

import {crdtBox as crdt, mergeOther as mergeWithRemote, sync} from './storage';
import {nxt} from 'sabertooth-core/lib/hybrid-logical-clock';
import {useWebSocket} from '../app/utils';
import {ToastAndroid} from 'react-native';

import {generateReport} from './misc';
import {Investigation} from '@elsa-health/data-fns/lib';
import {ElsaProvider} from '../provider/backend';

import PushNotification from 'react-native-push-notification';
import {useAsync} from 'react-use';

import {Analytics} from './analytics';
/**
 * Generate Report
 */

const Stack = createNativeStackNavigator();

/**
 * Network Related Code
 */
const wsURL_DEV = 'wss://2bd1-197-250-230-24.ngrok.io/channel/cmrdt';
const wsURL_PROD = 'wss://ctc-edge-server.fly.dev/channel/cmrdt';

const wsURL = __DEV__ ? wsURL_DEV : wsURL_PROD;
// const wsURL = wsURL_PROD;

const pushMessagesOnSocket = (socket: WebSocket) => {
  const crdt_messages = crdt.messages();
  // crdt.resolve();
  socket.send(JSON.stringify(crdt_messages));
};

const pushRecordsAsMessagesOnSocket = <T,>(
  socket: WebSocket,
  collectionId: string,
  data: [string, T][],
) => {
  // HACK: A way around uploading data as CRDT messages
  const pushData = data.map(([id, patient]) => ({
    state: {
      // This is coded knowing about the structure of the data
      op: {
        type: 'update',
        collectionId,
        id,
        partialValue: {},
      },
      result: patient,
    },
    timestamp: nxt(),
  }));

  socket.send(JSON.stringify(pushData));
};

type CurrentVisit = Omit<CTC.Visit, 'dateTime' | 'id'> & {
  appointment?: CTC.Appointment | undefined;
};
export default function CTCFlow({
  provider,
  logout,
}: // fullName,
{
  // fullName: string;
  provider: ElsaProvider;
  logout: () => void;
}) {
  const [message, setMessage] = React.useState<{
    text: string;
    type: 'error' | 'success' | 'default';
  } | null>(null);

  const dismiss = () => {
    setMessage(null);
  };

  const fullName = React.useMemo(
    () => provider.user.displayName || '',
    [provider],
  );

  const {
    socket,
    status: networkStatus,
    retry,
  } = useWebSocket({
    url: wsURL,
    onOpen: socket => {
      // Push messages
      pushMessagesOnSocket(socket);
    },
    onData: crdt_messages => {
      // merge the current CRDT messages with the remote
      mergeWithRemote(crdt_messages);
      // flatten the contents
      crdt.resolve();
      // sync with the storage
      sync();
    },
  });

  const pushMessages = React.useCallback(() => {
    if (socket !== undefined) {
      pushMessagesOnSocket(socket);
    }
  }, [socket]);

  const [currentVisit, set] = React.useState<Partial<CurrentVisit>>({});

  const update = React.useCallback(
    <K extends keyof CurrentVisit>(
      field: K,
      value: ((p: CurrentVisit[K]) => CurrentVisit[K]) | CurrentVisit[K],
      cb?: (s: CurrentVisit) => void,
    ) => {
      set(s => {
        const p = produce(s, df => {
          if (typeof value === 'function') {
            df[field] = value(df[field]);
          } else {
            df[field] = value;
          }

          return df;
        });

        cb && cb(p);
        return p;
      });
    },
    [set],
  );

  return (
    <>
      <Stack.Navigator
        screenOptions={{headerShown: false}}
        // initialRouteName={__DEV__ ? 'ctc.patients' : undefined}
      >
        <Stack.Screen
          name="ctc.dashboard"
          component={withFlowContext(CTCDashboardScreen, {
            entry: {
              fullName,
              networkStatus,
              myCtcCode: provider.facility.ctcCode,
            },
            actions: ({navigation}) => ({
              onLogout: () => {
                logout();
                console.warn('Logging out happended');
              },
              onTestNotification: () => {
                Analytics.logEvent('testEvent', {name: 'Testing Event'}).then(
                  () => {
                    PushNotification.localNotification({
                      channelId: 'testing-channel',
                      message: 'This is a test. We believe in you!',
                    });
                  },
                );
              },
              generateReport,
              onRetrySyncServer: retry,
              syncPushAllData: async () => {
                if (socket !== undefined) {
                  console.log('Pushing to the edge');
                  // Syncronize
                  pushRecordsAsMessagesOnSocket(
                    socket,
                    'patients',
                    await cPatientsRef.queryMultiple(),
                  );
                  pushRecordsAsMessagesOnSocket(
                    socket,
                    'visits',
                    await cVisitsRef.queryMultiple(),
                  );
                  pushRecordsAsMessagesOnSocket(
                    socket,
                    'appointments',
                    await cAppointRef.queryMultiple(),
                  );
                }
              },
              loadPatients: async () => [],
              searchPatientsById: async (partialId: string) => {
                return await searchPatientsFromId(partialId);
              },
              onAttendPatient: appointment => {
                getPatient(appointment.patientId).then(patient => {
                  if (patient === null) {
                    setMessage({
                      text: 'Patient record is missing. Unable to start appointment',
                      type: 'success',
                    });
                  } else {
                    navigation.navigate('ctc.patient_visit_flow', {
                      patient,
                      appointment,
                    });
                  }
                });
              },
              getRecentMissedAppointments: async () =>
                (await fetchMissedAppointment()).slice(0, 3),
              getRecentUpcomingAppointments: async () =>
                (await fetchUpcomingAppointments()).slice(0, 3),
              onRegisterPatientWithId: patientId => {
                navigation.navigate('ctc.register_patient', {patientId});
              },
              onNewPatientVisit: patient => {
                navigation.navigate('ctc.patient_intake', {patient});
              },
              onViewPatientProfile: patient => {
                navigation.navigate('ctc.patient_profile', {patient});
              },
              onNewPatient: () => {
                navigation.navigate('ctc.register_patient');
              },
              onPatientList: () => {
                navigation.navigate('ctc.patients');
              },
            }),
          })}
        />
        <Stack.Screen
          name="ctc.register_patient"
          component={withFlowContext(CTCRegisterNewPatientScreen, {
            actions: ({navigation}) => ({
              onRegisterPatient: pf => {
                // TODO: This should be a conditional navigation. Depends on where they came from
                // console.log(pf);
                const {
                  dateOfBirth,
                  dateOfTest,
                  dateStartedARVs,
                  patientId = '',
                  ...other
                } = pf;
                const patient = produce(
                  {
                    dateOfBirth: format(dateOfBirth, 'yyyy-MM-dd'),
                    firstName: other.firstName,
                    lastName: other.familyName,
                    // facilityId: other.facilityId, // Facility ID retrieved isn't proper (extract from patient Id)
                    phoneNumber: other.phoneNumber,
                    district: other.resident,
                    maritalStatus: convertMartial(other.maritalStatus),
                    hasPatientOnARVs: other.hasPatientOnARVs,
                    hasPositiveTest: other.hasPositiveTest,
                    hasTreatmentSupport: other.hasTreatmentSupport,
                    registeredDate: new Date().toUTCString(),
                    sex: other.sex,
                  } as CTC.Patient,
                  df => {
                    // positives
                    if (df.hasPositiveTest && dateOfTest !== undefined) {
                      df.dateOfHIVPositive = format(dateOfTest, 'yyyy-MM-dd');
                    }

                    // ARVs
                    if (df.hasPatientOnARVs && dateStartedARVs !== undefined) {
                      df.dateStartedARVs = format(
                        dateStartedARVs,
                        'yyyy-MM-dd',
                      );
                    }

                    // type of support
                    if (
                      df.typeOfSupport &&
                      other?.typeOfSupport !== undefined
                    ) {
                      df.typeOfSupport = other.typeOfSupport;
                    }

                    return df;
                  },
                );

                const patientId_ =
                  patientId?.trim().length > 0 ? patientId : undefined;

                if (patientId_ !== undefined) {
                  savePatient(patient, patientId_)
                    .then(id => {
                      setMessage({
                        text: `Registered patient / ${id}`,
                        type: 'success',
                      });
                    })
                    .then(() => pushMessages())
                    .then(() => {
                      navigation.navigate('ctc.patients');
                    });
                } else {
                  ToastAndroid.show('Patient ID missing!', ToastAndroid.LONG);
                }
              },
            }),
          })}
        />
        <Stack.Screen
          name="ctc.patients"
          component={withFlowContext(CTCPatientsScreen, {
            actions: ({navigation}) => ({
              onNewPatient: () => navigation.navigate('ctc.register_patient'),
              onSyncPushPatientList: patients => {
                // Send patients data to server
                if (socket !== undefined) {
                  pushRecordsAsMessagesOnSocket(
                    socket,
                    'patients',
                    patients.map(({id, ...patients}) => [id, patients]),
                  );
                }
              },
              onViewPatientProfile: patient => {
                navigation.navigate('ctc.patient_profile', {patient});
              },
              getPatients: async () => await fetchPatients(),
              searchPatientsById: async (partialId: string) => {
                return await searchPatientsFromId(partialId);
              },
              onNewPatientVisit: patient => {
                navigation.navigate('ctc.patient_intake', {patient});
              },
              onDashboard: () => {
                navigation.navigate('ctc.dashboard');
              },
            }),
          })}
        />

        {/* <Stack.Screen
          name="ctc.patient_intake"
          component={withFlowContext(VisitFlowScreenGroup, {
            actions: ({navigation}) => ({
              onDismiss: () => console.log('Cancel Visit'),
              onConclude: async final => {
                // console.log('Something');
                // try {
                //   // NEXT: To clean
                //   const {appointment, assessmentSummary} = final;
                //   if (assessmentSummary !== undefined) {
                //     const appointmentDate =
                //       assessmentSummary.summary?.appointmentDate?.toString();
                //     if (appointmentDate) {
                //       const visitId = await cVisitsRef.addDoc({
                //         ...final,
                //         investigations: assessmentSummary.investigations.map(
                //           inv => {
                //             return {
                //               obj: Investigation.fromKey(inv),
                //               investigationId: inv,
                //               result: undefined,
                //             };
                //           },
                //         ),
                //         dateTime: new Date(),
                //       });
                //       const date = new Date(appointmentDate).toUTCString();
                //       let fulfilledAppointmentId = null;
                //       if (
                //         appointment?.id !== null &&
                //         appointment?.id !== undefined
                //       ) {
                //         cAppointRef.document(appointment.id).update({
                //           visitIdFullfilled: visitId,
                //           fulfilledDate: new Date().toUTCString(),
                //         });
                //         fulfilledAppointmentId = appointment.id;
                //       }
                //       const appointmentId = await cAppointRef.addDoc({
                //         patientId: currentVisit.patientId,
                //         visitIdCreated: visitId,
                //         date,
                //       });
                //       await cVisitsRef
                //         .document(visitId)
                //         .update(
                //           fulfilledAppointmentId === null
                //             ? {appointmentId, fulfilledAppointmentId}
                //             : {appointmentId},
                //         );
                //       setMessage({
                //         text: `Visit complete! Next appointment set for ${date}`,
                //         type: 'success',
                //       });
                //       pushMessages();
                //       navigation.navigate('ctc.dashboard');
                //     } else {
                //       console.warn(
                //         'THERE IS NO APPOINTMENT DATE',
                //         appointmentDate,
                //       );
                //     }
                //   }
                // } catch (err) {
                //   console.log('ERROR:', err);
                //   setMessage({
                //     text: 'Unable to conclude assessment',
                //     type: 'error',
                //   });
                // }
              },
            }),
          })}
        /> */}
        <Stack.Screen
          name="ctc.patient_intake"
          component={withFlowContext(CTCPatientIntakeScreenGroup, {
            actions: ({navigation}) => ({
              onNext: (patientForm, patient, isAssess, appointment) => {
                console.log(patientForm);
                // TODO: This should be a conditional navigation. Depends on where they came from
                // navigation.navigate('ctc.adherence_assessment');
                // updateCurrentVisit('intake')(patientForm);
                // updateCurrentVisit('patientId')(patient.id);
                // updateCurrentVisit('appointment')(appointment);
                // updateCurrentVisit('patient')({
                //   sex: patient.sex,
                //   age: dateToAge(new Date(patient.dateOfBirth)),
                // });

                set(s =>
                  produce(s, df => {
                    df.intake = patientForm;
                    df.patientId = patient.id;
                    df.appointment = appointment;
                    df.patient = {
                      sex: patient.sex,
                      age: dateToAge(new Date(patient.dateOfBirth)),
                    };
                  }),
                );

                if (isAssess) {
                  navigation.navigate('ctc.patient_assessment');
                } else {
                  navigation.navigate('ctc.adherence_assessment');
                }
              },
            }),
          })}
        />
        <Stack.Screen
          name="ctc.patient_assessment"
          component={withFlowContext(BasicAssessmentScreenGroup, {
            entry: {
              patient: currentVisit.patient,
            },
            actions: ({navigation}) => ({
              onCancel: () => {
                navigation.goBack();
              },
              onCompleteAssessment: (data, elsa_differentials) => {
                update(
                  'symptomAssessment',
                  {
                    data,
                    elsa_differentials,
                  },
                  () => {
                    // console.log({data, elsa_differentials});
                    navigation.navigate('ctc.doctor_symptom_assessment');
                  },
                );
              },
            }),
          })}
        />
        <Stack.Screen
          name="ctc.doctor_symptom_assessment"
          component={withFlowContext(DoctorSymptomAssessmentScreen, {
            entry: {
              value: currentVisit.symptomAssessment?.doctorDiagnosis,
              patient: currentVisit.patient,
            },
            actions: ({navigation}) => ({
              onMakeDesicion: conditions => {
                set(s => {
                  const ns = produce(s, df => {
                    if (df['symptomAssessment'] !== undefined) {
                      df['symptomAssessment']['doctorDiagnosis'] = conditions;
                    }
                  });

                  navigation.navigate('ctc.adherence_assessment');
                  return ns;
                });
              },
            }),
          })}
        />
        <Stack.Screen
          name="ctc.adherence_assessment"
          component={withFlowContext(HIVAdherenceAssessmentScreen, {
            actions: ({navigation}) => ({
              onCompleteAdherence: adhrence => {
                // console.log({adhrence});
                const {forgottenCount, ...other} = adhrence;
                update(
                  'adherenceAssessment',
                  {
                    ...other,
                    forgottenCount: parseInt(forgottenCount || '0'),
                  },
                  () => {
                    navigation.navigate('ctc.assessment_summary');
                  },
                );
              },
            }),
          })}
        />
        <Stack.Screen
          name="ctc.assessment_summary"
          component={withFlowContext(AssessmentSummaryScreen, {
            entry: {
              value: {
                summary: {
                  condition:
                    currentVisit.symptomAssessment?.elsa_differentials?.[0]?.id,
                  conditionValuePairs: (
                    currentVisit.symptomAssessment?.elsa_differentials || []
                  )
                    .map(cx => [
                      cx.id,
                      // Round to 2 d.p.
                      Math.round((cx.p + Number.EPSILON) * 100) / 100,
                    ])
                    .slice(0, 3),
                },
              },
              // [
              //   ['cryptococcal-meningitis', 0.8],
              //   ['asthma', 0.5],
              //   ['toxoplasmosis', 0.2],
              // ],
            },
            actions: ({navigation}) => ({
              onCancel: () => {
                ToastAndroid.show('Cancelled', ToastAndroid.LONG);
              },
              onConclude: data => {
                // console.log('Conclude App', data);
                update('assessmentSummary', data, async final => {
                  try {
                    const {appointment, assessmentSummary} = final;
                    const appointmentDate =
                      assessmentSummary.summary?.appointmentDate?.toString();

                    if (appointmentDate) {
                      const visitId = await cVisitsRef.addDoc({
                        ...final,
                        investigations: (
                          assessmentSummary.investigations || []
                        ).map(inv => {
                          return {
                            obj: Investigation.fromKey(inv),
                            investigationId: inv,
                            result: undefined,
                          };
                        }),
                        dateTime: new Date(),
                      });

                      const date = new Date(appointmentDate).toUTCString();

                      let fulfilledAppointmentId = null;
                      if (
                        appointment?.id !== null &&
                        appointment?.id !== undefined
                      ) {
                        cAppointRef.document(appointment.id).update({
                          visitIdFullfilled: visitId,
                          fulfilledDate: new Date().toUTCString(),
                        });

                        fulfilledAppointmentId = appointment.id;
                      }

                      const appointmentId = await cAppointRef.addDoc({
                        patientId: currentVisit.patientId,
                        visitIdCreated: visitId,
                        date,
                      });

                      await cVisitsRef
                        .document(visitId)
                        .update(
                          fulfilledAppointmentId === null
                            ? {appointmentId, fulfilledAppointmentId}
                            : {appointmentId},
                        );

                      setMessage({
                        text: `Visit complete! Next appointment set for ${date}`,
                        type: 'success',
                      });
                      pushMessages();
                      navigation.navigate('ctc.dashboard');
                    } else {
                      console.warn(
                        'THERE IS NO APPOINTMENT DATE',
                        appointmentDate,
                      );
                    }
                  } catch (err) {
                    console.log('ERROR:', err);
                    setMessage({
                      text: 'Unable to conclude assessment',
                      type: 'error',
                    });
                  }
                });
              },
            }),
          })}
        />
        <Stack.Screen
          name="ctc.patient_profile"
          component={withFlowContext(PatientProfileScreen, {
            actions: ({navigation}) => ({
              onNewPatientVisit: patient => {
                navigation.navigate('ctc.patient_visit_flow', {patient});
              },
              onViewPatientVisit: visit => {
                navigation.navigate('ctc.view_patient_visit', {visit});
              },
              getPatientAppointments: fetchAppointmentsFromPatientId,
              getPatientMissedAppointments:
                fetchMissedAppointmentsFromPatientId,
              getPatientVisits: fetchVisitsFromPatientId,
            }),
          })}
        />
        <Stack.Screen
          name="ctc.view_patient_visit"
          component={withFlowContext(PatientVisitScreen, {
            actions: ({navigation}) => ({
              // onUpdateInvestigationSnapshot: (id, cb) => {
              //   console.log({id});
              //   cInvsRef.document(id).observe('set', data => {
              //     cb(data);
              //   });
              //   cInvsRef.document(id).observe('update', data => {
              //     cb(data);
              //   });
              // },
              onViewUpdateInvestigation: (id, data, err) => {
                ToastAndroid.show(
                  `View Investigation: ${id}`,
                  ToastAndroid.LONG,
                );
                navigation.navigate('ctc.view_investigation', {
                  investigation: {
                    id,
                    ...data,
                  },
                  result: data.result,
                });
              },
              getInvestigation,
            }),
          })}
        />
        <Stack.Screen
          name="ctc.view_investigation"
          component={withFlowContext(InvestigationResultsFormScreen, {
            actions: ({navigation}) => ({
              onClose: () => {},
              onUpdateInvestigation: (id, data) => {
                // console.log({id, data});

                // set the document
                cInvsRef
                  .doc(id)
                  .set(data)
                  .then(() => {
                    ToastAndroid.show(
                      'Investigation updated',
                      ToastAndroid.SHORT,
                    );
                    navigation.goBack();
                  })
                  .catch(() => {
                    ToastAndroid.show(
                      'Unable to update investigation',
                      ToastAndroid.LONG,
                    );
                  });
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
