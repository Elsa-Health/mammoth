import React from "react";
import { render } from "@testing-library/react-native";
import { AppProvider } from "../../app/context/main";
import AssessmentHistory from ".";
import jestConfig from "../../../jest.config";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { ApplicationProvider } from "../../app/context/app";

const AHComponent = (props: any) => (
  <ApplicationProvider>
    <AppProvider>
      <AssessmentHistory />
    </AppProvider>
  </ApplicationProvider>
);
const Stack = createNativeStackNavigator();

describe("Assessment History", () => {
  it("renders correctly", () => {
    render(
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen name="assessment" component={AHComponent} />
        </Stack.Navigator>
      </NavigationContainer>
    );
  });
});
