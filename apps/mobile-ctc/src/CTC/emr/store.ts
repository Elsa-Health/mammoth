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
} from 'papai/collection';
import {HybridLogicalClock} from 'papai/distributed/clock';
import {
  onTrackStoreAddUpdateChanges,
  StateTrackingBox,
} from 'papai/distributed/store';
import ItemStorageStore from 'papai/stores/collection/ItemStorage';

import FastAsyncStorage from 'react-native-fast-storage';

import uuid from 'react-native-uuid';
import {CTC} from './types';

const STORE_NAME = 'DEV_TEST_STORE@TEMP';

// Create store to be used
const storage = getStore(
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

export const EMR = (store: Store) => {
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
     * Medication options available:
     * Should be seed with data to start it off
     */
    medications: collection<CTC.ARVMedication>(store, 'medications'),

    /**
     * Contains the mediction requests
     */
    'medication-requests': collection<CTC.MedicationRequest>(
      store,
      'medication.requests',
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

    /**
     *
     */
    // 'investigation-requests': collection<CTC.>(store, 'investigation.requests')
  });

  return module;
};

/**
 * Storage component
 * @returns
 */
export const getStorage = () => storage;

/**
 * Get EMR
 */
export const getEMR = () => EMR(storage);
export type EMRModule = ReturnType<typeof getEMR>;
