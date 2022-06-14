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
  Column,
  ControlDateInput,
  MultiSelect,
  Picker,
  Row,
  Section,
  TouchableItem,
} from '../../temp-components';
import {groupByFn, sum} from './helpers';

import BottomSheet, {
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
import produce from 'immer';
import {useAsyncFn} from 'react-use';
import {ARVSingle, ARVSingles} from './stock';
import _, {values} from 'lodash';
import {Controller, useForm} from 'react-hook-form';
import {format} from 'date-fns';

type StockItem = {
  category: string;
  medication: {
    regimen: ARV.Regimen;
    className: ARV.Class;
    text: string;
    ingredients: [];
  };
  count: number;
  lastUpdate: UTCDateTimeString;

  expiresAt: UTCDateTimeString;
};

type MedicationForm = 'granules' | 'syrup' | 'tablets';
type StockSingleARVItem = {
  item: string;
  text: string | null;
  form: MedicationForm;
  count: number;
  lastUpdate: UTCDateTimeString;
  expiresAt: UTCDateTimeString;
};

type SingleFormData = {
  id: string;
  single: string;
  form: MedicationForm;
  expiresAt: DDMMYYYYDateString;
  count: string;
};

type ComboFormData = {
  id: string;
  arvRegimen: string;
  regimenClass: string | undefined;
  ingredients: [];
  expiresAt: DDMMYYYYDateString;
  count: string;
};
export function getRegimenClass(regimen: ARV.Regimen): ARV.Class | undefined {
  return ARV.pairs().find(d => d[1].includes(regimen))?.[0] ?? undefined;
}

export default function MedicationStockScreen({
  entry: e,
  actions: $,
}: WorkflowScreenProps<
  {
    'single-arv': {
      [id: string]: StockSingleARVItem;
    };
    'combo-arv': {
      [id: string]: StockItem;
    };
  },
  {
    setARVSingleMedicationCount: (data: SingleFormData) => Promise<void>;
    setARVComboMedicationCount: (data: ComboFormData) => Promise<void>;
  }
>) {
  const {spacing} = useTheme();

  const groups = React.useMemo(() => {
    return ARV.class.pairs().map(([id, text]) => {
      return [
        text,
        sum(
          Object.values(e?.['combo-arv'] || [])
            .filter(d => d.category === id)
            .map(d => d.count),
        ),
      ];
    });
  }, [e?.['combo-arv']]);

  // form value
  const [comboForm, setComboForm] = React.useState<ComboFormData | null>(null);
  const [singleForm, setSingleForm] = React.useState<SingleFormData | null>(
    null,
  );

  // ref
  const comboBottomSheetRef = React.useRef<BottomSheetModal>(null);
  const singleBottomSheetRef = React.useRef<BottomSheetModal>(null);

  React.useEffect(() => {
    comboBottomSheetRef.current?.forceClose();
    singleBottomSheetRef.current?.forceClose();
  }, []);

  // variables
  const snapPoints = React.useMemo(() => ['90%'], []);

  const showToAddSingleItem = () => {
    setSingleForm(null);
    singleBottomSheetRef.current?.present();
  };

  const showToUpdateSingleItem = (id: string, item: StockSingleARVItem) => {
    setSingleForm({
      id,
      text: item.text ?? ARVSingles.fromKey(item.item) ?? item.item,
      single: item.item,
      form: item.form ?? '',
      expiresAt: format(new Date(item.expiresAt), 'dd / MM / yyyy') ?? '',
      count: item.count.toString() ?? '',
    });
    singleBottomSheetRef.current?.present();
  };

  const showToAddItem = () => {
    setComboForm(null);
    comboBottomSheetRef.current?.present();
  };

  const showToUpdateItem = (id: string, item: StockItem) => {
    console.log('combo:', item);
    setComboForm({
      id,
      arvRegimen: item.medication.regimen,
      regimenClass: item.medication.className,
      ingredients: item.medication.ingredients ?? [],
      count: item.count.toString(),
      expiresAt: format(new Date(item.expiresAt), 'dd / MM / yyyy') ?? '',
    });
    comboBottomSheetRef.current?.present();
  };

  return (
    <BottomSheetModalProvider>
      <>
        <Layout title="Manage Stock" style={{padding: 0}}>
          <ScrollView contentContainerStyle={{paddingHorizontal: spacing.md}}>
            {/* Add medicaiton stock */}
            <Section
              title="Summary"
              desc="Work on the items to manage in stock">
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
            </Section>
            <Section
              title="Single ARV"
              desc="Stock for single ARV item"
              right={
                <Button icon="plus" onPress={showToAddSingleItem}>
                  Add
                </Button>
              }>
              {Object.entries(e?.['single-arv'] || []).length === 0 && (
                <View>
                  <Text style={{textAlign: 'center'}} italic>
                    No stock information added for single arv medication
                  </Text>
                </View>
              )}
              {/* single  */}
              {Object.entries(e?.['single-arv'] || []).map(
                ([singleId, item]) => (
                  <React.Fragment key={singleId}>
                    <TouchableItem
                      key={singleId}
                      style={{marginVertical: 5}}
                      onPress={() => showToUpdateSingleItem(singleId, item)}>
                      <Row>
                        <View style={{display: 'flex'}}>
                          <Text>{item.text}</Text>
                          {(item.form ?? '').length > 0 && (
                            <View style={{marginLeft: 6}}>
                              <Text>{item.form}</Text>
                            </View>
                          )}
                        </View>
                        <Text>{item.count}</Text>
                      </Row>
                    </TouchableItem>
                  </React.Fragment>
                ),
              )}
            </Section>
            {/* List of items in stock */}
            <Section
              title="Combo ARVs"
              desc="Stock for cocktail ARVs"
              right={
                <Button icon="plus" onPress={showToAddItem}>
                  Add
                </Button>
              }>
              {Object.entries(e?.['combo-arv'] || []).length === 0 && (
                <View>
                  <Text style={{textAlign: 'center'}} italic>
                    No stock information added for combo / cocktail arv
                    medication
                  </Text>
                </View>
              )}
              {Object.entries(e?.['combo-arv'] || {}).map(
                ([medStockId, item]) => {
                  return (
                    <React.Fragment key={medStockId}>
                      <TouchableItem
                        key={medStockId}
                        style={{marginVertical: 5}}
                        onPress={() => showToUpdateItem(medStockId, item)}>
                        <Row>
                          <Text>{item.medication.text}</Text>
                          <Text>{item.count}</Text>
                        </Row>
                      </TouchableItem>
                    </React.Fragment>
                  );
                },
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
            <SingleItemForm
              initialValue={singleForm}
              submit={async values => {
                await $.setARVSingleMedicationCount(values);
                singleBottomSheetRef.current?.close();
              }}
            />
          </BottomSheetScrollView>
        </BottomSheetModal>

        {/* Bottom sheet for combo ARV */}
        <BottomSheetModal
          ref={comboBottomSheetRef}
          backdropComponent={CustomBackdrop}
          snapPoints={snapPoints}>
          <BottomSheetScrollView style={{marginHorizontal: 16}}>
            <ComboItemForm
              initialValue={comboForm}
              submit={async values => {
                await $.setARVComboMedicationCount(values);
                comboBottomSheetRef.current?.close();
              }}
            />
          </BottomSheetScrollView>
        </BottomSheetModal>
      </>
    </BottomSheetModalProvider>
  );
}

function ComboItemForm({
  initialValue,
  submit,
}: {
  initialValue: ComboFormData;
  submit: (data: ComboFormData) => Promise<void>;
}) {
  const {handleSubmit, setValue, control} = useForm<ComboFormData>({
    defaultValues: initialValue ?? {},
  });
  const [{loading}, run] = useAsyncFn(submit, []);
  const onSubmit = handleSubmit(values => run(values));

  return (
    <>
      <Section
        title="Choose Medication"
        desc="Select regimen medication to add to stock">
        <Controller
          name="arvRegimen"
          control={control}
          render={({field, formState}) => {
            const class_ = getRegimenClass(field.value);
            return (
              <>
                <Picker
                  label="Regimen Decision"
                  items={ARV.regimen.keys()}
                  renderText={ARV.regimen.fromKey}
                  selectedKey={field.value}
                  onChangeValue={item => {
                    field.onChange(item);
                    setValue('regimenClass', class_ ?? null);
                  }}
                />
                <HelperText type="info">
                  This regimen belong to class: {class_}
                </HelperText>
              </>
            );
          }}
        />
      </Section>
      <Section
        title="ARV Ingredients"
        desc="Describe the ingredients for the ARV medication">
        <Controller
          name="ingredients"
          control={control}
          render={({field}) => (
            <MultiSelect
              confirmText={'Confirm'}
              items={[
                {
                  name: 'ARV Singles',
                  id: 1,
                  children: ARVSingles.pairs().map(([id, name]) => ({
                    id,
                    name,
                  })),
                },
              ]}
              uniqueKey="id"
              searchPlaceholderText={'Search Item'}
              selectText={'Select if any'}
              onSelectedItemsChange={field.onChange}
              selectedItems={field.value ?? []}
            />
          )}
        />
      </Section>
      <Section
        title="Count"
        desc="If you count then, how many are there?"
        removeLine>
        <Controller
          name="count"
          control={control}
          rules={{required: true, pattern: /\d+/g}}
          render={({field, fieldState}) => (
            <Row>
              <View style={{flex: 0.5}}>
                <TextInput
                  mode="outlined"
                  error={fieldState.error}
                  keyboardType="number-pad"
                  label={'Amount'}
                  value={field.value}
                  defaultValue="0"
                  onChangeText={field.onChange}
                />
                {fieldState.error !== undefined && (
                  <HelperText type="error">
                    Required number, If nothing on stock, set '0'
                  </HelperText>
                )}
              </View>
            </Row>
          )}
        />
      </Section>
      <Section
        title="Expiration Date"
        desc="When will the item expire?"
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

function SingleItemForm({
  initialValue,
  submit,
}: {
  initialValue: SingleFormData;
  submit: (data: SingleFormData) => Promise<void>;
}) {
  const {handleSubmit, control} = useForm<SingleFormData>({
    defaultValues: initialValue ?? {},
  });
  const [{loading}, run] = useAsyncFn(submit, []);
  const onSubmit = handleSubmit(values => run(values));

  return (
    <>
      <Section title="Select Regimen" removeLine>
        <Controller
          name="single"
          control={control}
          render={({field}) => (
            <Picker
              label="Regimen Item"
              items={ARVSingles.keys()}
              renderText={ARVSingles.fromKey}
              selectedKey={field.value}
              onChangeValue={field.onChange}
            />
          )}
        />
      </Section>
      <Section
        title="Form of Medication"
        desc="Nature of the medication added to stockBot">
        <Controller
          name="form"
          control={control}
          render={({field}) => (
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
                    <RadioButton.Item label={text} key={value} value={value} />
                  ))}
              </Row>
            </RadioButton.Group>
          )}
        />
      </Section>
      <Section
        title="Count"
        desc="If you count then, how many are there?"
        removeLine>
        <Controller
          name="count"
          control={control}
          rules={{required: true, pattern: /\d+/g}}
          render={({field, fieldState}) => (
            <Row>
              <View style={{flex: 0.5}}>
                <TextInput
                  mode="outlined"
                  error={fieldState.error}
                  keyboardType="number-pad"
                  label={'Amount'}
                  value={field.value}
                  defaultValue="0"
                  onChangeText={field.onChange}
                />
                {fieldState.error !== undefined && (
                  <HelperText type="error">
                    Required number, If nothing on stock, set '0'
                  </HelperText>
                )}
              </View>
            </Row>
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

const styles = StyleSheet.create({
  contentContainer: {
    padding: 24,
  },
});

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
