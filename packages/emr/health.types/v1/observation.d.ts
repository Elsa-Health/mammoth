import { Nullable, Resource, ResourceItem } from "./_primitives";

/**
 * Data collected about something
 */
export type Observation<Value extends Data = Data> = ResourceItem<
	"Observation",
	{
		/**
		 * Value involved in the data
		 */
		data: Value;

		/**
		 * Reason for making observation
		 */
		reason: Nullable<string>;

		/**
		 * Reference range
		 */
		referenceRange: Nullable<{
			// average value
			base: Value;
			high?: Nullable<Value>;
			low?: Nullable<Value>;
		}>;
	}
>;
