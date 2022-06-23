import {differenceInCalendarDays, format, isAfter, isBefore} from 'date-fns';
import {ARV, Medication} from 'elsa-health-data-fns/lib';
import {List, Set} from 'immutable';
import {Document, getDocs} from 'papai/collection';
import {CollectionNode} from 'papai/collection/core';
import React from 'react';
import {
  runOnJS,
  runOnUI,
  SharedValue,
  useSharedValue,
  useWorkletCallback,
} from 'react-native-reanimated';
import {useAsync} from 'react-use';
import {arv} from '../../actions/basic';
import {groupByFn} from '../../_screens/MedicationStock/helpers';
import {Query, queryCollection} from '../actions';
import {Medica} from '../hook';
import {EMRModule} from '../store';
import {EMR} from '../store_';
import {pick} from '../utils';
import {useCollectionAsWorklet} from './emr';

export type UseEMRReport = ReturnType<typeof useEMRReport>;
export function useEMRReport(emr: EMRModule) {
  // information for the "in-last-30-days"

  const [{value: apptRequests}, _ar] = useCollectionAsWorklet(
    EMR.collections.appointmentRequests,
    true,
  );
  const [{value: apptResponses}, _arq] = useCollectionAsWorklet(
    EMR.collections.appointmentResponse,
    true,
  );
  const [{value: medRequests}, _mr] = useCollectionAsWorklet(
    EMR.collections.medicationRequests,
    true,
  );
  const [visits, _v] = useCollectionAsWorklet(EMR.collections.visits, true);
  const [patients, _] = useCollectionAsWorklet(EMR.collections.patients, true);

  // Contain the appointment information
  const appointments = useSharedValue<
    Set<{
      requestId: string;
      createdAt: UTCDateTimeString;
      requestedDate: UTCDateTimeString;
      respondedDate: UTCDateTimeString | null;
    }>
  >(Set());

  React.useEffect(() => {
    if (apptRequests) {
      const apptWithDate = (apptRequests ?? List()).filter(d =>
        Boolean(d.appointmentDate),
      );
      //  Upcoming appointment set
      const upcomingSet = apptWithDate
        .map(d => ({
          requestId: d.id,
          createdAt: d.createdAt,
          requestedDate: d.appointmentDate,
          respondedDate: null,
        }))
        .toSet();

      appointments.value = upcomingSet;

      if (apptResponses !== null) {
        const previous = (apptWithDate ?? []).filter(d =>
          isBefore(date(d.appointmentDate), new Date()),
        );

        const apptWithAppt = (apptResponses ?? List())
          .map(d => pick(d, ['authorizingAppointmentRequest', 'createdAt']))
          .map(d => ({
            responseDate: d.createdAt,
            requestId: d.authorizingAppointmentRequest.id,
          }))
          .toSet();

        const previousSet = previous.map(d => {
          return {
            requestId: d.id,
            createdAt: d.createdAt,
            requestedDate: d.appointmentDate,
            respondedDate:
              apptWithAppt.find(k => k.requestId === d.id)?.responseDate ??
              null,
          };
        });

        // getting the appointments
        appointments.value = upcomingSet.merge(previousSet);
      }
    }
  }, [apptRequests, apptResponses]);

  return {
    data: {
      visits: visits.value,
      'appt-requests': apptRequests,
      patients: patients.value,
      appointments: appointments.value,
      medicationRequests: medRequests,
    },
    brief: {
      recentVisits: [],
      top3RequestedMedication: [],
      // recentVisits: (visits.value || List([]))
      //   .sortBy(d => -date(d.date ?? d.createdAt).getTime())
      //   .map(visit => ({
      //     visitDate: visit.date ?? visit.createdAt,
      //     patient: visit.subject.id,
      //   }))
      //   .toArray(),
      // medication
      // top3RequestedMedication: groupByFn(
      //   (medRequests.value ?? List()).toArray(),
      //   ({medication}) =>
      //     medication.resourceType === 'Medication'
      //       ? medication.name
      //       : 'unknown',
      // )
      //   .map(([id, req]) => [id, standardName(arvName(id)), req.length])
      //   .sortBy(d => -d[2])
      //   .filter(([id, ..._]) => ARV.regimen.fromKey(id) !== undefined)
      //   .slice(0, 3),
    },
  };
}

/* Getting the name of the medications */
const arvName = (arv: string) => ARV.regimen.fromKey(arv) ?? arv;
const standardName = (stan: string) => Medication.all.fromKey(stan) ?? stan;

// -------------
// UTILS
// -------------

const date = (str: YYYYMMDDDateString | UTCDateTimeString | DateTimeString) =>
  new Date(str);
/**
 * Gets a floored date.
 * i.e. Date from `yyyy-mm-dd` instead of `MMMM, dd yyyy. hh:mm:ss ...`
 *
 * Example::
 *  floorDate(dateFrom("June, 09 2022. 19:23:34")) == floorDate(dateFrom("June, 09 2022. 08:13:30"))
 * @param date
 * @returns
 */
function floorDate(date?: Date) {
  return new Date(format(date ?? new Date(), 'yyyy-MM-dd'));
}

function isWithLast30Days(date: Date, now: Date = new Date()) {
  return differenceInCalendarDays(floorDate(now), floorDate(date)) <= 30;
}

export function isFutureDate(date: Date, now: Date = new Date()) {
  return isAfter(date, now);
}
