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

import CollapsibleView from 'react-native-collapsible';
import {Button, IconButton, TouchableRipple} from 'react-native-paper';

import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {format} from 'date-fns';
import {useAsyncRetry} from 'react-use';

export type AppointmentItem = {
  appointmentDate: Date;
  patientId: string;
};
export default function ViewAppointmentsScreen({
  entry: e,
  actions: $,
}: WorkflowScreenProps<
  {},
  {
    onNext: () => void;
    fetchUpcomingAppointments: () => Promise<AppointmentItem[]>;
    fetchMissedAppointments: () => Promise<AppointmentItem[]>;
  }
>) {
  const {spacing} = useTheme();

  // CHANGE THIS STRAT
  const {loading, value: missed = null} = useAsyncRetry(
    $.fetchMissedAppointments,
    [],
  );
  const {loading: _load, value: upcoming = null} = useAsyncRetry(
    $.fetchUpcomingAppointments,
    [],
  );

  return (
    <Layout title="Appointments" style={{padding: 0}}>
      <ScrollView
        contentContainerStyle={{paddingHorizontal: spacing.md}}
        style={{flex: 1}}>
        <Section
          spaceTop
          title="Information"
          desc="Summary information about on the appointments">
          <Row>
            <TitledItem title="Missed">23</TitledItem>
            <TitledItem title="Upcoming ">415</TitledItem>
            <TitledItem title="Completed">45</TitledItem>
          </Row>
        </Section>

        {/* Upcoming appointments */}
        <CollapsibleSection
          spaceTop
          removeLine
          title="Upcoming Appointments"
          desc="List of upcoming appointments">
          <Column>
            {/* Investigation content */}
            {(upcoming ?? []).map((d, ix) => (
              <Section key={ix} spaceTop={ix !== 0}>
                <UpcomingAppointmentItem {...d} />
              </Section>
            ))}
          </Column>
        </CollapsibleSection>

        {/* Missed Appointments */}
        <Column>
          <CollapsibleSection
            spaceTop
            removeLine
            mode="raised"
            title="Missed Appointments"
            desc="Here are the missed appointments">
            {/* Investigation content */}

            <Column>
              {/* Investigation content */}
              {(missed ?? []).map((d, ix) => (
                <Section key={ix} spaceTop={ix !== 0}>
                  <UpcomingAppointmentItem {...d} />
                </Section>
              ))}
            </Column>
          </CollapsibleSection>
        </Column>
      </ScrollView>
    </Layout>
  );
}

export type UpcomingAppointmentItem = AppointmentItem;
function UpcomingAppointmentItem(props: UpcomingAppointmentItem) {
  return (
    <>
      <Column wrapperStyle={{marginBottom: 12}}>
        <TitledItem title="Appointment Date">
          {format(props.appointmentDate, 'yyyy, MMMM dd')}
        </TitledItem>
        <TitledItem spaceTop title="Patient ID">
          {props.patientId}
        </TitledItem>
      </Column>
      {/* <Row>
        <Button
          icon="file-eye"
          style={{flex: 1, marginRight: 6}}
          mode="outlined"
          onPress={() => {}}>
          View
        </Button>
        <Button
          icon="file-eye"
          style={{flex: 1}}
          mode="contained"
          onPress={() => {}}>
          Attend
        </Button>
      </Row> */}
    </>
  );
}

function AppointmentItem() {
  return (
    <>
      <Column wrapperStyle={{marginBottom: 12}}>
        <TitledItem title="Appointment Date">
          {format(new Date(), 'yyyy, MMMM dd')}
        </TitledItem>
        <TitledItem spaceTop title="Patient ID">
          0202010000012231
        </TitledItem>
      </Column>
      <Item>
        <Button icon="file-eye" mode="outlined" onPress={() => {}}>
          View Appointment
        </Button>
      </Item>
    </>
  );
}
