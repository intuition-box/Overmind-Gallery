import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const patterns = [/\.test\./i, /\.spec\./i, /\.bench\./i, /\.tap\./i];
const files = ['helper.js', 'test.js', 'spec.js', 'bench.js'];
const ignore = ['.git', '.next', '.vercel', 'dist', 'build'];

function shouldDelete(filePath) {
  const name = path.basename(filePath);
  const dir = path.dirname(filePath);

  if (ignore.some(d => dir.includes('/' + d) || name === d)) return false;
  if (patterns.some(p => p.test(name))) return true;
  if (files.includes(name)) return true;
  if (/\/(?:test|tests|spec|specs|bench)s?\//.test(dir) ||
      dir.endsWith('/test') || dir.endsWith('/tests')) return true;

  return false;
}

function clean(dirPath) {
  try {
    const items = fs.readdirSync(dirPath);
    for (const item of items) {
      const full = path.join(dirPath, item);
      try {
        const stat = fs.statSync(full);
        if (stat.isDirectory()) {
          clean(full);
        } else if (stat.isFile() && shouldDelete(full)) {
          fs.unlinkSync(full);
        }
      } catch (e) {}
    }
  } catch (e) {}
}

clean(path.join(__dirname, '..', 'node_modules'));