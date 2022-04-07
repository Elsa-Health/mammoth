import express from "express";

import { createServer } from "http";
import cors from "cors";
import { WebSocket, WebSocketServer } from "ws";
// const chalk = require("chalk");

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

// NEXT: Create an admin dashboard that the admin for the
//  super-node can login and make changes to the users allowed
//  to work with the network
wss.on("connection", (socket) => {
	socket.on("message", (crdtMessage) => {
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
