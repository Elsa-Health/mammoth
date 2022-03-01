import React from 'react';
import {View} from 'react-native';

import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

// Screen
import HomeScreen from './home';
import AppointmentScreen from './appointment';

const Stack = createNativeStackNavigator();

export default function Main() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="home" component={HomeScreen} />
        <Stack.Screen name="appoinment" component={AppointmentScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
