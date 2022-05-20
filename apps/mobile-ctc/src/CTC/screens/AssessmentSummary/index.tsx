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
import {
  CTC,
  Condition,
  Medication,
  Investigation,
  ARV,
} from '@elsa-health/data-fns';
import {BarChart} from 'react-native-chart-kit';

import {
  Button,
  Divider,
  IconButton,
  TextInput,
  Checkbox,
  HelperText,
  RadioButton,
} from 'react-native-paper';
import DateTimePicker from '@react-native-community/datetimepicker';
import {format} from 'date-fns';
import produce from 'immer';

import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

export type HIVDispenseMedication = {
  medications: Medication.All | CTC.Medication[];
  status: CTC.Status | undefined;
  reason?: string | undefined;
  arvRegimens: ARV.Regimen[];
  regimenDuration?: string | undefined;
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
  investigations: Investigation[];
  medicationInfo: HIVDispenseMedication;
};
type Disease = Condition | CTC.Condition;

const getMedicationList = () =>
  [...Medication.all.pairs(), ...CTC.medication.pairs()]
    .map(([m, v]) => ({
      id: m,
      name: v,
    }))
    .sort((a, b) => a.name.localeCompare(b.name));

const checkHasNextSteps = (condition: Disease) =>
  CTC.nextSteps.keys().includes(condition);

type SetterValue<T> = T | ((prev: T) => T);
export default function AssessmentSummaryScreen({
  entry: {value: initialValue, recommendedTests},
  actions: $,
}: WorkflowScreen<
  {
    recommendedTests: CTC.Test[] | undefined;
    value: Partial<AssessmentSummaryData>;
  },
  {
    onCancel: () => void;
    onConclude: (data: AssessmentSummaryData) => void;
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
        arvRegimens: [],
        regimenDuration: undefined,
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
  const showRecommendedTests = (recommendedTests?.length || 0) > 0;

  const {treatments, status} = state.nextSteps;
  const hasNextSteps = React.useMemo(
    () =>
      data.condition !== undefined ? checkHasNextSteps(data.condition) : false,
    [data, checkHasNextSteps],
  );

  const setter = <
    K extends keyof AssessmentSummaryData,
    K2 extends keyof AssessmentSummaryData[K],
  >(
    field: K,
    sub?: K2,
  ) => {
    type AK = AssessmentSummaryData[K][K2];
    type A = AssessmentSummaryData[K];

    return (value: SetterValue<AK> | SetterValue<A>) => {
      set(s =>
        produce(s, df => {
          if (typeof value === 'function') {
            if (sub !== undefined) {
              df[field][sub] = value(df[field][sub] as AK);
            } else {
              df[field] = value(df[field]) as A;
            }
          } else {
            if (sub !== undefined) {
              df[field][sub] = value as AK;
            } else {
              df[field] = value as A;
            }
          }
        }),
      );
    };
  };

  const setInvestigation = React.useCallback((inv: I) => {
    setter('investigations')(s =>
      produce(s, df => {
        const invIndex = df.findIndex(s => s === inv);
        if (invIndex > -1) {
          df.splice(invIndex, 1);
        } else {
          // add
          // @ts-ignore
          df.push(inv);
        }
      }),
    );
  }, []);

  const dateInputError = () => {
    return state.summary.appointmentDate === undefined;
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
        {/* Appointment Date */}
        <View style={{marginTop: 8}}>
          <Text font="bold">Please set the next appointment date</Text>
          <View
            style={{
              display: 'flex',
              flexDirection: 'row',
              alignItems: 'center',
              marginTop: 4,
            }}>
            <View style={{flex: 1}}>
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
              <HelperText type="error" visible={dateInputError()}>
                This is required
              </HelperText>
            </View>

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
                Risk of Non-Adherence:
                <Text font="bold">
                  {`${(data.riskNonAdherence * 100).toFixed(1)}`}%
                </Text>
              </Text>
            </View>
          </Section>
        )}

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
                  name: 'Medications',
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
        <Section title="ARV Recommendations" style={{marginTop: 8}}>
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
          <View>
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
            !['not-start-arv', 'stop-arv', 'continue-arv'].includes(
              state.medicationInfo.status,
            ) && (
              <>
                <View style={{marginVertical: 6}}>
                  <Text>What ARV Regimen are you changing to?</Text>
                  <SectionedSelect
                    confirmText={'Confirm'}
                    items={[
                      {
                        name: 'ARV Combination Regimen',
                        id: 1,
                        children: ARV.regimen
                          .pairs()
                          .map(([id, name]) => ({id, name})),
                      },
                    ]}
                    uniqueKey="id"
                    searchPlaceholderText={'Search ARV Combination Regimen'}
                    selectText={'Select if any'}
                    onSelectedItemsChange={setter(
                      'medicationInfo',
                      'arvRegimens',
                    )}
                    selectedItems={state.medicationInfo.arvRegimens}
                  />
                </View>

                {state.medicationInfo.arvRegimens.length > 0 && (
                  <View style={{marginTop: 12}}>
                    <Text style={{lineHeight: 20}}>
                      What is the duration of the ARVs?
                    </Text>
                    <RadioButton.Group
                      onValueChange={setter(
                        'medicationInfo',
                        'regimenDuration',
                      )}
                      value={state.medicationInfo.regimenDuration ?? 'NILL'}>
                      <View
                        style={{
                          display: 'flex',
                          flexDirection: 'row',
                          justifyContent: 'space-evenly',
                        }}>
                        <RadioButton.Item label="Unspecified" value={'NILL'} />
                        <RadioButton.Item label="1 month" value={'1 month'} />
                        <RadioButton.Item label="3 months" value={'3 months'} />
                      </View>
                    </RadioButton.Group>
                  </View>
                )}
              </>
            )}
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
              </View>
            )}
        </Section>
        {/* <------- Order Investigations ------> */}
        <Section title="Order Investigations">
          {showRecommendedTests && (
            <>
              <Text font="bold" style={{paddingVertical: 12}}>
                Recommended Tests
              </Text>
              <Text>It is recommended that you order the following tests:</Text>
              <View>
                {recommendedTests?.map(inv => (
                  <Checkbox.Item
                    key={inv}
                    label={getInvestigationText(inv)}
                    status={
                      state.investigations.includes(inv)
                        ? 'checked'
                        : 'unchecked'
                    }
                    onPress={() => setInvestigation(inv)}
                  />
                ))}
              </View>
            </>
          )}
          <View>
            <Text>Select the tests to order for the patients</Text>
            <SectionedSelect
              confirmText={'Confirm'}
              items={[
                {
                  name: 'Investigations',
                  id: 1,
                  children: getInvestigationList(),
                },
              ]}
              uniqueKey="id"
              searchPlaceholderText={'Search Investigations'}
              selectText={'Search'}
              onSelectedItemsChange={setter('investigations')}
              selectedItems={state.investigations}
            />
          </View>
        </Section>
        <View style={{marginVertical: spacing.md}}>
          <View style={{marginVertical: spacing.sm}}>
            <Text color="#555" size={14}>
              {"To finalize the form, press the 'Conclude' Button below"}
            </Text>
          </View>
          <View style={{flexDirection: 'row'}}>
            <Button onPress={$.onCancel} mode="outlined" style={{flex: 1}}>
              Discard
            </Button>
            <Button
              mode="contained"
              disabled={!(state.summary.appointmentDate !== undefined)}
              style={{flex: 2, marginLeft: 4}}
              onPress={() => $.onConclude(state)}>
              Conclude
            </Button>
          </View>
        </View>
      </ScrollView>
    </Layout>
  );
}

const getInvestigationText = (inv: CTC.Test) => CTC.test.fromKey(inv);
const getInvestigationList = () =>
  Investigation.name.pairs().map(([k, v]) => ({id: k, name: v}));

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
    <View style={[{marginVertical: spacing.xs}, style]}>
      {title && (
        <>
          <Text font="medium" size={17} style={{marginBottom: 8}}>
            {title}
          </Text>
          <Divider />
        </>
      )}
      <View style={{marginTop: spacing.sm}}>{children}</View>
    </View>
  );
}
