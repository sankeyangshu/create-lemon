import { describe, expect, it } from 'vitest';
import { text } from '../dist/index.js';

describe('should', () => {
  it('exported', () => {
    expect(text).toEqual('hello world');
  });
});
