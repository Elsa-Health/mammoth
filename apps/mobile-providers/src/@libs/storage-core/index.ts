/**
 * Referencing point to the actions that are
 *  doable and are associated with the store
 */
export declare namespace Store {
	/**
	 * Options for creating a store
	 */
	type Options = { user: string };

	/**
	 * Options for making the store observable
	 */
	type ObservableOptions = {};

	type BuildConfig<StoreOptions> = {
		collectionDocument: (
			collName: string
		) => (documentName: string) => DocumentAction;
		collection: (
			name: string,
			documentAction: (name: string) => DocumentAction
		) => CollectionActions<StoreOptions, DocumentAction>;
		getCollections: () => Promise<string[]>;
	};

	/**
	 * Options useful when querying data in a collection (i.e. using `queryDoc` or `queryDocs`)
	 */
	type QueryFilter = {
		// search by id(s)
		$id?: string[] | string;
		[field: string]: any;
	};

	type SearchItem = { $text?: string; $eq?: string };
	type SearchFilter = {
		$id?: SearchItem;
	} & {
		[field: string]: SearchItem;
	};

	type SearchCallback<T> = (data: T[], done: boolean) => void;

	type CollectionActions<StoreOptions, DA extends DocumentAction> = {
		create: (opts?: StoreOptions) => Promise<void>;
		addDoc: <T extends DocumentData>(docData: T) => Promise<string>;
		addMult: <T extends DocumentData>(docData: T[]) => Promise<string[]>;
		queryDocs: <T extends DocumentData>(
			queryOptions?: QueryFilter | undefined
		) => Promise<T[]>;
		queryDoc: <T extends ProperDocumentData>(
			queryOptions?: QueryFilter | undefined
		) => Promise<T | null>;
		doc: (name: string) => DA;
		docs: () => Promise<Array<{ docId: string } & DA>>;
		search: <T>(
			query: SearchFilter,
			onResult?: SearchCallback<T>
		) => Promise<T[]>;
	};

	type WatchableCollectionActions<
		S,
		D extends DocumentAction
	> = CollectionActions<S, D> & {
		watch: (fn: (collRef: string, docIds: string[]) => void) => void;
	};

	type WatchableDocumentActions = DocumentAction & {
		watch: (fn: (collRef: string, docIds: string[]) => void) => void;
	};

	type DocumentAction = {
		create: <T extends Omit<DocumentData, "$id">>(
			docData: T
		) => Promise<void>;
		query: <T extends Omit<DocumentData, "$id">>() => Promise<T | null>;
		set: <T extends Omit<DocumentData, "$id">>(docData: T) => Promise<void>;
	};

	type DocumentData = {
		$id?: string;
		[k: string]: any;
	};
	type ProperDocumentData = {
		$id?: string;
		[k: string]: any;
	};

	type Reference<
		DR extends DocumentReference,
		CR extends CollectionReference<DR>
	> = {
		/**
		 * constructs the node needed to perform actions on
		 */
		// doc: <T>(key: string) => DR<T>
		collection: (key: string) => CR;
		collections: () => Promise<CR[]>;
	} & NodeReference;

	/**
	 * NOTE:
	 * Collection reference should only have a Fetch action.
	 * We shouldn't want to mutate a collection directly, but
	 * only do so through the document
	 */
	type CollectionReference<DR extends DocumentReference> = {
		// parent?: ParentReferenced
		key: string;
		doc: (key: string) => PermittableRef<DR>;
		docs: (credentials: ActionCredentials, query?: any) => Promise<DR[]>;
	};

	type DocumentReference = StoreQuery.Actionable<{
		/**
		 * Reference to the parent
		 */
		// parent?: ParentReference
		key: string;
	}>;
}

/**
 * Make reference able to make permissions
 */
type PermittableRef<Ref> = {
	// TODO: change permission configuration
	// setPermission: (sv: (oldPermission: Permission<string>) => Permission<string>, credentials: ActionCredentials) => void;
} & Ref;

/**
 * Object to identify the person
 *  who does and action
 */
type ActionCredentials = {
	// person performing the action
	user: string;
};

/**
 * Default node reference
 */
type NodeReference = {};

// NOTE: These reference are if you are syncing...
//  which is not what you want to do at the moment
// ------------
//  type NodeReference<K extends T, T extends string = string> = {
//      ref: K
//      get: (key: T) => NodeReference<T, T>
//      // get: (key: Omit<T, K>) => NodeReference<T, T>
//      update: (data: object) => void
//  }

// TODO: Find a means to generalize the query actions
export declare namespace StoreQuery {
	/**
	 * Options for making pull request
	 */
	type PullRequestParams = {
		/**
		 * String of the item requested
		 */
		limit?: number;
	};

	/**
	 * Options for making a push request
	 */
	type PushRequestParams = {};

	// type CollectionAction = <CT, DT, DR extends Store.DocumentReference<DT>, CR extends Store.CollectionReference<CT, DT, DR>>(
	//     key: string,
	//     _documentAction: (key: string) => DR,
	// ) => CR

	// type DocumentAction = <T, DR extends Store.DocumentReference<T>>(
	//     key: string
	// )  => DR

	/**
	 * All posible action that can be done from storage reference
	 */
	type Actionable<Ref> = Ref & FetchAction & SetAction & CreateAction;

	type FetchAction = {
		/**
		 * performing actual query string for the data
		 */
		get: <T>(
			credentials: ActionCredentials,
			query?: PullRequestParams
		) => Promise<T>;
	};

	type SetAction = {
		/**
		 * Sets the data from one form to another
		 */
		set: <T>(
			conv: (data: T) => T,
			credentials: ActionCredentials,
			pushQuery?: PushRequestParams
		) => Promise<void>;
	};

	type CreateAction = {
		/**
		 * Creates new data, while converting from one version to another
		 */
		create: <T>(
			data: T,
			credentials: any,
			docPermFn?: (permission: Permission<string>) => Permission<string>,
			options?: { isCreateCollectionIfMissing: boolean }
		) => Promise<void>;
	};

	type Constraint = {};
}

export type Store = {
	collection: (
		name: string
	) => Store.CollectionActions<{}, Store.DocumentAction>;
	collections: () => Promise<string[]>;
};

/**
 * Information the definitions for the data that's being stored
 *
 * *OBEY* Principle of least priviledge (POLP)
 *
 * NOTE: Didn't make this with a clear mind. Rethinking might be needed
 */

/**
 * Users that can talk to the collections and/or document
 */
type User<US extends string> = "__all__" | Exclude<US, "__all__">;

// Actions that can be done
type AllowableAction = "read" | "write";

type Permission<U extends string> = {
	[user in User<U>]?: AllowableAction[];
};

export function buildStore<StoreOptions>(sbc: Store.BuildConfig<StoreOptions>) {
	return {
		collection: (name: string) =>
			sbc.collection(name, sbc.collectionDocument(name)),
		collections: async () => {
			return await sbc.getCollections();
		},
	};
}
