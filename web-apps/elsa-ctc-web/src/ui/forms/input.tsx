/* eslint-disable react/display-name */
import React from "react";

import { $className, ClassName, classNames } from "@ui/utils";

export type InputProps = {
	id?: string;
	label?: string;
	className?: ClassName;
	wrapperClassName?: ClassName;
	contentClassName?: ClassName;
	labelClassName?: ClassName;
	left?: React.ReactNode;
	right?: React.ReactNode;
} & Omit<React.InputHTMLAttributes<HTMLInputElement>, "className" | "id">;

export const Input = React.forwardRef<HTMLInputElement | null, InputProps>(
	function (
		{
			label,
			id,
			className,
			contentClassName,
			wrapperClassName,
			labelClassName,
			name,
			right,
			left,
			...props
		},
		ref
	) {
		const showLabel = label !== undefined;
		return (
			<div className={$className(wrapperClassName, "h-full w-full")}>
				{showLabel && (
					<label
						htmlFor={id ?? label}
						className={$className(
							labelClassName,
							"block text-sm font-medium text-gray-500"
						)}
					>
						{label}
					</label>
				)}
				<label htmlFor={id ?? label} className="sr-only">
					{label}
				</label>
				<div
					className={$className(
						contentClassName,
						classNames(
							showLabel && "mt-1",
							"relative rounded-md shadow-sm"
						)
					)}
				>
					{(left ?? false) && (
						<div className="absolute inset-y-0 left-0">{left}</div>
					)}
					<input
						type="text"
						{...props}
						ref={ref}
						id={id ?? label}
						className={$className(
							className,
							classNames(
								"block w-full appearance-none rounded-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-purple-500 focus:outline-none focus:ring-purple-500 sm:text-sm"
							)
						)}
					/>
					{(right ?? false) && (
						<div className="absolute inset-y-0 right-0">
							{right}
						</div>
					)}
				</div>
			</div>
		);
	}
);
