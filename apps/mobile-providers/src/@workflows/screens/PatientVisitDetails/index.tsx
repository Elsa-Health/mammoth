import React from "react";
import { Pressable, View } from "react-native";
import { Button, Divider } from "react-native-paper";
import { Layout, Text } from "../../../@libs/elsa-ui/components";

import dayjs from "dayjs";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import theme from "../../../theme";

import * as data from "../../../@libs/data-fns";
import { ScrollView } from "react-native-gesture-handler";

export default function PatientVisitDetailsScreen({
	entry: { visit },
	actions: $,
}: WorkflowScreen<
	{
		visit: PatientVisit;
	},
	{
		onOpenInvestigation: (investigation: PatientInvestigation) => void;
	}
>) {
	console.log({ visit });
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
					<VisitSymptomSection symptoms={[]} />
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
							Investigations
						</Text>
					</View>
					<View>
						{visit.investigations.map((investigation) => (
							<Pressable
								onPress={() =>
									$.onOpenInvestigation(investigation)
								}
								key={investigation.id}
							>
								<Text>{investigation.id}</Text>
							</Pressable>
						))}
					</View>
				</View>
				<View></View>
			</ScrollView>
		</Layout>
	);
}

function VisitSymptomSection({
	symptoms,
}: {
	symptoms: Array<{ id: data.Symptom; present: boolean; data?: SymptomData }>;
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
			<View>
				{symptoms.map((s, ix) => (
					<View></View>
				))}
			</View>
		</View>
	);
}

function InvestigationItem() {
	return;
}
