import React from "react";
import { View } from "react-native";

import { StackActions, useNavigation } from "@react-navigation/native";
import { Layout, Text } from "../../../../@libs/elsa-ui/components";
import { CheckIcon, ExclamationIcon } from "../../../../assets/vectors";
import { conditionsList, getCondition } from "../../../../app/symptoms";
import theme from "../../../../theme";
import {
	RevealContent,
	SectionedSelect,
} from "../../../../@libs/elsa-ui/components/misc";
import { TextInput } from "../../../../@libs/elsa-ui/components/input";
import { Recommendations, useMainState } from "../../../../app/context/main";
import { useSymptomAssessment } from "../../../../app/context/assessment";
import CheckBox from "@react-native-community/checkbox";
import { ScrollView } from "react-native-gesture-handler";
import { MEDICAL_TESTS, MEDICATIONS } from "../../../../app/recommendations";
import { Pressable } from "../../../../@libs/elsa-ui/components/pressable";
import { useTranslation } from "react-i18next";
import { ConditionId, Differential, SymptomId } from "../../../../../@types";

// import nextStepsBasic from '../../../../assets/data/next-steps-basic.json'
// import nextStepsExtended from '../../../../assets/data/next-steps-extended.json'

import * as data from "../../../../@libs/data-fns";
import { useApplication } from "../../../../app/context/app";
// import { Symptom } from '../../../../app/libs/data-fns';
import produce from "immer";
import { Medication } from "../../../../@libs/data-fns";
import { usePatientDescription } from "../context";
import shallow from "zustand/shallow";

// const nextStepsBasic = data.nextSteps.basic(data.conditions.ids, data.medications.all.ids, data.labTests.ids)
const nse = data.nextSteps.extended(
	data.conditions.ids,
	data.medications.all.ids,
	data.labTests.ids
);
const nextSteps = nse.all;
export function RecommendedInfo({
	conditionId,
	collapsed = false,
}: {
	conditionId: data.Condition;
	collapsed?: boolean;
}) {
	const s = nextSteps[conditionId];

	if (s === undefined) {
		return null;
	}

	// get the languages
	const lang = useApplication((s) => s.settings.lang || "en");
	const { t } = useTranslation("translation", {
		keyPrefix: "assessment.feedback.next_steps",
	});

	React.useEffect(() => {
		console.debug("Working on a collapse function.");
	}, []);

	const testRecommendations = React.useMemo(
		() =>
			s.testRecommendations
				.map((m) => ({ id: m.id, text: m[lang] }))
				.filter((s) => s.text !== undefined),
		[lang, s]
	);

	const medications = React.useMemo(
		() =>
			s.medications
				.map((m) => ({ id: m.id, text: m[lang] }))
				.filter((s) => s.text !== undefined),
		[lang, s]
	);

	return (
		<View
			style={{
				marginVertical: 6,
				padding: 8,
				borderWidth: 1,
				borderRadius: 8,
				borderColor: "#CCC",
			}}
		>
			<Text font="bold" style={{ fontSize: 20, marginVertical: 5 }}>
				{data.conditions.name.fromId(conditionId)}
			</Text>

			{/* information if you are refering the information */}
			<RevealContent
				style={{ marginVertical: 5 }}
				show={s.referAndTriageLevel?.[lang] !== undefined}
			>
				<View style={{ display: "flex", flexDirection: "row" }}>
					<View
						style={{
							width: 5,
							height: 5,
							backgroundColor: theme.color.secondary.base,
							borderRadius: 8,
							margin: 8,
						}}
					/>
					<Text font="medium">{s.referAndTriageLevel[lang]}</Text>
				</View>
			</RevealContent>

			{/* Dispense medication */}
			<RevealContent
				style={{ marginVertical: 5 }}
				show={medications.length > 0}
			>
				<View style={{ display: "flex", flexDirection: "row" }}>
					<View
						style={{
							width: 5,
							height: 5,
							backgroundColor: theme.color.secondary.base,
							borderRadius: 8,
							margin: 8,
						}}
					/>
					<View>
						<Text
							font="medium"
							style={{ marginVertical: 5 }}
						>{t`dispense_meds`}</Text>
						{medications.map((m, ix) => (
							<View
								key={m.id}
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
								<Text style={{ marginLeft: 10 }}>{m.text}</Text>
							</View>
						))}
					</View>
				</View>
			</RevealContent>

			{/* Recommended patients */}
			<RevealContent
				style={{ marginVertical: 5 }}
				show={testRecommendations.length > 0}
			>
				<View style={{ display: "flex", flexDirection: "row" }}>
					<View
						style={{
							width: 5,
							height: 5,
							backgroundColor: theme.color.secondary.base,
							borderRadius: 8,
							margin: 8,
						}}
					/>

					<View>
						<Text
							font="medium"
							style={{ marginVertical: 5 }}
						>{t`recommend_tests`}</Text>
						{testRecommendations.map((m, ix) => (
							<View
								key={m.id}
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
								<Text style={{ marginLeft: 10 }}>{m.text}</Text>
							</View>
						))}
					</View>
				</View>
			</RevealContent>

			{/* Other recommendations */}
			<RevealContent
				style={{ marginVertical: 5 }}
				show={s.otherRecommendations?.[lang]?.trim() !== undefined}
			>
				<View style={{ display: "flex", flexDirection: "row" }}>
					<View
						style={{
							width: 5,
							height: 5,
							backgroundColor: theme.color.secondary.base,
							borderRadius: 8,
							margin: 8,
						}}
					/>
					<Text font="medium">{s.otherRecommendations?.[lang]}</Text>
				</View>
			</RevealContent>
		</View>
	);
}

export function NextSteps({ conditions }: { conditions: data.Condition[] }) {
	if (conditions.length === 0) {
		return null;
	}

	const [first, ...other] = conditions;
	return (
		<View style={{ marginVertical: 10 }}>
			<RecommendedInfo conditionId={first} />
			<RevealContent show={other.length >= 0}>
				{other.map((s, ux) => (
					<React.Fragment key={ux}>
						<RecommendedInfo conditionId={s} collapsed />
					</React.Fragment>
				))}
			</RevealContent>
		</View>
	);
}

export default function FinalAssessmentScreen() {
	const navigation = useNavigation();
	const selected_conditions = usePatientDescription(
		(s) => s.elsa.computed,
		shallow
	);

	const [err, setErr] = React.useState<string | null>(null);

	const assessmentInfo = useSymptomAssessment((s) => s);

	const vals = usePatientDescription((s) => s.assessment.record);
	const setVals = usePatientDescription(
		(s) => (dc: (data: Recommendations) => Recommendations) =>
			s.setDataChange((data) =>
				produce(data, (df) => {
					df.assessment.record = dc(df["assessment"]["record"]);
					return df;
				})
			)
	);

	const selectedConditions = usePatientDescription(
		(s) => s.assessment.conditions,
		shallow
	);
	const setSelectedConditions = usePatientDescription(
		(s) => (conditions: ConditionId[]) =>
			s.setDataChange((data) =>
				produce(data, (df) => {
					df.assessment.conditions = conditions;
					return df;
				})
			)
	);
	// const setVals = usePatientDescription(s => ())
	// const [vals, setVals] = React.useState<Vals>({
	//     ref_nearest: false,
	//     refered_lab_testing: {
	//         selected: false,
	//         tests: []
	//     },
	//     dispensed_medication: {
	//         selected: false,
	//         medications: []
	//     },
	//     recommendations: ""
	// })

	const { t } = useTranslation("translation", {
		keyPrefix: "assessment.feedback",
	});
	const { t: tc } = useTranslation("translation", { keyPrefix: "common" });

	const searchableConditions = React.useMemo(() => {
		// REMOVE ELSA SELECTED COMPUTERS
		const selected_children = []; // selected_conditions.map(s => getCondition(s.data.id)).filter(s => s !== undefined)

		const conditionChildren = conditionsList
			.map((c) => ({ name: c.condition, id: c.id }))
			.sort((a, b) => a.name.localeCompare(b.name));
		return [
			...(selected_children.length > 0
				? [
						{
							name: t`condition_decision.component.elsa_choices`,
							id: 0,
							children: selected_children.map((d) => ({
								name: d?.condition,
								id: d?.id,
							})),
						},
				  ]
				: []),
			{
				name: t`condition_decision.component.all_conditions`,
				id: 1,
				children: conditionChildren,
			},
		];
	}, [t, selected_conditions]);

	const searchableLabTests = React.useMemo(() => {
		return [
			{
				name: t`recommendations.refered_to_lab_tests.component.all_lab_tests`,
				id: 1,
				children: MEDICAL_TESTS,
			},
		];
	}, [t]);

	const searchableMedications = React.useMemo(() => {
		return [
			{
				name: t`recommendations.dispensed_medications.component.all_medications`,
				id: 1,
				children: MEDICATIONS,
			},
		];
	}, [t]);

	const [shouldGiveORS, setShouldGiveORS] = React.useState<boolean>(false);

	React.useEffect(() => {
		const medications = vals.dispensed_medication.medications;
		const presentingSymptoms = assessmentInfo.presentingSymptoms.map(
			(s) => s.id
		);
		const meetsBasicCondition = (["diarrhoea", "vomiting"] as SymptomId[])
			.map((symp) => presentingSymptoms.includes(symp as SymptomId))
			.reduce((x, y) => x || y);

		// basic condtion is met and ors is not supplied
		setShouldGiveORS(
			meetsBasicCondition &&
				!medications.includes("oral-rehydration-salts-ors")
		);
	}, [vals, assessmentInfo]);

	const addORSMedication = React.useCallback(() => {
		if (shouldGiveORS) {
			/**
			 * Conditions that need to be met to
			 */
			setVals((s) =>
				produce(s, (df) => {
					df.dispensed_medication.selected = true;
					df.dispensed_medication.medications.push(
						"oral-rehydration-salts-ors"
					);
					return df;
				})
			);
		}
	}, [setVals, shouldGiveORS]);

	return (
		<Layout
			navigation={navigation}
			title={t`title`}
			style={{ padding: 0, paddingTop: 0 }}
			hideLogo
		>
			<ScrollView
				style={{ flex: 1, paddingHorizontal: 24, paddingVertical: 8 }}
			>
				<View style={{ flex: 1 }}>
					{/* Condition Decision */}
					<View
						style={{
							borderBottomColor: theme.color.secondary.light,
							marginBottom: 10,
							borderBottomWidth: 1,
							paddingBottom: 6,
						}}
					>
						<Text
							font="bold"
							style={{ marginVertical: 10, fontSize: 18 }}
						>{t`condition_decision.title`}</Text>
						<Text>{t`condition_decision.description`}</Text>
						<View>
							<SectionedSelect
								confirmText={tc`close`}
								items={searchableConditions}
								uniqueKey="id"
								searchPlaceholderText={t`condition_decision.component.search_text`}
								selectText={t`condition_decision.component.text`}
								onSelectedItemsChange={(items) =>
									setSelectedConditions(items)
								}
								selectedItems={selectedConditions}
							/>
						</View>
					</View>

					{/* Elsa's next steps */}
					{/* These are the recommendations thta are provided to you by Elsa */}
					<RevealContent
						show={selectedConditions.length > 0}
						style={{ marginVertical: 10 }}
					>
						<View>
							<Text
								font="bold"
								style={{ marginVertical: 10, fontSize: 18 }}
							>{t`next_steps.title`}</Text>
							<Text>{t`next_steps.description`}</Text>
						</View>

						{/* Recommended */}
						<NextSteps
							conditions={selectedConditions.slice(0, 2)}
						/>
					</RevealContent>

					<View>
						<Text
							font="bold"
							style={{ marginVertical: 10, fontSize: 18 }}
						>{t`recommendations.title`}</Text>
						{/* Recommended Decision */}
						<View
							style={{
								display: "flex",
								flexDirection: "row",
								alignItems: "center",
								justifyContent: "space-between",
							}}
						>
							{/* Selection */}
							<Text>{t`recommendations.refered_nearest_facilty_text`}</Text>
							<CheckBox
								value={vals.ref_nearest}
								onValueChange={(newValue) =>
									setVals((s) => ({
										...s,
										ref_nearest: newValue,
									}))
								}
							/>
						</View>

						{/*  */}
						<View style={{ marginVertical: 12 }}>
							{/* Selection */}
							<View
								style={{
									display: "flex",
									flexDirection: "row",
									alignItems: "center",
									justifyContent: "space-between",
								}}
							>
								{/* Selection */}
								<Text>{t`recommendations.refered_to_lab_tests.text`}</Text>
								<CheckBox
									value={vals.refered_lab_testing.selected}
									onValueChange={(checked) =>
										setVals((s) =>
											produce(s, (df) => {
												df.refered_lab_testing.selected =
													checked;

												if (!checked) {
													df.refered_lab_testing.tests =
														[];
												}

												return df;
											})
										)
									}
								/>
							</View>
							<RevealContent
								show={vals.refered_lab_testing.selected}
							>
								<SectionedSelect
									confirmText={tc`close`}
									items={searchableLabTests}
									uniqueKey="id"
									searchPlaceholderText={t`recommendations.refered_to_lab_tests.component.search_text`}
									selectText={t`recommendations.refered_to_lab_tests.component.text`}
									onSelectedItemsChange={(testIds) =>
										setVals((s) => ({
											...s,
											refered_lab_testing: {
												...s.refered_lab_testing,
												tests: testIds,
											},
										}))
									}
									selectedItems={
										vals.refered_lab_testing.tests
									}
								/>
							</RevealContent>
						</View>

						{/*  */}
						<View style={{ marginVertical: 12 }}>
							{/* Selection */}
							<View
								style={{
									display: "flex",
									flexDirection: "row",
									alignItems: "center",
									justifyContent: "space-between",
								}}
							>
								{/* Selection */}
								<Text>{t`recommendations.dispensed_medications.text`}</Text>
								<CheckBox
									value={vals.dispensed_medication.selected}
									onValueChange={(checked) =>
										setVals((s) =>
											produce(s, (df) => {
												df.dispensed_medication.selected =
													checked;

												if (!checked) {
													df.dispensed_medication.medications =
														[];
												}
											})
										)
									}
								/>
							</View>
							{/* ORS warning */}
							{shouldGiveORS && (
								<View
									style={{
										marginVertical: 6,
										padding: 16,
										borderWidth: 2,
										borderRadius: 8,
										borderColor: "#ff960d",
										display: "flex",
										flexDirection: "column",
										alignItems: "center",
										width: "100%",
										paddingHorizontal: 10,
									}}
								>
									<View
										style={{
											flex: 1,
											display: "flex",
											flexDirection: "row",
											alignItems: "center",
											justifyContent: "space-between",
										}}
									>
										<ExclamationIcon
											width={28}
											height={28}
											style={{ color: "#ff960d" }}
										/>
										<View style={{ marginLeft: 5 }}>
											<Text
												font="bold"
												style={{
													color: "#ff960d",
													lineHeight: 20,
												}}
											>{t`next_steps.supply_ors_text`}</Text>
										</View>
									</View>
									<Pressable
										onPress={addORSMedication}
										style={{
											borderRadius: 100,
											marginTop: 10,
											backgroundColor: "#ff960d",
											paddingVertical: 5,
											paddingHorizontal: 16,
										}}
									>
										<Text
											font="bold"
											style={{ color: "#fff" }}
										>{t`next_steps.supply_ors_button`}</Text>
									</Pressable>
								</View>
							)}
							<RevealContent
								show={vals.dispensed_medication.selected}
							>
								<SectionedSelect
									confirmText={tc`close`}
									items={searchableMedications}
									uniqueKey="id"
									searchPlaceholderText={t`recommendations.dispensed_medications.component.search_text`}
									selectText={t`recommendations.dispensed_medications.component.text`}
									onSelectedItemsChange={(medicationIds) =>
										setVals((s) => ({
											...s,
											dispensed_medication: {
												...s.dispensed_medication,
												medications: medicationIds,
											},
										}))
									}
									selectedItems={
										vals.dispensed_medication.medications
									}
								/>
							</RevealContent>
						</View>

						{/* Recommendations */}
						<View style={{ marginVertical: 24 }}>
							{/* Selection */}
							<Text>{t`recommendations.additional_recommendations.text`}</Text>
							<TextInput
								style={{
									flex: 1,
									height: "100%",
									textAlignVertical: "top",
								}}
								containerStyle={{
									minHeight: 100,
									marginTop: 10,
								}}
								multiline
								placeholder={t`recommendations.additional_recommendations.placeholder`}
								value={vals.recommendations}
								onChangeText={(text) =>
									setVals((s) => ({
										...s,
										recommendations: text,
									}))
								}
							/>
						</View>
					</View>
				</View>
			</ScrollView>
		</Layout>
	);
}
