import { useNavigation } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { setDefaultNamespace } from "i18next";
import React from "react";
import { Text } from "../../../@libs/elsa-ui/components/typography";
import EmailPasswordAuthenticationScreen from "../../screens/EmailPasswordAuthentication";
import DashboardScreenThatIsNav from "../../screens/Dashboard";
import OnboardingScreen from "../../screens/OnboardingSettings";
import OnboardingScreenThatIsNav from "../../screens/OnboardingSettings";
import BasicEMRDashboardScreen from "../../screens/BasicEMRDashboard";
import PatientInformationScreen from "../../screens/PatientInformation";
import BasicIntake from "../../screens/BasicIntake";

import { withFlowContext } from "../../wrapper";
import BasicAssessment from "../../screen-groups/BasicAssessment";
import PatientVisit from "../../screen-groups/PatientFolder";
import createContext from "zustand/context";
import create from "zustand";
import { getPatientIntake, LabContextProvider, useLabContext } from "./context";
import OrderInvestigationScreen from "../../screens/OrderInvestigation";
import BasicRegisterNewPatientScreen from "../../screens/BasicRegisterNewPatient";

const Stack = createNativeStackNavigator();

// DONE!
const SymptomAssessment = {
	1: "SummaryScreen",
	2: "ManageSymptomScreen",
	3: "SearchSymptomsScreen",
};

// DONE!
const BasicPatientHistory = {
	1: "BasicIntake",
	2: "SymptomAssessment",
};

const EMRPatientFile = {
	1: "PatientProfieAndVisits",
	2: "PatientVisitDetails",
	3: "UpdateInvestigationResults",
};

// DONE!
const AssessPatient = {
	5: "BasicPatientHistory",
	6: "BasicAssessmentSummary", // order investigations here
};

const stack = {
	1: "WelcomeToApp/OURAPPDOESXANDY", // Welcom Text / Splash
	2: "Authentication",
	3: "OnboardingSettings", // SKIPPED: for now
	4: "BasicEMRDashboard", // Can search for patients
	4.5: "RegisterNewPatient",
	5: "AssessPatient",
	6: "EMRPatientFile",
	7: "ManageProfile",
};

// TODO: Add authcheck on app start

function MainLabComponent() {
	// const [user, setUser] = React.useState<UserObject | null>(null);
	const [user, setUser] = React.useState<UserObject | null>({
		fullName: "Mike Mill",
	});
	const isLoggedIn = user !== null;
	const setPatientIntake = useLabContext((s) => s.updatePatientIntake);
	const assessment = useLabContext((s) => s.assessment);

	return !isLoggedIn ? (
		<Stack.Navigator screenOptions={{ headerShown: false }}>
			<Stack.Screen
				name="lab.auth"
				component={withFlowContext(EmailPasswordAuthenticationScreen, {
					actions: ({ navigation }) => ({
						onLogin: (data) => {
							setUser(data);
						},
					}),
				})}
			/>
		</Stack.Navigator>
	) : (
		<Stack.Navigator screenOptions={{ headerShown: false }}>
			<Stack.Screen
				name="lab.dashboard"
				component={withFlowContext(BasicEMRDashboardScreen, {
					entry: {
						fullName: user.fullName,
					},
					actions: ({ navigation }) => {
						return {
							onNewPatient: () =>
								navigation.navigate("lab.new_patient"),
							onOpenFile: (patient) => {
								navigation.navigate("lab.patient_information", {
									patient,
								});
							},
						};
					},
				})}
			/>
			<Stack.Screen
				name="lab.new_patient"
				component={withFlowContext(BasicRegisterNewPatientScreen, {
					actions: ({ navigation }) => ({
						onComplete: (patient) => {
							console.log(patient);
							// registration happens here
							navigation.replace("lab.patient_information", {
								patient,
							});
						},
					}),
				})}
			/>
			<Stack.Screen
				name="lab.patient_information"
				component={withFlowContext(PatientInformationScreen, {
					entry: {
						patient: {
							id: "iids",
							firstName: "Baraka",
							lastName: "Mzee",
							phone: "+255 712 734 723",
							sex: "male",
							dateOfBirth: new Date("1984-12-02"),
							address: "Dar es Salaam",
						},
					},
					actions: ({ navigation }) => ({
						onNewAssessment: (pid: string) => {
							navigation.navigate("lab.patient_intake");
						},
					}),
				})}
			/>
			<Stack.Screen
				name="lab.patient_intake"
				component={withFlowContext(BasicIntake, {
					entry: {
						user,
					},
					actions: ({ navigation }) => ({
						onCompleteIntake: (data) => {
							setPatientIntake(data);
							navigation.navigate("lab.assessment");
						},
					}),
				})}
			/>
			<Stack.Screen
				name="lab.assessment"
				component={withFlowContext(BasicAssessment, {
					entry: {
						patient: getPatientIntake(assessment),
					},
					actions: ({ navigation }) => ({
						onCancel: () => {
							navigation.navigate("lab.patient_intake");
						},
						onCompleteAssessment: (sure) => {
							navigation.navigate("lab.order_investigation", {
								condition: "pneumonia",
								recommendedTests: [
									"full-blood-picture-fbp",
									"chest-x-ray-cxr",
									"cd-4-count",
								],
							});
						},
					}),
				})}
			/>
			<Stack.Screen
				name="lab.order_investigation"
				component={withFlowContext(OrderInvestigationScreen, {
					// entry: {
					// 	condition: "pneumonia",
					// 	recommendedTests: [
					// 		"full-blood-picture-fbp",
					// 		"chest-x-ray-cxr",
					// 		"cd-4-count",
					// 	],
					// },
					actions: ({ navigation }) => ({
						onOrder: (investigations) => {
							console.log({ investigations });
							navigation.navigate("lab.patient_visit");
						},
					}),
				})}
			/>
			<Stack.Screen
				name="lab.patient_visit"
				component={withFlowContext(PatientVisit)}
			/>
		</Stack.Navigator>
	);
}

export default function LabWorkFlow() {
	return (
		<LabContextProvider>
			<MainLabComponent />
		</LabContextProvider>
	);
}
