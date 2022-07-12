/**
 * With all the functions associated with running code.
 */

import { query, queryData } from "../elsa";
// import { QueryRunner } from "@bagpack/querybox";

import { pipe } from "ramda";
import * as r from "ramda";

import { ARV } from "elsa-health-data-fns";
// import * as t from "@elsa-health/emr/health.types/v1";

import { kebabCase } from "lodash";
import { List } from "immutable";
import { date } from "../utils";
import * as d from "date-fns";

import devices from "@server/devices-to-use.json";
import { facilities } from "../facilities";
import { withRunner } from "./_utils";
import _ from "lodash";

import generateRandomColor from "randomcolor";

// function withRunner(run: QueryRunner) {

const title = (x) => {
	const d = Object.fromEntries(x.map((t) => [kebabCase(t), t]));
	return { keys: Object.keys(d), texts: x, fn: (key) => d[key] };
};

// height={100}
// type="bar"
// data={{
// 	labels: ["Visits", "Patients"],
// 	datasets: [
// 		{
// 			label: "Male",
// 			backgroundColor: [
// 				"#3e95cd",
// 				"#3e95cd",
// 			],
// 			data: [323, 560],
// 		},
// 		{
// 			label: "Female",
// 			backgroundColor: [
// 				"#4665af",
// 				"#4665af",
// 			],
// 			data: [323, 560],
// 		},
// 	],
// }}
// options={{
// 	scales: {},
// }}

export const runGenderDistributionForPatients = withRunner(
	async ({ table, is }) => {
		const patients = await loadPatients();

		const count = r.length;
		const groupByWithInWeek = r.filter((r) => is.withinWeek(r.createdAt));

		return {
			drawChart: {
				height: 100,
				type: "bar",
				data: {
					labels: ["All year", "This week"],
					datasets: Object.entries(
						r.groupBy((r) => r.sex, patients)
					).map(([cls, pts]) => {
						const weekpts = groupByWithInWeek(pts);
						return {
							label: _.upperFirst(cls),
							backgroundColor: generateRandomColor(),
							data: [count(pts), count(weekpts)],
						};
					}),
				},
			},
		};
	}
);

export const runAntiRetrovirals = withRunner(async ({ table }) => {
	// ...
	const { arvs } = await loadMedication();

	console.log(arvs);

	const t = title(["Type", "Total (#)"]);

	const data = ARV.class.pairs().map(([cls, text]) => {
		return [text, arvs.filter((x) => x.className === cls).count()];
	});

	return {
		drawTable: table({
			columns: t.keys,
			data: data,
			// @ts-ignore
			title: t.fn,
		}),
	};
});

export const runARVStock = withRunner(async ({ table }) => {
	//..
	/*
		{
			timestamp: string;
			record: {
				count: number;
				medicationIdentifier: string;
				text: string;
			};
			source: { facility: string; userId: string };
		}[]
	*/
	const sa = await queryData("/collection/public.network.stock/data").then(
		List
	);

	const t = title(["Medication", "Count", "By Facility", "DateTime"]);
	return {
		drawTable: table({
			columns: t.keys,
			data: sa
				.sortBy((s) => -date(s.timestamp).getTime())
				.map((s) => [
					s.record.text,
					s.record.count,
					s.source.facility,
					d.format(date(s.timestamp), "hh:mm a 'on' MMMM dd, yyyy"),
				])
				.toArray(),
			// @ts-ignore
			title: t.fn,
		}),
	};
});

/**
 * For knowning the ARV pick up location
 */
export const runARVPickUpLocation = withRunner(async ({}) => {
	const add = () => r.add(1, 2);
	// haha!
	return {
		title: "ARV Pickup Location - Weekly",
		message: "Nothing to see here",
	};
});

const mapDevices = (d) =>
	Object.fromEntries(
		d.map((s) => {
			return [s.userId, s];
		})
	);
const ctcDevices = () =>
	List(devices).filter((d) => d.project === "hiv-scale-up");

const deviceFromUserId = (d) => (userId) => {
	return mapDevices(d)[userId] ?? null;
};

/**
 * Running statis for facilities
 */
export const runStatsForFacilities = withRunner(async ({ table }) => {
	/// ...
	const fs = List(facilities());
	const count = r.length;

	const data = await Promise.all(
		fs
			.sortBy((s) => s.name)
			.toArray()
			.map(async ({ facilityCode, name }) => {
				const patients = await loadPatients(facilityCode);
				const visits = await loadVisits(facilityCode);

				return [name, facilityCode, count(patients), count(visits)];
			})
	);

	const t = title(["Facility", "Facility ID", "Patients", "Visits"]);
	return {
		drawTable: table({
			data,
			columns: t.keys,
			// @ts-ignore
			title: t.fn,
		}),
	};
});

/**
 * Runs inforamtion needed to build statistics for the
 */
export const runUsers = withRunner(async ({ table }) => {
	const ctcdevices = ctcDevices().toArray();

	// get stock activity
	// const x = await queryData("/");

	const t = title([
		"User name",
		"Belonging Facility",
		// "User ID",
		"Registered Device",
	]);

	return {
		drawTable: table({
			columns: t.keys,
			data: ctcdevices.map((dv) => {
				return [
					dv.userFullName,
					dv.deployedFacility.name,
					// dv.userId,
					dv.deviceModel,
				];
			}),
			title: t.fn,
		}),
	};
});

// runARVStock({ table: (...arr) => console.log("table") });
// console.log(runStatsForFacilities({ table: (a) => console.log(a) }));

export async function loadPatients(facilityId = null) {
	const patients = await queryData("/collection/patients/data").then(List);

	if (facilityId === null) {
		return patients.toArray();
	}

	return patients
		.filter((p) => {
			// check if the record has `managingOrganization` (for new data)
			const mo = p.managingOrganization;

			if ((mo ?? null) !== null) {
				if (mo?.identifier.ctcCode === facilityId) {
					return true;
				}
			}
			// for old data
			// check form id (compare with first 8 characters)
			return p.id.slice(0, 8) === facilityId;
		})
		.toArray();
}

export async function loadVisits(facilityId = null) {
	const visits = await queryData("/collection/visits/data").then(List);

	if (facilityId === null) {
		return visits.toArray();
	}

	return visits
		.filter((x) => {
			return x?.subject?.id.slice(0, 8) === facilityId;
		})
		.toArray();
}

export async function loadMedication() {
	// TODO: also include the old medication request type
	const s = await queryData("/collection/medication.requests/data");

	const meds = r.map(r.pick(["medication", "authoredOn"]), s);

	const arvs = [];
	const unitArvs = [];

	// to support both versions of data
	// @ts-ignore
	const mdts = meds.forEach(({ medication: x, authoredOn }) => {
		if (x?.category !== undefined) {
			if (x?.category !== "arv-ctc") {
				return;
			}
		} else {
			if (x.id !== undefined) {
				// for the old type of data, skipp the ones that aren't ctc medications
				if (!x.id.startsWith("ctc-arv")) {
					return;
				}
			}
		}

		// @ts-ignore
		const identifier = x.identifier ?? x.name;

		// if can generate text, it's in the list
		// @ts-ignore
		const arvText = ARV.regimen.fromKey(identifier);

		if (arvText !== undefined) {
			arvs.push({
				identifier,
				text: arvText,
				// @ts-ignore
				className: ARV.pairs().filter((x) =>
					// @ts-ignore
					x[1].includes(identifier)
				)[0]?.[0],
			});
		}

		if (s !== undefined) {
			unitArvs.push({
				identifier,
				// @ts-ignore
				text: ARV.units.fromKey(identifier),
			});
		}
	});

	return { arvs: List(arvs), unitarvs: List(unitArvs) };
}

/**
 * Runner for data to create the overview section of the district.
 * @param param0
 * @returns
 */
export const runOverview = withRunner(async ({ table, query, r, is, h }) => {
	const patients = await queryData("/collection/patients/data");
	const visits = await queryData("/collection/visits/data");

	const count = r.length;
	// @ts-ignore
	const countInWeeks = (d) => r.length(r.filter(is.withinWeek, d));

	// appointment information
	const appts = await fetchAppointments();

	return {
		drawTable: table({
			columns: ["type", "overall", "this-week"],
			data: [
				[
					"Patient Registered",
					count(patients),
					countInWeeks(r.pluck("createdAt", patients)),
				],
				[
					"Patient Visits Completed",
					count(patients),
					countInWeeks(r.pluck("createdAt", visits)),
				],
				[
					"Missed Appointments",
					count(appts.missed),
					countInWeeks(r.pluck("appointmentDate", appts.missed)),
				],
			],
		}),
	};
});

export const runARVPickupLocationWeekly = withRunner(async ({ table }) => {
	// ...
	return {
		drawTable: table({
			columns: ["cat", "num", "perc"],
			data: [
				["ARV Pickup at Registered Facility *", 324, "80%"],
				["ARV Pickup at Different Facility *", 32, "20%"],
			],
		}),
	};
});

// querying involved in appointment determination
async function fetchAppointments(facilityId = null) {
	const apptreq = await queryData("/collection/appointment-requests/data");
	const apptreqmap = Object.fromEntries(
		apptreq.map((d) => {
			return [d.id, d];
		})
	);
	// appointment requests status
	const apx = Object.fromEntries(
		Object.keys(apptreqmap).map((id) => [id, null])
	);

	const getApptReq = (id) => {
		apptreqmap[id] ?? null;
	};

	// get all apppointment responses
	const apptres = await queryData("/collection/appt.responses/data");
	const apptresids = new Set(r.pluck("id", apptres));

	// responses attached to visits
	const apptresFromVisits = await queryData("/collection/visits/data")
		.then(r.pluck("associatedAppointmentResponse")) // take only associated appointment response
		.then(r.filter(pipe(r.isNil, r.not))) // not null
		// @ts-ignore
		.then(r.filter((x) => !apptresids.has(x.id))); // not referenced in the apptres

	// add the unreferenced data
	apptresFromVisits.forEach((s) => {
		// @ts-ignore
		apptres.push(s);
	});

	// check if in each appointment response, the appt response is cleared
	apptres.forEach((xres) => {
		const idx = xres.authorizingAppointmentRequest.id;
		if (idx ?? null !== null) {
			if (Object.keys(apx).includes(idx)) {
				// @ts-ignore
				apx[idx] = xres;
			}
		}
	});

	// pairs of appointment request with their matched responses

	return {
		requested: apptreq,
		missed: r.filter(
			pipe((apq) => apx[apq.id] === null),
			apptreq
		),
	};
}
