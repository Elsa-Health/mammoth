/**
 * Context to manage how the interatctions heppen within the application
 */
import {
	BottomSheetBackdropProps,
	BottomSheetFooter,
	BottomSheetModal,
	BottomSheetModalProvider,
	BottomSheetScrollView,
	BottomSheetSectionList,
	BottomSheetView,
} from "@gorhom/bottom-sheet";
import produce from "immer";
import * as React from "react";
import { Pressable, StyleSheet, View } from "react-native";
import Animated, {
	Extrapolate,
	interpolate,
	useAnimatedStyle,
} from "react-native-reanimated";

import create from "zustand";
import createContext from "zustand/context";
import { symptoms as symptomsBag, useSypmtomLocale } from "./symptoms";
import {
	CheckIcon,
	ChevronDownIcon,
	TrashIcon,
	XIcon,
} from "../assets/vectors";
import { Text } from "../components";
import { TextInput } from "../components/input";
import { RevealContent, SelectableChip } from "../components/misc";
import theme from "../theme";

import shallow from "zustand/shallow";
import { useSAStore } from "./context/assessment";
import { getAssocSymptomRecords } from "./associated_symptoms";
import { useTranslation } from "react-i18next";
import {
	SymptomData,
	SymptomDescription,
	SymptomId,
	SymptomRecord,
} from "../../@types";
import { useApplication } from "./context/app";

import { useDeviceBreak, useSymptomsInfo } from "./utils";

// NOTE: Temporary fix
import donparMap from "./libs/data-fns/data/translated/donpar-map.json";
import * as dataFn from "./libs/data-fns";

// state used to managed how the components are revealed to the user
interface InteractionState {
	visible: boolean;
	setVisible: (v: boolean) => void;
}

type InteractiveSymptomState = {
	symptom: SymptomDescription;

	data: Partial<SymptomData>;

	/**
	 * DEFAULT: 'unknown'
	 */
	state: "present" | "absent" | "unknown";
};
/**
 * Managing state that is useful to manage interactions
 * involving dealing with the current interacted symptom
 */
interface SymptomInteractionState extends InteractionState {
	showState: undefined | "full" | "half";

	// For the interaction view, collect all states that are associated
	symptoms: Array<InteractiveSymptomState>;

	// all whose state are unknown
	associatedSymptoms: Array<SymptomId>;
	/**
	 * Resets the entire flow of the app
	 */
	reset: () => void;

	/**
	 * Adds the symptom to the list:
	 * // temp session:
	 *
	 * TODO: add checker function that prevents symptoms that were added already to be added again
	 */
	addSymptomFromIndex: (
		refNumber: number,
		data?: SymptomData,
		present?: boolean
	) => void;
	addSymptomFromId: (
		id: SymptomId,
		data?: SymptomData,
		present?: boolean
	) => void;
	addSymptomFromDescription: (
		symptomDesc: SymptomDescription,
		data?: SymptomData,
		present?: boolean
	) => void;

	/**
	 * Update the symptoms states to the appropriate one
	 */
	unsafe_updateSymptomState: (
		symIdx: number,
		newPartialState: Partial<InteractiveSymptomState>
	) => void;
	unsafe_setSymptomsState: (
		symIdx: number,
		newState: InteractiveSymptomState
	) => void;
	proper_updateSymptomState: (
		symIdx: number,
		updater: (oldState: InteractiveSymptomState) => InteractiveSymptomState
	) => void;

	/**
	 * Set the associated symptoms
	 */
	unsafe_setAssociatedSymptoms: (associatedSymptoms: any[]) => void;

	setShowState: (state: undefined | "full" | "half") => void;
}

// const one = symptomsBag[0]
const { Provider, useStore: useSymptomStore } =
	createContext<SymptomInteractionState>();
const createStore = () =>
	create<SymptomInteractionState>((set, get) => ({
		visible: false,
		showState: undefined,
		symptoms: [],

		associatedSymptoms: [],

		setVisible: (visible) => set({ visible }),
		reset: () => set({ symptoms: [], visible: false }),

		addSymptomFromIndex: (refNumber, data = {}, present) => {
			get().addSymptomFromDescription(
				symptomsBag[refNumber],
				data,
				present
			);
		},
		addSymptomFromId: (id, data = {}, present) => {
			get().addSymptomFromDescription(
				{ id, ...dataFn.symptoms.symptom.fromId(id) },
				data,
				present
			);
			// get().addSymptomFromDescription(symptomJson[id], data, present)
		},
		addSymptomFromDescription: (desc, data = {}, present) => {
			set((s) =>
				produce(s, (df) => {
					df.symptoms.push({
						data,
						symptom: desc,
						state:
							present !== undefined
								? present
									? "present"
									: "absent"
								: "unknown",
					});
					return df;
				})
			);
		},
		unsafe_setAssociatedSymptoms: (associatedSymptoms) =>
			set({ associatedSymptoms }),
		unsafe_setSymptomsState: (symIdx, newState) => {
			set((s) => ({
				symptoms: produce(s.symptoms, (df) => {
					df[symIdx] = newState;
					return df;
				}),
			}));
		},
		unsafe_updateSymptomState: (symIdx, newState) => {
			get().unsafe_setSymptomsState(symIdx, {
				...get().symptoms[symIdx],
				symptom: {
					...get().symptoms[symIdx].symptom,
					...newState.symptom,
				},
				data: {
					...get().symptoms[symIdx].data,
					...newState.data,
				},
				...newState,
			});
		},
		setShowState: (show) => set({ showState: show }),

		proper_updateSymptomState: (
			symIdx: number,
			updater: (
				oldState: InteractiveSymptomState
			) => InteractiveSymptomState
		) => {
			set((s) => ({
				symptoms: produce(s.symptoms, (df) => {
					df[symIdx] = updater(s.symptoms[symIdx]);
					return df;
				}),
			}));
		},
	}));

interface SymptomInteractionProviderProps {
	children: React.ReactNode;
}
export function SymptomInteractionProvider(
	props: SymptomInteractionProviderProps
) {
	return <Provider createStore={createStore}>{props.children}</Provider>;
}

const CustomBackdrop = ({ animatedIndex, style }: BottomSheetBackdropProps) => {
	// animated variables
	const containerAnimatedStyle = useAnimatedStyle(() => ({
		opacity: interpolate(
			animatedIndex.value,
			[-1, 2],
			[0, 0.8],
			Extrapolate.CLAMP
		),
	}));

	// styles
	const containerStyle = React.useMemo(
		() => [
			style,
			{
				backgroundColor: "#777",
				//   backgroundColor: theme.color.secondary.dark,
			},
			containerAnimatedStyle,
		],
		[style, containerAnimatedStyle]
	);

	return <Animated.View style={containerStyle} />;
};

interface SymptomModalContainerProps {
	children: React.ReactNode;
}
export function SymptomModalContainer(props: SymptomModalContainerProps) {
	return (
		<BottomSheetModalProvider>
			{props.children}
			<ModalComponent />
		</BottomSheetModalProvider>
	);
}

function BottomSheetInteractionProvider(
	props: SymptomInteractionProviderProps
) {
	return (
		<SymptomInteractionProvider>
			<SymptomModalContainer>{props.children}</SymptomModalContainer>
		</SymptomInteractionProvider>
	);
}

const ModalComponent = (props: {}) => {
	const symptoms = useSymptomStore((s) => s.symptoms, shallow);
	const mainSypmtoms = useSymptomsInfo();

	const [visible, showState] = useSymptomStore(
		(s) => [s.visible, s.showState],
		shallow
	);
	const [setVisible, setShowState] = useSymptomStore((s) => [
		s.setVisible,
		s.setShowState,
	]);

	// associated symptoms presented here
	const associatedSymptoms = useSymptomStore(
		(s) => s.associatedSymptoms,
		shallow
	);
	const setSymptomToMainList = useSAStore((s) => s.setSymptom);

	const [
		reset,
		setSymptomsState,
		updateSymptomsState,
		setAssociatedSymptoms,
		addSymptom,
	] = useSymptomStore((s) => [
		s.reset,
		s.proper_updateSymptomState,
		s.unsafe_updateSymptomState,
		s.unsafe_setAssociatedSymptoms,
		s.addSymptomFromId,
	]);

	// ref
	const bottomSheetModalRef = React.createRef<BottomSheetModal>();

	// variables
	const snapPoints = React.useMemo(
		() => [
			"30%", // This is for the parital view
			"90%", // this is for the full view of the symptom (with associated symptoms)
		],
		[]
	);

	// NOTE: if management of user interaction is different, this should be changed
	const handleSheetChanges = React.useCallback(
		(index: number) => {
			if (index === -1) {
				reset();
				return;
			}
		},
		[updateSymptomsState]
	);

	const setMainSymptomUpdate = React.useCallback(
		(ix: number) =>
			(fn: (pv: InteractiveSymptomState) => InteractiveSymptomState) => {
				// const newState = { ...prevSymptomState, ...(fn(prevSymptomState)) }
				setSymptomsState(ix, fn);
			},
		[setSymptomsState]
	);

	/**
	 * RELATED TO CONTROLLING VISIBLITY OF THE BOTTOM SHEET
	 */
	React.useEffect(() => {
		if (visible) {
			// show sheet
			bottomSheetModalRef.current?.present();
		} else {
			// hide sheet
			bottomSheetModalRef.current?.forceClose();
		}
	}, [visible]);

	React.useEffect(() => {
		if (showState === undefined) {
			setVisible(false);
		} else {
			setVisible(true);
			if (showState === "full") {
				bottomSheetModalRef.current?.snapToIndex(1);
			} else {
				bottomSheetModalRef.current?.snapToIndex(0);
			}
		}
	}, [showState, setVisible]);

	/*** UDPATE RELATED TO SYMPTOM UPDATE AND MODIFICATION */
	React.useEffect(() => {
		const first = symptoms.length === 0 ? undefined : symptoms[0];
		// console.log({first})

		if (first !== undefined) {
			switch (first.state) {
				case "present":
					setShowState("full");
					break;
				case "absent":
					setShowState(undefined);
					break;
				default:
					setShowState("half");
			}

			// When there is a change in the symptom assessment, update the symptom assessment region
			if (first.state === "present") {
				setAssociatedSymptoms(
					getAssocSymptomRecords(
						symptoms
							.filter((s) => s.state === "present")
							.map((s) => s.symptom.id),
						symptoms
							.filter((s) => s.state === "absent")
							.map((s) => s.symptom.id)
					).filter((s) => {
						return !symptoms.map((t) => t.symptom.id).includes(s);
					})
				);
			} else {
				setAssociatedSymptoms([]);
			}
		} else {
			// hide it
			setShowState(undefined);
		}
		symptoms.forEach(({ symptom: so, data, state }) => {
			const present =
				state !== "present"
					? state === "absent"
						? false
						: undefined
					: true;

			// this automatically adds and removes items from lists
			setSymptomToMainList({ id: so.id }, present, data);
		});
	}, [symptoms, setAssociatedSymptoms, setShowState]);

	const { t: tc } = useTranslation("translation", { keyPrefix: "common" });

	/**
	 * Marking true from associative symptoms
	 */
	const markPresentFromAssoc = React.useCallback(
		(record: SymptomRecord) => () => {
			addSymptom(record.id, undefined, true);
		},
		[addSymptom]
	);

	/**
	 * Marking absent from associative symptoms
	 */
	const markAbsentFromAssoc = React.useCallback(
		(record: SymptomRecord) => () => {
			addSymptom(record.id, undefined, false);
		},
		[addSymptom]
	);

	/** RENDER COMPONENTS **/
	const removeSymptomFromId = useSAStore((s) => s.removeSymptomFromId);
	const renderSymptoms = React.useCallback(
		(symptom: InteractiveSymptomState, ix) => (
			<SymptomSection
				{...symptom}
				index={ix}
				removeSymptom={() => {
					removeSymptomFromId(symptom.symptom.id);

					// something
				}}
				key={`${symptom.symptom.id}-${ix}`}
				stateUpdate={setMainSymptomUpdate(ix)}
			/>
		),
		[setMainSymptomUpdate, removeSymptomFromId]
	);

	const renderAssociatedSymptoms = React.useCallback(
		(id: SymptomId, ix) => (
			<AssociativeSymptomSection
				id={id}
				key={`${id}-${ix}`}
				markPresent={markPresentFromAssoc({ id })}
				markAbsent={markAbsentFromAssoc({ id })}
			/>
		),
		[markPresentFromAssoc, markAbsentFromAssoc]
	);

	return (
		<BottomSheetModal
			ref={bottomSheetModalRef}
			enablePanDownToClose={false}
			// enableContentPanningGesture={false}
			// enableHandlePanningGesture={false}
			index={0}
			backdropComponent={CustomBackdrop}
			style={styles.container}
			snapPoints={snapPoints}
			// handleComponent={null}
			// handleIndicatorStyle={null}
			onChange={handleSheetChanges}
			// footerComponent={RenderFooter}
		>
			{/* Header */}
			<View
				style={{
					display: "flex",
					flexDirection: "row",
					alignItems: "center",
					justifyContent: "flex-end",
					marginHorizontal: 16,
					marginTop: 16,
				}}
			>
				<Pressable
					onPress={() => {
						bottomSheetModalRef.current?.forceClose();
					}}
					hitSlop={6}
					android_ripple={{
						borderless: true,
						color: theme.color.primary.base,
						radius: 20,
					}}
					style={{
						borderRadius: 50,
						padding: 6,
						borderWidth: 2,
						borderColor: theme.color.primary.dark,
						display: "flex",
						flexDirection: "row",
						alignItems: "center",
						justifyContent: "space-around",
						paddingHorizontal: 12,
					}}
				>
					{/* <ChevronDownIcon /> */}
					<Text
						font="bold"
						style={{ fontSize: 16, textTransform: "uppercase" }}
					>{tc`close`}</Text>
				</Pressable>
			</View>
			<BottomSheetScrollView style={styles.container}>
				{symptoms.map(renderSymptoms)}
				<RevealContent show={associatedSymptoms.length > 0}>
					<View
						style={{
							borderBottomColor: "#CCC",
							borderBottomWidth: 1,
							marginVertical: 10,
						}}
					>
						{/* Separator */}
					</View>
					{associatedSymptoms
						.filter(
							(s) => !mainSypmtoms.map((d) => d.id).includes(s)
						)
						.map(renderAssociatedSymptoms)}
				</RevealContent>
			</BottomSheetScrollView>
		</BottomSheetModal>
	);
};

// options with multiple optinos
const SINGLE_INPUT_OPTIONS: Array<keyof SymptomData> = [
	"onset",
	"nature",
	"periodicity",
];
const AGE_INPUT_OPTIONS: Array<keyof SymptomData> = ["duration"];

const buildTranslation =
	(lang: "en" | "sw", _default = "en") =>
	(donparType: string, itemKey: string) => {
		return (
			donparMap[lang]?.[donparType]?.[itemKey] ||
			donparMap[_default]?.[donparType]?.[itemKey] ||
			undefined
		);
	};

function SymptomSection({
	stateUpdate,
	symptom,
	mini = false,
	index,
	removeSymptom,
}: {
	mini?: boolean;
	index: number;
	removeSymptom: () => void;
	stateUpdate: (
		fn: (pv: InteractiveSymptomState) => InteractiveSymptomState
	) => void;
} & Omit<InteractiveSymptomState, "data">) {
	const lang = useApplication((s) => s.settings.lang, shallow);
	// data about information
	const [data, state] = useSymptomStore(
		(s) => [s.symptoms[index].data, s.symptoms[index].state],
		shallow
	);
	const [ready, setReady] = React.useState(false);

	// const { t } = useTranslation('donpar-map')
	const { getSymptomById } = useSypmtomLocale();
	const content = React.useMemo(
		() => getSymptomById(symptom.id),
		[getSymptomById, symptom]
	);

	/** information to render on the screen as options */
	const donparItems = React.useMemo(() => {
		// const {tags, symptom: symptomName, description, ...others } = symptom
		const { id, ...others } = symptom;
		const tv = buildTranslation(lang || "en");
		return Object.entries(others)
			.map((val) => {
				const [field, options] = val as [string, string[]];
				try {
					return {
						field,
						options: options.map((c) => ({
							id: c,
							text: tv(field, c),
						})),
					};
				} catch (err) {
					console.log({ field, options, symptom });
					throw err;
				}
			})
			.filter((x) => x.options.length > 0)
			.map((c) => {
				return {
					title: c.field,
					options: c.options,
					type: AGE_INPUT_OPTIONS.includes(c.field)
						? "age-input"
						: SINGLE_INPUT_OPTIONS.includes(c.field)
						? "single"
						: "multiple",
					entry: data[c.field] || undefined,
				};
			});
	}, [symptom, data, lang]);

	const itemStateUpdate = React.useCallback(
		(title: keyof SymptomData, type: "mutliple" | "age-input" | "single") =>
			(
				fn: (
					pv: string | string[] | undefined
				) => string | string[] | undefined
			) =>
				stateUpdate((s) => {
					// setReady(false)
					const newState = produce(s, (df) => {
						df.data[title] = fn(
							type === "mutliple"
								? df?.data?.[title] || []
								: df?.data?.[title] || undefined
						);
						return df;
					});

					// setReady(true)
					return newState;
				}),
		[stateUpdate, content, setReady]
	);

	// const mainSymptomsIds = useSAStore(s => [...s.presentingSymptoms.map(c => c.symptom), ...s.absentSymptoms.map(c => c.symptom)], shallow)

	const { t: tc } = useTranslation("translation", { keyPrefix: "common" });

	return (
		<Animated.View style={{ paddingVertical: 10 }}>
			{/* title and text */}
			<View
				style={{
					display: "flex",
					marginHorizontal: 24,
					flexDirection: "row",
					alignItems: "center",
					justifyContent: "flex-start",
				}}
			>
				{state === "absent" && <XIcon />}
				{state === "present" && ready && <CheckIcon />}
				<Text
					font="bold"
					style={[
						{ fontSize: 20, textTransform: "capitalize" },
						state === "present" && ready && { marginLeft: 10 },
					]}
				>
					{content.symptom}
				</Text>
			</View>

			<RevealContent show={state === "present" || !mini}>
				<Text
					font="medium"
					style={{
						marginHorizontal: 24,
						fontSize: state === "absent" ? 14 : 16,
					}}
				>
					{content.description}{" "}
				</Text>
			</RevealContent>

			<RevealContent
				style={{ marginVertical: 10 }}
				show={state === "present" && !ready}
			>
				<View style={{ paddingHorizontal: 24 }}>
					{donparItems.map((item) => (
						<DonparItemOption
							{...item}
							key={item.title}
							setData={itemStateUpdate(
								item.title,
								item.type === "multiple"
							)}
						/>
					))}
				</View>
			</RevealContent>

			{/* Buttons only revealed when NOT absent */}
			<View
				style={{
					padding: 24,
					display: "flex",
					justifyContent: "space-between",
					flexDirection: "row",
					marginHorizontal: 1,
					flexWrap: "nowrap",
				}}
			>
				<RevealContent
					style={{ alignSelf: "flex-start" }}
					show={state === "present" || state === "absent"}
				>
					<Pressable
						style={{
							display: "flex",
							justifyContent: "space-around",
							flexDirection: "row",
							padding: 8,
							borderRadius: 3,
							backgroundColor: "#777",
							marginRight: 5,
							flexWrap: "nowrap",
							alignItems: "center",
						}}
						onPress={() => {
							removeSymptom();
							stateUpdate((s) =>
								produce(s, (df) => {
									df["state"] = "unknown";
									return df;
								})
							);
						}}
					>
						<TrashIcon style={{ color: "#FFF" }} />
						<Text
							font="medium"
							style={{ color: "#FFF", marginLeft: 8 }}
						>{tc`delete`}</Text>
					</Pressable>
				</RevealContent>
				<View
					style={{
						display: "flex",
						flex: 1,
						justifyContent: "flex-end",
						flexDirection: "row",
						marginHorizontal: 1,
						flexWrap: "nowrap",
						alignItems: "center",
					}}
				>
					{ready && state === "present" ? (
						<Pressable
							style={{
								paddingHorizontal: 10,
								display: "flex",
								justifyContent: "space-around",
								flexDirection: "row",
								borderRadius: 3,
								padding: 8,
								elevation: 1,
								backgroundColor: theme.color.secondary.light,
								marginHorizontal: 1,
								flexWrap: "nowrap",
								alignItems: "center",
							}}
							onPress={() => {
								if (state === "present") {
									setReady(false);
								}
							}}
						>
							<Text
								font="medium"
								style={{
									color: "#000",
									textTransform: "capitalize",
								}}
							>{tc`change`}</Text>
						</Pressable>
					) : (
						<>
							<RevealContent show={state !== "absent"}>
								<Pressable
									style={{
										display: "flex",
										justifyContent: "space-around",
										flexDirection: "row",
										padding: 8,
										borderRadius: 3,
										backgroundColor: "#ff3737",
										marginRight: 5,
										flexWrap: "nowrap",
										alignItems: "center",
									}}
									onPress={() => {
										// console.log("Make absent!");
										stateUpdate((s) =>
											produce(s, (df) => {
												df["state"] = "absent";
												return df;
											})
										);
									}}
								>
									<XIcon style={{ color: "#FFF" }} />
									<Text
										font="medium"
										style={{ color: "#FFF", marginLeft: 8 }}
									>{tc`actions.absent`}</Text>
								</Pressable>
							</RevealContent>
							<Pressable
								style={{
									paddingHorizontal: 10,
									display: "flex",
									justifyContent: "space-around",
									flexDirection: "row",
									borderRadius: 3,
									padding: 8,
									backgroundColor: theme.color.primary.base,
									marginHorizontal: 1,
									flexWrap: "nowrap",
									alignItems: "center",
								}}
								onPress={() => {
									// console.log("Make present!");
									stateUpdate((s) =>
										produce(s, (df) => {
											df["state"] = "present";
											return df;
										})
									);

									if (state === "present") {
										setReady(true);
									}
								}}
							>
								<CheckIcon style={{ color: "#FFF" }} />
								<Text
									font="medium"
									style={{ color: "#FFF", marginLeft: 8 }}
								>
									{state === "present"
										? tc`actions.save`
										: tc`actions.present`}
								</Text>
							</Pressable>
						</>
					)}
				</View>
			</View>
		</Animated.View>
	);
}

function AssociativeSymptomSection({
	id,
	markAbsent,
	markPresent,
}: {
	id: string;
	markAbsent: () => void;
	markPresent: () => void;
}) {
	const { getSymptomById } = useSypmtomLocale();
	const content = React.useMemo(
		() => getSymptomById(id),
		[getSymptomById, id]
	);

	return (
		<View
			style={{
				display: "flex",
				flexDirection: "row",
				justifyContent: "space-between",
				alignItems: "center",
				flexWrap: "nowrap",
				padding: 24,
			}}
		>
			<View style={{ flex: 1 }}>
				<Text
					font="bold"
					style={{
						fontSize: 20,
						textTransform: "capitalize",
						flexWrap: "wrap",
					}}
				>
					{content.symptom}
				</Text>
				<Text style={{ flexWrap: "wrap", fontSize: 14 }}>
					{content.description}
				</Text>
			</View>

			{/* buttons */}
			<View
				style={{
					flex: 0.5,
					display: "flex",
					justifyContent: "flex-end",
					flexDirection: "row",
					marginHorizontal: 1,
					flexWrap: "nowrap",
				}}
			>
				<View
					style={{
						display: "flex",
						justifyContent: "flex-end",
						flexDirection: "row",
						marginHorizontal: 1,
						flexWrap: "nowrap",
						alignItems: "center",
					}}
				>
					<Pressable
						style={{
							display: "flex",
							justifyContent: "space-around",
							flexDirection: "row",
							padding: 10,
							borderRadius: 5,
							backgroundColor: "#ff3737",
							elevation: 1,
						}}
						onPress={markAbsent}
					>
						<XIcon style={{ color: "#FFF" }} />
					</Pressable>
					<Pressable
						style={{
							display: "flex",
							justifyContent: "space-around",
							flexDirection: "row",
							borderRadius: 5,
							padding: 10,
							elevation: 1,
							backgroundColor: theme.color.primary.base,
							marginHorizontal: 1,
							flexWrap: "nowrap",
							alignItems: "center",
						}}
						onPress={markPresent}
					>
						<CheckIcon style={{ color: "#FFF" }} />
					</Pressable>
				</View>
			</View>
		</View>
	);
}

function DonparItemOption({
	title,
	options,
	entry,
	setData,
	type,
}: {
	title: keyof SymptomData;
	options?: { id: string; text: string }[]; // only if number-input
	entry: string | string[] | undefined | number;
	setData: (
		fn: (pv: string | string[] | undefined) => string | string[] | undefined
	) => void;
	type: "multiple" | "single" | "age-input";
}) {
	const { t: ta } = useTranslation("translation", {
		keyPrefix: "common.age",
	});
	const { t } = useTranslation("translation", { keyPrefix: "assessment" });
	const { isTablet } = useDeviceBreak();

	return (
		<View style={{ marginBottom: 4 }}>
			<View>
				<Text
					font="medium"
					style={{ textTransform: "capitalize", fontSize: 16 }}
				>
					{t(`ldonpar.${title.toLowerCase()}`)}
				</Text>
			</View>
			{type === "age-input" ? (
				<View
					style={{
						display: "flex",
						flexDirection: "row",
						alignItems: "baseline",
						justifyContent: "flex-start",
					}}
				>
					<TextInput
						value={entry as string}
						placeholder="0"
						onChangeText={(value) => setData((_) => value)}
						keyboardType="numeric"
						containerStyle={{ flex: 0.5, marginRight: 10 }}
						style={{
							borderWidth: 0,
							borderBottomWidth: 1,
							fontSize: 18,
							alignSelf: "baseline",
							width: "100%",
						}}
					/>
					<Text font="medium">{ta`days`}</Text>
				</View>
			) : (
				<>
					<View
						style={{
							flex: 1,
							display: "flex",
							flexWrap: "wrap",
							flexDirection: "row",
							alignItems: "center",
							marginTop: 5,
						}}
					>
						{(options || []).map((item) => {
							const multiple = type === "multiple";
							const selected =
								entry !== undefined
									? multiple
										? (entry as string[]).includes(item.id)
										: entry === item.id
									: false;

							return (
								<SelectableChip
									selected={selected}
									key={item.id}
									style={{
										width: isTablet ? "48%" : "30%",
										marginBottom: 1,
									}}
									text={item.text.replace(/(-)+/g, " ")}
									textStyle={{
										textTransform: "capitalize",
										flexWrap: "nowrap",
										paddingHorizontal: 0,
										marginHorizontal: 0,
									}}
									onPress={() => {
										if (!selected) {
											setData((p) =>
												multiple
													? [...(p || []), item.id]
													: item.id
											);
										} else {
											if (!multiple) {
												setData((_) => undefined);
											} else {
												setData((p) => {
													const d = [
														...(p as string[]),
													];
													const ix = d.findIndex(
														(s) => s === item.id
													);
													d.splice(ix, 1);
													return d;
												});
											}
										}
									}}
								/>
							);
						})}
					</View>
				</>
			)}
		</View>
	);
}

export { BottomSheetInteractionProvider, useSymptomStore };

const styles = StyleSheet.create({
	container: {
		flex: 1,
		shadowColor: "#000",
		shadowOffset: {
			width: 0,
			height: 9,
		},
		shadowOpacity: 0.48,
		shadowRadius: 11.95,

		elevation: 18,
	},
	contentContainer: {
		backgroundColor: "white",
	},
	sectionHeaderContainer: {
		backgroundColor: "white",
		padding: 6,
	},
	itemContainer: {
		padding: 6,
		margin: 6,
		backgroundColor: "#eee",
	},
});
