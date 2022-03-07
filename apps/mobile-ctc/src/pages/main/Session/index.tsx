import React from 'react';
import {View} from 'react-native';
import {Layout, Text} from '../../../components';

import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {useNavigation, useRoute} from '@react-navigation/native';

import create from 'zustand';
import createContext from 'zustand/context';

const Stack = createNativeStackNavigator();
function IntakePage() {
  return <Layout></Layout>;
}

const {Provider, useStore: useSession} = createContext();
const createStore = (patient?: string) => create((set, get) => ({}));

function PatientSession({
  patientId,
  children,
}: {
  patientId?: string;
  children: React.ReactNode;
}) {
  return <Provider createStore={createStore}>{children}</Provider>;
}

export default function AppSession() {
  const route = useRoute();
  React.useEffect(() => {
    const {patient}: {patient?: string} = route?.params || {};
  }, []);
  return (
    <PatientSession>
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
        }}>
        <Stack.Screen name="intake" component={IntakePage} />
      </Stack.Navigator>
    </PatientSession>
  );
}
