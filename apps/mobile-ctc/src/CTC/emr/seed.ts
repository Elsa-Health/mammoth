import {Ingredient, Medication, Stock} from '@elsa-health/emr';
import {ARV} from 'elsa-health-data-fns/lib';
import randomSample from '@stdlib/random-sample';

import {CTC} from './types';
import {StockRecord} from '@elsa-health/emr/health.types/v1';

import uuid from 'react-native-uuid';
import _ from 'lodash';
import {clearCollection, getDocs, setDocs} from 'papai/collection';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {EMRModule} from './store';
/**
 * Where inforamtion is initiated
 */
const singles = ARV.units.pairs().map(([arv, text]) =>
  Medication<CTC.SingleARVMedication>({
    identifier: arv,
    form: 'tablets',
    category: 'arv-ctc',
    type: 'single',
    text,
  }),
);

const comboArvMedications = (org: CTC.Organization) =>
  ['TDF+3TC+DTG', 'ABC+3TC', 'AZT+3TC', 'TDF+FTC', 'AZT+3TC+NVP']
    .map(d => ({
      text: d,
      id: _.kebabCase(d),
      singles: d.split('+').map(d => ({
        identifier: _.kebabCase(d),
        text: d,
      })),
    }))
    .map(arv =>
      Stock<CTC.ARVStockRecord>({
        count: 0,
        expiresAt: new Date().toUTCString(),
        id: uuid.v4() as string,
        medication: Medication<CTC.ComposedARVMedication>({
          identifier: arv.id,
          ingredients: arv.singles,
          alias: arv.text,
          category: 'arv-ctc',
          form: null,
          type: 'composed',
          text: arv.text,
        }),
        managingOrganization: org,
        extendedData: {
          estimatedFor: '60-days',
          isLow: true,
          group: 'adults',
        },
      }),
    );

//
export const stock = (org: CTC.Organization) => [
  ...[...singles].map(medication => {
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
  }),
  ...comboArvMedications(org),
];

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
