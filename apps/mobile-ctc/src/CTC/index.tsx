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

import {format} from 'date-fns';
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

  return (
    <>
      <Stack.Navigator
        screenOptions={{headerShown: false}}
        // initialRouteName="ctc.patients"
      >
        <Stack.Screen
          name="ctc.dashboard"
          component={withFlowContext(ApVisDahboardScreen, {
            entry: {
              fullName,
            },
            actions: ({navigation}) => ({
              loadPatients: async () => [],
              searchPatientsById: async (partialId: string) => {
                console.log('Searching:...', partialId);
                return await fetchPatientsFromId(partialId);
              },
              onRegisterPatientWithId: patientId => {
                navigation.navigate('ctc.register_patient', {patientId});
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
