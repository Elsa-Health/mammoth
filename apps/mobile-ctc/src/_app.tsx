import React from 'react';
import SplashScreen from 'react-native-splash-screen';
// import {
//   ApplicationProvider,
//   AppLoginState,
//   useApplication,
// } from './app/context/application';

import {SafeAreaProvider} from 'react-native-safe-area-context';
import {ThemeProvider} from './@libs/elsa-ui/theme';

import {LanguageProvider} from './@libs/elsa-utils/locale';

import _ from 'lodash';
import {
  ApplicationProvider,
  authenticate,
  useApplication,
} from './provider/context';

import CTC from './CTC';
import {NavigationContainer} from '@react-navigation/native';
import produce from 'immer';

import QRLogin from './CTC/screens/QRAuthentication';
import * as Sentry from '@sentry/react-native';

import {View, Text} from 'react-native';

// FIXME: Remove API key and secret
Sentry.init({
  dsn: 'https://6ca7254d249c4739b3db2cb7af62b796@o683972.ingest.sentry.io/5804165',
  // Set tracesSampleRate to 1.0 to capture 100% of transactions for performance monitoring.
  // We recommend adjusting this value in production.
  // tracesSampleRate: 1.0,
  tracesSampleRate: 0.5,
});

// const authenticateQr =
//   (
//     onSuccess: (vals: {name: string; uid: string}) => void,
//     onFail: (err: Error) => void,
//   ) =>
//   (e: {data: string}) => {
//     authenticate(e.data)
//       .then(info => {
//         onSuccess({
//           name:
//             _.upperFirst(info.firstName) + ' ' + _.upperFirst(info.lastName),
//           uid: info.id,
//         });
//       })
//       .catch(onFail);
//   };

// function _Application({isLogin, user}: {isLogin: boolean; user?: AppUser}) {
//   // set's the user if passed... otherwise.. doesnt
//   // TODO: Set up such that the types match with the workflow -> UserObject
//   const setUser = useApplication(s => s.login);

//   React.useEffect(() => {
//     if (user !== undefined) {
//       if (!__DEV__) {
//         Sentry.setUser({
//           username: `[ctc-device-user]::${user.uid}`,
//         });
//       }
//     }
//   }, [user]);

//   if (!isLogin) {
//     return (
//       <QRLogin
//         actions={{
//           onReadQR: authenticateQr(setUser, err =>
//             ToastAndroid.show(err.message, ToastAndroid.SHORT),
//           ),
//         }}
//         entry={{}}
//       />
//     );
//   }

//   if (user === undefined) {
//     return null;
//   }

//   return (
//     <NavigationContainer>
//       <CTC fullName={user.name || user.uid} />
//     </NavigationContainer>
//   );
// }

function _Application() {
  // set's the user if passed... otherwise.. doesnt
  // TODO: Set up such that the types match with the workflow -> UserObject
  // const setUser = useApplication(s => s.login);
  // const {provider, set} = useApplication();

  const {loading, state, logout, set} = useApplication();

  if (loading) {
    return (
      <View>
        <Text>Loading...</Text>
      </View>
    );
  }

  if (state !== null) {
    return (
      <NavigationContainer>
        <CTC provider={state.provider} logout={logout} />
      </NavigationContainer>
    );
  }

  return (
    <QRLogin
      actions={{
        authenticate: authenticate,
        onQueryProvider: provider => {
          set({provider, settings: null});
          console.log('Logged in as provider', provider.user.uid);
        },
      }}
    />
  );
}

function App() {
  React.useEffect(() => {
    SplashScreen.hide();
  }, []);

  return (
    <ThemeProvider
      theme={theme =>
        produce(theme, df => {
          df.contentType = 'colored';
        })
      }>
      <ApplicationProvider>
        <LanguageProvider>
          <SafeAreaProvider>
            {/* {error !== undefined ? (
              <View>
                <Text>{error.message}</Text>
              </View>
            ) : (
            )} */}
            <_Application />

            {/* <AppLoginState>
              {({isLogin, user}) => (
                <_Application isLogin={isLogin} user={user} />
              )}
            </AppLoginState> */}
          </SafeAreaProvider>
        </LanguageProvider>
      </ApplicationProvider>
    </ThemeProvider>
  );
}

export default __DEV__ ? App : Sentry.wrap(App);
