import colors from 'colors/safe';
import { hint } from '../utils/index';

class HtmlWebpackInjectPlugin {
  
	constructor (options = {}) {
		this.resourceJs = {};
		this.resourceCss = {};

		if (options && options.js) {
			this.resourceJs = Object.assign({}, options.js);
		}
		
		if (options && options.css) {
			this.resourceCss = Object.assign({}, options.css)
		}
	}

	apply(compiler) {
		let globalJS = this.resourceJs;
		let globalCSS = this.resourceCss;

		let js_map = {};
		let css_map = {};

    if (compiler.hooks) {
      compiler.hooks.compilation.tap(plugin, compilation)
    } else {
      compiler.plugin('compilation', compilation)
    }
		compiler.plugin("compilation", function(compilation) {
			
			compilation.plugin("optimize-tree", (chunks, modules, callback) => {
				chunks.forEach( module => {
					if (globalCSS[module.request] || globalJS[module.request]) {
						module.chunks.forEach(function (chunk) {

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
				callback();
			});

			compilation.plugin('html-webpack-plugin-before-html-generation', function (htmlPluginData, callback) {
				
				// html-webpack构造时unshift进使用到的全局资源
				Object.keys(htmlPluginData.assets.chunks).reverse().forEach(function (chunkName) {

					if (css_map[chunkName]) {
						css_map[chunkName].forEach(function (url) {

							hint(`[Resource]`, `${colors.blue(chunkName)}: ${colors.blue(url)}`);
							//hint(`GlobalResource:: add import css ${  colors.blue(url) }`);

							htmlPluginData.assets.css.unshift(url);

						});
					}

					if (js_map[chunkName]) {

						js_map[chunkName].forEach(function (url) {

							hint(`[Resource]`, `${colors.blue(chunkName)}: ${colors.blue(url)}`);
							//hint(`GlobalResource:: add import js ${  colors.blue(url) }`);

							htmlPluginData.assets.js.unshift(url);

						});

					}

				})

				callback(null, htmlPluginData);
			});
		});
	}

}

export default HtmlWebpackInjectPlugin;
