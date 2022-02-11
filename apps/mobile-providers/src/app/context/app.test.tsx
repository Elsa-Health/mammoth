import React from "react";

import { render } from "@testing-library/react-native";
import { View } from "react-native";
import { ApplicationProvider, AppSettings, useApplication } from "./app";
import { LanguageProvider } from "../locale/config";
import { AppProvider } from "./main";

describe("Context :: App", () => {
	it("Provider Renders Correctly", () => {
		const { getByTestId } = render(
			<ApplicationProvider
				initialState={{
					user: { name: "test-user", uid: "test-user" },
					settings: { lang: "en" },
				}}
			>
				<View testID="dummyView" />
			</ApplicationProvider>
		);

		expect(getByTestId("dummyView")).toBeDefined();
	});

	it("User + Settings State Initializable", () => {
		const user = { name: "test-user", uid: "test-user" };
		const settings: AppSettings = { lang: "en" };

		const Child = (props: any) => {
			const user = useApplication((s) => s.user);
			const settings = useApplication((s) => s.settings);

			expect(user).toEqual(user);
			expect(settings).toEqual(settings);
			return <View />;
		};

		render(
			<ApplicationProvider
				initialState={{
					user,
					settings,
				}}
			>
				<Child />
			</ApplicationProvider>
		);
	});

	it("Can login", () => {
		const user = { name: "test-user", uid: "test-user" };
		const Child = (props: any) => {
			const login = useApplication((s) => s.login);
			const $user = useApplication((s) => s.user);

			React.useEffect(() => {
				login(user).then(() => {
					expect($user).toEqual(user);
				});
			}, []);

			return <View />;
		};

		render(
			<ApplicationProvider>
				<Child />
			</ApplicationProvider>
		);
	});

	it("Can logout", () => {
		const Child = (props: any) => {
			const logout = useApplication((s) => s.logout);
			const $user = useApplication((s) => s.user);

			React.useEffect(() => {
				logout().then(() => {
					expect($user).toBeUndefined();
				});
			}, []);

			return <View />;
		};

		render(
			<ApplicationProvider>
				<Child />
			</ApplicationProvider>
		);
	});

	it("Can Apply Settings / Language", () => {
		const Child = (props: any) => {
			const applySettings = useApplication((s) => s.applySettings);
			const lang = useApplication((s) => s.settings.lang);

			React.useEffect(() => {
				applySettings((s) => ({ lang: "en" }));

				if (lang !== undefined) {
					expect(lang).toBe("en");
				}
			}, [lang]);

			return <View />;
		};

		render(
			<ApplicationProvider>
				<Child />
			</ApplicationProvider>
		);
	});
});
