/// <reference types="@elsa-health/data-fns/lib/index" />
/**
 * Appoinment object for CTC
 */
declare namespace CTC {
  type Appointment = {
    patientId: string;
    visitIdCreated: string;
    visitIdFullfilled: string;
    fullFilledDate: UTCDateTime;
    date: YYYYMMDDDate;
  };

  type Visit = {
    id: string;
    dateTime: UTCDateTime;
    patientId: string;

    // shows the appointment the visit is fullfilling
    appointmentId?: string;
    patient: {
      age: Age;
      sex: Sex;
    };
    intake: {
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
      isTakingMedications: boolean;
      medications?: string[];
    };
    symptomAssessment: {
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
    assessmentSummary: object;
  };

  type Patient = {
    id: string;
    sex: Sex;
    firstName: string;
    lastName: string;
    phoneNumber: string;
    dateOfBirth: YYYYMMDDDate;
    martialStatus: string;
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
