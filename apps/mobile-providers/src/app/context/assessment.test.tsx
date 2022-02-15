import React from "react";

import { render } from "@testing-library/react-native";
import { View } from "react-native";

import {} from "zustand";

import {
	bottleCapDiscretization,
	bottleCapVer2Discretization,
	builderStoreCreator,
	fetchFromElsaLambda,
	getConditionData,
	getDiscretized,
	normalValueDiscretization,
	SymptomAssessmentSequenceProvider,
	_convertPatientForElsa,
	_getPatientForElsa,
} from "./assessment";

describe("Context :: Assessment", () => {
	it("Provider Renders Correctly", () => {
		const { getByTestId } = render(
			<SymptomAssessmentSequenceProvider>
				<View testID="dummyView" />
			</SymptomAssessmentSequenceProvider>
		);

		expect(getByTestId("dummyView")).toBeDefined();
	});

	describe("Store", () => {
		const store = builderStoreCreator();
		const { setSymptom } = store.getState();

		it("Set Present Symptom / UNDEFINED", () => {
			const data = {};
			setSymptom({ id: "fever" }, undefined, data);
			expect([]).toEqual(
				expect.arrayContaining(store.getState().presentingSymptoms)
			);
		});

		it("Set Present Symptom", () => {
			const data = {};
			setSymptom({ id: "fever" }, true, data);
			expect([
				{
					id: "fever",
					data,
				},
			]).toEqual(
				expect.arrayContaining(store.getState().presentingSymptoms)
			);
		});

		it("Set Present Symptom / DONPAR", () => {
			const data = { aggravators: ["food"] };
			setSymptom({ id: "fever" }, true, data);
			expect([
				{
					id: "fever",
					data,
				},
			]).toEqual(
				expect.arrayContaining(store.getState().presentingSymptoms)
			);
		});

		it("Set Absent Symptom", () => {
			setSymptom({ id: "fever" }, false);
			expect([
				{
					id: "fever",
				},
			]).toEqual(expect.arrayContaining(store.getState().absentSymptoms));
		});

		// TODO: ADD RESET FUNCTION FOR THE STORE

		// Reset all stores after each test run
		// afterEach(() => {
		// 	act(() => storeResetFns.forEach((resetFn) => resetFn()))
		//   })
	});

	describe("Utilities", () => {
		const sampleDIfferentialsFromElsa = [
			{
				p: 0.5,
				condition: "malaria",
				id: "malaria",
				symptoms: ["jaudice", "fever", "chills"],
			},
			{
				p: 0.3,
				condition: "anaemia",
				id: "anaemia",
				symptoms: ["cough", "chills"],
			},
			{
				p: 0.2,
				condition: "gastritis",
				id: "gastritis",
				symptoms: ["vomiting", "diarrhea"],
			},
			{
				p: 0.1,
				condition: "pnemonia",
				id: "pnemonia",
				symptoms: ["dysnpeoa", "chest-tightness"],
			},
		];

		it("_getPatientForElsa", () => {
			const patient = {
				age: {
					days: 0,
					months: 5,
					years: 12,
				},
				allergies: [],
				chronicIllnesses: [],
				dueDate: undefined,
				pregnant: false,
				sex: "male",
				vitalSigns: {
					temp: 37,
					height: 165,
					weight: 90,
				},
			};
			expect(_getPatientForElsa(patient)).toEqual(
				_convertPatientForElsa(patient)
			);
			expect(_getPatientForElsa(undefined)).toEqual({
				age: 0,
				sex: null,
			});
		});

		it("getConditionData", () => {
			// Has something
			expect(
				getConditionData("malaria", sampleDIfferentialsFromElsa)
			).toEqual({
				absentSymptoms: [],
				presentingSymptoms: ["jaudice", "fever", "chills"],
				rank: 1,
			});
			// with absent symptoms
			expect(
				getConditionData("malaria", sampleDIfferentialsFromElsa, [
					"cough",
				])
			).toEqual({
				absentSymptoms: ["cough"],
				presentingSymptoms: ["jaudice", "fever", "chills"],
				rank: 1,
			});
			// Has something
			expect(
				getConditionData("xyz", sampleDIfferentialsFromElsa)
			).toBeNull();
		});

		it("normalValueDiscretization", () => {
			expect(
				getDiscretized(
					normalValueDiscretization,
					sampleDIfferentialsFromElsa,
					["cough"],
					3,
					10
				)
			).toEqual([
				{
					condition: "malaria",
					absentSymptoms: ["cough"],
					count: 5,
					presentingSymptoms: ["jaudice", "fever", "chills"],
				},
				{
					condition: "anaemia",
					absentSymptoms: [],
					count: 3,
					presentingSymptoms: ["cough", "chills"],
				},
				{
					condition: "gastritis",
					absentSymptoms: ["cough"],
					count: 2,
					presentingSymptoms: ["vomiting", "diarrhea"],
				},
			]);
		});
		it("bottleCapDiscretization", () => {
			expect(
				getDiscretized(
					bottleCapDiscretization,
					sampleDIfferentialsFromElsa,
					["cough"],
					3,
					10
				)
			).toEqual([
				{
					condition: "malaria",
					absentSymptoms: ["cough"],
					count: 5,
					presentingSymptoms: ["jaudice", "fever", "chills"],
				},
				{
					condition: "anaemia",
					absentSymptoms: [],
					count: 2,
					presentingSymptoms: ["cough", "chills"],
				},
				{
					condition: "gastritis",
					absentSymptoms: ["cough"],
					count: 1,
					presentingSymptoms: ["vomiting", "diarrhea"],
				},
			]);
		});
		it("bottleCapVer2Discretization", () => {
			expect(
				getDiscretized(
					bottleCapVer2Discretization,
					sampleDIfferentialsFromElsa,
					["cough"],
					3,
					10
				)
			).toEqual([
				{
					condition: "malaria",
					absentSymptoms: ["cough"],
					count: 5,
					presentingSymptoms: ["jaudice", "fever", "chills"],
				},
				{
					condition: "anaemia",
					absentSymptoms: [],
					count: 3,
					presentingSymptoms: ["cough", "chills"],
				},
				{
					condition: "gastritis",
					absentSymptoms: ["cough"],
					count: 2,
					presentingSymptoms: ["vomiting", "diarrhea"],
				},
			]);
		});
	});
});
