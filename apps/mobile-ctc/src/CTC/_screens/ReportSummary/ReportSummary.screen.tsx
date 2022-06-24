import {WorkflowScreenProps} from '@elsa-ui/react-native-workflows';
import {Layout, Text} from '@elsa-ui/react-native/components';
import {useTheme} from '@elsa-ui/react-native/theme';
import {format, formatDistanceToNow, isAfter, isBefore} from 'date-fns';
import _ from 'lodash';
import React from 'react';
import {ScrollView, View} from 'react-native';
import {
  Divider,
  IconButton,
  ToggleButton,
  TouchableRipple,
} from 'react-native-paper';
import {UseEMRReport} from '../../emr/react-hooks/report';
import {
  CollapsibleSection,
  Column,
  Row,
  Section,
  TitledItem,
} from '../../temp-components';

const Chip = ({
  children,
  roundedLeft: left,
  roundedRight: right,
  selected: d,
  onPress,
}) => {
  const r = useTheme();
  return (
    <TouchableRipple onPress={onPress}>
      <View
        style={[
          !d ? {backgroundColor: '#edf3ff'} : {backgroundColor: '#4665af'},
          {
            padding: 8,
            paddingHorizontal: 12,
            borderColor: '#4665af',
            borderWidth: 0.9,
          },
          left ? {borderTopLeftRadius: 10, borderBottomLeftRadius: 10} : {},
          right ? {borderTopRightRadius: 10, borderBottomRightRadius: 10} : {},
        ]}>
        <Text color={d ? '#FFF' : undefined}>{children}</Text>
      </View>
    </TouchableRipple>
  );
};

const reportTitleMap = {
  '1d': 'Within the day',
  '1w': 'In this week',
  '1m': 'In the month',
  '1y': 'Within the year',
};

import {subDays, subWeeks, subMonths, subYears} from 'date-fns';
const now = () => new Date();
const date = (dateStr: string) => new Date(dateStr);
export default function ReportSummaryScreen({
  entry: {data, brief},
}: WorkflowScreenProps<UseEMRReport, {}>) {
  const [date_, setDate] = React.useState<null | Date>(null);
  const {spacing} = useTheme();
  const appointments = React.useMemo(
    () =>
      data.appointments?.filter(d =>
        date_ ? isAfter(date(d.createdAt), date_) : true,
      ),
    [data.appointments],
  );
  const groups = React.useMemo(
    () => [
      [
        'Visits',
        data.visits
          ?.filter(d =>
            date_ ? isAfter(date(d.date ?? d.createdAt), date_) : true,
          )
          .count(),
      ],
      [
        'Patients',
        data.patients
          ?.filter(d => (date_ ? isAfter(date(d.createdAt), date_) : true))
          .count(),
      ],
      [
        'Upcoming Appointment',
        appointments.filter(d => isAfter(date(d.requestedDate), now())).count(),
      ],
      [
        'Done Appointment',
        appointments
          .filter(
            d =>
              d.respondedDate !== null && // There's
              isBefore(date(d.requestedDate), now()),
            // && isBefore(date(d.requestedDate), date(d.respondedDate)), // this check's if done on time
          )
          .count(),
      ],
      [
        'Missed Appointment',
        appointments
          .filter(
            d =>
              d.respondedDate === null &&
              isBefore(date(d.requestedDate), now()),
          )
          .count(),
      ],
    ],
    [date_],
  );

  // const groups = Object.entries({
  //   Visits: e.base.visits,
  //   'Loss To Follow Up': e.base.ltfu,
  //   'Upcoming \nAppointment': e.appt.upcoming,
  //   'Missed \nAppointment': e.appt.missed,
  //   Patients: patients?.count(),
  // });

  const [value, setValue] = React.useState<'1d' | '1w' | '1m' | '1y' | null>(
    null,
  );
  React.useEffect(() => {
    setDate(null);
    if (value === '1d') setDate(subDays(now(), 1));
    if (value === '1w') setDate(subWeeks(now(), 1));
    if (value === '1m') setDate(subMonths(now(), 1));
    if (value === '1y') setDate(subYears(now(), 1));
  }, [value]);

  return (
    <Layout title="Report Summary" style={{padding: 0}}>
      <ScrollView
        contentContainerStyle={{paddingHorizontal: spacing.md}}
        style={{flex: 1}}>
        {/* Group selector */}
        <View>
          <Row contentStyle={{justifyContent: 'center', paddingVertical: 16}}>
            {['1d', '1w', '1m', '1y'].map((val, ix, arr) => (
              <React.Fragment key={val}>
                <Chip
                  value={val}
                  selected={value === val}
                  roundedLeft={ix === 0}
                  roundedRight={ix === arr.length - 1}
                  onPress={() => setValue(o => (o === val ? null : val))}>
                  {_.upperCase(val)}
                </Chip>
              </React.Fragment>
            ))}
          </Row>
        </View>
        <Section
          title={value !== null ? reportTitleMap[value] : 'In everything'}
          mode="raised">
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
          {brief.recentVisits ? (
            <View>
              {brief.recentVisits.map((visit, idx) => {
                return (
                  <React.Fragment key={idx}>
                    <Divider />
                    <View style={{paddingVertical: 12}}>
                      <TitledItem title="Patient ID">
                        {visit.patient}
                      </TitledItem>
                      <TitledItem spaceTop title="Last visit">
                        {formatDistanceToNow(new Date(visit.visitDate))} ago
                      </TitledItem>
                    </View>
                  </React.Fragment>
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
                      <React.Fragment key={idx}>
                        <Divider />
                        <View style={{paddingVertical: 12}}>
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
                      </React.Fragment>
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
