import React from 'react';
import SplashScreen from 'react-native-splash-screen';
import {
  ApplicationProvider,
  // AppLoginState,
  // useApplication,
} from './app/context/application';

import {SafeAreaProvider} from 'react-native-safe-area-context';
import {ThemeProvider} from './@libs/elsa-ui/theme';

import {LanguageProvider} from './@libs/elsa-utils/locale';
import AsyncStorage from '@react-native-async-storage/async-storage';

import _ from 'lodash';
// import {authenticate} from './app/utils';
// import {ToastAndroid, View} from 'react-native';

// import {ApplicationProvider, useApplication} from './provider/context';

import CTC from './CTC';
import {NavigationContainer} from '@react-navigation/native';
import produce from 'immer';

import QRLogin from './CTC/screens/QRAuthentication';
import * as Sentry from '@sentry/react-native';
import {Identity, ElsaProvider} from './provider/backend';
import {useAsync} from 'react-use';

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

type AppContextState = null | {
  provider: ElsaProvider;
  settings: null | {language: string};
};
function _Application({state: initialState}: {state: AppContextState | null}) {
  // set's the user if passed... otherwise.. doesnt
  // TODO: Set up such that the types match with the workflow -> UserObject
  // const setUser = useApplication(s => s.login);
  // const {provider, set} = useApplication();

  const [state, set] = React.useState<null | AppContextState>(initialState);
  console.log(initialState);

  React.useEffect(() => {
    if (state !== null) {
      // persist the data to storage
      // Change the data
      AsyncStorage.multiSet([
        ['@UserProfile#Provider', JSON.stringify(state.provider.toJSON())],
        ['@UserProfile#Settings', JSON.stringify(state.settings)],
      ]);
    }
  }, [state]);

  // const setProvider = (state: {
  //   provider: ElsaProvider;
  //   settings?: null | {language: string};
  // }) => {
  //   const {provider, ...other} = state;
  //   set(state)
  // }

  const clear = React.useCallback(() => {
    set(null);
  }, []);

  // React.useEffect(() => {
  //   if (user !== undefined) {
  //     if (!__DEV__) {
  //       Sentry.setUser({
  //         username: `[ctc-device-user]::${user.uid}`,
  //       });
  //     }
  //   }
  // }, [user]);

  // React.useEffect(() => {
  //   console.log({provider});
  // }, [provider]);

  if (state !== null) {
    return (
      <NavigationContainer>
        <CTC provider={state.provider} logout={clear} />
      </NavigationContainer>
    );
  }

  return (
    <QRLogin
      actions={{
        // onReadCode: authenticateQr(setUser, err =>
        //   ToastAndroid.show(err.message, ToastAndroid.SHORT),
        // ),
        convertCodeToData: Identity.parse,
        onQueryProvider: provider => {
          set({provider, settings: null});
          console.log('Logged in as provider', provider.user.uid);
        },
      }}
      // entry={{}}
    />
  );
  // if (!isLogin) {
  // }

  // if (user === undefined) {
  //   return null;
  // }
}

function App() {
  React.useEffect(() => {
    SplashScreen.hide();
  }, []);

  const {loading, value, error} = useAsync(async () => {
    // load from persistance
    // TODO: check session
    const strProvider = await AsyncStorage.getItem('@UserProfile#Provider');
    const strSettings = await AsyncStorage.getItem('@UserProfile#Settings');

    if (strProvider !== null) {
      const val = JSON.parse(strProvider);

      if (val !== null) {
        return {
          provider: ElsaProvider.fromJSON(val),
          settings: strSettings !== null ? JSON.parse(strSettings) : null,
        };
      }
    }

    return null;
  }, []);

  if (loading) {
    return (
      <View>
        <Text>Loading...</Text>
      </View>
    );
  }

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
            {error !== undefined ? (
              <View>
                <Text>{error.message}</Text>
              </View>
            ) : (
              <_Application state={value ?? null} />
            )}
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
