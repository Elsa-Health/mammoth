import React from 'react';

import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

import {Layout, Text} from '@elsa-ui/react-native/components';
import {useTheme} from '@elsa-ui/react-native/theme';
import {ScrollView, StyleSheet, View} from 'react-native';
import {
  AsyncComponent,
  Block,
  Column,
  Item,
  MultiSelect,
  Row,
  Section,
  TitledItem,
  TouchableItem,
} from '../../temp-components';
import {WorkflowScreenProps} from '@elsa-ui/react-native-workflows';
import {Button, RadioButton, TextInput} from 'react-native-paper';
import {MedicaDisp, MedicaReq} from '../../emr';
import {List} from 'immutable';

import {format, formatDistanceToNow} from 'date-fns';
import {BottomSheetModalProvider} from '@gorhom/bottom-sheet';
import {useBottomModal} from './components';
import {ARV, Medication} from 'elsa-health-data-fns/lib';
import _ from 'lodash';

import {useAsyncRetry} from 'react-use';

type MakeRequestHandlerProps = {
  reason: string | null;
  patientId: string;
} & (
  | {type: 'arv'; regimen: ARV.Regimen; className: ARV.Class}
  | {type: 'standard'; medication: Medication.All; alias?: string}
);
type ScreenProps = WorkflowScreenProps<
  {},
  {
    onShowAllMedicationDispenses: () => void;

    onMakeRequest: (data: MakeRequestHandlerProps, finish: () => void) => void;
    onShowMedicationRequest: (medicationRequest: MedicaReq) => void;
    getMedicationRequests: () => Promise<MedicaReq[]>;
    getPatientsToRequestFor: () => Promise<Array<{id: string; name: string}>>;
    getMedicationDispenseFrom: (
      medicationRequest: MedicaReq,
    ) => Promise<MedicaDisp | null>;
  }
>;

function MedicationDashboardScreen({actions: $}: ScreenProps) {
  const {spacing, color} = useTheme();
  const {
    value: medicaRequests,
    retry,
    loading,
  } = useAsyncRetry<List<MedicaReq>>(async () => {
    return List((await $.getMedicationRequests?.()) || []);
  });

  const {BottomModal: RequestBottomModal, presentModal: showRequestModal} =
    useBottomModal();

  return (
    <Layout title="Medications" style={{padding: 0}}>
      <ScrollView
        contentContainerStyle={{padding: spacing.md}}
        style={{flex: 1}}>
        <Section mode="raised" desc="Potential Problem!">
          <Text>Medication stock might be low ?</Text>
        </Section>
        {/* Actions to do here */}
        <Section
          title="Get Started"
          removeLine
          desc="Things that can be done"
          spaceTop>
          <TouchableItem
            style={{backgroundColor: '#FFF'}}
            onPress={showRequestModal}>
            <Row icon="medical-bag">
              <Text font="medium" size={17} style={{letterSpacing: 1}}>
                Request Medication
              </Text>
              {/* <Icon name="arrow-right" color={color.primary.base} size={24} /> */}
            </Row>
          </TouchableItem>
          <TouchableItem
            spaceTop
            style={{backgroundColor: '#FFF'}}
            onPress={$.onShowAllMedicationDispenses}>
            <Row icon="file-document-multiple-outline">
              <Text font="medium" size={17} style={{letterSpacing: 1}}>
                View responded requests
              </Text>
              <Icon name="arrow-right" color={color.primary.base} size={24} />
            </Row>
          </TouchableItem>
        </Section>
        {/* Medication Requests */}
        <Section
          title="Meds. Request"
          desc="Request for medications"
          removeLine
          right={
            <Button icon="refresh" onPress={retry}>
              Refresh
            </Button>
          }>
          {(medicaRequests?.count() || 0) === 0 ? (
            <Column contentStyle={{alignItems: 'center'}}>
              <Text italic>No request as of now.</Text>
              <Text italic>Try pressing on `Refresh`</Text>
            </Column>
          ) : (
            <Column>
              {medicaRequests
                ?.map((req, ix) => {
                  if (req.medication.resourceType !== 'Medication') {
                    return null;
                  }

                  return {
                    actualRequestTime: new Date(req.authoredOn),
                    reqTime: formatDistanceToNow(new Date(req.authoredOn)),
                    subject: req.subject.id,
                    requestedBy: req.requester?.id,
                    type: req.medication.code,
                    medicationId:
                      (req.medication.type === 'arv'
                        ? ARV.regimen.fromKey(req.medication.name)
                        : Medication.all.fromKey(req.medication.name)) ??
                      req.medication.name,
                    _full: req,
                  };
                })
                .filter(d => d !== null)
                .sortBy(d => -d.actualRequestTime.getTime())
                .map((d, ix) => (
                  <React.Fragment key={ix}>
                    <Item spaceTop={ix !== 0}>
                      <MedicationRequestItem
                        data={d}
                        onViewRequest={() => {
                          if (d !== null) {
                            $.onShowMedicationRequest(d._full);
                          }
                        }}
                        loadMedicationDispense={() =>
                          $.getMedicationDispenseFrom(d?._full)
                        }
                      />
                    </Item>
                  </React.Fragment>
                ))}
            </Column>
          )}
        </Section>
      </ScrollView>

      <RequestBottomModal>
        {({close}) => (
          <RequestMedicationForm
            onCancel={close}
            onRequest={props => {
              // re-request the medication list
              $.onMakeRequest(props, () => {
                retry();
                close && close();
              });
            }}
          />
        )}
      </RequestBottomModal>
    </Layout>
  );
}

function MedicationRequestItem({
  data: d,
  loadMedicationDispense,
  onViewRequest,
}: {
  data: any;
  loadMedicationDispense: () => Promise<MedicaDisp | null>;
  onViewRequest: () => void;
}) {
  return (
    <Column
      wrapperStyle={{
        borderColor: '#b5c1df',
        borderWidth: 1,
        borderRadius: 4,
        padding: 10,
      }}>
      <Text>
        {_.capitalize(d?.type)} Meds: <Text font="bold">{d?.medicationId}</Text>
      </Text>
      <Text>
        For patient: <Text font="bold">{d?.subject}</Text>
      </Text>
      <Text italic size={14}>
        Request made {d?.reqTime} ago
      </Text>
      <View>
        <AsyncComponent loader={loadMedicationDispense}>
          {({loading, error, value}) => {
            if (loading) {
              return (
                <View>
                  <Text>Checking for Results...</Text>
                </View>
              );
            }

            if (error) {
              return (
                <View>
                  <Text size={14} italic>
                    Something went wrong. Unable to laod resutls
                  </Text>
                </View>
              );
            }
            console.log(value);

            if (value === null) {
              return (
                <Column spaceTop>
                  <Button onPress={onViewRequest}>View Request</Button>
                </Column>
              );
            }

            return (
              <View>
                <TitledItem title="Status" spaceTop>
                  Dispense Notice
                  <Icon name="check" color="green" size={20} />
                </TitledItem>
                {value?.createdAt && (
                  <TitledItem title="Date Dispensed" spaceTop>
                    {format(new Date(value.createdAt), 'yyyy, MMMM dd')}
                  </TitledItem>
                )}
              </View>
            );
          }}
        </AsyncComponent>
      </View>
    </Column>
  );
}

function RequestMedicationForm(props: {
  onCancel?: () => void;
  onRequest: (props: MakeRequestHandlerProps) => void;
}) {
  const [type, setType] = React.useState<'arv' | 'standard'>('arv');
  const [arvClass, setARVClass] = React.useState<ARV.Class | null>(null);
  const [arvRegimen, setArvRegimen] = React.useState<ARV.Regimen | null>(null);
  const [medi, setMedi] = React.useState<Medication.All | null>(null);

  const [patient, setPatient] = React.useState<string>();
  const [reason, setReason] = React.useState<string>();

  const handleRequest = () => {
    if (patient === null) {
      return;
    }

    if (type === 'arv' && arvClass === null && arvRegimen === null) {
      return;
    }

    if (type === 'standard' && medi === null) {
      return;
    }

    // ...
    if (type === 'arv') {
      props.onRequest({
        type,
        patientId: patient,
        regimen: arvRegimen,
        className: arvClass,
        reason: reason ?? null,
      });
    } else {
      if (type === 'standard') {
        props.onRequest({
          type,
          medication: medi,
          reason: reason ?? null,
          patientId: patient,
        });
      } else {
        return;
      }
    }
  };
  return (
    <>
      <View style={{padding: 16}}>
        <Section
          title="Medication Details"
          desc="Information higlighting medication information">
          <Column>
            <Text>Type of medicine?</Text>
            <RadioButton.Group value={type} onValueChange={setType}>
              <View style={{flexDirection: 'row'}}>
                <RadioButton.Item label="ARV" value="arv" />
                <RadioButton.Item label="Standard" value="standard" />
              </View>
            </RadioButton.Group>
          </Column>
          {/* Medication to choose */}
          {type === 'standard' ? (
            <Column>
              <Text>Select a medication</Text>
              <MultiSelect
                confirmText={'Select'}
                items={[
                  {
                    name: 'Standard Medication',
                    id: 1,
                    children: Medication.all
                      .pairs()
                      .map(([id, name]) => ({id, name})),
                  },
                ]}
                single
                searchPlaceholderText={'Search a standard medication'}
                selectText={'Select if any'}
                uniqueKey="id"
                onSelectedItemsChange={(d: Medication.All[]) => {
                  const single = d[0];
                  setMedi(single);
                }}
                selectedItems={medi ? [medi] : []}
              />
            </Column>
          ) : (
            <>
              <Column>
                <Text>Choose ARV Class</Text>
                <MultiSelect
                  confirmText={'Select'}
                  items={[
                    {
                      name: 'Class',
                      id: 1,
                      children: ARV.class
                        .pairs()
                        .map(([id, name]) => ({id, name})),
                    },
                  ]}
                  single
                  searchPlaceholderText={'Search for class'}
                  selectText={'No class selected'}
                  uniqueKey="id"
                  onSelectedItemsChange={(d: ARV.Class[]) => {
                    const single = d[0];
                    setARVClass(single);
                  }}
                  selectedItems={arvClass !== null ? [arvClass] : []}
                />
              </Column>

              {arvClass !== null && (
                <Column>
                  <Text>Choose Regimen</Text>
                  <MultiSelect
                    confirmText={'Select'}
                    items={[
                      {
                        name: 'Class',
                        id: 1,
                        children: ARV.fromKey(arvClass).map(id => ({
                          id: id,
                          name: ARV.regimen.fromKey(id),
                        })),
                      },
                    ]}
                    single
                    searchPlaceholderText={'Search for Regimen'}
                    selectText={'No regimen Selected'}
                    uniqueKey="id"
                    onSelectedItemsChange={(d: ARV.Regimen[]) => {
                      const single = d[0];
                      setArvRegimen(d[0]);
                    }}
                    selectedItems={arvRegimen !== undefined ? [arvRegimen] : []}
                  />
                </Column>
              )}
            </>
          )}
        </Section>
        <Section
          title="Other Details"
          desc="Identify other helpful informatino">
          {/* Select patient  */}
          <Text>Choose a patient</Text>
          <MultiSelect
            confirmText={'Select'}
            items={[
              {
                name: 'My patients',
                id: 0,
                children: ['11111111111111'].map(id => ({id, name: id})), // [{id: '11111111111111', name: 'Test Patient'}],
              },
              {
                name: 'Other Patients',
                id: 1,
                children: ['0XXXXXXX123456'].map(id => ({id, name: id})), //  [{id: '0XXXXXXX123456', name: 'Test Patient'}],
              },
            ]}
            single
            searchPlaceholderText={'Search a patient'}
            selectText={'None'}
            uniqueKey="id"
            onSelectedItemsChange={(d: Medication.All[]) => {
              const single = d[0];
              setPatient(single);
            }}
            selectedItems={patient ? [patient] : []}
          />
          <Item spaceTop spaceBottom>
            <TextInput
              label="Reason this medication"
              value={reason}
              onChangeText={setReason}
              mode="outlined"
            />
          </Item>
        </Section>

        <Section>
          <Row>
            <Button style={{flex: 1}} onPress={props.onCancel}>
              Cancel
            </Button>
            <Button
              mode="contained"
              style={{flex: 1.5}}
              onPress={handleRequest}>
              Request
            </Button>
          </Row>
        </Section>
      </View>
    </>
  );
}

export default function (props: ScreenProps) {
  return (
    <BottomSheetModalProvider>
      <MedicationDashboardScreen {...props} />
    </BottomSheetModalProvider>
  );
}
