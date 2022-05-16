type Nullable<T> = T | null;
type OneOrMany<T> = T | T[];
type Mapping<K extends string, T> = {
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
type ResourceOptions = string;
type Resource<N extends ResourceOptions, T, C extends string = string> = {
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

/**
 * Link to the reou
 */
type Referred<Obj extends Resource<string, object>> =
	| ReferenceIdentifier
	| Omit<Obj, "createdAt">;
/**
 * Represent date
 * Format `YYYY-MM-DD`
 */
type YYYYMMDDDateString = string;

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
type Data =
	| string
	| number
	| boolean
	| {
			[x: string]: Data | Data[] | null;
	  };

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
type ReferenceIdentifier<RF extends string = string> = {
	resourceType: "reference";
	resourceReferenced: RF;
} & (
	| { id: string }
	| {
			data: {
				// Other means to reference resource with an identifier
				[x: string]: string;
			};
	  }
);

/**
 * Something
 */
type Artifact = string;
type Concept = string;
