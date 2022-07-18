import {WorkflowScreenProps} from '@elsa-ui/react-native-workflows';
import {Layout, Text} from '@elsa-ui/react-native/components';
import {useTheme} from '@elsa-ui/react-native/theme';
import {ARV} from 'elsa-health-data-fns/lib';
import React from 'react';
import {ScrollView, StyleSheet, ToastAndroid, View} from 'react-native';
import {
  Button,
  HelperText,
  IconButton,
  RadioButton,
  TextInput,
} from 'react-native-paper';
import {
  CollapsibleSection,
  Column,
  ControlDateInput,
  Item,
  MultiSelect,
  Picker,
  Row,
  Section,
  TouchableItem,
} from '../../temp-components';
import {groupByFn} from './helpers';

import {
  BottomSheetBackdropProps,
  BottomSheetModal,
  BottomSheetModalProvider,
  BottomSheetScrollView,
} from '@gorhom/bottom-sheet';
import Animated, {
  Extrapolate,
  interpolate,
  useAnimatedStyle,
} from 'react-native-reanimated';
import {useAsyncFn} from 'react-use';
import _ from 'lodash';
import {Controller, useForm} from 'react-hook-form';

import z from 'zod';
import {useWorkflowStore} from '../../workflow';

const SingleStockItem = z.object({
  count: z.string(),
  form: z.union([
    z.literal('granules'),
    z.literal('syrup'),
    z.literal('tablets'),
  ]),
  expiresAt: z.string(),
  estimatedFor: z.union([
    z.literal('30-days'),
    z.literal('60-days'),
    z.literal('90-days'),
  ]),
  ingredients: z.array(z.string()),
  text: z.string(),
  type: z.union([z.literal('single'), z.literal('composed')]),
  concentrationValue: z.union([z.string(), z.null()]),
  dosage: z.object({value: z.number(), units: z.string()}).nullable(),
  identifier: z.string(),
  group: z.union([z.literal('adults'), z.literal('pediatrics')]),
});

export type SingleStockItem = z.infer<typeof SingleStockItem>;
// type onUpdateStockItemSubscription = (
//   docId: string,
//   cb: (d: CTC.ARVStockRecord) => void,
// ) => {unsubscribe: () => void};

type ARVMap = {
  [arvStockId: string]: [string, SingleStockItem];
};
// form value
type F = keyof ARVMap;
type V = ARVMap[F];

export default function MedicationStockScreen({
  actions: $,
}: WorkflowScreenProps<
  {},
  {
    setARVStockItem: (
      id: string | null,
      data: [string, SingleStockItem],
    ) => Promise<void>;
  }
>) {
  const e = useWorkflowStore(s => s.value.stock || {});
  const {spacing} = useTheme();
  // Summary of stock
  const groups = React.useMemo(
    () =>
      groupByFn(Object.entries(e.arvs ?? {}), ([_, s]) => s[1].group).map(
        ([d, x]) => [d, x.length],
      ),
    [e.arvs],
  );

  const [singleForm, setSingleForm] = React.useState<[F, V] | null>(null);

  // ref
  const singleBottomSheetRef = React.useRef<BottomSheetModal>(null);

  React.useEffect(() => {
    singleBottomSheetRef.current?.forceClose();
  }, []);

  // variables
  const snapPoints = React.useMemo(() => ['90%'], []);

  const showToAddSingleItem = () => {
    setSingleForm(null);
    singleBottomSheetRef.current?.present();
  };

  const showToUpdateSingleItem = (id: F, item: V) => {
    setSingleForm([id, item]);
    singleBottomSheetRef.current?.present();
  };

  return (
    <BottomSheetModalProvider>
      <>
        <Layout title="Manage Stock" style={{padding: 0}}>
          <ScrollView contentContainerStyle={{paddingHorizontal: spacing.md}}>
            {/* Add medicaiton stock */}
            <Section
              removeLine
              title="Summary"
              desc="Work on the items to manage in stock">
              {groups.count() > 0 ? (
                <Row contentStyle={{flexWrap: 'wrap'}}>
                  {groups.map(([className, count], ix) => (
                    <Column
                      key={ix}
                      wrapperStyle={{width: '50%'}}
                      contentStyle={{
                        alignContent: 'center',
                        justifyContent: 'center',
                      }}>
                      <Text font="bold" size={32}>
                        {count}
                      </Text>
                      <Text>{className}</Text>
                    </Column>
                  ))}
                </Row>
              ) : (
                <View>
                  <Text italic style={{textAlign: 'center'}}>
                    Nothing to show right now. Please wait as it's loading
                  </Text>
                </View>
              )}
            </Section>
            <Section
              title="ARV Medications"
              desc="Stock for all ARV medications"
              removeLine
              right={
                <Button icon="plus" onPress={showToAddSingleItem}>
                  Add
                </Button>
              }>
              {Object.entries(e.arvs ?? {}).length === 0 ? (
                <View>
                  <Text style={{textAlign: 'center'}} italic>
                    No stock information added for single arv medication
                  </Text>
                </View>
              ) : (
                Object.entries(e.arvs ?? {}).map(([singleId, vals]) => {
                  if (singleId === null) {
                    return (
                      <View>
                        <Text>SOMETHING</Text>
                      </View>
                    );
                  } else {
                    return (
                      <React.Fragment key={singleId}>
                        <MedicationItem
                          item={vals[1]}
                          onPress={() => showToUpdateSingleItem(singleId, vals)}
                        />
                      </React.Fragment>
                    );
                  }
                })
              )}
            </Section>
          </ScrollView>
        </Layout>

        {/* Bottom Sheet for single ARV */}
        <BottomSheetModal
          ref={singleBottomSheetRef}
          backdropComponent={CustomBackdrop}
          snapPoints={snapPoints}>
          <BottomSheetScrollView style={{marginHorizontal: 16}}>
            <MediForm
              initialValue={singleForm}
              submit={async (id, values) => {
                await $.setARVStockItem(id, values);
                singleBottomSheetRef.current?.close();
              }}
            />
          </BottomSheetScrollView>
        </BottomSheetModal>
      </>
    </BottomSheetModalProvider>
  );
}

function MedicationItem({
  id,
  item,
  onPress,
}: {
  id: string;
  item: {text: string; form: string | null; count: string};
  onPress: () => void;
}) {
  return (
    <TouchableItem style={{marginVertical: 5}} onPress={onPress}>
      <Row>
        <View
          style={{
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'center',
          }}>
          <Text font="bold" size={14}>
            {item.group} /{' '}
          </Text>
          <Text>{item.text}</Text>
          {/* {(item.form ?? '').length > 0 && (
            <View
              style={{
                marginLeft: 6,
                padding: 2,
                borderWidth: 1,
                paddingHorizontal: 8,
                borderRadius: 50,
              }}>
              <Text>{item.form}</Text>
            </View>
          )} */}
        </View>
        <Text>{item.count}</Text>
      </Row>
    </TouchableItem>
  );
}

function MediForm({
  initialValue,
  submit,
}: {
  initialValue: null | [F, V];
  submit: (id: string | null, data: V) => Promise<void>;
}) {
  const {handleSubmit, control, setValue} = useForm<SingleStockItem>({
    defaultValues: initialValue?.[1][1] ?? {
      type: 'single',
      ingredients: [],
      form: 'granules',
      estimatedFor: '30-days',
      group: 'adults',
    },
  });

  const [stockId, medicationId] = React.useMemo(
    () => [initialValue?.[0] ?? null, initialValue?.[1][0] ?? null],
    [initialValue],
  );

  const [{loading}, run] = useAsyncFn(submit, [submit]);
  const onSubmit = handleSubmit(values => run(stockId, [medicationId, values]));

  return (
    <>
      <View style={{marginBottom: 16}}>
        <Text size={'sm'} font="medium">
          Stock ID
        </Text>
        <View
          style={{
            padding: 8,
            marginTop: 4,
            borderRadius: 8,
            backgroundColor: '#EEE',
          }}>
          <Text>{stockId ?? '<TO-GENERATE>'}</Text>
        </View>
      </View>
      <CollapsibleSection
        title="Medication Details"
        desc="Description of medication"
        removeLine
        mode="raised">
        <View style={{marginBottom: 16}}>
          <Text size={'sm'} font="medium">
            Medication ID
          </Text>
          <View
            style={{
              padding: 8,
              marginTop: 4,
              borderRadius: 8,
              backgroundColor: '#EEE',
            }}>
            <Text>{medicationId ?? '<TO-GENERATE>'}</Text>
          </View>
        </View>
        <Controller
          name="type"
          control={control}
          render={({field}) => (
            <>
              {/* Classification */}
              <Section
                title="Classification"
                desc="How is the medication packaged?"
                removeLine>
                <RadioButton.Group
                  value={field.value}
                  onValueChange={field.onChange}>
                  <Row
                    spaceTop
                    contentStyle={{
                      flexWrap: 'wrap',
                      justifyContent: 'flex-start',
                    }}>
                    {[
                      {value: 'single', text: 'Single'},
                      {value: 'composed', text: 'Combined'},
                    ].map(({value, text}) => (
                      <React.Fragment key={value}>
                        <RadioButton.Item label={text} value={value} />
                      </React.Fragment>
                    ))}
                  </Row>
                </RadioButton.Group>
              </Section>

              {/* Regimens */}
              {field.value === 'single' ? (
                <Section
                  title="Select Regimen"
                  desc="Choose an ARV that applies for the medication"
                  removeLine>
                  <Controller
                    name="identifier"
                    control={control}
                    render={({field}) => (
                      <Picker
                        label="Regimen Item"
                        items={ARV.units.keys()}
                        renderText={ARV.units.fromKey}
                        selectedKey={field.value}
                        onChangeValue={item => {
                          field.onChange(item);
                          setValue('text', ARV.units.fromKey(item) ?? item);
                        }}
                      />
                    )}
                  />
                </Section>
              ) : (
                <>
                  {/* Assuming composition */}
                  <Section
                    title="Select Multiple Units"
                    desc="Choose the ARVs that make up the medication"
                    removeLine>
                    <Controller
                      name="ingredients"
                      control={control}
                      render={({field}) => (
                        <>
                          <MultiSelect
                            ref={field.ref}
                            confirmText={'Confirm'}
                            items={[
                              {
                                name: 'Unit Regimens',
                                id: 1,
                                children: ARV.units
                                  .pairs()
                                  .map(([id, name]) => ({id, name})),
                              },
                            ]}
                            uniqueKey="id"
                            searchPlaceholderText={'Search Investigations'}
                            selectText={'Select if any'}
                            onSelectedItemsChange={items => {
                              field.onChange(items);
                              // set name
                              setValue(
                                'text',
                                items
                                  .map(item => ARV.units.fromKey(item) ?? item)
                                  .join('+'),
                              );
                            }}
                            selectedItems={field.value}
                          />
                        </>
                      )}
                    />
                  </Section>
                </>
              )}
            </>
          )}
        />
        <Section
          title="Medication name"
          desc="A name used to identify the medication"
          removeLine>
          <Controller
            rules={{required: true}}
            name="text"
            control={control}
            render={({field, fieldState}) => (
              <>
                <TextInput
                  mode="outlined"
                  label="Text"
                  ref={field.ref}
                  value={field.value}
                  onChangeText={text => {}}
                />
                {fieldState.error !== undefined && (
                  <HelperText type="error">
                    Name for medication required
                  </HelperText>
                )}
              </>
            )}
          />
        </Section>

        <Controller
          name="form"
          control={control}
          render={({field}) => (
            <>
              <Section
                title="Form of Medication"
                desc="Nature of the medication added to stock">
                <RadioButton.Group
                  value={field.value}
                  onValueChange={field.onChange}>
                  <Row
                    spaceTop
                    contentStyle={{
                      flexWrap: 'wrap',
                      justifyContent: 'flex-start',
                    }}>
                    {['granules', 'syrup', 'tablets']
                      .map(d => ({value: d, text: _.capitalize(d)}))
                      .map(({value, text}) => (
                        <RadioButton.Item
                          label={text}
                          key={value}
                          value={value}
                        />
                      ))}
                  </Row>
                </RadioButton.Group>
              </Section>

              <Section
                title="Dosage"
                desc="Concentration in a pill?"
                removeLine>
                <Controller
                  name="dosage"
                  rules={{pattern: /\d+/g}}
                  control={control}
                  render={({field: cf, fieldState: fs}) => (
                    <>
                      <Row>
                        <View style={{flex: 0.7}}>
                          <TextInput
                            mode="outlined"
                            placeholder="0"
                            ref={cf.ref}
                            value={cf.value?.value}
                            onChangeText={value =>
                              cf.onChange({
                                value,
                                units: field.value === 'syrup' ? 'ml' : 'mg',
                              })
                            }
                            right={
                              <TextInput.Affix
                                text={field.value === 'syrup' ? 'ml' : 'mg'}
                              />
                            }
                          />

                          {fs.error !== undefined && (
                            <HelperText type="error">
                              Required number, If nothing on stock, set '0'
                            </HelperText>
                          )}
                        </View>
                      </Row>
                    </>
                  )}
                />
              </Section>

              <Section
                title="Quantity"
                desc="Amount in one container (e.g. bottle)"
                removeLine>
                <Controller
                  name="concentrationValue"
                  rules={{pattern: /\d+/g}}
                  control={control}
                  render={({field: cf, fieldState: fs}) => (
                    <>
                      <Row>
                        <View style={{flex: 0.7}}>
                          <TextInput
                            mode="outlined"
                            placeholder="0"
                            ref={cf.ref}
                            value={cf.value}
                            onChangeText={cf.onChange}
                            right={
                              <TextInput.Affix
                                text={
                                  field.value === 'syrup'
                                    ? 'ml'
                                    : field.value === 'granules'
                                    ? 'mg'
                                    : 'tablets'
                                }
                              />
                            }
                          />

                          {fs.error !== undefined && (
                            <HelperText type="error">
                              Required number, If nothing on stock, set '0'
                            </HelperText>
                          )}
                        </View>
                      </Row>
                    </>
                  )}
                />
              </Section>
            </>
          )}
        />
      </CollapsibleSection>

      <Controller
        name="group"
        control={control}
        render={({field, fieldState}) => (
          <Section
            title="Age Group"
            desc="As applied for the medication above"
            removeLine>
            <RadioButton.Group
              value={field.value}
              onValueChange={field.onChange}>
              <Row
                spaceTop
                contentStyle={{
                  flexWrap: 'wrap',
                  justifyContent: 'flex-start',
                }}>
                {['adults', 'pediatrics']
                  .map(d => ({
                    value: d,
                    text: _.capitalize(d.replace('-', ' ')),
                  }))
                  .map(({value, text}) => (
                    <RadioButton.Item label={text} key={value} value={value} />
                  ))}
              </Row>
            </RadioButton.Group>
          </Section>
        )}
      />

      <Controller
        name="estimatedFor"
        control={control}
        render={({field, fieldState}) => (
          <Section
            title="Expected duration"
            desc="How long is the medication use expected?"
            removeLine>
            <RadioButton.Group
              value={field.value}
              onValueChange={field.onChange}>
              <Row
                spaceTop
                contentStyle={{
                  flexWrap: 'wrap',
                  justifyContent: 'flex-start',
                }}>
                {['30-days', '60-days', '90-days']
                  .map(d => ({
                    value: d,
                    text: _.capitalize(d.replace('-', ' ')),
                  }))
                  .map(({value, text}) => (
                    <RadioButton.Item label={text} key={value} value={value} />
                  ))}
              </Row>
            </RadioButton.Group>
          </Section>
        )}
      />

      <Section
        title="Count"
        desc="How many containers (e.g. bottles) of medication are there?"
        removeLine>
        <Controller
          name="count"
          control={control}
          rules={{required: true, pattern: /\d+/g}}
          render={({field, fieldState}) => (
            <Column>
              <View style={{flex: 0.5}}>
                <TextInput
                  mode="outlined"
                  error={fieldState.error !== undefined}
                  keyboardType="number-pad"
                  label={'Count'}
                  value={field.value}
                  onChangeText={field.onChange}
                />
              </View>
              {fieldState.error !== undefined && (
                <HelperText type="error">
                  Required number, If nothing on stock, set '0'
                </HelperText>
              )}
            </Column>
          )}
        />
      </Section>
      <Section
        title="Expiration Date"
        desc="When will this item expire?"
        removeLine>
        <ControlDateInput name="expiresAt" control={control} required />
      </Section>

      <Section>
        <Button
          mode="contained"
          loading={loading}
          icon="update"
          onPress={onSubmit}>
          {(initialValue ?? null) === null ? 'Add to Stock' : 'Update Stock'}
        </Button>
      </Section>
    </>
  );
}

export const CustomBackdrop = ({
  animatedIndex,
  style,
}: BottomSheetBackdropProps) => {
  // animated variables
  const containerAnimatedStyle = useAnimatedStyle(() => ({
    opacity: interpolate(
      animatedIndex.value,
      [-1, 2],
      [0, 0.8],
      Extrapolate.CLAMP,
    ),
  }));

  // styles
  const containerStyle = React.useMemo(
    () => [
      style,
      {
        backgroundColor: '#000',
        //   backgroundColor: theme.color.secondary.dark,
      },
      containerAnimatedStyle,
    ],
    [style, containerAnimatedStyle],
  );

  return <Animated.View style={containerStyle} />;
};
