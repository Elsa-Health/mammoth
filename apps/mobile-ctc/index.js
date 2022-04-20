/**
 * @format
 */

import {AppRegistry} from 'react-native';
import App from './src/_app';
import {name as appName} from './app.json';

import 'react-native-gesture-handler';
import codePush from 'react-native-code-push';

const VersionedApp = codePush({
  // updateDialog: true,
  checkFrequency: codePush.CheckFrequency.ON_APP_START,
  installMode: codePush.InstallMode.IMMEDIATE,
})(App);

AppRegistry.registerComponent(appName, () => VersionedApp);
