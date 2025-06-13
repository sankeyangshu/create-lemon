import { defineConfig } from 'tsdown';

export default defineConfig({
  entry: ['src/index.ts'],
  format: ['cjs', 'esm'],
  platform: 'node',
  shims: true,
  dts: true,
  onSuccess() {
    console.info('🙏 Build succeeded!');
  },
});
