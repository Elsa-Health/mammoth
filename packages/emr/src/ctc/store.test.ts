import { executeChain } from "./store";

function sleep(ms: number) {
	return new Promise((resolve) => setTimeout(resolve, ms));
}

describe("Executors", () => {
	it("chain executor works", () => {
		const p: number[] = [];
		expect(
			(async () => {
				await executeChain([
					() => p.push(1),
					() => p.push(2),
					() => p.push(2),
					() => p.push(3),
				]);
				return p;
			})()
		).resolves.toEqual([1, 2, 2, 3]);
	});
});
