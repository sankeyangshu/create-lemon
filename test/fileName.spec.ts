import { describe, expect, test } from 'vitest';
import { isValidProjectName } from '../src/utils/file';

describe('校验项目名称是否合法', () => {
  test('合法项目名称', () => {
    expect(isValidProjectName('test')).toBe(true);
    expect(isValidProjectName('Test')).toBe(true);
    expect(isValidProjectName('test-app')).toBe(true);
    expect(isValidProjectName('test_app')).toBe(true);
    expect(isValidProjectName('test_App')).toBe(true);
    expect(isValidProjectName('TEst-apP')).toBe(true);
    expect(isValidProjectName('test123')).toBe(true);
    expect(isValidProjectName('test123_app456')).toBe(true);
    expect(isValidProjectName('a1-b2-c3')).toBe(true);
  });

  test('项目名称不能以数字开头', () => {
    expect(isValidProjectName('123test')).toBe(false);
  });

  test('项目名称不能包含特殊字符', () => {
    expect(isValidProjectName('test@')).toBe(false);
    expect(isValidProjectName('test$')).toBe(false);
    expect(isValidProjectName('test#')).toBe(false);
    expect(isValidProjectName('test%')).toBe(false);
    expect(isValidProjectName('test^')).toBe(false);
    expect(isValidProjectName('test&')).toBe(false);
    expect(isValidProjectName('test*')).toBe(false);
    expect(isValidProjectName('test(')).toBe(false);
    expect(isValidProjectName('test)')).toBe(false);
  });
});
