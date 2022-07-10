/**
 * With all the functions associated with running code.
 */

import { query, queryData } from "@bagpack/elsa";
import { QueryRunner } from "@bagpack/querybox";

import { pipe } from "ramda";
import * as r from "ramda";

import * as t from "@elsa-health/emr/health.types/v1";
import { ARV } from "elsa-health-data-fns";

import { kebabCase } from "lodash";

function withRunner(run: QueryRunner) {
	return run;
}

const title = (x: string[]) => {
	const d = Object.fromEntries(x.map((t) => [kebabCase(t), t]));
	return { keys: Object.keys(d), texts: x, fn: (key: string) => d[key] };
};

// @ts-ignore
export const runAntiRetrovirals = withRunner(async ({ table }) => {
	// ...
	const { arvs } = await loadMedication();

	console.log(arvs);
	const t = title([
		"Type",
		"Female (#, %)",
		"Male (#, %)",
		"Total (#)",
		"% of All Registered",
	]);

	return {
		drawTable: table<any>({
			columns: t.keys,
			data: [
				["First Line - Adults", "689 (54%)", "123 (12%)", "812", "66%"],
			],
			// @ts-ignore
			title: t.fn,
		}),
	};
});

// runAntiRetrovirals({});

async function loadMedication() {
	// TODO: also include the old medication request type
	const s = await queryData<any[]>("/collection/medication.requests/data");

	const meds = r.map(r.pick(["medication", "authoredOn"]), s);

	const arvs: { identifier: string; text: string; className: string }[] = [];
	const unitArvs: { identifier: string; text: string }[] = [];

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

	return { arvs, unitarvs: unitArvs };
}

/**
 * Runner for data to create the overview section of the district.
 * @param param0
 * @returns
 */
export const runOverview = withRunner(async ({ table, query, r, is, h }) => {
	const patients = await queryData<t.Patient[]>("/collection/patients/data");
	const visits = await queryData<t.Visit[]>("/collection/visits/data");

	const count = r.length;
	// @ts-ignore
	const countInWeeks = (d) => r.length(r.filter(is.withinWeek, d));

	// appointment information
	const appts = await appointments();

	return {
		drawTable: table<{
			type: string;
			overall: any;
			"this-week": any;
			delta: any;
		}>({
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
		drawTable: table<{ cat: string; num: any; perc: any }>({
			columns: ["cat", "num", "perc"],
			data: [
				["ARV Pickup at Registered Facility *", 324, "80%"],
				["ARV Pickup at Different Facility *", 32, "20%"],
			],
		}),
	};
});

// querying involved in appointment determination
async function appointments() {
	const apptreq = await queryData<t.AppointmentRequest[]>(
		"/collection/appointment-requests/data"
	);
	const apptreqmap = Object.fromEntries(
		apptreq.map((d) => {
			return [d.id, d];
		})
	);
	// appointment requests status
	const apx = Object.fromEntries(
		Object.keys(apptreqmap).map((id) => [id, null])
	);

	const getApptReq = (id: string) => {
		apptreqmap[id] ?? null;
	};

	// get all apppointment responses
	const apptres = await queryData<t.AppointmentResponse[]>(
		"/collection/appt.responses/data"
	);
	const apptresids = new Set(r.pluck("id", apptres));

	// responses attached to visits
	const apptresFromVisits = await queryData<t.Visit[]>(
		"/collection/visits/data"
	)
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
