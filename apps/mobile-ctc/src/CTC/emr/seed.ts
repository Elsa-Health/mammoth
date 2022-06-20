import {Ingredient, Medication, Stock} from '@elsa-health/emr';
import {ARV} from 'elsa-health-data-fns/lib';
import randomSample from '@stdlib/random-sample';

import {CTC} from './types';
import {StockRecord} from '@elsa-health/emr/health.types/v1';

import uuid from 'react-native-uuid';
import _ from 'lodash';
import {clearCollection, setDocs} from 'papai/collection';
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

const comboArvMedications = ['TDF+3TC+DTG', 'ABC+3TC', 'AZT+3TC' + 'TDF+FTC']
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
      count: 1,
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
    }),
  );

//
export const stock = () => [
  ...[...singles].map(medication => {
    return Stock<CTC.ARVStockRecord>({
      id: uuid.v4() as string,
      count: Math.floor(Math.random() * 10 + 1),
      expiresAt: new Date().toUTCString(),
      medication,
      extendedData: {
        estimatedFor: '30-days',
        isLow: false,
        group: 'adults',
      },
    });
  }),
  ...comboArvMedications,
];

export const seedStock = async (emr: EMRModule) => {
  await setDocs(
    emr.collection('stock'),
    stock().map(d => [d.id, d]),
  );
};
