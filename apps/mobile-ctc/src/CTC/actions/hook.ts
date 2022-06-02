import produce from 'immer';
import React from 'react';
import {CTCDoctor, CTCPatient, CTCVisit} from '../emr/types';
import {FirstPatientIntake} from '../_screens/BasicPatientIntake/BasicPatientIntake.screen';
import {ConcludeAssessmentData} from '../_screens/ConcludeAssessment/ConcludeAssessment.screen';
import {PatientAdherenceInfo} from '../_screens/HIVAdherenceAssessment/HIVAdherenceAssessment.screen';
import {HIVPatientIntake} from '../_screens/HIVStageIntake/HIVStageIntake.screen';
import {
  translateConclusionAssessment,
  translateFirstPatientIntake,
  translateHIVAssessment,
  translatePatientAdherence,
} from './translate';

type CurrentVisit = {
  firstPatientIntake: FirstPatientIntake;
  currentHIVStatus: HIVPatientIntake;
  patientAdherenceInfo: PatientAdherenceInfo;
  conclusionAssessment: ConcludeAssessmentData;
};

const convertToProperVisit = (
  id: string,
  visit: Partial<CurrentVisit>,
  ref: {doctor: CTCDoctor; patient: CTCPatient},
  generateId: () => string,
): CTCVisit => {
  const {
    firstPatientIntake,
    currentHIVStatus,
    patientAdherenceInfo,
    conclusionAssessment,
  } = visit;

  const config = () => ({
    id: generateId(),
    reporter: ref.doctor,
    subject: ref.patient,
  });

  const ctcVisit = produce(
    {
      id,
      authorizingAppointment: null,
      assessments: [],
      prescriptions: [],
      investigationRequests: [],
      code: null,
      createdAt: new Date().toUTCString(),
      extendedData: null,
      practitioner: ref.doctor,
      resourceType: 'Visit',
      subject: ref.patient,
    } as CTCVisit,
    df => {
      if (firstPatientIntake !== undefined) {
        df.assessments.push(
          translateFirstPatientIntake(config(), firstPatientIntake),
        );
      }

      if (currentHIVStatus !== undefined) {
        df.assessments.push(translateHIVAssessment(config(), currentHIVStatus));
      }

      if (patientAdherenceInfo !== undefined) {
        df.assessments.push(
          translatePatientAdherence(config(), patientAdherenceInfo),
        );
      }

      if (conclusionAssessment !== undefined) {
        const {
          assessment: concAssessment,
          investigationRequests,
          medicationRequests,
        } = translateConclusionAssessment(config(), conclusionAssessment);

        df.assessments.push(concAssessment);

        df.investigationRequests = investigationRequests;
        df.prescriptions = medicationRequests;
      }

      df.subject = ref.patient;
      df.practitioner = ref.doctor;
    },
  );

  return ctcVisit;
};

export function useVisit() {
  const [visit, set] = React.useState<Partial<CurrentVisit>>({});

  /**
   * Set the values for the values
   * @param field
   * @param value
   */
  const setValue = <F extends keyof CurrentVisit>(
    field: F,
    value: CurrentVisit[F],
  ) => {
    set(s =>
      produce(s, df => {
        df[field] = value;
      }),
    );
  };

  /**
   * Reset the current Visit value
   * @returns
   */
  const reset = () => set({});

  /**
   * Get Visit
   * @returns
   */
  const constructVisit = (
    id: string,
    ref: {patient: CTCPatient; doctor: CTCDoctor},
    generateId: () => string,
  ) => convertToProperVisit(id, visit, ref, generateId);

  return {
    setValue,
    reset,
    visit,
    constructVisit,
  };
}
