import React from "react";
import { Layout, Text } from "../../../components";
import { View, ScrollView } from "react-native";
import { EyeIcon, PencilAltIcon } from "../../../assets/vectors";
import theme from "../../../theme";
import { Button, Divider } from "react-native-paper";

import Icon from "react-native-vector-icons/MaterialCommunityIcons";

export default function PatientInformationScreen({
	entry,
	actions: $,
}: {
	entry: any;
	actions: {
		onNewAssessment: (pid: string) => void;
	};
}) {
	const patient: Patient = {
		id: "iids",
		firstName: "Harrison",
		lastName: "Mariki",
		phone: "+255 789 789 789",
		sex: "male",
		dateOfBirth: new Date().getTime(),
		address: "Dar es Salaam",
	};
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
						{Array(10)
							.fill(1)
							.map((_, index, array) => (
								<React.Fragment key={index}>
									<PastVisit />
									{index < array.length - 1 && <Divider />}
								</React.Fragment>
							))}
					</View>
				</View>
			</ScrollView>
		</Layout>
	);
}

function PastVisit({ visit }) {
	return (
		<View style={{ paddingVertical: 12 }}>
			<Text>April 15, 2021</Text>
			<Text>Pnemonia</Text>
			<Text>FBF, Chest X-Ray, Urinalysis</Text>
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

const patientItems = [
	{ icon: "phone", text: "Something" },
	{ icon: "account", text: "Male" },
	{ icon: "calendar-week", text: "12 December" },
	{ icon: "map-marker", text: "Dar es Salaam" },
];
