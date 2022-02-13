import React from "react";
import { render } from "@testing-library/react-native";
import { CircleBar, SelectedConditionSummary } from "./components";
import { AppProvider } from "../../../app/context/main";
import { SymptomAssessmentSequenceProvider } from "../../../app/context/assessment";

describe("LiveScreen :: Components", () => {
	it("<SelectedConditionSummary />", () => {
		render(
			<AppProvider>
				<SymptomAssessmentSequenceProvider>
					<SelectedConditionSummary
						condition={{
							absentSymptoms: ["vomiting"],
							presentingSymptoms: ["jaundice"],
						}}
					/>
				</SymptomAssessmentSequenceProvider>
			</AppProvider>
		);
	});

	it("<CircleBar />", () => {
		render(<CircleBar count={10} total={30} />);
	});
});
