import webpack from 'webpack';
// import HtmlWebpackPlugin from 'html-webpack-plugin';
import { determineFrameworkConfig } from '../utils';
import getFrameworkOptions from '../config/getFrameworkOptions';

export default function* init(program) {

  console.log('start');
  // 获取框架默认配置
	let framework = determineFrameworkConfig(program, 'app');
  //framework = preprocessFrameworkConfig(program, framework);
  framework.options = getFrameworkOptions(framework.options);

  const webpackComponentConfigFactory = require('./webpack.dev.config');
  let webpackConfig = yield webpackComponentConfigFactory(program, framework);
  // webpackConfig.watch = true;

  // console.log(webpackConfig);
  const compiler = webpack(webpackConfig);
  if ( program.watch ) {
  // if ( true) {
    compiler.watch({
      aggregateTimeout: 300,
      poll: true
    }, (err,status) => {
      getHandleDetail(program, framework)(status);
    });
  } else {
    return new Promise((resolve, reject) => {
      compiler.run((err, stats) => {
        if (err) {
          reject(err.stack || err);
        } else if ( stats.hasErrors() ) {
          reject( stats.toJson().errors.join('\n'));
        } else {
          resolve();
        }
      });
    });
  }


}

function getHandleDetail(program, kylinApp) {
  return function handlerDetail(stats) {
    process.stdout.write(stats.toString({
      colors: true,
      modules: !!program.verbose,
      children: !!program.verbose,
      chunks: !!program.verbose,
      chunkModules: !!program.verbose
    }) + '\n');
  }
}

