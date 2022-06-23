import { P } from ".";

export type Nullable<T> = T | null;
export type OneOrMany<T> = T | T[];
export type Mapping<K extends string, T> = {
	[k in K]: T;
};

/**
 * Defining the resource types
 * TODO:
 * 	- Report
 *  - Observation
 *  - Patient
 *  - Practitioner
 *  - ...
 */
export type ResourceOptions = Omit<string, "ResourceItem">;
export type Resource<
	N extends ResourceOptions,
	T extends Mapping<string, Data>,
	C extends string = string
> = {
	/**
	 * Code associated with grouping the object
	 */
	code: Nullable<C>;

	/**
	 * Type of resource
	 */
	resourceType: N;

	/**
	 * Global Unique Identifier for a resource
	 */
	id: string;

	/**
	 * Date and time the resource was issued
	 */
	createdAt: DateTimeString;
} & T;

// This is to mean an item that is to be used in a reource
export type ResourceItem<N extends string, T extends Data> = {
	resourceType: "ResourceItem";
	resourceItemType: N;
} & T;

/**
 * Link to the reou
 */
type Referred<Obj extends Resource<string, Data>> = ReferenceIdentifier | Obj;

/**
 * Represent date
 * Format `YYYY-MM-DD`
 */
type YYYYMMDDDateString = string;

/**
 * Represent date
 * Format `DD/MM/YYYY`
 */
type DDMMYYYYDateString = string;

/**
 * Represent the UTC Date and Time
 * Example Format `Sun, 24 Apr 2022 17:56:31 GMT`
 */
type UTCDateTimeString = string;

/**
 * Represent the UTC Date and Time in ISO 8601 format
 * Format `YYYY-MM-DDTHH:mm:ss.SSSZ`
 */
type DateTimeString = string;

/**
 * Defines a data type used of the present the contents of an object
 */
type Data = string | number | boolean | Mapping<string, Data | null>;

/**
 *
 * `__guid` is reserved. Using it might bring
 * problems in the future.
 */
type Identifier = {
	[x: string]: string;
};

/**
 * Identifies a object that can be used
 * to uniquely identify a resource
 */
export type ReferenceIdentifier<RF extends string = string> = {
	resourceType: "Reference";
	resourceReferenced: RF;
	id: string;
};
// | {
// 		resourceType: "Reference";
// 		resourceReferenced: RF;
// 		data: {
// 			// Other means to reference resource with an identifier
// 			[x: string]: string;
// 		};
//   };

/**
 * Things that I might remove later
 */
type Artifact = string;
type Concept = string;
