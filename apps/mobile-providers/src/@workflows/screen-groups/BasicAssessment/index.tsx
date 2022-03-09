import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

// Screens
import BasicSummaryScreen from "../../screens/BasicSummary";
// import SymptomScreen from './Symptom'

import {
	SymptomAssessmentSequenceProvider,
	useSymptomAssessment,
} from "../../../app/context/assessment";
import {
	BottomSheetInteractionProvider,
	useSymptomStore,
} from "../../../app/interactionSymptoms";
import { withFlowContext } from "../../wrapper";
import { useSymptomsInfo } from "../../../app/utils";
import { Text } from "react-native";

const Stack = createNativeStackNavigator<{
	"basic.summary": undefined;
	symptom: undefined;
	assessment: undefined;
}>();

type BasicProps = { patient: PatientIntake };

export function MainApp({ patient }: BasicProps) {
	// const x = useSymptomAssessment((s) => [
	// 	...s.presentingSymptoms.map((s) => ({
	// 		id: s.id,
	// 		state: s.data,
	// 		present: true,
	// 	})),
	// 	...s.absentSymptoms.map((s) => ({ id: s.id, present: false })),
	// ]) as { id: string; state?: SymptomData; present: boolean }[];

	const symptoms = useSymptomAssessment((s) => ({
		present: s.presentingSymptoms.map((s) => ({ id: s.id, data: s.data })),
		absent: s.absentSymptoms.map((s) => s.id),
	}));

	return (
		<Stack.Navigator screenOptions={{ headerShown: false }}>
			<Stack.Screen
				name="basic.summary"
				component={withFlowContext(BasicSummaryScreen, {
					entry: {
						patient: patient,
						symptoms,
					},
					actions: ({ navigation }) => ({
						onCancel: () => {},
						onManageSymptoms: () => {},
						onSearchSymptom: (text) => {},
						onSelectSymptom: ({ id, present, state }) => {},
						onAddSymptom: () => {},
						onNext: () => {},
					}),
				})}
			/>
		</Stack.Navigator>
	);
}

export default function ({ entry, actions }: WorkflowScreen<BasicProps, {}>) {
	return (
		<SymptomAssessmentSequenceProvider>
			<BottomSheetInteractionProvider lang="en">
				<MainApp patient={entry.patient} />
			</BottomSheetInteractionProvider>
		</SymptomAssessmentSequenceProvider>
	);
}
