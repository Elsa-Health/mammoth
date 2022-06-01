import React from 'react';

import {Layout, Text} from '@elsa-ui/react-native/components';
import {useTheme} from '@elsa-ui/react-native/theme';
import {ScrollView, View} from 'react-native';
import {Block, Column, Row, Section, TitledItem} from '../../temp-components';
import {WorkflowScreenProps} from '@elsa-ui/react-native-workflows';
import {Patient} from '../../../emr-types/v1/personnel';
import {IconButton, Searchbar, Chip, Button, FAB} from 'react-native-paper';
import _ from 'lodash';

import {Set} from 'immutable';
import {format} from 'date-fns';

const options = [
  {name: 'name', icon: 'file'},
  {name: 'phone', icon: 'phone'},
];
export default function PatientDashboardScreen({
  actions: $,
}: WorkflowScreenProps<
  {},
  {
    onNewPatient: () => void;
    onNewVisit: (patientId: string) => void;
    onViewProfile: (patientId: string) => void;
  }
>) {
  const {spacing} = useTheme();
  const [searchOptions, setOpts] = React.useState<string[]>([]);

  return (
    <Layout title="Patient Dashboard" style={{padding: 0}}>
      <ScrollView
        contentContainerStyle={{padding: spacing.md}}
        style={{flex: 1}}>
        <Section
          title="Search Patient"
          desc="Search for the patient"
          removeLine>
          <Column wrapperStyle={{marginBottom: 8}}>
            <Searchbar
              style={{borderColor: '#CCC', borderWidth: 0.6, elevation: 2}}
            />
          </Column>
          <Row spaceTop contentStyle={{justifyContent: 'flex-start'}}>
            {options.map(({name, icon}) => {
              const selected = searchOptions.includes(name);
              return (
                <Chip
                  icon={selected ? 'check' : icon}
                  selected={selected}
                  onPress={() =>
                    setOpts(d => {
                      const x = Set(d);
                      if (x.has(name)) return x.remove(name).toArray();

                      return x.add(name).toArray();
                    })
                  }
                  style={{
                    borderWidth: 1,
                    borderColor: '#1c2846',
                    marginRight: 8,
                    backgroundColor: '#b5c1df',
                  }}>
                  {_.capitalize(name)}
                </Chip>
              );
            })}
          </Row>
        </Section>
        {/* Past Visits */}
        <Section>
          <Text font="bold" size={19} color="#1c2846">
            Patients / {34}
          </Text>
          <Column>
            {[3, 4, 5].map(ix => (
              <Section mode="raised" key={ix} spaceTop={ix !== 0}>
                <PatientItem
                  onNewVisit={() => $.onNewVisit(ix)}
                  onViewProfile={() => $.onViewProfile(ix)}
                />
              </Section>
            ))}
          </Column>
        </Section>
      </ScrollView>
      <FAB
        style={{
          position: 'absolute',
          margin: 16,
          right: 0,
          bottom: 0,
        }}
        icon="plus"
        onPress={$.onNewPatient}
      />
    </Layout>
  );
}

function PatientItem(props: any) {
  return (
    <>
      <Column wrapperStyle={{marginBottom: 12}}>
        <TitledItem title="Patient ID">09876543-123456</TitledItem>
        <TitledItem spaceTop title="Registered Date">
          {format(new Date(), 'yyyy, MMMM dd')}
        </TitledItem>
      </Column>
      <Row spaceTop>
        <Button
          icon="file-plus-outline"
          onPress={props.onNewVisit}
          mode="outlined">
          New Visit
        </Button>
        <Button icon="clipboard-account" onPress={props.onViewProfile}>
          View Profile
        </Button>
      </Row>
    </>
  );
}
