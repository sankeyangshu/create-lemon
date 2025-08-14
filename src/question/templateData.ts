import { green } from 'ansis';
import type { TemplateData } from '../types';

export const templateList: TemplateData[] = [
  {
    label: 'starter-ts',
    hint: `${green('ts项目基础模版')}`,
    value: 'ts',
    path: 'starter-template-ts',
    url: {
      github: 'https://github.com/sankeyangshu/starter-template-ts.git',
    },
  },
  {
    label: 'starter-vscode',
    hint: `${green('vscode插件基础模版')}`,
    value: 'vscode',
    path: 'starter-template-vscode',
    url: {
      github: 'https://github.com/sankeyangshu/starter-template-vscode.git',
    },
  },
  {
    label: 'starter-vue',
    hint: `${green('vue项目基础模版')}`,
    value: 'vue',
    path: 'starter-template-vue',
    url: {
      github: 'https://github.com/sankeyangshu/starter-template-vue.git',
    },
  },
  {
    label: 'starter-unplugin',
    hint: `${green('unplugin插件基础模版')}`,
    value: 'unplugin',
    path: 'starter-template-unplugin',
    url: {
      github: 'https://github.com/sankeyangshu/starter-template-unplugin.git',
    },
  },
  {
    label: 'lemon-react',
    hint: `${green('基于 React 生态系统的移动 web 应用模板')}`,
    value: 'lemon-react',
    path: 'lemon-template-react',
    url: {
      github: 'https://github.com/sankeyangshu/lemon-template-react.git',
    },
  },
  {
    label: 'lemon-vue',
    hint: `${green('基于 Vue3 生态系统的移动 web 应用模板')}`,
    value: 'lemon-vue',
    path: 'lemon-template-vue',
    url: {
      github: 'https://github.com/sankeyangshu/lemon-template-vue.git',
    },
  },
  {
    label: 'lemon-uniapp',
    hint: `${green('基于 Uniapp 生态系统的小程序应用模板')}`,
    value: 'lemon-uniapp',
    path: 'lemon-template-uniapp',
    url: {
      github: 'https://github.com/sankeyangshu/lemon-template-uniapp.git',
    },
  },
];

export const templateOptions = templateList.map((item) => ({
  label: item.label,
  hint: item.hint,
  value: item.value,
}));
