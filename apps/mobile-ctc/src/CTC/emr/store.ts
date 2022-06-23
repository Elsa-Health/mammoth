import {Module} from '@elsa-health/emr/lib/module';
import {CollectionNode, Store} from 'papai/collection/core';

import {StockRecord} from '@elsa-health/emr/health.types/v1';

import {
  addDocs,
  collection,
  Document,
  getDocs,
  getStore,
  setDocs,
  wipeStore,
} from 'papai/collection';
import {HybridLogicalClock} from 'papai/distributed/clock';
import {
  onTrackStoreAddUpdateChanges,
  StateTrackingBox,
} from 'papai/distributed/store';
import ItemStorageStore, {
  AsyncItemStorage,
} from 'papai/stores/collection/ItemStorage';

import FastAsyncStorage from 'react-native-fast-storage';

import uuid from 'react-native-uuid';
import {CTC} from './types';

import AsyncStorage from '@react-native-async-storage/async-storage';
// ... seed
import {seedStock} from './seed';
import {Message, StateToken} from '../actions/sync';
import {EMR} from './store_';

// reference mapping the state to the values
const ref = (d: Document.Ref) => `${d.collectionId}-${d.documentId}`;

// replace ':' to a different string
export const stateClock = new HybridLogicalClock(
  `elsa-client-dev-${uuid.v4()}`,
);
export const stateBox = new StateTrackingBox(stateClock, ref); // distributedStateBox

function BuildItemStore(name: string, store: AsyncItemStorage) {
  const STORE_NAME = name;
  // Create store to be used
  return getStore(
    // KeyValueMapStore(() => uuid.v4() as string),
    ItemStorageStore(
      {
        nameReference: STORE_NAME,
        getCollRef: d => `${STORE_NAME}/${d.collectionId}`,
        getDocRef: d => `${STORE_NAME}/${d.collectionId}/${d.documentId}`,
        store: FastAsyncStorage,
      },
      () => uuid.v4() as string,
    ),
  );
}

// const STORE_NAME = 'DEV_TEST_STORE@TEMP';
// const STORE_NAME = 'STORAGE@CTC';

const storage = BuildItemStore('STORAGE@CTC', FastAsyncStorage);

// Create store to be used
// const storage = getStore(
//   // KeyValueMapStore(() => uuid.v4() as string),
//   ItemStorageStore(
//     {
//       nameReference: STORE_NAME,
//       getCollRef: d => `${STORE_NAME}/${d.collectionId}`,
//       getDocRef: d => `${STORE_NAME}/${d.collectionId}/${d.documentId}`,
//       store: FastAsyncStorage,
//     },
//     () => uuid.v4() as string,
//   ),
// );

/**
 *
 * @param store Store providing the data
 * @returns module to control the values
 */
export const EMRModule = (store: Store) => {
  const module = new Module({
    visits: collection<CTC.Visit>(store, 'visits'),
    patients: collection<CTC.Patient>(store, 'patients'),

    /**
     * Stock of the medications
     */
    stock: collection<StockRecord<CTC.ARVMedication, CTC.Organization>>(
      store,
      'medication.stock',
    ),

    /**
     * Note: This medication item is intended
     * for use with other things
     */
    medications: collection<CTC.ARVMedication>(store, 'medications.items'),

    /**
     * Contains the mediction requests
     */
    'medication-requests': collection<CTC.MedicationRequest>(
      store,
      'medication.requests',
    ),
    /**
     * Contains the mediction requests
     */
    'medication-dispenses': collection<CTC.MedicationDispense>(
      store,
      'medication.dispenses',
    ),

    /**
     * Appointment requests
     */
    'appointment-requests': collection<CTC.AppointmentRequest>(
      store,
      'appointment-requests',
      // 'appt.requests',
    ),

    /**
     * Appointment responses
     */
    'appointment-responses': collection<CTC.AppointmentResponse>(
      store,
      'appt.responses',
    ),

    // Investigation related collections
    /**
     * Investigation Requests
     */
    'investigation-requests': collection<CTC.InvestigationRequest>(
      store,
      'investigation.requests',
    ),

    'investigation-results': collection<CTC.InvestigationResult>(
      store,
      'investigation.results',
    ),
  });

  return module;
};

/**
 * Storage component
 * @returns
 */
export const getStorage = () => storage;

/**
 * This should store things that' you don't want shared over the network
 */
const privateStorage = BuildItemStore('PRIVATE-STORAGE@CTC', FastAsyncStorage);
export const getPrivateStore = () => privateStorage;

/**
 * Pull the crdt collection endpoint
 * @returns
 */
export const getCrdtCollection = () =>
  collection<Message>(getPrivateStore(), 'crdt-messages');

/**
 * Get EMR
 */
export const getEMR = () => EMRModule(storage);
export type EMRModule = ReturnType<typeof getEMR>;

// PERFORM seeding

const emr = getEMR();
const seedKey = 'STORAGE@SEED-ONCE-NOW';

// make sure the seeding happens
AsyncStorage.getItem(seedKey).then(isToSeed => {
  if (isToSeed !== null) {
    console.log('Not seeding...');
    return;
  }

  const ou = isToSeed !== null ? JSON.parse(isToSeed) : null;
  // console.log({isToSeed, ou});
  if (ou !== null) {
    console.log('Not seeding...');
    return;
  }

  console.log('Seeding...');
  // run seed for stock + // then lock after first run
  return seedStock(emr).then(v =>
    AsyncStorage.setItem(seedKey, JSON.stringify(true)),
  );
});
