import React from 'react'
import { Layout, Text } from '../../../components'
import { Alert, Pressable, View, ScrollView, BackHandler } from 'react-native'
import { normalValueDiscretization, useElsaLambda, useSAStore } from '../../../app/context/assessment'
import { CommonActions, StackActions, useNavigation } from '@react-navigation/native'
import { properAgeString, useSymptomsInfo } from '../../../app/utils'
import { Button } from '../../../components/input'
import { CircleBar, SelectedConditionSummary } from './components'
import { CheckIcon, MenuIcon, NextIcon, XIcon } from '../../../assets/vectors'

import { symptoms  as symptomsBag, useSypmtomLocale } from '../../../app/symptoms';
import theme from '../../../theme'
import { RevealContent } from '../../../components/misc'
import { useSymptomStore } from '../../../app/interactionSymptoms'
import { useTranslation } from 'react-i18next'
import { Differential, SymptomData, SymptomDescription, SymptomId } from '../../../../@types'
function useBasicInfo () {
    const [age, pregnant, sex]  = useSAStore(s => [s.age, s.pregnant, s.sex ])
    return {
        age,
        sex,
        pregnant
    }
}

/**
 * Total number of caps used in showing elsa's confidence
 */
const TOTAL_CAPS_COUNT = 10
function SymptomsListingSection () {
    const symptoms = useSymptomsInfo()    
    const [addSymptom, reset, setShow] = useSymptomStore(s => [s.addSymptomFromId, s.reset, s.setShowState])

    const onSelectSymptom = React.useCallback((id: SymptomId, entry?: SymptomData) => {
        reset()
        addSymptom(id, entry, entry !== undefined)
        setShow('full')
    }, [addSymptom, reset])

    const { t } = useTranslation('translation', { keyPrefix: 'assessment.summary' }) 
    const { getSymptomById } = useSypmtomLocale()

    if (symptoms.length === 0) {
        return (
            <View style={{ margin: 10, display: 'flex', justifyContent: 'center', alignItems: 'center',}}>
                {/* <Text italic></Text> */}
                <Text italic style={{ textAlign: 'center' }}> {t`signs_summary.no_symptoms`}. {t`signs_summary.no_symptoms_more`}</Text>
            </View>
        )
    }

    return (
        <View style={{ display: 'flex', marginVertical: 4, flexDirection: 'row', flexWrap: 'wrap' }}>
            {
                symptoms.map((symptom, ix) => {
                    const content = getSymptomById(symptom.id)
                    return (
                        <Pressable 
                            onPress={() => {
                                const { present, id, data } = symptom 
                                // setup the symptoms
                                if (present) {
                                    onSelectSymptom(id as SymptomId, data as SymptomData)
                                } else {
                                    onSelectSymptom(id as SymptomId)
                                }
                            }}
                            android_ripple={{ borderless: true, radius: 15 }}
                            style={{ marginLeft: (ix > 0 ? 3: 0), display: 'flex', paddingHorizontal: 10, paddingVertical: 5, flexDirection: 'row'}} 
                            key={`${ix}-${symptom.id}`}
                        >
                            {symptom.present ? (<CheckIcon width={20} height={20} />) : (<XIcon width={20} height={20} />)}
                            {/* <View style={{ width: 18, height: 18, backgroundColor:  ? 'green': 'red', borderRadius: 20 }} /> */}
                            <Text style={{ marginLeft: 3, textTransform: 'capitalize' }}>{ content.symptom }</Text>
                        </Pressable>
                    )
                })
            }
        </View>
    )
}

function ConditionViewSection ({ conditions }: { conditions: any[] }) {
    const navigation = useNavigation()
    const [addSymptom, reset, setShow] = useSymptomStore(s => [s.addSymptomFromId, s.reset, s.setShowState])

    const selectExisting = React.useCallback((id: SymptomId, entry?: SymptomData) => {
        reset()
        addSymptom(id, entry, entry !== undefined)
        setShow('full')
    }, [addSymptom, reset])
    
    const selectNew = React.useCallback((searchString: string) => {
        navigation.navigate('symptom', {
            screen: 'symptom.search',
            params: {
                searchInput: searchString
            }
        })
    }, [navigation])
    
    const { t } = useTranslation('translation', { keyPrefix: 'assessment.summary' }) 

    if (conditions.length === 0) {
        return (
            <View style={{ marginVertical: 16 }}>
                <Text>{t`elsa_diagnosis.nothing`}!</Text>
            </View>
        )
    }    

    // all the symptoms that I can present here
    const [first, ...other] = conditions

    return (
        <ScrollView style={{ display: 'flex', marginVertical: 10 }}>
            <View style={{ flex: 1, display: 'flex', flexDirection: 'row', alignItems: 'flex-start'}}>
                <View style={{ flexWrap: 'nowrap' }}><Text font="bold" style={{ fontSize: 18, textTransform: 'capitalize', color: theme.color.primary.dark }}>1.</Text></View>
                <View style={{flex: 0.9,}}>
                    <Text font="bold" style={{ fontSize: 18, textTransform: 'capitalize', color: theme.color.primary.dark }}>{first.condition.trim().replace("-", " ")} ({(first.data.p * 100).toFixed(1)} %)</Text>
                    <CircleBar size={15} count={first.count} total={TOTAL_CAPS_COUNT} />
                    <View style={{ marginVertical: 10 }}>
                        <SelectedConditionSummary 
                            onSelectExistingSymptom={selectExisting}
                            onSelectNewSymptom={selectNew}
                            condition={{
                                presentingSymptoms: first.presentingSymptoms,
                                absentSymptoms: first.absentSymptoms
                            }} 
                        />
                    </View>
                </View>
            </View>
            
            <View style={{ marginTop: 8 }}>
                {/* <Text style={{ marginBottom: 4 }}>{t`elsa_diagnosis.other_conditions`}:</Text> */}
                {
                    other.map((condition, ix) => (

                        <View key={condition.condition} style={{ flex: 1, display: 'flex', flexDirection: 'row', alignItems: 'flex-start', marginVertical: 4}}>
                            <View style={{ flexWrap: 'nowrap' }}><Text font="medium" style={{ textTransform: 'capitalize', color: theme.color.primary.base, overflow:'hidden', }}>{ix + 2}.</Text></View>
                            <View style={{ flex: 0.9, flexWrap: 'nowrap', marginLeft: 4 }}>
                                <View style={{  display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
                                    <Text font="medium" style={{ textTransform: 'capitalize', color: theme.color.primary.base}}>{condition.condition.trim().replace("-", " ")} ({(condition.data.p * 100).toFixed(1)} %)</Text>
                                    <CircleBar count={condition.count || 0} style={{ marginLeft: 10 }} total={TOTAL_CAPS_COUNT}/>
                                </View>
                            </View>
                        </View>
                    ))
                }
            </View>
        </ScrollView>
    )
}

export default function SummaryView ({ route }) {
    const { age, sex } = useBasicInfo()
    const navigation = useNavigation()
    const symptoms = useSymptomsInfo()

    const navigateToAddSymptom = React.useCallback(() => {
        navigation.navigate('symptom', {
            screen: 'symptom.search'
        })
    }, [navigation])

    const navigateToManageSymptom = React.useCallback(() => {
        navigation.navigate('symptom')
    }, [navigation])

    const { patient, psstr, asstr, getDiscretized, fetchFromElsaLambda } = useElsaLambda()

    const [ready, setReady] = React.useState(false)
    const [conditions, setConditions] = React.useState<Differential[]>([])
    const [reset, addSymptomFromDescription] = useSymptomStore(s => [s.reset, s.addSymptomFromDescription])

    // Listens if the route has received any things
    React.useEffect(() => {
        const { description: sym = undefined, entry, present } = route.params || {} as { refIndex: number, description: SymptomDescription, entry?: SymptomData, present?: boolean }
        // console.log({sym, entry})
        reset()

        if (sym !== undefined) {
            // console.log("Information:", sym)
            addSymptomFromDescription(sym, entry, present)
        }
    }, [route])


    React.useEffect(() => {
        if (!ready) {
            fetchFromElsaLambda(patient, psstr, asstr)
                .then(c => setConditions(c.map(s => ({ id: s.condition, p: s.p, condition: s.label, symptoms: s.symptoms }))))
                .catch(() => setConditions([]))
                .finally(() => setReady(true))
        }
    }, [ready, psstr, asstr])

    React.useEffect(() => { 
        setReady(false)
    }, [psstr, asstr])

    const getDiscretizedConditions = React.useCallback((elsa_conditions: Differential[], asstr: string[]) => {
        if (elsa_conditions.length > 2) {
            return getDiscretized(normalValueDiscretization, elsa_conditions, asstr, 3, TOTAL_CAPS_COUNT)
        } else {
            return []
        }
    }, [getDiscretized, TOTAL_CAPS_COUNT])

    const { t } = useTranslation('translation', { keyPrefix: 'assessment.summary' }) 
    const { t: tc } = useTranslation('translation', { keyPrefix: 'common' }) 


    const navigateToConcludeAssessment = React.useCallback((elsa_conditions: Differential[] = [], asstr: string[]) => () => {
        navigation.navigate('assessment', { elsa_conditions, selected_conditions: getDiscretizedConditions(elsa_conditions, asstr) })
    }, [navigation, getDiscretized])

    const leaveToIntake = React.useCallback(() => {
        // Prompt the user before leaving the screen
        Alert.alert(
            t`discard_dialog.title`,
            t`discard_dialog.description`,
            [
              { text: tc`actions.cancel`, style: 'cancel', onPress: () => {} },
              {
                text: t`discard_dialog.action`,
                style: 'destructive',
                // If the user confirmed, then we dispatch the action we blocked earlier
                // This will continue the action that had triggered the removal of the screen
                onPress: () => navigation.dispatch(StackActions.popToTop())
              },
            ]
          );

        return true;
    }, [navigation])

    React.useEffect(() => {
        // BackHandler.addEventListener('hardwareBackPress', function () {
        //     const s = navigation.
        //     console.log({ s })
        //     if (navigation.getState().index === 0) {
        //         return leaveToIntake()
        //     }
        // })

        // return BackHandler.removeEventListener('hardwareBackPress', () => true)
    }, [leaveToIntake])
    
    return (
        <Layout hideGoBack style={{ paddingHorizontal: 0 }}>
            <ScrollView style={{ marginVertical: 18 }} alwaysBounceVertical showsVerticalScrollIndicator>
                {/* Header */}
                <View style={{ display: 'flex', alignItems: 'center', flexDirection: 'row', paddingHorizontal: 24 }}>
                    <View>
                        <Text style={{ fontSize: 20, textTransform: 'capitalize' }}>{tc('gender_patient', { sex_text: tc(`sex.${sex}`) })}</Text>
                        <Text style={{ fontSize: 16 }}>{properAgeString(age)}</Text>
                    </View>
                </View>
                {/* Symtoms */}
                <View style={{ marginVertical: 10, paddingHorizontal: 24 }}>
                    <View style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between'  }}>
                        <Text font="bold" style={{ fontSize: 17 }}>{t`signs_summary.text`}</Text>
                        <Pressable
                            // style={{ padding: 6, borderRadius: 100, borderColor: '#CCCCCCAA', zIndex: 1, borderWidth: 1 }} 
                            style={{ padding: 6, borderRadius: 100 }} 
                            hitSlop={20}
                            android_ripple={{ radius: 20, borderless: true }}
                            onPress={navigateToManageSymptom}>
                            <MenuIcon />
                        </Pressable>
                    </View>
                    <View>
                        <SymptomsListingSection />
                    </View>
                    <View>
                        <Button outline onPress={navigateToAddSymptom} title={t`buttons.add`} />
                    </View>
                </View>
                <RevealContent show={symptoms.length > 0} style={{ borderTopWidth: 1, borderTopColor: "#4BB8E9", marginTop: 16 }}>
                    {
                        !ready ? (
                            <View style={{ flex: 1, paddingHorizontal: 24, marginVertical: 16 }}>
                                <Text>{tc`loading`}...</Text>
                            </View>
                        ) : (
                            symptoms.length > 0 ? (
                                <View style={{ flex: 1, paddingHorizontal: 24 }}>
                                    <View style={{ marginVertical: 10, marginTop: 20 }}>
                                        <Text font="medium" style={{ fontSize: 17 }}>{t`elsa_diagnosis.title`}</Text>
                                        <View>
                                            <ConditionViewSection conditions={conditions.length === 0 ? [] : getDiscretizedConditions(conditions, asstr)} />
                                        </View>
                                    </View>
                                </View>
                            ) : null
                        )
                    }
                </RevealContent>
            </ScrollView>
                <View style={{ width: '100%', paddingHorizontal: 24 }}>
                    <View style={{ flex: 1 }} />
                    <View style={{ display: 'flex', flexDirection: 'row', justifyContent: "space-between"}}>
                        <Pressable
                            android_ripple={{ borderless: true, radius: 16 }} 
                            onPress={leaveToIntake}
                            style={{ alignItems: 'center', justifyContent: 'flex-end', display: 'flex', alignSelf: 'flex-end', flexDirection: 'row' }}
                        >
                            <XIcon />
                            <Text font="bold" style={{ paddingHorizontal: 8 }}>{tc`actions.cancel`}</Text>
                        </Pressable>
                        <RevealContent show={symptoms.length > 0}>
                            <Pressable
                                android_ripple={{ borderless: true, radius: 16 }} 
                                onPress={navigateToConcludeAssessment(conditions, asstr)}
                                style={{ alignItems: 'center', justifyContent: 'flex-end', display: 'flex', alignSelf: 'flex-end', flexDirection: 'row' }}
                            >
                                <Text font="bold" style={{ paddingHorizontal: 8 }}>{t`buttons.conclude`}</Text>
                                <NextIcon />
                            </Pressable>
                        </RevealContent>
                    </View>
                </View>
        </Layout>
    )
}