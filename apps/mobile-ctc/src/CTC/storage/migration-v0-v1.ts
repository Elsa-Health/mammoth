import {Assessment, Visit} from '../../../@types/hdd/v1/visit';
import {Observation} from '../../../@types/hdd/v1/observation';

import _ from 'lodash';
import {Patient, Practitioner} from '../../../@types/hdd/v1/personnel';
import {Investigation, Report} from '../../../@types/hdd/v1/investigation';
import {Appointment} from '../../../@types/hdd/v1/appointment';
import {Medication, Prescription} from '../../../@types/hdd/v1/prescription';

export function convert_v0_patient_to_v1(id: string, data: CTC.Patient) {
  return resource(
    {
      info: {
        name: `${data.firstName} ${data.lastName}`.trim(),
        address: `District: ${data.district}`,
      },
      contact: {
        phoneNumber: data.phoneNumber,
        email: null,
      },
      sex: data.sex,
      birthDate: data.dateOfBirth,
      maritalStatus: data.maritalStatus,
      communicaton: {
        language: 'en',
      },
      extendedData: _.pick(data, [
        'dateOfHIVPositive',
        'hasPatientOnARVs',
        'dateStartedARVs',
        'hasTreatmentSupport',
        'typeOfSupport',
      ]),
    },
    {
      id,
      resourceType: 'Patient',
      createdAt: new Date(data.registeredDate),
    },
  ) as Patient<{
    dateOfHIVPositive?: YYYYMMDDDate;
    hasPatientOnARVs: boolean;
    dateStartedARVs?: YYYYMMDDDate;
    hasTreatmentSupport: boolean;
    typeOfSupport?: string;
  }>;
}

export function convert_v0_investigation_to_v1(
  id: string,
  invd: {
    investigationId: string;
    obj: {
      type: string;
      units: string;
    };
    result?: string;
  },
  generateId: () => string,
  ref?: {
    patientId: string;
  },
) {
  const {result, ...head} = invd;
  return resource(
    {
      subject:
        ref !== undefined
          ? _reference({
              resourceType: 'Patient',
              id: ref.patientId,
            })
          : null,
      request: referred(
        resource(
          {
            data: head,
            requester: null,
          },
          {
            id: generateId,
            resourceType: 'InvestigationRequest',
          },
        ),
        'object',
      ),
      result:
        result !== undefined
          ? referred(
              resource(
                {
                  recorder: null,
                  observation: referred(
                    observation(result, {id: generateId}),
                    'object',
                  ),
                },
                {id: generateId, resourceType: 'InvestigationResult'},
              ),
              'object',
            )
          : null,
    },
    {
      id,
      resourceType: 'Investigation',
    },
  ) as Investigation;
}

export function convert_v0_appointment_to_v1(
  id: string,
  appt: CTC.Appointment,
  d: {apptRequestId: Id; apptResponseId: Id},
) {
  const appointmentRequest = resource(
    {
      participants: [
        _reference({
          id: appt.patientId,
          resourceType: 'Patient',
        }),
      ],
    },
    {
      id: d.apptRequestId,
      resourceType: 'AppointmentRequest',
    },
  );

  /**
   * Response for the appointment to be created
   */
  //   const appointmentResponse = resource(
  //     {},
  //     {
  //       id: d.apptResponseId,
  //       resourceType: 'AppointmentResponse',
  //     },
  //   );

  const appointment = resource(
    {
      visitOrigin: _reference({
        id: appt.visitIdCreated,
        resourceType: 'Visit',
      }),
      request: referred(appointmentRequest, 'object'),
      response: null,
    },
    {
      id: id,
      resourceType: 'Appointment',
    },
  ) as Appointment;

  return {appointment, appointmentRequest};
}

export function convert_v0_visit_to_v1(
  id: string,
  v0Visit: CTC.Visit,
  generateId: () => string,
) {
  const patient_ = patient({
    id: v0Visit.patientId,
    birthDate: 'NILL',
    preferredLanguage: 'en',
    sex: 'male',
  });

  const practitioner_ = practitioner({
    id: 'NILL',
    name: '',
    gender: 'unknown',
    createdAt: new Date(),
    preferredLanguage: 'en',
    address: 'NILL',
  });
  const ref = {
    subject: referred(patient_, 'reference'),
    reporter: referred(practitioner_, 'reference'),
  };

  /**
   * Assessment related data
   */
  const assessments_: [string, Data][] = [];
  assessments_.push(['intake', v0Visit.intake]);

  if (v0Visit.symptomAssessment !== undefined) {
    assessments_.push(['symptom.assessment', v0Visit.symptomAssessment]);
  }

  // add adherence
  assessments_.push(['adherence', v0Visit.adherenceAssessment]);

  const {investigations, medicationInfo, ...otherAssessmentSummaryInfo} =
    v0Visit.assessmentSummary;

  assessments_.push(['adherence', otherAssessmentSummaryInfo]);

  /**
   * Medication Related Data
   */

  /**
   * Investigations related data
   */

  return {
    /**
     * Visit associated with the data
     */
    visit: visit(
      id,
      referred(patient_, 'reference'),

      // This data to be update in the future
      referred(practitioner_, 'reference'),
      {
        data: {
          sex: v0Visit.patient.sex,
          age: v0Visit.patient.age,
        },
        assessments: assessments_.map(([code, data]) =>
          assessment(
            code,
            referred(observation(data, {id: generateId}), 'object'),
            {id: generateId},
            ref,
          ),
        ),
      },
    ),

    /**
     * Patient associated with the record
     */
    patient: patient_,

    /**
     * @deprecated
     * Don't save this record since we haven't
     * stored this data in the first place
     */
    practitioner: practitioner_,
  };
}

export function visit<T extends Data>(
  id: string,
  subject: Referred<Patient>,
  practitioner: Referred<Practitioner>,
  a: {
    data: T;
    assessments?: Referred<Assessment<Data>>[];
    investigations?: Referred<Investigation<Data>>[];
    prescriptions?: Referred<Assessment<Data>>[];
  },
  appointmentOrigin?: Referred<Appointment>,
) {
  return {
    id,
    resourceType: 'Visit',
    code: null,
    appointmentOrigin: appointmentOrigin ?? null,
    createdAt: new Date().toUTCString(),
    subject,
    practitioner,
    assessments: a.assessments ?? null,
    investigations: a.investigations ?? null,
    prescriptions: a.prescriptions ?? null,
    extendedData: a.data ?? null,
  } as Visit<T>;
}

type Id = string | (() => string);

export function medication<D extends Data>(
  data: D,
  d: {id: Id; name: string},
): Medication<D> {
  return resource(
    {
      name: d.name,
      alias: d.name,
      ingredients: [],
      data,
    },
    {
      id: d.id,
      resourceType: 'Medication',
    },
  );
}

/**
 * Prescription for the medication
 * @param medication {Referred<Medication>} Medication for description
 * @returns
 */
export function prescription<MD extends Data>(
  medication: Referred<Medication<MD>>,
  details: {
    id: Id;
  },
) {
  return resource(
    {
      taken: false,
      route: 'NILL',
      method: 'NILL',
      text: null,
      timing: null,
      instructions: null,
      medication,
      dosageAndRate: {
        type: 'NILL',
        doseRange: null,
        doseQuantity: 0,
        rateRatio: null,
        rateQuantity: 0,
      },
    },
    {
      resourceType: 'Prescription',
      id: details.id,
    },
  );
}

export function patient(data: {
  id: string;
  name?: string;
  createdAt?: Date;
  preferredLanguage: 'en' | 'sw';
  birthDate: YYYYMMDDDateString;
  address?: string;
  sex: 'male' | 'female';
  phoneNumber?: string;
  email?: string;
  maritalStatus?: string;
}) {
  return resource(
    {
      birthDate: data.birthDate,
      communicaton: {
        language: data.preferredLanguage,
      },
      contact:
        data.phoneNumber !== undefined || data.email !== undefined
          ? {
              phoneNumber: data.phoneNumber ?? null,
              email: data.email ?? null,
            }
          : null,
      info: data.name
        ? {
            name: data.name,
          }
        : null,
      maritalStatus: data.maritalStatus ?? null,
    },
    {
      id: data.id,
      resourceType: 'Patient',
    },
  ) as Patient;
}

export function practitioner(data: {
  id: Id;
  name: string;
  createdAt?: Date;
  preferredLanguage: 'en' | 'sw';
  birthDate?: YYYYMMDDDateString;
  address: string;
  gender: 'male' | 'female' | 'other' | 'unknown';
  phoneNumber?: string;
  email?: string;
}) {
  return resource(
    {
      address: data.address ?? null,
      birthDate: data.birthDate ?? null,
      gender: 'male',
      communication: {
        language: data.preferredLanguage,
      },
      contact:
        data.phoneNumber !== undefined || data.email !== undefined
          ? {
              phoneNumber: data.phoneNumber ?? null,
              email: data.email ?? null,
            }
          : null,
      name: data.name,
      active: true,
    },
    {
      id: data.id,
      resourceType: 'Practitioner',
    },
  ) as Practitioner;
}

export function resource<
  ResourceType extends string,
  Code extends string,
  T extends Data,
>(
  data: T,
  details: {
    id: string | (() => string);
    resourceType: ResourceType;
    code?: Code;
    createdAt?: Date;
  },
): Resource<ResourceType, T, Code> {
  return Object.assign(
    {
      id: typeof details.id === 'string' ? details.id : details.id(),
      resourceType: details.resourceType,
      code: details.code ?? null,
      createdAt: (details.createdAt || new Date()).toUTCString(),
    },
    data,
  );
}

export function observation<T extends Data>(data: T, d: {id: Id}) {
  return resource(
    {
      data,
      reason: null,
      referenceRange: null,
    },
    {id: d.id, resourceType: 'Observation'},
  ) as Observation<T>;
}

export function assessment<T extends Data>(
  code: string,
  observation: Referred<Observation<T>>,
  d: {id: Id},
  ref: {
    subject: Referred<Patient>;
    reporter: Referred<Practitioner>;
  },
): Assessment<T> {
  return report('assessment', code, observation, d, ref);
}

export function report<T extends Data, RC extends string, C extends string>(
  reportCode: RC,
  code: C,
  observation: Referred<Observation<T>>,
  d: {
    id: Id;
  },
  ref: {
    subject: Referred<Patient>;
    reporter: Referred<Practitioner>;
  },
): Report<RC, T, C> {
  return resource(
    {
      reportCode,
      reporter: ref.reporter,
      subject: ref.subject,
      result: observation,
    },
    {
      id: d.id,
      resourceType: 'Report',
      code,
      createdAt: new Date(),
    },
  );
}

function _reference<T extends string>(resource: {
  resourceType: T;
  id: string;
}): ReferenceIdentifier {
  return {
    resourceType: 'reference',
    resourceReferenced: resource.resourceType,
    id: resource.id,
  };
}

export function referred<
  ResourceType extends string,
  R extends Resource<ResourceType, Data>,
  RType extends 'object' | 'reference',
>(
  resource: R,
  type: RType,
): RType extends 'object' ? R : ReferenceIdentifier<ResourceType> {
  // @ts-ignore
  return type === 'object' ? resource : _reference(resource);
}
