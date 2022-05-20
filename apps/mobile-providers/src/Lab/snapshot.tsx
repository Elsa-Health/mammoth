import { proxy, subscribe } from "valtio";
import { subscribeKey } from "valtio/utils";
import deviceStorage from "../app/storage";

const emr = deviceStorage();

export const visits = proxy({ data: [] });
export const patients = proxy({
	data: emr.collection("patients").queryDocs<Patient>(),
});
export const investigations = proxy({ data: [] });

// Bind changes to the storages
subscribeKey(patients, "data", (data) => {
	console.log("Changed to");
});
