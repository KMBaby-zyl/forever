import getBabelCommonConfig from '../config/getBabelCommonConfig';
import path from 'path';
import { getEntry } from './entry';
import ExtractTextPlugin from "extract-text-webpack-plugin";
import HtmlPlugin from "../plugin/html-plugin.js";
import TestPlugin from "../plugin/test-plugin.js";
import { assetsPath } from '../utils/';
import { externals } from "../plugin/global-resource";
import webpack from 'webpack';

const PATHS = {
  src: path.join(__dirname, '../src'),
  dist: path.join(__dirname, '../dist')
};
export default function webpackBaseConfig(program, framework) {
  const babelQuery = getBabelCommonConfig(program, framework);
  const entrys = getEntry(program, framework);

  const sourceMapEnabled = !program.prod;
	const isProduction = program.prod;

  return {
	  mode: isProduction ? 'production' : 'development',
    entry: entrys,
    externals: framework.options.enableGlobalResourceInject ? externals : {},
    output: {
      filename: '[name].js'
    },
    module: {
      rules: [
        {
          test: /\.js$/,
          exclude: /node_modules/,
          use: {
            loader: "babel-loader",
            options: babelQuery
          }
        },
        {
          test: /\.vue$/,
          use: {
            loader: 'vue-loader'
          }
        },
        {
          test: /\.json$/,
          loader: 'json-loader',
          type: 'javascript/auto'
        }, 
        {
          test: /\.less$/,
          use:  ExtractTextPlugin.extract({
            fallback: 'style-loader',
            //如果需要，可以在 sass-loader 之前将 resolve-url-loader 链接进来
            use: ['css-loader', 'less-loader']
          })
        //}, {
          //test: /\.less$/,
          //use: cssLoaders({sourceMap: sourceMapEnabled, extract: isProduction, usePostCSS: true, modules: true}).less,
        //}, {
          //test: /\.less$/, // (用于解析antd的LESS文件)
          //use: cssLoaders({sourceMap: sourceMapEnabled, extract: isProduction, usePostCSS: true, modules: false}).less,
        },
        {
          // 文件解析
          test: /\.(eot|woff|svg|ttf|woff2|appcache|mp3|mp4|pdf)(\?|$)/,
          loader: "file-loader?name=assets/[name].[ext]"
        }, {
          // 图片解析
          test: /nobase64\.(png|jpg|gif)$/,
          loader: "url-loader", // ?limit=8192&name=assets/[name].[ext]",
          options: {
            limit: 1,
            name: assetsPath('img/[name].[hash:7].[ext]')
          }
        }, {
          // 图片解析
          test: /\.(png|jpg|gif)$/,
          loader: "url-loader", // ?limit=8192&name=assets/[name].[ext]",
          exclude: /nobase64\.(png|jpg|gif)$/,
          options: {
            limit: 10000,
            name: assetsPath('img/[name].[hash:7].[ext]')
          }
        }
      ]
    },
    plugins: [
      new webpack.DefinePlugin({
        'process.env': {
          NODE_ENV: !isProduction ?  '"development"' : '"production"'
        }
      }),
      new HtmlPlugin(),
      //new TestPlugin()
      //extractCSS
      // new ExtractTextPlugin('style.css')
      //new ExtractTextPlugin({
        //filename: assetsPath('css/[name].[hash:7].css'),
        //allChunks: true
      //})
    ],
    optimization: {
			splitChunks: {
				//chunks: 'all', // 必须三选一： "initial" | "all"(默认就是all) | "async"
				//minSize: 30000,
				cacheGroups: {
					commons: {
						test: /[\\/]node_modules[\\/]/,
						name: 'commons',
						enforce: true,
						chunks: 'all',
						// reuseExistingChunk: true
					},
					default: false
				}
			},
      // webpack会添加一个只包含运行时(runtime)额外代码块到每一个入口。
      // runtimeChunk: true 
		}
  }
}


/**
 * 统一处理css-loader
 * @param {*} options
 */
function cssLoaders(options) {
  options = options || {};

  const cssLoader = {
    loader: 'css-loader',
    options: {
      sourceMap: options.sourceMap
    }
  };
  if (options.modules) {
    cssLoader.options = {...cssLoader.options, ...{
      modules: true,
      importLoaders: 1,
      localIdentName:  "[path]___[name]__[local]___[hash:base64:5]"
    }}
  }

  const postcssLoader = {
    loader: 'postcss-loader',
    options: {
      sourceMap: options.sourceMap,
      ident: 'postcss',
      plugins: [// require('autoprefixer')(), // cssnext 包含autoprefixer require('cssnano')(),
        require('postcss-cssnext')()]
    }
  };

  // generate loader string to be used with extract text plugin
  function generateLoaders(loader, loaderOptions) {
    const loaders = options.usePostCSS
      ? [cssLoader, postcssLoader]
      : [cssLoader];

    if (loader) {
      loaders.push({
        loader: `${loader}-loader`,
        options: Object.assign({}, loaderOptions, {sourceMap: options.sourceMap})
      });
    }

    // Extract CSS when that option is specified (which is the case during
    // production build)
    if (options.extract) {
      return ExtractTextPlugin.extract({use: loaders, fallback: 'style-loader'});
    }
    return ['style-loader'].concat(loaders);
  }

  // https://vue-loader.vuejs.org/en/configurations/extract-css.html
  return {
    css: generateLoaders(),
    postcss: generateLoaders(),
    less: generateLoaders('less'),
    sass: generateLoaders('sass', {indentedSyntax: true}),
    scss: generateLoaders('sass'),
    stylus: generateLoaders('stylus'),
    styl: generateLoaders('stylus')
  };
}
