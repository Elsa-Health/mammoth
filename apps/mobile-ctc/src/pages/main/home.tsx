import React from 'react';
import {View} from 'react-native';
import {Text} from '../../components';

export default function HomeScreen() {
  return (
    <View
      style={{
        flex: 1,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}>
      <Text>Home screen</Text>
    </View>
  );
}
