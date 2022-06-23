import {Set} from 'immutable';
import _ from 'lodash';
import {
  addDocs,
  collection,
  Document,
  getDocs,
  setDocs,
} from 'papai/collection';
import {Store} from 'papai/collection/core';
import {HybridLogicalClock} from 'papai/distributed/clock';
import {StateTrackingBox} from 'papai/distributed/store';
import z from 'zod';
import {getCrdtCollection, getPrivateStore} from '../emr/store';

const docref = z.object({collectionId: z.string(), documentId: z.string()});
const docdata = z.any();
const clock = z.string();

export const Message = z.object({
  refOrigin: docref,
  state: docdata,
  clock,
});
export type Message = z.infer<typeof Message>;

export const StateToken = z.tuple([docref, docdata, clock]);
export const StateSource = z.object({
  facility: z.string(),
  user: z.object({uid: z.string()}),
  deviceId: z.string(),
});
// [Document.Ref, Document.Data, HybridLogicalClock];
export type StateToken = z.infer<typeof StateToken>;
// {facility: any; user: {uid: string}; deviceId: string};
export type StateSource = z.infer<typeof StateSource>;

/**
 * Structure of the message
 */
const StateMessage = z.object({
  tokens: z.array(StateToken),
  source: StateSource,
});
type StateMessage = z.infer<typeof StateMessage>;
// type StateCRDTMessage = [StateToken, StateSource];

/**
 * Merging inforamtion received from `StateMessage` to state box
 * @param stateBox
 * @param msgs
 */
export function mergeUp(stateBox: StateTrackingBox, msgs: any) {
  // merge the states:

  msgs
    // validate the state messages
    .map(o => StateMessage.parse(o))
    // write the state messages to the state box
    .forEach(msg => {
      // console.log(msg);
      const [token, source] = msg;
      const [ref_, data, clock] = token;

      // merge the contents of the
      stateBox.append(ref_, data, clock);
    });
}

/**
 * Hydrates information to the state box from private CRDT messages store
 * :note: Doesn't observe pure functions
 * @param stateBox
 * @returns
 */
export async function hydrateBoxFromStore(stateBox: StateTrackingBox) {
  const prevMssgs = await getDocs(getCrdtCollection());

  prevMssgs.map(([_, {refOrigin: ref, clock, state}]) =>
    stateBox.append(ref, state, HybridLogicalClock.parse(clock)),
  );

  return stateBox;
}

/**
 * Store to pass statebox latest inforamtion to.
 *
 * :note: This is can get expensive
 * @param stateBox
 * @param syncingStore
 */
export async function syncronize(
  stateBox: StateTrackingBox,
  syncingStore: Store,
) {
  const entries = Object.entries(
    _.groupBy(
      Set(stateBox.latest()).toArray(),
      ([ref, d, c]) => ref.collectionId,
    ),
  );

  await Promise.all(
    entries.map(async ([collgroup, sts]) => {
      // write up new
      await setDocs(
        collection(syncingStore, collgroup),
        sts.map(([ref, d, c]) => [ref.documentId, d]),
      );
    }),
  );
}
