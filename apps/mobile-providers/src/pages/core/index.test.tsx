import React from "react";

import { render } from "@testing-library/react-native";
import MainApp from ".";
import { ApplicationProvider } from "../../app/context/app";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { AppProvider } from "../../app/context/main";
describe("Main Application", () => {
	const Stack = createNativeStackNavigator();
	const Component = (
		<ApplicationProvider
			initialState={{
				user: { name: "test-user", uid: "test-user" },
				settings: { lang: "en" },
			}}
		>
			<AppProvider>
				<NavigationContainer>
					<Stack.Navigator>
						<Stack.Screen name="main" component={MainApp} />
					</Stack.Navigator>
				</NavigationContainer>
			</AppProvider>
		</ApplicationProvider>
	);

	describe("On Mobile", () => {
		it("Renders correctly", () => {
			jest.mock("react-native", () => {
				const og = jest.requireActual("react-native");

				return {
					...og,
					useWindowDimensions: () => ({
						width: 800,
						height: 350,
					}),
				};
			});
			render(Component);
		});
	});

	describe("On Tablet", () => {
		it("Renders correctly on tablet", () => {
			jest.mock("react-native", () => {
				const og = jest.requireActual("react-native");

				return {
					...og,
					useWindowDimensions: () => ({
						width: 1280,
						height: 720,
					}),
				};
			});
			render(Component);
		});
	});
});
