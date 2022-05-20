type Age = Partial<{
	years: number;
	months: number;
	days: number;
}>;

type VitalSignType = {
	temp?: number; // in c
	weight?: {
		value: number;
		option: "kg" | "lb";
	};
	height?: {
		value: number;
		option: "ft" | "cm";
	};
};

type _CompleteSymptomData = {
	/**
	 * Information that is useful
	 */
	location: string[];
	duration: string;
	onset: string;
	nature: string[];
	periodicity: string[];
	aggravators: string[];
	reducers: string[]; // FIXME: Change to relievers
};

type SymptomRecord = { id: string };

type SymptomData = Partial<_CompleteSymptomData>;

type PatientIntake = {
	sex: Sex;
	age: Age;
	pregnant: boolean;
	dueDate: Date | null;
	vitalSigns?: VitalSignType;
};

type BasicAssessment = PatientIntake & {
	/**
	 * Containing the list of present symptoms
	 */
	presentingSymptoms: Array<
		SymptomRecord & {
			data: SymptomData;
		}
	>;

	/**
	 * Containing the list of absent symptoms
	 */
	absentSymptoms: SymptomRecord[];
};

type SymptomProps = {
	location: string[];
	duration: string[];
	onset: string[];
	nature: string[];
	periodicity: string[];
	aggravators: string[];
	reducers: string[];
};
