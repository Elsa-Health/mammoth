import React from 'react';

import {Layout, Text} from '@elsa-ui/react-native/components';
import {useTheme} from '@elsa-ui/react-native/theme';
import {ScrollView, View} from 'react-native';
import {Block, Column, Row, Section, TitledItem} from '../../temp-components';
import {WorkflowScreenProps} from '@elsa-ui/react-native-workflows';
import {Patient} from '../../../emr-types/v1/personnel';
import {Button, IconButton} from 'react-native-paper';
import {Visit} from '../../../emr-types/v1/visit';

export default function ViewVisitScreen({
  actions: $,
}: WorkflowScreenProps<
  {patient: Patient; visit: Visit},
  {
    onNext: () => void;
    getInvestigationResult: (invRequest: any) => Promise<any>;
  }
>) {
  const {spacing} = useTheme();

  return (
    <Layout title="Visit" style={{padding: 0}}>
      <ScrollView
        contentContainerStyle={{paddingHorizontal: spacing.md}}
        style={{flex: 1}}>
        {/* Past Visits */}
        <Section spaceTop mode="raised">
          <Row icon="calendar">
            <Text>Date of Visit</Text>
            <Text font="bold">26, April 2022</Text>
          </Row>
        </Section>
        <Section title="Details">
          <Text>Something</Text>
        </Section>
        <Section title="Investigations">
          <Text>Investigation A: A-result</Text>
        </Section>
      </ScrollView>
    </Layout>
  );
}
