import React from "react";
import { render } from "@testing-library/react-native";
import MainSymptomScreen, { SymptomList, SymptomSelectable } from ".";
import { ApplicationProvider } from "../../../../app/context/app";
import { AppProvider } from "../../../../app/context/main";
import { NavigationContainer } from "@react-navigation/native";
import { PatientDescriptionProvider } from "../context";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { SymptomAssessmentSequenceProvider } from "../../../../app/context/assessment";
import { SymptomInteractionProvider } from "../../../../app/interactionSymptoms";

describe("Main Symptom Screen", () => {
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
						<SymptomInteractionProvider>
							<NavigationContainer>
								<Stack.Navigator>
									<Stack.Screen
										name="main"
										component={MainSymptomScreen}
									/>
								</Stack.Navigator>
							</NavigationContainer>
						</SymptomInteractionProvider>
					</SymptomAssessmentSequenceProvider>
				</PatientDescriptionProvider>
			</AppProvider>
		</ApplicationProvider>
	);

	const ComponentWithChild = ({ children }: any) => (
		<ApplicationProvider
			initialState={{
				user: { name: "test-user", uid: "test-user" },
				settings: { lang: "en" },
			}}
		>
			<AppProvider>
				<PatientDescriptionProvider>
					<SymptomAssessmentSequenceProvider>
						<SymptomInteractionProvider>
							{children}
						</SymptomInteractionProvider>
					</SymptomAssessmentSequenceProvider>
				</PatientDescriptionProvider>
			</AppProvider>
		</ApplicationProvider>
	);

	it("Renders correctly", () => {
		render(Component);
	});

	describe("Components", () => {
		it("<SymptomList />", () => {
			render(
				<ComponentWithChild>
					<SymptomList />
				</ComponentWithChild>
			);
		});

		it("<SymptomSelectable />", () => {
			render(
				<ComponentWithChild>
					<SymptomSelectable symptom="abdominal-tenderness" />
				</ComponentWithChild>
			);
		});
	});
});
