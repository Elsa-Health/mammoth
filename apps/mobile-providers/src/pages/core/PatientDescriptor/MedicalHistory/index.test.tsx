import React from "react";
import { render } from "@testing-library/react-native";
import MedicalHistory from ".";
import { ApplicationProvider } from "../../../../app/context/app";
import { AppProvider } from "../../../../app/context/main";
import { NavigationContainer } from "@react-navigation/native";
import { PatientDescriptionProvider } from "../context";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

describe("Medical History Screen", () => {
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
								component={MedicalHistory}
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
