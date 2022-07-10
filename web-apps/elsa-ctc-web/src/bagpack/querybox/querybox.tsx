import React from "react";

import SimpleEditor from "react-simple-code-editor";
import Prism, { highlight } from "prismjs";
import "prismjs/components/prism-javascript";
import "prismjs/themes/prism-okaidia.css";

import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { a11yDark } from "react-syntax-highlighter/dist/cjs/styles/prism";

import { pick, pluck, pipe as chain, map, reduceRight } from "ramda";
import * as R from "ramda";

import { query } from "@bagpack/elsa";
import { List } from "immutable";
import { Tab } from "@ui/misc";
import { $extend, classNames } from "@ui/utils";
import {
	ChartSquareBarIcon,
	ChevronDownIcon,
	ChevronUpIcon,
	PlayIcon,
	TableIcon,
} from "@heroicons/react/solid";
import { Table } from "@ui/components";
import { ChartProps } from "react-chartjs-2";
import { ChartTypeRegistry } from "chart.js";

import { useAsync, useAsyncFn } from "react-use";

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
const table = <
	T extends Mapping<string, any> = Mapping<string, any>,
	C extends keyof T = keyof T
>(x: {
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
import * as D from "date-fns";

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

type QueryRunnerProps = {
	table: typeof table;
	chart: typeof chart;
	r: typeof R;
	d: typeof D;
	query: typeof query;
	is: {
		withinWeek: typeof isWithInWeek;
	};
	h: {
		date: typeof date;
		dx: typeof dx;
	};
	log: (a: any) => void;
};
export type QueryRunner = (tools: QueryRunnerProps) => Promise<{
	drawTable?: ReturnType<typeof table>;
	drawChart?: ReturnType<typeof chart>;
} | void>;

import { Disclosure } from "@headlessui/react";
import { Loading } from "@ui/icons";
import { nanoid } from "nanoid";
import { Chart } from "@ui/charts";

// NEXT: Make the contents here savable
export default function QueryBox({
	title,
	run,
	id = nanoid(),
}: {
	title?: string;
	run: QueryRunner;
	id?: string;
}) {
	const [table_, setTable] = React.useState<null | any>(() => ({
		data: List(),
		columns: [],
	}));

	// data to render chart information
	const [chart_, setChart] = React.useState<ChartProps | null>(() => null);

	const [code, setCode] = React.useState(
		// `function add(a, b) {\n  return a + b;\n}`
		`// will fix this \n${run.toString()}`
	);
	const [logs, setLogs] = React.useState(List());
	const [error, setError] = React.useState<null | Error>(null);

	const [{ loading }, execute] = useAsyncFn(() => {
		setError(null);
		// execute the function in th runner
		return run({
			table,
			chart,
			r: R,
			d: D,
			log: log,
			query,
			h: { date, dx },
			is: { withinWeek: isWithInWeek },
		})
			.then((out) => {
				const { drawTable, drawChart } = out || {};
				log(out);
				setTable(drawTable ?? null);
				setChart(drawChart ?? null);
			})
			.catch((err) => {
				setError(err);
			});
	}, []);

	React.useEffect(() => {
		let s = false;

		if (!s) {
			execute();
			s = true;
		}

		return () => {
			s = false;
		};
	}, [execute]);

	const log = (s: any) => {
		setLogs((s) => s.insert(0, value(s)));
		console.log(value(s));
	};

	return (
		<div className="relative h-full w-full bg-white drop-shadow-lg">
			{/* yarn start */}
			<div className="mb-8 h-full overflow-auto rounded-t-md border py-4 px-4 print:mb-0 print:p-2">
				<div className="flex flex-row-reverse items-center justify-between">
					<div className="flex">
						<button
							onClick={execute}
							className="rounded-full border border-purple-300 p-2 hover:ring-2 hover:ring-purple-400"
						>
							<PlayIcon className="h-5 w-auto text-purple-500" />
						</button>
					</div>
					<div className="inline-flex flex-row items-center gap-2">
						{loading && (
							<Loading className={"h-5 w-auto text-purple-400"} />
						)}
						{/* NEXT: Make this editable */}
						{title && <h2 className="text-xl">{title}</h2>}
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
			<div className="absolute bottom-0 left-0 right-0 rounded-b-md bg-slate-800 text-green-200 print:hidden">
				<Disclosure>
					<div className="flex flex-col-reverse">
						<Tab
							list={["Query", "Logs"]}
							Header={(props) => (
								<div className="relative">
									<Tab.Header
										className={
											"flex gap-6 bg-slate-900/30 px-4 text-sm"
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
									<Disclosure.Button className="absolute right-0 top-0 py-2 px-1">
										{/* @ts-ignore */}
										{({ open }) => (
											<button className="mr-2 rounded-full border border-white/40 p-1">
												{open ? (
													<ChevronUpIcon className="h-4 w-auto text-white" />
												) : (
													<ChevronDownIcon className="h-4 w-auto text-white" />
												)}
											</button>
										)}
									</Disclosure.Button>
								</div>
							)}
							panelClassName="p-0"
						>
							<Disclosure.Panel>
								<Tab.Panel className={"h-48 text-sm"}>
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
											overflow: "auto",
											height: "100%",
										}}
									/>
								</Tab.Panel>
								<Tab.Panel className={"h-48 text-sm"}>
									<SyntaxHighlighter
										language="javascript"
										style={a11yDark}
										customStyle={{
											height: "100%",
											fontSize: 12,
											marginTop: -1,
										}}
									>
										{JSON.stringify(
											logs.toArray(),
											undefined,
											2
										)}
									</SyntaxHighlighter>
								</Tab.Panel>
							</Disclosure.Panel>
						</Tab>
					</div>
				</Disclosure>
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
