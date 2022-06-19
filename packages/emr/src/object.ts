import invariant from "invariant";

import type { Organization, P, StockRecord } from "../health.types/v1";
import * as t from "../health.types/v1";
import {
	DDMMYYYYDateString,
	Nullable,
	UTCDateTimeString,
	YYYYMMDDDateString,
} from "../health.types/v1/_primitives";
import {
	date,
	extend,
	freeze,
	MustHave,
	normalizeToNull,
	resource,
	resourceItem,
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
	d: MustHave<M, "identifier" | "form">
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
				ingredients: (d.ingredients ?? []).map(Ingredient),
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
		typeof d.count === "number" ? d.count > 0 : d.count,
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
>(d: MustHave<MR, "id" | "subject" | "authoredOn" | "medication">) {
	invariant(d.id, "Medication Request id missing");
	invariant(d.subject, `Subject associated with ${d.id} is not defined`);
	invariant(
		d.authoredOn,
		`'authoredOn' missing. Author date for medication request [${d.id}] was made is missing.`
	);

	return freeze(
		extend(d, {
			id: d.id,
			resourceType: "MedicationRequest",
			code: d.code ?? null,
			authoredOn: date(d.authoredOn).toUTCString(),
			createdAt: date(d.createdAt).toUTCString(),
			isActive: d.isActive ?? true,
			route: d.route ?? null,
			method: d.method ?? null,
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
>(d: MustHave<MD, "id" | "authorizingRequest" | "medication" | "supplier">) {
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
			supplier: d.supplier,
		}) as MD
	);
}
