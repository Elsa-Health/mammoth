import { ViewProps } from 'react-native';
export { View } from 'react-native';
import { SafeAreaViewProps } from 'react-native-safe-area-context';
import { ArrowBackIcon } from '../visuals/vectors';
import 'react';
import 'react-native-svg';

declare type LayoutProps = {
    wrapperStyle?: SafeAreaViewProps["style"];
    headerStyle?: ViewProps["style"];
    navigation?: any | undefined;
    title?: string;
    /** Overrides and forcefully hides the go back button */
    hideGoBack?: boolean;
    /** Hides header */
    hideHeader?: boolean;
    hideLogo?: boolean;
    testID?: string;
    backIcon?: typeof ArrowBackIcon;
} & ViewProps;
/**
 * Main Layout component
 */
declare function MainLayout(props: LayoutProps): JSX.Element;
/**
 * Alternative layout component with different style
 */
declare function AltLayout(props: LayoutProps): JSX.Element;

export { AltLayout, MainLayout as Layout };
