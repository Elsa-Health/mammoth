import React from "react";

import { fireEvent, render } from "@testing-library/react-native";
import HomePage, { MinifiedPatientHistory } from "./home";
import { ApplicationProvider } from "../app/context/app";
import { AppProvider, useMainState } from "../app/context/main";
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
	const ComponentWithChild = ({ children }: any) => {
		return (
			<ApplicationProvider
				initialState={{
					user: { name: "test-user", uid: "test-user" },
					settings: { lang: "en" },
				}}
			>
				<LanguageProvider>
					<AppProvider>{children}</AppProvider>
				</LanguageProvider>
			</ApplicationProvider>
		);
	};

	it("Renders", () => {
		render(Component);
	});

	describe("Components", () => {
		const D = () => {
			const { add } = useMainState();
			React.useEffect(() => {
				add({
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
				});
			}, []);
			return <MinifiedPatientHistory />;
		};
		it("<MinifiedPatientHistory />", () => {
			render(
				<ComponentWithChild>
					<D />
				</ComponentWithChild>
			);
		});
	});
});
