import path from 'path';
import { fileURLToPath } from 'url';
import dotenv from 'dotenv';

export function loadEnv() {
  const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..', '..');
  dotenv.config({ path: path.join(root, '.env') });
}
