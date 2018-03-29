import chalk from 'chalk';
import path from 'path';

export function determineFrameworkConfig(program, appkey='app') {
  const cwd = program.cwd;
  
  const configPath = `${cwd}/package.json`;
  const packageJson = require(configPath);
  return packageJson[appkey] || {};
}

export function hint(tips = '', str = '') {
  console.log(`${ chalk.cyan(tips) } ${str}`)
}
hint.success = (tips = '', str = '') => {
  console.log(`${ chalk.green(tips) } ${str}`)
};

hint.error = (tips = '', str = '') => {
  console.log(`${ chalk.red(tips) } ${str}`)
};

hint.warn = (tips = '', str = '') => {
  console.log(`${ chalk.yellow(tips) } ${str}`)
};

export function assetsPath(_path) {
    var assetsSubDirectory = '';//'../';
    return path.posix.join(assetsSubDirectory, _path)
};

