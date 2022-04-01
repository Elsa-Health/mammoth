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

import {Portal, Snackbar} from 'react-native-paper';

import {
  format,
  differenceInMonths,
  differenceInYears,
  isBefore,
  differenceInDays,
} from 'date-fns';
import produce from 'immer';

import {deviceStorage} from './storage';

const emr = deviceStorage();

const cPatientsRef = emr.collection('patients');
const cVisitsRef = emr.collection('visits');
const cAppointRef = emr.collection('appointments');

export default function CTCApp({fullName}: {fullName: string}) {
  React.useEffect(() => {
    [cPatientsRef, cVisitsRef, cAppointRef].map(collRef =>
      collRef.create({createIfNotExists: true}),
    );
  }, []);

  return <CTCFlow fullName={fullName} />;
}

const Stack = createNativeStackNavigator();

async function getPatient(patientId: string) {
  const doc = await cPatientsRef.queryDoc<Omit<CTC.Patient, 'id'>>({
    $id: patientId,
  });

  if (doc !== null) {
    const {$id, ...other} = doc;
    return {...other, id: patientId};
  }

  return null;
}

type P = Omit<CTC.Patient, 'id'>;
async function savePatient(patient: P, patientId: string | undefined) {
  const id = await cPatientsRef.addDoc<P>(
    patientId !== undefined ? {$id: patientId, ...patient} : patient,
  );
  return id;
}

async function fetchPatientsFromId(patientId: string) {
  const docs = await cPatientsRef.queryDocs<P>({$id: {$text: patientId}});
  return docs.map(({$id, ...other}) => {
    return {...other, id: $id} as CTC.Patient;
  });
}

async function fetchPatients() {
  const docs = await cPatientsRef.queryDocs<P>();
  return docs.map(({$id, ...other}) => {
    return {...other, id: $id} as CTC.Patient;
  });
}

type A = Omit<CTC.Appointment, 'id'>;
async function fetchAppointments() {
  const docs = await cAppointRef.queryDocs<A>();
  return docs.map(({$id, ...other}) => {
    return {...other, id: $id} as CTC.Appointment;
  });
}

async function fetchUpcomingAppointments() {
  return (await fetchAppointments()).filter(appt => {
    return (
      (appt.visitIdFullfilled !== null &&
        appt.visitIdFullfilled !== undefined) ||
      isBefore(new Date(), new Date(appt.date))
    );
  });
}

async function fetchMissedAppointment() {
  return (await fetchAppointments()).filter(appt => {
    const apptDate = new Date(appt.date);
    const nowDate = new Date();
    return (
      !(
        appt.visitIdFullfilled !== null && appt.visitIdFullfilled !== undefined
      ) &&
      isBefore(apptDate, nowDate) &&
      differenceInDays(nowDate, apptDate) - 3
    );
  });
}

function dateToAge(date: Date): Age {
  const now = new Date();
  const years = differenceInYears(now, date);
  const months = differenceInMonths(now, date);
  return {
    years,
    months: months - years * 12,
  };
}

type CurrentVisit = Omit<CTC.Visit, 'dateTime' | 'id'> & {
  appointment?: CTC.Appointment | undefined;
};
function CTCFlow({fullName}: {fullName: string}) {
  const [message, setMessage] = React.useState<{
    text: string;
    type: 'error' | 'success' | 'default';
  } | null>(null);

  const dismiss = () => {
    setMessage(null);
  };

  const [appointments, setAppointments] = React.useState<CTC.Appointment[]>([]);
  const [visits, setVisits] = React.useState<CTC.Visit[]>([]);

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
      <Stack.Navigator screenOptions={{headerShown: false}}>
        <Stack.Screen
          name="ctc.dashboard"
          component={withFlowContext(ApVisDahboardScreen, {
            entry: {
              fullName,
            },
            actions: ({navigation}) => ({
              loadPatients: async () => [],
              searchPatientsById: async (partialId: string) => {
                return await fetchPatientsFromId(partialId);
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
              getMissedAppointments: async () => await fetchMissedAppointment(),
              getUpcomingAppointments: async () =>
                await fetchUpcomingAppointments(),
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
                    phoneNumber: other.phoneNumber,
                    district: other.resident,
                    martialStatus: convertMartial(other.martialStatus),
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
                savePatient(
                  patient,
                  patientId?.trim().length > 0 ? patientId : undefined,
                )
                  .then(id => {
                    setMessage({
                      text: `Registered patient / ${id}`,
                      type: 'success',
                    });
                  })
                  .then(() => {
                    navigation.navigate('ctc.dashboard');
                  });
              },
            }),
          })}
        />
        <Stack.Screen
          name="ctc.patients"
          component={withFlowContext(CTCPatientsScreen, {
            actions: ({navigation}) => ({
              getPatients: async () => await fetchPatients(),
              searchPatientsById: async (partialId: string) => {
                return await fetchPatientsFromId(partialId);
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
              onNext: (patientForm, patient, appointment) => {
                console.log(patientForm);
                // TODO: This should be a conditional navigation. Depends on where they came from
                // navigation.navigate('ctc.adherence_assessment');
                updateCurrentVisit('intake')(patientForm);
                updateCurrentVisit('patientId')(patient.id);
                updateCurrentVisit('appointment')(appointment);
                updateCurrentVisit('patient')({
                  sex: patient.sex,
                  age: dateToAge(new Date(patient.dateOfBirth)),
                });
                navigation.navigate('ctc.patient_assessment');
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
                console.log('Conclude App', data);
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

                      console.log({visitId, appointmentDate});
                      const date = new Date(appointmentDate).toUTCString();

                      let fulfilledAppointmentId = null;
                      if (
                        appointment?.id !== null &&
                        appointment?.id !== undefined
                      ) {
                        cAppointRef.doc(appointment.id).set({
                          visitIdFullfilled: visitId,
                          fulfilledDate: new Date().toUTCString(),
                        });

                        fulfilledAppointmentId = appointment.id;
                      } else {
                        const id = await cAppointRef.addDoc({
                          patientId: currentVisit.patientId,
                          visitIdCreated: visitId,
                          date,
                        });

                        fulfilledAppointmentId = id;
                      }

                      // works like update
                      await cVisitsRef
                        .doc(visitId)
                        .set({fulfilledAppointmentId});

                      setMessage({
                        text: `Visit complete! Next appointment set for ${date}`,
                        type: 'success',
                      });
                      navigation.navigate('ctc.dashboard');
                    } else {
                      console.warn(
                        'THERE IS NO APPOINTMENT DATE',
                        appointmentDate,
                      );
                    }
                  } catch (err) {
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
