import React from 'react';
import {
  Layout,
  Text,
  SectionedSelect,
  Picker,
} from '../../../@libs/elsa-ui/components';
import {ScrollView, useWindowDimensions, View, ViewProps} from 'react-native';

import {useTheme} from '../../../@libs/elsa-ui/theme';
import {WorkflowScreen} from '../../../@workflows';
import {CTC, Condition, Medication} from '@elsa-health/data-fns';
import {BarChart} from 'react-native-chart-kit';

import {Button, Divider, IconButton, TextInput} from 'react-native-paper';
import DateTimePicker from '@react-native-community/datetimepicker';
import {format} from 'date-fns';
import produce from 'immer';

import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

export type HIVDispenseMedication<M extends string> = {
  medications: M[];
  status: CTC.Status | undefined;
  reason?: string | undefined;
};

export type CTCAssessmentData = {
  condition?: Condition | CTC.Condition;
  conditionValuePairs?: [Condition | CTC.Condition, number][];
  riskNonAdherence: number | undefined;
  appointmentDate: Date | undefined;
};

export type AssessmentSummaryData = {
  summary: CTCAssessmentData;
  nextSteps: CTC.NextStepsObject;
  //   riskNonAdherence: number;
  investigations: CTC.Test[];
  medicationInfo: HIVDispenseMedication<Medication.All>;
};
type Disease = Condition | CTC.Condition;

const getMedicationList = () =>
  Medication.all.pairs().map(([m, v]) => ({id: m, name: v}));
const getMedicationText = Medication.all.fromKey;

export default function AssessmentSummaryScreen({
  entry: {value: initialValue},
  actions: $,
}: WorkflowScreen<
  {
    value: Partial<AssessmentSummaryData>;
  },
  {
    onConclude: (data: AssessmentSummaryData) => void;
    checkHasNextSteps: (disease: Disease) => boolean;
  }
>) {
  const {spacing} = useTheme();
  const [state, set] = React.useState(() => {
    const base: AssessmentSummaryData = {
      investigations: [],
      medicationInfo: {
        medications: [],
        status: undefined,
        reason: undefined,
      },
      nextSteps: {
        counselingRecommendations: [],
        tests: [],
        treatments: [],
        status: undefined,
      },
      summary: {
        appointmentDate: undefined,
        riskNonAdherence: 0,
      },
    };

    return produce(base, df => {
      Object.entries(initialValue).forEach(([k, v]) => {
        Object.entries(v).forEach(([vk, vv]) => {
          df[k][vk] = vv;
        });
      });
    });
  });
  const [showApptDate, setShowApptDate] = React.useState(false);

  const data = state.summary;
  const {treatments, status} = state.nextSteps;
  const hasNextSteps = React.useMemo(
    () =>
      data.condition !== undefined
        ? $.checkHasNextSteps(data.condition)
        : false,
    [data, $.checkHasNextSteps],
  );

  const setter =
    <
      K extends keyof AssessmentSummaryData,
      K2 extends keyof AssessmentSummaryData[K],
    >(
      field: K,
      sub: K2,
    ) =>
    (value: AssessmentSummaryData[K][K2]) => {
      set(s =>
        produce(s, df => {
          df[field][sub] = value;
        }),
      );
    };

  return (
    <Layout style={{padding: 0}}>
      <ScrollView contentContainerStyle={{paddingHorizontal: spacing.md}}>
        {/* Disease Summary Section */}
        {data.condition !== undefined &&
          data.conditionValuePairs?.length === 0 && (
            <DiseaseSummarySection
              condition={data.condition}
              values={data.conditionValuePairs}
            />
          )}

        {hasNextSteps && (
          <>
            {/* hasNextSteps  */}
            <Section title="Suggestions" style={{marginVertical: spacing.md}}>
              <Text style={{lineHeight: 20}}>
                Press on the "Next Steps" button to find out what more you can
                do to help the patient
              </Text>
            </Section>
            <Divider />
          </>
        )}

        {/* Risk Non-Adherence */}
        {data.riskNonAdherence !== undefined && (
          <Section
            title="Risk of Non-Adherence"
            style={{marginVertical: spacing.md}}>
            <Text>This shows likelihood of non-adherence</Text>
            <View>
              <Text>
                Risk of Non-adherence:{' '}
                <Text font="bold">
                  {`${(data.riskNonAdherence * 100).toFixed(1)}`}%
                </Text>
              </Text>
            </View>
          </Section>
        )}

        {/* Appointment Date */}
        <View>
          <Text font="medium">Please set the next appointment date</Text>
          <View
            style={{
              display: 'flex',
              flexDirection: 'row',
              alignItems: 'center',
              marginTop: 4,
            }}>
            <TextInput
              value={
                data.appointmentDate !== undefined
                  ? format(data.appointmentDate, 'MMMM dd, yyyy')
                  : undefined
              }
              mode="outlined"
              label="Next Appointment Date"
              onPressIn={() => setShowApptDate(s => !s)}
              showSoftInputOnFocus={false}
              style={{flex: 1}}
              onChange={null}
            />

            <IconButton
              icon="calendar-month"
              color={'#555'}
              size={24}
              onPress={() => setShowApptDate(s => !s)}
            />
          </View>

          {showApptDate && (
            <DateTimePicker
              display="calendar"
              minimumDate={new Date()}
              value={data.appointmentDate || new Date()}
              onChange={(e, date) => {
                setShowApptDate(false);
                setter('summary', 'appointmentDate')(date);
              }}
            />
          )}
        </View>

        {/* <------- Medication section ------> */}
        <Section title="Medications Recommendations">
          {treatments !== undefined && treatments?.length > 0 && (
            <>
              <Text>
                Based on the assessment, we recommend the following medications
                for your patient.
              </Text>
              <View style={{paddingVertical: spacing.md}}>
                {treatments.map((cr, ix) => (
                  <View
                    key={cr}
                    style={{
                      marginVertical: spacing.xs,
                      display: 'flex',
                      flexDirection: 'row',
                      alignItems: 'center',
                    }}>
                    <Icon name="check" size={18} />
                    <Text style={{marginHorizontal: spacing.md}}>{cr}</Text>
                  </View>
                ))}
              </View>
            </>
          )}
          <View>
            <Text>Please indicate the medications to patient</Text>
            <SectionedSelect
              confirmText={'Confirm'}
              items={[
                {
                  name: 'Investigations',
                  id: 1,
                  children: getMedicationList(),
                },
              ]}
              uniqueKey="id"
              searchPlaceholderText={'Search Investigations'}
              selectText={'Search'}
              onSelectedItemsChange={setter('medicationInfo', 'medications')}
              selectedItems={state.medicationInfo.medications}
            />
          </View>
        </Section>
        <Section title="ARV Recommendations" style={{marginVertical: 8}}>
          {status !== undefined && (
            <>
              <Text style={{lineHeight: 20, marginBottom: spacing.md}}>
                Based on the assessment, it is recommended to
                <Text font="bold" italic>
                  {CTC.status.fromKey(status)}
                </Text>
              </Text>
              <Divider />
            </>
          )}
          <View style={{marginVertical: spacing.md}}>
            <Text>What decision is made about the patient ARVs?</Text>
            <Picker
              label="Reasons"
              selectedKey={state.medicationInfo.status}
              onChangeValue={setter('medicationInfo', 'status')}
              renderText={text =>
                text ? CTC.status.fromKey(text) : 'Not selected'
              }
              items={[undefined, ...CTC.status.keys()]}
            />
          </View>
          {state.medicationInfo.status !== undefined &&
            CTC.status.reason.fromKey(state.medicationInfo.status) !==
              undefined &&
            CTC.status.reason.fromKey(state.medicationInfo.status).length >
              0 && (
              <View>
                <Text>What is the reason for this decision?</Text>
                <Picker
                  label="Reasons"
                  selectedKey={state.medicationInfo.reason}
                  onChangeValue={setter('medicationInfo', 'reason')}
                  items={CTC.status.reason.fromKey(state.medicationInfo.status)}
                />
                {/* <Text>{CTC.status.reason.fromKey(state.status).join(', ')}</Text> */}
              </View>
            )}
        </Section>
      </ScrollView>
    </Layout>
  );
}

const getConditionText = (cond: Disease | string) =>
  Condition.fromKey(cond as Condition) ||
  CTC.condition.fromKey(cond as CTC.Condition) ||
  cond;
function DiseaseSummarySection({
  condition,
  values,
}: {
  condition: Disease;
  values: [Disease, number][];
}) {
  const {color} = useTheme();
  const labels = values.map(s => s[0]).map(cond => getConditionText(cond));
  const data = values.map(s => s[1]);
  const {width: screenWidth} = useWindowDimensions();
  return (
    <Section>
      <BarChart
        data={{
          labels,
          datasets: [
            {
              data,
              //   data: [
              //     Math.random() * 100,
              //     Math.random() * 100,
              //     Math.random() * 100,
              //   ],
            },
          ],
        }}
        width={screenWidth} // from react-native
        height={220}
        fromZero
        // withInnerLines={false}
        yAxisInterval={1} // optional, defaults to 1
        showValuesOnTopOfBars
        withHorizontalLabels={false}
        chartConfig={{
          backgroundGradientFrom: '#fff',
          backgroundGradientTo: '#fff',
          color: (opacity = 1) => color.secondary.base,
          decimalPlaces: 2, // optional, defaults to 2dp
          labelColor: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
          propsForDots: {
            r: '6',
            strokeWidth: '2',
            stroke: color.primary.dark,
          },
          strokeWidth: 0,
        }}
        style={{
          marginVertical: 8,
          borderRadius: 16,
        }}
      />
      <View>
        <Text style={{lineHeight: 20}}>
          Given the information, it's likely tha the patient has{' '}
          <Text font="bold">{getConditionText(condition)}</Text>
        </Text>
      </View>
    </Section>
  );
}

function Section({
  title,
  children,
  style,
}: {
  title?: string;
  children: React.ReactNode;
  style?: ViewProps['style'];
}) {
  const {spacing} = useTheme();

  return (
    <View style={[style, {marginVertical: spacing.md}]}>
      {title && (
        <>
          <Text font="medium" size={'lg'} style={{marginBottom: 8}}>
            {title}
          </Text>
          <Divider />
        </>
      )}
      <View style={{marginTop: spacing.sm}}>{children}</View>
    </View>
  );
}
