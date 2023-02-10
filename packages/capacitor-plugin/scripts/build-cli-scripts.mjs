/* eslint-disable no-undef */
import { build } from 'esbuild';

async function buildCliScrpts() {
  await build({
    entryPoints: ['cli-scripts/index.ts'],
    bundle: true,
    outfile: 'dist/cli-scripts/cap-scripts.js',
    platform: 'node',
    target: 'node18',
    minify: true,
    external: ['fs', 'path', 'fs-extra', 'chalk', 'ora'],
  });
}

(async () => {
  try {
    await buildCliScrpts();
    console.log('\nCLI Scripts Build Complete.\n');
  } catch (e) {
    console.error(e);
    process.exit(1);
  }
})();