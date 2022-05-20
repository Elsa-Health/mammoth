import React from "react";

import { fireEvent, render } from "@testing-library/react-native";
import {
	RevealContent,
	SelectableChip,
	SectionedSelect,
	iconToggle,
} from "./misc";
import { View } from "react-native";

describe("SelectableChip", () => {
	it("Renders Correctly", () => {
		render(<SelectableChip />);
	});

	it("Chip Selected", () => {
		const onPress = jest.fn();
		const Demo = () => {
			const [selected, setSelected] = React.useState(false);

			return (
				<SelectableChip
					selected={selected}
					onChange={setSelected}
					onPress={onPress}
					testID="selectableChip"
				/>
			);
		};

		const { getByTestId } = render(<Demo />);
		fireEvent.press(getByTestId("selectableChip"));
		expect(onPress).toBeCalledTimes(1);
	});
});

describe("SelectedSelect", () => {
	it("Renders Correctly", () => {
		// @ts-ignore
		render(<SectionedSelect />);
	});

	describe("Utils", () => {
		it("iconToggle", () => {
			expect(render(iconToggle("close"))).toBeDefined();
			expect(render(iconToggle("check"))).toBeDefined();
			expect(render(iconToggle("search"))).toBeDefined();
			expect(render(iconToggle("keyboard-arrow-down"))).toBeDefined();
			expect(iconToggle("NONE_THE_OPTIONS")).toBeNull();
		});
	});
});

describe("RevealContent", () => {
	it("child visible => true", () => {
		const { getByTestId } = render(
			<RevealContent show={true}>
				<View testID="childContent" />
			</RevealContent>
		);

		expect(getByTestId("childContent")).toBeDefined();
	});

	it("child visible => false", () => {
		const { queryByTestId } = render(
			<RevealContent show={false}>
				<View testID="childContent" />
			</RevealContent>
		);

		expect(queryByTestId("childContent")).toBeNull();
	});
});
