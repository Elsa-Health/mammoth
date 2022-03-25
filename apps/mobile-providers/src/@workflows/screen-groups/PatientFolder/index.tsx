import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { withFlowContext } from "../../wrapper";
import PatientVisitDetailsScreen from "../../screens/PatientVisitDetails";
import InvestigationResultsForm from "../../screens/InvestigationResultsForm";

import { ToastAndroid } from "react-native";
import produce from "immer";

const Stack = createNativeStackNavigator();
/**
 * Composition of screens for the patient visit flow
 */
export default function PatientFolderScreenGroup({
	entry: { visit, investigation },
	actions: $,
}: WorkflowScreen<
	{ visit: PatientVisit; investigation: PatientInvestigation[] },
	{
		getInvestigation: (id: string) => Promise<PatientInvestigation>;
		updateMultipleInvestigationResult: (
			irp: Array<[string, PatientInvestigation]>
		) => Promise<void>;
		onUpdateInvestigationResult: (
			id: string,
			data: PatientInvestigation,
			err?: (message: string) => void
		) => void;
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

	React.useEffect(() => {
		Promise.all(
			visit.investigations.map(async ({ id }) => {
				const inv = await $.getInvestigation(id);
				setInvs((s) =>
					produce(s, (df) => {
						df[id] = inv;
					})
				);
			})
		);
	}, []);

	// React.useEffect(() => {
	// 	console.log("Investigation changes to: ", invs);
	// }, [invs]);

	React.useEffect(() => {
		$.updateMultipleInvestigationResult(Object.entries(invs)).catch(
			(err) => {
				ToastAndroid.show(
					`Failed to updated Investigations`,
					ToastAndroid.LONG
				);
				console.log(err);
			}
		);
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
									// console.log("VA$L:", val);
									return { id: key, ...val };
								}),
						},
					},
					actions: ({ navigation }) => ({
						onOpenInvestigation: (investigation) => {
							$.getInvestigation(investigation.id).then((val) => {
								console.log("Loaded Investigation:", {
									val,
									investigation,
								});
								const { result, ...other } = val;
								const obj = {
									investigation: other,
									result,
								};

								console.log(obj);
								navigation.navigate(
									"patient.investigationResultsForm",
									obj
								);
							});
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
							$.onUpdateInvestigationResult(
								id,
								newInvestigationObj
							);

							setInvs((s) =>
								produce(s, (df) => {
									df[id] = newInvestigationObj;
									return df;
								})
							);
							// console.log("Works!");
							navigation.navigate("patient.visitProfile");
						},
					}),
				})}
			/>
		</Stack.Navigator>
	);
}
