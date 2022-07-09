/* eslint-disable @next/next/no-img-element */
import Link from "next/link";
import React from "react";

export default function Page() {
	return (
		<div className="flex min-h-screen w-full flex-col items-center justify-center gap-4">
			<img src="/assets/elsa-logo.png" className="" alt="Elsa Logo" />
			<div className="grid-cols-2 grid gap-4">
				<Link href="/sign-in">
					<a className="underline hover:text-orange-600">Sign In</a>
				</Link>
				<Link href="/register">
					<a className="underline hover:text-indigo-600">Dashboard</a>
				</Link>
			</div>
		</div>
	);
}
