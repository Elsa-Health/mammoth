import {
	ARV,
	CTC as tCTC,
	Investigation,
	Medication as Med,
} from "elsa-health-data-fns/lib";
import { InvestigationTypeRecord } from "elsa-health-data-fns/lib/investigations";
import {
	Nullable,
	ReferenceIdentifier,
	YYYYMMDDDateString,
} from "../../health.types/v1/_primitives";
import * as t from "../../health.types/v1";

import { Ingredient } from "../../health.types/v1";
import { SimpleVisitData } from "./ctc";

/**
 * Medication requests
 * ------
 */

export type Patient = t.Patient<
	{
		whoStage: string;
		hasPositiveStatus: boolean;
		dateOfHIVPositiveTest: Nullable<YYYYMMDDDateString>;
		isCurrentlyOnARV: boolean;
		dateOfStartARV: Nullable<YYYYMMDDDateString>;
		hasTreatmentSupport: boolean;
		typeOfSupport: Nullable<string>;
	},
	{
		firstName: Nullable<string>;
		familyName: Nullable<string>;
		address: Nullable<string>;
		phoneNumber: Nullable<string>;
	}
>;

type DoctorService = t.HealthcareService<
	"doctor-consultant",
	{
		role: "doctor";
		tag: "ctc";
	}
>;
export type Doctor = t.Practitioner<Organization, DoctorService>;

/**
 * To identify a CTC organization
 */
export type Organization = t.Organization<
	{
		ctcCode: string;
	},
	{
		geo: Nullable<{ latitude: number; longitude: number }>;
		address: Nullable<string>;
		website: Nullable<string>;
	}
>;

/**
 * Types of Medication medicationRequests
 * ----
 */

/**
 * Medication forms
 */
type MedicationForm = "granules" | "syrup" | "tablets";

export type SingleARVMedication = t.Medication<
	string, // ARV.UnitRegimen
	MedicationForm,
	"arv-ctc",
	never,
	{ type: "single"; text: string }
>;

export type ComposedARVMedication = t.Medication<
	string, // ARV.UnitRegimen
	MedicationForm,
	"arv-ctc",
	Ingredient<{ identifier: ARV.UnitRegimen; text: string }>,
	{ type: "composed"; short?: string; text: string }
>;

export type ARVStockRecord = t.StockRecord<
	ARVMedication,
	{ units: "mg" | "cc" | "tablets"; amount: number },
	Organization,
	{
		estimatedFor: "30-days" | "60-days" | "90-days";
		group: "adults" | "pediatrics";
		isLow: boolean;
	}
>;

// Composed medication
export type ARVMedication = SingleARVMedication | ComposedARVMedication;

/**
 * Types of Assessments supported
 * ----
 */

/**
 * @assessment
 * During Intial Patient Intake
 */
export type IntialPatientIntakeAssessment = t.Assessment<{
	associatedAppointment: ReferenceIdentifier<"Appointment"> | null;
	isPregnant: boolean | null;
	dateOfPregancy: YYYYMMDDDateString;
	visitType: "home" | "community";
	weight: null | number;
	height: null | number;
	systolic: null | number;
	diastolic: null | number;
}>;

export type HIVPatientIntakeAssessment = t.Assessment<{
	coMorbidities: tCTC.CoMorbidity[];
	ARVRegimens: ARV.Regimen[] | null;
	regimenDuration?: string | null;
	medications: Med.All[] | null;
}>;

export type PatientAdherenceAssessment = t.Assessment<{
	educationLevel: string;
	forgottenCount: string;
	hasJob: boolean;
	hasFrequentAlc: boolean;
	isShareDrugs: boolean;
	isExperienceSideEffects: boolean;
	doesPatientUnderstandRegimen: boolean;
}>;

export type ConcludingAssessment = t.Assessment<{
	riskOfNonAdhrence: null | number;
	appointmentDate: YYYYMMDDDateString;
	investigations: Investigation[];
	medications: Med.All[];
	regimenDecision: tCTC.Status | null;
	decisionReason: string | null;
	arvRegimens: ARV.Regimen[];
	regimenDuration: SimpleVisitData["regimenDuration"];
}>;
/**
 * Investigation Requests
 * -----
 */
export type InvestigationRequest = t.InvestigationRequest<{
	investigationId: Investigation;
	obj: InvestigationTypeRecord<string> | null;
}>;
export type InvestigationResult = t.InvestigationResult<
	t.P.Data,
	InvestigationRequest
>;

/**
 * Appointment
 * ------------
 */
export type AppointmentRequest = t.AppointmentRequest<Patient | Doctor>;
export type AppointmentResponse = t.AppointmentResponse<
	AppointmentRequest,
	Patient | Doctor
>;

/**
 * Reports
 */
export namespace Report {
	export type MissedAppointment = t.Report<
		"missed",
		{
			missedDate: t.P.YYYYMMDDDateString;
			reason: Nullable<string>;
		},
		"appointment-report"
	>;
}

/**
 * Visit
 * ----
 */
export type Visit = t.Visit<
	{ patient: Patient; practitioner: Doctor },
	// | IntialPatientIntakeAssessment
	// | HIVPatientIntakeAssessment
	// | PatientAdherenceAssessment
	// | ConcludingAssessment
	t.Assessment, // temporary assessment data
	MedicationRequest,
	InvestigationRequest,
	AppointmentResponse,
	SimpleVisitData
>;
export type MedicationRequest = t.MedicationRequest<ARVMedication>;
export type MedicationDispense = t.MedicationDispense<MedicationRequest>;
