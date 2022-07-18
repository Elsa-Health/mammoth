import React from 'react';

import {Layout, Text} from '@elsa-ui/react-native/components';
import {useTheme} from '@elsa-ui/react-native/theme';
import {ScrollView, View} from 'react-native';
import {
  CollapsibleSection,
  Column,
  Item,
  Row,
  Section,
  TitledItem,
} from '../../temp-components';
import {WorkflowScreenProps} from '@elsa-ui/react-native-workflows';

import {format, isAfter} from 'date-fns';
import {Appointment, UseAppointments} from '../../emr/react-hooks';
import {groupByFn} from '../MedicationStock/helpers';
import {date} from '@elsa-health/emr/lib/utils';
import {useWorkflowStore} from '../../workflow';

const nameMap = {
  upcoming: 'Upcoming Appointments',
  missed: 'Missed Appointments',
  completed: 'Completed Appointments',
};

export default function ViewAppointmentsScreen({}: WorkflowScreenProps<
  UseAppointments,
  {
    onNext: () => void;
  }
>) {
  const {spacing} = useTheme();

  // shared data
  const appointments = useWorkflowStore(s => s.value.appointments);

  const groups = React.useMemo(
    () =>
      groupByFn(appointments, item => {
        return item.type === 'responded'
          ? 'completed'
          : isAfter(date(item.requestDate), new Date())
          ? 'upcoming'
          : 'missed';
      }),
    [appointments],
  );

  return (
    <Layout title="Appointments" style={{padding: 0}}>
      <ScrollView
        contentContainerStyle={{paddingHorizontal: spacing.md}}
        style={{flex: 1}}>
        <Section
          spaceTop
          title="Summary"
          desc="Brief information about on the appointments">
          {groups.count() == 0 && (
            <Text italic style={{textAlign: 'center'}}>
              There are no recorded appointment information that are stored. Try
              again later
            </Text>
          )}
          <Row>
            {groups.map(([title, vs], ix) => (
              <React.Fragment key={ix}>
                <Column
                  wrapperStyle={{width: '50%', marginBottom: 8}}
                  contentStyle={{
                    alignContent: 'center',
                    justifyContent: 'center',
                  }}>
                  <Text font="bold" size={32} style={{textAlign: 'center'}}>
                    {vs.length ?? '--'}
                  </Text>
                  <Text size={14} style={{textAlign: 'center'}}>
                    {title}
                  </Text>
                </Column>
              </React.Fragment>
            ))}
            {/* <TitledItem title="Missed">23</TitledItem>
            <TitledItem title="Upcoming ">415</TitledItem>
            <TitledItem title="Completed">45</TitledItem> */}
          </Row>
        </Section>

        {groups.map(([title, vals], ix) => (
          <React.Fragment key={ix}>
            {/* Upcoming appointments */}
            <CollapsibleSection
              spaceTop
              removeLine
              title={nameMap[title]}
              desc={`List of ${nameMap[title].toLowerCase()}`}>
              <Column>
                {/* Investigation content */}
                {vals.map((d, ix) => (
                  <Item key={ix} spaceTop={ix !== 0}>
                    <AppointmentItem {...d} />
                  </Item>
                ))}
              </Column>
            </CollapsibleSection>
          </React.Fragment>
        ))}
      </ScrollView>
    </Layout>
  );
}

function AppointmentItem(props: Appointment) {
  const upcoming = isAfter(date(props.requestDate), new Date());
  return (
    <>
      <Row wrapperStyle={{marginBottom: 12}}>
        <View>
          <TitledItem title="Appointment Date">
            {format(date(props.requestDate), 'yyyy, MMMM dd')}
          </TitledItem>
          {props.type === 'responded' && (
            <TitledItem spaceTop title="Response Date">
              {format(date(props.responseDate), 'yyyy, MMMM dd')}
            </TitledItem>
          )}
        </View>
        {/* {props.type === 'not-responded' && upcoming && (
          <Item spaceTop>
            <Button mode="contained" icon="paperclip" onPress={() => {}}>
              Attend
            </Button>
          </Item>
        )} */}
      </Row>
    </>
  );
}
