import React from "react";
import { Pressable, View } from "react-native";
import {
	Button,
	Divider,
	ProgressBar,
	RadioButton,
	TextInput,
} from "react-native-paper";
import { Layout, Text } from "../../../@libs/elsa-ui/components";

import theme from "../../../theme";

import * as data from "../../../@libs/data-fns";
import { ScrollView } from "react-native-gesture-handler";
import produce from "immer";

export default function InvestigationResultsForm({
	entry: { investigation: investigation, result },
	actions: $,
}: WorkflowScreen<{
	investigation: PatientInvestigation;
	result: PatientInvestigationResult;
}>) {
	const [value, set] = React.useState(() => {
		if (result?.values === undefined) {
			return result;
		}

		return result?.values || {};
	});

	const obj = investigation.obj;
	const name = data.investigation.name.fromId(investigation.investigationId);

	console.log({ investigation, obj, value });

	React.useEffect(() => {
		console.log({ value });
	}, [value]);

	if (obj === undefined) {
		return (
			<View>
				<Text>Obj is undefined</Text>
			</View>
		);
	}
	return (
		<>
			<ProgressBar progress={0.5} color={theme.color.primary.dark} />
			<Layout
				title={`Investigation: #${investigation.id}`}
				style={{ padding: 0 }}
			>
				<ScrollView
					showsVerticalScrollIndicator
					contentContainerStyle={{
						paddingHorizontal: 24,
						paddingVertical: 16,
						flexGrow: 1,
					}}
				>
					<View>
						{obj?.type !== "panel" ? (
							<>
								<Text style={{ marginBottom: 10 }}>
									Entering value for the '{name}'
									investigation
								</Text>
								<InvestigationField
									shape={obj}
									name={data.investigation.name.fromId(
										investigation.obj
									)}
									value={value}
									set={set}
								/>
							</>
						) : (
							<>
								<Text
									font="bold"
									style={{
										marginBottom: 10,
										lineHeight: 18,
									}}
								>
									{name} Investigation
								</Text>
								{Object.entries(obj.items)
									.map((v) => {
										const [key, val] = v;
										return {
											key,
											shape: val,
											name: data.investigation.name.fromId(
												key
											),
										};
									})
									.filter((v) => v.shape !== null)
									.map((v) => {
										return (
											<View
												style={{ marginBottom: 6 }}
												key={v.key}
											>
												<InvestigationField
													shape={v.shape}
													name={v.name}
													value={value[v.key]}
													title={
														v.shape?.type ===
														"options"
															? `Choose ${v.name}`
															: undefined
													}
													set={(val) =>
														set((s) =>
															produce(s, (df) => {
																df[v.key] = val;
																return df;
															})
														)
													}
												/>
											</View>
										);
									})}
							</>
						)}
					</View>
				</ScrollView>
				<View
					style={{
						display: "flex",
						flexDirection: "row",
						justifyContent: "center",
						paddingHorizontal: 24,
						marginBottom: 16,
					}}
				>
					<Button
						style={{ flex: 1, marginRight: 8 }}
						mode="outlined"
						onPress={() => console.log("UDPATED", value)}
					>
						Close
					</Button>
					<Button
						style={{ flex: 1 }}
						mode="contained"
						onPress={() => console.log("UDPATED", value)}
					>
						Update
					</Button>
				</View>
			</Layout>
		</>
	);
}

function InvestigationField<T extends string>({
	shape,
	name,
	value,
	title,
	set,
}: {
	shape: data.InvestigationTypeRecord<T>;
	value: string;
	set: (text: string) => void;
}) {
	return (
		<View style={{ paddingVertical: 4 }}>
			{title !== undefined && <Text>{title}</Text>}
			{shape.type === "options" && (
				<View>
					<RadioButton.Group
						onValueChange={(s) => set(s)}
						value={value}
					>
						<View
							style={{
								display: "flex",
								flexDirection: "row",
								justifyContent: "flex-start",
								flexWrap: "wrap",
							}}
						>
							{shape.options.map((s) => {
								return <RadioButton.Item label={s} value={s} />;
							})}
						</View>
					</RadioButton.Group>
				</View>
			)}
			{shape.type === "text" && (
				<View>
					<TextInput
						mode="outlined"
						value={value}
						onChangeText={(text) => set(text)}
						label={"Type Text"}
					/>
				</View>
			)}
			{shape.type === "numeric-units" && (
				<View>
					<TextInput
						mode="outlined"
						label={name}
						value={value}
						keyboardType="decimal-pad"
						onChangeText={(text) => set(text)}
						right={
							shape.units !== null && (
								<TextInput.Affix text={shape.units} />
							)
						}
					/>
				</View>
			)}
		</View>
	);
}
