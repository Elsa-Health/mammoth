import {NativeBaseProvider} from 'native-base';
import React from 'react';
import SplashScreen from 'react-native-splash-screen';
import {ApplicationProvider, AppLoginState} from './app/context/application';

import MainPage from './pages/main';
import LoginPage from './pages/login';
import {SafeAreaProvider} from 'react-native-safe-area-context';

import {createNativeStackNavigator} from '@react-navigation/native-stack';

const Stack = createNativeStackNavigator();

function _Application({isLogin, user}: {isLogin: boolean; user?: AppUser}) {
  if (!isLogin) {
    return <LoginPage />;
  }

  return <MainPage />;
}

export default function App() {
  React.useEffect(() => {
    SplashScreen.hide();
  }, []);

  return (
    <ApplicationProvider>
      <SafeAreaProvider>
        <AppLoginState>
          {({isLogin, user}) => <_Application isLogin={isLogin} user={user} />}
        </AppLoginState>
      </SafeAreaProvider>
    </ApplicationProvider>
  );
}
