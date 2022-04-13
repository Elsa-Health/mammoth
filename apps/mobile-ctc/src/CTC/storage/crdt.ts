import {buildStore as BuildStore} from 'sabertooth-core';
import {Store} from 'sabertooth-core/lib/providers';
import {configuration} from 'sabertooth-stores/item-storage';

// import AsyncStorage from '@react-native-async-storage/async-storage';
import FastStorage from 'react-native-fast-storage';
import uuid from 'react-native-uuid';

export const keyGenerator = (key?: string | undefined) =>
  key || uuid.v4().toString();

// Intendedn to persist CRDT messages over lifetime of session
export const store = BuildStore(
  // @ts-ignore
  Store,
  configuration({
    generateId: keyGenerator,
    istore: FastStorage,
    buildCollRef: collId => `CRDT-MSGS@${collId}`,
    buildDocRef: (docId: string, collId: string) =>
      `CRDT-MSGS@${collId}:${docId}`,
    collectionsUID: 'CRDT-MSGS',
  }),
);

export const collection = store.collection('crdt_messages');
