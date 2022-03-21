import _labTests from "./data/core/lab-tests.json";
import medicationAddo from "./data/core/medications-addo.json";
import medicationGeneralSales from "./data/core/medications-general-sales.json";
import { build } from "./_utils";

/**
 * Type of the lab tests
 */
export type LabTest = keyof typeof _labTests;

/**
 * All medicaitons
 */

export declare namespace Medication {
	export type Addo = keyof typeof medicationAddo;
	export type GS = keyof typeof medicationGeneralSales;
}

export const labTests = {
	fromId: (id: LabTest) =>
		({ id, name: _labTests[id] } as { id: LabTest; name: string }),
	ids: () =>
		Object.keys(_labTests).sort((a, b) => a.localeCompare(b)) as LabTest[],
	values: () => build<LabTest>(_labTests),
};

const addo = {
	fromId: (id: Medication.Addo) =>
		({ id, name: medicationAddo[id] } as {
			id: Medication.Addo;
			name: string;
		}),
	ids: () =>
		Object.keys(medicationAddo).sort((a, b) =>
			a.localeCompare(b)
		) as Medication.Addo[],
	values: () => build<Medication.Addo>(medicationAddo),
};
const gs = {
	ids: () =>
		Object.keys(medicationGeneralSales).sort((a, b) =>
			a.localeCompare(b)
		) as Medication.GS[],
	fromId: (id: Medication.GS) =>
		({ id, name: medicationGeneralSales[id] } as {
			id: Medication.GS;
			name: string;
		}),
	values: () => build<Medication.GS>(medicationGeneralSales),
};

// All medicaitons supported by Elsa.Health
export const medications = {
	addo,
	gs,
	all: {
		ids: () =>
			[...addo.ids(), ...gs.ids()].sort((a, b) => a.localeCompare(b)),
		values: () =>
			[...addo.values(), ...gs.values()].sort((a, b) =>
				a.name.localeCompare(b.name)
			),
	},
};
