import React from "react";
import { ScrollView } from "react-native";
import { Layout } from "../../@libs/elsa-ui/components";
import { Button } from "../../@libs/elsa-ui/components/input";
import { Text } from "../../@libs/elsa-ui/components/typography";

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
