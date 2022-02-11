import React from "react";

import { fireEvent, render } from "@testing-library/react-native";

import App from "./app";
import { ApplicationProvider, useApplication } from "./app/context/app";
import { AppProvider } from "./app/context/main";
import { LanguageProvider } from "./app/locale/config";

jest.mock("react-native-qrcode-scanner", () => {
	return {
		__esModule: true,
		default: jest.fn(),
	};
});

describe("Home screen", () => {
	jest.mock("react-native-permissions", () =>
		require("react-native-permissions/mock")
	);
	it("Renders / Without Logging in", () => {
		render(
			<ApplicationProvider initialState={undefined}>
				<LanguageProvider>
					<AppProvider>
						<App />
					</AppProvider>
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
					<AppProvider>
						<App />
					</AppProvider>
				</LanguageProvider>
			</ApplicationProvider>
		);
	});

	it("Renders / Logged in / Language NOT Pre Selected / ", () => {
		render(
			<ApplicationProvider
				initialState={{ user: { name: "Test User", uid: "test-user" } }}
			>
				<LanguageProvider>
					<AppProvider>
						<App />
					</AppProvider>
				</LanguageProvider>
			</ApplicationProvider>
		);
	});

	it("Renders / Logged in / Language NOT Pre Selected / Asks Language Select When Not Defined", () => {
		const Child = (props: any) => {
			const lang = useApplication((s) => s.settings.lang);
			return (
				<LanguageProvider>
					<AppProvider>
						<App />
					</AppProvider>
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
});
