import {WorkflowScreenProps} from '@elsa-ui/react-native-workflows';
import {Layout, Text} from '@elsa-ui/react-native/components';
import {useTheme} from '@elsa-ui/react-native/theme';
import {ARV} from 'elsa-health-data-fns/lib';
import React from 'react';
import {ScrollView, StyleSheet, ToastAndroid, View} from 'react-native';
import {
  Button,
  HelperText,
  IconButton,
  RadioButton,
  TextInput,
} from 'react-native-paper';
import {
  Column,
  ControlDateInput,
  MultiSelect,
  Picker,
  Row,
  Section,
  TouchableItem,
} from '../../temp-components';

import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

export default function MedicationStockDashboardScreen({
  actions: $,
}: WorkflowScreenProps<
  {},
  {
    // onGoToQuickIndications: () => void;
    onGoToManageStock: () => void;
    onSeeOtherMedications: () => void;
  }
>) {
  const {spacing, color} = useTheme();
  return (
    <Layout title="Medication Stock">
      <ScrollView>
        {/* Stock information */}
        {/* <Section title="Brief" desc="Summary on the medication stock">
          <View>
            <Text>Running Low on: ABC, NPL, XYZ</Text>
          </View>
        </Section> */}
        <Section
          title="Actions"
          desc="Things you can do about your medication stock">
          <Column>
            {/* <TouchableItem spaceTop onPress={$.onGoToQuickIndications}>
              <Row icon="run-fast">
                <Text>Make Quick Indications</Text>
                <Icon name="arrow-right" color={color.primary.base} size={24} />
              </Row>
            </TouchableItem> */}
            <TouchableItem spaceTop onPress={$.onGoToManageStock}>
              <Row icon="pill">
                <Text>Manage My Stock</Text>
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
