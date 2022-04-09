import React from 'react';
import {ScrollView, ToastAndroid, View} from 'react-native';
import {AltLayout as Layout, Text} from '../../../@libs/elsa-ui/components';
import {Color, Spacing} from '../../../@libs/elsa-ui/theme';

import {
  RadioButton,
  TextInput,
  IconButton,
  Button,
  HelperText,
} from 'react-native-paper';
import {Picker} from '@react-native-picker/picker';
import DateTimePicker from '@react-native-community/datetimepicker';

import produce from 'immer';
import dayjs from 'dayjs';
import {WorkflowScreen} from '../..';

type MaritalStatus =
  | 'single'
  | 'child'
  | 'cohabiting'
  | 'divorced-separated'
  | 'widow-ed'
  | 'married';
const martialStatusOptions = [
  'child',
  'single',
  'married',
  'cohabiting',
  'divorced-separated',
  'widow-ed',
] as MaritalStatus[];

export const convertMartial = (ms: MaritalStatus) => {
  if (ms === 'single') return 'Single';
  if (ms === 'married') return 'Married';
  if (ms === 'cohabiting') return 'Cohabiting';
  if (ms === 'divorced-separated') return 'Divorced / Separated';
  if (ms === 'widow-ed') return 'Widow / Widowed';
  return 'Child';
};

const DISTRICTS = [
  'Meru',
  'Arusha City',
  'Arusha',
  'Karatu',
  'Longido',
  'Monduli',
  'Ngorongoro',
  'Hai',
  'Moshi',
  'Moshi Municipal',
  'Mwanga',
  'Rombo',
  'Same',
  'Siha',
  'Other',
].sort((a, b) => a.localeCompare(b));

const ARV_WHO_STAGES = ['Stage 1', 'Stage 2', 'Stage 3', 'Stage 4'];

const TYPE_O_TREATMENT_SUPPORT = [
  'Family',
  'Friends',
  'Partner / Spouse',
  'Community Group',
];
export type PatientFormType = {
  patientId: string | undefined;
  firstName: string;
  familyName: string;
  phoneNumber: string;
  resident: string;

  // for DOB
  dateOfBirth: Date;

  maritalStatus: MaritalStatus;

  // HIV+ status
  hasPositiveTest: boolean;
  dateOfTest?: Date | undefined;

  // ARVs
  hasPatientOnARVs: boolean;
  dateStartedARVs?: Date | undefined;

  // WHO
  whoStage: string;

  hasTreatmentSupport: boolean;
  typeOfSupport?: string | undefined;

  sex: Sex;
};

const CTCCodeMap = {
  'Meru District Hospital': '02020100',
  'Mount Meru Regional Referral Hospital': '',
  'Mbuguni CTC': '02020101',
  'Usa Dream': '02020250',
  'Nkoaranga Lutheran Hospital': '02020300',
  'Usa Government': '02020500',
  Momela: '02020118',
  Makiba: '02020105',
  'Ngarenanyuki Health Centre': '02020103',
  Mareu: '02020120',
  Other: '',
};

const CTCValues = Object.entries(CTCCodeMap);

export default function CTCRegisterNewPatientScreen({
  entry: {patientId},
  actions: $,
}: WorkflowScreen<
  {
    patientId?: string | undefined;
  },
  {onRegisterPatient: (paitent: PatientFormType) => void}
>) {
  const [patient, set] = React.useState<PatientFormType>({
    patientId,
    firstName: '',
    familyName: '',
    phoneNumber: '',
    resident: DISTRICTS[0],
    dateOfBirth: new Date(1970, 1, 1),
    maritalStatus: 'single',
    hasPositiveTest: false,
    dateOfTest: new Date(new Date().getFullYear() - 2, 1, 1),
    hasPatientOnARVs: false,
    dateStartedARVs: new Date(new Date().getFullYear() - 4, 1, 1),
    whoStage: 'Stage 1',
    hasTreatmentSupport: false,
    typeOfSupport: 'Family',
    sex: 'male',
  });

  const [ctcX, setSelectCTC] = React.useState(CTCValues[0][0]);
  React.useEffect(() => {
    changeValue('patientId')(CTCCodeMap[ctcX]);
  }, [ctcX]);

  const patientFieldError = () => {
    return patient.patientId?.length !== 10;
  };

  const onSubmit = () => {
    const errors = patientFieldError();

    if (!errors) {
      $.onRegisterPatient(patient);
      return;
    }

    ToastAndroid.show(
      'You have errors. Fix them before submitting!',
      ToastAndroid.LONG,
    );
  };

  const changeValue = React.useCallback(
    (field: keyof typeof patient) => (value: string) => {
      set(s =>
        produce(s, df => {
          df[field] = value;
        }),
      );
    },
    [set],
  );

  const [show, setShow] = React.useState(false);
  const [showDOB, setShowDOB] = React.useState(false);
  const [showARVs, setShowARVs] = React.useState(false);

  return (
    <Layout title="Register Patient" style={{padding: 0}}>
      <ScrollView
        contentContainerStyle={{
          paddingHorizontal: Spacing.lg,
        }}>
        <View
          style={{
            marginVertical: Spacing.sm,
            marginBottom: Spacing.md,
          }}>
          <View>
            <Text>Select Code to Prefill</Text>
            <Picker
              selectedValue={ctcX}
              style={{flex: 1}}
              onValueChange={(itemValue, itemIndex) => setSelectCTC(itemValue)}>
              {CTCValues.map(([name, code]) => {
                return <Picker.Item key={name} label={name} value={name} />;
              })}
            </Picker>
          </View>
          <View style={{flex: 2}}>
            <TextInput
              label="Patient ID"
              mode="outlined"
              value={patient.patientId}
              onChangeText={changeValue('patientId')}
            />
            <HelperText type="error" visible={patientFieldError()}>
              Please type in a valid CTC ID
            </HelperText>
          </View>
        </View>
        <View>
          <Text>Please input the following information about your patient</Text>
        </View>
        {/* Gender */}
        <View style={{marginTop: 12}}>
          <Text>Sex</Text>
          <RadioButton.Group
            onValueChange={changeValue('sex')}
            value={patient.sex}>
            <View
              style={{
                display: 'flex',
                flexDirection: 'row',
                justifyContent: 'space-evenly',
              }}>
              <RadioButton.Item label="Male" value="male" />
              <RadioButton.Item label="Female" value="female" />
            </View>
          </RadioButton.Group>
        </View>
        {/* DOB */}

        <View>
          <View
            style={{
              display: 'flex',
              flexDirection: 'row',
              alignItems: 'center',
            }}>
            <TextInput
              value={dayjs(patient.dateOfBirth).format('DD MMMM, YYYY')}
              mode="outlined"
              style={{flex: 1}}
              label="Date of Birth"
              onPressIn={() => setShowDOB(s => !s)}
              showSoftInputOnFocus={false}
              onChange={null}
            />

            <IconButton
              icon="calendar-month"
              color={'#555'}
              size={24}
              onPress={() => setShowDOB(s => !s)}
            />
          </View>

          {showDOB && (
            <DateTimePicker
              style={{flex: 1}}
              display="calendar"
              maximumDate={new Date()}
              value={patient.dateOfBirth}
              onChange={(e, date) => {
                setShowDOB(false);
                changeValue('dateOfBirth')(date);
              }}
            />
          )}
        </View>

        {/* Martial Status */}
        <View style={{marginTop: 12}}>
          <Text>Martial Status</Text>
          <Picker
            selectedValue={patient.maritalStatus}
            onValueChange={(itemValue, itemIndex) =>
              changeValue('martialStatus')(itemValue)
            }>
            {martialStatusOptions.map(ms => {
              return (
                <Picker.Item key={ms} label={convertMartial(ms)} value={ms} />
              );
            })}
          </Picker>
        </View>
        {/* District of Residence */}
        <View style={{marginTop: 12}}>
          <Text>District of Residence</Text>
          <Picker
            selectedValue={patient.district}
            onValueChange={(itemValue, itemIndex) =>
              changeValue('district')(itemValue)
            }>
            {DISTRICTS.map(district => {
              return (
                <Picker.Item key={district} label={district} value={district} />
              );
            })}
          </Picker>
        </View>
        {/* Patient had HIV test */}
        <View style={{marginTop: 12}}>
          <Text>Has the patient had a HIV test that was positive?</Text>
          <RadioButton.Group
            onValueChange={val =>
              changeValue('hasPositiveTest')(val === 'yes' ? true : false)
            }
            value={patient.hasPositiveTest ? 'yes' : 'no'}>
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
        {/* IF? Patient had HIV Test */}
        {patient.hasPositiveTest && (
          <View>
            <View
              style={{
                display: 'flex',
                flexDirection: 'row',
                alignItems: 'center',
              }}>
              <TextInput
                value={dayjs(patient.dateOfTest).format('DD MMMM, YYYY')}
                mode="outlined"
                style={{flex: 1}}
                label="Date HIV+"
                onPressIn={() => setShow(s => !s)}
                showSoftInputOnFocus={false}
                onChange={null}
              />

              <IconButton
                icon="calendar-month"
                color={'#555'}
                size={24}
                onPress={() => setShow(s => !s)}
              />
            </View>

            {show && (
              <DateTimePicker
                style={{flex: 1}}
                display="calendar"
                value={patient.dateOfTest}
                minimumDate={patient.dateOfBirth}
                onChange={(e, date) => {
                  setShow(false);
                  changeValue('dateOfTest')(date);
                }}
              />
            )}
          </View>
        )}

        {/* Patient on ARVs */}
        <View style={{marginTop: 12}}>
          <Text>Is the patient currently on ARVs?</Text>
          <RadioButton.Group
            onValueChange={val =>
              changeValue('hasPatientOnARVs')(val === 'yes' ? true : false)
            }
            value={patient.hasPatientOnARVs ? 'yes' : 'no'}>
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
        {/* Date started ARVs */}
        {patient.hasPatientOnARVs && (
          <View>
            <View
              style={{
                display: 'flex',
                flexDirection: 'row',
                alignItems: 'center',
              }}>
              <TextInput
                value={dayjs(patient.dateStartedARVs).format('DD MMMM, YYYY')}
                mode="outlined"
                label="ARV Start date"
                style={{flex: 1}}
                onPressIn={() => setShowARVs(s => !s)}
                showSoftInputOnFocus={false}
                onChange={null}
              />

              <IconButton
                icon="calendar-month"
                color={'#555'}
                size={24}
                onPress={() => setShowARVs(s => !s)}
              />
            </View>

            {showARVs && (
              <DateTimePicker
                style={{flex: 1}}
                display="calendar"
                value={patient.dateStartedARVs}
                onChange={(e, date) => {
                  setShowARVs(false);
                  changeValue('dateStartedARVs')(date);
                }}
              />
            )}
          </View>
        )}

        {/* WHO Stage */}
        <View style={{marginTop: 12}}>
          <Text>WHO Stage at the Start of ARVs</Text>
          <Picker
            selectedValue={patient.whoStage}
            onValueChange={(itemValue, itemIndex) =>
              changeValue('whoStage')(itemValue)
            }>
            {ARV_WHO_STAGES.map(stage => {
              return <Picker.Item key={stage} label={stage} value={stage} />;
            })}
          </Picker>
        </View>

        {/* Treatment support */}
        <View style={{marginTop: 12}}>
          <Text>Is the patient on a treatment support?</Text>
          <RadioButton.Group
            onValueChange={val =>
              changeValue('hasTreatmentSupport')(val === 'yes')
            }
            value={patient.hasTreatmentSupport ? 'yes' : 'no'}>
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
        {patient.hasTreatmentSupport && (
          <View style={{marginTop: 12}}>
            <Text>Patient's Treatment Support</Text>
            <Picker
              selectedValue={patient.typeOfSupport}
              onValueChange={(itemValue, itemIndex) =>
                changeValue('typeOfSupport')(itemValue)
              }>
              {TYPE_O_TREATMENT_SUPPORT.map(ts => {
                return <Picker.Item key={ts} label={ts} value={ts} />;
              })}
            </Picker>
          </View>
        )}
        {/* TODO: Include section for listing the Allergies that the patient might have */}
        <View></View>
        {/*  */}
        <View style={{marginVertical: Spacing.md}}>
          <Button mode="contained" onPress={onSubmit}>
            Register Patient
          </Button>
        </View>
      </ScrollView>
    </Layout>
  );
}
