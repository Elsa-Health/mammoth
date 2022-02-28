import {NativeBaseProvider} from 'native-base';
import React from 'react';
import SplashScreen from 'react-native-splash-screen';
import {
  ApplicationProvider,
  AppLoginState,
  useApplication,
} from './app/context/application';
import HomePage from './pages/home';
import LoginPage from './pages/login';

function MainScreen() {
  return <HomePage />;
}

function _Application({isLogin, user}: {isLogin: boolean; user?: AppUser}) {
  if (isLogin) {
    return <MainScreen />;
  }

  return <LoginPage />;
}

export default function App() {
  React.useEffect(() => {
    SplashScreen.hide();
  }, []);

  return (
    <NativeBaseProvider>
      <ApplicationProvider>
        <AppLoginState>
          {({isLogin, user}) => <_Application isLogin={isLogin} user={user} />}
        </AppLoginState>
      </ApplicationProvider>
    </NativeBaseProvider>
  );
}
