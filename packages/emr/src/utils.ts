import { P } from "../health.types/v1";
import {
	DDMMYYYYDateString,
	UTCDateTimeString,
} from "../health.types/v1/_primitives";

export type MustHave<T, K extends keyof T> = Partial<T> &
	Required<{ [k in K]: T[k] }>;

/**
 * Convert string to date object
 * @param dateStr
 * @returns
 */
export const date = (
	dateStr:
		| P.UTCDateTimeString
		| P.YYYYMMDDDateString
		| Date
		| undefined = undefined
) => (dateStr !== undefined ? new Date(dateStr) : new Date());

/**
 * Convert date string to utc date string
 * @param dateStr
 * @returns
 */
export const utcDateString = (
	dateStr: Parameters<typeof date>[0] = undefined
) => date(dateStr).toUTCString();

export function getDateFromDMYFormat(date: DDMMYYYYDateString): Date {
	const vals = removeWhiteSpace(date).split("/");

	if (vals.length !== 3) {
		throw new Error(
			"Invalid data format. The date needs to be in the formate DD / MM / YYYY"
		);
	}

	try {
		const [d, m, y] = vals;
		return new Date(`${y}-${m}-${d}`);
	} catch (err) {
		throw new Error("Unable to parse the number into a proper Date object");
	}
}

export function removeWhiteSpace(text: string) {
	return text.replace(/\s+/g, "").trim();
}

export const freeze = <D extends P.Mapping<string, P.Data>>(d: D) =>
	Object.freeze(d);

export const extend = <
	A extends P.Mapping<string, P.Data>,
	D extends P.Mapping<string, P.Data>
>(
	a: A,
	d: D
) => Object.assign(a, d);

export const normalizeToNull = <O extends P.Mapping<string, P.Data | null>>(
	fields: Array<keyof O>,
	object_: Partial<O> | null
) => {
	if (object_ === null) return null;

	return Object.fromEntries(
		fields.map((f) => [f, object_[f] ?? null])
	) as O | null;
};

export const checkNull = <T extends any, V>(checkNull: T | null, value: V) =>
	checkNull !== null ? value : null;

export function resource<
	D extends P.Mapping<string, P.Data> = P.Mapping<string, P.Data>,
	R extends P.Resource<string, D, string> = P.Resource<string, D, string>
>(type: R["resourceType"], data: D, code: R["code"]): R {
	return Object.assign(
		{
			id: data.id,
			code,
			createdAt: date(data.createdAt ?? undefined).toUTCString(),
			resourceType: type,
		},
		data
	) as R;
}

export function resourceItem<
	R extends string,
	D extends P.Mapping<string, P.Data>
>(resourceItem: R, data: D): P.ResourceItem<R, D> {
	return Object.assign(
		{
			resourceType: "ResourceItem",
			resourceItemType: resourceItem,
		},
		data
	) as P.ResourceItem<R, D>;
}

export function concat<T>(...args: Array<T>[]) {
	return args.reduce((acc, curr) => acc.concat(curr), []);
}
