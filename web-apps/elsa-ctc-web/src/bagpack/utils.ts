import { flatten, unflatten } from "flat";
export const combine = (...arr: object[]) =>
	// @ts-ignore
	arr.reduceRight((a, b) => unflatten(Object.assign(flatten(a), flatten(b))));

export const date = (dateStr: string | Date | undefined = undefined) =>
	dateStr !== undefined ? new Date(dateStr) : new Date();
