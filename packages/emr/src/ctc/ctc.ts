/**
 * Creates the visit as well as the
 * information associated with building a new
 * visit
 */

import { Medication as MD, Investigation } from "elsa-health-data-fns/lib";
import {
	AppointmentRequest,
	AppointmentResponse,
	InvestigationRequest,
	Medication,
	MedicationRequest,
	Patient,
	refer,
	reference,
	Visit,
} from "../object";
import {
	concat,
	convertDMYToDate,
	date,
	getDateFromDMYFormat,
	getIfTrue,
	runIfNotUnd,
	text,
	utcDateString,
} from "../utils";
import * as t from "../../health.types/v1";
import { Data, DDMMYYYYDateString } from "../../health.types/v1/_primitives";

import * as ctc from "./ctc.types";
export * from "./ctc.types";

import produce from "immer";
import { WritableDraft } from "immer/dist/internal";

import isEqual from "lodash.isequal";
import * as z from "zod";
import * as D from "date-fns";
import * as R from "ramda";

export type SimpleVisitData = {
	// regimenDecision: string;
	// decisionReason: CTC.Status;
	arvRegimens: t.Medication<Data>[];
	regimenDuration: "30-days" | "60-days" | "90-days";
	medications: MD.All[];
	appointmentDate: string;
	investigations: Investigation[];
	dateOfVisit: DDMMYYYYDateString;

	/**
	 * Appointment associated with this visit
	 */
	appointmentId: null | string;
	visitType: "home" | "community";
};

export const patientReference = (id: string) => reference("Patient", id);

/**
 * This creates the visit and the associated information
 * TODO: include investigation information
 *
 * @param generateId
 * @param patientId
 * @param doctorId
 * @param data
 * @returns
 */
export function createDataForSimpleVisit(
	generateId: () => string,
	patientId: string,
	doctorId: string,
	data: SimpleVisitData
) {
	// 1. Medication Creation
	// create arv medication requests
	const arvsRqs = data.arvRegimens.map((med) =>
		MedicationRequest<ctc.MedicationRequest>({
			id: generateId(),
			authoredOn: utcDateString(),
			// @ts-ignore
			medication: med,
			subject: patientReference(patientId),
			supplyInquiry: null,
		})
	);

	// create medication requests for standard medications
	const standardMedRqs = data.medications.map((medTxt) =>
		MedicationRequest({
			id: generateId(),
			authoredOn: utcDateString(),
			medication: Medication({
				form: null,
				identifier: medTxt.toString(),
			}),
			supplyInquiry: null,
			subject: patientReference(patientId),
		})
	);

	// medication requests
	const medicationRequests = concat(arvsRqs, standardMedRqs);

	// 1.5 Create appointment response object
	let apptResp = null;
	if (data.appointmentId !== null) {
		apptResp = AppointmentResponse({
			authorizingAppointmentRequest: reference(
				"AppointmentRequest",
				data.appointmentId
			),
			id: `${generateId()}`,
			actors: [
				patientReference(patientId),
				reference("Practitioner", doctorId),
			],
		});
	}

	// create investigation requests
	const investigationRequests = data.investigations
		.map((inv) => ({
			// @ts-ignore
			shape: Investigation.fromKey(inv) ?? null,
			identifier: inv,
		}))
		// skip those whose share aren't supported
		.filter((s) => s.shape !== null)
		.map((x) =>
			InvestigationRequest<ctc.InvestigationRequest>({
				id: generateId(),
				data: {
					investigationId: x.identifier,
					obj: x.shape,
				},
				subject: patientReference(patientId),
				requester: practitionerReference(doctorId),
			})
		);

	// 2. Create visit object
	const visit = Visit<ctc.Visit>({
		id: generateId(),
		date: utcDateString(getDateFromDMYFormat(data.dateOfVisit)),
		subject: patientReference(patientId),
		practitioner: reference("Practitioner", doctorId),
		investigationRequests: [],
		extendedData: data,
		prescriptions: medicationRequests.map((v) => refer(v)),
		associatedAppointmentResponse: apptResp,
	});

	// 3. create appointment request
	const appointmentRequest = AppointmentRequest<ctc.AppointmentRequest>({
		id: generateId(),
		appointmentDate: utcDateString(
			getDateFromDMYFormat(data.appointmentDate)
		),
		participants: [
			patientReference(patientId),
			reference("Practitioner", doctorId),
		],
		reason: "Created as next appointment from visit",
		description: "Auto-created appointment from a Visit",
		visit: reference("Visit", visit.id),
	});

	// objects to store
	return {
		visit,
		appointmentRequest,
		appointmentResponse: apptResp,
		medicationRequests,
		investigationRequests,
	};
}

export function editDataFromSimpleVisit(
	generateId: () => string,
	patientId: string,
	doctorId: string,
	data: Partial<SimpleVisitData>,
	visit: ctc.Visit
) {
	const prevData: SimpleVisitData = visit.extendedData;

	// 3. create appointment request
	let appointmentRequest = null;

	// if date is different, create a new appointmentDate
	if (data.appointmentDate !== undefined) {
		if (!isEqual(data.appointmentDate, prevData.appointmentDate)) {
			appointmentRequest = AppointmentRequest<ctc.AppointmentRequest>({
				id: generateId(),
				appointmentDate: utcDateString(
					getDateFromDMYFormat(data.appointmentDate)
				),
				participants: [
					patientReference(patientId),
					reference("Practitioner", doctorId),
				],
				reason: "Created as next appointment from visit",
				description: "Auto-created appointment from a Visit",
				visit: reference("Visit", visit.id),
			});
		}
	}

	// 2. add medication requests
	const medicationRequests: t.MedicationRequest<any>[] = [];
	if (data.arvRegimens !== undefined) {
		//
		data.arvRegimens
			.filter(
				(med) =>
					// medication not in the thing
					!prevData.arvRegimens
						.map((d) => d.identifier)
						.includes(med.identifier)
			)
			.forEach((med) => {
				medicationRequests.push(
					MedicationRequest<ctc.MedicationRequest>({
						id: generateId(),
						authoredOn: utcDateString(),
						// @ts-ignore
						medication: med,
						subject: patientReference(patientId),
						supplyInquiry: null,
					})
				);
			});
	}

	if (data.medications !== undefined) {
		data.medications
			.filter(
				(med) =>
					// medication not in the thing
					!prevData.medications.includes(med)
			)
			.forEach((medtxt) =>
				medicationRequests.push(
					MedicationRequest({
						id: generateId(),
						authoredOn: utcDateString(),
						medication: Medication({
							form: null,
							identifier: medtxt.toString(),
						}),
						supplyInquiry: null,
						subject: patientReference(patientId),
					})
				)
			);
	}

	let investigationRequests = null;
	if (data.investigations !== undefined) {
		investigationRequests = data.investigations
			.filter(
				(inv) =>
					// medication not in the thing
					!prevData.investigations.includes(inv)
			)
			.map((inv) => ({
				// @ts-ignore
				shape: Investigation.fromKey(inv) ?? null,
				identifier: inv,
			}))
			// skip those whose share aren't supported
			.filter((s) => s.shape !== null)
			.map((x) =>
				InvestigationRequest<ctc.InvestigationRequest>({
					id: generateId(),
					data: {
						investigationId: x.identifier,
						obj: x.shape,
					},
					subject: patientReference(patientId),
					requester: practitionerReference(doctorId),
				})
			);
	}

	// updated visit
	const updatedVisit = produce(
		Visit<ctc.Visit>(visit),
		(v: WritableDraft<ctc.Visit>) => {
			// partial update
			v.extendedData = produce(
				v.extendedData,
				(f: WritableDraft<SimpleVisitData>) => {
					Object.entries(data).forEach(([k, v]) => {
						// @ts-ignore
						f[k] = v;
					});
				}
			);
		}
	);

	return {
		updatedVisit,
		medicationRequests,
		investigationRequests,
		appointmentRequest,
	};
}

export const PatientFormType = z.object({
	patientId: z.string(),
	firstName: z.string(),
	familyName: z.string(),
	phoneNumber: z.string(),
	resident: z.string(),

	dateOfBirth: z.string(),
	maritalStatus: z.string(),

	// HIV+ status
	hasPositiveTest: z.boolean(),
	dateOfTest: z.string().optional(),

	// ARVs
	hasPatientOnARVs: z.boolean(),
	dateStartedARVs: z.string().optional(),

	// WHO
	whoStage: z.string(),

	hasTreatmentSupport: z.boolean(),
	typeOfSupport: z.string().optional(),

	sex: z.union([z.literal("male"), z.literal("female")]),
});

export type PatientFormType = z.infer<typeof PatientFormType>;

const convertDMYToYMD = R.pipe(convertDMYToDate, (d) =>
	D.format(d, "yyyy-MM-dd")
);

/**
 * Register new patient and create the needed objects
 * @param from
 * @param registeredOrganization
 * @param createdAt
 * @returns
 */
export function registerNewPatient(
	generateId: () => string,
	from: PatientFormType,
	doctorId: string,
	investigations: Investigation[] | null,
	registeredOrganization: ctc.Organization,
	createdAt: Date = new Date()
) {
	// validates that the content is in the specified format
	PatientFormType.parse(from);

	const address = text(from.resident);
	const info = {
		firstName: text(from.firstName),
		familyName: text(from.familyName),
		phoneNumber: text(from.phoneNumber),
		address: address !== null ? `District ${address}` : address,
	};

	const contact = {
		phoneNumber: text(from.phoneNumber),
		email: null,
	};

	const data = {
		hasPositiveStatus: from.hasPositiveTest,
		hasTreatmentSupport: from.hasTreatmentSupport,
		isCurrentlyOnARV: from.hasPatientOnARVs,
	};

	// patient object
	const patient = Patient<ctc.Patient>({
		id: from.patientId,
		resourceType: "Patient",
		code: null,
		createdAt: createdAt.toUTCString(),

		info: Object.values(info).every((d) => d === null) ? null : info,
		active: true,

		contact: Object.values(contact).every((d) => d === null)
			? null
			: contact,
		sex: from.sex,
		maritalStatus: from.maritalStatus,
		link: null,
		communication: {
			language: "en",
		},
		birthDate: convertDMYToYMD(from.dateOfBirth),
		managingOrganization: registeredOrganization,
		extendedData: {
			...data,
			dateOfHIVPositiveTest: getIfTrue(
				data.hasPositiveStatus,
				runIfNotUnd(text(from.dateOfTest) ?? undefined, convertDMYToYMD)
			),
			dateOfStartARV: getIfTrue(
				data.isCurrentlyOnARV,
				runIfNotUnd(
					text(from.dateStartedARVs) ?? undefined,
					convertDMYToYMD
				)
			),
			typeOfSupport: getIfTrue(
				data.hasTreatmentSupport,
				from.typeOfSupport
			),
			whoStage: from.whoStage ?? null,
		},
	});

	let adhocVisit: null | ctc.Visit = null;
	// include adhoc visit if there are investigationRequests
	if ((investigations ?? []).length > 0) {
		adhocVisit = Visit<ctc.Visit>({
			id: generateId(),
			date: utcDateString(new Date()),
			subject: patientReference(from.patientId),
			practitioner: reference("Practitioner", doctorId),
			investigationRequests: [],
			extendedData: null,
			prescriptions: [],
			associatedAppointmentResponse: null,
		});
	}

	// other information created during the registration
	const investigationRequests = (investigations ?? []).map((inv) => {
		return InvestigationRequest<ctc.InvestigationRequest>({
			id: generateId(),
			requester: practitionerReference(doctorId),
			subject: patientReference(patient.id),
			data: {
				investigationId: inv,
				// @ts-ignore
				obj: Investigation.fromKey(inv) ?? null,
			},
		});
	});

	return { patient, investigationRequests, adhocVisit };
}

const practitionerReference = (id: string) => reference("Practitioner", id);
