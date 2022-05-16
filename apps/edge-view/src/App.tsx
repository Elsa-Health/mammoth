import React from "react";
import { addDoc, addDocs, collection, getStore } from "papai/collection";
import KeyValueMapStore from "papai/stores/collection/KeyValueMap";

import {
	StateTrackingBox,
	onTrackStoreChanges,
	updateChangesToStore,
} from "papai/distributed/store";

import { v4 as generateUUID } from "uuid";
import { HybridLogicalClock } from "papai/distributed/clock";
import { cp } from "fs/promises";

import { nanoid } from "nanoid";

const store = getStore(KeyValueMapStore(() => nanoid(10)));

// Initial clock
const initclock = new HybridLogicalClock(generateUUID());

// sync
const tbox = new StateTrackingBox(initclock);

// Listening to changes
onTrackStoreChanges(store, tbox, (r) => `${r.collectionId}/${r.documentId}`);

export default function EdgeView() {
	const pushRandomData = async () => {
		await addDoc(collection(store, "ran-data"), {
			name: nanoid(14),
			number: Date.now(),
		});
		console.log("Done!");
	};

	return (
		<div>
			<div className="mx-auto container px-12 py-8">
				<h2>Check messages shared</h2>
				<button
					onClick={pushRandomData}
					className="border px-4 py-2 hover:border-gray-400"
				>
					Action
				</button>
			</div>
		</div>
	);
}
