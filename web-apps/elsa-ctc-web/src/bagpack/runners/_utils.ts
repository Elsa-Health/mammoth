import { QueryRunner } from "@bagpack/querybox";
import { List } from "immutable";
import _ from "lodash";

import _devices from "@server/devices-to-use.json";

export function withRunner(run: QueryRunner) {
	return run;
}

const title = (x: string[]) => {
	const d = Object.fromEntries(x.map((t) => [_.kebabCase(t), t]));
	return {
		keys: Object.keys(d),
		texts: x,
		fn: (key: string) => d[key] ?? key,
	};
};

export const devices = () => _devices;

devices.map = (d: typeof _devices) =>
	Object.fromEntries(
		d.map((s) => {
			return [s.userId, s];
		})
	);

devices.ctc = (devices_: ReturnType<typeof devices>) =>
	List(devices_).filter((d) => d.project === "hiv-scale-up");

devices.fromUserId = (d: typeof _devices) => (userId: string) => {
	return devices.map(d)[userId] ?? null;
};
