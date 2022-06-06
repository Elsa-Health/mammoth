import {queryCollection} from '../emr/actions';
import {EMR} from '../emr/store';
import {CTCPatient} from '../emr/types';
import {lower, removeWhiteSpace} from '../emr/utils';
import {SearchQuery} from '../_screens/PatientDashboard/PatientDashboard.screen';

export function queryPatientsFromSearch<T>(
  emr: EMR,
  query: SearchQuery,
  item: (p: CTCPatient) => T,
) {
  const orQueries: Array<(p: CTCPatient) => boolean> = [];
  const {input, searchIn} = query;
  if (input !== undefined) {
    // add function to search ID
    orQueries.push(p => {
      //  search in ID
      if (input.trim().length === 0) {
        return true;
      }

      return (p.id ?? '').includes(input.trim());
    });

    // add function to search from name
    if (Boolean(searchIn?.name)) {
      console.log('Name Q');
      orQueries.push(p => {
        const firstName = lower((p.info?.firstName ?? '').trim());
        const familyName = lower((p.info?.familyName ?? '').trim());
        const fullName = lower(`${firstName} ${familyName}`.trim());

        return (
          firstName.startsWith(input) ||
          familyName.startsWith(input) ||
          fullName.startsWith(input)
        );
      });
    }

    // search phoneNumber
    if (Boolean(searchIn?.phone)) {
      console.log('Phone Q');
      orQueries.push(p => {
        const phoneNumber = p.contact?.phoneNumber ?? '';
        return removeWhiteSpace(phoneNumber).includes(removeWhiteSpace(input));
      });
    }
  }

  // console.log(query);
  return queryCollection(emr.collections.patients, {
    where: {
      $or: orQueries,
    },
    order: {
      type: 'desc',
      field: p => new Date(p.createdAt).getTime(),
    },
  }).then(ps => ps.map(item));
}
