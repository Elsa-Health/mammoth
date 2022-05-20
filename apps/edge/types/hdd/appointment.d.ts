import { Patient, Practitioner } from "./personnel";
import { Visit } from "./visit";

/**
 * Appointment
 */
export type Appointment = Resource<
	"Appointment",
	{
		/**
		 * Identifies the visit that fulfilled the appointment
		 */
		visitOrigin: Nullable<Referred<Visit>>;

		/**
		 * Identifies the patient that the appointment concerns
		 */
		request: Referred<AppointmentRequest>;

		/**
		 * information concerning the appointment
		 */
		response: Nullable<Referred<AppointmentResponse>>;
	}
>;

/**
 * Appointment Request
 */
type AppointmentRequest = Resource<
	"AppointmentRequest",
	{
		/**
		 * Reason for having the appointment
		 */
		reason: string;

		/**
		 * Information describe the appointment
		 */
		description: string;

		/**
		 * Preset duration of the appointment
		 */
		minutesDuration: Nullable<number>;

		/**
		 * Participants
		 */
		participants: Array<Referred<Patient> | Referred<Practitioner>>;
	}
>;

type AppointmentResponse = Resource<
	"AppointmentResponse",
	{
		responseVisit: Nullable<Referred<Visit>>;
		startTime: number;
		endTime: number;
		actors: Array<Referred<Patient> | Referred<Practitioner>>;
		// actors: Referred<Practitioner>;
		comment: string;
	}
>;
