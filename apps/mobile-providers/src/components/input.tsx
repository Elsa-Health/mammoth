/**
 * Section for input components
 */
import React, { useState } from "react";
import { Modal, TextProps, View, ViewProps } from "react-native";
import { StyleSheet, Pressable, PressableProps } from 'react-native'

import { Text } from './typography'
import theme from '../theme'
import { TextInputProps as NativeTextInputProps, TextInput as NativeTextInput } from "react-native";
import { ColorValue } from "react-native";
import { RevealContent, SelectableChip } from "./misc";
import { PlusIcon, SearchIcon, XIcon } from "../assets/vectors";

import { Picker, PickerItemProps, PickerProps } from '@react-native-picker/picker'
import produce from "immer";
/**
 * BUTTONS SECTIONS
 * =====================================
 */

interface _BaseButtonProps extends PressableProps { 
    title?: string, 
    textStyle?: TextProps['style']
    children?: React.ReactNode
}

/**
 * BaseButton
 */
function _BaseButton ({ title, children, textStyle, ...other }: _BaseButtonProps ) {
    return (
        <Pressable {...other} android_ripple={{ color: '#000', radius: 0, foreground: true }}>
            {children || (
                <Text font='bold' style={[{ flex: 1, alignItems: 'center' }, textStyle]}>{title}</Text>
            ) || <></> }
        </Pressable>
    )
}

interface ButtonProps extends _BaseButtonProps {
    /**
     * Type of button:
     * [DEFAULT]: 'primary'
     */
    type?: 'primary' | 'secondary'
    outline?: boolean
}

export function Button ({ type = 'primary', outline = false, style, ...other }: ButtonProps) {
    // Default map
    const [buttonStyle, buttonTextStyle] = buttonStyleMap(outline)[type]

    return (
        <_BaseButton 
            {...other}
            style={[
                defaults.button, 
                buttonStyle, 
                outline ? {borderWidth: 2, borderRadius: 50 } :{}, 
                style]} 
            textStyle={[defaults.buttonText, buttonTextStyle]}
        />
    )
}


export const buttonStyles = StyleSheet.create({
    /** NORMAL VARIANTS */
    primaryButton: {
        backgroundColor: theme.color.primary.base,
    },
    secondaryButton: {
        backgroundColor: theme.color.secondary.base,
    },
    primaryButtonText: {
        color: theme.color.primary.text
    },
    secondaryButtonText: {
        color: theme.color.secondary.text
    },

    /** OUTLINE VARIANTS */
    primaryOutlineButton: {
        borderColor: theme.color.primary.base,
        backgroundColor: "#FFF"
    },
    secondaryOultineButton: {
        borderColor: theme.color.secondary.base,
        backgroundColor: "#FFF"
    },
    primaryOutlineButtonText: {
        color: theme.color.primary.dark
    },
    secondaryOutlineButtonText: {
        color: theme.color.secondary.dark
    },
})

const buttonStyleMap = (outline: boolean = false) => !outline ? ({
    'primary': [buttonStyles.primaryButton, buttonStyles.primaryButtonText],
    'secondary': [buttonStyles.secondaryButton, buttonStyles.secondaryButtonText],
}): ({
    'primary': [buttonStyles.primaryOutlineButton, buttonStyles.primaryOutlineButtonText],
    'secondary': [buttonStyles.secondaryOultineButton, buttonStyles.secondaryOutlineButtonText],    
})

/**
 * INPUT SECTION
 * =====================================
 */

interface _BaseTextInputProps extends NativeTextInputProps {}
const _BaseTextInput = React.forwardRef((props: _BaseTextInputProps, textInputRef) => {
    return (
        <NativeTextInput ref={textInputRef} {...props} />
    )
})

interface TextInputProps extends _BaseTextInputProps {
    label?: string
    containerStyle?: ViewProps['style']
}

const defaultTextLabelColor = "#777"
export function TextInput (props: TextInputProps) {
    const [color, setColor] = React.useState<ColorValue>(defaultTextLabelColor)

    /**
     * Focus
     */
    const onFocus = React.useCallback((e) => {
        setColor(theme.color.primary.base)
        props.onFocus && props.onFocus(e)
    }, [])

    /**
     * Blur
     */
    const onBlur = React.useCallback((e) => {
        setColor(defaultTextLabelColor)
        props.onBlur && props.onBlur(e)
    }, [])

    return (
        <View style={[{ position: 'relative', width: 'auto', flex: 1 }, props.containerStyle]}>
            { props.label && <Text font='bold' style={{ zIndex: 10, position: 'absolute', top: 0, left: 0, marginLeft: 8, paddingHorizontal: 4, marginTop: 8, color: color}}>{props.label}</Text> }
            <_BaseTextInput 
                {...props}
                onFocus={onFocus}
                onBlur={onBlur}
                style={[defaults.textInput, props.label !== undefined ? textStyles.labeled : {}, { borderColor: color }, props.style  ]}
            />   
        </View>
    )
}

const textStyles = StyleSheet.create({
    labeled: {
        // size of font
        paddingTop: 18,
    }
})

interface SearchInputProps extends TextInputProps {
    onClearSearch?: () => void
}
export const SearchInput = React.forwardRef<{}, SearchInputProps>((props: SearchInputProps, textInputRef) => {
    const [borderColor, setBorderColor] = React.useState<ColorValue>(defaultTextLabelColor)
    const [focus, setFocus] = React.useState(false)

    // This is useful, but is to be replaced with an icon
    const [placeholder, setPlaceHolder] = React.useState<undefined | 'clear'>(undefined)

    React.useEffect(() => {
        // Set the border color on focus
        setBorderColor(focus ? theme.color.primary.base : defaultTextLabelColor)

        // search icon
        setPlaceHolder(focus ? 'clear' :  undefined)
    }, [focus])

    const sideButtonAction = React.useCallback(() => {
        if (placeholder === 'clear') {
            // execute
            props.onClearSearch && props.onClearSearch()
        }
    }, [focus, props.onClearSearch, placeholder])

    /**
     * Focus
     */
    const onFocus = React.useCallback((e) => {
        setFocus(true)
        props.onFocus && props.onFocus(e)
    }, [])

    /**
     * Blur
     */
    const onBlur = React.useCallback((e) => {
        setFocus(false)
        props.onBlur && props.onBlur(e)
    }, [])

    
    return (
        <View style={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
            <View style={{ flex: 1, display: 'flex', flexDirection: 'row', alignItems: 'center', borderBottomWidth: 1, borderBottomColor: borderColor }}>
                <SearchIcon width={20} height={20} style={{ color: theme.color.secondary.dark, padding: 4}} />
                <_BaseTextInput 
                    {...props}
                    ref={textInputRef}
                    onFocus={onFocus}
                    onBlur={onBlur}
                    placeholder={props.placeholder || 'Search'}
                    style={[defaults.searchTextInput, { paddingLeft: 10 }, props.style ]}
                />
            </View>
            <RevealContent show={placeholder !== undefined}>
                <Pressable
                    style={{ alignSelf: 'flex-start'}}
                    onPress={sideButtonAction}
                >
                    {
                        placeholder === 'clear' ? (
                            <XIcon width={20} height={20} style={{ color: theme.color.primary.dark }} />
                        ) : null
                    }
                </Pressable>
            </RevealContent>
        </View>
    )
})

type VariableValue<T> = { input?: string | undefined, option: T }
type VariableTextInputProps<T = any> = Omit<TextInputProps, 'value' | 'onChangeText' | 'onChange'> & {
    value?: VariableValue<T>
    onChangeValue?: (value: VariableValue<T>) => void
    options: Array<{ label: string, value: T }>

    /** Styles */
    wrapperStyle?: ViewProps['style']
    textInputStyle?: TextInputProps['style']
    pickerStyle?: PickerProps['style']
    pickerItemStyle?: PickerProps['itemStyle']
    pickerItemOptionProps?: PickerItemProps
}
export function VariableTextInput <T>({ 
    options,
    wrapperStyle,
    textInputStyle,
    pickerStyle,
    pickerItemStyle,
    pickerItemOptionProps,
    value,
    onChangeValue,
    ...props 
}: VariableTextInputProps<T>) {
    const [data, set] = useState<VariableValue<T>>(() => (value || { input: undefined, option: options[0].value }))

    const changeText = React.useCallback((text: string) => set(s => produce(s, df => { df['input'] = text; return df })), [set])
    const changeOption = React.useCallback((item: T, ix: number) => set(s => produce(s, df => { df['option'] = item; return df })), [set])

    // Update changes to the onChangeValue function
    React.useEffect(() => onChangeValue && onChangeValue(data), [data, onChangeValue])

    return (
        <View 
            style={[{ 
                display: 'flex', 
                flexDirection: 'row', 
                alignItems: 'center', 
                justifyContent: 'space-between', 
                borderColor: "#ccc",
                borderWidth: 1,
                borderRadius: 2,
            }, wrapperStyle]}
        >
            <_BaseTextInput 
                {...props}
                value={data.input}
                onChangeText={changeText}
                style={[layoutStyle.input, fontStyle.normal, { flex: 1 }]}
            />
            <Picker
                style={[{ flex: 0.6, borderRadius: 100 }, fontStyle.normal, pickerStyle]}
                itemStyle={[{ backgroundColor: 'pink' }, fontStyle.normal, pickerItemStyle]}
                selectedValue={data.option}
                onValueChange={changeOption}
            >
                {
                    options.map(s => (
                        <Picker.Item {...pickerItemOptionProps} style={[fontStyle.normal, {  }]} key={s.value} {...s} />
                    ))
                }
            </Picker>
        </View>
    )
}

const fontStyle = StyleSheet.create({
    normal: {
        fontFamily: "AvenirLTStd-Roman",
    }    
})

const layoutStyle = StyleSheet.create({
    input: {
        padding: 6,
        paddingHorizontal: 10,
        margin: 2,
    }
})

/**
 * Default styles for everything
 * NOTE: you may want to move this to textInput
 */
export const defaults = StyleSheet.create({
    textInput: {
        ...layoutStyle.input,
        fontFamily: "AvenirLTStd-Roman",
        borderWidth: 1,
        borderRadius: 2,
    },

    searchTextInput: {
        padding: 6,
        paddingHorizontal: 10,
        paddingLeft: 0,
        margin: 2,
        fontFamily: "AvenirLTStd-Roman",
        fontSize: 16,
        flex: 1,
    },

    button: {
        padding: 8, 
        margin: 2,
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center',
        alignSelf: 'flex-start',
        borderRadius: 40,
        elevation: 1
    },
    buttonText: {
        textAlign: 'center',
        fontSize: 18,
    }
})



type ConfigItem = {
    // default => false 
    required?: boolean
    show?: boolean,
}
type MultiInputConfiguration<T extends string> = {
    [key in T]?: ConfigItem
}
export type MField<T> = {
    name: T,
    label: string
    component: (props: { 
        value: string | undefined, 
        onChangeValue: (value: string) => void 
    }) => JSX.Element
}
type _MultiVisible<T extends string> = { [key in T]: boolean }
type MultiInputValue<T extends string> = { [key in T]?: string | undefined }
type MultiInputProps<T extends string> = {
    optionsText?: string
    title: string
    fields: Array<MField<T>>
    configuration?: MultiInputConfiguration<T>
    initialValue?: MultiInputValue<T>
    onChangeValue?: (value: MultiInputValue<T>) => void
    component: (props: {
        label: string, 
        name: T, 
        component: (value: string | undefined, onChangeValue: (value: string) => void) => React.ReactNode, 
        value: string | undefined, 
        onChangeValue: (value: string) => void
    }) => React.ReactNode
} & ViewProps
export function MultiInput <T extends string>({ title, fields, configuration = {}, initialValue = {}, onChangeValue, optionsText = "Options to show", component: HouseComponent, ...props }: MultiInputProps<T>) {
    const config = React.useMemo(() => normalizeConifiguration(fields, configuration), [fields, configuration])
    const [data, set] = useState<MultiInputValue<T>>(initialValue)
    const [visible, setVisible] = useState<_MultiVisible<T>>(() => {
        const t = {}
        fields.forEach(f => {
            const s = config[f.name]; 
            t[f.name] = s.required ? true: s.show;
        })
        return t
    })

    const [modalVisible, setModalVisible] = useState(false)

    React.useEffect(() => {
        onChangeValue && onChangeValue(data)
    }, [data, onChangeValue])

    const onChangeComponentValue = React.useCallback((name: T) => (value: string) => {
        set(s => produce(s, df => { df[name] = value; return df }))
    }, [set])

    return (
        <>
            <Modal
                animationType="fade"
                transparent
                visible={modalVisible}
                onRequestClose={() => setModalVisible(false)}
            >
                <View style={multiInputStyles.centeredView}>
                    <View style={multiInputStyles.modalView}>
                        <Text font="bold" style={{ textTransform: 'uppercase' }}>{optionsText}</Text>
                        <View style={{ flexDirection: 'row', flexWrap: 'wrap', display: 'flex' }}>
                        {
                            fields
                                .map(({ name, label }, ix) => {
                                    return (
                                        <SelectableChip
                                            style={{ margin: 4 }}
                                            selected={visible[name]} 
                                            key={`${name}-${ix}`} text={label} 
                                            onChange={() => {
                                                if (!config[name].required) {
                                                    setVisible(s => produce(s, df => {
                                                        df[name] = !s[name]
                                                    }))
                                                }
                                            }} 
                                        />
                                    )
                                })
                        }
                        </View>

                        <Button
                            title="Close"
                            onPress={() => setModalVisible(!modalVisible)} />
                    </View>
                </View>
            </Modal>
            <View style={[{ padding: 4, paddingVertical: 10 }, props.style]}>
                <View style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
                    <Text font="bold" style={{ fontSize: 16 }}>{title}</Text>
                    <Pressable
                        android_ripple={{ borderless: true, radius: 16 }} 
                        onPress={() => setModalVisible(true)} 
                        style={{ padding: 4 }}
                    >
                        <PlusIcon />
                    </Pressable>
                </View>
                <View>
                    {
                        fields
                            .filter(p => visible[p.name])
                            .map(({ label, name, component: Component }, ix) => (
                                <React.Fragment 
                                    key={`${label}-${ix}`}
                                >
                                    <HouseComponent label={label} name={name} component={Component} value={data[name]} onChangeValue={onChangeComponentValue(name)} />
                                </React.Fragment>
                            ))
                    }
                </View>
            </View>
        </>
    )
}

function normalizeConifiguration <T extends string> (fields: Array<MField<T>>, configuration: MultiInputConfiguration<T>) {
    const s = {}
    fields.map(({ name }) => {
        const { required = false, show = false } = configuration[name] || {}
        s[name] = { required, show }
    })

    return s
}



const multiInputStyles = StyleSheet.create({
    centeredView: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: 'rgba(0,0,0, 0.2)'
    },
    modalView: {
        padding: 10,
        backgroundColor: "white",
        borderRadius: 2,
        width: '90%',
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5
    },
});


