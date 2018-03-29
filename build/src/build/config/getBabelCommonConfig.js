export default function getBabelCommonConfig(program, Framework) {
  const {
    enableAsync
  } = Framework.options;
  let babelConfig = {
    babelrc: false,
    presets: [
      /*
       * if we want to transpile async to promise (not generator) with 'fast-async',
       * we need disable transform-async-generator-function and transform-async-to-generator
       * which in babel-preset-stage-3 ...
       * so we have to maintain the preset list self.
       */
      enableAsync ? null : require.resolve('babel-preset-stage-0'),
    ].filter(Boolean),
    plugins: [
    ].concat( enableAsync ? [
      // stage 0
      require.resolve('babel-plugin-transform-do-expressions'),
      require.resolve('babel-plugin-transform-function-bind'),
      // stage 1
      require.resolve('babel-plugin-transform-class-constructor-call'),
      require.resolve('babel-plugin-transform-export-extensions'),
      // stage 2
      require.resolve('babel-plugin-transform-class-properties'),
      require.resolve('babel-plugin-transform-decorators'),
      require.resolve('babel-plugin-syntax-dynamic-import'),
      // stage 3
      require.resolve('babel-plugin-syntax-trailing-function-commas'),
      // require.resolve('babel-plugin-transform-async-generator-functions'),
      // require.resolve('babel-plugin-transform-async-to-generator'),
      require.resolve('babel-plugin-transform-exponentiation-operator'),
      require.resolve('babel-plugin-transform-object-rest-spread')
    ] : []).filter(Boolean)
  }; 

  return babelConfig;
}
