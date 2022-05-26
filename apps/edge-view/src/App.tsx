import React from "react";
import { CalendarIcon, UserCircleIcon } from "@heroicons/react/outline";
import { classNames } from "./helpers";

import {
	CashIcon,
	ChevronRightIcon,
	ArrowSmDownIcon,
	ArrowSmUpIcon,
	HeartIcon,
	UserGroupIcon,
} from "@heroicons/react/solid";
import { Collection, Document } from "papai/collection";

import { formatDistanceToNow } from "date-fns";

import { nanoid } from "nanoid";
import { useWebSocket } from "./utils/socket";
import {
	convert_v0_appointment_to_v1,
	convert_v0_patient_to_v1,
	convert_v0_visit_to_v1,
	investigationRequest,
	investigationResult,
	_reference,
} from "./emr/fns";
import {
	AppointmentPair,
	InvestigationPair,
	outputValue,
	PatientPair,
	VisitPair,
} from "./compute";

import commaNum from "comma-number";

import { Seq } from "immutable";

// const store = getStore(KeyValueMapStore(() => nanoid(10)));

// // Initial clock
// const initclock = new HybridLogicalClock(generateUUID());

// // sync
// const tbox = new StateTrackingBox(initclock);

type v0Message = {
	state: {
		op: {
			type: "set" | "update";
			id: string;
			collectionId: string;
			data: any;
		};
		result: any;
	};
	timestamp: string;
};

// get collection reference
function rCol<C extends string>(collectionId: C): Collection.Ref {
	return { collectionId };
}

// get document reference
function rDoc<C extends string>(
	collectionId: C,
	documentId: string
): Document.Ref {
	return { collectionId, documentId };
}

function doSomethingOnData(data: v0Message[]) {
	console.log(
		data
			.map((s, ix) => [ix, s])
			.filter(
				([ix, s]) =>
					!["patients", "appointments", "visits"].includes(
						(s as v0Message).state.op.collectionId
					)
			)
	);

	const vsingle = data[106];
	// console.log(vsingle);
	// const single = data[0];

	// // get document reference
	// const { id, collectionId } = vsingle.state.op;
	// const dr: Document.Ref = { collectionId, documentId: id };

	// const entry = vsingle.state.result;
	// if (collectionId === "patients") {
	// 	const v1p = convert_v0_patient_to_v1(id, entry);
	// 	console.log(v1p);
	// }

	// if (collectionId === "visits") {
	// 	const { visit: v1v } = convert_v0_visit_to_v1(id, entry, {
	// 		assessmentId: nanoid,
	// 		observationId: nanoid,
	// 	});
	// 	console.log(v1v);
	// }

	// if (collectionId === "appointments") {
	// 	const v1a = convert_v0_appointment_to_v1(id, entry);
	// 	console.log(v1a);
	// }
	const s = updateData(data);
	// console.log(s[0][1]);

	return s;
}

function updateData(data: v0Message[]) {
	const s: [Document.Ref, Document.Data][] = [];

	const visits: VisitPair[] = [];
	const patients: PatientPair[] = [];
	const appointments: AppointmentPair[] = [];
	const investigationResults: InvestigationPair[] = [];

	// return data.map()
	data.forEach((vsingle) => {
		const { id, collectionId } = vsingle.state.op;
		const dr = rDoc(collectionId, id);
		const entry = vsingle.state.result;

		if (collectionId === "patients") {
			// @ts-ignore
			patients.push([dr, convert_v0_patient_to_v1(id, entry)]);
			return;
		}

		if (collectionId === "visits") {
			const { visit: v1v } = convert_v0_visit_to_v1(id, entry, {
				assessmentId: nanoid,
				observationId: nanoid,
				medicationRequestId: nanoid,
				investigationsRequestId: nanoid,
			});

			// @ts-ignore
			visits.push([dr, v1v]);
			return;
		}

		if (collectionId === "appointments") {
			const v1a = convert_v0_appointment_to_v1(id, entry);
			// @ts-ignore
			appointments.push([dr, v1a]);
			return;
		}

		if (collectionId === "investigations") {
			const { result, ...other } = entry;
			// create investigation result and link to investigation request
			// 1. investigation request

			if (result === undefined) {
				return;
			}

			// Attach investigation result with the record
			const v1invRes = investigationResult(entry, {
				id: nanoid,
				// @ts-ignore
				authorizingRequest: _reference({
					id: `inv-request-${id}`,
					resourceType: "InvestigationRequest",
				}),
				recorder: null,
			});

			// @ts-ignore
			investigationResults.push([dr, v1invRes]);
		}
	});

	return { visits, appointments, investigationResults, patients };
}

function ActualActivity({ data }: { data: v0Message[] }) {
	// doSomethingOnData(data);

	// data
	const _data = updateData(data);
	const props = outputValue(_data);

	// console.log(props)
	return (
		<div>
			{/* <h2>Check your logs</h2> */}
			{/* <pre>{JSON.stringify(outputValue(_data), undefined, 2)}</pre> */}
			<PageToRender {...props} />
		</div>
	);
}

export default function EdgeView() {
	const [data, set] = React.useState<v0Message[] | null>(null);
	const { socket, retry } = useWebSocket({
		url: "wss://ctc-edge-server.fly.dev/channel/cmrdt",
		onMessage(e) {
			// ...
			const data = JSON.parse(e.data);
			set(data);
		},
		onOpen(e) {
			// ...
			console.log("Connection Made");
		},
	});

	if (data === null) {
		return <p>Loading.... (maybe check the logs)</p>;
	}

	return (
		<div>
			<div>{/* Button */}</div>
			<ActualActivity data={data} />
		</div>
	);
}

export function PageToRender({
	district,
	top10s,
	facilities,
	arv,
}: ReturnType<typeof outputValue>) {
	const moreItems = [
		{
			text: "Number of upcoming appointments",
			value: district.upcomingAppointments,
		},
		{
			text: "Number of missed appointments",
			value: district.missedAppointments,
		},
		{
			text: "Number of Lost To Follow Up (LTFU) Patients",
			value: district.lostToFollowUpPatients,
		},
	];

	const stats = [
		{
			id: 1,
			name: "Total Patients",
			stat: commaNum(district.totalPatients),
			icon: UserGroupIcon,
			change: commaNum(district.patientsWithInMonth),
			changeType:
				district.patientsWithInMonth > 0 ? "increase" : undefined,
		},
		{
			id: 2,
			name: "Total Visits",
			stat: commaNum(district.totalVisits),
			icon: UserCircleIcon,
			change: commaNum(district.visitsWithInMonth),
			changeType: district.visitsWithInMonth > 0 ? "increase" : undefined,
		},
		{
			id: 3,
			name: "Total Appointments",
			stat: commaNum(district.totalAppointments),
			icon: CalendarIcon,
			change: commaNum(district.appointmentsWithInMonth),
			changeType:
				district.appointmentsWithInMonth > 0 ? "increase" : undefined,
		},
	];

	return (
		<div className="min-h-screen relative flex flex-col w-full">
			<header className="border-b py-6 px-8 bg-elsa-primary-800">
				<div className="mx-auto container">
					<div className="inline-flex items-center gap-4">
						<img
							// src="/assets/elsa-logo.png"
							src="/assets/svg/elsa-logo-colored-short.svg"
							alt="elsa-logo"
							// className="w-auto h-16"
							className="w-8 h-auto"
						/>
						<div>
							<h1 className="text-xl text-white font-bold tracking-widest uppercase">
								DACC
							</h1>
							<p className="text-sm text-white tracking-wide">
								Elsa Edge Inspector
							</p>
						</div>
					</div>
				</div>
			</header>
			<main className="flex-grow divide-y w-full">
				{/* Summary*/}
				<div className="bg-gray-50">
					<div className="mx-auto container px-8 py-10 space-y-4">
						{/* Overview */}
						<h2 className="text-lg font-bold tracking-wider">
							District Overview
						</h2>
						<div>
							<h3 className="text-lg leading-6 font-medium text-gray-900">
								Last 30 days
							</h3>
							<dl className="mt-5 grid grid-cols-1 rounded-lg bg-white overflow-hidden shadow divide-y divide-gray-200 md:grid-cols-3 md:divide-y-0 md:divide-x">
								{stats.map((item) => (
									<div
										key={item.name}
										className="relative bg-white pt-5 px-4 pb-6 sm:pt-6 sm:px-6 overflow-hidden"
									>
										<dt>
											<div className="absolute bg-elsa-purple-600 rounded-md p-3">
												<item.icon
													className="h-6 w-6 text-white"
													aria-hidden="true"
												/>
											</div>
											<p className="ml-16 text-sm font-medium text-gray-500 truncate">
												{item.name}
											</p>
										</dt>
										<dd className="ml-16 flex md:flex-col lg:flex-row items-baseline">
											<p className="text-2xl font-semibold text-gray-900">
												{item.stat}
											</p>
											<p
												className={classNames(
													item.changeType ===
														"increase"
														? "text-green-600"
														: "text-red-600",
													"ml-2 md:-ml-1 lg:ml-2 flex items-baseline text-sm font-semibold"
												)}
											>
												{item.changeType ===
												"increase" ? (
													<ArrowSmUpIcon
														className="self-center flex-shrink-0 h-5 w-5 text-green-500"
														aria-hidden="true"
													/>
												) : (
													<ArrowSmDownIcon
														className="self-center flex-shrink-0 h-5 w-5 text-red-500"
														aria-hidden="true"
													/>
												)}

												<span className="sr-only">
													{item.changeType ===
													"increase"
														? "Increased"
														: "Decreased"}{" "}
													by
												</span>
												{item.change}
											</p>
										</dd>
									</div>
								))}
							</dl>
						</div>
						<div className="space-y-4">
							<h3 className="text-lg leading-6 font-medium text-gray-900">
								General
							</h3>
							<div>
								<div className="bg-white shadow overflow-hidden sm:rounded-md">
									<ul className="divide-y divide-gray-200">
										{moreItems.map((item, ix) => (
											<li
												key={ix}
												className="px-4 py-4 sm:px-6"
											>
												<p className="text-gray-500">
													{item.text}
												</p>
												<label className="font-bold">
													{item.value}
												</label>
											</li>
										))}
									</ul>
								</div>
							</div>
						</div>
						{/* ARV Groups */}
						<div className="space-y-4">
							<h3 className="text-lg leading-6 font-medium text-gray-900">
								ARV Groups
							</h3>
							<div>
								<div className="bg-white shadow overflow-hidden sm:rounded-md">
									<ul className="divide-y divide-gray-200">
										<li className="px-4 py-4 sm:px-6">
											<p className="text-gray-500">
												Patients on ARV
											</p>
											<label className="font-bold">
												{arv.patientsOnARV}
											</label>
										</li>
										<li className="px-4 py-4 sm:px-6">
											<p className="text-gray-500">
												Groups
											</p>
											<ul className="list-disc list-inside">
												{arv.groups.map(
													([id, text, count]) => {
														return (
															<li key={id}>
																{text}: {count}
															</li>
														);
													}
												)}
											</ul>
										</li>
									</ul>
								</div>
							</div>
						</div>
					</div>
				</div>
				{/* Facility + Devices */}
				<div>
					<div className="mx-auto container px-8 py-10 space-y-4">
						{/* Presenting Symptoms */}
						<h3 className="text-lg leading-6 font-medium text-gray-900">
							Top 10 from Presenting Symptoms
						</h3>
						<div className="overflow-hidden shadow ring-1 ring-black ring-opacity-5 md:rounded-lg">
							<table className="min-w-full divide-y divide-gray-300">
								<thead className="bg-gray-50">
									<tr>
										<th
											scope="col"
											className="py-3 pl-4 pr-3 text-left text-xs font-medium uppercase tracking-wide text-gray-500 sm:pl-6"
										>
											Name
										</th>
										<th
											scope="col"
											className="px-3 py-3 text-left text-xs font-medium uppercase tracking-wide text-gray-500"
										>
											Count
										</th>
									</tr>
								</thead>
								<tbody className="divide-y divide-gray-200 bg-white">
									{top10s.presentingSymptoms.map(
										([id, text, count]) => (
											<tr key={id}>
												<td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
													{text}
												</td>
												<td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
													{count}
												</td>
											</tr>
										)
									)}
								</tbody>
							</table>
						</div>
						{/* Disease / Clinicians */}
						<h3 className="text-lg leading-6 font-medium text-gray-900">
							Top 10 from Clinicians' Picks
						</h3>
						<div className="overflow-hidden shadow ring-1 ring-black ring-opacity-5 md:rounded-lg">
							<table className="min-w-full divide-y divide-gray-300">
								<thead className="bg-gray-50">
									<tr>
										<th
											scope="col"
											className="py-3 pl-4 pr-3 text-left text-xs font-medium uppercase tracking-wide text-gray-500 sm:pl-6"
										>
											Name
										</th>
										<th
											scope="col"
											className="px-3 py-3 text-left text-xs font-medium uppercase tracking-wide text-gray-500"
										>
											Count
										</th>
									</tr>
								</thead>
								<tbody className="divide-y divide-gray-200 bg-white">
									{top10s.topDiseasesWithinClinician.map(
										([id, text, count]) => (
											<tr key={id}>
												<td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
													{text}
												</td>
												<td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
													{count}
												</td>
											</tr>
										)
									)}
								</tbody>
							</table>
						</div>
						{/* Disease / Elsa */}
						<h3 className="text-lg leading-6 font-medium text-gray-900">
							Top 10 from Elsa's Top 3
						</h3>
						<div className="overflow-hidden shadow ring-1 ring-black ring-opacity-5 md:rounded-lg">
							<table className="min-w-full divide-y divide-gray-300">
								<thead className="bg-gray-50">
									<tr>
										<th
											scope="col"
											className="py-3 pl-4 pr-3 text-left text-xs font-medium uppercase tracking-wide text-gray-500 sm:pl-6"
										>
											Name
										</th>
										<th
											scope="col"
											className="px-3 py-3 text-left text-xs font-medium uppercase tracking-wide text-gray-500"
										>
											Count
										</th>
									</tr>
								</thead>
								<tbody className="divide-y divide-gray-200 bg-white">
									{top10s.topDiseaseWithElsaTop3.map(
										([id, text, count]) => (
											<tr key={id}>
												<td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
													{text}
												</td>
												<td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
													{count}
												</td>
											</tr>
										)
									)}
								</tbody>
							</table>
						</div>
						{/* Investigation Requested */}
						<h3 className="text-lg leading-6 font-medium text-gray-900">
							Top 10 Investigations Requested
						</h3>
						<div className="overflow-hidden shadow ring-1 ring-black ring-opacity-5 md:rounded-lg">
							<table className="min-w-full divide-y divide-gray-300">
								<thead className="bg-gray-50">
									<tr>
										<th
											scope="col"
											className="py-3 pl-4 pr-3 text-left text-xs font-medium uppercase tracking-wide text-gray-500 sm:pl-6"
										>
											Name
										</th>
										<th
											scope="col"
											className="px-3 py-3 text-left text-xs font-medium uppercase tracking-wide text-gray-500"
										>
											Count
										</th>
									</tr>
								</thead>
								<tbody className="divide-y divide-gray-200 bg-white">
									{top10s.investigationsRequested.map(
										([id, text, count]) => (
											<tr key={id}>
												<td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
													{text}
												</td>
												<td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
													{count}
												</td>
											</tr>
										)
									)}
								</tbody>
							</table>
						</div>
						{/* Medication Requested */}
						<h3 className="text-lg leading-6 font-medium text-gray-900">
							Top 10 Medications Requested
						</h3>
						<div className="overflow-hidden shadow ring-1 ring-black ring-opacity-5 md:rounded-lg">
							<table className="min-w-full divide-y divide-gray-300">
								<thead className="bg-gray-50">
									<tr>
										{[
											"Name",
											"Patients",
											"Last Updated",
										].map((text, ix) => (
											<th
												key={ix}
												scope="col"
												className={`py-3 ${
													ix
														? "pl-4 sm:pl-6 pr-3"
														: "px-3"
												} text-left text-xs font-medium uppercase tracking-wide text-gray-500 `}
											>
												{text}
											</th>
										))}
										{/* <th
											scope="col"
											className="px-3 py-3 text-left text-xs font-medium uppercase tracking-wide text-gray-500"
										></th> */}
									</tr>
								</thead>
								<tbody className="divide-y divide-gray-200 bg-white">
									{top10s.medicationsRequested.map(
										([id, text, count]) => (
											<tr key={id}>
												{}
												<td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
													{text}
												</td>
												<td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
													{count}
												</td>
											</tr>
										)
									)}
								</tbody>
							</table>
						</div>
					</div>
				</div>

				{/* Facilities */}
				<div>
					<div className="mx-auto container px-8 py-10 space-y-4">
						<h3 className="text-lg leading-6 font-medium text-gray-900">
							Facilities
						</h3>
						<div className="overflow-hidden shadow ring-1 ring-black ring-opacity-5 md:rounded-lg">
							<table className="min-w-full divide-y divide-gray-300">
								<thead className="bg-gray-50">
									<tr>
										{[
											"Name",
											"Patients",
											"LTFU",
											"Missed Appt.",
											"Last Updated",
										].map((text, ix) => (
											<th
												key={ix}
												scope="col"
												className={`py-3 ${
													ix
														? "pl-4 sm:pl-6 pr-3"
														: "px-3"
												} text-left text-xs font-medium uppercase tracking-wide text-gray-500 `}
											>
												{text}
											</th>
										))}
									</tr>
								</thead>
								<tbody className="divide-y divide-gray-200 bg-white">
									{facilities.map(({ id, ...other }) => (
										<tr key={id}>
											{[
												other.name,
												`${other.totalPatients} ${
													other.totalPatientWithInMonths >
													0
														? `(month new: ${other.totalPatientWithInMonths})`
														: ""
												}`,
												other.lostToFollowUpPatients,
												other.missingAppointments,
												formatDistanceToNow(
													other.lastActivity
												),
											].map((text, ix) => (
												<td
													key={`${id}-${ix}`}
													className="whitespace-nowrap px-3 py-4 text-sm text-gray-500"
												>
													{text}
												</td>
											))}
										</tr>
									))}
								</tbody>
							</table>
						</div>
						{/* Live Activity Information */}
						<div className="border border-dashed px-12 py-8 rounded">
							<p className="text-center text-lg text-gray-400">
								More information will be previewed here. <br />
								Including live activity happenening with the
								connected devices
							</p>
						</div>
					</div>
				</div>
			</main>
			<footer className="mx-auto container px-8 py-12">
				<p className="inline-flex gap-2">
					Made with <HeartIcon className="w-5 h-auto text-red-600" />{" "}
					by Elsa.Health
				</p>
			</footer>
		</div>
	);
}
