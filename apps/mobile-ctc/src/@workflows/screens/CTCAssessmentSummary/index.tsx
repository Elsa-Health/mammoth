import React from 'react';
import {AltLayout as Layout, Text} from '../../../@libs/elsa-ui/components';

import {ScrollView, useWindowDimensions, View, ViewProps} from 'react-native';
import {DefaultColor, DefaultSpacing} from '../../../@libs/elsa-ui/theme';
import {WorkflowScreen} from '../..';
import {Button, Divider, IconButton, TextInput} from 'react-native-paper';

import {CTC, Condition} from '@elsa-health/data-fns';

import {LineChart, BarChart} from 'react-native-chart-kit';
import DateTimePicker from '@react-native-community/datetimepicker';
import {format} from 'date-fns';
import produce from 'immer';

function Section({
  title,
  children,
  style,
}: {
  title?: string;
  children: React.ReactNode;
  style?: ViewProps['style'];
}) {
  return (
    <View style={style}>
      {title && <Text font="bold">{title}</Text>}
      <View style={{marginTop: DefaultSpacing.sm}}>{children}</View>
    </View>
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
          color: (opacity = 1) => DefaultColor.secondary.base,
          decimalPlaces: 2, // optional, defaults to 2dp
          labelColor: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
          propsForDots: {
            r: '6',
            strokeWidth: '2',
            stroke: DefaultColor.primary.dark,
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

export type CTCAssessmentData = {
  condition?: Condition | CTC.Condition;
  conditionValuePairs?: [Condition | CTC.Condition, number][];
  riskNonAdherence: number | undefined;
  appointmentDate: Date | undefined;
};
type Disease = Condition | CTC.Condition;
export default function CTCAssessmentSummaryScreen({
  entry: {value},
  actions: $,
}: WorkflowScreen<
  {
    value: Omit<CTCAssessmentData, 'riskNonAdherence' | 'appointmentDate'>;
  },
  {
    onConclude: (data: CTCAssessmentData) => void;
    onNextSteps: (data: CTCAssessmentData) => void;
    checkHasNextSteps: (disease: Disease) => boolean;
  }
>) {
  const [showApptDate, setShowApptDate] = React.useState(false);
  const [data, set] = React.useState<CTCAssessmentData>(
    produce(value as CTCAssessmentData, df => {
      df.riskNonAdherence = df.riskNonAdherence ?? 0;
      df.appointmentDate = df.appointmentDate ?? undefined;
    }),
  );
  const hasNextSteps = React.useMemo(
    () =>
      data.condition !== undefined
        ? $.checkHasNextSteps(data.condition)
        : false,
    [data, $.checkHasNextSteps],
  );

  const changeValue = React.useCallback(
    <K extends keyof CTCAssessmentData>(field: K) =>
      (value: CTCAssessmentData[K]) => {
        set(s =>
          produce(s, df => {
            df[field] = value;
          }),
        );
      },
    [set],
  );

  return (
    <Layout title={'Assessment Summary'} style={{padding: 0}}>
      <ScrollView contentContainerStyle={{marginHorizontal: DefaultSpacing.md}}>
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
            <Section
              title="Suggestions"
              style={{marginVertical: DefaultSpacing.md}}>
              <Text style={{lineHeight: 20}}>
                Press on the "Next Steps" button to find out what more you can
                do to help the patient
              </Text>
            </Section>
          </>
        )}
        <Divider />

        {/* Risk Non-Adherence */}
        {data.riskNonAdherence !== undefined && (
          <Section
            title="Risk of Non-Adherence"
            style={{marginVertical: DefaultSpacing.md}}>
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

        <View>
          <Text font="bold">Please set the next appointment date</Text>
          <View
            style={{
              display: 'flex',
              flexDirection: 'row',
              alignItems: 'center',
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
                changeValue('appointmentDate')(date);
              }}
            />
          )}
        </View>

        {/* Actions */}
        <View style={{marginVertical: DefaultSpacing.md}}>
          <Button mode="outlined" onPress={() => $.onNextSteps(data)}>
            Next Steps
          </Button>
          <Button
            mode="contained"
            style={{marginTop: 8}}
            onPress={() => $.onConclude(data)}>
            Conclude
          </Button>
        </View>
      </ScrollView>
    </Layout>
  );
}
