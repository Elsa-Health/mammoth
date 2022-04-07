module.exports = {
  presets: [
    [
      require('@babel/preset-env'),
      {
        useBuiltIns: false,
        modules: 'commonjs',
      },
    ],
    require('@babel/preset-react'),
    require('@babel/preset-typescript'),
    '@babel/preset-flow',
  ],

  plugins: ['@babel/plugin-proposal-class-properties'],
};
