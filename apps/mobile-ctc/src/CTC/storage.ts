import {
  BuildCRDTStore,
  BuildStore,
  CRDTMessageBox,
  ObservableStore,
  SBSet,
  Store,
} from '../@libs/sabertooth';
import {configuration} from '../@libs/sabertooth/stores/item-storage';
import {configuration as kvConfiguration} from '../@libs/sabertooth/stores/key-value-map';

// import AsyncStorage from '@react-native-async-storage/async-storage';
import FastStorage from 'react-native-fast-storage';
import uuid from 'react-native-uuid';

export const keyGenerator = (key?: string | undefined) =>
  key || uuid.v4().toString();

// Intendedn to persist CRDT messages over lifetime of session
const _crdtStore = BuildStore(
  Store,
  configuration({
    generateId: keyGenerator,
    istore: FastStorage,
    buildCollRef: collId => `CRDTS@${collId}`,
    buildDocRef: (docId: string, collId: string) =>
      `${buildCollRef(collId)}:${docId}`,
    collectionsUID: 'CRDTS',
  }),
);
const crdtCollection = _crdtStore.collection('crdt_messages');

const collectionsUID = '@@CTC-STORE';
export const crdtBox = new CRDTMessageBox();

// on boot, rebuilds the messages
crdtCollection
  .queryMultiple()
  .then(ds => ds.map(([id, v]) => v))
  .then(objs => crdtBox.merge(new SBSet(objs || [])));

const buildCollRef = (collId: string) => `${collectionsUID}/${collId}`;

const {store, sync, merge, mergeOther} = BuildCRDTStore(
  ObservableStore,
  crdtBox,
  msg => {
    // persists the message
    crdtCollection.add([undefined, msg]);
  },
  configuration({
    generateId: keyGenerator,
    istore: FastStorage,
    buildCollRef,
    buildDocRef: (docId: string, collId: string) =>
      `${buildCollRef(collId)}/${docId}`,
    collectionsUID,
  }),
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
