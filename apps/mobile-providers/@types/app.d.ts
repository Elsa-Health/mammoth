type Sex = "male" | "female";

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
			[id in data.Investigation]?: string | string[];
	  };

type PatientInvestigation = {
	/**
	 * Similar to LabTest ID
	 */
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
