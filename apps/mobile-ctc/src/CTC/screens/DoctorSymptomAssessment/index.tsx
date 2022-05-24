import React from 'react';

import {Layout, Text, SectionedSelect} from '../../../@libs/elsa-ui/components';
import {View, ScrollView} from 'react-native';
import {useTheme} from '../../../@libs/elsa-ui/theme';

import {Condition} from 'elsa-health-data-fns';
import {Button} from 'react-native-paper';

import {WorkflowScreen} from '../../../@workflows';

export default function DoctorSymptomAssessmentScreen({
  entry: {value: state},
  actions: $,
}: WorkflowScreen<
  {value: Condition[]},
  {
    onMakeDesicion: (condition: Condition[]) => void;
  }
>) {
  const {color, spacing} = useTheme();
  const [conditions, set] = React.useState(state || []);

  const isSelectable = conditions.length > 0;
  return (
    <Layout title="Doctor's assessmment" style={{padding: 0}}>
      <View
        style={{flex: 1, paddingHorizontal: spacing.md, paddingVertical: 8}}>
        <View style={{flex: 1}}>
          {/* Condition Decision */}
          <View>
            <Text
              font="bold"
              style={{
                marginVertical: 10,
                fontSize: 18,
              }}>
              Condition Decision
            </Text>
            <Text>
              Based on your assessment, please select the condition that you
              think best represents that of the patient
            </Text>
            <View>
              <SectionedSelect
                confirmText={'Close'}
                items={[
                  {
                    name: 'Conditions',
                    id: 1,
                    children: Condition.pairs().map(([id, name]) => ({
                      id,
                      name,
                    })),
                  },
                ]}
                uniqueKey="id"
                searchPlaceholderText={'Search Conditions'}
                selectText={'Select Conditions'}
                onSelectedItemsChange={items => set(items)}
                selectedItems={conditions}
              />
            </View>
          </View>
        </View>
        <View>
          <Button
            mode="contained"
            onPress={() => $.onMakeDesicion(conditions)}
            disabled={!isSelectable}>
            Make selection
          </Button>
          <Text style={{marginVertical: spacing.sm}} size={13}>
            To proceed, you must make sure you have selected atleast one
            condition
          </Text>
        </View>
      </View>
    </Layout>
  );
}
