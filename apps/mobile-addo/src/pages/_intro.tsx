/**
 * RETHINKING ABOUT USING THIS PAGE
 */
import { useNavigation } from '@react-navigation/core'
import { StackActions } from '@react-navigation/native'
import React from 'react'
import { View } from 'react-native'
import { HealthSolutionIllustration } from '../assets/illustrations'
import { ElsaIcon } from '../assets/vectors'
import { Layout, Text } from '../components'
import { Button } from '../components/input'

/** This is the actual intro view to introduce the flow */
export default function IntroView () {
    const navigation = useNavigation()
    return (
        <Layout hideHeader>
            <View style={{ flex: 1 }}>
                <View style={{ display: 'flex', width: '100%', justifyContent: 'center', marginVertical: 16  }}>
                    <ElsaIcon width={30} height={30} />
                    <Text font="extra-black" style={{ fontSize: 26, marginTop: 12 }}>Symptom Assessment</Text>
                </View>
                <View style={{ width: "100%", padding: 24 }}>
                    <HealthSolutionIllustration height={450} />
                </View>
                <View style={{ flex: 1 }}>
                    <Text>
                        We are making it possible to do symptom assessment. Click below to begin the assessment.
                    </Text>
                </View>
            </View>
            <View>
                <Button title="Begin assessment" onPress={() => navigation.dispatch(StackActions.push('intake'))} />
            </View>
        </Layout>
    )
}
