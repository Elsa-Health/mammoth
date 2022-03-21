import React from 'react';
import SplashScreen from 'react-native-splash-screen';
import {ApplicationProvider, AppLoginState} from './app/context/application';

import {SafeAreaProvider} from 'react-native-safe-area-context';
import CTCFlow from './@libs/@workflows/flows/CTC';

function _Application({isLogin, user}: {isLogin: boolean; user?: AppUser}) {
  if (!isLogin) {
    return <LoginPage />;
  }

  return <CTCFlow />;
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
