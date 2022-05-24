const MONTHS = 12;
const ADULT_MIN_AGE = 19 * MONTHS;
const ADOLESCENT_MAX_AGE = ADULT_MIN_AGE;
const ADOLESCENT_MIN_AGE = 10 * MONTHS;
const MAX_SCHOOL_AGE = ADOLESCENT_MIN_AGE;
const MIN_SCHOOL_AGE = 5 * MONTHS;
const CHILD_MAX_AGE = MIN_SCHOOL_AGE;
const CHILD_MIN_AGE = 6;

type Age = { years: number; months: number; days: number };
export const ageInMonths = (age: Age) =>
	age.years * MONTHS + age.months + age.days / 30;

export const ageInYears = (age: Age) => getYearsFromMonth(ageInMonths(age));

export const getYearsFromMonth = (ageInMonths: number) => ageInMonths / MONTHS;
export const getMonthsFromYears = (ageInYears: number) => ageInYears * MONTHS;

const isAdult = (ageInMonths: number) => ageInMonths >= ADULT_MIN_AGE;
const isAdolescent = (ageInMonths: number) =>
	ageInMonths >= ADOLESCENT_MIN_AGE && ageInMonths < ADOLESCENT_MAX_AGE;
const isSchoolAged = (ageInMonths: number) =>
	ageInMonths >= MIN_SCHOOL_AGE && ageInMonths < MAX_SCHOOL_AGE;
const isChild = (ageInMonths: number) =>
	ageInMonths >= CHILD_MIN_AGE && ageInMonths < CHILD_MAX_AGE;
const isNewBorn = (ageInMonths: number) => ageInMonths < CHILD_MIN_AGE;

export const Helper = {
	isAdult,
	isAdolescent,
	isChild,
	isSchoolAged,
	isNewBorn,
	ageInMonths,
	ageInYears,
};

export enum AgeGroup {
	NEW_BORN,
	SCHOOL_AGE,
	CHILD,
	ADOLESCENT,
	ADULT,
}

const ageGroupFns: [AgeGroup, (age: number) => boolean][] = [
	[AgeGroup.NEW_BORN, isNewBorn],
	[AgeGroup.SCHOOL_AGE, isSchoolAged],
	[AgeGroup.CHILD, isChild],
	[AgeGroup.ADOLESCENT, isAdolescent],
	[AgeGroup.ADULT, isAdult],
];

export function getAgeGroup(ageInMonths: number) {
	for (let [ap, fn] of ageGroupFns) {
		if (fn(ageInMonths)) {
			return ap;
		}
	}

	throw new Error(
		"Unable to get proper age range in value. Is the value a `number`"
	);
}
