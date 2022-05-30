import React from 'react';

import {Layout, Text} from '@elsa-ui/react-native/components';
import {useTheme} from '@elsa-ui/react-native/theme';
import {ScrollView, View} from 'react-native';
import {Button, RadioButton, TextInput} from 'react-native-paper';
import {
  Block,
  Column,
  Item,
  Row,
  Section,
  TitledItem,
} from '../../temp-components';
import {WorkflowScreenProps} from '@elsa-ui/react-native-workflows';
import {MedicaDisp, MedicaReq} from '../../emr';

import {ARV, Medication} from 'elsa-health-data-fns/lib';
import {format} from 'date-fns';

const ion = (p: [string, string][]) => p.map(([k, v]) => ({id: k, name: v}));

type MakeRequestHandlerProps = {
  reason: string | null;
  patientId: string;
} & (
  | {type: 'arv'; regimen: ARV.Regimen; className: ARV.Class}
  | {type: 'standard'; medication: Medication.All; alias?: string}
);

export default function MedicationRequestScreen({
  entry: {request: data},
  actions: $,
}: WorkflowScreenProps<
  {request: MedicaReq},
  {
    onAcceptMedicationRequest: (
      medicationRequest: MedicaReq,
      finish: () => void,
    ) => void;
    onIgnoreRequest: () => void;
  }
>) {
  const {spacing} = useTheme();

  const [loading, set] = React.useState(false);
  return (
    <Layout title={`Request #${data.id}`} style={{padding: 0}}>
      <ScrollView
        contentContainerStyle={{padding: spacing.md}}
        style={{flex: 1}}>
        {/* Current stock notice */}
        <Section
          title="You have enough"
          desc="Looking at your stock. You are able to properly respond to the medication request."
          mode="raised"
          removeLine
        />
        {/* See full details of the request */}
        {/* Information included:
            
                - Name of medication
                - Doctor requesting 
                - Patient requesting for (by ID)
                - Date of request
            */}
        <Section
          title="Request Details"
          desc="Below are the details of the medication request.">
          <TitledItem title="Request Date">
            {format(new Date(data.authoredOn), 'yyyy, MMMM dd. HH:MM')}
          </TitledItem>
          <TitledItem title="Medication Name" spaceTop>
            {Medication.all.fromKey(data.medication.name) ??
              data.medication.name}
          </TitledItem>
          <TitledItem title="Patient ID" spaceTop>
            {data.subject.id}
          </TitledItem>
          <TitledItem title="Reason for request" spaceTop>
            {data.reason ?? 'Unspecified'}
          </TitledItem>
          <TitledItem title="Instructions" spaceTop>
            {data.instructions ?? 'None'}
          </TitledItem>
        </Section>
      </ScrollView>
      <Block>
        <Button onPress={$.onIgnoreRequest} mode="outlined">
          Ignore
        </Button>
        <Item spaceTop>
          <Button
            mode="contained"
            loading={loading}
            onPress={() => {
              set(true);
              $.onAcceptMedicationRequest(data, () => set(false));
            }}>
            Accept Request
          </Button>
        </Item>
      </Block>
    </Layout>
  );
}
