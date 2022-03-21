import _investigationNameMap from "./data/core/investigation-name-map.json";
import _investigations from "./data/core/investigations.json";
function constructInvestigationFromObj(obj) {
    if (obj === undefined) {
        return null;
    }
    if (obj.type !== "panel") {
        return obj;
    }
    const panelObj = {};
    obj.investigations.forEach((tKey) => {
        panelObj[tKey] = _investigations[tKey];
    });
    return {
        type: "panel",
        items: panelObj,
    };
}
function constructInvestigation(id) {
    const obj = _investigations[id];
    return constructInvestigationFromObj(obj);
}
export const investigation = {
    ids: () => Object.keys(_investigationNameMap).sort((a, b) => a.localeCompare(b)),
    values: () => {
        Object.entries(_investigations)
            .sort((a, b) => a[0].localeCompare(b[0]))
            .map((s) => {
            const [key, obj] = s;
            return {
                id: key,
                // @ts-ignore
                ...constructInvestigationFromObj(obj),
            };
        });
    },
    fromId: (id) => constructInvestigation(id),
    name: {
        fromId: (id) => {
            return _investigationNameMap[id] || id;
        },
        values: () => {
            return Object.entries(_investigationNameMap)
                .sort((a, b) => a[1].localeCompare(b[1]))
                .map((s) => {
                const [id, name] = s;
                return {
                    id,
                    name,
                };
            });
        },
    },
};
