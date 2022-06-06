import React from 'react';
import {ScrollView, View} from 'react-native';

import {Text} from '@elsa-ui/react-native/components';
import {Layout} from '@elsa-ui/react-native/components';

import {WorkflowScreenProps} from '@elsa-ui/react-native-workflows';
import {useTheme} from '@elsa-ui/react-native/theme';
import {TextInput, Button, RadioButton} from 'react-native-paper';
import {format} from 'date-fns';

import {Column, Block, Row, Section} from '../../temp-components';
import {CTCOrganization, CTCPatient} from '../../emr/types';

import {useForm, Controller} from 'react-hook-form';
import TextInputMask from 'react-native-text-input-mask';

export type FirstPatientIntake = {
  associatedAppointment: Referred<Appointment> | null;
  isPregnant: boolean | undefined;
  dateOfPregancy: Date;
  visitType: 'home' | 'community';
  weight: undefined | string;
  height: undefined | string;
  systolic: undefined | string;
  diastolic: undefined | string;
};

export default function BasicPatientIntakeScreen({
  entry: e,
  actions: $,
}: WorkflowScreenProps<
  {
    patient: CTCPatient;
    organization: CTCOrganization;
    value?: FirstPatientIntake;
  },
  {
    onNext: (
      data: FirstPatientIntake,
      patient: CTCPatient,
      organization: CTCOrganization,
    ) => void;
    fetchAppointments: () => Promise<Appointment[]>;
  }
>) {
  const {spacing} = useTheme();
  const {handleSubmit, control} = useForm<FirstPatientIntake>({
    defaultValues: e.value ?? {
      associatedAppointment: null,
      isPregnant: e?.patient?.sex === 'female' ? false : undefined,
      dateOfPregancy: new Date(),
      weight: undefined,
      height: undefined,
      visitType: 'community',
      systolic: undefined,
      diastolic: undefined,
    },
  });

  const onSubmit = React.useCallback(
    handleSubmit(values => $.onNext(values, e.patient, e.organization)),
    [handleSubmit, $.onNext],
  );

  return (
    <Layout title="First Patient Intake" style={{padding: 0}}>
      <ScrollView
        contentContainerStyle={{padding: spacing.md}}
        style={{flex: 1}}>
        {/* Date of Visit */}
        <Section title="Details">
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
        {/* Previous appoinment section */}
        {false && (
          <Section
            title="From an appointment?"
            spaceTop
            desc="Is this visit created from an existing appointment"
            mode="raised">
            <RadioButton.Group value="yes" onValueChange={() => {}}>
              <View style={{flexDirection: 'row'}}>
                <RadioButton.Item label="Yes" value="yes" />
                <RadioButton.Item label="No" value="no" />
              </View>
            </RadioButton.Group>
          </Section>
        )}

        {/* Type of visit */}
        <Section
          title="Type of patient visit?"
          desc="Is this a home visit or a community visit?"
          spaceTop
          mode="raised">
          <Controller
            name="visitType"
            control={control}
            render={({field}) => (
              <>
                <RadioButton.Group
                  value={field.value}
                  onValueChange={field.onChange}>
                  <View style={{flexDirection: 'row'}}>
                    <RadioButton.Item label="Home" value="home" />
                    <RadioButton.Item label="Community" value="community" />
                  </View>
                </RadioButton.Group>
              </>
            )}
          />
        </Section>
        {/* Is Pregrant? */}
        {e.patient.sex === 'female' && (
          <Section title="Is Pregnant?" removeLine spaceTop>
            <Controller
              control={control}
              name="isPregnant"
              render={({field}) => (
                <RadioButton.Group
                  value={field.value ? 'yes' : 'no'}
                  onValueChange={d => field.onChange(d === 'yes')}>
                  <View style={{flexDirection: 'row'}}>
                    <RadioButton.Item label="Yes" value="yes" />
                    <RadioButton.Item label="No" value="no" />
                  </View>
                </RadioButton.Group>
              )}
            />
          </Section>
        )}
        {/*  */}
        <Section
          title="Vital Signs"
          desc="Signs or observation made on the patient"
          spaceTop>
          <Column>
            <Text size="sm">Patient's Weight and Height</Text>
            <Row spaceTop spaceBottom>
              <Controller
                name="weight"
                control={control}
                render={({field}) => (
                  <TextInput
                    value={field.value}
                    mode="outlined"
                    label="Weight"
                    keyboardType="decimal-pad"
                    onChangeText={field.onChange}
                    render={props => (
                      <TextInputMask {...props} mask="[000000]" />
                    )}
                    style={{flex: 1, marginRight: 10}}
                    right={<TextInput.Affix text="kg" />}
                  />
                )}
              />
              <Controller
                name="height"
                control={control}
                render={({field}) => (
                  <TextInput
                    value={field.value}
                    mode="outlined"
                    label="Height"
                    keyboardType="decimal-pad"
                    onChangeText={field.onChange}
                    render={props => (
                      <TextInputMask {...props} mask="[000000]" />
                    )}
                    style={{flex: 1, marginRight: 10}}
                    right={<TextInput.Affix text="mmHg" />}
                  />
                )}
              />
            </Row>
            <Text size="sm">Patient's Blood Pressure</Text>
            <Row spaceTop>
              <Controller
                name="systolic"
                control={control}
                render={({field}) => (
                  <TextInput
                    value={field.value}
                    mode="outlined"
                    label="Systolic"
                    keyboardType="decimal-pad"
                    onChangeText={field.onChange}
                    style={{flex: 1, marginRight: 10}}
                    right={<TextInput.Affix text="mmHg" />}
                  />
                )}
              />
              <Controller
                name="diastolic"
                control={control}
                render={({field}) => (
                  <TextInput
                    value={field.value}
                    mode="outlined"
                    label="Diastolic"
                    keyboardType="decimal-pad"
                    onChangeText={field.onChange}
                    style={{flex: 1, marginRight: 10}}
                    right={<TextInput.Affix text="mmHg" />}
                  />
                )}
              />
            </Row>
          </Column>
        </Section>
      </ScrollView>
      <Block>
        <Button mode="contained" onPress={onSubmit} icon="arrow-right">
          Next: Understanding HIV Status
        </Button>
      </Block>
    </Layout>
  );
}
