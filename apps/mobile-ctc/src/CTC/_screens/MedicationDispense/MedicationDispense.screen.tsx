import React from 'react';

import {Layout, Text} from '@elsa-ui/react-native/components';
import {useTheme} from '@elsa-ui/react-native/theme';
import {ScrollView, View} from 'react-native';
import {Button, RadioButton, TextInput} from 'react-native-paper';
import {Block, Column, Row, Section} from '../../temp-components';
import {WorkflowScreenProps} from '@elsa-ui/react-native-workflows';
import {MedicaDisp} from '../../emr';

const ion = (p: [string, string][]) => p.map(([k, v]) => ({id: k, name: v}));

export default function MedicationDispenseScreen({
  actions: $,
}: WorkflowScreenProps<
  {},
  {getMedicationDispenses: () => Promise<MedicaDisp[]>}
>) {
  const {spacing} = useTheme();
  return (
    <Layout title="Medication Dispenses" style={{padding: 0}}>
      <ScrollView
        contentContainerStyle={{paddingHorizontal: spacing.md}}
        style={{flex: 1}}>
        {/* Missed Appointments */}
        <Section
          title="Requests responded"
          desc="List of medication requests accepted">
          <Text>Responses</Text>
        </Section>
      </ScrollView>
    </Layout>
  );
}
