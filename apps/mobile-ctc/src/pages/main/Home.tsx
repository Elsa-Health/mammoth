import {useNavigation} from '@react-navigation/native';
import React from 'react';
import {View} from 'react-native';
import {Layout, Text} from '../../components';
import {Button} from '../../components/input';

function Appointment() {
  return (
    <View>
      <Text>Appointment</Text>
    </View>
  );
}

function Visit() {
  return (
    <View>
      <Text>Visit</Text>
    </View>
  );
}

function ViewAppointments({data}: {data: Appointment[]}) {
  return <></>;
}

function ViewVisit({data}: {data: Visit[]}) {
  return <></>;
}

function useCTCData() {
  return {
    appointments: [],
    visits: [],
  };
}

export default function HomeScreen() {
  const {appointments, visits} = useCTCData();
  const navigation = useNavigation();
  return (
    <Layout title="Home">
      <View style={{}}>
        <Button
          title="New Session"
          onPress={() => navigation.navigate('app.select_patient')}
        />
      </View>
      {/* View appointments */}
      <View style={{flex: 1, paddingVertical: 10}}>
        <Text>My appointments</Text>
        <Text>List of appointment (future things)</Text>
        <View>
          <ViewAppointments data={appointments} />
        </View>
      </View>
      <View style={{flex: 1, paddingVertical: 10}}>
        <Text>My Visits</Text>
        <Text>List of a few of my visits (past things)</Text>
        <View>
          <ViewVisit data={visits} />
        </View>
      </View>
    </Layout>
  );
}
