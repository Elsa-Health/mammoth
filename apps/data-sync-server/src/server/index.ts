import express from "express";

import { createServer } from "http";
import cors from "cors";
// const chalk = require("chalk");

import channelCmrdt from "../channels/cmrdt";

const PORT = process.env.PORT || 5005;
const app = express();
const server = createServer(app);

app.use(express.json());

// TODO: CHANGE THIS BOY!!
app.use(cors({ origin: "*" }));

const CRDT_SOCKET_PATH = "/channel/cmrdt";

// Add ws for working with State-based CDRTs
channelCmrdt(server, CRDT_SOCKET_PATH);

server.listen(PORT, () => {
	console.log(`Server listening on port ${PORT}`);
	console.log(`crdt ws listening at ${CRDT_SOCKET_PATH}`);
});
