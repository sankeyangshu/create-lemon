export type Overwrite<T, U> = Omit<T, keyof U> & U;

export type AwaitAble<T> = Promise<T> | T;

export type MarkPartial<T, K extends keyof T> = Omit<Required<T>, K> & Partial<Pick<T, K>>;

export type ArrayAble<T> = T | T[];

export type DirectoryTraverse = (
  dir: string,
  dirCallback: (dir: string) => void,
  fileCallback: (file: string) => void
) => void;

export * from './option';
