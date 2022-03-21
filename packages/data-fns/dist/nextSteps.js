import nextStepsBasic from "./data/core/next-steps-basic.json";
import nextStepsExtended from "./data/translated/next-steps-extended.json";
// // all conditions
// const medicaitionsFn = medications.all
// const condIdsFn = () => conditions().map(s => s.id)
// const medicationIds = () => medicaitionsFn().map(s => s.id)
// const labTestIds = () => labTests().map(s => s.id)
export function basic(conditionsFn, medicationsFn, labTestsFn) {
    const meds = medicationsFn();
    const labTests = labTestsFn();
    const _vals = {};
    Object.entries(nextStepsBasic)
        .map((v) => {
        const [id, val] = v;
        return {
            id,
            ...val,
        };
    })
        .filter((s) => conditionsFn().includes(s.id))
        .map((s) => {
        const d = {};
        d["id"] = s.id;
        d["refer"] = s.refer;
        d["triageLevel"] = s["triage-level"];
        d["referAndTriageLevel"] = s["refer-and-triage-level"];
        d["medications"] = s["medications"]
            .filter((f) => meds.includes(f.id))
            .map((f) => ({ id: f.id, text: f.text }));
        d["testRecommendations"] = s["test-recommendations"]
            .filter((f) => labTests.includes(f.id))
            .map((f) => ({ id: f.id, text: f.text }));
        // @ts-ignore
        const other = s["other-recommendations"];
        if (other !== undefined) {
            d["otherRecommendations"] = other;
        }
        return d;
    })
        .forEach((s) => {
        const { id, ...other } = s;
        _vals[id] = other;
    });
    return _vals;
}
export function extended(conditionsFn, medicationsFn, labTestsFn) {
    const meds = medicationsFn();
    const labTests = labTestsFn();
    const basicInfo = basic(conditionsFn, medicationsFn, labTestsFn);
    const _vals = {};
    const _localeVals = Object.entries(nextStepsExtended)
        .map((v) => {
        const [id, val] = v;
        return {
            id,
            ...val,
        };
    })
        .filter((s) => conditionsFn().includes(s.id))
        .map((s) => {
        const d = {};
        d["id"] = s.id;
        d["referAndTriageLevel"] = s["refer-and-triage-level"];
        // @ts-ignore
        d["medications"] = s["medications"].filter((t) => meds.includes(t.id));
        // @ts-ignore
        d["testRecommendations"] = s["test-recommendations"].filter((t) => labTests.includes(t.id));
        // @ts-ignore
        const other = s["other-recommendations"];
        if (other !== undefined) {
            d["otherRecommendations"] = other;
        }
        return d;
    });
    // Converts it to objects that can
    _localeVals.forEach((s) => {
        const { id, ...other } = s;
        // @ts-ignore
        _vals[id] = { ...basicInfo[id], ...other };
    });
    return {
        all: _vals,
        locale: (lang) => {
            const _vals = {};
            _localeVals
                .map((lv) => {
                const nlv = { id: lv.id };
                nlv["referAndTriageLevel"] =
                    lv["referAndTriageLevel"][lang];
                nlv["medications"] = lv["medications"]
                    .map((s) => s[lang])
                    .filter((s) => s !== undefined);
                nlv["testRecommendations"] = lv["testRecommendations"]
                    .map((s) => s[lang])
                    .filter((s) => s !== undefined);
                return nlv;
            })
                .forEach((s) => {
                const { id, ...other } = s;
                // @ts-ignore
                _vals[id] = { ...basicInfo[id], ...other };
            });
            return _vals;
        },
    };
}
