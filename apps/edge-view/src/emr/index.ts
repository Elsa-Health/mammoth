import { collection } from "papai/collection";
import { Store } from "papai/collection/core";

import type { Patient } from "./v1/personnel";

export {};

function emr(store: Store) {
	const patientCollection = collection<Patient>(store, "patients");
}
