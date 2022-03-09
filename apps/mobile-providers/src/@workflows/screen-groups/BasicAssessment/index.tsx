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
	useSymptomInteractionContext,
} from "../../../app/interactionSymptoms";
import { withFlowContext } from "../../wrapper";
import { Differential } from "../../../../@types";
import ManageSymptomsScreen from "../../screens/ManageSymptoms";
import BasicSearchSymptomsScreen from "../../screens/BasicSearchSymptoms";
import { Symptom } from "../../../@libs/data-fns";

const Stack = createNativeStackNavigator();

type BasicProps = {
	patient: PatientIntake;
	actions: {
		onCancel: () => void;
	};
};

export function MainComponent({ patient, actions }: BasicProps) {
	const symptoms = useSymptomAssessment((s) => ({
		present: s.presentingSymptoms.map((s) => ({ id: s.id, data: s.data })),
		absent: s.absentSymptoms.map((s) => s.id),
	}));

	const [queryPresentFromId, checkSymptomStatusById] = useSymptomAssessment(
		(s) => [s.queryPresentSymptomDataById, s.checkSymptomStatusById]
	);

	const [reset, addSymptomToInt] = useSymptomInteractionContext((s) => [
		s.reset,
		s.addSymptomFromId,
	]);
	const showSympInteract = React.useCallback((id: Symptom) => {
		reset();

		const data = queryPresentFromId(id);
		const status = checkSymptomStatusById(id);
		addSymptomToInt(
			id,
			data,
			status === undefined ? undefined : status === "present"
		);
	}, []);

	const symptomsPrAbsList = React.useMemo(
		() => [
			...symptoms.present.map((s) => ({
				id: s.id,
				present: true,
			})),
			...symptoms.absent.map((id) => ({
				id,
				present: false,
			})),
		],
		[symptoms]
	);

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
						onCancel: actions.onCancel,
						onManageSymptoms: () => {
							navigation.navigate("basic.manageSymptoms");
						},
						onSearchSymptom: (text) => {},
						onSelectSymptom: ({ id, present, state }) => {},
						onAddSymptom: () => {},
						onNext: () => {},
					}),
				})}
			/>
			<Stack.Screen
				name="basic.manageSymptoms"
				component={withFlowContext(ManageSymptomsScreen, {
					entry: {
						symptoms: symptomsPrAbsList,
					},
					actions: ({ navigation }) => ({
						onPressSearch: () => {
							navigation.navigate("basic.searchSymptoms");
						},
						onPressSeeInsights: () => {},
						onRemoveSymptom: () => {},
						onShowSymptom: () => {},
					}),
				})}
			/>
			<Stack.Screen
				name="basic.searchSymptoms"
				component={withFlowContext(BasicSearchSymptomsScreen, {
					entry: {
						suggestions: [],
					},
					actions: ({ navigation }) => ({
						onSelectSearchResult: (selectedSymptom) => {
							console.log("Selected", selectedSymptom);
							// showSympInteract(selectedSymptom);
							// navigation.navigate("basic.summary");
						},
					}),
				})}
			/>
		</Stack.Navigator>
	);
}

export default function BasicAssessmentScreenGroup({
	entry,
	actions,
}: WorkflowScreen<
	BasicProps,
	{
		onCancel: () => void;
		onCompleteAssessment: (
			symptoms: {
				present: Array<{
					id: string;
					data: SymptomData;
				}>;
				absent: Array<string>;
			},
			/**
			 * null when unable to computer the differentials
			 */
			elsaDifferentials: Differential[] | null
		) => void;
	}
>) {
	return (
		<SymptomAssessmentSequenceProvider>
			<BottomSheetInteractionProvider lang="en">
				<MainComponent patient={entry.patient} actions={actions} />
			</BottomSheetInteractionProvider>
		</SymptomAssessmentSequenceProvider>
	);
}
