/**
 * Metro configuration for React Native
 * https://github.com/facebook/react-native
 *
 * @format
 */
const fs = require("fs");
const getDevPaths = require("get-dev-paths");

const projectRoot = __dirname;
const watchFolders = Array.from(
  new Set(getDevPaths(projectRoot).map(($) => fs.realpathSync($)))
);

// Seeing the folders to watch
console.log(watchFolders);

module.exports = {
  transformer: {
    getTransformOptions: async () => ({
      transform: {
        experimentalImportSupport: false,
        inlineRequires: true,
      },
    }),
    getProjectRoots: () =>
      Array.from(
        new Set(getDevPaths(projectRoot).map(($) => fs.realpathSync($)))
      ),
    watchFolders: [projectRoot, ...watchFolders],
  },
};
