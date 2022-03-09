import {Store} from '../../../storage-core';
import {collection, LocalStorageStoreOption, collectionDocument} from './api';

import {Observable, Subject} from 'rxjs';

type WDocData<T> = {$doc: {$id: string; $data?: T}};
type WCollData<T> = {$col: {$id: string; $ids?: T}};
export const watchableCollectionDocument =
  (
    docSubj: Subject<WDocData<any>>,
    document: (name: string) => Store.DocumentAction,
  ) =>
  (docName: string): Store.WatchableDocumentActions => {
    const dA = document(docName);
    return {
      create: async data => {
        await dA.create(data);
        docSubj.next({$doc: {$id: docName, $data: data}});
      },
      set: async data => {
        await dA.set(data);
        docSubj.next({$doc: {$id: docName, $data: data}});
      },
      query: dA.query,
      watch: (fn: (key: string, data?: any) => void) => {
        docSubj.subscribe(d => {
          // fire watch
          fn(d.$doc.$id, d.$doc.$data);
        });
      },
    };
  };

export const watchableCollection =
  (
    observable: Observable<any>,
    colSubj: Subject<WCollData<any>>,
    fb: () => void,
    collection: <DA extends Store.DocumentAction>(
      name: string,
      dA: (name: string) => DA,
    ) => Store.CollectionActions<LocalStorageStoreOption, DA>,
  ) =>
  <DA extends Store.DocumentAction>(
    name: string,
    collectionDocument: (name: string) => DA,
  ): Store.WatchableCollectionActions<LocalStorageStoreOption, DA> => {
    const cN = collection(name, collectionDocument);

    return {
      create: async opt => {
        await cN.create(opt);
        fb();
      },
      addDoc: async docData => {
        const d = await cN.addDoc(docData);
        fb();
        return d;
      },
      addMult: async docData => {
        const d = await cN.addMult(docData);
        fb();
        return d;
      },
      queryDoc: cN.queryDoc,
      queryDocs: cN.queryDocs,
      docs: cN.docs,
      doc: collectionDocument,
      watch: (fn: (key: string, docIds: string[]) => void) => {
        colSubj.subscribe(d => {
          // fire watch
          fn(d.$col.$id, d.$col.$ids);
        });
      },
    };
  };
