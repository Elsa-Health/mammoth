import {Patient, Practitioner} from './personnel';
import {Visit} from './visit';

/**
 * Appointment
 */
export type Appointment<
  ARq extends AppointmentRequest,
  ARs extends AppointmentResponse,
> = Resource<
  'Appointment',
  {
    subject: Referred<Patient>;

    /**
     * Identifies the patient that the appointment concerns
     */
    request: Referred<ARq>;

    /**
     * information concerning the appointment
     */
    response: Nullable<Referred<ARs>>;
  }
>;

/**
 * Appointment Request
 */
type AppointmentRequest<
  Actor extends Patient | Practitioner = Patient | Practitioner,
> = Resource<
  'AppointmentRequest',
  {
    /**
     * Identifies the visit that fulfilled the appointment
     */
    visit: Nullable<ReferenceIdentifier<'Visit'>>;

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
    participants: Array<ReferenceIdentifier<Actor['resourceType']>>;
  }
>;

type AppointmentResponse<
  Actor extends Patient | Practitioner = Patient | Practitioner,
> = Resource<
  'AppointmentResponse',
  {
    visit: Nullable<ReferenceIdentifier<'Visit'>>;
    startTime: number;
    endTime: number;
    actors: Array<ReferenceIdentifier<Actor['resourceType']>>;
    comment: Nullable<string>;
  }
>;
