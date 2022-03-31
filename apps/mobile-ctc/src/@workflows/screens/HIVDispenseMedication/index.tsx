import produce from 'immer';
import React from 'react';
import {ScrollView, View, ViewProps} from 'react-native';
import {Button, Divider} from 'react-native-paper';
import {WorkflowScreen} from '../..';
import {
  AltLayout as Layout,
  SectionedSelect,
  Text,
} from '../../../@libs/elsa-ui/components';
import {Spacing} from '../../../@libs/elsa-ui/theme';

import {CTC, Medication} from '@elsa-health/data-fns';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {Picker} from '@react-native-picker/picker';

function Section({
  title,
  children,
  style,
}: {
  title?: string;
  children: React.ReactNode;
  style?: ViewProps['style'];
}) {
  return (
    <View style={style}>
      {title && <Text font="bold">{title}</Text>}
      <View style={{marginVertical: Spacing.sm}}>{children}</View>
    </View>
  );
}

export type HIVDispenseMedication<M extends string> = {
  medications: M[];
  status: CTC.Status | undefined;
  reason?: string | undefined;
};

type M = Medication.All;
export default function HIVDispenseMedicationScreen({
  entry: {recommended: {treatments, status} = {}, value},
  actions: $,
}: WorkflowScreen<
  {
    recommended: Partial<
      Omit<CTC.NextStepsObject, 'tests' | 'counselingRecommendations'>
    >;
    value?: HIVDispenseMedication<M>;
  },
  {
    getMedicationList: () => Array<{id: M; name: string}>;
    getMedicationText: (investigation: M) => string;
    onSave: (medsData: HIVDispenseMedication<M>) => void;
    onGoBack: () => void;
  }
>) {
  const [state, set] = React.useState<HIVDispenseMedication<M>>(
    produce((value || {}) as HIVDispenseMedication<M>, draft => {
      draft.medications = draft?.medications ?? [];
      draft.status = draft?.status ?? undefined;
    }),
  );

  const changeValue = React.useCallback(
    <K extends keyof HIVDispenseMedication<M>>(field: K) =>
      (value: HIVDispenseMedication<M>[K]) => {
        set(s =>
          produce(s, df => {
            df[field] = value;
          }),
        );
      },
    [set],
  );

  const showRecommendedTests =
    treatments !== undefined && treatments?.length > 0;
  return (
    <Layout title="Dispense Medications" style={{padding: 0}}>
      <ScrollView contentContainerStyle={{paddingHorizontal: Spacing.md}}>
        <View>
          <Text></Text>
        </View>
        {/* Medications */}

        <Section title="Medications Recommendations">
          {treatments !== undefined && treatments?.length > 0 && (
            <>
              <Text>
                Based on the assessment, we recommend the following medications
                for your patient.
              </Text>
              <View style={{paddingVertical: Spacing.md}}>
                {treatments.map((cr, ix) => (
                  <View
                    key={cr}
                    style={{
                      marginVertical: Spacing.xs,
                      display: 'flex',
                      flexDirection: 'row',
                      alignItems: 'center',
                    }}>
                    <Icon name="check" size={18} />
                    <Text style={{marginHorizontal: Spacing.md}}>{cr}</Text>
                  </View>
                ))}
              </View>
            </>
          )}
          <View>
            <Text>Please indicate the medications to patient</Text>
            <SectionedSelect
              confirmText={'Confirm'}
              items={[
                {
                  name: 'Investigations',
                  id: 1,
                  children: $.getMedicationList(),
                },
              ]}
              uniqueKey="id"
              searchPlaceholderText={'Search Investigations'}
              selectText={'Search'}
              onSelectedItemsChange={(testIds: M[]) => {
                changeValue('medications')(testIds);
              }}
              selectedItems={state.medications}
            />
          </View>
        </Section>
        {/* ARVs */}
        <Section title="ARV Recommendations" style={{marginVertical: 8}}>
          {status !== undefined && (
            <>
              <Text style={{lineHeight: 20, marginBottom: Spacing.md}}>
                Based on the assessment, it is recommended to{' '}
                <Text font="bold" italic>
                  {CTC.status.fromKey(status)}
                </Text>
              </Text>
              <Divider />
            </>
          )}
          <View style={{marginVertical: Spacing.md}}>
            <Text>What decision is made about the patient ARVs?</Text>
            <Picker
              selectedValue={state.status}
              onValueChange={(itemValue, itemIndex) =>
                changeValue('status')(itemValue)
              }>
              <Picker.Item value={undefined} label="Make a choice" />
              {CTC.status.pairs().map(([k, v]) => {
                return <Picker.Item key={k} label={v} value={k} />;
              })}
            </Picker>
          </View>
          {state.status !== undefined &&
            CTC.status.reason.fromKey(state.status) !== undefined &&
            CTC.status.reason.fromKey(state.status).length > 0 && (
              <View>
                <Text>What is the reason for this decision?</Text>
                <Picker
                  selectedValue={state.reason}
                  onValueChange={(itemValue, itemIndex) =>
                    changeValue('reason')(itemValue)
                  }>
                  <Picker.Item value={undefined} label="Make a choice" />
                  {CTC.status.reason.fromKey(state.status).map((v, ix) => {
                    return <Picker.Item key={ix} label={v} value={v} />;
                  })}
                </Picker>
                {/* <Text>{CTC.status.reason.fromKey(state.status).join(', ')}</Text> */}
              </View>
            )}
        </Section>
        <View style={{marginVertical: Spacing.md}}>
          <Button onPress={$.onGoBack}>Go Back</Button>
          <Button
            mode="contained"
            style={{marginTop: 8}}
            onPress={() => $.onSave(state)}>
            Save Medications
          </Button>
        </View>
      </ScrollView>
    </Layout>
  );
}
