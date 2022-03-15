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
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import EmailPasswordAuthenticationScreen from "./@workflows/screens/EmailPasswordAuthentication";
import { withFlowContext } from "./@workflows/wrapper";

import MMKV from "react-native-mmkv";

import { buildStore } from "./@libs/storage-core";
import MMKVStore from "./@libs/storage-stores/local/react-native-mmkv";
import deviceStorage from "./app/storage";

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
		background: "#FFF",
		primary: theme.color.primary.base,
		accent: theme.color.secondary.base,
	},
};

const Stack = createNativeStackNavigator();
const store = deviceStorage();

// Creating the collections if they don't exist
store.collection("visits").create({ checkIfExists: true });
store.collection("patients").create({ checkIfExists: true });
store.collection("investigations").create({ checkIfExists: true });
store.collection("investigation.results").create({ checkIfExists: true });

export default function () {
	const [user, setUser] = React.useState<UserObject | null>({
		fullName: "Harrison Mariki",
	});
	// const [user, setUser] = React.useState<UserObject | null>(null);
	const isLoggedIn = user !== null;
	React.useEffect(() => {
		SplashScreen.hide();
	}, []);

	return (
		<LanguageProvider>
			<PaperProvider theme={paperTheme}>
				<NavigationContainer theme={{ colors: { background: "#FFF" } }}>
					{isLoggedIn ? (
						<LabFlow user={user} store={store} />
					) : (
						<Stack.Navigator screenOptions={{ headerShown: false }}>
							<Stack.Screen
								name="lab.auth"
								component={withFlowContext(
									EmailPasswordAuthenticationScreen,
									{
										actions: ({ navigation }) => ({
											onLogin: (data) => {
												setUser(data);
											},
										}),
									}
								)}
							/>
						</Stack.Navigator>
					)}
				</NavigationContainer>
			</PaperProvider>
		</LanguageProvider>
	);
}
