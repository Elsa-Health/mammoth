/* eslint-disable @next/next/no-img-element */
import Link from "next/link";
import React from "react";

export default function Page() {
	return (
		<div className="flex min-h-screen w-full flex-col items-center justify-center gap-4">
			<img src="/assets/elsa-logo.png" className="" alt="Elsa Logo" />
			<div className="grid grid-cols-2 gap-4">
				<Link href="/sign-in">
					<a className="underline hover:text-orange-600">District</a>
				</Link>
				<Link href="/register">
					<a className="underline hover:text-indigo-600">
						Faciliy (02020100)
					</a>
				</Link>
			</div>
		</div>
	);
}
