import React from "react";
import QueryBox from "@bagpack/querybox";

export default function QueryStation() {
	const [value, set] = React.useState("");

	return (
		<div className="relative h-full min-h-screen w-full">
			<header className="container mx-auto text-2xl font-bold">
				<div className="py-4 px-6">at.Biashara</div>
			</header>
			<div className="w-full border-b" />
			<section className="container mx-auto h-full w-full divide-x px-8 py-4">
				<QueryBox />
			</section>
		</div>
	);
}
