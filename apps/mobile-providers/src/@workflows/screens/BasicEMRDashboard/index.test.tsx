import { render } from "@testing-library/react-native";
import React from "react";
import Screen from ".";

describe("Screen", () => {
	const onNewPatient = jest.fn();
	const onOpenFile = jest.fn();
	it("Renders correctly", () => {
		render(
			<Screen
				entry={{ fullName: "Test" }}
				actions={{ onNewPatient, onOpenFile }}
			/>
		);
	});
});
