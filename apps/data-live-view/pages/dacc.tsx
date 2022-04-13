/* eslint-disable @next/next/no-img-element */
import React from "react";
import { useWebSocket } from "../app/utils/socket";

import {
	CRDTMessageBox,
	buildCRDTStore as BuildCRDTStore,
} from "sabertooth-core";
import { ObservableStore } from "sabertooth-core/lib/providers";

import { differenceInDays, isBefore, min } from "date-fns";

import { configuration } from "sabertooth-stores/key-value-map";
import { v4 as uuidv4 } from "uuid";

const generateId = (id?: string) => id || uuidv4();

// To store the when needed on the fly
const crdt = new CRDTMessageBox();
const collectionsUID = "@@CTC-STORE";

const kvmConfig = configuration({
	generateId,
	buildDocRef: (docId, collId) => `${collectionsUID}/${collId}/${docId}`,
});

const { store, sync, mergeOther } = BuildCRDTStore(
	// @ts-ignore
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

const wsURL_DEV = "ws://localhost:5005/channel/cmrdt";
const wsURL_PROD = "wss://ctc-bounce-server.herokuapp.com/channel/cmrdt";

// const wsURL = process.env.NODE_ENV === "development" ? wsURL_DEV : wsURL_PROD;
const wsURL = wsURL_PROD;

export default function Analytics() {
	const { socket, retry, status } = useWebSocket({
		url: wsURL,
		onMessage: (e) => {
			// @ts-ignore
			e.data.text().then((text) => {
				const vals = JSON.parse(text);
				// crdt.resolve();
				mergeOther(vals || []);
				sync();
				console.log(">", vals);
			});

			// e.data.text().then((text: string) => {
			// 	const out = JSON.parse(text);
			// 	console.log("Received Message", out);
			// });
		},
	});

	const [patients, setPatients] = React.useState<[string, CTC.Patient][]>([]);
	const [appointments, setAppointments] = React.useState<
		[string, CTC.Appointment][]
	>([]);
	const [visits, setVisits] = React.useState<[string, CTC.Visit][]>([]);

	const fg = React.useMemo(() => {
		return Object.entries(groupByFacility(patients));
	}, [patients]);

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
		<div className="min-h-screen h-full relative">
			<header className="mx-auto container py-16 px-12">
				<div>
					<img
						src="/assets/svg/elsa-logo-colored-short.svg"
						className="w-20 auto"
						alt="Elsa Logo"
					/>
					<div>
						<h1 className="text-2xl font-bold"></h1>
					</div>
				</div>
			</header>
			<main className="container mx-auto px-12 py-8">
				<div>
					<h2 className="text-2xl font-bold">Patients</h2>
					<div className="grid grid-cols-3">
						<div>
							<h2>Total</h2>
							<label>{patients.length}</label>
						</div>
						<div>
							<h2>Total</h2>
							<label>{patients.length}</label>
						</div>
					</div>
				</div>
				<div>
					<h2 className="text-2xl font-bold">Facility</h2>
					<div className="grid grid-cols-3">
						<div>
							<h2>Total</h2>
							<label>{fg.length}</label>
						</div>
						<div>
							<h2>Facility Ids</h2>
							<label>
								{fg
									.map(([fid, pts]) => `${fid}:${pts.length}`)
									.join(", ")}
							</label>
						</div>
					</div>
				</div>
				<div>
					<h2 className="text-2xl font-bold">Appointments</h2>
					<div className="grid grid-cols-3">
						<div>
							<h2>Total</h2>
							<label>{appointments.length}</label>
						</div>
						<div>
							<h2>Upcoming</h2>
							<label>
								{upcomingAppointments(appointments).length}
							</label>
						</div>
						<div>
							<h2>Missed</h2>
							<label>
								{missedAppointments(appointments).length}
							</label>
						</div>
					</div>
				</div>
				<div>
					<h2 className="text-2xl font-bold">LTFU *(math is off)</h2>
					<div className="grid grid-cols-3">
						<div>
							<h2>Total</h2>
							<label>
								{lostToFollowUpAppointment(appointments).length}
							</label>
						</div>
					</div>
				</div>
			</main>
		</div>
	);
}

function groupByFacility(patients: [string, CTC.Patient][]) {
	const facilityGroup: { [fid: string]: [string, CTC.Patient][] } = {};

	// Patients
	patients.forEach((patient) => {
		const fid = extractFacility(patient);

		if (facilityGroup[fid] === undefined) {
			facilityGroup[fid] = [];
		}

		facilityGroup[fid].push(patient);
	});

	return facilityGroup;
}

function groupByContent<T, G extends string>(
	objs: T[],
	groupBySelector: (d: T) => G
) {
	const gp: { [gid in G]?: T[] } = {};

	objs.forEach((obj) => {
		const gid = groupBySelector(obj);
		if (gp[gid] === undefined) {
			gp[gid] = [];
		}

		gp[gid]?.push(obj);
	});
}

function extractFacility(patientRecord: [string, CTC.Patient]): string {
	const [id, patient] = patientRecord;
	return patient.facilityId || id.slice(0, 8);
}

function upcomingAppointments(appts: [string, CTC.Appointment][]) {
	return appts.filter(([id, appt]) => {
		return (
			(appt.visitIdFullfilled === null ||
				appt.visitIdFullfilled === undefined) &&
			isBefore(new Date(), new Date(appt.date))
		);
	});
}

function missedAppointments(appts: [string, CTC.Appointment][]) {
	return appts.filter(([id, appt]) => {
		const apptDate = new Date(appt.date);
		const nowDate = new Date();
		return (
			!(
				appt.visitIdFullfilled !== null &&
				appt.visitIdFullfilled !== undefined
			) &&
			isBefore(apptDate, nowDate) &&
			differenceInDays(nowDate, apptDate) <= 3
		);
	});
}

function lostToFollowUpAppointment(appts: [string, CTC.Appointment][]) {
	return appts.filter(([id, appt]) => {
		const apptDate = new Date(appt.date);
		const nowDate = min([new Date(), new Date(appt.fulfilledDate)]);
		return (
			!(
				appt.fulfilledDate !== null &&
				appt.visitIdFullfilled !== undefined
			) &&
			isBefore(apptDate, nowDate) &&
			differenceInDays(nowDate, apptDate) > 3
		);
	});
}
