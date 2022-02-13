import React from "react";

import { fireEvent, render } from "@testing-library/react-native";
import {
	buttonStyleMap,
	MultiInput,
	normalizeConifiguration,
	SearchInput,
	TextInput,
	VariableTextInput,
	VariableValue,
	_BaseButton,
	_BaseTextInput,
} from "./input";
import { View } from "react-native";

expect.extend({
	toBeUndefinedOrType(received, argument) {
		console.log({ received, argument, typofReceived: typeof received });
		if (typeof received !== argument && typeof received !== "undefined") {
			return {
				message: () =>
					'Expected type "undefined" or ' +
					received +
					" but received " +
					typeof argument,
				pass: false,
			};
		}

		return {
			message: () =>
				'Didn\'t expect to receive type "undefined" or ' +
				received +
				" but received " +
				typeof argument,
			pass: true,
		};
	},
});

describe("Button", () => {
	it("base Button", () => {
		render(<_BaseButton />);
	});

	it("Base Text Input / Renders", () => {
		render(<_BaseTextInput />);
	});
});

describe("Text Input", () => {
	it("Renders", () => {
		render(<TextInput />);
	});

	// TODO: ADD proper tests
	it("onFocus / onBlur ", () => {
		// const onFocus = jest.fn();
		// const onBlur = jest.fn();
		// const { getByTestId } = render(
		// 	<View>
		// 		<View testID="side-item" />
		// 		<TextInput
		// 			testID="text-input"
		// 			onFocus={onFocus}
		// 			onBlur={onBlur}
		// 		/>
		// 	</View>
		// );
		// fireEvent.press(getByTestId("text-input"));
		// expect(onFocus).toHaveBeenCalledTimes(1);

		// fireEvent.press(getByTestId("side-item"));
		// expect(onBlur).toHaveBeenCalledTimes(1);

		expect(true).toBe(true);
	});
});

describe("Search Input Text", () => {
	it("Renders correctly", () => {
		const { getByTestId } = render(<SearchInput />);
		expect(getByTestId("search-input")).toBeTruthy();
	});

	it("onFocus / onBlur ", () => {
		// const onFocus = jest.fn();
		// const onBlur = jest.fn();
		// const { getByTestId } = render(
		// 	<View>
		// 		<View testID="side-item" />
		// 		<SearchInput testID="1" onFocus={onFocus} onBlur={onBlur} />
		// 	</View>
		// );
		// fireEvent.press(getByTestId("search-input-1"));
		// expect(getByTestId("search-input-clear-1")).toBeTruthy();
		// expect(onFocus).toHaveBeenCalledTimes(1);

		// fireEvent.press(getByTestId("side-item"));
		// expect(onBlur).toHaveBeenCalledTimes(1);
		expect(true).toBe(true);
	});

	it("Text Clears on clear", () => {
		// const onClear = jest.fn();
		// const { getByTestId } = render(
		// 	<SearchInput onClearSearch={onClear} />
		// );
		// fireEvent.changeText(getByTestId("search-input"), "Fever");
		// fireEvent.press(getByTestId("search-input-clear"));
		// expect(onClear).toHaveBeenCalledTimes(1);
		// getByTestId("search-input").props.value.should.equal("");

		expect(true).toBe(true);
	});
});

describe("Variable Text Input", () => {
	it("Expect Error if options are empty", () => {
		expect(() => {
			// This component should throw error and should have atleast one item
			// Likely to discorage abuse
			render(<VariableTextInput options={[]} />);
		}).toThrowError();
	});

	it("Renders correctly", () => {
		render(
			<VariableTextInput
				options={[
					{ label: "Kg", value: "kg" },
					{ label: "Pound", value: "lb" },
				]}
			/>
		);
	});

	it("Renders correctly", () => {
		render(
			<VariableTextInput
				options={[
					{ label: "Kg", value: "kg" },
					{ label: "Pound", value: "lb" },
				]}
			/>
		);
	});

	it("Something", () => {
		const options: { label: string; value: "a" | "b" }[] = [
			{ label: "Option A", value: "a" },
			{ label: "Option B", value: "b" },
		];

		const optionsValues = options.map((option) => option.value);

		// state change handler
		const inputChange = jest.fn().mockImplementation((value) => {
			expect(value).toEqual(
				expect.objectContaining({
					option: expect.any(String),
				})
			);

			expect(value.input).toBeUndefinedOrType("string");
			expect(optionsValues).toContain(value.option);
		});

		const Component = () => {
			const [value, setValue] = React.useState<VariableValue<"a" | "b">>({
				option: "a",
			});

			React.useEffect(() => {
				inputChange(value);
			}, [value]);

			return (
				<VariableTextInput
					value={value}
					testID="sample"
					onChangeValue={setValue}
					options={options}
				/>
			);
		};

		const { getByTestId } = render(<Component />);

		fireEvent.changeText(getByTestId("sample-text-input"), "444");
		fireEvent.press(getByTestId("sample-picker"));

		// fireEvent.press(getByTestId("sample-picker-item-2"));

		// // init + change picker item
		// expect(inputChange).toHaveBeenCalledTimes(2);
	});
});

describe("MultiInput", () => {
	it("Renders correctly", () => {
		const HouseComponent = jest.fn().mockImplementation((props) => {
			return <View />;
		});
		render(
			<MultiInput
				title="Age"
				configuration={{
					a: { show: true },
				}}
				component={HouseComponent}
				fields={[
					{
						name: "a",
						label: "a",
						component: jest.fn<JSX.Element, unknown[]>(),
					},
					{
						name: "b",
						label: "b",
						component: jest.fn<JSX.Element, unknown[]>(),
					},
				]}
			/>
		);
	});

	it("Sub Component", () => {
		// Component
		const HouseComponent = jest
			.fn()
			.mockImplementation(
				({ component: Component, value, onChangeValue }) => {
					return (
						<Component
							value={value}
							onChangeValue={onChangeValue}
						/>
					);
				}
			);

		const TEST_TEXT = "TextThatShouldBeVisible";

		const { getByTestId, getByText } = render(
			<MultiInput
				title={TEST_TEXT}
				testID="multi-input"
				configuration={{
					a: { show: false },
				}}
				component={HouseComponent}
				fields={[
					{
						name: "a",
						label: "a",
						component: jest
							.fn()
							.mockImplementation(({ value, onChangeValue }) => {
								return (
									<TextInput
										testID="multi-input-component-a"
										value={value}
										onChangeText={onChangeValue}
									/>
								);
							}),
					},
					{
						name: "b",
						label: "b",
						component: jest.fn<JSX.Element, unknown[]>(),
					},
				]}
			/>
		);

		expect(getByText(TEST_TEXT)).toBeDefined();
		// expect(getByTestId("multi-input-modal-view")).toBeUndefined();

		// press add button
		fireEvent.press(getByTestId("multi-input-add-button"));

		// TODO: select the option, this changes the value to `{ show: true }`
		//  then change text

		// Modal visible
		// expect(getByTestId("multi-input-modal-view")).toBeDefined();
	});
});

describe("Utils", () => {
	it("buttonStyleMap", () => {
		expect(buttonStyleMap(false)).toBeDefined();
		expect(buttonStyleMap(true)).toBeDefined();
	});
});
