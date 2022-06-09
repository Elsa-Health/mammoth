import {WorkflowScreenProps} from '@elsa-ui/react-native-workflows';
import {Layout, Text} from '@elsa-ui/react-native/components';
import {useTheme} from '@elsa-ui/react-native/theme';
import {format, formatDistanceToNow} from 'date-fns';
import React from 'react';
import {ScrollView, View} from 'react-native';
import {Divider, IconButton} from 'react-native-paper';
import {ReportSummaryData, UseEMRReport} from '../../emr/react-hooks/report';
import {
  CollapsibleSection,
  Column,
  Row,
  Section,
  TitledItem,
} from '../../temp-components';

export default function ReportSummaryScreen({
  entry: report,
}: WorkflowScreenProps<UseEMRReport, {}>) {
  const {spacing} = useTheme();

  const {data, count, brief} = report;
  const groups = [
    ['Visits', data.visits?.count()],
    ['Patients', data.patients?.count()],
    ['Upcoming Appointment', count.value.upcoming],
    ['Done Appointment', count.value.done],
    ['Missed Appointment', count.value.missed],
  ];

  // const groups = Object.entries({
  //   Visits: e.base.visits,
  //   'Loss To Follow Up': e.base.ltfu,
  //   'Upcoming \nAppointment': e.appt.upcoming,
  //   'Missed \nAppointment': e.appt.missed,
  //   Patients: patients?.count(),
  // });

  return (
    <Layout title="Report Summary" style={{padding: 0}}>
      <ScrollView
        contentContainerStyle={{padding: spacing.md}}
        style={{flex: 1}}>
        <Section title="In the last 30 days" mode="raised">
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
                  {count ?? '--'}
                </Text>
                <Text size={14} style={{textAlign: 'center'}}>
                  {title}
                </Text>
              </Column>
            ))}
          </Row>
        </Section>
        <Section spaceTop title="Top 3 medications requested">
          {brief.top3RequestedMedication.map(([id, name, count]) => {
            return (
              <Row key={id} wrapperStyle={{marginVertical: 4}}>
                <Text>{name}</Text>
                <Text>{count}</Text>
              </Row>
            );
          })}
        </Section>

        <CollapsibleSection
          title="Recent Visit"
          desc="Shows the recent visit activity"
          removeLine>
          {data.recentVisits ? (
            <View>
              {data.recentVisits.map((visit, idx) => {
                return (
                  <>
                    <Divider />
                    <View key={idx} style={{paddingVertical: 12}}>
                      <TitledItem title="Patient ID">
                        {visit.patient}
                      </TitledItem>
                      <TitledItem spaceTop title="Last visit">
                        {formatDistanceToNow(new Date(visit.visitDate))} ago
                      </TitledItem>
                    </View>
                  </>
                );
              })}
            </View>
          ) : (
            <View>
              <Text style={{textAlign: 'center'}} italic>
                There's currently nothing to show here.
              </Text>
            </View>
          )}
        </CollapsibleSection>

        <CollapsibleSection
          title="Recent Appointments"
          desc="Appointment activities"
          removeLine
          right={<IconButton icon="chevron-down" onPress={() => {}} />}>
          {data['appt-requests'] ? (
            <View>
              {data['appt-requests'].count() > 0 ? (
                <View>
                  {data['appt-requests'].map((appt, idx) => {
                    return (
                      <>
                        <Divider />
                        <View key={idx} style={{paddingVertical: 12}}>
                          <TitledItem title="Appointment Reason">
                            {appt.reason}
                          </TitledItem>
                          <TitledItem spaceTop title="Appointment Date">
                            {format(
                              new Date(appt.appointmentDate),
                              'yyyy, MMMM dd',
                            )}{' '}
                            {`(in ${formatDistanceToNow(
                              new Date(appt.appointmentDate),
                            )})`}
                          </TitledItem>
                          <TitledItem spaceTop title="Created">
                            {formatDistanceToNow(new Date(appt.createdAt))} ago
                          </TitledItem>
                        </View>
                      </>
                    );
                  })}
                </View>
              ) : (
                <View>
                  <Text style={{textAlign: 'center'}} italic>
                    There are no appointment request record that's been made
                  </Text>
                </View>
              )}
            </View>
          ) : (
            <View>
              <Text style={{textAlign: 'center'}} italic>
                There's currently nothing to show here.
              </Text>
            </View>
          )}
        </CollapsibleSection>
      </ScrollView>
    </Layout>
  );
}
