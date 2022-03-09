import React from "react";
import { Layout, Text } from "../../../@libs/elsa-ui/components";
import { View, Pressable, FlatList } from "react-native";

import { RevealContent } from "../../../@libs/elsa-ui/components/misc";
import { SearchIcon } from "../../../assets/vectors";

import { Button } from "../../../@libs/elsa-ui/components/input";
import { useTranslation } from "react-i18next";
import theme from "../../../theme";
import { useSymptomLocale } from "../../../app/symptoms";
import { SymptomItem } from "./components";

function SymptomList({
	onRemoveSymptom,
	onShowSymptom,
	symptoms,
}: {
	symptoms: Array<{ id: string; present: boolean }>;
	onShowSymptom: (id: string) => void;
	onRemoveSymptom: (id: string) => void;
}) {
	const { getSymptomById } = useSymptomLocale();

	const renderSymptom = React.useCallback(
		({
			item: { id, present },
		}: {
			item: { id: string; present: boolean };
		}) => {
			const { description, symptom } = getSymptomById(id);
			return (
				<SymptomItem
					description={description}
					name={symptom}
					onRemove={() => onRemoveSymptom(id)}
					onShowSymptom={() => onShowSymptom(id)}
					present={present}
				/>
			);
		},
		[getSymptomById]
	);

	return (
		<View style={{ flex: 1 }}>
			<View
				style={{
					display: "flex",
					marginVertical: 4,
					flexDirection: "column",
					flex: 1,
				}}
			>
				<FlatList data={symptoms} renderItem={renderSymptom} />
			</View>
		</View>
	);
}

export default function ManageSymptomsScreen({
	actions: $,
	entry: { symptoms },
}: WorkflowScreen<
	{
		symptoms: Array<{ id: string; present: boolean }>;
	},
	{
		onShowSymptom: (id: string) => void;
		onRemoveSymptom: (id: string) => void;
		onPressSearch: () => void;
		onPressSeeInsights: () => void;
	}
>) {
	const { t } = useTranslation("translation", {
		keyPrefix: "assessment.manage",
	});
	const { t: tc } = useTranslation("translation", { keyPrefix: "common" });

	return (
		<Layout title={t`title`} style={{ paddingHorizontal: 0 }}>
			<View style={{ flex: 1, zIndex: 1 }}>
				<View style={{ flex: 1, paddingHorizontal: 24 }}>
					{/* dummy search */}
					<Pressable
						onPress={$.onPressSearch}
						style={{
							width: "100%",
							borderColor: theme.color.primary.base,
							borderWidth: 1,
							borderRadius: 6,
							display: "flex",
							flexDirection: "row",
							paddingHorizontal: 12,
							paddingVertical: 14,
							marginBottom: 10,
						}}
					>
						{/* Icon */}
						<View style={{ alignSelf: "flex-start" }}>
							<SearchIcon
								width={20}
								height={20}
								style={{ color: theme.color.secondary.dark }}
							/>
						</View>

						{/* Dummy input */}
						<View style={{ flex: 1, marginLeft: 8 }}>
							<Text
								style={{ color: "#777" }}
							>{t`search_text`}</Text>
						</View>
					</Pressable>

					{/* body */}
					{/* If there is a list of items to show */}
					<RevealContent
						style={{ flex: 1 }}
						show={symptoms.length !== 0}
					>
						<Text>{tc`symptom.other`}</Text>
						<SymptomList
							symptoms={symptoms}
							onRemoveSymptom={$.onRemoveSymptom}
							onShowSymptom={$.onShowSymptom}
						/>
					</RevealContent>

					{/* If there is no items to show */}
					<RevealContent
						style={{ paddingHorizontal: 0 }}
						show={symptoms.length === 0}
					>
						<View>
							<Text
								font="bold"
								style={{ marginBottom: 3 }}
							>{t`no_symptoms.text`}</Text>
							<Text>{t`no_symptoms.description`}</Text>
						</View>
					</RevealContent>
				</View>

				<View style={{ paddingHorizontal: 24 }}>
					<Button
						outline
						onPress={$.onPressSeeInsights}
						type="secondary"
						title={t`see_insights`}
					/>
				</View>
			</View>
			{/* New Symptom */}
		</Layout>
	);
}
