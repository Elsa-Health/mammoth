/**
 * All page actions are included here
 */

import {ARV, Investigation, Medication} from 'elsa-health-data-fns/lib';
import {InvestigationTypeRecord} from 'elsa-health-data-fns/lib/investigations';
import {InvestigationRequest} from '../../emr-types/v1/investigation';
import {Practitioner} from '../../emr-types/v1/personnel';
import {ElsaProvider} from '../../provider/backend';
import {
  ARVMedication,
  CTCDoctor,
  CTCInvestigationRequest,
  CTCInvestigationResult,
  CTCMedicationRequest,
  CTCOrganization,
  CTCPatient,
  StandardMedication,
} from '../emr/types';

export function getOrganizationFromProvider(ep: ElsaProvider): CTCOrganization {
  const {name, phoneNumber, address, ctcCode, website} = ep.facility;

  {
    return {
      id: name + (ctcCode ?? ''),
      active: true,
      associatedOrganization: null,
      code: null,
      // Get this information
      createdAt: new Date().toUTCString(),
      email: null,
      identifier:
        ctcCode === undefined
          ? null
          : {
              ctcCode,
            },
      name,
      resourceType: 'Organization',
      phoneNumber,
      extendedData: {
        geo: null,
        address: address ?? null,
        website: website ?? null,
      },
    };
  }
}

export function investigationRequest<
  Inv extends InvestigationTypeRecord<string>,
>(
  config: {
    id: string;
    requester: Referred<CTCDoctor>;
    subject: Referred<CTCPatient>;
  },
  data: {investigationId: Investigation; obj: Inv},
  createdAt: Date = new Date(),
): CTCInvestigationRequest {
  return {
    id: config.id,
    subject: config.subject,
    code: null,
    resourceType: 'InvestigationRequest',
    createdAt: createdAt.toUTCString(),
    data,
    requester: config.requester,
  };
}

export function investigationResult<InvReq extends CTCInvestigationRequest>(
  id: string,
  request: InvReq,
  result: any,
  reason: string | undefined,
  practitioner: Referred<Practitioner>,
  createdAt: Date = new Date(),
): CTCInvestigationResult {
  return {
    authorizingRequest: request,
    code: null,
    createdAt: createdAt.toUTCString(),
    id: id,
    observation: {
      code: null,
      createdAt: createdAt.toUTCString(),
      data: result,
      id: `${id}-observation`,
      reason: reason ?? null,
      resourceType: 'Observation',
      referenceRange: null,
    },
    recorder: practitioner,
    resourceType: 'InvestigationResult',
  };
}

const getClassFromRegimen = (regimen: ARV.Regimen): ARV.Class | null => {
  return (
    ARV.pairs().find(([_class, regimens]) => regimens.includes(regimen))?.[0] ??
    null
  );
};

export const reference = <T extends string, R extends Resource<T, Data>>(
  d: R,
): ReferenceIdentifier<T> => ({
  id: d.id,
  resourceReferenced: d.resourceType,
  resourceType: 'Reference',
});

export function arv(
  id: string,
  arvRegimen: ARV.Regimen,
  createdAt: Date = new Date(),
): ARVMedication {
  return {
    id: `ctc-arv:${id}`,
    alias: null,
    code: null,
    createdAt: createdAt.toUTCString(),
    data: {
      className: getClassFromRegimen(arvRegimen),
      regimen: arvRegimen,
    },
    resourceType: 'Medication',
    name: arvRegimen,
    ingredients: [],
  };
}

export function stanMed(
  id: string,
  medication: Medication.All,
  createdAt: Date = new Date(),
): StandardMedication {
  return {
    id: `ctc-standard:${id}`,
    alias: null,
    code: null,
    createdAt: createdAt.toUTCString(),
    data: {medication, text: Medication.all.fromKey(medication)},
    resourceType: 'Medication',
    name: medication,
    ingredients: [],
  };
}

export function medRequest<Med extends ARVMedication | StandardMedication>(
  id: string,
  med: Med,
  data: {
    instructions?: string;
    method?: string;
    reason?: string;
    route?: string;
  },
  ref: {requester: Practitioner; subject: CTCPatient},
  authoredOn: Date = new Date(),
  createdAt: Date = new Date(),
): CTCMedicationRequest {
  return {
    id,
    authoredOn: authoredOn.toUTCString(),
    createdAt: createdAt.toUTCString(),
    code: null,
    instructions: data.instructions ?? null,
    medication: med,
    method: data.method ?? null,
    reason: data.reason ?? null,
    subject: ref.subject,
    requester: ref.requester,
    resourceType: 'MedicationRequest',
    route: data.route ?? null,
    status: 'active',
  };
}
