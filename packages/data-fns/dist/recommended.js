import _labTests from "./data/core/lab-tests.json";
import medicationAddo from "./data/core/medications-addo.json";
import medicationGeneralSales from "./data/core/medications-general-sales.json";
import { build } from "./_utils";
export const labTests = {
    fromId: (id) => ({ id, name: _labTests[id] }),
    ids: () => Object.keys(_labTests).sort((a, b) => a.localeCompare(b)),
    values: () => build(_labTests),
};
const addo = {
    fromId: (id) => ({ id, name: medicationAddo[id] }),
    ids: () => Object.keys(medicationAddo).sort((a, b) => a.localeCompare(b)),
    values: () => build(medicationAddo),
};
const gs = {
    ids: () => Object.keys(medicationGeneralSales).sort((a, b) => a.localeCompare(b)),
    fromId: (id) => ({ id, name: medicationGeneralSales[id] }),
    values: () => build(medicationGeneralSales),
};
// All medicaitons supported by Elsa.Health
export const medications = {
    addo,
    gs,
    all: {
        ids: () => [...addo.ids(), ...gs.ids()].sort((a, b) => a.localeCompare(b)),
        values: () => [...addo.values(), ...gs.values()].sort((a, b) => a.name.localeCompare(b.name)),
    },
};
