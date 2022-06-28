import { Store } from "papai/collection";
import { HybridLogicalClock, StateTrackingBox } from "papai/distributed";
import { Subscription } from "rxjs";
import { WebSocketServer } from "ws";

/**
 * Initialize the collection information needed
 * @param wss
 */
export const applyInitialSocketSubscription = (
	clock: HybridLogicalClock,
	wss: WebSocketServer,
	publicStore: Store,
	statebox: StateTrackingBox
) => {
	// server...
	wss.on("connection", function (socket) {
		console.log("🟢 Connected!");
	});

	wss.on("close", () => {
		console.log("🔴 Disconnected!");
	});

	wss.on("connection", function (socket) {
		// ...
		let sub: Subscription | null = null;

		// apply when socket connection closes
		socket.on("close", function () {
			if (sub !== null) {
				console.log("Unsubbed via close");
				sub.unsubscribe();
				sub = null;
			}
		});

		// apply when socket connection is errored
		socket.on("error", function () {
			if (sub !== null) {
				console.log("Unsubbed via error");
				sub.unsubscribe();
				sub = null;
			}
		});

		// when device connected send data
		socket.on("open", function () {
			// when new device is connected...
			// send out the values that are syncable
			this.send(
				JSON.stringify({
					type: "crdt",
					batch: Array.from(statebox.latest()).map(
						([ref, state, clock]) => ({
							ref,
							state,
							clock: clock.toString(),
						})
					),
				})
			);

			if (sub === null) {
				// console.log("Subbed on open");
				// add subscription to listen to document changes
				sub = publicStore.documentObservable.subscribe((s) => {
					if (s.action === "updated") {
						// when a document is updated,
						this.send(
							JSON.stringify({
								type: "crdt",
								batch: [
									[s.ref, s.state, clock.next().toString()],
								],
							})
						);
					}
				});
			}
		});
	});
};
