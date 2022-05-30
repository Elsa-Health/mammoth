import {List, Set} from 'immutable';
import _ from 'lodash';
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
import KeyValueMapStore from 'papai/stores/collection/KeyValueMap';

import FastAsyncStorage from 'react-native-fast-storage';

import uuid from 'react-native-uuid';
import {InvReq, InvResult, Medica, MedicaDisp, MedicaReq} from '.';
import {ElsaProvider} from '../../provider/backend';

const STORE_NAME = 'DEV_TEST_STORE@TEMP';

// Create store to be used
const storage = getStore(
  KeyValueMapStore(() => uuid.v4() as string),
  //   ItemStorageStore(
  //     {
  //       nameReference: STORE_NAME,
  //       getCollRef: d => `${STORE_NAME}/${d.collectionId}`,
  //       getDocRef: d => `${STORE_NAME}/${d.collectionId}/${d.documentId}`,
  //       store: FastAsyncStorage,
  //     },
  //     () => uuid.v4() as string,
  //   ),
);

// storing the crdt messages
const crdtStorage = getStore(
  KeyValueMapStore(() => `crdt:-${uuid.v4() as string}`),
);

const crdtMsgs = collection<{
  ref: Document.Ref;
  state: Document.Data;
  clock: string;
}>(crdtStorage, 'crdt-messages');

const ref = (d: Document.Ref) => `${d.collectionId}-${d.documentId}`;

/**
 * initial clock to state versioning
 */
const initialClock = new HybridLogicalClock(`elsa-client-dev:${uuid.v4()}`);

type StateToken = [Document.Ref, Document.Data, HybridLogicalClock];
type StateSource = {facility: any; user: {uid: string}; deviceId: string};

/**
 * Structure of the message
 */
type StateCRDTMessage = [StateToken, StateSource];

// Pull EMR to store the values
export class EMR {
  /**
   * Provider Client
   */
  private _provider;

  /**
   * Storage node
   */
  static readonly store = storage;

  /**
   *
   */
  private distributedStateBox = new StateTrackingBox(initialClock, ref);

  onSnapshotUpdate<DRef extends Document.Ref, D extends Document.Data>(
    cb: (token: StateToken, source: StateSource) => void,
  ) {
    const {facility, user} = this._provider.toJSON();
    return onTrackStoreAddUpdateChanges(
      EMR.store,
      this.distributedStateBox,
      // @ts-ignore
      (doc, data, clock) => {
        const token: StateToken = [doc, data, clock];
        const source: StateSource = {facility, user};

        cb(token, source);
      },
    );
  }

  merge(msgs: StateCRDTMessage[]) {
    //   this.distributedStateBox.append()
    // merge the states:

    msgs.forEach(msg => {
      const [token, source] = msg;
      const [ref_, data, clock] = token;

      // merge the contents of the
      this.distributedStateBox.append(ref_, data, clock);
    });
  }

  async sync() {
    // pull the contents of the crdt store.
    const storedMessageThusFar = await getDocs(crdtMsgs);

    const newStateBox = new StateTrackingBox(initialClock.next(), ref);
    storedMessageThusFar.forEach(([_, out]) => {
      const {ref, state, clock} = out;
      newStateBox.append(ref, state, clock);
    });

    const oldState = Set(newStateBox.latest()).map(
      ([ref, v, c]) => [ref, v] as [Document.Ref, Document.Data],
    );

    // compare latest and new ref
    // and work with new one only
    const latestUpdate = Set(this.distributedStateBox.latest()).filterNot(
      ([ref, v, c]) => oldState.find(c => _.isEqual(c, [ref, v])) !== undefined,
    );

    // merge the latestUpdate STUFF

    // group data by collection name
    const collectionGroups: {[coll: string]: StateToken[]} = {};
    latestUpdate.forEach(([ref, d, c]) => {
      if (collectionGroups[ref.collectionId] === undefined) {
        collectionGroups[ref.collectionId] = [];
      }

      collectionGroups[ref.collectionId].push([ref, d, c]);
    });

    // in each group. write up everything
    await Promise.all(
      Object.entries(collectionGroups).map(async ([colGroup, sts]) => {
        async function run() {
          // write up new
          await setDocs(
            collection(EMR.store, colGroup),
            sts.map(([ref, d, c]) => [ref.documentId, d]),
          );

          // record to state box
          await addDocs(
            crdtMsgs,
            sts.map(([ref, state, clock]) => ({
              ref,
              state,
              clock: HybridLogicalClock.stringify(clock),
            })),
          );
        }

        return await run();
      }),
    );
  }

  constructor(provider: ElsaProvider) {
    this._provider = provider;
  }

  /**
   * Collections available in the EMR
   */
  get collections() {
    return {
      medications: collection<Medica>(storage, 'medications'),
      medicationRequests: collection<MedicaReq>(storage, 'medication-requests'),
      medicationDispenses: collection<MedicaDisp>(
        storage,
        'medication-dispenses',
      ),
      investigationRequests: collection<InvReq>(
        storage,
        'investigation-requests',
      ),
      investigationResults: collection<InvResult>(
        storage,
        'investigation-results',
      ),
    };
  }
}

export function prepareForShare(
  data: [Document.Ref, Document.Data],
  provider: ElsaProvider,
) {
  const {facility, user} = provider.toJSON();
  return [data, {facility, user}];
}
