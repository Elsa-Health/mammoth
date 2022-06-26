/**
 * NOTICE! HEY THERE! LOOK AT ME! YOOUU HOOOUU!
 *
 * This code here should be removed and only exists tempoarily to
 * support the migration of data from an old, bad store to a new, proper one...
 *
 * So try not to get too attached to this code.
 */

import _ from 'lodash';
import {collection, getStore} from 'papai/collection';
import ItemStorageStore from 'papai/stores/collection/ItemStorage';

import FastAsyncStorage from 'react-native-fast-storage';

import uuid from 'react-native-uuid';

import {
  InvestigationRequest,
  InvestigationResult,
} from '../../emr-types/v1/investigation';
import {InvestigationTypeRecord} from 'elsa-health-data-fns/lib/investigations';

export type Medica =
  | Medication<'arv', {className: ARV.Class; regimen: ARV.Regimen}>
  | Medication<'standard', {medication: Med.All; text: string}>;
export type MedicaReq = MedicationRequest<Medica>;
export type MedicaDisp = MedicationDispense<Medica>;

export type InvReq = InvestigationRequest<{
  investigationId: Investigation;
  obj: InvestigationTypeRecord<string>;
}>;
export type InvResult = InvestigationResult<InvReq>;

// name of the old data storage.
// This code is currently here for a while untill the estimated
//  time for migration content migration has passed
const STORE_NAME = 'DEV_TEST_STORE@TEMP';

// const STORE_NAME = 'STORAGE@CTC';

// Create store to be used

// Pull EMR to store the values
export class EMR {
  /**
   * Storage node
   */
  static readonly store = getStore(
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

  /**
   * Collections available in the EMR
   */
  static get collections() {
    return {
      stock: collection(EMR.store, 'medication-stock'),
      visits: collection<CTCVisit>(EMR.store, 'visits'),
      appointmentRequests: collection<CTCAppointmentRequest>(
        EMR.store,
        'appointment-requests',
      ),

      appointmentResponse: collection<CTCAppointmentResponse>(
        EMR.store,
        'appointment-response',
      ),

      patients: collection<CTCPatient>(EMR.store, 'patients'),
      medications: collection<Medica>(EMR.store, 'medications'),
      medicationRequests: collection<MedicaReq>(
        EMR.store,
        'medication-requests',
      ),
      medicationDispenses: collection<MedicaDisp>(
        EMR.store,
        'medication-dispenses',
      ),
      investigationRequests: collection<InvReq>(
        EMR.store,
        'investigation-requests',
      ),
      investigationResults: collection<InvResult>(
        EMR.store,
        'investigation-results',
      ),
    };
  }
}
