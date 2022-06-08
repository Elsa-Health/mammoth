import React from 'react';
import {CTCMedicationRequest, CTCVisit} from '../types';

import uuid from 'react-native-uuid';

import {createMachine, assign} from 'xstate';
import {useMachine} from '@xstate/react';
import produce from 'immer';
import {Assessment} from '../../../emr-types/v1/visit';
import {EMR} from '../store';

type NotStartedVisitContext = {
  current: null;
};
type StartedVisitContext = {
  current: Omit<CTCVisit, 'createdAt'>;
};
type FinishVisitContext = {
  current: CTCVisit;
};

type VisitContext =
  | NotStartedVisitContext
  | StartedVisitContext
  | FinishVisitContext;
const visitMachine = createMachine<VisitContext>({
  id: 'ctc.visit',
  initial: 'not-started',
  context: {
    // current data stored
    current: null,
  },
  states: {
    'not-started': {
      on: {STEP: 'started'},
    },
    started: {
      on: {STEP: 'finish'},
    },
    finish: {
      on: {STEP: 'not-started'},
      type: 'final',
    },
  },
});

/**
 * Control the content of a created CTC Visit
 */
export function useCTCVisit() {
  // control the state machine
  const [states, send] = useMachine(visitMachine);

  const [visit, set] = React.useState<Partial<CTCVisit>>({});

  /**
   * Initialize the context
   * @param practitioner
   * @param subject
   * @param id
   */
  const initialize = (
    practitioner: ReferenceIdentifier<'Practitioner'>,
    subject: ReferenceIdentifier<'Patient'>,
    id?: string,
  ) => {
    if (states.matches('not-started')) {
      // push
      send('STEP');

      // add inforamtion
      set({
        id: id ?? (uuid.v4() as string),
        code: null,
        resourceType: 'Visit',
        assessments: [],
        createdAt: new Date().toUTCString(),
        practitioner,
        subject,
        associatedAppointmentResponse: null,
        extendedData: null,
        investigationRequests: [],
        prescriptions: [],
      });
    }
  };

  const addAssessment = <D extends Data>(assessment: Assessment<D>) => {
    if (states.matches('started')) {
      set(s =>
        produce(s, df => {
          df.assessments?.push(assessment);
        }),
      );
    } else {
      console.warn("Didn't do anything.... must be in start state");
    }
  };

  const addMedicationRequest = (medicationRequest: CTCMedicationRequest) => {
    if (states.matches('started')) {
      set(s =>
        produce(s, df => {
          df.prescriptions?.push(medicationRequest);
        }),
      );
    } else {
      console.warn("Didn't do anything.... must be in start state");
    }
  };

  const complete = () => {
    send('STEP');
    // set();
  };

  const reset = () => {
    if (states.matches('finish')) {
      send('STEP');
    } else {
      console.log('Unable to reset');
    }
  };

  return {
    visit,
    initialize,
    complete,
    reset,
    addAssessment,
    addMedicationRequest,
  };
}
