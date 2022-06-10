import {WorkflowScreenProps} from '@elsa-ui/react-native-workflows';
import {Layout, Text} from '@elsa-ui/react-native/components';
import {useTheme} from '@elsa-ui/react-native/theme';
import {format} from 'date-fns';
import {ARV, CTC, Investigation, Medication} from 'elsa-health-data-fns/lib';
import React from 'react';
import {useForm, Controller, ResolverResult} from 'react-hook-form';
import {ScrollView, View} from 'react-native';
import {Button, RadioButton, TextInput} from 'react-native-paper';
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
  // regimenDecision: string;
  // decisionReason: CTC.Status;
  arvRegimens: ARV.Regimen[];
  regimenDuration: DurationOpt;
  medications: Medication.All[];
  appointmentDate: string;
  investigations: Investigation[];
  dateOfVisit: DDMMYYYYDateString;
};

export type DurationOpt = '1-month' | '3-months' | '6-months';
const durationOptions: Array<{value: DurationOpt; text: string}> = [
  {value: '1-month', text: '1 month'},
  {value: '3-months', text: '3 months'},
  {value: '6-months', text: '6 months'},
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
      // regimenDecision: undefined,
      // @ts-ignore
      // decisionReason: '',
      arvRegimens: [],
      regimenDuration: '1-month',
      medications: [],
      appointmentDate: '',
      investigations: [],
      dateOfVisit: format(new Date(), 'dd / MM / yyyy'),
    },
  });

  const onSubmit = handleSubmit(data =>
    $.complete(data, e.patient, e.organization),
  );

  return (
    <Layout title="Patient Visit" style={{padding: 0}}>
      <ScrollView contentContainerStyle={{padding: spacing.md}}>
        <Section mode="raised">
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

        <Section
          spaceTop
          mode="raised"
          title="Date of Visit"
          desc="You can change the date of the visit"
          icon="calendar">
          <ControlDateInput
            mode="flat"
            name="dateOfVisit"
            control={control}
            required
          />
        </Section>

        {/* Make ARV medication request */}
        <Section spaceTop title="ARV Medication">
          <Column spaceTop>
            <Text font="medium" style={{marginBottom: 8}}>
              Select regimens
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
            <Text font="medium">Duration of the selected ARVs</Text>
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

        {/* Other Medication */}

        <Section title="Other Medications">
          <Column>
            <Controller
              control={control}
              name="medications"
              render={({field}) => (
                <MultiSelect
                  confirmText={'Confirm'}
                  items={[
                    {
                      name: 'Medication',
                      id: 1,
                      children: ion(Medication.all.pairs()),
                    },
                  ]}
                  uniqueKey="id"
                  searchPlaceholderText={'Search Medication'}
                  selectText={'Select if any'}
                  onSelectedItemsChange={field.onChange}
                  selectedItems={field.value}
                />
              )}
            />
          </Column>
        </Section>

        <Section
          title="Request Investigations"
          desc="Make investigation requests for the patient">
          <Controller
            control={control}
            name="investigations"
            render={({field, fieldState: {error}}) => (
              <>
                <MultiSelect
                  ref={field.ref}
                  confirmText={'Confirm'}
                  items={[
                    {
                      name: 'Investigations',
                      id: 1,
                      children: Investigation.name
                        .pairs()
                        .map(([id, name]) => ({id, name})),
                    },
                  ]}
                  uniqueKey="id"
                  searchPlaceholderText={'Search Investigations'}
                  selectText={'Select if any'}
                  onSelectedItemsChange={field.onChange}
                  selectedItems={field.value}
                />
                {Boolean(error?.type === 'validate') && (
                  <HelperText type="error">
                    You need to select at least 1 investigation
                  </HelperText>
                )}
              </>
            )}
          />
        </Section>

        {/* Date */}
        <Section
          title="Next expected pickup"
          desc="Time expected for the patient to pick up the medication">
          <Column>
            <ControlDateInput
              name="appointmentDate"
              control={control}
              required
            />
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
