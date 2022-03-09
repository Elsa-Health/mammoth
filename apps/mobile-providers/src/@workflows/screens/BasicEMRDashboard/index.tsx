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
import { PlusIcon, SearchIcon, XIcon } from "../../../assets/vectors";
// import { Text } from "react-native-paper";
import { Layout, Text } from "../../../@libs/elsa-ui/components";

const dummyPatients = _.times(10, (n) => n);

function BasicEMRDashboardScreen({
	entry,
	actions: $,
}: {
	entry: {
		fullName: string;
	};
	actions: {
		onOpenFile: (pid: string) => void;
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

	const recentPatients = dummyPatients;
	return (
		<>
			<ScrollView style={{ position: "relative" }}>
				<Layout hideHeader>
					<View style={{ paddingVertical: 20 }}>
						<Text font="extra-black" style={{ fontSize: 28 }}>
							Hi,
						</Text>
						<Text font="extra-black" style={{ fontSize: 28 }}>
							{entry.fullName}
						</Text>
					</View>

					<View style={{ paddingVertical: 20 }}>
						<Text font="bold" style={{ fontSize: 20 }}>
							Find a Client
						</Text>
						<Text>You can search by name or telephone</Text>

						<Searchbar
							placeholder="Juma Nasorro"
							icon={() => <SearchIcon />}
							clearIcon={() => <XIcon />}
							style={{ marginTop: 10 }}
							onChangeText={setSearchQuery}
							onSubmitEditing={handleSearch}
							value={searchQuery}
						/>
					</View>

					<View style={{ paddingTop: 20, marginBottom: 50 }}>
						<Text font="bold" style={{ fontSize: 20 }}>
							Recent Clients
						</Text>

						<View style={{ height: 10 }} />

						{/* <FlatList
						data={recentPatients}
						renderItem={({ item, index }) => (
							<RecentPatientItem key={index} patient={item} />
						)}
						ItemSeparatorComponent={() => <Divider />}
					/> */}

						{recentPatients.map((patient, index, array) => (
							<View key={patient}>
								<RecentPatientItem
									patient={patient}
									onOpenFile={() => $.onOpenFile(patient)}
								/>
								{index < array.length - 1 && <Divider />}
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
				icon={() => <PlusIcon style={{ color: "#fff" }} />}
				onPress={() => $.onNewPatient()}
			/>
		</>
	);
}

type RecentPatientItemProps = {
	patient: Patient;
	onOpenFile: () => void;
};

function RecentPatientItem({ patient, onOpenFile }: RecentPatientItemProps) {
	return (
		<View style={{ paddingVertical: 8 }}>
			<Text style={{ paddingBottom: 6 }} font="medium" size={"lg"}>
				Harrison Mariki
			</Text>
			<Text style={{ paddingBottom: 6 }}>Male, 25yrs</Text>
			<Text style={{ paddingBottom: 0 }}>+255765899654</Text>

			<Button mode="text" onPress={onOpenFile} compact>
				Open File
			</Button>
		</View>
	);
}

export default BasicEMRDashboardScreen;
