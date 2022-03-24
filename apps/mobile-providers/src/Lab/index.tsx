import { createNativeStackNavigator } from "@react-navigation/native-stack";
import React from "react";
import BasicEMRDashboardScreen from "../@workflows/screens/BasicEMRDashboard";
import PatientInformationScreen from "../@workflows/screens/PatientInformation";
import BasicIntake from "../@workflows/screens/BasicIntake";

import { withFlowContext } from "../@workflows/wrapper";
import BasicAssessment from "../@workflows/screen-groups/BasicAssessment";
import PatientVisit from "../@workflows/screen-groups/PatientFolder";
import { LabContextProvider, useLabContext } from "./context";
import OrderInvestigationScreen from "../@workflows/screens/OrderInvestigation";
import BasicRegisterNewPatientScreen from "../@workflows/screens/BasicRegisterNewPatient";

import * as data from "../@libs/data-fns";
import { Store } from "../@libs/storage-core";
import produce from "immer";
import ConfirmPatientVisitScreen from "../@workflows/screens/ConfirmPatientVisit";
import { keyGenerator } from "../app/storage";
import { Portal, Snackbar } from "react-native-paper";
import { ToastAndroid } from "react-native";

const Stack = createNativeStackNavigator();

// TODO: Add authcheck on app start
// TODO: fix the dateOfBirth parsing... converts to invalid date (try: date: 06, month: 21, year: 1994)
// Build the contents needed to construct the next steps
const NextStepsItems = data.nextSteps.basic(
	data.conditions.ids,
	data.medications.all.ids,
	data.investigation.ids
);

async function saveAndGetPatientFromStore(
	patient: Omit<Patient, "id">,
	emr: Store
): Promise<Patient | null> {
	try {
		const patientId = await emr.collection("patients").addDoc(patient);

		if (patient !== null) {
			return { id: patientId, ...patient };
		} else {
			throw Error("Unable to fetch new patient");
		}
	} catch (err) {
		console.warn("Unable to create new patient");
		console.log(err);
		throw err;
	}
}

async function fetchPatientVisitsFromStore(patientId: string, emr: Store) {
	return await emr
		.collection("visits")
		.queryDocs<PatientVisit>({ patientId: patientId });
}

async function fetchPatientsFromStore(emr: Store) {
	const ps = await emr.collection("patients").queryDocs<Patient>();

	return ps.map((p) => {
		const { $id, ...other } = p;
		return { ...other, id: $id };
	});
}

async function fetchPatientFromStore(patientId: string, emr: Store) {
	return await emr
		.collection("patients")
		.queryDoc<Patient>({ $id: patientId });
}

async function saveVisitSession(visit: Omit<VisitSession, "date">, emr: Store) {
	const { investigations, ...data } = visit;
	console.log("&STRIGNY:", JSON.stringify(investigations));
	try {
		const ids = await emr
			.collection("investigations")
			.addMult(investigations);

		console.log("IDS:", ids);

		const invRecords = await emr
			.collection("investigations")
			.queryDocs<PatientInvestigation>({
				$id: ids,
			});

		console.log({ ids, invRecords });

		if (visit.patientId !== undefined) {
			const visitId = await emr.collection("visits").addDoc({
				...data,
				investigations: invRecords.map(({ $id, ...others }) => ({
					id: $id,
					...others,
				})),
				date: new Date().toUTCString(),
			});

			return visitId;
		} else {
			throw Error("Patient ID MISSING");
		}
	} catch (err) {
		throw err;
	}
}

const getInvestigation = async (id: string, emr: Store) => {
	const results = await emr
		.collection("investigations")
		.queryDoc({ $id: "b4d7fee0-0c94-4289-bf51-5f1ee261c097" });
	return results;
};

function MainLabComponent({
	user,
	emr,
}: {
	user: { fullName: string };
	emr: Store;
}) {
	// const visits = useLabContext((s) => s.visits);
	const patients = useLabContext((s) => s.patients);

	const setPatients = useLabContext((s) => s.setPatients);
	const lab = useLabContext((s) => s);
	React.useEffect(() => {
		fetchPatientsFromStore(emr).then((p) => {
			setPatients(p);
		});
	}, []);

	// session
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

	const [message, setMessage] = React.useState<{
		text: string;
		type: "error" | "success" | "default";
	} | null>(null);

	const dismiss = () => {
		setMessage(null);
	};

	React.useEffect(() => {
		console.log("Visit object changed to", visit);
	}, [visit]);

	return (
		<>
			<Stack.Navigator
				screenOptions={{ headerShown: false }}
				// initialRouteName="lab.patient_information"
			>
				<Stack.Screen
					name="lab.dashboard"
					component={withFlowContext(BasicEMRDashboardScreen, {
						entry: {
							fullName: user.fullName,
							recentPatients: patients,
						},
						actions: ({ navigation }) => {
							return {
								onNewPatient: () =>
									navigation.navigate("lab.new_patient"),
								onOpenFile: (patient) => {
									navigation.navigate(
										"lab.patient_information",
										{
											patient,
										}
									);
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
								saveAndGetPatientFromStore(patient, emr).then(
									(p) => {
										console.log("SAVE: ", { patient, p });
										if (p !== null) {
											lab.addPatient(p);
											navigation.replace(
												"lab.patient_information",
												{
													patient: p,
													store: emr,
												}
											);
										}
									}
								);
							},
						}),
					})}
				/>
				<Stack.Screen
					name="lab.patient_information"
					component={withFlowContext(PatientInformationScreen, {
						actions: ({ navigation }) => ({
							getPatientVisits: (patientId) =>
								fetchPatientVisitsFromStore(patientId, emr),
							getInvestigation: (id) => getInvestigation(id, emr),

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
								// reset storage
								reset();
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
							onCompleteAssessment: (
								symptoms,
								elsaDifferentials
							) => {
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
								reset();
								navigation.navigate("lab.dashboard");
							},
							onConfirmAppointment: (visit, err) => {
								saveVisitSession(visit, emr)
									.then(() => {
										fetchPatientFromStore(
											visit.patientId,
											emr
										)
											.then((patient) => {
												setMessage({
													text: `Record visit for ${visit.patientId}`,
													type: "success",
												});
												navigation.navigate(
													"lab.patient_information",
													{ patient }
												);
											})
											.then(() => reset())
											.catch(err);
									})
									.catch(err);
							},
						}),
					})}
				/>
				<Stack.Screen
					name="lab.patient_visit"
					component={withFlowContext(PatientVisit, {
						actions: (_) => ({
							getInvestigation: (id) => getInvestigation(id, emr),
							updateMultipleInvestigationResult: async (irp) => {
								console.log(irp);

								ToastAndroid.show(
									`Investigations updated `,
									ToastAndroid.LONG
								);
							},
							onUpdateInvestigationResult: (id, obj, err) => {
								console.log({ id, obj });
								// await emr
								// 	.collection("investigations")
								// 	.doc(id)
								// 	.set<PatientInvestigation>(obj);
								// return id;
							},
						}),
					})}
				/>
			</Stack.Navigator>
			<Portal>
				<Snackbar
					visible={message !== null}
					onDismiss={dismiss}
					action={{
						label: "Undo",
						onPress: () => {
							// Do something
						},
					}}
				>
					{message?.text}
				</Snackbar>
			</Portal>
		</>
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
