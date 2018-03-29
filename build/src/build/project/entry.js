import fs from 'fs';
import { getRender } from './template';
import { hint } from '../utils';
import path from 'path' 
import HtmlWebpackPlugin from 'html-webpack-plugin';

export function getEntry(program, app) {
  const entryMap = {};
  if (app.pages) {
    for (let key in app.pages) {
      entryMap[key] = [app.pages[key].entry];
    }
  }
  return entryMap;
}

// https://github.com/jantimon/html-webpack-plugin#plugins
export function* getHtmlPluginArray(program, framework) {
  const HtmlPluginArray = [];

  const prodConfig = {
    minify: {
      removeComments: false,
      collapseWhitespace: true,
      removeAttributeQuotes: false
      // more options:
      // https://github.com/kangax/html-minifier#options-quick-reference
    },
    // necessary to consistently work with multiple chunks via CommonsChunkPlugin
    chunksSortMode: 'dependency',
  };

  if (framework.pages) {
    for (var key in framework.pages) {
      const pageInfo = framework.pages[key];
      if (pageInfo['index']) {
        hint.warn(`page ${key} was added`);
      }

      let index = pageInfo['template'] || pageInfo['index'];
      let data = pageInfo['data'];

      const resPath = path.resolve(program.cwd, index);
      const dataStr = JSON.stringify({ [resPath]: data });

      const templateResolveStr = `${require.resolve('../plugin/nunjucks-loader')}!${require.resolve('../plugin/nunjucks-template-loader')}?data=${dataStr}!${resPath}`;

      // console.log(templateResolveStr);
      // 根据 options 设置一下页面的输出name
      const filename = framework.pages[key]['html'] || framework.options.htmlOutputName.replace('[entry]', `${key}`);
      // console.log(filename);

      let options = {
        filename: filename,
        template: templateResolveStr,
        inject: true,
        chunks: [key],
      };
      if (program.prod) {
        options = Object.assign(options, prodConfig)
      }
      if (program.common) {
        options.chunks.push('commons');
      }
      HtmlPluginArray.push(new HtmlWebpackPlugin(options));
    }
  }
  return HtmlPluginArray;
}
