import React from "react";

import { render } from "@testing-library/react-native";
import { View } from "react-native";
import { AppProvider } from "./main";

describe("Context :: Assessment Bank", () => {
	it("Provider renders correctly", () => {
		render(
			<AppProvider>
				<View />
			</AppProvider>
		);
	});
});
