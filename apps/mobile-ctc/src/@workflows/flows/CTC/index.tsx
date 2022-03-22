import React from 'react';
import {Layout} from '../../../@libs/elsa-ui/components';

import {withFlowContext} from '../../index';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

import ApVisDahboardScreen from '../../screens/ApVisDashboard';

const Stack = createNativeStackNavigator();

export default function CTCFlow() {
  return (
    <Stack.Navigator screenOptions={{headerShown: false}}>
      <Stack.Screen
        name="ctc.dashboard"
        component={withFlowContext(ApVisDahboardScreen, {
          entry: {
            fullName: 'Kevin James',
          },
          actions: ({navigation}) => ({
            loadPatients: async () => [],
          }),
        })}
      />
    </Stack.Navigator>
  );
}
