import React from "react";
type FnList = { [fnName: string]: (...a: any[]) => any };

// FIXME:
export const withFlowContext = <T, A extends FnList>(
	Component: (props: { entry?: T; actions?: A }) => JSX.Element,
	k: {
		entry?: T;
		actions?: ({ navigation }: any) => A;
	} = {}
) => {
	return ({ navigation, route }: any) => {
		return (
			<Component
				entry={{ ...k.entry, ...(route?.params || {}) }}
				actions={k.actions?.({ navigation })}
			/>
		);
	};
};
