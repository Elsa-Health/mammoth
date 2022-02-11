import React from "react";

import { fireEvent, render } from "@testing-library/react-native";
import HomePage from "./home";
import { ApplicationProvider } from "../app/context/app";
import { AppProvider } from "../app/context/main";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { NavigationContainer } from "@react-navigation/native";
import { LanguageProvider } from "../app/locale/config";

const Stack = createNativeStackNavigator();
describe("Home screen", () => {
	const Component = (
		<ApplicationProvider
			initialState={{
				user: { name: "test-user", uid: "test-user" },
				settings: { lang: "en" },
			}}
		>
			<LanguageProvider>
				<AppProvider>
					<NavigationContainer>
						<Stack.Navigator>
							<Stack.Screen name="home" component={HomePage} />
						</Stack.Navigator>
					</NavigationContainer>
				</AppProvider>
			</LanguageProvider>
		</ApplicationProvider>
	);

	it("Renders", () => {
		const { getByTestId } = render(Component);
	});
});
