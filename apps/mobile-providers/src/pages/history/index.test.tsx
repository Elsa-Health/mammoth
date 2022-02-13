import React from "react";
import { render } from "@testing-library/react-native";
import { AppProvider } from "../../app/context/main";
import AssessmentHistory, { AssessmentRecordItem, MiniBars } from ".";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { ApplicationProvider } from "../../app/context/app";
import { LanguageProvider } from "../../app/locale/config";

const Stack = createNativeStackNavigator();

describe("Assessment History", () => {
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
							<Stack.Screen
								name="assessment.history"
								component={AssessmentHistory}
							/>
						</Stack.Navigator>
					</NavigationContainer>
				</AppProvider>
			</LanguageProvider>
		</ApplicationProvider>
	);

	it("renders correctly", () => {
		render(Component);
	});

	describe("Components", () => {
		it("M<iniBars />", () => {
			render(
				<MiniBars
					conditions={[
						{ p: 0.2, condition: "a" },
						{ p: 0.3, condition: "b" },
						{ p: 0.6, condition: "c" },
					]}
					decisionKey="b"
				/>
			);
		});

		it("<AssessmentRecordItem />", () => {
			render(
				<AssessmentRecordItem
					record={{
						id: "123",
						patient: {
							age: {
								days: 0,
								months: 5,
								years: 12,
							},
							allergies: [],
							chronicIllnesses: [],
							dueDate: undefined,
							pregnant: false,
							sex: "male",
							vitalSigns: {
								temp: 37,
								height: 165,
								weight: 90,
							},
						},
						dateTime: expect.any(Date),
						assessmentInfo: {
							presentingSymptoms: [
								{
									id: "fever",
									data: {
										aggravators: [],
										duration: "3",
										nature: ["343"],
									},
								},
								{
									id: "cough",
									data: {
										aggravators: [],
										duration: "3",
										nature: ["productive"],
									},
								},
							],
							absentSymptoms: [{ id: "vomiting" }],
							elsaConditions: [
								{
									condition: "malaria",
									p: 0.3,
									id: "malaria",
									symptoms: ["jaudice", "fever"],
								},
							],
							userConditions: ["asthma"],
						},
						history: {
							dietary: undefined,
							medical: undefined,
						},
					}}
				/>
			);
		});
	});
});
