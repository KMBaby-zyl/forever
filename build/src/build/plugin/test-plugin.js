function testPlugin(){
}

testPlugin.prototype.apply = (compiler) => {
  console.log('apply plugin');
  compiler.hooks.compilation.tap('testPlugin', (compilation, options) => {
    compilation.hooks.testPluginHook.tap('testPlugin', () => {
      console.log('test hook call');
    });
  }); 
};

module.exports = testPlugin;
