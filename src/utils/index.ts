export * from './file';
export * from './logger';

/**
 * 将值转换为数组
 * @param val 值
 * @param defaultValue 默认值
 * @returns 数组
 */
export function toArray<T>(val: T | T[] | null | undefined, defaultValue?: T): T[] {
  if (Array.isArray(val)) {
    return val;
  } else if (val === null || val === undefined) {
    if (defaultValue) return [defaultValue];
    return [];
  } else {
    return [val];
  }
}

/**
 * 解析逗号分隔的字符串
 * @param arr 数组
 * @returns 数组
 */
export function resolveComma<T extends string>(arr: T[]): T[] {
  return arr.flatMap((item) => item.split(',') as T[]);
}
