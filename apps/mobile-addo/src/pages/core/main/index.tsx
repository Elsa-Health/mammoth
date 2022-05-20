import React from 'react'
import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'

// Screens
import SummaryScreen from './Summary'
import SymptomScreen from './Symptom'
import AssessmentScreen from './FinalAssessment'

import { SymptomAssessmentSequenceProvider } from '../../../app/context/assessment'
import { BottomSheetInteractionProvider } from '../../../app/interactionSymptoms'


const Stack = createNativeStackNavigator<{
    summary: undefined,
    symptom: undefined,
    assessment: undefined
}>()

export default function MainApp ({ route }: any) {
    if (route?.params === undefined) {
        // console.log({route}) 
        throw Error("Params object is undefined. Make sure to reach to this page, you've passed through navigation")
    }

    return (
        <SymptomAssessmentSequenceProvider initialState={route.params}>
            <BottomSheetInteractionProvider>
                <Stack.Navigator screenOptions={{ headerShown: false }}>
                    <Stack.Screen name="summary" component={SummaryScreen} />
                    <Stack.Screen name="symptom" component={SymptomScreen} />
                    <Stack.Screen name="assessment" component={AssessmentScreen} />
                </Stack.Navigator>
            </BottomSheetInteractionProvider>
        </SymptomAssessmentSequenceProvider>
    )
}
