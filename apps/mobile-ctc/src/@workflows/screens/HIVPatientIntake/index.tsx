import React from 'react';
import {ScrollView, View} from 'react-native';
import {AltLayout as Layout, Text} from '../../../@libs/elsa-ui/components';
import {Picker} from '@react-native-picker/picker';
import produce from 'immer';
import {Spacing} from '../../../@libs/elsa-ui/theme';
import * as data from '../../../@libs/data-fns';

import {SectionedSelect} from '../../../@libs/elsa-ui/components';
import {Button, Divider, RadioButton} from 'react-native-paper';
import {WorkflowScreen} from '../..';

const ARV_WHO_STAGES = ['Stage 1', 'Stage 2', 'Stage 3', 'Stage 4'];
const FUNCTIONAL_STATUS = ['Working', 'Ambulatory', 'Bedridden'];

export type HIVPatientIntake = {
  whoStage: string;
  functionalStatus: string;
  coMorbidities: string[];
  isTakingARV: boolean;
  ARVRegimens: string[];
  isTakingMedications: boolean;
  medications: string[];
};

export default function HIVPatientIntakeScreen({
  actions: $,
}: WorkflowScreen<{}, {onNext: (hivInfoIntake: HIVPatientIntake) => void}>) {
  const [patientIntake, set] = React.useState<HIVPatientIntake>({
    whoStage: ARV_WHO_STAGES[0],
    functionalStatus: FUNCTIONAL_STATUS[0],
    coMorbidities: [],
    isTakingARV: false,
    ARVRegimens: [],
    isTakingMedications: false,
    medications: [],
  });

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
  return (
    <Layout title="Patient Intake" style={{padding: 0}}>
      <ScrollView contentContainerStyle={{paddingHorizontal: Spacing.md}}>
        <View>
          {/* WHO Stage */}
          <View style={{marginTop: 12}}>
            <Text>WHO Stage</Text>
            <Picker
              selectedValue={patientIntake.whoStage}
              onValueChange={(itemValue, itemIndex) =>
                changeValue('whoStage')(itemValue)
              }>
              {ARV_WHO_STAGES.map(stage => {
                return <Picker.Item key={stage} label={stage} value={stage} />;
              })}
            </Picker>
          </View>
          {/* Functional Status */}
          <View style={{marginTop: 12}}>
            <Text>Functional Status</Text>
            <Picker
              selectedValue={patientIntake.functionalStatus}
              onValueChange={(itemValue, itemIndex) =>
                changeValue('functionalStatus')(itemValue)
              }>
              {FUNCTIONAL_STATUS.map(stage => {
                return <Picker.Item key={stage} label={stage} value={stage} />;
              })}
            </Picker>
          </View>
          {/* Known Co-Morbidities */}

          <View style={{marginVertical: 12}}>
            <Text font="bold">Known Co-Morbidities</Text>
            <Text style={{paddingVertical: 6}}>
              Please indicate any new known conditions the patient has at the
              time of this visit:
            </Text>
            <SectionedSelect
              confirmText={'Confirm'}
              items={[
                {
                  name: 'Co-Morbidities',
                  id: 1,
                  children: data.investigation.name.values(),
                },
              ]}
              uniqueKey="id"
              searchPlaceholderText={'Search Co-Morbidities'}
              selectText={'Select if any'}
              onSelectedItemsChange={(testIds: string[]) => {
                changeValue('coMorbidities')(testIds);
              }}
              selectedItems={patientIntake.coMorbidities}
            />
          </View>
          <Divider />
          {/* Sections */}
          <View style={{marginTop: 12}}>
            <Text font="bold">ARV Treatment and Co-Medications</Text>

            <View style={{marginTop: 12}}>
              <Text>Is the patient taking ARV at the time of visit?</Text>
              <RadioButton.Group
                onValueChange={val =>
                  changeValue('isTakingARV')(val === 'yes' ? true : false)
                }
                value={patientIntake.isTakingARV ? 'yes' : 'no'}>
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

            {patientIntake.isTakingARV && (
              <View>
                <Text>Choose ARV Regimen Combination</Text>
                <SectionedSelect
                  confirmText={'Confirm'}
                  items={[
                    {
                      name: 'ARV Combination Regimen',
                      id: 1,
                      children: data.investigation.name.values(),
                    },
                  ]}
                  uniqueKey="id"
                  searchPlaceholderText={'Search ARV Combination Regimen'}
                  selectText={'Select if any'}
                  onSelectedItemsChange={(testIds: string[]) => {
                    changeValue('ARVRegimens')(testIds);
                  }}
                  selectedItems={patientIntake.ARVRegimens}
                />
              </View>
            )}
            <View style={{marginTop: 12}}>
              <Text style={{lineHeight: 20}}>
                Is the patient taking any other medications in addition to the
                ARV?
              </Text>
              <RadioButton.Group
                onValueChange={val =>
                  changeValue('isTakingMedications')(
                    val === 'yes' ? true : false,
                  )
                }
                value={patientIntake.isTakingMedications ? 'yes' : 'no'}>
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

            {patientIntake.isTakingMedications && (
              <View>
                <Text>Which Medications are they taking?</Text>
                <SectionedSelect
                  confirmText={'Confirm'}
                  items={[
                    {
                      name: 'Medications',
                      id: 1,
                      children: data.medications.all.values(),
                    },
                  ]}
                  uniqueKey="id"
                  searchPlaceholderText={'Search Medications'}
                  selectText={'Select if any'}
                  onSelectedItemsChange={(testIds: string[]) => {
                    changeValue('medications')(testIds);
                  }}
                  selectedItems={patientIntake.medications}
                />
              </View>
            )}
          </View>
        </View>

        <View style={{marginVertical: Spacing.md}}>
          <Button mode="contained" onPress={() => $.onNext(patientIntake)}>
            Next
          </Button>
        </View>
      </ScrollView>
    </Layout>
  );
}
