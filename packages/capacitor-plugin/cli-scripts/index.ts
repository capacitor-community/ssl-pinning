/* eslint-disable @typescript-eslint/no-unused-vars */
import { runTask } from './common';
import { doCopy } from './copy';

async function doCopyTask() {
  return await runTask(
    'Copying SSL Certs to native platforms',
    async taskInfoMessageProvider => {
      return await doCopy(taskInfoMessageProvider);
    },
  );
}

(async () => {
  const scriptToRun = process.argv[2] ? process.argv[2] : null;
  if (scriptToRun !== null) {
    switch (scriptToRun) {
      case 'copy':
        await doCopyTask();
        break;
      case 'sync':
        await doCopyTask();
        break;
      default:
        throw new Error(`Invalid script chosen: ${scriptToRun}`);
    }
  } else {
    throw new Error(`Invalid script chosen: ${scriptToRun}`);
  }
})();
