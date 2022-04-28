import React from 'react';
import {View} from 'react-native';
import {Text} from './@libs/elsa-ui/components';
import {ThemeProvider, useTheme} from './@libs/elsa-ui/theme';

import {Button, TextInput} from 'react-native-paper';
import SplashScreen from 'react-native-splash-screen';

import auth, {FirebaseAuthTypes} from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import {authenticateProvider, Identity} from './provider/backend';

function CTCApp() {
  const [credentials, set] = React.useState('');
  const {spacing} = useTheme();
  const [cc, setcc] =
    React.useState<null | FirebaseAuthTypes.ConfirmationResult>(null);

  const [code, setCode] = React.useState('');
  const [provider, setProvider] = React.useState<null | any>(null);

  const login = () => {
    // console.log(auth().currentUser);
    auth()
      .signInWithPhoneNumber('+255782659260', true)
      .then(confirm => {
        setcc(confirm);
      })
      .catch(err => {
        console.log('Failed because:', err);
      });
    //   .sendSignInLinkToEmail('kevin@inspiredideas.io')
  };

  const confirmCode = async () => {
    const uc = await cc?.confirm(code);

    if (uc !== undefined && uc !== null) {
      const identity = Identity.parse(credentials);
      const provider = await authenticateProvider(
        firestore(),
        uc.user,
        identity,
        {platform: 'ctc'},
      );
      setProvider(provider);
    }
  };

  React.useEffect(() => {
    if (provider !== null) {
      const x = provider.toJSON();

      console.log(x);
    }
  }, [provider]);
  return (
    <View style={{padding: spacing.md}}>
      <View>
        <Text font="bold">Enter credentials to login with</Text>
        <TextInput value={credentials} label="Credentials" onChangeText={set} />
      </View>
      <View>
        <Button onPress={login} mode="outlined">
          Login
        </Button>
      </View>

      {cc !== null && (
        <View>
          <View>
            <Text>Enter Confirmation Code</Text>
            <TextInput value={code} onChangeText={setCode} label="Enter Code" />
          </View>

          <Button onPress={confirmCode} mode="outlined">
            Confirm Code
          </Button>
        </View>
      )}
    </View>
  );
}

export default function APP() {
  React.useEffect(() => {
    SplashScreen.hide();
  }, []);

  return (
    <ThemeProvider>
      <CTCApp />
    </ThemeProvider>
  );
}
