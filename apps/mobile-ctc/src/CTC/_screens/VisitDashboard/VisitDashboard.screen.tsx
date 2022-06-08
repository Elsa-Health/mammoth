import {WorkflowScreenProps} from '@elsa-ui/react-native-workflows';
import {Layout, Text} from '@elsa-ui/react-native/components';
import {useTheme} from '@elsa-ui/react-native/theme';
import React from 'react';
import {ScrollView} from 'react-native';
import {Column, Row, Section} from '../../temp-components';

export default function VisitDashboardScreen({
  entry: e,
}: WorkflowScreenProps<{
  base: {
    visits: number;
    ltfu: number;
  };
  appt: {
    upcoming: number;
    missing: number;
  };
}>) {
  const {spacing} = useTheme();
  const groups = Object.entries({
    Visits: e.base.visits,
    'Loss To Follow Up': e.base.ltfu,
    'Upcoming \nAppointment': e.appt.upcoming,
    'Missed \nAppointment': e.appt.missing,
  });

  return (
    <Layout title="Report" style={{padding: 0}}>
      <ScrollView
        contentContainerStyle={{padding: spacing.md}}
        style={{flex: 1}}>
        <Section title="Summary">
          <Row contentStyle={{flexWrap: 'wrap'}}>
            {groups.map(([title, count], ix) => (
              <Column
                key={ix}
                wrapperStyle={{width: '50%', marginBottom: 8}}
                contentStyle={{
                  alignContent: 'center',
                  justifyContent: 'center',
                }}>
                <Text font="bold" size={32}>
                  {count}
                </Text>
                <Text size={14}>{title}</Text>
              </Column>
            ))}
          </Row>
        </Section>
        <Section title="Briefing" desc="Summary information"></Section>
      </ScrollView>
    </Layout>
  );
}
