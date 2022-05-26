module.exports = {
  presets: [
    'module:metro-react-native-babel-preset',
    '@babel/preset-typescript',
  ],
  plugins: [
    // ...
    // This needs to be listed last
    'react-native-reanimated/plugin',
  ],
};
