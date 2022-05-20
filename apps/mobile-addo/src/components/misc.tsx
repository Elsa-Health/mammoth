import React from 'react'
import { TextProps, ViewProps } from 'react-native'
import { Pressable, PressableProps, StyleSheet, View } from 'react-native'
import SectionedMultiSelect, { SectionedMultiSelectProps } from 'react-native-sectioned-multi-select'
import { CheckCircleIcon, ChevronDownIcon, MenuAltIcon, SearchIcon, XIcon } from '../assets/vectors'
import theme from '../theme'
import { Text } from './typography'


type ChipProps = PressableProps & { text?: string, textStyle?: TextProps['style'] }
export function Chip ({ text, children, style, ...other }: ChipProps) {
    return (
        <Pressable 
            android_ripple={{ radius: 20, color: theme.color.secondary.light }} 
            style={[
                chipStyles.default,
                style
            ]} 
            {...other}
        >
            { children || <Text font='medium' style={[{ fontSize: 15, textAlign: 'center' }, other.textStyle]}>{text || ""}</Text> }
        </Pressable>
    )
}

type SelectableChipProps = ChipProps & { selected?: boolean, onChange?: (state?: boolean) => void }
export function SelectableChip ({ selected, onChange: onTogglePress, onPress, ...other }: SelectableChipProps) {
    // React.useEffect(() => {
    //     onTogglePress && onTogglePress(selected)
    // }, [selected])

    const _onPressChip = React.useCallback((e) => {
        onTogglePress && onTogglePress(selected)
        onPress && onPress(e)
    }, [selected])

    return (
        <Chip 
            {...other}
            style={[selected ? chipStyles.selected : {}, other.style]}
            textStyle={[selected ? chipStyles.selectedText : {}, other.textStyle]}
            // NOTE: you might want to remove this here
            onPress={_onPressChip}
        />
    )
}

export const chipStyles = StyleSheet.create({
    default: {
        padding: 6, 
        paddingHorizontal: 16,
        borderWidth: 2,
        borderRadius: 20, 
        borderColor: theme.color.secondary.base,
        width: 'auto',
        elevation: 1,
        margin: 1, 
        alignSelf: 'flex-start',
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 1,
        },
        backgroundColor: '#FFF',
        shadowOpacity: 0.22,
        shadowRadius: 2.22,
    },
    selected: {
        borderWidth: 2, 
        borderColor: theme.color.secondary.dark,
        backgroundColor: theme.color.secondary.base
    },
    selectedText: {
        color: "#FFFFFF",
    },
})


export function RevealContent ({ show, children, style }: { show: boolean, children: React.ReactNode, style?: ViewProps['style'] }) {
    if (!show) {
        return null
    }

    return (
        <React.Fragment>
            <View style={style}>
                {children}
            </View>
        </React.Fragment>
    )
}

export function SectionedSelect <T>(props: Omit<SectionedMultiSelectProps<T>, 'styles'>) {
    return (
        <SectionedMultiSelect
            // items={searchableConditions}
            IconRenderer={props => {
                if (props.name === 'close') { return <XIcon style={{ color: theme.color.secondary.base, size: 10 }} /> }
                if (props.name === 'check') { return <CheckCircleIcon style={props.style} /> }
                if (props.name === 'search') { return <SearchIcon style={props.style} /> }
                if (props.name === 'keyboard-arrow-down') { return <ChevronDownIcon style={props.style} /> }
                return null
            }}
            subKey="children"
            // searchPlaceholderText="Select conditions"
            // selectText="Choose conditions"
            showDropDowns={false}
            expandDropDowns                
            readOnlyHeadings={true}
            // onSelectedItemsChange={(items) => setSelectedItems(items)}
            // selectedItems={selectedItems}
            {...props}          
            styles={{
                selectToggle: { padding: 8, paddingHorizontal: 12, marginVertical: 8, borderColor: theme.color.primary.base, borderWidth: 2, borderRadius: 10 },
                selectToggleText: { fontFamily: theme.typography.fontFamilyStyle(), color: theme.color.primary.dark },
                selectedItem: { backgroundColor: `#CCCCCC55` },
                itemText: { fontFamily: theme.typography.fontFamilyStyle({ font: 'bold' }), textTransform: 'uppercase', fontSize: 18 },
                subItemText: { fontFamily: theme.typography.fontFamilyStyle({ font: 'normal' }), fontSize: 16, paddingHorizontal: 8 },
                selectedSubItemText: { fontFamily: theme.typography.fontFamilyStyle({ font: 'medium', italic: true }) },
                chipText: { fontFamily: theme.typography.fontFamilyStyle({ font: 'medium' }), fontSize: 14, color: theme.color.secondary.dark },
                chipContainer: [chipStyles.default, { paddingHorizontal: 6 }],
                confirmText: { fontFamily: theme.typography.fontFamilyStyle({ font: 'bold' }) },
                chipIcon: { borderRadius: 100, padding: 14 },
            }}
            style={{ backgroundColor: 'red' }}
        />
    )
}
