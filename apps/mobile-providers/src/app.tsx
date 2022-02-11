// 'use strict';
import React from "react";
import CoreApp from "./pages/core";
import HomePage from "./pages/home";
import HistoryPage from "./pages/history";

import SplashScreen from "react-native-splash-screen";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import { AppProvider as ElsaAssessmentsProvider } from "./app/context/main";
import SettingsPage from "./pages/settings";
import { LanguageProvider } from "./app/locale/config";
import { ApplicationProvider, useApplication } from "./app/context/app";

import Login from "./pages/login";
import shallow from "zustand/shallow";
import { Modal, StyleSheet, View } from "react-native";
import { Pressable } from "./components/pressable";
import { Text } from "./components";
import { useTranslation } from "react-i18next";
import theme from "./theme";

const Stack = createNativeStackNavigator();

function ChooseLanguageModal({ visible = false }: { visible: boolean }) {
	const applySettings = useApplication((s) => s.applySettings);
	const { t } = useTranslation("translation", { keyPrefix: "settings" });

	return (
		<Modal animationType="fade" transparent visible={visible}>
			<View style={styles.centeredView}>
				<View style={styles.modalView}>
					<View style={{ paddingVertical: 12, width: "100%" }}>
						<Text
							font="bold"
							style={{ fontSize: 20, marginBottom: 4 }}
						>{t`choose_language.title`}</Text>
						<Text>{t`language.description`}</Text>
					</View>
					{[
						{ value: "en", name: "English" },
						{ value: "sw", name: "Kiswahili" },
					].map((s) => (
						<Pressable
							key={`${s.value}-${s.name.toLowerCase()}`}
							ripple_color={theme.color.primary.base}
							onPress={() =>
								applySettings((x) => ({
									lang: s.value as "en" | "sw",
								}))
							}
							style={[
								{
									borderWidth: 2,
									borderRadius: 10,
									paddingHorizontal: 16,
									paddingVertical: 6,
									borderColor: theme.color.primary.base,
								},
								{
									justifyContent: "center",
									width: "100%",
									marginBottom: 5,
								},
							]}
						>
							<Text
								font="bold"
								style={{ color: theme.color.primary.dark }}
							>
								{s.name}
							</Text>
						</Pressable>
					))}
				</View>
			</View>
		</Modal>
	);
}

const styles = StyleSheet.create({
	centeredView: {
		flex: 1,
		justifyContent: "center",
		alignItems: "center",
		backgroundColor: "rgba(0,0,0, 0.2)",
	},
	modalView: {
		margin: 20,
		padding: 24,
		width: "90%",
		backgroundColor: "white",
		borderRadius: 2,
		alignItems: "center",
		shadowColor: "#000",
		shadowOffset: {
			width: 0,
			height: 2,
		},
		shadowOpacity: 0.25,
		shadowRadius: 4,
		elevation: 5,
	},
});

/**
 * This is main part of the application after loggin in.
 */
function MainAppInteraction() {
	const isLangNotChosen = useApplication(
		(s) => s.settings.lang === undefined,
		shallow
	);

	return (
		<React.Fragment>
			{/* To Force show language selection when language isn't chosen by default */}
			{/* NOTE: this is slow and shows up on re-rendering the app. */}
			<ChooseLanguageModal visible={isLangNotChosen} />

			<ElsaAssessmentsProvider>
				<NavigationContainer>
					<Stack.Navigator screenOptions={{ headerShown: false }}>
						<Stack.Screen name="app.home" component={HomePage} />
						<Stack.Screen name="app.core" component={CoreApp} />
						<Stack.Screen
							name="app.settings"
							component={SettingsPage}
						/>
						<Stack.Screen
							name="app.history"
							component={HistoryPage}
						/>
					</Stack.Navigator>
				</NavigationContainer>
			</ElsaAssessmentsProvider>
		</React.Fragment>
	);
}

function BaseApp() {
	const loggedIn = useApplication((s) => s.user !== undefined, shallow);

	if (!loggedIn) {
		return <Login />;
	}

	return <MainAppInteraction />;
}

export default function App() {
	React.useEffect(() => {
		// Hide the splash screen after
		//  the page has loaded
		SplashScreen.hide();
	}, []);
	return (
		// if the person is logged in

		<ApplicationProvider>
			<LanguageProvider>
				<BaseApp />
			</LanguageProvider>
		</ApplicationProvider>
	);
}
