/**
 * @format
 */

import {AppRegistry} from 'react-native';
// import App from './src/_temp';
import App from './src/app';
import {name as appName} from './app.json';

import 'react-native-gesture-handler';
import codePush from 'react-native-code-push';
import * as Sentry from '@sentry/react-native';

import PushNotificationIOS from '@react-native-community/push-notification-ios';
import PushNotification, {Importance} from 'react-native-push-notification';

// Must be outside of any component LifeCycle (such as `componentDidMount`).
PushNotification.configure({
  // (optional) Called when Token is generated (iOS and Android)
  onRegister: function (token) {
    // console.log('TOKEN:', token);
  },

  // (required) Called when a remote is received or opened, or local notification is opened
  onNotification: function (notification) {
    // console.log('NOTIFICATION:', notification);

    // process the notification

    // (required) Called when a remote is received or opened, or local notification is opened
    notification.finish(PushNotificationIOS.FetchResult.NoData);
  },

  // (optional) Called when Registered Action is pressed and invokeApp is false, if true onNotification will be called (Android)
  onAction: function (notification) {
    // console.log('ACTION:', notification.action);
    // console.log('NOTIFICATION:', notification);
    // process the action
  },

  // (optional) Called when the user fails to register for remote notifications. Typically occurs when APNS is having issues, or the device is a simulator. (iOS)
  onRegistrationError: function (err) {
    // console.error(err.message, err);
  },

  // IOS ONLY (optional): default: all - Permissions to register.
  permissions: {
    alert: true,
    badge: true,
    sound: true,
  },

  // Should the initial notification be popped automatically
  // default: true
  popInitialNotification: true,

  /**
   * (optional) default: true
   * - Specified if permissions (ios) and token (android and ios) will requested or not,
   * - if not, you must call PushNotificationsHandler.requestPermissions() later
   * - if you are not using remote notification or do not have Firebase installed, use this:
   *     requestPermissions: Platform.OS === 'ios'
   */
  requestPermissions: true,
});

PushNotification.createChannel(
  {
    channelId: 'testing-channel', // (required)
    channelName: 'My channel', // (required)
    channelDescription: 'A channel to categorise your notifications', // (optional) default: undefined.
    playSound: false, // (optional) default: true
    soundName: 'default', // (optional) See `soundName` parameter of `localNotification` function
    importance: Importance.HIGH, // (optional) default: Importance.HIGH. Int value of the Android notification importance
    vibrate: true, // (optional) default: true. Creates the default vibration pattern if true.
  },
  created => console.log(`createChannel returned '${created}'`), // (optional) callback returns whether the channel was created, false means it already existed.
);

Sentry.init({
  dsn: 'https://540d251fb01644b1ace07e33911eb803@o683972.ingest.sentry.io/6053226',
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
