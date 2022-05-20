import type * as data from "../src/@libs/data-fns";

/**
 * Sypmtom ids
 */
type SymptomId = data.Symptom;
type ConditionId = data.Condition;

type Age = Partial<{
	years: number;
	months: number;
	days: number;
}>;

/**
 * Description of the symptom object as entered
 * in the symptoms.ts file
 */
type _$$SymptomDescription = {
	id: SymptomId | string;
	location: string[];
	duration: string[];
	onset: string[];
	nature: string[];
	periodicity: string[];
	aggravators: string[];
	reducers: string[];
};

type SymptomRecord = { id: string };

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
	reducers: string[];
};
type SymptomData = Partial<_CompleteSymptomData>;
type SypmtomDataKeyType = keyof _CompleteSymptomData;

/**
 * This is the output of the fata
 */
type Symptom = {
	Name: string;
	Location: Array<string>;
	Duration: number;
	Onset: string;
	Nature: string;
	Periodicity: string;
	Aggravators: Array<string>;
	Reducers: Array<string>;
};

type VitalSignType = {
	temp: number; // in c
	weight: {
		value: number;
		option: "kg" | "lb";
	};
	height: {
		value: number;
		option: "ft" | "cm";
	};
};
interface Assessment {
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
}

/**
 * Elsa's diagnosis
 */
type ElsaDiagnosis = Array<{
	/**
	 * Condition of the diagnosis that has
	 * been created by elsa
	 */
	condition: string;
	p: number;
}>;

/**
 * User's diagnosis that has been selected
 */
type UserDiagnosis = {
	condition: string;
	label: string;
};

interface OverallDiagnosis {
	/**
	 * Diagnosis that was made by elsa
	 */
	elsa: ElsaDiagnosis | undefined;
	user: UserDiagnosis[];
}

/**
 * The assessment that is dont by the user
 */
interface AssessmentRecord {
	id: string | number;
	assessmentInfo: Assessment;
	diagnosis: OverallDiagnosis;
	dateTime: Date;
}

type Differential = {
	p: number;
	condition: string;
	id: string;
	symptoms: Array<string>;
};
