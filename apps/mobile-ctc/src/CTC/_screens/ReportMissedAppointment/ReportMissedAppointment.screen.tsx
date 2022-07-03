import {Layout, Text} from '@elsa-ui/react-native/components';
import React from 'react';

import {WorkflowScreenProps} from '@elsa-ui/react-native-workflows';
import {Block, Column, ControlDateInput, Section} from '../../temp-components';
import {
  Button,
  Checkbox,
  HelperText,
  RadioButton,
  TextInput,
} from 'react-native-paper';
import {Controller, useForm} from 'react-hook-form';
import {ScrollView, View} from 'react-native';

import * as z from 'zod';
import {useAsyncFn, useDebounce} from 'react-use';

const MissedPatientReport = z.object({
  patientId: z.string(),
  missedDate: z.string(),
  appointmentDate: z.string(),
  sex: z.union([z.literal('male'), z.literal('female')]).optional(),
  dateOfBirth: z.string().optional(),
});

type MissedPatientReport = z.infer<typeof MissedPatientReport>;
export default function ReportMissedAppointmentScreen({
  entry: e,
  actions: $,
}: WorkflowScreenProps<
  {
    patientId?: string;
  },
  {
    checkIfPatientExists: (patientId: string) => Promise<boolean>;
    onSubmitReport: (report: MissedPatientReport) => void;
  }
>) {
  const [createIfMissed, set] = React.useState(false);
  const {handleSubmit, control} = useForm<MissedPatientReport>({
    defaultValues: {
      patientId: e.patientId ?? '',
      missedDate: '',
      appointmentDate: undefined,
      sex: 'male',
      dateOfBirth: undefined,
    },
  });

  const [{loading}, onSubmit] = useAsyncFn(handleSubmit($.onSubmitReport), [
    handleSubmit,
  ]);

  return (
    <Layout title="Report Missed Appointment">
      <ScrollView>
        {/* Patient ID */}
        <Section
          title="Patient ID"
          desc="Identify patient that missed an appointment">
          <Controller
            name="patientId"
            control={control}
            rules={{
              required: {value: true, message: 'Patient ID Required'},
              pattern: {
                value: new RegExp(/(\d+){14}/g),
                message: 'Must have 14 numbers',
              },
              validate: async patientId => {
                if (await $.checkIfPatientExists(patientId)) {
                  return true;
                } else {
                  if (!createIfMissed) {
                    return 'Patient should exist, or check to create patient';
                  }

                  return true;
                }
              },
            }}
            render={({field, fieldState}) => (
              <>
                <TextInput
                  mode="outlined"
                  value={field.value}
                  maxLength={14}
                  placeholder="Patient ID"
                  keyboardType="number-pad"
                  onChangeText={field.onChange}
                  ref={field.ref}
                />
                {fieldState.error && (
                  <HelperText type="error">
                    {fieldState.error.message}
                  </HelperText>
                )}
                <Column>
                  <Checkbox.Item
                    status={createIfMissed ? 'checked' : 'unchecked'}
                    label="Create if patient is missing"
                    onPress={() => set(f => !f)}
                  />

                  {createIfMissed && (
                    <Section
                      title="For new patient"
                      mode="raised"
                      desc="Ignore if patient exists">
                      <Column spaceTop>
                        <Text font="bold">Sex</Text>
                        <Controller
                          name="sex"
                          control={control}
                          render={({field: {onChange, value}}) => (
                            <RadioButton.Group
                              value={value}
                              onValueChange={onChange}>
                              <View style={{flexDirection: 'row'}}>
                                <RadioButton.Item label="Male" value="male" />
                                <RadioButton.Item
                                  label="Female"
                                  value="female"
                                />
                              </View>
                            </RadioButton.Group>
                          )}
                        />
                      </Column>
                      <Column spaceTop>
                        <Text font="bold">Date of Birth</Text>
                        <ControlDateInput
                          required={createIfMissed}
                          name="dateOfBirth"
                          control={control}
                        />
                      </Column>
                    </Section>
                  )}
                </Column>
              </>
            )}
          />
        </Section>
        {/* Items */}
        <Section
          title="Missed Date"
          desc="The date the appointment was set for"
          removeLine>
          <ControlDateInput
            name="missedDate"
            control={control}
            required
            dateTimeProps={{maxDate: new Date()}}
          />
        </Section>
        <Section
          title="Set Appointment"
          desc="Date for the new appointment"
          removeLine>
          <ControlDateInput
            name="appointmentDate"
            control={control}
            required
            dateTimeProps={{minDate: new Date()}}
          />
        </Section>
      </ScrollView>
      <Section>
        <Button mode="contained" onPress={onSubmit} loading={loading}>
          Report
        </Button>
      </Section>
    </Layout>
  );
}
