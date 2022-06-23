import {CTC} from './emr/types';
import {MedicationRequestVisitData} from './_screens/MedicationVisit';

import invariant from 'invariant';
import {Medication} from '@elsa-health/emr';

/**
 *
 * @param data
 * @param patient
 */
const completeMediactionStock = async (
  data: MedicationRequestVisitData,
  patient: CTC.Patient,
) => {
  const {arvRegimens, medications, appointmentDate} = data;

  const meds = Medication({});
};
