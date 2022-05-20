import React, {Children} from 'react';
import {ScrollView, View} from 'react-native';
import {Text, Layout} from '../../../@libs/elsa-ui/components';
import {useTheme} from '../../../@libs/elsa-ui/theme';
import {WorkflowScreen} from '../../../@workflows';

import {Button, Divider} from 'react-native-paper';
import {getFacilityFromCode} from '../../facilities';

import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {useAsyncRetry} from 'react-use';
import {format} from 'date-fns';
import {AppointmentHelper} from '../../fns';

function Section<T>({
  title,
  dataFn,
  fallbackText,
  children: Child,
}: {
  title?: string;
  dataFn: () => Promise<T[]>;
  fallbackText?: string;
  children: (props: {item: T; index: number}) => JSX.Element;
}) {
  const {spacing} = useTheme();
  const {retry, loading, value: data} = useAsyncRetry(dataFn, []);

  if (loading) {
    return (
      <View>
        <Text italic>Loading...</Text>
      </View>
    );
  }

  if (data === undefined) {
    return (
      <View>
        <Text>Unable to load</Text>
      </View>
    );
  }

  return (
    <View>
      <View
        style={{
          display: 'flex',
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}>
        <Text size="lg" font="bold">
          {title}
        </Text>
        <Button icon="refresh" onPress={retry}>
          Refresh
        </Button>
      </View>
      {data.length === 0 ? (
        <View
          style={{
            flex: 1,
            alignItems: 'center',
            marginVertical: spacing.md,
          }}>
          <Text italic>
            {fallbackText || 'No data to load. Try Refreshing'}
          </Text>
        </View>
      ) : (
        <View>
          {data.map((appt, ix) => {
            return <Child key={ix} item={appt} index={ix} />;
          })}
        </View>
      )}
    </View>
  );
}

export default function PatientProfileScreen({
  entry: {patient},
  actions: $,
}: WorkflowScreen<
  {patient: CTC.Patient},
  {
    onNewPatientVisit: (patient: CTC.Patient) => void;
    onViewPatientVisit: (visit: CTC.Visit) => void;
    getPatientAppointments: (patientId: string) => Promise<CTC.Appointment[]>;
    getPatientVisits: (patientId: string) => Promise<CTC.Visit[]>;
  }
>) {
  const {spacing, color, contentType} = useTheme();
  const facilityCode = patient.id.slice(0, 8);

  return (
    <Layout title="Patient Profile" style={{padding: 0}}>
      <ScrollView
        contentContainerStyle={{
          paddingHorizontal: spacing.md,
        }}>
        <View
          style={
            contentType === 'colored'
              ? {
                  borderBottomColor: color.primary.light,
                  paddingBottom: spacing.lg,
                  paddingTop: spacing.md,
                  borderBottomWidth: 0.5,
                }
              : {
                  padding: spacing.md,
                  borderWidth: 0.5,
                  borderRadius: 5,
                  borderColor: color.primary.light,
                }
          }>
          <View>
            <Text
              font="bold"
              color={color.secondary.base}
              style={{textTransform: 'uppercase', letterSpacing: 2}}
              size={13}>
              Patient ID
            </Text>
            <Text size={17}>{patient.id}</Text>
          </View>
          <View style={{marginVertical: 8}}>
            <Text
              font="bold"
              color={color.secondary.base}
              style={{textTransform: 'uppercase', letterSpacing: 2}}
              size={13}>
              Registered Facility
            </Text>
            <Text size={17}>
              {getFacilityFromCode(facilityCode)?.name || 'Unknown Facility'}
            </Text>
          </View>
          <View style={{marginTop: 10}}>
            <Button icon="phone" mode="outlined">
              Call
            </Button>
          </View>
        </View>
        <View
          style={{
            marginVertical: spacing.sm,
            paddingVertical: spacing.md,
          }}>
          <Button
            onPress={() => $.onNewPatientVisit(patient)}
            icon="account"
            mode="contained">
            New Visit
          </Button>
        </View>

        <Divider />

        <View style={{paddingVertical: spacing.md}}>
          <Section
            title="Appointments"
            dataFn={async () => {
              const ds = await $.getPatientAppointments(patient.id);

              return ds
                .map(appt => ({
                  appt,
                  status: AppointmentHelper.isMissed(appt)
                    ? 'missed'
                    : AppointmentHelper.isUpcoming(appt)
                    ? 'upcoming'
                    : 'done',
                }))
                .sort(a => {
                  switch (a.status) {
                    case 'missed':
                      return 2;
                    case 'upcoming':
                      return 1;
                    case 'done':
                      return 0;
                    default:
                      return -1;
                  }
                });
            }}>
            {({item: {appt, status}, index}) => (
              <View
                style={{
                  paddingVertical: spacing.sm,
                  display: 'flex',
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                }}>
                <View>
                  <Text
                    size="xs"
                    color="#777"
                    font="bold"
                    style={{
                      letterSpacing: 2,
                      textTransform: 'uppercase',
                      marginBottom: 3,
                    }}>
                    Appoitnment Date
                  </Text>
                  <Text>{format(new Date(appt.date), 'MMMM dd, yyyy')}</Text>
                </View>
                <View
                  style={{
                    borderWidth: 0.5,
                    alignSelf: 'flex-start',
                    paddingHorizontal: 8,
                    paddingVertical: 4,
                    borderRadius: 8,
                    marginBottom: 8,
                    borderColor: color.primary.dark,
                  }}>
                  <Text
                    size="sm"
                    font="medium"
                    color={color.primary.dark}
                    style={{textTransform: 'capitalize'}}>
                    {status}
                  </Text>
                </View>
              </View>
            )}
          </Section>
        </View>
        <Divider />
        <View style={{paddingVertical: spacing.md}}>
          <Section
            title="Past Visits"
            dataFn={() => $.getPatientVisits(patient.id)}>
            {({item: visit}) => {
              const {
                dateTime,
                assessmentSummary: {summary},
              } = visit;
              return (
                <View style={{paddingVertical: spacing.sm}}>
                  <View style={{marginBottom: 8}}>
                    <Text
                      size="xs"
                      color="#777"
                      font="bold"
                      style={{
                        letterSpacing: 2,
                        textTransform: 'uppercase',
                        marginBottom: 3,
                      }}>
                      Visit Date
                    </Text>
                    <Text>{format(new Date(dateTime), 'MMMM dd, yyyy')}</Text>
                  </View>
                  {summary.riskNonAdherence !== undefined && (
                    <View>
                      <Text
                        size="xs"
                        color="#777"
                        font="bold"
                        style={{
                          letterSpacing: 2,
                          textTransform: 'uppercase',
                          marginBottom: 3,
                        }}>
                        Risk of Non-Adherence
                      </Text>
                      <Text>
                        {(summary.riskNonAdherence * 100).toFixed(2)} %
                      </Text>
                    </View>
                  )}
                  <Button
                    mode="outlined"
                    style={{marginVertical: 8}}
                    onPress={() => $.onViewPatientVisit(visit)}>
                    View Visit
                  </Button>
                </View>
              );
            }}
          </Section>
        </View>
      </ScrollView>
    </Layout>
  );
}
