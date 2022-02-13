import React from "react";

import { fireEvent, render } from "@testing-library/react-native";

import App, { BaseApp } from "./app";
import { ApplicationProvider, useApplication } from "./app/context/app";
import { AppProvider } from "./app/context/main";
import { LanguageProvider } from "./app/locale/config";

describe("Home screen", () => {
	it("Renders Correctly", () => {
		render(<App />);
	});

	it("Renders / Without Logging in", () => {
		render(
			<ApplicationProvider>
				<LanguageProvider>
					<BaseApp />
				</LanguageProvider>
			</ApplicationProvider>
		);
	});

	it("Renders / Logged in / Language Pre Selected", () => {
		render(
			<ApplicationProvider
				initialState={{
					user: { name: "Test User", uid: "test-user" },
					settings: { lang: "en" },
				}}
			>
				<LanguageProvider>
					<BaseApp />
				</LanguageProvider>
			</ApplicationProvider>
		);
	});

	it("Renders / Logged in / Language NOT Pre Selected", () => {
		const Child = (props: any) => {
			const lang = useApplication((s) => s.settings.lang);
			React.useEffect(() => {
				expect(lang).toBeUndefined();
			}, []);
			return (
				<LanguageProvider>
					<BaseApp />
				</LanguageProvider>
			);
		};

		render(
			<ApplicationProvider
				initialState={{ user: { name: "test-user", uid: "test-user" } }}
			>
				<Child />
			</ApplicationProvider>
		);
	});

	it("Navigate to New Assessment", () => {});

	it("Navigate to Assessment History", () => {});

	it("Navigate to Settings", () => {});
});
