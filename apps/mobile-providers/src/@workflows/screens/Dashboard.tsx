import React from "react";
import { ScrollView } from "react-native";
import { Layout } from "../../components";
import { Button } from "../../components/input";
import { Text } from "../../components/typography";

const DashboardScreen = () => {
	return (
		<Layout>
			<ScrollView>
				<Text>Onboarding</Text>

				<Button>
					<Text>Login</Text>
				</Button>
			</ScrollView>
		</Layout>
	);
};

export default DashboardScreen;
