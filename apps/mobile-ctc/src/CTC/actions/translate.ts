/**
 * Contains things that support the conversion across types
 * need by screen and that needed in storage
 */

import {format} from 'date-fns';
import {Investigation} from 'elsa-health-data-fns/lib';
import {uniqueId} from 'lodash';
import {Patient, Practitioner} from '../../emr-types/v1/personnel';
import {
  ConcludingAssessment,
  CTCDoctor,
  CTCOrganization,
  CTCPatient,
  HIVPatientIntakeAssessment,
  IntialPatientIntakeAssessment,
  PatientAdherenceAssessment,
} from '../emr/types';
import {removeWhiteSpace} from '../emr/utils';
import {FirstPatientIntake} from '../_screens/BasicPatientIntake/BasicPatientIntake.screen';
import {ConcludeAssessmentData} from '../_screens/ConcludeAssessment/ConcludeAssessment.screen';
import {PatientAdherenceInfo} from '../_screens/HIVAdherenceAssessment/HIVAdherenceAssessment.screen';
import {HIVPatientIntake} from '../_screens/HIVStageIntake/HIVStageIntake.screen';
import {PatientFormType} from '../_screens/RegisterNewPatient';
import {arv, investigationRequest, medRequest, stanMed} from './basic';

/**
 * Checks if the input is a proper text
 * @param str
 * @param fallback
 */
export const text = <T extends string | null>(
  str: string | undefined,
  fallback?: T,
): string | T | null => {
  if (str === undefined) return fallback ?? null;
  if (str.trim().length === 0) return fallback ?? null;
  return str.trim();
};

export const convertDMYToYMD = (dateStr: string) => {
  const [dd, mm, yy] = removeWhiteSpace(dateStr).split('/');
  return `${yy}-${mm}-${dd}`;
};

export const getIfTrue = <T>(
  condition: boolean,
  value: T | undefined,
): T | null => {
  return Boolean(condition) ? value ?? null : null;
};

const runIfIsNot = <T, NT, O, F>(
  d: T | NT,
  nd: NT,
  fn: (i: T) => O,
  fallback: F,
) => {
  if (d !== nd) {
    return fn(d as T);
  }

  return fallback;
};

export const runIfNotUnd = <T, O>(d: T | undefined, fn: (d: T) => O) =>
  runIfIsNot(d, undefined, fn, null);

/**
 * Conver the data for the information as received from
 * the form to the a storable version
 * @param id
 * @param from
 * @param organization
 * @param createdAt
 * @returns
 */
export function translatePatient(
  from: PatientFormType,
  organization: Nullable<CTCOrganization>,
  createdAt: Date = new Date(),
) {
  const address = text(from.resident);
  const info = {
    firstName: text(from.firstName),
    familyName: text(from.familyName),
    phoneNumber: text(from.phoneNumber),
    address: address !== null ? `District ${address}` : address,
  };

  const contact = {
    phoneNumber: text(from.phoneNumber),
    email: null,
  };

  const data = {
    hasPositiveStatus: from.hasPositiveTest,
    hasTreatmentSupport: from.hasTreatmentSupport,
    isCurrentlyOnARV: from.hasPatientOnARVs,
  };

  return {
    id: from.patientId,
    resourceType: 'Patient',
    code: null,
    createdAt: createdAt.toUTCString(),

    info: Object.values(info).every(d => d === null) ? null : info,
    active: true,

    contact: Object.values(contact).every(d => d === null) ? null : contact,
    sex: from.sex,
    maritalStatus: from.maritalStatus,
    link: null,
    communicaton: {
      language: 'en',
    },
    birthDate: convertDMYToYMD(from.dateOfBirth),
    managingOrganization: organization,
    extendedData: {
      ...data,
      dateOfHIVPositiveTest: getIfTrue(
        data.hasPositiveStatus,
        runIfNotUnd(from.dateOfTest, convertDMYToYMD),
      ),
      dateOfStartARV: getIfTrue(
        data.isCurrentlyOnARV,
        runIfNotUnd(from.dateStartedARVs, convertDMYToYMD),
      ),
      typeOfSupport: getIfTrue(data.hasTreatmentSupport, from.typeOfSupport),
      whoStage: from.whoStage ?? null,
    },
  } as CTCPatient;
}

function report<C extends string, D extends Data>(
  code: C,
  data: D,
  config: {
    id: string;
    reporter: Referred<CTCDoctor>;
    subject: Referred<CTCPatient>;
  },
  createdAt: Date = new Date(),
) {
  return {
    code: 'intake',
    createdAt: createdAt.toUTCString(),
    resourceType: 'Report',
    id: config.id,
    reportCode: 'assessment',
    reporter: config.reporter,
    subject: config.subject,
    result: {
      resourceType: 'Observation',
      code: null,
      createdAt: createdAt.toUTCString(),
      id: `asessment-${config.id}`,
      data: {},
    },
  };
}

export function translateFirstPatientIntake(
  config: {
    id: string;
    reporter: Referred<CTCDoctor>;
    subject: Referred<CTCPatient>;
  },
  from: FirstPatientIntake,
  createdAt: Date = new Date(),
): IntialPatientIntakeAssessment {
  return {
    code: 'intake',
    createdAt: createdAt.toUTCString(),
    resourceType: 'Report',
    id: config.id,
    reportCode: 'assessment',
    reporter: config.reporter,
    subject: config.subject,
    result: {
      associatedAppointment: null,
      dateOfPregancy: format(from.dateOfPregancy, 'dd / MM / yyyy'),
      diastolic: runIfNotUnd(from.diastolic, parseFloat),
      systolic: runIfNotUnd(from.systolic, parseFloat),
      weight: runIfNotUnd(from.weight, parseInt),
      height: runIfNotUnd(from.height, parseInt),
      isPregnant: from.isPregnant ?? null,
      visitType: from.visitType,
    },
  };
}

export function translateHIVAssessment(
  config: {
    id: string;
    reporter: Referred<CTCDoctor>;
    subject: Referred<CTCPatient>;
  },
  from: HIVPatientIntake,
  createdAt: Date = new Date(),
) {
  const assessment: HIVPatientIntakeAssessment = {
    code: 'hiv',
    createdAt: createdAt.toUTCString(),
    resourceType: 'Report',
    id: config.id,
    reportCode: 'assessment',
    reporter: config.reporter,
    subject: config.subject,
    result: {
      coMorbidities: from.coMorbidities,
      ARVRegimens: from.isTakingARV ? from.ARVRegimens : null,
      medications: from.isTakingMedications ? from.medications : null,
      regimenDuration: from.regimenDuration,
    },
  };

  return assessment;
}

export function translatePatientAdherence(
  config: {
    id: string;
    reporter: Referred<CTCDoctor>;
    subject: Referred<CTCPatient>;
  },
  from: PatientAdherenceInfo,
  createdAt: Date = new Date(),
): PatientAdherenceAssessment {
  return {
    code: 'adherence',
    createdAt: createdAt.toUTCString(),
    resourceType: 'Report',
    id: config.id,
    reportCode: 'assessment',
    reporter: config.reporter,
    subject: config.subject,
    result: from,
  };
}

export function translateConclusionAssessment(
  config: {
    id: string;
    reporter: Referred<CTCDoctor>;
    subject: Referred<CTCPatient>;
  },
  from: ConcludeAssessmentData,
  createdAt: Date = new Date(),
) {
  // make investigation requests
  const invRequests = from.investigations.map(inv => {
    const invR = Investigation.fromKey(inv);
    return investigationRequest(
      {
        id: uniqueId(config.id),
        requester: config.reporter,
        subject: config.subject,
      },
      {investigationId: inv, obj: invR},
    );
  });

  const standMedications = from.medications.map(med =>
    stanMed(`${config.id}-${uniqueId('standMed')}`, med),
  );
  const arvMeds = from.arvRegimens.map(arv_ => arv(uniqueId(config.id), arv_));

  const assessment: ConcludingAssessment = {
    code: 'adherence',
    createdAt: createdAt.toUTCString(),
    resourceType: 'Report',
    id: config.id,
    reportCode: 'assessment',
    reporter: config.reporter,
    subject: config.subject,
    result: {
      appointmentDate: from.appointmentDate,
      arvRegimens: from.arvRegimens,
      decisionReason: from.decisionReason,
      investigations: from.investigations,
      medications: from.medications,
      regimenDecision: from.regimenDecision,
      regimenDuration: from.regimenDuration,
      riskOfNonAdhrence: from.riskOfNonAdhrence,
    },
  };

  // time the medications where authored
  const authoredOn = new Date();

  return {
    assessment,
    medicationRequests: [...standMedications, ...arvMeds].map(med =>
      medRequest(
        uniqueId(`req-${med.id}`),
        med,
        {},
        {requester: config.reporter, subject: config.subject},
        authoredOn,
      ),
    ),
    investigationRequests: invRequests,
  };
}
