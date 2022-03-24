import React from "react";
import { Layout, Text } from "../../../@libs/elsa-ui/components";
import { View, ScrollView } from "react-native";
import theme from "../../../@libs/elsa-ui/theme";
import { Button } from "react-native-paper";

import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import { differenceInYears } from "date-fns";
import * as data from "../../../@libs/data-fns";
import dayjs from "dayjs";
import _ from "lodash";

export default function PatientInformationScreen({
	entry: { patient },
	actions: $,
}: WorkflowScreen<
	{
		patient: Patient;
	},
	{
		getPatientVisits: (patientId: string) => Promise<PatientVisit[]>;
		getInvestigation: (id: string) => Promise<PatientInvestigation>;
		onNewAssessment: (
			patientId: string,
			patient: Partial<PatientIntake>
		) => void;
		onOpenVisit: (visit: PatientVisit, results: any) => void;
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
		console.log({ patientId: patient.id });
		$.getPatientVisits(patient.id)
			.then((visits) => {
				setVisits(visits);
			})
			.then(() => console.log("Visits loaded"));
	}, []);

	// React.useEffect(() => {
	// 	const investigations: string[] = _.concat(
	// 		...visits?.map((s) => s.investigations.map((i) => i.id))
	// 	);
	// 	console.log("PatientInformation@investigations", {
	// 		inv: investigations,
	// 	});
	// }, [visits]);
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
							$.onNewAssessment(patient.id, {
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
											investigations={
												visit.investigations
											}
											getResult={$.getInvestigation}
											onOpenVisit={(results) => {
												$.onOpenVisit(visit, results);
											}}
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
	getResult,
}: {
	date: Date;
	condition: data.Condition;
	investigations: Array<{ id: string } & PatientInvestigation>;
	onOpenVisit: (results: PatientInvestigationResult[]) => void;
	getResult: (invResultId: string) => Promise<PatientInvestigationResult>;
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
						.map((s) =>
							data.investigation.name.fromId(s.investigationId)
						)
						.join(", ")}
				</Text>
			</View>
			<View style={{ paddingTop: theme.spacing.sm }}>
				<Button
					mode="outlined"
					onPress={() => {
						Promise.all(
							investigations.map((s) => s.id).map(getResult)
						).then((results) => {
							handleOpenVisit(results);
						});
					}}
				>
					View &amp; update
				</Button>
			</View>
		</View>
	);
}
