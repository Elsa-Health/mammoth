import React from "react";
import { View } from "react-native";
import { Button, Divider, RadioButton, TextInput } from "react-native-paper";
import { Layout, Text } from "../../../@libs/elsa-ui/components";

import dayjs from "dayjs";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import theme from "../../../theme";

import * as data from "../../../@libs/data-fns";
import { ScrollView } from "react-native-gesture-handler";
import produce from "immer";

type PatientFormType = {
	date: Date;
	firstName: string;
	familyName: string;
	phoneNumber: string;
	resident: string;
	birthMonth: string;
	birthDay: string;
	birthYear: string;
	sex: Sex;
	pregnant: string;
};

const transformData = (data: PatientFormType): Omit<Patient, "id"> => {
	return {
		registerDate: data.date,
		address: data.resident,
		dateOfBirth: new Date(
			parseInt(data.birthYear) || 0,
			parseInt(data.birthMonth) || 0,
			parseInt(data.birthDay) || 0
		),
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
		date: new Date(),
		firstName: "",
		familyName: "",
		phoneNumber: "",
		resident: "",
		birthMonth: "",
		birthDay: "",
		birthYear: "",
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
					<Text>
						{dayjs(patient.registerDate).format("DD MMMM YYYY")}
					</Text>
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

						<View
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
						/>
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
