import { Age, _CompleteSymptomData } from "../../@types";

export function convertAgeToMonths(age: Age) {
	const years = age.years || 0;
	const months = age.months || 0;
	const days = age.days || 0;

	return Math.max(0, years * 12 + months + days / 30);
}

export function getAgeGroup(months: number) {
	if (months < 6) {
		return "0 - 6 months";
	}
	if (months < 72) {
		return "6 - 72 months";
	}
	if (months < 120) {
		return "72 - 120 months";
	}
	if (months < 228) {
		return "120 - 228 months";
	}
	if (months >= 228) {
		return "228+ months";
	}
	return "(-inf, inf+)";
}
