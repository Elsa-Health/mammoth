import React from "react";
import { View } from "react-native";
import { Layout, Text } from "../../../@libs/elsa-ui/components";

import { Button } from "react-native-paper";
import { properAgeString } from "../../../app/utils";

import * as data from "../../../@libs/data-fns";
import { Spacing } from "../../../@libs/elsa-ui/theme";
import { ScrollView } from "react-native-gesture-handler";

export default function ConfirmPatientVisitScreen({
	entry: { visit },
	actions: $,
}: WorkflowScreen<
	{ visit: VisitSession },
	{
		onCancel: () => void;
		onConfirmAppointment: (
			visit: VisitSession,
			err?: (err: any) => void
		) => void;
	}
>) {
	return (
		<Layout title="Confirm & Complete">
			<ScrollView>
				<View>
					<Text
						color="#777"
						size="sm"
						font="bold"
						style={{ textDecorationLine: "underline" }}
					>
						Basic Profile
					</Text>
					<View style={{ marginVertical: Spacing.xs }}>
						<Text>ID: {visit.patientId}</Text>
						<Text>Age: {properAgeString(visit.intake.age)}</Text>
						<Text>Sex: {visit.intake.sex}</Text>
					</View>
				</View>

				<View style={{ marginVertical: 6 }}>
					<Text
						color="#777"
						size="sm"
						font="bold"
						style={{ textDecorationLine: "underline" }}
					>
						Symptoms
					</Text>
					<View style={{ marginVertical: Spacing.xs }}>
						{visit.symptoms.present
							.map((c) => c.id)
							.map((text) => (
								<Text key={text}>[present] {text}</Text>
							))}
						{visit.symptoms.absent
							.map((id) => id)
							.map((text) => (
								<Text key={text}>[absent] {text}</Text>
							))}
					</View>
				</View>

				<View style={{ marginVertical: 6 }}>
					<Text
						color="#777"
						size="sm"
						font="bold"
						style={{ textDecorationLine: "underline" }}
					>
						Likely Condition
					</Text>
					<View style={{ marginVertical: Spacing.xs }}>
						<Text>
							{data.conditions.name.fromId(visit.condition) ||
								visit.condition}
						</Text>
					</View>
				</View>
				<View style={{ marginVertical: 6 }}>
					<Text
						color="#777"
						size="sm"
						font="bold"
						style={{ textDecorationLine: "underline" }}
					>
						Investigations
					</Text>
					<View style={{ marginVertical: Spacing.xs }}>
						{visit.investigations.map((f) => (
							<Text key={f.investigationId}>
								{data.investigation.name.fromId(
									f.investigationId
								) || f.investigationId}
							</Text>
						))}
					</View>
				</View>
			</ScrollView>
			{/* <Text>{JSON.stringify(visit)}</Text> */}
			<View style={{ display: "flex", flexDirection: "row" }}>
				<Button
					icon="close"
					mode="outlined"
					onPress={() => $.onCancel()}
				>
					Discard
				</Button>
				<Button
					style={{ marginLeft: 8 }}
					icon="check"
					mode="contained"
					onPress={() => $.onConfirmAppointment(visit)}
				>
					Complete Session
				</Button>
			</View>
		</Layout>
	);
}
