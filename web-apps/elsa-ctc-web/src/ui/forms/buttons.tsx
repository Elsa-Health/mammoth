import { $className, $extend, ClassName, classNames } from "@ui/utils";

type ButtonProps = {
	loading?: boolean;
	className?: ClassName;
	type?: "button" | "submit" | "reset";
} & (
	| {
			children: React.ReactNode;
			text?: string;
	  }
	| {
			children?: React.ReactNode;
			text: string;
	  }
) &
	Omit<React.InputHTMLAttributes<HTMLButtonElement>, "className" | "type">;

export function Button({
	className,
	type = "button",
	children,
	loading,
	text,
	disabled,
	...buttonProps
}: ButtonProps) {
	return (
		<button
			{...buttonProps}
			type={type}
			className={$className(
				className,
				classNames(
					disabled
						? "cursor-not-allowed bg-purple-400 hover:bg-purple-400"
						: "bg-purple-600 hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2",
					"rounded-md relative border border-transparent px-4 py-2 text-sm font-medium text-white shadow-sm"
				)
			)}
		>
			{/* Loading bar */}
			{loading && (
				<svg
					className="animate-spin -ml-1 mr-3 h-5 w-5 text-white absolute"
					xmlns="http://www.w3.org/2000/svg"
					fill="none"
					viewBox="0 0 24 24"
				>
					<circle
						className="opacity-25"
						cx="12"
						cy="12"
						r="10"
						stroke="currentColor"
						strokeWidth="4"
					></circle>
					<path
						className="opacity-75"
						fill="currentColor"
						d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
					></path>
				</svg>
			)}
			{children ?? text}
		</button>
	);
}
