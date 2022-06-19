import { P } from "../health.types/v1";
import { UTCDateTimeString } from "../health.types/v1/_primitives";

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
