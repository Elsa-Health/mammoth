import {format} from 'date-fns';
import React from 'react';
import {View, ScrollView, ViewProps} from 'react-native';
import {Divider} from 'react-native-paper';
import {Layout, Text} from '../../../@libs/elsa-ui/components';
import {WorkflowScreen} from '../../../@workflows';
import {properAgeString} from '../../../app/utils';

import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {useTheme} from '../../../@libs/elsa-ui/theme';

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

export default function PatientVisit({
  entry: {visit},
}: WorkflowScreen<
  {
    visit: CTC.Visit;
  },
  {}
>) {
  const {
    dateTime,
    intake,
    patient,
    assessmentSummary: {summary: as, investigations, medicationInfo},
  } = visit;
  const {color} = useTheme();
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
            <Item text="Changed Status" value={medicationInfo?.status} />
            {medicationInfo.reason !== undefined && (
              <Item text="Reason" value={medicationInfo.reason} />
            )}
            <Item
              text="Prescribed Medications"
              value={medicationInfo?.medications?.join(', ')}
            />
          </Section>
        )}
      </ScrollView>
    </Layout>
  );
}
