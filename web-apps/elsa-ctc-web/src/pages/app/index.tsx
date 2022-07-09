/* eslint-disable @next/next/no-img-element */
import {
	ChartPieIcon,
	CurrencyEuroIcon,
	PlusIcon,
} from "@heroicons/react/solid";
import { Layout } from "@ui/layout";
import { $extend } from "@ui/utils";
import React from "react";
import { Dialog } from "@headlessui/react";
import { Button } from "@ui/forms/buttons";
import { useForm } from "react-hook-form";
import { Input } from "@ui/forms/rhf";

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

function useModal(initial: boolean = false) {
	const [visible, set] = React.useState(initial);
	return {
		visible,
		open: () => set(true),
		toggle: () => set((s) => !s),
		dismiss: () => set(false),
	};
}

import { tw } from "twind";

export default function Page() {
	const tModal = useModal();

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
					wrapperClassName={"col-span-9 py-12 px-4 sm:px-6 lg:px-8 "}
					Header={
						<div className="flex flex-col justify-between space-y-3 md:flex-row md:items-center">
							<div className="space-y-2">
								<h2 className="text-3xl font-medium">
									Hi Richard
								</h2>
								<p className="text-gray-500">
									{
										"Here's what's happening with yout store today"
									}
								</p>
							</div>
							<div className="grid grid-cols-2 gap-3">
								<button
									type="button"
									className="inline-flex items-center justify-center rounded-md border border-gray-300 bg-white px-3 py-2 text-sm font-medium leading-4 text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2"
								>
									<PlusIcon
										className="-ml-0.5 mr-2 h-4 w-4"
										aria-hidden="true"
									/>
									Add to Stock
								</button>
								<Button
									text="Log Transaction"
									onClick={tModal.toggle}
								/>
							</div>
						</div>
					}
					className={$extend("mt-8")}
				>
					<div className="grid h-full w-full grid-flow-row grid-cols-12 gap-2">
						{Array(100)
							.fill(true)
							.map((d, ix) => (
								<div
									key={ix}
									className={tw`h-12 bg-slate-200`}
								></div>
							))}
					</div>
					{/*  */}
				</Layout>
			</section>
			<TransactionDialog {...tModal} />
		</div>
	);
}

type UseModal = ReturnType<typeof useModal>;
function TransactionDialog({ visible, dismiss }: UseModal) {
	const { handleSubmit, control } = useForm({
		defaultValues: {
			name: "",
		},
	});

	const onSubmit = handleSubmit((vals) => {
		// ...
	});
	return (
		<Dialog
			open={visible}
			onClose={dismiss}
			className="absolute top-0 bottom-0 left-0 right-0 flex flex-col items-center justify-center bg-slate-600/30 backdrop-blur-sm transition duration-75"
		>
			<Dialog.Panel
				className={
					"container mx-auto max-w-xl rounded-md px-8 drop-shadow-2xl transition duration-150"
				}
			>
				<Layout
					Header={
						<div className="rounded-t bg-white/90 p-6 backdrop-blur-md">
							<Dialog.Title className={"text-xl font-medium"}>
								Log Purchase
							</Dialog.Title>
							<Dialog.Description className={"text-gray-600"}>
								Record the purchase taking place
							</Dialog.Description>
						</div>
					}
					className="divide-y bg-white"
				>
					<div className="px-6 py-6">
						<Input
							control={control}
							name="name"
							placeholder="Name"
						/>
					</div>
					<div className="px-6 py-4">
						<Button
							onClick={onSubmit}
							className={$extend("relative w-full")}
						>
							<span className="absolute inset-0 left-0 ml-2 inline-flex h-full items-center">
								<CurrencyEuroIcon className="h-auto w-6" />
							</span>
							<label>Record</label>
						</Button>
						<p className="mt-2 text-center text-xs text-gray-600">
							Lorem ipsum dolor sit amet, consectetur adipiscing
							elit.
						</p>
					</div>
				</Layout>
			</Dialog.Panel>
		</Dialog>
	);
}
