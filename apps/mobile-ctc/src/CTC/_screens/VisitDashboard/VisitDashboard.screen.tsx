import {WorkflowScreenProps} from '@elsa-ui/react-native-workflows';
import {Layout, Text} from '@elsa-ui/react-native/components';
import {useTheme} from '@elsa-ui/react-native/theme';
import React from 'react';
import {ScrollView} from 'react-native';
import {Column, Row} from '../../temp-components';

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
  });

  return (
    <Layout title="Report" style={{padding: 0}}>
      <ScrollView
        contentContainerStyle={{padding: spacing.md}}
        style={{flex: 1}}>
        <Row contentStyle={{flexWrap: 'wrap'}}>
          {groups.map(([className, count], ix) => (
            <Column
              key={ix}
              wrapperStyle={{width: '50%'}}
              contentStyle={{
                alignContent: 'center',
                justifyContent: 'center',
              }}>
              <Text font="bold" size={32}>
                {count}
              </Text>
              <Text>{className}</Text>
            </Column>
          ))}
        </Row>
      </ScrollView>
    </Layout>
  );
}
