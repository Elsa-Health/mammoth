import React from 'react';
import {ScrollView, ToastAndroid, View} from 'react-native';
import {WorkflowScreenProps} from '../../../@workflows';
import {Layout, Text} from '../../../@libs/elsa-ui/components';
import {
  DefaultColor,
  DefaultSpacing,
  useTheme,
} from '../../../@libs/elsa-ui/theme';
import {ElsaColorableIcon} from '../../../@libs/elsa-ui/visuals/vectors';

import {format} from 'date-fns';

import {
  ActivityIndicator,
  Divider,
  IconButton,
  Menu,
  Modal,
  Portal,
  TextInput,
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
          style={{
            flex: 1,
            alignItems: 'center',
            marginVertical: DefaultSpacing.md,
          }}>
          <Text italic>You are all set.</Text>
          <Text italic>There are no missing appointments</Text>
        </View>
      ) : (
        <View>
          {data.map((appt, ix) => {
            return (
              <View key={ix} style={{paddingVertical: DefaultSpacing.sm}}>
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
          style={{
            flex: 1,
            alignItems: 'center',
            marginVertical: DefaultSpacing.md,
          }}>
          <Text italic>There are no appointments created.</Text>
          <Text italic>Create appointments to have one show up.</Text>
        </View>
      ) : (
        <>
          <View>
            {data.map((appt, ix) => {
              return (
                <View key={ix} style={{paddingVertical: DefaultSpacing.sm}}>
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
  onViewProfile,
}: {
  data: CTC.Patient;
  onNewVisit: () => void;
  onViewProfile: () => void;
}) {
  return (
    <View style={{paddingVertical: 12}}>
      <View style={{marginBottom: 8}}>
        <Text
          font="bold"
          size="xs"
          color={DefaultColor.secondary.base}
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
          color={DefaultColor.secondary.base}
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
          icon="file"
          onPress={onViewProfile}>
          View Profile
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
  onViewPatientProfile,
}: {
  data: CTC.Patient[];
  onClear: () => void;
  onNewPatientVisit: (patient: CTC.Patient) => void;
  onViewPatientProfile: (patient: CTC.Patient) => void;
  onRegisterPatient: () => void;
}) {
  return (
    <View style={{paddingVertical: DefaultSpacing.xs, flex: 1}}>
      {data.length === 0 ? (
        <View>
          <View
            style={{
              flex: 1,
              alignItems: 'center',
              marginVertical: DefaultSpacing.md,
            }}>
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
            <Patient
              data={d}
              onViewProfile={() => onViewPatientProfile(d)}
              onNewVisit={() => onNewPatientVisit(d)}
            />
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
// const getColor = (s: NetworkStatus) => {
//   const [color, ..._other] = statusCITMap[s];
//   return color;
// };

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

import {Chip} from 'react-native-paper';

const availableCTCCodes = [
  {ctc: '02020105', name: 'Makiba'},
  {ctc: '02020500', name: 'Usa Government'},
  {ctc: '02020100', name: 'Patandi'},
  {ctc: '02020118', name: 'Momela'},
  {ctc: '02020300', name: 'Nkoaranga Lutheran Hospital'},
  {ctc: '02020250', name: 'Usa Dreams CTC'},
  {ctc: '02020120', name: 'Mareu'},
  {ctc: '02020103', name: 'Ngarenanyuki Health Centre'},
].sort((a, b) => {
  return a.ctc.localeCompare(b.ctc);
});

function CTCSearchBox({
  value,
  selfCTCCode,
  onChangeValue,
  onHandleSearch,
}: {
  value: string;
  selfCTCCode?: string;
  onChangeValue: (s: string) => void;
  onHandleSearch: (val: string) => void;
}) {
  const [showSelectionModal, setShow] = React.useState(false);

  const {color} = useTheme();
  const searchRef = React.useRef();

  const prefillIdWithCode = (code: string) => {
    onChangeValue(code);
    searchRef.current?.focus();
  };

  return (
    <>
      <Portal>
        <Modal
          visible={showSelectionModal}
          onDismiss={() => setShow(false)}
          contentContainerStyle={{
            backgroundColor: 'white',
            margin: 36,
          }}>
          <View>
            <View style={{paddingHorizontal: 16, paddingVertical: 12}}>
              <Text font="bold" size={'lg'}>
                Select CTC
              </Text>
            </View>
            <Divider />
            <View>
              {availableCTCCodes.map((item, ix) => (
                <TouchableRipple
                  key={ix}
                  onPress={() => {
                    setShow(false);
                    prefillIdWithCode(item.ctc);
                  }}>
                  <View style={{paddingVertical: 8, paddingHorizontal: 16}}>
                    <Text size={16} style={{marginBottom: 4, letterSpacing: 1}}>
                      {item.name}
                    </Text>
                    <Text
                      font="medium"
                      size={16}
                      style={{textTransform: 'uppercase', letterSpacing: 1}}>
                      {item.ctc}
                    </Text>
                  </View>
                </TouchableRipple>
              ))}
            </View>
          </View>
        </Modal>
      </Portal>
      <View>
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
          <View style={{flexDirection: 'row'}}>
            {/* <TextInput
              style={{flex: 2}}
              mode="outlined"
              label="Enter Patient Full ID"
              value={id}
              maxLength={14}
              onChangeText={setId}
              left={<TextInput.Icon name="magnify" />}
            /> */}

            <Searchbar
              ref={searchRef}
              placeholder="Full Patient ID"
              blurOnSubmit
              style={{elevation: 1, borderWidth: 0.4, borderColor: '#ccc'}}
              onChangeText={onChangeValue}
              onSubmitEditing={onHandleSearch}
              value={value}
            />
          </View>
        </View>
        <View
          style={{paddingVertical: 12, flexDirection: 'row', flexWrap: 'wrap'}}>
          <Chip
            icon="clipboard-plus-outline"
            mode="outlined"
            style={{marginRight: 8}}
            onPress={() => setShow(true)}>
            Select CTC Code
          </Chip>
          {selfCTCCode !== undefined && (
            <Chip
              icon="home-plus"
              mode="outlined"
              selectedColor={color.primary.dark}
              style={{marginRight: 8}}
              onPress={() => prefillIdWithCode(selfCTCCode)}>
              Use My Code
            </Chip>
          )}
        </View>
      </View>
    </>
  );
}

export default function CTCDashboardScreen({
  entry: {fullName, networkStatus, myCtcCode},
  actions: $,
}: WorkflowScreenProps<
  {
    fullName: string;
    myCtcCode?: string;
    networkStatus?: NetworkStatus | undefined;
  },
  {
    onLogout: () => void;
    syncPushAllData: () => Promise<void>;
    getRecentUpcomingAppointments: () => Promise<CTC.Appointment[]>;
    getRecentMissedAppointments: () => Promise<CTC.Appointment[]>;
    searchPatientsById: (partialId: string) => Promise<CTC.Patient[]>;
    onRegisterPatientWithId: (patientId: string) => void;
    onAttendPatient: (appt: CTC.Appointment) => void;
    onPatientList: () => void;
    onNewPatientVisit: (patient: CTC.Patient) => void;
    onViewPatientProfile: (patient: CTC.Patient) => void;
    onNewPatient: () => void;
    generateReport: () => Promise<void>;
    onRetrySyncServer: () => void;
    onTestNotification: () => void;
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

  // Menu

  const [menuVisible, setMenuVisible] = React.useState(false);
  const openMenu = () => setMenuVisible(true);
  const closeMenu = () => setMenuVisible(false);

  // generateReport
  const [grModal, setGrModal] = React.useState(false);
  const generateReport = async () => {
    closeMenu();
    // ToastAndroid.show('You need to update the app!', ToastAndroid.SHORT);

    setGrModal(true);
    try {
      const filePath = await $.generateReport();
      ToastAndroid.show('Report saved!', ToastAndroid.SHORT);
    } catch (err) {
      ToastAndroid.show(err?.message, ToastAndroid.LONG);
    } finally {
      setGrModal(false);
    }
  };

  return (
    <>
      {/* General Modal */}
      <Portal>
        <Modal
          visible={grModal}
          dismissable={false}
          contentContainerStyle={{
            borderRadius: 4,
            backgroundColor: 'white',
            margin: 36,
          }}>
          <View style={{padding: 24}}>
            <Text>Generating Report...</Text>
          </View>
        </Modal>
      </Portal>
      {/* App Start */}
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
                      color={DefaultColor.secondary.light}
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
              <View
                style={{padding: 12, display: 'flex', flexDirection: 'row'}}>
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
          </Modal>
        </Portal>
        <ScrollView
          contentContainerStyle={{
            paddingHorizontal: DefaultSpacing.lg,
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
              style={{flexDirection: 'row', justifyContent: 'space-between'}}>
              <View
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  // justifyContent: '',
                }}>
                <View
                  style={{
                    alignSelf: 'flex-start',
                    marginVertical: 10,
                  }}>
                  <ElsaColorableIcon
                    width={28}
                    height={28}
                    style={{
                      color: DefaultColor.primary.base,
                    }}
                  />
                </View>
                <View>
                  <Text font="extra-black" size={24}>
                    Habari,
                  </Text>
                  <Text font="extra-black" size={24}>
                    {fullName}
                  </Text>
                </View>
              </View>

              {/* Settings */}
              <View>
                <Menu
                  visible={menuVisible}
                  onDismiss={closeMenu}
                  anchor={
                    <IconButton icon="dots-vertical" onPress={openMenu} />
                  }>
                  <Menu.Item onPress={generateReport} title="Get Report" />
                  <Divider />
                  <Menu.Item onPress={$.onLogout} title="Logout" />
                  <Menu.Item
                    onPress={$.onTestNotification}
                    title="Test Notification"
                  />
                </Menu>
              </View>
            </View>
          </View>
          {/* Search Patient */}
          <View style={{marginTop: DefaultSpacing.md}}>
            <CTCSearchBox
              value={searchQuery}
              selfCTCCode={myCtcCode}
              onChangeValue={setSearchQuery}
              onHandleSearch={handleSearch}
            />
          </View>

          {patients !== null ? (
            <View style={{marginVertical: DefaultSpacing.md}}>
              <SearchPatientSection
                data={patients}
                onNewPatientVisit={$.onNewPatientVisit}
                onViewPatientProfile={$.onViewPatientProfile}
                onClear={() => setSearchQuery('')}
                onRegisterPatient={() => $.onRegisterPatientWithId(searchQuery)}
              />
            </View>
          ) : (
            <>
              {/* Appointment Section */}
              <View style={{marginTop: DefaultSpacing.lg}}>
                <MissedAppointmentsSection
                  dataFn={$.getRecentMissedAppointments}
                />
              </View>
              {/* Upcming Appointment Section */}
              <View style={{marginTop: DefaultSpacing.lg}}>
                <UpcomingAppointmentSection
                  dataFn={$.getRecentUpcomingAppointments}
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
                backgroundColor: DefaultColor.primary.light,
              },
              style: {
                backgroundColor: DefaultColor.primary.light,
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
    </>
  );
}
