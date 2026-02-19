import { copyFileSync, existsSync, mkdirSync } from 'fs';
import { resolve } from 'path';

const src = resolve(process.cwd(), 'public', '_redirects');
const destDir = resolve(process.cwd(), 'dist');
const dest = resolve(destDir, '_redirects');

try {
  if (!existsSync(src)) {
    console.log('No public/_redirects file found. Skipping copy.');
    process.exit(0);
  }

  mkdirSync(destDir, { recursive: true });
  copyFileSync(src, dest);
  console.log('Copied public/_redirects -> dist/_redirects');
} catch (err) {
  console.error('Failed to copy _redirects:', err);
  // Do not fail the build for this non-critical step
}
