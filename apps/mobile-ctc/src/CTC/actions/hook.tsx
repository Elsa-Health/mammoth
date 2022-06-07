import produce from 'immer';
import React from 'react';
import {CTCDoctor, CTCPatient, CTCVisit} from '../emr/types';
import {FirstPatientIntake} from '../_screens/BasicPatientIntake/BasicPatientIntake.screen';
import {ConcludeAssessmentData} from '../_screens/ConcludeAssessment/ConcludeAssessment.screen';
import {PatientAdherenceInfo} from '../_screens/HIVAdherenceAssessment/HIVAdherenceAssessment.screen';
import {HIVPatientIntake} from '../_screens/HIVStageIntake/HIVStageIntake.screen';
import {reference} from './basic';

import {useTheme} from '@elsa-ui/react-native/theme';

import {Portal, Modal, Surface, Button} from 'react-native-paper';

import {
  translateConclusionAssessment,
  translateFirstPatientIntake,
  translateHIVAssessment,
  translatePatientAdherence,
} from './translate';
import {View} from 'react-native';
import {Text} from '@elsa-ui/react-native/components';
import {Block, Row, Section} from '../temp-components';
import {useAsyncFn} from 'react-use';

type CurrentVisit = {
  firstPatientIntake: FirstPatientIntake;
  currentHIVStatus: HIVPatientIntake;
  patientAdherenceInfo: PatientAdherenceInfo;
  conclusionAssessment: ConcludeAssessmentData;
};

const convertToProperVisit = (
  id: string,
  visit: Partial<CurrentVisit>,
  ref: {
    doctor: ReferenceIdentifier<'Practitioner'>;
    patient: ReferenceIdentifier<'Patient'>;
  },
  generateId: () => string,
): CTCVisit => {
  const {
    firstPatientIntake,
    currentHIVStatus,
    patientAdherenceInfo,
    conclusionAssessment,
  } = visit;

  const config = () => ({
    id: generateId(),
    reporter: ref.doctor,
    subject: ref.patient,
  });

  const ctcVisit = produce(
    {
      id,
      authorizingAppointment: null,
      assessments: [],
      prescriptions: [],
      investigationRequests: [],
      code: null,
      createdAt: new Date().toUTCString(),
      extendedData: null,
      practitioner: ref.doctor,
      resourceType: 'Visit',
      subject: ref.patient,
    } as CTCVisit,
    df => {
      if (firstPatientIntake !== undefined) {
        df.assessments.push(
          translateFirstPatientIntake(config(), firstPatientIntake),
        );
      }

      if (currentHIVStatus !== undefined) {
        df.assessments.push(translateHIVAssessment(config(), currentHIVStatus));
      }

      if (patientAdherenceInfo !== undefined) {
        df.assessments.push(
          translatePatientAdherence(config(), patientAdherenceInfo),
        );
      }

      if (conclusionAssessment !== undefined) {
        const {
          assessment: concAssessment,
          investigationRequests,
          medicationRequests,
        } = translateConclusionAssessment(config(), conclusionAssessment);

        df.assessments.push(concAssessment);

        df.investigationRequests = investigationRequests;
        df.prescriptions = medicationRequests;
      }

      df.subject = ref.patient;
      df.practitioner = ref.doctor;
    },
  );

  return ctcVisit;
};

// TODO: Make use of state machine
export function useVisit() {
  const [visit, set] = React.useState<Partial<CurrentVisit>>({});
  const [actors, setActors] = React.useState<{
    doctor: ReferenceIdentifier<'Practitioner'> | null;
    patient: ReferenceIdentifier<'Patient'> | null;
  }>({doctor: null, patient: null});

  const [ready, setReady] = React.useState(false);

  /**
   * Set the values for the values
   * @param field
   * @param value
   */
  const setValue = React.useCallback(
    <F extends keyof CurrentVisit>(field: F, value: CurrentVisit[F]) => {
      set(s =>
        produce(s, df => {
          df[field] = value;
        }),
      );
    },
    [set],
  );

  /**
   * Reset the current Visit value
   * @returns
   */
  const reset = React.useCallback(() => {
    set({});
    setActors({doctor: null, patient: null});
  }, [set, setActors]);

  const initiateVisit = React.useCallback(
    (doctor: Referred<CTCDoctor>, patient: Referred<CTCPatient>) => {
      set({});
      setActors(s =>
        produce(s, df => {
          df.doctor =
            doctor.resourceType === 'Reference' ? doctor : reference(doctor);
          df.patient =
            patient.resourceType === 'Reference' ? doctor : reference(patient);
        }),
      );
    },
    [set, setActors],
  );

  const confirm = React.useCallback(() => {
    setReady(true);
  }, [setReady]);

  const closeModal = React.useCallback(() => setReady(false), [setReady]);

  const context = React.useMemo(
    () =>
      ({
        visit,
        actors,
        closeModal,
      } as VisitContext),
    [visit, actors, closeModal],
  );

  return {
    setValue,
    reset,
    initiateVisit,
    visit,
    ready,
    confirm,
    context,
  };
}

type VisitContext = {
  visit: Partial<CurrentVisit>;
  actors: {
    doctor: ReferenceIdentifier<'Practitioner'> | null;
    patient: ReferenceIdentifier<'Patient'> | null;
  };
  closeModal: () => void;
};

export function ConfirmVisitModal({
  visible,
  context,
  cancelVisit,
  recordVisit,
  generateId,
}: {
  visible: boolean;
  context: VisitContext;
  generateId: () => string;
  recordVisit: (visit: CTCVisit) => Promise<void>;
  cancelVisit: () => void;
}) {
  const [{loading, error}, record] = useAsyncFn(() => {
    const {actors} = context;
    if (actors.patient === null || actors.doctor === null) {
      if (actors.patient === null) {
        throw new Error('Patient not attached to some visit');
      }

      if (actors.doctor === null) {
        throw new Error('Doctor is not attached to the visti');
      }
    }

    const properVisit = convertToProperVisit(
      generateId(),
      context.visit,
      actors,
      generateId,
    );
    return recordVisit(properVisit).then(context.closeModal);
  }, [context]);

  const cancel = React.useCallback(() => {
    cancelVisit();
    context.closeModal();
  }, [context, cancelVisit]);

  return (
    <Portal>
      <Modal visible={visible}>
        <Surface style={{elevation: 3, marginHorizontal: 24}}>
          {error !== undefined ? (
            <Section title="Error while recording" removeLine>
              <Text style={{lineHeight: 20}}>
                There was an error while recording the visit. Please try again
                later.
              </Text>
            </Section>
          ) : (
            <Section title="Submitting a Visit" removeLine>
              <Text style={{lineHeight: 20}}>
                You are about to submit a visit. Please confirm submission to
                complete and store the visit.
              </Text>
            </Section>
          )}
          <Block>
            <Row>
              <Button onPress={cancel} style={{flex: 1}}>
                Cancel
              </Button>
              <Button
                loading={loading}
                onPress={record}
                mode="contained"
                icon="check"
                style={{marginLeft: 8, flex: 1}}>
                Confirm
              </Button>
            </Row>
          </Block>
        </Surface>
      </Modal>
    </Portal>
  );
}
