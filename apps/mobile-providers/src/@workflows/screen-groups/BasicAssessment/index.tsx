import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

// Screens
import BasicSummaryScreen from "../../screens/BasicSummary";
import ManageSymptomsScreen from "../../screens/ManageSymptoms";
import BasicSearchSymptomsScreen from "../../screens/BasicSearchSymptoms";

import {
	SymptomAssessmentSequenceProvider,
	useSymptomAssessment,
} from "../../helpers/context/assessment";
import {
	BottomSheetInteractionProvider,
	useSymptomInteractionContext,
} from "./interactionSymptoms";
import { PatientIntake, withFlowContext } from "../..";
import { Differential } from "../../../../@types";
import { Symptom } from "../../../@libs/data-fns";

const Stack = createNativeStackNavigator();

type BasicProps = {
	patient: PatientIntake;
};

export function MainComponent({
	patient,
	actions,
}: BasicProps & {
	actions: BasicAssessmentScreenGroupAction;
}) {
	const symptoms = useSymptomAssessment((s) => ({
		present: s.presentingSymptoms.map((s) => ({ id: s.id, data: s.data })),
		absent: s.absentSymptoms.map((s) => s.id),
	}));

	const [queryPresentFromId, checkSymptomStatusById] = useSymptomAssessment(
		(s) => [s.queryPresentSymptomDataById, s.checkSymptomStatusById]
	);

	const setSymptomToInteract = useSymptomInteractionContext(
		(s) => s.setSymptomFromId
	);
	const showSympInteract = React.useCallback((id: Symptom) => {
		const data = queryPresentFromId(id);
		const status = checkSymptomStatusById(id);
		setSymptomToInteract(
			id,
			data,
			status === null ? undefined : status === "present"
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
						onSearchSymptom: (text) => {
							navigation.navigate("basic.searchSymptoms", {
								text,
							});
						},
						onSelectSymptom: ({ id, present, state }) => {
							showSympInteract(id);
						},
						onAddSymptom: () => {
							navigation.navigate("basic.searchSymptoms", {
								text: "",
							});
						},
						onNext: (elsa_conditions: Differential[]) => {
							console.log(elsa_conditions);
							// TODO: add the complete assessment
							actions.onCompleteAssessment(
								symptoms,
								elsa_conditions
							);
						},
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
							navigation.navigate("basic.searchSymptoms", {
								text: "",
							});
						},
						onPressSeeInsights: () => {
							navigation.navigate("basic.summary");
						},
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
							showSympInteract(selectedSymptom);
							navigation.navigate("basic.summary");
						},
					}),
				})}
			/>
		</Stack.Navigator>
	);
}

type BasicAssessmentScreenGroupAction = {
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
};
export default function BasicAssessmentScreenGroup({
	entry,
	actions,
}: WorkflowScreen<BasicProps, BasicAssessmentScreenGroupAction>) {
	return (
		<SymptomAssessmentSequenceProvider>
			<BottomSheetInteractionProvider lang="en">
				<MainComponent patient={entry.patient} actions={actions} />
			</BottomSheetInteractionProvider>
		</SymptomAssessmentSequenceProvider>
	);
}
