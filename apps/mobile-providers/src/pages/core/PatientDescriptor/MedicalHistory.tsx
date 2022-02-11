import produce from 'immer'
import { capitalize, kebabCase } from 'lodash'
import React from 'react'
import { ScrollView, StyleSheet, View } from 'react-native'
import { Layout, Text } from '../../../components'
import { Button, TextInput } from '../../../components/input'
import { RevealContent, SectionedSelect, SelectableChip } from '../../../components/misc'

import { StackActions, useNavigation } from '@react-navigation/native'
import { usePatientDescription } from './context'

type MedicationHistoryForm = {
    previous: boolean,
    timeHospitalized: string | undefined,
    bloodTransfusion: boolean
}

export type MedicationHistory = {
    previous: boolean,
    timeHospitalized: number | undefined,
    bloodTransfusion: boolean
}

const standardizeData = (data: MedicationHistoryForm): MedicationHistory => {
    const { previous, timeHospitalized, bloodTransfusion } = data
    return {
        previous,
        timeHospitalized: timeHospitalized ? parseInt(timeHospitalized) : undefined,
        bloodTransfusion
    }
}

/**
 * Convert input from `MedicationHistory` type to `MedicationHistoryForm`
 */
const revertData = (data: MedicationHistory) => {
    const { previous, timeHospitalized, bloodTransfusion } = data
    return {
        previous,
        timeHospitalized: timeHospitalized ? (timeHospitalized.toString()) : undefined,
        bloodTransfusion
    }
}

const DEFAULT_MEDICAL_HISTORY_STATE = {
        previous: true,
        timeHospitalized: undefined,
        bloodTransfusion: false
    }

export default function MedicalHistory () {
    const navigation = useNavigation()
    
    const medicalHistory = usePatientDescription(s => s.medicalHistory)
    const [vals, setVals] = React.useState<MedicationHistoryForm>(() => medicalHistory !== undefined ? revertData(medicalHistory): DEFAULT_MEDICAL_HISTORY_STATE)

    const setMedicalHistory = usePatientDescription(s => (medicalHistory: MedicationHistory) => s.setData({ medicalHistory }))


    return (        
        <Layout navigation={navigation} title={"Medical History"} style={{ padding: 0, paddingTop: 0 }} hideLogo>
            <ScrollView  style={{ flex: 1, paddingHorizontal: 24, paddingVertical: 8,  }}>
                <View style={{ marginBottom: 8 }}>
                    <Text>Has the patient had previous hospitalization?</Text>
                    <View style={{ display: 'flex', flexDirection: 'row', marginVertical: 4 }}>
                        <SelectableChip text="Yes" selected={vals?.previous} onPress={() => setVals(k => produce(k, df => { df['previous'] = true }))}/>
                        <SelectableChip text="No" selected={!vals?.previous} onPress={() => setVals(k => produce(k, df => { df['previous'] = false; df['timeHospitalized'] = undefined }))}/>
                    </View>
                </View>

                <RevealContent show={vals.previous} style={{ marginBottom: 8 }}>
                    <Text>For how long were they hospitalized?</Text>
                    <View>
                        <TextInput placeholder="Years" value={vals.timeHospitalized} onChangeText={text => setVals(k => produce(k, df => { df['timeHospitalized'] = text }))} keyboardType="numeric" style={[sty.numberText, { width: '33%'}]} />
                    </View>
                </RevealContent>

                <View style={{ marginBottom: 8 }}>
                    <Text>Has the patient ever had a blood transfusion?</Text>
                    <View style={{ display: 'flex', flexDirection: 'row', marginVertical: 4 }}>
                        <SelectableChip text="Yes" selected={vals?.bloodTransfusion} onPress={() => setVals(k => produce(k, df => { df['bloodTransfusion'] = true }))}/>
                        <SelectableChip text="No" selected={!vals?.bloodTransfusion} onPress={() => setVals(k => produce(k, df => { df['bloodTransfusion'] = false;}))}/>
                    </View>
                </View>
            </ScrollView>
            <View style={{ paddingHorizontal: 24, marginVertical: 6 }}>
                <Text style={{ fontSize: 14, color: "#777", marginBottom: 6 }}>Clicking next would save the latest medical history information for the user</Text>
                <Button onPress={() => {
                    setMedicalHistory(standardizeData(vals))
                    navigation.dispatch(
                        StackActions.push(
                            'patient.history.dietary', 
                            // produceData(data)
                        )
                    )
                }} title="Next: Dietary Information" />
            </View>
        </Layout>
    )
}


const sty = StyleSheet.create({
    numberText: { 
        borderWidth: 0, 
        borderBottomWidth: 1, 
        fontSize: 18, 
        alignSelf: 'baseline', 
    },
})
