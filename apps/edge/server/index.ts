// pull the environment variables
require("dotenv").config();

import express from "express";
import cors from "cors";

import { createServer } from "http";

import { router } from "./routes/socket";
import { WebSocketServer } from "ws";
import { collection, getDocs, getStore, onSnapshot } from "papai/collection";
import KeyValueMapCollection from "papai/stores/collection/KeyValueMap";
import { StateTrackingBox } from "papai/distributed/store";

import { nanoid } from "nanoid";
import { HybridLogicalClock } from "papai/distributed/clock";
import { FileSystemCollection } from "./store/fs-collection";
import { Subscription } from "rxjs";
import { Level } from "level";
import { LevelDBCollection } from "./store/level-collection";

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

const initlock = new HybridLogicalClock(`elsa-edge-node-${nanoid(5)}`);
// get the store with the entire copy of the databases
// const mirrorStorage = getStore(KeyValueMapCollection(() => nanoid(24)));

// configuration for initing the dbs
const opts = {
	createIfMissing: true,
	errorIfExists: false,
	valueEncoding: "json",
	keyEncoding: "utf8",
	compression: true,
};

const publicLDB = new Level("./server-publicdb-volume", { ...opts });
const privateLDB = new Level("./server-privatedb-volume", {
	...opts,
	prefix: "$",
});

async function runServer(publicInstance: Level, privateInstance: Level) {
	const mirrorStorage = getStore(LevelDBCollection(publicInstance, nanoid));

	// store that hold information that's useful to the server
	// this includes information like crdt messages received + sources of the data received.
	const serverStore = getStore(LevelDBCollection(privateInstance, nanoid));

	// statebox, that syncronizes changes
	const sb = new StateTrackingBox(
		initlock,
		(d) => `${d.collectionId}$${d.documentId}`
	);
	// note to collect the CRDT messages collected over time
	const crdtMsgCollection = collection<{
		ref: any;
		state: any;
		clock: string;
	}>(serverStore, "crdt-messages-log");

	// 1. Prepopulate the state box with previously stored messages if any
	getDocs(crdtMsgCollection).then((d) =>
		d.map(([_, r]) => {
			sb.append(
				r.ref,
				r.state,
				HybridLogicalClock.parse(r.clock as string)
			);
		})
	);

	wss.on("connection", function (socket) {
		console.log("🟢 Connected!");

		let sub: Subscription | null = null;

		// when device connected send data
		socket.on("open", function () {
			// when new device is connected...
			// send out the values that are syncable
			this.send(
				JSON.stringify({
					type: "crdt",
					batch: Array.from(sb.latest()).map(
						([ref, state, clock]) => ({
							ref,
							state,
							clock: clock.toString(),
						})
					),
				})
			);

			if (sub === null) {
				console.log("Subbed on open");
				// add subscription to listen to document changes
				sub = mirrorStorage.documentObservable.subscribe((s) => {
					if (s.action === "updated") {
						// when a document is updated,
						this.send(
							JSON.stringify({
								type: "crdt",
								batch: [
									[
										s.ref,
										s.state,
										initlock.next().toString(),
									],
								],
							})
						);
					}
				});
			}
		});

		socket.on("close", function () {
			if (sub !== null) {
				console.log("Unsubbed via close");
				sub.unsubscribe();
				sub = null;
			}
		});

		socket.on("error", function () {
			if (sub !== null) {
				console.log("Unsubbed via error");
				sub.unsubscribe();
				sub = null;
			}
		});

		// attack handler for the socket
		router(
			socket,
			() => this,
			{
				mirror: () => mirrorStorage,
				server: () => serverStore,
				serverClock: initlock.next(),
				crdtMsgCollection,
			},
			sb
		);
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
}

Promise.all([publicLDB.open(), privateLDB.open()])
	.then(() => runServer(publicLDB, privateLDB))
	.catch((err) => {
		console.log(
			"Unable to open connect to either `PUBLIC` or `PRIVATE` store. Please fix this."
		);
		console.error(err);

		// close stores
		publicLDB.close();
		privateLDB.close();
	});
