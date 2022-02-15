import React from "react";
import { render } from "@testing-library/react-native";
import {
	BodyViewIllustration,
	HealthSolutionIllustration,
} from "./illustrations";

describe("Illustrations", () => {
	it("ElsaIcon", () => {
		render(<HealthSolutionIllustration />);
	});
	it("ElsaColorableIcon", () => {
		render(<BodyViewIllustration />);
	});
});
