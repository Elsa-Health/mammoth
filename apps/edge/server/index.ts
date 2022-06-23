// pull the environment variables
require("dotenv").config();

import express from "express";
import cors from "cors";

import { createServer } from "http";

import ews from "express-ws";
import { router } from "./routes/socket";
import { WebSocketServer } from "ws";

const app = express();
const server = createServer(app);

// attach as missdle
app.use(express.json());

app.use((req, res, next) => {
	console.log({ q: req.query });
	console.log(req.path);
	// somethin here
	next();
});

// Might want to change this to
// filter incoming requests from devices later on
app.use(cors({ origin: "*" }));

// ported from remix blue-stack
app.use((req, res, next) => {
	// helpful headers:
	res.set("x-fly-region", process.env.FLY_REGION ?? "unknown");
	res.set("Strict-Transport-Security", `max-age=${60 * 60 * 24 * 365 * 100}`);

	// /clean-urls/ -> /clean-urls
	if (req.path.endsWith("/") && req.path.length > 1) {
		const query = req.url.slice(req.path.length);
		const safepath = req.path.slice(0, -1).replace(/\/+/g, "/");
		res.redirect(301, safepath + query);
		return;
	}
	next();
});

// if we're not in the primary region, then we need to make sure all
// non-GET/HEAD/OPTIONS requests hit the primary region rather than read-only
// Postgres DBs.
// learn more: https://fly.io/docs/getting-started/multi-region-databases/#replay-the-request
app.all("*", function getReplayResponse(req, res, next) {
	const { method, path: pathname } = req;
	const { PRIMARY_REGION, FLY_REGION } = process.env;

	const isMethodReplayable = !["GET", "OPTIONS", "HEAD"].includes(method);
	const isReadOnlyRegion =
		FLY_REGION && PRIMARY_REGION && FLY_REGION !== PRIMARY_REGION;

	const shouldReplay = isMethodReplayable && isReadOnlyRegion;

	if (!shouldReplay) return next();

	const logInfo = {
		pathname,
		method,
		PRIMARY_REGION,
		FLY_REGION,
	};
	console.info(`Replaying:`, logInfo);
	res.set("fly-replay", `region=${PRIMARY_REGION}`);
	return res.sendStatus(409);
});

// http://expressjs.com/en/advanced/best-practice-security.html#at-a-minimum-disable-x-powered-by-header
app.disable("x-powered-by");

/**
 * Paths to be used across the entire application
 */
const WS_CRDT_STATE_PATH = "/ws/crdt/state";
const wss = new WebSocketServer({
	path: WS_CRDT_STATE_PATH,
	server,
});

wss.on("connection", function (socket) {
	console.log("🟢 Connected!");

	// attack handler for the socket
	router(socket, () => this);
});

wss.on("close", () => {
	console.log("🔴 Disconnected!");
});

// Listening...
const port = process.env.PORT || 5005;
server.listen(port, () => {
	console.log(`✅ Server Ready: http://localhost:${port}`);
	console.log(`✨ Listening websocket: ${WS_CRDT_STATE_PATH}`);
});
