import React from "react";
import { Pressable, View } from "react-native";
import { Button, Chip, Divider, List } from "react-native-paper";
import { Layout, Text } from "../../../@libs/elsa-ui/components";

import dayjs from "dayjs";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import theme from "../../../theme";

import * as data from "../../../@libs/data-fns";
import { ScrollView } from "react-native-gesture-handler";
import _ from "lodash";

export default function PatientVisitDetailsScreen({
	entry: { visit },
	actions: $,
}: WorkflowScreen<
	{
		visit: PatientVisit;
	},
	{
		getResult: (id: string) => Promise<PatientInvestigationResult>;
		onOpenInvestigation: (
			investigation: { id: string } & PatientInvestigation
		) => void;
	}
>) {
	return (
		<Layout title="Patient Visit" style={{ padding: 0 }}>
			<ScrollView contentContainerStyle={{ paddingHorizontal: 24 }}>
				{/*  Date*/}
				<View
					style={{
						display: "flex",
						flexDirection: "row",
						alignItems: "center",
						justifyContent: "space-between",
					}}
				>
					<View
						style={{
							display: "flex",
							flexDirection: "row",
							alignItems: "center",
						}}
					>
						<Icon
							color={theme.color.primary.base}
							size={24}
							name="calendar"
						/>
						<Text font="bold" style={{ marginLeft: 8 }}>
							Date of Visit
						</Text>
					</View>
					<Text>{dayjs(visit.date).format("DD MMMM YYYY")}</Text>
				</View>
				<Divider />
				<View
					style={{
						marginTop: theme.spacing.md,
					}}
				>
					<VisitSymptomSection
						present={visit.symptoms.present}
						absent={visit.symptoms.absent}
					/>
				</View>
				<Divider />
				<View
					style={{
						marginTop: theme.spacing.md,
						paddingVertical: theme.spacing.xs,
					}}
				>
					<View
						style={{
							display: "flex",
							flexDirection: "row",
							alignItems: "center",
						}}
					>
						<Icon
							color={theme.color.primary.base}
							size={24}
							name="folder-open-outline"
						/>
						<Text font="bold" style={{ marginLeft: 8 }}>
							Investigations (Long press to inspect)
						</Text>
					</View>
					<View>
						{visit.investigations
							.map((s) => ({
								...s,
								name: data.investigation.name.fromId(
									s.investigationId
								),
								obj: s.obj,
								result: s.result,
								onPress: () => $.onOpenInvestigation(s),
							}))
							.map((props) => (
								<InvestigationItem {...props} key={props.id} />
							))}
					</View>
				</View>
				<View></View>
			</ScrollView>
		</Layout>
	);
}

function SingleInvestigationItem<T extends string>(
	props: data.InvestigationTypeRecord<T> & {
		name: string;
		result?: string | string[];
	}
) {
	return (
		<View
			style={{
				alignItems: "center",
				display: "flex",
				flexDirection: "row",
				justifyContent: "space-between",
				paddingVertical: 6,
			}}
		>
			<Text>{props.name}</Text>
			<View
				style={{
					display: "flex",
					alignItems: "flex-end",
					flexDirection: "column",
				}}
			>
				<Text size="xs">Result</Text>
				<View
					style={{
						display: "flex",
						flexDirection: "row",
						justifyContent: "flex-end",
					}}
				>
					{props.type === "numeric-units" && (
						<>
							<Text style={{ paddingHorizontal: 16 }}>
								{props.result || "-"}
							</Text>
							<Text size="sm" color="#888">
								{props.units}
							</Text>
						</>
					)}

					{props.type === "options" && (
						<>
							<Text
								style={{
									paddingHorizontal: 16,
									borderWidth: 1,
									borderRadius: 6,
								}}
							>
								{props.result || "-"}
							</Text>
						</>
					)}
				</View>
			</View>
		</View>
	);
}

function InvestigationItem({
	name,
	obj,
	onPress,
	result,
}: PatientInvestigation & {
	name: string;
	onPress: () => void;
	result: PatientInvestigationResult;
}) {
	const invName = name;

	if (obj.type !== "panel") {
		return (
			<Pressable onLongPress={onPress}>
				<List.Section title={invName}>
					<SingleInvestigationItem {...obj} result={result} />
				</List.Section>
			</Pressable>
		);
	}

	const results = result?.values || {};

	return (
		<List.Accordion
			title={invName}
			onLongPress={onPress}
			// right={() => (
			// 	<Pressable
			// 		style={{
			// 			alignItems: "center",
			// 			display: "flex",
			// 			flexDirection: "row",
			// 			justifyContent: "space-between",
			// 			paddingVertical: 6,
			// 		}}
			// 		onPress={}
			// 	>
			// 		<Icon name="pencil" size={16} />
			// 		<Text>Edit</Text>
			// 	</Pressable>
			// )}
		>
			<View>
				<View>
					{Object.entries(obj.items)
						.map((s) => {
							const [id, shape] = s;
							return {
								id,
								name: data.investigation.name.fromId(id),
								...shape,
							};
						})
						.map((s) => (
							<SingleInvestigationItem
								{...s}
								key={s.id}
								result={results[s.id]}
							/>
						))}
				</View>
			</View>
		</List.Accordion>
	);
}

function VisitSymptomSection({
	present,
	absent,
}: {
	present: Array<{ id: data.Symptom; state: SymptomState }>;
	absent: data.Symptom[];
}) {
	return (
		<View
			style={{
				paddingVertical: theme.spacing.xs,
			}}
		>
			<View
				style={{
					display: "flex",
					flexDirection: "row",
					alignItems: "center",
				}}
			>
				<Icon
					color={theme.color.primary.base}
					size={24}
					name="file-document-outline"
				/>
				<Text font="bold" style={{ marginLeft: 8 }}>
					Visit Information
				</Text>
			</View>
			{present.length > 0 && (
				<View style={{ paddingVertical: 8 }}>
					<Text
						size={12}
						style={{
							textTransform: "uppercase",
							letterSpacing: 2,
							marginBottom: 4,
						}}
					>
						Presenting Symptoms
					</Text>
					<View style={{ flexDirection: "row", display: "flex" }}>
						{present.map((s, ix) => (
							<Chip
								key={s.id}
								style={{
									backgroundColor: theme.color.primary.base,
									padding: 3,
									alignSelf: "flex-start",
									marginRight: 4,
								}}
							>
								<Text color="#FFF">
									{_.capitalize(
										(
											data.symptomsLocale.translate("en")[
												s.id
											].name || s.id
										).replace(/\-/g, " ")
									)}
								</Text>
							</Chip>
						))}
					</View>
				</View>
			)}
			{absent.length > 0 && (
				<View style={{ paddingVertical: 8 }}>
					<Text
						size={12}
						style={{ textTransform: "uppercase", letterSpacing: 2 }}
					>
						Absent Symptoms
					</Text>
					<View style={{ flexDirection: "row", display: "flex" }}>
						{absent.map((s, ix) => (
							<Chip
								key={s}
								style={{
									backgroundColor: theme.color.primary.light,
									padding: 3,
									alignSelf: "flex-start",
									marginRight: 4,
								}}
							>
								<Text>
									{_.capitalize(
										(
											data.symptomsLocale.translate("en")[
												s
											].name || s
										).replace(/\-/g, " ")
									)}
								</Text>
							</Chip>
						))}
					</View>
				</View>
			)}
		</View>
	);
}
