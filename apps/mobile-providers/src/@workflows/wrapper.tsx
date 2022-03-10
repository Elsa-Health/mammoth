import React from "react";
import create from "zustand";
import createContext from "zustand/context";

// TODO: convert the provider to be a the GODLIKE contexst
const { Provider, useStore } = createContext();
const createStore =
	<E extends object>(entry: E) =>
	() =>
		create<E>((set, get) => entry);

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
		const entryData = { ...k.entry, ...(route?.params || {}) };
		return (
			<Provider createStore={createStore(entryData)}>
				<Component
					entry={entryData}
					actions={k.actions?.({ navigation })}
				/>
			</Provider>
		);
	};
};

// export { useStore as useWorkflowContext };
