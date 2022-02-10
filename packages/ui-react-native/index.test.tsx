import React from "react";
import { render } from "@testing-library/react-native";
import { Label } from ".";

describe("Sample testing", () => {
	it("Component works", () => {
		render(<Label>Testing!</Label>);
	});
});
