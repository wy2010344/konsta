let modules = process.env.MODULES || false;
if (modules === 'esm' || modules === 'false') modules = false;

module.exports = {
  presets: [
    // '@babel/preset-react',
    ['@babel/preset-env', { modules, loose: true }],
    '@babel/preset-typescript',
  ],
  plugins: [
    [
      '@babel/plugin-transform-runtime',
      {
        isTS: true,
        useESModules: true,
      },
    ],
  ],
};
