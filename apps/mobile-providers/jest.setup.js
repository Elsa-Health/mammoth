jest.mock("@react-navigation/native", () => ({
	...jest.requireActual("@react-navigation/native"),
	useNavigation: () => ({ goBack: jest.fn() }),
	useRoute: () => ({
		params: {},
	}),
}));

jest.mock("@react-native-async-storage/async-storage", () =>
	require("@react-native-async-storage/async-storage/jest/async-storage-mock")
);
jest.mock("react-native/Libraries/EventEmitter/NativeEventEmitter");

/**
 * Mocking the react native's firebase / firestore
 */
jest.mock("@react-native-firebase/firestore", () => {
	return {
		__esModule: true,
		default: jest.fn(() => ({
			collection: jest.fn(),
		})),
	};
});

jest.mock("react-native-permissions", () =>
	require("react-native-permissions/mock")
);
