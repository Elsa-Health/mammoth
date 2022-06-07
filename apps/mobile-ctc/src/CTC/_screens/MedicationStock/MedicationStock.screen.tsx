import {WorkflowScreenProps} from '@elsa-ui/react-native-workflows';
import {Layout, Text} from '@elsa-ui/react-native/components';
import {useTheme} from '@elsa-ui/react-native/theme';
import {ARV} from 'elsa-health-data-fns/lib';
import React from 'react';
import {ScrollView, StyleSheet, ToastAndroid, View} from 'react-native';
import {Button, IconButton, TextInput} from 'react-native-paper';
import {
  Column,
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
} from '@gorhom/bottom-sheet';
import Animated, {
  Extrapolate,
  interpolate,
  useAnimatedStyle,
} from 'react-native-reanimated';
import produce from 'immer';
import {useAsyncFn} from 'react-use';

type StockItem = {
  category: string;
  medication: {regimen: ARV.Regimen; className: ARV.Class; text: string};
  count: number;
  lastUpdate: Date;
};

export function getRegimenClass(regimen: ARV.Regimen): ARV.Class | undefined {
  return ARV.pairs().find(d => d[1].includes(regimen))?.[0] ?? undefined;
}

export default function MedicationStockScreen({
  entry: e,
  actions: $,
}: WorkflowScreenProps<
  {
    stock: {
      [id: string]: StockItem;
    };
  },
  {
    setMedicationCount: (data: {
      id?: string;
      regimen: ARV.Regimen;
      className?: ARV.Class;
      count: number;
    }) => Promise<void>;
  }
>) {
  const {spacing} = useTheme();
  // const groups = React.useMemo(
  //   () =>
  //     groupByFn(
  //       Object.entries(e.stock),
  //       ([id, item]) => item?.category ?? '',
  //     ).map(([class_, out]) => [class_, out.length]),
  //   [],
  // );
  const groups = React.useMemo(() => {
    return ARV.class.pairs().map(([id, text]) => {
      return [
        text,
        sum(
          Object.values(e?.stock || [])
            .filter(d => d.category === id)
            .map(d => d.count),
        ),
      ];
    });
  }, []);

  // form value
  const [form, setForm] = React.useState(() => ({
    id: undefined,
    arvRegimen: undefined,
    regimenClass: undefined,
    count: '',
  }));

  // ref
  const bottomSheetRef = React.useRef<BottomSheetModal>(null);

  React.useEffect(() => {
    bottomSheetRef.current?.forceClose();
  }, []);

  // variables
  const snapPoints = React.useMemo(() => ['70%'], []);

  const showToAddItem = () => {
    setForm({
      id: undefined,
      arvRegimen: undefined,
      regimenClass: undefined,
      count: '',
    });
    bottomSheetRef.current?.present();
  };

  const showToUpdateItem = (id: string, item: StockItem) => {
    setForm({
      id,
      arvRegimen: item.medication.regimen,
      regimenClass: item.medication.className,
      count: item.count.toString(),
    });
    bottomSheetRef.current?.present();
  };

  const [{loading}, setItemStockValue] = useAsyncFn(async (f: typeof form) => {
    await $.setMedicationCount(f);
  }, []);

  const onUpdateItem = () => {
    //
    if (form.arvRegimen === undefined) {
      ToastAndroid.show(
        'Please select a regimen before proceeding',
        ToastAndroid.LONG,
      );
      return;
    }

    if (form.count.toString().length === 0) {
      ToastAndroid.show(
        'Please indicate the stock amount for ' + form.arvRegimen,
        ToastAndroid.LONG,
      );
      return;
    }

    setItemStockValue(form).then(() => {
      bottomSheetRef.current?.close();
    });
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
            {/* List of items in stock */}
            <Section
              title="ARV"
              desc="Stock for the medications"
              right={
                <Button icon="plus" onPress={showToAddItem}>
                  Add
                </Button>
              }>
              {Object.entries(e?.stock || {}).map(([medStockId, item]) => {
                return (
                  <TouchableItem
                    key={medStockId}
                    style={{marginVertical: 5}}
                    onPress={() => showToUpdateItem(medStockId, item)}>
                    <Row>
                      <Text>{item.medication.text}</Text>
                      <Text>{item.count}</Text>
                    </Row>
                  </TouchableItem>
                );
              })}
            </Section>
          </ScrollView>
        </Layout>

        <BottomSheetModal
          ref={bottomSheetRef}
          backdropComponent={CustomBackdrop}
          snapPoints={snapPoints}>
          <View style={styles.contentContainer}>
            <Column>
              <Text>Choose Medication</Text>
              <Picker
                label="Regimen Decision"
                items={ARV.regimen.keys()}
                renderText={ARV.regimen.fromKey}
                selectedKey={form.arvRegimen}
                onChangeValue={item =>
                  setForm(s =>
                    produce(s, df => {
                      df.arvRegimen = item;
                    }),
                  )
                }
              />
            </Column>
            <Column spaceTop>
              <Text>
                This regimen belong to class: {getRegimenClass(form.arvRegimen)}
              </Text>
            </Column>
            <Column spaceTop>
              <Text>Enter the amount in stock</Text>
              <TextInput
                mode="outlined"
                label={'Amount'}
                value={form.count}
                onChangeText={t =>
                  setForm(s =>
                    produce(s, df => {
                      df.count = t;
                    }),
                  )
                }
              />
            </Column>
            <Column spaceTop>
              <Button
                mode="contained"
                loading={loading}
                icon="update"
                onPress={onUpdateItem}>
                Update Stock
              </Button>
            </Column>
          </View>
        </BottomSheetModal>
      </>
    </BottomSheetModalProvider>
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
