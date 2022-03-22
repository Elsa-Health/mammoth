import { render } from "@testing-library/react-native";
import React from "react";
import type { WorkflowScreen } from ".";
import { withFlowContext } from ".";

describe("Screen", () => {
	const navigation = jest.fn();
	const Screen = jest
		.fn()
		.mockImplementation((props: WorkflowScreen<{}, {}>) => <></>);
	it("Renders correctly", () => {
		render(
			// @ts-ignore
			withFlowContext(Screen, { entry: {}, actions: {} })({ navigation })
		);
	});
});
