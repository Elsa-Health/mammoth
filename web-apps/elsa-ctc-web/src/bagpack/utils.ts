import { flatten, unflatten } from "flat";
export const combine = (...arr: object[]) =>
	// @ts-ignore
	arr.reduceRight((a, b) => unflatten(Object.assign(flatten(a), flatten(b))));
