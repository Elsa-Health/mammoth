import {AppointmentResponse} from './appointment';
import {InvestigationRequest, Report} from './investigation';
import {Patient, Practitioner} from './personnel';
import {MedicationRequest} from './prescription';

export type Visit<
  P extends {patient: Patient; practitioner: Practitioner} = {
    patient: Patient;
    practitioner: Practitioner;
  },
  A extends Assessment = Assessment,
  M extends MedicationRequest = MedicationRequest,
  IRq extends InvestigationRequest<Data> = InvestigationRequest<Data>,
  Appt extends AppointmentResponse = AppointmentResponse,
  Value extends Data = Data,
> = Resource<
  'Visit',
  {
    /**
     * Information that identifies that patient that the visit concerns
     * This can be the patient's GUID, firstname and lastname (assuming this is enough), phone number.
     */
    subject: Referred<P['patient']>;
    /**
     * Practitioner that attended subject to create visit
     * ----
     */
    practitioner: Nullable<Referred<P['practitioner']>>;

    /**
     * Date of the visit
     */
    date: UTCDateTimeString;

    /**
     * Records for the observations that were made udring the visit
     */
    assessments: Array<Referred<A>>;

    /**
     * Identifies the prescriptions details that were made in visit
     */
    prescriptions: Array<Referred<M>>;

    /**
     * Identifies the investigation requests made during visit
     */
    investigationRequests: Array<Referred<IRq>>;

    /**
     * More information about the visit
     */
    extendedData: Nullable<Value>;

    /**
     * Referencing the appintmnt that's associated with the visit
     */
    associatedAppointmentResponse: Nullable<Referred<Appt>>;
  }
>;

export type Assessment<D extends Data = Data> = Report<'assessment', D>;
