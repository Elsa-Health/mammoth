type Sex = "male" | "female";

type DBDateTime = number;

type UserObject = { fullName: string; id: string; email: string };

type Patient = {
	id: string;
	registerDate: Date;
	firstName: string;
	lastName: string;
	phone: string;
	address: string;
	dateOfBirth: Date;
	sex: Sex;
};

type PatientInvestigation = {
	/**
	 * Used to identify the investigation
	 */
	id: string;

	/**
	 * Similar to LabTest ID
	 */
	investigation: string;

	/**
	 * Results from the investigation. as expected, depends on the investigation
	 */
	results: InvestigationResult;
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
	date: Date;
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
