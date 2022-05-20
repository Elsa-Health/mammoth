import Fuse from "fuse.js";
import { symptoms } from "../../../../app/symptoms";

import * as data from "../../../../@libs/data-fns";

import produce from "immer";

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
export const buildSearch = (lang: "en" | "sw" = "en", fuseOptions?: object) => {
	const searchData = symptoms
		.map((s) => ({
			id: s.id,
			...data.symptomsLocale.translate(lang)[s.id as data.Symptom],
		}))
		.filter((s) => s !== undefined)
		.map((s) =>
			produce(s, (df) => {
				df["name"] = df["name"].replace(/[-]+/i, " ").toLowerCase();
				return df;
			})
		);

	// console.log("FUSE-SEARCH DATA")
	// console.log(searchData)

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
