import { Patient, Practitioner } from "./personnel";
import { Visit } from "./visit";
import { Nullable, ReferenceIdentifier, Resource } from "./_primitives";

/**
 * Appointment
 */
// export type Appointment<
//   ARq extends AppointmentRequest,
//   ARs extends AppointmentResponse,
// > = Resource<
//   'Appointment',
//   {
//     /**
//      * Subject
//      */
//     subject: Referred<Patient>;

//     /**
//      * Identifies the patient that the appointment concerns
//      */
//     request: Referred<ARq>;

//     /**
//      * information concerning the appointment
//      */
//     response: Nullable<Referred<ARs>>;
//   }
// >;

/**
 * Appointment Request
 */
type AppointmentRequest<
	Actor extends Patient | Practitioner = Patient | Practitioner
> = Resource<
	"AppointmentRequest",
	{
		/**
		 * Identifies the visit that fulfilled the appointment
		 */
		visit: Nullable<ReferenceIdentifier<"Visit">>;

		/**
		 * Reason for having the appointment
		 */
		reason: Nullable<string>;

		/**
		 * Information describe the appointment
		 */
		description: Nullable<string>;

		/**
		 * Date of the appointment
		 */
		appointmentDate: UTCDateTimeString;

		// subject: Referred<Patient> (v2)
		// requester: Referred<Practitioner> (v2)

		/**
		 * Participants
		 * // v2: this should be optional
		 */
		participants: Array<ReferenceIdentifier<Actor["resourceType"]>>;
	}
>;

type AppointmentResponse<
	ARq extends AppointmentRequest = AppointmentRequest,
	Actor extends Patient | Practitioner = Patient | Practitioner
> = Resource<
	"AppointmentResponse",
	{
		/**
		 * The appointment request being responded to.
		 */
		authorizingAppointmentRequest: Referred<ARq>;

		/**
		 * Start of the appointment
		 */
		startTime: number;

		/**
		 * End of the appoinment
		 */
		endTime: number;

		/**
		 * Actors that were involved in responding to the appointment
		 */
		actors: Array<ReferenceIdentifier<Actor["resourceType"]>>;
		comment: Nullable<string>;
	}
>;
