import {Patient, Practitioner} from './personnel';
import {Visit} from './visit';

/**
 * Appointment
 */
export type Appointment = Resource<
  'Appointment',
  {
    subject: Referred<Patient>;

    /**
     * Identifies the patient that the appointment concerns
     */
    request: Referred<AppointmentRequest>;

    /**
     * information concerning the appointment
     */
    response: Nullable<Referred<AppointmentResponse>>;
  }
>;

/**
 * Appointment Request
 */
type AppointmentRequest = Resource<
  'AppointmentRequest',
  {
    /**
     * Identifies the visit that fulfilled the appointment
     */
    visit: Nullable<Referred<Visit>>;

    /**
     * Reason for having the appointment
     */
    reason: string;

    /**
     * Information describe the appointment
     */
    description: string;

    /**
     * Participants
     */
    participants: Array<Referred<Patient> | Referred<Practitioner>>;
  }
>;

type AppointmentResponse = Resource<
  'AppointmentResponse',
  {
    visit: Nullable<Referred<Visit>>;
    startTime: number;
    endTime: number;
    actors: Array<Referred<Patient> | Referred<Practitioner>>;
    // actors: Referred<Practitioner>;
    comment: string;
  }
>;
