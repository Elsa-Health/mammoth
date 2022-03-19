import React from "react";
import { View } from "react-native";
import { Layout, Text } from "../../../@libs/elsa-ui/components";

import { Button } from "react-native-paper";
import { properAgeString } from "../../../app/utils";

import { differenceInYears } from "date-fns";

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
			<View>
				<Text color="#777" size="sm">
					Basic Profile
				</Text>
				<View>
					<Text>ID: {visit.patientId}</Text>
					<Text>Age: {properAgeString(visit.intake.age)}</Text>
					<Text>Sex: {visit.intake.sex}</Text>
				</View>
			</View>

			<View style={{ marginVertical: 6 }}>
				<Text color="#777" size="sm">
					Symptoms
				</Text>
				<View>
					{visit.symptoms.present
						.map((c) => c.id)
						.map((text) => (
							<Text>[present] {text}</Text>
						))}
					{visit.symptoms.absent
						.map((id) => id)
						.map((text) => (
							<Text>[absent] {text}</Text>
						))}
				</View>
			</View>
			<View style={{ marginVertical: 6 }}>
				<Text color="#777" size="sm">
					Investigations
				</Text>
				<View>
					{visit.investigations.map((f) => (
						<Text>{f.investigationId}</Text>
					))}
				</View>
			</View>
			{/* <Text>{JSON.stringify(visit)}</Text> */}
			<View>
				<Button mode="outlined" onPress={() => $.onCancel()}>
					Discard
				</Button>
				<Button
					mode="contained"
					onPress={() => $.onConfirmAppointment(visit)}
				>
					Complete Session
				</Button>
			</View>
		</Layout>
	);
}
