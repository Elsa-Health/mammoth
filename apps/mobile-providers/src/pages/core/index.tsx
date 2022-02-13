/**
 * This is the starting point of the application.
 *
 * With the pediatrics, you are required to coordinate the views
 */
import React from "react";

import { View, Pressable } from "react-native";
import LiveScreen from "./LiveScreen";
import PatientDescriptor from "./PatientDescriptor";
import { useDeviceBreak } from "../../app/utils";

import {
	NavigationContainer,
	StackActions,
	CommonActions,
} from "@react-navigation/native";
import {
	NavigationContext,
	useNavigation,
	useNavigationContainerRef,
} from "@react-navigation/core";

import { buttonStyles } from "../../components/input";
import {
	CheckIcon,
	ElsaColorableIcon,
	ElsaIcon,
	LibraryIcon,
	XIcon,
} from "../../assets/vectors";
import { Layout, Text } from "../../components";
import {
	SymptomAssessmentSequenceProvider,
	useSAStore,
} from "../../app/context/assessment";
import { SymptomInteractionProvider } from "../../app/interactionSymptoms";
import {
	PatientDescription,
	PatientDescriptionProvider,
	usePatientDescription,
} from "./PatientDescriptor/context";
import theme from "../../theme";
import { RevealContent } from "../../components/misc";
import shallow from "zustand/shallow";
import { PatientAssessmentRecord, useMainState } from "../../app/context/main";
import { Assessment } from "../../../@types";

import {
	animated,
	useSpring,
	config,
	useTransition,
} from "@react-spring/native";
import { shallowEqual } from "@babel/types";
import { setShowLivePreview, useShowLivePreview } from "./liveContext";

const $Pressable = animated(Pressable);
const $ElsaColorIcon = animated(ElsaColorableIcon);

const BORDER_COLOR = "#4BB8E9";

export default function MainApp() {
	const { isTablet, isMobile } = useDeviceBreak();
	const navigationRef = useNavigationContainerRef();
	const navigation = useNavigation();

	// const [show, setShow] = React.useState(false)

	const show = useShowLivePreview();
	const setShow = setShowLivePreview;

	const { iconColor, ...styles } = useSpring({
		config: { ...config.gentle, duration: 100 },

		backgroundColor: show ? "#FFF" : theme.color.primary.dark,
		shadowColor: "#000",
		shadowOffset: show
			? { width: 0, height: 0 }
			: {
					width: 0,
					height: 3,
			  },
		shadowOpacity: show ? 0 : 0.27,
		shadowRadius: show ? 0 : 4.65,
		elevation: show ? 4 : 6,
		borderColor: show ? BORDER_COLOR : undefined,
		borderWidth: show ? 1 : 0,
		iconColor: show ? "#000" : "#FFF",
	});

	const pressElsaButton = React.useCallback(() => {
		setShow(!show);
	}, [setShow, show]);

	return (
		<PatientDescriptionProvider>
			<SymptomAssessmentSequenceProvider>
				<SymptomInteractionProvider>
					<Layout
						navigation={navigation}
						style={{ paddingHorizontal: 0, paddingVertical: 0 }}
						backIcon={XIcon}
						hideHeader
					>
						<View
							style={{
								flex: 1,
								display: "flex",
								flexDirection: "row",
								position: "relative",
								alignItems: "center",
							}}
						>
							<View
								style={[
									{},
									isTablet ? { flex: 2 } : { flex: 1 },
								]}
							>
								<NavigationContainer
									ref={navigationRef}
									independent
								>
									<PatientDescriptor />
								</NavigationContainer>
							</View>
							<View
								style={[
									{ backgroundColor: "#FFF", flex: 1 },
									isTablet
										? {
												borderLeftColor: BORDER_COLOR,
												borderLeftWidth: 1,
										  }
										: isTablet || (!isTablet && show)
										? {
												position: "absolute",
												bottom: 0,
												shadowColor: "#000",
												shadowOffset: {
													width: 0,
													height: 1,
												},
												shadowOpacity: 0.22,
												shadowRadius: 2.22,
												elevation: 3,
												width: "100%",
												height: "97%",
										  }
										: { display: "none" },
								]}
							>
								<LiveScreen mainNavigator={navigationRef} />
							</View>

							{!isTablet && (
								<View
									style={{
										position: "absolute",
										bottom: -36,
										right: 24,
										width: "100%",
									}}
								>
									<View
										style={{
											flex: 1,
											display: "flex",
											flexDirection: "row",
											justifyContent: "flex-end",
										}}
									>
										{/* FAB for controlling the viewing of the content */}
										<$Pressable
											onPress={pressElsaButton}
											style={[
												buttonStyles.secondaryButton,
												{
													borderRadius: 100,
													alignSelf: "flex-start",
													display: "flex",
													flexDirection: "row",
													alignItems: "center",
													justifyContent: "center",
													padding: 20,
												},
												styles,
											]}
										>
											<$ElsaColorIcon
												width={30}
												height={30}
												style={{ color: iconColor }}
											/>
										</$Pressable>
									</View>
								</View>
							)}
						</View>

						{/* Bottom navigation */}
						<View
							style={{
								paddingHorizontal: 24,
								paddingVertical: 16,
								borderTopColor: BORDER_COLOR,
								borderTopWidth: 1,
								backgroundColor: "#FFF",
								zIndex: 30,
							}}
						>
							<BottomNavigationComponent />
						</View>
					</Layout>
				</SymptomInteractionProvider>
			</SymptomAssessmentSequenceProvider>
		</PatientDescriptionProvider>
	);
}

/**
 * Convert the input from `PatientDescription` to `PatientAssessmentRecord`
 */
export const convertData = (
	data: PatientDescription,
	presentingSymptoms: Assessment["presentingSymptoms"],
	absentSymptoms: Assessment["absentSymptoms"]
): PatientAssessmentRecord => {
	const { assessment, dietaryHistory, medicalHistory, patientIntake, elsa } =
		data;

	if (patientIntake === undefined) {
		throw new Error(
			"Patient information is undefined. Unable to convert to assessment record"
		);
	}

	return {
		assessmentInfo: {
			presentingSymptoms,
			absentSymptoms,
			userConditions: assessment.conditions,
			elsaConditions: elsa.conditions,
		},
		history: {
			dietary: dietaryHistory,
			medical: medicalHistory,
		},
		patient: patientIntake,
	};
};

function BottomNavigationComponent() {
	const { add: addPatientRecord } = useMainState();
	const { isTablet } = useDeviceBreak();

	const [presentingSymptoms, absentSypmtoms] = useSAStore((s) => [
		s.presentingSymptoms,
		s.absentSymptoms,
	]);
	const selectedConditions = usePatientDescription(
		(s) => s.assessment.conditions
	);
	const conditionsMeet = React.useMemo(() => {
		return selectedConditions.length > 0;
	}, [selectedConditions]);

	// main app application
	const navigation = useNavigation();

	const pediatricsData = usePatientDescription((s) => s);

	const discardAssessment = React.useCallback(() => {
		// TODO: Ask for confirmation
		navigation.dispatch(StackActions.pop());
	}, [navigation]);

	const completeAssessment = React.useCallback(() => {
		// TODO: Ask for confirmation
		if (!conditionsMeet) {
			console.warn("Conditions aren't met");
			return;
		}

		// When conditions are met.
		addPatientRecord(
			convertData(pediatricsData, presentingSymptoms, absentSypmtoms)
		);
		navigation.dispatch(StackActions.replace("app.history"));
	}, [
		pediatricsData,
		addPatientRecord,
		navigation,
		presentingSymptoms,
		absentSypmtoms,
	]);

	return (
		<View
			style={{
				display: "flex",
				justifyContent: "space-between",
				alignItems: "center",
				flexDirection: "row",
				backgroundColor: "#FFF",
			}}
		>
			<View style={{ flex: 1 }}>
				<View
					style={{
						display: "flex",
						flexDirection: "row",
						justifyContent: "flex-start",
					}}
				>
					<Pressable
						android_ripple={{ borderless: true, radius: 16 }}
						onPress={discardAssessment}
						style={{
							alignItems: "center",
							justifyContent: "flex-end",
							display: "flex",
							alignSelf: "flex-end",
							flexDirection: "row",
						}}
					>
						<XIcon />
						<Text font="bold" style={{ paddingHorizontal: 8 }}>
							{"Discard"}
						</Text>
					</Pressable>
					{conditionsMeet && (
						<Pressable
							android_ripple={{ borderless: true, radius: 16 }}
							onPress={completeAssessment}
							style={{
								alignItems: "center",
								justifyContent: "flex-end",
								display: "flex",
								alignSelf: "flex-end",
								flexDirection: "row",
							}}
						>
							<CheckIcon />
							<Text font="bold" style={{ paddingHorizontal: 8 }}>
								{isTablet ? "Complete Assessment" : "Complete"}
							</Text>
						</Pressable>
					)}
				</View>
			</View>
			{isTablet && (
				<View>
					<ElsaIcon width={30} height={30} />
				</View>
			)}
		</View>
	);
}
