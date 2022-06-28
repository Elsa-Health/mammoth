/**
 * Actions associated with communicating information to the external store via socket
 */
import z from 'zod';

import {getDocs} from 'papai/collection';
import {getCrdtCollection, getStorage, stateBox} from '../emr/store';
import {ElsaProvider} from '../../provider/backend';
import {mergeUp, StateMessage, syncronize} from './sync';

export const StockState = z.object({
  type: z.literal('stock'),
  facility: z.string(),
  stock: z.array(z.tuple([z.string(), z.tuple([z.string(), z.number()])])),
  timestamp: z.string(),
});
export type StockState = z.infer<typeof StockState>;

// When receiving stock data
export function handleStockData(data: StockState, cb?: (err?: Error) => any) {
  // ...
}

export const CRDTState = z.object({
  type: z.literal('crdt'),
  source: z.object({facility: z.string(), userId: z.string()}).optional(),
  batch: z.array(
    z.tuple([
      z.object({collectionId: z.string(), documentId: z.string()}),
      z.any(),
      // something
      z.string(),
    ]),
  ),
});
export type CRDTState = z.infer<typeof CRDTState>;
/**
 * When receiving data associated with crdts
 */
export function handleCRDTData(data: StateMessage, cb?: (err?: Error) => any) {
  // console.log('Received:', data);

  // merging the contents
  mergeUp(stateBox, data.tokens);

  // synchronize the contents
  syncronize(stateBox, getStorage())
    .then(() => console.log('Change sync completed!'))
    // .then(() => {
    //   console.log('Done!');
    //   // ...
    // })
    .catch(err => {
      console.log('Sync failed!');
      console.error(err);
    });
}

const initValue = z.union([
  CRDTState.pick({type: true}),
  StockState.pick({type: true}),
]);

/**
 * Generally handles socket received data
 * ---
 */
export function syncContentsFromSocket(data: any) {
  // usable?
  const usable = initValue.parse(data);

  if (usable.type === 'stock') {
    handleStockData(StockState.parse(data));
    return;
  }

  if (usable.type === 'crdt') {
    handleCRDTData(StateMessage.parse(data));
    return;
  }

  // nothing else should be here
  throw new Error("You shouldn't even see this. If you can, 503 error");
}

const crdtCollection = getCrdtCollection();
export async function fetchCRDTMessages(provider: ElsaProvider) {
  const d = await getDocs(crdtCollection);

  if (d.length === 0) {
    return null;
  }

  const {
    facility: {ctcCode = 'UNKNOWN'},
    user: {uid: userId},
  } = provider.toJSON();

  return {
    type: 'crdt',
    batch: d.map(([_, {refOrigin, clock, state}]) => [refOrigin, state, clock]),
    source: {facility: ctcCode, userId},
  } as CRDTState;
}
