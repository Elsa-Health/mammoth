import React from "react";
import {
	CRDTMessageBox,
	buildCRDTStore as BuildCRDTStore,
} from "sabertooth-core";
import { ObservableStore } from "sabertooth-core/lib/providers";
import { w3cwebsocket as WebSocket } from "websocket";

import { format } from "date-fns";

import { configuration } from "sabertooth-stores/key-value-map";
import { v4 as uuidv4 } from "uuid";

const generateId = (id?: string) => id || uuidv4();

// To store the when needed on the fly
const crdt = new CRDTMessageBox();

const wsURL_DEV = "ws://localhost:5005/channel/crdt";
// const wsURL_DEV = "ws://7e75-197-250-199-90.ngrok.io/channel/crdt";
const wsURL_PROD =
	"wss://demo-sabertooth-crdt-channel.herokuapp.com/channel/crdt";

const wsURL = process.env.NODE_ENV === "development" ? wsURL_DEV : wsURL_PROD;
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
	// console.log({ outs });
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
			// console.log("patients", data);
			setPatients(data);
		});
		onUpdateSnapshot("appointments", (data) => {
			// console.log("appointments", data);
			setAppointments(data);
		});
		onUpdateSnapshot("visits", (data) => {
			// console.log("visits", data);
			setVisits(data);
		});
	}, []);

	return (
		<div className="min-h-screen mx-auto container px-12 py-10 space-y-4 h-full">
			<h2 className="font-bold text-2xl">Observing Flowing CTC Data</h2>
			<div className="flex-row flex gap-2">
				<div className="w-48 h-full">
					<h2 className="text-gray-600 font-bold">Patients</h2>
					<div className="space-y-2 h-full">
						{patients.map(([id, patient]) => (
							<div
								key={id}
								className="whitespace-pre-wrap space-y-3 line-clamp-4 border rounded-sm shadow-sm px-2 py-1.5"
							>
								<div>
									<h2 className="text-sm font-bold tracking-wider text-elsa-primary-500 uppercase">
										Patient ID
									</h2>
									<label>
										{id} ({patient.martialStatus})
									</label>
								</div>
								<div>
									<h2 className="text-sm font-bold tracking-wider text-elsa-primary-500 uppercase">
										Registered Date
									</h2>
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
				<div className="w-48 h-full">
					<h2 className="text-gray-600 font-bold">Visits</h2>
					<div className="space-y-2 h-full">
						{visits.map(
							([
								id,
								{
									intake,
									dateTime,
									patientId,
									patient: { sex },
								},
							]) => (
								<div
									key={id}
									className="whitespace-pre-wrap space-y-3 line-clamp-4 border rounded-sm shadow-sm px-2 py-1.5"
								>
									<div>
										<h2 className="text-sm font-bold tracking-wider text-elsa-primary-500 uppercase">
											Sex
										</h2>
										<label>{sex}</label>
									</div>
									<div>
										<h2 className="text-sm font-bold tracking-wider text-elsa-primary-500 uppercase">
											Patient ID
										</h2>
										<label>{patientId}</label>
									</div>
									<div>
										<h2 className="text-sm font-bold tracking-wider text-elsa-primary-500 uppercase">
											Created
										</h2>
										<label>
											{format(
												new Date(dateTime),
												"MMMM dd, yyyy"
											)}
										</label>
									</div>
								</div>
							)
						)}
					</div>
				</div>
				<div className="w-48 h-full">
					<h2 className="text-gray-600 font-bold">Appointments</h2>
					<div className="space-y-2 h-full">
						{appointments.map(
							([id, { patientId, visitIdCreated, date }]) => (
								<div
									key={id}
									className="whitespace-pre-wrap space-y-3 line-clamp-4 border rounded-sm shadow-sm px-2 py-1.5"
								>
									<div>
										<h2 className="text-sm font-bold tracking-wider text-elsa-primary-500 uppercase">
											Appointment Date
										</h2>
										<label>
											{format(
												new Date(date),
												"MMMM dd, yyyy"
											)}
										</label>
									</div>
									<div>
										<h2 className="text-sm font-bold tracking-wider text-elsa-primary-500 uppercase">
											Patient ID
										</h2>
										<label>{patientId}</label>
									</div>
									<div>
										<h2 className="text-sm font-bold tracking-wider text-elsa-primary-500 uppercase">
											Visit ID
										</h2>
										<label>{visitIdCreated}</label>
									</div>
								</div>
							)
						)}
					</div>
				</div>
			</div>
		</div>
	);
}
