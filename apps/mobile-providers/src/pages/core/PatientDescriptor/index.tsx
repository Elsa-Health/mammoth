/**
 * This is the series of screens that contains the patient describing information
 */
import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

// Screens
import PatientIntake from "./PatientIntake";
import MedicalHistory from "./MedicalHistory";
import DietaryHistory from "./DietaryHistory";
import SymptomView from "./Symptom";
import FinalAssessmentScreen from "./FinalAssessment";

import {
	BottomSheetInteractionProvider,
	SymptomModalContainer,
} from "../../../app/interactionSymptoms";

const Stack = createNativeStackNavigator<{
	"patient.intake": undefined;
	"patient.history.medical": undefined;
	"patient.history.dietary": undefined;
	"patient.symptom.assessment": undefined;
	"patient.concluding": undefined;
}>();

const animationConfig = {
	animation: "spring",
	config: {
		stiffness: 1000,
		damping: 500,
		mass: 3,
		overshootClamping: true,
		restDisplacementThreshold: 0.01,
		restSpeedThreshold: 0.01,
	},
};

export default function PatientDescriptor() {
	return (
		<SymptomModalContainer>
			<Stack.Navigator
				screenOptions={{
					headerShown: false,
					animation: "slide_from_right",
				}}
				defaultScreenOptions={{ animationTypeForReplace: "pop" }}
			>
				<Stack.Screen
					name="patient.intake"
					component={PatientIntake}
					options={{}}
				/>
				<Stack.Screen
					name="patient.symptom.assessment"
					component={SymptomView}
				/>
				<Stack.Screen
					name="patient.history.medical"
					component={MedicalHistory}
				/>
				<Stack.Screen
					name="patient.history.dietary"
					component={DietaryHistory}
				/>
				<Stack.Screen
					name="patient.concluding"
					component={FinalAssessmentScreen}
				/>
			</Stack.Navigator>
		</SymptomModalContainer>
	);
}
