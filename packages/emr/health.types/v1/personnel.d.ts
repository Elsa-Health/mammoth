import { HealthcareService, Organization } from "./administration";
import {
	Nullable,
	Referred,
	Resource,
	YYYYMMDDDateString,
} from "./_primitives";

/**
 * Representation of the patient object
 *
 * THINK: Should really seperate `Identifier` from `body`?
 * Reason I thought of, might want to mask `Identifier`, special indexing?
 */
export type Patient<
	PatientBody extends Data = Data,
	Info extends Data = Data
> = Resource<
	"Patient",
	{
		/**
		 * Object containing the patient's indentifying information
		 * This can include name, address, phone number, etc.
		 *
		 */
		info: Nullable<Info>;

		/**
		 * Is the record active for use?
		 */
		active: boolean;

		/**
		 * Organization managing the patient record
		 */
		managingOrganization: Nullable<Organization>;

		/**
		 * Means of contacting the patient
		 */
		contact: Nullable<Contact>;

		/**
		 * Sex of the patient
		 */
		sex: "male" | "female";

		/**
		 * The patient's date of birth
		 * Should be set as `YYYY-MM-DD`
		 */
		birthDate: YYYYMMDDDateString;

		/**
		 * Marital Status
		 */
		maritalStatus: Nullable<string>;

		/**
		 * more information about the patient
		 */
		extendedData: Nullable<PatientBody>;

		/**
		 * Language to use to communicate with the person
		 */
		communication: Nullable<{
			language: "en" | "sw";
		}>;

		/**
		 * Link that is associated by this patient record
		 */
		link: Nullable<{
			/**
			 * Time the link was created
			 * THINK: Might remove.
			 */
			createdAt: UTCDateTimeString;

			/**
			 * The other patient document being linked
			 */
			other: Referred<Patient>;

			/**
			 * Type of association of with the patient record
			 */
			type: "replaces" | "replaced-by";
		}>;

		/**
		 * Business identifier for the patient
		 */
	}
>;

/**
 * Related with contact inforamtion
 */
type Contact = { phoneNumber: Nullable<string>; email: Nullable<string> };

/**
 * Practitioner
 */
export type Practitioner<
	Org extends Organization = Organization,
	HS extends HealthcareService<Data> = HealthcareService<Data>,
	Identifier extends Data = Data
> = Resource<
	"Practitioner",
	{
		active: boolean;
		name: string;
		address: Nullable<string>;
		contact: Nullable<Contact>;
		birthDate: Nullable<YYYYMMDDDateString>;
		gender: "male" | "female" | "other" | "unknown";
		communication: Nullable<{
			language: "en" | "sw";
		}>;

		/**
		 * Service the practitioner is providing
		 */
		serviceProvider: Referred<HS>;

		/**
		 * Organization associated with the practioner
		 */
		organization: Referred<Org>;

		/**
		 * Identifier used in the business
		 */
		identifier: Identifier;
	}
>;
