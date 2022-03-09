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
import createContext from "zustand/context";
import create from "zustand";
import { getPatientIntake, LabContextProvider, useLabContext } from "./context";

const Stack = createNativeStackNavigator();

const SymptomAssessment = {
	1: "SummaryScreen",
	2: "ManageSymptomScreen",
	3: "SearchSymptomsScreen",
};

const BasicPatientHistory = {
	1: "BasicIntake",
	2: "SymptomAssessment",
};

const EMRPatientFile = {
	1: "PatientProfieAndVisits",
	2: "PatientVisitDetails",
	3: "UpdateInvestigationResults",
};

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
	5: "AssessPatient", // -> goes to the EMRPatientFile
	6: "ManageProfile",
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

	// return !isLoggedIn ? (
	return false ? (
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
		<Stack.Navigator
			screenOptions={{ headerShown: false }}
			initialRouteName="lab.patient_intake"
		>
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
							onOpenFile: (pid) => {
								navigation.navigate("lab.patient_information");
							},
						};
					},
				})}
			/>
			<Stack.Screen
				name="lab.patient_information"
				component={withFlowContext(PatientInformationScreen, {
					entry: {
						user,
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
						onCompleteAssessment: (sure) => {
							navigation.navigate("lab.dashboard");
						},
					}),
				})}
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
