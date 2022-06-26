import React from 'react';
import {useAsyncFn} from 'react-use';
import {authenticateCredential, ElsaProvider, Identity} from './backend';

import produce from 'immer';

import AsyncStorage from '@react-native-async-storage/async-storage';

type AppSettings = {language: null | 'en' | 'sw'};
export type LoggedInContextState = {
  settings: null | AppSettings;
  provider: ElsaProvider;
};
type AppContextState =
  | {isLoading: true; state: null}
  | {isLoading: false; state: null | LoggedInContextState};
// Create context value

const init: AppContextState = {isLoading: true, state: null};
const AppContext = React.createContext<
  [AppContextState, React.Dispatch<React.SetStateAction<AppContextState>>]
>([init, () => null]);

export function ApplicationProvider({children}: {children: React.ReactNode}) {
  const [value, setValue] = React.useState<AppContextState>(init);

  // Initially!
  React.useEffect(() => {
    fetchAppDataFromPersistance()
      .then(state => {
        setValue(s =>
          produce(s, df => {
            df.isLoading = false;
            df.state = state;
          }),
        );
      })
      .catch(err => console.warn('Error when logging in!'))
      .finally(() => console.log('Completed!'));
  }, []);

  React.useEffect(() => {
    // Persist on change of the original state
    if (!value.isLoading) {
      persist(value.state);
    }

    console.log('Value changed');
  }, [value]);

  return (
    <AppContext.Provider value={[value, setValue]}>
      {children}
    </AppContext.Provider>
  );
}

const UP_PROVIDER_KEY = '@UserProfile#Provider';
const UP_SETTINGS_KEY = '@UserProfile#Settings';

/**
 * Fetches the application from app persistance
 * @returns App Data
 */
async function fetchAppDataFromPersistance(): Promise<LoggedInContextState | null> {
  const [[_idp, strProvider], [_ids, strSettings]] =
    await AsyncStorage.multiGet([UP_PROVIDER_KEY, UP_SETTINGS_KEY]);

  if (strProvider !== null) {
    const val = JSON.parse(strProvider);

    if (val !== null) {
      return {
        provider: ElsaProvider.fromJSON(val),
        settings: strSettings !== null ? JSON.parse(strSettings) : null,
      } as LoggedInContextState;
    }
  }

  return null;
}
async function persist(state: LoggedInContextState | null) {
  if (state !== null) {
    // persist the data to storage
    // Change the data
    await AsyncStorage.multiSet([
      [UP_PROVIDER_KEY, JSON.stringify(state.provider.toJSON())],
      [UP_SETTINGS_KEY, JSON.stringify(state.settings)],
    ]);
  } else {
    await clear();
  }
}

async function clear() {
  await AsyncStorage.multiSet([
    [UP_PROVIDER_KEY, JSON.stringify(null)],
    [UP_SETTINGS_KEY, JSON.stringify(null)],
  ]);

  // Making sure its actually deleted
  await AsyncStorage.multiRemove([UP_SETTINGS_KEY, UP_SETTINGS_KEY], err => {
    console.log('Removed');
  });
}

type V1Code = string;
type V2Code = string;
import firestore from '@react-native-firebase/firestore';
import auth, {FirebaseAuthTypes} from '@react-native-firebase/auth';
import {AuthInfoMap, authV1} from '../app/utils';
import {Analytics} from '../CTC/analytics';

async function authV2(identity: Identity) {
  const cred = await authenticateCredential(firestore(), identity);

  if (cred.phoneNumber === undefined) {
    throw {
      code: 'elsa/missing-login-info',
      message:
        'Missing phoneNumber details needed to login. Please make sure the phone number if entered in the Dashboard',
    };
  }
  const confirm = await auth().signInWithPhoneNumber(cred.phoneNumber, true);
  return {phoneNumber: cred.phoneNumber, confirm};
}

export type AuthOutput =
  | {type: 'v1'; obj: ElsaProvider}
  | {
      type: 'v2';
      obj: {
        phoneNumber: string;
        confirm: FirebaseAuthTypes.ConfirmationResult;
        identity: Identity;
      };
    };

// Authenticate the content
export async function authenticate(str: V1Code | V2Code): Promise<AuthOutput> {
  // Checks if it's v2 authenticatable
  if (Identity.isParsable(str)) {
    const identity = Identity.parse(str);
    console.log('Using auth v2');
    return {type: 'v2', obj: {...(await authV2(identity)), identity}};
  }

  console.log('Using auth v1');
  return {type: 'v1', obj: await authV1(str)};
}

/**
 *
 * @param selector
 * @returns
 */

type Selector<T> = (a: LoggedInContextState | null) => T;
export function useAppState<T>(
  selector?: Selector<T>,
): typeof selector extends Selector<T> ? T : LoggedInContextState | null {
  const [_originalState, dispatch] = React.useContext(AppContext);

  const state = React.useMemo(() => {
    if (selector !== undefined) {
      // return value filtered from selector
      return selector(_originalState.state);
    }

    return _originalState.state;
  }, [selector, _originalState]);

  return state;
}

export function useApplication<T>(
  selector?: (a: LoggedInContextState | null) => T,
) {
  const [_originalState, dispatch] = React.useContext(AppContext);

  return {
    state: _originalState.state,
    loading: _originalState.isLoading,
    loggedIn: _originalState.state !== null,
    logout: () => {
      // change state

      // delete persisted data
      clear().then(() => {
        dispatch(s =>
          produce(s, df => {
            df.isLoading = false;
            df.state = null;
          }),
        );
      });
    },
    set: (state: LoggedInContextState) => {
      dispatch(s =>
        produce(s, df => {
          df.state = state;
        }),
      );
    },
    setProvider: (provider: ElsaProvider) => {
      dispatch(s =>
        produce(s, df => {
          if (df.state !== null) {
            df.state.provider = provider;
          } else {
            console.warn(
              "Ignored set action since the provider hasn't logged in",
            );
          }
        }),
      );
    },
    setSettings: (settings: AppSettings) => {
      dispatch(s =>
        produce(s, df => {
          if (df.state !== null) {
            df.state.settings = settings;
          } else {
            console.warn(
              "Ignored set action since the provider hasn't logged in",
            );
          }
        }),
      );
    },
  };
}
