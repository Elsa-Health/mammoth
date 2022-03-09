import React from "react";
import { useTranslation } from "react-i18next";
import { View, FlatList, Pressable } from "react-native";

import { Layout, Text } from "../../../@libs/elsa-ui/components";
import { SearchInput } from "../../../@libs/elsa-ui/components/input";
import { RevealContent } from "../../../@libs/elsa-ui/components/misc";
import { SearchProvider, useSearchData, useSearchInput } from "./search";

import _ from "lodash";
import theme from "../../../theme";
import { useSymptomLocale } from "../../../app/symptoms";
import { XIcon, CheckIcon } from "../../../assets/vectors";
import { SymptomId } from "../../../../@types";
import { Chip } from "react-native-paper";

function SearchBar({
	onShow,
	text: preFilledText = undefined,
}: {
	text?: string;
	onShow: (s: boolean | ((ps: boolean) => boolean)) => void;
}) {
	// might want to add a debounce
	const [text, onChangeText] = useSearchInput("en") as [
		string,
		(str: string | undefined) => void
	];
	const ref = React.createRef();

	React.useEffect(() => {
		onChangeText(preFilledText);
	}, [preFilledText]);

	React.useEffect(() => {
		onShow(!(text === undefined || text === ""));
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

function SearchResults(props: { onSelectSymptom: (id: SymptomId) => void }) {
	const { items } = useSearchData("en");

	const { t } = useTranslation("translation", {
		keyPrefix: "assessment.search",
	});

	const { getSymptomById } = useSymptomLocale();

	const renderItem = React.useCallback(
		({
			item: { id, present },
		}: {
			item: { id: string; present: boolean };
		}) => {
			const { description, symptom } = getSymptomById(id);
			return (
				<Pressable
					onPress={() => props.onSelectSymptom(id)}
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
							{symptom.replace("-", " ")}
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
					<Text style={{ fontSize: 14 }}>{description}</Text>
				</Pressable>
			);
		},
		[getSymptomById, props]
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
	const { suggestions } = useSearchData("en");
	const [, onChangeText] = useSearchInput("en") as [
		string,
		(str: string | undefined) => void
	];
	const { getSymptomById } = useSymptomLocale();

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
							content?.symptom.toLocaleLowerCase()
						);
						return (
							<Chip
								key={`${content?.symptom}-${ix}`}
								style={{ padding: 6, paddingHorizontal: 10 }}
								onPress={() => onChangeText(searchText)}
							>
								{searchText}
							</Chip>
						);
					})
			}
		</View>
	);
}

export default function BasicSearchSymptomsScreen({
	entry: { suggestions, text },
	actions: $,
}: WorkflowScreen<
	{ suggestions?: SymptomId[]; text?: string },
	{
		onSelectSearchResult: (symptom: SymptomId) => void;
	}
>) {
	const [show, setShow] = React.useState(false);

	const { t } = useTranslation("translation", {
		keyPrefix: "assessment.search",
	});

	// React.useEffect(() => {
	//     console.log({ psst, asst, assoc: getAssocSymptomRecords(psst, asst, 5)})
	// }, [])
	return (
		<SearchProvider suggestions={suggestions}>
			<Layout style={{ paddingHorizontal: 0 }} title={t`title`}>
				{/* Search item */}
				<View style={{ paddingHorizontal: 16 }}>
					<SearchBar onShow={setShow} text={text} />
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
					<SearchResults onSelectSymptom={$.onSelectSearchResult} />
				</RevealContent>
			</Layout>
		</SearchProvider>
	);
}
