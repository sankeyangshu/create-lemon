import fs from 'node:fs';
import path from 'node:path';
import { execaCommandSync } from 'execa';
import { afterEach, beforeAll, describe, expect, test } from 'vitest';
import type { SyncOptions, SyncResult } from 'execa';

const CLI_PATH = path.join(__dirname, '..', 'dist', 'index.mjs');

const projectName = 'test-app';
const genPath = path.join(__dirname, projectName);
const genSubfolderPath = path.join(__dirname, 'subfolder');
const genPathWithSubfolder = path.join(__dirname, 'subfolder', projectName);

const run = (args: string[], options?: SyncOptions): SyncResult => {
  return execaCommandSync(`node ${CLI_PATH} ${args.join(' ')}`, { cwd: __dirname, ...options });
};

// 清除
const clearAnyPreviousFolders = () => {
  if (fs.existsSync(genPath)) {
    fs.rmSync(genPath, { recursive: true, force: true });
  }
  if (fs.existsSync(genSubfolderPath)) {
    fs.rmSync(genSubfolderPath, { recursive: true, force: true });
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
      '  ERROR  Error: 无效的模版 "unknown". 可用的模版: ts, vscode, react, vue, unplugin, lemon-react, lemon-vue, lemon-uniapp'
    );
  });

  test('使用有效的ts模版创建项目', () => {
    // 先判断要创建的目录是否存在
    expect(fs.existsSync(genPath)).toBe(false);

    const { stdout } = run([projectName, '--template', 'ts']);
    expect(stdout).toContain('lemon-create');
    expect(stdout).toContain('项目创建已完成!');

    // 最后判断是否创建成功
    expect(fs.existsSync(genPath)).toBe(true);
  });

  test('使用有效的vscode模版创建项目', () => {
    const { stdout } = run([projectName, '--template', 'vscode']);
    expect(stdout).toContain('lemon-create');
    expect(stdout).toContain('项目创建已完成!');

    // 最后判断是否创建成功
    expect(fs.existsSync(genPath)).toBe(true);
  });

  test('使用有效的react模版创建项目', () => {
    const { stdout } = run([projectName, '--template', 'react']);
    expect(stdout).toContain('lemon-create');
    expect(stdout).toContain('项目创建已完成!');

    // 最后判断是否创建成功
    expect(fs.existsSync(genPath)).toBe(true);
  });

  test('使用有效的vue模版创建项目', () => {
    const { stdout } = run([projectName, '--template', 'vue']);
    expect(stdout).toContain('lemon-create');
    expect(stdout).toContain('项目创建已完成!');

    // 最后判断是否创建成功
    expect(fs.existsSync(genPath)).toBe(true);
  });

  test('使用有效的unplugin模版创建项目', () => {
    const { stdout } = run([projectName, '--template', 'unplugin']);
    expect(stdout).toContain('lemon-create');
    expect(stdout).toContain('项目创建已完成!');

    // 最后判断是否创建成功
    expect(fs.existsSync(genPath)).toBe(true);
  });

  test('使用有效的lemon-react模版创建项目', () => {
    const { stdout } = run([projectName, '--template', 'lemon-react']);
    expect(stdout).toContain('lemon-create');
    expect(stdout).toContain('项目创建已完成!');

    // 最后判断是否创建成功
    expect(fs.existsSync(genPath)).toBe(true);
  });

  test('使用有效的lemon-vue模版创建项目', () => {
    const { stdout } = run([projectName, '--template', 'lemon-vue']);
    expect(stdout).toContain('lemon-create');
    expect(stdout).toContain('项目创建已完成!');

    // 最后判断是否创建成功
    expect(fs.existsSync(genPath)).toBe(true);
  });

  test('使用有效的lemon-uniapp模版创建项目', () => {
    const { stdout } = run([projectName, '--template', 'lemon-uniapp']);
    expect(stdout).toContain('lemon-create');
    expect(stdout).toContain('项目创建已完成!');

    // 最后判断是否创建成功
    expect(fs.existsSync(genPath)).toBe(true);
  });

  test('使用force参数覆盖已存在的项目', () => {
    // 先创建一个项目，并判断是否创建成功
    if (!fs.existsSync(genPath)) {
      fs.mkdirSync(genPath, { recursive: true });
      expect(fs.existsSync(genPath)).toBe(true);
    }

    // 使用force参数再次创建
    const { stdout } = run([projectName, '--template', 'ts', '--force']);
    expect(stdout).toContain('lemon-create');
    expect(stdout).toContain('项目创建已完成!');
    expect(fs.existsSync(genPath)).toBe(true);
  });

  test('测试短参数形式', () => {
    const { stdout } = run([projectName, '-t', 'ts', '-f']);
    expect(stdout).toContain('lemon-create');
    expect(stdout).toContain('项目创建已完成!');
    expect(fs.existsSync(genPath)).toBe(true);
  });

  test('测试帮助命令', () => {
    const { stdout } = run(['--help']);
    expect(stdout).toContain('create-lemon');
    expect(stdout).toContain('创建新项目');
    expect(stdout).toContain('--template');
    expect(stdout).toContain('--force');
    expect(stdout).toContain('--debug');
    expect(stdout).toContain('--silent');
  });

  test('测试版本命令', () => {
    const { stdout } = run(['--version']);
    expect(stdout).toMatch(/\d+\.\d+\.\d+/); // 匹配版本号格式
  });

  test('测试在子文件夹中创建项目', () => {
    // 先创建 subfolder 目录
    if (!fs.existsSync(genSubfolderPath)) {
      fs.mkdirSync(genSubfolderPath, { recursive: true });
    }

    const { stdout } = run([`subfolder/${projectName}`, '--template', 'ts']);
    expect(stdout).toContain('项目创建已完成!');
    expect(fs.existsSync(genPathWithSubfolder)).toBe(true);
  });
});
