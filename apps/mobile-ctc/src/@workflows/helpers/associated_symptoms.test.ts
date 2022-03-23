import { countBy, weirdFunction, snd } from "./associated_symptoms";

describe("Associated Symptoms Utils", () => {
	it("countBy", () => {
		const d = countBy([1, 2, 1, 1, 3].map((s) => s.toString()));
		expect(d["1"]).toBe(3);
	});

	it("snd", () => {
		expect(snd([2, 3, 5, 6])).toBe(3);
	});

	it("multiDimSort", () => {
		console.warn("<SHOULD BE REMOVED>");
		expect(weirdFunction(["ages", 3], ["ages", 2])).toBe(-1);
	});
});
