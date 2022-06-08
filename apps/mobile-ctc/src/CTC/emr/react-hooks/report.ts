import React from 'react';
import {EMR} from '../store';

export function useReport(emr: EMR) {
  const [report, setReport] = React.useState<{visits: number; ltfu: number}>({
    visits: 10,
    ltfu: 1,
  });

  const [appt, setAppt] = React.useState<{upcoming: number; missing: number}>({
    upcoming: 23,
    missing: 12,
  });

  return {base: report, appt};
}
