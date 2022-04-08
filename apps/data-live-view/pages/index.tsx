import React from "react";

export default function Play() {
	return (
		<div className="min-h-screen h-full mx-auto container flex flex-col justify-center items-center">
			<span className="relative z-0 inline-flex shadow-sm rounded-md">
				<a
					href="/ctc"
					type="button"
					className="relative inline-flex items-center px-4 py-2 rounded-l-md border border-gray-300 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 focus:z-10 focus:outline-none focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500"
				>
					CTC
				</a>
				<a
					href="/todo"
					type="button"
					className="-ml-px relative inline-flex items-center px-4 py-2 rounded-r-md border border-gray-300 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 focus:z-10 focus:outline-none focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500"
				>
					Demo Todo
				</a>
			</span>
		</div>
	);
}
