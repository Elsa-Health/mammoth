import React from 'react';

import {Layout, Text} from '@elsa-ui/react-native/components';
import {useTheme} from '@elsa-ui/react-native/theme';
import {ScrollView, ToastAndroid, View} from 'react-native';
import {Block, Column, Row, Section, TitledItem} from '../../temp-components';
import {WorkflowScreenProps} from '@elsa-ui/react-native-workflows';
import {Patient} from '../../../emr-types/v1/personnel';
import {ActivityIndicator, Divider, IconButton} from 'react-native-paper';
import {CTCOrganization, CTCPatient, CTCVisit} from '../../emr/types';
import {useAsyncRetry} from 'react-use';
import {visit} from '../../storage/migration-v0-v1';
import {format} from 'date-fns';
import {useSharedValue} from 'react-native-reanimated';

export default function ViewPatientScreen({
  entry: e,
  actions: $,
}: WorkflowScreenProps<
  {patient: CTCPatient; organization: CTCOrganization},
  {fetchVisits: () => Promise<CTCVisit[]>}
>) {
  const {spacing} = useTheme();
  return (
    <Layout title="View Patient" style={{padding: 0}}>
      <ScrollView
        contentContainerStyle={{padding: spacing.md}}
        style={{flex: 1}}>
        <Section
          mode="raised"
          title="Patient"
          desc="Information about the patient"
          removeLine
          right={
            <IconButton
              icon="phone"
              size={20}
              color="#4665af"
              onPress={() =>
                ToastAndroid.show(
                  'Unable to call at the moment',
                  ToastAndroid.SHORT,
                )
              }
            />
          }>
          <Column>
            <TitledItem title="Name">
              {(e.patient.info?.firstName ?? '') +
                ' ' +
                (e.patient.info?.familyName ?? '')}
            </TitledItem>
            <TitledItem spaceTop title="Managing Facility">
              {e.patient.managingOrganization?.name ?? '-'} (
              {e.patient.managingOrganization?.identifier?.ctcCode ?? 'N/A'})
            </TitledItem>
          </Column>
        </Section>
        {/* Next expected appointment */}
        {/* <Section
          title="Next expected appointment"
          mode="raised"
          removeLine
          right={
            <IconButton
              icon="refresh"
              size={20}
              color="#4665af"
              onPress={() =>
                ToastAndroid.show('Updating information', ToastAndroid.SHORT)
              }
            />
          }
          spaceTop>
          <View>
            <Text>30th June 2022</Text>
          </View>
        </Section> */}
        {/* Past Visits */}
        <HistorySection fetchVisits={$.fetchVisits} />
      </ScrollView>
    </Layout>
  );
}

function HistorySection({
  fetchVisits,
}: {
  fetchVisits: () => Promise<CTCVisit[]>;
}) {
  const {loading, error, retry, value} = useAsyncRetry(fetchVisits, [
    fetchVisits,
  ]);

  if (loading) {
    return (
      <View>
        <ActivityIndicator animating />
        <Text>Loading History</Text>
      </View>
    );
  }

  if (error || value === undefined) {
    return (
      <View>
        <Text>Unable to show the history. There seems to be an error</Text>
      </View>
    );
  }

  return (
    <Section
      title="History"
      desc="Patient's previous activity"
      spaceTop
      right={
        <IconButton
          icon="refresh"
          size={20}
          color="#4665af"
          onPress={() => {
            ToastAndroid.show('Updating information', ToastAndroid.SHORT);
            retry();
          }}
        />
      }>
      {value.map((visit, ix) => (
        <>
          <HistoryItem key={ix} visit={visit} />
          <Divider />
        </>
      ))}
    </Section>
  );
}

function HistoryItem({visit}: {visit: CTCVisit}) {
  return (
    <View style={{marginVertical: 8}}>
      <TitledItem title="Visit Date">
        {format(new Date(visit.createdAt), 'MMMM dd, yyyy')}
      </TitledItem>
      <TitledItem title="Medication Requests" spaceTop>
        {visit.prescriptions.length}
      </TitledItem>
    </View>
  );
}
