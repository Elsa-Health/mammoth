import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { withFlowContext } from "../../wrapper";
import PatientVisitDetailsScreen from "../../screens/PatientVisitDetails";

const Stack = createNativeStackNavigator();

/**
 * These are the set of screens that create the patient folder
 * that's used of review information needed by the to construct
 * a proper patient profile
 */
export default function PatientFolderScreenGroup({
	entry: { visit },
}: WorkflowScreen<{ visit: PatientVisit }>) {
	return (
		<Stack.Navigator screenOptions={{ headerShown: false }}>
			<Stack.Screen
				name="patient.visitProfile"
				component={withFlowContext(PatientVisitDetailsScreen, {
					entry: {
						visit,
					},
				})}
			/>
		</Stack.Navigator>
	);
}
