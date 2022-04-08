import _uuid from 'react-native-uuid';
const uuid = _uuid.v4;

/*    understand/
 * The current Hybric Logical Clock
 */
type HLC = {ts: number; nn: number; id: string};
export type HLCString = string;
let hlc: HLC;

/*    outcome/
 * Initialize the clock to start
 */
function init() {
  hlc = {
    ts: Date.now(),
    nn: 0,
    id: uuid() as string,
  };
}

/*    outcome/
 * This is the 'increment' function of a hybrid logical clock - we
 * adjust the current clock either with the latest timestamp or with an
 * incremented counter and return a serialized value
 */
function nxt(): string {
  try {
    hlc = inc(hlc);
    return serial(hlc);
  } catch (e) {
    console.error(e);
    throw e;
  }
}

function inc(my: HLC) {
  let now = Date.now();
  if (now > my.ts) {
    return {id: my.id, ts: now, nn: 0};
  } else {
    return {id: my.id, ts: my.ts, nn: my.nn + 1};
  }
}

function serial(hlc: HLC) {
  return `${hlc.ts}:${hlc.nn}:${hlc.id}`;
}

function parse(hlc: string): HLC {
  let p = hlc.split(':');
  return {
    ts: parseInt(p[0]),
    nn: parseInt(p[1]),
    id: p[2],
  };
}

/*    outcome/
 * This is the 'receive' function of a hybrid logical clock - we parse
 * the remote hlc and adjust the current clock with the latest timestamp
 * or the newly received clock whichever wins
 */
function recv(remote: string) {
  try {
    hlc = receive(parse(remote), hlc);
    return serial(hlc);
  } catch (e) {
    console.error(e);
    throw e;
  }
}

function receive(remote: HLC, my: HLC) {
  let now = Date.now();
  if (now > my.ts && now > remote.ts) {
    return {id: my.id, ts: now, nn: 0};
  }
  if (my.ts === remote.ts) {
    let nn = Math.max(my.nn, remote.nn) + 1;
    return {id: my.id, ts: my.ts, nn};
  }

  if (remote.ts > hlc.ts) {
    return {id: my.id, ts: remote.ts, nn: remote.nn + 1};
  }

  return {id: my.id, ts: my.ts, nn: my.nn + 1};
}

/**
 * Compare 2 HLCs, they should be from the same device (same `id`)
 * @param a
 * @param b
 * @returns
 */
const order = (a: HLC, b: HLC) => {
  if (a.ts === b.ts) {
    if (a.nn === b.nn) {
      if (a.id === b.id) {
        return 0;
      }
      return a.id !== b.id ? -1 : 1;
    }
    return a.nn - b.nn;
  }
  return a.ts - b.ts;
};

init();
export {nxt, recv, parse, receive, order};
