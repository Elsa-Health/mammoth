import { Appointment } from "./emr/v1/appointment";
import { Patient } from "./emr/v1/personnel";
import { Assessment, Visit } from "./emr/v1/visit";

import { Seq as iSeq, Map as iMap, List as iList } from "immutable";

import { facilities, getFacilityFromCode } from "./facilities";
import {
	ARV,
	Condition,
	Investigation,
	Medication,
	Symptom,
} from "elsa-health-data-fns";

import {
	differenceInCalendarMonths,
	differenceInDays,
	format,
	isBefore,
} from "date-fns";
import {
	InvestigationRequest,
	InvestigationResult,
} from "./emr/v1/investigation";
import { Document } from "papai/collection";
import {
	MedicationRequest,
	Medication as HMedication,
} from "./emr/v1/prescription";
import { InvestigationTypeRecord } from "elsa-health-data-fns/lib/investigations";
import _ from "lodash";
import { Observation } from "./emr/v1/observation";

export type PatientPair = [
	{ collectionId: "patients"; documentId: string },
	Patient
];
export type VisitPair = [{ collectionId: "visits"; documentId: string }, Visit];
export type InvestigationPair = [
	{ collectionId: "investigations"; documentId: string },
	InvestigationResult<Data>
];
export type AppointmentPair = [
	{ collectionId: "appointments"; documentId: string },
	Appointment
];

// Data for emr
type EmrDataPair = PatientPair | VisitPair | AppointmentPair;

const docref = <Dr extends Document.Ref>(dr: Dr) =>
	`${dr.collectionId}/${dr.documentId}`;

//
export function outputValue(v: {
	patients: PatientPair[];
	visits: VisitPair[];
	appointments: AppointmentPair[];
	investigationResults: InvestigationPair[];
}) {
	// const data: EmrDataPair[] = data_;

	// const patients = patientsFrom(data);
	// const visits = visitsFrom(data);

	// const appointments = appointmentsFrom(data);
	const now = new Date();
	// const patientsByAgeGroup = groupByFn(patients, ([_, t]) => {
	// 	return getAgeGroup(
	// 		getMonthsFromYears(differenceInYears(now, new Date(t.birthDate)))
	// 	);
	// });

	// const patientsByGender = groupByFn(patients, ([_, t]) => {
	// 	return t.sex ?? "unknown";
	// });

	//
	const patients = iSeq(
		iMap(
			Object.fromEntries(v.patients.map(([dr, val]) => [docref(dr), val]))
		)
	);
	const visits = iSeq(
		iMap(Object.fromEntries(v.visits.map(([dr, val]) => [docref(dr), val])))
	);
	const appointments = iSeq(
		iMap(
			Object.fromEntries(
				v.appointments.map(([dr, val]) => [docref(dr), val])
			)
		)
	);

	const investigationResults = iSeq(
		iMap(
			Object.fromEntries(
				v.investigationResults.map(([dr, val]) => [docref(dr), val])
			)
		)
	);

	const investigationRequests = iList<
		InvestigationRequest<{
			investigationId: Investigation;
			res: InvestigationTypeRecord<string>;
		}>
	>(
		visits
			.map((s) => s.investigationRequests)
			// @ts-ignore
			.reduceRight((d, c) => [...d, ...c])
	);

	const invRqs = _.countBy(
		investigationRequests.map((s) => s.data.investigationId).toArray()
	);

	type ArvMedicationRequest = MedicationRequest<{
		regimen: ARV.Regimen;
		class: ARV.Class;
	}>;
	type StandardMedicationRequest = MedicationRequest<{
		medication: Medication.All;
	}>;
	const medications = iList<ArvMedicationRequest | StandardMedicationRequest>(
		visits
			// @ts-ignore
			.map((s) => s.prescriptions)
			// @ts-ignore
			.reduceRight((d, c) => [...d, ...c])
	);

	// @ts-ignore
	const arvMedications: iList<ArvMedicationRequest> = medications
		// @ts-ignore
		.filter((s) => s.medication?.code === "arv");

	const standardMedicationReq = _.countBy(
		medications
			// @ts-ignore
			.filter((s) => s.medication.code === "standard")
			.map(
				(s) =>
					(
						s.medication as HMedication<
							"standard",
							{ medication: Medication.All }
						>
					).data.medication
			)
			.toArray()
	);

	console.log({
		invRqs,
		standardMedicationReq,
	});

	const symptomAssessment = iList<
		Assessment<{
			data: {
				present: { id: string; location: string; donparhere: string }[];
				absent: string[];
			};
			elsa_differentials:
				| {
						condition: string;
						p: number;
						id: string;
				  }[]
				| null;
			doctorDiagnosis?: string[];
		}>
	>(
		visits
			.map((s) =>
				s.assessments.filter(
					// @ts-ignore
					(s: Assessment<Data>) =>
						s.reportCode === "assessment" &&
						s.code === "symptom.assessment"
				)
			)
			// @ts-ignore
			.reduceRight((d, c) => [...d, ...c])
	);

	const elsaTop3ClinianPair = symptomAssessment.map((as) => {
		if (as.result.resourceType === "Observation") {
			return [
				(
					as.result.data.elsa_differentials?.map((d) => d.id) || []
				).slice(0, 3),
				as.result.data.doctorDiagnosis || [],
			];
		}

		return [[], []];
	});

	const elsaTop3Lists = elsaTop3ClinianPair.map(
		([elsaTop10, _]) => elsaTop10
	);
	const clinicianLists = elsaTop3ClinianPair.map(
		([_, clinicianTop10]) => clinicianTop10
	);

	const top3ElsaPicks = _.countBy(
		elsaTop3Lists
			// @ts-ignore
			.reduceRight((d, c) => [...d, ...c])
	);

	const clinicianPicks = _.countBy(
		clinicianLists
			// @ts-ignore
			.reduceRight((d, c) => [...d, ...c])
	);

	const patientsOnARV = new Set(
		arvMedications
			.map((m) => {
				return m.subject.id;
			})
			.values()
	).size;

	return {
		district: {
			transferedPatient: patients.filter((patient) => {
				const link = patient.link;

				if (link === null) {
					return false;
				}

				return link.type === "replaced-by";
			}),
			totalPatients: patients.count(),
			visitsWithInMonth: visits.map(cDate).filter(isWithInMonth).count(),
			appointmentsWithInMonth: appointments
				.map(cDate)
				.filter(isWithInMonth)
				.count(),
			patientsWithInMonth: patients
				.map(cDate)
				.filter(isWithInMonth)
				.count(),
			totalVisits: visits.count(),
			totalAppointments: appointments.count(),
			missedAppointments: appointments
				.filter(isMissedAppointment)
				.count(),
			upcomingAppointments: appointments
				.filter(isUpcomingAppointment)
				.count(),
			lostToFollowUpPatients: 0,
			patientsTransferred: 0,
			nonTransferredPatientsPickMedsElsewhere: 0,
			totalSymptomAssessments: symptomAssessment.count(),
			// patientsFrom(data).map(s => s |> dateField(s) |> isWithInMonth(%))
		},
		// to be done
		arv: {
			totalAdministered: arvMedications.count(),
			patientsOnARV,
			groups: ARV.class.pairs().map(([s, x]) => {
				const ac = arvMedications
					.filter((f) => {
						if (f.medication.resourceType === "Medication") {
							return f.medication.data.class === s;
						}

						// skip those you can't see
						return false;
					})
					.map((d) => d.subject.id)
					.toSet().size;
				return [s, x, ac];
			}),
		},
		top10s: {
			presentingSymptoms: iList<[string, number]>(
				Object.entries(
					_.countBy(
						symptomAssessment
							.map((s) => {
								if (s.result.resourceType === "Observation") {
									return s.result;
								}

								return null;
							})
							.filter((s) => s !== null)
							.map(
								(s) =>
									s?.data.data.present.map((s) => s.id) || []
							)
							// @ts-ignore
							.reduceRight((a, b) => [...a, ...b])
					)
				)
			)
				.map(([sym, freq]) => {
					return [
						sym,
						Symptom.locale("en").api.fromKey(sym as Symptom).name ??
							sym,
						freq,
					];
				})
				.sortBy((s) => -s[2])
				.slice(0, 10)
				.toArray() as [Symptom, string, number][],
			topDiseaseWithElsaTop3: iList<[string, number]>(
				Object.entries(top3ElsaPicks)
			)
				.map(([inv, freq]) => {
					return [
						inv,
						Condition.fromKey(inv as Condition) ?? inv,
						freq,
					];
				})
				.sortBy((s) => -s[2])
				.slice(0, 10)
				.toArray() as [Condition, string, number][],
			topDiseasesWithinClinician: iList<[string, number]>(
				Object.entries(clinicianPicks)
			)
				.map(([inv, freq]) => {
					return [
						inv,
						Condition.fromKey(inv as Condition) ?? inv,
						freq,
					];
				})
				.sortBy((s) => -s[2])
				.slice(0, 10)
				.toArray() as [Condition, string, number][],
			investigationsRequested: iList<[string, number]>(
				Object.entries(invRqs)
			)
				.map(([inv, freq]) => {
					return [
						inv,
						Investigation.name.fromKey(inv as Investigation) ?? inv,
						freq,
					];
				})
				.sortBy((s) => -s[2])
				.slice(0, 10)
				.toArray() as [Investigation, string, number][],
			medicationsRequested: iList<[string, number]>(
				Object.entries(standardMedicationReq)
			)
				.map(([med, freq]) => {
					return [
						med,
						Medication.all.fromKey(med as Medication.All) ?? med,
						freq,
					];
				})
				.sortBy((s) => -s[2])
				.slice(0, 10)
				.toArray() as [Medication.All, string, number][],
		},
		facilities: facilities().map(({ uid, ...f }) => {
			const patients_ = patients.filter(
				(p) => p.id.slice(0, 8) === f.facilityCode
			);
			return {
				id: uid,
				...f,
				totalPatients: patients_.count(),
				totalPatientWithInMonths: patients_
					.map(cDate)
					.filter(isWithInMonth)
					.count(),
				lostToFollowUpPatients: 0,
				missingAppointments: appointments
					.filter(
						(appt) =>
							// this is used temporarily
							// @ts-ignore
							appt.subject.id.slice(0, 8) === f.facilityCode
					)
					.filter(isMissedAppointment)
					.count(),
				users: [],
				lastActivity: new Date(),
			};
		}),
	};
}

// boolean-fns

const belongsInFacility = (facilityCode: string) => (data: PatientPair) => {
	return data[1].id.slice(0, 8) === facilityCode;
};

export const isApptResponded = (appt: Appointment) => {
	return appt.response !== null;
};

export const isMissedAppointment = (appt: Appointment) => {
	return (
		!isApptResponded(appt) &&
		isBefore(cDate(appt), new Date()) &&
		differenceInDays(new Date(), cDate(appt)) <= 3
	);
};

export const isUpcomingAppointment = (appt: Appointment) => {
	return !isApptResponded(appt) && isBefore(new Date(), cDate(appt));
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

export const cDate = (data: Resource<string, Data>) => new Date(data.createdAt);
export const isWithInMonth = (date: Date) => {
	return differenceInCalendarMonths(new Date(), date) === 0;
};
export const getYYYY_MM = (date: Date) => format(date, "yyyy-MM");

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

export function array(iter: any) {
	return Array.from(iter);
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
