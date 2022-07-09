import { $className, $extend, ClassName } from "@ui/utils";
import React from "react";

// const people = [
// 	{
// 		name: "Lindsay Walton",
// 		title: "Front-end Developer",
// 		email: "lindsay.walton@example.com",
// 		role: "Member",
// 	},
// 	// More people...
// ];

Table.Header = function TabHeader<T extends React.ReactNode>({
	list,
	TH = Table.TH,
}: {
	list: T[];
	TH?: typeof Table.TH;
}) {
	return (
		<thead>
			<tr>
				{list.map((txt, ix) => (
					<React.Fragment key={ix}>
						<TH
							className={$extend(
								ix === 0 ? "pl-4 pr-3 sm:pl-6 md:pl-0" : "px-3"
							)}
						>
							{txt}
						</TH>
					</React.Fragment>
				))}
			</tr>
		</thead>
	);
};

Table.DataRow = function TableBodyRow<T extends React.ReactNode>({
	items,
	className,
}: {
	items: T[];
	className?: ClassName;
}) {
	return (
		<tr className={$className(className)}>
			{items.map((item, ix) => (
				<React.Fragment key={ix}>
					<Table.TD
						className={$extend(
							ix === 0
								? "pl-4 pr-3 font-medium  sm:pl-6 md:pl-0"
								: "px-3"
						)}
					>
						{item}
					</Table.TD>
				</React.Fragment>
			))}
		</tr>
	);
};

type TableHead = Omit<
	React.DetailedHTMLProps<
		React.ThHTMLAttributes<HTMLTableHeaderCellElement>,
		HTMLTableHeaderCellElement
	>,
	"className"
>;
Table.TH = function TableHead({
	children,
	className,
	...props
}: TableHead & { className?: ClassName }) {
	return (
		<th
			{...props}
			scope="col"
			className={$className(
				className,
				"py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900"
			)}
		>
			{children}
		</th>
	);
};

Table.TD = function TableData({
	children,
	className,
}: {
	children: React.ReactNode;
	className: ClassName;
}) {
	return (
		<td
			className={$className(
				className,
				"whitespace-nowrap py-4 px-3 text-sm text-gray-500"
			)}
		>
			{children}
		</td>
	);
};

Table.Body = function TableBody<T extends React.ReactNode>({
	data,
	className,
	DataRow = Table.DataRow,
}: {
	data: T[][];
	DataRow?: typeof Table.DataRow;
	className?: ClassName;
}) {
	return (
		<tbody className={$className(className, "divide-y divide-gray-200")}>
			{data.map((row, ix) => (
				<React.Fragment key={ix}>
					<DataRow items={row} />
				</React.Fragment>
			))}
		</tbody>
	);
};

export function Table({ children }: { children: React.ReactNode }) {
	return (
		<table className="min-w-full divide-y divide-gray-300">
			{children}
			{/* <tbody className="divide-y divide-gray-200">
				{people.map((person) => (
					<tr key={person.email}>
						<td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-6 md:pl-0">
							{person.name}
						</td>
						<td className="whitespace-nowrap py-4 px-3 text-sm text-gray-500">
							{person.title}
						</td>
						<td className="whitespace-nowrap py-4 px-3 text-sm text-gray-500">
							{person.email}
						</td>
						<td className="whitespace-nowrap py-4 px-3 text-sm text-gray-500">
							{person.role}
						</td>
						<td className="relative whitespace-nowrap py-4 pl-3 pr-4 text-right text-sm font-medium sm:pr-6 md:pr-0">
							<a
								href="#"
								className="text-indigo-600 hover:text-indigo-900"
							>
								Edit
								<span className="sr-only">, {person.name}</span>
							</a>
						</td>
					</tr>
				))}
			</tbody> */}
		</table>
	);
}
