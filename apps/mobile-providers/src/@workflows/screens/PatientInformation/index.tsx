import React from "react";
import { Layout, Text } from "../../../@libs/elsa-ui/components";
import { View, ScrollView } from "react-native";
import { EyeIcon, PencilAltIcon } from "../../../assets/vectors";
import theme from "../../../theme";
import { Button, Divider } from "react-native-paper";

import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import { differenceInYears } from "date-fns";
import * as data from "../../../@libs/data-fns";
import dayjs from "dayjs";

type PatientInvestigation = {
	id: data.LabTest;
};
type PatientVisit = {
	date: Date;
	condition: data.Condition;
	investigations: PatientInvestigation[];
};

const visits: PatientVisit[] = [
	{
		date: new Date("2021-04-15"),
		condition: "pneumonia",
		investigations: [
			{ id: "full-blood-picture-fbp" },
			{ id: "chest-x-ray-cxr" },
			{ id: "urinalysis" },
		],
	},
	{
		date: new Date("2021-02-18"),
		condition: "urinary-tract-infection-uti",
		investigations: [
			{ id: "full-blood-picture-fbp" },
			{ id: "chest-x-ray-cxr" },
			{ id: "hiv-rapid-test" },
		],
	},
	{
		date: new Date("2020-12-06"),
		condition: "pneumonia",
		investigations: [{ id: "urinalysis" }, { id: "stool-analysis" }],
	},
];

export default function PatientInformationScreen({
	entry: { patient },
	actions: $,
}: WorkflowScreen<
	{
		patient: Patient;
	},
	{
		onNewAssessment: (pid: string) => void;
	}
>) {
	const patientItems = [
		{ icon: "phone", text: patient.phone },
		{ icon: "account", text: patient.sex === "male" ? "Male" : "Female" },
		{
			icon: "calendar-week",
			text: `${differenceInYears(new Date(), patient.dateOfBirth)} years`,
		},
		{ icon: "map-marker", text: patient.address },
	];

	return (
		<Layout style={{ padding: 0 }}>
			<ScrollView style={{ paddingHorizontal: theme.spacing.lg }}>
				<Text size="xl" font="bold">
					Patient Information
				</Text>
				<View>
					{/* Actual component */}
					<View
						style={{
							borderRadius: 10,
							borderWidth: 1,
							borderColor: "#CCC",
							marginVertical: theme.spacing.md,
							padding: theme.spacing.md,
						}}
					>
						<View
							style={{
								display: "flex",
								flexDirection: "row",
								justifyContent: "space-between",
							}}
						>
							<Text
								size="lg"
								font="bold"
								style={{ color: theme.color.primary.base }}
							>
								{patient.firstName} {patient.lastName}
							</Text>
							<View
								style={{
									display: "flex",
									flexDirection: "row",
								}}
							>
								<Icon
									name="square-edit-outline"
									size={20}
									color={theme.color.secondary.base}
								/>
							</View>
						</View>
						<View
							style={{
								display: "flex",
								flexDirection: "column",
								flexWrap: "wrap",
								justifyContent: "space-between",
								paddingTop: 16,
							}}
						>
							{patientItems.map(
								({ icon: iconName, text }, ix) => (
									<View
										key={ix}
										style={{
											display: "flex",
											flexDirection: "row",
											alignItems: "center",
											paddingVertical: 4,
										}}
									>
										<Icon
											name={iconName}
											size={20}
											color={theme.color.primary.base}
										/>
										<Text style={{ marginLeft: 10 }}>
											{text}
										</Text>
									</View>
								)
							)}
						</View>
					</View>
				</View>
				<View>
					<Button
						onPress={() => $.onNewAssessment(patient.id)}
						mode="contained"
					>
						New Assessment
					</Button>
				</View>
				<View style={{ marginTop: theme.spacing.md }}>
					<Text font="bold" size="xl">
						Past Visits
					</Text>
					<View style={{ paddingTop: theme.spacing.md }}>
						{visits.map((visit, index, array) => (
							<React.Fragment key={index}>
								<PastVisit
									date={visit.date}
									condition={visit.condition}
									investigations={visit.investigations.map(
										(s) => s.id
									)}
								/>
								{index < array.length - 1 && <Divider />}
							</React.Fragment>
						))}
					</View>
				</View>
			</ScrollView>
		</Layout>
	);
}

function PastVisit({
	date,
	condition,
	investigations,
}: {
	date: Date;
	condition: data.Condition;
	investigations: data.LabTest[];
}) {
	return (
		<View style={{ paddingVertical: 12 }}>
			<Text>{dayjs(date).format("MMMM DD, YYYY")} </Text>
			<Text>{data.conditions.name.fromId(condition)}</Text>
			<Text style={{ lineHeight: 20 }}>
				{investigations
					.map((s) => data.labTests.fromId(s).name)
					.join(", ")}
			</Text>
			<View style={{ paddingTop: theme.spacing.sm }}>
				<Button
					// mode="outlined"
					onPress={() => console.log("Pressed Viist!")}
				>
					View &amp; update
				</Button>
			</View>
		</View>
	);
}
