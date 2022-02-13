import React from "react";
import { render } from "@testing-library/react-native";
import FinalAssessmentScreen from ".";
import { ApplicationProvider } from "../../../../app/context/app";
import { AppProvider } from "../../../../app/context/main";
import { NavigationContainer } from "@react-navigation/native";
import { PatientDescriptionProvider } from "../context";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { SymptomAssessmentSequenceProvider } from "../../../../app/context/assessment";

describe("Final Assessment Screen", () => {
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
					<SymptomAssessmentSequenceProvider>
						<NavigationContainer>
							<Stack.Navigator>
								<Stack.Screen
									name="main"
									component={FinalAssessmentScreen}
								/>
							</Stack.Navigator>
						</NavigationContainer>
					</SymptomAssessmentSequenceProvider>
				</PatientDescriptionProvider>
			</AppProvider>
		</ApplicationProvider>
	);

	it("Renders correctly", () => {
		render(Component);
	});
});
