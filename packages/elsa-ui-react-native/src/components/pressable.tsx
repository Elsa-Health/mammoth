import React from "react";
import {
	ColorValue,
	Pressable as NativePressable,
	PressableProps as NativePressableProps,
	StyleSheet,
} from "react-native";

type PressableProps = { ripple_color?: ColorValue } & Omit<
	NativePressableProps,
	"android_ripple"
>;
export function Pressable({ ripple_color, ...props }: PressableProps) {
	return (
		<NativePressable
			android_ripple={{
				color: ripple_color || "#00000055",
				radius: 1000,
			}}
			hitSlop={8}
			{...props}
			style={[
				pressableStyle.container,
				pressableStyle.button,
				// @ts-ignore
				props.style || {},
			]}
		/>
	);
}

export const pressableStyle = StyleSheet.create({
	container: {
		display: "flex",
		flexDirection: "row",
		alignItems: "center",
		justifyContent: "space-around",
	},
	button: {
		borderRadius: 16,
		padding: 4,
		paddingHorizontal: 6,
	},
});
