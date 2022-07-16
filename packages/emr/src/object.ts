import invariant from "tiny-invariant";

import type { Organization, P } from "../health.types/v1";
import * as t from "../health.types/v1";
import { Nullable } from "../health.types/v1/_primitives";
import {
	date,
	extend,
	freeze,
	MustHave,
	normalizeToNull,
	resourceItem,
	utcDateString,
} from "./utils";

const partial = <M extends P.Mapping<string, P.Data>, F>(
	obj: M | null = null,
	fn?: (item: M) => F
) => {
	if (obj === null) {
		return null;
	}

	const out = Object.keys(obj).length === 0 ? null : obj;
	if (fn !== undefined) {
		if (out === null) {
			return fn(obj);
		}
	}
	return out;
};

const nullable = <T>(d?: T) => d ?? null;

export function Patient<P extends t.Patient>(
	d: MustHave<P, "id" | "sex" | "birthDate">
) {
	// assertions
	invariant(d.birthDate, "Patient's birth-date is undefined");
	invariant(d.sex, "Patient Sex is undefined");
	invariant(d.id, "Patient ID is missing");

	return freeze(
		extend(d, {
			id: d.id,
			code: d.code ?? null,
			extendedData: d.extendedData ?? null,
			info: partial(d.info),
			maritalStatus: d.maritalStatus ?? null,
			resourceType: "Patient",
			active: d.active ?? true,
			managingOrganization: d.managingOrganization ?? null,
			contact: partial(d.contact),
			communication: partial(d.communication),
			birthDate: d.birthDate,
			createdAt: date(d.createdAt).toUTCString(),
			sex: d.sex,
			link: null,
		}) as P
	);
}

export function Practitioner<Pt extends t.Practitioner>(
	d: MustHave<Pt, "id" | "name" | "organization">
) {
	invariant(d.id, "Practitioner Id missing");
	invariant(d.name, "Name of practitioner is missing");
	invariant(
		d.organization,
		`Practitioner [${d.id}] associated organization missing`
	);

	return freeze(
		extend(d, {
			id: d.id,
			code: d.code ?? null,
			resourceType: "Practitioner",
			createdAt: date(d.createdAt).toUTCString(),
			active: d.active ?? true,
			address: d.address ?? null,
			contact: partial(d.contact),
			communication: partial(d.communication),
			organization: d.organization,
			gender: d.gender ?? "unknown",
			name: d.name,
			birthDate: d.birthDate ?? null,
			serviceProvider: null,
			// NOTE: find out why you had to do this
		}) as unknown as Pt
	);
}

export function Visit<V extends t.Visit>(
	d: MustHave<V, "subject" | "date" | "id">
) {
	return freeze(
		extend(d, {
			id: d.id,
			code: d.code ?? null,
			createdAt: date(d.createdAt).toUTCString(),
			date: date(d.date).toUTCString(),
			subject: d.subject,
			practitioner: d.practitioner ?? null,
			assessments: d.assessments ?? [],
			prescriptions: d.prescriptions ?? [],
			investigationRequests: d.investigationRequests ?? [],
			extendedData: d.extendedData ?? null,
			associatedAppointmentResponse:
				d.associatedAppointmentResponse ?? null,
		} as unknown as V)
	);
}

export function Ingredient(d: { identifier: string; text?: string }) {
	return resourceItem<
		"Ingredient",
		{ identifier: string; text: P.Nullable<string> }
	>("Ingredient", {
		identifier: d.identifier,
		text: d.text ?? null,
	});
}

export function Medication<M extends t.Medication<string>>(
	d: MustHave<M, "identifier" | "form">,
	ingredient: typeof Ingredient = Ingredient
) {
	invariant(
		d.identifier,
		"Medication identifier missing; It has to be something ot identify the medication (irregardless of form)"
	);
	return freeze(
		extend(
			d,
			resourceItem("Medication", {
				identifier: d.identifier,
				category: d.category ?? null,
				form: d.form ?? null,
				alias: d.alias ?? d.identifier,
				ingredients: (d.ingredients ?? []).map(ingredient),
			})
		) as M
	);
}

export function Stock<
	S extends t.StockRecord<
		t.Medication<string>,
		P.Mapping<string, P.Data>,
		t.Organization,
		P.Mapping<string, P.Data> | null
	>
>(d: MustHave<S, "id" | "medication" | "count" | "expiresAt">) {
	invariant(d.id, "id for medication stock required");
	invariant(d.medication, "Medication requireds");
	invariant(
		typeof d.count === "number" ? d.count >= 0 : d.count,
		"Medication stock count must be indicated"
	);
	invariant(d.expiresAt, "Medication expiring date must be indicated");

	return freeze(
		extend(d, {
			id: d.id,
			resourceType: "Medication.StockRecord",
			medication: d.medication,
			code: d.code ?? null,
			count: d.count,
			concentration: d.concentration,
			createdAt: date(d.createdAt).toUTCString(),
			expiresAt: date(d.expiresAt).toUTCString(),
			extendedData: partial(d.extendedData),
			lastUpdatedAt: date(d.lastUpdatedAt).toUTCString(),
			managingOrganization: d.managingOrganization,
		}) as S
	);
}

export function MedicationRequest<
	MR extends t.MedicationRequest<t.Medication<string>>
>(
	d: MustHave<
		MR,
		"id" | "subject" | "authoredOn" | "medication" | "supplyInquiry"
	>
) {
	invariant(d.id, "Medication Request id missing");
	invariant(d.subject, `Subject associated with ${d.id} is not defined`);
	invariant(
		d.supplyInquiry !== null ? d.supplyInquiry : true,
		`Supply information missing for [${d.id}]. Set 'null' or 'undefined' if ther is not information`
	);
	invariant(
		d.authoredOn,
		`'authoredOn' missing. Author date for medication request [${d.id}] was made is missing.`
	);

	return freeze(
		extend(d, {
			id: d.id,
			resourceType: "MedicationRequest",
			code: d.code ?? null,
			authoredOn: utcDateString(d.authoredOn),
			createdAt: utcDateString(d.createdAt),
			isActive: d.isActive ?? true,
			route: d.route ?? null,
			method: d.method ?? null,
			supplyInquiry: d.supplyInquiry ?? null,
			instructions: d.instructions ?? null,
			medication: d.medication,
			reason: d.reason ?? null,
			requester: d.requester ?? null,
			subject: d.subject,
		}) as MR
	);
}

export function MedicationDispense<
	MD extends t.MedicationDispense<t.MedicationRequest<t.Medication<string>>>
>(d: MustHave<MD, "id" | "authorizingRequest" | "medication">) {
	invariant(d.id, "Medication Dispense id missing");
	invariant(d.authorizingRequest, "Medication authorizingRequest required");
	invariant(d.medication, "medication required");

	return freeze(
		extend(d, {
			id: d.id,
			resourceType: "MedicationDispense",
			code: d.code ?? null,
			authorizingRequest: d.authorizingRequest,
			createdAt: date(d.createdAt).toUTCString(),
			medication: d.medication,
			dosageAndRate: normalizeToNull(
				[
					"count",
					"doseQuantity",
					"doseRange",
					"rateQuantity",
					"rateRatio",
					"type",
				],
				d.dosageAndRate ?? {}
			),
			supplier: d.supplier ?? null,
		}) as MD
	);
}

export function Organization<Org extends t.Organization<P.Data, P.Data>>(
	d: MustHave<Org, "name" | "id" | "identifier">
) {
	invariant(d.id, "Organization ID missing");
	invariant(d.identifier, "Organization identifier missing");
	invariant(d.name, "Organization name missing");

	return freeze(
		extend(d, {
			id: d.id,
			active: d.active ?? true,
			associatedOrganization: d.associatedOrganization ?? null,
			code: d.code ?? null,
			createdAt: date(d.createdAt).toUTCString(),
			email: d.email ?? null,
			extendedData: d.extendedData ?? null,
			identifier: d.identifier,
			name: d.name,
			phoneNumber: d.phoneNumber ?? null,
			resourceType: "Organization",
		} as Org)
	);
}

export function HealthcareService<
	HS extends t.HealthcareService<string, P.Data>
>(d: MustHave<HS, "name">) {
	invariant(d.name, "Healthcare name missing");

	return freeze(
		extend(d, {
			active: d.active ?? true,
			extendedData: d.extendedData ?? null,
			name: d.name,
			resourceItemType: "HealthcareService",
			resourceType: "ResourceItem",
		} as HS)
	);
}

export function Observation<Obs extends t.Observation>(
	d: MustHave<Obs, "data">
) {
	invariant(d.data, "Obaservation `data` field missing");

	return freeze(
		extend(d, {
			data: d.data,
			reason: d.reason ?? null,
			referenceRange:
				(d.referenceRange?.base ?? null) !== null
					? partial(d.referenceRange)
					: null,
			resourceItemType: "Observation",
			resourceType: "ResourceItem",
		} as Obs)
	);
}

export function AppointmentRequest<ARq extends t.AppointmentRequest>(
	d: MustHave<ARq, "appointmentDate" | "id" | "participants">
) {
	invariant(d.id, "Appointment request `id` field missing");
	invariant(
		d.appointmentDate,
		"Appointment request `appointmentDate` field missing"
	);
	return freeze(
		extend(d, {
			id: d.id,
			visit: d.visit ?? null,
			appointmentDate: d.appointmentDate,
			code: d.code ?? null,
			createdAt: date(d.createdAt).toUTCString(),
			description: d.description ?? null,
			reason: d.reason ?? null,
			participants: d.participants ?? [],
			resourceType: "AppointmentRequest",
		} as unknown as ARq)
	);
}

export function AppointmentResponse<ARs extends t.AppointmentResponse>(
	d: MustHave<ARs, "authorizingAppointmentRequest" | "id" | "actors">
) {
	invariant(d.id, "Appointment response `id` field missing");

	return freeze(
		extend(d, {
			id: d.id,
			authorizingAppointmentRequest: d.authorizingAppointmentRequest,
			code: d.code ?? null,
			comment: d.comment ?? null,
			startTime: d.startTime ?? 0,
			endTime: d.endTime ?? 0,
			createdAt: date(d.createdAt).toUTCString(),
			resourceType: "AppointmentResponse",
			actors: d.actors ?? [],
		} as unknown as ARs)
	);
}

export function InvestigationRequest<IRq extends t.InvestigationRequest>(
	d: MustHave<IRq, "id" | "data" | "subject">
) {
	invariant(d.id, "Investigation request `id` field missing");
	invariant(d.subject, "Investigation request `subject` field missing");
	invariant(d.data, "Investigation request `data` field missing");

	return freeze(
		extend(d, {
			id: d.id,
			code: d.code ?? null,
			createdAt: date(d.createdAt).toUTCString(),
			data: d.data,
			requester: d.requester ?? null,
			resourceType: "InvestigationRequest",
			subject: d.subject,
		} as IRq)
	);
}

export function InvestigationResult<
	IRs extends t.InvestigationResult<P.Data, P.Data, t.InvestigationRequest>
>(
	d: MustHave<
		IRs,
		"id" | "authorizingRequest" | "observation" | "shape" | "lastUpdatedAt"
	>
) {
	invariant(d.id, "Investigation result `id` field missing");
	invariant(
		d.authorizingRequest,
		"Investigation request `authorizingRequest` field missing"
	);
	invariant(
		d.observation,
		"Investigation request `observation` field missing"
	);
	invariant(d.shape, "Investigation request `shape` field missing");
	invariant(
		d.lastUpdatedAt,
		"Investigation request `lastUpdatedAt` field missing"
	);

	return freeze(
		extend(d, {
			id: d.id,
			authorizingRequest: d.authorizingRequest,
			code: d.code ?? null,
			createdAt: date(d.createdAt).toUTCString(),
			observation: d.observation,
			recorder: d.recorder ?? null,
			lastUpdatedAt: date(d.lastUpdatedAt).toUTCString(),
			shape: d.shape,

			resourceType: "InvestigationResult",
		} as IRs)
	);
}

export function Report<Rp extends t.Report<string>>(
	d: MustHave<Rp, "code" | "reportCode" | "id" | "subject" | "result">
) {
	invariant(d.id, "Report `id` field missing");
	invariant(d.code, "Report `code` field missing");
	invariant(d.reportCode, "Report `reportCode` field missing");
	invariant(d.subject, "Report `subject` field missing");
	invariant(d.result, "Report `result` field missing");

	return freeze(
		extend(d, {
			code: d.code,
			id: d.id,
			createdAt: date(d.createdAt).toUTCString(),
			reportCode: d.reportCode,
			subject: d.subject,
			reporter: d.reporter ?? null,
			resourceType: "Report",
			result: d.result,
		} as Rp)
	);
}

export const Assessment = <Ast extends t.Assessment>(
	d: MustHave<Ast, "code" | "id" | "subject" | "result">
) => Report<Ast>({ ...d, reportCode: "assessment" });

export function refer<RF extends string, R extends P.Resource<RF, P.Data>>(
	r: R,
	useId: boolean = true,
	// @ts-ignore
	fn?: (r: R) => P.Mapping<string, P.Data> = (r) => ({ id: r.id })
): P.ReferenceIdentifier<RF> {
	if (useId) {
		return {
			// @ts-ignore
			resourceReferenced: r.resourceType,
			resourceType: "Reference",
			// @ts-ignore
			id: r.id,
		};
	}

	return {
		// @ts-ignore
		resourceReferenced: r.resourceType,
		resourceType: "Reference",
		// @ts-ignore
		data: fn(r),
	};
}

export function reference<RF extends string>(
	referenceType: RF,
	id: string
): P.ReferenceIdentifier<RF> {
	return {
		resourceType: "Reference",
		resourceReferenced: referenceType,
		id,
	};
}
