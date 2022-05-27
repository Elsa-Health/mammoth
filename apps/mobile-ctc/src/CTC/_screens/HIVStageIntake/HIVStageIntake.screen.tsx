import React from 'react';

import {Layout, Text} from '@elsa-ui/react-native/components';
import {useTheme} from '@elsa-ui/react-native/theme';
import {ScrollView, View} from 'react-native';
import {Button, Checkbox, RadioButton} from 'react-native-paper';
import {Block, Column, MultiSelect, Row, Section} from '../../temp-components';

import {ARV, CTC, Medication} from 'elsa-health-data-fns';
import produce from 'immer';
import {WorkflowScreenProps} from '@elsa-ui/react-native-workflows';

const ion = (p: [string, string][]) => p.map(([k, v]) => ({id: k, name: v}));

export default function HIVStageIntakeScreen({
  actions: $,
}: WorkflowScreenProps<{}, {onNext: () => void}>) {
  const {spacing} = useTheme();
  const [state, set] = React.useState(() => ({
    coMorbidities: [] as any[],
  }));

  return (
    <Layout title="Understanding HIV Status" style={{padding: 0}}>
      <ScrollView
        contentContainerStyle={{padding: spacing.md}}
        style={{flex: 1}}>
        {/* Early HIV signs */}

        <Section
          title="Current Situation"
          desc="Decribe the patient's HIV situation by answering the following."
          mode="raised">
          <Column>
            <Text>Current W.H.O. Stage</Text>
          </Column>
          <Column>
            <Text>Patient functional status</Text>
          </Column>
        </Section>
        {/* Knowing Co-morbidities Status */}
        <Section
          title="Co-morbidities"
          desc="Does the patient have any known co-morbidities? "
          spaceTop>
          <MultiSelect
            confirmText={'Confirm'}
            items={[
              {
                name: 'Co-Morbidities',
                id: 1,
                children: ion(CTC.coMorbidity.pairs()),
              },
            ]}
            uniqueKey="id"
            searchPlaceholderText={'Search Co-Morbidities'}
            selectText={'Select if any'}
            onSelectedItemsChange={(comorbidities: CTC.CoMorbidity[]) => {
              set(p =>
                produce(p, d => {
                  d.coMorbidities = comorbidities;
                }),
              );
            }}
            selectedItems={state.coMorbidities}
          />
        </Section>
        {/* ARV */}
        <Section title="ARV and Co-Medication">
          <Column>
            <Text>Is Patient taking ARVs?</Text>
            <RadioButton.Group value="yes" onValueChange={() => {}}>
              <View style={{flexDirection: 'row'}}>
                <RadioButton.Item label="Yes" value="yes" />
                <RadioButton.Item label="No" value="no" />
              </View>
            </RadioButton.Group>
          </Column>
          <Column>
            <Text style={{lineHeight: 20}}>
              Is patient taking other medication which are not ARVs?
            </Text>
            <RadioButton.Group value="yes" onValueChange={() => {}}>
              <View style={{flexDirection: 'row'}}>
                <RadioButton.Item label="Yes" value="yes" />
                <RadioButton.Item label="No" value="no" />
              </View>
            </RadioButton.Group>
          </Column>
        </Section>
        <Section mode="raised" noPad>
          <Checkbox.Item
            style={{padding: 0, margin: 0}}
            label="Check patient symptoms?"
            status={true ? 'checked' : 'unchecked'}
            onPress={() => {}}
          />
        </Section>
      </ScrollView>
      <Block>
        <Button mode="contained" onPress={$.onNext} icon="arrow-right">
          Next: Patient Adherence
        </Button>
      </Block>
    </Layout>
  );
}
