import { createNativeStackNavigator } from "@react-navigation/native-stack";
import React from "react";
import BasicEMRDashboardScreen from "../../screens/BasicEMRDashboard";
import PatientInformationScreen from "../../screens/PatientInformation";
import BasicIntake from "../../screens/BasicIntake";

import { withFlowContext } from "../../wrapper";
import BasicAssessment from "../../screen-groups/BasicAssessment";
import PatientVisit from "../../screen-groups/PatientFolder";
import { LabContextProvider } from "./context";
import OrderInvestigationScreen from "../../screens/OrderInvestigation";
import BasicRegisterNewPatientScreen from "../../screens/BasicRegisterNewPatient";

import * as data from "../../../@libs/data-fns";
import { Store } from "../../../@libs/storage-core";
import produce from "immer";
import ConfirmPatientVisitScreen from "../../screens/ConfirmPatientVisit";

const Stack = createNativeStackNavigator();

// TODO: Add authcheck on app start
// TODO: fix the dateOfBirth parsing... converts to invalid date (try: date: 06, month: 21, year: 1994)
// Build the contents needed to construct the next steps
const NextStepsItems = data.nextSteps.basic(
	data.conditions.ids,
	data.medications.all.ids,
	data.investigation.ids
);

function MainLabComponent({
	user,
	emr,
}: {
	user: { fullName: string };
	emr: Store;
}) {
	const [visit, set] = React.useState<Partial<VisitSession>>({});

	const update = React.useCallback(
		<T extends keyof VisitSession>(field: T, value: VisitSession[T]) => {
			set((s) =>
				produce(s, (df) => {
					df[field] = value;
				})
			);
		},
		[set]
	);

	const reset = React.useCallback(() => {
		set({});
	}, [set]);

	const getInvestigationResult = async (id: string) => {
		const results = await emr.collection("investigation").doc(id).query();

		return results === null ? undefined : results.result;
	};

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
						store: emr,
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
							// registration happens here
							emr.collection("patients")
								.addDoc(patient)
								.then((s) => {
									console.log("patientID:", s);
									emr.collection("patients")
										.queryDoc<Patient>({ $id: s })
										.then((patient) => {
											if (patient !== null) {
												const { $id, ...ppt } = patient;
												console.log(
													"THIS IS THE CREATED PATIENT:",
													patient
												);
												navigation.replace(
													"lab.patient_information",
													{
														patient: {
															...ppt,
															id: $id || s,
														},
														store: emr,
													}
												);
											}
										});
								})
								.catch((err) => {
									console.warn(
										"Unable to create new patient"
									);
									console.log(err);
								});
						},
					}),
				})}
			/>
			<Stack.Screen
				name="lab.patient_information"
				component={withFlowContext(PatientInformationScreen, {
					entry: {
						store: emr,
					},
					actions: ({ navigation }) => ({
						getInvestigationResult,
						onNewAssessment: (patientId, patient) => {
							console.log("onNewAssessment@patient:", {
								patient,
							});
							navigation.navigate("lab.patient_intake", {
								patient,
								id: patientId,
							});
						},
						onOpenVisit: (visit) => {
							navigation.navigate("lab.patient_visit", {
								visit,
							});
						},
					}),
				})}
			/>
			{/* Start of taking the patient patient information */}
			<Stack.Screen
				name="lab.patient_intake"
				component={withFlowContext(BasicIntake, {
					actions: ({ navigation }) => ({
						onCompleteIntake: (id, data) => {
							// update the intake data
							update("intake", data);

							// set the ID.. .IMPORTANT
							update("patientId", id);

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
					entry: {
						// added as fallback
						patient: visit.intake,
					},
					actions: ({ navigation }) => ({
						onCancel: () => {
							// reset the visit
							reset();
							navigation.navigate("lab.patient_information");
						},
						onCompleteAssessment: (symptoms, elsaDifferentials) => {
							const conditionTop =
								elsaDifferentials
									?.slice(0, 3)
									.map((s) => s.id) || [];

							const condition = conditionTop[0] || undefined;
							const recommendedTests = [].concat(
								...conditionTop
									.map((c) => {
										return (NextStepsItems[
											c as data.Condition
										]?.testRecommendations.map(
											(s) => s.id
										) || []) as data.LabTest[];
									})
									.filter((s) => s !== undefined)
							);

							update("symptoms", symptoms);
							update("condition", condition);
							update("recommendedTests", recommendedTests);

							navigation.navigate("lab.order_investigation", {
								condition,
								recommendedTests,
							});
						},
					}),
				})}
			/>
			<Stack.Screen
				name="lab.order_investigation"
				component={withFlowContext(OrderInvestigationScreen, {
					entry: {
						condition: visit.condition,
						recommendedTests: visit.recommendedTests || [],
					},
					actions: ({ navigation }) => ({
						onOrder: (investigations, err) => {
							const invObjs = investigations.map((inv) => {
								return {
									obj: data.investigation.fromId(inv),
									investigationId: inv,
									result: undefined,
								};
							});

							console.log("INVESTIGATIONS:", invObjs);
							update("investigations", invObjs);

							navigation.navigate("lab.confirm_visit");
						},
					}),
				})}
			/>
			<Stack.Screen
				name="lab.confirm_visit"
				component={withFlowContext(ConfirmPatientVisitScreen, {
					entry: {
						visit,
					},
					actions: ({ navigation }) => ({
						onCancel: () => {
							reset(), navigation.navigate("lab.dashboard");
						},
						onConfirmAppointment: (visit, err) => {
							console.log("CONFIRMING:", visit);
							const { investigations, ...rest } = visit;
							emr.collection("investigations")
								.addMult(investigations)
								.then((ids) => {
									// query documents
									emr.collection("investigations")
										.queryDocs<PatientInvestigation>({
											$id: ids,
										})
										.then((invs) => {
											console.log("INve:", invs);
											if (visit.patientId !== undefined) {
												emr.collection("visits")
													.addDoc({
														...rest,
														investigations:
															invs.map(
																({
																	$id,
																	...others
																}) => ({
																	id: $id,
																	...others,
																})
															),
														date: new Date().toUTCString(),
													})
													.then((id) => {
														console.log(
															"VISIT $id:",
															id
														);
														navigation.navigate(
															"lab.dashboard"
														);
													});
											} else {
												throw Error(
													"Patient ID MISSING"
												);
											}
										})
										.then(() =>
											navigation.navigate(
												"lab.confirm_visit"
											)
										)
										.catch(() => {
											console.warn(
												"FAILED TO FETCH THE INVESTIGATIONS"
											);
											err &&
												err(
													"FAILED TO FETCH THE INVESTIGATIONS"
												);
										});
								})
								.catch(() => {
									console.warn(
										"FAILED TO ORDER INVESTIGATIONS"
									);
									err &&
										err("FAILED TO ORDER INVESTIGATIONS");
								});
						},
					}),
				})}
			/>
			<Stack.Screen
				name="lab.patient_visit"
				component={withFlowContext(PatientVisit, {
					entry: {
						emr,
					},
					actions: (_) => ({
						getInvestigationResult: getInvestigationResult,
					}),
				})}
			/>
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
			<MainLabComponent user={user} emr={store} />
		</LabContextProvider>
	);
}
