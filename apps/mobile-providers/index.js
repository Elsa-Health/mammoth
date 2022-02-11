/**
 * @format
 */

 import {AppRegistry} from 'react-native';
 import App from './src/app';
 import {name as appName} from './app.json';
 
 import 'react-native-gesture-handler';
 import codePush from 'react-native-code-push'
 import * as Sentry from '@sentry/react-native'
 
 
 Sentry.init({
    dsn: "https://f57f6164a5424ca9b42d2e86dfaf687c@o683972.ingest.sentry.io/6168884",
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
     })(App)
 )
 
 AppRegistry.registerComponent(appName, () => FinalApp);
 