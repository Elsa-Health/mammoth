import React from 'react';

import {Layout, Text} from '@elsa-ui/react-native/components';
import {useTheme} from '@elsa-ui/react-native/theme';
import {ScrollView, View} from 'react-native';
import {
  Block,
  Column,
  MultiSelect,
  Row,
  Section,
  TitledItem,
  TouchableItem,
} from '../../temp-components';
import {WorkflowScreenProps} from '@elsa-ui/react-native-workflows';
import {
  Divider,
  Button,
  IconButton,
  TextInput,
  HelperText,
  RadioButton,
} from 'react-native-paper';
import {Investigation} from 'elsa-health-data-fns/lib';
import {InvestigationTypeRecord} from 'elsa-health-data-fns/lib/investigations';
import {useAsyncFn, useAsyncRetry} from 'react-use';

import {
  BottomSheetBackdropProps,
  BottomSheetModal,
  BottomSheetModalProvider,
  BottomSheetScrollView,
} from '@gorhom/bottom-sheet';

import {CustomBackdrop} from '../MedicationStock';
import {Controller, useForm} from 'react-hook-form';
import _, {difference} from 'lodash';
import {differenceInHours, format, formatDistanceToNow} from 'date-fns';

type InvestigationProps = {
  id: string;
  shape: InvestigationTypeRecord<string>;
  identifier: string;
  result: any;
  createdAt: Date;
};

export default function ViewInvestigationScreen<Request>({
  entry: e,
  actions: $,
}: WorkflowScreenProps<
  {
    request: {
      id: string;
      investigationIdentifier: Investigation;
      investigationName: string;
      obj: Request;
    };
  },
  {
    fetchInvestigationResults: (
      investigationId: string,
      authorizingRequest: Request,
    ) => Promise<InvestigationProps[]>;
    saveResult: (
      results: {shape: InvestigationProps['shape']; value: any; id?: string},
      authorizingRequest: Request,
    ) => Promise<void>;
  }
>) {
  const {spacing} = useTheme();
  const {retry, ...asyncRest} = useAsyncRetry(
    () => $.fetchInvestigationResults(e.request.id, e.request.obj),
    [$.fetchInvestigationResults, e.request.id],
  );

  // setup bottom sheet to control the contents
  // ref
  const singleBottomSheetRef = React.useRef<BottomSheetModal>(null);

  const [formValue, set] = React.useState<
    | null
    | (Partial<InvestigationProps> &
        Required<Pick<InvestigationProps, 'shape'>>)
  >(() => null);

  const add = React.useCallback(() => {
    singleBottomSheetRef.current?.present();
    set({shape: Investigation.fromKey(e.request.investigationIdentifier)});
  }, [singleBottomSheetRef]);

  const update = React.useCallback(
    (d: any) => {
      singleBottomSheetRef.current?.present();
      set(d);
    },
    [singleBottomSheetRef],
  );

  return (
    <BottomSheetModalProvider>
      <Layout
        title={`Investigation #${e.request.id.slice(0, 8)}`}
        style={{padding: 0}}>
        <ScrollView
          contentContainerStyle={{padding: spacing.md}}
          style={{flex: 1}}>
          <Section
            removeLine
            mode="raised"
            title="Request"
            desc="Add the results of the information">
            <TitledItem title="ID">{e.request.id}</TitledItem>
            <TitledItem title="Investigation" spaceTop>
              {e.request.investigationName}
            </TitledItem>
          </Section>
          <Section removeLine spaceTop>
            <Button icon="file" mode="contained" onPress={add}>
              Add results
            </Button>
          </Section>
          <Section
            removeLine
            icon="file-document-edit-outline"
            title="Results"
            noPad
            right={
              <IconButton color="#4665af" icon="refresh" onPress={retry} />
            }
            desc="Results recorded against this investigation">
            {/* Investigation results */}
            <ErrLoading {...asyncRest}>
              {value =>
                value?.length === 0 ? (
                  <Text>Nothing here</Text>
                ) : (
                  value?.map(d => (
                    <React.Fragment key={d.id}>
                      <InvestigationResultItem
                        props={{...d}}
                        onPress={() => update(d)}
                      />
                    </React.Fragment>
                  ))
                )
              }
            </ErrLoading>
          </Section>
        </ScrollView>
      </Layout>
      {/* Bottom Sheet for single ARV */}
      <BottomSheetModal
        ref={singleBottomSheetRef}
        backdropComponent={CustomBackdrop}
        snapPoints={['80%']}>
        <BottomSheetScrollView style={{marginHorizontal: 16}}>
          {formValue === null ? (
            <Text>
              Unsupported Investigation. Please select a valud investigation
            </Text>
          ) : (
            <>
              <View style={{paddingVertical: spacing.sm}}>
                {formValue.id && (
                  <TitledItem title="Investigation Result ID">
                    {formValue.id}
                  </TitledItem>
                )}
                {formValue.createdAt && (
                  <Column spaceTop>
                    <TitledItem title="Created at">
                      {readableDate(new Date())}
                    </TitledItem>
                  </Column>
                )}
                <Column wrapperStyle={{paddingVertical: 12}} spaceTop>
                  <InvestigationFormOnly
                    {...formValue}
                    saveResult={async result => {
                      await $.saveResult(
                        {...formValue, value: result},
                        e.request.obj,
                      );
                      singleBottomSheetRef.current?.close();
                    }}
                  />
                </Column>
              </View>
            </>
          )}
        </BottomSheetScrollView>
      </BottomSheetModal>
    </BottomSheetModalProvider>
  );
}

import * as R from 'ramda';
import {date} from '@elsa-health/emr/lib/utils';

const readableDate = R.pipe(
  date,
  R.ifElse(
    d => differenceInHours(d, new Date()) < 48,
    d => formatDistanceToNow(d),
    d => format(d, 'MMMM dd, yyyy'),
  ),
);

function InvestigationResultItem({
  props,
  onPress,
}: {
  props: InvestigationProps;
  onPress: () => void;
}) {
  return (
    <TouchableItem onPress={onPress} spaceBottom>
      <Row>
        <TitledItem title="Result" spaceTop>
          {(props.result ?? null) !== null
            ? JSON.stringify(props.result ?? '-')
            : 'N/A'}
        </TitledItem>
        <TitledItem title="Recorded">
          {readableDate(props.createdAt)}
        </TitledItem>
      </Row>
    </TouchableItem>
  );
}

function InvestigationFormOnly({
  shape,
  identifier,
  saveResult: saveResult,
}: InvestigationProps & {saveResult: (result: any) => Promise<void>}) {
  const {handleSubmit, control} = useForm<{
    result: string | null | {[field: string]: string | null};
  }>({
    defaultValues: {
      result: null,
    },
  });

  const [loading, setLoading] = React.useState(false);
  const onSubmit = handleSubmit(val => {
    setLoading(true);
    // check if null
    if (val === null) {
      return {
        error: {
          message: 'Error!',
        },
      };
    }

    saveResult(val.result).finally(() => setLoading(false));
  });

  return (
    <Section
      noPad
      title={
        Investigation.item.fromKey(identifier) ?? identifier ?? 'New Record'
      }
      desc="Enter the results for the test">
      {shape.type === 'panel' ? (
        <View>
          {Object.entries(shape.items).map(([id, record]) => (
            <React.Fragment key={id}>
              <Controller
                name={`result.${id}`}
                control={control}
                render={({field, fieldState}) => (
                  <View style={{paddingVertical: 8}}>
                    <SingleInvestigationField
                      shape={record}
                      onChange={field.onChange}
                      fieldState={fieldState}
                      value={field.value}
                      label={Investigation.item.fromKey(id) ?? id}
                    />
                  </View>
                )}
              />
            </React.Fragment>
          ))}
        </View>
      ) : (
        <Controller
          name="result"
          control={control}
          render={({field, fieldState}) => (
            <>
              <SingleInvestigationField
                shape={shape}
                onChange={field.onChange}
                fieldState={fieldState}
                value={field.value}
                label={
                  ['options', 'select'].includes(shape.type)
                    ? 'Options'
                    : 'Result'
                }
              />
              <HelperText type="error"></HelperText>
            </>
          )}
        />
      )}
      <Button loading={loading} mode="contained" icon="plus" onPress={onSubmit}>
        Save results
      </Button>
    </Section>
  );
}

type SingleInvestigationFieldValue = string | string[];
function SingleInvestigationField({
  shape,
  value,
  label,
  onChange,
  fieldState = {},
}: {
  shape: InvestigationTypeRecord<string>;
  value: null | SingleInvestigationFieldValue;
  onChange: (value: SingleInvestigationFieldValue) => void;
  fieldState: any; //error?: {message: string};
}) {
  if (shape.type === 'text' || shape.type === 'numeric-units') {
    return (
      <>
        <TextInput
          mode="outlined"
          value={value}
          label={label}
          onChangeText={onChange}
          right={
            shape.type === 'numeric-units' &&
            shape.units !== null && <TextInput.Affix text={shape.units} />
          }
        />
        {fieldState.error && (
          <HelperText type={fieldState.error?.message}>
            {fieldState.error.message}
          </HelperText>
        )}
      </>
    );
  }

  if (shape.type === 'options') {
    return (
      <>
        {label && (
          <Text font="bold" size={18}>
            {label}
          </Text>
        )}
        <RadioButton.Group onValueChange={onChange} value={value}>
          {shape.options.map(s => {
            return (
              <RadioButton.Item key={s} label={_.upperFirst(s)} value={s} />
            );
          })}
        </RadioButton.Group>

        {fieldState.error && (
          <HelperText type={fieldState.error?.message}>
            {fieldState.error.message}
          </HelperText>
        )}
      </>
    );
  }

  if (shape.type === 'select') {
    return (
      <>
        <TitledItem title={label}>
          <MultiSelect
            confirmText={'Confirm'}
            items={[
              {
                name: 'Select',
                id: 1,
                children: shape.items.map(id => ({id, name: id})),
              },
            ]}
            uniqueKey="id"
            searchPlaceholderText={'Search Investigations'}
            selectText={'Select if any'}
            onSelectedItemsChange={onChange}
            selectedItems={value}
          />
        </TitledItem>
        {fieldState.error && (
          <HelperText type={fieldState.error?.message}>
            {fieldState.error.message}
          </HelperText>
        )}
      </>
    );
  }

  throw new Error('Unsupported Input' + JSON.stringify(shape));
}

type ErrLoading<T> = {
  error: Error | undefined;
  loading: boolean;
  value: T;
  children: (value: Required<T>) => JSX.Element;
};
function ErrLoading<T>({error, loading, value, children}: ErrLoading<T>) {
  if (error !== undefined) {
    return (
      <View>
        <Text>There's an error there!</Text>
      </View>
    );
  }

  if (loading) {
    return (
      <View>
        <Text>Loading</Text>
      </View>
    );
  }

  return children(value);
}
