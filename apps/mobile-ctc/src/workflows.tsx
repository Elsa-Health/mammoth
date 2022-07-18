import React from 'react';

import create from 'zustand';
import createContext from 'zustand/context';
import produce from 'immer';

import {WorkflowScreenProps} from '@elsa-ui/react-native-workflows';

/** ------- */

// ideally, these should be moved to the @elsa-ui/react-native/workflows

// Defines what a screen would be
type WFScreen = React.FC<WorkflowScreenProps<any, any>>;

// Gets the properties of the screens
type ScreenProps<Screen extends WFScreen> = Parameters<Screen>[0];

// Get's the entry values of the screens
type ScreenEntry<Screen extends WFScreen> = ScreenProps<Screen>['entry'];

// Gets the actions associated with the screens
// type ScreenActions<Screen extends WFScreen> = ScreenProps<Screen>['actions'];

/**
 * Creates the proper parameters for a navigator to make it useful
 */
export type WorkflowNavigator<
  M extends {[screen: string]: WFScreen},
  SN extends keyof M = keyof M,
> = {
  [screen in SN]: ScreenEntry<M[screen]>;
};

/** ------- */

type KeyValue = {[d: string]: any};
type WorkflowStore<V extends KeyValue = KeyValue> = {
  value: V;
  setValue: (fn: ((v: V) => V) | V) => void;
};

// // Create a store
// const createStore = () =>
//   create<WorkflowStore>(set => ({
//     value: {
//       // setting the appointments
//       appointments: [1, 2],
//     },
//     setValue: (id, fn) =>
//       set(s =>
//         produce(s, df => {
//           df.value[id] = fn(s.value[id]);
//         }),
//       ),
//   }));

// create context of the application
// const {Provider, useStore: useWorkflowStore} = createContext<WorkflowStore>();

export function buildWorkflowStore<KV extends KeyValue>() {
  // create context of the application
  const {Provider, useStore: useWorkflowStore} =
    createContext<WorkflowStore<KV>>();

  // Create a store
  const createStore = () =>
    create<WorkflowStore<KV>>(set => ({
      value: {},
      setValue: fn =>
        set(s =>
          produce(s, df => {
            if (typeof fn === 'function') {
              df.value = fn(s.value);
            } else {
              df.value = fn;
            }
          }),
        ),
    }));

  /**
   * @deprecated
   * Just dont use this. Use `useWorkflowStore` instead
   *
   * Using the store through context
   */
  const useWorkflowContext = <F extends keyof KV>(
    section: F | ((x: KV) => any),
  ) => {
    const value = useWorkflowStore(s => {
      if (typeof section === 'function') {
        return section(s.value);
      } else {
        return s.value?.[section];
      }
    });
    const setValue = useWorkflowStore(s => s.setValue);

    type Fn = Parameters<typeof setValue>[1];
    const fn = (fn_: Fn | KV[F]) => {
      return setValue(s =>
        produce(s, df => {
          if (typeof section === 'string') {
            df[section] = fn_(df);
          }

          return setValue();
        }),
      );
    };

    return [value, fn] as [typeof value, typeof fn];
  };

  /**
   *
   * @param param0
   * @returns
   */
  const WorkflowProvider = ({children}: {children: React.ReactNode}) => {
    return <Provider createStore={createStore}>{children}</Provider>;
  };

  return {WorkflowProvider, useWorkflowContext, useWorkflowStore};
}
