/**
 * Metro configuration for React Native
 * https://github.com/facebook/react-native
 *
 * @format
 */

const fs = require("fs");
const path = require("path");
const getDevPaths = require("get-dev-paths");
const projectRoot = __dirname;

module.exports = {
	transformer: {
		getTransformOptions: async () => ({
			transform: {
				experimentalImportSupport: false,
				inlineRequires: true,
			},
		}),
	},
	// resolver: {
	// 	extraNodeModules: {
	// 		"react-native": path.resolve(
	// 			__dirname,
	// 			"node_modules/react-native"
	// 		),
	// 		"@react-navigation/native": path.resolve(
	// 			__dirname,
	// 			"../../node_modules/@react-navigation/native"
	// 		),

	// 		"@react-navigation/native-stack": path.resolve(
	// 			__dirname,
	// 			"../../node_modules/@react-navigation/native-stack"
	// 		),
	// 	},
	// },
	// New way
	watchFolders: Array.from(
		new Set(getDevPaths(projectRoot).map(($) => fs.realpathSync($)))
	),
};
