type Sex = "male" | "female";

type DBDateTime = number;
type UTCDateTime = string;
type YYYYMMDDDate = string;

type UserObject = { fullName: string; id: string; email: string };

type Patient = {
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
				[id in data.Investigation]?: string | string[];
			};
	  };

type PatientInvestigation = {
	/**
	 * Used to identify the investigation as stored in DB
	 */
	id: string;

	/**
	 * Similar to LabTest ID
	 */
	obj: data.InvestigationTypeRecord<string>;

	/**
	 * Name of the investigation
	 */
	investigationId: "urinalysis";
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

type PatientVisit = {
	id: string;
	date: UTCDateTime;
	condition: string;
	symptoms: {
		present: Array<{ id: string; state: object }>;
		absent: string[];
	};
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
