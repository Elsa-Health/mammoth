import { Server } from "http";
import { nanoid } from "nanoid";
import { WebSocketServer, WebSocket } from "ws";

import {
	collection,
	doc,
	getStore,
	setDoc,
	Document,
	getDocs,
	onCollectionSnapshot,
} from "papai/collection";
import KeyValueMapCollection from "papai/stores/collection/KeyValueMap";

import * as z from "zod";

/**
 * Send data to the target socket
 * @param socket
 * @param data
 */
const sendThroughSocket = <T>(socket: WebSocket, data: T) => {
	socket.send(JSON.stringify(data));
};

const summaryStore = getStore(KeyValueMapCollection(() => nanoid(6)));
const stockColl = collection<{
	/**
	 * ID
	 * ------
	 *	`stock-{{facilityID}}-{{user}}-{{medication}}`
	 */
	id: string;

	/**
	 * [Medication.All | ARV.Regimen, string, count]
	 */
	stock: [string, string, number];
	user: any;
	facility: any;
}>(summaryStore, "stock");

type State = [Document.Ref, Document.Data];
type CRDTMessage = [State, { facility: any; user: any }];

// ...
const StockState = z.object({
	facility: z.string(),
	// stock: z.map(
	// 	z.string(),
	// 	z.object(
	// 		{ title: z.string(), count: z.number() },
	// 		{ required_error: "Required stock structure" }
	// 	),
	// 	{}
	// ),
	stock: z.tuple([z.string(), z.number()]),
	timestamp: z.string(),
});

const CDRTState = z.object({
	source: z.object({ facility: z.string(), userId: z.string() }),
	data: z.array(
		z.tuple([
			z.object({ collectionId: z.string(), documentId: z.string() }),
			z.any(),
		])
	),
});

// build quick bubble to cache the state
export default function initiateWebSocket(wss: WebSocketServer) {
	wss.on("connection", function (socket) {
		console.log("🔗 Connection established");

		socket.on("message", function (messages, binary) {
			const data = JSON.parse(messages.toString());
			// ...
			console.log(data);
		});
	});

	// wss.on("connection", function (socket) {
	// 	// Send everything at once...
	// 	// Will be a problem for huge payload

	// 	// Send to all new
	// 	// sendThroughSocket(
	// 	// 	socket,
	// 	// 	Array.from(statebox.latest()).map((t) => [
	// 	// 		t,
	// 	// 		// source
	// 	// 		{ type: "node" },
	// 	// 	])
	// 	// );

	// 	onCollectionSnapshot(stockColl, (action, docs) => {
	// 		if (action === "changed") {
	// 			// resend document
	// 			console.log(docs);

	// 			// Load data.. send dat to the people
	// 			getDocs(stockColl)
	// 				.then((docs) => docs.map(([id, doc]) => doc))
	// 				.then((data) =>
	// 					sendThroughSocket(socket, { type: "fetch-stock", data })
	// 				);
	// 		}
	// 	});

	// 	// Load data.. send dat to the people
	// 	getDocs(stockColl)
	// 		.then((docs) => docs.map(([id, doc]) => doc))
	// 		.then((data) =>
	// 			sendThroughSocket(socket, { type: "fetch-stock", data })
	// 		);

	// 	// send over all latest state
	// 	// for (let s of statebox.latest()) {
	// 	// 	socket.send(JSON.stringify(s));
	// 	// }

	// 	// show
	// 	socket.on("message", function (messages, binary) {
	// 		wss.clients.forEach((client) => {
	// 			// console.log(messages);
	// 			if (client.readyState === WebSocket.OPEN) {
	// 				const stockData: {
	// 					type: "stock";
	// 					data: {
	// 						stock: any[];
	// 						source: { facility: any; user: any };
	// 					};
	// 				} = JSON.parse(messages.toString());

	// 				// stockData;
	// 				// console.log(_crdt_messages[0]);
	// 				// for (let [statepair, source] of _crdt_messages) {
	// 				// 	const [dr, state, clock] = statepair;

	// 				// 	// something
	// 				// 	// @ts-ignore
	// 				// 	statebox.append(dr, state, clock);

	// 				// 	console.log("Received. Bouncing to others");
	// 				// 	// console.log(statepair, source);
	// 				// }

	// 				if (client !== socket) {
	// 					// Send to other clients on the networkr
	// 					client.send(messages, { binary });
	// 					// client.send(JSON.stringify([[id, state]]));
	// 				}
	// 			}
	// 		});
	// 	});
	// });
}
