import {Document, getDocs, onSnapshot, setDocs} from 'papai/collection';
import {useAsync, useAsyncFn, useAsyncRetry} from 'react-use';
import {EMR} from '../store';

import randomSample from '@stdlib/random-sample';
import {
  ARVMedication,
  ARVSingleMedication,
  CTCMedicationRequest,
  CTCOrganization,
} from '../types';
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
import {ARVSingles} from '../../_screens/MedicationStock/stock';
import {addDays} from 'date-fns';

// create medications
const arvSingleFactory = randomSample.factory(
  ARVSingles.pairs().map(([singleId, text]) => {
    // Build the objects
    return {
      alias: ARVSingles.fromKey(singleId) ?? singleId,
      code: 'arv-single',
      id: 'ctc-arv-single:' + singleId,
      name: singleId,
      createdAt: new Date().toISOString(),
      form: null,
      data: {
        singleId,
        text,
      },
      ingredients: [],
      resourceType: 'Medication',
    } as ARVSingleMedication;
  }),
  {size: 20},
);

// Create medication knowledge
const arvSingleMedStock = List<Stock<ARVSingleMedication, CTCOrganization>>(
  arvSingleFactory(),
).map(med => ({
  resourceType: 'Stock',
  id: `stock:${med.id}`,
  code: null,
  createdAt: new Date().toUTCString(),
  lastUpdatedAt: new Date().toUTCString(),
  managingOrganization: null,
  expiresAt: addDays(new Date(), 40).toUTCString(),
  medication: med,
  count: Math.max(3, Math.ceil(Math.random() * 30 + 1)),
}));

export function useMedicationStock(emr: EMR) {
  // get stock information
  const [arvComboStock, setComboStock] = React.useState({});
  const [arvSingleStock, setSingleStock] = React.useState({});

  // set information in the medication in stock
  useAsync(async () => {
    const stockItems = (await getDocs(emr.collections.stock)) ?? [];
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
    const stockItems = (await getDocs(emr.collections.stock)) ?? [];
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
    const d = emr.onSnapshotUpdate((token, source) => {
      const [ref, state, _] = token;

      if (ref.collectionId === emr.collections.stock.ref.collectionId) {
        if (state.medication.code === 'arv') {
          const regimen = state.medication.data.regimen;
          const className = state.medication.data.className;
          setComboStock(stock =>
            produce(stock, df => {
              df[ref.documentId] = {
                category: className,
                medication: {
                  regimen,
                  className,
                  text: ARV.regimen.fromKey(regimen) ?? regimen,
                },
                count: state.count,
                lastUpdate: state.lastUpdatedAt,
                expiresAt: state.expiresAt ?? null,
              };
            }),
          );
        }

        if (state.medication.code === 'arv-single') {
          const item = state.medication.name;
          const text = state.medication.data.text;

          setSingleStock(stock =>
            produce(stock, df => {
              df[ref.documentId] = {
                item,
                text,
                count: state.count,
                lastUpdate: state.lastUpdatedAt,
                expiresAt: state.expiresAt ?? null,
              };
            }),
          );
        }
      }
    });

    return () => d.unsubscribe();
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
