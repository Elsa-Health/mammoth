import { Assessment, Visit } from "./v1/visit";
import { Observation } from "./v1/observation";

import _ from "lodash";
import { Patient, Practitioner } from "./v1/personnel";
import {
	Investigation,
	InvestigationRequest,
	InvestigationResult,
	Report,
} from "./v1/investigation";
import {
	Appointment,
	AppointmentRequest,
	AppointmentResponse,
} from "./v1/appointment";
import {
	Medication,
	MedicationDispense,
	MedicationRequest,
} from "./v1/prescription";

import CTC from "./ctc.v0";
import { differenceInDays, isBefore } from "date-fns";

type Id = string | (() => string);

export function convert_v0_patient_to_v1(id: string, data: CTC.Patient) {
	return resource(
		{
			info: {
				name: `${data.firstName} ${data.lastName}`.trim(),
				address: `District: ${data.district}`,
			},
			contact: {
				phoneNumber: data.phoneNumber,
				email: null,
			},
			sex: data.sex,
			birthDate: data.dateOfBirth,
			maritalStatus: data.maritalStatus,
			communicaton: {
				language: "en",
			},
			extendedData: _.pick(data, [
				"dateOfHIVPositive",
				"hasPatientOnARVs",
				"dateStartedARVs",
				"hasTreatmentSupport",
				"typeOfSupport",
			]),
		},
		{
			id,
			resourceType: "Patient",
			createdAt: new Date(data.registeredDate),
		}
	) as Patient<{
		dateOfHIVPositive?: YYYYMMDDDate;
		hasPatientOnARVs: boolean;
		dateStartedARVs?: YYYYMMDDDate;
		hasTreatmentSupport: boolean;
		typeOfSupport?: string;
	}>;
}

// export function convert_v0_investigation_to_v1(
// 	id: string,
// 	invd: {
// 		investigationId: string;
// 		obj: {
// 			type: string;
// 			units: string;
// 		};
// 		result?: string;
// 	},
// 	generateId: () => string,
// 	ref?: {
// 		patientId: string;
// 	}
// ) {

// 	const { result, ...head } = invd;
// 	return resource(
// 		{
// 			subject:
// 				ref !== undefined
// 					? _reference({
// 							resourceType: "Patient",
// 							id: ref.patientId,
// 					  })
// 					: null,
// 			request: referred(
// 				resource(
// 					{
// 						data: head,
// 						requester: null,
// 					},
// 					{
// 						id: generateId,
// 						resourceType: "InvestigationRequest",
// 					}
// 				),
// 				"object"
// 			),
// 			result:
// 				result !== undefined
// 					? referred(
// 							resource(
// 								{
// 									recorder: null,
// 									observation: referred(
// 										observation(result, { id: generateId }),
// 										"object"
// 									),
// 								},
// 								{
// 									id: generateId,
// 									resourceType: "InvestigationResult",
// 								}
// 							),
// 							"object"
// 					  )
// 					: null,
// 		},
// 		{
// 			id,
// 			resourceType: "Investigation",
// 		}
// 	) as Investigation;
// }

export function convert_v0_appointment_to_v1(
	id: string,
	appt: CTC.Appointment
): Appointment {
	const patient = _reference({
		id: appt.patientId,
		resourceType: "Patient",
	});

	const appointmentRequest: AppointmentRequest = resource(
		{
			participants: [patient],
			reason: "",
			description: "This meeting was automatically created by Elsa CTC",
			visit: _reference({
				id: appt.visitIdCreated,
				resourceType: "Visit",
			}),
		},
		{
			id: `appt-request:${id}`,
			resourceType: "AppointmentRequest",
			createdAt: new Date(appt.date),
		}
	);

	const appointmentResponse: AppointmentResponse | null =
		appt.visitIdFullfilled !== undefined
			? resource(
					{
						visit: _reference({
							id: appt.visitIdFullfilled,
							resourceType: "Visit",
						}),
						startTime: 0,
						endTime: 0,
						actors: [patient],
						comment: "",
					},
					{
						id: `appt-response:${id}`,
						resourceType: "AppointmentResponse",
						createdAt:
							appt.fulfilledDate !== undefined
								? new Date(appt.fulfilledDate)
								: new Date(),
					}
			  )
			: null;

	return resource(
		{
			subject: patient,
			request: appointmentRequest,
			response: appointmentResponse,
		},
		{
			id: id,
			resourceType: "Appointment",
			createdAt: new Date(appt.date),
		}
	);
}

// 	/**
// 	 * Response for the appointment to be created
// 	 */
// 	//   const appointmentResponse = resource(
// 	//     {},
// 	//     {
// 	//       id: d.apptResponseId,
// 	//       resourceType: 'AppointmentResponse',
// 	//     },
// 	//   );

// 	const appointment = resource(
// 		{
// 			visitOrigin: _reference({
// 				id: appt.visitIdCreated,
// 				resourceType: "Visit",
// 			}),
// 			request: referred(appointmentRequest, "object"),
// 			response: null,
// 		},
// 		{
// 			id: id,
// 			resourceType: "Appointment",
// 		}
// 	) as Appointment;

// 	return { appointment, appointmentRequest };
// }

export function convert_v0_visit_to_v1(
	id: string,
	v0Visit: CTC.Visit,
	generators: {
		observationId: () => string;
		assessmentId: () => string;
	}
) {
	const patient_ = patient({
		id: v0Visit.patientId,
		birthDate: "NILL",
		preferredLanguage: "en",
		sex: "male",
	});

	// const practitioner_ = practitioner({
	// 	id: "NILL",
	// 	name: "NILL",
	// 	gender: "unknown",
	// 	createdAt: new Date(),
	// 	preferredLanguage: "en",
	// 	address: "NILL",
	// });
	const ref = {
		subject: referred(patient_, "reference"),
		reporter: null, //referred(practitioner_, "reference"),
	};

	/**
	 * Assessment related data
	 */
	const assessments_ = new Map<string, Data>();
	assessments_.set("intake", v0Visit.intake);

	if (v0Visit.symptomAssessment !== undefined) {
		assessments_.set("symptom.assessment", v0Visit.symptomAssessment);
	}

	// add adherence
	assessments_.set("adherence", v0Visit.adherenceAssessment);

	// FETCHING FROM ASSESSMENT SUMMARY
	// -------------------------------
	const { investigations, medicationInfo, ...otherAssessmentSummaryInfo } =
		v0Visit.assessmentSummary;

	// @ts-ignore
	assessments_.set("final-assesment", otherAssessmentSummaryInfo);

	/**
	 * Investigation
	 */
	const investigations_ = new Map<string, { request: Data; result?: Data }>();

	(v0Visit.investigations || []).forEach((inv: any, ix: number) => {
		// ...
		const _id = `investigation:${inv.investigationId}:${ix}:${id}`;
		investigations_.set(_id, {
			request: { investigationId: inv.investigationId, res: inv.obj },
		});
	});

	const invs = Array.from(investigations_.entries()).map(([id, d]) => {
		// ...
		// return investigation(d, {
		// 	id: () => `${id}`,
		// 	requester: null,
		// 	subject: ref.subject,
		// });
		return _reference({
			id: id,
			resourceType: "Investigation",
		});
	});

	/**
	 * Medication Related Data
	 */

	// ARV Regimens request
	(medicationInfo?.arvRegimens || []).forEach(() => {});

	// Medication request
	(medicationInfo?.medications || []).forEach(() => {});

	/**
	 * Investigations related data
	 */

	return {
		/**
		 * Visit associated with the data
		 */
		visit: visit(
			id,
			referred(patient_, "reference"),

			// This data to be update in the future
			ref.reporter,
			{
				data: {
					sex: v0Visit.patient.sex,
					age: v0Visit.patient.age,
				},
				assessments: Array.from(assessments_.entries()).map(
					([code, data]) =>
						assessment(
							code,
							referred(
								observation(data, {
									id: generators.observationId,
								}),
								"object"
							),
							{ id: generators.assessmentId },
							ref
						)
				),
				investigations: invs,
				prescriptions: [],
			}
		),
		/**
		 * Patient associated with the record
		 */
		patient: patient_,

		/**
		 * @deprecated
		 * Don't save this record since we haven't
		 * stored this data in the first place
		 */
		practitioner: null, // practitioner_,
	};
}

export function visit<T extends Data>(
	id: string,
	subject: Referred<Patient>,
	practitioner: Nullable<Referred<Practitioner>>,
	a: {
		data: T;
		assessments?: Referred<Assessment<Data>>[];
		investigations?: Referred<Investigation<Data>>[];
		prescriptions?: Referred<Assessment<Data>>[];
	},
	appointmentOrigin?: Referred<Appointment>
) {
	return {
		id,
		resourceType: "Visit",
		code: null,
		appointmentOrigin: appointmentOrigin ?? null,
		createdAt: new Date().toUTCString(),
		subject,
		practitioner,
		assessments: a.assessments ?? null,
		investigations: a.investigations ?? null,
		prescriptions: a.prescriptions ?? null,
		extendedData: a.data ?? null,
	} as Visit<T>;
}

export function medicationRequest(
	medication: Referred<Medication<string, Data>>,
	ref: {
		requester: Referred<Patient> | Referred<Practitioner>;
	},
	d: { id: Id }
): MedicationRequest {
	const authoredOn = new Date().toUTCString();
	return resource(
		{
			requester: ref.requester,
			status: "active",
			route: "NILL",
			method: "NILL",
			authoredOn,
			timing: null,
			reason: null,
			instructions: null,
			medication,
		},
		{
			id: d.id,
			resourceType: "MedicationRequest",
			createdAt: new Date(authoredOn),
		}
	);
}

export function medicationDispense(
	s: {
		medication: Referred<Medication<string, Data>>;
		dosageAndRate: MedicationDispense["dosageAndRate"];
	},
	ref: {
		supplier: Referred<Patient> | Referred<Practitioner>;
		medicationRequest: Referred<MedicationRequest>;
	},
	d: { id: Id }
): MedicationDispense {
	return resource(
		{
			supplier: ref.supplier,
			authorizingRequest: ref.medicationRequest,
			medication: s.medication,
			dosageAndRate: s.dosageAndRate,
		},
		{
			id: d.id,
			resourceType: "MedicationDispense",
		}
	);
}

export function medication<C extends string, D extends Data>(
	x: { data: D; name: string; category: C },
	d: { id: Id }
): Medication<C, D> {
	return resource(
		{
			name: x.name,
			alias: x.name,
			ingredients: [],
			data: x.data,
			category: x.category,
		},
		{
			id: d.id,
			resourceType: "Medication",
		}
	);
}

export function _investigationRequest<I extends Data>(
	data: I,
	d: {
		id: Id;
		subject: Referred<Patient>;
		requester: Nullable<Referred<Practitioner>>;
	}
): InvestigationRequest<I> {
	return resource(
		{
			data,
			requester: d.requester,
		},
		{
			// @ts-ignore
			id: () => `inv-request-${d.id()}`,
			resourceType: "InvestigationRequest",
		}
	);
}

export function _investigationResult<I extends Data>(
	data: I,
	d: {
		id: Id;
		subject: Referred<Patient>;
		requester: Nullable<Referred<Practitioner>>;
	}
): InvestigationResult<I> {
	return resource(
		{
			observation: observation(data, {
				// @ts-ignore
				id: () => `inv-result-obs-${d.id()}`,
			}),
			recorder: d.requester,
		},
		{
			// @ts-ignore
			id: () => `inv-result-${d.id()}`,
			resourceType: "InvestigationResult",
		}
	);
}

export function investigation<IR extends Data, Res extends Data>(
	data: { request: IR; result?: Res },
	d: {
		id: Id;
		subject: Referred<Patient>;
		requester: Nullable<Referred<Practitioner>>;
	}
): Investigation<IR, Res> {
	return resource(
		{
			subject: d.subject,
			request: _investigationRequest(data.request, d),
			result: data.result ? _investigationResult(data.result, d) : null,
		},
		{
			resourceType: "Investigation",
			id: d.id,
		}
	);
}

export function patient(data: {
	id: string;
	name?: string;
	createdAt?: Date;
	preferredLanguage: "en" | "sw";
	birthDate: YYYYMMDDDateString;
	address?: string;
	sex: "male" | "female";
	phoneNumber?: string;
	email?: string;
	maritalStatus?: string;
}) {
	return resource(
		{
			birthDate: data.birthDate,
			communicaton: {
				language: data.preferredLanguage,
			},
			contact:
				data.phoneNumber !== undefined || data.email !== undefined
					? {
							phoneNumber: data.phoneNumber ?? null,
							email: data.email ?? null,
					  }
					: null,
			info: data.name
				? {
						name: data.name,
				  }
				: null,
			maritalStatus: data.maritalStatus ?? null,
		},
		{
			id: data.id,
			resourceType: "Patient",
		}
	) as Patient;
}

export function practitioner(data: {
	id: Id;
	name: string;
	createdAt?: Date;
	preferredLanguage: "en" | "sw";
	birthDate?: YYYYMMDDDateString;
	address: string;
	gender: "male" | "female" | "other" | "unknown";
	phoneNumber?: string;
	email?: string;
}) {
	return resource(
		{
			address: data.address ?? null,
			birthDate: data.birthDate ?? null,
			gender: "male",
			communication: {
				language: data.preferredLanguage,
			},
			contact:
				data.phoneNumber !== undefined || data.email !== undefined
					? {
							phoneNumber: data.phoneNumber ?? null,
							email: data.email ?? null,
					  }
					: null,
			name: data.name,
			active: true,
		},
		{
			id: data.id,
			resourceType: "Practitioner",
		}
	) as Practitioner;
}

export function resource<
	ResourceType extends string,
	Code extends string,
	T extends Omit<Data, "id" | "resourceType" | "code" | "createdAt">
>(
	data: T,
	details: {
		id: string | (() => string);
		resourceType: ResourceType;
		code?: Code;
		createdAt?: Date;
	}
): Resource<ResourceType, T, Code> {
	return Object.assign(data, {
		id: typeof details.id === "string" ? details.id : details.id(),
		resourceType: details.resourceType,
		code: details.code ?? null,
		createdAt: (details.createdAt || new Date()).toUTCString(),
	});
}

export function observation<T extends Data>(data: T, d: { id: Id }) {
	return resource(
		{
			data,
			reason: null,
			referenceRange: null,
		},
		{ id: d.id, resourceType: "Observation" }
	) as Observation<T>;
}

export function assessment<T extends Data>(
	code: string,
	observation: Referred<Observation<T>>,
	d: { id: Id },
	ref: {
		subject: Referred<Patient>;
		reporter: null | Referred<Practitioner>;
	}
): Assessment<T> {
	return report("assessment", code, observation, d, ref);
}

export function report<T extends Data, RC extends string, C extends string>(
	reportCode: RC,
	code: C,
	observation: Referred<Observation<T>>,
	d: {
		id: Id;
	},
	ref: {
		subject: Referred<Patient>;
		reporter: Nullable<Referred<Practitioner>>;
	}
): Report<RC, T, C> {
	return resource(
		{
			reportCode,
			reporter: ref.reporter,
			subject: ref.subject,
			result: observation,
		},
		{
			id: d.id,
			resourceType: "Report",
			code,
			createdAt: new Date(),
		}
	);
}

function _reference<T extends string>(resource: {
	resourceType: T;
	id: string;
}): ReferenceIdentifier {
	return {
		resourceType: "reference",
		resourceReferenced: resource.resourceType,
		id: resource.id,
	};
}

export function referred<
	ResourceType extends string,
	R extends Resource<ResourceType, Data>,
	RType extends "object" | "reference"
>(
	resource: R,
	type: RType
): RType extends "object" ? R : ReferenceIdentifier<ResourceType> {
	// @ts-ignore
	return type === "object" ? resource : _reference(resource);
}
