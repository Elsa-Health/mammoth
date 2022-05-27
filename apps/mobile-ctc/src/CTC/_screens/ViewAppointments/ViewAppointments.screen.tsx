import React from 'react';

import {Layout, Text} from '@elsa-ui/react-native/components';
import {useTheme} from '@elsa-ui/react-native/theme';
import {ScrollView, View} from 'react-native';
import {Button, RadioButton, TextInput} from 'react-native-paper';
import {Block, Column, Row, Section} from '../../temp-components';
import {WorkflowScreenProps} from '@elsa-ui/react-native-workflows';

const ion = (p: [string, string][]) => p.map(([k, v]) => ({id: k, name: v}));

export default function ViewAppointmentsScreen({
  actions: $,
}: WorkflowScreenProps<{}, {onNext: () => void}>) {
  const {spacing} = useTheme();
  const [state, set] = React.useState(() => ({
    coMorbidities: [] as any[],
  }));

  return (
    <Layout title="Appointments" style={{padding: 0}}>
      <ScrollView
        contentContainerStyle={{paddingHorizontal: spacing.md}}
        style={{flex: 1}}>
        {/* Missed Appointments */}
        <Section
          title="Missed Appointments"
          desc="Here are the missed appointments"></Section>
        {/* Upcoming appointments */}
        <Section
          title="Upcoming Appointments"
          desc="Here are the upcoming appointments"></Section>
        {/* Upcoming appointments */}
        <Section
          title="Other Appointments"
          desc="Here are the other appointments"></Section>
      </ScrollView>
    </Layout>
  );
}
