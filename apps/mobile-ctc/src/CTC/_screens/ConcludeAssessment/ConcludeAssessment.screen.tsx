import React from 'react';

import {Layout, Text} from '@elsa-ui/react-native/components';
import {useTheme} from '@elsa-ui/react-native/theme';
import {ScrollView, View} from 'react-native';
import {Button, Checkbox, RadioButton} from 'react-native-paper';
import {
  Block,
  Column,
  ControlDateInput,
  DateInput,
  MultiSelect,
  Picker,
  Row,
  Section,
} from '../../temp-components';

import {ARV, CTC, Investigation, Medication} from 'elsa-health-data-fns';
import {Controller, useForm} from 'react-hook-form';
import {WorkflowScreenProps} from '@elsa-ui/react-native-workflows';

const ion = (p: [string, string][]) => p.map(([k, v]) => ({id: k, name: v}));

type DurationOpt = '1-month' | '3-months';
const durationOptions: Array<{value: DurationOpt; text: string}> = [
  {value: '1-month', text: '1 month'},
  {value: '3-months', text: '3 months'},
];
export type ConcludeAssessmentData = {
  riskOfNonAdhrence: null | number;
  appointmentDate: string;
  investigations: Investigation[];
  medications: Medication.All[];
  regimenDecision: CTC.Status | null;
  decisionReason: string | null;
  arvRegimens: ARV.Regimen[];
  regimenDuration: DurationOpt;
};

export default function ConcludeAssessmentScreen({
  actions: $,
}: WorkflowScreenProps<
  {},
  {onDiscard: () => void; onComplete: (value: ConcludeAssessmentData) => void}
>) {
  const {spacing} = useTheme();
  const {handleSubmit, control} = useForm<ConcludeAssessmentData>({
    defaultValues: {
      appointmentDate: '',
      arvRegimens: [],
      investigations: [],
      medications: [],
      decisionReason: null,
      regimenDecision: null,
      regimenDuration: '1-month',
      riskOfNonAdhrence: null,
    },
  });

  const onSubmit = React.useCallback(handleSubmit($.onComplete), [
    handleSubmit,
    $.onComplete,
  ]);

  return (
    <Layout title="Concluding Assessment" style={{padding: 0}}>
      <ScrollView
        contentContainerStyle={{paddingHorizontal: spacing.md}}
        style={{flex: 1}}>
        {/* Early HIV signs */}
        <Section
          spaceTop
          title="Risk of Non-Adherence"
          desc="Chances of the patient not adhereing to treatment."
          mode="raised">
          <Column>
            <Text>Won't adhere</Text>
          </Column>
        </Section>
        <Section
          title="Make an appointment"
          spaceTop
          desc="Set a future date that patient take next treatment.">
          <Column>
            <ControlDateInput name="appointmentDate" control={control} />
          </Column>
        </Section>
        {/* Knowing Co-morbidities Status */}
        <Section
          title="Request Investigations"
          desc="Order investigations to be done for the patient">
          <Controller
            control={control}
            name="investigations"
            render={({field}) => (
              <MultiSelect
                confirmText={'Confirm'}
                items={[
                  {
                    name: 'Investigations',
                    id: 1,
                    children: ion(Investigation.name.pairs()),
                  },
                ]}
                uniqueKey="id"
                searchPlaceholderText={'Search Investigations'}
                selectText={'Select if any'}
                onSelectedItemsChange={field.onChange}
                selectedItems={field.value}
              />
            )}
          />
        </Section>

        {/* Knowing Co-morbidities Status */}
        <Block
          bg="#4665af10"
          borderTop
          style={{marginHorizontal: -spacing.md, marginTop: spacing.md}}>
          <Section
            style={{backgroundColor: undefined}}
            title="Medication Recommendations"
            desc="Medications the patient should take"
            spaceTop>
            <Controller
              control={control}
              name="investigations"
              render={({field}) => (
                <MultiSelect
                  confirmText={'Confirm'}
                  items={[
                    {
                      name: 'Medications',
                      id: 1,
                      children: ion(Medication.all.pairs()),
                    },
                  ]}
                  uniqueKey="id"
                  searchPlaceholderText={'Search Medications'}
                  selectText={'Select if any'}
                  onSelectedItemsChange={field.onChange}
                  selectedItems={field.value}
                />
              )}
            />
          </Section>
          {/* ARV */}
          <Section
            style={{backgroundColor: undefined}}
            title="ARV Recommendations">
            <Column spaceTop>
              <Text font="medium">Decision about patient's regimen?</Text>
              <Controller
                control={control}
                name="regimenDecision"
                render={({field}) => (
                  <>
                    <Picker
                      label="Regimen Decision"
                      items={CTC.status.keys()}
                      renderText={CTC.status.fromKey}
                      selectedKey={field.value}
                      onChangeValue={field.onChange}
                    />
                    {/* Reason for ARV regimen selection */}

                    {field.value !== null &&
                      (CTC.status.reason.fromKey(field.value) ?? []).length >
                        0 &&
                      !['not-start-arv', 'stop-arv', 'continue-arv'].includes(
                        field.value,
                      ) && (
                        <Column spaceTop>
                          <Text font="medium" style={{marginBottom: 8}}>
                            Reason for decision?
                          </Text>
                          <Controller
                            control={control}
                            name="decisionReason"
                            render={({field: reasonField}) => (
                              <>
                                {CTC.status.reason.fromKey(field.value).length >
                                3 ? (
                                  <Picker
                                    label="Levels of Education"
                                    items={CTC.status.reason.fromKey(
                                      field.value,
                                    )}
                                    selectedKey={reasonField.value}
                                    onChangeValue={reasonField.onChange}
                                  />
                                ) : (
                                  <RadioButton.Group
                                    value={reasonField.value}
                                    onValueChange={reasonField.onChange}>
                                    <Row
                                      spaceTop
                                      contentStyle={{
                                        flexWrap: 'wrap',
                                        justifyContent: 'flex-start',
                                      }}>
                                      {CTC.status.reason
                                        .fromKey(field.value)
                                        .map(val => (
                                          <RadioButton.Item
                                            labelStyle={{
                                              justifyContent: 'flex-start',
                                            }}
                                            label={val}
                                            key={val}
                                            value={val}
                                          />
                                        ))}
                                    </Row>
                                  </RadioButton.Group>
                                )}
                              </>
                            )}
                          />
                        </Column>
                      )}
                  </>
                )}
              />
            </Column>

            <Column spaceTop>
              <Text font="medium" style={{marginBottom: 8}}>
                Choose new regimen
              </Text>
              <Controller
                control={control}
                name="arvRegimens"
                render={({field}) => (
                  <MultiSelect
                    confirmText={'Confirm'}
                    items={[
                      {
                        name: 'ARV Regimens',
                        id: 1,
                        children: ion(ARV.regimen.pairs()),
                      },
                    ]}
                    uniqueKey="id"
                    searchPlaceholderText={'Search ARV Regimen'}
                    selectText={'Select if any'}
                    onSelectedItemsChange={field.onChange}
                    selectedItems={field.value}
                  />
                )}
              />
            </Column>

            <Column spaceTop>
              <Text font="medium">Duration of the new ARV?</Text>

              <Controller
                control={control}
                name="regimenDuration"
                render={({field}) => (
                  <RadioButton.Group
                    value={field.value}
                    onValueChange={field.onChange}>
                    <Row
                      spaceTop
                      contentStyle={{
                        flexWrap: 'wrap',
                        justifyContent: 'flex-start',
                      }}>
                      {durationOptions.map(({value, text}) => (
                        <RadioButton.Item label={text} value={value} />
                      ))}
                    </Row>
                  </RadioButton.Group>
                )}
              />
            </Column>
          </Section>
        </Block>
      </ScrollView>
      <Block borderTop>
        <Row>
          <Button
            mode="outlined"
            onPress={$.onDiscard}
            style={{flex: 1, marginRight: 8}}
            icon="close">
            Discard
          </Button>
          <Button
            mode="contained"
            onPress={onSubmit}
            style={{flex: 1}}
            icon="check">
            Finish
          </Button>
        </Row>
      </Block>
    </Layout>
  );
}
