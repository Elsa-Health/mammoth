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

import {NavigationContainer} from '@react-navigation/native';
import rnpTheme from './@libs/elsa-ui/theme/rnp';

import {LanguageProvider} from './@libs/elsa-utils/locale';

import _ from 'lodash';
import {authenticate} from './app/utils';
import {ToastAndroid} from 'react-native';

import {Provider as PaperProvider} from 'react-native-paper';

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

  return (
    <NavigationContainer>
      <CTCFlow />
    </NavigationContainer>
  );
}

export default function App() {
  React.useEffect(() => {
    SplashScreen.hide();
  }, []);

  return (
    <PaperProvider theme={rnpTheme}>
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
    </PaperProvider>
  );
}
