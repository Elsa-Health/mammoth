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

export default function MedicationStockSimpleScreen({
  actions: $,
}: WorkflowScreenProps<
  {},
  {
    onGoToQuickIndications: () => void;
    onGoToManageStock: () => void;
  }
>) {
  const {spacing, color} = useTheme();
  return (
    <Layout title="Quick Medication Setup">
      <ScrollView>
        {/* Stock information */}
        <Section
          title="Actions"
          desc="Things you can do about your medication stock">
          <Column>
            <TouchableItem spaceTop onPress={$.onGoToQuickIndications}>
              <Row icon="run-fast">
                <Text>Make Quick Indications</Text>
                <Icon name="arrow-right" color={color.primary.base} size={24} />
              </Row>
            </TouchableItem>
          </Column>
        </Section>
      </ScrollView>
    </Layout>
  );
}
