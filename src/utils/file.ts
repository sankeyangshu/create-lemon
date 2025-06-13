import * as fs from 'node:fs';
import * as path from 'node:path';
import type { DirectoryTraverse } from '../types';

/**
 * 校验项目名称
 * @param v 项目名称
 * @returns 是否合法
 */
export function isValidProjectName(v: string) {
  return /^[a-zA-Z]+([-][a-zA-Z][a-zA-Z0-9]*|[_][a-zA-Z][a-zA-Z0-9]*|[a-zA-Z0-9])*$/.test(v);
}

/**
 * 判断目录是否为空
 * @param dir 目录
 * @returns 是否为空
 */
export function canSkipEmptying(dir: string) {
  // 判断目录是否存在
  if (!fs.existsSync(dir)) {
    return true;
  }

  const files = fs.readdirSync(dir);
  if (files.length === 0) {
    return true;
  }
  if (files.length === 1 && files[0] === '.git') {
    return true;
  }

  return false;
}

/**
 * 后序遍历目录
 * @param dir 目录
 * @param dirCallback 目录回调
 * @param fileCallback 文件回调
 */
export const postOrderDirectoryTraverse: DirectoryTraverse = (dir, dirCallback, fileCallback) => {
  for (const filename of fs.readdirSync(dir)) {
    if (filename === '.git') continue;

    const fullPath = path.resolve(dir, filename);

    // 如果是目录，则递归遍历
    if (fs.lstatSync(fullPath).isDirectory()) {
      postOrderDirectoryTraverse(fullPath, dirCallback, fileCallback);
      dirCallback(fullPath);
      continue;
    }

    // 如果是文件，则调用文件回调
    fileCallback(fullPath);
  }
};

/**
 * 清空目标文件夹下的所有文件和目录
 * @param dir 目录
 */
export function emptyDir(dir: string) {
  if (!fs.existsSync(dir)) return;

  postOrderDirectoryTraverse(
    dir,
    (dirPath) => fs.rmdirSync(dirPath),
    (filePath) => fs.unlinkSync(filePath)
  );
}
