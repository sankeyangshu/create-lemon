#!/usr/bin/env node
import process from 'node:process';
import { cac } from 'cac';
import debug from 'debug';
import { version } from '../package.json';
import { question } from './question';
import { logger, resolveComma, toArray } from './utils';

export * from './types';

const cli = cac('create-lemon');

/**
 * Register the command.
 * @descCN 注册命令
 */
async function registerCommand() {
  cli
    .command('[name]', '创建新项目')
    .option('-t, --template <template>', '项目模版: ts, vscode, vue, unplugin, lemon-react, lemon-vue, lemon-uniapp')
    .option('-f, --force', '是否强制初始化项目')
    .option('-d, --debug', '是否显示调试日志')
    .option('-s, --silent', '是否显示非错误日志')
    .action((name, options) => question({ name, ...options }));

  cli.help().version(version);

  // 对未知命令监听
  cli.on('command:*', () => {
    const availableCommands = cli.commands.map((cmd) => cmd.name);
    logger.error(`未知的命令：${cli.args[0]}`);
    if (availableCommands.length > 0) {
      logger.info(`可用命令：${availableCommands.join(',')}`);
    }
  });

  cli.parse(process.argv, { run: false });

  // 开启debug模式
  if (cli.options.debug) {
    let namespace: string;

    if (cli.options.debug === true) {
      namespace = 'lemon:*';
    } else {
      namespace = resolveComma(toArray(cli.options.debug))
        .map((v) => `lemon:${v}`)
        .join(',');
    }

    const enabled = debug.disable();
    if (enabled) namespace += `,${enabled}`;

    debug.enable(namespace);
    debug('lemon:debug')('Debugging enabled', namespace);
  }

  await cli.runMatchedCommand();
}

/**
 * Initialize the project.
 * @descCN 初始化项目
 */
async function init() {
  try {
    await registerCommand();
  } catch (err) {
    logger.error(err);
    process.exit(1);
  }
}

init();
