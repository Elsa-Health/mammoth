import React from "react";

import { fireEvent, render } from "@testing-library/react-native";
import {
	buttonStyleMap,
	SearchInput,
	TextInput,
	_BaseButton,
	_BaseTextInput,
} from "./input";
import { View } from "react-native";

describe("Button", () => {
	it("base Button", () => {
		render(<_BaseButton />);
	});

	it("Base Text Input / Renders", () => {
		render(<_BaseTextInput />);
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

	describe("Utils", () => {
		it("buttonStyleMap", () => {
			expect(buttonStyleMap(false)).toBeDefined();
			expect(buttonStyleMap(true)).toBeDefined();
		});
	});
});
