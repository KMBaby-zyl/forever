// 框架默认配置
export default function frameworkOption( originaOption = {}) {
  const optionDefault = {
    enableAsync: true,
    enableTemplateNunjucks: true,
    hoistFunctions: true,
    enableES6LoosePolyfill: true,
    compileComponent: true,
    compileComponentStrict: true,
    disableWildJSX: true,
    enableGlobalResourceInject: true,
    htmlOutputName: '[entry].html',
  };

  const options = Object.assign(optionDefault, originaOption);

  return options;
}
