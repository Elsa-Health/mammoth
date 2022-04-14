import React from 'react';
import {ScrollView, View} from 'react-native';
import {WorkflowScreen} from '../..';
import {AltLayout as Layout, Text} from '../../../@libs/elsa-ui/components';
import {DefaultColor, DefaultSpacing} from '../../../@libs/elsa-ui/theme';

import {format} from 'date-fns';

import {
  ActivityIndicator,
  Button,
  Divider,
  FAB,
  Searchbar,
} from 'react-native-paper';

export default function ViewPatientsScreen({
  actions: $,
}: WorkflowScreen<
  {},
  {
    onMount?: () => void | (() => void);
    getPatients: () => Promise<CTC.Patient[]>;
    onDashboard: () => void;
    onNewPatient: () => void;
    onViewPatientProfile: (patient: CTC.Patient) => void;
    onSyncPushPatientList: (patients: CTC.Patient[]) => void;
    onNewPatientVisit: (patient: CTC.Patient) => void;
    searchPatientsById: (partialId: string) => Promise<CTC.Patient[]>;
  }
>) {
  const [patients, setPatients] = React.useState<CTC.Patient[] | undefined>(
    undefined,
  );
  const [searchQuery, setSearchQuery] = React.useState('');

  // Fired on mount
  React.useEffect(() => {
    const d = $.onMount?.();
    return d;
  }, []);

  React.useEffect(() => {
    if (searchQuery.trim().length === 0) {
      $.getPatients().then(patients => setPatients(patients));
    }
  }, [searchQuery]);

  const handleSearch = e => {
    $.searchPatientsById(searchQuery).then(vals => setPatients(vals));
    return null;
  };

  React.useEffect(() => {
    $.getPatients().then(patients => setPatients(patients));
  }, []);

  const [open, setOpen] = React.useState(false);
  const onStateChange = ({open}: {open: boolean}) => setOpen(open);

  if (patients === undefined) {
    return (
      <View
        style={{
          flex: 1,
          backgroundColor: '#FFF',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}>
        <View style={{display: 'flex', flexDirection: 'row'}}>
          <ActivityIndicator
            animating={true}
            color={DefaultColor.primary.light}
          />
          <Text style={{marginLeft: DefaultSpacing.md}} font="bold">
            Loading
          </Text>
        </View>
      </View>
    );
  }

  return (
    <Layout title="Patients" style={{padding: 0}}>
      <ScrollView
        contentContainerStyle={{paddingHorizontal: DefaultSpacing.lg}}>
        <View style={{marginVertical: DefaultSpacing.sm}}>
          <Searchbar
            placeholder="Patient ID"
            style={{flex: 1}}
            blurOnSubmit
            onChangeText={setSearchQuery}
            onSubmitEditing={handleSearch}
            value={searchQuery}
          />
        </View>
        {/*  */}
        <View>
          <View
            style={{
              flexDirection: 'row',
              display: 'flex',
              marginVertical: DefaultSpacing.sm,
            }}>
            <Text size={20}>Number of Patients</Text>
            <Text
              size={20}
              font="extra-black"
              color="#555"
              style={{marginHorizontal: 12}}>
              {'/'}
            </Text>
            <Text size={20} color={DefaultColor.primary.dark} font="bold">
              {patients.length}
            </Text>
          </View>
        </View>

        {patients !== undefined ? (
          <View>
            {patients.map(patient => (
              <React.Fragment key={patient.id}>
                <View>
                  <Patient
                    data={patient}
                    onNewVisit={() => $.onNewPatientVisit(patient)}
                    onViewProfile={() => $.onViewPatientProfile(patient)}
                  />
                </View>
                <Divider />
              </React.Fragment>
            ))}
          </View>
        ) : (
          <View style={{padding: DefaultSpacing.md, alignItems: 'center'}}>
            <Text>Loading</Text>
          </View>
        )}
        <View style={{marginVertical: DefaultSpacing.lg}}>
          <Button mode="outlined" onPress={$.onDashboard}>
            Dashboard
          </Button>
        </View>
      </ScrollView>

      <FAB.Group
        open={open}
        visible
        icon={open ? 'close' : 'account-circle-outline'}
        actions={[
          ...(patients !== undefined
            ? [
                {
                  icon: 'account-sync',
                  label: 'Synchronize Patient List',
                  // small: false,
                  onPress: () => $.onSyncPushPatientList(patients),
                },
              ]
            : []),
          {
            icon: 'account-plus',
            label: 'New Patient',
            small: false,
            onPress: $.onNewPatient,
          },
        ]}
        onStateChange={onStateChange}
      />
    </Layout>
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
