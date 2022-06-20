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
