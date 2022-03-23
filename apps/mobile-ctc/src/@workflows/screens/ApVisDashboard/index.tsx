import React from 'react';
import {ScrollView, View} from 'react-native';
import {WorkflowScreen} from '../..';
import {Layout, Text} from '../../../@libs/elsa-ui/components';
import {Color, Spacing} from '../../../@libs/elsa-ui/theme';
import {
  ElsaColorableIcon,
  ElsaIcon,
} from '../../../@libs/elsa-ui/visuals/vectors';

import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

import dayjs from 'dayjs';
import {
  Button,
  FAB,
  Searchbar,
  Portal,
  Appbar,
  IconButton,
  TouchableRipple,
} from 'react-native-paper';
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

export default function ApVisDashboardScreen({
  entry: {fullName},
  actions: $,
}: WorkflowScreen<
  {fullName: string; visits: CTC.Appointment[]; apoointments: CTC.Visit[]},
  {
    onNewVisit: () => void;
    onNewPatient: () => void;
    onPressCodeButton: () => void;
  }
>) {
  const [searchQuery, setSearchQuery] = React.useState('');
  const handleSearch = e => {
    // FIXME: Needs to be callback
    // TODO: start searching
    // console.warn(searchQuery);
    return null;
  };

  const [open, setOpen] = React.useState(false);
  const onStateChange = ({open}) => setOpen(open);

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
            Search patient using the patient ID
          </Text>

          <View
            style={{
              display: 'flex',
              flexDirection: 'row',
              alignItems: 'center',
              marginTop: 10,
            }}>
            <Searchbar
              placeholder="Ex. 02321-2323-1321321"
              style={{flex: 1}}
              onChangeText={setSearchQuery}
              onSubmitEditing={handleSearch}
              value={searchQuery}
            />

            <Button
              icon="qrcode-scan"
              mode="text"
              style={{marginLeft: 8, paddingVertical: 4}}
              onPress={$.onPressCodeButton}>
              Scan
            </Button>
          </View>
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

      {/* Fixed */}
      <FAB.Group
        open={open}
        visible
        icon={open ? 'close' : 'plus'}
        actions={[
          {
            icon: 'account',
            label: 'New Patient',
            onPress: $.onNewPatient,
          },
          {
            icon: 'calendar-edit',
            label: 'Create Visit',
            onPress: $.onNewVisit,
            small: false,
          },
        ]}
        onStateChange={onStateChange}
      />
    </Layout>
  );
}
