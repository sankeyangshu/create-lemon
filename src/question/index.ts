import { existsSync, mkdirSync } from 'node:fs';
import path from 'node:path';
import process from 'node:process';
import { cancel, confirm, intro, isCancel, outro, select, text } from '@clack/prompts';
import { bold, green, red, yellow } from 'ansis';
import Debug from 'debug';
import { canSkipEmptying, emptyDir, isValidProjectName } from '../utils';
import { createTemplate } from './download';
import { templateOptions } from './templateData';
import type { Options } from '../types';

const debug = Debug('lemon-create:options');

async function unwrapPrompt<T>(maybeCancelPromise: Promise<T | symbol>): Promise<T> {
  const result = await maybeCancelPromise;

  if (isCancel(result)) {
    cancel(`${red('✖')} ${bold('操作已取消')}`);
    process.exit(0);
  }
  return result;
}

export async function question(options: Options) {
  debug('options %O', options);

  intro(`${yellow('lemon-create')} - 快速创建 前后端 项目`);

  let targetDir = options?.name;
  const defaultProjectName = targetDir || 'my-project';

  const forceOverwrite = options?.force;

  const result = {
    projectName: defaultProjectName,
    shouldOverwrite: forceOverwrite,
    template: options?.template,
    silent: !!options.silent,
    debug: !!options.debug,
  };

  if (!targetDir) {
    const _result = await unwrapPrompt(
      text({
        message: '请输入项目名称:',
        placeholder: 'my-project',
        validate: (value) => (isValidProjectName(value) ? undefined : '请输入合法的项目名称'),
      })
    );
    targetDir = result.projectName = _result.trim();
  }

  if (!canSkipEmptying(targetDir) && !forceOverwrite) {
    result.shouldOverwrite = await unwrapPrompt(
      confirm({
        message: `${targetDir === '.' ? '当前文件' : `目标文件 "${targetDir}"`} 非空，是否覆盖？`,
        initialValue: false,
      })
    );
    if (!result.shouldOverwrite) {
      cancel(`${red('✖')} ${bold('操作已取消')}`);
      process.exit(0);
    }
  }

  if (options.template) {
    const template = templateOptions.find((item) => item.value === options.template);
    if (!template) {
      throw new Error(
        `无效的模版 "${options.template}". 可用的模版: ${templateOptions.map((item) => item.value).join(', ')}`
      );
    }
  } else {
    result.template = (await unwrapPrompt(
      select({
        message: '请选择项目模版:',
        options: templateOptions,
        initialValue: 'default',
      })
    )) as Required<Options['template']>;
  }

  // 获取当前工作目录
  const cwd = process.cwd();
  const root = path.join(cwd, result.projectName);

  if (existsSync(root) && result.shouldOverwrite) {
    emptyDir(root);
  } else if (!existsSync(root)) {
    mkdirSync(root);
  }

  await createTemplate(result.projectName, result.template!, root);

  outro(
    `${bold('项目创建已完成! 现在运行:')}\n` +
      `  ${green(`cd ${result.projectName}`)}\n` +
      `  ${green(`pnpm install`)}\n` +
      `  ${green(`pnpm run dev`)}\n\n`
  );
}
