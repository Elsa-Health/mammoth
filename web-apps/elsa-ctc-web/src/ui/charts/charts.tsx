import { Chart as ChartJSX } from "react-chartjs-2";
import { configChart } from "./utils";

export const GRIDLESS_CONFIG = configChart({
	scales: {
		x: {
			grid: {
				display: false,
			},
			display: false,
		},
		y: {
			display: false,
			grid: {
				drawTicks: false,
				drawBorder: false,
				display: false,
			},
		},
	},
});

export const NOT_LINES_CONFIG = configChart({
	elements: {
		point: {
			hoverRadius: 8,
			radius: 0,
		},
	},
});

export const HIDE_LEGEND = configChart({
	plugins: {
		legend: {
			display: false,
		},
	},
});

export const Chart = ChartJSX;
