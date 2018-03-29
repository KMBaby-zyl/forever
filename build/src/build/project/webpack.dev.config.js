import webpack from 'webpack';
import merge from 'webpack-merge';
import { getHtmlPluginArray } from './entry';
import { js as resourceJs, css as resourceCss } from '../plugin/global-resource';
// TODO 目前 html 插件 对webpack4支持不全，待它更新吧。
//import HtmlWebpackInjectPlugin from "../plugin/html-webpack-inject-plugin";
//import HtmlWebpackInjectPlugin from "../plugin/html-plugin";


export default function* webpackDevConfig(program, framework) {
  // from base config
  const baseWebpackConfig = require('./webpack.base.config.js')(program, framework);

  const htmlArray = yield getHtmlPluginArray(program, framework);

  console.log('get htmlArray');
  
  return merge(baseWebpackConfig, {

    plugins: [
      //new HtmlWebpackInjectPlugin({
        //js: Object.assign({}, resourceJs),
        //css: Object.assign({}, resourceCss)
      //}),
      // new webpack.HotModuleReplacementPlugin()
    //].filter(Boolean)
    ].concat(htmlArray).filter(Boolean)
  });
}
