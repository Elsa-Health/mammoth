import React from 'react';

import {Layout, Text} from '@elsa-ui/react-native/components';
import {useTheme} from '@elsa-ui/react-native/theme';
import {ScrollView, View} from 'react-native';
import {Button, RadioButton, TextInput} from 'react-native-paper';
import {Block, Column, Row, Section} from '../../temp-components';
import {WorkflowScreenProps} from '@elsa-ui/react-native-workflows';
import {MedicaDisp} from '../../emr/hook';
import {useAsyncRetry} from 'react-use';
import {List} from 'immutable';

const ion = (p: [string, string][]) => p.map(([k, v]) => ({id: k, name: v}));

export default function MedicationDispenseScreen({
  actions: $,
}: WorkflowScreenProps<
  {},
  {getMedicationDispenses: () => Promise<MedicaDisp[]>}
>) {
  const {spacing} = useTheme();
  const {loading, value, retry, error} = useAsyncRetry(async () => {
    return List(await $.getMedicationDispenses());
  });

  return (
    <Layout title="Medication Dispenses" style={{padding: 0}}>
      {loading && (
        <View style={{flex: 1}}>
          <Text>Loading...</Text>
        </View>
      )}
      {value !== undefined && (
        <ScrollView
          contentContainerStyle={{paddingHorizontal: spacing.md}}
          style={{flex: 1}}>
          {/* Missed Appointments */}
          <Section
            title="Requests responded"
            desc="List of medication requests accepted"
            right={
              <Button icon="refresh" onPress={retry}>
                Refresh
              </Button>
            }>
            {value.count() > 0 ? (
              value.map(dis => <MedicationResponseItem response={dis} />)
            ) : (
              <View style={{flex: 1}}>
                <Text style={{textAlign: 'center'}} italic>
                  There aren't any requests that have been responded to
                </Text>
              </View>
            )}
          </Section>
        </ScrollView>
      )}
    </Layout>
  );
}

function MedicationResponseItem({response}: {response: MedicaDisp}) {
  return (
    <View>
      <View>
        <Text>{response.id}</Text>
        <Text>{JSON.stringify(response.medication)}</Text>
      </View>
    </View>
  );
}
