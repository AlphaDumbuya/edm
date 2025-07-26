import { createRequire } from 'module';
import { spawn } from 'child_process';
import { fileURLToPath } from 'url';
import { dirname, resolve } from 'path';

const require = createRequire(import.meta.url);
const __dirname = dirname(fileURLToPath(import.meta.url));

const tsNodePath = resolve(__dirname, '../node_modules/.bin/ts-node');
const scriptPath = resolve(__dirname, './test-event-reminders.ts');

const child = spawn(tsNodePath, [
  '--project', resolve(__dirname, '../tsconfig.json'),
  '--transpile-only',
  scriptPath
], {
  stdio: 'inherit',
  env: {
    ...process.env,
    TS_NODE_SKIP_PROJECT: 'true',
    TS_NODE_TRANSPILE_ONLY: 'true'
  }
});
