import React from 'react';

import {Layout, Text} from '@elsa-ui/react-native/components';
import {useTheme} from '@elsa-ui/react-native/theme';
import {ScrollView, View} from 'react-native';
import {Block, Column, Row, Section, TitledItem} from '../../temp-components';
import {WorkflowScreenProps} from '@elsa-ui/react-native-workflows';
import {Patient} from '../../../emr-types/v1/personnel';
import {IconButton} from 'react-native-paper';

export default function PatientDashboardScreen({
  actions: $,
}: WorkflowScreenProps<{patient: Patient}, {onNext: () => void}>) {
  const {spacing} = useTheme();

  return (
    <Layout title="Patient Dashboard" style={{padding: 0}}>
      <ScrollView
        contentContainerStyle={{padding: spacing.md}}
        style={{flex: 1}}>
        <Section
          mode="raised"
          title="Patient"
          desc="Information about the patient"
          removeLine
          right={
            <IconButton
              icon="phone"
              size={20}
              color="#4665af"
              onPress={() => console.log('Calling patient...')}
            />
          }>
          <Column>
            <TitledItem title="Name">Something</TitledItem>
            <TitledItem spaceTop title="Facility">
              Unknown
            </TitledItem>
          </Column>
        </Section>
        {/* Past Visits */}
        <Section title="Appointments" removeLine spaceTop>
          <View>
            <Text>Appointment</Text>
          </View>
        </Section>
        {/* Past Visits */}
        <Section
          title="Past Visits"
          desc="Visits associated with the patients"
          spaceTop>
          <Text>Something here</Text>
        </Section>
      </ScrollView>
    </Layout>
  );
}
