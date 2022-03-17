import { ColorValue, PressableProps as PressableProps$1 } from 'react-native';

declare type PressableProps = {
    ripple_color?: ColorValue;
} & Omit<PressableProps$1, "android_ripple">;
declare function Pressable({ ripple_color, ...props }: PressableProps): JSX.Element;
declare const pressableStyle: {
    container: {
        display: "flex";
        flexDirection: "row";
        alignItems: "center";
        justifyContent: "space-around";
    };
    button: {
        borderRadius: number;
        padding: number;
        paddingHorizontal: number;
    };
};

export { Pressable, pressableStyle };
