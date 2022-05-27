import React from 'react';

import {Layout, Text} from '@elsa-ui/react-native/components';
import {useTheme} from '@elsa-ui/react-native/theme';
import {ScrollView, View} from 'react-native';
import {Block, Column, Row, Section} from '../../temp-components';
import {WorkflowScreenProps} from '@elsa-ui/react-native-workflows';

export default function ViewVisitsScreen({
  actions: $,
}: WorkflowScreenProps<{}, {onNext: () => void}>) {
  const {spacing} = useTheme();
  const [state, set] = React.useState(() => ({
    coMorbidities: [] as any[],
  }));

  return (
    <Layout title="My Visits" style={{padding: 0}}>
      <ScrollView
        contentContainerStyle={{padding: spacing.md}}
        style={{flex: 1}}>
        <Text font="bold" style={{lineHeight: 20}}>
          Here are the visits that you've made so far. This doesn't have to
          include patients in your faciilty
        </Text>
        {/* Visits */}
        <Block>
          <Text>Visits here!</Text>
        </Block>
      </ScrollView>
    </Layout>
  );
}
