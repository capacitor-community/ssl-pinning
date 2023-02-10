import type { CapacitorConfig } from '@capacitor/cli';
import chalk from 'chalk';
import type { Ora } from 'ora';

type DeepReadonly<T> = { readonly [P in keyof T]: DeepReadonly<T[P]> };

export type ExternalConfig = DeepReadonly<CapacitorConfig>;

export type TaskInfoProvider = (messsage: string) => void;

export function errorLog(message: string): void {
  console.log(chalk.red(`Error: ${message}`));
}

export async function runTask<T>(
  title: string,
  fn: (info: TaskInfoProvider) => Promise<T>,
): Promise<T> {
  // eslint-disable-next-line @typescript-eslint/no-var-requires
  const ora = require('ora');
  // eslint-disable-next-line @typescript-eslint/no-var-requires
  const chalk = require('chalk');
  let spinner: Ora = ora(title).start(`${title}`);
  try {
    spinner = spinner.start(`${title}: ${chalk.dim('start 🚀')}`);
    const start = process.hrtime();
    const value = await fn((message: string) => {
      spinner = spinner.info();
      spinner = spinner.start(`${title}: ${chalk.dim(message)}`);
    });
    spinner = spinner.info();
    const elapsed = process.hrtime(start);
    spinner = spinner.succeed(
      `${title}: ${chalk.dim('completed in ' + formatHrTime(elapsed))}`,
    );
    return value;
  } catch (e) {
    spinner = spinner.fail(`${title}: ${e.message ? e.message : ''}`);
    spinner = spinner.stop();
    throw e;
  }
}

const TIME_UNITS = ['s', 'ms', 'μp'];

function formatHrTime(hrtime: any) {
  let time = hrtime[0] + hrtime[1] / 1e9;
  let index = 0;
  for (; index < TIME_UNITS.length - 1; index++, time *= 1000) {
    if (time >= 1) {
      break;
    }
  }
  return time.toFixed(2) + TIME_UNITS[index];
}
