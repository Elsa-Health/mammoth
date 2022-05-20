/**
 * Representation of the patient object
 *
 * THINK: Should really seperate `Identifier` from `body`?
 * Reason I thought of, might want to mask `Identifier`, special indexing?
 */
export type Patient<PatientBody extends Data = Data> = Resource<
  'Patient',
  {
    /**
     * Object containing the patient's indentifying information
     * This can include name, address, phone number, etc.
     *
     */
    info: Nullable<{
      name: string;
      address: Nullable<string>;
    }>;

    /**
     * Means of contacting the patient
     */
    contact: Nullable<Contact>;

    /**
     * Sex of the patient
     */
    sex: 'male' | 'female';

    /**
     * The patient's date of birth
     * Should be set as `YYYY-MM-DD`
     */
    birthDate: YYYYMMDDDateString;

    /**
     * Marital Status
     */
    maritalStatus: string;

    /**
     * more information about the patient
     */
    extendedData: Nullable<PatientBody>;

    /**
     * Language to use to communicate with the person
     */
    communicaton: Nullable<{
      language: 'en' | 'sw';
    }>;

    /**
     * Business identifier for the patient
     */
  } & Identifier
>;

/**
 * Related with contact inforamtion
 */
type Contact = {phoneNumber: Nullable<string>; email: Nullable<string>};

/**
 * Practitioner
 */
export type Practitioner = Resource<
  'Practitioner',
  {
    active: boolean;
    name: string;
    address: Nullable<string>;
    contact: Nullable<Contact>;
    birthDate: Nullable<YYYYMMDDDateString>;
    gender: 'male' | 'female' | 'other' | 'unknown';
    communication: Nullable<{
      language: 'en' | 'sw';
    }>;

    /**
     * Identifier used in the business
     */
  } & Identifier
>;
