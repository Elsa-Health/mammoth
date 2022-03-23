import {Picker} from '@react-native-picker/picker';
import produce from 'immer';
import React from 'react';
import {ScrollView, View} from 'react-native';
import {Button, RadioButton, TextInput} from 'react-native-paper';
import {WorkflowScreen} from '../..';
import {AltLayout as Layout, Text} from '../../../@libs/elsa-ui/components';
import {Spacing} from '../../../@libs/elsa-ui/theme';

const AVAIL_EDUACTION_LEVELS = [
  'No Education',
  'Primary Education',
  'Secondary Education',
  'Higher Education',
];

export type PatientAdherence = {
  educationLevel: string;
  forgottenCount: string;
  hasJob: boolean;
  hasFrequentAlc: boolean;
  isShareDrugs: boolean;
  isExperienceSideEffects: boolean;
  doesPatientUnderstandRegimen: boolean;
};

const YNQuestions: Array<{text: string; key: keyof PatientAdherence}> = [
  {text: 'Does the patient currently have a job?', key: 'hasJob'},
  {
    text: 'Does the patient use alcohol frequently (more than 4 times per week)?',
    key: 'hasFrequentAlc',
  },
  {
    text: 'Does the patient share drugs with their friends or family members?',
    key: 'isShareDrugs',
  },
  {
    text: 'Is the patient experiencing side effects from their medication?',
    key: 'isExperienceSideEffects',
  },
  {
    text: 'Does the patient understand their treatment regimen?',
    key: 'doesPatientUnderstandRegimen',
  },
];

export default function HIVAdherenceAssessmentScreen({
  actions: $,
}: WorkflowScreen<
  {},
  {onCompleteAdherence: (adhrence: PatientAdherence) => void}
>) {
  const [patient, set] = React.useState<PatientAdherence>({
    educationLevel: AVAIL_EDUACTION_LEVELS[0],
    forgottenCount: '',
    hasJob: false,
    hasFrequentAlc: false,
    isShareDrugs: false,
    isExperienceSideEffects: false,
    doesPatientUnderstandRegimen: true,
  });
  const changeValue = React.useCallback(
    <K extends keyof PatientAdherence>(field: K) =>
      (value: PatientAdherence[K]) => {
        set(s =>
          produce(s, df => {
            df[field] = value;
          }),
        );
      },
    [set],
  );
  return (
    <Layout title="Adherence Assessment" style={{padding: 0}}>
      <ScrollView contentContainerStyle={{paddingHorizontal: Spacing.lg}}>
        <Text>
          Please input the following information about your patient to assess
          their risk of non-adherence.
        </Text>
        <View>
          {/* Patient's education level */}
          <View style={{marginTop: 12}}>
            <Text>Patient's Education Level</Text>
            <Picker
              selectedValue={patient.educationLevel}
              onValueChange={(itemValue, itemIndex) =>
                changeValue('educationLevel')(itemValue)
              }>
              {AVAIL_EDUACTION_LEVELS.map(stage => {
                return <Picker.Item key={stage} label={stage} value={stage} />;
              })}
            </Picker>
          </View>
          {/* Forgotten Count */}
          <View style={{marginTop: 12}}>
            <Text>
              How many times has the patient forgotten their medication in the
              past month?
            </Text>
            <TextInput
              mode="outlined"
              keyboardType="number-pad"
              value={patient.forgottenCount}
              onChangeText={changeValue('forgottenCount')}
              label="No. of Times"
            />
          </View>
          {/* Yes/No questions */}
          {YNQuestions.map(({text, key}) => (
            <React.Fragment key={key}>
              <View style={{marginTop: 12}}>
                <Text>{text}</Text>
                <RadioButton.Group
                  onValueChange={val =>
                    changeValue(key)(val === 'yes' ? true : false)
                  }
                  value={patient[key] ? 'yes' : 'no'}>
                  <View
                    style={{
                      display: 'flex',
                      flexDirection: 'row',
                      justifyContent: 'space-evenly',
                    }}>
                    <RadioButton.Item label="Yes" value={'yes'} />
                    <RadioButton.Item label="No" value={'no'} />
                  </View>
                </RadioButton.Group>
              </View>
            </React.Fragment>
          ))}
        </View>
        <View style={{marginVertical: Spacing.md}}>
          <Button
            mode="contained"
            onPress={() => $.onCompleteAdherence(patient)}>
            Finish Adhrerence
          </Button>
        </View>
      </ScrollView>
    </Layout>
  );
}
