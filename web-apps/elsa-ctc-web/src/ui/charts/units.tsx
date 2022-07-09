import { ChartDataset } from "chart.js";

type UnitChartProps = { type: "bar" | "line"; label?: string; data: number[] };
export function unit({ type, label, data }: UnitChartProps): ChartDataset {
	return {
		label,
		type,
		data,
	};
}

export function line(props: ChartDataset): ChartDataset {
	// @ts-ignore
	return Object.assign(
		{
			borderColor: "#238636",
			cubicInterpolationMode: "monotone",
			tension: 0.4,
			backgroundColor: "#23863634",
		} as ChartDataset,
		props
	);
}

export type UnitData = ReturnType<typeof unit>;
