import {WorkflowScreenProps} from '@elsa-ui/react-native-workflows';
import {Layout, Text} from '@elsa-ui/react-native/components';
import {useTheme} from '@elsa-ui/react-native/theme';
import React from 'react';
import {ScrollView} from 'react-native';
import {IconButton} from 'react-native-paper';
import {Column, Row, Section} from '../../temp-components';

export default function ReportSummaryScreen({
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
    <Layout title="Report Summary" style={{padding: 0}}>
      <ScrollView
        contentContainerStyle={{padding: spacing.md}}
        style={{flex: 1}}>
        <Section title="In the last 30 days" removeLine mode="raised">
          <Row contentStyle={{flexWrap: 'wrap'}}>
            {groups.map(([title, count], ix) => (
              <Column
                key={ix}
                wrapperStyle={{width: '50%', marginBottom: 8}}
                contentStyle={{
                  alignContent: 'center',
                  justifyContent: 'center',
                }}>
                <Text font="bold" size={32} style={{textAlign: 'center'}}>
                  {count}
                </Text>
                <Text size={14} style={{textAlign: 'center'}}>
                  {title}
                </Text>
              </Column>
            ))}
          </Row>
        </Section>
        <Section
          spaceTop
          title="Briefing"
          desc="Summary information on what's going on">
          <Text>Most requested investigations</Text>
          <Text>Most requested medications</Text>
        </Section>

        <Section
          title="Recent Visit"
          desc="Shows the recent visit activity"
          removeLine
          right={<IconButton icon="chevron-down" />}></Section>

        <Section
          title="Appointments"
          desc="Appointment activities"
          removeLine
          right={<IconButton icon="chevron-down" />}></Section>
      </ScrollView>
    </Layout>
  );
}
