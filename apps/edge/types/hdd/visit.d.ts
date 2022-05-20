import { Appointment } from "./appointment";
import { Investigation, Report } from "./investigation";
import { Patient, Practitioner } from "./personnel";
import { Prescription } from "./prescription";

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
		 */
		practitioner: Referred<Practitioner>;

		/**
		 * Records for the observations that were made udring the visit
		 */
		assessments: Nullable<Array<Referred<Assessment<Data>>>>;

		/**
		 * Identifies the prescriptions details that were made in visit
		 */
		prescriptions: Nullable<Array<Referred<Prescription>>>;

		/**
		 * Identifies the investigations that were performed
		 */
		investigations: Nullable<Array<Referred<Investigation<Data>>>>;

		/**
		 * More information about the visit
		 */
		extendedData: Nullable<Value>;

		/**
		 * Referencing the appintmnt that's associated with the visit
		 */
		appointmentOrigin: Nullable<Referred<Appointment>>;
	}
>;

export type Assessment<D extends Data> = Report<"assessment", D>;
