import React from 'react';
import {View} from 'react-native';
import {Layout, Text} from '../../components';

function ViewAppointments({data}: {data: Appointment[]}) {
  return <></>;
}

function fetchData() {}

function useCTCAppointments(): {
  data: Appointment[];
} {
  return {
    data: [],
  };
}

export default function HomeScreen() {
  const {data: appointments} = useCTCAppointments();
  return (
    <Layout title="Home">
      {/* View appointments */}
      <View style={{minHeight: '30%'}}>
        <Text>My appointments</Text>
        <View>
          <ViewAppointments data={appointments} />
        </View>
      </View>
      <View style={{minHeight: '30%'}}>
        <Text>My Visits</Text>
      </View>

      {/* Create */}
      <View></View>
    </Layout>
  );
}
