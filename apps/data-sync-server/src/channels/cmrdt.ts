import { Server } from "http";
import { CRDTMessageBox, SBSet } from "sabertooth-core";
import { WebSocket, WebSocketServer } from "ws";
import { store } from "../server/store";

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
		// when connected with the user, send the cached messages over to the new client
		socket.send(Buffer.from(JSON.stringify(crdtx.messages())), {
			binary: true,
		});

		// shorten the data
		crdtx.resolve();

		socket.on("message", (crdtMessage) => {
			// Check message
			const sbset = new SBSet(JSON.parse(crdtMessage.toString()));

			// persist
			// @ts-ignore
			crdtx.merge(sbset);

			// CRDTx messages
			// console.log(crdtx.messages());

			// persist
			crdtCollection.add(
				crdtx.messages().map((d) => [undefined, d]) as [undefined, any]
			);

			wss.clients.forEach((client) => {
				if (client.readyState === WebSocket.OPEN) {
					if (client !== socket) {
						// sending to other sockets
						client.send(crdtMessage, { binary: true });
					}
				}
			});
		});
	});
}
