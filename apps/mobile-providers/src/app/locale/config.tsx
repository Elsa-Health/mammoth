import React, { useState } from "react";
import i18n, { InitOptions } from "i18next";
import {
	useTranslation as usei18nTranslation,
	I18nextProvider,
} from "react-i18next";
import { View } from "react-native";

// Language files
import en from "./lang/en";
import sw from "./lang/sw";

// building the maps for the texts
import * as data from "../libs/data-fns";

import { Text } from "../../components";
import { useApplication } from "../context/app";
import shallow from "zustand/shallow";

i18n.init(
	{
		// setup the default language
		lng: "sw", // if you're using a language detector, do not define the lng option

		// might want to make this toggalable on build
		debug: false,
		fallbackLng: "en",
		resources: {
			en: {
				translation: en,
				"donpar-map": data.donparMap.translate("en"),
				symptoms: data.symptomsLocale.translate("en"),
			},
			sw: {
				translation: sw,
				"donpar-map": data.donparMap.translate("sw"),
				symptoms: data.symptomsLocale.translate("sw"),
			},
		},
		compatibilityJSON: "v3",
		interpolation: { escapeValue: false }, // React already does escaping
		// ...options
	},
	(err) => {
		if (err) {
			console.log("houston, we have a problem!");
			console.error(err);
		}
	}
);

export const useTranslation = () =>
	usei18nTranslation(undefined, { useSuspense: false });
export const LanguageProvider = ({
	options,
	children,
}: {
	options?: InitOptions;
	children: React.ReactNode;
}) => {
	const [ready, setReady] = useState(false);
	const lang = useApplication((s) => s.settings.lang, shallow);

	// Building the entire language part of the system
	React.useEffect(() => {
		setReady(true);
		// NOTE: Removes the configurations outside.. Something needs to happen here
	}, [options]);

	/**
	 * Listening to changes in the language
	 */
	React.useEffect(() => {
		setReady(false);
		i18n.changeLanguage(lang, (err) => {
			if (err) {
				console.log("LANG CHANGE // houston, we have a problem!");
				console.error(err);
			}

			setReady(true);
		});
	}, [lang]);

	if (!ready) {
		return (
			<View style={{ flex: 1 }}>
				{/* Loading the */}
				<Text>Loading translations to the application</Text>
			</View>
		);
	}

	return <I18nextProvider i18n={i18n}>{children}</I18nextProvider>;
};
