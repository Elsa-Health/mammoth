/**
 * All page actions are included here
 */

import {ElsaProvider} from '../../provider/backend';
import {CTCOrganization} from '../emr/types';

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
