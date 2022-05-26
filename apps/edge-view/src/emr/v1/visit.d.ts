import { Appointment } from "./appointment";
import { Investigation, Report } from "./investigation";
import { Patient, Practitioner } from "./personnel";
import { MedicationRequest } from "./prescription";

export type Visit<Value extends Data = Data> = Resource<
	"Visit",
	{
		/**
		 * Information that identifies that patient that the visit concerns
		 * This can be the patient's GUID, firstname and lastname (assuming this is enough), phone number.
		 */
		subject: Referred<Patient>;
		/**
		 * Practitioner that attended subject to create visit
		 * ----
		 */
		practitioner: Nullable<Referred<Practitioner>>;

		/**
		 * Records for the observations that were made udring the visit
		 */
		assessments: Array<Referred<Assessment<Data>>>;

		/**
		 * Identifies the prescriptions details that were made in visit
		 */
		prescriptions: Array<Referred<MedicationRequest>>;

		/**
		 * Identifies the investigation requests made during visit
		 */
		investigationRequests: Array<Referred<Investigation<Data>>>;

		/**
		 * More information about the visit
		 */
		extendedData: Nullable<Value>;

		/**
		 * Referencing the appintmnt that's associated with the visit
		 */
		authorizingAppointment: Nullable<Referred<Appointment>>;
	}
>;

export type Assessment<D extends Data> = Report<"assessment", D>;
