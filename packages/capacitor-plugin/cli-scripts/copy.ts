import { copySync, existsSync } from 'fs-extra';
import { join } from 'path';

import type { TaskInfoProvider } from './common';
import { errorLog } from './common';

export async function doCopy(
  taskInfoMessageProvider: TaskInfoProvider,
): Promise<void> {
  const usersProjectDir = process.env.CAPACITOR_ROOT_DIR;
  try {
    if (!usersProjectDir) {
      throw new Error('No Capacitor Root Dir Defined.');
    }
    const sslCert = join(usersProjectDir, 'mysslcert.cer');
    if (!existsSync(sslCert)) {
      throw new Error('No Cert. Found.');
    }
    const destDiriOS = join(usersProjectDir, 'ios', 'App');
    // const destDirAndroid = join(usersProjectDir, 'ios', 'app');
    taskInfoMessageProvider(`Copying ${sslCert} into ${destDiriOS}`);
    copySync(sslCert, destDiriOS);
  } catch (e) {
    errorLog(e.message);
    throw e;
  }
}
