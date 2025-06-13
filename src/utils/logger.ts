import { bgBlue, bgRed, bgYellow, blue, green, red, yellow } from 'kolorist';

class Logger {
  silent: boolean = false;

  setSilent(value: boolean) {
    this.silent = value;
  }

  filter(...args: any[]) {
    return args.filter((arg) => arg !== undefined && arg !== false);
  }

  info(...args: any[]) {
    if (!this.silent) {
      // eslint-disable-next-line no-console
      console.info(bgBlue(` INFO `), ...this.filter(...args).map((arg) => blue(arg)));
    }
  }

  warn(...args: any[]) {
    if (!this.silent) {
      console.warn(
        '\n',
        bgYellow(` WARN `),
        ...this.filter(...args).map((arg) => yellow(arg)),
        '\n'
      );
    }
  }

  error(...args: any[]) {
    if (!this.silent) {
      console.error('\n', bgRed(` ERROR `), ...this.filter(...args).map((arg) => red(arg)), '\n');
    }
  }

  success(...args: any[]) {
    if (!this.silent) {
      // eslint-disable-next-line no-console
      console.log(green(`✔`), ...this.filter(...args).map((arg) => green(arg)));
    }
  }

  fail(...args: any[]) {
    if (!this.silent) {
      // eslint-disable-next-line no-console
      console.log(red(`✖`), ...this.filter(...args).map((arg) => red(arg)));
    }
  }
}

export const logger: Logger = new Logger();
