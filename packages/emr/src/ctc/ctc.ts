/**
 * Creates the visit as well as the
 * information associated with building a new
 * visit
 */

import { Medication as MD, Investigation } from "elsa-health-data-fns";
import {
	AppointmentRequest,
	AppointmentResponse,
	Medication,
	MedicationRequest,
	refer,
	reference,
	Visit,
} from "../object";
import { concat, date, getDateFromDMYFormat, utcDateString } from "../utils";
import * as t from "../../health.types/v1";
import { Data, DDMMYYYYDateString } from "../../health.types/v1/_primitives";

import * as ctc from "./ctc.types";
import produce from "immer";
import { WritableDraft } from "immer/dist/internal";

import isEqual from "lodash.isequal";

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

	// 2. Create visit object
	const visit = Visit<ctc.Visit>({
		id: generateId(),
		date: utcDateString(getDateFromDMYFormat(data.dateOfVisit)),
		subject: patientReference(patientId),
		practitioner: reference("Practitioner", doctorId),
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

	return { updatedVisit, medicationRequests };
}
