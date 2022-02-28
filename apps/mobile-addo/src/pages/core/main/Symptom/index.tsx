import React from 'react'
import { Layout, Text } from '../../../../components'
import { View, Pressable, FlatList } from 'react-native'

import { useSymptomsInfo } from '../../../../app/utils';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import SymptomSearchView from './search'
import theme from '../../../../theme';
import { CommonActions, useNavigation } from '@react-navigation/native';
import { Chip, RevealContent } from '../../../../components/misc';
import { CheckIcon, EyeIcon, NextIcon, PreviousIcon, SearchIcon, TrashIcon, XIcon } from '../../../../assets/vectors';
import { symptoms  as symptomsBag, useSypmtomLocale } from '../../../../app/symptoms';
import { Button } from '../../../../components/input';
import { useSAStore } from '../../../../app/context/assessment';
import { useSymptomStore } from '../../../../app/interactionSymptoms';
import { useTranslation } from 'react-i18next';
import { SymptomData, SymptomDescription, SymptomId, SymptomRecord } from '../../../../../@types';

function SymptomList () {
    const symptoms = useSymptomsInfo()
    const [reset, addSymptomFromId] = useSymptomStore(s => [s.reset, s.addSymptomFromId])
    const removeSymptom = useSAStore(s => s.removeSymptomFromId)

    const onSelectSymptom = React.useCallback((id: SymptomId, entry?: SymptomData) => {
        // reset
        reset()
        // add new symptom
        addSymptomFromId(id, entry, entry !== undefined)
    }, [reset, addSymptomFromId])

    const removeEvidence = React.useCallback((symptom: { id: string }) => () => {
        removeSymptom(symptom.id)
    }, [removeSymptom])

    const { t: tc  } = useTranslation('translation', { keyPrefix: 'common' })
    const { getSymptomById } = useSypmtomLocale()

    const RenderItem = React.useCallback(({symptom}: { symptom: (SymptomRecord & ({ data?: SymptomData,  present: boolean })) }) => {
        // console.log("ITEMS::::", symptom)
        const content = getSymptomById(symptom.id)
        return (
            <View style={{ paddingTop: 10 }}>
                <View style={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
                    {symptom.present ? (<CheckIcon width={20} height={20} />) : (<XIcon width={20} height={20} />)}
                    <Text style={{ textTransform: 'uppercase', marginLeft: 4, fontSize: 14, color: symptom.present ? 'green': 'red' }}>{symptom.present ? 'Present': 'Absent'}</Text>
                </View>
                <View style={{ paddingVertical: 4, flex: 1 }}>
                    <Text font="bold" style={{ marginBottom: 3, fontSize: 18, textTransform: 'capitalize' }}>{ content.symptom }</Text>
                    <Text>{content.description}</Text>
                </View>
                <View style={{ display: 'flex', flexDirection: 'row', }}>
                    <View style={{flex: 1}} />
                    <Chip onPress={removeEvidence(symptom)}>
                        <TrashIcon width={18} height={18} style={{ color: theme.color.secondary.base }} />
                    </Chip>
                    <RevealContent show={symptom.present}>
                        <Chip
                            onPress={() => {
                                const { present, data = {} } = symptom 
                                // setup the symptoms
                                if (present) {
                                    onSelectSymptom(symptom.id as SymptomId, data as SymptomData)
                                } else {
                                    // this is never clicked
                                    onSelectSymptom(symptom.id as SymptomId)
                                }
                            }}
                            style={{ marginLeft: 6, display: 'flex', alignSelf: 'flex-end', padding: 4, paddingHorizontal: 18, flexDirection: 'row' }}
                        >
                            <Text style={{ color: theme.color.secondary.base }}>{tc`show`}</Text>
                            <EyeIcon width={18} height={18} style={{ marginLeft: 10, color: theme.color.secondary.base }} />
                        </Chip>
                    </RevealContent>
                </View>
            </View>
        )
    }, [])

    const renderSymptom = React.useCallback(({item: symptom, separator}) => <RenderItem symptom={symptom} />, [])
    
    return (
        <View style={{ flex: 1 }}>
            <View style={{ display: 'flex', marginVertical: 4, flexDirection: 'column', flex: 1 }}>
                <FlatList 
                    data={symptoms}
                    renderItem={renderSymptom}
                />
            </View>
        </View>
    )
}

function MainView ({ route }) {
    const navigation = useNavigation()

    const [reset, addSymptomFromDescription] = useSymptomStore(s => [s.reset, s.addSymptomFromDescription])
    const symptoms = useSymptomsInfo()

    React.useEffect(() => {
        const { description: sym = undefined, entry, present } = route.params || {} as { refIndex: number, description: SymptomDescription, entry?: SymptomData, present?: boolean }
        // console.log({sym, entry})
        reset()

        if (sym !== undefined) {
            // console.log("Information:", sym)
            addSymptomFromDescription(sym, entry, present)
        }
    }, [route])


    const { t } = useTranslation('translation', { keyPrefix: 'assessment.manage' }) 
    const { t: tc } = useTranslation('translation', { keyPrefix: 'common' }) 
  
    return (
        <Layout title={t`title`} style={{ paddingHorizontal: 0 }} navigation={navigation}>
            <View style={{ flex: 1, zIndex: 1 }}>
                <View style={{ flex: 1, paddingHorizontal: 24 }}>
                    {/* dummy search */}
                    <Pressable 
                        onPress={() => navigation.navigate('symptom.search')}
                        style={{ 
                            width: '100%', 
                            borderColor: theme.color.primary.base, 
                            borderWidth: 1,
                            borderRadius: 6,
                            display: 'flex',
                            flexDirection: 'row',
                            paddingHorizontal: 12,
                            paddingVertical: 14, 
                            marginBottom: 10,
                        }}
                    >
                        {/* Icon */}
                        <View style={{ alignSelf: 'flex-start' }}>
                            <SearchIcon width={20} height={20} style={{ color: theme.color.secondary.dark }} />
                        </View>

                        {/* Dummy input */}
                        <View style={{ flex: 1, marginLeft: 8 }}>
                            <Text style={{ color: "#777" }}>{t`search_text`}</Text>
                        </View>
                    </Pressable>

                    {/* body */}
                    {/* If there is a list of items to show */}
                    <RevealContent style={{ flex: 1 }} show={symptoms.length !== 0}>
                        <Text>{tc`symptom.other`}</Text>
                        <SymptomList />
                    </RevealContent>

                    {/* If there is no items to show */}
                    <RevealContent style={{ paddingHorizontal: 0 }} show={symptoms.length === 0}>
                        <View>
                            <Text font="bold" style={{ marginBottom: 3 }}>{t`no_symptoms.text`}</Text>
                            <Text>{t`no_symptoms.description`}</Text>
                        </View>
                    </RevealContent>
                </View>

                <View style={{ paddingHorizontal: 24 }}>
                    <Button 
                        outline 
                        onPress={() => {
                            // navigate to the stack by resetting
                            navigation.dispatch(CommonActions.reset({
                                index: 0,
                                routes: [
                                    { name: 'summary' }
                                ]
                            }))
                        }} 
                        type="secondary" 
                        title={t`see_insights`}
                    />
                </View>
            </View>
            {/* New Symptom */}
        </Layout>
    )
}

const Stack = createNativeStackNavigator();


export default function SymptomView () {
    return (
        <Stack.Navigator screenOptions={{ headerShown: false }}>
            <Stack.Screen name="symptom.main" component={MainView} />
            <Stack.Screen name="symptom.search" component={SymptomSearchView} />
        </Stack.Navigator>
    )
}
