import { render } from "@testing-library/react-native";
import theme, { fontFamiliStyleType, fontFamilyStyle } from "../../src/theme";

describe("Themeing components work", () => {
	it("Object defined", () => {
		expect(theme).toBeDefined();
	});

	it("fontFamilyStyle", () => {
		[true, false].map((italic) => {
			(
				[
					"black",
					"bold",
					"extra-black",
					"light",
					"medium",
					"normal",
				] as fontFamiliStyleType[]
			).map((font) => {
				expect(fontFamilyStyle({ italic, font })).toBeTruthy();
			});
		});
	});
});
