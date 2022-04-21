import {format} from 'date-fns';
import React from 'react';
import {View, ScrollView, ViewProps, ToastAndroid} from 'react-native';
import {Button, Divider} from 'react-native-paper';
import {Layout, Text} from '../../../@libs/elsa-ui/components';
import {WorkflowScreen} from '../../../@workflows';
import {properAgeString} from '../../../app/utils';

import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {useTheme} from '../../../@libs/elsa-ui/theme';
import {CTC as ctc, Investigation, Medication} from '@elsa-health/data-fns/lib';
import cons from 'gun';
import {invStrigify} from '../../fns';
import {store} from '../../storage/personal';

function Section({
  title,
  children,
  style,
}: {
  title: string;
  children: React.ReactNode;
  style?: ViewProps['style'];
}) {
  return (
    <View>
      <View style={{marginVertical: 8}}>
        <Text size={18}>{title}</Text>
      </View>
      <Divider />
      <View style={style}>{children}</View>
    </View>
  );
}

function Item(props: {
  text: string;
  value: string;
  style?: ViewProps['style'];
}) {
  return (
    <View style={[{marginVertical: 4}, props.style]}>
      <Text font="bold" style={{marginBottom: 4}}>
        {props.text}
      </Text>
      <Text>{props.value}</Text>
    </View>
  );
}

type PatientInvestigation = {
  obj: any;
  investigationId: string;
  result: any;
};

export default function PatientVisit({
  entry: {visit},
  actions: $,
}: WorkflowScreen<
  {
    visit: CTC.Visit;
  },
  {
    getInvestigation: (id: string) => Promise<PatientInvestigation>;
    onViewUpdateInvestigation: (
      id: string,
      data: PatientInvestigation,
      err?: (message: string) => void,
    ) => void;
  }
>) {
  const {
    dateTime,
    intake,
    patient,
    assessmentSummary: {summary: as, investigations, medicationInfo},
    investigations: invObjects,
  } = visit;

  const {color} = useTheme();
  const [invs, setInvs] = React.useState<[string, PatientInvestigation][]>([]);

  React.useEffect(() => {
    Promise.all(
      investigations
        .filter(d => Investigation.name.fromKey(d) !== undefined)
        .map(async (inv, ix) => {
          const invId = invStrigify({ix, inv, visitId: visit.id});
          // console.log({x: invId});
          const f = await $.getInvestigation(invId);

          return (
            f ?? [
              invId,
              {
                investigationId: inv,
                obj: Investigation.fromKey(inv),
                result: null,
              },
            ]
          );
        }),
    ).then(out => {
      // Set the investigations
      setInvs(out);
    });
  }, []);

  return (
    <Layout title="Patient Visit">
      <ScrollView>
        {/* General Visit Details */}
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            marginBottom: 8,
          }}>
          <View style={{flexDirection: 'row', alignItems: 'center'}}>
            <Icon name="calendar" size={24} color={color.primary.base} />
            <Text style={{marginLeft: 4}} font="bold">
              Date of Visit
            </Text>
          </View>
          <Text>{format(new Date(dateTime), 'MMMM dd, yyyy')}</Text>
        </View>
        <Divider />
        {/* Patient Details */}
        <View style={{marginTop: 8}}>
          <Section title="Patient Details" style={{paddingVertical: 10}}>
            <Item text="Age" value={properAgeString(patient.age)} />
            <Item
              text="Sex"
              value={patient.sex === 'male' ? 'Male' : `Female`}
            />
            {Boolean(intake.isPregnant) && (
              <Item
                text="Pregnant"
                value={`Yes ${
                  intake.dateOfPregancy
                    ? `(Due Date: ${format(
                        new Date(intake.dateOfPregancy),
                        'MMMM dd, yyyy',
                      )})`
                    : ''
                }`}
              />
            )}
            <Item text="Functional Status" value={intake.functionalStatus} />
            {(intake.medications?.length || 0) > 0 && (
              <Item
                text="Medications"
                value={(intake.medications || []).join(', ')}
              />
            )}
            {intake.coMorbidities.length > 0 && (
              <Item
                text="Co-Morbidities"
                value={intake.coMorbidities?.join(', ')}
              />
            )}
          </Section>
        </View>
        {/* Assessment Summary */}
        <Section title="Assessment Summary" style={{paddingVertical: 10}}>
          <Item
            text="Risk of Non-Adherence"
            value={
              as.riskNonAdherence !== undefined
                ? `${(as.riskNonAdherence * 100).toFixed(2)} %`
                : 'Not Calculated'
            }
          />
        </Section>
        {/* Medication */}
        {medicationInfo !== undefined && (
          <Section title="Medication">
            <Item
              text="Set Status"
              value={ctc.status.fromKey(medicationInfo?.status)}
            />
            {medicationInfo.reason !== undefined && (
              <Item text="Reason" value={medicationInfo.reason} />
            )}
            <Item
              text="Prescribed Medications"
              value={medicationInfo?.medications
                ?.map(med => Medication.all.fromKey(med))
                .join(', ')}
            />
          </Section>
        )}
        {/* Investigations */}
        <Section title="Investigations" style={{paddingVertical: 10}}>
          {/* Check if there are investigation objects attached */}
          {invs.map(x => {
            const [invId, invObj] = x;
            const {obj, investigationId, result} = invObj || {};
            // console.log({invId, invObj});
            return (
              <React.Fragment key={invId}>
                {/* Investigation */}
                <View
                  style={{
                    marginVertical: 5,
                  }}>
                  <View>
                    <Text>{Investigation.name.fromKey(investigationId)}</Text>
                  </View>
                  <View
                    style={{
                      flexDirection: 'row',
                      alignItems: 'center',
                      marginTop: 4,
                    }}>
                    <View style={{flex: 1}}>
                      <Text size={'sm'} font="medium" color="#333">
                        Result
                      </Text>
                      <Text>{result ?? '-'}</Text>
                    </View>
                    <Button
                      icon="pencil"
                      mode="outlined"
                      onPress={() => {
                        $.onViewUpdateInvestigation(invId, invObj);
                        // ToastAndroid.show(
                        //   'Error fetching investigation ' +
                        //     Investigation.name.fromKey(inv),
                        //   ToastAndroid.SHORT,
                        // );
                      }}>
                      Update
                    </Button>
                  </View>
                </View>
              </React.Fragment>
            );
          })}
        </Section>
      </ScrollView>
    </Layout>
  );
}
