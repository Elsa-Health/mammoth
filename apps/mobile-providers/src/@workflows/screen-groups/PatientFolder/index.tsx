import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { withFlowContext } from "../../wrapper";
import PatientVisitDetailsScreen from "../../screens/PatientVisitDetails";
import InvestigationResultsForm from "../../screens/InvestigationResultsForm";

const Stack = createNativeStackNavigator();

import * as data from "../../../@libs/data-fns";
import { Store } from "../../../@libs/storage-core";

/**
 * Composition of screens for the patient visit flow
 */
export default function PatientFolderScreenGroup({
	entry: { visit, emr },
	actions: $,
}: WorkflowScreen<
	{ visit: PatientVisit; emr: Store },
	{
		getInvestigationResult: (id: string) => Promise<PatientInvestigation>;
	}
>) {
	return (
		<Stack.Navigator screenOptions={{ headerShown: false }}>
			<Stack.Screen
				name="patient.visitProfile"
				component={withFlowContext(PatientVisitDetailsScreen, {
					entry: {
						visit,
					},
					actions: ({ navigation }) => ({
						getResult: $.getInvestigationResult,
						onOpenInvestigation: (investigation) => {
							$.getInvestigationResult(investigation.id).then(
								(val) => {
									const { result, ...other } = investigation;
									const obj = {
										investigation: other,
										result,
									};

									console.log(
										"PatientVisitDetailsScreen@onOpenInvestigation",
										obj
									);
									navigation.navigate(
										"patient.investigationResultsForm",
										obj
									);
								}
							);
						},
					}),
				})}
			/>
			<Stack.Screen
				name="patient.investigationResultsForm"
				component={withFlowContext(InvestigationResultsForm, {
					actions: ({ navigation }) => ({
						onClose: () => {
							navigation.goBack();
						},
						onUpdateInvestigation: (id, newInvestigationObj) => {
							console.log({ newInvestigationObj });
							emr.collection("investigations")
								.doc(id)
								.set(newInvestigationObj)
								.then((d) => {
									console.log(d);

									navigation.goBack();
								})
								.catch((err) => {
									console.log(err);
								});
						},
					}),
				})}
			/>
		</Stack.Navigator>
	);
}
