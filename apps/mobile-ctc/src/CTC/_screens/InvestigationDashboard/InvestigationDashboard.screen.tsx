import React from 'react';

import {Layout, Text} from '@elsa-ui/react-native/components';
import {useTheme} from '@elsa-ui/react-native/theme';
import {ScrollView, View} from 'react-native';
import {Block, Column, Row, Section} from '../../temp-components';
import {WorkflowScreenProps} from '@elsa-ui/react-native-workflows';

export default function InvestigationDashboardScreen({
  actions: $,
}: WorkflowScreenProps<{}, {onNext: () => void}>) {
  const {spacing} = useTheme();

  return (
    <Layout title="Investigations" style={{padding: 0}}>
      <ScrollView
        contentContainerStyle={{padding: spacing.md}}
        style={{flex: 1}}>
        <Text font="bold" style={{lineHeight: 20}}>
          Investigations Dashboard
        </Text>
        {/* Visits */}
        <Block>
          <Text>Visits here!</Text>
        </Block>
      </ScrollView>
    </Layout>
  );
}
