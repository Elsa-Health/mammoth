import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { withFlowContext } from "../../wrapper";
import PatientVisitDetailsScreen from "../../screens/PatientVisitDetails";
import InvestigationResultsForm from "../../screens/InvestigationResultsForm";

const Stack = createNativeStackNavigator();

import * as data from "../../../@libs/data-fns";
import { Store } from "../../../@libs/storage-core";
import { ToastAndroid } from "react-native";
import produce from "immer";

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
	// This will be replace when adding observables to stores
	const [invs, setInvs] = React.useState<{
		[id: string]: PatientInvestigation;
	}>(() => {
		const invM: { [id: string]: PatientInvestigation } = {};
		visit.investigations.forEach((inv) => {
			const { id, ...other } = inv;
			invM[id] = other;
		});
		return invM;
	});

	React.useEffect(() => {}, []);

	React.useEffect(() => {
		Promise.all(
			Object.entries(invs)
				.filter((s) => s[1] !== undefined)
				.map(
					(d) =>
						new Promise((res, rej) => {
							const [invId, obj] = d;

							// update the investigation with the results
							emr.collection("investigations")
								.doc(invId)
								.set(obj)
								.then(res)
								.catch(rej);
						})
				)
		)
			.then((ids) =>
				ToastAndroid.show(
					`Investigations updated ${ids}`,
					ToastAndroid.LONG
				)
			)
			.catch((err) => {
				ToastAndroid.show(
					`Failed to updated Investigations`,
					ToastAndroid.LONG
				);
				console.log(err);
			});
	}, [invs]);

	return (
		<Stack.Navigator screenOptions={{ headerShown: false }}>
			<Stack.Screen
				name="patient.visitProfile"
				component={withFlowContext(PatientVisitDetailsScreen, {
					entry: {
						visit: {
							...visit,
							investigations: Object.entries(invs)
								.filter((s) => s[1] !== undefined)
								.map((i) => {
									const [key, val] = i;
									return { id: key, ...val };
								}),
						},
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

									// console.log(
									// 	"PatientVisitDetailsScreen@onOpenInvestigation",
									// 	obj
									// );
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
							// console.log("**** ==>", {
							// 	id,
							// 	newInvestigationObj,
							// });
							setInvs((s) =>
								produce(s, (df) => {
									df[id] = newInvestigationObj;
								})
							);
							navigation.navigate("patient.visitProfile");
						},
					}),
				})}
			/>
		</Stack.Navigator>
	);
}
