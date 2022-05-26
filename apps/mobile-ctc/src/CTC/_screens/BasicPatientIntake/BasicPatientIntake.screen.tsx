import React from 'react';
import {ScrollView, View} from 'react-native';

import {Text} from '@elsa-ui/react-native/components';
import {Layout} from '@elsa-ui/react-native/components';

import {WorkflowScreenProps} from '@elsa-ui/react-native-workflows';
import {useTheme} from '@elsa-ui/react-native/theme';
import {TextInput, Button, RadioButton} from 'react-native-paper';
import {format} from 'date-fns';

import {Appointment, Patient} from '../../../../@types/v1';
import produce from 'immer';

import {Column, Block, Row, Section} from '../../temp-components';

export type FirstPatientIntake = {
  associatedAppointment: Referred<Appointment> | null;
  isPregnant: boolean | undefined;
  dateOfPregancy: Date;
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
    patient: Patient;
    initial: {
      patientId: string;
      facility: string;
    };
    value?: FirstPatientIntake;
  },
  {
    onNext: () => void;
    fetchAppointments: () => Promise<Appointment[]>;
  }
>) {
  const {spacing} = useTheme();
  const [state, set] = React.useState<FirstPatientIntake>(() => {
    return {
      associatedAppointment: null,
      isPregnant: e?.patient?.sex === 'female' ? false : undefined,
      dateOfPregancy: new Date(),
      weight: undefined,
      height: undefined,
      systolic: undefined,
      diastolic: undefined,
      whoStage: 'Stage 1',
    };
  });

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
            <Text>{e.initial.patientId}</Text>
          </Row>
          <Row icon="home" spaceTop>
            <Text font="bold" style={{marginLeft: 8}}>
              Facility
            </Text>
            <Text>{e.initial.facility}</Text>
          </Row>
        </Section>
        {/* Previous appoinment section */}
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

        {/* Type of visit */}
        <Section
          title="Type of patient visit?"
          desc="Is this a home visit or a community visit?"
          spaceTop
          mode="raised">
          <RadioButton.Group value="yes" onValueChange={() => {}}>
            <View style={{flexDirection: 'row'}}>
              <RadioButton.Item label="Home" value="yes" />
              <RadioButton.Item label="Community" value="no" />
            </View>
          </RadioButton.Group>
        </Section>

        {/*  */}
        <Section
          title="Vital Signs"
          desc="Signs or observation made on the patient"
          spaceTop>
          <Column>
            <Text size="sm">Enter Patient's weight and height</Text>
            <Row spaceTop spaceBottom>
              <TextInput
                value={state.weight}
                mode="outlined"
                label="Weight"
                keyboardType="decimal-pad"
                onChangeText={text =>
                  set(p =>
                    produce(p, d => {
                      d.weight = text;
                    }),
                  )
                }
                style={{flex: 1, marginRight: 10}}
                right={<TextInput.Affix text="kg" />}
              />
              <TextInput
                value={state.weight}
                mode="outlined"
                label="Weight"
                keyboardType="decimal-pad"
                onChangeText={text =>
                  set(p =>
                    produce(p, d => {
                      d.weight = text;
                    }),
                  )
                }
                style={{flex: 1}}
                right={<TextInput.Affix text="kg" />}
              />
            </Row>

            <Text size="sm">Enter Patient's weight and height</Text>
            <Row spaceTop>
              <TextInput
                value={state.weight}
                mode="outlined"
                label="Weight"
                keyboardType="decimal-pad"
                onChangeText={text =>
                  set(p =>
                    produce(p, d => {
                      d.weight = text;
                    }),
                  )
                }
                style={{flex: 1, marginRight: 10}}
                right={<TextInput.Affix text="kg" />}
              />
              <TextInput
                value={state.weight}
                mode="outlined"
                label="Weight"
                keyboardType="decimal-pad"
                onChangeText={text =>
                  set(p =>
                    produce(p, d => {
                      d.weight = text;
                    }),
                  )
                }
                style={{flex: 1}}
                right={<TextInput.Affix text="kg" />}
              />
            </Row>
          </Column>
        </Section>
      </ScrollView>
      <Block>
        <Button mode="contained" onPress={$.onNext} icon="arrow-right">
          Next: Understanding HIV Status
        </Button>
      </Block>
    </Layout>
  );
}
