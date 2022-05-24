/// <reference types="elsa-health-data-fns/lib/index" />
/**
 * Appoinment object for CTC
 */
declare namespace CTC {
  type Appointment = {
    id: string;
    patientId: string;
    visitIdCreated: string;
    visitIdFullfilled?: string;

    /**
     * Date with with the visit is fullfilled.
     * (Same as the date in the `visitIdFullfilled` visit)
     */
    fulfilledDate?: UTCDateTime;

    date: UTCDateTime;
  };

  type Visit = {
    id: string;
    dateTime: UTCDateTime;
    patientId: string;

    // shows the appointment the visit is fullfilling
    fulfilledAppointmentId?: string | null;
    patient: {
      age: Age;
      sex: Sex;
    };
    intake: {
      // for doctor to explicitly indicate
      doctorIndicatesFromAppointment?: boolean;
      isPregnant?: boolean;
      dateOfPregancy?: DBDateTime;
      weight?: number;
      height?: number;
      systolic?: number;
      diastolic?: number;
      whoStage: string;
      functionalStatus: string;
      coMorbidities: string[];
      isTakingARV: boolean;
      ARVRegimens?: string[];
      regimenDuration?: string;
      isTakingMedications: boolean;
      medications?: string[];
    };
    symptomAssessment?: {
      data: {
        present: object[];
        absent: string[];
      };
      elsa_differentials:
        | {
            condition: string;
            p: number;
            id: string;
          }[]
        | null;
      doctorDiagnosis?: string[];
    };
    adherenceAssessment: {
      educationLevel: string;
      forgottenCount: number;
      hasJob: boolean;
      hasFrequentAlc: boolean;
      isShareDrugs: boolean;
      isExperienceSideEffects: boolean;
      doesPatientUnderstandRegimen: boolean;
    };
    assessmentSummary: {
      summary: {
        condition?: Condition | CTC.Condition;
        conditionValuePairs?: [Condition | CTC.Condition, number][];
        riskNonAdherence: number | undefined;
        appointmentDate: Date | undefined;
      };
      nextSteps: CTC.NextStepsObject;
      investigations: CTC.Test[];
      medicationInfo: HIVDispenseMedication;
    };
    investigations: {
      [key in Investigation]?: any;
    };
  };

  export type HIVDispenseMedication = {
    medications: Medication.All | CTC.Medication[];
    status: CTC.Status | undefined;
    reason?: string | undefined;
    arvRegimens: ARV.Regimen[];
    regimenDuration?: string | undefined;
  };
  type Patient = {
    id: string;
    sex: Sex;
    facilityId: string;
    firstName: string;
    lastName: string;
    phoneNumber: string;
    dateOfBirth: YYYYMMDDDate;
    maritalStatus: string;
    district: string;
    hasPositiveTest: boolean;
    dateOfHIVPositive?: YYYYMMDDDate;
    hasPatientOnARVs: boolean;
    dateStartedARVs?: YYYYMMDDDate;
    hasTreatmentSupport: boolean;
    typeOfSupport?: string;
    registeredDate: UTCDateTime;
  };
}

/**
 * CTC Facility
 */
type Facility = {};
