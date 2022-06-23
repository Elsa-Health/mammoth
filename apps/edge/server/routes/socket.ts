import { WebSocketServer, WebSocket } from "ws";
import * as z from "zod";
import { saver } from "../utils";

import invariant from "tiny-invariant";
import { collection, getDocs } from "papai/collection";
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

const save = saver("./stock/facilities");
const crdtSave = saver("./stock/facilities");

export function router(socket: WebSocket, server: () => WebSocketServer) {
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
		handleCRDTEvent(socket, CRDTState.parse(data), server);
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
	// ...
	// stock information that will be useful
	// later on
	save.asJSON(`${facility}.json`, other);
}

function handleCRDTEvent(
	socket: WebSocket,
	state: CRDTState,
	server: () => WebSocketServer
) {
	// ...
	// crdtSave.asJSON(``)
	console.log(state);
}
