/**
 * Contains things that support the conversion across types
 * need by screen and that needed in storage
 */

import {CTCOrganization, CTCPatient} from '../emr/types';
import {PatientFormType} from '../_screens/RegisterNewPatient';

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
  const [dd, mm, yy] = dateStr.split('/');
  return `${yy}-${mm}-${dd}`;
};

export const getIfTrue = <T>(
  condition: boolean,
  value: T | undefined,
): T | null => {
  return Boolean(condition) ? value ?? null : null;
};

const runIfIsNot = <T, NT, O, F>(
  d: T,
  nd: NT,
  fn: (i: T) => O,
  fallback: F,
) => {
  if (d !== nd) {
    return fn(d);
  }

  return fallback;
};

export const runIfNotUnd = <T, O>(d: T, fn: (d: T) => O) =>
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
): CTCPatient {
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
  };
}
