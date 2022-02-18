import React from "react";
import { fireEvent, render } from "@testing-library/react-native";
import {
	AssociativeSymptomSection,
	BottomSheetInteractionProvider,
	CustomBackdrop,
	// createStore,
	DonparItemOption,
	InteractiveSymptomState,
	ModalComponent,
	SymptomInteractionProvider,
	SymptomInteractionState,
	SymptomSection,
} from "./interactionSymptoms";
import { ApplicationProvider } from "./context/app";
import { LanguageProvider } from "./locale/config";
import createContext from "zustand/context";
import create from "zustand";
import { useSharedValue } from "react-native-reanimated";
import { SymptomAssessmentSequenceProvider } from "./context/assessment";

describe("DonparItemOption", () => {
	const cb = jest.fn();
	const inputs = ["multiple", "simple", "age-input"];
	it("Renders Correctly", () => {
		inputs.forEach((inp) =>
			render(
				<ApplicationProvider>
					<LanguageProvider>
						<DonparItemOption
							entry={[]}
							title="location"
							// @ts-expect-error
							type={inp}
							options={[{ id: "here", text: "test" }]}
							setData={cb}
						/>
					</LanguageProvider>
				</ApplicationProvider>
			)
		);
	});
});

describe("AssociativeSymptomSection", () => {
	const markAbsent = jest.fn();
	const markPresent = jest.fn();
	it("Renders without errors", () => {
		render(
			<AssociativeSymptomSection
				id="constipation"
				markAbsent={markAbsent}
				markPresent={markPresent}
			/>
		);
	});
});

describe("SymptomSection", () => {
	const setUpdate = jest.fn();
	const removeSymptom = jest.fn();

	const setUpdateCb =
		(ix: number) =>
		(fn: (pv: InteractiveSymptomState) => InteractiveSymptomState) => {
			// const newState = { ...prevSymptomState, ...(fn(prevSymptomState)) }
			// setSymptomsState(ix, fn);
			setUpdate();
		};

	// console.log(createStore);

	it("Renders without errors and methods are present", () => {
		const component = render(
			<ApplicationProvider>
				<SymptomSection
					index={0}
					removeSymptom={removeSymptom}
					state={"present"}
					symptom={{
						id: "constipation",
						location: [],
						duration: [],
						onset: ["sudden", "gradual"],
						nature: [],
						periodicity: [],
						aggravators: ["eating"],
						reducers: ["sleeping"],
					}}
					data={{
						location: [],
						duration: "2-weeks",
						onset: "sudden",
						nature: [],
						periodicity: [],
						aggravators: ["sleeping"],
						reducers: [],
					}}
					mini={false}
					stateUpdate={setUpdate}
					// @ts-expect-error
					setUpdate={setUpdateCb(0)}
				/>
			</ApplicationProvider>
		);

		const selectChip = component.getAllByTestId("DonparItemOptionChip");
		fireEvent(selectChip[0], "press");

		const removeBtn = component.getByTestId("SymptomSectionRemoveButton");
		fireEvent(removeBtn, "press");
	});
});

describe("CustomBackdrop", () => {
	it("Renders without erros", () => {
		function CustomBackdropTest() {
			const av = useSharedValue(1);
			return (
				<CustomBackdrop
					animatedIndex={av}
					animatedPosition={{
						value: 1,
					}}
				/>
			);
		}
		render(<CustomBackdropTest />);
	});
});

const symptoms: InteractiveSymptomState[] = [
	{
		data: {
			aggravators: [],
			duration: "",
			location: [""],
			nature: [],
			onset: "",
			periodicity: [],
			reducers: [],
		},
		state: "present",
		symptom: {
			id: "constipation",
			location: [],
			duration: [],
			onset: [],
			nature: [],
			periodicity: [],
			aggravators: [],
			reducers: [],
		},
	},
	{
		data: {
			aggravators: [],
			duration: "",
			location: [""],
			nature: [],
			onset: "",
			periodicity: [],
			reducers: [],
		},
		state: "absent",
		symptom: {
			id: "fever",
			location: [],
			duration: [],
			onset: [],
			nature: [],
			periodicity: [],
			aggravators: [],
			reducers: [],
		},
	},
];

describe("BottomSheetInteractionProvider", () => {
	it("Renders without errors", () => {
		render(
			<SymptomAssessmentSequenceProvider>
				<BottomSheetInteractionProvider symptoms={symptoms}>
					<></>
				</BottomSheetInteractionProvider>
			</SymptomAssessmentSequenceProvider>
		);
	});
});

describe("ModalComponent", () => {
	it("Renders without erros", () => {
		render(
			<SymptomAssessmentSequenceProvider>
				<SymptomInteractionProvider symptoms={symptoms}>
					<BottomSheetInteractionProvider symptoms={symptoms}>
						<ModalComponent />
					</BottomSheetInteractionProvider>
				</SymptomInteractionProvider>
			</SymptomAssessmentSequenceProvider>
		);
	});
});
