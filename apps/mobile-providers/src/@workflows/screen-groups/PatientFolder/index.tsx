import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { withFlowContext } from "../../wrapper";
import PatientVisitDetailsScreen from "../../screens/PatientVisitDetails";
import InvestigationResultsForm from "../../screens/InvestigationResultsForm";

const Stack = createNativeStackNavigator();

/**
 * Composition of screens for the patient visit flow
 */
export default function PatientFolderScreenGroup({
	entry: { visit },
}: WorkflowScreen<{ visit: PatientVisit }>) {
	console.log("==> ", visit);
	return (
		<Stack.Navigator screenOptions={{ headerShown: false }}>
			<Stack.Screen
				name="patient.visitProfile"
				component={withFlowContext(PatientVisitDetailsScreen, {
					entry: {
						visit,
					},
					actions: ({ navigation }) => ({
						onOpenInvestigation: (investigation) => {
							console.log("investigation", investigation);
							navigation.navigate(
								"patient.investigationResultsForm",
								{ investigation }
							);
						},
					}),
				})}
			/>
			<Stack.Screen
				name="patient.investigationResultsForm"
				component={withFlowContext(InvestigationResultsForm, {
					entry: {
						// investigation,
						investigation: { id: "full-blood-picture-fbp" },
					},
					actions: ({ navigation }) => ({
						onOpenInvestigation: (investigation) => {
							console.log("investigation", investigation);
						},
					}),
				})}
			/>
		</Stack.Navigator>
	);
}
