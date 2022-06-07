import {WorkflowScreenProps} from '@elsa-ui/react-native-workflows';
import {Layout, Text} from '@elsa-ui/react-native/components';
import {useTheme} from '@elsa-ui/react-native/theme';
import {format} from 'date-fns';
import {ARV, CTC} from 'elsa-health-data-fns/lib';
import React from 'react';
import {useForm, Controller} from 'react-hook-form';
import {ScrollView, View} from 'react-native';
import {Button, RadioButton} from 'react-native-paper';
import {CTCOrganization, CTCPatient} from '../../emr/types';
import {
  Block,
  Column,
  ControlDateInput,
  MultiSelect,
  Picker,
  Row,
  Section,
} from '../../temp-components';

const ion = (p: [string, string][]) => p.map(([k, v]) => ({id: k, name: v}));

export type MedicationRequestVisitData = {
  regimenDecision: string;
  decisionReason: CTC.Status;
  arvRegimens: ARV.Regimen[];
  regimenDuration: DurationOpt;
  appointmentDate: string;
};

type DurationOpt = '1-month' | '3-months';
const durationOptions: Array<{value: DurationOpt; text: string}> = [
  {value: '1-month', text: '1 month'},
  {value: '3-months', text: '3 months'},
];
export default function MedicationVisitScreen({
  entry: e,
  actions: $,
}: WorkflowScreenProps<
  {patient: CTCPatient; organization: CTCOrganization},
  {
    complete: (
      data: MedicationRequestVisitData,
      patient: CTCPatient,
      organization: CTCOrganization,
    ) => void;
    onDiscard: () => void;
  }
>) {
  const {spacing} = useTheme();
  const {handleSubmit, control} = useForm<MedicationRequestVisitData>({
    defaultValues: {
      regimenDecision: undefined,
      // @ts-ignore
      decisionReason: '',
      arvRegimens: [],
      regimenDuration: '1-month',
    },
  });

  const onSubmit = handleSubmit(data =>
    $.complete(data, e.patient, e.organization),
  );

  return (
    <Layout title="Request Medication" style={{padding: 0}}>
      <ScrollView contentContainerStyle={{padding: spacing.md}}>
        <Section mode="raised">
          <Row icon="calendar">
            <Text font="bold" style={{marginLeft: 8}}>
              Date of Visit
            </Text>
            <Text>{format(new Date(), 'dd MMMM yyyy')}</Text>
          </Row>
          <Row icon="account" spaceTop>
            <Text font="bold" style={{marginLeft: 8}}>
              Patient ID
            </Text>
            <Text>{e.patient.id}</Text>
          </Row>
          <Row icon="home" spaceTop>
            <Text font="bold" style={{marginLeft: 8}}>
              Facility
            </Text>
            <Text>{e.organization.name}</Text>
          </Row>
        </Section>
        {/* Make ARV medication request */}

        <Section spaceTop title="ARV Medication">
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
                    (CTC.status.reason.fromKey(field.value) ?? []).length > 0 &&
                    !['not-start-arv', 'stop-arv', 'continue-arv'].includes(
                      field.value,
                    ) && (
                      <>
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
                      </>
                    )}
                </>
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
                      <RadioButton.Item
                        label={text}
                        key={value}
                        value={value}
                      />
                    ))}
                  </Row>
                </RadioButton.Group>
              )}
            />
          </Column>
        </Section>
        {/* Date */}
        <Section
          spaceTop
          title="Next expected pickup"
          desc="Time expected for the patient to pick up the medication">
          <Column>
            <ControlDateInput name="appointmentDate" control={control} />
          </Column>
        </Section>
      </ScrollView>
      {/* Action buttons */}
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
