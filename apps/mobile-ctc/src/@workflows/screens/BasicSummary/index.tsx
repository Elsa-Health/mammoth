import React from 'react';
import {Layout, Text} from '../../../@libs/elsa-ui/components';
import {Alert, Pressable, View, ScrollView} from 'react-native';
import {
  convertPatientForElsa,
  fetchFromElsaLambda,
  getDiscretized,
  normalValueDiscretization,
} from '../../helpers/context/assessment';
import {properAgeString} from '../../../app/utils';
import {Button} from '../../../@libs/elsa-ui/components/input';
import {CircleBar, SelectedConditionSummary} from './components';
import {
  CheckIcon,
  MenuIcon,
  NextIcon,
  XIcon,
} from '../../../@libs/elsa-ui/visuals/vectors';

import {useSymptomLocale} from '../../helpers/symptoms';
import theme from '../../../@libs/elsa-ui/theme';
import {RevealContent} from '../../../@libs/elsa-ui/components/misc';
import {useTranslation} from 'react-i18next';
import {Differential, SymptomData, SymptomId} from '../../../../@types';
import {useAsyncFn} from 'react-use';

type SymptomSummaryItemProps = {
  id: string;
  data: SymptomData;
  present: boolean;
  content: {
    description: string;
    symptom: string;
  };
  onSelectSymptom: SelectSymptomFunction;
};

function SymptomSummaryItem({
  id,
  data,
  present,
  content,
  onSelectSymptom,
}: SymptomSummaryItemProps) {
  return (
    <Pressable
      onPress={() => {
        // setup the symptoms
        onSelectSymptom({id: id as SymptomId, state: data, present});
      }}
      android_ripple={{borderless: true, radius: 15}}
      style={{
        // marginLeft: ix > 0 ? 3 : 0,
        display: 'flex',
        paddingHorizontal: 10,
        paddingVertical: 5,
        flexDirection: 'row',
      }}
      // key={`${ix}-${symptom.id}`}
    >
      {present ? (
        <CheckIcon width={20} height={20} />
      ) : (
        <XIcon width={20} height={20} />
      )}
      {/* <View style={{ width: 18, height: 18, backgroundColor:  ? 'green': 'red', borderRadius: 20 }} /> */}
      <Text
        style={{
          marginLeft: 3,
          textTransform: 'capitalize',
        }}>
        {content.symptom}
      </Text>
    </Pressable>
  );
}

/**
 * Total number of caps used in showing elsa's confidence
 */
const TOTAL_CAPS_COUNT = 10;
function SymptomsListingSection({
  symptoms,
  onSelectSymptom: handleSelectSymptom,
}: {
  symptoms: EntrySymptoms;
  onSelectSymptom: SelectSymptomFunction;
}) {
  const {t} = useTranslation('translation', {
    keyPrefix: 'assessment.summary',
  });

  const {getSymptomById} = useSymptomLocale();

  if (symptoms.present.length === 0 && symptoms.absent.length === 0) {
    return (
      <View
        style={{
          margin: 10,
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        {/* <Text italic></Text> */}
        <Text italic style={{textAlign: 'center'}}>
          {' '}
          {t`signs_summary.no_symptoms`}. {t`signs_summary.no_symptoms_more`}
        </Text>
      </View>
    );
  }

  return (
    <View
      style={{
        display: 'flex',
        marginVertical: 4,
        flexDirection: 'row',
        flexWrap: 'wrap',
      }}>
      {symptoms.present.map((symptom, ix) => {
        const content = getSymptomById(symptom.id);
        return (
          <SymptomSummaryItem
            present={true}
            data={symptom.data}
            id={symptom.id}
            content={content}
            onSelectSymptom={handleSelectSymptom}
            key={symptom.id}
          />
        );
      })}

      {/* {symptoms.map((symptom, ix) => {
				return (
					//
				);
			})} */}
    </View>
  );
}

function ConditionViewSection({
  conditions,
  onSearchSymptom: handleSearchSymptom,
  onSelectSymptom,
}: {
  conditions: any[];
  onSearchSymptom: (symptomText: string) => void;
  onSelectSymptom: SelectSymptomFunction;
}) {
  const selectExisting = React.useCallback(
    (id: SymptomId, entry?: SymptomData) => {
      onSelectSymptom({id, state: entry});
    },
    [],
  );

  const {t} = useTranslation('translation', {
    keyPrefix: 'assessment.summary',
  });

  if (conditions.length === 0) {
    return (
      <View style={{marginVertical: 16}}>
        <Text>{t`elsa_diagnosis.nothing`}!</Text>
      </View>
    );
  }

  // all the symptoms that I can present here
  const [first, ...other] = conditions;

  return (
    <ScrollView style={{display: 'flex', marginVertical: 10}}>
      <View
        style={{
          flex: 1,
          display: 'flex',
          flexDirection: 'row',
          alignItems: 'flex-start',
        }}>
        <View style={{flexWrap: 'nowrap'}}>
          <Text
            font="bold"
            style={{
              fontSize: 18,
              textTransform: 'capitalize',
              color: theme.color.primary.dark,
            }}>
            1.
          </Text>
        </View>
        <View style={{flex: 0.9}}>
          <Text
            font="bold"
            style={{
              fontSize: 18,
              textTransform: 'capitalize',
              color: theme.color.primary.dark,
            }}>
            {first.condition.trim().replace('-', ' ')} (
            {(first.p * 100).toFixed(1)} %)
          </Text>
          <CircleBar size={15} count={first.count} total={TOTAL_CAPS_COUNT} />
          <View style={{marginVertical: 10}}>
            <SelectedConditionSummary
              onSelectExistingSymptom={selectExisting}
              onSelectNewSymptom={handleSearchSymptom}
              condition={{
                presentingSymptoms: first.presentingSymptoms,
                absentSymptoms: first.absentSymptoms,
              }}
            />
          </View>
        </View>
      </View>

      <View style={{marginTop: 8}}>
        {/* <Text style={{ marginBottom: 4 }}>{t`elsa_diagnosis.other_conditions`}:</Text> */}
        {other.map((condition, ix) => (
          <View
            key={condition.condition}
            style={{
              flex: 1,
              display: 'flex',
              flexDirection: 'row',
              alignItems: 'flex-start',
              marginVertical: 4,
            }}>
            <View style={{flexWrap: 'nowrap'}}>
              <Text
                font="medium"
                style={{
                  textTransform: 'capitalize',
                  color: theme.color.primary.base,
                  overflow: 'hidden',
                }}>
                {ix + 2}.
              </Text>
            </View>
            <View
              style={{
                flex: 0.9,
                flexWrap: 'nowrap',
                marginLeft: 4,
              }}>
              <View
                style={{
                  display: 'flex',
                  flexDirection: 'row',
                  alignItems: 'center',
                }}>
                <Text
                  font="medium"
                  style={{
                    textTransform: 'capitalize',
                    color: theme.color.primary.base,
                  }}>
                  {condition.condition.trim().replace('-', ' ')} (
                  {(condition.p * 100).toFixed(1)} %)
                </Text>
                <CircleBar
                  count={condition.count || 0}
                  style={{marginLeft: 10}}
                  total={TOTAL_CAPS_COUNT}
                />
              </View>
            </View>
          </View>
        ))}
      </View>
    </ScrollView>
  );
}

type EntrySymptoms = {
  present: {
    id: string;
    data: SymptomData;
  }[];
  absent: string[];
};

type SelectSymptomFunction = (symptom: {
  id: SymptomId;
  // description: SymptomProps;
  state?: SymptomData;
  present?: boolean;
}) => void;
type Props = {
  entry: {
    patient: PatientIntake;
    symptoms: EntrySymptoms;
  };
  actions: {
    onAddSymptom: () => void;
    onManageSymptoms: () => void;
    onSelectSymptom: SelectSymptomFunction;
    onSearchSymptom: (symptomText: string) => void;
    onCancel: () => void;
    onNext: (elsaDifferentials: Differential[]) => void;
  };
};

export default function BasicSummaryScreen({
  entry: {patient, symptoms},
  actions: $,
}: Props) {
  const [{loading, value: differentials}, fetchElsaDiffs] =
    useAsyncFn(async () => {
      return await fetchFromElsaLambda(
        convertPatientForElsa(patient),
        symptoms.present,
        symptoms.absent,
      );
    }, [symptoms]);

  React.useEffect(() => {
    fetchElsaDiffs();
  }, []);

  const getDiscretizedConditions = React.useCallback(
    (elsa_conditions: Differential[], asstr: string[]) => {
      if (elsa_conditions.length > 2) {
        return getDiscretized(
          normalValueDiscretization,
          elsa_conditions,
          asstr,
          3,
          TOTAL_CAPS_COUNT,
        );
      } else {
        return [];
      }
    },
    [getDiscretized, TOTAL_CAPS_COUNT],
  );

  const {t} = useTranslation('translation', {
    keyPrefix: 'assessment.summary',
  });
  const {t: tc} = useTranslation('translation', {keyPrefix: 'common'});

  // const navigateToConcludeAssessment = React.useCallback(
  // 	(elsa_conditions: Differential[] = [], asstr: string[]) =>
  // 		() => {
  // 			navigation.navigate("assessment", {
  // 				elsa_conditions,
  // 				selected_conditions: getDiscretizedConditions(
  // 					elsa_conditions,
  // 					asstr
  // 				),
  // 			});
  // 		},
  // 	[navigation, getDiscretized]
  // );

  // const leaveToIntake = React.useCallback(() => {
  // 	// Prompt the user before leaving the screen
  // 	Alert.alert(t`discard_dialog.title`, t`discard_dialog.description`, [
  // 		{ text: tc`actions.cancel`, style: "cancel", onPress: () => {} },
  // 		{
  // 			text: t`discard_dialog.action`,
  // 			style: "destructive",
  // 			// If the user confirmed, then we dispatch the action we blocked earlier
  // 			// This will continue the action that had triggered the removal of the screen
  // 			onPress: () => navigation.dispatch(StackActions.popToTop()),
  // 		},
  // 	]);

  // 	return true;
  // }, [navigation]);

  // React.useEffect(() => {
  // 	// BackHandler.addEventListener('hardwareBackPress', function () {
  // 	//     const s = navigation.
  // 	//     console.log({ s })
  // 	//     if (navigation.getState().index === 0) {
  // 	//         return leaveToIntake()
  // 	//     }
  // 	// })
  // 	// return BackHandler.removeEventListener('hardwareBackPress', () => true)
  // }, [leaveToIntake]);

  const revealedSymptomsCount =
    symptoms.absent.length + symptoms.present.length;

  return (
    <Layout hideGoBack style={{paddingHorizontal: 0}} title="Elsa's Insights">
      <ScrollView
        style={{marginBottom: 18}}
        alwaysBounceVertical
        showsVerticalScrollIndicator>
        {/* Header */}
        <View
          style={{
            display: 'flex',
            alignItems: 'center',
            flexDirection: 'row',
            paddingHorizontal: 24,
          }}>
          <View>
            <Text
              style={{
                fontSize: 20,
                textTransform: 'capitalize',
              }}>
              {tc('gender_patient', {
                sex_text: tc(`sex.${patient.sex}`),
              })}
            </Text>
            <Text style={{fontSize: 16}}>{properAgeString(patient.age)}</Text>
          </View>
        </View>
        {/* Symtoms */}
        <View style={{marginVertical: 10, paddingHorizontal: 24}}>
          <View
            style={{
              display: 'flex',
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-between',
            }}>
            <Text
              font="bold"
              style={{fontSize: 17}}>{t`signs_summary.text`}</Text>
            <Pressable
              style={{padding: 6, borderRadius: 100}}
              hitSlop={20}
              android_ripple={{radius: 20, borderless: true}}
              onPress={$.onManageSymptoms}>
              <MenuIcon />
            </Pressable>
          </View>
          <View>
            <SymptomsListingSection
              symptoms={symptoms}
              onSelectSymptom={$.onSelectSymptom}
            />
          </View>
          <View>
            <Button outline onPress={$.onAddSymptom} title={t`buttons.add`} />
          </View>
        </View>
        <RevealContent
          show={revealedSymptomsCount > 0}
          style={{
            borderTopWidth: 1,
            borderTopColor: '#4BB8E9',
            marginTop: 16,
          }}>
          {loading ? (
            <View
              style={{
                flex: 1,
                paddingHorizontal: 24,
                marginVertical: 16,
              }}>
              <Text>{tc`loading`}...</Text>
            </View>
          ) : revealedSymptomsCount > 0 ? (
            <View style={{flex: 1, paddingHorizontal: 24}}>
              <View style={{marginVertical: 10, marginTop: 20}}>
                <Text
                  font="medium"
                  style={{fontSize: 17}}>{t`elsa_diagnosis.title`}</Text>
                <View>
                  <ConditionViewSection
                    onSearchSymptom={$.onSearchSymptom}
                    onSelectSymptom={$.onSelectSymptom}
                    conditions={
                      differentials.length === 0
                        ? []
                        : getDiscretizedConditions(
                            differentials,
                            symptoms.absent,
                          )
                    }
                  />
                </View>
              </View>
            </View>
          ) : null}
        </RevealContent>
      </ScrollView>
      <View style={{width: '100%', paddingHorizontal: 24}}>
        <View style={{flex: 1}} />
        <View
          style={{
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'space-between',
          }}>
          <Pressable
            android_ripple={{borderless: true, radius: 16}}
            onPress={$.onCancel}
            style={{
              alignItems: 'center',
              justifyContent: 'flex-end',
              display: 'flex',
              alignSelf: 'flex-end',
              flexDirection: 'row',
            }}>
            <XIcon />
            <Text
              font="bold"
              style={{paddingHorizontal: 8}}>{tc`actions.cancel`}</Text>
          </Pressable>
          <RevealContent show={revealedSymptomsCount > 0}>
            <Pressable
              android_ripple={{borderless: true, radius: 16}}
              onPress={() => $.onNext(differentials)}
              style={{
                alignItems: 'center',
                justifyContent: 'flex-end',
                display: 'flex',
                alignSelf: 'flex-end',
                flexDirection: 'row',
              }}>
              <Text
                font="bold"
                style={{paddingHorizontal: 8}}>{tc`actions.next`}</Text>
              <NextIcon />
            </Pressable>
          </RevealContent>
        </View>
      </View>
    </Layout>
  );
}
