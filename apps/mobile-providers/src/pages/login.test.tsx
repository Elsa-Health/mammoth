import React from "react";

import { render } from "@testing-library/react-native";
import Login from "./login";
import { ApplicationProvider } from "../app/context/app";

describe("Login Screen", () => {
	it("Renders Correctly", () => {
		render(
			<ApplicationProvider>
				<Login />
			</ApplicationProvider>
		);
	});
});
