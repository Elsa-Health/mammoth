import _investigationNameMap from "../data/core/investigation-name-map.json";
import _investigations from "../data/core/investigations.json";

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

function constructInvestigationFromObj<T extends string, K extends string>(
	obj: InvestigationType<T> | undefined
): InvestigationTypeRecord<K> | null {
	if (obj === undefined) {
		return null;
	}

	if (obj.type !== "panel") {
		return obj as InvestigationTypeRecord<K>;
	}

	const panelObj: { [k: string]: any } = {};
	obj.investigations.forEach((tKey) => {
		panelObj[tKey] = _investigations[tKey as Investigation];
	});

	return {
		type: "panel",
		items: panelObj,
	};
}

function constructInvestigation<T extends string, K extends string>(
	id: Investigation
): InvestigationTypeRecord<K> | null {
	const obj = _investigations[id] as InvestigationType<T>;

	return constructInvestigationFromObj<T, K>(obj);
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
					// @ts-ignore
					...constructInvestigationFromObj(obj),
				};
			});
	},
	fromId: <T extends string, K extends string>(id: Investigation) =>
		constructInvestigation<T, K>(id),
	name: {
		fromId: (id: Investigation) => {
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
