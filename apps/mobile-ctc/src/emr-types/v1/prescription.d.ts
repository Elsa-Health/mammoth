import {HealthcareService, Organization} from './administration';
import {Practitioner, Patient} from './personnel';

export type MedicationRequest<
  M extends Medication<string, Data> = Medication<string, Data>,
> = Resource<
  'MedicationRequest',
  {
    /**
     * With whom the request concerns
     */
    subject: Referred<Patient>;

    /**
     * Requester or the medicaiton
     */
    requester: Nullable<Referred<Patient> | Referred<Practitioner>>;

    /**
     * Medication requested
     */
    medication: Referred<M>;

    /**
     * Date the medication request was issued
     * // THINK: might be the as createdAt
     */
    authoredOn: UTCDateTimeString;

    /**
     * Status of the request
     */
    status: 'active' | 'cancelled' | 'completed' | 'on-hold' | 'stopped';

    /**
     * How the drug should enter the body
     */
    route: string;

    /**
     * How medicaition is administered
     */
    method: string;

    /**
     * Free text information about the medication
     */
    reason: Nullable<string>;

    /**
     * Timing of the when to administer the prescription
     */
    // timing: Nullable<string>;

    /**
     * Instruction that's set for patient
     */
    instructions: Nullable<string>;
  }
>;

export type MedicationDispense<
  M extends Medication<string, Data> = Medication<string, Data>,
> = Resource<
  'MedicationDispense',
  {
    supplier: Referred<Practitioner>;
    medication: Referred<M>;
    authorizingRequest: Referred<MedicationRequest<M>>;

    /**
     * Decription dosage and rate of medication
     */
    dosageAndRate: Nullable<{
      type: string;
      doseRange: any;
      doseQuantity: number;
      rateRatio: any;
      rateQuantity: number;
    }>;
  }
>;

export type MedicationPickupReport = Resource<
  'MedicationDispenseReport',
  {
    // Think of a good way to represent a signature
    supplingOrganization: Referred<Organization>;

    authorizingDispenseNotice: Referred<MedicationDispense>;

    /**
     * Person who geve the medication
     */
    dispenser: Referred<Practitioner>;

    /**
     * Date and Time the medication was picked up
     */
    pickedUpAt: UTCDateTimeString;

    /**
     * Information to elaborate more during the medication pickup
     */
    info: Data;
  }
>;

export type Medication<
  Category extends string,
  D extends Data,
  Ingrdients extends Data = Data,
> = Resource<
  'Medication',
  {
    /**
     * Name of the medication
     */
    name: string;

    /**
     * Alternative name
     */
    alias: Nullable<string>;

    /**
     * Ingredients used in creating
     * the medication
     */
    ingredients: Ingrdients[];

    /**
     * Data about
     */
    data: Nullable<D>;
  },
  Category
>;