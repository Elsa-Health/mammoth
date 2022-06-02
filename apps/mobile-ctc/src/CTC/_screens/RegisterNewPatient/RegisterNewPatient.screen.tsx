import React from 'react';

import {Layout, Text} from '@elsa-ui/react-native/components';
import {useTheme} from '@elsa-ui/react-native/theme';
import {ScrollView, View} from 'react-native';
import {
  Button,
  Chip,
  HelperText,
  IconButton,
  Modal,
  Portal,
  RadioButton,
  TextInput,
  TouchableRipple,
} from 'react-native-paper';
import {Column, Item, MultiSelect, Row, Section} from '../../temp-components';

import {WorkflowScreenProps} from '@elsa-ui/react-native-workflows';

import DateTimePicker from '@react-native-community/datetimepicker';
import TextInputMask from 'react-native-text-input-mask';
import {format} from 'date-fns';
import _ from 'lodash';

import {useForm, Controller, useController} from 'react-hook-form';
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
  {onRegisterPatient: (patient: PatientFormType) => void}
>) {
  const {spacing} = useTheme();
  const [showSelectionModal, setShow] = React.useState(false);

  const patientCTCIDRef = React.useRef();
  const {handleSubmit, control, setValue, getValues} = useForm<PatientFormType>(
    {
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
      },
    },
  );

  const onSubmit = React.useCallback(handleSubmit($.onRegisterPatient), [
    handleSubmit,
    $.onRegisterPatient,
  ]);

  return (
    <>
      <Portal>
        <Modal
          visible={showSelectionModal}
          onDismiss={() => setShow(false)}
          contentContainerStyle={{
            backgroundColor: 'white',
            margin: 36,
          }}>
          <View>
            <View style={{paddingHorizontal: 16, paddingVertical: 12}}>
              <Text font="bold" size={'lg'}>
                Select CTC
              </Text>
            </View>
            <View>
              {CTCOptionsAvailable.map(([name, ctc], ix) => (
                <TouchableRipple
                  key={ix}
                  onPress={() => {
                    setShow(false);
                    setValue('patientId', ctc);
                    patientCTCIDRef.current?.focus();
                  }}>
                  <View
                    style={{
                      paddingVertical: 8,
                      paddingHorizontal: 16,
                    }}>
                    <Text size={16} style={{marginBottom: 4, letterSpacing: 1}}>
                      {name}
                    </Text>
                    <Text
                      font="medium"
                      size={16}
                      style={{
                        textTransform: 'uppercase',
                        letterSpacing: 1,
                      }}>
                      {ctc}
                    </Text>
                  </View>
                </TouchableRipple>
              ))}
            </View>
          </View>
        </Modal>
      </Portal>
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
                render={({field: {onChange, onBlur, value}}) => (
                  <TextInput
                    ref={patientCTCIDRef}
                    placeholder="XXXXXXXXYYYYYY"
                    mode="outlined"
                    value={value}
                    onBlur={onBlur}
                    onChangeText={onChange}
                    render={props => (
                      <TextInputMask {...props} mask="[00000000][000000]" />
                    )}
                  />
                )}
              />
              <Row
                contentStyle={{justifyContent: 'flex-start'}}
                spaceTop
                spaceBottom>
                {myCtcId !== undefined && (
                  <Chip
                    icon="home"
                    onPress={() => {
                      setValue('patientId', myCtcId);
                      patientCTCIDRef.current?.focus();
                    }}
                    style={{marginRight: 4}}>
                    My facility
                  </Chip>
                )}
                <Chip icon="information" onPress={() => setShow(true)}>
                  Select Facility
                </Chip>
              </Row>
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
              <ControlDateInput name="dateOfBirth" control={control} />
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
                        <Controller
                          name="dateOfTest"
                          control={control}
                          render={({field, formState}) => (
                            <>
                              <DateInput {...field} />
                              {formState.isDirty && (
                                <HelperText type="error">
                                  {formState.errors.dateOfBirth}
                                </HelperText>
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
                        <Controller
                          name="dateStartedARVs"
                          control={control}
                          render={({field, formState}) => (
                            <>
                              <DateInput {...field} />
                              {formState.isDirty && (
                                <HelperText type="error">
                                  {formState.errors.dateOfBirth}
                                </HelperText>
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

function ControlDateInput({control, name}: {control: any; name: string}) {
  const {field} = useController({control, name});
  const [show, setShow] = React.useState(false);

  return (
    <>
      <Row>
        <TextInput
          style={{flex: 1}}
          mode="outlined"
          value={field.value}
          onChangeText={field.onChange}
          placeholder="DD / MM / YYYY"
          keyboardType="number-pad"
          render={props => (
            <TextInputMask {...props} mask="[00] / [00] / [0000]" />
          )}
        />
        {/* <IconButton icon="calendar" onPress={() => setShow(true)} /> */}
      </Row>

      {show && (
        <DateTimePicker
          style={{flex: 1}}
          value={new Date()}
          display="calendar"
          onChange={(e, date) => {
            if (date !== undefined)
              field.onChange(format(date, 'dd / MM / yyyy'));
            setShow(false);
          }}
        />
      )}
    </>
  );
}

const DateInput = React.forwardRef(
  (
    {
      onChange,
      ...props
    }: {
      value: string;
      onBlur: () => void;
      onChange: (text: string) => void;
    },
    ref,
  ) => {
    const [show, setShow] = React.useState(false);
    return (
      <>
        <Row>
          <TextInput
            style={{flex: 1}}
            mode="outlined"
            {...props}
            ref={ref}
            onChangeText={onChange}
            placeholder="DD / MM / YYYY"
            keyboardType="number-pad"
            render={props => (
              <TextInputMask {...props} mask="[00] / [00] / [0000]" />
            )}
          />
          {/* <IconButton icon="calendar" onPress={() => setShow(true)} /> */}
        </Row>

        {show && (
          <DateTimePicker
            style={{flex: 1}}
            value={new Date()}
            display="calendar"
            onChange={(e, date) => {
              if (date !== undefined) onChange(format(date, 'dd / MM / yyyy'));

              setShow(false);
            }}
          />
        )}
      </>
    );
  },
);

export function Picker<T>(props: {
  selectedKey?: string;
  items: T[];
  label?: string;
  uniqueKey?: (item: T) => string;
  renderText?: (item: T) => string;
  onChangeValue?: (itemKey: string) => void;
}) {
  return (
    <MultiSelect
      confirmText="Select"
      single
      items={[
        {
          name: props.label || 'Items',
          id: 0,
          children: props.items.map(item => ({
            id: props.uniqueKey ? props.uniqueKey(item) : item,
            name: props.renderText ? props.renderText(item) : item,
          })),
        },
      ]}
      uniqueKey="id"
      onSelectedItemsChange={items => {
        props.onChangeValue?.(items[0]);
      }}
      selectedItems={
        props.selectedKey !== undefined ? [props.selectedKey] : undefined
      }
    />
  );
}
