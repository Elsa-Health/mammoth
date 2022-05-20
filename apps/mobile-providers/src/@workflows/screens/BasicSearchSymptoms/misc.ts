import Fuse from "fuse.js";

import produce from "immer";
import { SymptomId } from "../../../../@types";

export const defaultElsaFuseOption = {
	// isCaseSensitive: false,
	// includeScore: false,
	shouldSort: true,
	// includeMatches: false,
	// findAllMatches: false,
	// minMatchCharLength: 1,
	// location: 0,
	threshold: 0.3, // lower == more accurate
	// distance: 100,
	// useExtendedSearch: false,
	// ignoreLocation: false,
	// ignoreFieldNorm: false,
	keys: [
		"description",
		{
			name: "tags",
			weight: 2,
		},
		{
			name: "name",
			weight: 3,
		},
	],
};

// Build search information
export const buildSearch = (
	lang: "en" | "sw" = "en",
	completeSymptomsList: SymptomId[],
	symptomSearchObject: (id: SymptomId) => { name: string; tags: string[] },
	fuseOptions?: object
) => {
	const searchData = completeSymptomsList
		.map((id) => ({
			id,
			...symptomSearchObject(id),
		}))
		.filter((s) => s !== undefined)
		.map((s) =>
			produce(s, (df) => {
				df["name"] = df["name"].replace(/[-]+/i, " ").toLowerCase();
				return df;
			})
		);

	const fuse = new Fuse(searchData, fuseOptions || defaultElsaFuseOption);

	/**
	 * @param string The keyword to search the items by their tags
	 * @returns number[] indices of the items in the symptom lists
	 */
	function searchByTags(keyword: string): number[] {
		return fuse.search(keyword.toLowerCase()).map((d) => d.refIndex);
	}

	return { searchByTags };
};

// const fuse = new Fuse(symptoms.map(s => ({ ...s, label: s.id.replace("-", " ") })), defaultElsaFuseOption);

// /**
//  * @param string The keyword to search the items by their tags
//  * @returns number[] indices of the items in the symptom list
//  */
// export function searchByTags (keyword: string): number[] {
//     return fuse.search(keyword).map(d => d.refIndex)
// }
