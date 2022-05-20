import { render } from "@testing-library/react-native";
import React from "react";
import { withFlowContext } from "./wrapper";

describe("Screen", () => {
	const navigation = jest.fn();
	const Screen = jest
		.fn()
		.mockImplementation((props: WorkflowScreen<{}, {}>) => <></>);
	it("Renders correctly", () => {
		render(
			withFlowContext(Screen, { entry: {}, actions: {} })({ navigation })
		);
	});
});
