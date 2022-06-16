import React from 'react';
import {ScrollView, View} from 'react-native';

import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

import {Layout, Text} from '@elsa-ui/react-native/components';
import {
  Block,
  Column,
  Row,
  Section,
  TouchableItem,
} from '../../temp-components';
import {useTheme} from '@elsa-ui/react-native/theme';
import {Divider, IconButton, Menu, Searchbar} from 'react-native-paper';
import {ElsaColorableIcon} from '@elsa-ui/react-native/visuals/vectors';
import {WorkflowScreenProps} from '@elsa-ui/react-native-workflows';

export default function DashboardScreen({
  entry: {fullName},
  actions: $,
}: WorkflowScreenProps<
  {
    fullName: string;
  },
  {
    logout: () => Promise<void>;
    onSearchPatient: () => void;
    onNewPatient: () => void;
    // onViewPatients: () => void;
    // onViewAppointments: () => void;
    onViewMedications: () => void;
    onViewMedicationStock: () => void;
    onViewReports: () => void;

    // see other's medication
    onSeeOtherMedications: () => void;
  }
>) {
  const {color} = useTheme();
  const [visible, setVisible] = React.useState(false);

  return (
    <Layout hideHeader style={{backgroundColor: '#FFF', flex: 1, padding: 0}}>
      <View style={{marginHorizontal: 16, marginTop: 16}}>
        <View style={{padding: 12}}>
          <Row>
            <View>
              <ElsaColorableIcon
                color={color.secondary.base}
                width={28}
                height={28}
              />
              <Column spaceTop>
                <Text size={28} font="bold">
                  Habari,
                </Text>

                <Text size={25} font="bold">
                  {fullName !== undefined ? fullName : 'Daktari'}
                </Text>
              </Column>
            </View>
            <View>
              <Menu
                visible={visible}
                onDismiss={() => setVisible(false)}
                anchor={
                  <IconButton
                    style={{borderWidth: 1, borderColor: color.primary.base}}
                    icon="dots-vertical"
                    onPress={() => setVisible(s => !s)}
                  />
                }>
                <Menu.Item onPress={() => $.logout()} title="Log out" />
              </Menu>
            </View>
          </Row>
          {/* Icons */}
        </View>
        <Section
          removeLine
          title="Search Patient"
          desc="Look up patient in the CTC">
          <Searchbar
            value={''}
            placeholder="Type to search"
            onPressOut={$.onSearchPatient}
            style={{borderColor: '#CCC', borderWidth: 0.6, elevation: 2}}
          />
        </Section>
      </View>
      {/* Section for actions to do */}
      <ScrollView contentContainerStyle={{paddingHorizontal: 16}}>
        <Section
          removeLine
          title="Get Started"
          desc="Few things you can do while in the platform">
          <Column>
            <TouchableItem onPress={$.onNewPatient}>
              <Row icon="account-plus-outline">
                <Text>Register New Patient</Text>
                <Icon name="arrow-right" color={color.primary.base} size={24} />
              </Row>
            </TouchableItem>
            {/* <TouchableItem spaceTop onPress={$.onViewPatients}>
            <Row icon="account-group-outline">
              <Text>View Patients</Text>
              <Icon name="arrow-right" color={color.primary.base} size={24} />
            </Row>
          </TouchableItem> */}
            <TouchableItem spaceTop onPress={$.onViewMedicationStock}>
              <Row icon="plus-outline">
                <Text>Manage Medication Stock</Text>
                <Icon name="arrow-right" color={color.primary.base} size={24} />
              </Row>
            </TouchableItem>
          </Column>
        </Section>
        {/* Others */}
        <Section removeLine title="More" desc="What else you can do">
          <Column>
            {/* <TouchableItem onPress={$.onViewAppointments}>
            <Row icon="format-list-bulleted-type">
              <Text>View Appointments</Text>
              <Icon name="arrow-right" color={color.primary.base} size={24} />
            </Row>
          </TouchableItem> */}
            <TouchableItem spaceTop onPress={$.onViewMedications}>
              <Row icon="pill">
                <Text>View Medication Requests</Text>
                <Icon name="arrow-right" color={color.primary.base} size={24} />
              </Row>
            </TouchableItem>
            <TouchableItem spaceTop onPress={$.onViewReports}>
              <Row icon="chart-box-outline">
                <Text>View Reports</Text>
                <Icon name="arrow-right" color={color.primary.base} size={24} />
              </Row>
            </TouchableItem>
            <TouchableItem spaceTop onPress={$.onSeeOtherMedications}>
              <Row icon="map-search">
                <Text>View Medication Map</Text>
                <Icon name="arrow-right" color={color.primary.base} size={24} />
              </Row>
            </TouchableItem>
          </Column>
        </Section>
      </ScrollView>
    </Layout>
  );
}
