import React from 'react';

import {Layout, Text} from '@elsa-ui/react-native/components';
import {useTheme} from '@elsa-ui/react-native/theme';
import {ScrollView, View} from 'react-native';
import {
  Block,
  Column,
  Row,
  Section,
  TitledItem,
  TouchableItem,
} from '../../temp-components';
import {WorkflowScreenProps} from '@elsa-ui/react-native-workflows';
import {Button, TouchableRipple} from 'react-native-paper';
import {Visit} from '../../../emr-types/v1/visit';

import CollapsibleView from 'react-native-collapsible';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import Animated, {EasingNode} from 'react-native-reanimated';
import {InvReq} from '../../emr/hook';
import {Investigation} from 'elsa-health-data-fns/lib';
import {useAsyncRetry} from 'react-use';

export default function ViewVisitScreen({
  entry: {visit},
  actions: $,
}: WorkflowScreenProps<
  {visit: Visit},
  {
    onNext: () => void;
    getInvestigationResult: (invRequest: any) => Promise<any>;
    onAddInvestigationResult: () => void;
    onUpdateInvestigationResult: () => void;
  }
>) {
  const {spacing} = useTheme();

  return (
    <Layout title="Visit" style={{padding: 0}}>
      <ScrollView
        contentContainerStyle={{paddingHorizontal: spacing.md}}
        style={{flex: 1}}>
        {/* Past Visits */}
        <Section spaceTop mode="raised">
          <Row icon="calendar">
            <Text>Date of Visit</Text>
            <Text font="bold">26, April 2022</Text>
          </Row>
        </Section>
        <Section desc="Basic details" mode="raised" spaceTop>
          <Row>
            <TitledItem title="Sex">Male</TitledItem>
            <TitledItem title="Age" spaceTop>
              24 years and 4 months
            </TitledItem>
          </Row>
          <TitledItem title="Type of Visit" spaceTop>
            Home Visit
          </TitledItem>
        </Section>
        <Section title="Assessment" spaceTop>
          <Text>Something</Text>
        </Section>
        <Section title="Investigations">
          {visit.investigationRequests.map(invReq => (
            <InvestigationItem
              key={invReq.id}
              request={invReq as InvReq}
              getResults={async () => await $.getInvestigationResult(invReq)}
              onAddResult={() => {}}
              onUpdateResultItem={ix => {}}
            />
          ))}
        </Section>
      </ScrollView>
    </Layout>
  );
}

function InvestigationItem({
  request,
  getResults,
}: {
  request: InvReq;
  getResults: () => Promise<any>;
  onAddResult: () => void;
}) {
  const [collapse, set] = React.useState(false);
  const {spacing} = useTheme();
  const d = () => {
    set(s => !s);
  };

  const invId = request.data.investigationId;
  const {} = useAsyncRetry(async () => {}, [request]);

  return (
    <Column>
      <TouchableRipple onPress={d}>
        <Row>
          <TitledItem title="Investigation">
            {Investigation.name.fromKey(invId) ?? invId}
          </TitledItem>
          <Animated.View>
            <Icon name="chevron-down" size={24} />
          </Animated.View>
        </Row>
      </TouchableRipple>

      {/* Investigation content */}
      <CollapsibleView
        collapsed={!collapse}
        style={{paddingVertical: spacing.md}}>
        <Text>No Result</Text>
      </CollapsibleView>

      {/* Button */}
      <Row spaceTop>
        <Button icon="file">Show Results</Button>
        <Button icon="beaker-plus-outline" mode="contained">
          Update
        </Button>
      </Row>
    </Column>
  );
}
