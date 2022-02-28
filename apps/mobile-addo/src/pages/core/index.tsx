/**
 * This is the starting point of the application
 */
import React from 'react'
import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'

// import IntroView from '../intro'
import IntakeView from './intake'
import MainView from './main'
import HistoryView from '../history'


const Stack = createNativeStackNavigator()

export default function MainApp () {
    return (
        <Stack.Navigator screenOptions={{ headerShown: false }}>
            <Stack.Screen name="intake" component={IntakeView} />
            <Stack.Screen name="main" component={MainView} />
        </Stack.Navigator>
    )
}
