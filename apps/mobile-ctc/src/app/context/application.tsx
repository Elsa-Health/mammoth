/**
 * This is the context for the entire application
 */
import React from 'react';

import create from 'zustand';
import createContext from 'zustand/context';
import {persist} from 'zustand/middleware';

export type AppSettings = {
  /**
   * Configuring the language for the application
   * `undefined` if nothing is set, this should prompt
   *  the person to select a language
   */
  lang: 'en' | 'sw' | undefined;
};

/**
 * Main application state
 */
type AppFieldState = {
  user: undefined | AppUser;
  settings: AppSettings;
};
type AppState = AppFieldState & {
  /**
   * `undefined` indicates that user has logged out
   */

  login: (user: AppUser) => Promise<void>;
  logout: () => Promise<void>;
  applySettings: (
    fn: (previousSettings: AppSettings) => Partial<AppSettings>,
  ) => void;
};

/**
 * TODO: Add persistence layer to help remember the application settings. AT THE END
 */
const {Provider, useStore: useApplication} = createContext<AppState>();
const buildAppStore =
  (initInfo: Partial<AppFieldState> | undefined = {}) =>
  () =>
    create<AppState>(
      // persist(
      (set, get) => ({
        // user: undefined,
        user: __DEV__ ? {uid: 'kevin-james', name: 'Juma Michael'} : undefined,
        settings: {
          lang: __DEV__ ? 'en' : undefined,
        },
        ...initInfo,
        login: async (user: AppUser) => set({user}),
        logout: async () => set({user: undefined}),
        applySettings: updater => {
          set(s => ({
            settings: {...s.settings, ...updater(s.settings)},
          }));
        },
      }),
      // {
      //     name: 'elsa-ddx-user-config',
      //     getStorage: () => AsyncStorage
      // })
    );

interface ApplicationProviderProps {
  children: React.ReactNode;
  initialState?: Partial<AppFieldState>;
}
function ApplicationProvider(props: ApplicationProviderProps) {
  return (
    <Provider createStore={buildAppStore(props.initialState)}>
      {props.children}
    </Provider>
  );
}

export {ApplicationProvider, useApplication};

export function AppLoginState({
  children: Children,
}: {
  children: ({
    isLogin,
    user,
  }: {
    isLogin: boolean;
    user?: AppUser;
  }) => JSX.Element;
}) {
  const isLogin = useApplication(s => s.user?.uid !== undefined);
  const user = useApplication(s => s.user);

  return <Children isLogin={isLogin} user={user} />;
}
