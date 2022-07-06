import {ARVMedication} from '@elsa-health/emr/lib/ctc/ctc.types';
import {WorkflowScreenProps} from '@elsa-ui/react-native-workflows';
import {Layout, Text} from '@elsa-ui/react-native/components';
import {useTheme} from '@elsa-ui/react-native/theme';
import {format} from 'date-fns';
import id from 'date-fns/esm/locale/id/index.js';
import {ARV, CTC, Investigation, Medication} from 'elsa-health-data-fns/lib';
import React from 'react';
import {useForm, Controller, ResolverResult} from 'react-hook-form';
import {ScrollView, useWindowDimensions, View} from 'react-native';
import Collapsible from 'react-native-collapsible';
import {
  Button,
  Checkbox,
  HelperText,
  RadioButton,
  TextInput,
  TouchableRipple,
} from 'react-native-paper';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {useAsyncRetry} from 'react-use';
import {UseAppointments, UseStockData} from '../../emr/react-hooks';
import {CTC as eCTC} from '../../emr/types';
import {
  Block,
  Column,
  ControlDateInput,
  Item,
  MultiSelect,
  Picker,
  Row,
  Section,
  TitledItem,
} from '../../temp-components';

const ion = (p: [string, string][]) => p.map(([k, v]) => ({id: k, name: v}));

export type MedicationRequestVisitData = {
  // regimenDecision: string;
  // decisionReason: CTC.Status;
  arvRegimens: ARVMedication[];
  regimenDuration: DurationOpt;
  medications: Medication.All[];
  appointmentDate: string;
  investigations: Investigation[];
  dateOfVisit: DDMMYYYYDateString;
  appointmentId: null | string;
  visitType: 'home' | 'community';
};

export type DurationOpt = '30-days' | '60-days' | '90-days';
const durationOptions: Array<{value: DurationOpt; text: string}> = [
  {value: '30-days', text: '30 days'},
  {value: '60-days', text: '60 days'},
  {value: '90-days', text: '90 days'},
];

export default function MedicationVisitScreen<Patient, Visit, Org>({
  entry: e,
  actions: $,
}: WorkflowScreenProps<
  {
    patient: Patient;
    organization: Org;
    initialState: MedicationRequestVisitData;
    visit?: Visit;
  },
  {
    complete: (
      data: MedicationRequestVisitData,
      patient: Patient,
      organization: Org,
      visit: Visit | null,
    ) => void;
    fetchMedications: () => Promise<UseStockData['medications']>;
    fetchAppointments: () => Promise<UseAppointments['appointments']>;
    onDiscard: () => void;
  }
>) {
  const {spacing} = useTheme();
  const {handleSubmit, control} = useForm<MedicationRequestVisitData>({
    defaultValues: e.initialState ?? {
      // regimenDecision: undefined,
      // @ts-ignore
      // decisionReason: '',
      arvRegimens: [],
      regimenDuration: '30-days',
      medications: [],
      appointmentDate: '',
      investigations: [],
      visitType: 'home',
      appointmentId: null,
      dateOfVisit: format(new Date(), 'dd / MM / yyyy'),
    },
  });

  const onSubmit = handleSubmit(data =>
    $.complete(data, e.patient, e.organization, e.visit ?? null),
  );

  const notEdit = Boolean((e.visit ?? null) === null);

  const [isFromAppt, setIsFromAppt] = React.useState(false);
  const {value: appointments} = useAsyncRetry($.fetchAppointments, []);
  const {value: medications} = useAsyncRetry(async () => {
    const s = await $.fetchMedications();
    const out = Object.fromEntries(
      s.map(d => [d.id ?? d.identifier, d] as [string, typeof d]),
    );
    return out;
  }, []);

  return (
    <Layout
      title={notEdit ? 'Patient Visit' : 'Edit Patient Visit'}
      style={{padding: 0}}>
      <ScrollView contentContainerStyle={{padding: spacing.md}}>
        {!notEdit && (
          <View
            style={{
              marginBottom: spacing.md,
              padding: spacing.sm,
              display: 'flex',
              flexDirection: 'row',
              alignItems: 'center',
              borderColor: '#4665af',
              borderLeftWidth: 3,
              backgroundColor: '#4665af33',
            }}>
            <Icon name="information-outline" size={28} />
            <Text style={{paddingHorizontal: 16, lineHeight: 20}}>
              Warning; Editing a visit might have unintented consequences.
            </Text>
          </View>
        )}
        <Section mode="raised">
          <Row icon="account" spaceTop>
            <Text font="bold" style={{marginLeft: 8}}>
              Patient ID
            </Text>
            <Text>{e.patient.id}</Text>
          </Row>
          <Row icon="home" spaceTop>
            <Text font="bold" style={{marginLeft: 8}}>
              Facility
            </Text>
            <Text>{e.organization.name}</Text>
          </Row>
        </Section>

        <Section
          spaceTop
          mode="raised"
          title="Date of Visit"
          desc="You can change the date of the visit"
          icon="calendar">
          <ControlDateInput
            mode="flat"
            name="dateOfVisit"
            control={control}
            required
          />
        </Section>

        <Section
          title="Type of patient visit?"
          desc="Is this a home visit or a community visit?"
          spaceTop
          removeLine>
          <Controller
            name="visitType"
            control={control}
            render={({field}) => (
              <>
                <RadioButton.Group
                  value={field.value}
                  onValueChange={field.onChange}>
                  <View style={{flexDirection: 'row'}}>
                    <RadioButton.Item label="Home" value="home" />
                    <RadioButton.Item label="Community" value="community" />
                  </View>
                </RadioButton.Group>
              </>
            )}
          />
        </Section>

        {/* Appointment */}
        {appointments !== undefined && (
          <Section
            title="From an appointment"
            desc="Is visit this from an appointment?"
            right={
              <Checkbox
                status={isFromAppt ? 'checked' : 'unchecked'}
                onPress={() => setIsFromAppt(s => !s)}
              />
            }
            spaceTop
            mode="raised">
            <Controller
              name="appointmentId"
              control={control}
              rules={{required: isFromAppt}}
              render={({field, fieldState}) => (
                <>
                  {Boolean(fieldState.error) && (
                    <HelperText type="error">
                      You must select an appointment to proceed
                    </HelperText>
                  )}
                  <Collapsible collapsed={!isFromAppt}>
                    <Text italic style={{marginVertical: 8}}>
                      Choose
                    </Text>
                    <ScrollView horizontal>
                      {/* <Row wrapperStyle={{justifyContent: 'flex-start'}}> */}
                      {appointments.map((d, ix) => {
                        const notSelected = field.value === d.requestId;
                        return (
                          <React.Fragment key={ix}>
                            <TouchableRipple
                              onPress={() => field.onChange(d.requestId)}
                              style={{
                                marginRight: 8,
                                marginVertical: 4,
                              }}>
                              <Item
                                style={[
                                  notSelected
                                    ? {
                                        borderColor: '#4665af',
                                        backgroundColor: '#4665af',
                                      }
                                    : {
                                        borderColor: '#4665af',
                                      },
                                  {
                                    padding: 2,
                                    paddingVertical: 8,
                                    paddingHorizontal: 8,
                                    borderRadius: 8,
                                    borderWidth: 1,
                                  },
                                ]}>
                                <TitledItem
                                  titleColor={
                                    notSelected ? '#FFFFFF' : '#708dcc'
                                  }
                                  title="Appointment">
                                  <Text
                                    color={notSelected ? '#FFFFFF' : '#000'}>
                                    {format(
                                      new Date(d.requestDate),
                                      'yyyy, MMMM dd',
                                    )}
                                  </Text>
                                </TitledItem>
                              </Item>
                            </TouchableRipple>
                          </React.Fragment>
                        );
                      })}
                      {/* </Row> */}
                    </ScrollView>
                  </Collapsible>
                </>
              )}
            />
          </Section>
        )}

        {/* Make ARV medication request */}
        {medications === undefined ? (
          <Text>Loading medications...</Text>
        ) : (
          <Section
            spaceTop
            title="ARV Medication"
            desc="Select regimens that apply">
            <Column spaceTop>
              <Controller
                control={control}
                name="arvRegimens"
                render={({field}) => (
                  <MultiSelect
                    confirmText={'Confirm'}
                    items={[
                      {
                        name: 'ARV Regimens',
                        id: 1,
                        children: Object.entries(medications ?? {}).map(
                          ([id, obj]) => ({
                            id,
                            name: obj.text,
                          }),
                        ),
                      },
                    ]}
                    uniqueKey="id"
                    searchPlaceholderText={'Search ARV Regimen'}
                    selectText={'Select if any'}
                    onSelectedItemsChange={ids =>
                      field.onChange(ids.map(idx => (medications || {})[idx]))
                    }
                    selectedItems={field.value.map(d => d.id ?? d.identifier)}
                  />
                )}
              />
            </Column>

            <Column spaceTop>
              <Text font="medium">Duration of the selected ARVs</Text>
              <Controller
                control={control}
                name="regimenDuration"
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
                      {durationOptions.map(({value, text}) => (
                        <RadioButton.Item
                          label={text}
                          key={value}
                          value={value}
                        />
                      ))}
                    </Row>
                  </RadioButton.Group>
                )}
              />
            </Column>
          </Section>
        )}

        {/* Other Medication */}

        <Section title="Other Medications">
          <Column>
            <Controller
              control={control}
              name="medications"
              render={({field}) => (
                <MultiSelect
                  confirmText={'Confirm'}
                  items={[
                    {
                      name: 'Medication',
                      id: 1,
                      children: ion(Medication.all.pairs()),
                    },
                  ]}
                  uniqueKey="id"
                  searchPlaceholderText={'Search Medication'}
                  selectText={'Select if any'}
                  onSelectedItemsChange={field.onChange}
                  selectedItems={field.value}
                />
              )}
            />
          </Column>
        </Section>

        <Section
          title="Request Investigations"
          desc="Make investigation requests for the patient">
          <Controller
            control={control}
            name="investigations"
            render={({field, fieldState: {error}}) => (
              <>
                <MultiSelect
                  ref={field.ref}
                  confirmText={'Confirm'}
                  items={[
                    {
                      name: 'Investigations',
                      id: 1,
                      children: Investigation.name
                        .pairs()
                        .map(([id, name]) => ({id, name})),
                    },
                  ]}
                  uniqueKey="id"
                  searchPlaceholderText={'Search Investigations'}
                  selectText={'Select if any'}
                  onSelectedItemsChange={field.onChange}
                  selectedItems={field.value}
                />
                {Boolean(error?.type === 'validate') && (
                  <HelperText type="error">
                    You need to select at least 1 investigation
                  </HelperText>
                )}
              </>
            )}
          />
        </Section>

        {/* Date */}
        <Section
          title="Next expected pickup"
          desc="Time expected for the patient to pick up the medication">
          <Column>
            <ControlDateInput
              name="appointmentDate"
              control={control}
              required
            />
          </Column>
        </Section>
      </ScrollView>
      {/* Action buttons */}
      <Block borderTop>
        <Row>
          <Button
            mode="outlined"
            onPress={$.onDiscard}
            style={{flex: 1, marginRight: 8}}
            icon="close">
            Discard
          </Button>
          <Button
            mode="contained"
            onPress={onSubmit}
            style={{flex: 1}}
            icon="check">
            {notEdit ? 'Finish' : 'Finalize Edit'}
          </Button>
        </Row>
      </Block>
    </Layout>
  );
}
