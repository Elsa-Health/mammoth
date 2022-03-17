// jest.config.js
module.exports = {
	preset: "react-native",
	// transform: {
	//   "^.+\\.jsx$": "babel-jest",
	//   "^.+\\.tsx?$": "ts-jest",
	// },
	moduleFileExtensions: ["ts", "tsx", "js", "jsx", "json", "node"],

	setupFiles: [
		"<rootDir>/jest.setup.js",
		"./node_modules/react-native-gesture-handler/jestSetup.js",
	],
	transformIgnorePatterns: [
		"node_modules/(?!(jest-)?@?react-native|@react-native-community|@react-navigation)/",
	],
};
