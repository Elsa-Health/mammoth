/**
 * Item Storage Implementation that can work with this
 */

import {DData, QueryObject} from '..';
import {CollectionAction, DocumentAction} from '../store-core';

type KeyValuePair = [string, string | null];
export type AsyncItemStorage = {
  getItem: (ref: string) => Promise<string | null>;
  setItem: (ref: string, item: string) => Promise<void>;
  multiGet: (refs: string[]) => Promise<readonly KeyValuePair[] | void>;
  multiSet: (kvp: Array<[string, string]>) => Promise<void>;
};

const Helper = {
  get: async <T>(
    istore: AsyncItemStorage,
    key: string,
    fallback: T | undefined = undefined,
  ) => {
    const x = await istore.getItem(key);
    const vals: T = x !== null ? JSON.parse(x) : (fallback as T);
    return vals;
  },

  set: async <T>(istore: AsyncItemStorage, key: string, value: T) => {
    await istore.setItem(key, JSON.stringify(value));
  },
};

const setCollection = async (
  istore: AsyncItemStorage,
  collectionId: string,
  opt: {collectionsRef: string},
) => {
  const vals = await Helper.get<string[]>(istore, opt.collectionsRef, []);
  await istore.setItem(
    opt.collectionsRef,
    JSON.stringify(Array.from(new Set([...vals, collectionId]))),
  );
};

const addDocumentIdToCollection = async (
  istore: AsyncItemStorage,
  collRef: string,
  documentId: string,
) => {
  const vals = await Helper.get<string[]>(istore, collRef, []);
  Helper.set(istore, collRef, Array.from(new Set([...vals, documentId])));
};

const setDocument = async <T>(
  istore: AsyncItemStorage,
  documentRef: string,
  data?: T | undefined,
) => {
  // write to the document
  await istore.setItem(documentRef, JSON.stringify({$data: data}));
};

const getDocument = async <T>(
  istore: AsyncItemStorage,
  documentRef: string,
) => {
  const obj = await Helper.get<{$data: T} | null>(istore, documentRef, null);
  return obj?.$data ?? null;
};

async function documentFire<T extends object>(
  action: DocumentAction<T>,
  opt: {
    istore: AsyncItemStorage;
    buildDocRef: (docId: string, collId: string) => string;
    buildCollRef: (collId: string) => string;
    collectionsUID: string;
  },
): Promise<T | null> {
  // get reference for document
  const collRef = opt.buildCollRef(action.collectionId);
  const docRef = opt.buildDocRef(action.id, action.collectionId);
  // console.log('document actions ==> ', action);

  // similar to initializing the collection
  setCollection(opt.istore, action.collectionId, {
    collectionsRef: opt.collectionsUID,
  });

  switch (action.type) {
    case 'set': {
      // set the collection
      await setDocument(opt.istore, docRef, action.data);

      // update the collection with docId record
      await addDocumentIdToCollection(opt.istore, collRef, action.id);
      return action.data ?? ({} as T);
    }
    case 'read': {
      // read data from the document
      return await getDocument<T>(opt.istore, docRef);
    }
    case 'update': {
      const prevData = await getDocument<T>(opt.istore, docRef);

      // update the document
      const newData: T = {...prevData, ...action.partialValue};
      await setDocument(opt.istore, docRef, newData);
      return newData;
    }
    case 'delete': {
      throw new Error('Not implemented');
    }
    default: {
      console.trace(`Action: ${action} `);
      throw new Error(
        // @ts-ignore
        `Document action for type=${action.type} not implemented.`,
      );
    }
  }
}

async function getCollections(
  istore: AsyncItemStorage,
  collectionsRef: string,
) {
  return await Helper.get<string[]>(istore, collectionsRef, []);
}

async function collectionFire<T extends DData>(
  action: CollectionAction<T>,
  opt: {
    istore: AsyncItemStorage;
    buildDocRef: (docId: string, collId: string) => string;
    buildCollRef: (collId: string) => string;
    generateId: (id?: string) => string;
  },
): Promise<string[] | [string, T][] | [string, T] | null> {
  // get reference for collection
  const collRef = opt.buildCollRef(action.id);

  // console.log('collection actions ==> ', action);
  const getDocumentsId = async () =>
    await Helper.get<string[]>(opt.istore, collRef, []);

  const subsetDocsById = async (
    qid?: QueryObject['$id'] | undefined,
  ): Promise<[string, T][]> => {
    // Performs search  and load what can be loaded
    const docsIds = await getDocumentsId();
    let $docsToLoad = docsIds;

    // console.log({$docsToLoad, id: action.id});

    if (qid !== undefined) {
      // filter by id
      $docsToLoad = docsIds.filter(id => {
        if (Array.isArray(qid)) {
          return qid.includes(id);
        }

        if (typeof qid === 'string') {
          return qid === id;
        }

        if (qid['$eq'] !== undefined) {
          return qid['$eq'] === id;
        }

        if (qid['$text'] !== undefined) {
          return id.includes(qid['$text']);
        }

        return true;
      });
    }

    const docRefDataPairs = (await opt.istore.multiGet(
      $docsToLoad.map(id => opt.buildDocRef(id, action.id)),
    )) as KeyValuePair[];

    // Documents
    const docIdDataPairs = docRefDataPairs.map(([_k, _v], ix) => {
      const [docId, data$] = [$docsToLoad[ix], _v];

      // NOTE the `$data` is important
      const d = data$ !== null ? JSON.parse(data$).$data : ({} as T);

      return [docId, d];
    }) as [string, T][];

    return docIdDataPairs;
  };

  const querySingleDoc = async (
    qo: QueryObject | undefined,
  ): Promise<[string, T] | null> => {
    const {$id: qid, ...otherQ} = qo || {};
    const dcs = await subsetDocsById(qid);
    const locatedDoc = dcs.find(([_id, d]) => {
      if (otherQ === undefined) {
        return true;
      }

      if (d === null) {
        return false;
      }

      return Object.keys(otherQ).every(k => {
        const v = otherQ[k];
        if (Array.isArray(v)) {
          return v.includes(d[k]);
        }

        if (v === undefined) {
          return true;
        }

        if (typeof v === 'string') {
          return v === d[k];
        }

        if (v['$eq'] !== undefined) {
          return v['$eq'] === d[k];
        }

        if (v['$text'] !== undefined) {
          return d[k].includes(v['$text']);
        }

        return v === d[k];
      });
    });

    return locatedDoc !== undefined ? locatedDoc : null;
  };

  const queryDocs = async (
    qo: QueryObject | undefined,
  ): Promise<Array<[string, T]>> => {
    const {$id: qid, ...otherQ} = qo || {};
    const dcs = await subsetDocsById(qid);

    return dcs.filter(([_id, d]) => {
      if (otherQ === undefined) {
        return true;
      }

      if (d === null) {
        return false;
      }

      return Object.keys(otherQ).every(k => {
        const v = otherQ[k];

        if (Array.isArray(v)) {
          return v.includes(d[k]);
        }

        if (v === undefined) {
          return true;
        }

        if (typeof v === 'string') {
          return v === d[k];
        }

        if (v['$eq'] !== undefined) {
          return v['$eq'] === d[k];
        }

        if (v['$text'] !== undefined) {
          return d[k].includes(v['$text']);
        }

        return v === d[k];
      });
    }) as [string, T][];
  };

  // get reference for document
  switch (action.type) {
    case 'get-doc-ids': {
      return await getDocumentsId();
    }
    case 'set': {
      const {idDataPairs: dataPairs} = action;
      const result: [string, T][] = dataPairs.map(([_id, data]) => {
        const docId = opt.generateId(_id);
        const docRef = opt.buildDocRef(docId, action.id);

        setDocument(opt.istore, docRef, data);
        // update the collection with docId record
        addDocumentIdToCollection(opt.istore, collRef, docId);
        return [docId, data];
      });

      return result;
    }
    case 'query': {
      return await queryDocs(action.query);
    }
    case 'single-query': {
      return await querySingleDoc(action.query);
    }
    default: {
      console.trace(`Action: ${action}`);
      throw new Error(
        // @ts-ignore
        `Collection action for type=${action.type} not implemented.`,
      );
    }
  }
}

export function configuration({
  istore,
  buildCollRef,
  buildDocRef,
  generateId,
  collectionsUID,
}: {
  istore: AsyncItemStorage;
  collectionsUID: string;

  buildDocRef: (docId: string, collId: string) => string;
  buildCollRef: (collId: string) => string;
  generateId: (id?: string) => string;
}) {
  return {
    documentFire: async (action: DocumentAction) =>
      await documentFire(action, {
        buildCollRef,
        buildDocRef,
        istore,
        collectionsUID,
      }),
    collectionFire: async (action: CollectionAction) =>
      await collectionFire(action, {
        buildCollRef,
        buildDocRef,
        generateId,
        istore,
      }),
    getCollections: async () => await getCollections(istore, collectionsUID),
  };
}

export type SyncSingleItemStorage = {
  getItem: (ref: string) => string | null;
  setItem: (ref: string, item: string) => void;
};
export function SyncItemStorageAdapter(
  syncStore: SyncSingleItemStorage,
): AsyncItemStorage {
  return {
    getItem: async (key: string) => syncStore.getItem(key),
    setItem: async (key: string, value: string) =>
      syncStore.setItem(key, value),
    multiGet: async (refs: string[]) =>
      refs.map(key => [key, syncStore.getItem(key)]),
    multiSet: async kvp => {
      kvp.map(([key, val]) => {
        syncStore.setItem(key, val);
      });
    },
  };
}
