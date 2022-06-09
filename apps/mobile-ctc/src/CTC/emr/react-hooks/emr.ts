import {Document, getDocs, onSnapshot, setDocs} from 'papai/collection';
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

import {
  CTCAppointmentRequest,
  CTCAppointmentResponse,
  CTCPatient,
  CTCVisit,
  StandardMedication,
} from '../types';
import {pick, pluck, select} from '../utils';
import {
  runOnJS,
  runOnUI,
  SharedValue,
  useSharedValue,
  useWorkletCallback,
} from 'react-native-reanimated';
import {Query, queryCollection} from '../actions';
import {CollectionNode} from 'papai/collection/core';

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

        // console.log(state);
        // console.log({
        //   category: className,
        //   medication: {
        //     regimen,
        //     className,
        //     text: ARV.regimen.fromKey(regimen) ?? regimen,
        //   },
        //   count: state.count,
        //   lastUpdate: new Date(state.lastUpdatedAt),
        // });

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

export function useEMRMedicationStock(emr: EMR, deps: any[] = []) {
  const stock = useSharedValue<List<
    Stock<ARVMedication, CTCOrganization>
  > | null>(null);
  const qstock = useWorkletCallback(bqw(emr.collections.stock, stock));

  React.useEffect(() => {
    qstock();
  }, [deps]);

  return {data: {stock: stock.value}, Q: {stock: qstock}};
}

export function useEMRMedications(emr: EMR) {
  const medications = useSharedValue<List<Medica> | null>(null);
  const mediReqs = useSharedValue<List<CTCMedicationRequest> | null>(null);

  const qMeds = useWorkletCallback(
    bqw(emr.collections.medications, medications),
  );
  const qMedReq = useWorkletCallback(
    bqw(emr.collections.medicationRequests, mediReqs),
  );

  React.useEffect(() => {
    qMeds();
    qMedReq();
  }, [qMedReq, qMeds]);

  return {
    data: {
      medications: medications.value,
      'medication-requests': mediReqs.value,
    },
    Q: {
      medication: qMeds,
      'medication-request': qMedReq,
    },
  };
}

export function useCollectionAsWorklet<T extends Document.Data>(
  collection: CollectionNode<T>,
  initialize: boolean = true,
  initialQuery: Query<T> = {},
) {
  const sharedValue = useSharedValue<List<T> | null>(null);
  const q = useWorkletCallback(bqw(collection, sharedValue));

  type UseCollectionValue = SharedValue<List<T> | null>;
  type UseCollectionCallback = typeof q;

  React.useEffect(() => {
    // initialize collection
    if (initialize) {
      q(initialQuery);
    }
  }, [collection, q, initialize]);

  return [sharedValue, q] as [UseCollectionValue, UseCollectionCallback];
}

export function useEMRAppointments(emr: EMR) {
  const [apptRequests, qApptRqs] = useCollectionAsWorklet(
    emr.collections.appointmentRequests,
  );
  const [apptResponse, qApptResps] = useCollectionAsWorklet(
    emr.collections.appointmentResponse,
  );
  // const apptRequests = useSharedValue<List<CTCAppointmentRequest> | null>(null);
  // const apptResponse = useSharedValue<List<CTCAppointmentResponse> | null>(
  //   null,
  // );
  // const qApptRqs = useWorkletCallback(
  //   bqw(emr.collections.appointmentRequests, apptRequests),
  // );
  // const qApptResps = useWorkletCallback(
  //   bqw(emr.collections.appointmentResponse, apptResponse),
  // );

  return {
    data: {
      'appt-requests': apptRequests.value,
      'appt-responses': apptResponse.value,
    },
    Q: {
      'appt-request': qApptRqs,
      'appt-response': qApptResps,
    },
  };
}

export function useEMRPatients(emr: EMR, initialQuery: Query<CTCPatient>) {
  const [patients, qPatients] = useCollectionAsWorklet(
    emr.collections.patients,
  );
  return {data: {patients: patients.value}, Q: {patient: qPatients}};
}

export function useEMRVisits(emr: EMR, deps: any[] = []) {
  const [visits, qVisits] = useCollectionAsWorklet(emr.collections.visits);
  return {data: {visits: visits.value}, Q: {visit: qVisits}};
}

export function useEMR(emr: EMR, deps: any[] = []) {
  const visits = useEMRVisits(emr, deps);
  const appts = useEMRAppointments(emr);
  const meds = useEMRMedications(emr);
  const stock = useEMRMedicationStock(emr);

  return {
    data: {
      ...appts.data,
      ...meds.data,
      ...stock.data,
      ...visits.data,
    },
    Q: {
      ...appts.Q,
      ...meds.Q,
      ...stock.Q,
      ...visits.Q,
    },
  };
}
