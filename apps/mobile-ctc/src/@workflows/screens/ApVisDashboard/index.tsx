import React from 'react';
import {ScrollView, View} from 'react-native';
import {WorkflowScreen} from '../..';
import {Layout, Text} from '../../../@libs/elsa-ui/components';
import {Color, Spacing} from '../../../@libs/elsa-ui/theme';
import {
  ElsaColorableIcon,
  ElsaIcon,
} from '../../../@libs/elsa-ui/visuals/vectors';

import dayjs from 'dayjs';
import {Button, FAB, Searchbar, Portal, Appbar} from 'react-native-paper';
function VisitSection({data}: {data: CTC.Visit[]}) {
  return (
    <View>
      <Text size="md" font="bold">
        Visits
      </Text>
      <View>
        {data.map((_, ix) => {
          return (
            <View key={ix} style={{paddingVertical: Spacing.sm}}>
              <View>
                <Text
                  size="xs"
                  color="#777"
                  font="bold"
                  style={{letterSpacing: 3, textTransform: 'uppercase'}}>
                  Patient ID
                </Text>
                <Text size="sm">0212-2313-42142</Text>
              </View>
              <View style={{marginTop: 4}}>
                <Text
                  size="xs"
                  color="#777"
                  font="bold"
                  style={{letterSpacing: 3, textTransform: 'uppercase'}}>
                  Date
                </Text>
                <Text size="sm">
                  {dayjs(new Date()).format('MMMM DD, YYYY')}
                </Text>
              </View>
              <View style={{marginTop: 8}}>
                <Button mode="outlined" compact>
                  Open Visit
                </Button>
              </View>
            </View>
          );
        })}
      </View>
    </View>
  );
}

function AppointmentSection({data}: {data: CTC.Appointment[]}) {
  return (
    <View>
      <Text size="md" font="bold">
        Appointments
      </Text>
      <View>
        {data.map((_, ix) => {
          return (
            <View key={ix} style={{paddingVertical: Spacing.sm}}>
              <View>
                <Text
                  size="xs"
                  color="#777"
                  font="bold"
                  style={{letterSpacing: 3, textTransform: 'uppercase'}}>
                  Patient ID
                </Text>
                <Text size="sm">0212-2313-42142</Text>
              </View>
              <View style={{marginTop: 4}}>
                <Text
                  size="xs"
                  color="#777"
                  font="bold"
                  style={{letterSpacing: 3, textTransform: 'uppercase'}}>
                  Date
                </Text>
                <Text size="sm">
                  {dayjs(new Date()).format('MMMM DD, YYYY')}
                </Text>
              </View>
              <View style={{marginTop: 8}}>
                <Button mode="outlined" compact>
                  Attend Patient
                </Button>
              </View>
            </View>
          );
        })}
      </View>
    </View>
  );
}

function ButtonGroup() {
  const [state, setState] = React.useState({open: false});

  const onStateChange = ({open}) => setState({open});

  const {open} = state;
  return (
    <Portal>
      <FAB.Group
        open={open}
        visible
        icon={open ? 'close' : 'plus'}
        actions={[
          {
            icon: 'account',
            label: 'New Patient',
            onPress: () => console.log('Pressed star'),
          },
          {
            icon: 'calendar-edit',
            label: 'Add Appointment',
            onPress: () => console.log('Pressed notifications'),
            small: false,
          },
        ]}
        onStateChange={onStateChange}
      />
    </Portal>
  );
}

export default function ApVisDashboardScreen({
  entry: {fullName},
  actions: $,
}: WorkflowScreen<
  {fullName: string},
  {
    loadPatients: () => Promise<Patient[]>;
    loadAppointments: () => Promise<Appointment[]>;
  }
>) {
  const [searchQuery, setSearchQuery] = React.useState('');
  const handleSearch = e => {
    // FIXME: Needs to be callback
    // TODO: start searching
    // console.warn(searchQuery);
    return null;
  };

  return (
    <Layout style={{padding: 0}} hideHeader>
      <ScrollView
        contentContainerStyle={{
          paddingHorizontal: Spacing.lg,
          paddingBottom: 60,
        }}>
        <View
          style={{
            paddingVertical: 8,
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'space-between',
          }}>
          <View>
            <Text font="extra-black" size={24}>
              Welcome Back,
            </Text>
            <Text font="extra-black" size={24}>
              {fullName}
            </Text>
          </View>

          <View
            style={{
              alignSelf: 'flex-end',
              padding: Spacing.md,
              borderRadius: 10,
            }}>
            <ElsaColorableIcon
              width={28}
              height={28}
              style={{
                color: Color.primary.base,
              }}
            />
          </View>
        </View>
        {/* Search Patient */}
        <View style={{marginTop: Spacing.md}}>
          <Text font="bold" size="md">
            Find a Patient
          </Text>
          <Text style={{lineHeight: 24}}>
            You can search by name or telephone
          </Text>

          <Searchbar
            placeholder="Ex. Juma Nasorro"
            style={{marginTop: 10}}
            onChangeText={setSearchQuery}
            onSubmitEditing={handleSearch}
            value={searchQuery}
          />
        </View>

        {/* Appointment Section */}
        <View style={{marginTop: Spacing.lg}}>
          <AppointmentSection data={Array(2).fill(2)} />
        </View>

        {/* Appointment Section */}
        <View style={{marginTop: Spacing.lg}}>
          <VisitSection data={Array(2).fill(2)} />
        </View>
      </ScrollView>

      <ButtonGroup />
    </Layout>
  );
}
