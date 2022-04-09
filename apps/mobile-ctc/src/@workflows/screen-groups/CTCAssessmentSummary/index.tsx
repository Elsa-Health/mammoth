import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {withFlowContext, WorkflowScreen} from '../..';
import {CTC, Condition, Medication} from '@elsa-health/data-fns';

import CTCNextStepsScreen from '../../screens/CTCNextSteps';
import CTCAssessmentSummaryScreen, {
  CTCAssessmentData,
} from '../../screens/CTCAssessmentSummary';
import OrderInvestigationScreen from '../../screens/OrderInvestigation';
import HIVDispenseMedicationScreen, {
  HIVDispenseMedication,
} from '../../screens/HIVDispenseMedication';
import produce from 'immer';

const Stack = createNativeStackNavigator();

export type AssessmentSummaryData = {
  summary: CTCAssessmentData;
  nextSteps: CTC.NextStepsObject;
  riskNonAdherence: number;
  investigations: CTC.Test[];
  medicationInfo: HIVDispenseMedication<Medication.All>;
};

const getInvestigationText = (inv: CTC.Test) => CTC.test.fromKey(inv);
const getInvestigationList = () =>
  CTC.test.pairs().map(([k, v]) => ({id: k, name: v}));
export default function CTCAssessmentSummaryScreenGroup({
  entry,
  actions: $,
}: WorkflowScreen<
  AssessmentSummaryData['summary'],
  {
    onConclude: (data: AssessmentSummaryData) => void;
  }
>) {
  const [data, set] = React.useState<AssessmentSummaryData>({summary: entry});
  //   const [nextSteps, setNextSteps] = React.useState<AssessmenNextSteps>({});

  const changeValue = React.useCallback(
    <K extends keyof AssessmentSummaryData>(field: K) =>
      (
        value: AssessmentSummaryData[K],
        cb?: (state: AssessmentSummaryData) => void,
      ) => {
        set(s => {
          const v = produce(s, df => {
            df[field] = value;
          });

          cb && cb(v);
          return v;
        });
      },
    [set],
  );

  // const reset = () => {
  //   set({});
  // };

  const saveAssessData = (
    data: CTCAssessmentData,
    cb?: (state: AssessmentSummaryData) => void,
  ) => {
    changeValue('summary')(data);
    changeValue('nextSteps')(CTC.nextSteps.fromKey(data.condition) || {}, cb);
  };
  return (
    <Stack.Navigator screenOptions={{headerShown: false}}>
      <Stack.Screen
        name="sub.ctc.asessment_summary"
        component={withFlowContext(CTCAssessmentSummaryScreen, {
          entry: {
            value: data.summary,
          },
          actions: ({navigation}) => ({
            checkHasNextSteps: condition => {
              return CTC.nextSteps.keys().includes(condition);
            },
            onConclude: data_ => {
              saveAssessData(data_, $.onConclude);
              // reset();
            },
            onNextSteps: data => {
              console.log('Next Steps');
              saveAssessData(data);
              navigation.navigate('sub.ctc.next_steps');
            },
          }),
        })}
      />
      <Stack.Screen
        name="sub.ctc.next_steps"
        component={withFlowContext(CTCNextStepsScreen, {
          entry: {
            nextSteps: data.nextSteps,
          },
          actions: ({navigation}) => ({
            onDispenseMedication: (treatments, arvStatus) => {
              navigation.navigate('sub.ctc.dispensed_medication', {
                recommended: {
                  treatments,
                  status: arvStatus,
                },
              });
            },
            onOrderInvestigation: recommendedTests => {
              navigation.navigate('sub.ctc.order_investigation', {
                recommendedTests,
              });
            },
            onGoBack: () => {
              navigation.goBack();
            },
          }),
        })}
      />
      <Stack.Screen
        name="sub.ctc.order_investigation"
        component={withFlowContext(OrderInvestigationScreen, {
          entry: {
            value: data.investigations,
          },
          actions: ({navigation}) => ({
            getInvestigationText,
            getInvestigationList,
            getConditionText: condition =>
              Condition.fromKey(condition) || condition,
            onGoBack: () => {
              navigation.goBack();
            },
            onOrder: (investigations, err) => {
              console.log('investigations:', investigations);
              // @ts-ignore
              changeValue('investigations')(investigations);
              navigation.goBack();
            },
          }),
        })}
      />
      <Stack.Screen
        name="sub.ctc.dispensed_medication"
        component={withFlowContext(HIVDispenseMedicationScreen, {
          entry: {
            value: data.medicationInfo,
          },
          actions: ({navigation}) => ({
            onGoBack: navigation.goBack,
            onSave: data => {
              // save the data to state
              console.log('medicationInfo:', data);
              changeValue('medicationInfo')(data);
              navigation.goBack();
            },
            getMedicationList: () =>
              Medication.all.pairs().map(([m, v]) => ({id: m, name: v})),
            getMedicationText: Medication.all.fromKey,
          }),
        })}
      />
    </Stack.Navigator>
  );
}
