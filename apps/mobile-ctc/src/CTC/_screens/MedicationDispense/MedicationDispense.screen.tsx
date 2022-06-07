import React from 'react';

import {Layout, Text} from '@elsa-ui/react-native/components';
import {useTheme} from '@elsa-ui/react-native/theme';
import {ScrollView, View} from 'react-native';
import {Button, Divider, RadioButton, TextInput} from 'react-native-paper';
import {Block, Column, Row, Section, TitledItem} from '../../temp-components';
import {WorkflowScreenProps} from '@elsa-ui/react-native-workflows';
import {MedicaDisp} from '../../emr/hook';
import {useAsyncRetry} from 'react-use';
import {List} from 'immutable';
import {format} from 'date-fns';

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
      <View style={{paddingVertical: 10}}>
        <Text size={'xs'} color="#777">
          {response.id}
        </Text>
        <TitledItem title="Medication">
          {response.medication.data.regimen} (
          {response.medication.data.className})
        </TitledItem>

        <Row contentStyle={{justifyContent: 'flex-start'}}>
          <TitledItem title="Associated Facility" style={{marginRight: 8}}>
            {response.supplier?.organization.data.ctcCode}
          </TitledItem>
          <TitledItem title="Supplied By">{response.supplier?.name}</TitledItem>
        </Row>

        <Row contentStyle={{justifyContent: 'flex-start'}}>
          <TitledItem title="Responded At">
            {format(new Date(response.createdAt), 'MMMM dd, yyyy')}
          </TitledItem>
        </Row>
      </View>
      <Divider />
    </View>
  );
}
