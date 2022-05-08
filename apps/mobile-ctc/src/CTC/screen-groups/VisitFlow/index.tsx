import React from 'react';

import {createNativeStackNavigator} from '@react-navigation/native-stack';

import {withFlowContext, WorkflowScreen} from '../../../@workflows';
import CTCPatientIntakeScreenGroup from '../CTCPatientIntake';
import produce from 'immer';
import {dateToAge} from '../../fns';
import BasicAssessmentScreenGroup from '../../../@workflows/screen-groups/BasicAssessment';
import DoctorSymptomAssessmentScreen from '../../screens/DoctorSymptomAssessment';
import HIVAdherenceAssessmentScreen from '../../../@workflows/screens/HIVAdherenceAssessment';
import AssessmentSummaryScreen from '../../screens/AssessmentSummary';

export const Stack = createNativeStackNavigator();

type CurrentVisit = Partial<
  Omit<CTC.Visit, 'dateTime' | 'id'> & {
    appointment?: CTC.Appointment | undefined;
  }
>;

type WFS = WorkflowScreen<
  {patient: CTC.Patient},
  {onDismiss: () => void; onConclude: (state: CurrentVisit) => void}
>;
export default function VisitFlowScreenGroup({
  entry: {patient},
  actions: $,
}: WFS) {
  const [state, set] = React.useState<CurrentVisit>({});

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
    [],
  );

  React.useEffect(() => {
    console.log('> [ENTERED]: VisitFlowScreenGroup._Main!');
    return () => console.log('> [EXIT]: VisitFlowScreenGroup._Main');
  }, []);

  return (
    <Stack.Navigator screenOptions={{headerShown: false}}>
      <Stack.Screen
        name="ctc.patient_intake"
        component={withFlowContext(CTCPatientIntakeScreenGroup, {
          entry: {patient},
          actions: ({navigation}) => ({
            onNext: (patientForm, patient, isAssess, appointment) => {
              console.log(patientForm);
              // TODO: This should be a conditional navigation. Depends on where they came from
              // navigation.navigate('ctc.adherence_assessment');
              //   update('intake', patientForm);
              //   update('patientId', patient.id);
              //   update('appointment', appointment);
              //   update('patient', {
              //     sex: patient.sex,
              //     age: dateToAge(new Date(patient.dateOfBirth)),
              //   });

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
            patient: state.patient,
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
            value: state.symptomAssessment?.doctorDiagnosis || [],
          },
          actions: ({navigation}) => ({
            onMakeDesicion: conditions => {
              set(s => {
                const ns = produce(s, df => {
                  df['symptomAssessment']['doctorDiagnosis'] = conditions;
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
                condition: state.symptomAssessment?.elsa_differentials?.[0]?.id,
                conditionValuePairs: (
                  state.symptomAssessment?.elsa_differentials || []
                )
                  .map(cx => [
                    cx.id,
                    // Round to 2 d.p.
                    Math.round((cx.p + Number.EPSILON) * 100) / 100,
                  ])
                  .slice(0, 3),
              },
            },
          },
          actions: ({navigation}) => ({
            onCancel: () => {},
            onConclude: () => {
              // Conclude stuff
              $.onConclude(state);
            },
          }),
        })}
      />
    </Stack.Navigator>
  );
}

// const VisitContext = React.createContext<
//   [CurrentVisit, React.Dispatch<React.SetStateAction<CurrentVisit>>]
// >([{}, () => null]);

// function useVisit(selector = (s: CurrentVisit) => s) {
//   return {
//     state: x,
//     set,
//     update,
//   };
// }

// /**
//  * Wrapping context in the application
//  */
// export default function _Main(opts: WFS) {
//   React.useEffect(() => {
//     console.log('> [ENTERED]: VisitFlowScreenGroup!');
//     () => console.log('> [EXIT]: VisitFlowScreenGroup!');
//   }, []);

//   return <VisitFlowScreenGroup entry={opts.entry} actions={opts.actions} />;
// }
