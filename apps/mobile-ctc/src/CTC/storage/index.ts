import {store} from './personal';

export {
  deviceStorage,
  merge,
  mergeOther,
  sync,
  crdtBox,
  onUpdateSnapshot,
} from './main';
export const devicePrivateStorage = () => store;
