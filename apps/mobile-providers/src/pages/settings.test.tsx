import React from "react";

import { fireEvent, render } from "@testing-library/react-native";
import Settings from "./settings";
import { ApplicationProvider, useApplication } from "../app/context/app";

describe("Login Screen", () => {
	it("Renders Correctly", () => {
		render(
			<ApplicationProvider>
				<Settings />
			</ApplicationProvider>
		);
	});

	// it("Change Language: ", () => {
	// 	const Child = () => {
	// 		const lang = useApplication((s) => s.settings.lang);
	// 		React.useEffect(() => {
	// 			expect(lang).toBeDefined();
	// 		}, [lang]);

	// 		return <Settings />;
	// 	};

	// 	const { getByTestId } = render(
	// 		<ApplicationProvider initialState={{ settings: { lang: "en" } }}>
	// 			<Child />
	// 		</ApplicationProvider>
	// 	);

	// 	// fireEvent.press(getByTestId("setting.languageOpt.sw"));
	// 	// fireEvent.press(getByTestId("setting.languageOpt.sw"));
	// });
});
