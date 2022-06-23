import {
  clearCollection,
  collection,
  Document,
  getDocs,
  onCollectionSnapshot,
  onSnapshot,
  setDocs,
} from 'papai/collection';
import {useAsync, useAsyncFn, useAsyncRetry} from 'react-use';
import {EMR} from '../store_';

import {CTC} from '../types';
import {ARV} from 'elsa-health-data-fns/lib';
import _ from 'lodash';
import {List} from 'immutable';
import React from 'react';

import {
  runOnJS,
  SharedValue,
  useSharedValue,
  useWorkletCallback,
} from 'react-native-reanimated';
import {Query, queryCollection} from '../actions';
import {CollectionNode} from 'papai/collection/core';
import {format} from 'date-fns';

import {EMRModule} from '../store';
import {date} from '@elsa-health/emr/lib/utils';
import {SingleStockItem} from '../../_screens/MedicationStock';

// create medications
// const arvSingleFactory = randomSample.factory(
//   ARVSingles.pairs().map(([singleId, text]) => {
//     // Build the objects
//     return {
//       alias: ARVSingles.fromKey(singleId) ?? singleId,
//       code: 'arv-single',
//       id: 'ctc-arv-single:' + singleId,
//       name: singleId,
//       createdAt: new Date().toISOString(),
//       form: null,
//       data: {
//         singleId,
//         text,
//       },
//       ingredients: [],
//       resourceType: 'Medication',
//     } as ARVSingleMedication;
//   }),
//   {size: 20},
// );

export type UseStockData = ReturnType<typeof useStock>;
export function useStock(emr: EMRModule) {
  // run seed
  // setDocs(
  //   emr.collection('stock'),
  //   stock().map(d => [d.id, d]),
  // );

  // ... use medication stock inforamtion
  // const [medications, queryMedication] = useCollectionAsWorklet(
  //   emr.collection('medications'),
  // );

  const [{value: stock_}] = useCollectionAsWorklet(emr.collection('stock'));

  // queryStock();
  // React.useEffect(() => {
  //   console.log(stock_);
  // }, [stock_]);

  // stock information
  return {
    arvs: Object.fromEntries(
      (stock_ ?? List())
        .map(d => [
          d.id,
          {
            count: d.count.toString(),
            form: d.medication.form,
            expiresAt: format(date(d.expiresAt), 'dd / MM / yyyy'),
            ingredients: d.medication.ingredients.map(d => d.identifier),
            alias: d.medication.alias,
            type: d.medication.type,
            estimatedFor: '30-days',
            identifier: d.medication.identifier,
            text: d.medication.text,
            group: 'adults',
            concentrationValue: null,
          } as SingleStockItem,
        ])
        .toArray(),
    ),
    // List of medications
    medications: (stock_ ?? List()).map(d => d.medication).toSet(),
  };
}

export type Appointment = {
  requestId: string;
  requestDate: UTCDateTimeString;
  originVisitId: string | null;
  request: CTC.AppointmentRequest;
} & (
  | {type: 'not-responded'; responseDate: null; response: null}
  | {
      type: 'responded';
      responseDate: UTCDateTimeString;
      response: CTC.AppointmentResponse;
    }
);

export type UseAppointments = ReturnType<typeof useAppointments>;
export function useAppointments(emr: EMRModule) {
  // ...
  const [{value: apptRqs}, q_] = useCollectionAsWorklet(
    emr.collection('appointment-requests'),
  );
  const [{value: apptResps}, qrs_] = useCollectionAsWorklet(
    emr.collection('appointment-responses'),
  );

  // appointment records
  const appointments = useSharedValue<List<Appointment> | null>(null);

  // appointment requests
  // ...
  React.useEffect(() => {
    'worklet';
    const baseReps = apptResps ?? List();

    // update the values
    appointments.value =
      (apptRqs ?? List()).map(d => {
        const dx = baseReps.find(
          f => f.authorizingAppointmentRequest.id === d.id,
        );

        if (dx !== undefined) {
          return {
            requestId: d.appointmentDate,
            originVisitId: d.visit?.id ?? null,
            requestDate: d.appointmentDate,
            responseDate: dx.createdAt,
            type: 'responded',
            request: d,
            response: dx,
          } as Appointment;
        }

        // check va
        return {
          requestId: d.appointmentDate,
          originVisitId: d.visit?.id ?? null,
          requestDate: d.appointmentDate,
          responseDate: null,
          type: 'not-responded',
          request: d,
          response: null,
        } as Appointment;
      }) ?? null;
  }, [apptResps, apptRqs]);

  return {
    'appointment-requests': apptRqs,
    'appointment-responses': apptResps,
    appointments: appointments.value ?? List(),
  };
}

export function useMedicationStock(emr: EMRModule) {
  // get stock information
  const [arvComboStock, setComboStock] = React.useState({});
  const [arvSingleStock, setSingleStock] = React.useState({});

  // set information in the medication in stock
  useAsync(async () => {
    const stockItems = (await getDocs(emr.collection('stock'))) ?? [];
    const svp = stockItems
      .filter(([_, state]) => state.medication.code === 'arv')
      .map(([docId, state]) => {
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
            expiresAt: state.expiresAt ?? null,
            lastUpdate: state.lastUpdatedAt,
          },
        ];
      });

    setComboStock(Object.fromEntries(svp));
  }, [emr]);

  useAsync(async () => {
    const stockItems = (await getDocs(emr.collection('stock'))) ?? [];
    const svp = stockItems
      .filter(([_, state]) => state.medication.code === 'arv-single')
      .map(([docId, state]) => {
        const singleId = state.medication.data?.singleId;
        const text = state.medication.data?.text;

        return [
          docId,
          {
            item: singleId,
            text: text,
            count: state.count,
            expiresAt: state.expiresAt ?? null,
            lastUpdate: state.lastUpdatedAt,
          },
        ];
      });

    setSingleStock(Object.fromEntries(svp));
  }, [emr]);

  React.useEffect(() => {
    onCollectionSnapshot(emr.collection('stock'), (action, docs) => {
      // ...
      if (action === 'changed') {
        console.log(docs);
      }
    });
  }, []);

  React.useEffect(() => {
    // const d = emr.onSnapshotUpdate((token, source) => {
    //   const [ref, state, _] = token;
    //   if (ref.collectionId === emr.collection('stock').ref.collectionId) {
    //     if (state.medication.code === 'arv') {
    //       const regimen = state.medication.data.regimen;
    //       const className = state.medication.data.className;
    //       setComboStock(stock =>
    //         produce(stock, df => {
    //           df[ref.documentId] = {
    //             category: className,
    //             medication: {
    //               regimen,
    //               className,
    //               text: ARV.regimen.fromKey(regimen) ?? regimen,
    //             },
    //             count: state.count,
    //             lastUpdate: state.lastUpdatedAt,
    //             expiresAt: state.expiresAt ?? null,
    //           };
    //         }),
    //       );
    //     }
    //     if (state.medication.code === 'arv-single') {
    //       const item = state.medication.name;
    //       const text = state.medication.data.text;
    //       setSingleStock(stock =>
    //         produce(stock, df => {
    //           df[ref.documentId] = {
    //             item,
    //             text,
    //             count: state.count,
    //             lastUpdate: state.lastUpdatedAt,
    //             expiresAt: state.expiresAt ?? null,
    //           };
    //         }),
    //       );
    //     }
    //   }
    // });
    // return () => d.unsubscribe();
  }, []);

  return {'combo-arv': arvComboStock, 'single-arv': arvSingleStock};
}

/**
 * Build a worklet forr quering in collections
 *
 * @param collection
 * @param sharedValue
 * @returns
 */
export const bqw =
  <T extends Document.Data>(
    collection: CollectionNode<T>,
    sharedValue: SharedValue<List<T> | null>,
  ) =>
  (query: Query<T> = {}) => {
    'worklet';
    runOnJS(query => {
      queryCollection(collection, query)
        .then(out => {
          sharedValue.value = out;
        })
        .catch(err => {
          sharedValue.value = null;
          console.warn('bqw: ERROR:', err);
        });
    })(query);
  };

export function useCollectionAsWorklet<T extends Document.Data>(
  collection: CollectionNode<T>,
  initialize: boolean = true,
  initialQuery: Query<T> = {},
) {
  const sharedValue = useSharedValue<List<T> | null>(null);
  const q = useWorkletCallback(bqw(collection, sharedValue));

  type UseCollectionValue = typeof sharedValue;
  type UseCollectionCallback = typeof q;

  React.useEffect(() => {
    // initialize collection
    if (initialize) {
      return q(initialQuery);
    }
  }, [collection, q, initialize]);

  return [sharedValue, q] as [UseCollectionValue, UseCollectionCallback];
}
