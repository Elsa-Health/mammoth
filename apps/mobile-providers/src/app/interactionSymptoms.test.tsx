import React from "react";
import { render } from "@testing-library/react-native";
import {
	AssociativeSymptomSection,
	CustomBackdrop,
	// createStore,
	DonparItemOption,
	SymptomInteractionProvider,
	SymptomInteractionState,
	SymptomSection,
} from "./interactionSymptoms";
import { ApplicationProvider } from "./context/app";
import { LanguageProvider } from "./locale/config";
import createContext from "zustand/context";
import create from "zustand";
import { useSharedValue } from "react-native-reanimated";

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

describe("AssociativeSymptomSection", () => {
	const setUpdate = jest.fn();
	const removeSymptom = jest.fn();

	// console.log(createStore);

	it("Renders without erros", () => {
		render(
			<ApplicationProvider>
				<SymptomSection
					index={0}
					removeSymptom={removeSymptom}
					state={"present"}
					symptom={{
						id: "constipation",
						location: [],
						duration: [],
						onset: [],
						nature: [],
						periodicity: [],
						aggravators: [],
						reducers: [],
					}}
					mini={false}
					// @ts-expect-error
					setUpdate={(i) => setUpdate()}
				/>
			</ApplicationProvider>
		);
	});
});

describe("CustomBackdrop", () => {
	it("Renders without erros", () => {
		const av = useSharedValue(1);
		render(
			<CustomBackdrop
				animatedIndex={av}
				animatedPosition={{
					value: 1,
				}}
			/>
		);
	});
});
