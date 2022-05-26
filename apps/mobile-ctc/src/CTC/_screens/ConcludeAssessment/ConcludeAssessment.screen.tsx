import React from 'react';

import {Layout, Text} from '@elsa-ui/react-native/components';
import {useTheme} from '@elsa-ui/react-native/theme';
import {ScrollView, View} from 'react-native';
import {Button, Checkbox, RadioButton} from 'react-native-paper';
import {
  Block,
  Column,
  MultiSelect,
  Row,
  Section,
  SimpleDate,
} from '../../temp-components';

import {ARV, CTC, Medication} from 'elsa-health-data-fns';
import produce from 'immer';

const ion = (p: [string, string][]) => p.map(([k, v]) => ({id: k, name: v}));

export default function ConcludeAssessmentScreen() {
  const {spacing} = useTheme();
  const [state, set] = React.useState(() => ({
    coMorbidities: [] as any[],
  }));

  return (
    <Layout title="Concluding Assessment" style={{padding: 0}}>
      <ScrollView
        contentContainerStyle={{paddingHorizontal: spacing.md}}
        style={{flex: 1}}>
        {/* Early HIV signs */}
        <Section
          title="Make an appointment"
          desc="Set a future date that patient take next treatment.">
          <Column>
            <SimpleDate />
            <Button onPress={() => console.log('Selct date')}>
              Or / Select Date
            </Button>
          </Column>
        </Section>
        {/* Knowing Co-morbidities Status */}
        <Section
          title="Request Investigations"
          desc="Order investigations to be done for the patient">
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

        <Section
          title="Risk of Non-Adherence"
          desc="Chances of the patient not adhereing to treatment."
          mode="raised">
          <Column>
            <Text>Won't adhere</Text>
          </Column>
        </Section>
        {/* Knowing Co-morbidities Status */}
        <Block
          bg="#4665af10"
          borderTop
          style={{marginHorizontal: -spacing.md, marginVertical: spacing.md}}>
          <Section
            style={{backgroundColor: undefined}}
            title="Recommendations"
            desc="Higlight next steps you advice the patient to take"
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
          <Section
            style={{backgroundColor: undefined}}
            title="ARV and Co-Medication">
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
        </Block>
      </ScrollView>
      <Block>
        <Row>
          <Button
            mode="outlined"
            onPress={() => console.log('Discard')}
            style={{flex: 1, marginRight: 8}}
            icon="close">
            Discard
          </Button>
          <Button
            mode="contained"
            onPress={() => {}}
            style={{flex: 1}}
            icon="check">
            Finish
          </Button>
        </Row>
      </Block>
    </Layout>
  );
}
