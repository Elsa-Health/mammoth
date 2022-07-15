import React from 'react';

import {Layout, Text} from '@elsa-ui/react-native/components';
import {useTheme} from '@elsa-ui/react-native/theme';
import {ScrollView, View} from 'react-native';
import {
  Button,
  Checkbox,
  Chip,
  HelperText,
  IconButton,
  Modal,
  Portal,
  RadioButton,
  TextInput,
  TouchableRipple,
} from 'react-native-paper';
import {
  Column,
  ControlDateInput,
  DateInput,
  Item,
  MultiSelect,
  Picker,
  Row,
  Section,
} from '../../temp-components';

import {WorkflowScreenProps} from '@elsa-ui/react-native-workflows';

import TextInputMask from 'react-native-text-input-mask';
import _ from 'lodash';

import {useForm, Controller} from 'react-hook-form';
import Collapsible from 'react-native-collapsible';
import {Investigation} from 'elsa-health-data-fns/lib';
import {PatientQuery} from '../../misc';
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
  patientId: string;
  firstName: string;
  familyName: string;
  phoneNumber: string;
  resident: string;

  // for DOB
  dateOfBirth: string;

  maritalStatus: string;

  // HIV+ status
  hasPositiveTest: boolean;
  dateOfTest?: string | undefined;

  // ARVs
  hasPatientOnARVs: boolean;
  dateStartedARVs?: string | undefined;

  // WHO
  whoStage: string;

  hasTreatmentSupport: boolean;
  typeOfSupport?: string | undefined;

  sex: Sex;
};
const MARITAL_STATUS = [
  'Single',
  'Married',
  'Cohabiting',
  'Divorced / Separated',
  'Widow / Widowed',
];

export default function RegisterNewPatientScreen({
  entry: {myCtcId, patientId},
  actions: $,
}: WorkflowScreenProps<
  {myCtcId?: string; patientId?: string | undefined},
  {
    onRegisterPatient: (
      patient: PatientFormType,
      investigations: Investigation[] | null,
      cb?: (err?: Error) => void,
    ) => void;
    checkIfPatientExists: (patientId: string) => Promise<boolean>;
  }
>) {
  const {spacing} = useTheme();

  const [isHaveInvestigation, setHaveInvestigation] = React.useState(false);

  const patientCTCIDRef = React.useRef(null);
  const {handleSubmit, control, setValue} = useForm<
    PatientFormType & {investigations: Investigation[]}
  >({
    defaultValues: {
      patientId,
      firstName: '',
      familyName: '',
      phoneNumber: '',
      resident: DISTRICTS[0],
      dateOfBirth: '',
      maritalStatus: 'Single', // modified late
      hasPositiveTest: false,
      dateOfTest: '',
      hasPatientOnARVs: false,
      dateStartedARVs: '',
      whoStage: 'Stage 1',
      hasTreatmentSupport: false,
      typeOfSupport: 'Family',
      sex: 'male',
      investigations: [],
    },
  });

  const onSubmit = handleSubmit(({investigations, ...value}) => {
    return $.onRegisterPatient(
      value,
      isHaveInvestigation ? investigations : null,
    );
  });

  return (
    <>
      <Layout title="Register Patient" style={{padding: 0}}>
        <ScrollView
          contentContainerStyle={{padding: spacing.md}}
          style={{flex: 1}}>
          <Section
            title="Patient Identification"
            desc="Identify the patient you are registering">
            {/* Patient ID */}
            <Column>
              <Text>Patient CTC ID</Text>
              <Controller
                name="patientId"
                control={control}
                rules={{
                  required: {value: true, message: 'Patient ID Required'},
                  pattern: {
                    value: new RegExp(/(\d+){14}/g),
                    message: 'Must have 14 numbers',
                  },
                  validate: async pid => {
                    if (await $.checkIfPatientExists(pid)) {
                      return 'Patient exists. Please register with a different number';
                    } else {
                      return true;
                    }
                  },
                }}
                render={({
                  field: {onChange, onBlur, value},
                  fieldState: {error},
                }) => {
                  // set
                  return (
                    <>
                      <PatientQuery
                        onChange={onChange}
                        myCtcId={myCtcId}
                        onFocus={patientCTCIDRef.current?.onFocus}>
                        <TextInput
                          ref={patientCTCIDRef.current}
                          error={Boolean(error)}
                          placeholder="XXXXXXXXYYYYYY"
                          mode="outlined"
                          value={value}
                          keyboardType="number-pad"
                          onBlur={onBlur}
                          onChangeText={onChange}
                          render={props => (
                            <TextInputMask
                              {...props}
                              mask="[00000000][000000]"
                            />
                          )}
                        />
                        {error !== undefined && (
                          <HelperText type="error">{error.message}</HelperText>
                        )}
                      </PatientQuery>
                    </>
                  );
                }}
              />
            </Column>

            {/* Sex */}
            <Column spaceTop>
              <Text>Sex</Text>
              <Controller
                name="sex"
                control={control}
                render={({field: {onChange, value}}) => (
                  <RadioButton.Group value={value} onValueChange={onChange}>
                    <View style={{flexDirection: 'row'}}>
                      <RadioButton.Item label="Male" value="male" />
                      <RadioButton.Item label="Female" value="female" />
                    </View>
                  </RadioButton.Group>
                )}
              />
            </Column>
            <Column spaceTop>
              <Text>Date of Birth</Text>
              <ControlDateInput
                name="dateOfBirth"
                control={control}
                required
                dateTimeProps={{maxDate: new Date()}}
              />
            </Column>
          </Section>
          {/* Register Patient*/}
          <Section
            mode="raised"
            style={{paddingVertical: 24, paddingHorizontal: 24}}
            title="Optional Patient Details"
            removeLine
            spaceBottom
            spaceTop
            desc="Add helpful information that can be used in searching the patient later.">
            <Row>
              <Controller
                name="firstName"
                control={control}
                render={({field: {onChange, value, onBlur}}) => (
                  <TextInput
                    style={{flex: 1, marginRight: 8, backgroundColor: '#FFF'}}
                    value={value}
                    onBlur={onBlur}
                    onChangeText={onChange}
                    label="First Name"
                  />
                )}
              />
              <Controller
                name="familyName"
                control={control}
                render={({field: {onChange, ...other}}) => (
                  <TextInput
                    style={{flex: 1, backgroundColor: '#FFF'}}
                    onChangeText={onChange}
                    {...other}
                    label="Family Name"
                  />
                )}
              />
            </Row>
            <Item>
              <Controller
                name="phoneNumber"
                control={control}
                render={({field: {onChange, ...other}}) => (
                  <TextInput
                    style={{flex: 1, backgroundColor: '#FFF'}}
                    onChangeText={onChange}
                    {...other}
                    label="Phone Number"
                    render={props => (
                      <TextInputMask
                        {...props}
                        mask="(+255) 0[000] [000] [000]"
                      />
                    )}
                  />
                )}
              />
            </Item>
          </Section>
          {/* More on Patient  */}
          <Section title="Other Patient Information" spaceTop>
            <Column>
              <Text>Marital Status</Text>
              <Controller
                name="maritalStatus"
                control={control}
                render={({field}) => (
                  <Picker
                    label="Marital Status"
                    items={MARITAL_STATUS}
                    selectedKey={field.value}
                    renderText={_.capitalize}
                    onChangeValue={field.onChange}
                  />
                )}
              />
            </Column>
            <Column spaceTop>
              <Text>District of residence</Text>
              <Controller
                name="resident"
                control={control}
                render={({field}) => (
                  <Picker
                    label="Districts"
                    items={DISTRICTS}
                    selectedKey={field.value}
                    renderText={_.capitalize}
                    onChangeValue={field.onChange}
                  />
                )}
              />
            </Column>
          </Section>
          {/* More about the HIV side of the patient*/}
          <Section
            title="HIV Related Information"
            desc="Asking HIV related information">
            <Column>
              <Text>Has the patient had a HIV test that was positive?</Text>
              {/* Control for Yes no inputs */}
              <Controller
                name="hasPositiveTest"
                control={control}
                render={({field}) => (
                  <>
                    <RadioButton.Group
                      value={field.value ? 'yes' : 'no'}
                      onValueChange={d => field.onChange(d === 'yes')}>
                      <View style={{flexDirection: 'row'}}>
                        <RadioButton.Item label="Yes" value="yes" />
                        <RadioButton.Item label="No" value="no" />
                      </View>
                    </RadioButton.Group>
                    {field.value && (
                      <Column spaceTop>
                        <Text>Date since known status</Text>
                        <ControlDateInput
                          name="dateOfTest"
                          control={control}
                          required={field.value}
                          dateTimeProps={{maxDate: new Date()}}
                        />
                      </Column>
                    )}
                  </>
                )}
              />
            </Column>
            <Column spaceTop>
              <Text style={{lineHeight: 20}}>
                Is the patient currently on ARVs?
              </Text>

              <Controller
                name="hasPatientOnARVs"
                control={control}
                render={({field}) => (
                  <>
                    <RadioButton.Group
                      value={field.value ? 'yes' : 'no'}
                      onValueChange={d => field.onChange(d === 'yes')}>
                      <View style={{flexDirection: 'row'}}>
                        <RadioButton.Item label="Yes" value="yes" />
                        <RadioButton.Item label="No" value="no" />
                      </View>
                    </RadioButton.Group>
                    {field.value && (
                      <Column spaceTop>
                        <Text>ARV Start Date</Text>
                        <ControlDateInput
                          name="dateOfTest"
                          control={control}
                          required={field.value}
                          dateTimeProps={{maxDate: new Date()}}
                        />
                      </Column>
                    )}
                  </>
                )}
              />
            </Column>
            <Column spaceTop>
              <Text style={{lineHeight: 20}}>
                WHO Stage at the start of ARV use?
              </Text>

              <Controller
                name="whoStage"
                control={control}
                render={({field}) => (
                  <Picker
                    label="Who Stages"
                    items={ARV_WHO_STAGES}
                    selectedKey={field.value}
                    renderText={_.capitalize}
                    onChangeValue={field.onChange}
                  />
                )}
              />
            </Column>
            <Column spaceTop>
              <Text style={{lineHeight: 20}}>
                Is the patient on a treatment support?
              </Text>

              <Controller
                name="hasTreatmentSupport"
                control={control}
                render={({field}) => (
                  <>
                    <RadioButton.Group
                      value={field.value ? 'yes' : 'no'}
                      onValueChange={d => field.onChange(d === 'yes')}>
                      <View style={{flexDirection: 'row'}}>
                        <RadioButton.Item label="Yes" value="yes" />
                        <RadioButton.Item label="No" value="no" />
                      </View>
                    </RadioButton.Group>
                    {field.value && (
                      <Controller
                        name="typeOfSupport"
                        control={control}
                        render={({field}) => (
                          <Picker
                            label="Support Type"
                            items={TYPE_O_TREATMENT_SUPPORT}
                            selectedKey={field.value}
                            renderText={_.capitalize}
                            onChangeValue={field.onChange}
                          />
                        )}
                      />
                    )}
                  </>
                )}
              />
            </Column>
          </Section>
          <Section
            spaceBottom
            removeLine
            title="Request Investigations?"
            desc="Would you like to requests investigations for patient"
            mode="raised"
            right={
              <Checkbox
                status={isHaveInvestigation ? 'checked' : 'unchecked'}
                onPress={() => setHaveInvestigation(s => !s)}
              />
            }>
            <Collapsible collapsed={!isHaveInvestigation}>
              <View>
                <Text style={{marginBottom: 4}}>
                  Choose the investigations to request:
                </Text>
                <Controller
                  control={control}
                  name="investigations"
                  rules={{
                    validate: item =>
                      isHaveInvestigation ? item.length >= 1 : true,
                  }}
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
              </View>
            </Collapsible>
          </Section>
          <Item spaceTop>
            <Button mode="contained" onPress={onSubmit} icon="check">
              Register Patient
            </Button>
          </Item>
        </ScrollView>
      </Layout>
    </>
  );
}

const CTCOptionsAvailable = Object.entries({
  'Meru District Hospital': '02020100',
  'Mbuguni CTC': '02020101',
  'Usa Dream': '02020250',
  'Nkoaranga Lutheran Hospital': '02020300',
  'Usa Government': '02020500',
  Momela: '02020118',
  Makiba: '02020105',
  'Ngarenanyuki Health Centre': '02020103',
  Mareu: '02020120',
  'Other - Not Registered': '',
});
