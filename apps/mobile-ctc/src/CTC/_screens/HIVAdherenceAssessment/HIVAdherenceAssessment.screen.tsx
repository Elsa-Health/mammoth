import React from 'react';

import {Layout, Text} from '@elsa-ui/react-native/components';
import {useTheme} from '@elsa-ui/react-native/theme';
import {ScrollView, View} from 'react-native';
import {Button, RadioButton, TextInput} from 'react-native-paper';
import {Block, Column, Row, Section} from '../../temp-components';
import {WorkflowScreenProps} from '@elsa-ui/react-native-workflows';

const ion = (p: [string, string][]) => p.map(([k, v]) => ({id: k, name: v}));

export default function HIVAdherenceAssessmentScreen({
  actions: $,
}: WorkflowScreenProps<{}, {onNext: () => void}>) {
  const {spacing} = useTheme();
  const [state, set] = React.useState(() => ({
    coMorbidities: [] as any[],
  }));

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
              <TextInput
                label="Frequency (Ex. 8)"
                mode="outlined"
                style={{flex: 0.5}}
                keyboardType="number-pad"
              />
            </Row>
          </Column>
          <Column spaceTop>
            <Text>Experience side-effect from their medication?</Text>
            <RadioButton.Group value="yes" onValueChange={() => {}}>
              <View style={{flexDirection: 'row'}}>
                <RadioButton.Item label="Yes" value="yes" />
                <RadioButton.Item label="No" value="no" />
              </View>
            </RadioButton.Group>
          </Column>
          <Column>
            <Text>Does patient understand their treatment regimen?</Text>
            <RadioButton.Group value="yes" onValueChange={() => {}}>
              <View style={{flexDirection: 'row'}}>
                <RadioButton.Item label="Yes" value="yes" />
                <RadioButton.Item label="No" value="no" />
              </View>
            </RadioButton.Group>
          </Column>
        </Section>
        {/* Knowing Co-morbidities Status */}
        <Section
          title="General questions"
          desc="Highlights activities that might influence adherence ">
          <Column>
            <Text>Highest education level?</Text>
            <RadioButton.Group value="yes" onValueChange={() => {}}>
              <View style={{flexDirection: 'row'}}>
                <RadioButton.Item label="Yes" value="yes" />
                <RadioButton.Item label="No" value="no" />
              </View>
            </RadioButton.Group>
          </Column>
          <Column>
            <Text>Does the patient currently have a job?</Text>
            <RadioButton.Group value="yes" onValueChange={() => {}}>
              <View style={{flexDirection: 'row'}}>
                <RadioButton.Item label="Yes" value="yes" />
                <RadioButton.Item label="No" value="no" />
              </View>
            </RadioButton.Group>
          </Column>
          <Column>
            <Text>Does the patient share drugs with friends and family?</Text>
            <RadioButton.Group value="yes" onValueChange={() => {}}>
              <View style={{flexDirection: 'row'}}>
                <RadioButton.Item label="Yes" value="yes" />
                <RadioButton.Item label="No" value="no" />
              </View>
            </RadioButton.Group>
          </Column>
        </Section>
        {/* ARV */}
      </ScrollView>
      <Block>
        <Button mode="contained" onPress={$.onNext} icon="arrow-right">
          Finish up: Conclude Visit
        </Button>
      </Block>
    </Layout>
  );
}
