import {differenceInCalendarDays, format, isAfter, isBefore} from 'date-fns';
import {ARV, Medication} from 'elsa-health-data-fns/lib';
import {List} from 'immutable';
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
import {EMR} from '../store';
import {
  ARVMedication,
  CTCAppointmentRequest,
  CTCAppointmentResponse,
  CTCMedicationRequest,
  CTCPatient,
  CTCVisit,
  StandardMedication,
} from '../types';
import {pick, pluck, select} from '../utils';
import {useCollectionAsWorklet, useEMR} from './emr';

export type UseEMRReport = ReturnType<typeof useEMRReport>;
export function useEMRReport(emr: EMR) {
  // information for the "in-last-30-days"
  const out = useEMR(emr);

  const [visits, _v] = useCollectionAsWorklet(emr.collections.visits, true, {
    where: d => isWithLast30Days(date(d.date ?? d.createdAt)),
  });
  const [patients, _] = useCollectionAsWorklet(emr.collections.patients, true, {
    where: d => isWithLast30Days(date(d.createdAt)),
  });

  const {
    data: {
      'appt-requests': apptRequests,
      'appt-responses': apptResponses,
      'medication-requests': medRequests,
    },
    Q: Q30,
  } = out;

  // React.useEffect(() => {
  //   // query information to filter get only thos within 30 days
  //   Q30.visit({where: d => isWithLast30Days(date(d.date ?? d.createdAt))});
  //   Q30['appt-request']({
  //     where: d => isWithLast30Days(date(d.appointmentDate)),
  //   });
  //   Q30.patient({where: d => isWithLast30Days(date(d.createdAt))});
  // }, []);

  // Contain the appointment information
  const appointments = useSharedValue<
    Array<{
      reponded: boolean;
      setDate: UTCDateTimeString;
      respondedDate: UTCDateTimeString;
    }>
  >([]);

  const count = useSharedValue<{
    upcoming: number | null;
    missed: number | null;
    done: number | null;
  }>({
    upcoming: null,
    missed: null,
    done: null,
  });

  React.useEffect(() => {
    if (apptRequests) {
      const apptWithDate = apptRequests.filter(d => Boolean(d.appointmentDate));

      const upcoming = apptWithDate.filter(d =>
        isFutureDate(date(d.appointmentDate)),
      );
      console.log(apptWithDate.count(), upcoming.count());

      count.value = {
        ...count.value,
        upcoming: upcoming.count(),
        done: 0,
      };

      if (apptResponses !== null) {
        const previous = apptWithDate.filterNot(d =>
          isFutureDate(date(d.appointmentDate)),
        );

        const apptWithAppt = apptResponses
          .map(d => pluck(d, 'authorizingAppointmentRequest'))
          .map(d => d.id)
          .toSet();

        // missed appointments
        const missed = previous.filter(d => !apptWithAppt.has(d.id));

        count.value = {
          ...count.value,
          upcoming: upcoming.count(),
          done: previous.count() - missed.count(),
          missed: missed.count(),
        };
      }
    }
  }, [apptRequests, apptResponses]);

  return {
    count: count,
    data: {
      visits: visits.value,
      'appt-requests': apptRequests,
      patients: patients.value,
      appointments: appointments.value,
      recentVisits:
        visits.value
          ?.sortBy(d => date(d.date ?? d.createdAt).getTime())
          .map(visit => ({
            visitDate: visit.date ?? visit.createdAt,
            patient: visit.subject.id,
          }))
          .toArray() || [],
    },
    brief: {
      // medication
      top3RequestedMedication: groupByFn(
        medRequests?.toArray() ?? [],
        ({medication}) =>
          medication.resourceType === 'Medication'
            ? medication.name
            : 'unknown',
      )
        .map(([id, req]) => [id, standardName(arvName(id)), req.length])
        .sortBy(d => -d[2])
        .filter(([id, ..._]) => ARV.regimen.fromKey(id) !== undefined)
        .slice(0, 3),
    },
  };
}

/* Getting the name of the medications */
const arvName = (arv: string) => ARV.regimen.fromKey(arv) ?? arv;
const standardName = (stan: string) => Medication.all.fromKey(stan) ?? stan;

export function useReport(emr: EMR) {
  const report = useSharedValue<{visits: number | null; ltfu: number | null}>({
    visits: null,
    ltfu: null,
  });

  const appt = useSharedValue<{
    upcoming: number | null;
    missed: number | null;
    done: number | null;
  }>({
    upcoming: null,
    missed: null,
    done: null,
  });

  // Load information associated with the visits
  const {loading: isLoadVisit} = useAsync(async () => {
    const visits = List(await getDocs(emr.collections.visits)).map(d => d[1]);
    report.value = {...report.value, visits: visits.count()};
  }, [emr]);

  const sd = useWorkletCallback(() => {
    'worklet';
    queryCollection(emr.collections.appointmentRequests, {
      where: item => isWithLast30Days(date(item.appointmentDate)),
    }).then(data => {
      // get upcoming
      const apptWithDate = data.filter(d => Boolean(d.appointmentDate));

      const upcoming = apptWithDate.filter(d =>
        isFutureDate(date(d.appointmentDate)),
      );

      const previous = apptWithDate.filterNot(d =>
        isFutureDate(date(d.appointmentDate)),
      );

      return queryCollection(emr.collections.appointmentResponse).then(
        resps => {
          const apptWithAppt = resps
            .map(d => pluck(d, 'authorizingAppointmentRequest'))
            .map(d => d.id)
            .toSet();

          // missed appointments
          const missed = previous.filter(d => !apptWithAppt.has(d.id));

          appt.value = {
            ...appt.value,
            upcoming: upcoming.count(),
            done: previous.count() - missed.count(),
            missed: missed.count(),
          };
        },
      );
    });
  }, []);

  // information associated with apppointments
  useAsync(async () => {
    sd();
    const resps = await queryCollection(emr.collections.appointmentResponse);
    const apptWithAppt = resps
      .map(d => pluck(d, 'authorizingAppointmentRequest'))
      .map(d => d.id)
      .toSet();
  }, [emr]);

  return {base: report.value, appt: appt.value};
}

export type ReportSummaryData = ReturnType<typeof useReport>;

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

function isFutureDate(date: Date, now: Date = new Date()) {
  return isAfter(date, now);
}
