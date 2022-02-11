/**
 * This is the context for the entire application
 */
import AsyncStorage from "@react-native-async-storage/async-storage";
import React from "react";

import create from "zustand";
import createContext from "zustand/context";
import { persist } from "zustand/middleware";

type AppSettings = {
  /**
   * Configuring the language for the application
   * `undefined` if nothing is set, this should prompt
   *  the person to select a language
   */
  lang: "en" | "sw" | undefined;
};

type AppUser = {
  // userId
  uid: string;

  // Ideally first name and last name
  name: string;

  // geo co-ordinates
  geo?: {
    latitude: number;
    longitude: number;
  };
};

/**
 * Main application state
 */
type AppState = {
  /**
   * `undefined` indicates that user has logged out
   */
  user: undefined | AppUser;
  settings: AppSettings;

  login: (user: AppUser) => Promise<void>;
  logout: () => Promise<void>;
  applySettings: (
    fn: (previousSettings: AppSettings) => Partial<AppSettings>
  ) => void;
};

/**
 * TODO: Add persistence layer to help remember the application settings. AT THE END
 */
const { Provider, useStore: useApplication } = createContext<AppState>();
const createAppStore = () =>
  create<AppState>(
    // persist(
    (set, get) => ({
      // user: undefined,
      user: { uid: "kevin-james", name: "Kevin James" },
      settings: {
        lang: "en",
        // lang: undefined
      },
      login: async (user: AppUser) => set({ user }),
      logout: async () => set({ user: undefined }),
      applySettings: (updater) => {
        set((s) => ({ settings: { ...s.settings, ...updater(s.settings) } }));
      },
    })
    // {
    //     name: 'elsa-ddx-user-config',
    //     getStorage: () => AsyncStorage
    // })
  );

interface ApplicationProviderProps {
  children: React.ReactNode;
}
function ApplicationProvider(props: ApplicationProviderProps) {
  return <Provider createStore={createAppStore}>{props.children}</Provider>;
}

export { ApplicationProvider, useApplication };
