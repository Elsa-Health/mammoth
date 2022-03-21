import React__default from 'react';
import { ViewProps, PressableProps, TextProps } from 'react-native';
import { SectionedMultiSelectProps } from 'react-native-sectioned-multi-select';

declare type ChipProps = PressableProps & {
    text?: string;
    textStyle?: TextProps["style"];
};
declare function Chip({ text, children, style, ...other }: ChipProps): JSX.Element;
declare type SelectableChipProps = ChipProps & {
    selected?: boolean;
    onChange?: (state?: boolean) => void;
};
declare function SelectableChip({ selected, onChange: onChange, onPress, ...other }: SelectableChipProps): JSX.Element;
declare const chipStyles: {
    default: {
        padding: number;
        paddingHorizontal: number;
        borderWidth: number;
        borderRadius: number;
        borderColor: string;
        width: string;
        elevation: number;
        margin: number;
        alignSelf: "flex-start";
        shadowColor: string;
        shadowOffset: {
            width: number;
            height: number;
        };
        backgroundColor: string;
        shadowOpacity: number;
        shadowRadius: number;
    };
    selected: {
        borderWidth: number;
        borderColor: string;
        backgroundColor: string;
    };
    selectedText: {
        color: string;
    };
};
declare function RevealContent({ show, children, style, }: {
    show: boolean;
    children: React__default.ReactNode;
    style?: ViewProps["style"];
}): JSX.Element | null;
declare const iconToggle: (name: string, style?: object) => JSX.Element | null;
declare function SectionedSelect<T>(props: Omit<SectionedMultiSelectProps<T>, "styles" | "IconRenderer">): JSX.Element;

export { Chip, RevealContent, SectionedSelect, SelectableChip, chipStyles, iconToggle };
