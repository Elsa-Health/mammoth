import React from "react";
import { ScrollView } from "react-native";
import { Layout } from "../../components";
import { Button } from "../../components/input";
import { Text } from "../../components/typography";

const OnboardingScreen = ({
	entry: d,
	actions: $,
}: {
	entry: { user: UserObject };
	actions: {
		onHome: () => void;
		onComplete: (d?: boolean) => void;
		onSend: (num: number) => void;
	};
}) => {
	return (
		<Layout>
			<ScrollView>
				<Text>Onboarding {d.user.fullName}</Text>

				<Button onPress={() => $.onComplete(true)}>
					<Text>Yes?</Text>
				</Button>
				<Button onPress={() => $.onHome()}>
					<Text>Home</Text>
				</Button>
				<Button onPress={() => $.onSend(9)}>
					<Text>Yes?</Text>
				</Button>
			</ScrollView>
		</Layout>
	);
};

export default OnboardingScreen;
