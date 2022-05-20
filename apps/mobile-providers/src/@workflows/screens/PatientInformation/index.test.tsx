import { render } from "@testing-library/react-native";
import React from "react";
import Screen from ".";

describe("Screen", () => {
	const onLogin = jest.fn();
	it("Renders correctly", () => {
		render(<Screen />);
	});
});
