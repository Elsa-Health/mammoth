import React from "react";
import { Layout, Text } from "../../../@libs/elsa-ui/components";

import { Button } from "react-native-paper";

export default function ConfirmPatientVisitScreen({
	entry: { visit },
	actions: $,
}: WorkflowScreen<
	{ visit: PatientVisit },
	{ onConfirmAppointment: (visit: Omit<PatientVisit, "id">) => void }
>) {
	return (
		<Layout>
			<Text>{JSON.stringify(visit)}</Text>
			<Button
				mode="contained"
				onPress={() => $.onConfirmAppointment(visit)}
			>
				Something
			</Button>
		</Layout>
	);
}
