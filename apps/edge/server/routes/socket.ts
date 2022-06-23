import { WebSocketServer, WebSocket } from "ws";
import * as z from "zod";
import { saver } from "../utils";

import invariant from "tiny-invariant";
import { addDoc, collection, getDocs } from "papai/collection";
import { Store } from "papai/collection/core";
import {
	StateTrackingBox,
	updateChangesToStore,
} from "papai/distributed/store";
import { HybridLogicalClock } from "papai/distributed/clock";

// make sure the endpoint handles
//  stock related inquiries
const StockState = z.object({
	type: z.literal("stock"),
	facility: z.string(),
	stock: z.array(z.tuple([z.string(), z.tuple([z.string(), z.number()])])),
	timestamp: z.string(),
});
type StockState = z.infer<typeof StockState>;

const CRDTState = z.object({
	type: z.literal("crdt"),
	source: z.object({ facility: z.string(), userId: z.string() }),
	batch: z.array(
		z.tuple([
			z.object({ collectionId: z.string(), documentId: z.string() }),
			z.any(),
			z.string(),
		])
	),
});
type CRDTState = z.infer<typeof CRDTState>;

type Ss = {
	mirror: () => Store;
	server: () => Store;
	serverClock: HybridLogicalClock;
};
/**
 * Socket router receiving contents from connected clients
 * and merging with child members
 * @param socket
 * @param server
 * @param mirrorStore
 */
export function router(
	socket: WebSocket,
	server: () => WebSocketServer,
	store: Ss,
	sb: StateTrackingBox
) {
	// ...
	socket.on("message", function (message) {
		const data = JSON.parse(message.toString()) as CRDTState | StockState;
		const { type, ...other } = data;
		// assertion check
		invariant(
			z.union([z.literal("crdt"), z.literal("stock")]).parse(type),
			() =>
				"Expected 'stock' or 'crdt' for type field. Instead got " + type
		);

		if (type === "stock") {
			handleStockEvent(socket, StockState.parse(data), server);
			return;
		}

		//
		handleCRDTEvent(socket, CRDTState.parse(data), server, store, sb);
	});
}

/**
 * Handle input received by the socket to
 * handle stock related invocations
 * @param socket
 * @param param1
 * @param server
 */
function handleStockEvent(
	socket: WebSocket,
	{ type: _, facility, ...other }: StockState,
	server: () => WebSocketServer
) {
	invariant(false, "There's no implementation for this handler");
}

function handleCRDTEvent(
	socket: WebSocket,
	state: CRDTState,
	server: () => WebSocketServer,
	store: Ss,
	statebox: StateTrackingBox
) {
	// ...
	// crdtSave.asJSON(``)
	// console.log("received state!", state);
	// update the sate box with the inforamtion to match the contents
	const { batch, source } = state;

	// have steps to
	// re-create the stores of the messages received
	// -----

	// 1. create the state box for the data
	batch.forEach(([ref, data, clock]) => {
		statebox.append(ref, data, HybridLogicalClock.parse(clock));
	});

	// 1. denote where the change was recorded
	//  by showing who did what to which record
	const activityLogCollection = collection(store.server(), "activity-log");
	addDoc(activityLogCollection, {
		source, // source of the message
		clock: store.serverClock.next().toString(), // when the effect has happened
		records: batch.map((d) => d[0]), // list of record affected by the chnage
	});

	// 2. sync up changes to the store
	updateChangesToStore(store.mirror(), statebox);
}
