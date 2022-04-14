import React from 'react';
import SplashScreen from 'react-native-splash-screen';
import {
  ApplicationProvider,
  AppLoginState,
  useApplication,
} from './app/context/application';

import {SafeAreaProvider} from 'react-native-safe-area-context';
import QRLogin from './@workflows/screens/QRAuthentication';
import {ThemeProvider} from './@libs/elsa-ui/theme';

import {LanguageProvider} from './@libs/elsa-utils/locale';

import _ from 'lodash';
import {authenticate} from './app/utils';
import {ToastAndroid, View} from 'react-native';

import CTC from './CTC';
import {NavigationContainer} from '@react-navigation/native';

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

  if (!isLogin) {
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

  if (user === undefined) {
    return null;
  }

  return (
    <NavigationContainer>
      <CTC fullName={user.name || user.uid} />
    </NavigationContainer>
  );
}

export default function App() {
  React.useEffect(() => {
    SplashScreen.hide();
  }, []);

  return (
    <ThemeProvider>
      <ApplicationProvider>
        <LanguageProvider>
          <SafeAreaProvider>
            <AppLoginState>
              {({isLogin, user}) => (
                <_Application isLogin={isLogin} user={user} />
              )}
            </AppLoginState>
          </SafeAreaProvider>
        </LanguageProvider>
      </ApplicationProvider>
    </ThemeProvider>
  );
}
