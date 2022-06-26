import { Level } from "level";
import { nanoid } from "nanoid";
import {
	addDoc,
	addDocs,
	collection,
	getDocs,
	getStore,
	query,
	setDocs,
} from "papai/collection";
import { LevelDBCollection } from "./store/level-collection";

// instance to work with.
const db = new Level("./server-level-playground-volume", {
	createIfMissing: true,
	errorIfExists: false,
	valueEncoding: "json",
	keyEncoding: "utf8",
	compression: true,
});

const store = getStore(LevelDBCollection(db, nanoid));

async function run() {
	const sample = collection(store, "samples");

	await setDocs(sample, [
		["8HSchGciA1x3PR_4qAM9-", { name: "Rose", age: 34 }],
		["Vy_4YbFOjJh4YbVXyC4tJ", { name: "Something", age: 1234512 }],
	]);

	await query(sample).then((d) => console.log(d.toArray()));
}

// open the database
db.open()
	.then(run)
	.catch((err) => console.error(err))
	.finally(() => db.close());
