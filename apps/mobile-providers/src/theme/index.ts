export type fontFamiliStyleType =
	| "light"
	| "normal"
	| "medium"
	| "bold"
	| "black"
	| "extra-black";
export const fontFamilyStyle = (
	props: { italic?: boolean; font?: fontFamiliStyleType } = {}
) => {
	if (props.italic !== undefined) {
		if (props.italic) {
			// italic fonts
			switch (props.font || "normal") {
				case "light":
					return "AvenirLTStd-LightOblique";
				case "medium":
					return "AvenirLTStd-MediumOblique";
				case "bold":
					return "AvenirLTStd-HeavyOblique";
				case "black":
					return "AvenirLTStd-BookOblique";
				case "extra-black":
					return "AvenirLTStd-BlackOblique";

				case "normal":
				default:
					return "AvenirLTStd-Oblique";
			}
		}
	}

	switch (props.font || "normal") {
		case "light":
			return "AvenirLTStd-Light";
		case "medium":
			return "AvenirLTStd-Medium";
		case "bold":
			return "AvenirLTStd-Heavy";
		case "black":
			return "AvenirLTStd-Book";
		case "extra-black":
			return "AvenirLTStd-Black";

		case "normal":
		default:
			return "AvenirLTStd-Roman";
	}
};

export default {
	/**
	 * Created from:
	 * https://material.io/resources/color/#!/?view.left=0&view.right=1&primary.color=4666ae&secondary.color=00796B
	 */
	color: {
		primary: {
			base: "#4665AF",
			light: "#7993e0",
			dark: "#8456A3",
			text: "#ffffff",
		},
		secondary: {
			base: "#5558A6",
			light: "#4BB8E9",
			dark: "#5558A6", // can change in the future
			text: "#000",
		},
	},

	typography: {
		fontFamilyStyle,
	},
};
