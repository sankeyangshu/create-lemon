import { existsSync, readFileSync, writeFileSync } from 'node:fs';
import { join } from 'node:path';
import { spinner } from '@clack/prompts';
import { bold } from 'ansis';
import { emptyDir, logger } from '../utils';

function replaceContent(filePath: string, projectName: string) {
  const fileContent = JSON.parse(readFileSync(filePath, 'utf8'));
  fileContent.name = projectName;
  fileContent.version = '0.0.0';
  writeFileSync(filePath, JSON.stringify(fileContent, null, 2));
}

/**
 * 修改package.json文件
 * @param downloadPath - 下载模版的文件夹路径
 * @param name - 项目名称
 */
export function modifyPackageJson(downloadPath: string, projectName: string) {
  const loading = spinner();
  loading.start(`${bold('正在创建项目...')}`);

  const packagePath = join(downloadPath, 'package.json');

  // 判定文件是否存在
  if (existsSync(packagePath)) {
    replaceContent(packagePath, projectName);

    loading.stop();
    logger.success(`项目创建成功！`);
  } else {
    loading.stop();
    logger.fail('项目创建失败！');

    emptyDir(downloadPath);
    throw new Error('没有找到 package.json');
  }
}
