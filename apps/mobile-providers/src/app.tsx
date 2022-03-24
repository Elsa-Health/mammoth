import { NavigationContainer } from "@react-navigation/native";
import React from "react";
import SplashScreen from "react-native-splash-screen";

import LabFlow from "./Lab";

import {
	Provider as PaperProvider,
	DefaultTheme,
	configureFonts,
} from "react-native-paper";
import theme, { fontFamilyStyle } from "./@libs/elsa-ui/theme";
import rnpTheme from "./@libs/elsa-ui/theme/rnp";

import { View, Text } from "react-native";
// import { Chip, Text } from "@elsa-ui/react-native/components";
// import * as data from "@elsa-health/data-fns";

// import { LanguageProvider } from "@elsa-ui/utils/locale";
import { LanguageProvider } from "./@libs/elsa-utils/locale";

import { createNativeStackNavigator } from "@react-navigation/native-stack";
import EmailPasswordAuthenticationScreen from "./@workflows/screens/EmailPasswordAuthentication";
import { withFlowContext } from "./@workflows/wrapper";

import deviceStorage from "./app/storage";

const Stack = createNativeStackNavigator();
const store = deviceStorage();

export default function App() {
	const [user, setUser] = React.useState<UserObject | null>(
		__DEV__ ? { fullName: "Micheal Scott" } : null
	);
	const [emrReady, setEmrReady] = React.useState(false);

	// const [user, setUser] = React.useState<UserObject | null>(null);
	const isLoggedIn = user !== null;
	React.useEffect(() => {
		SplashScreen.hide();
	}, []);

	React.useEffect(() => {
		Promise.all(
			// Creates the collections needed for the application
			["visits", "patients", "investigations"].map((collName) =>
				store.collection(collName).create({ createIfNotExists: true })
			)
		).then(() => {
			setEmrReady(true);
		});
	}, []);

	React.useEffect(() => {
		// store
		// 	.collection("abc")
		// 	.create({ createIfNotExists: true })
		// 	.then(() => {
		// 		store
		// 			.collection("abc")
		// 			.addMult([{ name: "Mike" }, { name: "James" }])
		// 			.then((dd) => {
		// 				console.log("NOW$$$: ", dd);
		// 			});
		// 	});
	}, []);

	// store
	// 	.collection("investigations")
	// 	.addMult([
	// 		{
	// 			obj: JSON.stringify({
	// 				type: "numeric-units",
	// 				units: "x10^9 /L",
	// 			}),
	// 			investigationId: "basophil-count",
	// 		},
	// 		{
	// 			obj: JSON.stringify({ type: "numeric-units", units: "mg/dL" }),
	// 			investigationId: "bun-blood-urea-nitrogen",
	// 		},
	// 		{
	// 			obj: JSON.stringify({
	// 				type: "numeric-units",
	// 				units: "cells/mm3",
	// 			}),
	// 			investigationId: "cd-4-count",
	// 		},
	// 	])
	// 	.then((dc) => {
	// 		console.log(dc);
	// 	});

	if (!emrReady) {
		return (
			<View>
				<Text>Not Ready</Text>
			</View>
		);
	}

	return (
		<LanguageProvider>
			<PaperProvider theme={rnpTheme}>
				<NavigationContainer theme={{ colors: { background: "#FFF" } }}>
					{isLoggedIn ? (
						// TODO: Update the logic the loads the store after the
						//  collections have been created
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
