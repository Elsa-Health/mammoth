import { HealthcareService, Organization } from "./administration";
import { Practitioner, Patient } from "./personnel";
import {
	Data,
	Nullable,
	Referred,
	Resource,
	ResourceItem,
	UTCDateTimeString,
} from "./_primitives";

export type MedicationRequest<
	M extends Medication<string> = Medication<string>,
	SupplyInquiryData extends Data = Data
> = Resource<
	"MedicationRequest",
	{
		/**
		 * With whom the request concerns
		 */
		subject: Referred<Patient>;

		/**
		 * Requester or the medicaiton
		 */
		requester: Nullable<Referred<Patient> | Referred<Practitioner>>;

		/**
		 * Medication requested
		 */
		medication: M;

		/**
		 * Date the medication request was issued
		 * // THINK: might be the as createdAt
		 */
		authoredOn: UTCDateTimeString;

		/**
		 * Information describing information useful
		 * for knowing the supply information
		 */
		supplyInquiry: Nullable<SupplyInquiryData>;

		/**
		 * Status of the request
		 */
		isActive: boolean;

		/**
		 * Status of the mediation
		 */
		status: Nullable<
			"active" | "cancelled" | "completed" | "on-hold" | "stopped"
		>;

		/**
		 * How the drug should enter the body
		 */
		route: Nullable<string>;

		/**
		 * How medicaition is administered
		 */
		method: Nullable<string>;

		/**
		 * Free text information about the medication
		 */
		reason: Nullable<string>;

		/**
		 * Timing of the when to administer the prescription
		 */
		// timing: Nullable<string>;

		/**
		 * Instruction that's set for patient
		 */
		instructions: Nullable<string>;
	}
>;

export type MedicationDispense<
	M extends Medication,
	MR extends MedicationRequest = MedicationRequest<M>
> = Resource<
	"MedicationDispense",
	{
		supplier: Referred<Practitioner>;
		medication: M;
		authorizingRequest: Referred<MR>;

		/**
		 * Decription dosage and rate of medication
		 */
		dosageAndRate: Nullable<{
			type: string | null;
			count: number | null;
			doseRange: any | null;
			doseQuantity: number | null;
			rateRatio: any | null;
			rateQuantity: number | null;
		}>;
	}
>;

export type MedicationPickupReport = Resource<
	"MedicationDispenseReport",
	{
		// Think of a good way to represent a signature
		supplingOrganization: Referred<Organization>;

		authorizingDispenseNotice: Referred<MedicationDispense>;

		/**
		 * Person who geve the medication
		 */
		dispenser: Referred<Practitioner>;

		/**
		 * Date and Time the medication was picked up
		 */
		pickedUpAt: UTCDateTimeString;

		/**
		 * Information to elaborate more during the medication pickup
		 */
		info: Data;
	}
>;

export type Ingredient<D extends Data = Data> = ResourceItem<
	"Ingredient",
	Data
>;

export type Medication<
	Identifier extends string,
	Form extends string = string,
	Category extends string = string,
	// types of medication form
	Ingredient extends ResourceItem<"Ingredient", Data> | never = ResourceItem<
		"Ingredient",
		Data
	>,
	Extended extends Data = {}
> = ResourceItem<
	"Medication",
	{
		// Name that helps identify the resource item
		identifier: Identifier;

		// freindlier name (id)
		alias: string;

		// Medication category
		category: Nullable<Category>;

		// those that make up the medication
		ingredients: Ingredient[];

		// form that the medication is as (opts. 'tablets' | 'syrup' | 'user-defined-from')
		form: Nullable<Form>;
	} & Extended
>;

export type StockRecord<
	M extends Medication<string>,
	// describes the concentration of the item in stock
	Concentration extends Data = Data,
	// Organization managing the stock
	ReferredOrganization extends Referred<Organization> = Referred<Organization>,
	// more information to describe the concetration
	Extended extends Data | null = null
> = Resource<
	"Medication.StockRecord",
	{
		// medication stocking for
		medication: M;

		concentration: Nullable<Concentration>;

		// number of the medication of the set concentration
		count: number;

		// when the stocked medication expires
		expiresAt: UTCDateTimeString;

		// facility managing the stock
		managingOrganization: ReferredOrganization;

		// when the stock information was updated
		/// THINK: in a distributed setting, esp those embracing delta-syncing...
		///  this might be a problem
		lastUpdatedAt: UTCDateTimeString;

		// more information
		extendedData: Extended;
	}
>;
