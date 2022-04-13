import React from 'react';
import {ScrollView, View} from 'react-native';
import {WorkflowScreen} from '../..';
import {Layout, Text} from '../../../@libs/elsa-ui/components';
import {Color, Spacing} from '../../../@libs/elsa-ui/theme';
import {ElsaColorableIcon} from '../../../@libs/elsa-ui/visuals/vectors';

import {format} from 'date-fns';

import {
  ActivityIndicator,
  Divider,
  Modal,
  Portal,
  TouchableRipple,
} from 'react-native-paper';
import {useAsyncRetry} from 'react-use';

import dayjs from 'dayjs';
import {Button, FAB, Searchbar} from 'react-native-paper';
import {NetworkStatus} from '../../../app/utils';

import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

function MissedAppointmentsSection({
  dataFn,
}: {
  dataFn: () => Promise<CTC.Appointment[]>;
}) {
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
          Missed Appointments
        </Text>
        <Button icon="refresh" onPress={retry}>
          Reload
        </Button>
      </View>
      {data.length === 0 ? (
        <View
          style={{flex: 1, alignItems: 'center', marginVertical: Spacing.md}}>
          <Text italic>You are all set.</Text>
          <Text italic>There are no missing appointments</Text>
        </View>
      ) : (
        <View>
          {data.map((appt, ix) => {
            return (
              <View key={ix} style={{paddingVertical: Spacing.sm}}>
                <View>
                  <Text
                    size="xs"
                    color="#777"
                    font="bold"
                    style={{letterSpacing: 2, textTransform: 'uppercase'}}>
                    Patient ID
                  </Text>
                  <Text size="sm">{appt.patientId}</Text>
                </View>
                <View style={{marginTop: 8}}>
                  <Text
                    size="xs"
                    color="#777"
                    font="bold"
                    style={{letterSpacing: 2, textTransform: 'uppercase'}}>
                    Appointment Date
                  </Text>
                  <Text size="sm">
                    {dayjs(appt.date).format('MMMM DD, YYYY')}
                  </Text>
                </View>
              </View>
            );
          })}
        </View>
      )}
    </View>
  );
}

function UpcomingAppointmentSection({
  dataFn,
  onAttendPatient,
}: {
  dataFn: () => Promise<CTC.Appointment[]>;
  onAttendPatient: (appt: CTC.Appointment) => void;
}) {
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
          Upcoming Appointments
        </Text>
        <Button icon="refresh" onPress={retry}>
          Reload
        </Button>
      </View>

      {data.length === 0 ? (
        <View
          style={{flex: 1, alignItems: 'center', marginVertical: Spacing.md}}>
          <Text italic>There are no appointments created.</Text>
          <Text italic>Create appointments to have one show up.</Text>
        </View>
      ) : (
        <>
          <View>
            {data.map((appt, ix) => {
              return (
                <View key={ix} style={{paddingVertical: Spacing.sm}}>
                  <View>
                    <Text
                      size="xs"
                      color="#777"
                      font="bold"
                      style={{letterSpacing: 2, textTransform: 'uppercase'}}>
                      Patient ID
                    </Text>
                    <Text size="sm">{appt.patientId}</Text>
                  </View>
                  <View style={{marginTop: 8}}>
                    <Text
                      size="xs"
                      color="#777"
                      font="bold"
                      style={{letterSpacing: 2, textTransform: 'uppercase'}}>
                      Appointment Date
                    </Text>
                    <Text size="sm">
                      {dayjs(appt.date).format('MMMM DD, YYYY')}
                    </Text>
                  </View>
                  <View style={{marginTop: 8}}>
                    <Button
                      mode="outlined"
                      compact
                      onPress={() => onAttendPatient(appt)}>
                      Attend Patient
                    </Button>
                  </View>
                </View>
              );
            })}
          </View>
        </>
      )}
    </View>
  );
}

function Patient({
  data: {id, registeredDate},
  onNewVisit,
}: {
  data: CTC.Patient;
  onNewVisit: () => void;
}) {
  return (
    <View style={{paddingVertical: 12}}>
      <View style={{marginBottom: 8}}>
        <Text
          font="bold"
          size="xs"
          color={Color.secondary.base}
          style={{
            textTransform: 'uppercase',
            letterSpacing: 1,
            lineHeight: 18,
          }}>
          CTC ID
        </Text>

        <Text>{id}</Text>
      </View>
      <View style={{marginBottom: 8}}>
        <Text
          font="bold"
          size="xs"
          color={Color.secondary.base}
          style={{
            textTransform: 'uppercase',
            letterSpacing: 1,
            lineHeight: 18,
          }}>
          Registered Date
        </Text>
        <Text>
          {registeredDate
            ? format(new Date(registeredDate), 'yyyy, dd MMMM')
            : 'Unknown'}
        </Text>
      </View>
      <View
        style={{
          display: 'flex',
          flexDirection: 'row',
          flex: 1,
          marginVertical: 8,
          justifyContent: 'center',
        }}>
        <Button
          style={{flex: 1}}
          onPress={onNewVisit}
          icon="file-plus-outline"
          mode="outlined">
          New Visit
        </Button>
        <Button
          style={{flex: 1, marginLeft: 8}}
          icon="pencil"
          onPress={() => console.log('Edit Profile')}>
          Edit Profile
        </Button>
      </View>
    </View>
  );
}

function SearchPatientSection({
  data,
  onClear,
  onRegisterPatient,
  onNewPatientVisit,
}: {
  data: CTC.Patient[];
  onClear: () => void;
  onNewPatientVisit: (patient: CTC.Patient) => void;
  onRegisterPatient: () => void;
}) {
  return (
    <View style={{paddingVertical: Spacing.xs, flex: 1}}>
      {data.length === 0 ? (
        <View>
          <View
            style={{flex: 1, alignItems: 'center', marginVertical: Spacing.md}}>
            <Text italic>Didn't find the patient.</Text>
            <Text italic>Register patient instead?</Text>
          </View>
          <Button mode="outlined" onPress={onRegisterPatient}>
            Register Patient
          </Button>
        </View>
      ) : (
        data.map(d => (
          <View key={d.id}>
            <Patient data={d} onNewVisit={() => onNewPatientVisit(d)} />
          </View>
        ))
      )}
      <View>
        <Button onPress={onClear}>Clear</Button>
      </View>
    </View>
  );
}

// CIT = color, Icon-name, Text
const statusCITMap: {[s in NetworkStatus]: [string, string, string]} = {
  connecting: ['#ffbb00', 'dots-horizontal', 'Connecting'],
  error: ['#f54943', 'exclamation-thick', 'Error, Retry?'],
  offline: ['#676767', 'cloud-off-outline', 'Offline, Retry?'],
  online: ['#77a459', 'cloud-check-outline', 'Connected'],
};

/**
 * Gets the color corresponsing to the status
 * @param s
 * @returns
 */
const getColor = (s: NetworkStatus) => {
  const [color, ..._other] = statusCITMap[s];
  return color;
};

const setNxMessage = (s: NetworkStatus | undefined) => {
  if (s === undefined) {
    return {text: 'Unknown', iconName: 'cloud', color: '#CCC'};
  }

  const [color, iconName, text] = statusCITMap[s];
  return {text, iconName, color};
};

function NetworkChip({
  status,
  onErrorPress,
}: {
  status?: NetworkStatus;
  onErrorPress?: () => void;
}) {
  const {color, text} = React.useMemo(() => setNxMessage(status), [status]);
  const allowErrorFn = status === 'error' || status === 'offline';
  return (
    <TouchableRipple
      onPress={allowErrorFn ? onErrorPress : undefined}
      style={{
        padding: 8,
        paddingHorizontal: 12,
        marginVertical: 8,
        borderWidth: 0.5,
        borderColor: color,
        borderRadius: 20,
        alignSelf: 'flex-start',
      }}>
      <View
        style={{
          display: 'flex',
          flexDirection: 'row',
          alignItems: 'center',
        }}>
        {/* Dot */}
        <View
          style={{
            width: 10,
            height: 10,
            backgroundColor: color,
            borderRadius: 100,
          }}
        />
        {allowErrorFn && (
          <Icon
            name="refresh"
            size={15}
            color={color}
            style={{marginLeft: 8}}
          />
        )}
        <Text size={'xs'} font="bold" color={color} style={{marginLeft: 8}}>
          {text}
        </Text>
      </View>
    </TouchableRipple>
  );
}

export default function ApVisDashboardScreen({
  entry: {fullName, networkStatus},
  actions: $,
}: WorkflowScreen<
  {fullName: string; networkStatus?: NetworkStatus | undefined},
  {
    syncPushAllData: () => Promise<void>;
    getUpcomingAppointments: () => Promise<CTC.Appointment[]>;
    getMissedAppointments: () => Promise<CTC.Appointment[]>;
    searchPatientsById: (partialId: string) => Promise<CTC.Patient[]>;
    onRegisterPatientWithId: (patientId: string) => void;
    onAttendPatient: (appt: CTC.Appointment) => void;
    onPatientList: () => void;
    onNewPatientVisit: (patient: CTC.Patient) => void;
    onNewPatient: () => void;
    onRetrySyncServer: () => void;
  }
>) {
  const [searchQuery, setSearchQuery] = React.useState('');
  React.useEffect(() => {
    if (searchQuery.trim().length === 0) {
      setPatients(null);
    }
  }, [searchQuery]);
  const [patients, setPatients] = React.useState<CTC.Patient[] | null>([]);
  const handleSearch = e => {
    // FIXME: Needs to be callback
    // TODO: start searching
    $.searchPatientsById(searchQuery).then(vals => setPatients(vals));
    return null;
  };

  // FAB
  const [open, setOpen] = React.useState(false);
  const onStateChange = ({open}: {open: boolean}) => setOpen(open);

  // Modal
  const [visible, setVisible] = React.useState(false);
  const showModal = () => setVisible(true);
  const hideModal = () => setVisible(false);

  // sets status for syncronizing data to the server
  const [isSyncing, setIsSyncing] = React.useState(false);

  return (
    <Layout style={{padding: 0}} hideHeader>
      {/* Modal */}
      <Portal>
        <Modal
          visible={visible}
          dismissable={false}
          contentContainerStyle={{
            backgroundColor: 'white',
            margin: 36,
          }}>
          <View style={{padding: 24}}>
            {isSyncing ? (
              <>
                <Text font="bold" style={{marginBottom: 20}}>
                  Pushing data to the server
                </Text>
                <View style={{display: 'flex', flexDirection: 'row'}}>
                  <ActivityIndicator
                    animating={true}
                    color={Color.secondary.light}
                  />
                  <Text style={{marginLeft: 8}}>Synchronizing Data</Text>
                </View>
              </>
            ) : (
              <Text font="medium">
                This will send current data to the server. Synchronize?
              </Text>
            )}
          </View>
          <Divider />

          {!isSyncing && (
            <View style={{padding: 12, display: 'flex', flexDirection: 'row'}}>
              <Button
                onPress={() => {
                  if (!isSyncing) {
                    setIsSyncing(true);
                    $.syncPushAllData()
                      .catch(err =>
                        console.log(
                          "There's a problem when pushind data..",
                          err,
                        ),
                      )
                      .finally(() => setIsSyncing(false))
                      .finally(hideModal);
                  }
                }}>
                Synchronize
              </Button>

              <Button
                onPress={() => {
                  setIsSyncing(false);
                  hideModal();
                }}>
                Cancel
              </Button>
            </View>
          )}
          {/* <Text font="bold" style={{marginBottom: 20}}>
              Pushing data to the server
            </Text>
            <View style={{display: 'flex', flexDirection: 'row'}}>
              <ActivityIndicator
                animating={true}
                color={Color.secondary.light}
              />
              <Text style={{marginLeft: 8}}>Synchronizing Data</Text>
            </View> */}
        </Modal>
      </Portal>
      <ScrollView
        contentContainerStyle={{
          paddingHorizontal: Spacing.lg,
          paddingBottom: 60,
        }}>
        <View
          style={{
            paddingVertical: 8,
          }}>
          {/* Socket */}
          <NetworkChip
            status={networkStatus}
            onErrorPress={$.onRetrySyncServer}
          />

          <View
            style={{
              display: 'flex',
              flexDirection: 'row',
              justifyContent: 'space-between',
            }}>
            <View>
              <Text font="extra-black" size={24}>
                Welcome Back,
              </Text>
              <Text font="extra-black" size={24}>
                {fullName}
              </Text>
            </View>

            <View
              style={{
                alignSelf: 'flex-end',
                padding: Spacing.md,
                borderRadius: 10,
              }}>
              <ElsaColorableIcon
                width={28}
                height={28}
                style={{
                  color: Color.primary.base,
                }}
              />
            </View>
          </View>
        </View>
        {/* Search Patient */}
        <View style={{marginTop: Spacing.md}}>
          <Text font="bold" size="md">
            Find a Patient
          </Text>
          <Text style={{lineHeight: 24}}>
            Search patient using the patient ID
          </Text>

          <View
            style={{
              display: 'flex',
              flexDirection: 'row',
              alignItems: 'center',
              marginTop: 10,
            }}>
            <Searchbar
              placeholder="Ex. 02020100123456"
              style={{flex: 1}}
              blurOnSubmit
              onChangeText={setSearchQuery}
              onSubmitEditing={handleSearch}
              value={searchQuery}
            />
          </View>
        </View>

        {patients !== null ? (
          <View style={{marginVertical: Spacing.md}}>
            <SearchPatientSection
              data={patients}
              onNewPatientVisit={$.onNewPatientVisit}
              onClear={() => setSearchQuery('')}
              onRegisterPatient={() => $.onRegisterPatientWithId(searchQuery)}
            />
          </View>
        ) : (
          <>
            {/* Appointment Section */}
            <View style={{marginTop: Spacing.lg}}>
              <MissedAppointmentsSection dataFn={$.getMissedAppointments} />
            </View>
            {/* Upcming Appointment Section */}
            <View style={{marginTop: Spacing.lg}}>
              <UpcomingAppointmentSection
                dataFn={$.getUpcomingAppointments}
                onAttendPatient={$.onAttendPatient}
              />
            </View>

            {/* Appointment Section
            <View style={{marginTop: Spacing.lg}}>
              <VisitSection data={Array(2).fill(2)} />
            </View> */}
          </>
        )}
      </ScrollView>

      {/* Fixed */}
      <FAB.Group
        open={open}
        visible
        icon={open ? 'close' : 'menu'}
        actions={[
          {
            icon: 'cloud-sync-outline',
            label: 'Syncronize Data',
            onPress: showModal,
            color: '#FFF',
            labelTextColor: '#FFF',
            labelStyle: {
              backgroundColor: Color.primary.light,
            },
            style: {
              backgroundColor: Color.primary.light,
            },
          },
          {
            icon: 'account-plus',
            label: 'New Patient',
            small: false,
            onPress: $.onNewPatient,
          },
          {
            icon: 'format-list-bulleted',
            label: 'Patient List',
            small: false,
            onPress: $.onPatientList,
          },
        ]}
        onStateChange={onStateChange}
      />
    </Layout>
  );
}
