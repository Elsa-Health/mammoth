import express from "express";

import { createServer } from "http";
import cors from "cors";
import { WebSocket, WebSocketServer } from "ws";
// const chalk = require("chalk");

import { v4 as uuidv4 } from "uuid";

const PORT = process.env.PORT || 5005;
const app = express();
const server = createServer(app);

const CRDT_SOCKET_PATH = "/channel/crdt";
const wss = new WebSocketServer({
	path: CRDT_SOCKET_PATH,
	server,
});
app.use(express.json());

// TODO: CHANGE THIS BOY!!
app.use(cors({ origin: "*" }));

server.listen(PORT, () => {
	console.log(`Server listening on port ${PORT}`);
	console.log(`crdt ws listening at ${CRDT_SOCKET_PATH}`);
});

// Create store to persists CRDT Messages
import {
	buildStore as BuildStore,
	CRDTMessageBox,
	Store,
	SBSet,
} from "sabertooth-core";
import { configuration } from "sabertooth-stores/key-value-map";

// SB State to log the messages
const crdtx = new CRDTMessageBox();

// persisting messages (but using key-value-map isn't as useful)
const store = BuildStore(
	// @ts-ignore
	Store,
	configuration({
		generateId: (id) => id || uuidv4(),
		buildDocRef: (docid, collid) => `#${collid}=${docid}`,
	})
);

const crdtCollection = store.collection("crdt_messages_server");

// Hydrate the crdtx with persisted data
crdtCollection
	.queryMultiple()
	.then((ds) => ds.map(([id, v]) => v))
	// @ts-ignore
	.then((objs) => crdtx.merge(new SBSet(objs || [])));

// NEXT: Create an admin dashboard that the admin for the
//  super-node can login and make changes to the users allowed
//  to work with the network
wss.on("connection", (socket) => {
	// when connected with the user, send the cached messages over to the new client
	socket.send(Buffer.from(JSON.stringify(crdtx.messages())), {
		binary: true,
	});

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
