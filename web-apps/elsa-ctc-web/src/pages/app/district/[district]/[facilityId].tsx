/* eslint-disable @next/next/no-img-element */
import { ChartPieIcon } from "@heroicons/react/solid";
import { Layout } from "@ui/layout";
import { $extend } from "@ui/utils";
import React from "react";
import { Button } from "@ui/forms/buttons";
import QueryBox from "@bagpack/querybox";
import * as district from "@bagpack/runners/district";

function ItemReport() {
	return (
		<div className="divide-y rounded-md border border-gray-200 shadow-sm">
			<div className="flex flex-row items-center justify-between p-4">
				<div className="space-y-1">
					<p>Total sales</p>
					<h1 className="text-2xl font-medium">$218.84</h1>
				</div>
				<div>
					<ChartPieIcon className="h-8 w-auto text-gray-400" />
				</div>
			</div>
			<div className="flex flex-row items-center justify-between gap-6 p-4">
				<p className="whitespace-nowrap text-gray-500">
					6 total orders
				</p>
				<a
					href="#view-report"
					className="whitespace-nowrap text-purple-600"
				>
					View Report
				</a>
			</div>
		</div>
	);
}

export default function Page() {
	return (
		<div className="relative h-full min-h-screen w-full">
			<header className="container mx-auto px-6 py-4 text-2xl font-bold sm:py-4">
				<img
					src="/assets/svg/elsa-logo-colored-short.svg"
					alt="Elsa Logo"
					className="h-8"
				/>
			</header>
			<div className="w-full border-b" />
			<section className="container mx-auto grid h-full min-h-screen max-w-7xl divide-x md:grid-cols-12">
				<Layout
					wrapperClassName={
						"col-span-full py-12 px-4 sm:px-6 lg:px-8 "
					}
					Header={
						<>
							<div>
								<div className="space-y-2">
									<h2 className="text-3xl font-medium">
										Hi there
									</h2>
									<p className="text-gray-500">
										{
											"Here are the recent ongoing statistics for your district"
										}
									</p>
								</div>
							</div>

							<div className="flex flex-col justify-between space-y-3 md:flex-row md:items-center">
								<div className="space-y-2">
									<h2 className="text-3xl font-medium">
										Hi there,
									</h2>
									<p className="text-gray-500">
										{
											"Here are the recent ongoing statistics for your district"
										}
									</p>
								</div>
								<div className="gap-3">
									<Button onClick={() => alert("No!")}>
										Print
									</Button>
								</div>
							</div>
						</>
					}
					className={$extend("mt-8")}
				>
					<div className="col-span-full py-4">
						<h2 className="text-2xl font-semibold">
							{" "}
							Patients &amp; Visits
						</h2>
					</div>
					<div className="grid h-full w-full grid-flow-row grid-cols-12 gap-2">
						<div className="col-span-full row-span-6 rounded-md bg-slate-200">
							<QueryBox
								title="Overview"
								run={district.runOverview}
							/>
						</div>
						<div className="col-span-6 row-span-6 rounded-md bg-slate-200">
							<QueryBox
								title="Gender Distribution: Cummulative (year to date)"
								run={district.runOverview}
							/>
						</div>
						<div className="col-span-6 row-span-6 rounded-md bg-slate-200">
							<QueryBox
								title="Gender Distribution: This Week"
								run={district.runOverview}
							/>
						</div>
						<div className="col-span-full row-span-4 rounded-md bg-slate-200">
							<QueryBox
								title="ARV Pickup Location - Weekly"
								run={district.runARVPickupLocationWeekly}
							/>
						</div>

						{/* ------------------- */}

						{/* Single column */}
						<div className="row-span-8 col-span-6 rounded-md bg-slate-200">
							<QueryBox
								title="Tuberclosis - All Facilities"
								run={district.runARVPickupLocationWeekly}
							/>
						</div>
						<div className="row-span-12 col-span-6 col-start-7 rounded-md bg-slate-200">
							<QueryBox
								title="Top Symptoms Reported - This week"
								run={district.runARVPickupLocationWeekly}
							/>
						</div>

						<div className="row-span-8 col-span-6 col-start-1 rounded-md bg-slate-200">
							<QueryBox
								title="Tuberclosis Prevention - All facilities"
								run={district.runARVPickupLocationWeekly}
							/>
						</div>
						<div className="col-span-full rounded-md bg-slate-200">
							<QueryBox
								title="Patients on Anti-retrovirals"
								run={district.runARVPickupLocationWeekly}
							/>
						</div>
						<div className="col-span-full rounded-md bg-slate-200">
							<QueryBox
								title="Patients on Anti-retrovirals"
								run={district.runARVPickupLocationWeekly}
							/>
						</div>
						<div className="col-span-full py-4">
							<h2 className="text-2xl font-semibold">
								{" "}
								ARV Stock
							</h2>
						</div>

						{Array(12)
							.fill(true)
							.map((d, ix) => (
								<div
									key={ix}
									className={`h-12 rounded bg-slate-200 print:bg-transparent `}
								/>
							))}
						{/* ** Single columns */}
						<div className="col-span-full py-4">
							<h2 className="text-2xl font-semibold">
								Facilities
							</h2>
						</div>

						{Array(12)
							.fill(true)
							.map((d, ix) => (
								<div
									key={ix}
									className={`h-12 rounded bg-slate-200 print:bg-transparent `}
								/>
							))}

						<div className="col-span-full py-4">
							<h2 className="text-2xl font-semibold">Users</h2>
						</div>
						{/* Makes it look pretty... leave this */}
						{Array(120)
							.fill(true)
							.map((d, ix) => (
								<div
									key={ix}
									className={`h-12 rounded bg-slate-200 print:bg-transparent `}
								/>
							))}
					</div>
					{/*  */}
				</Layout>
			</section>
		</div>
	);
}
