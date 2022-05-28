import React from 'react';
import randomSample from '@stdlib/random-sample';
import {
  Medication,
  MedicationDispense,
  MedicationRequest,
} from '../../emr-types/v1/prescription';

import {ARV, Medication as Med} from 'elsa-health-data-fns';
import {List, Seq} from 'immutable';

import uuid from 'react-native-uuid';

export type Medica =
  | Medication<'arv', {className: ARV.Class; regimen: ARV.Regimen}>
  | Medication<'standard', {medication: Med.All; text: string}>;
export type MedicaReq = MedicationRequest<Medica>;
export type MedicaDisp = MedicationDispense<Medica>;

const rMeds = randomSample.factory(
  Med.all.pairs().map(([id, text]) => {
    // Build the objects
    return {
      alias: text,
      code: 'standard',
      id: 'ctc-standard:' + id,
      name: id,
      createdAt: new Date().toISOString(),
      data: null,
      ingredients: [],
      resourceType: 'Medication',
    } as Medica;
  }),
  {size: 20},
);
export function useStore() {
  /**
   * Random medications to work with.
   */
  const medications = React.useMemo<List<Medica>>(() => List(rMeds()), []);

  /**
   * Create starter one
   */
  const [medicationRequests, setMedRq] = React.useState<List<MedicaReq>>(() => {
    const s = List<MedicaReq>();

    // ...
    const now = new Date();

    return s.insert(0, {
      authoredOn: now.toUTCString(),
      code: null,
      createdAt: now.toISOString(),
      id: uuid.v4() as string,
      instructions: null,
      medication: rMeds()[0],
      subject: {
        id: '11111111111111',
        resourceReferenced: 'Patient',
        resourceType: 'Reference',
      },
      requester: {
        id: '901j2n09-219-12n1231',
        resourceReferenced: 'Practitioner',
        resourceType: 'Reference',
      },
      reason: 'Conclusion from Symptom Assessment',
      method: 'Injection',
      resourceType: 'MedicationRequest',
      status: 'active',
      route: 'Soemthing',
    });
  });

  const [medicationDispenses, setDisp] = React.useState<List<MedicaDisp>>(List);

  return {
    medicationRequests,
    medicationDispenses,
    addMedicationRequest(medReq: MedicaReq) {
      setMedRq(s => s.insert(0, medReq));
    },
    addMedicationDispense(medDisp: MedicaDisp) {
      setDisp(s => s.insert(0, medDisp));
    },
  };
  // console.log({medications, medicationDispense, medicationRequests});
}
