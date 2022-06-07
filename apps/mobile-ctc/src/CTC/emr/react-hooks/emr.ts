import {getDocs, onSnapshot, setDocs} from 'papai/collection';
import {useAsync, useAsyncFn, useAsyncRetry} from 'react-use';
import {EMR} from '../store';

import randomSample from '@stdlib/random-sample';
import {ARVMedication, CTCMedicationRequest, CTCOrganization} from '../types';
import {ARV, CTC} from 'elsa-health-data-fns/lib';
import _ from 'lodash';
import {List} from 'immutable';
import {Stock} from '../../../emr-types/v1/prescription';
import React from 'react';
import produce from 'immer';

// create medications
const arvMedFactory = randomSample.factory(
  _.concat(
    ...ARV.pairs().map(([class_, id]) => {
      return id.map(d => [class_, d]);
    }),
  ).map(([className, regimen]) => {
    // Build the objects
    return {
      alias: ARV.regimen.fromKey(regimen) ?? regimen,
      code: 'arv',
      id: 'ctc-arv:' + regimen,
      name: regimen,
      createdAt: new Date().toISOString(),
      data: {
        className,
        regimen,
      },
      ingredients: [],
      resourceType: 'Medication',
    } as ARVMedication;
  }),
  {size: 50},
);

// Create medication knowledge
const arvMedStock = List<Stock<ARVMedication, CTCOrganization>>(
  arvMedFactory(),
).map(med => ({
  resourceType: 'Stock',
  id: `stock:${med.id}`,
  code: null,
  createdAt: new Date().toUTCString(),
  lastUpdatedAt: new Date().toUTCString(),
  managingOrganization: null,
  medication: med,
  count: Math.max(3, Math.ceil(Math.random() * 30 + 1)),
}));

export function useMedicationStock(emr: EMR) {
  // get stock information
  const [stock, set] = React.useState({});

  // set information in the medication in stock
  useAsync(async () => {
    const stockItems = (await getDocs(emr.collections.stock)) ?? [];
    const svp = stockItems.map(([docId, state]) => {
      const regimen = state.medication.data.regimen;
      const className = state.medication.data.className;

      return [
        docId,
        {
          category: className,
          medication: {
            regimen,
            className,
            text: ARV.regimen.fromKey(regimen) ?? regimen,
          },
          count: state.count,
          lastUpdate: new Date(state.lastUpdatedAt),
        },
      ];
    });

    set(Object.fromEntries(svp));
  }, [emr]);

  React.useEffect(() => {
    const d = emr.onSnapshotUpdate((token, source) => {
      const [ref, state, _] = token;

      if (ref.collectionId === emr.collections.stock.ref.collectionId) {
        const regimen = state.medication.data.regimen;
        const className = state.medication.data.className;
        set(stock =>
          produce(stock, df => {
            df[ref.documentId] = {
              category: className,
              medication: {
                regimen,
                className,
                text: ARV.regimen.fromKey(regimen) ?? regimen,
              },
              count: state.count,
              lastUpdate: new Date(state.lastUpdatedAt),
            };
          }),
        );
      }
    });

    return () => d.unsubscribe();
  }, []);

  return stock;
}
