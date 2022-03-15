import React from "react";
import { Layout, Text } from "../../../@libs/elsa-ui/components";
import { View, ScrollView } from "react-native";
import theme from "../../../theme";
import { Button } from "react-native-paper";

import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import { differenceInYears } from "date-fns";
import * as data from "../../../@libs/data-fns";
import dayjs from "dayjs";
import { Store } from "../../../@libs/storage-core";

// const visits: PatientVisit[] = [
// 	{
// 		id: "0iwmcpmirf",
// 		date: new Date("2021-04-15").toUTCString(),
// 		condition: "pneumonia",
// 		symptoms: {
// 			present: [
// 				{
// 					id: "abdominal-pain",
// 					state: {
// 						Location: ["upper"],
// 						Duration: 5,
// 						Aggravators: [""],
// 						Name: "abdominal-pain",
// 						Nature: "localized",
// 						Periodicity: "non-specific",
// 						Onset: "sudden",
// 						Reducers: [],
// 					},
// 				},
// 				{
// 					id: "fever",
// 					state: {
// 						Location: [],
// 						Duration: 3,
// 						Aggravators: [""],
// 						Name: "fever",
// 						Nature: "localized",
// 						Periodicity: "non-specific",
// 						Onset: "sudden",
// 						Reducers: [],
// 					},
// 				},
// 			],
// 			absent: [],
// 		},
// 		investigations: [
// 			{
// 				id: "123412",
// 				investigationId: "urinalysis",
// 				obj: data.investigation.fromId("urinalysis"),
// 			},

// 			{
// 				id: "343124",
// 				investigationId: "x-ray",
// 				obj: data.investigation.fromId("x-ray"),
// 			},
// 			{
// 				id: "199312",
// 				investigationId: "mrdt-rapid-test",
// 				obj: data.investigation.fromId("mrdt-rapid-test"),
// 			},
// 		],
// 	},
// ];

export default function PatientInformationScreen({
	entry: { patient, store },
	actions: $,
}: WorkflowScreen<
	{
		patient: Patient;
		store: Store;
	},
	{
		onNewAssessment: (pid: Partial<PatientIntake>) => void;
		onOpenVisit: (visit: PatientVisit) => void;
	}
>) {
	const ageInYears = React.useMemo(
		() => differenceInYears(new Date(), new Date(patient.dateOfBirth)),
		[patient]
	);

	const patientItems = [
		{ icon: "phone", text: patient.phone },
		{ icon: "account", text: patient.sex === "male" ? "Male" : "Female" },
		{
			icon: "calendar-week",
			text: `${ageInYears} years`,
		},
		{ icon: "map-marker", text: patient.address },
	];

	const [visits, setVisits] = React.useState<PatientVisit[] | undefined>(
		undefined
	);

	React.useEffect(() => {
		store
			.collection("visits")
			.queryDocs<PatientVisit>({
				patientId: patient.id,
			})
			.then(setVisits)
			.then(() => console.log("Visits loaded"));
	}, [store]);

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
						onPress={() =>
							$.onNewAssessment({
								age: {
									years: ageInYears,
								},
								sex: patient.sex,
							})
						}
						mode="contained"
					>
						New Assessment
					</Button>
				</View>
				{visits === undefined ? (
					<Text>Loading</Text>
				) : (
					<View style={{ marginTop: theme.spacing.md }}>
						<Text font="bold" size="xl">
							Past Visits
						</Text>
						{visits.length === 0 ? (
							<View style={{ flex: 1, paddingVertical: 14 }}>
								<Text
									style={{
										textAlign: "center",
									}}
									italic
									color="#555"
								>
									No appointments have been recorded for this
									patient.
								</Text>
							</View>
						) : (
							<View style={{ paddingTop: theme.spacing.md }}>
								{visits.map((visit, index, array) => (
									<React.Fragment key={index}>
										<PastVisit
											date={new Date(visit.date)}
											condition={visit.condition}
											investigations={visit.investigations.map(
												(s) => s.investigationId
											)}
											onOpenVisit={() =>
												$.onOpenVisit(visit)
											}
										/>
										{/* {index < array.length - 1 && <Divider />} */}
									</React.Fragment>
								))}
							</View>
						)}
					</View>
				)}
			</ScrollView>
		</Layout>
	);
}

function PastVisit({
	date,
	condition,
	investigations,
	onOpenVisit: handleOpenVisit,
}: {
	date: Date;
	condition: data.Condition;
	investigations: data.LabTest[];
	onOpenVisit: () => void;
}) {
	return (
		<View style={{ paddingVertical: 12 }}>
			<View style={{ marginBottom: 8 }}>
				<Text
					font="bold"
					size="xs"
					color={theme.color.secondary.base}
					style={{
						textTransform: "uppercase",
						letterSpacing: 1,
						lineHeight: 18,
					}}
				>
					DATE
				</Text>
				<Text>{dayjs(date).format("MMMM DD, YYYY")} </Text>
			</View>
			<View style={{ marginBottom: 8 }}>
				<Text
					font="bold"
					size="xs"
					color={theme.color.secondary.base}
					style={{
						textTransform: "uppercase",
						letterSpacing: 1,
						lineHeight: 18,
					}}
				>
					Condition
				</Text>

				<Text>{data.conditions.name.fromId(condition)}</Text>
			</View>
			<View style={{ marginBottom: 8 }}>
				<Text
					font="bold"
					size="xs"
					color={theme.color.secondary.base}
					style={{
						textTransform: "uppercase",
						letterSpacing: 1,
						lineHeight: 18,
					}}
				>
					Tests
				</Text>

				<Text style={{ lineHeight: 20 }}>
					{investigations
						.map((s) => data.investigation.name.fromId(s))
						.join(", ")}
				</Text>
			</View>
			<View style={{ paddingTop: theme.spacing.sm }}>
				<Button mode="outlined" onPress={handleOpenVisit}>
					View &amp; update
				</Button>
			</View>
		</View>
	);
}
