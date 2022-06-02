import {Organization} from '../../emr-types/v1/administration';
import {Patient} from '../../emr-types/v1/personnel';

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
