/* eslint-disable @next/next/no-img-element */
import React from "react";
import ReactDom from "react-dom/server";

export default function ToPrint() {
	return (
		<div>
			<div>
				<img
					src="/assets/elsa-logo.png"
					className="h-8 w-auto"
					alt="logo"
				/>
			</div>
			<div>
				<h2>Report</h2>
				<p>Date </p>
			</div>
			<div>
				<p>Something is going on</p>
			</div>
			<footer>
				<p></p>
			</footer>
		</div>
	);
}
