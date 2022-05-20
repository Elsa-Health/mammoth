import { convertAgeToMonths, getAgeGroup } from "./helper";

describe("Helper functions", () => {
	it("convertAgeToMonths", () => {
		expect(convertAgeToMonths({ years: 0, months: 0, days: 0 })).toBe(0);
		expect(convertAgeToMonths({ years: 12, months: 0, days: 0 })).toBe(144);
	});

	it("getAgeGroup", () => {
		expect(getAgeGroup(0)).toBe("0 - 6 months");
		expect(getAgeGroup(6)).toBe("6 - 72 months");
		expect(getAgeGroup(72)).toBe("72 - 120 months");
		expect(getAgeGroup(120)).toBe("120 - 228 months");
		expect(getAgeGroup(228)).toBe("228+ months");
	});
});
