import React from "react";

import { render } from "@testing-library/react-native";
import { View } from "react-native";

import { SymptomAssessmentSequenceProvider } from "./assessment";

describe("Context :: Assessment", () => {
	it("Provider Renders Correctly", () => {
		const { getByTestId } = render(
			<SymptomAssessmentSequenceProvider>
				<View testID="dummyView" />
			</SymptomAssessmentSequenceProvider>
		);

		expect(getByTestId("dummyView")).toBeDefined();
	});
});
