import {DocumentAction, CollectionAction} from '../store-core';

// All collections EVER
const collections: {
  [id: string]:
    | {
        added: Set<string>;
        removed: Set<string>;
      }
    | undefined;
} = {};

// HACK: all documents
const $S: {[id: string]: object | undefined} = {};
/**
 * Initializes the store with information needed to interact with it
 * @param collectionId
 */
const initialize = (collectionId: string) => {
  // initialize set
  const collectionSet = collections[collectionId];

  if (collectionSet === undefined) {
    collections[collectionId] = {
      added: new Set(),
      removed: new Set(),
    };
  }
};

/**
 * Adds the documentId to the collection
 * @param documentId
 * @param collectionId
 */
const addIdToCollection = (documentId: string, collectionId: string) => {
  collections[collectionId]?.removed.delete(documentId);
  collections[collectionId]?.added.add(documentId);
};

/**
 * Flags as the document is removed from the collection
 * (trying to maintain append-only mode)
 * @param documentId
 * @param collectionId
 */
const deleteIdToCollection = (documentId: string, collectionId: string) => {
  collections[collectionId]?.added.delete(documentId);
  collections[collectionId]?.removed.add(documentId);
};

/**
 * Actions to fire for the document on the store
 * @param action
 * @returns
 */
export async function documentFire<T extends object>(
  action: DocumentAction<T>,
  {
    buildDocRef: docCollStr,
  }: {
    buildDocRef: (docId: string, collId: string) => string;
  },
): Promise<T | null> {
  // console.log($S);
  const docRef = docCollStr(action.id, action.collectionId);
  switch (action.type) {
    case 'set': {
      // create / set the document (document may or maynot exist)
      const data = (action.data || {}) as T;
      $S[docRef] = data;

      // add Id to set
      addIdToCollection(action.id, action.collectionId);
      return data;
    }
    case 'read': {
      // read data from the document
      const data = $S[docRef] as T;
      if (data === undefined) {
        return null;
      }
      return data;
    }
    case 'update': {
      // update the document
      const data = {
        ...$S[docRef],
        ...(action.partialValue || {}),
      } as T;
      $S[docRef] = data;
      addIdToCollection(action.id, action.collectionId);
      return data;
    }
    case 'delete': {
      // delete the record.
      $S[docRef] = undefined;
      deleteIdToCollection(action.id, action.collectionId);
      return null;
    }
    default: {
      console.trace(`Action: ${action}`);
      throw new Error(
        // @ts-ignore
        `Document action for type=${action.type} not implemented.`,
      );
    }
  }
}

export async function getCollections() {
  return Object.keys(collections);
}

export async function collectionFire<T extends object>(
  action: CollectionAction<T>,
  {
    buildDocRef: docCollStr,
    generateId,
  }: {
    buildDocRef: (docId: string, collId: string) => string;
    generateId: (id?: string) => string;
  },
) {
  // This will always be executed first because of
  // store.collection(x).document(y)
  // To mean that to reach through any document, has to be through
  // the collection
  initialize(action.id);

  // console.log($S, collections);
  const docRefFn = (id: string) => docCollStr(id, action.id);

  switch (action.type) {
    case 'get-doc-ids': {
      return Array.from(collections[action.id]?.added || []);
    }

    case 'set': {
      // treat as batch set
      const {idDataPais} = action;
      const result: [string, T][] = idDataPais.map(([_id, data]) => {
        const id = generateId(_id);
        const docref = docRefFn(id);
        $S[docref] = data;

        addIdToCollection(id, action.id);
        return [id, data];
      });

      // console.log("Adding...", {
      // 	s: result.map(([id, _]) => $S[docCollStr(id, action.id)]),
      // });
      return new Set(result);
    }
    case 'single-query': {
      // This should be used but isn't
      const {query} = action;
      const docs = Array.from(collections[action.id]?.added.values() || []);

      if (docs.length > 0) {
        return $S[docRefFn(docs[0])] as T;
      }

      return null;
    }

    case 'query': {
      const docs = Array.from(collections[action.id]?.added.values() || []);

      return new Set(docs.map(id => [id, $S[docCollStr(id, action.id)] as T]));
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

export function configuration(c: {
  buildDocRef: (docId: string, collId: string) => string;
  generateId: (id?: string) => string;
}) {
  return {
    documentFire: async (action: DocumentAction) =>
      await documentFire(action, {buildDocRef: c.buildDocRef}),
    collectionFire: async (action: CollectionAction) =>
      await collectionFire(action, c),
    getCollections,
  };
}
