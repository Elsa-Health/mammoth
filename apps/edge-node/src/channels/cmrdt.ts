import { Server } from "http";
import { CRDTMessageBox, SBSet } from "sabertooth-core";
import { WebSocket, WebSocketServer } from "ws";
import { store } from "../server/store";

import _ from "lodash";

// SB State to log the messages
const crdtx = new CRDTMessageBox();
const crdtCollection = store.collection("cmrdt_messages_server");

// Hydrate the crdtx with persisted data
crdtCollection
	.queryMultiple()
	.then((ds) => ds.map(([id, v]) => v))
	// @ts-ignore
	.then((objs) => crdtx.merge(new SBSet(objs || [])));

export default function (server: Server, path: string) {
	const wss = new WebSocketServer({
		path,
		server,
	});

	// NEXT: Create an admin dashboard that the admin for the
	//  super-node can login and make changes to the users allowed
	//  to work with the network
	wss.on("connection", (socket) => {
		// const socketId = hash(
		// 	_.omitBy(socket, (field) => {
		// 		return typeof field !== "undefined";
		// 	})
		// );
		// console.log("Sending to", socketId);

		// console.log(crdtx.messages());
		// when connected with the user, send the cached messages over to the new client
		socket.send(JSON.stringify(crdtx.messages()));

		// shorten the data
		crdtx.resolve();

		socket.on("message", (crdtMessage, isBinary) => {
			// Check message
			const sbset = new SBSet(JSON.parse(crdtMessage.toString()));

			// persist
			// @ts-ignore
			crdtx.merge(sbset);

			// persist
			crdtCollection.add(
				crdtx.messages().map((d) => [undefined, d]) as [undefined, any]
			);

			wss.clients.forEach((client) => {
				if (client.readyState === WebSocket.OPEN) {
					if (client !== socket) {
						// @ts-ignore
						console.log("Sending message from socket");

						// sending to other sockets
						client.send(crdtMessage, {
							binary: isBinary,
						});
					}
				}
			});
		});
	});
}
