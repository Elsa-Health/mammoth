import React from 'react';

import {withFlowContext} from '../@workflows/index';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

import ApVisDahboardScreen from '../@workflows/screens/ApVisDashboard';
import CTCRegisterNewPatientScreen, {
  convertMartial,
} from '../@workflows/screens/CTCRegisterNewPatient';
import HIVAdherenceAssessmentScreen from '../@workflows/screens/HIVAdherenceAssessment';
import CTCPatientsScreen from '../@workflows/screens/ViewPatients';

import CTCPatientIntakeScreenGroup from '../@workflows/screen-groups/CTCPatientIntake';
import BasicAssessmentScreenGroup from '../@workflows/screen-groups/BasicAssessment';
import CTCAssessmentSummaryScreenGroup from '../@workflows/screen-groups/CTCAssessmentSummary';

import AssessmentSummary from './screens/AssessmentSummary';
import PatientVisitScreen from './screens/PatientVisit';
import PatientProfileScreen from './screens/PatientProfile';

// These are only used for the snackbars
import {Portal, Snackbar} from 'react-native-paper';

import {
  cAppointRef,
  cPatientsRef,
  cVisitsRef,
  dateToAge,
  fetchMissedAppointment,
  fetchPatients,
  searchPatientsFromId,
  fetchUpcomingAppointments,
  getPatient,
  fetchVisitsFromPatientId,
  savePatient,
  fetchMissedAppointmentsFromPatientId,
  fetchAppointmentsFromPatientId,
  fetchAppointments,
  fetchVisits,
} from './fns';

import {format} from 'date-fns';
import produce from 'immer';

import {crdtBox as crdt, mergeOther as mergeWithRemote, sync} from './storage';
import {nxt} from 'sabertooth-core/lib/hybrid-logical-clock';
import {useWebSocket} from '../app/utils';
import {ToastAndroid} from 'react-native';

import {generateReport} from './misc';

/**
 * Generate Report
 */

const Stack = createNativeStackNavigator();

/**
 * Network Related Code
 */
const wsURL_DEV = 'wss://2819-197-250-225-79.ngrok.io/channel/cmrdt';
const wsURL_PROD = 'wss://ctc-bounce-server.herokuapp.com/channel/cmrdt';

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
export default function CTCFlow({fullName}: {fullName: string}) {
  const [message, setMessage] = React.useState<{
    text: string;
    type: 'error' | 'success' | 'default';
  } | null>(null);

  const dismiss = () => {
    setMessage(null);
  };

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

  const [currentVisit, setCurrentVisit] = React.useState<Partial<CurrentVisit>>(
    {},
  );

  const updateCurrentVisit = React.useCallback(
    <K extends keyof CurrentVisit>(field: K, cb?: (s: CurrentVisit) => void) =>
      (value: ((p: CurrentVisit[K]) => CurrentVisit[K]) | CurrentVisit[K]) => {
        setCurrentVisit(s => {
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
    [setCurrentVisit],
  );

  return (
    <>
      <Stack.Navigator
        screenOptions={{headerShown: false}}
        // initialRouteName={__DEV__ ? 'ctc.assessment_summary' : undefined}
      >
        <Stack.Screen
          name="ctc.dashboard"
          component={withFlowContext(ApVisDahboardScreen, {
            entry: {
              fullName,
              networkStatus,
            },
            actions: ({navigation}) => ({
              generateReport,
              onRetrySyncServer: retry,
              syncPushAllData: async () => {
                if (socket !== undefined) {
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
                    const message = 'Unable to start a appointment';
                    setMessage({
                      text: message,
                      type: 'success',
                    });
                  } else {
                    navigation.navigate('ctc.patient_intake', {
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
                navigation.navigate('ctc.patientProfile', {patient});
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
        <Stack.Screen
          name="ctc.patient_intake"
          component={withFlowContext(CTCPatientIntakeScreenGroup, {
            actions: ({navigation}) => ({
              onNext: (patientForm, patient, isAssess, appointment) => {
                // console.log(patientForm);
                // TODO: This should be a conditional navigation. Depends on where they came from
                // navigation.navigate('ctc.adherence_assessment');
                updateCurrentVisit('intake')(patientForm);
                updateCurrentVisit('patientId')(patient.id);
                updateCurrentVisit('appointment')(appointment);
                updateCurrentVisit('patient')({
                  sex: patient.sex,
                  age: dateToAge(new Date(patient.dateOfBirth)),
                });

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
                navigation.navigate('ctc.dashboard');
              },
              onCompleteAssessment: (data, elsa_differentials) => {
                updateCurrentVisit('symptomAssessment', () => {
                  // console.log({data, elsa_differentials});
                  navigation.navigate('ctc.adherence_assessment');
                })({
                  data,
                  elsa_differentials,
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
                const {forgottenCount, ...other} = adhrence;
                updateCurrentVisit('adherenceAssessment', () => {
                  navigation.navigate('ctc.assessment_summary');
                })({
                  ...other,
                  forgottenCount: parseInt(forgottenCount || '0'),
                });
              },
            }),
          })}
        />
        <Stack.Screen
          name="ctc.assessment_summary"
          component={withFlowContext(CTCAssessmentSummaryScreenGroup, {
            entry: {
              condition:
                currentVisit.symptomAssessment?.elsa_differentials?.[0].id,
              conditionValuePairs: (
                currentVisit.symptomAssessment?.elsa_differentials || []
              )
                .map(cx => [
                  cx.id,
                  // Round to 2 d.p.
                  Math.round((cx.p + Number.EPSILON) * 100) / 100,
                ])
                .slice(0, 3),
              // [
              //   ['cryptococcal-meningitis', 0.8],
              //   ['asthma', 0.5],
              //   ['toxoplasmosis', 0.2],
              // ],
            },
            actions: ({navigation}) => ({
              onConclude: data => {
                // console.log('Conclude App', data);
                updateCurrentVisit('assessmentSummary', async final => {
                  try {
                    const {appointment} = final;
                    const appointmentDate =
                      final.assessmentSummary.summary?.appointmentDate?.toString();
                    if (appointmentDate) {
                      const visitId = await cVisitsRef.addDoc({
                        ...final,
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
                })(data);
              },
            }),
          })}
        />
        <Stack.Screen
          name="ctc.patientProfile"
          component={withFlowContext(PatientProfileScreen, {
            actions: ({navigation}) => ({
              onNewPatientVisit: patient => {
                navigation.navigate('ctc.patient_intake', {patient});
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
          component={withFlowContext(PatientVisitScreen)}
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
