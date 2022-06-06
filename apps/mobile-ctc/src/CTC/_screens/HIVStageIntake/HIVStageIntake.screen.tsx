import React from 'react';

import {Layout, Text} from '@elsa-ui/react-native/components';
import {useTheme} from '@elsa-ui/react-native/theme';
import {ScrollView, View} from 'react-native';
import {Button, Checkbox, RadioButton} from 'react-native-paper';
import {Block, Column, MultiSelect, Row, Section} from '../../temp-components';

import {ARV, CTC, Medication} from 'elsa-health-data-fns';
import produce from 'immer';
import {WorkflowScreenProps} from '@elsa-ui/react-native-workflows';
import {Controller, useForm} from 'react-hook-form';

const ion = (p: [string, string][]) => p.map(([k, v]) => ({id: k, name: v}));

export type HIVPatientIntake = {
  coMorbidities: CTC.CoMorbidity[];
  isTakingARV: boolean;
  ARVRegimens: ARV.Regimen[];
  regimenDuration?: string | undefined;
  isTakingMedications: boolean;
  medications: Medication.All[];
};

export default function HIVStageIntakeScreen({
  entry: {value},
  actions: $,
}: WorkflowScreenProps<
  {
    value: HIVPatientIntake;
  },
  {
    onNext: (
      values: HIVPatientIntake,
      isPerformingSymptomAssessment: boolean,
    ) => void;
  }
>) {
  const {spacing} = useTheme();
  const {handleSubmit, control} = useForm({
    defaultValues: value ?? {
      coMorbidities: [],
      isTakingARV: false,
      ARVRegimens: [],
      regimenDuration: undefined,
      isTakingMedications: false,
      medications: [],
    },
  });

  const [isPerformSymptomAssessment, set] = React.useState(false);

  const onSubmitWithAssessment = React.useCallback(
    (isPerformSA: boolean) =>
      handleSubmit(values => $.onNext(values, isPerformSA)),
    [$.onNext, handleSubmit],
  );

  return (
    <Layout title="Current HIV Status" style={{padding: 0}}>
      <ScrollView
        contentContainerStyle={{padding: spacing.md}}
        style={{flex: 1}}>
        {/* Knowing Co-morbidities Status */}
        <Section
          title="Co-morbidities"
          desc="Does the patient have any known co-morbidities? ">
          <Controller
            control={control}
            name="coMorbidities"
            render={({field}) => (
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
                onSelectedItemsChange={field.onChange}
                selectedItems={field.value}
              />
            )}
          />
        </Section>
        {/* ARV */}
        <Section title="ARV and Co-Medication">
          <Column>
            <Text>Is Patient taking ARVs?</Text>
            <Controller
              control={control}
              name="isTakingARV"
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
                      control={control}
                      name="ARVRegimens"
                      render={({field}) => (
                        <MultiSelect
                          confirmText={'Confirm'}
                          items={[
                            {
                              name: 'ARV Regimens',
                              id: 1,
                              children: ion(ARV.regimen.pairs()),
                            },
                          ]}
                          uniqueKey="id"
                          searchPlaceholderText={'Search Co-Morbidities'}
                          selectText={'Select if any'}
                          onSelectedItemsChange={field.onChange}
                          selectedItems={field.value}
                        />
                      )}
                    />
                  )}
                </>
              )}
            />
          </Column>
          <Column spaceTop>
            <Text style={{lineHeight: 20}}>
              Is patient taking other medication which are not ARVs?
            </Text>
            <Controller
              control={control}
              name="isTakingMedications"
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
                      control={control}
                      name="medications"
                      render={({field}) => (
                        <MultiSelect
                          confirmText={'Confirm'}
                          items={[
                            {
                              name: 'Medication',
                              id: 1,
                              children: ion(Medication.all.pairs()),
                            },
                          ]}
                          uniqueKey="id"
                          searchPlaceholderText={'Search Co-Morbidities'}
                          selectText={'Select if any'}
                          onSelectedItemsChange={field.onChange}
                          selectedItems={field.value}
                        />
                      )}
                    />
                  )}
                </>
              )}
            />
          </Column>
        </Section>
        <Section mode="raised" noPad>
          <Checkbox.Item
            style={{padding: 0, margin: 0}}
            label="Check patient symptoms?"
            status={isPerformSymptomAssessment ? 'checked' : 'unchecked'}
            onPress={() => set(s => !s)}
          />
        </Section>
      </ScrollView>
      <Block>
        <Button
          mode="contained"
          onPress={onSubmitWithAssessment(isPerformSymptomAssessment)}
          icon="arrow-right">
          Next: Patient Adherence
        </Button>
      </Block>
    </Layout>
  );
}
