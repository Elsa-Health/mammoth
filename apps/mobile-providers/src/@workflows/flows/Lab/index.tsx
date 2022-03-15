import { useNavigation } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { setDefaultNamespace } from "i18next";
import React from "react";
import { Text } from "../../../@libs/elsa-ui/components/typography";
import EmailPasswordAuthenticationScreen from "../../screens/EmailPasswordAuthentication";
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
import { differenceInYears } from "date-fns";

import * as data from "../../../@libs/data-fns";
import { NextSteps } from "../../../pages/core/PatientDescriptor/FinalAssessment";
import { Store } from "../../../@libs/storage-core";

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

// Build the contents needed to construct the next steps
const NextStepsItems = data.nextSteps.basic(
	data.conditions.ids,
	data.medications.all.ids,
	data.labTests.ids
);

function MainLabComponent({
	user,
	store,
}: {
	user: { fullName: string };
	store: Store;
}) {
	// const setPatientIntake = useLabContext((s) => s.updatePatientIntake);
	// const assessment = useLabContext((s) => s.assessment);

	return (
		<Stack.Navigator
			screenOptions={{ headerShown: false }}
			// initialRouteName="lab.patient_information"
		>
			<Stack.Screen
				name="lab.dashboard"
				component={withFlowContext(BasicEMRDashboardScreen, {
					entry: {
						fullName: user.fullName,
						store,
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
						store,
					},
					actions: ({ navigation }) => ({
						onNewAssessment: (patient) => {
							console.log({ patient });
							navigation.navigate("lab.patient_intake", patient);
						},
						onOpenVisit: (visit) => {
							navigation.navigate("lab.patient_visit", {
								visit,
							});
						},
					}),
				})}
			/>
			<Stack.Screen
				name="lab.patient_intake"
				component={withFlowContext(BasicIntake, {
					actions: ({ navigation }) => ({
						onCompleteIntake: (data) => {
							// setPatientIntake(data);
							navigation.navigate("lab.assessment", {
								patient: data,
							});
						},
					}),
				})}
			/>
			<Stack.Screen
				name="lab.assessment"
				component={withFlowContext(BasicAssessment, {
					actions: ({ navigation }) => ({
						onCancel: () => {
							navigation.navigate("lab.patient_intake");
						},
						onCompleteAssessment: (symptoms, elsaDifferentials) => {
							const conditionTop =
								elsaDifferentials
									?.slice(0, 3)
									.map((s) => s.id) || [];

							navigation.navigate("lab.order_investigation", {
								condition: conditionTop[0] || undefined,
								recommendedTests: [].concat(
									...conditionTop
										.map((c) => {
											return (NextStepsItems[
												c as data.Condition
											]?.testRecommendations.map(
												(s) => s.id
											) || []) as data.LabTest[];
										})
										.filter((s) => s !== undefined)
								),
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
							navigation.navigate("lab.dashboard");
						},
					}),
				})}
			/>
			<Stack.Screen
				name="lab.patient_visit"
				component={withFlowContext(PatientVisit)}
			/>
			{/* <Stack.Screen
				name="lab.patient_visit"
				component={withFlowContext(PatientVisit)}
			/> */}
		</Stack.Navigator>
	);
}

export default function LabWorkFlow({
	user,
	store,
}: {
	user: { fullName: string };
	store: Store;
}) {
	return (
		<LabContextProvider>
			<MainLabComponent user={user} store={store} />
		</LabContextProvider>
	);
}
