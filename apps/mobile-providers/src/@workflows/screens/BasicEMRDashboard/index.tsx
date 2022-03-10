import _ from "lodash";
import React, { useState } from "react";
import { FlatList, ScrollView, useWindowDimensions, View } from "react-native";
import {
	AnimatedFAB,
	Button,
	Divider,
	FAB,
	Searchbar,
} from "react-native-paper";
import { ElsaIcon, PlusIcon, SearchIcon, XIcon } from "../../../assets/vectors";
// import { Text } from "react-native-paper";
import { Layout, Text } from "../../../@libs/elsa-ui/components";
import theme from "../../../theme";
import { differenceInYears } from "date-fns";

const recentPatients: Patient[] = [
	{
		id: "baraka-mzee",
		firstName: "Baraka",
		lastName: "Mzee",
		phone: "+255 712 734 723",
		sex: "male",
		registerDate: new Date(),
		dateOfBirth: new Date("1984-12-02"),
		address: "Dar es Salaam",
	},
	{
		id: "micheal-fisher",
		firstName: "Micheal",
		lastName: "Fisher",
		registerDate: new Date(),
		phone: "+255 678 908 123",
		sex: "male",
		dateOfBirth: new Date("1964-11-02"),
		address: "Arusha, Kilimanjaro",
	},
	{
		id: "iids",
		firstName: "Megan",
		lastName: "Fox",
		registerDate: new Date(),
		phone: "+1 292-232-3451",
		sex: "female",
		dateOfBirth: new Date("1981-12-02"),
		address: "Dar es Salaam",
	},
];

function BasicEMRDashboardScreen({
	entry,
	actions: $,
}: {
	entry: {
		fullName: string;
	};
	actions: {
		onOpenFile: (patient: Patient) => void;
		onNewPatient: () => void;
	};
}) {
	const { height } = useWindowDimensions();
	const [searchQuery, setSearchQuery] = useState("");
	// const onChangeSearch = () => {}

	const handleSearch = (e) => {
		// FIXME: Needs to be callback
		// TODO: start searching
		// console.warn(searchQuery);
		return null;
	};

	return (
		<>
			<ScrollView style={{ position: "relative" }}>
				<Layout hideHeader>
					<View style={{ paddingVertical: 8 }}>
						<ElsaIcon
							width={28}
							height={28}
							style={{
								color: theme.color.primary.base,
							}}
						/>
					</View>
					<View style={{ paddingVertical: 8 }}>
						<Text font="extra-black" style={{ fontSize: 28 }}>
							Hi,
						</Text>
						<Text font="extra-black" style={{ fontSize: 28 }}>
							{entry.fullName}
						</Text>
					</View>

					<View style={{ paddingVertical: 10 }}>
						<Text font="bold" size="md">
							Find a Client
						</Text>
						<Text style={{ lineHeight: 24 }}>
							You can search by name or telephone
						</Text>

						<Searchbar
							placeholder="Ex. Juma Nasorro"
							style={{ marginTop: 10 }}
							onChangeText={setSearchQuery}
							onSubmitEditing={handleSearch}
							value={searchQuery}
						/>
					</View>

					<View style={{ marginBottom: 50 }}>
						<View style={{ marginVertical: 10 }}>
							<Text font="bold" size="md">
								Recent Clients
							</Text>
						</View>
						{recentPatients.map((patient, index, array) => (
							<View key={index}>
								{/* <Divider /> */}
								<RecentPatientItem
									patient={patient}
									onPressOpenFile={() =>
										$.onOpenFile(patient)
									}
								/>
							</View>
						))}
					</View>
				</Layout>
			</ScrollView>
			<FAB
				style={{
					position: "absolute",
					margin: 16,
					right: 0,
					bottom: 0,
				}}
				// small
				label="New Patient"
				icon="plus"
				onPress={() => $.onNewPatient()}
			/>
		</>
	);
}

type RecentPatientItemProps = {
	patient: Patient;
	onPressOpenFile: () => void;
};

function RecentPatientItem({
	patient,
	onPressOpenFile,
}: RecentPatientItemProps) {
	return (
		<View style={{ paddingVertical: 8 }}>
			<Text style={{ paddingBottom: 6 }} font="bold">
				{patient.firstName} {patient.lastName}
			</Text>
			<Text style={{ paddingBottom: 6 }}>
				{patient.sex === "male" ? "Male" : "Female"},{" "}
				{differenceInYears(new Date(), patient.dateOfBirth)} years
			</Text>
			<Text>{patient.phone}</Text>

			<Button
				mode="outlined"
				onPress={onPressOpenFile}
				style={{ marginTop: 8 }}
			>
				Open File
			</Button>
		</View>
	);
}

export default BasicEMRDashboardScreen;
