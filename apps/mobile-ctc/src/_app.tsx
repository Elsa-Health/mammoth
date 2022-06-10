import React from 'react';
import SplashScreen from 'react-native-splash-screen';
// import {
//   ApplicationProvider,
//   AppLoginState,
//   useApplication,
// } from './app/context/application';

import {SafeAreaProvider} from 'react-native-safe-area-context';
import {ThemeProvider} from '@elsa-ui/react-native/theme';

import {LanguageProvider} from '@elsa-ui/react-native-workflows/utilities/locale';

import _ from 'lodash';
import {
  ApplicationProvider,
  authenticate,
  useApplication,
} from './provider/context';

import CTC from './CTC';
import {NavigationContainer} from '@react-navigation/native';
import produce from 'immer';

import QRLogin from './@workflows/screens/QRAuthentication';
import * as Sentry from '@sentry/react-native';

import {Text} from '@elsa-ui/react-native/components';
import {View} from 'react-native';
import {Analytics} from './CTC/analytics';

import pj from '../package.json';

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
          appVersion={pj.version}
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

import codePush from 'react-native-code-push';
import {useAsync} from 'react-use';
import {ProgressBar} from 'react-native-paper';

function CodePushWrapper({children}: {children: React.ReactNode}) {
  const [text, set] = React.useState(`Version: ${pj.version}`);
  const [progress, setProgress] = React.useState(0);

  const statusCb = (status: codePush.SyncStatus) => {
    setProgress(0);
    switch (status) {
      case codePush.SyncStatus.DOWNLOADING_PACKAGE:
        // Show "downloading" modal
        set('Downloading update');
        break;
      case codePush.SyncStatus.INSTALLING_UPDATE:
        // Hide "downloading" modal
        set('Installing update');
        break;
      case codePush.SyncStatus.UPDATE_INSTALLED:
        set('Update Installed!');
        break;
      case codePush.SyncStatus.UP_TO_DATE:
        set(`Version: ${pj.version} (Latest)`);
        break;
    }
  };
  // Makes the update happen
  useAsync(async () => {
    const out = await codePush.sync(
      {
        updateDialog: {
          mandatoryUpdateMessage:
            "There's a new update you must have. Please continue to install.",
          optionalUpdateMessage:
            'New update! You can choose install it now or later.',
          mandatoryContinueButtonLabel: 'Continue',
          optionalIgnoreButtonLabel: 'Install Later',
          optionalInstallButtonLabel: 'Install Now',
        },
        installMode: codePush.InstallMode.IMMEDIATE,
      },
      statusCb,
      ({receivedBytes, totalBytes}) => {
        /* Update download modal progress */
        setProgress(receivedBytes / totalBytes);
      },
    );

    // run cb again
    statusCb(out);
  }, []);

  return (
    <>
      {children}
      <View style={{paddingVertical: 2, backgroundColor: '#4665af'}}>
        <ProgressBar progress={progress} />
        <Text style={{textAlign: 'center'}} color="#FFF" size={14}>
          {text ?? 'N/A'}
        </Text>
      </View>
    </>
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
            <CodePushWrapper>
              <_Application />
            </CodePushWrapper>
          </SafeAreaProvider>
        </LanguageProvider>
      </ApplicationProvider>
    </ThemeProvider>
  );
}

export default __DEV__ ? App : Sentry.wrap(App);
