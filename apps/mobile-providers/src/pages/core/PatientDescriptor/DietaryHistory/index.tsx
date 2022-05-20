import produce from "immer";
import { capitalize, kebabCase } from "lodash";
import React from "react";
import { ScrollView, StyleSheet, View } from "react-native";
import { Layout, Text } from "../../../../@libs/elsa-ui/components";
import { Button, TextInput } from "../../../../@libs/elsa-ui/components/input";

import { NativeBaseProvider, Checkbox } from "native-base";
import { StackActions, useNavigation } from "@react-navigation/native";
import { usePatientDescription } from "../context";

type DietaryHistoryForm = {
	eatDayCount: string | undefined;
	mealFrequency: string | undefined;
	mealContents: string[];
};

export type DietaryHistory = {
	eatDayCount: number | undefined;
	mealFrequency: number | undefined;
	mealContents: string[];
};

/**
 * Convert the input from `DietaryHistoryForm` type to `DietaryHistory` type.
 */
const standardizeData = (data: DietaryHistoryForm) => {
	const { eatDayCount, mealFrequency, mealContents } = data;
	return {
		eatDayCount: eatDayCount ? parseInt(eatDayCount) : undefined,
		mealFrequency: mealFrequency ? parseInt(mealFrequency) : undefined,
		mealContents,
	};
};

const revertData = (data: DietaryHistory): DietaryHistoryForm => {
	const { eatDayCount, mealFrequency, mealContents } = data;
	return {
		eatDayCount:
			eatDayCount !== undefined ? eatDayCount.toString() : undefined,
		mealFrequency:
			mealFrequency !== undefined ? mealFrequency.toString() : undefined,
		mealContents,
	};
};

const DEFAULT_DIETARY_HISTORY_STATE = {
	eatDayCount: undefined,
	mealFrequency: undefined,
	mealContents: [],
};

const prepareList = (list: string[]) =>
	list
		.map((k) => capitalize(k.toLowerCase()))
		.map((k) => ({ id: kebabCase(k), name: k }));
const FOOD_LIST = prepareList([
	"Vegetables",
	"Legumes and Beans",
	"Eggs",
	"Meat",
]);

export default function DietaryHistory() {
	const navigation = useNavigation();

	const dietaryHistory = usePatientDescription((s) => s.dietaryHistory);
	const [vals, setVals] = React.useState<DietaryHistoryForm>(() =>
		dietaryHistory !== undefined
			? revertData(dietaryHistory)
			: DEFAULT_DIETARY_HISTORY_STATE
	);

	const setMealContents = React.useCallback(
		(vals: string[]) => {
			setVals((k) =>
				produce(k, (df) => {
					df["mealContents"] = vals;
				})
			);
		},
		[setVals]
	);

	const setDietaryHistory = usePatientDescription(
		(s) => (dietaryHistory: DietaryHistory) => s.setData({ dietaryHistory })
	);

	return (
		<Layout
			navigation={navigation}
			title={"Dietary History"}
			style={{ padding: 0, paddingTop: 0 }}
			hideLogo
		>
			<ScrollView
				style={{ flex: 0.9, paddingHorizontal: 24, paddingVertical: 8 }}
			>
				<View style={{ marginBottom: 8 }}>
					<Text>How many meals do you eat per day?</Text>
					<View>
						<TextInput
							placeholder="Years"
							value={vals.eatDayCount}
							onChangeText={(text) =>
								setVals((k) =>
									produce(k, (df) => {
										df["eatDayCount"] = text;
									})
								)
							}
							keyboardType="numeric"
							style={[sty.numberText, { width: "33%" }]}
						/>
					</View>
				</View>

				<View style={{ marginBottom: 8 }}>
					<Text>What is the frequency?</Text>
					<View>
						<TextInput
							placeholder="Years"
							value={vals.mealFrequency}
							onChangeText={(text) =>
								setVals((k) =>
									produce(k, (df) => {
										df["mealFrequency"] = text;
									})
								)
							}
							keyboardType="numeric"
							style={[sty.numberText, { width: "33%" }]}
						/>
					</View>
				</View>

				<View style={{ marginBottom: 8 }}>
					<Text>What foods do you typically eat every day?</Text>
					<NativeBaseProvider>
						<Checkbox.Group
							onChange={setMealContents}
							value={vals.mealContents}
							accessibilityLabel="Choose "
						>
							{FOOD_LIST.map((f) => (
								<Checkbox value={f.id} key={f.id}>
									{f.name}
								</Checkbox>
							))}
						</Checkbox.Group>
					</NativeBaseProvider>
				</View>
			</ScrollView>

			<View style={{ paddingHorizontal: 24, marginVertical: 6 }}>
				<Text style={{ fontSize: 14, color: "#777", marginBottom: 6 }}>
					Clicking the button below, you would save the latest dietary
					history information for the patient
				</Text>
				<Button
					onPress={() => {
						setDietaryHistory(standardizeData(vals));
						navigation.dispatch(
							StackActions.push("patient.concluding")
						);
					}}
					title="Next: Final Assessment"
				/>
			</View>
		</Layout>
	);
}

const sty = StyleSheet.create({
	numberText: {
		borderWidth: 0,
		borderBottomWidth: 1,
		fontSize: 18,
		alignSelf: "baseline",
	},
});
