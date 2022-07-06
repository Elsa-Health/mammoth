import {Ingredient, Medication, Stock} from '@elsa-health/emr';
import {ARV, CTC as eCTC} from 'elsa-health-data-fns/lib';

import {CTC} from './types';

import uuid from 'react-native-uuid';
import _ from 'lodash';
import {getDocs, setDocs} from 'papai/collection';
import {EMRModule} from './store';
import {concat} from '@elsa-health/emr/lib/utils';

/**
 * Where inforamtion is initiated
 */
const singles = ARV.units.pairs().map(([arv, text]) =>
  Medication<CTC.SingleARVMedication>({
    identifier: arv,
    id: `${arv}-${uuid.v4()}`,
    form: 'tablets',
    category: 'arv-ctc',
    type: 'single',
    text,
  }),
);

// creation initial feed for the medication
const combos = concat(...ARV.values())
  .filter(d => !d.match(/other/g))
  .map(med => {
    const text = ARV.regimen.fromKey(med);
    const [s, v] = text.split('=').map(s => s.trim());

    const ingredients = v.split('+').map(d => ({
      identifier: _.kebabCase(d),
      text: d,
    }));

    return Medication<CTC.ComposedARVMedication>({
      form: 'granules',
      identifier: med,
      id: `${med}-${uuid.v4()}`,
      type: 'composed',
      short: s,
      alias: v,
      ingredients,
      category: 'arv-ctc',
      text,
    });
  });

//
export const stock = (org: CTC.Organization) =>
  concat(singles, combos).map(medication => {
    return Stock<CTC.ARVStockRecord>({
      id: uuid.v4() as string,
      count: 0,
      expiresAt: new Date().toUTCString(),
      medication,
      extendedData: {
        estimatedFor: '60-days',
        isLow: true,
        group: 'adults',
      },
      managingOrganization: org,
    });
  });

/// seeds only those medications that haven't been created for
export const seedStock = async (emr: EMRModule, org: CTC.Organization) => {
  const stockColl = emr.collection('stock');

  const s = (await getDocs(stockColl)).map(d => d[1].medication);
  console.log(s);
  await setDocs(
    stockColl,
    stock(org)
      .filter(d => s.findIndex(x => _.isEqual(x, d)) === -1)
      .map(d => [d.id, d]),
  );
};
