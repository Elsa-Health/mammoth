import produce from 'immer';
import React from 'react';
import {ScrollView, View} from 'react-native';
import {Button} from 'react-native-paper';
import {WorkflowScreen} from '../..';
import {AltLayout as Layout, Text} from '../../../@libs/elsa-ui/components';
import {Spacing} from '../../../@libs/elsa-ui/theme';

export type HIVDispenseMedication = {};
export default function HIVDispenseMedicationScreen({
  actions: $,
}: WorkflowScreen<{}, {onNext: (medsData: HIVDispenseMedication) => void}>) {
  const [meds, set] = React.useState<HIVDispenseMedication>({});

  const changeValue = React.useCallback(
    <K extends keyof HIVDispenseMedication>(field: K) =>
      (value: HIVDispenseMedication[K]) => {
        set(s =>
          produce(s, df => {
            df[field] = value;
          }),
        );
      },
    [set],
  );

  return (
    <Layout title="Dispense Medication">
      <ScrollView>
        <Text style={{}}>
          Based on the assessment, we recommend the following medications for
          your patient.
        </Text>
        <View style={{marginVertical: Spacing.md}}>
          <Button mode="contained" onPress={() => $.onNext(meds)}>
            Next
          </Button>
        </View>
      </ScrollView>
    </Layout>
  );
}
