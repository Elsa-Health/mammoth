declare type fontFamiliStyleType = "light" | "normal" | "medium" | "bold" | "black" | "extra-black";
declare const fontFamilyStyle: (props?: {
    italic?: boolean;
    font?: fontFamiliStyleType;
}) => "AvenirLTStd-Roman" | "AvenirLTStd-LightOblique" | "AvenirLTStd-MediumOblique" | "AvenirLTStd-HeavyOblique" | "AvenirLTStd-BookOblique" | "AvenirLTStd-BlackOblique" | "AvenirLTStd-Oblique" | "AvenirLTStd-Light" | "AvenirLTStd-Medium" | "AvenirLTStd-Heavy" | "AvenirLTStd-Book" | "AvenirLTStd-Black";
declare const Color: {
    primary: {
        base: string;
        light: string;
        dark: string;
        text: string;
    };
    secondary: {
        base: string;
        light: string;
        dark: string;
        text: string;
    };
};
declare const Spacing: {
    xs: number;
    sm: number;
    md: number;
    lg: number;
    xl: number;
    "2xl": number;
};
declare const Typography: {
    fontFamilyStyle: (props?: {
        italic?: boolean;
        font?: fontFamiliStyleType;
    }) => "AvenirLTStd-Roman" | "AvenirLTStd-LightOblique" | "AvenirLTStd-MediumOblique" | "AvenirLTStd-HeavyOblique" | "AvenirLTStd-BookOblique" | "AvenirLTStd-BlackOblique" | "AvenirLTStd-Oblique" | "AvenirLTStd-Light" | "AvenirLTStd-Medium" | "AvenirLTStd-Heavy" | "AvenirLTStd-Book" | "AvenirLTStd-Black";
    sizes: {
        xs: string;
        sm: string;
        md: string;
        lg: string;
        xl: string;
        "2xl": string;
    };
};
declare const _default: {
    /**
     * Created from:
     * https://material.io/resources/color/#!/?view.left=0&view.right=1&primary.color=4666ae&secondary.color=00796B
     */
    color: {
        primary: {
            base: string;
            light: string;
            dark: string;
            text: string;
        };
        secondary: {
            base: string;
            light: string;
            dark: string;
            text: string;
        };
    };
    typography: {
        fontFamilyStyle: (props?: {
            italic?: boolean | undefined;
            font?: fontFamiliStyleType | undefined;
        }) => "AvenirLTStd-Roman" | "AvenirLTStd-LightOblique" | "AvenirLTStd-MediumOblique" | "AvenirLTStd-HeavyOblique" | "AvenirLTStd-BookOblique" | "AvenirLTStd-BlackOblique" | "AvenirLTStd-Oblique" | "AvenirLTStd-Light" | "AvenirLTStd-Medium" | "AvenirLTStd-Heavy" | "AvenirLTStd-Book" | "AvenirLTStd-Black";
        sizes: {
            xs: string;
            sm: string;
            md: string;
            lg: string;
            xl: string;
            "2xl": string;
        };
    };
    spacing: {
        xs: number;
        sm: number;
        md: number;
        lg: number;
        xl: number;
        "2xl": number;
    };
};

export { Color, Spacing, Typography, _default as default, fontFamiliStyleType, fontFamilyStyle };
