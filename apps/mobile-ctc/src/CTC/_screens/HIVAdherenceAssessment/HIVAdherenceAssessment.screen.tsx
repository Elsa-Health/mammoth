import React from 'react';

import {Layout, Text} from '@elsa-ui/react-native/components';
import {useTheme} from '@elsa-ui/react-native/theme';
import {ScrollView, View} from 'react-native';
import {Button, RadioButton, TextInput} from 'react-native-paper';
import {Block, Column, Picker, Row, Section} from '../../temp-components';
import {WorkflowScreenProps} from '@elsa-ui/react-native-workflows';
import {Controller, useForm} from 'react-hook-form';
import TextInputMask from 'react-native-text-input-mask';
import {capitalize} from 'lodash';

export type PatientAdherenceInfo = {
  educationLevel: string;
  forgottenCount: string;
  hasJob: boolean;
  hasFrequentAlc: boolean;
  isShareDrugs: boolean;
  isExperienceSideEffects: boolean;
  doesPatientUnderstandRegimen: boolean;
};

const AVAIL_EDUACTION_LEVELS = [
  'No Education',
  'Primary Education',
  'Secondary Education',
  'Higher Education',
];

export default function HIVAdherenceAssessmentScreen({
  entry: e,
  actions: $,
}: WorkflowScreenProps<
  {value?: PatientAdherenceInfo},
  {
    onSkip: () => void;
    onNext: (data: PatientAdherenceInfo) => void;
  }
>) {
  const {spacing} = useTheme();

  const {handleSubmit, control} = useForm({
    defaultValues: e.value ?? {
      educationLevel: AVAIL_EDUACTION_LEVELS[0],
      forgottenCount: '',
      hasJob: false,
      hasFrequentAlc: false,
      isShareDrugs: false,
      isExperienceSideEffects: false,
      doesPatientUnderstandRegimen: true,
    },
  });

  const onSubmit = React.useCallback(handleSubmit($.onNext), [
    handleSubmit,
    $.onNext,
  ]);

  return (
    <Layout title="Patient Adherence" style={{padding: 0}}>
      <ScrollView
        contentContainerStyle={{padding: spacing.md}}
        style={{flex: 1}}>
        {/* Missing medication */}
        <Section
          title="Medication details"
          desc="Inforamtion related to patient's medications">
          <Column>
            <Text>Times skipped medicating in the past month</Text>
            <Row contentStyle={{alignItems: 'flex-end'}} spaceTop>
              <Controller
                control={control}
                name="forgottenCount"
                render={({field}) => (
                  <TextInput
                    label="Frequency"
                    placeholder="8"
                    mode="outlined"
                    right={<TextInput.Affix text="times" />}
                    render={props => (
                      <TextInputMask {...props} mask="[000000]" />
                    )}
                    style={{flex: 0.8}}
                    keyboardType="number-pad"
                  />
                )}
              />
            </Row>
          </Column>
          <Column spaceTop>
            <Text>Experience side-effect from their medication?</Text>
            <Controller
              control={control}
              name="isExperienceSideEffects"
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
          </Column>
          <Column>
            <Text>Does patient understand their treatment regimen?</Text>
            <Controller
              control={control}
              name="doesPatientUnderstandRegimen"
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
          </Column>
        </Section>
        {/* Knowing Co-morbidities Status */}
        <Section
          title="General questions"
          desc="Highlights activities that might influence adherence ">
          <Column>
            <Text style={{marginBottom: 8}}>Highest education level?</Text>
            <Controller
              name="educationLevel"
              control={control}
              render={({field}) => (
                <Picker
                  label="Levels of Education"
                  items={AVAIL_EDUACTION_LEVELS}
                  selectedKey={field.value}
                  renderText={capitalize}
                  onChangeValue={field.onChange}
                />
              )}
            />
          </Column>
          <Column spaceTop>
            <Text>Does the patient currently have a job?</Text>
            <Controller
              control={control}
              name="hasJob"
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
          </Column>
          <Column>
            <Text>Does the patient share drugs with friends and family?</Text>
            <Controller
              control={control}
              name="isShareDrugs"
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
          </Column>
        </Section>
        {/* ARV */}
      </ScrollView>
      <Block>
        <Button mode="outlined" onPress={$.onSkip} icon="skip-next-outline">
          Skip
        </Button>
        <Button
          mode="contained"
          style={{marginTop: 4}}
          onPress={onSubmit}
          icon="arrow-right">
          Finish up: Conclude Visit
        </Button>
      </Block>
    </Layout>
  );
}
