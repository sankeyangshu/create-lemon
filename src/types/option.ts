/**
 * The template to use.
 * @default 'ts'
 */
export type Template = 'mobile-react' | 'mobile-uniapp' | 'mobile-vue' | 'react' | 'ts' | 'unplugin' | 'vscode' | 'vue';

/**
 * Options for create-lemon.
 */
export interface Options {
  /**
   * The name of the project.
   * @default 'my-project'
   */
  name?: string;
  /**
   * The template to use.
   * @default 'ts'
   */
  template?: Template;
  /**
   * Whether to force initialize the project.
   * @default false
   */
  force?: boolean;
  /**
   * Whether to suppress non-error logs.
   * @default false
   */
  silent?: boolean;
  /**
   * Whether to print debug messages to the console.
   * @default false
   */
  debug?: boolean;
}

/**
 * Template data.
 */
export interface TemplateData {
  label: string;
  hint: string;
  value: Template;
  path: string;
  url: {
    github: string;
  };
}
