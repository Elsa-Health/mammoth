import React from 'react';
import {View, ScrollView} from 'react-native';
import {Layout, Text} from '../../../@libs/elsa-ui/components';

import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {Checkbox} from 'react-native-paper';

import * as data from '../../../@libs/data-fns';
import {SectionedSelect} from '../../../@libs/elsa-ui/components/misc';
import produce from 'immer';
import {Button} from 'react-native-paper';
import _ from 'lodash';

export default function OrderInvestigationScreen<
  C extends string,
  I extends string,
>({
  entry: {condition, recommendedTests, value},
  actions: $,
}: WorkflowScreen<
  {condition?: C; recommendedTests: I[]; value: I[]},
  {
    getConditionText: (cond: C) => string;
    getInvestigationList: () => Array<{id: I; name: string}>;
    getInvestigationText: (investigation: I) => string;
    onGoBack: () => void;
    onOrder: (investigations: I[], err?: (message: string) => void) => void;
  }
>) {
  console.log({condition, recommendedTests});
  const [investigations, set] = React.useState<I[]>(value || []);
  const setInvestigation = React.useCallback((inv: I) => {
    set(s =>
      produce(s, df => {
        const invIndex = df.findIndex(s => s === inv);
        if (invIndex > -1) {
          df.splice(invIndex, 1);
        } else {
          // add
          // @ts-ignore
          df.push(inv);
        }
      }),
    );
  }, []);

  const showRecommendedTests = recommendedTests.length > 0;

  return (
    <Layout title="Order Inverstigations" style={{padding: 0}}>
      <ScrollView
        contentContainerStyle={{
          paddingHorizontal: 24,
          paddingBottom: 16,
        }}>
        {/* Showing information on conditions */}
        {condition !== undefined && (
          <View
            style={{
              display: 'flex',
              flexDirection: 'row',
              backgroundColor: '#EFF6FF',
              padding: 16,
              borderRadius: 6,
            }}>
            <Icon name="information" size={25} color="#1E40AF" />

            <Text style={{paddingLeft: 8}} color="#1E40AF">
              Based on our assessment, the most likely disease for your patient
              is <Text font="bold">{$.getConditionText(condition)}</Text>
            </Text>
          </View>
        )}
        {/* Recommendations */}
        <View>
          {showRecommendedTests && (
            <>
              <Text font="bold" style={{paddingVertical: 12}}>
                Recommended Tests
              </Text>
              <Text>It is recommended that you order the following tests:</Text>
              <View>
                {recommendedTests.map(inv => (
                  <Checkbox.Item
                    key={inv}
                    label={$.getInvestigationText(inv)}
                    status={
                      investigations.includes(inv) ? 'checked' : 'unchecked'
                    }
                    onPress={() => setInvestigation(inv)}
                  />
                ))}
              </View>
            </>
          )}
          <View>
            <Text>
              {showRecommendedTests
                ? 'Order other investigations:'
                : 'Select the investigations to later perform on the patient:'}
            </Text>
            <SectionedSelect
              confirmText={'Confirm'}
              items={[
                {
                  name: 'Investigations',
                  id: 1,
                  children: $.getInvestigationList(),
                },
              ]}
              uniqueKey="id"
              searchPlaceholderText={'Search Investigations'}
              selectText={'Search'}
              onSelectedItemsChange={(testIds: I[]) => {
                console.log(testIds);
                set(testIds);
              }}
              selectedItems={investigations}
            />
          </View>
        </View>
        <View style={{marginVertical: 16}}>
          <Button onPress={$.onGoBack}>Go Back</Button>
          {investigations.length > 0 && (
            <Button
              mode="contained"
              style={{marginTop: 8}}
              onPress={() => $.onOrder(investigations)}>
              Order Investigations
            </Button>
          )}
        </View>
      </ScrollView>
    </Layout>
  );
}
