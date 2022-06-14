import React from 'react';

import {Layout, Text} from '@elsa-ui/react-native/components';
import {useTheme} from '@elsa-ui/react-native/theme';
import {ScrollView, View} from 'react-native';
import {
  Block,
  CollapsibleSection,
  Column,
  Row,
  Section,
  TitledItem,
} from '../../temp-components';
import {WorkflowScreenProps} from '@elsa-ui/react-native-workflows';
import {Divider, Button, Searchbar} from 'react-native-paper';
import {CTCOrganization} from '../../emr/types';
import {ARV} from 'elsa-health-data-fns/lib';
import {List} from 'immutable';
import {formatDistanceToNow} from 'date-fns/esm';
import produce from 'immer';

type StockMedication = {
  facility: {name: string; ctcCode: string};
  lastUpdated?: UTCDateTimeString;
  stockItems: List<{regimen: ARV.Regimen; name: string; count: number}>;
};

const stockMedication = List<StockMedication>([
  {
    facility: {name: 'Mbuguni CTC', ctcCode: '1131321312'},
    lastUpdated: new Date().toUTCString(),
    stockItems: List([
      {
        regimen: '1-c-a-azt-3-tc-efv',
        name: ARV.regimen.fromKey('1-c-a-azt-3-tc-efv') ?? '1-c-a-azt-3-tc-efv',
        count: 8,
      },
      {
        regimen: '3-w-p-ral-drv-r-azt-3-tc',
        name:
          ARV.regimen.fromKey('3-w-p-ral-drv-r-azt-3-tc') ??
          '3-w-p-ral-drv-r-azt-3-tc',
        count: 2,
      },
    ]),
  },
  {
    facility: {name: 'Patandi CTC', ctcCode: '1131321312'},
    lastUpdated: new Date().toUTCString(),
    stockItems: List([
      {
        regimen: '1-c-a-azt-3-tc-efv',
        name: ARV.regimen.fromKey('1-c-a-azt-3-tc-efv') ?? '1-c-a-azt-3-tc-efv',
        count: 8,
      },
      {
        regimen: '1-g-p-tdf-3-tc-efv',
        name: ARV.regimen.fromKey('1-g-p-tdf-3-tc-efv') ?? '1-g-p-tdf-3-tc-efv',
        count: 12,
      },
    ]),
  },
  {
    facility: {name: 'Usa Dream CTC', ctcCode: '1131321312'},
    lastUpdated: new Date().toUTCString(),
    stockItems: List([
      {
        regimen: '1-c-a-azt-3-tc-efv',
        name: ARV.regimen.fromKey('1-c-a-azt-3-tc-efv') ?? '1-c-a-azt-3-tc-efv',
        count: 8,
      },
      {
        regimen: '1-g-p-tdf-3-tc-efv',
        name: ARV.regimen.fromKey('1-g-p-tdf-3-tc-efv') ?? '1-g-p-tdf-3-tc-efv',
        count: 12,
      },
    ]),
  },
]);

export default function MedicationMapScreen({
  entry,
  actions: $,
}: WorkflowScreenProps<
  {
    organization: CTCOrganization;
  },
  {
    onUpdateStock: () => void;
  }
>) {
  const {spacing} = useTheme();
  const [searchText, setSearchText] = React.useState('');

  const [filtered, setFiltered] = React.useState(() => stockMedication);

  const searchMedication = (text: string) => {
    // manual searching
    setFiltered(
      stockMedication
        // .filter(
        //   // search the medication in collection
        //   item =>
        //     item.stockItems
        //       .map(d => d.name)
        //       .find(f => f.toLowerCase().search(text.toLowerCase()) > -1) !==
        //     undefined,
        // )
        .map(item => ({
          ...item,
          stockItems: item.stockItems.filter(f => {
            const sRegex = new RegExp(
              text.toLowerCase().replaceAll('+', '-'),
              'i',
            );
            return (
              f.name.toLowerCase().replaceAll('+', '-').search(sRegex) > -1
            );
          }),
        })),
    );
  };

  return (
    <Layout title="Medications Network" style={{padding: 0}}>
      <ScrollView
        contentContainerStyle={{padding: spacing.md}}
        style={{flex: 1}}>
        <Section
          removeLine
          mode="raised"
          title="Search Medication"
          desc="Search medications in from other facilities">
          <Searchbar
            value={searchText}
            onChangeText={setSearchText}
            onEndEditing={() => searchMedication(searchText)}
            placeholder="Find medication"
          />
        </Section>
        <Section removeLine spaceTop noPad>
          <Button icon="file" mode="outlined" onPress={() => $.onUpdateStock()}>
            Update Stock
          </Button>
        </Section>

        {/* Show the list of items to work with */}
        <View>
          {filtered.map((item, ix) => (
            <React.Fragment key={ix}>
              <CollapsibleSection
                reveal={true}
                removeLine
                title={item.facility.name}
                desc={`Last updated: ${
                  item.lastUpdated !== undefined
                    ? `${formatDistanceToNow(new Date(item.lastUpdated))}`
                    : 'Never'
                }`}>
                {item.stockItems.count() > 0 ? (
                  item.stockItems.map((arv, ix) => (
                    <Row contentStyle={{paddingVertical: 4}}>
                      <Text>{arv.name}</Text>
                      <Text>{arv.count}</Text>
                    </Row>
                  ))
                ) : (
                  <Row contentStyle={{justifyContent: 'center'}}>
                    <Text italic style={{textAlign: 'center'}}>
                      This facility doesn't have the searched medication
                    </Text>
                  </Row>
                )}
              </CollapsibleSection>
            </React.Fragment>
          ))}
        </View>
      </ScrollView>
    </Layout>
  );
}
