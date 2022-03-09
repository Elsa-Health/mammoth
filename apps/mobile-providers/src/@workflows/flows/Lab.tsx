import { useNavigation } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { setDefaultNamespace } from "i18next";
import React from "react";
import { Text } from "../../components/typography";
import EmailPasswordAuthenticationScreen from "../screens/EmailPasswordAuthentication";
import DashboardScreenThatIsNav from "../screens/Dashboard";
import OnboardingScreen from "../screens/OnboardingSettings";
import OnboardingScreenThatIsNav from "../screens/OnboardingSettings";
import BasicEMRDashboardScreen from "../screens/BasicEMRDashboard";
import PatientInformationScreen from "../screens/PatientInformation";
import BasicIntake from "../screens/BasicIntake";

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

const GOD_LIKE_STATE = {};

type FnList = { [fnName: string]: (...a: any[]) => any };

// FIXME:
const Wrapper = <T, A extends FnList>(
	Component: (props: { entry?: T; actions?: A }) => JSX.Element,
	k: {
		entry?: T;
		actions?: ({ navigation }: any) => A;
	} = {}
) => {
	return ({ navigation }: any) => {
		// console.log(navigation);
		return (
			<Component
				navigation={navigation}
				entry={k.entry}
				actions={k.actions?.({ navigation })}
			/>
		);
	};
};

// TODO: Add authcheck on app start

export default function MainApp() {
	const navigation = useNavigation();
	const [user, setUser] = React.useState<UserObject | null>(null);
	const isLoggedIn = user !== null;

	return !isLoggedIn ? (
		<Stack.Navigator screenOptions={{ headerShown: false }}>
			<Stack.Screen
				name="lab.auth"
				component={Wrapper(EmailPasswordAuthenticationScreen, {
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
				component={Wrapper(BasicEMRDashboardScreen, {
					entry: {
						fullName: user.fullName,
					},
					actions: ({ navigation }) => {
						console.log("--->", navigation);
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
				component={Wrapper(PatientInformationScreen, {
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
				component={Wrapper(BasicIntake, {
					entry: {
						user,
					},
					actions: ({ navigation }) => ({
						onNewAssessment: (sure) => {
							navigation.navigate("lab.dashboard");
						},
					}),
				})}
			/>
		</Stack.Navigator>
	);
}
