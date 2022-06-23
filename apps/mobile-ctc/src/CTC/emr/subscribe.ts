/**
 * Subscribe to the changes that are going on
 * in the application
 */

import {addDoc} from 'papai/collection';
import {HybridLogicalClock} from 'papai/distributed/clock';
import {onTrackStoreAddUpdateChanges} from 'papai/distributed/store';
import {ElsaProvider} from '../../provider/backend';
import {CRDTState} from '../actions/socket';
import {getCrdtCollection, getStorage, stateBox, stateClock} from './store';

// set observable on document change
const store = getStorage();
store.documentObservable.subscribe(function (val) {
  // ...
  if (val.action === 'updated') {
    addDoc(getCrdtCollection(), {
      refOrigin: val.ref,
      state: val.state,
      clock: HybridLogicalClock.stringify(stateClock.next()),
    });
  }
});

// sync up the stores
export function onSnapshotUpdate(
  provider: ElsaProvider,
  cb: (message: CRDTState) => void,
) {
  const {
    facility: {ctcCode = 'UNKNOWN'},
    user: {uid: userId},
  } = provider.toJSON();
  return onTrackStoreAddUpdateChanges(
    getStorage(),
    stateBox,
    function (doc, state, clock) {
      // ...
      // console.log('Shout on change!');
      cb({
        type: 'crdt',
        batch: [[doc, state, clock.toString()]],
        source: {facility: ctcCode, userId},
      });
    },
  );
}
