import { cp, rm } from 'node:fs/promises';
import { join } from 'node:path';
import { root, validate } from './validate.mjs';

await validate('public');
await rm(join(root, 'dist'), { recursive: true, force: true });
await cp(join(root, 'public'), join(root, 'dist'), { recursive: true });
await validate('dist');
console.log('Build completed: dist/ (unchanged HTML and images)');
