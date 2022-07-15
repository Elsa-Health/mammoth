import React from 'react';

import {Layout, Text} from '@elsa-ui/react-native/components';
import {useTheme} from '@elsa-ui/react-native/theme';
import {ScrollView, ToastAndroid, View} from 'react-native';
import {Block, Column, Row, Section, TitledItem} from '../../temp-components';
import {WorkflowScreenProps} from '@elsa-ui/react-native-workflows';
import {Patient} from '../../../emr-types/v1/personnel';
import {
  ActivityIndicator,
  Button,
  Divider,
  IconButton,
} from 'react-native-paper';
import {CTCOrganization, CTCPatient, CTCVisit} from '../../emr/types';
import {useAsync, useAsyncRetry} from 'react-use';
import {visit} from '../../storage/migration-v0-v1';
import {format} from 'date-fns';
import {useSharedValue} from 'react-native-reanimated';

export type VisitItem = {
  visitDate: UTCDateTimeString;
  'medication-requests-count': number;
  onViewVisit: () => void;
  onEditVisit: () => void;
};

export type InvestigationRequestItem = {
  onViewInvestigation: () => void;
  requestId: string;
  requestDate: Date | string;
};

export type NextAppointmentItem = {
  appointmentDate: string;
};
export default function ViewPatientScreen({
  entry: e,
  actions: $,
}: WorkflowScreenProps<
  {
    patient: CTCPatient;
    organization: CTCOrganization;
  },
  {
    onToEditPatient: (patient: CTCPatient) => void;
    nextAppointment: (patientId: string) => Promise<null | NextAppointmentItem>;
    fetchVisits: (patientId: string) => Promise<VisitItem[]>;
    fetchInvestigationRequests: (
      patientId: string,
    ) => Promise<InvestigationRequestItem[]>;
  }
>) {
  const {spacing} = useTheme();
  const name =
    (e.patient.info?.firstName ?? '') +
    ' ' +
    (e.patient.info?.familyName ?? '');

  const {value} = useAsync(async () => {
    return $.nextAppointment(e.patient.id);
  }, [e.patient]);

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
            <TitledItem title="ID">{e.patient.id}</TitledItem>
            <TitledItem spaceTop title="Name">
              {name.length === 0 ? name : 'N/A'}
            </TitledItem>
            <TitledItem spaceTop title="Managing Facility">
              {e.patient.managingOrganization?.name ?? '-'} (
              {e.patient.managingOrganization?.identifier?.ctcCode ?? 'N/A'})
            </TitledItem>
          </Column>
        </Section>
        {/* Next expected appointment */}
        {(value?.appointmentDate ?? null) !== null && (
          <Section
            title="Next expected appointment"
            mode="raised"
            removeLine
            spaceTop>
            <View>
              <Text>{value.appointmentDate}</Text>
            </View>
          </Section>
        )}
        {/* Recent Investigation Requests */}
        <InvestigationRequests
          fetch={() => $.fetchInvestigationRequests(e.patient.id)}
        />
        {/* Past Visits */}
        <HistorySection fetchVisits={() => $.fetchVisits(e.patient.id)} />
      </ScrollView>
    </Layout>
  );
}

function InvRequestItem({hist: hist}: {hist: InvestigationRequestItem}) {
  return (
    <Column contentStyle={{marginVertical: 8}}>
      <View>
        <TitledItem title="Request Date">
          {format(new Date(hist.requestDate), 'MMMM dd, yyyy')}
        </TitledItem>
        <TitledItem title="Investigation" spaceTop>
          {hist.text}
        </TitledItem>
      </View>
      <View style={{marginTop: 8}}>
        <Button
          icon="file-eye-outline"
          mode="outlined"
          onPress={hist.onViewInvestigation}>
          View
        </Button>
      </View>
    </Column>
  );
}
function InvestigationRequests({
  fetch: fetch,
}: {
  fetch: () => Promise<InvestigationRequestItem[]>;
}) {
  const {loading, error, retry, value} = useAsyncRetry(fetch, [fetch]);

  console.log(value);
  if (loading) {
    return (
      <View style={{marginVertical: 8, paddingVertical: 8}}>
        <ActivityIndicator animating />
        <Text>Loading History</Text>
      </View>
    );
  }

  if (error || value === undefined) {
    return (
      <View style={{marginVertical: 8, paddingVertical: 8}}>
        <Text italic style={{textAlign: 'center'}}>
          Unable to show the recent investigation requests. There seems to be an
          error
        </Text>
      </View>
    );
  }

  return (
    <Section
      title="Investigation Requests"
      desc="Recent investigation requests for the patients"
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
      {value.length === 0 && (
        <Text italic style={{textAlign: 'center'}}>
          There are no investigation requests made for this patient
        </Text>
      )}
      {value.map((hist, ix) => (
        <>
          <InvRequestItem key={ix} hist={hist} />
          <Divider />
        </>
      ))}
    </Section>
  );
}

function HistorySection({
  fetchVisits,
}: {
  fetchVisits: () => Promise<VisitItem[]>;
}) {
  const {loading, error, retry, value} = useAsyncRetry(fetchVisits, [
    fetchVisits,
  ]);

  if (loading) {
    return (
      <View style={{marginVertical: 8, paddingVertical: 8}}>
        <ActivityIndicator animating />
        <Text>Loading History</Text>
      </View>
    );
  }

  if (error || value === undefined) {
    return (
      <View style={{marginVertical: 8, paddingVertical: 8}}>
        <Text italic style={{textAlign: 'center'}}>
          Unable to show the history. There seems to be an error
        </Text>
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
      {value.length === 0 && (
        <Text italic style={{textAlign: 'center'}}>
          There are no visits that are recorded against this patient
        </Text>
      )}
      {value.map((visit, ix) => (
        <>
          <HistoryItem key={ix} visit={visit} />
          <Divider />
        </>
      ))}
    </Section>
  );
}

function HistoryItem({visit}: {visit: VisitItem}) {
  return (
    <Row contentStyle={{marginVertical: 8}}>
      <View>
        <TitledItem title="Visit Date">
          {format(new Date(visit.visitDate), 'MMMM dd, yyyy')}
        </TitledItem>
        <TitledItem title="Medication Requests" spaceTop>
          {visit['medication-requests-count']}
        </TitledItem>
      </View>
      <View>
        {/* <Button
          icon="file-eye-outline"
          mode="outlined"
          onPress={visit.onViewVisit}>
          View
        </Button> */}
        <Button
          icon="square-edit-outline"
          mode="outlined"
          onPress={visit.onEditVisit}>
          {'View & Edit'}
        </Button>
      </View>
    </Row>
  );
}
