/**
 * @format
 */

import {AppRegistry} from 'react-native';
import App from './src/_app';
import {name as appName} from './app.json';

import 'react-native-gesture-handler';
import codePush from 'react-native-code-push';
import * as Sentry from '@sentry/react-native';

// FIXME: Remove API key and secret
Sentry.init({
  dsn: 'https://6ca7254d249c4739b3db2cb7af62b796@o683972.ingest.sentry.io/5804165',
  // Set tracesSampleRate to 1.0 to capture 100% of transactions for performance monitoring.
  // We recommend adjusting this value in production.
  // tracesSampleRate: 1.0,
  tracesSampleRate: 0.5,
});

const FinalApp = Sentry.wrap(
  codePush({
    // updateDialog: true,
    checkFrequency: codePush.CheckFrequency.ON_APP_START,
    installMode: codePush.InstallMode.IMMEDIATE,
  })(App),
);

AppRegistry.registerComponent(appName, () => FinalApp);
