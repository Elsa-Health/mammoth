// get the store with the entire copy of the databases
// const mirrorStorage = getStore(KeyValueMapCollection(() => nanoid(24)));

import { Level } from "level";
import { nanoid } from "nanoid";
import { collection, getStore } from "papai/collection";
import { HybridLogicalClock, StateTrackingBox } from "papai/distributed";
import { LevelDBCollection } from "./store/level-collection";

// configuration for initing the dbs
const opts = {
	createIfMissing: true,
	errorIfExists: false,
	valueEncoding: "json",
	keyEncoding: "utf8",
	compression: true,
};

const publicLDB = new Level("./server-publicdb-volume", { ...opts });
const privateLDB = new Level("./server-privatedb-volume", {
	...opts,
	prefix: "$",
});

const serverName = `elsa-edge-node-${nanoid(10)}`;
const serverClock = new HybridLogicalClock(serverName);

// time the server woke up
const serverWakeUpTime = new Date();

/**
 * Initialize store contents
 */
export const ServerDB = {
	public: () => getStore(LevelDBCollection(publicLDB, nanoid)),
	private: () => getStore(LevelDBCollection(privateLDB, nanoid)),
	open: async () => await Promise.all([publicLDB.open(), privateLDB.open()]),

	// leave the closing to happen sequentially
	close: async () => {
		await publicLDB.close();
		await privateLDB.close();
	},
	server: {
		name: serverName,
		startTime: serverWakeUpTime,
	},

	clock: serverClock,
	// statebox, that syncronizes changes
	statebox: new StateTrackingBox(serverClock),
};

// note to collect the CRDT messages collected over time
export const crdtMsgCollection = collection<{
	ref: any;
	state: any;
	clock: string;
}>(ServerDB.private(), "crdt-messages-log");
