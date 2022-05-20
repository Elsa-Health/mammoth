import produce from "immer";
import _ from "lodash";
import React from "react";
import create from "zustand";
import createContext from "zustand/context";

type ProperSetter<T> = (v: T | ((v: T) => T)) => void;
type LabInvestigation = { id: string } & PatientInvestigation;

/**
 * THINK: Consider switching to valtio; easier to set even subscriptions that bind with the store for ease save of data
 */

type LabStoreState = {
	// All the visits visible in the app
	visits: PatientVisit[];

	// All the patients visible in the app
	patients: Patient[];

	// All the investigations visible in the app
	investigations: Array<LabInvestigation>;

	addPatient: (patient: Patient) => void;

	// setVisits: ProperSetter<PatientVisit[]>;
	setPatients: ProperSetter<Patient[]>;
	setInvestigations: ProperSetter<LabInvestigation[]>;
};

const { Provider, useStore: useLabContext } = createContext<LabStoreState>();
const createStore = () =>
	create<LabStoreState>((set, get) => ({
		visits: [],
		patients: [],
		investigations: [],
		addPatient: (patient) => {
			set((s) => ({
				patients: produce(s["patients"], (df) => {
					df.push(patient);
				}),
			}));
		},
		setPatients: (v) => {
			if (typeof v === "function") {
				set((s) => ({ patients: v(s.patients) }));
			} else {
				set({ patients: v });
			}
		},
		setInvestigations: (v) => {
			if (typeof v === "function") {
				set((s) => ({ investigations: v(s.investigations) }));
			} else {
				set({ investigations: v });
			}
		},
	}));
function LabContextProvider({ children }: { children: React.ReactNode }) {
	return <Provider createStore={createStore}>{children}</Provider>;
}

export { useLabContext, LabContextProvider };
