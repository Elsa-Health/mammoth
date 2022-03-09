import React from "react";
import { render } from "@testing-library/react-native";
import { useTranslation } from "react-i18next";
import { getCondition, getSymptomLocalFunction } from "./symptoms";
import * as data from "../@libs/data-fns";

describe("Symptoms Utils", () => {
	it("getCondition", () => {
		expect(getCondition("anaemia")).toEqual({
			id: "anaemia",
			condition: "Anaemia",
		});

		// @ts-ignore
		expect(getCondition("THIS_DOESNT_EXIST_91321")).toBeUndefined();
	});

	it("getSymptomIdTFunction / with Translate Function", () => {
		const t = (symptom: string) =>
			data.symptomsLocale.translate("en")[symptom];
		const getSymptomById = getSymptomLocalFunction(t);
		const { symptom, description } = t("fever");

		expect(getSymptomById("fever")).toEqual({
			description,
			symptom,
		});
		expect(getSymptomById("THIS_DOESNT_EXIST_91321")).toBeUndefined();
	});
});
