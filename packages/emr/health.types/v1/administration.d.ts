import { Nullable, Referred, Resource, ResourceItem } from "./_primitives";

/**
 * Entity that identifies the health care service provided
 *
 * e.g. X-Ray.
 */
export type HealthcareService<N extends string, D extends Data> = ResourceItem<
	"HealthcareService",
	{
		/**
		 * Status of the service provided
		 */
		active: boolean;

		/**
		 * More information about the provided service
		 */
		extendedData: D;

		/**
		 * Name of the service
		 */
		name: N;
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
		identifier: Nullable<Identifier>;

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
