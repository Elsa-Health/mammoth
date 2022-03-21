type DBDateTime = number;
type UTCDateTime = string;
type YYYYMMDDDate = string;

type UserObject = { fullName: string; id: string; email: string };

type Patient = {
	// added at runtime
	id: string;
	registerDate: UTCDateTime;
	firstName: string;
	lastName: string;
	phone: string;
	address: string;
	dateOfBirth: YYYYMMDDDate;
	sex: Sex;
};

type PatientInvestigationResult =
	| undefined
	| string
	| string[]
	| {
			values: {
				// @ts-ignore
				[id in data.Investigation]?: string | string[];
			};
	  };

type PatientInvestigation = {
	/**
	 * Similar to LabTest ID
	 */
	// @ts-ignore
	obj: data.InvestigationTypeRecord<string>;

	/**
	 * Name of the investigation
	 */
	investigationId: "urinalysis";

	result: PatientInvestigationResult;
};

type SymptomState = {
	Name: string;
	Location: Array<string>;
	Duration: number;
	Onset: string;
	Nature: string;
	Periodicity: string;
	Aggravators: Array<string>;
	Reducers: Array<string>;
};

type BaseVisitType = {
	date: UTCDateTime;
	intake: PatientIntake;
	patientId: string;

	/**
	 * Top condition that present from Elsa's Insight.
	 * undefined if unable to get the conditions (e.g. when there's no internet)
	 */
	condition: string | undefined;

	// @ts-ignore
	recommendedTests: data.Investigation[];

	symptoms: {
		present: Array<{ id: string; data: object }>;
		absent: string[];
	};
};

type PatientVisit = BaseVisitType & {
	id: string;
	investigations: Array<{ id: string } & PatientInvestigation>;
};

type VisitSession = BaseVisitType & {
	investigations: PatientInvestigation[];
};

type InitialPropsType = { [field: string]: any };
type ActionList = { [fnName: string]: (...a: any[]) => any };

type WorkflowScreen<
	InitialProps extends InitialPropsType,
	Actions extends ActionList = {}
> = {
	entry: InitialProps;
	actions: Actions;
};

type Language = "en" | "sw";

// ------------------------
type Age = Partial<{
	years: number;
	months: number;
	days: number;
}>;
type Sex = "male" | "female";

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

// -----------------------------------
type SelectInvestigationResult<T extends string> = {
	options: T[];
};

type OptionInvestigationResult<T extends string> = {
	// options: T[];
	selected: T;
};

type FieldInvestigationResult = {
	input: string;
};

type NumberInvestigationResult = {
	value: number;
};

type Investigation = { type: "polar" };
