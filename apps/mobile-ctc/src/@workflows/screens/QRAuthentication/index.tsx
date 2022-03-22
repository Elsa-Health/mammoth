import React from 'react';
import {StyleSheet, View} from 'react-native';

import {Layout, Text} from '../../../@libs/elsa-ui/components';
import theme from '../../../@libs/elsa-ui/theme';

import QRCodeScanner from 'react-native-qrcode-scanner';
import {BarCodeReadEvent} from 'react-native-camera';

export default function LoginPage({
  actions: $,
}: WorkflowScreen<{}, {onReadQR: (e: BarCodeReadEvent) => void}>) {
  return (
    <Layout title="Scan card" style={{padding: 0}}>
      <View>
        <Text style={styles.centerText}>
          Place your Identitification Card at the center
        </Text>
      </View>
      <QRCodeScanner
        onRead={$.onReadQR}
        showMarker
        customMarker={
          <View
            style={{
              borderColor: theme.color.secondary.light,
              borderWidth: 1,
              width: 250,
              height: 250,
              borderRadius: 5,
            }}
          />
        }
      />
    </Layout>
  );
}

const styles = StyleSheet.create({
  centerText: {
    fontSize: 18,
    padding: 24,
    paddingVertical: 16,
    marginBottom: 16,
    color: '#777',
  },
});
