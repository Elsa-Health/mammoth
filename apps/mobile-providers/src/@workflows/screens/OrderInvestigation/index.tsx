import React from "react";
import { View, ScrollView } from "react-native";
import { Layout, Text } from "../../../@libs/elsa-ui/components";

import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import theme from "../../../theme";
import { Checkbox as RNPCheckbox } from "react-native-paper";

import * as data from "../../../@libs/data-fns";
import { SectionedSelect } from "../../../@libs/elsa-ui/components/misc";
import produce from "immer";
import { Button } from "react-native-paper";

function Checkbox({
	label,
	onChangeCheck,
}: {
	label: string;
	onChangeCheck: (checked: boolean) => void;
}) {
	const [checked, setChecked] = React.useState(false);
	React.useEffect(() => {
		onChangeCheck && onChangeCheck(checked);
	}, [checked]);
	return (
		<RNPCheckbox.Item
			label={label}
			status={checked ? "checked" : "unchecked"}
			onPress={() => setChecked((s) => !s)}
		/>
	);
}

export default function OrderInvestigationScreen({
	entry: { condition, recommendedTests },
	actions: $,
}: WorkflowScreen<
	{ condition: data.Condition; recommendedTests: data.LabTest[] },
	{
		onOrder: (investigations: data.LabTest[]) => void;
	}
>) {
	const [investigations, set] = React.useState<data.LabTest[]>([]);
	const setInvestigation = React.useCallback((inv: data.LabTest) => {
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

	return (
		<Layout title="Order Inverstigations" style={{ padding: 0 }}>
			<ScrollView
				contentContainerStyle={{
					paddingHorizontal: 24,
					paddingBottom: 16,
				}}
			>
				{/* Something */}
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
								condition}
						</Text>
					</Text>
				</View>
				<View
					style={{
						marginTop: theme.spacing.md,
						backgroundColor: "#FEF2F2",
						padding: 16,
						borderRadius: 6,
					}}
				>
					<View
						style={{
							display: "flex",
							flexDirection: "row",
							alignItems: "center",
						}}
					>
						<Icon name="close-circle" size={25} color="#991B1B" />

						<Text
							style={{ paddingLeft: 8, color: "#991B1B" }}
							font="bold"
						>
							Elsa's Recommendation
						</Text>
					</View>
					<Text style={{ color: "#991B1B" }}>
						The patient’s condition could be severe or might become
						severe. It is recommended that this patient is referred
						to a hospital as soon as possible.
					</Text>
				</View>

				{/* Recommendations */}
				<View>
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
					<View>
						<Text>Order other investigations:</Text>
						<SectionedSelect
							confirmText={"Confirm"}
							items={[
								{
									name: "Investigations",
									id: 1,
									children: data.labTests.values(),
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
