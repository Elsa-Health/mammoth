import { useNavigation } from "@react-navigation/native";
import React from "react";
import { Layout, Text, View } from "../@libs/elsa-ui/components";

import { NativeBaseProvider, Radio } from "native-base";
import { Pressable } from "../@libs/elsa-ui/components/pressable";
import { useTranslation } from "react-i18next";
import { useApplication } from "../app/context/app";
import theme from "../theme";

/**
 * Resposible for setting the applications configurations including
 *  - Language Select
 *  - Back up configurations
 */
export default function SettingsPage() {
	const navigation = useNavigation();
	const [chosenLang, changeLang, logout] = useApplication((s) => [
		s.settings.lang,
		() => (lang: "en" | "sw") => s.applySettings((s) => ({ lang: lang })),
		s.logout,
	]);
	const [lang, setLang] = React.useState<"en" | "sw">(chosenLang || "en");

	const { t } = useTranslation("translation", { keyPrefix: "settings" });
	return (
		<NativeBaseProvider>
			<Layout title={t`title`} navigation={navigation}>
				{/* Change Language */}
				<View>
					<View style={{ paddingVertical: 12 }}>
						<Text
							font="bold"
							style={{ fontSize: 20, marginBottom: 4 }}
						>{t`language.title`}</Text>
						<Text>{t`language.description`}</Text>
					</View>
					<Radio.Group
						name="myRadioGroup"
						value={lang}
						testID="setting.languageOpt.RadioGroup"
						onChange={(nextValue) => setLang(nextValue)}
					>
						<Radio
							value="en"
							my={1}
							testID="setting.languageOpt.en"
						>
							English
						</Radio>
						<Radio
							value="sw"
							my={1}
							testID="setting.languageOpt.sw"
						>
							Kiswahili
						</Radio>
					</Radio.Group>
					<View
						style={{
							padding: 4,
							borderWidth: 1,
							borderColor: "#CCC",
							borderStyle: "dashed",
							marginVertical: 8,
						}}
					>
						<Text
							font="light"
							style={{ textAlign: "center" }}
						>{t`sample`}</Text>
					</View>
					<Pressable
						ripple_color={theme.color.primary.base}
						testID="settings.changeLangBtn"
						onPress={changeLang}
						style={[
							{
								borderWidth: 2,
								borderRadius: 10,
								paddingHorizontal: 16,
								paddingVertical: 6,
								borderColor: theme.color.primary.base,
							},
							{ justifyContent: "center" },
						]}
					>
						<Text
							font="bold"
							style={{ color: theme.color.primary.dark }}
						>{t`language.action`}</Text>
					</Pressable>
				</View>
				<View>
					<View style={{ paddingVertical: 12 }}>
						<Text
							font="bold"
							style={{ fontSize: 20, marginBottom: 4 }}
						>{t`logout.title`}</Text>
						<Text>{t`logout.description`}</Text>
					</View>
					<Pressable
						ripple_color="red"
						onPress={logout}
						style={[
							{
								borderWidth: 2,
								borderRadius: 10,
								paddingHorizontal: 16,
								paddingVertical: 6,
								borderColor: "red",
							},
							{ justifyContent: "center" },
						]}
					>
						<Text
							font="bold"
							style={{ color: "red" }}
						>{t`logout.action`}</Text>
					</Pressable>
				</View>
			</Layout>
		</NativeBaseProvider>
	);
}
