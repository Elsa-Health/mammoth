import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { render } from "@testing-library/react-native";
import React from "react";
import { ApplicationProvider } from "../../../app/context/app";
import { SymptomAssessmentSequenceProvider } from "../../../app/context/assessment";
import { AppProvider } from "../../../app/context/main";
import { SymptomInteractionProvider } from "../../../app/interactionSymptoms";
import {
	PatientDescriptionProvider,
	usePatientDescription,
} from "../PatientDescriptor/context";
import SummaryView, {
	useBasicInfo,
	ConditionViewSection,
	SymptomsListingSection,
} from "./Summary";

describe("Summary Screen", () => {
	const Stack = createNativeStackNavigator();
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

	const patientPartial = {
		patientIntake: {
			age: { years: 45, months: 4, days: 5 },
			sex: "male",
			allergies: [],
			chronicIllnesses: [],
			pregnant: false,
			dueDate: expect.any(Date),
			vitalSigns: {},
		},
	};
	const Child = (props: any) => {
		const set = usePatientDescription((s) => s.setData);
		const pd = usePatientDescription((s) => s.patientIntake);

		const [ready, setReady] = React.useState(false);
		React.useEffect(() => {
			set(patientPartial);
		}, []);

		React.useEffect(() => {
			if (pd !== undefined) {
				setReady(true);
			}
		}, [pd]);

		if (!ready) return null;
		return <SummaryView {...props} />;
	};

	const Component = (
		<ComponentWithChild>
			<NavigationContainer>
				<Stack.Navigator>
					<Stack.Screen name="main" component={Child} />
				</Stack.Navigator>
			</NavigationContainer>
		</ComponentWithChild>
	);

	it("Renders correctly", () => {
		render(Component);
	});

	it("Utils", () => {
		const RC = () => {
			const vals = useBasicInfo();

			React.useEffect(() => {
				if (vals !== undefined) {
					expect(vals).toMatch(
						expect.objectContaining({
							age: {
								years: expect.any(Number),
								days: expect.any(Number),
								months: expect.any(Number),
							},
							sex: expect.any(String),
							pregnant: expect.any(Boolean),
						})
					);
				}
			}, []);
			return <></>;
		};
	});

	describe("Components", () => {
		const Child = (props: any) => {
			return (
				<ConditionViewSection
					mainNavigator={jest.fn()}
					conditions={[
						{
							condition: "malaria",
							data: { condition: "malaria", p: 0.4 },
							count: 6,
						},
					]}
				/>
			);
		};
		render(
			<ComponentWithChild>
				<NavigationContainer>
					<Stack.Navigator>
						<Stack.Screen name="main" component={Child} />
					</Stack.Navigator>
				</NavigationContainer>
			</ComponentWithChild>
		);
	});
});
