import {
  ARV,
  CTC as tCTC,
  Investigation,
  Medication as Med,
} from 'elsa-health-data-fns/lib';
import {InvestigationTypeRecord} from 'elsa-health-data-fns/lib/investigations';
import * as t from '@elsa-health/emr/health.types/v1';

import {
  DurationOpt,
  MedicationRequestVisitData,
} from '../_screens/MedicationVisit';
import {Ingredient} from '@elsa-health/emr/health.types/v1';

// export type ARVMedication = Medication<
//   'arv',
//   {className: ARV.Class | null; regimen: ARV.Regimen},
//   string
// >;
// export type ARVSingleMedication = Medication<
//   'arv-single',
//   {singleId: string | null; text: string}
// >;
// export type StandardMedication = Medication<
//   'standard',
//   {medication: Med.All; text: string}
// >;

/**
 * Medication requests
 * ------
 */

export declare namespace CTC {
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

  type DoctorService = t.HealthcareService<{
    role: 'doctor';
    tag: 'ctc';
  }>;
  export type Doctor = t.Practitioner<Organization, DoctorService>;

  /**
   * To identify a CTC organization
   */
  export type Organization = t.Organization<
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
   * Types of Medication medicationRequests
   * ----
   */

  /**
   * Medication forms
   */
  type MedicationForm = 'granules' | 'syrup' | 'tablets';

  export type SingleARVMedication = t.Medication<
    ARV.UnitRegimen,
    MedicationForm,
    'arv-ctc',
    never,
    {type: 'single'; text: string}
  >;

  export type ComposedARVMedication = t.Medication<
    string,
    MedicationForm,
    'arv-ctc',
    Ingredient<{identifier: ARV.UnitRegimen; text: string}>,
    {type: 'composed'; short?: string; text: string}
  >;

  export type ARVStockRecord = t.StockRecord<
    ARVMedication,
    {units: 'mg' | 'cc' | 'tablets'; amount: number},
    CTC.Organization,
    {
      estimatedFor: '30-days' | '60-days' | '90-days';
      group: 'adults' | 'pediatrics';
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
    associatedAppointment: ReferenceIdentifier<'Appointment'> | null;
    isPregnant: boolean | null;
    dateOfPregancy: YYYYMMDDDateString;
    visitType: 'home' | 'community';
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
    regimenDuration: DurationOpt;
  }>;
  /**
   * Investigation Requests
   * -----
   */
  export type InvestigationRequest = t.InvestigationRequest<{
    investigationId: Investigation;
    obj: InvestigationTypeRecord<string> | null;
  }>;
  export type InvestigationResult = t.InvestigationResult<InvestigationRequest>;

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
   * Visit
   * ----
   */
  export type Visit = t.Visit<
    {patient: Patient; practitioner: Doctor},
    | IntialPatientIntakeAssessment
    | HIVPatientIntakeAssessment
    | PatientAdherenceAssessment
    | ConcludingAssessment
    | t.Assessment, // temporary assessment data
    MedicationRequest,
    InvestigationRequest,
    AppointmentResponse,
    MedicationRequestVisitData
  >;
  export type MedicationRequest = t.MedicationRequest<ARVMedication>;
  export type MedicationDispense = t.MedicationDispense<MedicationRequest>;
}
