import {deviceStorage} from './storage';

import {
  differenceInMonths,
  differenceInYears,
  isBefore,
  differenceInDays,
  differenceInSeconds,
} from 'date-fns';
export const emr = deviceStorage();

type P = Omit<CTC.Patient, 'id'>;
export const cPatientsRef = emr.collection('patients');
export const cVisitsRef = emr.collection('visits');
export const cAppointRef = emr.collection('appointments');
export const cInvsRef = emr.collection('investigations');

type InvRef = {
  inv: string;
  ix: number;
  visitId: string;
};

export function invStrigify(v: InvRef): string {
  return `investigation:${v.inv}:${v.ix}:${v.visitId}`;
}

export function invParse(s: string): InvRef {
  const [, inv, ix, visitId] = s.split(':');
  return {
    inv,
    ix: parseInt(ix),
    visitId,
  };
}

export async function getPatient(patientId: string) {
  const doc = await cPatientsRef.queryDoc({
    $id: {$eq: patientId},
  });

  if (doc !== null) {
    const {$id, ...other} = doc;
    return {...other, id: patientId};
  }

  return null;
}

export async function getInvestigation(id: string) {
  const s = await cInvsRef.query({$id: id});

  if (s === null) {
    return null;
  }

  const [$id, out] = s;
  return [$id, out];
}

export async function savePatient(patient: P, patientId: string | undefined) {
  const id = await cPatientsRef.addDoc(
    patientId !== undefined
      ? {$id: patientId, ...patient, registeredDate: new Date().toUTCString()}
      : patient,
  );
  return id;
}

export async function fetchVisitsFromPatientId(patientId: string) {
  const docs = await cVisitsRef.queryMultiple({patientId: {$eq: patientId}});

  return docs.map(([id, visit]) => ({
    id,
    ...visit,
  }));
}

export async function fetchAppointmentsFromPatientId(patientId: string) {
  const docs = await cAppointRef.queryMultiple({patientId: {$eq: patientId}});
  return docs.map(([id, appt]) => ({
    id,
    ...appt,
  })) as CTC.Appointment[];
}

export async function fetchUpcomingAppointmentsFromPatientId(
  patientId: string,
) {
  return (await fetchAppointmentsFromPatientId(patientId)).filter(
    AppointmentHelper.isUpcoming,
  );
}

export const AppointmentHelper = {
  isUpcoming: (appt: Omit<CTC.Appointment, 'id'>) => {
    return (
      (appt.visitIdFullfilled === null ||
        appt.visitIdFullfilled === undefined) &&
      isBefore(new Date(), new Date(appt.date))
    );
  },
  isMissed: (appt: Omit<CTC.Appointment, 'id'>) => {
    const apptDate = new Date(appt.date);
    const nowDate = new Date();
    return (
      !(
        appt.visitIdFullfilled !== null && appt.visitIdFullfilled !== undefined
      ) &&
      isBefore(apptDate, nowDate) &&
      differenceInDays(nowDate, apptDate) <= 3
    );
  },
};

export async function fetchMissedAppointmentsFromPatientId(patientId: string) {
  return (await fetchAppointmentsFromPatientId(patientId)).filter(appt => {
    const apptDate = new Date(appt.date);
    const nowDate = new Date();
    return (
      !(
        appt.visitIdFullfilled !== null && appt.visitIdFullfilled !== undefined
      ) &&
      isBefore(apptDate, nowDate) &&
      differenceInDays(nowDate, apptDate) <= 3
    );
  });
}

export async function searchPatientsFromId(patientId: string) {
  const docs = await cPatientsRef.queryDocs<P>({$id: {$text: patientId}});
  const d = docs.map(({$id, ...other}) => {
    return {...other, id: $id} as CTC.Patient;
  });

  // console.log('fetchPatientsFromId', d);

  return d;
}

export async function fetchPatients() {
  const docs = await cPatientsRef.queryDocs<P>();
  return docs
    .map(({$id, ...other}) => {
      return {...other, id: $id} as CTC.Patient;
    })
    .sort((a, b) =>
      differenceInSeconds(
        new Date(b.registeredDate),
        new Date(a.registeredDate),
      ),
    );
}

export async function fetchVisits() {
  const docs = await cVisitsRef.queryMultiple();

  return docs.map(([id, visit]) => ({
    id,
    ...visit,
  }));
}

type A = Omit<CTC.Appointment, 'id'>;
export async function fetchAppointments() {
  // console.log('NEED APPTs');
  const docs = await cAppointRef.queryDocs<A>();

  // console.log('APPTS:', docs);
  return docs.map(({$id, ...other}) => {
    return {...other, id: $id} as CTC.Appointment;
  });
}

export async function fetchUpcomingAppointments() {
  return (await fetchAppointments()).filter(appt => {
    return (
      (appt.visitIdFullfilled === null ||
        appt.visitIdFullfilled === undefined) &&
      isBefore(new Date(), new Date(appt.date))
    );
  });
}

export async function fetchMissedAppointment() {
  return (await fetchAppointments()).filter(appt => {
    const apptDate = new Date(appt.date);
    const nowDate = new Date();
    return (
      !(
        appt.visitIdFullfilled !== null && appt.visitIdFullfilled !== undefined
      ) &&
      isBefore(apptDate, nowDate) &&
      differenceInDays(nowDate, apptDate) <= 3
    );
  });
}

export function dateToAge(date: Date): Age {
  const now = new Date();
  const years = differenceInYears(now, date);
  const months = differenceInMonths(now, date);
  return {
    years,
    months: months - years * 12,
  };
}
