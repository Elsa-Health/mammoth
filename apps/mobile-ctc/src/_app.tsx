import {NativeBaseProvider} from 'native-base';
import React from 'react';
import SplashScreen from 'react-native-splash-screen';
import {ApplicationProvider, AppLoginState} from './app/context/application';
import MainPage from './pages/main';
import LoginPage from './pages/login';
import {SafeAreaProvider} from 'react-native-safe-area-context';

function _Application({isLogin, user}: {isLogin: boolean; user?: AppUser}) {
  if (isLogin) {
    return <MainPage />;
  }

  return <LoginPage />;
}

export default function App() {
  React.useEffect(() => {
    SplashScreen.hide();
  }, []);

  return (
    <SafeAreaProvider>
      <NativeBaseProvider>
        <ApplicationProvider>
          <AppLoginState>
            {({isLogin, user}) => (
              <_Application isLogin={isLogin} user={user} />
            )}
          </AppLoginState>
        </ApplicationProvider>
      </NativeBaseProvider>
    </SafeAreaProvider>
  );
}
