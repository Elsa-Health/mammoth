import React from "react";
import { View } from "react-native";
import {
	Button,
	Divider,
	IconButton,
	RadioButton,
	TextInput,
} from "react-native-paper";
import { Layout, Text } from "../../../@libs/elsa-ui/components";

import dayjs from "dayjs";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import theme from "../../../@libs/elsa-ui/theme";

import { ScrollView } from "react-native-gesture-handler";
import produce from "immer";
import { format } from "date-fns";
import DateTimePicker from "@react-native-community/datetimepicker";

type PatientFormType = {
	firstName: string;
	familyName: string;
	phoneNumber: string;
	resident: string;
	dateOfBirth: Date | undefined;
	sex: Sex;
};

const transformData = (data: PatientFormType): Omit<Patient, "id"> => {
	return {
		registerDate: new Date().toUTCString(),
		address: data.resident,
		dateOfBirth: dayjs(data.dateOfBirth).format("YYYY-MM-DD"),
		firstName: data.firstName,
		lastName: data.familyName,
		phone: data.phoneNumber,
		sex: data.sex,
	};
};

export default function BasicRegisterNewPatientScreen({
	actions: $,
}: WorkflowScreen<
	{},
	{
		onComplete: (patient: Omit<Patient, "id">) => void;
	}
>) {
	const [patient, set] = React.useState<PatientFormType>({
		firstName: "",
		familyName: "",
		phoneNumber: "",
		resident: "",
		dateOfBirth: undefined,
		sex: "male",
	});
	const changeValue = React.useCallback(
		(field: keyof typeof patient) => (value: string) => {
			set((s) =>
				produce(s, (df) => {
					df[field] = value;
				})
			);
		},
		[set]
	);

	const [showDOB, setShowDOB] = React.useState(false);
	return (
		<Layout title="Register New Patient" style={{ padding: 0 }}>
			<ScrollView contentContainerStyle={{ paddingHorizontal: 24 }}>
				{/*  Date*/}
				<View
					style={{
						display: "flex",
						flexDirection: "row",
						alignItems: "center",
						justifyContent: "space-between",
						paddingVertical: 10,
					}}
				>
					<View
						style={{
							display: "flex",
							flexDirection: "row",
							alignItems: "center",
						}}
					>
						<Icon
							color={theme.color.primary.base}
							size={24}
							name="calendar"
						/>
						<Text font="bold" style={{ marginLeft: 8 }}>
							Date
						</Text>
					</View>
					<Text>{dayjs(new Date()).format("DD MMMM YYYY")}</Text>
				</View>
				<Divider />

				{/* Field inputs */}
				<View
					style={{
						marginTop: theme.spacing.md,
						paddingVertical: theme.spacing.xs,
					}}
				>
					<View
						style={{
							display: "flex",
							flexDirection: "row",
							alignItems: "center",
						}}
					>
						<Icon
							color={theme.color.primary.base}
							size={24}
							name="account"
						/>
						<Text font="bold" style={{ marginLeft: 8 }}>
							Patient Information
						</Text>
					</View>
					<View style={{ marginVertical: 8 }}>
						<TextInput
							mode="outlined"
							label="First Name"
							value={patient.firstName}
							onChangeText={changeValue("firstName")}
							style={{ marginTop: theme.spacing.sm }}
						/>
						<TextInput
							mode="outlined"
							label="Family Name"
							value={patient.familyName}
							onChangeText={changeValue("familyName")}
							style={{ marginTop: theme.spacing.sm }}
						/>
						<TextInput
							mode="outlined"
							label="Phone Number"
							value={patient.phoneNumber}
							keyboardType="phone-pad"
							onChangeText={changeValue("phoneNumber")}
							style={{ marginTop: theme.spacing.sm }}
						/>
						<TextInput
							mode="outlined"
							label="Residency Location"
							value={patient.resident}
							onChangeText={changeValue("resident")}
							style={{ marginTop: theme.spacing.sm }}
						/>
						<View style={{ marginVertical: 8 }}>
							<View
								style={{
									display: "flex",
									flexDirection: "row",
									alignItems: "center",
								}}
							>
								<TextInput
									value={
										patient.dateOfBirth !== undefined
											? format(
													patient.dateOfBirth,
													"MMMM dd, yyyy"
											  )
											: undefined
									}
									mode="outlined"
									label="Date of Birth"
									onPressIn={() => setShowDOB((s) => !s)}
									showSoftInputOnFocus={false}
									style={{ flex: 1 }}
									onChange={null}
								/>

								<IconButton
									icon="calendar-month"
									color={"#555"}
									size={24}
									onPress={() => setShowDOB((s) => !s)}
								/>
							</View>

							{showDOB && (
								<DateTimePicker
									display="calendar"
									value={
										patient.dateOfBirth || new Date(2000)
									}
									onChange={(e, date) => {
										setShowDOB(false);
										changeValue("dateOfBirth")(date);
									}}
								/>
							)}
						</View>

						{/* <View
							style={{
								display: "flex",
								flexDirection: "row",
								marginTop: theme.spacing.sm,
							}}
						>
							<TextInput
								mode="outlined"
								label="Birth Month"
								style={{ flex: 1 }}
								keyboardType="number-pad"
								onChangeText={changeValue("birthMonth")}
								value={patient.birthMonth}
							/>
							<TextInput
								mode="outlined"
								label="Birth Day"
								keyboardType="number-pad"
								style={{
									flex: 1,
									marginLeft: theme.spacing.md,
								}}
								onChangeText={changeValue("birthDay")}
								value={patient.birthDay}
							/>
						</View>

						<TextInput
							mode="outlined"
							label="Birth Year"
							value={patient.birthYear}
							keyboardType="number-pad"
							onChangeText={changeValue("birthYear")}
							style={{
								width: "70%",
								marginTop: theme.spacing.sm,
							}}
						/> */}
					</View>
				</View>

				{/* Radio Inputs */}
				<View>
					<View>
						<Text font="bold">Patient's Sex</Text>

						<RadioButton.Group
							onValueChange={changeValue("sex")}
							value={patient.sex}
						>
							<View
								style={{
									display: "flex",
									flexDirection: "row",
									justifyContent: "space-evenly",
								}}
							>
								<RadioButton.Item label="Male" value="male" />
								<RadioButton.Item
									label="Female"
									value="female"
								/>
							</View>
						</RadioButton.Group>
					</View>
				</View>
				<View style={{ paddingVertical: theme.spacing.md }}>
					<Button
						onPress={() => {
							// TODO: convert `patient` to proper `Patient`
							// onComplete()
							$.onComplete(transformData(patient));
						}}
						mode="contained"
					>
						Register
					</Button>
				</View>
			</ScrollView>
		</Layout>
	);
}
