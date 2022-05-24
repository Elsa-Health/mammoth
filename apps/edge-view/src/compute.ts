import { Appointment } from "./emr/v1/appointment";
import { Patient } from "./emr/v1/personnel";
import { Visit } from "./emr/v1/visit";

import { facilities, getFacilityFromCode } from "./facilities";
import {
	ARV,
	Condition,
	Investigation,
	Medication,
} from "elsa-health-data-fns";

import {
	differenceInCalendarMonths,
	differenceInDays,
	differenceInYears,
	format,
	isBefore,
} from "date-fns";
import { Link } from "./emr/adept";
import { getAgeGroup, getMonthsFromYears } from "./emr/helpers";

type PatientPair = [{ collectionId: "patients"; documentId: string }, Patient];
type VisitPair = [{ collectionId: "visits"; documentId: string }, Visit];
type AppointmentPair = [
	{ collectionId: "appointments"; documentId: string },
	Appointment
];

// Data for emr
type EmrDataPair = PatientPair | VisitPair | AppointmentPair;

//
export function outputValue(data_: any[], patientFacilityLinks?: Link[]) {
	const data: EmrDataPair[] = data_;

	const patients = patientsFrom(data);
	const visits = visitsFrom(data);
	const appointments = appointmentsFrom(data);

	const now = new Date();
	// const patientsByAgeGroup = groupByFn(patients, ([_, t]) => {
	// 	return getAgeGroup(
	// 		getMonthsFromYears(differenceInYears(now, new Date(t.birthDate)))
	// 	);
	// });

	// const patientsByGender = groupByFn(patients, ([_, t]) => {
	// 	return t.sex ?? "unknown";
	// });

	return {
		district: {
			totalPatients: count(patients),
			visitsWithInMonth: count(visits.map(cDate).filter(isWithInMonth)),
			appointmentsWithInMonth: count(
				appointments.map(cDate).filter(isWithInMonth)
			),
			patientsWithInMonth: count(
				patients.map(cDate).filter(isWithInMonth)
			),
			totalVisits: count(visits),
			totalAppointments: count(appointments),
			missedAppointments: count(appointments.filter(isMissedAppointment)),
			upcomingAppointments: count(
				appointments.filter(isUpcomingAppointment)
			),
			lostToFollowUpPatients: 0,
			patientsTransferred: 0,
			nonTransferredPatientsPickMedsElsewhere: 0,
			// patientsFrom(data).map(s => s |> dateField(s) |> isWithInMonth(%))
		},
		// to be done
		arv: {
			patientsOnARV: 23,
			groups: ARV.class.pairs().map(([s, x]) => [s, x, 0]),
		},
		top10s: {
			// symptoms,
			diseasesByElsa: [
				[
					"bacterial-vaginosis",
					Condition.fromKey("bacterial-vaginosis"),
					4,
				],
				["bronchitis", Condition.fromKey("bronchitis"), 1],
			] as [Condition, string, number][],
			diseaseByClinicians: [
				["anaemia", Condition.fromKey("anaemia"), 30],
				["asthma", Condition.fromKey("asthma"), 3],
			] as [Condition, string, number][],
			investigationsRequested: [
				[
					"1-2-beta-d-glucan",
					Investigation.name.fromKey("1-2-beta-d-glucan"),
					32,
				],
				[
					"chest-x-ray-cxr",
					Investigation.name.fromKey("chest-x-ray-cxr"),
					5,
				],
			] as [Investigation, string, number][],
			medicationsRequested: [
				["albendazole", Medication.all.fromKey("albendazole"), 10],
				[
					"amoxicillin-capsules",
					Medication.all.fromKey("amoxicillin-capsules"),
					4,
				],
			] as [Medication.All, string, number][],
		},
		facilities: facilities().map(({ uid, ...f }) => {
			const patients_ = fromFacility(patients, f.facilityCode);
			const appts_ = count(
				appointments
					.filter(
						([_, appt]) =>
							// this is used temporarily
							// @ts-ignore
							appt.subject.id.slice(0, 8) === f.facilityCode
					)
					.filter(isMissedAppointment)
			);
			return {
				id: uid,
				...f,
				totalPatients: count(patients_),
				totalPatientWithInMonths: count(
					patients_.map(cDate).filter(isWithInMonth)
				),
				lostToFollowUpPatients: 0,
				missingAppointments: appts_,
				users: [],
				lastActivity: new Date(),
			};
		}),
	};
}

// boolean-fns

export const belongsInFacility =
	(facilityCode: string) => (data: PatientPair) => {
		return data[1].id.slice(0, 8) === facilityCode;
	};

export const isApptResponded = ([_, appt]: AppointmentPair) => {
	return appt.response !== null;
};

export const isMissedAppointment = (apptData: AppointmentPair) => {
	const [_, appt] = apptData;
	return (
		!isApptResponded(apptData) &&
		isBefore(cDate(apptData), new Date()) &&
		differenceInDays(new Date(), cDate(apptData)) <= 3
	);
};

export const isUpcomingAppointment = (apptData: AppointmentPair) => {
	return !isApptResponded(apptData) && isBefore(new Date(), cDate(apptData));
};

// filters
// ---------------------

export function getSymptomAssessment([_, visit]: VisitPair) {
	console.log(visit);
}

//
export function fromFacility<F extends string>(
	data: PatientPair[],
	facilityCode: F
): PatientPair[] {
	return data.filter(belongsInFacility(facilityCode));
}

// fns
// ---------

export const cDate = ([_, data]: EmrDataPair) => new Date(data.createdAt);
export const isWithInMonth = (date: Date) => {
	return differenceInCalendarMonths(new Date(), date) === 0;
};
export const getYYYY_MM = (date: Date) => format(date, "yyyy-MM");

// Select data
// ----------------------

export function patientsFrom(data: EmrDataPair[]) {
	return data.filter(
		(d) => d[0].collectionId === "patients"
	) as PatientPair[];
}

export function appointmentsFrom(data: EmrDataPair[]) {
	return data.filter(
		(d) => d[0].collectionId === "appointments"
	) as AppointmentPair[];
}

export function visitsFrom(data: EmrDataPair[]) {
	return data.filter((d) => d[0].collectionId === "visits") as VisitPair[];
}

// ll-fns
// ----------------

export function groupByFn<G extends string | number, A, O = [G, A]>(
	data: A[],
	fn: (item: A) => G,
	output?: (group: G, rows: A[]) => O
) {
	const groups = new Map<G, Set<A>>();
	const _ofn = output === undefined ? (id: G, d: A[]) => [id, d] : output;

	data.forEach((item) => {
		const gp = fn(item);

		if (!groups.has(gp)) {
			groups.set(gp, new Set());
		}

		const s = groups.get(gp) as Set<A>;
		s.add(item);
	});

	return Array.from(groups.entries()).map(([id, set]) => {
		return _ofn(id, Array.from(set.values()));
	});
}

export const gKeys = <G extends string, A>(data: [G, A][]) =>
	data.map((s) => s[0]);
export const gValues = <G extends string, A>(data: [G, A][]) =>
	data.map((s) => s[1]);

export const count = (arr: any[]) => arr.length;

/**
 * Compute median average of numbers
 * @param arr
 * @returns
 */
const median = (arr: number[]) => {
	if (count(arr) < 3) {
		return mean(arr);
	}

	const mid = Math.floor(arr.length / 2),
		nums = [...arr].sort((a, b) => a - b);
	return arr.length % 2 !== 0 ? nums[mid] : (nums[mid - 1] + nums[mid]) / 2;
};

/**
 * Compute mean average of numbers
 * @param arr
 * @returns
 */
const mean = (arr: number[]) => {
	if (count(arr) <= 0) {
		return 0;
	}

	return sum(arr) / count(arr);
};

const sum = (arr: number[]) => {
	let _sum = 0;
	for (let x of arr) {
		_sum += x;
	}

	return _sum;
};
