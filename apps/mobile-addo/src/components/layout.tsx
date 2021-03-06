import React from 'react'
import { Pressable, StatusBar, View, ViewProps } from 'react-native'
import { ScrollView } from 'react-native-gesture-handler'
import { SafeAreaView, SafeAreaViewProps } from 'react-native-safe-area-context'
import { ElsaIcon, ArrowBackIcon } from '../assets/vectors'
import theme from '../theme'
import { RevealContent } from './misc'
import { Heading } from './typography'

type LayoutProps = {
    wrapperStyle?: SafeAreaViewProps['style'],
    headerStyle?: ViewProps['style']
    navigation?: any | undefined
    title?: string
    
    /**
     * Overrides and forcefully hides the go back button
     */
    hideGoBack?: boolean

    /**
     * Hides header
     */
    hideHeader?: boolean
}
const BaseLayout = function ({ 
    hideGoBack = false, 
    hideHeader = false,
    navigation, 
    title, 
    wrapperStyle, 
    headerStyle,
    ...viewProps}: LayoutProps & ViewProps) {
    const goBack = React.useCallback(() => {
        if (navigation !== undefined && navigation.canGoBack()) {
            navigation.goBack()
        }
    }, [navigation])


    return (
        <SafeAreaView style={[{ flex: 1 }, wrapperStyle]}>
            <StatusBar animated backgroundColor={"#FFF"} barStyle={'dark-content'}/>
            {/* header component */}
            <RevealContent 
                show={!hideHeader}
                style={[
                    { 
                        width: '100%', 
                        display: 'flex', 
                        flexDirection: 'row', 
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        paddingVertical: 16,
                        paddingHorizontal: 16,
                        backgroundColor: '#FFF',
                        // backgroundColor: 'pink',
                    },
                    headerStyle
                ]}
            >
                <View style={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
                    {/* Show only show if there is a back navigation, or hide override */}
                    <RevealContent style={{ marginRight: 6 }}  show={navigation !== undefined && navigation.canGoBack() && !hideGoBack}>
                        <Pressable 
                            android_ripple={{ borderless: true, radius: 16, color: theme.color.primary.light }} 
                            style={{ padding: 8 }} 
                            onPress={goBack}>
                            <ArrowBackIcon style={{ color: theme.color.primary.dark }} />
                        </Pressable>
                    </RevealContent>
                    {/* Elsa's logo */}
                    <View style={{ marginLeft: 2 }}>
                        <ElsaIcon width={25} height={25} />
                    </View>

                    {/* Should show if there is title added */}
                    <RevealContent show={title !== undefined} style={{ marginLeft: 10 }}>
                        <Heading font="bold">{title}</Heading>
                    </RevealContent>
                </View>

                {/* Right actions */}
                <View style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', backgroundColor: 'blue'}}>
                    
                </View>
            </RevealContent>
            {/* child component */}
            <View {...viewProps} style={[{ flex: 1, padding: 24, paddingTop: 8, backgroundColor: "#FFF" }, viewProps.style]} />
        </SafeAreaView>
    )
}

/**
 * Main Layout component
 */
function MainLayout (props: LayoutProps) {
    return (
        <BaseLayout {...props} />
    )
}

/**
 * Alternative layout component with different style
 */
function AltLayout (props: LayoutProps) {
    return (
        <BaseLayout {...props} />
    )
}

export {
    View,
    MainLayout as Layout,
    AltLayout
}