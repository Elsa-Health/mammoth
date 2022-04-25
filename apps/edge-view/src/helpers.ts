export function classNames(...classes: Array<string | boolean>) {
	return classes.filter(Boolean).join(" ");
}
