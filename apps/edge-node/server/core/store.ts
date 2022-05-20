import { configuration } from "sabertooth-stores/key-value-map";

import { buildStore, Store } from "sabertooth-core";
import { v4 as uuidv4 } from "uuid";

// persisting messages (but using key-value-map isn't as useful)
export const store = buildStore(
	// @ts-ignore
	Store,
	configuration({
		generateId: (id) => id || uuidv4(),
		buildDocRef: (docid, collid) => `#CRDT@${collid}=${docid}`,
	})
);
