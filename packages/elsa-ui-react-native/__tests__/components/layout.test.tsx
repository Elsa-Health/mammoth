import React from "react";

import { fireEvent, render } from "@testing-library/react-native";
import { AltLayout, Layout } from "./layout";
// import { View } from "react-native";
// import { Pressable } from "./pressable";

// Mocking a navigation object
// const navigation = {
// 	canGoBack: jest.fn(),
// 	goBack: jest.fn(),
// };

describe("Layout", () => {
	it("Renders Correctly", () => {
		const TITLE = "DUMMY TITLE";
		const { getByText } = render(<Layout title={TITLE} />);

		expect(getByText(TITLE)).toBeTruthy();
	});

	// it("Back Button When `navigation` ", () => {
	// 	const BackIcon = jest.fn().mockImplementation(() => <View />);
	// 	const Stack = createNativeStackNavigator();

	// 	const ChildA = ({ navigation }: any) => {
	// 		return (
	// 			<Pressable
	// 				testID="__testHereBtn"
	// 				onPress={() => navigation.navigate("there")}
	// 			/>
	// 		);
	// 	};
	// 	const ChildB = ({ navigation }: any) => {
	// 		return (
	// 			<Layout
	// 				testID="__childB"
	// 				// @ts-ignore
	// 				backIcon={BackIcon}
	// 				navigation={navigation}
	// 			/>
	// 		);
	// 	};

	// 	const { getByTestId } = render(
	// 		<NavigationContainer>
	// 			<Stack.Navigator initialRouteName="here">
	// 				<Stack.Screen name="here" component={ChildA} />
	// 				<Stack.Screen name="there" component={ChildB} />
	// 			</Stack.Navigator>
	// 		</NavigationContainer>
	// 	);

	// 	fireEvent.press(getByTestId("__testHereBtn"));
	// 	expect(getByTestId("__childB")).toBeDefined();
	// 	fireEvent.press(getByTestId("__childB-back-button"));

	// 	expect(BackIcon).toBeCalledTimes(1);
	// });
});

describe("AltLayout", () => {
	it("Renders Correctly", () => {
		render(<AltLayout />);
	});
});
