import {
  ARV,
  CTC,
  Investigation,
  Medication as Med,
} from 'elsa-health-data-fns/lib';
import {InvestigationTypeRecord} from 'elsa-health-data-fns/lib/investigations';
import {
  HealthcareService,
  Organization,
} from '../../emr-types/v1/administration';
import {
  Appointment,
  AppointmentRequest,
  AppointmentResponse,
} from '../../emr-types/v1/appointment';
import {
  InvestigationRequest,
  InvestigationResult,
} from '../../emr-types/v1/investigation';
import {Patient, Practitioner} from '../../emr-types/v1/personnel';
import {Medication, MedicationRequest} from '../../emr-types/v1/prescription';
import {Assessment, Visit} from '../../emr-types/v1/visit';
import {DurationOpt} from '../_screens/MedicationVisit';

export type CTCPatient = Patient<
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

export type CTCDoctor = Practitioner<CTCOrganization, DoctorService>;
type DoctorService = HealthcareService<{
  role: 'doctor';
  tag: 'ctc';
}>;

/**
 * To identify a CTC organization
 */
export type CTCOrganization = Organization<
  {
    ctcCode: string;
  },
  {
    geo: Nullable<{latitude: number; longitude: number}>;
    address: Nullable<string>;
    website: Nullable<string>;
  }
>;

/**
 * Types of Assessments supported
 * ----
 */

/**
 * @assessment
 * During Intial Patient Intake
 */
export type IntialPatientIntakeAssessment = Assessment<{
  associatedAppointment: ReferenceIdentifier<'Appointment'> | null;
  isPregnant: boolean | null;
  dateOfPregancy: YYYYMMDDDateString;
  visitType: 'home' | 'community';
  weight: null | number;
  height: null | number;
  systolic: null | number;
  diastolic: null | number;
}>;

export type HIVPatientIntakeAssessment = Assessment<{
  coMorbidities: CTC.CoMorbidity[];
  ARVRegimens: ARV.Regimen[] | null;
  regimenDuration?: string | null;
  medications: Med.All[] | null;
}>;

export type PatientAdherenceAssessment = Assessment<{
  educationLevel: string;
  forgottenCount: string;
  hasJob: boolean;
  hasFrequentAlc: boolean;
  isShareDrugs: boolean;
  isExperienceSideEffects: boolean;
  doesPatientUnderstandRegimen: boolean;
}>;

export type ConcludingAssessment = Assessment<{
  riskOfNonAdhrence: null | number;
  appointmentDate: YYYYMMDDDateString;
  investigations: Investigation[];
  medications: Med.All[];
  regimenDecision: CTC.Status | null;
  decisionReason: string | null;
  arvRegimens: ARV.Regimen[];
  regimenDuration: DurationOpt;
}>;

/**
 * Types of Medication medicationRequests
 * ----
 */

export type ARVMedication = Medication<
  'arv',
  {className: ARV.Class | null; regimen: ARV.Regimen},
  string
>;
export type ARVSingleMedication = Medication<
  'arv-single',
  {singleId: string | null; text: string}
>;
export type StandardMedication = Medication<
  'standard',
  {medication: Med.All; text: string}
>;

/**
 * Medication requests
 * ------
 */
export type CTCMedicationRequest = MedicationRequest<
  ARVMedication | StandardMedication
>;

/**
 * Investigation Requests
 * -----
 */
export type CTCInvestigationRequest = InvestigationRequest<{
  investigationId: Investigation;
  obj: InvestigationTypeRecord<string> | null;
}>;
export type CTCInvestigationResult =
  InvestigationResult<CTCInvestigationRequest>;

/**
 * Appointment
 * ------------
 */
export type CTCAppointmentRequest = AppointmentRequest<CTCPatient | CTCDoctor>;
export type CTCAppointmentResponse = AppointmentResponse<
  CTCAppointmentRequest,
  CTCPatient | CTCDoctor
>;

export type CTCAppointment = Appointment<
  CTCAppointmentRequest,
  CTCAppointmentResponse
>;

/**
 * Visit
 * ----
 */
export type CTCVisit = Visit<
  {patient: CTCPatient; practitioner: CTCDoctor},
  | IntialPatientIntakeAssessment
  | HIVPatientIntakeAssessment
  | PatientAdherenceAssessment
  | ConcludingAssessment
  | Assessment, // temporary assessment data
  CTCMedicationRequest,
  CTCInvestigationRequest,
  CTCAppointment
>;
