import React from "react";
import { Pressable, View } from "react-native";
import { Button, Divider } from "react-native-paper";
import { Layout, Text } from "../../../@libs/elsa-ui/components";

import dayjs from "dayjs";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import theme from "../../../theme";

import * as data from "../../../@libs/data-fns";
import { ScrollView } from "react-native-gesture-handler";

// text | numeric-units | option | select

type ValOptions = "text" | "numeric-units" | "option" | "select";

type ValType<Items extends string> =
	| {
			type: "text";
	  }
	| { type: "option"; options: Items[] }
	| { type: "select"; options: Items[] }
	| { type: "numeric-units"; units: Items }
	| {
			type: "panel";
			items: {
				[name: string]: ValType<Items>;
			};
	  };

type ValResultType = { testId: string } & (
	| {
			type: "text";
			result: string;
	  }
	| { type: "option"; result: string }
	| { type: "numeric-units"; result: number }
	| { type: "select"; result: string[] }
	| {
			type: "panel";
			results: {
				[name: string]: ValResultType;
			};
	  }
);

type ValTest = {};

type PosNegTest = ValType<"positive" | "negative" | "inconclusive">;

const posNegTest: PosNegTest = {
	type: "option",
	options: ["positive", "negative", "inconclusive"],
};

const hPyResult = {
	testId: "hpy",
	result: "negative",
};

const urinalysis: ValType<string> = {
	type: "panel",
	items: {
		ph: {
			type: "numeric-units",
			units: "",
		},
	},
};

const ironSerumResult = {
	testId: "iron-serum",
	result: "",
};

const urinalysisResult = {
	invId: "unrinalysis",
	type: "",
	results: {},
};

// -------------------------------

type BooleanTest = {
	name: string;
	type: "option";
	result: "positive" | "nevative" | "inconclusive";
};

type RangeTest = {
	name: string;
	type: "range";
	result: "low" | "normal" | "high";
};

type NumericTest = {
	name: string;
	type: "numeric";
	result: number;
	units: string;
};

type NormalityTest = {
	name: string;
	type: "normality";
	result: "normal" | "abnormal" | "inconclusive";
};

type DescriptiveTest = {
	name: string;
	type: "text";
	result: string;
};

type SingleTests =
	| BooleanTest
	| RangeTest
	| NumericTest
	| NormalityTest
	| DescriptiveTest;

type PanelTest = {
	name: string;
	type: "panel";
	result: {
		[testId: string]: SingleTests;
	};
};

type TestType = "numeric" | "boolean" | "range";

type Test = {
	name: string;
	type: TestType;
};

const tests = [
	{
		name: "C-Reactive Protein",
		type: "numeric",
		units: "mg/dL",
	},
	{
		name: "Urinalysis",
	},
];

export default function InvestigationResultsForm({
	entry: { investigation },
	actions: $,
}: WorkflowScreen<
	{
		investigation: PatientInvestigation;
	},
	{
		onOpenInvestigation: (investigation: PatientInvestigation) => void;
	}
>) {
	console.log({ investigation });
	return (
		<Layout title="Patient Visit" style={{ padding: 0 }}>
			<ScrollView contentContainerStyle={{ paddingHorizontal: 24 }}>
				<Text>
					Lorem ipsum dolor, sit amet consectetur adipisicing elit.
					Aspernatur minima quod officiis placeat, excepturi
					reprehenderit ullam voluptates. Officiis sapiente vel odio
					architecto assumenda, magnam est corporis non ducimus
					eligendi rerum.
				</Text>
			</ScrollView>
		</Layout>
	);
}
