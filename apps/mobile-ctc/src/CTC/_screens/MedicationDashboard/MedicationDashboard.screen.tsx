import React from 'react';

import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

import {Layout, Text} from '@elsa-ui/react-native/components';
import {useTheme} from '@elsa-ui/react-native/theme';
import {ScrollView, StyleSheet, View} from 'react-native';
import {
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
import {MedicaReq} from '../../emr';
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
    onShowAllMedicationRequests: () => void;
    onAcceptStandardMedicationRequest: (
      medicationRequest: MedicaReq,
      finish: () => void,
    ) => void;
    onMakeRequest: (data: MakeRequestHandlerProps, finish: () => void) => void;
    onAcceptARVMedicationRequest: (
      medicationRequest: MedicaReq,
      finish: () => void,
    ) => void;
    getMedicationRequests: () => Promise<any[]>;
    getMedicationDispenses: () => Promise<any[]>;
    getPatientsToRequestFor: () => Promise<Array<{id: string; name: string}>>;
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

  const {BottomModal, presentModal, closeModal} = useBottomModal({
    snapPoints: ['25%', '90%'],
  });

  const {BottomModal: RequestBottomModal, presentModal: showRequestModal} =
    useBottomModal();

  const [currentRequest, set] = React.useState<MedicaReq | null>(null);
  return (
    <Layout title="Kuhusu Dawa" style={{padding: 0}}>
      <ScrollView
        contentContainerStyle={{padding: spacing.md}}
        style={{flex: 1}}>
        <Section mode="raised" desc="Inawezekana kuna shida!">
          <Text>Stoku za dawa zipo kwa upungufu ?</Text>
        </Section>
        {/* Medication Requests */}
        <Section
          title="Maombi Mapya"
          desc="Orodha ya maombi ya dawa mapya"
          removeLine
          right={
            <Button icon="refresh" onPress={retry}>
              Pakua
            </Button>
          }>
          <Column>
            {medicaRequests
              ?.map((req, ix) => {
                if (req.medication.resourceType !== 'Medication') {
                  return null;
                }

                return {
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
              .map((d, ix) => (
                <React.Fragment key={ix}>
                  <Column
                    spaceTop={ix !== 0}
                    wrapperStyle={{
                      borderColor: '#ccc',
                      borderWidth: 1,
                      borderRadius: 4,
                      padding: 10,
                    }}>
                    <Text>
                      {_.capitalize(d?.type)} Dawa:{' '}
                      <Text font="bold">{d?.medicationId}</Text>
                    </Text>
                    <Text>
                      Kwa ajili ya: <Text font="bold">{d?.subject}</Text>
                    </Text>
                    <Column spaceTop>
                      <Text italic size={14}>
                        Iliombwa {d?.reqTime} ago
                      </Text>
                      <Button
                        onPress={() => {
                          if (d !== null) {
                            set(d._full);
                            presentModal();
                          }
                        }}>
                        Show More
                      </Button>
                    </Column>
                  </Column>
                </React.Fragment>
              ))}
          </Column>
        </Section>

        {/* Accepted requested */}
        <Section
          title="Maombi yaliyokubaliwa"
          desc="Orodha ya maombi ya dawa mapya"
          removeLine
          right={
            <Button icon="refresh" onPress={retry}>
              Pakua
            </Button>
          }>
          <AsyncComponent
            loader={async () =>
              await List<MedicaReq>($.getMedicationDispenses() || [])
            }>
            {({loading, error, value}) => {
              if (loading) {
                return (
                  <Column>
                    <Text>Loading data...</Text>
                  </Column>
                );
              }

              if (error !== undefined) {
                return (
                  <Column>
                    <Text>There seems to be a problem..</Text>
                  </Column>
                );
              }

              return (
                <Column>
                  <Text>You are done</Text>
                </Column>
              );
            }}
          </AsyncComponent>
        </Section>

        {/* Actions to do here */}
        <Section title="Tufanye nini?" removeLine desc="Mambo unayoweza fanya">
          <TouchableItem
            style={{backgroundColor: '#FFF'}}
            onPress={showRequestModal}>
            <Row icon="medical-bag">
              <Text font="medium" size={17} style={{letterSpacing: 1}}>
                Omba dawa
              </Text>
              {/* <Icon name="arrow-right" color={color.primary.base} size={24} /> */}
            </Row>
          </TouchableItem>
          <TouchableItem
            spaceTop
            style={{backgroundColor: '#FFF'}}
            onPress={$.onShowAllMedicationRequests}>
            <Row icon="file-document-multiple-outline">
              <Text font="medium" size={17} style={{letterSpacing: 1}}>
                Maombi yaliotimizwa
              </Text>
              <Icon name="arrow-right" color={color.primary.base} size={24} />
            </Row>
          </TouchableItem>
        </Section>
      </ScrollView>

      {/* Modal to show information needed */}
      <BottomModal>
        {({close}) =>
          currentRequest !== null && (
            <RespondToMedicationRequestForm
              data={currentRequest}
              onIgnoreRequest={close}
              onAcceptRequest={() =>
                $.onAcceptStandardMedicationRequest(currentRequest, closeModal)
              }
            />
          )
        }
      </BottomModal>
      <RequestBottomModal>
        {({close}) => (
          <RequestMedicationForm
            onCancel={close}
            onRequest={props => {
              // re-request the medication list
              $.onMakeRequest(props, retry);
            }}
          />
        )}
      </RequestBottomModal>
    </Layout>
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

function RespondToMedicationRequestForm({
  data,
  ...props
}: {
  data: MedicaReq;
  onIgnoreRequest?: () => void;
  onAcceptRequest: () => void;
}) {
  return (
    <>
      <View style={{paddingHorizontal: 16}}>
        {/* Current stock notice */}
        <Section
          title="You have enough"
          desc="Looking at your stock. You are able to properly respond to the medication request."
          mode="raised"
          removeLine
        />
        {/* See full details of the request */}
        {/* Information included:
            
                - Name of medication
                - Doctor requesting 
                - Patient requesting for (by ID)
                - Date of request
            */}
        <Section
          title="Request Details"
          desc="Below are the details of the medication request.">
          <TitledItem title="Request Date">
            {format(new Date(data.authoredOn), 'yyyy, MMMM dd. HH:MM')}
          </TitledItem>
          <TitledItem title="Medication Name" spaceTop>
            {Medication.all.fromKey(data.medication.name) ??
              data.medication.name}
          </TitledItem>
          <TitledItem title="Patient ID" spaceTop>
            {data.subject.id}
          </TitledItem>
          <TitledItem title="Reason for request" spaceTop>
            {data.reason}
          </TitledItem>
          <TitledItem title="Instructions" spaceTop>
            {data.instructions ?? 'None'}
          </TitledItem>
        </Section>
      </View>
      <Section>
        <Row>
          <Button style={{flex: 1}} onPress={props.onIgnoreRequest}>
            Ignore
          </Button>
          <Button
            mode="contained"
            style={{flex: 1}}
            onPress={props.onAcceptRequest}>
            Accept Request
          </Button>
        </Row>
      </Section>
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
