/**
 * This is the application of the user that is the section of
 * creating the loggeed in user information
 */
import React from "react";
import { Layout, Text } from "../@libs/elsa-ui/components";

import QRCodeScanner from "react-native-qrcode-scanner";
import { BarCodeReadEvent, RNCamera } from "react-native-camera";
import { TouchableOpacity, StyleSheet, View, ToastAndroid } from "react-native";
import theme from "../theme";
import { authenticate } from "../app/utils";
import { useApplication } from "../app/context/app";

import _ from "lodash";
import { useTranslation } from "react-i18next";

export default function Login() {
	const login = useApplication((s) => s.login);
	const onSuccess = React.useCallback((e: BarCodeReadEvent) => {
		authenticate(e.data)
			.then((info) => {
				login({
					name:
						_.upperFirst(info.firstName) +
						" " +
						_.upperFirst(info.lastName),
					uid: info.id,
				});
			})
			.catch((err) => {
				ToastAndroid.show(err.message, 3000);
			});
	}, []);

	const { t } = useTranslation("translation", { keyPrefix: "login" });

	return (
		<Layout title={t`title`} style={{ padding: 0 }}>
			<QRCodeScanner
				onRead={onSuccess}
				showMarker
				customMarker={
					<View
						style={{
							borderColor: theme.color.secondary.light,
							borderWidth: 1,
							width: 250,
							height: 250,
							borderRadius: 5,
						}}
					/>
				}
				topContent={
					<Text style={styles.centerText}>{t`description`}</Text>
				}
			/>
		</Layout>
	);
}

const styles = StyleSheet.create({
	centerText: {
		flex: 1,
		fontSize: 18,
		padding: 32,
		color: "#777",
	},
});
