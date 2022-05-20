import {buildStore as BuildStore} from 'sabertooth-core';
import {ObservableStore} from 'sabertooth-core/lib/providers';
import {configuration} from 'sabertooth-stores/item-storage';

// import AsyncStorage from '@react-native-async-storage/async-storage';
import FastStorage from 'react-native-fast-storage';
import uuid from 'react-native-uuid';

export const keyGenerator = (key?: string | undefined) =>
  key || uuid.v4().toString();

const cUID = '$PERSONAL_DATA';
// Intendedn to persist CRDT messages over lifetime of session
export const store = BuildStore(
  // @ts-ignore
  ObservableStore,
  configuration({
    generateId: keyGenerator,
    istore: FastStorage,
    buildCollRef: collId => `${cUID}@${collId}`,
    buildDocRef: (docId: string, collId: string) =>
      `${cUID}@${collId}:${docId}`,
    collectionsUID: cUID,
  }),
);
