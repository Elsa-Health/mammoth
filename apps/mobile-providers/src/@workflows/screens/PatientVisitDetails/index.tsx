import React from "react";
import { Pressable, View } from "react-native";
import { Button, Chip, Divider } from "react-native-paper";
import { Layout, Text } from "../../../@libs/elsa-ui/components";

import dayjs from "dayjs";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import theme from "../../../theme";

import * as data from "../../../@libs/data-fns";
import { ScrollView } from "react-native-gesture-handler";
import _ from "lodash";

// as received
type PatientVisit = {
	id: string;
	date: Date;
	condition: data.Condition;
	symptoms: {
		present: Array<{ id: data.Symptom; state: SymptomState }>;
		absent: data.Symptom[];
	};
	investigations: PatientInvestigation[];
};

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
