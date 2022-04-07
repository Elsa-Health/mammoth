import React from "react";
import { buildStore } from "sabertooth";
import ItemStorage from "sabertooth-stores/local/itemStorage";

const store = buildStore(
	ItemStorage(
		"@BROWSER_STORE",
		{
			getItem: async (...args) => localStorage.getItem(...args),
			setItem: async (...args) => localStorage.setItem(...args),
			multiGet: async (keys) => {
				return await Promise.all(
					keys.map(async (key) => [key, localStorage.getItem(key)])
				);
			},
			multiSet: async (kvps) => {
				await Promise.all(
					kvps.map(async ([key, value]) => {
						localStorage.setItem(key, value);
					})
				);
			},
		},
		(id) => id || Math.random().toString()
	)
);

store.collection("samples").create({ createIfNotExists: true });
export default function APP() {
	React.useEffect(() => {}, []);
	return (
		<div>
			<h2>CRDT Testings</h2>
			<button
				onClick={() =>
					store.collection("samples").addDoc({ name: "Kevin" })
				}
			>
				Store Sample
			</button>
		</div>
	);
}
