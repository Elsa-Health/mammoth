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
import {Analytics} from './CTC/analytics';

// FIXME: Remove API key and secret
if (!__DEV__) {
  Sentry.init({
    dsn: 'https://6ca7254d249c4739b3db2cb7af62b796@o683972.ingest.sentry.io/5804165',
    // Set tracesSampleRate to 1.0 to capture 100% of transactions for performance monitoring.
    // We recommend adjusting this value in production.
    // tracesSampleRate: 1.0,
    tracesSampleRate: 0.5,
  });
}

// import firestore from '@react-native-firebase/firestore';
// (async () => {
//   const f = firestore().collection('facilities');
//   const s = await f.get();

//   const out = s.docs
//     .map(d => d.data())
//     .filter(d => d.ctcCode !== undefined)
//     .map(d => ({name: d.name, ctc: d.ctcCode}));
//   console.log(out);
// })();

function _Application() {
  // set's the user if passed... otherwise.. doesnt
  // TODO: Set up such that the types match with the workflow -> UserObject
  // const setUser = useApplication(s => s.login);
  // const {provider, set} = useApplication();

  const {loading, state, logout, set} = useApplication();

  React.useEffect(() => {
    if (state) {
      //
      Analytics.init(state.provider);
    }
  }, [state]);

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
        <CTC
          provider={state.provider}
          logout={async () => {
            logout();
            await Analytics.logEvent('logout');
          }}
        />
      </NavigationContainer>
    );
  }

  return (
    <QRLogin
      actions={{
        authenticate: authenticate,
        onQueryProvider: async provider => {
          set({provider, settings: null});
          await Analytics.logEvent('login');
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
            <_Application />
          </SafeAreaProvider>
        </LanguageProvider>
      </ApplicationProvider>
    </ThemeProvider>
  );
}

export default __DEV__ ? App : Sentry.wrap(App);
