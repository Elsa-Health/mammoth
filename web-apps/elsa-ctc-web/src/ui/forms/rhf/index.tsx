import {
	useController,
	Control,
	FieldValues,
	Path,
	ValidationRule,
	Controller,
	ControllerProps,
} from "react-hook-form";
import { Input as BaseInput, InputProps } from "../input";
import { ExclamationCircleIcon } from "@heroicons/react/solid";
import { $extend, classNames } from "@ui/utils";

export function Input<TF extends FieldValues, F extends Path<TF>>({
	name,
	control,
	rules,
	...props
}: {
	control: Control<TF, any>;
	name: F;
	rules?: ControllerProps<TF, F>["rules"];
} & Omit<InputProps, "name">) {
	const { field, fieldState } = useController({ control, name, rules });
	return (
		<>
			<BaseInput
				labelClassName={(cls) =>
					classNames(
						fieldState.error
							? "block text-sm font-medium text-red-400"
							: cls
					)
				}
				{...props}
				{...field}
				ref={field.ref}
				className={(cls) =>
					classNames(
						cls,
						fieldState.error &&
							"border-red-400 focus:border-red-400 focus:ring-red-500 "
					)
				}
				right={
					fieldState.error?.message && (
						<div className="h-full px-2 inline-flex flex-col justify-center">
							<ExclamationCircleIcon className="h-5 w-auto text-red-400" />
						</div>
					)
				}
			/>
			{fieldState.error?.message && (
				<label className="text-sm text-red-500">
					{fieldState.error.message}
				</label>
			)}
		</>
	);
}
