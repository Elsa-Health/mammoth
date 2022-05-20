import { useNavigation, CommonActions } from "@react-navigation/native";
import React from "react";
import { useTranslation } from "react-i18next";
import { View, FlatList, Pressable } from "react-native";
import {
	SymptomData,
	SymptomDescription,
	SymptomId,
} from "../../../../../@types";
import { useSymptomAssessment } from "../../../../app/context/assessment";
import { symptoms, useSypmtomLocale } from "../../../../app/symptoms";
import { CheckIcon, XIcon } from "../../../../assets/vectors";
import { Layout, Text } from "../../../../@libs/elsa-ui/components";
import {
	SearchInput,
	TextInput,
} from "../../../../@libs/elsa-ui/components/input";
import { Chip, RevealContent } from "../../../../@libs/elsa-ui/components/misc";
import theme from "../../../../theme";
import { SearchProvider, useSearchData, useSearchInput } from "../utils/search";

function SearchBar({
	onShow,
	route,
}: {
	onShow: (s: boolean | ((ps: boolean) => boolean)) => void;
	route: any;
}) {
	// might want to add a debounce
	const [text, onChangeText] = useSearchInput() as [
		string,
		(str: string | undefined) => void
	];
	const ref = React.createRef();

	React.useEffect(() => {
		// console.log({ route })
		if (route !== undefined) {
			onChangeText(route.params?.searchInput);
		} else {
			onChangeText(undefined);
		}
		ref.current.focus();
	}, [route]);

	React.useEffect(() => {
		if (text === undefined || text === "") {
			onShow(false);
		} else {
			onShow(true);
		}
	}, [text]);
	const { t } = useTranslation("translation", {
		keyPrefix: "assessment.search",
	});

	return (
		<View style={{ marginVertical: 5 }}>
			<RevealContent
				show={text === undefined || text === ""}
				style={{ marginBottom: 5 }}
			>
				<Text
					style={{ color: theme.color.primary.dark, fontSize: 14 }}
				>{t`search_notice`}</Text>
			</RevealContent>
			<SearchInput
				ref={ref}
				onChangeText={onChangeText}
				onClearSearch={() => {
					onChangeText(undefined);
					ref.current.blur();
				}}
				value={text}
			/>
		</View>
	);
}

import * as dataFn from "../../../../@libs/data-fns";
import _ from "lodash";
import { useSymptomsInfo } from "../../../../app/utils";
import { getAssocSymptomRecords } from "../../../../app/associated_symptoms";
import shallow from "zustand/shallow";

export function InputHints() {
	const { items } = useSearchData();
	const navigation = useNavigation();
	const [ps, as] = useSymptomAssessment((s) => [
		s.presentingSymptoms,
		s.absentSymptoms,
	]);

	const { t } = useTranslation("translation", {
		keyPrefix: "assessment.search",
	});

	const { getSymptomById } = useSypmtomLocale();

	const goWithSymptom = React.useCallback(
		(
				symptom: SymptomDescription,
				entry: SymptomData = {},
				present?: boolean
			) =>
			() => {
				// console.log("Symptom information:", { symptom })
				// navigation.replace('symptom.view.main', { description: symptom, entry, present })
				navigation.dispatch(
					CommonActions.reset({
						index: 0,
						routes: [
							{
								name: "symptom.view.main",
								params: {
									description: symptom,
									entry,
									present,
								},
							},
						],
					})
				);
			},
		[navigation]
	);

	const renderItem = React.useCallback(
		({ item: s, ix }: { item: any; ix: number }) => {
			const content = getSymptomById(s.id as string) || {
				symptom: s.symptom,
				description: s.description,
			};
			const presentIndex = ps.findIndex((p) => p.id === s.id);
			const presentInPresent = presentIndex > -1;
			const presentInAbsent = as.findIndex((p) => p.id === s.id) > -1;
			const present: boolean | undefined = !presentInPresent
				? presentInAbsent
					? false
					: undefined
				: true;

			const entry = present ? ps[presentIndex].data : undefined;

			return (
				<Pressable
					key={s.symptom}
					onPress={goWithSymptom(
						{ id: s.id, ...dataFn.symptoms.symptom.fromId(s.id) },
						entry,
						present
					)}
					style={{ paddingHorizontal: 16, paddingVertical: 10 }}
					android_ripple={{
						radius: 10,
						color: theme.color.secondary.light,
					}}
				>
					<View style={{ display: "flex", flexDirection: "row" }}>
						<Text
							font="medium"
							style={{
								fontSize: 16,
								textTransform: "capitalize",
							}}
						>
							{content.symptom.replace("-", " ")}
						</Text>
						<RevealContent
							style={{
								display: "flex",
								flexDirection: "row",
								alignItems: "center",
								flex: 1,
							}}
							show={present !== undefined}
						>
							{present ? (
								<CheckIcon width={20} height={20} />
							) : (
								<XIcon width={20} height={20} />
							)}
							<Text
								style={{
									textTransform: "uppercase",
									marginLeft: 4,
									fontSize: 14,
									color: present ? "green" : "red",
								}}
							>
								{present ? "Present" : "Absent"}
							</Text>
						</RevealContent>
					</View>
					<Text style={{ fontSize: 14 }}>{s.description}</Text>
				</Pressable>
			);
		},
		[goWithSymptom, getSymptomById]
	);

	return (
		<React.Fragment>
			{/* Search items */}
			<View
				style={{
					elevation: 5,
					bottom: 0,
					height: "100%",
					width: "100%",
					backgroundColor: "white",
				}}
			>
				<Text
					style={{
						paddingHorizontal: 16,
						marginVertical: 16,
						color: "#555",
						fontSize: 14,
					}}
				>{t`select_item`}</Text>
				<FlatList
					data={items}
					// @ts-ignore
					renderItem={renderItem}
				/>
			</View>
		</React.Fragment>
	);
}

function SuggestionsView() {
	const { suggestions } = useSearchData();
	const [, onChangeText] = useSearchInput() as [
		string,
		(str: string | undefined) => void
	];
	const { getSymptomById } = useSypmtomLocale();

	return (
		<View
			style={{
				display: "flex",
				flexDirection: "row",
				marginVertical: 6,
				flexWrap: "wrap",
			}}
		>
			{
				/**
				 * The suggestions should be the items to input in the search bar.
				 *  as opposed to items to fill for
				 */
				suggestions
					.map((suggestion) => {
						return getSymptomById(suggestion);
					})
					.filter((s) => s !== undefined)
					.map((content, ix) => {
						const searchText = _.upperFirst(
							content?.symptom?.toLocaleLowerCase()
						);
						return (
							<Chip
								key={`${content?.symptom}-${ix}`}
								style={{ padding: 6, paddingHorizontal: 10 }}
								onPress={() => onChangeText(searchText)}
							>
								<Text>{searchText}</Text>
							</Chip>
						);
					})
			}
		</View>
	);
}

export default function SymptomSearchView({ route }) {
	const [show, setShow] = React.useState(false);
	const navigation = useNavigation();

	const { t } = useTranslation("translation", {
		keyPrefix: "assessment.search",
	});
	const [psst, asst] = useSymptomAssessment(
		(s) => [
			s.presentingSymptoms.map((s) => s.id),
			s.absentSymptoms.map((s) => s.id),
		],
		shallow
	);

	// React.useEffect(() => {
	//     console.log({ psst, asst, assoc: getAssocSymptomRecords(psst, asst, 5)})
	// }, [])
	return (
		<SearchProvider suggestions={getAssocSymptomRecords(psst, asst, 5)}>
			<Layout
				style={{ paddingHorizontal: 0 }}
				title={t`title`}
				navigation={navigation}
			>
				{/* Search item */}
				<View style={{ paddingHorizontal: 16 }}>
					<SearchBar onShow={setShow} route={route} />
				</View>

				{/* Suggestions */}
				<RevealContent
					style={{ paddingHorizontal: 16, marginVertical: 4 }}
					show={!show}
				>
					<Text
						font="medium"
						style={{ fontSize: 12, textTransform: "uppercase" }}
					>{t`elsa_suggestions`}</Text>
					<SuggestionsView />
				</RevealContent>

				{/* Input hints revealed while changing input text */}
				<RevealContent show={show}>
					<InputHints />
				</RevealContent>
			</Layout>
		</SearchProvider>
	);
}
