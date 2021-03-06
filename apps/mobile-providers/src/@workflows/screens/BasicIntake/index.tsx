/**
 * Screen for getting the information for loading the
 * patients information to the app.
 */
import { StackActions, useNavigation } from "@react-navigation/native";
import React from "react";
import { Layout, Text } from "../../../@libs/elsa-ui/components";
import {
	MultiInput,
	TextInput,
	VariableTextInput,
} from "../../../@libs/elsa-ui/components/input";
import { Button } from "react-native-paper";
import { SelectableChip } from "../../../@libs/elsa-ui/components/misc";
import { View } from "react-native";
import produce from "immer";

import DatePicker from "react-native-date-picker";
import { ScrollView } from "react-native-gesture-handler";
import { useTranslation } from "react-i18next";

const HouseRowComponent = ({
	label,
	component: Component,
	value,
	onChangeValue,
}: any) => (
	<View
		style={{
			marginTop: 5,
			display: "flex",
			flexDirection: "row",
			alignItems: "center",
		}}
	>
		<Text font="medium" style={{ marginRight: 5 }}>
			{label}
		</Text>
		<Component value={value} onChangeValue={onChangeValue} />
	</View>
);

const NumberTextInput = (props: any) => (
	<TextInput
		value={props.value}
		placeholder="0"
		onChangeText={props.onChangeValue}
		keyboardType="numeric"
		style={sty.numberText}
	/>
);
const WeightTextInput = (props: {
	value?: any;
	onChangeValue: (v: any) => void;
}) => {
	return (
		<View style={{ flex: 1, paddingHorizontal: 10 }}>
			<VariableTextInput
				value={props.value}
				placeholder="0"
				keyboardType="numeric"
				pickerStyle={{ flex: 0.8 }}
				onChangeValue={props.onChangeValue}
				options={[
					{ label: "Kg", value: "kg" },
					{ label: "Lb", value: "lb" },
				]}
			/>
		</View>
	);
};
const RespRateTextInput = (props: any) => (
	<TextInput
		value={props.value}
		placeholder="bpm"
		onChangeText={props.onChangeValue}
		keyboardType="numeric"
		style={sty.numberText}
	/>
);
const HRTextInput = (props: any) => (
	<TextInput
		value={props.value}
		placeholder="/min"
		onChangeText={props.onChangeValue}
		keyboardType="numeric"
		style={sty.numberText}
	/>
);
const O2SatTextInput = (props: any) => (
	<TextInput
		value={props.value}
		placeholder="%"
		onChangeText={props.onChangeValue}
		keyboardType="numeric"
		style={sty.numberText}
	/>
);
const BPTextInput = (props: any) => (
	<TextInput
		value={props.value}
		placeholder="mmHg"
		onChangeText={props.onChangeValue}
		keyboardType="numeric"
		style={sty.numberText}
	/>
);
const TempTextInput = (props: any) => (
	<TextInput
		placeholder="in Celcius"
		value={props.value}
		onChangeText={props.onChangeValue}
		keyboardType="numeric"
		style={sty.numberText}
	/>
);
const HeightTextInput = (props: {
	value?: any;
	onChangeValue: (v: any) => void;
}) => {
	return (
		<View style={{ flex: 1, paddingHorizontal: 2 }}>
			<VariableTextInput
				value={props.value}
				placeholder="0"
				keyboardType="numeric"
				pickerStyle={{ flex: 0.8 }}
				onChangeValue={props.onChangeValue}
				options={[
					{ label: "Cm", value: "cm" },
					{ label: "Feet", value: "ft" },
				]}
			/>
		</View>
	);
};

function transformIntakeFormData(data: any) {
	return produce({ ...data } as PatientIntake, (df) => {
		const newAge = {
			years: parseInt(data.age?.years || "0"),
			months: parseInt(data.age?.months || "0"),
			days: parseInt(data.age?.days || "0"),
		};
		// format the age properly
		df["age"] = newAge;
		df["dueDate"] = data.dueDate?.toUTCString();

		const temp = parseInt(
			(data?.vitalSigns?.temp as unknown as string) || "0"
		);
		const weight = {
			value: parseInt(
				(data?.vitalSigns?.weight?.input as unknown as string) || "0"
			),
			option: df.vitalSigns?.weight?.option,
		};
		const height = {
			value: parseInt(
				(data?.vitalSigns?.height?.input as unknown as string) || "0"
			),
			option: df.vitalSigns?.height?.option,
		};

		if (data["vitalSigns"] !== undefined) {
			df["vitalSigns"] = {
				temp,
				weight,
				height,
			};
		}
		return df;
	});
}

export default function BasicIntake({
	actions: $,
	entry: { id: patientId, patient },
}: WorkflowScreen<
	{
		patient: {
			age?: Age;
			sex?: Sex;
		};
		id: string;
	},
	{ onCompleteIntake: (patientId: string, data: PatientIntake) => void }
>) {
	const navigation = useNavigation();
	const [data, setData] = React.useState<Partial<PatientIntake>>(() => ({
		sex: "male",
		pregnant: false,
		dueDate: null,
		...patient,
	}));

	React.useEffect(() => {
		setData((p) => ({ ...p, ...patient }));
	}, []);

	const handlePatientSubmit = React.useCallback(
		() => $.onCompleteIntake(patientId, transformIntakeFormData(data)),
		[data, patientId]
	);

	const { t } = useTranslation("translation", {
		keyPrefix: "assessment.intake",
	});
	const { t: tcomp } = useTranslation("translation", {
		keyPrefix: "components",
	});
	const { t: tc } = useTranslation("translation", { keyPrefix: "common" });

	const setAge = React.useCallback(
		(value) => setData((d) => ({ ...d, age: value })),
		[setData]
	);
	const setVitalSigns = React.useCallback(
		(value) => setData((d) => ({ ...d, vitalSigns: value })),
		[setData]
	);

	return (
		<Layout title={t`title`} navigation={navigation}>
			<ScrollView style={{ flex: 1 }}>
				<View>
					<Text>{t`description`}</Text>
				</View>
				<MultiInput
					title="Age"
					initialValue={{
						years: data.age?.years?.toString() || "",
						months: data.age?.months?.toString() || "",
						days: data.age?.days?.toString() || "",
					}}
					onChangeValue={setAge}
					component={HouseRowComponent}
					configuration={{
						years: { show: true },
						months: { show: true },
					}}
					fields={[
						{
							name: "years",
							label: tcomp`age.items.years`,
							component: NumberTextInput,
						},
						{
							name: "months",
							label: tcomp`age.items.months`,
							component: NumberTextInput,
						},
						{
							name: "days",
							label: tcomp`age.items.days`,
							component: NumberTextInput,
						},
					]}
				/>
				{/* Name */}
				<Text
					font="bold"
					style={{ marginTop: 10, fontSize: 16 }}
				>{tcomp`sex.text`}</Text>
				<View
					style={{
						marginTop: 5,
						display: "flex",
						flexDirection: "row",
					}}
				>
					<SelectableChip
						text={tcomp`sex.items.male`}
						selected={data.sex === "male"}
						onChange={() =>
							setData((d) => ({
								...d,
								sex: "male",
								pregnant: false,
							}))
						}
					/>
					<SelectableChip
						text={tcomp`sex.items.female`}
						style={{ marginLeft: 6 }}
						selected={data.sex === "female"}
						onChange={() =>
							setData((d) => ({ ...d, sex: "female" }))
						}
					/>
				</View>
				{data.sex === "female" ? (
					<>
						<Text
							font="bold"
							style={{ marginTop: 10, fontSize: 16 }}
						>{t`is_pregnant`}</Text>
						<View
							style={{
								marginTop: 5,
								display: "flex",
								flexDirection: "row",
							}}
						>
							<SelectableChip
								text="Yes"
								selected={data.pregnant}
								onChange={() =>
									setData((d) => ({ ...d, pregnant: true }))
								}
							/>
							<SelectableChip
								text="No"
								style={{ marginLeft: 6 }}
								selected={!data.pregnant}
								onChange={() =>
									setData((d) => ({ ...d, pregnant: false }))
								}
							/>
						</View>
						{data.pregnant ? (
							<>
								{/* <Text font="bold" style={{ marginTop: 10, fontSize: 16 }}>Delivery due date?</Text> */}
								<View style={{ marginTop: 5 }}>
									<Text
										font="bold"
										style={{ marginTop: 10, fontSize: 16 }}
									>{t`delivery_due_date`}</Text>

									<DatePicker
										mode="date"
										date={data.dueDate || new Date()}
										androidVariant="nativeAndroid"
										minimumDate={new Date()}
										onDateChange={(date: Date) =>
											setData((d) => ({
												...d,
												dueDate: date,
											}))
										}
									/>
								</View>
							</>
						) : null}
					</>
				) : null}
				{/* Section for Vital signs */}
				<View>
					<MultiInput
						title={tcomp`vitalSigns.text`}
						style={{ marginVertical: 10 }}
						component={HouseRowComponent}
						onChangeValue={setVitalSigns}
						configuration={{
							weight: { show: true },
						}}
						fields={[
							{
								name: "temp",
								label: tcomp`vitalSigns.temp.text`,
								component: TempTextInput,
							},
							{
								name: "weight",
								label: "Weight",
								component: WeightTextInput,
							},
							{
								name: "height",
								label: "Height",
								component: HeightTextInput,
							},
							{
								name: "resp-rate",
								label: "Resp Rate",
								component: RespRateTextInput,
							},
							{ name: "bp", label: "BP", component: BPTextInput },
							{ name: "hr", label: "HR", component: HRTextInput },
							{
								name: "o2-sat",
								label: "O2 Saturation",
								component: O2SatTextInput,
							},
						]}
					/>
				</View>
				<View style={{ flex: 1 }}>
					<View style={{ flex: 1 }}>
						{/* spacing to push the contents down */}
					</View>
					<Text
						style={{
							fontSize: 14,
							color: "#777",
							marginVertical: 6,
						}}
					>{t`footer_note`}</Text>
					<Button
						mode="contained"
						onPress={handlePatientSubmit}
					>{tc`next`}</Button>
				</View>
			</ScrollView>
		</Layout>
	);
}

const sty = {
	numberText: {
		borderWidth: 0,
		borderBottomWidth: 1,
		fontSize: 18,
		alignSelf: "baseline",
		width: "33%",
	},
};
