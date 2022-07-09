export function classNames(...cls: Array<any>) {
	return cls.filter(Boolean).join(" ");
}

export type ClassName = string | ((cls: string) => string);

export function $className(
	fn: ClassName | undefined = undefined,
	defaultClass: string = ""
): string {
	if (fn === undefined) {
		return defaultClass;
	}

	if (typeof fn === "function") {
		return fn(defaultClass);
	}

	return fn;
}

/**
 *
 */
export const $extend = (v: string) => (prev: string) => {
	return `${prev} ${v}`;
};

export function useClassNames(cls: string) {
	return cls;
}
