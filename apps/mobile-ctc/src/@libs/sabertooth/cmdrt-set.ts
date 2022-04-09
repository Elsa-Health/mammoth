import * as hlc from './hybrid-logical-clock';
import {DocumentAction} from './store-core';

// type CDRTMessage = {
//   x: any;
//   timestamp: string;
//   state?: any;
//   type?: 'tombstone'; // | "entry"
// };

/**
 * Creating a LWW set
 */
export class LWWSet<T> extends Set<T> {
  // constructor() {}
  constructor() {
    super();
  }
}

export type State<Op, T> = {op: Op; result: T};
export type SBState<Op, T> = {state: State<Op, T>; timestamp: hlc.HLCString};

/**
 * Create State Based set
 */
export class SBSet<Op, T> extends Set<SBState<Op, T>> {
  private _statesVals: Set<SBState<Op, T>>;

  constructor(arr?: SBState<Op, T>[]) {
    super();
    // all states
    this._statesVals = new Set<SBState<Op, T>>(arr);
  }

  /**
   * Adds the message to the current set
   * @param state
   * @returns
   */
  add(state: SBState<Op, T>) {
    this._add(state);
    return this;
  }

  private _add(obj: SBState<Op, T>) {
    const {state, timestamp} = obj;
    if (!this.hasState(state)) {
      this._statesVals.add(obj);
    }
  }

  merge(set: SBSet<Op, T>) {
    //, onMerge: (op: Op, result: T) => void) {
    Array.from(set.values()).forEach(({state, timestamp}) => {
      if (!this.hasState(state)) {
        // onMerge(v.state.op, v.state.result);
        this._add({state, timestamp: hlc.recv(timestamp)});
      }
    });
  }
  /**
   * Check if the state exists
   */
  has(state: SBState<Op, T>): boolean {
    return this._statesVals.has(state);
  }

  hasState(state: State<Op, T>): boolean {
    return this.states().has(state);
  }

  states() {
    // TODO: perform proper cache
    return new Set<State<Op, T>>(
      Array.from(this._statesVals.values()).map(s => s.state),
    );
  }

  valuesWithoutTimeStamp() {
    return this.states().values();
  }

  //
  static DEV_from<Op, T>(arr: SBState<Op, T>[]) {
    const sbset = new SBSet<Op, T>(arr);
    return sbset;
  }

  toArray() {
    return Array.from(this._statesVals.values());
  }

  values(): IterableIterator<SBState<Op, T>> {
    return this._statesVals.values();
  }
}

/**
 * CDRT Message Box that keeps track of messages.
 */
export class CRDTMessageBox {
  private _crdtSet: SBSet<DocumentAction<any>, any>;
  constructor(sbset: SBSet<DocumentAction<any>, any> = new SBSet()) {
    this._crdtSet = sbset;
  }

  append(op: DocumentAction<any>, result: any) {
    const message: SBState<DocumentAction<any>, any> = {
      state: {op, result},
      timestamp: hlc.nxt(),
    };

    this._crdtSet.add(message);
    return message;
  }

  set() {
    return this._crdtSet;
  }

  messages() {
    return this._crdtSet.toArray();
  }

  resolve() {
    // console.log(vals);
    const [resolved, ops] = resolveOperations(this.set());
    this._crdtSet = new SBSet(ops);
    return resolved;
  }

  static resolve(set: SBSet<DocumentAction<any>, any>) {
    const [_, vals] = resolveOperations(set);
    return new CRDTMessageBox(new SBSet(vals));
  }

  merge(otherSet: SBSet<DocumentAction<any>, any>) {
    // Merge the sets
    this._crdtSet.merge(otherSet);
    return this;
  }
}

export function resolveOperations(set: SBSet<DocumentAction<any>, any>) {
  // Update and resolve the update
  const resolved = resolveStates(set);
  const {collections, docs} = resolved;

  const vals = ([] as SBState<DocumentAction<any>, any>[]).concat(
    ...Object.entries(collections).map(([collId, _docs]) => {
      return _docs
        .filter(s => docs[s] !== undefined)
        .map(docId => {
          return {
            state: docs[docId].state,
            timestamp: hlc.recv(docs[docId].timestamp),
          } as SBState<DocumentAction<any>, any>;
        });
    }),
  );

  return [resolved, vals] as [typeof resolved, typeof vals];
}

/**
 * Resolve the State-Based CDRT to contain the perfect snapshot
 * of the data from the messages
 *
 * @param set State-Based CDRT Set
 */
export function resolveStates(set: SBSet<DocumentAction<any>, any>) {
  const executed = new Set<{
    type: DocumentAction['type'];
    id: string;
    timestamp: hlc.HLCString;
  }>();

  // This must be in serializable format
  const docs: {
    [id: string]: {state: any; timestamp: hlc.HLCString};
  } = {};

  // This must be in serializable format
  const collections: {
    [id: string]: string[];
  } = {};

  for (let x of Array.from(set.values())) {
    const {state, timestamp} = x;
    const {op} = state;

    if (op.type === 'set' || op.type === 'update') {
      // check if executed
      // console.log("@", op);
      const d = Array.from(executed.values())
        .filter(t => t.type === 'set' || t.type === 'update')
        .find(s => s.id === op.id);

      // console.log("#", { d });

      if (d !== undefined) {
        if (d.timestamp > timestamp) {
          continue;
        }
      }

      docs[op.id] = {state, timestamp};

      // Collection Id
      const collSet = new Set(collections[op.collectionId] ?? []);
      collSet.add(op.id);

      collections[op.collectionId] = Array.from(collSet);

      // add record to indicate function already executed
      executed.add({type: op.type, id: op.id, timestamp});
    }
  }

  return {docs, collections};
}
