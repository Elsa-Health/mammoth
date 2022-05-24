// pull the environment variables
require("dotenv").config();
require("./supabase-config");

import express from "express";
import cors from "cors";

import { createServer } from "http";

import { getStore } from "papai/collection";
import KeyValueMapStore from "papai/stores/collection/KeyValueMap";

import { nanoid as generateId } from "nanoid";
import initiateWebSocket from "./store/ws";

const PORT = process.env.PORT || 5005;
const app = express();
const server = createServer(app);

app.use(express.json());
app.use(cors({ origin: "*" }));

app.get("/", function (req, res) {
	res.json({ message: "Hey there!" });
});

/**
 * Paths to be used across the entire application
 */
const paths = {
	WS_CRDT_STATE_PATH: "/crdt/state",
	TUNNEL_PATH: "/tunnel/migration/v0/v1",
};

// store to mirror from sockets
const store = getStore(KeyValueMapStore(generateId));

// Initiate websocket server to listen to changes
initiateWebSocket(paths.WS_CRDT_STATE_PATH, server, store);

// Listening...
server.listen(PORT, () => {
	console.log(`Server listening on port ${PORT}`);
	console.log(`State tracking on ${paths.WS_CRDT_STATE_PATH}`);
});
