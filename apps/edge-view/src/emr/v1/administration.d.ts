/**
 * Entity that idntifies the health care service provided
 * -----------------
 *
 * e.g. X-Ray.
 */
export type HealthcareService<Data> = Resource<
	"HealthcareService",
	{
		/**
		 * Status of the service provided
		 */
		active: boolean;

		/**
		 * More information about the provided service
		 */
		extendedData: Data;

		/**
		 * Name of the service
		 */
		name: string;
	}
>;

/**
 * Entity that exists in the system
 * -------------------------
 * This is different from the HealthcareService
 *
 * eg. AgaKhan, Muhimbili
 */
export type Organization<
	Identifier extends Data = Data,
	D extends Data = Data
> = Resource<
	"Organization",
	{
		/**
		 * Name of the organization
		 */
		name: string;

		/**
		 * Email associated with the organization
		 */
		email: Nullable<string>;

		/**
		 * Phonenumber contact for the organization
		 */
		phoneNumber: Nullable<string>;

		/**
		 * Whether or not the organization is active
		 */
		active: boolean;

		/**
		 * Information useful in properly identifying an organization
		 */
		identifier: Identifier;

		/**
		 * Other organization associated with this
		 */
		associatedOrganization: Nullable<Referred<Organization>>;

		/**
		 * More information attached to the organization
		 */
		extendedData: Nullable<D>;
	}
>;
