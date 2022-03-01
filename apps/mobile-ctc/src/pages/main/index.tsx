import React from 'react';
import {View} from 'react-native';

import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

// Screen
import HomeScreen from './home';
import AppointmentScreen from './appointment';
import {SafeAreaProvider} from 'react-native-safe-area-context';

const Stack = createNativeStackNavigator();

export default function Main() {
  return (
    <NavigationContainer
      theme={{
        colors: {
          background: '#FFF',
        },
      }}>
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
        }}>
        <Stack.Screen name="home" component={HomeScreen} />
        <Stack.Screen name="appoinment" component={AppointmentScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
