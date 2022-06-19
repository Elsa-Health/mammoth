import {Ingredient, Medication, Stock} from '@elsa-health/emr';
import {ARV} from 'elsa-health-data-fns/lib';
import randomSample from '@stdlib/random-sample';

import {CTC} from './types';
import {StockRecord} from '@elsa-health/emr/health.types/v1';

import uuid from 'react-native-uuid';
import _ from 'lodash';
/**
 * Where inforamtion is initiated
 */
const singles = randomSample(
  ARV.units.pairs().map(([arv, text]) =>
    Medication<CTC.SingleARVMedication>({
      identifier: arv,
      form: 'tablets',
      type: 'single',
      text,
    }),
  ),
);

const combo = [
  Medication<CTC.ComposedARVMedication>({
    form: 'granules',
    identifier: _.kebabCase('TDF+3TC+DTG'),
    text: 'TDF+3TC+DTG',
    type: 'composed',
    ingredients: [
      {
        resourceItemType: 'Ingredient',
        resourceType: 'ResourceItem',
        identifier: 'tdf',
        text: 'TDF',
      },
      {
        resourceItemType: 'Ingredient',
        resourceType: 'ResourceItem',
        identifier: '3tc',
        text: '3TC',
      },
      {
        resourceItemType: 'Ingredient',
        resourceType: 'ResourceItem',
        identifier: 'dtg',
        text: 'DTG',
      },
    ],
  }),

  Medication<CTC.ComposedARVMedication>({
    form: 'granules',
    identifier: _.kebabCase('TDF+FTC'),
    text: 'TDF+FTC',
    type: 'composed',
    ingredients: [
      {
        resourceItemType: 'Ingredient',
        resourceType: 'ResourceItem',
        identifier: 'tdf',
        text: 'TDF',
      },
      {
        resourceItemType: 'Ingredient',
        resourceType: 'ResourceItem',
        identifier: 'ftc',
        text: 'FTC',
      },
    ],
  }),
];

//
export const stock = () =>
  [...singles, ...combo].map(medication => {
    return Stock<CTC.ARVStockRecord>({
      id: uuid.v4() as string,
      count: Math.floor(Math.random() * 10 + 100),
      expiresAt: new Date().toUTCString(),
      medication,
      extendedData: {
        estimatedFor: '30-days',
        group: 'adults',
      },
    });
  });
