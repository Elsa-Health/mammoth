import React, { Fragment } from "react";
import { useSymptomAssessment } from "../../../app/context/assessment";
import { Pressable, PressableProps, View, ViewProps } from "react-native";
import theme from "../../../theme";
import { symptoms, useSymptomLocale } from "../../../app/symptoms";
import { CheckCircleIcon } from "../../../assets/vectors";
import { SymptomData, SymptomId } from "../../../../@types";
import { Text } from "../../../@libs/elsa-ui/components";
import { RevealContent } from "../../../@libs/elsa-ui/components/misc";

export const SymptomItem = ({
	symptom,
	present,
	...pressableProps
}: { symptom: string; present?: boolean } & PressableProps) => {
	return (
		<Pressable
			android_ripple={{ borderless: true, radius: 15 }}
			{...pressableProps}
			style={[
				{
					display: "flex",
					flexDirection: "row",
					alignSelf: "flex-start",
					paddingVertical: 6,
				},
				pressableProps.style,
			]}
		>
			{/* <View style={{ width: 18, height: 18, backgroundColor:  ? 'green': 'red', borderRadius: 20 }} /> */}
			<Text
				style={[
					{ textTransform: "capitalize", fontSize: 17 },
					present !== undefined &&
						(!present
							? {
									textDecorationLine: "line-through",
									textDecorationStyle: "solid",
									textDecorationColor: "#000",
							  }
							: {}),
				]}
			>
				{symptom}
			</Text>
			{present !== undefined &&
				(present ? (
					<CheckCircleIcon
						style={{ color: "green", marginLeft: 6 }}
						width={20}
						height={20}
					/>
				) : null)}
		</Pressable>
	);
};

export function SelectedConditionSummary({
	style,
	condition: { presentingSymptoms = [], absentSymptoms = [] },
	onSelectExistingSymptom,
	onSelectNewSymptom,
}: {
	style?: ViewProps["style"];
	condition: {
		presentingSymptoms?: string[];
		absentSymptoms?: string[];
	};
	onSelectExistingSymptom?: (id: SymptomId, entry?: SymptomData) => void;
	onSelectNewSymptom?: (text: string) => void;
}) {
	const [ps, as] = useSymptomAssessment((s) => [
		s.presentingSymptoms,
		s.absentSymptoms,
	]);
	const { getSymptomById } = useSymptomLocale();

	return (
		<View
			style={[
				{ display: "flex", flexDirection: "row", width: "100%" },
				style,
			]}
		>
			<RevealContent
				style={{ flex: 1 }}
				show={presentingSymptoms.length > 0}
			>
				<Text font="bold" style={{ flexWrap: "nowrap" }}>
					Presenting Symptoms
				</Text>
				<View style={{ marginTop: 4 }}>
					{presentingSymptoms
						.map((symId) => {
							// try matching the presenting symptoms that have been selected with the presenting symptoms in the system
							const presentIndex = ps.findIndex(
								(p) => p.id === symId
							);
							const presentAsPresent = presentIndex > -1;
							// present in the absent symptom category

							const absentIndex = as.findIndex(
								(a) => a.id === symId
							);
							const presentAsAbsent =
								as.findIndex((p) => p.id === symId) > -1;

							// getting the actual text of the symptom
							const content = getSymptomById(symId);

							// show the sypmtom text. if missing, then just show/search the string
							const symptomText = content?.symptom || `${symId}`;

							return {
								symId,
								symptomText,
								action: () => {
									// set up action to take place when pressed
									if (presentAsPresent) {
										console.log(
											"Present -->:",
											ps[presentIndex]
										);
										const { id, data } = ps[presentIndex];
										onSelectExistingSymptom &&
											onSelectExistingSymptom(
												id as SymptomId,
												data
											);
										return;
									}

									if (presentAsAbsent) {
										console.log(
											"absent -->:",
											as[absentIndex]
										);
										const { id, ..._ } = as[absentIndex];
										onSelectExistingSymptom &&
											onSelectExistingSymptom(
												id as SymptomId
											);
										return;
									}

									onSelectNewSymptom &&
										onSelectNewSymptom(symptomText);
								},
								present: !presentAsPresent
									? presentAsAbsent
										? false
										: undefined
									: true,
							};
						})
						.map((s, ix) => {
							return (
								<SymptomItem
									key={s.symId}
									onPress={s.action}
									symptom={s.symptomText}
									present={s.present}
								/>
							);
						})}
				</View>
			</RevealContent>
		</View>
	);
}

const Circle = ({
	size,
	disabled = false,
}: {
	size: number;
	disabled?: boolean;
}) => (
	<View
		style={{
			width: size,
			height: size,
			borderColor: theme.color.secondary.base,
			borderRadius: 10,
			backgroundColor: disabled ? "#64d8cb77" : "#26a69a",
		}}
	/>
);
export function CircleBar({
	size = 10,
	count,
	style,
	total = 10,
}: {
	count: number;
	size?: number;
	style?: ViewProps["style"];
	total?: number;
}) {
	const spacing = Math.max(2, (size * 2) / 3);
	return (
		<View
			style={[
				style,
				{ display: "flex", marginVertical: 5, flexDirection: "row" },
			]}
		>
			{Array(count)
				.fill(3)
				.map((x, ix) => (
					<View
						key={ix}
						style={{ paddingLeft: ix !== 0 ? spacing : 0 }}
					>
						<Circle size={size} />
					</View>
				))}
			{/* { Array(Math.max(0, total - count)).fill(3).map((x, ix) => <View key={ix} style={{ paddingLeft:  spacing}}><Circle size={size} disabled /></View>) } */}
		</View>
	);
}
