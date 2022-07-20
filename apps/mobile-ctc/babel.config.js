module.exports = {
  presets: [
    'module:metro-react-native-babel-preset',
    '@babel/preset-typescript',
    ['@babel/preset-env', {targets: {node: 'current'}}],
  ],
  plugins: [
    // ...
    // This needs to be listed last
    'react-native-reanimated/plugin',
  ],
  env: {
    production: {
      plugins: ['transform-remove-console'],
    },
  },
};
