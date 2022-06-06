import React from 'react';

import {Layout, Text} from '@elsa-ui/react-native/components';
import {useTheme} from '@elsa-ui/react-native/theme';
import {ActivityIndicator, ScrollView, View} from 'react-native';
import {Block, Column, Row, Section, TitledItem} from '../../temp-components';
import {WorkflowScreenProps} from '@elsa-ui/react-native-workflows';
import {Searchbar, Chip, Button, FAB} from 'react-native-paper';
import _ from 'lodash';

import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

import {List, Set} from 'immutable';
import {format} from 'date-fns';
import produce from 'immer';
import {CTCPatient} from '../../emr/types';
import {useAsyncFn} from 'react-use';

const options: Array<{name: Option; icon: string}> = [
  // {name: 'id', icon: 'tag-text-outline'},
  {name: 'name', icon: 'file'},
  {name: 'phone', icon: 'phone'},
];

type Option = 'name' | 'phone';
export type SearchInOption = {[f in Option]: boolean};
export type SearchQuery = {input?: string; searchIn?: SearchInOption};
export default function PatientDashboardScreen({
  entry,
  actions: $,
}: WorkflowScreenProps<
  {searchText?: string},
  {
    getPatientsFromQuery: (
      query: SearchQuery,
    ) => Promise<Array<PatientItemProps>>;
    onNewPatient: () => void;
  }
>) {
  const {spacing} = useTheme();
  const [searchOptions, setOpts] = React.useState<SearchInOption>({
    name: false,
    phone: false,
  });

  const [searchText, onChangeSearchText] = React.useState('');
  // const [patients, set] = React.useState<null | CTCPatient[]>(null);

  const [{loading, value, error}, query] = useAsyncFn(
    async (q: SearchQuery) => {
      return [await $.getPatientsFromQuery(q), q] as [
        List<CTCPatient>,
        SearchQuery,
      ];
    },
    [$.getPatientsFromQuery],
  );

  const searchTextInputRef = React.useRef();

  const search = React.useCallback(
    () => query({input: searchText, searchIn: searchOptions}),
    [searchText, searchOptions],
  );
  const resetSearch = React.useCallback(() => {
    query({});
    onChangeSearchText('');
  }, [query, onChangeSearchText]);

  React.useEffect(() => {
    resetSearch();
    if (entry.searchText !== undefined) {
      onChangeSearchText(entry.searchText);
      searchTextInputRef.current?.focus();
    }
  }, [onChangeSearchText, resetSearch]);

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
              ref={searchTextInputRef}
              value={searchText}
              onChangeText={onChangeSearchText}
              onSubmitEditing={search}
              style={{borderColor: '#CCC', borderWidth: 0.6, elevation: 2}}
            />
          </Column>
          <Row spaceTop contentStyle={{justifyContent: 'flex-start'}}>
            {options.map(({name, icon}, ix) => {
              const selected = searchOptions[name];
              return (
                <Chip
                  key={ix}
                  icon={selected ? 'check' : icon}
                  selected={selected}
                  onPress={() =>
                    setOpts(d =>
                      produce(d, df => {
                        df[name] = !df[name];
                      }),
                    )
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
        {loading ? (
          <Column>
            <ActivityIndicator animating />
            <Text>Loading Patients...</Text>
          </Column>
        ) : error || value === undefined ? (
          <Column spaceTop>
            <Row contentStyle={{justifyContent: 'center'}}>
              <Icon name="exclamation-thick" size={30} />
              <Text style={{paddingRight: 50}}>
                Unable to load the patients. Please try again in a few.
              </Text>
            </Row>
            <Row contentStyle={{justifyContent: 'center'}} spaceTop>
              <Button icon="refresh" onPress={resetSearch}>
                Reset
              </Button>
              <Button icon="magnify" onPress={search}>
                Re-search
              </Button>
            </Row>
          </Column>
        ) : (
          <Section>
            <Text font="bold" size={19} color="#1c2846">
              Patients / {value[0].count()}
            </Text>
            <Column>
              {value[0].map((d, ix) => (
                <Section mode="raised" key={`${d.id}-${ix}`} spaceTop>
                  <PatientItem {...d} />
                </Section>
              ))}
            </Column>
          </Section>
        )}
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

type AwaitComponentProps =
  | {loading: true; error: undefined; value: undefined}
  | {loading: false; error: undefined; value: T}
  | {loading: false; error: Error; value: undefined};
function AwaitedState<T>({
  state,
  children: Child,
}: {
  state: {loading: boolean; value: T; error?: Error | undefined};
  children: (props: AwaitComponentProps) => JSX.Element;
}) {
  return (
    <>
      {/* @ts-ignore */}
      <Child {...state} />
    </>
  );
}

export type PatientItemProps = {
  id: string;
  name: string | null;
  registeredDate: Date;
  onNewVisit: () => void;
  onViewProfile: () => void;
};
function PatientItem(props: PatientItemProps) {
  return (
    <>
      <Column wrapperStyle={{marginBottom: 12}}>
        <TitledItem title="Patient Name">{props.name ?? '-'}</TitledItem>
        <TitledItem spaceTop title="Patient ID">
          {props.id}
        </TitledItem>
        <TitledItem spaceTop title="Registered Date">
          {format(props.registeredDate, 'yyyy, MMMM dd')}
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
