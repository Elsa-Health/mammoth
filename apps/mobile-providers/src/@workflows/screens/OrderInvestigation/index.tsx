import React from "react";
import { View, ScrollView } from "react-native";
import { Layout, Text } from "../../../@libs/elsa-ui/components";

import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import { Checkbox as RNPCheckbox } from "react-native-paper";

import * as data from "../../../@libs/data-fns";
import { SectionedSelect } from "../../../@libs/elsa-ui/components/misc";
import produce from "immer";
import { Button } from "react-native-paper";
import _ from "lodash";

export default function OrderInvestigationScreen({
	entry: { condition, recommendedTests },
	actions: $,
}: WorkflowScreen<
	{ condition?: data.Condition; recommendedTests: data.Investigation[] },
	{
		onOrder: (
			investigations: data.Investigation[],
			err?: (message: string) => void
		) => void;
	}
>) {
	console.log({ condition, recommendedTests });
	const [investigations, set] = React.useState<data.Investigation[]>([]);
	const setInvestigation = React.useCallback((inv: data.Investigation) => {
		set((s) =>
			produce(s, (df) => {
				const invIndex = df.findIndex((s) => s === inv);
				if (invIndex > -1) {
					// add
					df.splice(invIndex, 1);
				} else {
					df.push(inv);
				}
			})
		);
	}, []);

	const showRecommendedTests = recommendedTests.length > 0;

	return (
		<Layout title="Order Inverstigations" style={{ padding: 0 }}>
			<ScrollView
				contentContainerStyle={{
					paddingHorizontal: 24,
					paddingBottom: 16,
				}}
			>
				{/* Showing information on conditions */}
				{condition && (
					<View
						style={{
							display: "flex",
							flexDirection: "row",
							backgroundColor: "#EFF6FF",
							padding: 16,
							borderRadius: 6,
						}}
					>
						<Icon name="information" size={25} color="#1E40AF" />

						<Text style={{ paddingLeft: 8 }} color="#1E40AF">
							Based on our assessment, the most likely disease for
							your patient is{" "}
							<Text font="bold">
								{data.conditions.name.fromId(condition) ||
									_.capitalize(
										condition?.replace(/\-/i, " ")
									)}
							</Text>
						</Text>
					</View>
				)}
				{/* Recommendations */}
				<View>
					{showRecommendedTests && (
						<>
							<Text font="bold" style={{ paddingVertical: 12 }}>
								Recommended Tests
							</Text>
							<View>
								{recommendedTests.map((inv) => (
									<RNPCheckbox.Item
										key={inv}
										label={data.labTests.fromId(inv).name}
										status={
											investigations.includes(inv)
												? "checked"
												: "unchecked"
										}
										onPress={() => setInvestigation(inv)}
									/>
								))}
							</View>
						</>
					)}
					<View>
						<Text>
							{showRecommendedTests
								? "Order other investigations:"
								: "Select the investigations to later perform on the patient:"}
						</Text>
						<SectionedSelect
							confirmText={"Confirm"}
							items={[
								{
									name: "Investigations",
									id: 1,
									children: data.investigation.name.values(),
								},
							]}
							uniqueKey="id"
							searchPlaceholderText={"Search Investigations"}
							selectText={"Search"}
							onSelectedItemsChange={(
								testIds: data.LabTest[]
							) => {
								console.log(testIds);
								set(testIds);
							}}
							selectedItems={investigations}
						/>
					</View>
				</View>
			</ScrollView>
			{investigations.length > 0 && (
				<View style={{ paddingHorizontal: 24, marginBottom: 16 }}>
					<Button
						mode="contained"
						onPress={() => $.onOrder(investigations)}
					>
						Order
					</Button>
				</View>
			)}
		</Layout>
	);
}
