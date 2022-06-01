import React from 'react';

import {Layout, Text} from '@elsa-ui/react-native/components';
import {useTheme} from '@elsa-ui/react-native/theme';
import {ScrollView, View} from 'react-native';
import {Block, Column, Row, Section, TitledItem} from '../../temp-components';
import {WorkflowScreenProps} from '@elsa-ui/react-native-workflows';
import {Divider, Button} from 'react-native-paper';

export default function ViewInvestigationScreen({
  actions: $,
}: WorkflowScreenProps<{}, {onNext: () => void}>) {
  const {spacing} = useTheme();

  return (
    <Layout title={`Investigation #${12341242}`} style={{padding: 0}}>
      <ScrollView
        contentContainerStyle={{padding: spacing.md}}
        style={{flex: 1}}>
        <Section
          removeLine
          mode="raised"
          title="Request"
          desc="Add the results of the information">
          <TitledItem title="ID">#1231241324112</TitledItem>
          <TitledItem title="Investigation" spaceTop>
            Urinalysis
          </TitledItem>
        </Section>
        <Section removeLine spaceTop>
          <Button icon="file" mode="contained">
            Add results
          </Button>
        </Section>
        <Section
          removeLine
          icon="file-document-edit-outline"
          title="Results"
          desc="Results recorded against this investigation">
          {/* Investigation results */}
          {[1, 2, 3].map((d, tx) => (
            <React.Fragment key={tx}>
              <InvestigationResultItem />
            </React.Fragment>
          ))}
        </Section>
      </ScrollView>
    </Layout>
  );
}

function InvestigationResultItem() {
  return (
    <Section mode="raised" spaceTop>
      <View>
        <Text></Text>
      </View>
    </Section>
  );
}

function InvestigationForm() {
  return (
    <View>
      <TitledItem title="Investigation Name">
        Diastolic Blood Pressure
      </TitledItem>
      <View style={{paddingVertical: 8}}>
        <Divider />
      </View>
      <Column>
        <Row icon="file">
          <Text>Add Investigation Record</Text>
        </Row>
      </Column>
    </View>
  );
}
