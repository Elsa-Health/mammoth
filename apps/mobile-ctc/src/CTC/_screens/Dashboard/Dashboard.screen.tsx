import React from 'react';
import {View, ViewProps} from 'react-native';

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
import {Searchbar, TouchableRipple} from 'react-native-paper';
import {ElsaColorableIcon} from '@elsa-ui/react-native/visuals/vectors';
import {WorkflowScreenProps} from '@elsa-ui/react-native-workflows';

export default function DashboardScreen({
  actions: $,
}: WorkflowScreenProps<
  {},
  {
    onNewPatient: () => void;
    onViewPatients: () => void;
    onViewAppointments: () => void;
  }
>) {
  const {color} = useTheme();

  return (
    <Layout hideHeader style={{backgroundColor: '#FFF', flex: 1}}>
      <View style={{padding: 12}}>
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
            Kevin James,
          </Text>
        </Column>
        {/* Icons */}
      </View>
      <Section
        removeLine
        title="Search Patient"
        desc="Look up patient using CTC ID">
        <Searchbar
          style={{borderColor: '#CCC', borderWidth: 0.6, elevation: 2}}
        />
      </Section>
      {/* Section for actions to do */}
      <Section
        removeLine
        title="Get Started"
        desc="Few things you can do while in the platform">
        <Column>
          <TouchableItem onPress={$.onNewPatient}>
            <Row icon="account-plus-outline">
              <Text>New Patient</Text>
              <Icon name="arrow-right" color={color.primary.base} size={24} />
            </Row>
          </TouchableItem>
          <TouchableItem spaceTop onPress={$.onViewPatients}>
            <Row icon="account-group-outline">
              <Text>View Patients</Text>
              <Icon name="arrow-right" color={color.primary.base} size={24} />
            </Row>
          </TouchableItem>
          <TouchableItem spaceTop onPress={$.onViewAppointments}>
            <Row icon="format-list-bulleted-type">
              <Text>View Appointments</Text>
              <Icon name="arrow-right" color={color.primary.base} size={24} />
            </Row>
          </TouchableItem>
        </Column>
      </Section>
    </Layout>
  );
}
