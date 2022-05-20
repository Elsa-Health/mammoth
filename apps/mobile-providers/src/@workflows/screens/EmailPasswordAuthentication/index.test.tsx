import { render } from "@testing-library/react-native";
import React from "react";
import EmailPasswordAuthenticationScreen from ".";

describe("EmailPasswordAuthentication", () => {
	const onLogin = jest.fn();
	it("Renders correctly", () => {
		render(<EmailPasswordAuthenticationScreen actions={{ onLogin }} />);
	});
});
