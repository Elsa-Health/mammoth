import React from "react";

import { Input } from "@ui/forms";
import { Button } from "@ui/forms/buttons";
import { Badge, BadgeWithDot, Info, Tab } from "@ui/misc";
// import { InformationCircleIcon } from "@heroicons/react/solid";
import { Layout, Section } from "@ui/layout/layout";
import { $extend } from "@ui/utils";
import { Table } from "@ui/components/table";
import {
	Chart,
	GRIDLESS_CONFIG,
	HIDE_LEGEND,
	NOT_LINES_CONFIG,
} from "@ui/charts";
import { line } from "@ui/charts/units";
import { combine } from "@bagpack/utils";

const DEFAULT_CONFIG = combine(GRIDLESS_CONFIG, NOT_LINES_CONFIG, HIDE_LEGEND);

export default function App() {
	return (
		<div>
			<div className="flex min-h-screen flex-col items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
				<div className="grid grid-cols-3 gap-4">
					<div className="space-y-4">
						<h2 className="font-bold">Inputs</h2>
						<div className="space-y-2">
							<Input />
							<Input label="Something" />

							<Input
								label="Create a password *"
								placeholder="at least 8 characters"
							/>
							<Button text="Something" />
							<Badge text="something" />

							<Section
								className={$extend("inline-flex items-center")}
							>
								<BadgeWithDot text="something" />
							</Section>
						</div>
					</div>
					<div className="col-span-2">
						<Layout
							className={$extend(
								"divide-dashed rounded-md border shadow-sm"
							)}
							Header={
								<Section
									className={$extend(
										"inline-flex items-center"
									)}
								>
									<label>Conversion</label>
								</Section>
							}
							Footer={
								<Section>
									<h2>
										Alreadt have an account?{" "}
										<a href="">Login</a>
									</h2>
								</Section>
							}
						>
							<Tab list={["All", "Ready", "Field"]}>
								<Tab.Panel className={"overflow-y-auto"}>
									<Table>
										<Table.Header
											list={[
												"Name",
												"Title",
												"Email",
												"Role",
											]}
										/>
										<Table.Body
											data={[
												[
													"Kevin",
													"James",
													"kevin.al.james@gmail.com",
												],
											]}
										/>
									</Table>
								</Tab.Panel>
								<Tab.Panel>Transfer</Tab.Panel>
								<Tab.Panel>Automatic T</Tab.Panel>
							</Tab>
						</Layout>
					</div>
				</div>
				<div className="grid grid-cols-3">
					<div className="">
						<div>Code region</div>
					</div>
					<div className="">
						<Chart
							type="line"
							options={DEFAULT_CONFIG}
							data={{
								labels,
								datasets: [
									line({ data: datapoints, fill: "start" }),
								],
							}}
						/>
					</div>
				</div>
			</div>
		</div>
	);
}

export const CHART_COLORS = {
	red: "rgb(255, 99, 132)",
	orange: "rgb(255, 159, 64)",
	yellow: "rgb(255, 205, 86)",
	green: "rgb(75, 192, 192)",
	blue: "rgb(54, 162, 235)",
	purple: "rgb(153, 102, 255)",
	grey: "rgb(201, 203, 207)",
};
const DATA_COUNT = 12;
const labels: string[] = [];
for (let i = 0; i < DATA_COUNT; ++i) {
	labels.push(i.toString());
}
const datapoints = [0, 20, 20, 60, 60, 120];

function Dump() {
	return (
		<>
			<div>
				<Layout
					className={$extend(
						"divide-dashed rounded-md border shadow-sm"
					)}
					Header={
						<Section
							className={$extend("inline-flex items-center")}
						>
							<label>Conversion</label>
							<Info
								label={
									<p className="inline-flex whitespace-nowrap">
										{/* <InformationCircleIcon className="ml-2 h-auto w-4 text-gray-500 hover:text-gray-700" /> */}
									</p>
								}
							>
								Creating conversation items
							</Info>
						</Section>
					}
					Footer={
						<Section>
							<h2>
								Alreadt have an account? <a href="">Login</a>
							</h2>
						</Section>
					}
				>
					<div className="space-y-4 p-4">
						<Input
							label="Email *"
							placeholder="example@gmail.com"
						/>
						<Input
							label="Create a password *"
							placeholder="at least 8 characters"
						/>
					</div>
				</Layout>
			</div>
			<div>
				<Button text="Something" />
				<div>
					<Badge text="something" />
					<BadgeWithDot text="something" />
					<p>
						Something
						<Info
							label={
								<p className="inline-flex whitespace-nowrap">
									Transaction Hash:{" "}
									{/* <InformationCircleIcon className="h-auto w-4 text-gray-500 hover:text-gray-700" /> */}
								</p>
							}
						>
							someting
						</Info>
					</p>
				</div>
			</div>
		</>
	);
}
