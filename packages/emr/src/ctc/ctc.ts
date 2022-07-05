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
		MedicationRequest({
			id: generateId(),
			authoredOn: utcDateString(),
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
		appintmentResponse: apptResp,
		medicationRequests,
	};
}

export function editDataFromSimpleVisit(data: Partial<SimpleVisitData>) {
	// ...
}
