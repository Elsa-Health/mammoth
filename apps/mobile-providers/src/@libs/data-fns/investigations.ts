import _investigationNameMap from "./data/core/investigation-name-map.json";
import _investigations from "./data/core/investigations.json";

export type Investigation = keyof typeof _investigations;

// Reflect how it's stored in the JSONs
export type InvestigationType<InvestigationParams extends string> =
	| {
			type: "text";
	  }
	| {
			type: "options";
			options: InvestigationParams[];
	  }
	| {
			type: "select";
			items: InvestigationParams[];
	  }
	| {
			type: "numeric-units";
			units: InvestigationParams | null;
	  }
	| {
			type: "panel";
			investigations: InvestigationParams[];
	  };

export type InvestigationTypeRecord<InvestigationParams extends string> =
	| {
			type: "text";
	  }
	| {
			type: "options";
			options: InvestigationParams[];
	  }
	| {
			type: "select";
			items: InvestigationParams[];
	  }
	| {
			type: "numeric-units";
			units: InvestigationParams | null;
	  }
	| {
			type: "panel";
			items: {
				[investigation in Investigation]?: InvestigationTypeRecord<InvestigationParams>;
			};
	  };
function constructInvestigation<T extends string, K extends string>(
	id: Investigation
): InvestigationTypeRecord<K> | null {
	const obj = _investigations[id] as InvestigationType<T>;

	if (obj === undefined) {
		return null;
	}

	if (obj.type !== "panel") {
		return obj as InvestigationTypeRecord<K>;
	}

	const panelObj = {};
	obj.investigations.forEach((tKey) => {
		panelObj[tKey] = _investigations[tKey as Investigation];
	});

	return {
		type: "panel",
		items: panelObj,
	};
}

export const investigation = {
	ids: () =>
		Object.keys(_investigationNameMap).sort((a, b) =>
			a.localeCompare(b)
		) as Investigation[],
	values: () => {
		Object.entries(_investigations)
			.sort((a, b) => a[0].localeCompare(b[0]))
			.map((s) => {
				const [key, obj] = s;
				return {
					id: key,
					...constructInvestigation(key as Investigation),
				};
			});
	},
	fromId: <T extends string, K extends string>(id: Investigation) =>
		constructInvestigation<T, K>(id),
	name: {
		fromId: (id: Investigation) => {
			return _investigationNameMap[id] || id;
		},
	},
};
