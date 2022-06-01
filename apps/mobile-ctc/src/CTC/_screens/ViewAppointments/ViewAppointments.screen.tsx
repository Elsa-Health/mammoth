import React from 'react';

import {Layout, Text} from '@elsa-ui/react-native/components';
import {useTheme} from '@elsa-ui/react-native/theme';
import {ScrollView, View} from 'react-native';
import {Column, Item, Row, Section, TitledItem} from '../../temp-components';
import {WorkflowScreenProps} from '@elsa-ui/react-native-workflows';

import CollapsibleView from 'react-native-collapsible';
import {Button, IconButton, TouchableRipple} from 'react-native-paper';

import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {format} from 'date-fns';

export default function ViewAppointmentsScreen({
  actions: $,
}: WorkflowScreenProps<{}, {onNext: () => void}>) {
  const {spacing} = useTheme();
  const [state, set] = React.useState(() => ({
    coMorbidities: [] as any[],
  }));

  const [visible, setVisible] = React.useState(false);
  const [visibleUpcoming, setVisibleUpcoming] = React.useState(false);
  const [visibleDone, setVisibleDone] = React.useState(false);

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

        {/* Missed Appointments */}
        <Column>
          <Section
            spaceTop
            removeLine
            mode="raised"
            title="Missed Appointments"
            right={
              <IconButton
                icon="chevron-down"
                onPress={() => setVisible(s => !s)}
              />
            }
            desc="Here are the missed appointments">
            {/* Investigation content */}
            <CollapsibleView collapsed={visible} style={{padding: spacing.md}}>
              <ScrollView>
                <Text>No Result</Text>
              </ScrollView>
            </CollapsibleView>
          </Section>
        </Column>

        {/* Upcoming appointments */}
        <Section
          spaceTop
          title="Upcoming Appointments"
          desc="List of upcoming appointments"
          right={
            <IconButton
              icon="chevron-down"
              onPress={() => setVisibleUpcoming(s => !s)}
            />
          }>
          <CollapsibleView
            collapsed={visibleUpcoming}
            style={{paddingVertical: spacing.md}}>
            <Column>
              {/* Investigation content */}
              {[2, 3, 4].map((d, ix) => (
                <Section mode="raised" key={ix} spaceTop={ix !== 0}>
                  <UpcomingAppointmentItem />
                </Section>
              ))}
            </Column>
          </CollapsibleView>
        </Section>

        {/* Completed */}
        <Section
          spaceTop
          title="Completed Appointments"
          desc="Attended Appointments"
          removeLine
          right={
            <IconButton
              icon="chevron-down"
              onPress={() => setVisibleDone(s => !s)}
            />
          }>
          <CollapsibleView
            collapsed={visibleDone}
            style={{paddingBottom: spacing.md}}>
            <Column>
              <View
                style={{
                  borderColor: '#4665af',
                  borderTopWidth: 1,
                  // borderBottomWidth: 1,
                  marginVertical: 8,
                  padding: 8,
                }}>
                <Text font="bold">June</Text>
              </View>
              {/* Investigation content */}
              {[2, 3, 4].map((d, ix) => (
                <Section mode="raised" key={ix} spaceTop>
                  <AppointmentItem />
                </Section>
              ))}
            </Column>
          </CollapsibleView>
        </Section>
      </ScrollView>
    </Layout>
  );
}

function UpcomingAppointmentItem() {
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
      <Row>
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
      </Row>
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
