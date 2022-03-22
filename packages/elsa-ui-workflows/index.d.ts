import * as data from '@elsa-health/data-fns';

declare type UTCDateTime = string;
declare type YYYYMMDDDate = string;
declare type UserObject = {
    fullName: string;
    id: string;
    email: string;
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
declare type SymptomState = {
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
declare type PatientVisit = BaseVisitType & {
    id: string;
    investigations: Array<{
        id: string;
    } & PatientInvestigation>;
};
declare type VisitSession = BaseVisitType & {
    investigations: PatientInvestigation[];
};
declare type InitialPropsType = {
    [field: string]: any;
};
declare type ActionList = {
    [fnName: string]: (...a: any[]) => any;
};
declare type WorkflowScreen<InitialProps extends InitialPropsType, Actions extends ActionList = {}> = {
    entry: InitialProps;
    actions: Actions;
};
declare type Language = "en" | "sw";
declare type Patient = {
    id: string;
    registerDate: UTCDateTime;
    firstName: string;
    lastName: string;
    phone: string;
    address: string;
    dateOfBirth: YYYYMMDDDate;
    sex: Patient.Sex;
};
declare namespace Patient {
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
declare type SymptomData = Partial<_CompleteSymptomData>;
declare type PatientIntake = {
    sex: Patient.Sex;
    age: Patient.Age;
    pregnant: boolean;
    dueDate: Date | null;
    vitalSigns?: Patient.VitalSignType;
};
declare type BasicAssessment = PatientIntake & {
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
declare type SymptomProps = {
    location: string[];
    duration: string[];
    onset: string[];
    nature: string[];
    periodicity: string[];
    aggravators: string[];
    reducers: string[];
};
declare type FnList = {
    [fnName: string]: (...a: any[]) => any;
};
declare const withFlowContext: <T, A extends FnList>(Component: (props: {
    entry?: T | undefined;
    actions?: A | undefined;
}) => JSX.Element, k?: {
    entry?: T | undefined;
    actions?: (({ navigation }: any) => A) | undefined;
}) => ({ navigation, route }: any) => JSX.Element;

export { BasicAssessment, Language, Patient, PatientIntake, PatientVisit, SymptomData, SymptomProps, SymptomState, UserObject, VisitSession, WorkflowScreen, withFlowContext };
