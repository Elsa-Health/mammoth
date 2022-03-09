import produce from "immer";
import _ from "lodash";
import React from "react";
import create from "zustand";
import createContext from "zustand/context";

type LabStoreState = {
	assessment: BasicAssessment | undefined;
	updatePatientIntake: (patientIntake: PatientIntake) => void;
};

export const getPatientIntake = (
	assessment: BasicAssessment
): PatientIntake => {
	return _.pick(assessment, [
		"age",
		"sex",
		"vitalSigns",
		"pregnant",
		"dueDate",
	]) as PatientIntake;
};
const { Provider, useStore: useLabContext } = createContext<LabStoreState>();
const createStore = () =>
	create<LabStoreState>((set, get) => ({
		assessment: undefined,

		updatePatientIntake: (p) => {
			const pi = _.pick(p, [
				"age",
				"sex",
				"vitalSigns",
				"pregnant",
				"dueDate",
			]);
			set((s) =>
				produce(s, (df) => {
					df["assessment"] = {
						...df["assessment"],
						...pi,
					} as BasicAssessment;
				})
			);
		},
	}));
function LabContextProvider({ children }: { children: React.ReactNode }) {
	return <Provider createStore={createStore}>{children}</Provider>;
}

export { useLabContext, LabContextProvider };
