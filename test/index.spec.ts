import fs from 'node:fs';
import path from 'node:path';
import { execaCommandSync } from 'execa';
import { afterEach, beforeAll, describe, expect, test } from 'vitest';
import type { SyncOptions, SyncResult } from 'execa';

const CLI_PATH = path.join(__dirname, '..', 'dist', 'index.js');

const projectName = 'test-app';
const genPath = path.join(__dirname, projectName);
const genPathWithSubfolder = path.join(__dirname, 'subfolder', projectName);

const run = <SO extends SyncOptions>(args: string[], options?: SO): SyncResult<SO> => {
  return execaCommandSync(`node ${CLI_PATH} ${args.join(' ')}`, options);
};

// 清除
const clearAnyPreviousFolders = () => {
  if (fs.existsSync(genPath)) {
    fs.rmSync(genPath, { recursive: true, force: true });
  }
  if (fs.existsSync(genPathWithSubfolder)) {
    fs.rmSync(genPathWithSubfolder, { recursive: true, force: true });
  }
};

beforeAll(() => clearAnyPreviousFolders());

describe('create lemon 项目测试', () => {
  afterEach(() => clearAnyPreviousFolders());

  test('未输入项目名时，提示输入项目名称', () => {
    const { stdout } = run([]);
    expect(stdout).toContain('请输入项目名称:');
  });

  test('输入项目名，提示选择项目模版', () => {
    const { stdout } = run([projectName]);
    expect(stdout).toContain('请选择项目模版:');
  });

  test('输入项目模版参数，但是没有输入具体的模版名', () => {
    expect(() => {
      run([projectName, '--template']);
    }).toThrowError();
  });

  test('输入无效的项目模版名', () => {
    expect(() => {
      run([projectName, '--template', 'unknown']);
    }).toThrowError(
      '  ERROR  Error: 无效的模版 "unknown". 可用的模版: default, vscode, lemon-react, lemon-vue, lemon-uniapp'
    );
  });
});
