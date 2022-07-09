import React from "react";

import SimpleEditor from "react-simple-code-editor";
import Prism, { highlight, languages } from "prismjs";
import "prismjs/components/prism-javascript";
import "prismjs/themes/prism-okaidia.css";

import {
	getCoreRowModel,
	useReactTable,
	ColumnDef,
} from "@tanstack/react-table";

import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { a11yDark } from "react-syntax-highlighter/dist/cjs/styles/prism";

import { pick, pluck, pipe as chain, map, reduceRight } from "ramda";
import * as R from "ramda";

import { query } from "@bagpack/elsa";
import { List } from "immutable";
import { title } from "process";
import { Chart } from "@ui/charts";
import { Tab } from "@ui/misc";
import { $extend, classNames } from "@ui/utils";
import { ChartSquareBarIcon, TableIcon } from "@heroicons/react/solid";
import { Table } from "@ui/components";
import { ChartProps } from "react-chartjs-2";
import { ChartTypeRegistry } from "chart.js";
import { useAsync } from "react-use";

const Editor = () => {
	const [code, setCode] = React.useState(
		`function add(a, b) {\n  return a + b;\n}`
	);

	return (
		<SimpleEditor
			value={code}
			onValueChange={(code) => setCode(code)}
			// @ts-ignore
			highlight={(value) => highlight(value, Prism.languages.js)}
			padding={10}
			style={{
				fontFamily: '"Fira code", "Fira Mono", monospace',
				fontSize: 12,
				lineHeight: 1.5,
				height: "100%",
			}}
		/>
	);
};

export function LogBox() {
	const codeString = "(num) => num + 1";
	return (
		<SyntaxHighlighter language="javascript" style={a11yDark}>
			{codeString}
		</SyntaxHighlighter>
	);
}

type Mapping<K extends string, V> = { [f in K]: V };
type Data<TV extends Mapping<string, any>, F extends keyof TV = keyof TV> =
	| TV[]
	| TV[F][][];
const table = <T extends Mapping<string, any>, C extends keyof T = keyof T>(x: {
	columns: Array<C>;
	data: Data<T, C>;
	title?: (x: C, all: C[]) => string | null;
}) => {
	const { columns, data, title = (d, _) => d } = x;
	const tx = columns.map((d) => ({ key: d, text: title(d, columns) }));

	const s = data.map((row) => {
		if (Array.isArray(row)) {
			return Object.fromEntries(columns.map((c, ix) => [c, row[ix]]));
		}

		return row;
	});

	return {
		columns: tx,
		data: List(s),
	};
};

import { differenceInDays } from "date-fns";

const chart = <T extends keyof ChartTypeRegistry>(p: ChartProps<T>) => {};

const data = (m: any) => m.result.data;
const dt = (m: any) => m.data;

const print = (d: any) => console.log(d);
const all =
	<V,>(...f: Function[]) =>
	(a: V) =>
		f.forEach((fx) => fx(a));

const date = (dateStr: string | Date | undefined = undefined) =>
	dateStr !== undefined ? new Date(dateStr) : new Date();

const aggregate = reduceRight;
const dx = chain(data, dt);
const count = chain(R.length);
const isWithInWeek = (date_: string) =>
	differenceInDays(date(), date(date_)) <= 7;

const countInWeeks = (d: string[]) => count(R.filter(isWithInWeek, d));

async function run() {
	const patients = await query("/collection/patients/data").then(dx);
	const visits = await query("/collection/visits/data").then(dx);

	// something
	const d = [
		[
			"Patient Registered (#)",
			count(patients),
			countInWeeks(pluck("createdAt", patients)),
		],
		[
			"Patient Visits Completed (#)",
			count(patients),
			countInWeeks(pluck("createdAt", visits)),
		],
	];

	console.log(d);
	// aggregate(R.sum, patients);

	// console.log(
	// 	patients.map(
	// 		chain(pick(["createdAt", "id"]), (d) => ({
	// 			id: d.id,
	// 			createdAt: date(d.createdAt),
	// 		}))
	// 	)
	// );
}

function create(val: any) {
	return Function(`return ${val} ;`)();
}
create(30);

// something
run();

export default function QueryBox() {
	const [table_, setTable] = React.useState(() => ({
		data: List(),
		columns: [],
	}));

	// data to render chart information
	const [chart_, setChart] = React.useState<ChartProps | null>(() => null);

	const [code, setCode] = React.useState(
		`function add(a, b) {\n  return a + b;\n}`
	);

	useAsync(async () => {
		const patients = await query("/collection/patients/data");

		// ...
		const s = table<{
			type: string;
			overall: number;
			"this-week": number;
			"last-week": string;
		}>({
			columns: ["type", "overall", "this-week", "last-week"],
			data: [
				[
					"Patient Registered (#)",
					count(patients),
					count(patients),
					count(patients),
				],
				["Patients Visit Completed", 560, 2, "+14"],
			],
			title: (x) => (x === "type" ? null : x.toUpperCase()),
		});

		const c = chart({
			type: "line",
			data: { datasets: [] },
		});

		setTable(s);
	}, []);

	return (
		<div className="w-full h-full drop-shadow-lg bg-white">
			{/* yarn start */}
			<div className="py-4 px-6 border rounded-t-md">
				<div className="flex justify-end">
					<div className="gap-2 flex flex-row">
						<button className="p-2 border rounded-full">
							<TableIcon className="h-5 w-auto" />
						</button>
						<button className="p-2 border rounded-full">
							<ChartSquareBarIcon className="h-5 w-auto" />
						</button>
					</div>
				</div>
				<div className="grid grid-flow-col">
					{chart_ && (
						<div>
							<Chart
								{...chart_}
								// height={100}
								// type="bar"
								// data={{
								// 	labels: [
								// 		"Patients Registered",
								// 		"Patients Visit Completed",
								// 	],
								// 	datasets: [
								// 		{
								// 			label: "Patients",
								// 			backgroundColor: ["#3e95cd", "#3e95cd"],
								// 			data: [323, 560],
								// 		},
								// 	],
								// }}
								// options={{
								// 	indexAxis: "y",
								// 	scales: {},
								// }}
							/>
						</div>
					)}
					<div>
						<Tableur {...(table_ || {})} />
					</div>
				</div>
			</div>
			{/* Tab section for the querying area */}
			<div className="bg-slate-800 text-green-200 rounded-b-md">
				<Tab
					list={["Query", "Logs"]}
					Header={(props) => (
						<Tab.Header
							className={
								"flex px-4 gap-6 bg-slate-900/30 text-sm"
							}
							labelClassName={(selected) =>
								classNames(
									"cursor-pointer whitespace-nowrap",
									selected
										? "text-purple-300"
										: "text-gray-200"
								)
							}
							{...props}
						/>
					)}
					panelClassName="p-0"
				>
					<Tab.Panel className={"text-sm h-48"}>
						<SimpleEditor
							value={code}
							onValueChange={(code) => setCode(code)}
							highlight={(value) =>
								// @ts-ignore
								highlight(value, Prism.languages.js)
							}
							padding={10}
							style={{
								fontFamily:
									'"Fira code", "Fira Mono", monospace',
								fontSize: 12,
								lineHeight: 1.5,
								height: "100%",
							}}
						/>
					</Tab.Panel>
					<Tab.Panel className={"text-sm h-48"}>
						<SyntaxHighlighter
							language="javascript"
							style={a11yDark}
							customStyle={{
								height: "100%",
								fontSize: 12,
								marginTop: -1,
							}}
						>
							{JSON.stringify(table_, undefined, 2)}
						</SyntaxHighlighter>
					</Tab.Panel>
				</Tab>
			</div>
		</div>
	);
}

const value = (a: any) => {
	if (["string", "boolean", "number"].includes(typeof a)) {
		return a;
	}

	return JSON.stringify(a);
};

type Column<K> = { key: K; text: string };
function Tableur<
	TV extends Mapping<string, any>,
	F extends keyof TV = keyof TV
>({ data = List(), columns }: { data?: List<TV>; columns?: Column<F>[] }) {
	const c = React.useMemo<Column<F>[]>(() => {
		return columns ?? [];
	}, [columns]);

	return (
		<Table>
			<Table.Header list={c.map((x) => x.text)} />
			<Table.Body
				data={data
					.map((r) => c.map(({ key }) => value(r[key])))
					.toArray()}
			/>
		</Table>
	);
}
