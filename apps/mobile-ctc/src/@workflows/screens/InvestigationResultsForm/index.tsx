import React from 'react';
import {Pressable, View} from 'react-native';
import {
  Button,
  Divider,
  ProgressBar,
  RadioButton,
  TextInput,
} from 'react-native-paper';
import {Layout, Text} from '../../../@libs/elsa-ui/components';

import {Investigation} from 'elsa-health-data-fns';
import {ScrollView} from 'react-native-gesture-handler';
import produce from 'immer';

export default function InvestigationResultsForm({
  entry: {investigation: investigation_, result},
  actions: $,
}: WorkflowScreen<
  {
    investigation: {id: string} & PatientInvestigation;
    result: PatientInvestigationResult;
  },
  {
    onClose: () => void;
    onUpdateInvestigation: (
      id: string,
      newResult: PatientInvestigation,
    ) => void;
  }
>) {
  const {id, ...investigation} = investigation_;
  const [value, set] = React.useState(() => {
    if (investigation.obj.type === 'panel') {
      return result || {};
    }

    return result;
  });

  const obj = investigation.obj;
  const name = Investigation.name.fromId(investigation.investigationId);

  if (obj === undefined) {
    return (
      <View>
        <Text>Obj is undefined</Text>
      </View>
    );
  }

  return (
    <>
      {/* <ProgressBar progress={0.5} color={theme.color.primary.dark} /> */}
      <Layout title={`Investigation: #${id.slice(0, 6)}`} style={{padding: 0}}>
        <ScrollView
          showsVerticalScrollIndicator
          contentContainerStyle={{
            paddingHorizontal: 24,
            paddingVertical: 16,
            flexGrow: 1,
          }}>
          <View>
            {obj?.type !== 'panel' ? (
              <>
                <Text style={{marginBottom: 10}}>
                  Entering value for the '{name}' investigation
                </Text>
                <InvestigationField
                  shape={obj}
                  name={name}
                  value={value}
                  set={set}
                />
              </>
            ) : (
              <>
                <Text
                  font="bold"
                  style={{
                    marginBottom: 10,
                    lineHeight: 18,
                  }}>
                  {name} Investigation
                </Text>
                {Object.entries(obj.items)
                  .map(v => {
                    const [key, val] = v;
                    return {
                      key,
                      shape: val,
                      name: Investigation.name.fromId(key),
                    };
                  })
                  .filter(v => v.shape !== null)
                  .map(v => {
                    return (
                      <View style={{marginBottom: 6}} key={v.key}>
                        <InvestigationField
                          shape={v.shape}
                          name={v.name}
                          value={value[v.key]}
                          title={
                            v.shape?.type === 'options'
                              ? `Choose ${v.name}`
                              : undefined
                          }
                          set={val =>
                            set(s =>
                              produce(s, df => {
                                df[v.key] = val;
                                return df;
                              }),
                            )
                          }
                        />
                      </View>
                    );
                  })}
              </>
            )}
          </View>
        </ScrollView>
        <View
          style={{
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'center',
            paddingHorizontal: 24,
            marginBottom: 16,
          }}>
          <Button
            style={{flex: 1, marginRight: 8}}
            mode="outlined"
            onPress={$.onClose}>
            Close
          </Button>
          <Button
            style={{flex: 1}}
            mode="contained"
            onPress={() =>
              $.onUpdateInvestigation(id, {
                ...investigation,
                result: value,
              })
            }>
            Update
          </Button>
        </View>
      </Layout>
    </>
  );
}

function InvestigationField<T extends string>({
  shape,
  name,
  value,
  title,
  set,
}: {
  shape: data.InvestigationTypeRecord<T>;
  value: string;
  name: string;
  title: string;
  set: (text: string) => void;
}) {
  return (
    <View style={{paddingVertical: 4}}>
      {title !== undefined && <Text>{title}</Text>}
      {shape.type === 'options' && (
        <View>
          <RadioButton.Group onValueChange={s => set(s)} value={value}>
            <View
              style={{
                display: 'flex',
                flexDirection: 'row',
                justifyContent: 'flex-start',
                flexWrap: 'wrap',
              }}>
              {shape.options.map(s => {
                return <RadioButton.Item key={s} label={s} value={s} />;
              })}
            </View>
          </RadioButton.Group>
        </View>
      )}
      {shape.type === 'text' && (
        <View>
          <TextInput
            mode="outlined"
            value={value}
            onChangeText={text => set(text)}
            label={'Type Text'}
          />
        </View>
      )}
      {shape.type === 'numeric-units' && (
        <View>
          <TextInput
            mode="outlined"
            label={name}
            value={value}
            keyboardType="decimal-pad"
            onChangeText={text => set(text)}
            right={
              shape.units !== null && <TextInput.Affix text={shape.units} />
            }
          />
        </View>
      )}
    </View>
  );
}
