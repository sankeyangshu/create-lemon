import { defineConfig } from 'vitest/config';

export default defineConfig({
  test: {
    testTimeout: 60000,
    exclude: [
      '**\/node_modules/**',
      '**\/.git/**',
      '**/test/test-app/**', // 排除测试创建的项目
      '**/test/subfolder/**', // 排除测试创建的子文件夹项目
    ],
  },
});
