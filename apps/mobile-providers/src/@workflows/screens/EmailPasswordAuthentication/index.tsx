import React from "react";
import {
	ScrollView,
	ToastAndroid,
	useWindowDimensions,
	View,
} from "react-native";
import { ElsaIcon } from "../../../assets/vectors";
import { Layout } from "../../../@libs/elsa-ui/components";
import { Text } from "../../../@libs/elsa-ui/components/typography";

import { TextInput, Button } from "react-native-paper";

function loginUser(email: string, _: string): UserObject {
	return {
		email,
		id: "ff9uewons",
		fullName: "Thomas Micheal",
	};
}

type Props = {
	actions: { onLogin: (uo: UserObject) => void };
};

const EmailPasswordAuthenticationScreen = ({ actions }: Props) => {
	const [username, setUsername] = React.useState("");
	const [password, setPassword] = React.useState("");
	const [loading, setLoading] = React.useState(false);

	const { height } = useWindowDimensions();
	const handleLogin = () => {
		const user = loginUser(username, password);
		setLoading(true);
		setTimeout(() => actions.onLogin(user), 0);

		// TODO: set loading false when failed operation
	};

	const handleForgotPassword = () => {
		ToastAndroid.show("Forgot password", ToastAndroid.SHORT);
	};
	return (
		<Layout hideHeader>
			<ScrollView
				contentContainerStyle={{
					paddingTop: height * 0.1,
				}}
				style={{ flex: 1, backgroundColor: "#FFF" }}
			>
				<View
					style={{
						display: "flex",
						alignItems: "center",
						paddingVertical: 20,
						justifyContent: "center",
					}}
				>
					<ElsaIcon style={{ width: 120, height: 120 }} />
				</View>
				<View style={{ marginTop: "10%" }}>
					<Text
						font="extra-black"
						style={{ fontSize: 24, textAlign: "center" }}
					>
						Elsa Health Assistant
					</Text>
					<View style={{ paddingVertical: 8 }}>
						<TextInput
							mode="outlined"
							label="Email"
							onChangeText={(text) => setUsername(text)}
							value={username}
						/>
						<TextInput
							style={{ marginTop: 4 }}
							mode="outlined"
							label="Password"
							secureTextEntry
							onChangeText={(text) => setUsername(text)}
							value={username}
						/>
					</View>
					<View style={{ paddingVertical: 8 }}>
						<Button
							style={{
								alignSelf: "flex-start",
							}}
							uppercase={false}
							mode="text"
							compact
							onPress={handleForgotPassword}
						>
							Forgot password?
						</Button>
					</View>
					<Button
						loading={loading}
						mode="contained"
						onPress={handleLogin}
					>
						{loading ? "Loading ..." : "Login"}
					</Button>
				</View>
			</ScrollView>
		</Layout>
	);
};

export default EmailPasswordAuthenticationScreen;
