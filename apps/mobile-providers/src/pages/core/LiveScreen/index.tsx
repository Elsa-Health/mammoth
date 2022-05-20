/**
 *
 */
import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import { View, ScrollView } from "react-native";
import { Text } from "../../../@libs/elsa-ui/components";
import { BodyViewIllustration } from "../../../assets/illustrations";

// Screens
import SummaryView from "./Summary";
import { usePatientDescription } from "../PatientDescriptor/context";
import shallow from "zustand/shallow";

function NullScreen({ mainNavigator }: any) {
	return (
		<ScrollView style={{ flex: 1 }}>
			<View
				style={{
					flex: 1,
					paddingHorizontal: 24,
					paddingVertical: 24,
					display: "flex",
					flexDirection: "column",
					alignItems: "center",
					justifyContent: "space-between",
					opacity: 0.6,
				}}
			>
				<View>
					<Text italic style={{ textAlign: "center", color: "#555" }}>
						This screen will be constantly changing when there as
						you move on to make any change on the application.
					</Text>
					<Text italic style={{ textAlign: "center", color: "#555" }}>
						Changes happpen when you make additions to the
						information about the patient
					</Text>
				</View>
				<View style={{ flex: 1, width: "100%", paddingVertical: 40 }}>
					<BodyViewIllustration
						height={450}
						// Compensates for the arm in the illustration
						style={{ marginLeft: -40 }}
					/>
				</View>
			</View>
		</ScrollView>
	);
}

const Stack = createNativeStackNavigator();

function useLivePreview() {
	const isPatientIntakeFilled = usePatientDescription(
		(s) => s.patientIntake !== undefined,
		shallow
	);
	const isMedicalHistoryFilled = usePatientDescription(
		(s) => s.medicalHistory !== undefined,
		shallow
	);
	const isDietartHistoryFilled = usePatientDescription(
		(s) => s.dietaryHistory !== undefined,
		shallow
	);

	return {
		show:
			isPatientIntakeFilled ||
			isMedicalHistoryFilled ||
			isDietartHistoryFilled,
	};
}

export default function LiveScreen({ mainNavigator }: any) {
	// Pass the context to navigate the main screen programmatically
	const NullComponent = React.useCallback(
		() => <NullScreen mainNavigator={mainNavigator} />,
		[mainNavigator]
	);
	const LiveSummaryComponent = React.useCallback(
		(props: any) => (
			<SummaryView {...props} mainNavigator={mainNavigator} />
		),
		[mainNavigator]
	);

	const { show } = useLivePreview();

	if (!show) {
		return <NullComponent />;
	}

	return (
		<NavigationContainer independent>
			<Stack.Navigator screenOptions={{ headerShown: false }}>
				<Stack.Screen
					name="live.summary"
					component={LiveSummaryComponent}
				/>
			</Stack.Navigator>
		</NavigationContainer>
	);
}
