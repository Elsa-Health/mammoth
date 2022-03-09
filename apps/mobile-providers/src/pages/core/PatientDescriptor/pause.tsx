import React from "react";
import { View } from "react-native";
import { Layout, Text } from "../../../@libs/elsa-ui/components";

/**
 * Methods to handle the pause state of the patient descriptor.
 */

export function usePauseScreen() {
	return {};
}

type PauseInfoScreenProps = {
	// Function that defines where the next screen should go
	next?: undefined | (() => void);

	// This is primarily to default to the pop action
	navigation: any;
};
/**
 * Screen to show information that would pause the data collection section
 *
 * All push based actions to the observable should be made through this screen
 */
export function PauseInfoScreen({ next }: PauseInfoScreenProps) {
	return (
		<Layout title="Pause Info">
			<View>
				<Text font="extra-black" style={{ fontSize: 20 }}>
					Patient Intake
				</Text>
				<View>
					<Text>
						Lorem ipsum dolor sit amet, consectetur adipiscing elit.
						Sed non rhoncus nibh. Vivamus at lorem varius turpis
						varius iaculis. Etiam consequat nec sem ullamcorper
						consequat. Vivamus vulputate nibh et euismod fringilla.
						Quisque ultrices vestibulum convallis. Phasellus
						placerat condimentum tincidunt. Duis eu erat sapien.
						Quisque tincidunt porta mi quis elementum. Sed elementum
						odio at condimentum mollis.
					</Text>
				</View>
			</View>
			<View>
				<Text font="extra-black" style={{ fontSize: 20 }}>
					Medical History
				</Text>
				<View>
					<Text>
						Lorem ipsum dolor sit amet, consectetur adipiscing elit.
						Sed non rhoncus nibh. Vivamus at lorem varius turpis
						varius iaculis. Etiam consequat nec sem ullamcorper
						consequat. Vivamus vulputate nibh et euismod fringilla.
						Quisque ultrices vestibulum convallis. Phasellus
						placerat condimentum tincidunt. Duis eu erat sapien.
						Quisque tincidunt porta mi quis elementum. Sed elementum
						odio at condimentum mollis.
					</Text>
				</View>
			</View>
		</Layout>
	);
}
