import type * as data from "@elsa-health/data-fns";
declare type UTCDateTime = string;
declare type YYYYMMDDDate = string;
export declare type UserObject = {
    fullName: string;
    id: string;
    email: string;
};
export declare type Patient = {
    id: string;
    registerDate: UTCDateTime;
    firstName: string;
    lastName: string;
    phone: string;
    address: string;
    dateOfBirth: YYYYMMDDDate;
    sex: Patient.Sex;
};
declare type PatientInvestigationResult = undefined | string | string[] | {
    values: {
        [id in data.Investigation]?: string | string[];
    };
};
declare type PatientInvestigation = {
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
export declare type SymptomState = {
    Name: string;
    Location: Array<string>;
    Duration: number;
    Onset: string;
    Nature: string;
    Periodicity: string;
    Aggravators: Array<string>;
    Reducers: Array<string>;
};
declare type BaseVisitType = {
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
        present: Array<{
            id: string;
            data: object;
        }>;
        absent: string[];
    };
};
export declare type PatientVisit = BaseVisitType & {
    id: string;
    investigations: Array<{
        id: string;
    } & PatientInvestigation>;
};
export declare type VisitSession = BaseVisitType & {
    investigations: PatientInvestigation[];
};
declare type InitialPropsType = {
    [field: string]: any;
};
declare type ActionList = {
    [fnName: string]: (...a: any[]) => any;
};
export declare type WorkflowScreen<InitialProps extends InitialPropsType, Actions extends ActionList = {}> = {
    entry: InitialProps;
    actions: Actions;
};
export declare type Language = "en" | "sw";
export declare namespace Patient {
    type Age = Partial<{
        years: number;
        months: number;
        days: number;
    }>;
    type Sex = "male" | "female";
    type VitalSignType = {
        temp?: number;
        weight?: {
            value: number;
            option: "kg" | "lb";
        };
        height?: {
            value: number;
            option: "ft" | "cm";
        };
    };
}
declare type _CompleteSymptomData = {
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
declare type SymptomRecord = {
    id: string;
};
export declare type SymptomData = Partial<_CompleteSymptomData>;
export declare type PatientIntake = {
    sex: Patient.Sex;
    age: Patient.Age;
    pregnant: boolean;
    dueDate: Date | null;
    vitalSigns?: Patient.VitalSignType;
};
export declare type BasicAssessment = PatientIntake & {
    /**
     * Containing the list of present symptoms
     */
    presentingSymptoms: Array<SymptomRecord & {
        data: SymptomData;
    }>;
    /**
     * Containing the list of absent symptoms
     */
    absentSymptoms: SymptomRecord[];
};
export declare type SymptomProps = {
    location: string[];
    duration: string[];
    onset: string[];
    nature: string[];
    periodicity: string[];
    aggravators: string[];
    reducers: string[];
};
export {};
