import * as dotenv from 'dotenv';
import * as path from 'path';

import {FluxifyBackendApplication} from './application';

// Load environment variables like in main.ts
const nodeEnv = process.env.NODE_ENV || 'development';
const envPath = path.resolve(process.cwd(), `.env.${nodeEnv}`);
dotenv.config({path: envPath});
dotenv.config(); // fallback

export async function migrate(args: string[]) {
  const existingSchema = args.includes('--rebuild') ? 'drop' : 'alter';
  console.log('Migrating schemas (%s existing schema)', existingSchema);

  const app = new FluxifyBackendApplication();
  await app.boot();
  await app.migrateSchema({existingSchema});

  // Connectors usually keep a pool of opened connections,
  // this keeps the process running even after all work is done.
  // We need to exit explicitly.
  process.exit(0);
}

migrate(process.argv).catch(err => {
  console.error('Cannot migrate database schema', err);
  process.exit(1);
});
