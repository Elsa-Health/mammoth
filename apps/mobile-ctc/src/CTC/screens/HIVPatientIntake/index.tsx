import React from 'react';
import {ScrollView, View} from 'react-native';
import {
  AltLayout as Layout,
  Picker,
  Text,
} from '../../../@libs/elsa-ui/components';
// import {Picker} from '@react-native-picker/picker';
import produce from 'immer';
import {DefaultSpacing} from '../../../@libs/elsa-ui/theme';

import {SectionedSelect} from '../../../@libs/elsa-ui/components';
import {Button, Checkbox, Divider, RadioButton} from 'react-native-paper';
import {WorkflowScreen} from '../../../@workflows';
import {ARV, CTC, Medication} from 'elsa-health-data-fns';

const ARV_WHO_STAGES = ['Stage 1', 'Stage 2', 'Stage 3', 'Stage 4'];
const FUNCTIONAL_STATUS = ['Working', 'Ambulatory', 'Bedridden'];

export type HIVPatientIntake = {
  whoStage: string;
  functionalStatus: string;
  coMorbidities: CTC.CoMorbidity[];
  isTakingARV: boolean;
  ARVRegimens: ARV.Regimen[];
  regimenDuration?: string | undefined;
  isTakingMedications: boolean;
  medications: Medication.All[];
};

const ion = (p: [string, string][]) => p.map(([k, v]) => ({id: k, name: v}));

export default function HIVPatientIntakeScreen({
  entry: {value = {}},
  actions: $,
}: WorkflowScreen<
  {
    value: Partial<HIVPatientIntake>;
  },
  {onNext: (hivInfoIntake: HIVPatientIntake, isAssessment: boolean) => void}
>) {
  const [patientIntake, set] = React.useState<HIVPatientIntake>({
    whoStage: value.whoStage ?? ARV_WHO_STAGES[0],
    functionalStatus: value.functionalStatus ?? FUNCTIONAL_STATUS[0],
    coMorbidities: value.coMorbidities ?? [],
    isTakingARV: value.isTakingARV ?? false,
    ARVRegimens: value.ARVRegimens ?? [],
    regimenDuration: undefined,
    isTakingMedications: value.isTakingARV ?? false,
    medications: value.medications ?? [],
  });

  const changeValue = React.useCallback(
    <P extends HIVPatientIntake, K extends keyof P>(field: K) =>
      (value: P[K]) => {
        set(s =>
          produce(s, df => {
            // @ts-ignore
            df[field] = value;
          }),
        );
      },
    [set],
  );

  // React.useEffect(() => {
  //   console.log('--> [ENTERED]: HIVPatientIntakeScreen');
  //   return () => console.log('--> [EXIT]: HIVPatientIntakeScreen');
  // }, []);

  const [isAssessment, setIsAssessment] = React.useState(false);
  return (
    <Layout title="Patient Intake" style={{padding: 0}}>
      <ScrollView
        contentContainerStyle={{paddingHorizontal: DefaultSpacing.md}}>
        <View>
          {/* WHO Stage */}
          <View style={{marginTop: 12}}>
            <Text>WHO Stage</Text>
            <Picker
              selectedKey={patientIntake.whoStage}
              onChangeValue={changeValue('whoStage')}
              renderText={text => (text ? text : 'Not selected')}
              items={[undefined, ...ARV_WHO_STAGES]}
            />
            {/* <Picker
              selectedValue={patientIntake.whoStage}
              onValueChange={(itemValue, itemIndex) =>
                changeValue('whoStage')(itemValue)
              }>
              {ARV_WHO_STAGES.map(stage => {
                return <Picker.Item key={stage} label={stage} value={stage} />;
              })}
            </Picker> */}
          </View>
          {/* Functional Status */}
          <View style={{marginTop: 12}}>
            <Text>Functional Status</Text>
            <Picker
              selectedKey={patientIntake.functionalStatus}
              onChangeValue={changeValue('functionalStatus')}
              renderText={text => (text ? text : 'Not selected')}
              items={[undefined, ...FUNCTIONAL_STATUS]}
            />
            {/* <Picker
              selectedValue={patientIntake.functionalStatus}
              onValueChange={(itemValue, itemIndex) =>
                changeValue('functionalStatus')(itemValue)
              }>
              {FUNCTIONAL_STATUS.map(stage => {
                return <Picker.Item key={stage} label={stage} value={stage} />;
              })}
            </Picker> */}
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
                  children: ion(CTC.coMorbidity.pairs()),
                },
              ]}
              uniqueKey="id"
              searchPlaceholderText={'Search Co-Morbidities'}
              selectText={'Select if any'}
              onSelectedItemsChange={(comorbidities: CTC.CoMorbidity[]) => {
                changeValue('coMorbidities')(comorbidities);
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
              <>
                <View>
                  <Text>Choose ARV Regimen Combination</Text>
                  <SectionedSelect
                    confirmText={'Confirm'}
                    items={[
                      {
                        name: 'ARV Combination Regimen',
                        id: 1,
                        children: ion(ARV.regimen.pairs()),
                      },
                    ]}
                    uniqueKey="id"
                    searchPlaceholderText={'Search ARV Combination Regimen'}
                    selectText={'Select if any'}
                    onSelectedItemsChange={(regimens: ARV.Regimen[]) => {
                      changeValue('ARVRegimens')(regimens);
                    }}
                    selectedItems={patientIntake.ARVRegimens}
                  />
                </View>
                {patientIntake.ARVRegimens.length > 0 && (
                  <View style={{marginTop: 12}}>
                    <Text style={{lineHeight: 20}}>
                      What is the duration of the ARVs?
                    </Text>
                    <RadioButton.Group
                      onValueChange={changeValue('regimenDuration')}
                      value={patientIntake.regimenDuration ?? 'NILL'}>
                      <View
                        style={{
                          display: 'flex',
                          flexDirection: 'row',
                          justifyContent: 'space-evenly',
                        }}>
                        <RadioButton.Item label="Unspecified" value={'NILL'} />
                        <RadioButton.Item label="1 month" value={'1 month'} />
                        <RadioButton.Item label="3 months" value={'3 months'} />
                      </View>
                    </RadioButton.Group>
                  </View>
                )}
              </>
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
                      children: ion(Medication.all.pairs()),
                    },
                  ]}
                  uniqueKey="id"
                  searchPlaceholderText={'Search Medications'}
                  selectText={'Select if any'}
                  onSelectedItemsChange={(testIds: Medication.All[]) => {
                    changeValue('medications')(testIds);
                  }}
                  selectedItems={patientIntake.medications}
                />
              </View>
            )}
          </View>
        </View>

        <View>
          <Checkbox.Item
            label="Does the patients have any symptoms today?"
            status={isAssessment ? 'checked' : 'unchecked'}
            onPress={() => {
              setIsAssessment(!isAssessment);
            }}
          />
        </View>

        <View style={{marginVertical: DefaultSpacing.md}}>
          <Button
            mode="contained"
            onPress={() => $.onNext(patientIntake, isAssessment)}>
            Next
          </Button>
        </View>
      </ScrollView>
    </Layout>
  );
}
