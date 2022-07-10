import React, { ReactNode } from "react";
import { ClassName, classNames, useClassNames } from "@ui/utils";
import { $className } from "@ui/utils";
import { InformationCircleIcon } from "@heroicons/react/solid";
import { Popover, Tab as NTab } from "@headlessui/react";
import { boolean } from "zod";

type Either<F extends { [f: string]: any }> = Partial<F>;

// badge props
type BadgeProps = Either<{ text: string; children: React.ReactNode }> & {
	className?: ClassName;
};

export function Badge({ text, className }: BadgeProps) {
	return (
		<span
			className={$className(
				className,
				"inline-flex items-center rounded-full bg-pink-100 px-3 py-0.5 text-sm font-medium text-pink-800"
			)}
		>
			{text}
		</span>
	);
}

export function BadgeWithDot({ text }: BadgeProps) {
	return (
		<span className="bg-biashara-blue-800/10 text-biashara-blue-800 inline-flex items-center rounded-full px-3 py-0.5 text-sm font-medium">
			<svg
				className="text-biashara-blue-800 -ml-1 mr-1.5 h-2 w-2"
				fill="currentColor"
				viewBox="0 0 8 8"
			>
				<circle cx={4} cy={4} r={3} />
			</svg>
			{text}
		</span>
	);
}

export function Info({
	children,
	label,
	panelClassName,
}: {
	label: React.ReactNode;
	children: React.ReactNode;
	panelClassName?: ClassName;
}) {
	return (
		<Popover className={"relative w-full"}>
			<Popover.Button className={"inline-flex"}>{label}</Popover.Button>
			<Popover.Panel
				className={$className(
					panelClassName,
					"absolute z-30 rounded border bg-white p-2 shadow-sm"
				)}
			>
				{children}
			</Popover.Panel>
		</Popover>
	);
}

export function Tab({
	Header = Tab.Header,
	list,
	children,
	className,
	panelClassName,
}: {
	Header?: typeof Tab.Header;
	list: string[];
	children: React.ReactNode;
	className?: ClassName;
	panelClassName?: ClassName;
}) {
	return (
		<NTab.Group>
			<Header list={list} />
			<NTab.Panels className={$className(panelClassName, "px-4 py-2")}>
				{children}
			</NTab.Panels>
		</NTab.Group>
	);
}

Tab.Header = function TabHeader({
	list,
	className,
	labelClassName,
}: {
	list: string[];
	className?: ClassName;
	labelClassName?: (selected: boolean) => ClassName;
}) {
	return (
		<NTab.List
			className={$className(className, "flex gap-5 border-b px-4")}
		>
			{(list ?? []).map((tx, ix) => (
				<React.Fragment key={ix}>
					<NTab
						className={({ selected }: { selected: boolean }) =>
							classNames(
								`cursor-pointer border-b-2 py-2`,
								selected
									? "border-purple-500"
									: "border-transparent"
							)
						}
					>
						{({ selected }: { selected: boolean }) => (
							<label
								className={$className(
									labelClassName?.(selected),
									classNames(
										"cursor-pointer whitespace-nowrap",
										selected
											? "text-purple-500"
											: "text-gray-600"
									)
								)}
							>
								{tx}
							</label>
						)}
					</NTab>
				</React.Fragment>
			))}
		</NTab.List>
	);
};
Tab.Panel = NTab.Panel;
