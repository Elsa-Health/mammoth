import * as _react_native_picker_picker_typings_Picker from '@react-native-picker/picker/typings/Picker';
import React__default from 'react';
import { ViewProps, PressableProps, TextProps, TextInputProps as TextInputProps$1 } from 'react-native';
import { PickerProps, PickerItemProps } from '@react-native-picker/picker';

/**
 * BUTTONS SECTIONS
 * =====================================
 */
interface _BaseButtonProps extends PressableProps {
    title?: string;
    textStyle?: TextProps["style"];
    children?: React__default.ReactNode;
}
/**
 * BaseButton
 */
declare function _BaseButton({ title, children, textStyle, ...other }: _BaseButtonProps): JSX.Element;
interface ButtonProps extends _BaseButtonProps {
    /**
     * Type of button:
     * [DEFAULT]: 'primary'
     */
    type?: "primary" | "secondary";
    outline?: boolean;
}
declare function Button({ type, outline, style, ...other }: ButtonProps): JSX.Element;
declare const buttonStyles: {
    /** NORMAL VARIANTS */
    primaryButton: {
        backgroundColor: string;
    };
    secondaryButton: {
        backgroundColor: string;
    };
    primaryButtonText: {
        color: string;
    };
    secondaryButtonText: {
        color: string;
    };
    /** OUTLINE VARIANTS */
    primaryOutlineButton: {
        borderColor: string;
        backgroundColor: string;
    };
    secondaryOultineButton: {
        borderColor: string;
        backgroundColor: string;
    };
    primaryOutlineButtonText: {
        color: string;
    };
    secondaryOutlineButtonText: {
        color: string;
    };
};
declare const buttonStyleMap: (outline?: boolean) => {
    primary: ({
        backgroundColor: string;
    } | {
        color: string;
    })[];
    secondary: ({
        backgroundColor: string;
    } | {
        color: string;
    })[];
};
/**
 * INPUT SECTION
 * =====================================
 */
interface _BaseTextInputProps extends TextInputProps$1 {
}
declare const _BaseTextInput: React__default.ForwardRefExoticComponent<_BaseTextInputProps & React__default.RefAttributes<unknown>>;
interface TextInputProps extends _BaseTextInputProps {
    label?: string;
    containerStyle?: ViewProps["style"];
}
declare const TextInput: React__default.ForwardRefExoticComponent<TextInputProps & React__default.RefAttributes<unknown>>;
declare const textStyles: {
    labeled: {
        paddingTop: number;
    };
};
interface SearchInputProps extends TextInputProps {
    onClearSearch?: () => void;
}
declare const SearchInput: React__default.ForwardRefExoticComponent<SearchInputProps & React__default.RefAttributes<{}>>;
declare type VariableValue<T> = {
    input?: string | undefined;
    option: T;
};
declare const VariableTextInput: React__default.ForwardRefExoticComponent<Omit<TextInputProps, "onChange" | "onChangeText" | "value"> & {
    value?: VariableValue<unknown> | undefined;
    onChangeValue?: ((value: VariableValue<unknown>) => void) | undefined;
    options: {
        label: string;
        value: unknown;
    }[];
    /** Styles */
    wrapperStyle?: ViewProps["style"];
    textInputStyle?: TextInputProps["style"];
    pickerStyle?: PickerProps["style"];
    pickerItemStyle?: PickerProps["itemStyle"];
    pickerItemOptionProps?: PickerItemProps<_react_native_picker_picker_typings_Picker.ItemValue> | undefined;
} & React__default.RefAttributes<unknown>>;
declare const fontStyle: {
    normal: {
        fontFamily: string;
    };
};
declare const layoutStyle: {
    input: {
        padding: number;
        paddingHorizontal: number;
        margin: number;
    };
};
/**
 * Default styles for everything
 * NOTE: you may want to move this to textInput
 */
declare const defaults: {
    textInput: {
        fontFamily: string;
        borderWidth: number;
        borderRadius: number;
        padding: number;
        paddingHorizontal: number;
        margin: number;
    };
    searchTextInput: {
        padding: number;
        paddingHorizontal: number;
        paddingLeft: number;
        margin: number;
        fontFamily: string;
        fontSize: number;
        flex: number;
    };
    button: {
        padding: number;
        margin: number;
        display: "flex";
        flexDirection: "row";
        justifyContent: "center";
        alignSelf: "flex-start";
        borderRadius: number;
        elevation: number;
    };
    buttonText: {
        textAlign: "center";
        fontSize: number;
    };
};
declare type ConfigItem = {
    required?: boolean;
    show?: boolean;
};
declare type MultiInputConfiguration<T extends string> = {
    [key in T]?: ConfigItem;
};
declare type MField<T> = {
    name: T;
    label: string;
    component: (props: {
        value: string | undefined;
        onChangeValue: (value: string) => void;
    }) => JSX.Element;
};
declare type MultiInputValue<T extends string> = {
    [key in T]?: string | undefined;
};
declare type MultiInputProps<T extends string> = {
    optionsText?: string;
    title: string;
    fields: Array<MField<T>>;
    configuration?: MultiInputConfiguration<T>;
    initialValue?: MultiInputValue<T>;
    onChangeValue?: (value: MultiInputValue<T>) => void;
    component: (props: {
        label: string;
        name: T;
        component: (value: string | undefined, onChangeValue: (value: string) => void) => React__default.ReactNode;
        value: string | undefined;
        onChangeValue: (value: string) => void;
    }) => JSX.Element;
} & ViewProps;
declare function MultiInput<T extends string>({ title, fields, configuration, initialValue, onChangeValue, optionsText, component: HouseComponent, ...props }: MultiInputProps<T>): JSX.Element;
declare function normalizeConifiguration<T extends string>(fields: Array<MField<T>>, configuration: MultiInputConfiguration<T>): {
    [x: string]: {
        required: boolean;
        show: boolean;
    };
};
declare const multiInputStyles: {
    centeredView: {
        flex: number;
        justifyContent: "center";
        alignItems: "center";
        backgroundColor: string;
    };
    modalView: {
        padding: number;
        backgroundColor: string;
        borderRadius: number;
        width: string;
        shadowColor: string;
        shadowOffset: {
            width: number;
            height: number;
        };
        shadowOpacity: number;
        shadowRadius: number;
        elevation: number;
    };
};

export { Button, ButtonProps, MField, MultiInput, SearchInput, SearchInputProps, TextInput, VariableTextInput, VariableValue, _BaseButton, _BaseTextInput, buttonStyleMap, buttonStyles, defaults, fontStyle, layoutStyle, multiInputStyles, normalizeConifiguration, textStyles };
