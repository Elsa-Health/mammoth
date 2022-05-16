export type Prescription = Resource<
	"Prescription",
	{
		/**
		 * Is the medication taken by the patient
		 */
		taken: boolean;

		/**
		 * Houw the drug should enter the body
		 */
		route: string;

		/**
		 * How medicaition is administered
		 */
		method: string;

		/**
		 * Free text information about the medication
		 */
		text: Nullable<string>;

		/**
		 * Timing of the when to administer the prescription
		 */
		timing: Nullable<string>;

		/**
		 * Instruction that's set for patient
		 */
		instructions: Nullable<string>;

		/**
		 * Medication prescribed
		 */
		medication: Referred<Medication>;

		/**
		 * Decription dosage and rate of medication
		 */
		dosageAndRate: Nullable<{
			type: string;
			doseRange: any;
			doseQuantity: number;
			rateRatio: any;
			rateQuantity: number;
		}>;
	}
>;

export type Medication<
	D extends Data,
	Ingrdients extends Data = Data
> = Resource<
	"Medication",
	{
		/**
		 * Name of the medication
		 */
		name: string;

		/**
		 * Alternative name
		 */
		alias: string;

		/**
		 * Ingredients used in creating
		 * the medication
		 */
		ingredients: Ingrdients[];

		/**
		 * Data about
		 */
		data: D;
	}
>;
