import React from 'react';
import SplashScreen from 'react-native-splash-screen';
import {
  ApplicationProvider,
  AppLoginState,
  useApplication,
} from './app/context/application';

import {SafeAreaProvider} from 'react-native-safe-area-context';
import CTCFlow from './@workflows/flows/CTC';
import QRLogin from './@workflows/screens/QRAuthentication';

import _ from 'lodash';
import {authenticate} from './app/utils';
import {ToastAndroid} from 'react-native';
import {View} from 'react-native';
import {Layout, Text} from './@libs/elsa-ui/components';

const authenticateQr =
  (
    onSuccess: (vals: {name: string; uid: string}) => void,
    onFail: (err: Error) => void,
  ) =>
  (e: {data: string}) => {
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

function _Application({isLogin, user}: {isLogin: boolean; user?: AppUser}) {
  // set's the user if passed... otherwise.. doesnt
  // TODO: Set up such that the types match with the workflow -> UserObject
  const setUser = useApplication(s => s.login);

  if (isLogin) {
    return (
      <QRLogin
        actions={{
          onReadQR: authenticateQr(setUser, err =>
            ToastAndroid.show(err.message, ToastAndroid.SHORT),
          ),
        }}
        entry={{}}
      />
    );
  }

  return (
    <Layout>
      <Text>Kevin</Text>
    </Layout>
  );
}

export default function App() {
  React.useEffect(() => {
    SplashScreen.hide();
  }, []);

  return (
    <ApplicationProvider>
      <SafeAreaProvider>
        <AppLoginState>
          {({isLogin, user}) => <_Application isLogin={isLogin} user={user} />}
        </AppLoginState>
      </SafeAreaProvider>
    </ApplicationProvider>
  );
}
