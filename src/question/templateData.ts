import { green } from 'kolorist';

export const templateList = [
  {
    label: '默认模版',
    hint: `${green('ts项目基础模版')}`,
    value: 'default',
    path: 'starter-template-ts',
    url: {
      github: 'https://github.com/sankeyangshu/starter-template-ts.git',
    },
  },
  {
    label: 'vscode模版',
    hint: `${green('vscode插件模版')}`,
    value: 'vscode',
    path: 'starter-template-vscode',
    url: {
      github: 'https://github.com/sankeyangshu/starter-template-vscode.git',
    },
  },
  {
    label: 'React-H5模版',
    hint: `${green('基于 React 生态系统的移动 web 应用模板')}`,
    value: 'lemon-react',
    path: 'lemon-template-react',
    url: {
      github: 'https://github.com/sankeyangshu/lemon-template-react.git',
    },
  },
  {
    label: 'Vue-H5模版',
    hint: `${green('基于 Vue3 生态系统的移动 web 应用模板')}`,
    value: 'lemon-vue',
    path: 'lemon-template-vue',
    url: {
      github: 'https://github.com/sankeyangshu/lemon-template-vue.git',
    },
  },
  {
    label: 'UniApp小程序模版',
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
