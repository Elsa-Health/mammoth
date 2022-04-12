import {
  buildCRDTStore as BuildCRDTStore,
  CRDTMessageBox,
  SBSet,
} from 'sabertooth-core';
import {ObservableStore} from 'sabertooth-core/lib/providers';
import {configuration} from 'sabertooth-stores/item-storage';

// import AsyncStorage from '@react-native-async-storage/async-storage';
import FastStorage from 'react-native-fast-storage';
import uuid from 'react-native-uuid';

import * as crdt from './crdt';

export const keyGenerator = (key?: string | undefined) =>
  key || uuid.v4().toString();

const collectionsUID = '@@CTC-STORE';
export const crdtBox = new CRDTMessageBox();

// on boot, rebuilds the messages
crdt.collection
  .queryMultiple()
  .then(ds => ds.map(([id, v]) => v))
  .then(objs => crdtBox.merge(new SBSet(objs || [])));

const buildCollRef = (collId: string) => `${collectionsUID}/${collId}`;

const {store, sync, merge, mergeOther} = BuildCRDTStore(
  ObservableStore,
  crdtBox,
  configuration({
    generateId: keyGenerator,
    istore: FastStorage,
    buildCollRef,
    buildDocRef: (docId: string, collId: string) =>
      `${buildCollRef(collId)}/${docId}`,
    collectionsUID,
  }),
  msg => {
    // persists the message
    crdt.collection.add([undefined, msg]);
  },
);

export {merge, sync, mergeOther};
export const deviceStorage = () => store;

/**
 * Reads faithfully the data from the the collection
 * @param collectionId
 * @returns
 */
export const readCollection = async (collectionId: string) => {
  return (await store.collection(collectionId).queryMultiple()).map(
    ([id, val]) => val,
  );
};

/**
 * Attaches a listener to the collection and fires the `cb` when
 * there is a state change in the collection
 *
 * (NOTE: Only works when the store used is an `ObservableStore`)
 * @param collectionId
 * @param cb
 */
export const onUpdateSnapshot = (
  collectionId: string,
  cb: (data: any[]) => void,
) => {
  // This works even if typescript is complaining
  // @ts-ignore
  store.collection(collectionId).observe('updated', _delta => {
    readCollection(collectionId).then(val => cb(val));
  });
};
