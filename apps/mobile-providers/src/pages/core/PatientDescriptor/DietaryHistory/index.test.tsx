import React from "react";
import { render } from "@testing-library/react-native";
import DietaryHistory from ".";
import { ApplicationProvider } from "../../../../app/context/app";
import { AppProvider } from "../../../../app/context/main";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { PatientDescriptionProvider } from "../context";

describe("Dietray History Screen", () => {
	const Stack = createNativeStackNavigator();
	const Component = (
		<ApplicationProvider
			initialState={{
				user: { name: "test-user", uid: "test-user" },
				settings: { lang: "en" },
			}}
		>
			<AppProvider>
				<PatientDescriptionProvider>
					<NavigationContainer>
						<Stack.Navigator>
							<Stack.Screen
								name="main"
								component={DietaryHistory}
							/>
						</Stack.Navigator>
					</NavigationContainer>
				</PatientDescriptionProvider>
			</AppProvider>
		</ApplicationProvider>
	);

	it("Renders correctly", () => {
		render(Component);
	});
});
