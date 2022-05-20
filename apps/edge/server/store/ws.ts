import { Server } from "http";
import { nanoid } from "nanoid";
import { WebSocketServer, WebSocket } from "ws";

import { collection, doc, getStore, setDoc, Document } from "papai/collection";
import type { Store } from "papai/collection/core";
import KeyValueMapCollection from "papai/stores/collection/KeyValueMap";

import {
	StateTrackingBox,
	onTrackStoreAddUpdateChanges,
} from "papai/distributed/store";
import { getServerClock } from "../config";

const docRefToKeyStr = (d: Document.Ref) => {
	return `${d.collectionId}/${d.documentId}`;
};

const crdtStore = getStore(KeyValueMapCollection(() => nanoid(6)));
const statebox = new StateTrackingBox(getServerClock());
// build quick bubble to cache the state
export default function initiateWebSocket(
	wsPath: string,
	server: Server,
	store: Store
) {
	// set up socket
	const wss = new WebSocketServer({
		path: wsPath,
		server,
	});

	wss.on("connection", (socket) => {
		console.log("Connection made!");

		// Send everything at once...
		// Will be a problem for huge payload

		const iter = Array.from(statebox.latest());
		console.log({ iter });
		socket.send(JSON.stringify(iter));

		// send over all latest state
		// for (let s of statebox.latest()) {
		// 	socket.send(JSON.stringify(s));
		// }

		// show
		socket.on("message", function (messages, binary) {
			wss.clients.forEach((client) => {
				if (client.readyState === WebSocket.OPEN) {
					const [id, state] = JSON.parse(messages.toString());
					statebox.append(docRefToKeyStr(id), id, state);
					console.log(Array.from(statebox.latest()));

					// console.log("Message", messages.toString());
					if (client !== socket) {
						// Send to other clients on the network
						// client.send(messages, { binary });
						client.send(JSON.stringify([[id, state]]));
					}
				}
			});
		});
	});
}
