import { $className, ClassName } from "@ui/utils";
export function Layout({
	Header,
	Footer,
	children,
	wrapperClassName: className,
	className: contentClassName,
}: {
	className?: ClassName;
	wrapperClassName?: ClassName;
	Header?: React.ReactNode;
	Footer?: React.ReactNode;
	children: React.ReactNode;
}) {
	return (
		<div className={$className(className, "flex max-h-screen flex-col")}>
			{Header ? <header>{Header}</header> : null}
			<main className={$className(contentClassName, "flex-1")}>
				{children}
			</main>
			{Footer ? <footer>{Footer}</footer> : null}
		</div>
	);
}

export function Section({
	className,
	children,
}: {
	className?: ClassName;
	children: React.ReactNode;
}) {
	return <div className={$className(className, "px-4 py-3")}>{children}</div>;
}
