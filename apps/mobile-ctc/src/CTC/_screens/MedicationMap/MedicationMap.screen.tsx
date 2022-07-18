import React from 'react';

import {Layout, Text} from '@elsa-ui/react-native/components';
import {useTheme} from '@elsa-ui/react-native/theme';
import {ScrollView, View} from 'react-native';
import {
  Block,
  CollapsibleSection,
  Column,
  Item,
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
import {useAsyncRetry} from 'react-use';
import {getFacilityFromCode} from '../../facilities';
import {format} from 'date-fns';
import {PublicStock} from '../../emr/store';
import {groupByFn} from '../MedicationStock/helpers';

export default function MedicationMapScreen({
  entry: e,
  actions: $,
}: WorkflowScreenProps<
  {
    organization: CTCOrganization;
  },
  {
    fetchPublicStock: () => Promise<List<PublicStock>>;
    onGoToUpdateStock: () => void;
  }
>) {
  const {spacing} = useTheme();
  const [searchText, setSearchText] = React.useState('');

  const {
    retry,
    value: stockMedication,
    loading,
  } = useAsyncRetry($.fetchPublicStock, []);
  const [filtered, setFiltered] = React.useState(() => stockMedication);

  React.useEffect(() => {
    setFiltered(stockMedication ?? List([]));
  }, [stockMedication]);

  const searchMedication = (text: string) => {
    if (stockMedication !== undefined) {
      // manual searching
      setFiltered(
        stockMedication.filter(f => {
          const sRegex = new RegExp(
            text.toLowerCase().replaceAll('+', '-'),
            'i',
          );
          return (
            f.record.text.toLowerCase().replaceAll('+', '-').search(sRegex) > -1
          );
        }),
      );
    }
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
          <Button
            icon="file"
            mode="contained"
            onPress={() => $.onGoToUpdateStock()}>
            Update My Stock
          </Button>
          <Item spaceTop>
            <Button icon="refresh" mode="outlined" onPress={retry}>
              Re-fetch public Stock
            </Button>
          </Item>
        </Section>

        {loading ? (
          <View>
            <Text>Loading...</Text>
          </View>
        ) : (
          <>
            {stockMedication === undefined ? (
              <>
                <View>
                  <Text>
                    Unable to show the public medication stock information at
                    the moment
                  </Text>
                </View>
              </>
            ) : (
              <>
                {/* Show the list of items to work with */}
                <View>
                  {groupByFn(
                    filtered?.toArray() ?? [],
                    item => item.source.facility,
                  ).map(([ctc, arr], ix) => (
                    <React.Fragment key={ix}>
                      <Something
                        ctcCode={ctc}
                        items={arr}
                        organization={e.organization}
                      />
                    </React.Fragment>
                  ))}
                </View>
              </>
            )}
          </>
        )}
      </ScrollView>
    </Layout>
  );
}

function Something({ctcCode, items: _items, organization: org}) {
  const facility =
    getFacilityFromCode(ctcCode) ??
    (org.identifier?.ctcCode === ctcCode
      ? {name: `${org.name}`, ctcCode}
      : null);
  const title = facility?.name ?? `${ctcCode} (Unknown CTC)`;

  const items = React.useMemo(() => List(_items), [_items]);
  const latest = React.useMemo(() => {
    const d = items
      .map(item => new Date(item?.timestamp))
      .sortBy(d => -d.getTime())
      .get(0);

    if (d !== undefined) {
      return `${formatDistanceToNow(new Date(d))} ago`;
    }

    return `Never`;
  }, [items]);

  return (
    <CollapsibleSection
      reveal={true}
      removeLine
      title={title}
      desc={`Last Update: ${latest}`}>
      {items.count() > 0 ? (
        items.map((item, ix) => (
          <React.Fragment key={ix}>
            <Row contentStyle={{paddingVertical: 4}}>
              <Text>{item.record.text}</Text>
              <Text>{item.record.count}</Text>
            </Row>
          </React.Fragment>
        ))
      ) : (
        <Row contentStyle={{justifyContent: 'center'}}>
          <Text italic style={{textAlign: 'center'}}>
            This facility doesn't have the searched medication
          </Text>
        </Row>
      )}
    </CollapsibleSection>
  );
}
