import process from 'node:process';
import { spinner } from '@clack/prompts';
import { downloadTemplate } from 'giget';
import { bold } from 'kolorist';
import { logger } from '../utils';
import type { Options } from '../types';
import { modifyPackageJson } from './package';
import { templateList } from './templateData';

function getRepoUrlList(value: Required<Options>['template']) {
  const path = templateList.find((item) => item.value === value)?.path;

  if (path) {
    return path;
  }

  // 否则返回默认模版路径
  return 'starter-template-ts';
}

/**
 * 创建项目
 * @param projectName 项目名称
 * @param templatePath 模板路径
 * @param downloadPath 下载路径
 */
export async function createTemplate(
  projectName: string,
  templatePath: Required<Options>['template'],
  downloadPath: string
) {
  const loading = spinner();
  loading.start(`${bold('正在创建模板...')}`);

  const template = getRepoUrlList(templatePath);

  try {
    // 下载模版
    await downloadTemplate(`gh:sankeyangshu/${template}`, {
      dir: projectName,
    });

    loading.stop();
    logger.success(`${bold('模板创建成功！')}`);
  } catch {
    loading.stop();
    logger.fail(`${bold('模板创建失败！')}`);
    process.exit(1);
  }

  modifyPackageJson(downloadPath, projectName);
}
