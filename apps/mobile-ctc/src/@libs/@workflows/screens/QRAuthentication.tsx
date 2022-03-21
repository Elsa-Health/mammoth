import React from 'react';
import {StyleSheet, ToastAndroid, View} from 'react-native';

import {Layout, Text} from '@elsa-ui/react-native/components';
import theme from '@elsa-ui/react-native/theme';

import QRCodeScanner from 'react-native-qrcode-scanner';
import {BarCodeReadEvent} from 'react-native-camera';

import _ from 'lodash';

const authenticateQr =
  (
    onSuccess: (vals: {name: string; uid: string}) => void,
    onFail: (err: Error) => void,
  ) =>
  (e: BarCodeReadEvent) => {
    authenticate(e.data)
      .then(info => {
        onSuccess({
          name:
            _.upperFirst(info.firstName) + ' ' + _.upperFirst(info.lastName),
          uid: info.id,
        });
      })
      .catch(onFail);
  };

export default function LoginPage({}: {}) {
  return (
    <Layout>
      <QRCodeScanner
        onRead={authenticateQr(login, err =>
          ToastAndroid.show(err.message, ToastAndroid.SHORT),
        )}
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
        topContent={<Text style={styles.centerText}>Login here</Text>}
      />
    </Layout>
  );
}

const styles = StyleSheet.create({
  centerText: {
    flex: 1,
    fontSize: 18,
    padding: 32,
    color: '#777',
  },
});
