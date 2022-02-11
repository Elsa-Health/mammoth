import React from "react";
import { render } from "@testing-library/react-native";
import { AppProvider } from "../../app/context/main";
import AssessmentHistory from ".";
import jestConfig from "../../../jest.config";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { ApplicationProvider } from "../../app/context/app";
import { LanguageProvider } from "../../app/locale/config";

const Stack = createNativeStackNavigator();

describe("Assessment History", () => {
	const Component = (
		<ApplicationProvider
			initialState={{
				user: { name: "test-user", uid: "test-user" },
				settings: { lang: "en" },
			}}
		>
			<LanguageProvider>
				<AppProvider>
					<NavigationContainer>
						<Stack.Navigator>
							<Stack.Screen
								name="assessment.history"
								component={AssessmentHistory}
							/>
						</Stack.Navigator>
					</NavigationContainer>
				</AppProvider>
			</LanguageProvider>
		</ApplicationProvider>
	);

	it("renders correctly", () => {
		render(Component);
	});
});
