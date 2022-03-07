import React from 'react';
import {View} from 'react-native';

import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

// Screen
import HomeScreen from './Home';
import SessionScreen from './Session';
import SelectPatientScreen from './SelectPatient';

const Stack = createNativeStackNavigator();

export default function Main() {
  return (
    <NavigationContainer
      theme={{
        // @ts-ignore
        colors: {
          background: '#FFF',
        },
      }}>
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
        }}>
        <Stack.Screen name="app.home" component={HomeScreen} />
        <Stack.Screen name="app.session" component={SessionScreen} />
        <Stack.Screen
          name="app.select_patient"
          component={SelectPatientScreen}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
