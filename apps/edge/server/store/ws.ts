import { Server } from "http";
import { nanoid } from "nanoid";
import { WebSocketServer, WebSocket } from "ws";

import { collection, doc, getStore, setDoc, Document } from "papai/collection";
import KeyValueMapCollection from "papai/stores/collection/KeyValueMap";

import { StateTrackingBox } from "papai/distributed/store";
import { getServerClock } from "../config";

const docRefToKeyStr = (d: Document.Ref) => {
	return `${d.collectionId}/${d.documentId}`;
};

const crdtStore = getStore(KeyValueMapCollection(() => nanoid(6)));
const statebox = new StateTrackingBox(getServerClock(), docRefToKeyStr);
// build quick bubble to cache the state
export default function initiateWebSocket(wsPath: string, server: Server) {
	// set up socket
	const wss = new WebSocketServer({
		path: wsPath,
		server,
	});

	wss.on("connection", (socket) => {
		console.log("Connection made!");

		// Send everything at once...
		// Will be a problem for huge payload

		// Send to all new
		socket.send(
			JSON.stringify(
				Array.from(statebox.latest()).map((t) => [
					t,
					// source
					{ type: "node" },
				])
			)
		);

		// send over all latest state
		// for (let s of statebox.latest()) {
		// 	socket.send(JSON.stringify(s));
		// }

		// show
		socket.on("message", function (messages, binary) {
			wss.clients.forEach((client) => {
				console.log(messages);
				if (client.readyState === WebSocket.OPEN) {
					const _crdt_messages = JSON.parse(messages.toString());

					console.log(_crdt_messages[0]);
					for (let [statepair, source] of _crdt_messages) {
						const [dr, state, clock] = statepair;

						// something
						// @ts-ignore
						statebox.append(dr, state, clock);

						console.log("Received. Bouncing to others");
						// console.log(statepair, source);
					}

					if (client !== socket) {
						// Send to other clients on the networkr
						client.send(messages, { binary });
						// client.send(JSON.stringify([[id, state]]));
					}
				}
			});
		});
	});
}

type State = [Document.Ref, Document.Data];
type CRDTMessage = [State, { facility: any; user: any }];
