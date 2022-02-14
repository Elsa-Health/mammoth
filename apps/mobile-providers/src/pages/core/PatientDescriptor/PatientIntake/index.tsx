/**
 * Screen for getting the information for loading the
 * patients information to the app.
 */
import { StackActions, useNavigation } from "@react-navigation/native";
import React from "react";
import { Layout, Text } from "../../../../components";
import {
	Button,
	MultiInput,
	TextInput,
	VariableTextInput,
} from "../../../../components/input";
import { SectionedSelect, SelectableChip } from "../../../../components/misc";
import { StyleSheet, View } from "react-native";

import DatePicker from "react-native-date-picker";
import { ScrollView } from "react-native-gesture-handler";
import { useTranslation } from "react-i18next";
import { InformationIcon } from "../../../../assets/vectors";
import theme from "../../../../theme";

import produce from "immer";
import { capitalize, kebabCase } from "lodash";
import { usePatientDescription } from "../context";

const NumberTextInput = (props: any) => (
	<TextInput
		value={props.value}
		placeholder="0"
		onChangeText={props.onChangeValue}
		keyboardType="numeric"
		style={sty.numberText}
	/>
);
const RespRateTextInput = (props: any) => (
	<TextInput
		value={props.value}
		placeholder="bpm"
		onChangeText={props.onChangeValue}
		keyboardType="numeric"
		style={sty.numberLongText}
	/>
);
const HRTextInput = (props: any) => (
	<TextInput
		value={props.value}
		placeholder="/min"
		onChangeText={props.onChangeValue}
		keyboardType="numeric"
		style={sty.numberLongText}
	/>
);
const O2SatTextInput = (props: any) => (
	<TextInput
		value={props.value}
		placeholder="%"
		onChangeText={props.onChangeValue}
		keyboardType="numeric"
		style={sty.numberLongText}
	/>
);

const InfoBox = ({
	color,
	...props
}: {
	title: string;
	text: string;
	color?: string;
}) => {
	return (
		<View
			style={{
				marginVertical: 6,
				padding: 16,
				borderWidth: 2,
				borderRadius: 8,
				borderColor: color ? color : theme.color.primary.base,
				display: "flex",
				flexWrap: "wrap",
				alignItems: "flex-end",
				paddingHorizontal: 10,
			}}
		>
			<View style={{ flex: 1 }}>
				<View
					style={{
						marginLeft: 5,
						display: "flex",
						flexDirection: "row",
						alignItems: "center",
					}}
				>
					<InformationIcon
						width={28}
						height={28}
						style={{
							color: color ? color : theme.color.primary.base,
						}}
					/>
					<Text
						font="bold"
						style={{
							color: color ? color : theme.color.primary.base,
							lineHeight: 20,
						}}
					>
						{props.title}
					</Text>
				</View>
				<Text
					font="medium"
					style={{
						color: color ? color : theme.color.primary.base,
						lineHeight: 20,
					}}
				>
					{props.text}
				</Text>
			</View>
		</View>
	);
};

const computeBMI = (weightInKg: number, heightInM: number) => {
	return weightInKg / (heightInM * heightInM);
};

type VarVals<T extends string> = { [key in T]?: string };

type WHOptions = "weight" | "height";
type WHVals = VarVals<WHOptions>;
const wh_itemId = "weight-height";
function WeightHeightText({
	value,
	onChangeValue,
}: {
	value: WHVals | undefined;
	onChangeValue: (value: WHVals | undefined) => void;
}) {
	const [state, setState] = React.useState<WHVals | undefined>(() => value);
	const [bmiInfo, setBmiInfo] = React.useState<
		{ title: string; text: string } | undefined
	>(undefined);

	React.useEffect(() => {
		onChangeValue(state);

		try {
			const heightInM = parseInt(state?.height || "0") / 100;
			const weightInKg = parseInt(state?.weight || "0");
			const bmi = computeBMI(weightInKg, heightInM);
			// Check the BMI notice

			if (bmi <= 18.5)
				setBmiInfo({
					title: `Patient's BMI: ${bmi.toFixed(2)}`,
					text: "BMI indicates that the patient is MALNURISHED",
				});
			if (bmi > 18.5 && bmi <= 25)
				setBmiInfo({
					title: `Patient's BMI: ${bmi.toFixed(2)}`,
					text: "BMI indicates that the patient is NORMAL WEIGHT",
				});
			if (bmi > 25 && bmi <= 30)
				setBmiInfo({
					title: `Patient's BMI: ${bmi.toFixed(2)}`,
					text: "BMI indicates that the patient is OVER WEIGHT",
				});
			if (bmi > 30 && bmi <= 40)
				setBmiInfo({
					title: `Patient's BMI: ${bmi.toFixed(2)}`,
					text: "BMI indicates that the patient is OBESE",
				});
			if (bmi > 40)
				setBmiInfo({
					title: `Patient's BMI: ${bmi.toFixed(2)}`,
					text: "BMI indicates that the patient iis MORBIDLY OBESE",
				});
		} catch {
			setBmiInfo(undefined);
		}
	}, [state]);

	const changeText = React.useCallback(
		(name: WHOptions) => (val: string) =>
			setState((value) =>
				produce(value, (df) => {
					if (df === undefined) {
						df = {};
					}
					df[name] = val;
					return df;
				})
			),
		[]
	);

	return (
		<View>
			<View style={{ flex: 1, display: "flex", flexDirection: "row" }}>
				{/* Weight */}
				<TextInput
					placeholder="Weight (kg)"
					value={state?.weight}
					onChangeText={changeText("weight")}
					keyboardType="numeric"
					style={[sty.numberLongText, { width: "90%" }]}
				/>
				{/* Height */}
				<TextInput
					placeholder="Height (cm)"
					value={state?.height}
					onChangeText={changeText("height")}
					keyboardType="numeric"
					style={[sty.numberLongText, { width: "90%" }]}
				/>
			</View>
			{bmiInfo !== undefined && <InfoBox {...bmiInfo} />}
		</View>
	);
}

type SDOptions = "systolic" | "diastolic";
type SDVals = VarVals<SDOptions>;
const sd_itemId = "blood-pressure";
function SystolicDiastolicText({
	value,
	onChangeValue,
}: {
	value: SDVals | undefined;
	onChangeValue: (value: SDVals | undefined) => void;
}) {
	const [state, setState] = React.useState<SDVals | undefined>(() => value);
	const [hypertensionStatus, setHypertensionStatus] = React.useState<
		{ title: string; text: string } | undefined
	>(undefined);

	React.useEffect(() => {
		onChangeValue(state);

		try {
			const systolic = parseInt(state?.systolic || "0");
			const diastolic = parseInt(state?.diastolic || "0");

			if (systolic) {
			}
		} catch (err) {
			setHypertensionStatus(undefined);
		}
	}, [state]);

	const changeText = React.useCallback(
		(name: SDOptions) => (val: string) =>
			setState((value) =>
				produce(value, (df) => {
					if (df === undefined) {
						df = {};
					}
					df[name] = val;
					return df;
				})
			),
		[]
	);

	return (
		<View>
			<View style={{ flex: 1, display: "flex", flexDirection: "row" }}>
				{/* Weight */}
				<TextInput
					placeholder="Systolic (mmHg)"
					value={state?.systolic}
					onChangeText={changeText("systolic")}
					keyboardType="numeric"
					style={[sty.numberLongText, { width: "90%" }]}
				/>
				{/* Height */}
				<TextInput
					placeholder="Diastolic (mmHg)"
					value={state?.diastolic}
					onChangeText={changeText("diastolic")}
					keyboardType="numeric"
					style={[sty.numberLongText, { width: "90%" }]}
				/>
			</View>
			{hypertensionStatus !== undefined && (
				<InfoBox {...hypertensionStatus} />
			)}
		</View>
	);
}

function TempTextInput({
	value,
	onChangeValue,
}: {
	value: string | undefined;
	onChangeValue: (value: string | undefined) => void;
}) {
	const [tempStatus, setTempStatus] = React.useState<
		{ title: string; text: string; color: string } | undefined
	>(undefined);

	React.useEffect(() => {
		try {
			const temp = parseInt(value || "0");
			if (temp > 37.5) {
				setTempStatus({
					title: "Temperature Warning",
					text: "This patient has a high-grade fever.",
					color: "#ffae2b",
				});
			} else {
				setTempStatus(undefined);
			}
		} catch (err) {
			setTempStatus(undefined);
		}
	}, [value]);

	return (
		<View>
			<View style={{ flex: 1, display: "flex", flexDirection: "row" }}>
				<TextInput
					placeholder="in Celcius"
					value={value}
					onChangeText={onChangeValue}
					keyboardType="numeric"
					style={sty.numberLongText}
				/>
			</View>
			{tempStatus !== undefined && <InfoBox {...tempStatus} />}
		</View>
	);
}

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
const HouseColumnComponent = ({
	label,
	component: Component,
	value,
	onChangeValue,
}: any) => (
	<View
		style={{
			marginTop: 5,
			display: "flex",
			flexDirection: "column",
			paddingVertical: 5,
		}}
	>
		<Text font="medium" style={{ marginRight: 5 }}>
			{label}
		</Text>
		<Component value={value} onChangeValue={onChangeValue} />
	</View>
);

type PatientIntakeForm = {
	age: Partial<{ years: string; months: string; days: string }>;
	sex: "male" | "female";
	pregnant: boolean;
	dueDate: Date;
	allergies: string[];
	chronicIllnesses: string[];
	vitalSigns: Partial<{
		temp: string; // in Celcius
		"weight-height": {
			weight: string;
			height: string;
		};
		"blood-pressure": {
			systolic: string;
			diastolic: string;
		};
		"resp-rate": string;
		"heart-rate": string;
		"o2-sat": string;
	}>;
};

export type PatientIntakeData = {
	age: {
		years: number;
		months: number;
		days: number;
	};
	sex: "male" | "female";
	pregnant: boolean;
	dueDate: string | undefined;
	allergies: string[];
	chronicIllnesses: string[];
	vitalSigns: {
		temp: number;
		weight: number;
		height: number;
		systolic: number;
		diastolic: number;
		"resp-rate": number;
		"heart-rate": number;
		"o2-sat": number;
	};
};

/**
 * Converts the input from `PatientIntakeForm` type to `PatientIntakeData` type
 */
const standardizeData = (data: PatientIntakeForm): PatientIntakeData => {
	const { age = {}, vitalSigns, dueDate, ...others } = data;

	return {
		age: {
			years: parseInt(age?.years || "0"),
			months: parseInt(age?.months || "0"),
			days: parseInt(age?.days || "0"),
		},
		dueDate: dueDate.toUTCString(),
		vitalSigns: produce({} as PatientIntakeData["vitalSigns"], (df) => {
			df["temp"] = parseInt(vitalSigns?.temp || "0");
			df["weight"] = parseInt(vitalSigns["weight-height"]?.weight || "0");
			df["height"] = parseInt(vitalSigns["weight-height"]?.height || "0");
			df["diastolic"] = parseInt(
				vitalSigns["blood-pressure"]?.diastolic || "0"
			);
			df["systolic"] = parseInt(
				vitalSigns["blood-pressure"]?.systolic || "0"
			);
			df["heart-rate"] = parseInt(vitalSigns["heart-rate"] || "0");
			df["resp-rate"] = parseInt(vitalSigns["resp-rate"] || "0");
			df["o2-sat"] = parseInt(vitalSigns["o2-sat"] || "0");

			return df;
		}),
		...others,
	};
};

const revertData = (data: PatientIntakeData): PatientIntakeForm => {
	const { age, vitalSigns, dueDate, ...others } = data;

	return {
		age: {
			years: age.years.toString(),
			months: age.months.toString(),
			days: age.days.toString(),
		},
		dueDate: dueDate !== undefined ? new Date(dueDate) : new Date(),
		vitalSigns: {
			temp: vitalSigns.temp.toString(), // in Celcius
			"weight-height": {
				weight: vitalSigns.weight.toString(),
				height: vitalSigns.height.toString(),
			},
			"blood-pressure": {
				systolic: vitalSigns.systolic.toString(),
				diastolic: vitalSigns.diastolic.toString(),
			},
			"resp-rate": vitalSigns["resp-rate"].toString(),
			"heart-rate": vitalSigns["heart-rate"].toString(),
			"o2-sat": vitalSigns["o2-sat"].toString(),
		},
		...others,
	};
};

const prepareList = (list: string[]) =>
	list
		.map((k) => capitalize(k.toLowerCase()))
		.map((k) => ({ id: kebabCase(k), name: k }));

const ALL_ALLERGIES_LISTS = [
	{
		id: 0,
		name: "Medication Allergies",
		children: prepareList([
			"sulphur",
			"penicillin ",
			"vaccine ",
			"other type of drug",
		]),
	},
	{
		id: 1,
		name: "Food Allergies",
		children: prepareList([
			"sea foods",
			"white meat",
			"red meat",
			"peanut",
		]),
	},
];

const ALL_CHRONIC_ILLNESSES_LISTS = [
	{
		id: 0,
		name: "Chronic Illnesess",
		children: prepareList([
			"HIV/AIDS",
			"DIABETES",
			"ASTHMATIC",
			"HYPERTENSION",
			"EPILEPSY",
		]),
	},
];

// const produceData = (data: Assessment) => {
//     return produce({...data} as Assessment, df => {
//         const newAge = {
//             years: parseInt(data.age?.years || "0"),
//             months: parseInt(data.age?.months || "0"),
//             days: parseInt(data.age?.days || "0"),
//         }
//         // format the age properly
//         df['age'] = newAge
//         df['dueDate'] = data.dueDate?.toUTCString()

//         const temp = parseInt(data?.vitalSigns?.temp as unknown as string || "0")
//         const weight = { value: parseInt(data?.vitalSigns?.weight?.input as unknown as string || "0"), option: df.vitalSigns?.weight?.option  }
//         const height = { value: parseInt(data?.vitalSigns?.height?.input as unknown as string || "0"), option: df.vitalSigns?.height?.option }

//         if (data['vitalSigns'] !== undefined) {
//             df['vitalSigns'] = {
//                 temp,
//                 weight,
//                 height
//             }
//         }
//         return df
//     })
// }

const DEFAULT_PATIENT_INTAKE_STATE: PatientIntakeForm = {
	age: {},
	sex: "male",
	pregnant: false,
	dueDate: new Date(),
	allergies: [],
	chronicIllnesses: [],
	vitalSigns: {},
};

export default function PatientIntake() {
	const navigation = useNavigation();
	const patientIntake = usePatientDescription((s) => s.patientIntake);
	const [data, setData] = React.useState<PatientIntakeForm>(() =>
		patientIntake !== undefined
			? revertData(patientIntake)
			: DEFAULT_PATIENT_INTAKE_STATE
	);

	// Set's the patient intake information
	const setPatientIntake = usePatientDescription(
		(s) => (patientIntake: PatientIntakeData) =>
			s.setData({ patientIntake })
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
		<Layout
			title={t`title`}
			navigation={navigation}
			style={{ padding: 0, paddingTop: 8 }}
			hideLogo
		>
			<ScrollView style={{ flex: 1, paddingHorizontal: 24 }}>
				<View>
					<Text>{t`description`}</Text>
				</View>
				<MultiInput
					title="Age"
					onChangeValue={setAge}
					configuration={{
						years: { show: true },
						months: { show: true },
					}}
					component={HouseRowComponent}
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
				{/* Allergies + Chronic Illnesses related information */}
				<View style={{ marginVertical: 8 }}>
					<Text font="bold" style={{ marginTop: 10, fontSize: 16 }}>
						Select any allergies te patient has:
					</Text>
					<View>
						<SectionedSelect
							confirmText={"Confirm"}
							items={ALL_ALLERGIES_LISTS}
							uniqueKey="id"
							selectText="Select Allergies"
							searchPlaceholderText={"Search Allergies"}
							onSelectedItemsChange={(items) =>
								setData((k) =>
									produce(k, (df) => {
										df["allergies"] = items;
									})
								)
							}
							selectedItems={data.allergies || []}
						/>
					</View>
				</View>

				<View style={{ marginVertical: 8 }}>
					<Text font="bold" style={{ marginTop: 10, fontSize: 16 }}>
						Select any chronic illnesses:
					</Text>
					<View>
						<SectionedSelect
							confirmText={"Confirm"}
							items={ALL_CHRONIC_ILLNESSES_LISTS}
							uniqueKey="id"
							selectText="Select Chronic Illnesses"
							searchPlaceholderText={"Search Chronic Illnesses"}
							onSelectedItemsChange={(items) =>
								setData((k) =>
									produce(k, (df) => {
										df["chronicIllnesses"] = items;
									})
								)
							}
							selectedItems={data.chronicIllnesses || []}
						/>
					</View>
				</View>

				{/* Section for Vital signs */}
				<View>
					<MultiInput
						title={tcomp`vitalSigns.text`}
						style={{ marginVertical: 10 }}
						onChangeValue={setVitalSigns}
						configuration={{
							// 'weight': { show: true },
							// 'height': { show: true },
							temp: { show: true },
							"weight-height": { show: true },
							"blood-pressure": { show: true },
						}}
						component={HouseColumnComponent}
						fields={[
							{
								name: "temp",
								label: tcomp`vitalSigns.temp.text`,
								component: TempTextInput,
							},
							// {  name: 'weight', label: 'Weight', component: WeightTextInput },
							// {  name: 'height', label: 'Height', component: HeightTextInput },
							{
								name: wh_itemId,
								label: "Weight & Height",
								component: WeightHeightText,
							},
							{
								name: sd_itemId,
								label: "Blood Pressure",
								component: SystolicDiastolicText,
							},
							{
								name: "resp-rate",
								label: "Resp Rate",
								component: RespRateTextInput,
							},
							{
								name: "heart-rate",
								label: "Heart Rate",
								component: HRTextInput,
							},
							{
								name: "o2-sat",
								label: "Oxygen Saturation",
								component: O2SatTextInput,
							},
						]}
					/>
				</View>
				<View style={{ flex: 1, marginVertical: 6 }}>
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
						style={{ borderRadius: 40 }}
						onPress={() => {
							// publish the data
							setPatientIntake(standardizeData(data));
							navigation.dispatch(
								StackActions.push(
									"patient.symptom.assessment"
									// produceData(data)
								)
							);
						}}
						title={"Next: Presenting Complaints"}
					/>
				</View>
			</ScrollView>
		</Layout>
	);
}

const sty = StyleSheet.create({
	numberText: {
		borderWidth: 0,
		borderBottomWidth: 1,
		fontSize: 18,
		alignSelf: "baseline",
		width: "33%",
	},
	numberLongText: {
		borderWidth: 0,
		borderBottomWidth: 1,
		fontSize: 18,
		alignSelf: "baseline",
		width: "100%",
	},
});
