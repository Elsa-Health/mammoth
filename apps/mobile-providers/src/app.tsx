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

import { View, Text } from "react-native";
// import { Chip, Text } from "@elsa-ui/react-native/components";
// import * as data from "@elsa-health/data-fns";

// import { LanguageProvider } from "@elsa-ui/utils/locale";
import { LanguageProvider } from "./@libs/elsa-utils/locale";

import { createNativeStackNavigator } from "@react-navigation/native-stack";
import EmailPasswordAuthenticationScreen from "./@workflows/screens/EmailPasswordAuthentication";
import { withFlowContext } from "./@workflows/wrapper";

// import MMKV from "react-native-mmkv";

// import { buildStore } from "./@libs/storage-core";
// import MMKVStore from "./@libs/storage-stores/local/react-native-mmkv";
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

// function App() {
// 	React.useEffect(() => {
// 		SplashScreen.hide();
// 	}, []);

// 	return (
// 		<View
// 			style={{
// 				display: "flex",
// 				flex: 1,
// 				alignItems: "center",
// 				justifyContent: "center",
// 			}}
// 		>
// 			<Chip text="asdasdsa" style={{ alignSelf: "center" }} />
// 			<Text>Hello There {data.conditions.name.fromId("asthma")}</Text>
// 		</View>
// 	);
// }

// export default function A() {
// 	return (
// 		// <LanguageProvider>
// 		<App />
// 		// </LanguageProvider>
// 	);
// }

const Stack = createNativeStackNavigator();
const store = deviceStorage();

// Creating the collections if they don't exist
// store.collection("investigation.results").create({ checkIfExists: true });

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

	// React.useEffect(() => {
	// 	store
	// 		.collection("patients")
	// 		.addDoc<Omit<Patient, "id">>({
	// 			address: "asdasds",
	// 			dateOfBirth: "1993-11-05",
	// 			firstName: "Mike",
	// 			lastName: "Tyson",
	// 			phone: "+32323",
	// 			registerDate: new Date().toUTCString(),
	// 			sex: "male",
	// 		})
	// 		.then((id) => console.log("Created patient in:", id))
	// 		.catch((err) => {
	// 			console.warn("FAILED");
	// 			console.log(err);
	// 		});
	// }, []);
	if (!emrReady) {
		return (
			<View>
				<Text>Not Ready</Text>
			</View>
		);
	}

	return (
		<LanguageProvider>
			<PaperProvider theme={paperTheme}>
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
