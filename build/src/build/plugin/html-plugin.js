function cdnWebpackPlugin(options) {
  this.resourceJs = {};
  this.resourceCss = {};

  if (options && options.js) {
    this.resourceJs = Object.assign({}, options.js);
  }
  
  if (options && options.css) {
    this.resourceCss = Object.assign({}, options.css)
  }
}

const plugin = { name: 'HTMLPlugin' }
  
//const compilation = (compilation, options) => {
  //const htmlPlugin = ((htmlPluginData, callback) => {
    //const a = htmlPluginData.plugin.options.cloudHost
    
    //htmlPluginData.assets.js = htmlPluginData.assets.js.map((item) => {
      //return a + item
    //})
    
    //callback(null, htmlPluginData);
  //})
  
  //if (compilation.hooks) {
    //// You need to check the exact hook name 
    //// @see https://github.com/webpack-contrib/html-webpack-plugin/blob/master/index.js#L45
		//const plugin = { name: 'CDNPlugin', before: 'HTMLWebpackPlugin' }
    //compilation.hooks.htmlWepackPluginBeforeHtmlGeneration.tapAsync(plugin, htmlPlugin)
  //} else {
    //compilation.plugin('html-webpack-plugin-before-html-generation', htmlPlugin)
  //}
//}

const compilation = (compilation, options) => {
  let globalJS = {}; // this.resourceJs;
  let globalCSS = {}; // this.resourceCss;
  let js_map = {};
  let css_map = {};
  compilation.hooks.optimizeTree.tapAsync('htmlPlugin', (chunks, modules, callback) => {
    console.log('hooks in optimizeTree');
    modules.forEach(module => {
      // console.log(module.request);
      if (globalCSS[module.request] || globalJS[module.request]) {
        module.chunks.forEach(function (chunk) {
          //console.log(chunk.name);

        if (globalCSS[module.request]) {
          css_map[chunk.name] = css_map[chunk.name] || [];
          css_map[chunk.name].unshift(globalCSS[module.request]);
        }
            
        if (globalJS[module.request]) {
          js_map[chunk.name] = js_map[chunk.name] || [];
          js_map[chunk.name].unshift(globalJS[module.request]);
        }

        })
      }
    });
    //compilation.hooks.testPluginHook.call();
    callback();
  });
    
  //const SyncHook = require('tapable').SyncHook;
  //compilation.hooks.testPluginHook = new SyncHook();
  
}


cdnWebpackPlugin.prototype.apply = (compiler) => {
  console.log('apply plugin');
  compiler.hooks.compilation.tap(plugin, compilation); 
  compiler.hooks.make.tapAsync(plugin, (compilation, callback) => {
    compilation.hooks.htmlWebpackPluginBeforeHtmlGeneration.tap('htmlPlugin', (htmlPluginData) => {
      console.log('html generation hook');
			//Object.keys(htmlPluginData.assets.chunks).reverse().forEach(function (chunkName) {

        //if (link_css_map[chunkName]) {
          //link_css_map[chunkName].forEach(function (url) {

            //hint(`[Resource]`, `${colors.blue(chunkName)}: ${colors.blue(url)}`);
            ////hint(`GlobalResource:: add import css ${  colors.blue(url) }`);

            //htmlPluginData.assets.css.unshift(url);

          //});
        //}

        //if (link_js_map[chunkName]) {

          //link_js_map[chunkName].forEach(function (url) {

            //hint(`[Resource]`, `${colors.blue(chunkName)}: ${colors.blue(url)}`);
            ////hint(`GlobalResource:: add import js ${  colors.blue(url) }`);

            //htmlPluginData.assets.js.unshift(url);

          //});

        //}

      //})

			console.log(htmlPluginData.assets.js);
      console.log(typeof callback);
      htmlPluginData.assets.js.unshift('https://cdn.bootcss.com/vue/2.5.16/vue.js');
      return htmlPluginData;
    });
    callback();
    
  });
};

module.exports = cdnWebpackPlugin;
