/**
 * Context for the entire application
 */
import React from "react";

import create from "zustand";
import createContext from "zustand/context";
import { persist } from "zustand/middleware";

import produce from "immer";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {
	Age,
	Assessment,
	AssessmentRecord,
	ConditionId,
	Differential,
	SymptomRecord,
	_CompleteSymptomData,
} from "../../../@types";

import firestore from "@react-native-firebase/firestore";
import _ from "lodash";
import { useApplication } from "./app";
import { LabTest, Medication } from "../../@libs/data-fns";
import { PatientDescription } from "../../pages/core/PatientDescriptor/context";
import { PatientIntakeData } from "../../pages/core/PatientDescriptor/PatientIntake";
import { MedicationHistory } from "../../pages/core/PatientDescriptor/MedicalHistory";
import { DietaryHistory } from "../../pages/core/PatientDescriptor/DietaryHistory";

import { convertAgeToMonths, getAgeGroup } from "../helper";

const aStatsColl = firestore().collection("pediatrics-statistics");

export type Recommendations = {
	ref_nearest: boolean;
	refered_lab_testing: {
		selected: boolean;
		tests: Array<LabTest>;
	};
	dispensed_medication: {
		selected: boolean;
		medications: Array<Medication.Addo | Medication.GS>;
	};
	recommendations: string;
};

export type PatientAssessmentRecord = {
	patient: PatientIntakeData;
	history: {
		medical: undefined | MedicationHistory;
		dietary: undefined | DietaryHistory;
	};
	assessmentInfo: Assessment & {
		userConditions: Array<ConditionId>;
		elsaConditions: Array<Differential>;
	};
};
export type SavedPatientAssessmentRecord = PatientAssessmentRecord & {
	id: string | number;
	// UTC string time
	dateTime: string;
};

// type StateAssessmentRecord = {
// 	record: AssessmentRecord;
// 	recommendations: Partial<Recommendations>;
// };
interface MainState {
	/**
	 * Here we can add other information like:
	 *  - The UI flow chose,
	 *  - Times taken to complete an assessment
	 */
	patientRecords: Array<SavedPatientAssessmentRecord>;

	/**
	 * Functions to upload the file
	 */
	addPatientRecord: (ar: PatientAssessmentRecord) => void;
}

// const uploadAsessment = (assessment: StateAssessmentRecord, userId: string) => {
// 	const {
// 		record: { assessmentInfo, id },
// 		recommendations,
// 	} = assessment;
// 	// console.log("syncing data...", id)

// 	// console.log(`${userId}/assessement/${id.toLocaleString()}`)

// 	// console.log("Diag:",assessmentInfo.presentingSymptoms )
// 	// upload the assessment record
// 	aStatsColl
// 		.doc(userId)
// 		.set({
// 			isTest: [
// 				"kevin-james",
// 				"c5d2e724-2e27-11eb-adc1-0242ac120002",
// 				"ba1d95ac-5977-11eb-ae93-0242ac130002",
// 			].includes(userId),
// 			dataClass: "addo-stats",
// 		})
// 		.then((t) => {
// 			aStatsColl
// 				.doc(userId)
// 				.collection("assessments")
// 				.doc(id.toString())
// 				.set(getAssessmentInfo(assessment))
// 				.then(() => {
// 					// console.log('sync completed:', id)
// 				})
// 				.catch((err) => {
// 					console.log(err);
// 				});
// 		});
// };

const { Provider, useStore } = createContext<MainState>();
export const createStore = () =>
	create<MainState>(
		persist(
			(set, get) => ({
				patientRecords: [],
				addPatientRecord: (ar) => {
					set((s) =>
						produce(s, (df) => {
							df.patientRecords.push({
								...ar,
								id:
									"PxT-" +
									Math.ceil(
										Math.random() * 100 + 1
									).toString() +
									"-" +
									new Date().getTime().toString(),
								dateTime: new Date().toUTCString(),
							});
							return df;
						})
					);
				},
			}),
			{
				name: "providers-async-storage-va",
				getStorage: () => AsyncStorage,
			}
		)
	);

// function getSypmtomItem(
// 	_s: (SymptomRecord & { data: Partial<_CompleteSymptomData> }) | any
// ): string | undefined {
// 	return _s.id || _s.symptom || undefined;
// }

/**
 * Function to convert the assessement record in a format cached in cloud storage
 * @param stateRecord Assessment record as stored in the application
 */
// function getAssessmentInfo(stateRecord: StateAssessmentRecord) {
// 	const {
// 		record: {
// 			dateTime,
// 			assessmentInfo: {
// 				age,
// 				sex,
// 				pregnant,
// 				presentingSymptoms,
// 				absentSymptoms,
// 			},
// 			id,
// 			diagnosis: { user, elsa },
// 		},
// 		recommendations,
// 	} = stateRecord;

// 	const months = convertAgeToMonths(age);

// 	return {
// 		info: { sex, age, ageGroup: getAgeGroup(months), pregnant },
// 		symptoms: {
// 			present: presentingSymptoms.map(getSypmtomItem),
// 			absent: absentSymptoms.map(getSypmtomItem),
// 		},
// 		diagnosis: {
// 			user: user.map((s) => s.condition),
// 			elsaTop10: elsa?.slice(0, 10).map((c) => c.condition),
// 		},
// 		recommendations,
// 		// dateTime the appointment was made
// 		dateTime: firestore.Timestamp.fromDate(new Date(dateTime)),
// 	};
// }

/**
 *
 * @param param0
 * @returns
 */
export function AppProvider({ children }: { children: React.ReactNode }) {
	return <Provider createStore={createStore}>{children}</Provider>;
}

export const syncData = (
	records: SavedPatientAssessmentRecord[],
	uid: string | undefined
) => {
	// if (uid === undefined) {
	// 	console.log("NULL UID");
	// 	return;
	// }
	// sync the entire data
	// assessments.map(a => uploadAsessment(a, uid))
};

export function useMainState() {
	const records = useStore((s) => s.patientRecords);
	const add = useStore((s) => s.addPatientRecord);

	const uid = useApplication((s) => s.user?.uid);

	/**
	 * Adding functionality to sync data
	 *
	 * NOTE:
	 * THIS IS VERY AGGRESSIVE AND HAPPENS ALL THE TIME,
	 *  YOU MIGHT WANT TO CHANGE THIS UP
	 */
	React.useEffect(() => syncData(records, uid), [records, uid]);

	return {
		records,
		add,
	};
}
