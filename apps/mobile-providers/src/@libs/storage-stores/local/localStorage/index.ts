import {Store} from '../../../storage-core';
import {
  collection,
  getCollections,
  collectionDocument,
  LocalStorageStoreOption,
} from './api';
import {Observable, Subject} from 'rxjs';
import {watchableCollection, watchableCollectionDocument} from './watchableApi';

/**
 * These are the configurations needed to recreate the storage class
 */
const localStorageBuildConfig = (
  genDocRef: (id?: string) => string,
): Store.BuildConfig<LocalStorageStoreOption> => ({
  collection: collection(genDocRef),
  getCollections: async () => getCollections(),
  collectionDocument: collectionDocument(genDocRef),
});

export default localStorageBuildConfig;

export const watchableLocalStorageStore = (
  genDocRef: (id?: string) => string,
) => {
  const observable = new Observable<any>();
  const colSubj = new Subject();
  const docSubj = new Subject();

  const $collDocument = collectionDocument(genDocRef);

  return {
    collection: (name: string) =>
      watchableCollection(
        observable,
        colSubj as any,
        () =>
          colSubj.next({
            $col: {$id: name, $ids: getCollections()},
          }),
        collection(genDocRef),
      )(name, watchableCollectionDocument(docSubj as any, $collDocument(name))),
    collectionDocument: (collName: string) =>
      watchableCollectionDocument(docSubj as any, $collDocument(collName)),
    getCollections: async () => getCollections(),
  };
};
