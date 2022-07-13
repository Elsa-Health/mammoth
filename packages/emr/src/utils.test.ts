import { convertDMYToDate } from "./utils";

test("convertDMYToDate", () => {
	const s = new Error(
		"Invalid data format. The date needs to be in the formate DD / MM / YYYY"
	);
	expect(() => convertDMYToDate("21/04/2012")).not.toThrowError();
	expect(() => convertDMYToDate("21 / 04 / 2012")).not.toThrowError();
	expect(() => convertDMYToDate("21 / 04     / 2013")).not.toThrowError();
	expect(() => convertDMYToDate("12 / 05 / 1992")).not.toThrowError();
	expect(() => convertDMYToDate("21 / 02 / 1994")).not.toThrowError();
	expect(() => convertDMYToDate("14 / 02 / 1992")).not.toThrowError();
	expect(() => convertDMYToDate("20 / 07 / 1953")).not.toThrowError();

	expect(() => convertDMYToDate("21 / 04")).toThrowError();
	expect(() => convertDMYToDate("21 / 13 / 2012")).toThrowError();
	expect(() => convertDMYToDate("21 / 05 / 20XX")).toThrowError();
});
