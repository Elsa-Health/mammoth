import React from 'react';
import {ScrollView, View} from 'react-native';
import {AltLayout as Layout, Text} from '../../../@libs/elsa-ui/components';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {DefaultColor, DefaultSpacing} from '../../../@libs/elsa-ui/theme';

import {format} from 'date-fns';
import {
  Button,
  Divider,
  IconButton,
  RadioButton,
  TextInput,
} from 'react-native-paper';
import produce from 'immer';
import DateTimePicker from '@react-native-community/datetimepicker';

export type BasicIntakeForm = {
  isPregnant: boolean | undefined;
  dateOfPregancy: Date;
  weight: undefined | string;
  height: undefined | string;
  systolic: undefined | string;
  diastolic: undefined | string;
  whoStage: string;
};

export default function BasicV2PatientIntakeScreen({
  entry: {value, patientId, sex, appointmentDate},
  actions: $,
}: WorkflowScreen<
  {
    patientId: string;
    appointmentDate: Date;
    sex: Sex;
    value: Partial<BasicIntakeForm>;
  },
  {
    onNext: (patientIntake: BasicIntakeForm) => void;
  }
>) {
  const [patientIntake, set] = React.useState<BasicIntakeForm>({
    isPregnant: sex === 'female' ? false : undefined,
    dateOfPregancy: new Date(),
    weight: undefined,
    height: undefined,
    systolic: undefined,
    diastolic: undefined,
    whoStage: 'Stage 1',
  });

  React.useEffect(() => {
    console.log('--> [ENTERED]: BasicV2PatientIntakeScreen');
    return () => console.log('--> [EXIT]: BasicV2PatientIntakeScreen');
  }, []);

  const changeValue = React.useCallback(
    (field: keyof typeof patientIntake) => (value: string) => {
      set(s =>
        produce(s, df => {
          df[field] = value;
        }),
      );
    },
    [set],
  );

  const [showPregDate, setShowPregDate] = React.useState(false);
  return (
    <Layout title="Patient Intake" style={{padding: 0}}>
      <ScrollView
        contentContainerStyle={{paddingHorizontal: DefaultSpacing.md, flex: 1}}>
        <View style={{flex: 1}}>
          <View>
            {appointmentDate && (
              <>
                {/* Appointment Date */}
                <View
                  style={{
                    display: 'flex',
                    flexDirection: 'row',
                    alignItems: 'center',
                    paddingVertical: 8,
                    justifyContent: 'space-between',
                  }}>
                  <View
                    style={{
                      display: 'flex',
                      flexDirection: 'row',
                      alignItems: 'center',
                    }}>
                    <Icon
                      color={DefaultColor.primary.base}
                      size={24}
                      name="calendar-clock"
                    />
                    <Text font="bold" style={{marginLeft: 8}}>
                      Appointment Date
                    </Text>
                  </View>
                  <Text>{format(appointmentDate, 'dd MMMM yyyy')}</Text>
                </View>
              </>
            )}

            {/* Patient ID */}
            <View
              style={{
                display: 'flex',
                flexDirection: 'row',
                alignItems: 'center',
                paddingVertical: 8,
                justifyContent: 'space-between',
              }}>
              <View
                style={{
                  display: 'flex',
                  flexDirection: 'row',
                  alignItems: 'center',
                }}>
                <Icon
                  color={DefaultColor.primary.base}
                  size={24}
                  name="account"
                />
                <Text font="bold" style={{marginLeft: 8}}>
                  Patient ID
                </Text>
              </View>
              <Text>{patientId}</Text>
            </View>

            {/* Date */}
            <View
              style={{
                display: 'flex',
                flexDirection: 'row',
                alignItems: 'center',
                paddingVertical: 8,
                justifyContent: 'space-between',
              }}>
              <View
                style={{
                  display: 'flex',
                  flexDirection: 'row',
                  alignItems: 'center',
                }}>
                <Icon
                  color={DefaultColor.primary.base}
                  size={24}
                  name="calendar"
                />
                <Text font="bold" style={{marginLeft: 8}}>
                  Date of Visit
                </Text>
              </View>
              <Text>{format(new Date(), 'dd MMMM yyyy')}</Text>
            </View>
          </View>
          <Divider />

          {/* Pregnant */}
          <View>
            {sex === 'female' && (
              <View style={{marginTop: 12}}>
                <Text>Is the patient pregnant?</Text>
                <RadioButton.Group
                  onValueChange={val =>
                    changeValue('isPregnant')(val === 'yes' ? true : false)
                  }
                  value={patientIntake.isPregnant ? 'yes' : 'no'}>
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
            )}

            {patientIntake.isPregnant && (
              <>
                <View
                  style={{
                    display: 'flex',
                    flexDirection: 'row',
                    alignItems: 'center',
                  }}>
                  <TextInput
                    value={format(
                      patientIntake.dateOfPregancy,
                      'MMMM dd, yyyy',
                    )}
                    mode="outlined"
                    label="Expected Pregnacy"
                    onPressIn={() => setShowPregDate(s => !s)}
                    showSoftInputOnFocus={false}
                    style={{flex: 1}}
                    onChange={null}
                  />

                  <IconButton
                    icon="calendar-month"
                    color={'#555'}
                    size={24}
                    onPress={() => setShowPregDate(s => !s)}
                  />
                </View>

                {showPregDate && (
                  <DateTimePicker
                    display="calendar"
                    value={patientIntake.dateOfPregancy}
                    onChange={(e, date) => {
                      setShowPregDate(false);
                      changeValue('dateOfPregancy')(date);
                    }}
                  />
                )}
              </>
            )}
          </View>
          {/* Weight & Height */}
          <View style={{marginTop: 8}}>
            <View style={{paddingVertical: 6}}>
              <Text>Enter the weight and height </Text>
            </View>
            <View
              style={{
                display: 'flex',
                flexDirection: 'row',
                alignItems: 'center',
              }}>
              <TextInput
                value={patientIntake.weight}
                mode="outlined"
                label="Weight"
                keyboardType="decimal-pad"
                onChangeText={changeValue('weight')}
                style={{flex: 1}}
                right={<TextInput.Affix text="kg" />}
              />
              <TextInput
                value={patientIntake.height}
                mode="outlined"
                label="Height / Length"
                keyboardType="decimal-pad"
                onChangeText={changeValue('height')}
                style={{flex: 1, marginLeft: DefaultSpacing.sm}}
                right={<TextInput.Affix text="cm" />}
              />
            </View>
          </View>

          {/* Blood Pressure */}
          <View style={{marginTop: 8}}>
            <View style={{paddingVertical: 6}}>
              <Text>Enter details for Blood Pressure </Text>
            </View>
            <View
              style={{
                display: 'flex',
                flexDirection: 'row',
                alignItems: 'center',
              }}>
              <TextInput
                value={patientIntake.systolic}
                mode="outlined"
                label="Systolic"
                keyboardType="decimal-pad"
                onChangeText={changeValue('systolic')}
                style={{flex: 1}}
                right={<TextInput.Affix text="mmHg" />}
              />
              <TextInput
                value={patientIntake.diastolic}
                mode="outlined"
                label="Diastolic"
                keyboardType="decimal-pad"
                onChangeText={changeValue('diastolic')}
                style={{flex: 1, marginLeft: DefaultSpacing.sm}}
                right={<TextInput.Affix text="mmHg" />}
              />
            </View>
          </View>
        </View>
        <View style={{marginVertical: DefaultSpacing.md}}>
          <Button mode="contained" onPress={() => $.onNext(patientIntake)}>
            Next
          </Button>
        </View>
      </ScrollView>
    </Layout>
  );
}
