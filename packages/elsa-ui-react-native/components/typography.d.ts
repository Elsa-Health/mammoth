import * as styled_components from 'styled-components';
import { Text as Text$1 } from 'react-native';

declare type FontSize = "xs" | "sm" | "md" | "lg" | "xl" | "2xl";
declare const Text: styled_components.StyledComponent<typeof Text$1, any, {
    font?: "normal" | "bold" | "light" | "medium" | "black" | "extra-black" | undefined;
    italic?: boolean | undefined;
    size?: number | FontSize | undefined;
    color?: string | undefined;
}, never>;
declare const Heading: styled_components.StyledComponent<typeof Text$1, any, {
    font?: "normal" | "bold" | "light" | "medium" | "black" | "extra-black" | undefined;
    italic?: boolean | undefined;
    size?: number | FontSize | undefined;
    color?: string | undefined;
}, never>;

export { Heading, Text };
