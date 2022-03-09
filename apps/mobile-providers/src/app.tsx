import { NavigationContainer } from "@react-navigation/native";
import React from "react";
import SplashScreen from "react-native-splash-screen";

import LabFlow from "./@workflows/flows/Lab";

import {
	Provider as PaperProvider,
	DefaultTheme,
	configureFonts,
} from "react-native-paper";
import theme, { fontFamilyStyle } from "./theme";
import { LanguageProvider } from "./app/locale/config";

const fontConfig = {
	regular: {
		fontFamily: fontFamilyStyle({ font: "normal" }),
		fontWeight: "normal",
	},
	medium: {
		fontFamily: fontFamilyStyle({ font: "medium" }),
		fontWeight: "normal",
	},
	light: {
		fontFamily: fontFamilyStyle({ font: "light" }),
		fontWeight: "normal",
	},
	thin: {
		fontFamily: fontFamilyStyle({ font: "light" }),
		fontWeight: "normal",
	},
};

const paperTheme = {
	...DefaultTheme,
	fonts: configureFonts({ android: fontConfig, ios: fontConfig }),
	roundness: 6,
	colors: {
		...DefaultTheme.colors,
		primary: theme.color.primary.base,
		accent: theme.color.secondary.base,
	},
};

export default function () {
	React.useEffect(() => {
		SplashScreen.hide();
	}, []);
	return (
		<LanguageProvider>
			<PaperProvider theme={paperTheme}>
				<NavigationContainer theme={{ colors: { background: "#FFF" } }}>
					<LabFlow />
				</NavigationContainer>
			</PaperProvider>
		</LanguageProvider>
	);
}
