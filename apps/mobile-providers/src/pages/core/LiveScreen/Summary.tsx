import React from "react";
import { Layout, Text } from "../../../@libs/elsa-ui/components";
import { Alert, Pressable, View, ScrollView, BackHandler } from "react-native";
import {
	normalValueDiscretization,
	useElsaLambda,
	useSymptomAssessment,
} from "../../../app/context/assessment";
import {
	CommonActions,
	StackActions,
	useNavigation,
} from "@react-navigation/native";
import { properAgeString, useSymptomsInfo } from "../../../app/utils";
import { Button } from "../../../@libs/elsa-ui/components/input";
import { CircleBar, SelectedConditionSummary } from "./components";
import {
	CheckIcon,
	MenuIcon,
	NextIcon,
	PencilAltIcon,
	XIcon,
} from "../../../assets/vectors";

import {
	symptoms as symptomsBag,
	useSypmtomLocale,
} from "../../../app/symptoms";
import theme from "../../../theme";
import { RevealContent } from "../../../@libs/elsa-ui/components/misc";
import { useSymptomInteractionContext } from "../../../app/interactionSymptoms";
import { useTranslation } from "react-i18next";
import { Differential, SymptomData, SymptomId } from "../../../../@types";
import { usePatientDescription } from "../PatientDescriptor/context";
import { setShowLivePreview } from "../liveContext";

// TODO: Replace this place holder function with a working hook
export function useBasicInfo() {
	const patient = usePatientDescription((s) => s.patientIntake);

	if (patient === undefined) {
		return undefined;
	}

	const { age, sex, pregnant } = patient;
	return { age, sex, pregnant };
}

/**
 * Total number of caps used in showing elsa's confidence
 */
const TOTAL_CAPS_COUNT = 10;
export function SymptomsListingSection() {
	const symptoms = useSymptomsInfo();
	const [addSymptom, reset, setShow] = useSymptomInteractionContext((s) => [
		s.addSymptomFromId,
		s.reset,
		s.setShowState,
	]);

	const onSelectSymptom = React.useCallback(
		(id: SymptomId, entry?: SymptomData) => {
			reset();
			addSymptom(id, entry, entry !== undefined);
			setShow("full");
			// close the preview on any action that references the main segment
			setShowLivePreview(false);
		},
		[addSymptom, reset]
	);

	const { t } = useTranslation("translation", {
		keyPrefix: "assessment.summary",
	});
	const { getSymptomById } = useSypmtomLocale();

	if (symptoms.length === 0) {
		return (
			<View
				style={{
					margin: 10,
					display: "flex",
					justifyContent: "center",
					alignItems: "center",
				}}
			>
				{/* <Text italic></Text> */}
				<Text italic style={{ textAlign: "center" }}>
					{" "}
					{t`signs_summary.no_symptoms`}.{" "}
					{t`signs_summary.no_symptoms_more`}
				</Text>
			</View>
		);
	}

	return (
		<View
			style={{
				display: "flex",
				marginVertical: 4,
				flexDirection: "row",
				flexWrap: "wrap",
			}}
		>
			{symptoms.map((symptom, ix) => {
				const content = getSymptomById(symptom.id);
				return (
					<Pressable
						onPress={() => {
							const { present, id, data } = symptom;
							// setup the symptoms
							if (present) {
								onSelectSymptom(
									id as SymptomId,
									data as SymptomData
								);
							} else {
								onSelectSymptom(id as SymptomId);
							}
						}}
						android_ripple={{ borderless: true, radius: 15 }}
						style={{
							marginLeft: ix > 0 ? 3 : 0,
							display: "flex",
							paddingHorizontal: 10,
							paddingVertical: 5,
							flexDirection: "row",
						}}
						key={`${ix}-${symptom.id}`}
					>
						{symptom.present ? (
							<CheckIcon width={20} height={20} />
						) : (
							<XIcon width={20} height={20} />
						)}
						{/* <View style={{ width: 18, height: 18, backgroundColor:  ? 'green': 'red', borderRadius: 20 }} /> */}
						<Text
							style={{
								marginLeft: 3,
								textTransform: "capitalize",
							}}
						>
							{content.symptom}
						</Text>
					</Pressable>
				);
			})}
		</View>
	);
}

export function ConditionViewSection({
	mainNavigator,
	conditions,
}: {
	mainNavigator: any;
	conditions: any[];
}) {
	const navigation = useNavigation();
	const [addSymptom, reset, setShow] = useSymptomInteractionContext((s) => [
		s.addSymptomFromId,
		s.reset,
		s.setShowState,
	]);

	const selectExisting = React.useCallback(
		(id: SymptomId, entry?: SymptomData) => {
			reset();
			addSymptom(id, entry, entry !== undefined);
			setShow("full");

			// close the preview on any action that references the main segment
			setShowLivePreview(false);
		},
		[addSymptom, reset]
	);

	const selectNew = React.useCallback(
		(searchString: string) => {
			// mainNavigator.dispatch(StackActions.push('patient.symptom.assessment', {
			//     screen: 'symptom.view.search',
			//     params: {
			//         searchInput: searchString
			//     }
			// }))

			mainNavigator.navigate("patient.symptom.assessment", {
				screen: "symptom.view.search",
				params: {
					searchInput: searchString,
				},
			});

			// close the preview on any action that references the main segment
			setShowLivePreview(false);
		},
		[navigation]
	);

	const { t } = useTranslation("translation", {
		keyPrefix: "assessment.summary",
	});

	if (conditions.length === 0) {
		return (
			<View style={{ marginVertical: 16 }}>
				<Text>{t`elsa_diagnosis.nothing`}!</Text>
			</View>
		);
	}

	// all the symptoms that I can present here
	const [first, ...other] = conditions;

	return (
		<ScrollView style={{ display: "flex", marginVertical: 10 }}>
			<View
				style={{
					flex: 1,
					display: "flex",
					flexDirection: "row",
					alignItems: "flex-start",
				}}
			>
				<View style={{ flexWrap: "nowrap" }}>
					<Text
						font="bold"
						style={{
							fontSize: 18,
							textTransform: "capitalize",
							color: theme.color.primary.dark,
						}}
					>
						1.
					</Text>
				</View>
				<View style={{ flex: 0.9 }}>
					<Text
						font="bold"
						style={{
							fontSize: 18,
							textTransform: "capitalize",
							color: theme.color.primary.dark,
						}}
					>
						{first.condition.trim().replace("-", " ")} (
						{(first.data.p * 100).toFixed(1)} %)
					</Text>
					<CircleBar
						size={15}
						count={first.count}
						total={TOTAL_CAPS_COUNT}
					/>
					<View style={{ marginVertical: 10 }}>
						<SelectedConditionSummary
							onSelectExistingSymptom={selectExisting}
							onSelectNewSymptom={selectNew}
							condition={{
								presentingSymptoms: first.presentingSymptoms,
								absentSymptoms: first.absentSymptoms,
							}}
						/>
					</View>
				</View>
			</View>

			<View style={{ marginTop: 8 }}>
				{/* <Text style={{ marginBottom: 4 }}>{t`elsa_diagnosis.other_conditions`}:</Text> */}
				{other.map((condition, ix) => (
					<View
						key={condition.condition}
						style={{
							flex: 1,
							display: "flex",
							flexDirection: "row",
							alignItems: "flex-start",
							marginVertical: 4,
						}}
					>
						<View style={{ flexWrap: "nowrap" }}>
							<Text
								font="medium"
								style={{
									textTransform: "capitalize",
									color: theme.color.primary.base,
									overflow: "hidden",
								}}
							>
								{ix + 2}.
							</Text>
						</View>
						<View
							style={{
								flex: 0.9,
								flexWrap: "nowrap",
								marginLeft: 4,
							}}
						>
							<View
								style={{
									display: "flex",
									flexDirection: "row",
									alignItems: "center",
								}}
							>
								<Text
									font="medium"
									style={{
										textTransform: "capitalize",
										color: theme.color.primary.base,
									}}
								>
									{condition.condition
										.trim()
										.replace("-", " ")}{" "}
									({(condition.data.p * 100).toFixed(1)} %)
								</Text>
								<CircleBar
									count={condition.count || 0}
									style={{ marginLeft: 10 }}
									total={TOTAL_CAPS_COUNT}
								/>
							</View>
						</View>
					</View>
				))}
			</View>
		</ScrollView>
	);
}

export default function SummaryView({
	mainNavigator,
}: {
	route: any;
	mainNavigator: any;
}) {
	const { age, sex } = useBasicInfo();
	const navigation = useNavigation();
	const symptoms = useSymptomsInfo();

	const navigateToAddSymptom = React.useCallback(() => {
		// mainNavigator.navigate(StackActions.push('patient.symptom.assessment', {
		//     screen: 'symptom.view.search'
		// }))
		mainNavigator.navigate("patient.symptom.assessment", {
			screen: "symptom.view.search",
		});
		// close the preview on any action that references the main segment
		setShowLivePreview(false);
	}, [navigation]);

	const main_navigateToPatientIntake = React.useCallback(() => {
		// mainNavigator.dispatch(StackActions.push('patient.intake'))
		mainNavigator.navigate("patient.intake");
		// close the preview on any action that references the main segment
		setShowLivePreview(false);
	}, [mainNavigator]);

	const main_navigateToCompaintsDetails = React.useCallback(() => {
		// mainNavigator.dispatch(StackActions.push('patient.symptom.assessment'))
		mainNavigator.navigate("patient.symptom.assessment");
		// close the preview on any action that references the main segment
		setShowLivePreview(false);
	}, [mainNavigator]);

	const { patient, psstr, asstr, getDiscretized, fetchFromElsaLambda } =
		useElsaLambda();

	const [ready, setReady] = React.useState(false);
	const [conditions, setConditions] = React.useState<Differential[]>([]);

	React.useEffect(() => {
		if (!ready) {
			fetchFromElsaLambda(patient, psstr, asstr)
				.then((c) =>
					setConditions(
						c.map((s) => ({
							id: s.condition,
							p: s.p,
							condition: s.label,
							symptoms: s.symptoms,
						}))
					)
				)
				.catch(() => setConditions([]))
				.finally(() => setReady(true));
		}
	}, [ready, psstr, asstr]);

	const setElsaData = usePatientDescription(
		(s) => (conditions: Differential[], computed: any[]) =>
			s.setData({ elsa: { conditions, computed } })
	);

	const getDiscretizedConditions = React.useCallback(
		(elsa_conditions: Differential[], asstr: string[]) => {
			if (elsa_conditions.length > 2) {
				return getDiscretized(
					normalValueDiscretization,
					elsa_conditions,
					asstr,
					3,
					TOTAL_CAPS_COUNT
				);
			} else {
				return [];
			}
		},
		[getDiscretized, TOTAL_CAPS_COUNT]
	);

	React.useEffect(() => {
		// Update the relevant data showing Elsa's insights
		setElsaData(conditions, getDiscretizedConditions(conditions, asstr));
	}, [conditions, asstr, getDiscretizedConditions]);

	React.useEffect(() => {
		setReady(false);
	}, [psstr, asstr]);

	const { t } = useTranslation("translation", {
		keyPrefix: "assessment.summary",
	});
	const { t: tc } = useTranslation("translation", { keyPrefix: "common" });

	const patientIntakeData = usePatientDescription((s) => s.patientIntake);
	// const medicalHistory = usePatientDescription(s => s.medicalHistory)
	// const dietaryHistory = usePatientDescription(s => s.dietaryHistory)

	// const patientIntakeData = usePatientDescription(s => s.patientIntake)

	return (
		<Layout hideHeader style={{ padding: 0, flex: 1 }}>
			<ScrollView
				style={{ marginVertical: 18, flex: 1 }}
				alwaysBounceVertical
				showsVerticalScrollIndicator
			>
				{/* Header */}
				<View
					style={{
						display: "flex",
						alignItems: "center",
						flexDirection: "row",
						paddingHorizontal: 24,
					}}
				>
					<View>
						<Text
							style={{
								fontSize: 20,
								textTransform: "capitalize",
							}}
						>
							{tc("gender_patient", {
								sex_text: tc(`sex.${sex}`),
							})}
						</Text>
						<Text style={{ fontSize: 16 }}>
							{properAgeString(age)}
						</Text>
					</View>
				</View>

				{/* Symptoms */}
				<View style={{ marginVertical: 10, paddingHorizontal: 24 }}>
					<View
						style={{
							display: "flex",
							flexDirection: "row",
							alignItems: "center",
							justifyContent: "space-between",
						}}
					>
						<Text font="bold" style={{ fontSize: 17 }}>
							Complaints
						</Text>
						<Pressable
							style={{ padding: 6, borderRadius: 100 }}
							hitSlop={20}
							android_ripple={{ radius: 20, borderless: true }}
							onPress={main_navigateToCompaintsDetails}
						>
							<PencilAltIcon />
						</Pressable>
					</View>
					<View>
						<SymptomsListingSection />
					</View>
					<View>
						<Button
							outline
							onPress={navigateToAddSymptom}
							title={t`buttons.add`}
						/>
					</View>
				</View>

				<RevealContent
					show={symptoms.length > 0}
					style={{
						borderTopWidth: 1,
						borderTopColor: "#4BB8E9",
						marginTop: 16,
					}}
				>
					{!ready ? (
						<View
							style={{
								flex: 1,
								paddingHorizontal: 24,
								marginVertical: 16,
							}}
						>
							<Text>{tc`loading`}...</Text>
						</View>
					) : symptoms.length > 0 ? (
						<View style={{ flex: 1, paddingHorizontal: 24 }}>
							<View style={{ marginVertical: 10, marginTop: 20 }}>
								<Text
									font="medium"
									style={{ fontSize: 17 }}
								>{t`elsa_diagnosis.title`}</Text>
								<View>
									<ConditionViewSection
										mainNavigator={mainNavigator}
										conditions={
											conditions.length === 0
												? []
												: getDiscretizedConditions(
														conditions,
														asstr
												  )
										}
									/>
								</View>
							</View>
						</View>
					) : null}
				</RevealContent>

				{/* Patient */}
				<View
					style={{
						marginVertical: 10,
						paddingHorizontal: 24,
						paddingVertical: 16,
						borderTopWidth: 1,
						borderTopColor: "#4BB8E9",
					}}
				>
					<View
						style={{
							display: "flex",
							flexDirection: "row",
							alignItems: "center",
							justifyContent: "space-between",
						}}
					>
						<Text font="bold" style={{ fontSize: 17 }}>
							Patient Summary
						</Text>
						{patientIntakeData !== undefined && (
							<Pressable
								style={{ padding: 6, borderRadius: 100 }}
								hitSlop={20}
								android_ripple={{
									radius: 20,
									borderless: true,
								}}
								onPress={main_navigateToPatientIntake}
							>
								<PencilAltIcon />
							</Pressable>
						)}
					</View>
					{patientIntakeData !== undefined &&
					(patientIntakeData.allergies.length > 0 ||
						patientIntakeData.chronicIllnesses.length > 0 ||
						patientIntakeData.pregnant) ? (
						// Shows the patient related to the Information
						<View>
							{/* For allergies */}
							<RevealContent
								show={patientIntakeData.allergies.length > 0}
								style={{ marginBottom: 10 }}
							>
								<Text>Allergies:</Text>
								{patientIntakeData.allergies.map((m, ix) => (
									<View
										key={ix}
										style={{
											display: "flex",
											flexDirection: "row",
											alignItems: "center",
											justifyContent: "flex-start",
										}}
									>
										<View>
											<Text>{ix + 1}.</Text>
										</View>
										{/* <View style={{ width: 8, height: 8, backgroundColor: theme.color.primary.dark, borderRadius: 8 }} /> */}
										<Text style={{ marginLeft: 10 }}>
											{m}
										</Text>
									</View>
								))}
							</RevealContent>

							{/* For chronic Illnesses */}
							<RevealContent
								show={
									patientIntakeData.chronicIllnesses.length >
									0
								}
								style={{ marginBottom: 10 }}
							>
								<Text>Chronic Illnesses:</Text>
								{patientIntakeData.chronicIllnesses.map(
									(m, ix) => (
										<View
											key={ix}
											style={{
												display: "flex",
												flexDirection: "row",
												alignItems: "center",
												justifyContent: "flex-start",
											}}
										>
											<View>
												<Text>{ix + 1}.</Text>
											</View>
											{/* <View style={{ width: 8, height: 8, backgroundColor: theme.color.primary.dark, borderRadius: 8 }} /> */}
											<Text style={{ marginLeft: 10 }}>
												{m}
											</Text>
										</View>
									)
								)}
							</RevealContent>
						</View>
					) : (
						// shows null information
						<View>
							<Text
								italic
								style={{ textAlign: "center", color: "#555" }}
							>
								Data associated with this patient is yet
								available. It will show up here once it is
								available.
							</Text>
						</View>
					)}
				</View>

				{/* Patient */}
				{/* <View style={{ marginVertical: 10, paddingHorizontal: 24 }}>
                    <View style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between'  }}>
                        <Text font="bold" style={{ fontSize: 17 }}>Patient History</Text>
                    </View>
                    <View>
                    </View>
                </View> */}
			</ScrollView>
		</Layout>
	);
}
