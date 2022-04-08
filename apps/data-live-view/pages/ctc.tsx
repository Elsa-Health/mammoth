import React from "react";
import {
	CRDTMessageBox,
	BuildCRDTStore,
	ObservableStore,
	Store,
	BuildStore,
} from "../sabertooth";
import { w3cwebsocket as WebSocket } from "websocket";

import { format } from "date-fns";

import { configuration } from "../sabertooth/stores/key-value-map";
import { v4 as uuidv4 } from "uuid";

const generateId = (id?: string) => id || uuidv4();

// To store the when needed on the fly
const crdt = new CRDTMessageBox();

// const wsURL = "ws://1951-197-186-5-155.ngrok.io/channel/crdt";
// const wsURL = "ws://localhost:5005/channel/crdt";
const wsURL = "wss://demo-sabertooth-crdt-channel.herokuapp.com/channel/crdt";

const collectionsUID = "@@CTC-STORE";

const kvmConfig = configuration({
	generateId,
	buildDocRef: (docId, collId) => `${collectionsUID}/${collId}/${docId}`,
});

const { store, sync, mergeOther } = BuildCRDTStore(
	ObservableStore,
	crdt,
	kvmConfig
);

/**
 * Reads faithfully the data from the the collection
 * @param collectionId
 * @returns
 */
export const readCollection = async (collectionId: string) => {
	const outs = await store.collection(collectionId).queryMultiple();
	console.log({ outs });
	return outs;
};

export const onUpdateSnapshot = (
	collectionId: string,
	cb: (data: any[]) => void
) => {
	// This works even if typescript is complaining
	// @ts-ignore
	store.collection(collectionId).observe("updated", (_delta) => {
		readCollection(collectionId).then((val) => cb(val));
	});
};

let socket = new WebSocket(wsURL);

export default function CTCLiveViewApp() {
	React.useEffect(() => {
		socket.onopen = () => {
			console.log("Connected to CDRT WS server");
		};

		socket.onmessage = (e) => {
			if (socket.readyState === WebSocket.OPEN) {
				e.data.text().then((text) => {
					const vals = JSON.parse(text);
					// crdt.resolve();
					mergeOther(vals || []);
					sync();
					console.log(">", vals);
				});
			} else {
				if (socket.readyState !== WebSocket.CLOSED) {
					console.log("CLOSED... Reconnecting");
					socket;
				}
			}
		};

		socket.onclose = () => {
			console.log("Closed connection with CDRT WS.");
		};
	}, []);

	const [patients, setPatients] = React.useState<[string, any][]>([]);
	const [appointments, setAppointments] = React.useState<[string, any][]>([]);
	const [visits, setVisits] = React.useState<[string, any][]>([]);

	React.useEffect(() => {
		onUpdateSnapshot("patients", (data) => {
			console.log("patients", data);
			setPatients(data);
		});
		onUpdateSnapshot("appointments", (data) => {
			console.log("appointments", data);
			setAppointments(data);
		});
		onUpdateSnapshot("visits", (data) => {
			console.log("visits", data);
			setVisits(data);
		});
	}, []);

	return (
		<div className="min-h-screen mx-auto container px-12 py-10 space-y-4">
			<h2 className="font-bold text-2xl">Observing Flowing CTC Data</h2>
			<div className="grid grid-cols-3">
				<div>
					<h2>Patients</h2>
					<div>
						{patients.map(([id, patient]) => (
							<div
								key={id}
								className="whitespace-pre-wrap line-clamp-4 border rounded-md shadow-md"
							>
								<div>
									<h2 className="text-sm font-bold">
										Patient ID
									</h2>
									<label>{id}</label>
								</div>
								<div>
									<h2>Registered Date</h2>
									<label>
										{format(
											new Date(patient.registeredDate),
											"MMMM dd, yyyy"
										)}
									</label>
								</div>
							</div>
						))}
					</div>
				</div>
				<div>
					<h2>Visits</h2>
					<div>
						{visits.map(([id, visit]) => (
							<div
								key={id}
								className="whitespace-pre-wrap line-clamp-4"
							>
								{JSON.stringify(visit)}
							</div>
						))}
					</div>
				</div>
				<div>
					<h2>Appointments</h2>
					<div>
						{appointments.map(([id, appt]) => (
							<div
								key={id}
								className="whitespace-pre-wrap line-clamp-4"
							>
								{JSON.stringify(appt)}
							</div>
						))}
					</div>
				</div>
			</div>
		</div>
	);
}
