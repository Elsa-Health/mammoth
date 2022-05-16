/* eslint-disable jsx-a11y/anchor-is-valid */
import React from "react";
import { CalendarIcon, UserCircleIcon } from "@heroicons/react/outline";
import { classNames } from "./helpers";

import {
	CashIcon,
	ChevronRightIcon,
	HeartIcon,
	UserGroupIcon,
} from "@heroicons/react/solid";

import {
	CRDTMessageBox,
	buildCRDTStore as BuildCRDTStore,
} from "sabertooth-core";
import { ObservableStore } from "sabertooth-core/lib/providers";

import { differenceInDays, isBefore, min } from "date-fns";

import { configuration } from "sabertooth-stores/key-value-map";
import { v4 as uuidv4 } from "uuid";
import { useWebSocket } from "./utils/socket";

/* This example requires Tailwind CSS v2.0+ */

// const people = [
// 	{
// 		name: "Leonard Krasner",
// 		handle: "leonardkrasner",
// 		imageUrl:
// 			"https://images.unsplash.com/photo-1519345182560-3f2917c472ef?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
// 	},
// 	{
// 		name: "Floyd Miles",
// 		handle: "floydmiles",
// 		imageUrl:
// 			"https://images.unsplash.com/photo-1463453091185-61582044d556?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
// 	},
// 	{
// 		name: "Emily Selman",
// 		handle: "emilyselman",
// 		imageUrl:
// 			"https://images.unsplash.com/photo-1502685104226-ee32379fefbe?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
// 	},
// 	{
// 		name: "Kristin Watson",
// 		handle: "kristinwatson",
// 		imageUrl:
// 			"https://images.unsplash.com/photo-1500917293891-ef795e70e1f6?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
// 	},
// ];

const transactions = [
	{
		id: 1,
		name: "Payment to Molly Sanders",
		href: "#",
		amount: "$20,000",
		currency: "USD",
		status: "success",
		date: "July 11, 2020",
		datetime: "2020-07-11",
	},
	// More transactions...
];

const statusStyles = {
	success: "bg-green-100 text-green-800",
	processing: "bg-yellow-100 text-yellow-800",
	failed: "bg-gray-100 text-gray-800",
};

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

// To store the when needed on the fly
const crdt = new CRDTMessageBox();
const collectionsUID = "@@CTC-STORE";

const kvmConfig = configuration({
	generateId: (id?: string) => id || uuidv4(),
	buildDocRef: (docId, collId) => `${collectionsUID}/${collId}/${docId}`,
});

const wsURL_DEV = "ws://localhost:5005/channel/cmrdt";
const wsURL_PROD = "wss://ctc-edge-server.fly.dev/channel/cmrdt";

const wsURL = process.env.NODE_ENV === "development" ? wsURL_DEV : wsURL_PROD;
// const wsURL = wsURL_PROD;

const { store, sync, mergeOther } = BuildCRDTStore(
	// @ts-ignore
	ObservableStore,
	crdt,
	kvmConfig
);

function App({
	patients,
	appointments,
	visits,
}: {
	patients: [string, CTC.Patient][];
	appointments: [string, CTC.Appointment][];
	visits: [string, CTC.Visit][];
}) {
	const fg = React.useMemo(() => {
		return Object.entries(groupByFacility(patients));
	}, [patients]);

	const cards = [
		{
			name: "Patients",
			href: "#",
			icon: UserGroupIcon,
			amount: patients.length,
		},
		{
			name: "Appointments",
			href: "#",
			icon: CalendarIcon,
			amount: appointments.length,
		},
		{
			name: "Visits",
			href: "#",
			icon: UserCircleIcon,
			amount: visits.length,
		},
	];

	const moreItems = [
		{
			text: "Number of upcoming appointments",
			value: upcomingAppointments(appointments).length,
		},
		{
			text: "Number of missed appointments",
			value: missedAppointments(appointments).length,
		},
		{
			text: "Number of Lost To Follow Up (LTFU) Patients",
			value: lostToFollowUpAppointment(appointments).length,
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
			{/* App body */}
			<main className="flex-grow divide-y w-full">
				{/* Summary*/}
				<div className="bg-gray-50">
					<div className="mx-auto container px-8 py-10 space-y-4">
						{/* Overview */}
						<div>
							<h2 className="text-lg font-bold tracking-wider">
								Overview
							</h2>
							<div className="mt-2 grid grid-cols-1 gap-5 sm:grid-cols-2 md:grid-cols-3">
								{/* Card */}
								{cards.map((card) => (
									<div
										key={card.name}
										className="bg-white overflow-hidden shadow rounded-lg"
									>
										<div className="p-5">
											<div className="flex items-center">
												<div className="flex-shrink-0">
													<card.icon
														className="h-6 w-6 text-gray-400"
														aria-hidden="true"
													/>
												</div>
												<div className="ml-5 w-0 flex-1">
													<dl>
														<dt className="text-sm font-medium text-gray-500 truncate">
															{card.name}
														</dt>
														<dd>
															<div className="text-lg font-medium text-gray-900">
																{card.amount}
															</div>
														</dd>
													</dl>
												</div>
											</div>
										</div>
										{/* <div className="bg-gray-50 px-5 py-3">
											<div className="text-sm">
												<a
													href={card.href}
													className="font-medium text-cyan-700 hover:text-cyan-900"
												>
													View all
												</a>
											</div>
										</div> */}
									</div>
								))}
							</div>
						</div>
						<div className="space-y-4">
							<h2 className="text-lg font-bold tracking-wider">
								More
							</h2>
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
					</div>
				</div>
				{/* Facility + Devices */}
				<div>
					<div className="mx-auto container px-8 py-10 space-y-4">
						<div>
							<h2 className="text-lg  font-bold tracking-wider">
								Facility Information
							</h2>
							<div className="border rounded-md">
								<table className="min-w-full divide-y">
									<thead className="bg-gray-50 rounded-md">
										<tr>
											<th
												scope="col"
												className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-6"
											>
												Facility Code
											</th>
											<th
												scope="col"
												className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
											>
												No. of Patients
											</th>
										</tr>
									</thead>
									<tbody>
										{fg.map(([facilityCode, patients]) => {
											return (
												<tr key={facilityCode}>
													<td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-6">
														{facilityCode}
													</td>
													<td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
														{patients.length}
													</td>
												</tr>
											);
										})}
									</tbody>
								</table>
							</div>
						</div>
						<div className="border border-dashed px-12 py-8 rounded">
							<p className="text-center text-lg text-gray-400">
								More information will be previewed here. <br />
								Including live activity happenening with the
								connected devices
							</p>
						</div>
					</div>
					{/* <div className="mx-auto container px-8 py-10">
						<div className="grid lg:grid-cols-3 gap-4 ">
							<div>
								<h2 className="">Device Updates</h2>

								<div className="flow-root mt-6">
									<ul
										role="list"
										className="-my-5 divide-y divide-gray-200"
									>
										{people.map((person) => (
											<li
												key={person.handle}
												className="py-4"
											>
												<div className="flex items-center space-x-4">
													<div className="flex-shrink-0">
														<img
															className="h-8 w-8 rounded-full"
															src={
																person.imageUrl
															}
															alt=""
														/>
													</div>
													<div className="flex-1 min-w-0">
														<p className="text-sm font-medium text-gray-900 truncate">
															{person.name}
														</p>
														<p className="text-sm text-gray-500 truncate">
															{"@" +
																person.handle}
														</p>
													</div>
													<div>
														<a
															href="#"
															className="inline-flex items-center shadow-sm px-2.5 py-0.5 border border-gray-300 text-sm leading-5 font-medium rounded-full text-gray-700 bg-white hover:bg-gray-50"
														>
															View
														</a>
													</div>
												</div>
											</li>
										))}
									</ul>
								</div>
							</div>
							<div className="col-span-2">
								<h2>Activity</h2>
								<UpdateActivity />
							</div>
						</div>
					</div> */}
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

export default function EdgeApp() {
	useWebSocket({
		url: wsURL,
		onOpen: (e) => {
			console.log("Connected to WebSocket");
		},
		onMessage: (e) => {
			// @ts-ignore
			// e.data.text().then((text) => {
			const vals = JSON.parse(e.data);
			console.log(">", vals);
			// const vals = JSON.parse(text);
			mergeOther(vals || []);
			sync();
			crdt.resolve();
			console.log("Received and Merged!");
			// });

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

	// useWebSocket({
	// 	url: wsURL,
	// });

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
		<>
			<App
				patients={patients}
				appointments={appointments}
				visits={visits}
			/>
		</>
	);
}

function UpdateActivityMobile() {
	return (
		<div className="shadow sm:hidden">
			<ul className="divide-y divide-gray-200 overflow-hidden shadow sm:hidden">
				{transactions.map((transaction) => (
					<li key={transaction.id}>
						<a
							href={transaction.href}
							className="block px-4 py-4 bg-white hover:bg-gray-50"
						>
							<span className="flex items-center space-x-4">
								<span className="flex-1 flex space-x-2 truncate">
									<CashIcon
										className="flex-shrink-0 h-5 w-5 text-gray-400"
										aria-hidden="true"
									/>
									<span className="flex flex-col text-gray-500 text-sm truncate">
										<span className="truncate">
											{transaction.name}
										</span>
										<span>
											<span className="text-gray-900 font-medium">
												{transaction.amount}
											</span>{" "}
											{transaction.currency}
										</span>
										<time dateTime={transaction.datetime}>
											{transaction.date}
										</time>
									</span>
								</span>
								<ChevronRightIcon
									className="flex-shrink-0 h-5 w-5 text-gray-400"
									aria-hidden="true"
								/>
							</span>
						</a>
					</li>
				))}
			</ul>

			<nav
				className="bg-white px-4 py-3 flex items-center justify-between border-t border-gray-200"
				aria-label="Pagination"
			>
				<div className="flex-1 flex justify-between">
					<a
						href="#"
						className="relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:text-gray-500"
					>
						Previous
					</a>
					<a
						href="#"
						className="ml-3 relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:text-gray-500"
					>
						Next
					</a>
				</div>
			</nav>
		</div>
	);
}

function UpdateActivityDesktop() {
	return (
		<div className="hidden sm:block">
			<div className="max-w-6xl">
				<div className="flex flex-col mt-2">
					<div className="align-middle min-w-full overflow-x-auto shadow overflow-hidden sm:rounded-lg">
						<table className="min-w-full divide-y divide-gray-200">
							<thead>
								<tr>
									<th className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
										Transaction
									</th>
									<th className="px-6 py-3 bg-gray-50 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
										Amount
									</th>
									<th className="hidden px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider md:block">
										Status
									</th>
									<th className="px-6 py-3 bg-gray-50 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
										Date
									</th>
								</tr>
							</thead>
							<tbody className="bg-white divide-y divide-gray-200">
								{transactions.map((transaction) => (
									<tr
										key={transaction.id}
										className="bg-white"
									>
										<td className="max-w-0 w-full px-6 py-4 whitespace-nowrap text-sm text-gray-900">
											<div className="flex">
												<a
													href={transaction.href}
													className="group inline-flex space-x-2 truncate text-sm"
												>
													<CashIcon
														className="flex-shrink-0 h-5 w-5 text-gray-400 group-hover:text-gray-500"
														aria-hidden="true"
													/>
													<p className="text-gray-500 truncate group-hover:text-gray-900">
														{transaction.name}
													</p>
												</a>
											</div>
										</td>
										<td className="px-6 py-4 text-right whitespace-nowrap text-sm text-gray-500">
											<span className="text-gray-900 font-medium">
												{transaction.amount}{" "}
											</span>
											{transaction.currency}
										</td>
										<td className="hidden px-6 py-4 whitespace-nowrap text-sm text-gray-500 md:block">
											<span
												className={classNames(
													// @ts-ignore
													statusStyles[
														transaction.status
													],
													"inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium capitalize"
												)}
											>
												{transaction.status}
											</span>
										</td>
										<td className="px-6 py-4 text-right whitespace-nowrap text-sm text-gray-500">
											<time
												dateTime={transaction.datetime}
											>
												{transaction.date}
											</time>
										</td>
									</tr>
								))}
							</tbody>
						</table>
						{/* Pagination */}
						<nav
							className="bg-white px-4 py-3 flex items-center justify-between border-t border-gray-200 sm:px-6"
							aria-label="Pagination"
						>
							<div className="hidden sm:block">
								<p className="text-sm text-gray-700">
									Showing{" "}
									<span className="font-medium">1</span> to{" "}
									<span className="font-medium">10</span> of{" "}
									<span className="font-medium">20</span>{" "}
									results
								</p>
							</div>
							<div className="flex-1 flex justify-between sm:justify-end">
								<a
									href="#"
									className="relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50"
								>
									Previous
								</a>
								<a
									href="#"
									className="ml-3 relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50"
								>
									Next
								</a>
							</div>
						</nav>
					</div>
				</div>
			</div>
		</div>
	);
}

export function UpdateActivity() {
	return (
		<>
			<UpdateActivityMobile />
			<UpdateActivityDesktop />
		</>
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

export function groupByContent<T, G extends string>(
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
	const [id, _] = patientRecord;
	return id.slice(0, 8);
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
