import co from 'co';
import { Command } from 'commander';

let buildFunc = require('../project/index.js');
export default function run() {
  // 读取启动参数 
  const argv = process.argv;
	const program = new Command();
  program
    .allowUnknownOption() // 允许其他参数列表
    .option('--dev', 'dev')
    .option('--no-prod', 'no prod')
    .parse(typeof argv === 'string' ? argv.split(' ') : argv);
  program.cwd = process.cwd();

  // common 构建
  program.common = true;

  program.prod === !program.dev;
  // console.log('program');
  // console.log(program);
  
  return co(function *() {
    yield buildFunc(program);
  });
}
