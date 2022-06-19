import {Ingredient, Medication, Stock} from '@elsa-health/emr';
import {CTC} from './types';

import z from 'zod';
import {ARV} from 'elsa-health-data-fns/lib';
import _ from 'lodash';

import uuid from 'react-native-uuid';
/**
 * Single medications
 * -----------
 */
const arvMedications = ARV.units.pairs().map(([arv, text]) =>
  Medication<CTC.SingleARVMedication>({
    identifier: arv,
    form: null,
    alias: text,
    category: 'arv-ctc',
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
    Stock({
      count: '0',
      expiresAt: new Date().toUTCString(),
      id: uuid.v4() as string,
      medication: Medication<CTC.ComposedARVMedication>({
        identifier: arv.id,
        ingredients: arv.singles,
        alias: arv.text,
        form: null,
        type: 'composed',
        text: arv.text,
      }),
    }),
  );

console.log(comboArvMedications);
