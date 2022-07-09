/* eslint-disable @next/next/no-img-element */
import { LockClosedIcon } from "@heroicons/react/solid";
import { useForm } from "react-hook-form";

import router from "next/router";
import * as qs from "query-string";
import { Input } from "@ui/forms/rhf";
import { Button } from "@ui/forms/buttons";
import { $extend } from "@ui/utils";
import regex from "@bagpack/regex";
import { Layout } from "@ui/layout";
import { useSession } from "next-auth/react";

export default function SignIn() {
	const { data: session } = useSession();
	const { handleSubmit, control, register, formState } = useForm({
		defaultValues: {
			phoneNumber: "",
		},
	});

	const onSubmit = handleSubmit(({ phoneNumber }) => {
		// authenticate the phoneNumber
		// 1. Check if the number exists.
		//  2. if it does, send OTP and redirect user to the verify screen page
		const urlPlusQuery =
			"/verify-user?" + qs.stringify({ phone: phoneNumber });
		router.replace("/app");
	});

	/**
	 * Sign In with Google
	 * @returns
	 */
	const onSignInWithGoogle = () => router.replace("/app");

	return (
		<>
			<div className="flex min-h-screen items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
				<Layout
					wrapperClassName={
						"max-w-lg py-12 px-4 sm:px-6 lg:px-8 mx-auto container"
					}
					Header={
						<div className="flex flex-row items-center justify-between py-4">
							<h2 className="w-36 text-3xl font-medium text-gray-900">
								Sign In
							</h2>
							<div>
								<img
									src="/assets/svg/elsa-logo-colored-short.svg"
									alt="Elsa Logo"
									className="h-12"
								/>
							</div>
						</div>
					}
					className="w-full space-y-4 py-4"
				>
					<form className="w-full space-y-6" action="#" method="POST">
						<Input
							label="Phone Number"
							control={control}
							name="phoneNumber"
							placeholder="Ex. +255734123456"
							rules={{
								required: {
									value: true,
									message: "Required",
								},
								pattern: {
									value: regex.phone(),
									message:
										"Should be in proper format. Start with +255 or 0",
								},
							}}
						/>

						<div className="w-full">
							<Button
								className={$extend("group w-full")}
								onClick={onSubmit}
							>
								<span className="absolute inset-y-0 left-0 flex items-center pl-3">
									<LockClosedIcon
										className="h-5 w-5 text-purple-500 group-hover:text-purple-400"
										aria-hidden="true"
									/>
								</span>
								Sign in
							</Button>
						</div>
					</form>
					<div className="relative mt-6">
						<div
							className="absolute inset-0 flex items-center"
							aria-hidden="true"
						>
							<div className="w-full border-t border-gray-300" />
						</div>
						<div className="relative flex justify-center text-sm">
							<span className="bg-white px-2 text-gray-500">
								Or continue with
							</span>
						</div>
					</div>
					<div>
						<button
							onClick={onSignInWithGoogle}
							className="group relative flex w-full justify-center rounded-md border border-transparent bg-gray-200 py-2 px-4 text-sm font-medium text-white hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-300 focus:ring-offset-2"
						>
							{/* Google Icon */}
							<GoogleIcon className="h-6 w-6" />
						</button>
					</div>
				</Layout>
			</div>
		</>
	);
}

const GoogleIcon = ({ className }: { className: string }) => (
	<svg
		xmlns="http://www.w3.org/2000/svg"
		viewBox="0 0 48 48"
		className={className}
	>
		<path
			fill="#fbc02d"
			d="M43.611,20.083H42V20H24v8h11.303c-1.649,4.657-6.08,8-11.303,8c-6.627,0-12-5.373-12-12	s5.373-12,12-12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C12.955,4,4,12.955,4,24s8.955,20,20,20	s20-8.955,20-20C44,22.659,43.862,21.35,43.611,20.083z"
		/>
		<path
			fill="#e53935"
			d="M6.306,14.691l6.571,4.819C14.655,15.108,18.961,12,24,12c3.059,0,5.842,1.154,7.961,3.039	l5.657-5.657C34.046,6.053,29.268,4,24,4C16.318,4,9.656,8.337,6.306,14.691z"
		/>
		<path
			fill="#4caf50"
			d="M24,44c5.166,0,9.86-1.977,13.409-5.192l-6.19-5.238C29.211,35.091,26.715,36,24,36	c-5.202,0-9.619-3.317-11.283-7.946l-6.522,5.025C9.505,39.556,16.227,44,24,44z"
		/>
		<path
			fill="#1565c0"
			d="M43.611,20.083L43.595,20L42,20H24v8h11.303c-0.792,2.237-2.231,4.166-4.087,5.571	c0.001-0.001,0.002-0.001,0.003-0.002l6.19,5.238C36.971,39.205,44,34,44,24C44,22.659,43.862,21.35,43.611,20.083z"
		/>
	</svg>
);
